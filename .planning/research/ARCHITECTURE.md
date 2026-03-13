# Architecture Research

**Domain:** Blueprint integration — adding paid quiz + Stripe + PDF pipeline to existing Kin app
**Researched:** 2026-03-13
**Confidence:** HIGH — based on existing codebase inspection + verified patterns from Stripe/Supabase/Next.js official docs

---

## Context: What Already Exists

This document is integration-specific. The codebase already has a working architecture. The job is to add Blueprint features onto it — not redesign.

**Already built and working:**
- `app/quiz/page.tsx` + `components/quiz/QuizShell.tsx` — full multi-step quiz UI
- `stores/quizStore.ts` — Zustand store with `persist` middleware (localStorage key `quiz-session`)
- `app/api/quiz-session/route.ts` — POST (create session) + PATCH (save results)
- `lib/quiz/compute-profile.ts` — `computeDimensionProfile(answers, questions?)` accepts custom question arrays
- `lib/quiz/scoring-matrix.ts` — `getResult(dimensionProfile)` returns `{ primary, secondaries }`
- `lib/archetypes/archetypes.ts` — 9 archetypes with `dimensionProfile` fingerprints
- `app/result/page.tsx` — Server Component reads `quiz_sessions` by session UUID
- `lib/supabase/server.ts` — `createAdminClient()` (service_role, bypasses RLS)
- `lib/email/send.ts` + `lib/email/client.ts` — Resend integration (already installed)
- `supabase/migrations/20260224000000_phase1_data_foundation.sql` — `quiz_sessions` + `orders` tables + `blueprints` storage bucket already exist

**Notable: `orders` table schema is already migrated.** It has `quiz_session_id`, `stripe_checkout_session_id`, `status` enum, `pdf_storage_path`, `paid_at`, `fulfilled_at`, `delivered_at`. The core DB schema is done.

**NOT yet built:** Stripe checkout route, webhook handler, Blueprint quiz questions, Blueprint Zustand store, PDF generation, Blueprint result/success pages.

---

## System Overview

### Full System After Blueprint Integration

```
┌──────────────────────────────────────────────────────────────────────────────┐
│                              CLIENT LAYER                                      │
│                                                                                │
│  ┌──────────┐  ┌───────────────┐  ┌──────────────┐  ┌──────────────────────┐ │
│  │  /quiz   │  │ /blueprint/   │  │   /result    │  │ /blueprint/success   │ │
│  │ (Mirror) │  │     quiz      │  │ (Mirror RSC) │  │  (post-payment RSC)  │ │
│  └────┬─────┘  └───────┬───────┘  └──────┬───────┘  └──────────┬───────────┘ │
│       │                │                  │                       │             │
│  quizStore        blueprintStore     (no client state)     (no client state)   │
│  (localStorage:   (localStorage:                                               │
│   quiz-session)    bp-session)                                                 │
└───────┼────────────────┼──────────────────┼───────────────────────┼────────────┘
        │                │                  │                       │
        ▼                ▼                  ▼                       ▼
┌──────────────────────────────────────────────────────────────────────────────┐
│                        NEXT.JS API LAYER (Route Handlers)                      │
│                                                                                │
│  ┌─────────────────────┐  ┌───────────────────────┐  ┌──────────────────┐    │
│  │ /api/quiz-session   │  │ /api/blueprint-session│  │  /api/checkout   │    │
│  │  POST: create       │  │  POST: create         │  │  POST: create    │    │
│  │  PATCH: complete    │  │  PATCH: complete       │  │  Stripe session  │    │
│  └─────────────────────┘  └───────────────────────┘  └──────────────────┘    │
│                                                                                │
│  ┌───────────────────────────────────────────────────────────────────────┐    │
│  │              /api/webhooks/stripe (POST)                               │    │
│  │              checkout.session.completed → fulfillOrder()               │    │
│  └───────────────────────────────────────────────────────────────────────┘    │
└──────────────────────────────────────────┬───────────────────────────────────┘
                                            │
           ┌────────────────────────────────┼──────────────────────────┐
           ▼                                ▼                          ▼
┌──────────────────┐              ┌──────────────────┐       ┌─────────────────┐
│   Supabase DB    │              │      Stripe       │       │     Resend      │
│  quiz_sessions   │              │  Checkout hosted  │       │  PDF attachment │
│  bp_quiz_sessions│              │  + webhook events │       │  email delivery │
│  orders          │              │  + metadata IDs   │       └─────────────────┘
└──────────┬───────┘              └──────────────────┘
           │
           ▼
┌──────────────────┐
│ Supabase Storage │
│  blueprints/     │
│  (private bucket)│
│  signed URLs     │
└──────────────────┘
```

