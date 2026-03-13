# Pitfalls Research

**Domain:** Adding paid quiz-to-PDF (The Blueprint) to existing free quiz app (The Mirror) — Next.js App Router on Vercel, Supabase, Stripe Checkout, Resend, @react-pdf/renderer
**Researched:** 2026-03-13
**Confidence:** HIGH for Stripe/webhook mechanics and Vercel limits (official docs verified); MEDIUM for UX conversion patterns (multiple sources, no single authoritative study); HIGH for React 19 / @react-pdf/renderer production issue (confirmed via GitHub issues)

---

## Critical Pitfalls

### Pitfall 1: Stripe Webhook Signature Verification Fails Silently Because App Router Parses the Body Before the Handler Reads It

**What goes wrong:**
The webhook route calls `await request.json()` to read the Stripe payload, then tries to call `stripe.webhooks.constructEvent()`. Signature verification throws `WebhookSignatureVerificationError` on every request. In a common failure mode, the developer catches this error and returns a 400 — Stripe retries for 72 hours, then marks the webhook as failed. The result: zero PDFs are generated and the failure is invisible because Stripe's dashboard shows "delivered" until the retries exhaust.

**Why it happens:**
`stripe.webhooks.constructEvent()` requires the exact raw UTF-8 string Stripe sent — byte-for-byte. `await request.json()` deserializes and re-serializes the body, which can reorder JSON keys, add/remove whitespace, or change character encoding. Any transformation breaks the HMAC signature. In the Pages Router, developers often disabled body parsing via `export const config = { api: { bodyParser: false } }`. In the App Router, there is no equivalent config — but this is not needed because `Request.text()` is already the raw body. The mistake is using `request.json()` instead of `request.text()`.

**How to avoid:**
Use this exact pattern in `app/api/webhooks/stripe/route.ts`:
```typescript
export async function POST(req: Request) {
  const body = await req.text(); // raw UTF-8 string, not parsed JSON
  const sig = req.headers.get('stripe-signature');

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig!, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err) {
    return NextResponse.json({ error: 'Webhook signature verification failed' }, { status: 400 });
  }
  // process event...
}
```
Never use `await request.json()` in a webhook handler. Note also that the webhook secret for Stripe CLI local testing (`whsec_...` from `stripe listen`) is different from the production endpoint secret in the Stripe Dashboard — using the wrong secret in `STRIPE_WEBHOOK_SECRET` is the second most common verification failure cause.

**Warning signs:**
- Stripe Dashboard shows webhook deliveries as failed with HTTP 400
- Stripe Dashboard shows "delivered" but no orders are created in Supabase
- Error logs contain "No signatures found matching the expected signature for payload"
- Testing with `stripe trigger checkout.session.completed` locally works but production does not

**Phase to address:** P2-Phase 1 (Payment Flow). Must be the very first thing validated before building any PDF generation logic. Use `stripe listen --forward-to localhost:3001/api/webhooks/stripe` and verify a test event creates an order record before proceeding.

---

### Pitfall 2: Stripe Webhook Fires Multiple Times — PDF Generated and Emailed Twice (or More) to the Same User

**What goes wrong:**
Stripe retries webhooks on any non-2xx response (including timeouts), and can deliver the same `checkout.session.completed` event 3-5 times under normal network conditions. If the webhook handler is not idempotent, the same user receives multiple PDF emails and the `orders` table accumulates duplicate rows, breaking the fulfillment status tracking. Worse: if the handler generates the PDF before inserting the order record, a race condition between two simultaneous deliveries can trigger two separate PDF generations.

**Why it happens:**
The `orders` table already has `stripe_checkout_session_id TEXT UNIQUE NOT NULL` — the idempotency guard is in place. But if the webhook handler does not check this guard *before* triggering PDF generation, the PDF generation and email send happen first, and the database insert is used only to record success. Under retry conditions, the duplicate check arrives too late.

**How to avoid:**
Structure the webhook handler with an idempotency-first pattern:
1. Check `orders` table for existing row with `stripe_checkout_session_id = event.data.object.id`.
2. If row exists with `status = 'fulfilled'`, return 200 immediately (Stripe stops retrying).
3. If row exists with `status = 'generating'`, return 200 immediately (another instance is handling it).
4. Only if no row exists: insert the order record first, then trigger async PDF generation.

The existing schema's `UNIQUE` constraint on `stripe_checkout_session_id` is the safety net, but the handler logic must use it proactively, not reactively.

**Warning signs:**
- User emails mention "I received two copies of my Blueprint"
- `orders` table has rows with duplicate `stripe_checkout_session_id` (the constraint would prevent this, but duplicate PDF emails can happen before the constraint fires)
- Stripe Dashboard shows a webhook event with multiple delivery attempts, all returning 200

**Phase to address:** P2-Phase 1 (Payment Flow). Design the idempotency check before writing any PDF generation code — the order of operations matters.

---

### Pitfall 3: `quiz_sessions` Table Has No `product_type` Column — Mirror and Blueprint Sessions Are Indistinguishable

**What goes wrong:**
The existing `quiz_sessions` table stores Mirror quiz sessions. The Blueprint quiz creates a second session for the same user. Without a `product_type` column (`'mirror'` or `'blueprint'`), it is impossible to query "what is this user's Mirror archetype?" versus "what is this user's Blueprint archetype?" The comparison bridge analysis (inherited vs own) — a core Blueprint feature — requires looking up both archetypes for the same user. A query without a discriminator column will return two rows with no way to differentiate them, making the bridge analysis impossible to implement correctly.

