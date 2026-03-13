# Roadmap: Kin — The Mirror

## Milestones

- 🚧 **v1.0 The Mirror** — Phases 0–6 (in progress — Phase 3 pending, Phase 6 not started)
- 📋 **v2.0 The Blueprint** — Phases 7–10 (planned)

## Phases

<details>
<summary>🚧 v1.0 The Mirror (Phases 0–6) — in progress</summary>

### Overview

From clinical framework to working product: Phase 0 defines the archetype system with Sophia, Phases 1-2 build the data and quiz engine, Phase 2.5 rewrites all archetype copy to the parents-lens framing, Phase 3 builds the full free Mirror result page (email gate, complete result, Product 2 CTA), Phase 4 establishes brand positioning and visual direction, Phase 5 rebuilds the landing page against the brand direction, and Phase 6 covers marketing and launch strategy. Every phase delivers a coherent, verifiable capability before the next phase begins.

**Product ladder:** v1 delivers The Mirror (free). Payment, AI content generation, and PDF rendering are deferred to Product 2 (The Blueprint).

### v1.0 Phase Checklist

**Phase Numbering:**
- Integer phases (0, 1, 2, ...): Planned milestone work
- Decimal phases (2.5): Inserted work required by pivot

- [x] **Phase 0: Archetype Framework** — Define 9 clinical archetypes with Sophia, scoring logic, and content descriptions (completed 2026-02-24)
- [x] **Phase 1: Data Foundation** — Supabase schema, RLS policies, Storage, and anonymous auth configured (completed 2026-02-24)
- [x] **Phase 2: Quiz Engine** — Full quiz UI with scoring, persistence, and Supabase session write (completed 2026-02-24)
- [x] **Phase 2.5: Archetype Content Rewrite** — Reframe all archetype copy from "your parenting style" to "your parents' parenting style" (INSERTED — pivot requirement) (completed 2026-02-26)
- [ ] **Phase 3: Mirror Result Page** — Email gate, full free result (parents' archetype, patterns, watchouts, cultural section), Product 2 CTA
- [x] **Phase 4: Brand Positioning Research + Visual Direction** — Competitive landscape, positioning narrative, visual direction brief, rebrand execution plan
- [x] **Phase 5: Landing Page Rebuild** — Rebuild landing page from scratch informed by Phase 4 brand direction (completed 2026-03-01)
- [ ] **Phase 6: Marketing + Launch Strategy** — Go-to-market plan, content marketing, social media strategy, email funnels, KOL/influencer outreach

### Phase 0: Archetype Framework
**Goal**: The clinical archetype system is fully defined and validated so all downstream engineering has a stable foundation to build against
**Depends on**: Nothing (first phase)
**Requirements**: ARCH-01, ARCH-02, ARCH-03, ARCH-04, ARCH-05
**Success Criteria** (what must be TRUE):
  1. 9 named parenting archetypes exist with distinct clinical profiles written by Sophia
  2. A scoring matrix maps quiz answer dimensions to a primary archetype across 11 dimensions (handling blended results)
  3. Each archetype has a foundational patterns description (positive framing) and a watchouts description (shadow/risk patterns)
  4. Each archetype has a cultural context overlay document describing how cultural background modifies the archetype
  5. Sophia has validated the scoring output against simulated answer sets and confirmed results are clinically plausible
**Plans:** 5/5 plans executed (Phase 0 complete)
Plans:
- [x] 00-01-PLAN.md — TypeScript type contracts, KOL research synthesis, and scoring dimension definitions
- [x] 00-02-PLAN.md — Archetype definitions with dimension profiles and scoring algorithm
- [x] 00-03-PLAN.md — Scoring validation script with 28 simulated profiles; VERDICT: PASS
- [x] 00-04-PLAN.md — Content outlines (foundational patterns, watchouts) and cultural context overlays
- [~] 00-05-PLAN.md — Sophia review package v2.0 generated (Task 1 done); awaiting Sophia sign-off (Task 2 checkpoint)

### Phase 1: Data Foundation
**Goal**: The database and infrastructure layer is in place so quiz sessions and orders can be persisted securely from day one
**Depends on**: Phase 0
**Requirements**: None (infrastructure — enables all requirement categories)
**Success Criteria** (what must be TRUE):
  1. Supabase tables quiz_sessions and orders exist with correct schema and RLS policies enabled
  2. RLS policies are verified to work through the JavaScript SDK (not just the SQL editor)
  3. Anonymous sign-in is enabled and an anonymous user can write a quiz session and read only their own row
  4. Supabase Storage private bucket exists with signed URL access working for PDF delivery
**Plans:** 2/2 plans complete
Plans:
- [x] 01-01-PLAN.md — Supabase project init, migration SQL (schema + RLS + storage), client helpers
- [x] 01-02-PLAN.md — RLS verification script + human checkpoint for end-to-end infrastructure validation

### Phase 2: Quiz Engine
**Goal**: Users can complete the full quiz experience end-to-end, with answers persisted to Supabase on completion
**Depends on**: Phase 1
**Requirements**: QUIZ-01, QUIZ-02, QUIZ-03, QUIZ-04, QUIZ-05, QUIZ-06, QUIZ-07, QUIZ-08
**Success Criteria** (what must be TRUE):
  1. User sees one question per screen in a card-style layout with warm, conversational language and a visible progress bar
  2. User can navigate back to any previous question without losing answers
  3. User can leave mid-quiz, return later, and find their answers restored from localStorage
  4. Sensitive questions (upbringing, cultural background) show a "Why we ask this" helper text
  5. Cultural background is directly asked and the answer is stored in the quiz session for personalization downstream
**Plans:** 5/5 plans executed (Phase 2 complete)
Plans:
- [x] 02-01-PLAN.md — Next.js scaffold, Tailwind CSS v4, shadcn/ui, Biome, and all Phase 2 dependencies
- [x] 02-02-PLAN.md — Question bank (32→21 questions) with dimension scores and computeDimensionProfile function
- [x] 02-03-PLAN.md — Zustand store with localStorage persistence, quiz UI sub-components
- [x] 02-04-PLAN.md — QuizShell orchestrator, EmailCapture, ProcessingScreen, nuqs step sync, Supabase session write
- [x] 02-05-PLAN.md — Human verification checkpoint; quiz narrowed to 21 questions (past-lens only)

### Phase 2.5: Archetype Content Rewrite (INSERTED)
**Goal**: All archetype copy in the codebase is reframed from "your parenting style" to "your parents' parenting style" so the Mirror result page presents the correct narrative
**Depends on**: Phase 2
**Requirements**: COPY-01, COPY-02, COPY-03, COPY-04
**Success Criteria** (what must be TRUE):
  1. All 9 archetype names describe a parents' parenting style (not the user's current parenting approach)
  2. All foundational patterns copy reads as "patterns your parents passed to you" (inherited lens)
  3. All watchouts copy reads as "what to watch for given how you were raised" (awareness lens)
  4. All cultural overlay copy is updated to match the parents-archetype framing
  5. No copy in `archetypes.ts` or `cultural-overlays.ts` implies the user is currently parenting in this style