### New Components Required

| Component | Type | Relationship to Existing |
|-----------|------|--------------------------|
| `stores/blueprintStore.ts` | NEW Zustand store | Mirrors `quizStore.ts` structure; separate localStorage key `bp-session` |
| `app/blueprint/quiz/page.tsx` | NEW Next.js page | Replaces the coming-soon `/blueprint` page with the actual quiz |
| `components/blueprint/quiz/BlueprintShell.tsx` | NEW Client Component | Mirrors `QuizShell.tsx`; uses `blueprintStore` + Blueprint questions |
| `lib/quiz/blueprint-questions.ts` | NEW question bank | Same `QuizQuestion[]` shape as `questions.ts`; own-parenting lens |
| `app/api/blueprint-session/route.ts` | NEW Route Handler | Mirrors `quiz-session/route.ts`; writes to `bp_quiz_sessions` table |
| `app/api/checkout/route.ts` | NEW Route Handler | Creates Stripe Checkout session; passes `bp_session_id` + `mirror_session_id` in metadata |
| `app/api/webhooks/stripe/route.ts` | NEW Route Handler | `checkout.session.completed` → PDF generation → Supabase storage → email |
| `lib/stripe/client.ts` | NEW singleton | Stripe SDK initialized server-side only |
| `lib/pdf/generate.ts` | NEW orchestrator | Assembles archetype data → renders PDF → returns `Buffer` |
| `components/pdf/BlueprintDocument.tsx` | NEW react-pdf component | Template-driven document; sections driven by archetype data |
| `app/blueprint/success/page.tsx` | NEW Server Component | Reads `orders` table → shows download link or "check email" state |

---

## New vs Modified: Full Inventory

### New Files (create from scratch)

```
lib/
├── stripe/
│   └── client.ts                      # Stripe SDK singleton (server-only)
├── quiz/
│   └── blueprint-questions.ts         # Blueprint question bank (own-parenting lens)
├── pdf/
│   ├── generate.ts                    # PDF orchestration: archetype data → Buffer
│   └── blueprint-content.ts           # Pre-written copy per archetype per section
│
app/
├── blueprint/
│   ├── quiz/
│   │   └── page.tsx                   # Blueprint quiz entry point
│   └── success/
│       └── page.tsx                   # Post-payment success/download page
├── api/
│   ├── blueprint-session/
│   │   └── route.ts                   # Create/complete Blueprint quiz sessions
│   ├── checkout/
│   │   └── route.ts                   # Create Stripe Checkout session
│   └── webhooks/
│       └── stripe/
│           └── route.ts               # Stripe webhook handler + fulfillOrder()
│
components/
├── blueprint/
│   └── quiz/
│       └── BlueprintShell.tsx         # Blueprint quiz orchestrator (mirrors QuizShell)
├── pdf/
│   ├── BlueprintDocument.tsx          # @react-pdf/renderer Document root
│   └── sections/                      # One component per PDF section
│
stores/
└── blueprintStore.ts                  # Zustand store for Blueprint quiz state
│
supabase/
└── migrations/
    └── [timestamp]_blueprint_quiz_sessions.sql   # New bp_quiz_sessions table
```

### Modified Files (extend, not rewrite)

```
lib/email/send.ts        → ADD sendBlueprintDelivery(to, pdfBuffer) function
lib/email/templates/     → ADD blueprint-delivery.ts (PDF attachment template)
app/blueprint/page.tsx   → REPLACE coming-soon page with quiz entry / redirect to /blueprint/quiz
```

### Unchanged Files (reused as-is)

```
lib/quiz/compute-profile.ts      # computeDimensionProfile(answers, blueprintQuestions) — already accepts custom questions param
lib/quiz/scoring-matrix.ts       # getResult(profile) — works on any DimensionProfile, archetype-agnostic
lib/archetypes/archetypes.ts     # Same 9 archetypes used for Blueprint scoring
lib/archetypes/types.ts          # All types reused
lib/supabase/server.ts           # createAdminClient() — same pattern
components/quiz/*                # All existing quiz sub-components (QuizCard, QuizProgress, etc.) reused directly by BlueprintShell
stores/quizStore.ts              # Unchanged — Mirror quiz state lives here
```

---

## Database Changes