**Why it happens:**
The original schema was designed for a single product. Adding a second quiz without a migration that adds `product_type` to `quiz_sessions` seems like a minor oversight — but it blocks the entire cross-product comparison feature. Developers assume they can differentiate sessions by order of creation or by the `archetype_id` values, but both archetypes use the same 9 archetypes, making that impossible.

**How to avoid:**
Write and run a migration that adds `product_type TEXT NOT NULL DEFAULT 'mirror' CHECK (product_type IN ('mirror', 'blueprint'))` to `quiz_sessions` before building the Blueprint quiz. Update the quiz session creation API to accept and store `product_type`. Add a `CREATE INDEX quiz_sessions_product_type_idx ON quiz_sessions (product_type)` for query efficiency. The comparison bridge query then becomes: `SELECT * FROM quiz_sessions WHERE email = $1 AND product_type IN ('mirror', 'blueprint') AND status = 'completed'`.

**Warning signs:**
- Blueprint quiz starts being built without a migration adding a `product_type` discriminator
- A query to find "both sessions for one user" returns a result set with no way to determine which row is which
- The bridge comparison logic uses session creation timestamp ordering as a proxy — this is brittle and wrong

**Phase to address:** First task of P2-Phase 1 (before any quiz code is written). This is a data model prerequisite. Write the migration, deploy it, verify it before building Blueprint quiz logic.

---

### Pitfall 4: The Mirror Quiz Store and Blueprint Quiz Store Share the Same `localStorage` Key

**What goes wrong:**
The existing Mirror quiz uses `useQuizStore` persisted to `localStorage` under the key `"quiz-session"`. If the Blueprint quiz reuses or extends the same store — or creates a new store without specifying a distinct `name` — Zustand's persist middleware writes to the same key. When a user who has completed the Mirror quiz starts the Blueprint quiz, their Mirror answers overwrite with Blueprint answers. If they then return to view their Mirror result, `sessionId` in the store now points to the Blueprint session, and the result page loads the wrong archetype.

**Why it happens:**
Adding a second quiz flow looks like a copy-paste operation: take the existing quiz store, adjust the question bank, rename it `useBlueprintQuizStore`. But if the `persist` middleware `name` property is not changed from `"quiz-session"`, both stores share localStorage. The conflict is invisible in development because developers rarely test with both quizzes active simultaneously.

**How to avoid:**
Create a completely separate store file `stores/blueprintQuizStore.ts` with `name: "blueprint-quiz-session"` in the persist config. Never modify or extend `quizStore.ts`. The `partialize` function should be audited to ensure it excludes anything that could collide. Test explicitly: complete the Mirror quiz on a fresh browser, then start the Blueprint quiz, then return to the Mirror result URL and verify the correct Mirror archetype still loads.

**Warning signs:**
- Blueprint quiz store is defined in the same file as `quizStore.ts` or imports from it
- `persist` middleware `name` property not specified (defaults to store name, which may match)
- Mirror result page shows wrong archetype after user starts Blueprint quiz
- localStorage in DevTools shows a single `"quiz-session"` key after completing both quizzes

**Phase to address:** P2-Phase 1 (Blueprint quiz scaffolding). Create the store before building any quiz UI. The key name must be locked in before any user testing begins.

---

### Pitfall 5: Vercel Deployment Protection Blocks Stripe Webhook Requests in Production

**What goes wrong:**
Stripe's webhook delivery fails with HTTP 401 or a redirect to an authentication challenge page. Stripe Dashboard shows webhook deliveries as failed with non-200 status. This happens silently — no error in application logs because the request never reaches the Next.js route handler. Orders are never created, PDFs never generated, users never receive their purchase.

**Why it happens:**
Vercel's Deployment Protection feature (enabled by default on some plans and for preview deployments) intercepts all incoming requests and requires authentication before they reach the app. Stripe's webhook sender does not authenticate in this way. On production deployments, this is often enabled for preview environments but can also affect the main domain if Attack Challenge Mode is active.

**How to avoid:**
In the Vercel dashboard, navigate to Project Settings → Deployment Protection. Ensure the production deployment does not have Protection Bypass required for the webhook URL, or configure a Bypass for Automation with a secret header that Stripe's webhook settings do not support. The simplest solution: disable Deployment Protection for production entirely, or add the webhook endpoint path (`/api/webhooks/stripe`) to the bypass list. Test after deployment by triggering a test event from the Stripe Dashboard (not just the Stripe CLI) and verifying it reaches the handler.

**Warning signs:**
- Stripe CLI webhooks work locally but Stripe Dashboard test events fail in production
- Vercel logs show no entry for `/api/webhooks/stripe` despite Stripe Dashboard showing delivery attempts
- Stripe Dashboard shows HTTP 401 responses from the webhook endpoint
- Production environment is a Vercel preview URL rather than the production domain

**Phase to address:** P2-Phase 1 (Payment Flow). Verify after first production deployment, before any real payment is attempted.

---

### Pitfall 6: @react-pdf/renderer Crashes in Production on Vercel With React 19 Due to Reconciler Version Mismatch

**What goes wrong:**
PDF generation works in local development (`next dev`) and in the build step, but crashes with `TypeError: Cannot read properties of undefined (reading 'S')` or `TypeError: Cannot read properties of null (reading 'props')` at runtime in the Vercel production environment. The success page shows an error state. The user has paid and receives nothing.

**Why it happens:**
`@react-pdf/renderer` uses `@react-pdf/reconciler` internally, which uses React's `__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED`. In React 19, the structure of these internals changed. If there is a version mismatch between the React version your app uses and the React version `@react-pdf/reconciler` expects, the reconciler crashes at runtime. This mismatch can be caused by: `npm` hoisting a different React version for `@react-pdf/reconciler` than your app's React, or patches applied to the reconciler by other tools in the dependency tree. The crash is production-only because `next dev` uses a different module resolution path than the production build.

