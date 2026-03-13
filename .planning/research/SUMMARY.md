# Project Research Summary

**Project:** The Blueprint — v2.0 milestone, Kin app
**Domain:** Paid quiz-to-PDF product (own-parenting archetype assessment) added to existing free quiz app
**Researched:** 2026-03-13
**Confidence:** HIGH (stack and architecture grounded in codebase inspection + official docs; pitfalls verified via GitHub production reports and Stripe/Vercel official documentation; features MEDIUM due to Feb 2026 vintage with outdated assumptions flagged explicitly below)

> **Note on FEATURES.md vintage:** FEATURES.md was written in Feb 2026 for an earlier product definition. The following items are outdated and must be disregarded: AI personalization via Moonshot Kimi 2.5, $14 price point, partner dialogue prompts as a Blueprint PDF section, and Couple's Blueprint as a near-term feature. The competitor analysis, table stakes checklist, and anti-features sections remain valid.

---

## Executive Summary

The Blueprint is a $39-49 paid parenting-style assessment that layers onto the existing Kin app (The Mirror). The core mechanic: user takes a new quiz about their own parenting instincts (distinct from The Mirror, which is about their upbringing), receives an archetype result, pays via Stripe Checkout, and receives a template-driven 15-20 page PDF via email. No AI generation — all PDF content is pre-written per archetype. This is a clean, well-understood product pattern. The net-new technology surface is minimal: Stripe Node SDK and `@react-pdf/renderer` are the only new packages on top of an already capable stack.

The recommended approach is additive integration, not a redesign. The existing quiz engine, scoring functions, Supabase schema, Resend email setup, and archetype definitions reuse directly. The Blueprint adds a parallel Zustand quiz store, a new question bank, a Stripe payment flow, and a React-PDF-based template renderer. The fulfillment pipeline follows a webhook-primary pattern: Stripe fires `checkout.session.completed`, the handler verifies the signature, runs an idempotency check, generates the PDF via `renderToBuffer()`, stores it in Supabase Storage, and sends a download link via Resend — all within the 60-second Vercel Pro function timeout that template-driven (no AI calls) PDF generation comfortably fits. The `orders` table and `blueprints` storage bucket are already migrated and waiting.

The primary risks are not architectural — they are silent implementation failures that only surface in production. Three patterns will kill this product if handled incorrectly: using `request.json()` instead of `request.text()` in the webhook handler (breaks all Stripe signature verification with no obvious error), missing idempotency before PDF generation (duplicate emails on Stripe retries), and deploying `@react-pdf/renderer` without a production smoke test before connecting it to the payment flow (a React 19 reconciler crash that only appears on Vercel, not in `next dev`). All three are preventable with the right build order and explicit verification gates built into each phase.

---

## Key Findings

### Recommended Stack

The existing stack needs only two new packages. See `.planning/research/STACK.md` for full integration patterns, code examples, and version compatibility notes.

**Net-new dependencies for Blueprint:**
- `stripe` (Node SDK, ^20.4.1): Server-side Checkout Session creation and webhook signature verification. Used only in Route Handlers — never client-side. `@stripe/stripe-js` and `@stripe/react-stripe-js` are explicitly not needed for the redirect Checkout flow.
- `@react-pdf/renderer` (^4.3.2): Template-driven PDF generation via `renderToBuffer()`. React 19 compatible since v4.1.0. Must be in `serverExternalPackages` in `next.config.ts` — already set in the codebase.

**Already installed, needs extended usage:**
- `resend` (^6.9.3): Extend `lib/email/send.ts` with `sendBlueprintDelivery(to, pdfBuffer)`. The recommended delivery architecture is a download link to an intermediate server route (which generates a fresh Supabase signed URL at click time), not a direct base64 PDF attachment — attachment delivery risks spam filtering (see Pitfall 10 in PITFALLS.md). STACK.md shows both patterns; PITFALLS.md is the tiebreaker: use the download link.

**Explicitly rejected:** Puppeteer/Chromium (Vercel bundle too large, 10-15s cold starts), any AI SDK (template-driven confirmed), `pdf-lib` / `jsPDF` / `pdfmake` (inferior for JSX-based layout authoring).