### New Table: `bp_quiz_sessions`

The Mirror uses `quiz_sessions`. Blueprint needs its own parallel table so both can exist independently per user (a user may have both a Mirror result AND a Blueprint result).

```sql
CREATE TABLE bp_quiz_sessions (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email               TEXT,
  parent_status       TEXT,                          -- 'current-parent' | 'expecting' | 'planning' | 'unsure'
  status              TEXT NOT NULL DEFAULT 'in_progress'
                      CHECK (status IN ('in_progress', 'completed')),
  answers             JSONB,
  dimension_scores    JSONB,
  archetype_id        TEXT,
  cultural_background TEXT,
  mirror_session_id   UUID,                          -- FK to quiz_sessions.id (nullable — Blueprint can be standalone)
  started_at          TIMESTAMPTZ NOT NULL DEFAULT now(),
  completed_at        TIMESTAMPTZ,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

**Design rationale:** Keeping `bp_quiz_sessions` separate from `quiz_sessions` avoids polluting the Mirror table with a `quiz_type` discriminator column and keeps RLS policies clean. The `mirror_session_id` nullable FK links the two if a user did both quizzes — this enables the comparison bridge analysis.

### Existing `orders` Table: No Schema Changes

The `orders` table already has all required columns:
- `quiz_session_id` — repurpose as `bp_quiz_session_id` OR add a separate FK column
- `stripe_checkout_session_id` — idempotency guard
- `status` enum: `pending → paid → generating → fulfilled → delivered`
- `pdf_storage_path` — Supabase storage path
- `paid_at`, `fulfilled_at`, `delivered_at` — fulfillment tracking

**Decision:** Add a `bp_session_id` column via migration to make the FK explicit. The `quiz_session_id` column stays for forward-compatibility with possible future Mirror upgrades.

```sql
ALTER TABLE orders ADD COLUMN bp_session_id UUID REFERENCES bp_quiz_sessions(id) ON DELETE RESTRICT;
```

### Existing `blueprints` Storage Bucket: No Changes

Already created by `20260224000000_phase1_data_foundation.sql`:
- Private bucket, 50MB file limit, PDF-only MIME type
- Path convention: `blueprints/{order_id}/blueprint.pdf`

---

## Data Flow: Payment → PDF → Email

```
1. BLUEPRINT QUIZ COMPLETION
   Browser → BlueprintShell finishes last question
   → computeDimensionProfile(answers, BLUEPRINT_QUESTIONS)
   → getResult(profile) → { primary: archetypeId, secondaries: [...] }
   → PATCH /api/blueprint-session { sessionId, answers, dimensionScores, archetypeId }
   → Supabase: UPDATE bp_quiz_sessions SET status='completed', archetype_id=...
   → router.push('/blueprint/success-pending?bp_session=' + sessionId)
      OR directly to checkout

2. CHECKOUT INITIATION
   /blueprint/success-pending (or button on blueprint result page)
   → POST /api/checkout {
       bp_session_id: UUID,
       mirror_session_id: UUID | null   (from quizStore.sessionId if present)
     }
   → Server: reads bp_quiz_sessions.email for Stripe customer_email
   → stripe.checkout.sessions.create({
       line_items: [{ price: BLUEPRINT_PRICE_ID, quantity: 1 }],
       mode: 'payment',
       customer_email: email,
       success_url: '/blueprint/success?session_id={CHECKOUT_SESSION_ID}',
       cancel_url: '/blueprint',
       metadata: {
         bp_session_id: bpSessionId,
         mirror_session_id: mirrorSessionId ?? '',
       }
     })
   → Returns: { checkoutUrl }
   → Browser redirects to Stripe-hosted checkout page

3. PAYMENT COMPLETES (Stripe fires webhook)
   Stripe → POST /api/webhooks/stripe
   → const body = await req.text()           // MUST be .text(), not .json()
   → const sig = req.headers.get('stripe-signature')
   → stripe.webhooks.constructEvent(body, sig, STRIPE_WEBHOOK_SECRET)
   → event.type === 'checkout.session.completed'
   → const { bp_session_id, mirror_session_id } = session.metadata
   → Idempotency: SELECT id FROM orders WHERE stripe_checkout_session_id = session.id
     → If exists and fulfilled_at IS NOT NULL: return 200 (already done)
   → INSERT INTO orders { stripe_checkout_session_id, bp_session_id, customer_email, amount_cents, status: 'paid', paid_at }
   → UPDATE orders SET status = 'generating'
   → await fulfillOrder({ orderId, bpSessionId, mirrorSessionId })
   → Return 200 immediately (Stripe expects fast response)