**How to avoid:**
- Add `@react-pdf/renderer` to `serverExternalPackages` in `next.config.ts`:
  ```typescript
  const nextConfig = { serverExternalPackages: ['@react-pdf/renderer'] };
  ```
- Pin `@react-pdf/renderer` to a version explicitly listed as compatible with React 19 and your exact Next.js version (currently 4.3.x as of 2026-03-13).
- After adding the dependency, generate a test PDF via a Route Handler in the deployed Vercel environment before connecting it to the payment flow. This is the only way to surface the production crash before a real user triggers it.
- Add `"overrides": { "react": "19.x", "@react-pdf/reconciler": "..." }` in `package.json` if npm's dependency resolution creates a mismatch.

**Warning signs:**
- PDF generation test in `next dev` passes but the same code throws in `next build` or on Vercel
- Error contains `__SECRET_INTERNALS` or `reconciler` in the stack trace
- Vercel function logs show `TypeError` from within `@react-pdf` modules
- `node_modules/@react-pdf/reconciler/package.json` shows a React peer dependency that differs from your app's React version

**Phase to address:** P2-Phase 3 (PDF Rendering). The very first task of the PDF phase must be: deploy a minimal PDF generation test route to the real Vercel environment. Do not build the full PDF template first.

---

### Pitfall 7: PDF Generation Triggers Synchronously in the Webhook Handler and Hits Vercel's Function Timeout

**What goes wrong:**
The Stripe webhook handler directly calls `renderToBuffer()` and waits for it to complete before returning a response to Stripe. `@react-pdf/renderer` for a 15-20 page document with fonts, images, and conditionally rendered sections takes 8-25 seconds. Vercel's default function timeout is 10 seconds (configurable, but must be explicitly set). If the function times out, Vercel returns a 504 to Stripe. Stripe interprets any non-2xx as a failure and retries — triggering the webhook again, starting a new PDF generation, and potentially doubling the cost and the chaos.

**Why it happens:**
Developers coming from synchronous server patterns treat PDF generation like any other synchronous operation. In a serverless environment, the webhook handler is racing against the function timeout. Resend email delivery adds further latency — a PDF attachment email can add another 1-3 seconds on top of the generation time.

**How to avoid:**
The webhook handler must only do: (1) signature verification, (2) idempotency check, (3) insert order record with `status = 'generating'`, (4) trigger async PDF generation via a separate mechanism, (5) return 200 immediately. The async generation can be implemented as: a Supabase Edge Function called from the webhook handler (fire-and-forget with `fetch` without `await`), or a subsequent Route Handler invocation, or by setting a Supabase row status that a background job polls. In the `next.config.ts` for the PDF generation route handler, set `export const maxDuration = 60` to allow up to 60 seconds for generation (requires Vercel Pro or higher for values above 10s). Return 200 from the webhook before generation is complete.

**Warning signs:**
- Webhook handler logs show "FUNCTION_INVOCATION_TIMEOUT" errors
- Stripe Dashboard shows webhook retries with 504 responses
- PDF generation works fine with small documents (1-2 pages) but fails with the full 15-20 page document
- No `maxDuration` export in the PDF generation route file

**Phase to address:** P2-Phase 1 (Payment Flow architecture). Decide the async pattern before writing any generation code. The PDF generation route must be a separate function from the webhook handler.

---

### Pitfall 8: Blueprint Stripe Checkout Session Does Not Carry the Quiz Session ID — Webhook Cannot Find the Data Needed to Generate the PDF

**What goes wrong:**
The Stripe webhook fires with `checkout.session.completed`. The handler validates the signature, creates an `orders` row, then tries to generate the PDF. To generate the PDF, it needs the user's Blueprint quiz answers and archetype. But the webhook payload contains only Stripe data — it has no knowledge of which Supabase `quiz_sessions` row this payment is for. The handler queries Supabase and finds nothing because the quiz session ID was never attached to the Stripe session.

**Why it happens:**
Developers create the Stripe Checkout Session server-side from the result page (or a payment CTA), but forget to pass the quiz session ID as metadata. The quiz session ID exists in Zustand client state at the time the payment CTA is clicked — it must be sent to the server action that creates the Checkout Session, which must then include it in `metadata: { quizSessionId: '...', email: '...' }`. If this wire-up is missed, the checkout session is created without the metadata, and the webhook has no way to recover it.

**How to avoid:**
The Stripe Checkout Session creation server action must receive `quizSessionId` from the client and attach it:
```typescript
const session = await stripe.checkout.sessions.create({
  metadata: {
    quizSessionId: blueprintQuizSessionId,
    email: userEmail,
    productType: 'blueprint',
  },
  // ...rest of config
});
```
In the webhook handler, access it via `event.data.object.metadata.quizSessionId`. Add a runtime check: if `metadata.quizSessionId` is missing from the event, log an alert and return 200 (do not retry — the metadata will never appear on retry). Verify this wire-up with a Stripe CLI test event that includes `--data 'metadata.quizSessionId=test-uuid'`.

**Warning signs:**
- Stripe Checkout Session creation does not accept `quizSessionId` as a parameter from the client component
- `event.data.object.metadata` is empty or undefined in webhook handler logs
- Webhook handler falls back to querying by email alone (ambiguous if user has taken multiple quizzes)
- No test verifying that metadata survives the Stripe redirect and appears in the webhook event

**Phase to address:** P2-Phase 1 (Payment Flow). The Checkout Session creation and the webhook handler must be designed as a pair — the metadata contract must be defined before building either side.