**Plans:** 2/2 plans complete
Plans:
- [x] 025-01-PLAN.md — Rewrite archetypes.ts: taglines, foundational patterns, watchouts to parents-lens framing
- [x] 025-02-PLAN.md — Rewrite cultural-overlays.ts: 45 overlays to receiver perspective + result page placeholder fix

### Phase 3: Mirror Result Page
**Goal**: After completing the quiz, users provide their email and see a complete, free result that makes them feel deeply seen about the parenting they received — no paywall, no blurred content
**Depends on**: Phase 2.5
**Requirements**: RSLT-01, RSLT-03, RSLT-05, RSLT-06, RSLT-07, RSLT-08, RSLT-09, RSLT-10
**Success Criteria** (what must be TRUE):
  1. User must enter their email before seeing any result content (email gate)
  2. The result page shows the user's parents' archetype name prominently with a full summary (not a teaser)
  3. The full foundational patterns section is displayed (all inherited patterns, nothing gated)
  4. All 5 watchouts are displayed in full (nothing blurred or gated behind payment)
  5. A dedicated cultural section shows how the user's cultural background shaped the parenting they received
  6. A clear CTA promotes The Blueprint (Product 2) as "coming soon" with email capture for launch notification
  7. No paywall, no blurred content, no purchase CTA for $14 anywhere on the page
**Plans:** 2/3 plans executed
Plans:
- [x] 03-01-PLAN.md — Result page Server Component + section components (reveal, patterns, watchouts, cultural)
- [x] 03-02-PLAN.md — Blueprint CTA components, /blueprint coming-soon page, API + database
- [ ] 03-03-PLAN.md — Email gate overlay, ResultPageClient wrapper, gate animations, human verification

### Phase 4: Brand Positioning Research + Visual Direction
**Goal**: Research the millennial parenting digital product landscape, identify the whitespace for a multi-product brand, define positioning, and evaluate the brand name — so Kin owns the space of digital tools for parents who want to understand themselves
**Depends on**: Phase 3
**Requirements**: BRAND-01, BRAND-02, BRAND-03, BRAND-04, BRAND-05 *(BRAND-06, BRAND-07, BRAND-08 moved to Phase 5)*
**Success Criteria** (what must be TRUE):
  1. 15+ millennial parenting digital products are profiled with full-funnel analysis across the landscape
  2. A positioning map identifies the unoccupied whitespace for a multi-product millennial parent brand
  3. A narrative positioning document defines the brand territory based on research-revealed gap (not pre-committed)
  4. Brand name evaluated for multi-product brand architecture (outcome: renamed to "Kin")
  5. The user has reviewed and approved the overall direction