4. fulfillOrder() — INLINE (sync within webhook for <60s Vercel Pro timeout)
   → Fetch bp_quiz_sessions WHERE id = bpSessionId
   → Fetch quiz_sessions WHERE id = mirrorSessionId (if present)
   → Determine hasBothQuizzes = mirrorSessionId && mirrorSession.archetype_id
   → const archetype = ARCHETYPES.find(a => a.id === bpSession.archetype_id)
   → const mirrorArchetype = hasBothQuizzes ? ARCHETYPES.find(...) : null
   → const pdfBuffer = await generateBlueprintPDF({
       bpArchetype: archetype,
       mirrorArchetype,
       parentStatus: bpSession.parent_status,
       culturalBackground: bpSession.cultural_background,
       hasBridgeAnalysis: hasBothQuizzes,
     })
   → const storagePath = `blueprints/${orderId}/blueprint.pdf`
   → supabase.storage.from('blueprints').upload(storagePath, pdfBuffer)
   → UPDATE orders SET pdf_storage_path = storagePath, status = 'fulfilled', fulfilled_at = now()
   → await sendBlueprintDelivery(customerEmail, pdfBuffer)   // Resend with PDF attachment
   → UPDATE orders SET status = 'delivered', delivered_at = now()

5. SUCCESS PAGE (/blueprint/success?session_id=...)
   → Server Component: SELECT * FROM orders WHERE stripe_checkout_session_id = sessionId
   → If status = 'fulfilled' or 'delivered':
       → supabase.storage.createSignedUrl(pdf_storage_path, 3600) → signedUrl
       → Render: download button + "check your email" note
   → If status = 'paid' or 'generating':
       → Render: "Your Blueprint is being prepared" + email instructions
       → Optional: 5s client-side polling via useEffect → re-fetch status