---

### Pitfall 9: The "Looks Done, Isn't Working" PDF Email — Download Link in Email Points to an Expired or Wrong Supabase Signed URL

**What goes wrong:**
The PDF is generated successfully. The email is sent. The user clicks the download link 4 hours later and receives a Supabase "403: Expired URL" or "404: Object not found" error. The PDF exists in storage — but the signed URL generated at delivery time has expired or was generated for the wrong storage path.

**Why it happens:**
Supabase Storage signed URLs have a default expiry. If the URL is generated with a short expiry (e.g., 3600 seconds = 1 hour) at email generation time, any user who doesn't click the link immediately loses access. The storage path in the email and the path in the `orders.pdf_storage_path` column may diverge if the path generation logic is inconsistent between the PDF upload step and the URL generation step.

**How to avoid:**
Do not embed a signed URL directly in the delivery email. Instead, embed a link to your own success page (`/blueprint/download?orderId=...`). That page server-side reads the `orders.pdf_storage_path` from Supabase, calls `createSignedUrl()` with a fresh expiry (e.g., 3600 seconds), and redirects the user to the fresh URL. This means the link in the email never expires — only the Supabase signed URL expires, and it is regenerated on each click. Verify that `orders.pdf_storage_path` is populated before the email is sent.

**Warning signs:**
- Signed URL expiry is set to less than 24 hours and the URL is embedded directly in the email
- `orders.pdf_storage_path` is null when the delivery email is sent
- The email "Download Your Blueprint" link goes to `storage.supabase.co/...?token=...` directly
- No test verifying the download link works 2+ hours after the email is sent

**Phase to address:** P2-Phase 3 (PDF Rendering + Delivery). Design the download link architecture before building the email template.

---

## Moderate Pitfalls

### Pitfall 10: Resend Rejects or Spam-Filters the PDF Delivery Email Because the PDF Is Attached Directly

**What goes wrong:**
The PDF is generated, stored, and sent via Resend with the PDF as a base64-encoded email attachment. Resend accepts the send request (200 OK). The email arrives in the user's spam folder, or is silently dropped by Gmail before delivery, because PDF attachments from new sending domains are treated as high-risk by spam filters. The user never sees the email. They contact support. Trust is damaged at the moment of highest emotional investment.

**Why it happens:**
PDF attachments — especially from domains without strong sending history — trigger spam filters. A 15-20 page Blueprint PDF will likely be 2-5 MB uncompressed, and MIME base64 encoding adds ~33%, pushing it to 2.7-6.7 MB. Gmail's incoming limit is 25 MB, but spam filter sensitivity spikes for any attachment over ~2 MB from a new sender. Resend's free tier also limits attachment size; their paid tiers have higher limits but the deliverability risk remains.