### Expected Features

FEATURES.md is February 2026 vintage. Outdated items are flagged. See `.planning/research/FEATURES.md` for the full feature dependency map and competitor analysis.

**Must have — table stakes (launch blockers):**
- Card-style quiz (one question per screen) with progress bar and back navigation
- Parent-status gating as the first question — framing adapts for current parents, expecting, and planning
- Mobile-first responsive layout throughout
- Free archetype result teaser before the payment ask
- PDF sample or preview on result page before purchase
- Stripe Checkout redirect at $39-49 (single clean price)
- Template-driven PDF with warm premium design (therapy workbook aesthetic)
- Download link delivery after payment — email with link, not PDF attachment
- "Why we ask this" helper text on personal/emotional questions
- Success page showing order status (not just "check your email")

**Should have — competitive differentiators for v2.0:**
- Named archetype result (9 archetypes, not a score) as core IP — identity-based results drive sharing and retention
- "Foundational patterns + watchouts" dual framing — positive framing and shadow aspects in the same PDF
- Bridge comparison section when user has both Mirror and Blueprint sessions (inherited archetype vs own — unique angle no competitor offers)
- KOL research attribution in PDF — named parenting researchers cited, not vague "research shows"
- Founding member pricing with an explicit cap or end date (defined before the Stripe product is created)

**Outdated in FEATURES.md — do not implement:**
- AI-personalized paragraphs via Moonshot Kimi 2.5: confirmed dropped, template-driven only
- $14 price point: current scope is $39-49
- Partner dialogue prompts in Blueprint PDF: deferred to Product 3
- Couple's Blueprint report: deferred to Product 3

**Defer to v2.1+:**
- Cultural background personalization (high content effort — requires culturally-variant copy per archetype, not just an additional question)
- Post-purchase email sequence (partner nudge, re-engagement)
- PDF re-delivery flow ("lost my PDF?" request)
- Permanent re-download page (Supabase signed URL on demand)

**Anti-features to explicitly not build:**
- Retake quiz (encourages gaming; undermines credibility of archetype output)
- Real-time cloud draft saving (localStorage is sufficient; anonymous-user server-side state is unnecessary complexity)
- User accounts or dashboard (stateless flow is sufficient; auth complexity not justified by v2.0 use case)

### Architecture Approach

The Blueprint integrates as a parallel product alongside The Mirror using a strict "new files, minimal modifications" principle. Mirror code is unchanged. Blueprint code lives in new files that mirror the structure of Mirror equivalents. The fulfillment data flow: Blueprint quiz completion → Stripe Checkout → webhook → PDF generation → Supabase Storage → Resend delivery → success page. See `.planning/research/ARCHITECTURE.md` for the complete file inventory, database schema, all five integration patterns with working code examples, and the five-step build order.

**Major new components:**