```

---

## Second Quiz: Reuse vs Extend

### What Gets Reused Directly

`computeDimensionProfile(answers, questions?)` already accepts a `questions` parameter override. Pass `BLUEPRINT_QUESTIONS` instead of the default `QUESTIONS`. The same 11-dimension scoring space and `getResult()` function work unchanged.

`getResult(profile)` returns `{ primary, secondaries }` — identical output format.

All quiz sub-components (`QuizCard`, `QuizProgress`, `OptionCard`, `QuizSectionHeader`, `WhyWeAskThis`) are generic and reusable. `BlueprintShell` imports them directly.

`createAdminClient()`, `lib/supabase/server.ts` — unchanged.

### What Gets Extended

**`stores/blueprintStore.ts`:** New Zustand store with the same shape as `quizStore.ts` plus a `parentStatus` field (the gating question answer) and `bpSessionId`. Different localStorage key (`bp-session`) so Mirror and Blueprint state do not collide.

**`app/api/blueprint-session/route.ts`:** Mirrors `quiz-session/route.ts` exactly but writes to `bp_quiz_sessions` instead of `quiz_sessions`. Copy the file, rename the table reference.

**`lib/quiz/blueprint-questions.ts`:** New question bank using the exact same `QuizQuestion[]` type from `questions.ts`. Questions are own-parenting lens ("When your child is upset, what do you usually do?" vs "When you were upset as a child..."). Parent-status gating question is handled as the first question with a special `id: 'q-parent-status'` that routes to different subsequent question framing.

### Parent-Status Gating

The first Blueprint question is `"Are you currently a parent, expecting, planning, or exploring?"` with options:
- `current-parent` → questions framed in present behavior ("I do / I find myself")
- `expecting` → questions framed in aspiration + anticipation
- `planning` / `unsure` → questions framed as intention and values

**Architecture decision:** All three paths use the same question IDs and `dimensionScores` maps. The framing difference is in the `question` text and `leadIn` field, not the scoring. This means the same `computeDimensionProfile` and `getResult` work for all paths without branching in the scoring layer.

**Implementation:** Store `parentStatus` in `blueprintStore`. When rendering, `BlueprintShell` selects a question variant array from `BLUEPRINT_QUESTIONS` filtered by `parentStatus`. The scoring function receives the filtered array.

---

## Architectural Patterns

### Pattern 1: Stripe Webhook with `request.text()` for Signature Verification

**What:** In Next.js App Router, Stripe webhook signature verification requires the raw request body. Use `await req.text()`, not `await req.json()`. Next.js does not auto-parse on `.text()`.

**When to use:** Any Stripe webhook handler in App Router. This is a hard requirement — using `.json()` will cause "No signatures found matching the expected signature" errors.

**Trade-offs:** None. `request.text()` is the correct method. Never use `request.body` in App Router.

```typescript
// app/api/webhooks/stripe/route.ts
export async function POST(req: Request) {
  const body = await req.text()  // raw body for Stripe signature
  const sig = req.headers.get('stripe-signature')
  if (!sig) return new Response('Missing signature', { status: 400 })

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch (err) {
    return new Response(`Webhook Error: ${err}`, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    await fulfillOrder(session)
  }

  return new Response('OK', { status: 200 })
}
```

Confidence: HIGH — confirmed by Stripe official docs + Next.js GitHub issue #60002.

### Pattern 2: Metadata Handshake for Fulfillment Correlation

**What:** Pass `bp_session_id` and optionally `mirror_session_id` in Stripe Checkout session metadata. The webhook reads these IDs to locate the quiz data for PDF generation.

**When to use:** Any product where fulfillment requires application-side data that predates the payment.

**Trade-offs:** Metadata values are capped at 500 chars each. UUIDs are 36 chars — well within limits. Keep metadata to IDs only; retrieve data from the DB inside the webhook handler.

```typescript
// app/api/checkout/route.ts
const session = await stripe.checkout.sessions.create({
  line_items: [{ price: process.env.BLUEPRINT_PRICE_ID!, quantity: 1 }],
  mode: 'payment',
  customer_email: customerEmail,
  success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/blueprint/success?session_id={CHECKOUT_SESSION_ID}`,
  cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/blueprint`,
  metadata: {
    bp_session_id: bpSessionId,
    mirror_session_id: mirrorSessionId ?? '',
  },
})
```

### Pattern 3: Idempotent Webhook Fulfillment

**What:** Before running fulfillment, check if an `orders` row with the same `stripe_checkout_session_id` already has `fulfilled_at IS NOT NULL`. If yes, return 200 without processing. Stripe may retry webhooks if your handler takes too long or returns non-2xx.

**When to use:** Always. Stripe's webhook retry policy can fire the same event multiple times. Without idempotency, a user could receive two PDFs or be billed the generation cost twice.

**Trade-offs:** Requires one extra DB read per webhook event. Negligible cost.

```typescript
// Inside fulfillOrder():
const { data: existing } = await supabase
  .from('orders')
  .select('id, fulfilled_at')
  .eq('stripe_checkout_session_id', checkoutSessionId)
  .maybeSingle()

if (existing?.fulfilled_at) return // Already fulfilled — skip
```

### Pattern 4: Template-Driven PDF with `@react-pdf/renderer`

**What:** Pre-written archetype copy (15-20 pages) is stored in `lib/pdf/blueprint-content.ts` as a structured data object keyed by `ArchetypeId`. The PDF renderer selects the correct copy at generation time based on the user's `primary` archetype. No AI calls needed — content exists for all 9 archetypes.

**When to use:** This project. PROJECT.md explicitly states "template-first PDF (no AI generation)." The 9-archetype x ~15 sections grid produces ~135 content blocks that can be written and validated ahead of time.

**Trade-offs:** More upfront content work. In exchange: no AI API costs, no generation latency, no reliability dependency on a third-party AI service.

```typescript
// lib/pdf/blueprint-content.ts
export const BLUEPRINT_CONTENT: Record<ArchetypeId, BlueprintContent> = {
  'steady-anchor': {
    coverTagline: '...',
    ownArchetypeHeadline: '...',
    ownArchetypeBody: '...',
    watchouts: [...],
    reflectionPrompts: [...],
    // ...
  },
  'fierce-guardian': { ... },
  // ... all 9 archetypes
}
```

```typescript
// lib/pdf/generate.ts
import { renderToBuffer } from '@react-pdf/renderer'
import { BlueprintDocument } from '@/components/pdf/BlueprintDocument'

export async function generateBlueprintPDF(options: BlueprintPDFOptions): Promise<Buffer> {
  const content = BLUEPRINT_CONTENT[options.bpArchetype.id]
  const mirrorContent = options.mirrorArchetype
    ? BLUEPRINT_CONTENT[options.mirrorArchetype.id]
    : null

  const pdfBuffer = await renderToBuffer(
    <BlueprintDocument
      bpArchetype={options.bpArchetype}
      content={content}
      mirrorArchetype={options.mirrorArchetype}
      mirrorContent={mirrorContent}
      parentStatus={options.parentStatus}
      culturalBackground={options.culturalBackground}
    />
  )

  return Buffer.from(pdfBuffer)
}
```

`@react-pdf/renderer` runs server-side in Node.js. No Chromium, no headless browser. Confirmed working in Next.js App Router route handlers as of v4.x.

### Pattern 5: PDF Email Delivery via Resend Attachment

**What:** The `lib/email/send.ts` already initializes Resend. Add a `sendBlueprintDelivery(to, pdfBuffer)` function that passes the PDF `Buffer` as a base64-encoded attachment.

**When to use:** Primary delivery channel — email is more reliable than a signed URL download page because the user receives it regardless of whether they stay on the success page.

```typescript
// lib/email/send.ts — ADD this function
export async function sendBlueprintDelivery(to: string, pdfBuffer: Buffer) {
  if (!resend) {
    console.warn('[email] RESEND_API_KEY not set — skipping delivery')
    return
  }
  const { error } = await resend.emails.send({
    from: FROM_EMAIL,
    to,
    subject: 'Your Blueprint by Kin is ready',
    html: blueprintDeliveryTemplate(),
    attachments: [{
      filename: 'your-blueprint-by-kin.pdf',
      content: pdfBuffer.toString('base64'),
    }],
  })
  if (error) console.error('[email] Blueprint delivery failed:', error)
}
```

Resend supports PDF attachments via base64 `content`. Total email size limit: 40MB. A 15-20 page PDF template document is expected to be 1-3MB — well within limits.

---

## Build Order

Dependencies determine the order. Each step unblocks the next.

```
STEP 1: Blueprint Quiz Engine
  New files:
    lib/quiz/blueprint-questions.ts     — own-parenting question bank
    stores/blueprintStore.ts            — Zustand store with parentStatus field
    components/blueprint/quiz/
      BlueprintShell.tsx                — quiz orchestrator (mirrors QuizShell)
  New migration:
    supabase/migrations/[ts]_blueprint_quiz_sessions.sql
  New API route:
    app/api/blueprint-session/route.ts  — POST/PATCH (mirrors quiz-session)
  New page:
    app/blueprint/quiz/page.tsx         — quiz entry
  Modify:
    app/blueprint/page.tsx              — redirect to /blueprint/quiz (replace coming-soon)

  Verifiable: user can take Blueprint quiz, answers saved to bp_quiz_sessions

STEP 2: Stripe Checkout Flow
  New files:
    lib/stripe/client.ts                — Stripe SDK singleton
    app/api/checkout/route.ts           — create Stripe session with metadata
  New migration:
    ALTER TABLE orders ADD COLUMN bp_session_id UUID...
  New env vars:
    STRIPE_SECRET_KEY
    STRIPE_WEBHOOK_SECRET
    BLUEPRINT_PRICE_ID
    NEXT_PUBLIC_BASE_URL

  Verifiable: CTA on Blueprint quiz completion redirects to Stripe hosted checkout
  Blocked by: Step 1 (needs bp_session_id to put in metadata)

STEP 3: PDF Template + Generation
  New files:
    lib/pdf/blueprint-content.ts        — pre-written copy for all 9 archetypes
    lib/pdf/generate.ts                 — generateBlueprintPDF() orchestrator
    components/pdf/BlueprintDocument.tsx
    components/pdf/sections/            — one component per section
  New dependency:
    npm install @react-pdf/renderer

  Verifiable: generateBlueprintPDF() returns a valid Buffer in isolation (unit test)
  Blocked by: Step 1 (needs archetype content structure)
  Independent of: Step 2 (can be built in parallel)

STEP 4: Webhook Handler + Fulfillment
  New files:
    app/api/webhooks/stripe/route.ts    — verify → idempotency → fulfillOrder()
    lib/email/templates/blueprint-delivery.ts
  Modify:
    lib/email/send.ts                   — ADD sendBlueprintDelivery()

  Verifiable: stripe trigger checkout.session.completed with CLI → PDF stored + email sent
  Blocked by: Step 2 (needs Stripe event) + Step 3 (calls generateBlueprintPDF)

STEP 5: Success Page
  New files:
    app/blueprint/success/page.tsx      — RSC reads orders + generates signed URL

  Verifiable: end-to-end checkout → success page shows download link
  Blocked by: Step 4 (order must exist to display)
```

**Parallel work possible:** Step 3 (PDF template) and Step 2 (Stripe checkout) can be built simultaneously by different work streams, since both only depend on Step 1 being complete.

---

## Comparison Bridge Analysis

When both Mirror (`quiz_sessions`) and Blueprint (`bp_quiz_sessions`) exist for the same email, the PDF unlocks an additional "Bridge" section comparing:
- Inherited archetype (Mirror result: `mirror_archetype_id`)
- Own archetype (Blueprint result: `bp_archetype_id`)

**Architecture:** The webhook handler checks if `mirror_session_id` is present and not empty in the Stripe metadata. If yes, it fetches both sessions and sets `hasBridgeAnalysis: true` in the PDF options. `generateBlueprintPDF` passes this flag to `BlueprintDocument`, which conditionally includes bridge comparison sections.

**Data linkage:** The `/api/checkout` route reads `mirror_session_id` from the client request body. The client reads this from `useQuizStore.getState().sessionId` at checkout initiation time. If the Mirror was taken in a previous browser session (no localStorage), the bridge analysis is skipped — acceptable since Blueprint has standalone value.

---

## Scaling Considerations

| Scale | Architecture Adjustments |
|-------|--------------------------|
| 0-200 orders/month | PDF generation inline in webhook handler. Vercel Pro (60s function timeout) required. @react-pdf/renderer with pre-written templates should complete in 2-8s. |
| 200-2k orders/month | Monitor webhook function execution times. Add Sentry/Datadog for webhook failure tracking. Consider Resend batch rate limits (currently 100/day on free tier). |
| 2k+ orders/month | Extract fulfillment to background queue (Inngest or Trigger.dev). Webhook handler inserts a job record and returns 200 immediately. Worker processes async and updates order status. Upgrade Resend plan. |

**First bottleneck:** Vercel function timeout. `@react-pdf/renderer` with pre-written templates (no AI calls) is fast — expected 2-8 seconds. Test with a realistic 20-page document before launch. Vercel Pro plan (60s timeout) is required.

**Second bottleneck:** Resend daily sending limits on free tier (100/day). Upgrade to paid plan before launch.

---

## Anti-Patterns

### Anti-Pattern 1: Using `quizStore` for the Blueprint Quiz

**What people do:** Add a `quizType` flag to the existing `quizStore` and branch behavior based on it.

**Why it's wrong:** Contaminating the Mirror quiz state with Blueprint state creates a complex shared store. Mirror and Blueprint are independent products. If a user takes both, the state collision will be difficult to debug.

**Do this instead:** Create `blueprintStore` as a completely separate Zustand store with its own localStorage key (`bp-session`). The two stores are entirely independent.

### Anti-Pattern 2: Writing Blueprint Answers to `quiz_sessions`

**What people do:** Add a `quiz_type TEXT` column to `quiz_sessions` and use the same table for both quizzes.

**Why it's wrong:** The `orders` table references `quiz_session_id`. Adding a type discriminator to `quiz_sessions` would require conditional joins and makes the schema harder to reason about. Both products will exist in parallel — they deserve parallel tables.

**Do this instead:** Create `bp_quiz_sessions` as a mirror-schema table. Add `bp_session_id` to `orders`. Clean separation, no discriminator columns.

### Anti-Pattern 3: Using `request.json()` in the Stripe Webhook Handler

**What people do:** `const body = await request.json()` then pass that to `stripe.webhooks.constructEvent()`.

**Why it's wrong:** Stripe signature verification requires the exact raw bytes of the request body. `request.json()` parses the body and destroys the original byte representation. The signature check will always fail.

**Do this instead:** `const body = await request.text()`. The `text()` method returns the raw string without modification. This is confirmed behavior in Next.js App Router.

### Anti-Pattern 4: Inline PDF Rendering in the Webhook With No Idempotency

**What people do:** Generate the PDF and send the email in one go, without checking if the order was already fulfilled.

**Why it's wrong:** Stripe retries webhooks on non-2xx responses or timeouts. If PDF generation takes 10+ seconds and Stripe retries, the user receives two emails with duplicate PDFs and you pay double generation cost.

**Do this instead:** INSERT the order row first with a `UNIQUE` constraint on `stripe_checkout_session_id`. Check `fulfilled_at IS NOT NULL` before running generation. Return 200 to Stripe as quickly as possible after the idempotency check.

### Anti-Pattern 5: Relying on the Success Page Redirect for Fulfillment

**What people do:** Trigger PDF generation when the user lands on `/blueprint/success`.

**Why it's wrong:** Users may close the tab after payment and never see the success page. Stripe's official documentation explicitly states the redirect cannot be relied upon for fulfillment.

**Do this instead:** Webhook is the source of truth for fulfillment. The success page reads order status from the database and either shows a download link (if fulfilled) or a "check your email" message (if still generating).

---

## Integration Points

### External Services

| Service | Integration Pattern | Notes |
|---------|---------------------|-------|
| Stripe | Server-side `stripe` SDK in `/api/checkout` and `/api/webhooks/stripe`. Client never touches Stripe directly. | Use `request.text()` in webhook; verify `stripe-signature` header on every request. Confirm Vercel Deployment Protection is OFF for webhook endpoint URL. |
| Resend | Already integrated in `lib/email/`. Add `sendBlueprintDelivery(to, pdfBuffer)` with base64 attachment. | 40MB email limit. 15-20 page PDF template expected to be 1-3MB. Upgrade from free plan before launch (100/day limit). |
| Supabase Storage | `blueprints/` bucket already exists. Upload in webhook handler via `createAdminClient()`. Generate signed URLs in success page Server Component. | Path convention: `blueprints/{orderId}/blueprint.pdf`. Signed URLs for download: 1h expiry. Signed URLs in email: use direct attachment instead (more reliable than expiring links). |

### Internal Boundaries

| Boundary | Communication | Notes |
|----------|---------------|-------|
| `blueprintStore` ↔ `BlueprintShell` | Direct `useBluprintStore()` hook | Keep store access inside Client Components only |
| `blueprintStore` ↔ `/api/blueprint-session` | `fetch()` POST/PATCH | Same pattern as existing Mirror quiz |
| `/api/checkout` ↔ `blueprintStore` | Client reads `blueprintStore.bpSessionId` + `quizStore.sessionId` at checkout time | Mirror `sessionId` from `quizStore` enables bridge analysis |
| Webhook handler ↔ `fulfillOrder()` | In-process function call | Keep webhook handler thin; `fulfillOrder()` in same file or adjacent module |
| `fulfillOrder()` ↔ `generateBlueprintPDF()` | Direct `await` call | PDF generation is synchronous (template-driven, no async AI calls) |
| `generateBlueprintPDF()` ↔ `@react-pdf/renderer` | `renderToBuffer()` import — server-side only | Never import `@react-pdf/renderer` in Client Components; it is Node.js only |
| `lib/quiz/compute-profile.ts` ↔ Blueprint quiz | `computeDimensionProfile(answers, BLUEPRINT_QUESTIONS)` — questions param override | No changes to compute-profile.ts needed |
| `lib/quiz/scoring-matrix.ts` ↔ Blueprint quiz | `getResult(profile)` — archetype-agnostic | No changes to scoring-matrix.ts needed |

---

## Sources

- [Stripe fulfill orders (official)](https://docs.stripe.com/checkout/fulfillment) — webhook-primary fulfillment pattern
- [Stripe metadata (official)](https://docs.stripe.com/metadata) — 500 char/value, 50 key limit
- [Stripe webhook signature verification (official)](https://docs.stripe.com/webhooks/signature) — raw body requirement
- [Next.js App Router webhook request.text() (Next.js GitHub #60002)](https://github.com/vercel/next.js/issues/60002) — confirmed: must use `.text()` not `.json()`
- [Next.js App Router + Stripe webhook (Medium)](https://kitson-broadhurst.medium.com/next-js-app-router-stripe-webhook-signature-verification-ea9d59f3593f) — practical implementation
- [Resend attachments (official)](https://resend.com/docs/dashboard/emails/attachments) — base64 `content` field, 40MB total limit
- [Supabase Storage signed URLs (official)](https://supabase.com/docs/guides/storage/serving/downloads) — `createSignedUrl()` API
- [@react-pdf/renderer NPM](https://www.npmjs.com/package/@react-pdf/renderer) — v4.3.2, 860k weekly downloads, confirmed Node.js server-side
- [react-pdf Next.js App Router discussion (GitHub)](https://github.com/diegomura/react-pdf/discussions/2402) — server-side rendering confirmed working
- [PDF generation in 2025 comparison (DEV Community)](https://dev.to/michal_szymanowski/how-to-generate-pdfs-in-2025-26gi) — React-PDF vs Puppeteer tradeoffs

---

*Architecture research for: Blueprint integration with existing Kin Mirror codebase*
*Researched: 2026-03-13*