**Note:** Visual direction (BRAND-06/07/08) was completed in Phase 4 but deleted 2026-02-28 — will be re-established fresh in Phase 5.
**Plans:** 3/3 plans complete (Phase 4 complete)
Plans:
- [x] 04-01-PLAN.md — Competitive landscape: profile 16+ millennial parenting digital products, positioning map, gap analysis
- [x] 04-02-PLAN.md — Reference brand gallery: 8-12 aspirational brands with pattern synthesis
- [x] 04-03-PLAN.md — Positioning narrative and brand name evaluation for multi-product brand

### Phase 5: Landing Page Rebuild
**Goal**: Rebuild the landing page from scratch, informed by the brand positioning and visual direction established in Phase 4 — credibility-forward, KOL signals, mobile-responsive, aligned with the Kin brand identity
**Depends on**: Phase 4
**Requirements**: LAND-01, LAND-02, LAND-03, LAND-04, LAND-05, BRAND-06, BRAND-07, BRAND-08
**Success Criteria** (what must be TRUE):
  1. Landing page visual design implements the Phase 4 visual direction brief (palette, typography, imagery, tone)
  2. Named KOL credibility signals (8+ researchers) are visible with specific research attribution
  3. The full product ladder (Mirror, Blueprint, Partner Match) is displayed with correct status labels
  4. A prominent quiz start CTA drives visitors into the quiz flow at /quiz
  5. The entire landing page is fully mobile-responsive and loads fast on mobile connections
**Plans:** 3/3 plans complete
Plans:
- [ ] 05-01-PLAN.md — Foundation + Hero: shared palette constants, layout.tsx font update, hero decomposition, emotional hook section, page shell
- [ ] 05-02-PLAN.md — Middle sections: How It Works (process + science), KOL credibility (12 researchers, expand/collapse)
- [ ] 05-03-PLAN.md — Bottom sections + verification: Product ladder, Sophia credentials, FAQ, Final CTA, human verification

### Phase 6: Marketing + Launch Strategy
**Goal**: A concrete go-to-market plan is in place so the product reaches its target audience and generates initial traffic from launch day
**Depends on**: Phase 5
**Requirements**: TBD
**Success Criteria** (what must be TRUE):
  1. TBD — needs scoping (likely covers: launch campaign plan, content/social media strategy, email funnel design, KOL/influencer outreach plan, distribution channels identified)
**Plans**: TBD

</details>

---

## 📋 v2.0 The Blueprint (Phases 7–10) — Planned

**Milestone Goal:** Ship a paid, template-driven personalized PDF that gives users their own parenting archetype and — when combined with Mirror data — bridges "what I inherited" with "who I'm becoming as a parent." Full pipeline: Blueprint quiz → Stripe Checkout → PDF generation → email delivery.

### v2.0 Phase Checklist

- [ ] **Phase 7: Blueprint Quiz Engine** — Blueprint quiz UI, parent-status gating, archetype scoring, result teaser, Supabase persistence (BQUIZ-01–06)
- [ ] **Phase 8: Stripe Payment Flow** — Checkout redirect, webhook handler with idempotency, orders row lifecycle, success page (PAY-01–05)
- [ ] **Phase 9: PDF Template and Delivery** — React-PDF template, Supabase Storage, Resend download-link email (PDF-01–06)
- [ ] **Phase 10: Launch Integration** — Mirror CTA upgrade from coming-soon to live purchase, Blueprint sales page (LAUNCH-01–02)

## Phase Details (v2.0)

### Phase 7: Blueprint Quiz Engine
**Goal**: Users can take the Blueprint quiz about their own parenting instincts, see their archetype result as a teaser, and have their answers persisted to Supabase — with the Mirror quiz completely unaffected
**Depends on**: Phase 6 (v1.0 complete); requires two prerequisite DB migrations before any quiz code is written
**Requirements**: BQUIZ-01, BQUIZ-02, BQUIZ-03, BQUIZ-04, BQUIZ-05, BQUIZ-06
**Success Criteria** (what must be TRUE):
  1. User sees a parent-status gating question as the first screen and their selected status (current parent / expecting / planning) adapts the framing of subsequent questions
  2. User can complete the full Blueprint quiz (card-style, progress bar, back navigation) without it affecting or overwriting their Mirror quiz state
  3. User sees their own-parenting archetype name and a brief teaser result at the end of the quiz
  4. A "proceed to purchase" CTA is present on the result teaser screen (may link to nothing yet — wired up in Phase 8)
  5. Blueprint quiz answers are saved to `bp_quiz_sessions` in Supabase with correct archetype_id
  6. If user leaves mid-quiz and returns, their Blueprint quiz progress restores from localStorage using a separate key from the Mirror quiz