1. `stores/blueprintStore.ts` — Zustand store with `localStorage` key `bp-session` (separate from Mirror's `quiz-session`); adds `parentStatus` and `bpSessionId` fields
2. `lib/quiz/blueprint-questions.ts` — own-parenting question bank (same `QuizQuestion[]` type); three question-framing variants per parent status
3. `components/blueprint/quiz/BlueprintShell.tsx` — quiz orchestrator mirroring `QuizShell.tsx`; reuses all existing quiz sub-components directly
4. `app/api/blueprint-session/route.ts` — mirrors `quiz-session/route.ts`; writes to `bp_quiz_sessions` table
5. `app/api/checkout/route.ts` — creates Stripe Checkout Session with `bp_session_id` and `mirror_session_id` in metadata
6. `app/api/webhooks/stripe/route.ts` — fulfillment authority: `req.text()` → signature verify → idempotency → `fulfillOrder()`
7. `lib/pdf/blueprint-content.ts` — pre-written copy for all 9 archetypes across all sections (~135 content blocks)
8. `components/pdf/BlueprintDocument.tsx` + `components/pdf/sections/` — react-pdf JSX template
9. `app/blueprint/success/page.tsx` — Server Component reading `orders` table; shows download link or "still generating" state

**Database changes required (two migrations):**
- New table: `bp_quiz_sessions` (parallel to `quiz_sessions`, includes nullable `mirror_session_id` FK)
- `ALTER TABLE orders ADD COLUMN bp_session_id UUID REFERENCES bp_quiz_sessions(id)`
- `ALTER TABLE quiz_sessions ADD COLUMN product_type TEXT NOT NULL DEFAULT 'mirror'` + index — required for bridge analysis queries to distinguish Mirror sessions from Blueprint sessions

**Already done (no changes needed):** `orders` table schema, `blueprints` storage bucket, `lib/quiz/compute-profile.ts`, `lib/quiz/scoring-matrix.ts`, `lib/archetypes/archetypes.ts`, all quiz sub-components.

### Critical Pitfalls

The top five by severity. See `.planning/research/PITFALLS.md` for all 14 pitfalls with full detail, warning signs, and recovery strategies.

1. **`request.json()` in Stripe webhook handler** — Always `request.text()`. `.json()` destroys the raw byte representation required for HMAC signature verification. Stripe retries for 72 hours and the failure is invisible in application logs — Stripe Dashboard shows "delivered" but no orders are created. Verify with `stripe trigger checkout.session.completed` before writing any other handler logic.

2. **No idempotency check before PDF generation** — Stripe retries webhooks on non-2xx or timeout. Structure: check `orders.stripe_checkout_session_id` first → return 200 if `fulfilled_at IS NOT NULL` → insert order row → generate. If generation runs before the idempotency check, a retry produces a duplicate PDF and a duplicate delivery email.

3. **`@react-pdf/renderer` React 19 reconciler crash in production** — Works in `next dev`, crashes in Vercel production with a `TypeError` in React internals (`__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED` structure changed in React 19). The fix (`serverExternalPackages` config) is already in the codebase, but must be verified by deploying a minimal `renderToBuffer()` test route to the real Vercel environment before building the full PDF template. This is a mandatory gate, not optional.

4. **Vercel Deployment Protection blocking Stripe webhooks** — Stripe's webhook sender cannot authenticate through Vercel's protection layer. The request receives HTTP 401 silently — nothing appears in Next.js application logs. Verify after first production deploy by triggering a test event from the Stripe Dashboard (not the CLI) and confirming it appears in Vercel function logs.

5. **Blueprint quiz store sharing Mirror's `localStorage` key** — If `blueprintStore.ts` does not explicitly set `name: "blueprint-quiz-session"` in Zustand's persist config, both stores write to the same key. Mirror results become inaccessible after a user starts the Blueprint quiz. Test explicitly: complete Mirror quiz, start Blueprint quiz, return to Mirror result URL, verify the correct Mirror archetype still loads.

---

## Implications for Roadmap

The build order is dictated by hard dependencies, not preference. ARCHITECTURE.md documents the five-step build order. Steps 2 (Stripe checkout) and 3 (PDF template) can be parallelized once Step 1 (quiz engine) is complete.

### Phase 1: Blueprint Quiz Engine

**Rationale:** Everything downstream — payment, PDF generation, bridge analysis — depends on `bp_quiz_sessions` existing and being populated with a valid `archetype_id`. This phase also runs the two prerequisite database migrations that unblock all subsequent phases.

**Delivers:** User can take the Blueprint quiz and see their archetype result. Answers are saved to `bp_quiz_sessions`. The Mirror quiz is unaffected. A "proceed to purchase" CTA is in place (wired to nothing yet).

**Features addressed:** Parent-status gating question, own-parenting question bank, progress bar + back navigation, archetype scoring (reusing existing `computeDimensionProfile` and `getResult` unchanged), Blueprint result teaser page.

**Key implementation constraints:**
- `product_type` migration on `quiz_sessions` is the very first task — required for bridge analysis queries
- `bp_quiz_sessions` migration before any quiz code is written
- `localStorage` key `bp-session` locked into `blueprintStore.ts` before any user testing begins
- Check `getSession()` before `signInAnonymously()` — calling signInAnonymously unconditionally on every quiz start creates a new anonymous user each time, destroying the previous session

**Research flag:** Standard patterns — existing quiz engine is the direct template. No research-phase needed.

---

### Phase 2: Stripe Payment Flow

**Rationale:** Checkout and webhook infrastructure must be verified in isolation before PDF generation is connected to it. Building payment before PDF allows the metadata handshake and idempotency logic to be tested using Stripe test events without needing a real PDF. A placeholder fulfillment step (log + return 200) confirms the pipeline before any generation logic exists.

**Delivers:** User completes Blueprint quiz, proceeds to Stripe Checkout, payment succeeds, an `orders` row is created with `status = 'paid'`, a placeholder fulfillment step is invoked. No PDF yet.

**Features addressed:** Stripe Checkout redirect at $39-49, `bp_session_id` + `mirror_session_id` metadata handshake, idempotency guard on `orders.stripe_checkout_session_id`, order status lifecycle (`pending → paid → generating`).

**Key implementation constraints:**
- `request.text()` in webhook handler — validate this works before writing any other handler logic
- Idempotency check before any side effect — check first, insert order row, then trigger generation
- `bpSessionId` must be in Stripe metadata — verify in Stripe Dashboard for a test checkout event before proceeding
- Verify Vercel Deployment Protection allows the webhook path after first production deploy
- Async generation pattern decision made now: webhook returns 200 after inserting order row; `fulfillOrder()` runs inline (within 60s timeout) or is handed off — decide before PDF code is written

**Environment variables to add:** `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `STRIPE_BLUEPRINT_PRICE_ID`, `NEXT_PUBLIC_BASE_URL`

**Note on parallel work:** Phase 3 (PDF template) can begin in parallel with Phase 2 once Phase 1 is complete. PDF generation does not depend on Stripe; Stripe can be tested with a placeholder fulfillment stub.

**Research flag:** Standard patterns — Stripe Checkout redirect + webhook is the most documented payment pattern in Next.js. No research-phase needed.

---

### Phase 3: PDF Template and Delivery

**Rationale:** PDF generation is developed in isolation so it can be tested via a standalone Route Handler before being wired into the webhook. The template must handle all three user paths (Blueprint-only, Mirror-only context without Blueprint, Both) from day one — never assume `mirrorSession` is non-null.

**Delivers:** `generateBlueprintPDF()` returns a valid `Buffer` for all 9 archetypes across all three user paths. PDF is stored in Supabase Storage and delivered via a download link (not email attachment) that generates a fresh Supabase signed URL at click time via an intermediate server route. Full end-to-end flow is testable.

**Features addressed:** Template-driven 15-20 page PDF (archetype overview, foundational patterns, watchouts, reflection prompts, KOL attribution), conditional bridge comparison section when both quiz sessions exist, premium PDF design, delivery email with download link, success page showing order status.

**Key implementation constraints:**
- First task: deploy a minimal `renderToBuffer()` test route to the real Vercel environment — this is the production smoke test for the React 19 reconciler issue. Do not build the full template until this passes on Vercel.
- `export const maxDuration = 60` on the PDF generation route (requires Vercel Pro — confirm plan before this phase)
- Build "Blueprint only" path first; add bridge comparison as a conditional addition — all bridge sections must be gated on `hasMirrorSession === true`
- Deliver via download link (intermediate server route generates fresh signed URL at click time), not via direct PDF email attachment — spam filter risk for new sending domains with PDF attachments
- `orders.pdf_storage_path` must be populated before the delivery email is sent

**Content dependency:** `lib/pdf/blueprint-content.ts` requires ~135 pre-written content blocks (9 archetypes × ~15 sections). This is a content production dependency, not an engineering dependency. It must be ready before Phase 3 can ship. Blueprint question bank must also be finalized before Phase 1 ships.

**Research flag:** `@react-pdf/renderer` production behavior on Vercel has known quirks (React 19 reconciler mismatch, documented in Pitfall 6). The production smoke test gate is mandatory and cannot be skipped. No additional research beyond what PITFALLS.md documents, but the verification step is non-negotiable.

---

### Phase 4: Mirror Result Page CTA Upgrade

**Rationale:** The Mirror result page currently has a "coming soon" Blueprint CTA. This upgrade is the final pre-launch gate. It is separated from Phase 3 because it is a design and copy judgment call, not an engineering task — the risk is undermining the Mirror result page's emotional resonance by retrofitting a commercial interrupt onto a page designed for self-discovery.

**Delivers:** A live "natural next step" Blueprint purchase CTA on the Mirror result page, placed below the full result content (below the fold — the user must finish reading before encountering it). Founding member pricing is displayed with an explicit cap or end date.

**Key implementation constraints:**
- CTA appears below all Mirror result content — not above the fold, not interrupting the reading flow
- No urgency language, feature bullets, or countdown timers on the result page — those belong on a dedicated Blueprint landing page
- CTA copy references what the Mirror result revealed ("You've seen what you inherited — The Blueprint shows who you're becoming as a parent")
- Founding member pricing end condition (quantity cap or date) must be defined and built into the Stripe product before launch — an indefinite introductory price trains the audience to expect the lower number and undermines the regular price

**Research flag:** UX conversion patterns for free-to-paid digital products are MEDIUM confidence (no single authoritative benchmark for this exact context). A lightweight user observation session (3-5 users reading the Mirror result with the new CTA) before finalizing placement is worth the time.

---

### Phase Ordering Rationale

- Phase 1 before Phase 2: Stripe metadata requires a real `bp_session_id` — no quiz session, no checkout
- Phase 1 before Phase 3: PDF content structure requires the `parentStatus` field and archetype data to be finalized
- Phase 2 and Phase 3 can run in parallel once Phase 1 is complete
- Phase 4 last: it is a product launch gate requiring a working end-to-end pipeline to validate against

### Research Flags

Phases requiring no additional research (standard, well-documented patterns):
- **Phase 1:** Existing quiz engine is the direct template; Zustand, Supabase, Next.js patterns are well-understood in this codebase
- **Phase 2:** Stripe Checkout redirect + webhook fulfillment is the most documented payment pattern in Next.js; STACK.md and ARCHITECTURE.md provide working code

Phases with mandatory verification gates (not research, but gates that cannot be skipped):
- **Phase 3:** Deploy `renderToBuffer()` to Vercel before building the full template — this is a non-negotiable production smoke test. The React 19 reconciler issue (Pitfall 6) only surfaces in production and will block launch if discovered after the full template is built.

---

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | All additions verified against official docs and npm. Existing stack confirmed from codebase audit. `serverExternalPackages` already set. `renderToBuffer` vs. `renderToStream` distinction confirmed via GitHub issues. |
| Features | MEDIUM | FEATURES.md is Feb 2026 vintage. AI personalization, $14 price, and partner dialogue items are outdated. Competitor analysis and table stakes remain valid. Product scope confirmed in prompt context. |
| Architecture | HIGH | Based on direct codebase inspection plus verified Stripe/Supabase/Next.js official documentation. All integration patterns have working code examples in ARCHITECTURE.md. Build order is dependency-derived. |
| Pitfalls | HIGH | Critical technical pitfalls verified via official docs and multiple confirmed GitHub production reports. UX conversion patterns are MEDIUM (consistent across sources, no single authoritative study for this product category). |

**Overall confidence:** HIGH for the technical build. The confirmed template-driven approach (no AI, partner dialogue deferred) removes the main sources of uncertainty from the Feb 2026 research.

### Gaps to Address

- **Blueprint question bank (content dependency):** `lib/quiz/blueprint-questions.ts` requires finalized own-parenting questions in three parent-status variants. This must be ready before Phase 1 ships. It is a clinical/content dependency, not an engineering one.

- **PDF content blocks (content dependency):** `lib/pdf/blueprint-content.ts` requires ~135 pre-written content blocks (9 archetypes × ~15 sections). This must be ready before Phase 3 ships. The archetype framework must be finalized before content writing begins.

- **Email delivery architecture decision:** STACK.md discusses PDF attachment delivery; PITFALLS.md recommends against it (spam filter risk for new senders with PDF files over ~2MB). The decision — download link via intermediate route vs. direct attachment — should be locked in before Phase 3 begins. The recommendation from this synthesis is the download link pattern.

- **Founding member pricing end condition:** The introductory pricing plan (quantity cap vs. date-based) must be decided and communicated before the Stripe product is created. This is a business decision, not an engineering task, but it is a Phase 4 prerequisite.

- **Vercel plan confirmation:** `export const maxDuration = 60` requires Vercel Pro (free tier caps at 10 seconds). Confirm the plan before Phase 3. Template-driven PDF generation (no AI calls) is expected to complete in 2-8 seconds, but the `maxDuration` must be set regardless.

---

## Sources

### Primary (HIGH confidence)
- Stripe Checkout quickstart — Next.js (official): https://docs.stripe.com/checkout/quickstart — webhook-primary fulfillment, metadata, signature verification
- Stripe webhook signature verification (official): https://docs.stripe.com/webhooks/signature — raw body requirement
- Stripe metadata documentation (official): https://docs.stripe.com/metadata — 500 char/value limit, UUID as metadata value pattern
- Resend attachments documentation (official): https://resend.com/docs/dashboard/emails/attachments — base64 format, 40MB limit, attachment incompatibility with batch endpoint
- Supabase anonymous sign-ins (official): https://supabase.com/docs/guides/auth/auth-anonymous — session continuity behavior, `getSession()` before `signInAnonymously()`
- Supabase Storage signed URLs (official): https://supabase.com/docs/guides/storage/serving/downloads — `createSignedUrl()` API
- @react-pdf/renderer npm (v4.3.2): https://www.npmjs.com/package/@react-pdf/renderer — 1.19M weekly downloads, React 19 compatibility since v4.1.0
- @react-pdf/renderer React 19 production crash: GitHub issues #2966, #3223, #2964 (diegomura/react-pdf) — confirmed production failure and fix via `serverExternalPackages`
- Next.js App Router webhook `request.text()`: Next.js GitHub issue #60002 + discussion #48885 — `request.text()` confirmed as correct; `request.json()` breaks Stripe signature verification
- Vercel functions limits (official): https://vercel.com/docs/functions/limitations — 60s Pro timeout, 10s default
- Zustand persist middleware (official): https://github.com/pmndrs/zustand — `name` key behavior, collision risk
- Existing codebase audit: `package.json`, `next.config.ts`, `lib/email/`, `stores/quizStore.ts`, `lib/quiz/`, `lib/archetypes/`, `supabase/migrations/` — direct verification of installed stack, existing patterns, and already-migrated schema

### Secondary (MEDIUM confidence)
- Stripe Next.js 2025 guide (Pedro Alonso): https://www.pedroalonso.net/blog/stripe-nextjs-complete-guide-2025/ — Server Action checkout + idempotency patterns (consistent with Stripe official docs)
- Stripe webhook idempotency: https://medium.com/@sohail_saifii/handling-payment-webhooks-reliably-idempotency-retries-validation-69b762720bf5 — multiple sources consistent
- PDF attachment email deliverability: Suped + SMTP2GO blog posts — spam filter risk confirmed for PDF attachments from new senders
- 16Personalities premium product page (official): https://www.16personalities.com/premium/premium-report — competitor feature reference
- Attachment Project quiz: https://www.attachmentproject.com/attachment-style-quiz/ — competitor feature reference
- UX free-to-paid conversion patterns: https://senorit.de/en/blog/ux-psychology-conversion-optimization — CTA placement guidance

### Tertiary (LOW confidence)
- Quiz completion rate statistics: https://bestcolorfulsocks.com/blogs/news/style-quiz-completion-rate-statistics — single source; treat as directional
- Pricing psychology for digital products: general sources — directional, not definitive for this price point

---

*Research completed: 2026-03-13*
*Ready for roadmap: yes*