**How to avoid:**
Do not attach the PDF to the email. Instead: (1) upload the PDF to Supabase Storage, (2) email a download link to the success page (as described in Pitfall 9), (3) the email body should be rich and personal (referencing the user's archetype by name) to improve inbox placement. Ensure the sending domain has DKIM and SPF records configured — Resend requires these and provides setup instructions. Test email delivery to Gmail, Apple Mail, and Outlook inboxes before launch, using a real email address on each service.

**Warning signs:**
- Resend `send()` call includes `attachments: [{ filename: 'blueprint.pdf', content: pdfBuffer }]`
- No DKIM/SPF configured for the sending domain in Resend dashboard
- Email open rate below 40% in the first week (suggests spam placement)
- No pre-launch test of email delivery to multiple inbox providers

**Phase to address:** P2-Phase 3 (PDF Rendering + Delivery). Email architecture decision (attachment vs. link) must be made in Phase design, not implementation.

---

### Pitfall 11: The Bridge Comparison Analysis Is Built Assuming Both Quiz Sessions Always Exist

**What goes wrong:**
The Blueprint "both taken" path (Mirror + Blueprint) produces a bridge analysis comparing inherited archetype vs own archetype. The code that generates this comparison is written with the assumption that if `productType = 'blueprint'`, there is always a corresponding Mirror session. In production: a user buys the Blueprint without having taken the Mirror quiz. The comparison bridge renders a partial result, throws a null reference error, or silently produces a report with one archetype and empty bridge sections.

**Why it happens:**
Three user paths are defined (Mirror only / Blueprint only / Both), but the "Blueprint only" path produces a standalone report without bridge analysis. Developers build the bridge comparison code first because it's the most interesting feature, and build it assuming the "Both" path. The "Blueprint only" path becomes an afterthought.

**How to avoid:**
Build the PDF template with explicit path branching from the start:
```typescript
const hasMirrorSession = mirrorSession !== null;
// Render bridge sections only when hasMirrorSession === true
```
Default to the "Blueprint only" template as the base. Add bridge sections as conditional additions when Mirror data is available. Test all three paths explicitly: (1) Blueprint only, (2) Mirror only (no payment, no PDF), (3) Both. Never deploy Blueprint PDF generation without a verified "Blueprint only" test case.

**Warning signs:**
- PDF template code accesses `mirrorSession.archetypeId` without a null check
- No test case for a Blueprint purchase by a user who hasn't taken the Mirror quiz
- Bridge analysis section is rendered first in the template (before verifying both sessions exist)

**Phase to address:** P2-Phase 3 (PDF Rendering). Template architecture must handle all three paths from day one.

---

### Pitfall 12: Supabase Anonymous Auth Session Lost Between Quiz Completion and Stripe Redirect

**What goes wrong:**
The Mirror quiz uses anonymous auth — users sign in anonymously on quiz start, and the session ID (`auth.uid()`) is used for RLS. For the Blueprint, the user may arrive from a different browser session, a different device, or after a long gap since completing the Mirror quiz. If `signInAnonymously()` is called again (because the existing session cookie expired or was cleared), a new anonymous user is created — with a different `auth.uid()`. The new anonymous user cannot see the old Mirror quiz session (RLS blocks it), and the cross-session link breaks.

**Why it happens:**
Anonymous sessions are stored in cookies managed by `@supabase/ssr`. If the cookie expires, Supabase creates a new anonymous user on `signInAnonymously()` — it does not restore the old one. Calling `signInAnonymously()` unconditionally at quiz start is the common mistake; the correct pattern is to check if a session already exists first.

**How to avoid:**
Always check for an existing session before calling `signInAnonymously()`:
```typescript
const { data: { session } } = await supabase.auth.getSession();
if (!session) {
  await supabase.auth.signInAnonymously();
}
```
For the Blueprint payment flow specifically: attach the Blueprint quiz session ID to the Stripe Checkout metadata (as in Pitfall 8). The webhook handler uses the metadata to look up the session directly via the service role — bypassing RLS and the anonymous auth dependency entirely. This means the webhook works regardless of whether the user's anonymous session is still active.

**Warning signs:**
- `signInAnonymously()` called without first checking `getSession()`
- Webhook handler uses `auth.uid()` to look up quiz sessions (it should use the service role key)
- User reports "my results are gone" after purchasing Blueprint from a different device

**Phase to address:** P2-Phase 1 (data model and auth design). The session continuity strategy must be decided before the Blueprint quiz is built.

---

### Pitfall 13: The "Founding Member" Pricing Creates a Price Anchoring Problem That Undermines the Regular Price

**What goes wrong:**
The Blueprint launches at an introductory $29 "founding member" price. It remains at that price for 3+ months because there's no explicit plan to raise it. When the price eventually increases to $39-49, existing users who paid $29 feel the brand is untrustworthy. Worse: the $39-49 price was always the intended price, but the $29 price has now trained the audience to expect a lower number, making the standard price feel like an "increase" rather than the natural price.

**Why it happens:**
Introductory pricing is a standard launch tactic, but without a defined deadline and a clear mechanism to communicate the price increase, the "introductory" label becomes meaningless. The urgency created ("limited time") evaporates when the price stays low indefinitely.

**How to avoid:**
Define the introductory price period before launch: "founding member pricing for the first 100 purchases" (scarcity-based) or "introductory pricing until [specific date]" (time-based). Build a simple counter or date display into the purchase CTA. When the price increases, email the founding member list with a "you got in early" message that frames them as insiders. Never run an indefinite introductory price — it signals low confidence in the full price.

**Warning signs:**
- No defined end date or quantity cap on the introductory price at launch
- The price has not changed 90+ days after launch
- The Stripe product has only one price object (no mechanism to display "was $X, now $Y")
- No plan for how to communicate a future price increase to early buyers

**Phase to address:** Pre-launch pricing strategy (before P2-Phase 1 implementation). Price architecture must be decided before the Stripe product is created.

---

### Pitfall 14: The Free Mirror Result Page Now Has Competing Objectives — "Feel Seen" vs. "Convert to Blueprint"

**What goes wrong:**
Phase 3 built the Mirror result page with one objective: make the user feel completely seen. It has no paywall, no blurred content, and a "coming soon" CTA for the Blueprint. When the Blueprint launches, the result page needs to convert — but the "coming soon" CTA becomes a live purchase CTA. The result page design, which was optimized for emotional resonance, is now also tasked with selling. These two goals conflict: adding conversion mechanics (urgency, pricing, feature list) can undermine the editorial voice and make the page feel commercial rather than therapeutic.

**Why it happens:**
The v1 result page was built with a single objective. Adding a conversion objective to an existing page is retrofitted rather than designed. The placement of the CTA, the amount of social proof, and the pricing display all have to be layered onto a page that wasn't designed to carry them.

**How to avoid:**
The Blueprint CTA on the Mirror result page should not look like an advertisement. Frame it as a "natural next step" that the user is offered, not sold. The optimal placement is after the user has read the Mirror result fully (below the fold, not interrupting the experience). The CTA copy should reference something the Mirror result revealed: "You've seen what you inherited — The Blueprint shows who you're becoming as a parent." Include a minimal price display and a single action. Do not add testimonials, feature bullets, or countdown timers to the result page — those belong on a dedicated Blueprint landing page.

**Warning signs:**
- The Blueprint CTA appears above the fold on the Mirror result page
- The CTA section is longer than 200px vertically
- The CTA uses language that implies scarcity or urgency ("Act now", "Limited spots")
- The conversion CTA is A/B tested before the result page emotional resonance is validated

**Phase to address:** Mirror result page update (Phase 3 completion + Blueprint launch). The CTA upgrade from "coming soon" to live purchase must be a separate design task, not an inline code change.

---

## Technical Debt Patterns

Shortcuts that seem reasonable but create long-term problems.

| Shortcut | Immediate Benefit | Long-term Cost | When Acceptable |
|----------|-------------------|----------------|-----------------|
| Re-using the existing `quiz_sessions` table without `product_type` column | No migration needed | Mirror and Blueprint sessions are indistinguishable; bridge analysis is impossible | Never — add migration before building Blueprint quiz |
| Triggering PDF generation synchronously in webhook handler | Simpler code path | Vercel timeout (504), Stripe retries, duplicate PDFs | Never — async generation from day one |
| Using `request.json()` in the Stripe webhook handler | Cleaner code | Signature verification always fails; zero webhooks processed | Never — always `request.text()` |
| Attaching PDF as email attachment | Simpler delivery code | Spam filter risk, attachment size limits, deliverability issues | Never — deliver via download link |
| Embedding signed Supabase URL directly in email | One fewer redirect | URL expires; user loses access; support burden | Never — use intermediate success page that generates fresh URL |
| Sharing `localStorage` key between Mirror and Blueprint quiz stores | Less code to write | Mirror state corrupted by Blueprint quiz; result page shows wrong archetype | Never — separate store files with distinct persist keys |
| Building bridge comparison code before "Blueprint only" path is working | Builds the interesting feature first | Null reference errors for users who never took Mirror; deferred standalone Blueprint path | Never — build standalone path first, bridge as addition |
| No idempotency check before PDF generation | Simpler webhook handler | Duplicate PDFs on Stripe retry; user receives multiple emails | Never — check idempotency before any side effect |

---

## Integration Gotchas

Common mistakes when connecting to external services.

| Integration | Common Mistake | Correct Approach |
|-------------|----------------|------------------|
| Stripe webhook | Using `await request.json()` to read the body | Use `await request.text()` — the raw UTF-8 string is required for `constructEvent()` |
| Stripe webhook | Using the Stripe CLI webhook secret (`whsec_test_...`) in production | The production webhook secret in Stripe Dashboard is different from the CLI listener secret; use `STRIPE_WEBHOOK_SECRET` env var and set it to the production endpoint secret |
| Stripe Checkout | Not passing `quizSessionId` in session metadata | The webhook handler has no other way to find the quiz data; metadata is the only link between Stripe and Supabase |
| Stripe webhook | Not setting idempotency guard before side effects | Check `orders` table for existing `stripe_checkout_session_id` before generating PDF or sending email |
| Vercel + Stripe | Deployment Protection blocking webhook delivery | Configure Vercel deployment protection to allow the webhook path, or disable it for the production domain |
| @react-pdf/renderer | Not adding to `serverExternalPackages` in `next.config.ts` | Without this, Next.js bundles the library differently and React reconciler version conflicts cause production crashes |
| @react-pdf/renderer | Testing PDF generation only in `next dev` | Production build has different module resolution; always test `renderToBuffer()` in a deployed Vercel environment before integrating with payment flow |
| Resend | Sending PDF as base64 attachment | Triggers spam filters; exceeds deliverability thresholds; use Supabase Storage + signed URL link instead |
| Supabase Storage | Embedding signed URL directly in email body | URL expires before user clicks; generate fresh URL at click time via intermediate server route |
| Supabase anon auth | Calling `signInAnonymously()` on every quiz start | Creates a new anonymous user each time, losing the previous session and all associated data |

---

## Performance Traps

Patterns that work at small scale but fail as usage grows.

| Trap | Symptoms | Prevention | When It Breaks |
|------|----------|------------|----------------|
| Synchronous PDF generation in webhook handler | 504 errors; Stripe retries doubling load; duplicate emails | Async generation pattern; return 200 from webhook before generation completes | First concurrent payment attempt |
| Large Blueprint PDF generated per-request without caching static sections | Generation takes 15-25s even for the same archetype; high Vercel function execution cost | Cache archetype-static content (header images, boilerplate text, research snippets); only render user-specific sections dynamically | Every generation from day one |
| No `maxDuration` set on PDF generation route | 10s default timeout terminates long-running PDF renders | Add `export const maxDuration = 60` to the route file (requires Pro plan for >10s) | Every PDF generation over 10 pages |
| Comparison bridge query with no index on `product_type` | Slow query for users with many quiz sessions | Add index: `CREATE INDEX quiz_sessions_product_type_idx ON quiz_sessions (product_type)` | Around 5,000 quiz sessions in the table |
| Supabase Storage signed URL generated at delivery time | User cannot download 2+ hours after purchase | Generate signed URL server-side at click time via intermediate route, not at send time | First user who clicks email link more than 1 hour after purchase |

---

## Security Mistakes

Domain-specific security issues beyond general web security.

| Mistake | Risk | Prevention |
|---------|------|------------|
| Not verifying Stripe webhook signature | Attacker sends fake `checkout.session.completed` events; free PDFs generated without payment | Always use `stripe.webhooks.constructEvent(body, sig, secret)` — no exceptions |
| PDF generation endpoint accessible without payment verification | Any user can generate a Blueprint PDF without paying by calling the endpoint directly | PDF generation must only be triggered from within the webhook handler (after signature verification) or from an authenticated server action that checks `orders.status = 'paid'` |
| `quiz_sessions` accessible cross-user without `product_type` filter | A user who knows another user's quiz session UUID can retrieve their Blueprint archetype data | Ensure RLS policies use `auth.uid()` for all queries; the service role key in the webhook handler is intentional and scoped to the orders table only |
| Blueprint quiz session ID stored in client-side state only (not Supabase) until payment | If user closes browser after quiz but before payment, the session is lost; if user opens two tabs, session IDs diverge | Write the Blueprint quiz session to Supabase at completion, before navigating to the Stripe Checkout (matching the Mirror quiz flow pattern) |
| Stripe metadata containing PII beyond email | Stripe metadata is visible in the Dashboard to anyone with dashboard access | Store only the Supabase UUID (`quizSessionId`) and `email` in metadata; retrieve all other data server-side from Supabase using the UUID |

---

## UX Pitfalls

Common user experience mistakes specific to adding paid product to existing free product.

| Pitfall | User Impact | Better Approach |
|---------|-------------|-----------------|
| CTA on Mirror result page appears before user has finished reading their result | User feels interrupted before feeling seen; converts at lower rate because emotional resonance hasn't landed | Place the Blueprint CTA below all result content, after the cultural section — visible only after scrolling through the full result |
| Pricing first approach — showing $39 before explaining what the user gets | Price shock before value framing; higher abandonment before Stripe Checkout | Show the archetype comparison teaser and what's inside the Blueprint before showing the price |
| No clear distinction between "this is your Mirror result" and "this is what Blueprint adds" | User is confused about what they already have vs. what the paid product offers | Explicitly frame the Mirror as "what you received" and Blueprint as "what you can build" — two clearly labeled sections |
| "Founding member" pricing with no visible deadline or quantity cap | Urgency isn't believable; users delay; discount loses its conversion power | Display a specific cap ("first 100 founding members") or a specific end date |
| Success page after payment shows only "Check your email" | User doesn't know if payment worked; anxiety spikes; support contacts increase | Success page must immediately confirm: payment amount, archetype name, expected delivery time, and an explicit "generating your report" status indicator |
| Blueprint quiz has no "parent status" gating explanation | Users who are not parents yet feel excluded or confused | "Are you a parent / expecting / planning?" opening question must include one sentence explaining why it's asked — framing of the quiz experience changes based on their answer |

---

## "Looks Done But Isn't" Checklist

Things that appear complete but are missing critical pieces.

- [ ] **Stripe webhook handler:** Appears to process events (logs show no errors) but idempotency check is missing — verify by sending the same `checkout.session.completed` event twice and confirming only one order row is created and one email is sent.
- [ ] **PDF generation:** Works in `next dev` locally but not yet tested in a deployed Vercel environment — verify by deploying a standalone test route that calls `renderToBuffer()` and returns the PDF before connecting to payment flow.
- [ ] **Webhook signature verification:** Code exists but uses wrong env var (CLI secret vs production secret) — verify by using a Stripe CLI test with the production endpoint secret explicitly to confirm verification passes.
- [ ] **Quiz session metadata in Stripe:** Checkout session is created server-side but `quizSessionId` is not being passed from the client component — verify the metadata in the Stripe Dashboard for a test checkout event.
- [ ] **Blueprint quiz store:** Uses a different variable name from Mirror quiz store but accidentally shares the same localStorage `name` key — verify by opening `stores/blueprintQuizStore.ts` and confirming `name: "blueprint-quiz-session"` in the persist config.
- [ ] **Product type migration:** Blueprint quiz code is being written but the `quiz_sessions` table still lacks the `product_type` column — verify by running `SELECT column_name FROM information_schema.columns WHERE table_name = 'quiz_sessions'` and confirming `product_type` exists.
- [ ] **PDF download link in email:** Email is sent and received but the download link points to an expired or hardcoded Supabase signed URL — verify by clicking the download link 2 hours after sending and confirming it still works.
- [ ] **Vercel deployment protection:** Webhooks work in preview environment but fail in production because protection settings differ — verify by triggering a test event from the Stripe Dashboard (not CLI) against the production URL and confirming receipt in Vercel logs.
- [ ] **Bridge comparison null safety:** PDF template renders correctly for "Both" path but has never been tested with a user who only has a Blueprint session — verify by generating a PDF with `mirrorSession = null` and confirming no null reference errors and a valid standalone Blueprint report.

---

## Recovery Strategies

When pitfalls occur despite prevention, how to recover.

| Pitfall | Recovery Cost | Recovery Steps |
|---------|---------------|----------------|
| Stripe webhook secret wrong (zero webhooks processed at launch) | LOW | Update `STRIPE_WEBHOOK_SECRET` env var in Vercel to match production endpoint secret; reprocess failed events via Stripe Dashboard "Resend" button |
| PDF generation crashes in production after payments received | HIGH | (1) Manually re-trigger PDF generation via admin endpoint for all orders with `status = 'generating'`; (2) Email affected users explaining delay with a direct download link when resolved; (3) Fix the root cause (version pin or config fix); (4) Redeploy and verify with a test payment before reopening sales |
| Duplicate PDFs sent to users (idempotency missing) | MEDIUM | Email affected users acknowledging the duplicate and framing as a sign the product is in high demand; add idempotency check in hotfix deploy; no user data is lost |
| Mirror and Blueprint quiz states collided in localStorage | HIGH | Cannot recover lost quiz data from localStorage collision; add `name: "blueprint-quiz-session"` fix and deploy; users whose Mirror data was overwritten will need to retake the Mirror quiz (cannot recover automatically) |
| Bridge analysis null reference errors for "Blueprint only" users | MEDIUM | Hotfix: add null guard around all bridge sections; redeploy; affected users who paid and received broken PDFs should be re-sent a corrected PDF |
| PDF download links expired in delivery emails | LOW | Build the intermediate download route; update the delivery email template to use it; manually re-send download emails to affected users via Resend or the Stripe Dashboard customer list |
| Supabase anonymous session lost before Blueprint payment | LOW | Add `getSession()` check before `signInAnonymously()` in hotfix; existing users with lost sessions can retake the Blueprint quiz (anonymous data is not recoverable) |

---

## Pitfall-to-Phase Mapping

How roadmap phases should address these pitfalls.

| Pitfall | Prevention Phase | Verification |
|---------|------------------|--------------|
| Stripe webhook raw body parsing failure | P2-Phase 1: Payment Flow | Send test event via Stripe CLI and confirm `constructEvent` succeeds without error |
| Duplicate webhook delivery / missing idempotency | P2-Phase 1: Payment Flow | Send same event twice; confirm single order row and single email |
| Missing `product_type` column in quiz_sessions | P2-Phase 1: First task (migration) | Run `SELECT column_name FROM information_schema.columns WHERE table_name = 'quiz_sessions'` and verify |
| Blueprint quiz store sharing localStorage key | P2-Phase 1: Blueprint quiz scaffolding | Complete Mirror quiz then start Blueprint quiz; verify Mirror result page still shows correct archetype |
| Vercel Deployment Protection blocking webhooks | P2-Phase 1: Post-first-deploy verification | Trigger test event from Stripe Dashboard (not CLI); verify in Vercel logs |
| @react-pdf/renderer React 19 reconciler crash in production | P2-Phase 3: First task | Deploy minimal `renderToBuffer()` test route to Vercel before building full template |
| Synchronous PDF generation hitting function timeout | P2-Phase 1: Architecture decision | Document async generation pattern before any PDF code is written |
| Missing quiz session ID in Stripe metadata | P2-Phase 1: Payment Flow | Inspect Stripe Dashboard test event metadata and confirm `quizSessionId` present |
| Expired Supabase signed URL in delivery email | P2-Phase 3: Email delivery design | Click download link 2+ hours after test email send; confirm still works |
| PDF attachment spam filtering | P2-Phase 3: Email delivery design | Test delivery to Gmail, Apple Mail, Outlook before launch; verify inbox placement |
| Bridge comparison null reference (Blueprint only path) | P2-Phase 3: PDF template architecture | Generate test PDF with `mirrorSession = null` and verify no error and valid output |
| Supabase anonymous session lost between quiz and payment | P2-Phase 1: Auth design | Test Blueprint purchase from new browser (no Mirror session); confirm order created and PDF generated correctly |
| Founding member pricing with no end date | Pre-launch pricing strategy | Confirm Stripe product has defined introductory period before going live |
| Mirror result page CTA competing with editorial experience | Phase 3 completion (CTA upgrade) | User test: 5 users read Mirror result; verify CTA does not interrupt reading; measure scroll depth to CTA |

---

## Sources

- Stripe webhook raw body requirement: [Stripe — Resolve webhook signature verification errors](https://docs.stripe.com/webhooks/signature) — HIGH confidence (official Stripe documentation)
- Next.js App Router webhook pattern (`request.text()`): [Next.js App Router + Stripe Webhook Signature Verification](https://kitson-broadhurst.medium.com/next-js-app-router-stripe-webhook-signature-verification-ea9d59f3593f) + [Next.js GitHub Discussion #48885](https://github.com/vercel/next.js/discussions/48885) — MEDIUM confidence (community guides, consistent with official Stripe docs)
- Stripe webhook idempotency: [Handling Payment Webhooks Reliably](https://medium.com/@sohail_saifii/handling-payment-webhooks-reliably-idempotency-retries-validation-69b762720bf5) + [Stripe webhook guide](https://www.hookrelay.io/guides/nextjs-webhook-stripe) — MEDIUM confidence (multiple consistent sources)
- Stripe metadata for quiz session linking: [Stripe Metadata Documentation](https://docs.stripe.com/metadata) + [Stripe Metadata Use Cases](https://docs.stripe.com/metadata/use-cases) — HIGH confidence (official Stripe documentation)
- Vercel deployment protection blocking webhooks: [Next.js GitHub Discussion #48885](https://github.com/vercel/next.js/discussions/48885) + community reports — MEDIUM confidence (multiple community reports)
- Vercel function limits (timeout, memory, bundle size): [Vercel Functions Limits](https://vercel.com/docs/functions/limitations) — HIGH confidence (official Vercel documentation, verified 2026-03-13)
- @react-pdf/renderer React 19 production crash: [GitHub Issue #2966](https://github.com/diegomura/react-pdf/issues/2966) + [Issue #3223](https://github.com/diegomura/react-pdf/issues/3223) + [Issue #2964](https://github.com/diegomura/react-pdf/issues/2964) — HIGH confidence (multiple confirmed production reports, GitHub issue thread with verified fix)
- @react-pdf/renderer `serverExternalPackages` requirement: [react-pdf compatibility docs](https://react-pdf.org/compatibility) — HIGH confidence (official documentation)
- PDF email attachment deliverability: [Suped — PDF attachment email deliverability](https://www.suped.com/knowledge/email-deliverability/content/do-pdf-attachments-negatively-impact-email-deliverability-and-what-are-the-best-practices) + [SMTP2GO — Goldilocks Theory of Email File Sizes](https://www.smtp2go.com/blog/the-goldilocks-theory-of-email-file-sizes/) — MEDIUM confidence (multiple consistent sources)
- Zustand `localStorage` key collision: [Zustand GitHub — persist middleware discussion](https://github.com/pmndrs/zustand/discussions/2849) + Zustand documentation — HIGH confidence (official behavior documentation)
- Supabase anonymous auth session loss: [Supabase Anonymous Sign-Ins](https://supabase.com/docs/guides/auth/auth-anonymous) + [GitHub Discussion #23383](https://github.com/orgs/supabase/discussions/23383) — HIGH confidence (official Supabase documentation + confirmed behavior)
- Free-to-paid UX conversion patterns: [UX Psychology — Conversion Optimization](https://senorit.de/en/blog/ux-psychology-conversion-optimization) + pricing psychology sources — MEDIUM confidence (multiple sources, no single definitive study)
- Pricing psychology for digital products: [Psychology of Pricing — Digital Products](https://www.therecipenomad.com/2025/08/psychology-of-pricing-digital-products.html) + [Shopify psychological pricing](https://www.shopify.com/blog/psychological-pricing) — MEDIUM confidence

---

*Pitfalls research for: Adding paid Blueprint quiz-to-PDF to existing free Mirror quiz app (Kin v2.0)*
*Researched: 2026-03-13*