**Plans**: TBD

### Phase 8: Stripe Payment Flow
**Goal**: Users can pay for The Blueprint via Stripe Checkout, and a verified, idempotent webhook handler creates an order row — no PDF generation yet, just the payment pipeline proven end-to-end
**Depends on**: Phase 7
**Requirements**: PAY-01, PAY-02, PAY-03, PAY-04, PAY-05
**Success Criteria** (what must be TRUE):
  1. User is redirected to Stripe Checkout at $39-49 (founding member pricing) after tapping the purchase CTA on the Blueprint result teaser
  2. After successful payment, an `orders` row exists in Supabase with the correct `bp_session_id` and `status = 'paid'`
  3. Sending the same Stripe event twice does not create a second order row or trigger duplicate processing
  4. Success page correctly reflects the order status (generating / ready) and does not just say "check your email"
  5. PDF is stored in Supabase Storage private bucket after generation (path recorded in `orders.pdf_storage_path`)
**Plans**: TBD

### Phase 9: PDF Template and Delivery
**Goal**: A template-driven 15-20 page Blueprint PDF is generated for all 9 archetypes across all three user paths (Blueprint-only, both quizzes taken, Mirror context without Blueprint), stored securely, and delivered to the user via a download-link email — not a PDF attachment
**Depends on**: Phase 7 (archetype data + parentStatus field finalized); can be developed in parallel with Phase 8 after Phase 7 ships
**Requirements**: PDF-01, PDF-02, PDF-03, PDF-04, PDF-05, PDF-06
**Success Criteria** (what must be TRUE):
  1. A minimal `renderToBuffer()` test route deployed to the real Vercel environment returns a valid PDF buffer before any full template work begins (mandatory production smoke test — React 19 reconciler gate)
  2. The generated PDF is 15-20 pages with premium design (therapy workbook aesthetic) and contains archetype overview, foundational patterns, and watchouts sections
  3. The PDF contains reflection prompts specific to the user's archetype and research snippets with named KOL attribution
  4. When the user has both a Mirror and Blueprint session, the PDF includes a bridge comparison section (inherited archetype vs. own archetype); when Blueprint-only, this section is absent and the PDF reads coherently without it
  5. After payment is confirmed, user receives an email with a download link (not a PDF attachment); clicking the link delivers the PDF
**Plans**: TBD

### Phase 10: Launch Integration
**Goal**: The Blueprint is live and discoverable — the Mirror result page carries a real purchase CTA instead of "coming soon," and The Blueprint has its own sales page — completing the product ladder handoff
**Depends on**: Phase 8 and Phase 9 (full pipeline working end-to-end)
**Requirements**: LAUNCH-01, LAUNCH-02
**Success Criteria** (what must be TRUE):
  1. The Mirror result page shows a live Blueprint purchase CTA below all result content (below the fold, not interrupting reading flow) that initiates the Stripe Checkout flow
  2. The Blueprint has its own landing/sales page accessible from the main Kin site that explains the product and drives to purchase
  3. The founding member pricing end condition (quantity cap or date) is displayed on both the CTA and the Blueprint sales page
**Plans**: TBD

## Progress

**Execution Order:**
v1.0: 0 → 1 → 2 → 2.5 → 3 → 4 → 5 → 6
v2.0: 7 → 8 → 9 (8 and 9 can run in parallel after 7) → 10

| Phase | Milestone | Plans Complete | Status | Completed |
|-------|-----------|----------------|--------|-----------|
| 0. Archetype Framework | v1.0 | 5/5 | Complete | 2026-02-24 |
| 1. Data Foundation | v1.0 | 2/2 | Complete | 2026-02-24 |
| 2. Quiz Engine | v1.0 | 5/5 | Complete | 2026-02-24 |
| 2.5. Archetype Content Rewrite | v1.0 | 2/2 | Complete | 2026-02-26 |
| 3. Mirror Result Page | v1.0 | 2/3 | In Progress | — |
| 4. Brand Positioning Research | v1.0 | 3/3 | Complete | 2026-02-28 |
| 5. Landing Page Rebuild | v1.0 | 3/3 | Complete | 2026-03-01 |
| 6. Marketing + Launch Strategy | v1.0 | 0/TBD | Not started | — |
| 7. Blueprint Quiz Engine | v2.0 | 0/TBD | Not started | — |
| 8. Stripe Payment Flow | v2.0 | 0/TBD | Not started | — |
| 9. PDF Template and Delivery | v2.0 | 0/TBD | Not started | — |
| 10. Launch Integration | v2.0 | 0/TBD | Not started | — |
