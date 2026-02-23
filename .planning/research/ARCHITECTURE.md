# Architecture Research

**Domain:** Quiz-to-personalized-PDF digital product (parenting assessment)
**Researched:** 2026-02-23
**Confidence:** MEDIUM — core patterns are well-established; PDF generation on Vercel serverless has edge cases that required multiple sources to clarify

---

## Standard Architecture

### System Overview

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           CLIENT LAYER (Browser)                         │
│                                                                           │
│  ┌────────────┐  ┌─────────────────┐  ┌──────────────┐  ┌───────────┐  │
│  │  Landing   │  │   Quiz Shell    │  │  Free Result │  │  Download │  │
│  │   Page     │  │  (multi-step)   │  │    Page      │  │   Page    │  │
│  └─────┬──────┘  └────────┬────────┘  └──────┬───────┘  └─────┬─────┘  │
│        │                  │                   │                │         │
│        │         Zustand quiz store           │                │         │
│        │         (in-memory, persisted)       │                │         │
└────────┼──────────────────┼───────────────────┼────────────────┼─────────┘
         │                  │                   │                │
         ▼                  ▼                   ▼                ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                       NEXT.JS APP ROUTER LAYER                           │
│                                                                           │
│  ┌────────────────────┐  ┌────────────────────┐  ┌──────────────────┐  │
│  │  Server Components │  │   Route Handlers   │  │  Server Actions  │  │
│  │  (RSC, SSG pages)  │  │  /api/pdf          │  │  (form submit,   │  │
│  │                    │  │  /api/webhooks/    │  │   quiz save)     │  │
│  │                    │  │    stripe          │  │                  │  │
│  └────────────────────┘  └────────────────────┘  └──────────────────┘  │
└────────────────────────────────┬────────────────────────────────────────┘
                                 │
         ┌───────────────────────┼───────────────────────┐
         ▼                       ▼                       ▼
┌─────────────────┐   ┌─────────────────┐   ┌────────────────────────┐
│   Supabase DB   │   │  Moonshot AI    │   │       Stripe           │
│  (PostgreSQL)   │   │  Kimi 2.5 API   │   │   (Checkout + Events)  │
│                 │   │                 │   │                        │
│ quiz_sessions   │   │  Structured     │   │  checkout.session.     │
│ quiz_answers    │   │  JSON output    │   │  completed webhook      │
│ orders          │   │  per section    │   │                        │
│ pdf_files       │   └─────────────────┘   └────────────────────────┘
└─────────────────┘
         │
         ▼
┌─────────────────┐
│ Supabase Storage│
│  (PDF bucket,   │
│  private with   │
│  signed URLs)   │
└─────────────────┘
```

### Component Responsibilities

| Component | Responsibility | Typical Implementation |
|-----------|----------------|------------------------|
| Quiz Shell | Step navigation, answer collection, progress state | Next.js Client Component + Zustand store |
| Zustand Quiz Store | In-memory quiz state across steps; optional localStorage persist for resumption | `zustand` with `persist` middleware |
| Free Result Page | Display archetype summary computed from quiz answers | Server Component — reads from Supabase after session save |
| `/api/webhooks/stripe` Route Handler | Receive `checkout.session.completed` from Stripe, trigger PDF generation | Route Handler (external caller requires HTTP endpoint) |
| `/api/pdf` Route Handler | Generate PDF from quiz answers + AI content; return binary or store in Supabase | Route Handler (custom Content-Type headers, streaming) |
| Moonshot AI Kimi 2.5 Client | Call AI API with quiz answers per section, return structured JSON with personalized text | Server-side utility module (called from Route Handler) |
| `@react-pdf/renderer` | Render typed React components → PDF binary on server | Server-side only render (Node.js environment) |
| Supabase DB | Persist quiz sessions, answers, order records, PDF storage paths | PostgreSQL via `@supabase/ssr` + service-role client in Route Handlers |
| Supabase Storage | Store generated PDF files, serve via signed URLs with expiry | Private bucket; `createSignedUrl()` for time-limited access |
| Stripe Checkout | Payment session creation, redirect flow, webhook events | `stripe` Node SDK + `checkout.session.completed` event |
| Download Page | Show download button after successful payment, fetch signed URL | Server Component — validates order status then generates signed URL |

---

## Recommended Project Structure

```
src/
├── app/                          # Next.js App Router
│   ├── (marketing)/              # Route group — no shared layout with app
│   │   └── page.tsx              # Landing page
│   ├── quiz/                     # Multi-step quiz flow
│   │   ├── page.tsx              # Quiz entry — loads quiz shell (Client Component)
│   │   └── [step]/               # Optional: URL-per-step for deep linking
│   ├── result/                   # Free result summary page
│   │   └── page.tsx              # Shows archetype, teases full report
│   ├── checkout/                 # Stripe redirect handling
│   │   └── success/
│   │       └── page.tsx          # Post-payment confirmation + download link
│   └── api/
│       ├── quiz/
│       │   └── route.ts          # Save completed quiz session to Supabase
│       ├── checkout/
│       │   └── route.ts          # Create Stripe Checkout session
│       ├── pdf/
│       │   └── route.ts          # Generate PDF (AI content + render) — or trigger storage
│       └── webhooks/
│           └── stripe/
│               └── route.ts      # Handle checkout.session.completed
│
├── components/
│   ├── quiz/
│   │   ├── QuizShell.tsx         # Client Component — step navigation container
│   │   ├── QuizStep.tsx          # Individual step renderer
│   │   ├── QuizProgress.tsx      # Progress indicator
│   │   └── questions/            # Question type components (scale, choice, text)
│   ├── pdf/
│   │   ├── BlueprintDocument.tsx # @react-pdf/renderer Document root
│   │   ├── sections/             # One component per PDF section
│   │   │   ├── CoverSection.tsx
│   │   │   ├── ArchetypeSection.tsx
│   │   │   ├── OriginProfileSection.tsx
│   │   │   ├── CulturalInsightsSection.tsx
│   │   │   ├── WatchoutsSection.tsx
│   │   │   ├── ReflectionPromptsSection.tsx
│   │   │   └── ConversationStartersSection.tsx
│   │   └── styles/               # Shared PDF StyleSheet definitions
│   └── ui/                       # Shared UI components (shadcn/ui)
│
├── lib/
│   ├── quiz/
│   │   ├── questions.ts          # Question bank and quiz structure
│   │   ├── scoring.ts            # Archetype scoring logic
│   │   └── archetypes.ts         # Archetype definitions (6-8 types)
│   ├── ai/
│   │   ├── moonshot.ts           # Moonshot AI Kimi 2.5 client
│   │   └── prompts/              # One prompt file per PDF section
│   │       ├── archetype.ts
│   │       ├── origin-profile.ts
│   │       └── ...
│   ├── pdf/
│   │   └── generate.ts           # Orchestrates AI calls + PDF render
│   ├── stripe/
│   │   └── client.ts             # Stripe SDK singleton
│   └── supabase/
│       ├── client.ts             # Browser client (@supabase/ssr)
│       └── server.ts             # Server client (service-role for webhooks)
│
├── stores/
│   └── quizStore.ts              # Zustand store for quiz state
│
└── types/
    ├── quiz.ts                   # Question, Answer, Session types
    ├── archetype.ts              # Archetype type definitions
    └── pdf.ts                    # PDF content section types
```

### Structure Rationale

- **`app/api/webhooks/stripe/`:** Stripe webhooks require Route Handlers (external HTTP caller, cannot use Server Actions). Isolated directory makes security review easy.
- **`components/pdf/sections/`:** Each PDF section is a separate React component. This enables independent iteration on design without touching generation logic.
- **`lib/ai/prompts/`:** One file per section keeps prompts auditable and easy to tune without touching rendering code.
- **`stores/quizStore.ts`:** Zustand at root level — used only in Client Components, never in Server Components or Route Handlers.
- **`lib/supabase/server.ts`:** Service-role client for webhook handlers (bypasses Row Level Security). Never expose to client.

---

## Architectural Patterns

### Pattern 1: Quiz State in Zustand + Server Persist on Completion

**What:** Quiz answers live in a Zustand store while the user is actively taking the quiz. On quiz completion (final step submit), a Server Action or API route persists the full session to Supabase in one write.

**When to use:** Any multi-step flow where answers accumulate across 20-50 questions. Prevents N round-trips to the server during the quiz.

**Trade-offs:** Answers are lost on hard refresh mid-quiz unless `persist` middleware writes to `localStorage`. Persisting to localStorage is fine for non-sensitive quiz data. Supabase write happens once at end — simpler, no partial-save complexity.

**Example:**
```typescript
// stores/quizStore.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface QuizState {
  currentStep: number
  answers: Record<string, string | number | string[]>
  setAnswer: (questionId: string, value: string | number | string[]) => void
  nextStep: () => void
  prevStep: () => void
  reset: () => void
}

export const useQuizStore = create<QuizState>()(
  persist(
    (set) => ({
      currentStep: 0,
      answers: {},
      setAnswer: (questionId, value) =>
        set((state) => ({ answers: { ...state.answers, [questionId]: value } })),
      nextStep: () => set((state) => ({ currentStep: state.currentStep + 1 })),
      prevStep: () => set((state) => ({ currentStep: state.currentStep - 1 })),
      reset: () => set({ currentStep: 0, answers: {} }),
    }),
    { name: 'quiz-session' }
  )
)
```

### Pattern 2: Supabase Anonymous Session for Pre-Payment Data Linking

**What:** On quiz start (or first answer), call Supabase `signInAnonymously()` to create an anonymous user. Store quiz answers under this user ID. When Stripe Checkout session is created, pass the Supabase `user_id` as metadata. Webhook uses this ID to locate answers for PDF generation.

**When to use:** Product has no required account creation. Stripe metadata (max 500 chars per value, 50 pairs) is sufficient for a single `user_id` UUID.

**Trade-offs:** Anonymous sessions are device-specific — users who clear cookies lose access. Acceptable for this product (email delivery of PDF mitigates loss). Requires enabling anonymous sign-ins in Supabase dashboard.

**Example:**
```typescript
// On quiz start
const { data: { user } } = await supabase.auth.signInAnonymously()
// user.id is now the session anchor for all subsequent DB writes

// On Stripe Checkout creation (api/checkout/route.ts)
const session = await stripe.checkout.sessions.create({
  // ...line_items, mode, success_url
  metadata: {
    supabase_user_id: user.id,
    quiz_session_id: quizSessionId, // row ID in quiz_sessions table
  },
})
```

### Pattern 3: Webhook-Triggered PDF Generation with Idempotency Guard

**What:** Stripe sends `checkout.session.completed` to `/api/webhooks/stripe`. The handler verifies the signature, checks the order hasn't already been fulfilled (idempotency), then triggers PDF generation. PDF is stored in Supabase Storage and a signed URL is sent to the customer.

**When to use:** Always. Stripe explicitly states: "You must use webhooks to make sure fulfillment happens for every payment." Do not rely solely on the success page redirect — users may close the tab.

**Trade-offs:** Adds async complexity. PDF generation inside the webhook handler must complete within Vercel's function timeout (60s on Pro, 10s on Hobby). For the 15-20 page personalized PDF with multiple AI calls, this is a real constraint — see Scaling Considerations.

**Example:**
```typescript
// app/api/webhooks/stripe/route.ts
export async function POST(req: Request) {
  const body = await req.text() // Must use .text() for signature verification
  const sig = req.headers.get('stripe-signature')!

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch {
    return new Response('Invalid signature', { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session

    // Idempotency: check if order already fulfilled
    const { data: existingOrder } = await supabase
      .from('orders')
      .select('id, fulfilled_at')
      .eq('stripe_session_id', session.id)
      .single()

    if (existingOrder?.fulfilled_at) {
      return new Response('Already fulfilled', { status: 200 })
    }

    const quizSessionId = session.metadata?.quiz_session_id
    // Trigger PDF generation + storage
    await fulfillOrder(session.id, quizSessionId)
  }

  return new Response('OK', { status: 200 })
}
```

### Pattern 4: Sectional AI Generation with Structured Output

**What:** Rather than asking the AI to generate the entire PDF in one prompt, split generation into one API call per PDF section (7 sections). Each call returns a typed JSON object with the text fields for that section. Errors on one section don't fail the entire PDF.

**When to use:** Any PDF with 5+ sections and >500 tokens total output. Improves reliability, enables per-section retry, and respects context window limits.

**Trade-offs:** 7 sequential AI calls adds latency (est. 15-35 seconds total for Kimi 2.5). Can be parallelized with `Promise.all()` for independent sections. Requires consistent Pydantic-style schema definitions per section.

**Example:**
```typescript
// lib/ai/generate.ts
interface ArchetypeSection {
  headline: string
  body_paragraph: string
  reflection_callout: string
}

async function generateArchetypeSection(
  answers: QuizAnswers,
  archetype: Archetype
): Promise<ArchetypeSection> {
  const response = await moonshot.chat.completions.create({
    model: 'moonshot-v1-8k',
    response_format: { type: 'json_object' }, // Structured output
    messages: [
      { role: 'system', content: ARCHETYPE_SYSTEM_PROMPT },
      { role: 'user', content: buildArchetypePrompt(answers, archetype) },
    ],
  })
  return JSON.parse(response.choices[0].message.content) as ArchetypeSection
}
```

---

## Data Flow

### Full User Journey: Quiz Answers → AI → PDF

```
1. USER STARTS QUIZ
   Browser → signInAnonymously() → Supabase returns anonymous user.id
   Browser → QuizStore (Zustand) initialized, user.id stored in store

2. QUIZ PROGRESSION (client-side only)
   Each answer → useQuizStore.setAnswer() → localStorage (via persist middleware)
   No server calls during quiz

3. QUIZ COMPLETION
   Browser → POST /api/quiz { answers, user_id }
     → Server Action / Route Handler
     → Supabase: INSERT quiz_sessions (user_id, answers JSON, archetype_id, created_at)
     → Returns: session_id, archetype summary data

4. FREE RESULT PAGE
   Browser renders archetype name, summary from returned data
   CTA: "Get Your Full Blueprint — $14"

5. CHECKOUT INITIATION
   Browser → POST /api/checkout { quiz_session_id, user_id }
     → Route Handler
     → stripe.checkout.sessions.create({
         metadata: { quiz_session_id, supabase_user_id }
         success_url: /checkout/success?session_id={CHECKOUT_SESSION_ID}
       })
     → Returns: Stripe Checkout URL
   Browser → redirect to Stripe-hosted payment page

6. PAYMENT COMPLETES
   Stripe → POST /api/webhooks/stripe (checkout.session.completed)
     → Signature verification
     → Idempotency check (orders table)
     → Fetch quiz answers from Supabase (by quiz_session_id from metadata)
     → Compute archetype scores (lib/quiz/scoring.ts)
     → Generate AI content (parallel where possible):
         Promise.all([
           generateArchetypeSection(answers, archetype),
           generateOriginProfileSection(answers),
           generateCulturalInsightsSection(answers),
           generateWatchoutsSection(answers),
           generateReflectionPromptsSection(answers),
           generateConversationStartersSection(answers),
         ])
     → Render PDF:
         renderToBuffer(<BlueprintDocument content={aiContent} archetype={archetype} />)
     → Store PDF:
         supabase.storage.from('blueprints').upload(`${user_id}/${order_id}.pdf`, pdfBuffer)
     → Record order:
         supabase: INSERT orders (stripe_session_id, user_id, pdf_path, fulfilled_at)
     → Send delivery email with signed URL (Resend or similar)
     → Return 200

7. DOWNLOAD PAGE
   Browser → /checkout/success?session_id=...
     → Server Component fetches order by stripe session_id
     → If fulfilled: createSignedUrl(pdf_path, 3600) → display download button
     → If pending: show "generating..." with polling or email instructions
```

### State Management Flow

```
QuizStore (Zustand, client-only)
    │
    │ persist middleware
    ▼
localStorage (quiz-session key)
    │
    │ on quiz complete
    ▼
POST /api/quiz (Server Route Handler)
    │
    ▼
Supabase: quiz_sessions table
    │
    │ referenced by quiz_session_id
    ▼
Stripe metadata → Webhook → Supabase → PDF generation
```

### Database Schema (Logical)

```
quiz_sessions
  id            UUID PK
  user_id       UUID FK → auth.users (anonymous or real)
  answers       JSONB         -- full quiz answer map
  archetype_id  VARCHAR(50)   -- computed archetype slug
  created_at    TIMESTAMPTZ

orders
  id                UUID PK
  stripe_session_id VARCHAR(255) UNIQUE
  user_id           UUID FK → auth.users
  quiz_session_id   UUID FK → quiz_sessions
  pdf_path          TEXT          -- Supabase storage path
  customer_email    VARCHAR(255)
  fulfilled_at      TIMESTAMPTZ   -- NULL until webhook completes
  created_at        TIMESTAMPTZ
```

---

## Scaling Considerations

| Scale | Architecture Adjustments |
|-------|--------------------------|
| 0-500 orders/month | Single Next.js deployment on Vercel Hobby/Pro. PDF generation inline in webhook handler. Supabase free tier sufficient. |
| 500-5k orders/month | Move PDF generation to Vercel Pro (60s function timeout). Add monitoring for webhook failures. Supabase Pro tier. |
| 5k+ orders/month | Extract PDF generation to Supabase Edge Function or separate worker (Inngest, Trigger.dev). Webhook handler queues a job, returns 200 immediately. Worker processes async. |

### Scaling Priorities

1. **First bottleneck — Vercel function timeout:** PDF generation involves 6-7 AI API calls + rendering. On Hobby tier (10s timeout), this will fail. Use Vercel Pro (60s) from day one, or pre-generate the AI content in one parallelized call and render fast. Benchmark total generation time before launch.

2. **Second bottleneck — Webhook handler complexity:** If Stripe retries a webhook (e.g., function timed out), the idempotency guard on the `orders` table prevents duplicate PDFs. This must work correctly before first sale. Test with `stripe trigger checkout.session.completed` CLI.

---

## Anti-Patterns

### Anti-Pattern 1: Puppeteer on Vercel for PDF Rendering

**What people do:** Use Puppeteer (headless Chromium) to render HTML → PDF, expecting pixel-perfect output matching the web design.

**Why it's wrong:** Puppeteer requires a Chromium binary (~170MB). Vercel serverless functions have a 50MB compressed size limit. The workaround using `@sparticuz/chromium` adds cold start latency of ~10-15 seconds (loading Chromium alone). This exceeds Hobby tier timeouts and makes Pro tier tight when combined with AI API calls.

**Do this instead:** Use `@react-pdf/renderer` which generates PDF natively via its own rendering engine — no browser required. Design the PDF using `@react-pdf/renderer` primitives (View, Text, Image, StyleSheet) rather than HTML/CSS. Accept that layout is different from the web UI but optimized for PDF output.

### Anti-Pattern 2: Generating AI Content One Section at a Time Sequentially

**What people do:** Call the AI API for Section 1, await, then Section 2, await, etc.

**Why it's wrong:** 7 sequential AI calls at ~2-5 seconds each = 14-35 seconds minimum. This almost certainly exceeds Vercel function timeouts and creates poor user experience if users poll for completion.

**Do this instead:** Identify which sections are independent (most of them) and parallelize with `Promise.all()`. Only sequence calls that depend on output from a previous call (e.g., if Section 2 references content from Section 1's output).

### Anti-Pattern 3: Storing All Quiz Answers in Stripe Metadata

**What people do:** Serialize quiz answers into Stripe Checkout session metadata to avoid needing a database before payment.

**Why it's wrong:** Stripe metadata values are capped at 500 characters each, 50 key-value pairs max. A 20-question quiz with multi-part answers will exceed this easily. Also means Stripe holds your user data — not ideal for privacy.

**Do this instead:** Save quiz answers to Supabase on quiz completion. Pass only the Supabase `quiz_session_id` (a UUID) in Stripe metadata. Webhook retrieves the full answers from Supabase using that ID.

### Anti-Pattern 4: Relying on Stripe Success Page Redirect for Fulfillment

**What people do:** On the `/checkout/success` page load, trigger PDF generation — assuming all customers land there.

**Why it's wrong:** Customers can close the tab after payment, lose connectivity, or have the redirect fail. Stripe explicitly documents this limitation: "You can't rely on triggering fulfillment only from your Checkout landing page."

**Do this instead:** Primary fulfillment is always via webhook. The success page is UI only — it reads order status from Supabase and shows a download link if the PDF is ready, or a "check your email" message if still generating.

---

## Integration Points

### External Services

| Service | Integration Pattern | Notes |
|---------|---------------------|-------|
| Moonshot AI Kimi 2.5 | Direct HTTPS API calls from server-side Route Handler | OpenAI-compatible API — use `openai` SDK pointed at Moonshot endpoint, or native fetch. Keep API key server-side only. |
| Stripe Checkout | Create session via server-side Route Handler; consume events via webhook Route Handler | Never create checkout sessions client-side (exposes secret key). Verify all webhook signatures. |
| Supabase Auth | `@supabase/ssr` package — cookie-based sessions for SSR compatibility | Use `signInAnonymously()` for quiz takers without forcing account creation. |
| Supabase Storage | Private bucket `blueprints/`; access via `createSignedUrl()` with short expiry (1 hour) | Do not make PDF bucket public. Generate signed URL only after order fulfillment verified. |
| Email Delivery (Resend) | Called from webhook handler after PDF stored | Send signed URL in email as backup delivery channel. Signed URL in email should have longer expiry (7 days). |

### Internal Boundaries

| Boundary | Communication | Notes |
|----------|---------------|-------|
| Quiz Client Component ↔ Zustand Store | Direct hook call (`useQuizStore()`) | Store must not be accessed in Server Components |
| Zustand Store ↔ Server (on completion) | Single `fetch()` POST to `/api/quiz` | One write per quiz, not per step |
| Route Handler ↔ Supabase | `@supabase/supabase-js` with service-role key | Service-role bypasses RLS — only use server-side |
| Route Handler ↔ AI Client | Server-side HTTP client (fetch or SDK) | All AI calls server-side; API key never in client bundle |
| Route Handler ↔ PDF Renderer | Direct import of `@react-pdf/renderer` `renderToBuffer()` | Server-side only; do not import in Client Components |
| Webhook Handler ↔ Fulfillment Logic | In-process function call (same Route Handler file) | Keep webhook handler thin — call extracted `fulfillOrder()` function |

---

## Suggested Build Order (Dependencies)

The following order respects hard dependencies — each phase's output is a prerequisite for the next:

```
Phase 1: Data Foundation
  → Supabase schema (quiz_sessions, orders tables)
  → Supabase Storage bucket setup
  Unblocks: everything downstream

Phase 2: Quiz Engine
  → Question bank + archetype scoring logic (lib/quiz/)
  → Zustand store
  → Quiz UI components
  → /api/quiz route (session save)
  Depends on: Phase 1 (schema)
  Unblocks: Result page, AI generation

Phase 3: Free Result Page
  → Archetype summary display
  → CTA to purchase
  Depends on: Phase 2 (archetype scoring output)
  Unblocks: Payment flow

Phase 4: Payment Flow
  → /api/checkout route (Stripe session creation)
  → /api/webhooks/stripe route (event handling + idempotency)
  → Checkout success page
  Depends on: Phase 1 (orders table), Phase 3 (result page as entry point)
  Unblocks: PDF generation (webhook triggers it)

Phase 5: AI Content Generation
  → Moonshot client setup
  → Section prompt files
  → Parallelized section generation
  Depends on: Phase 2 (quiz answers schema), Phase 4 (webhook calls it)
  Unblocks: PDF rendering

Phase 6: PDF Rendering + Delivery
  → @react-pdf/renderer section components
  → Full BlueprintDocument composition
  → Storage upload + signed URL generation
  → Email delivery
  Depends on: Phase 5 (AI content input)
  Completes: Full purchase flow

Phase 7: Landing Page + Polish
  → Marketing copy, credibility signals
  → Performance, mobile responsiveness
  Depends on: Phases 1-6 (something to sell)
```

---

## Sources

- Stripe Checkout Fulfillment (official): https://docs.stripe.com/checkout/fulfillment
- Stripe Metadata Limits (official): https://docs.stripe.com/metadata
- Supabase Anonymous Sign-Ins (official): https://supabase.com/docs/guides/auth/auth-anonymous
- Supabase Stripe Webhook Edge Functions (official): https://supabase.com/docs/guides/functions/examples/stripe-webhooks
- Supabase Storage Signed URLs (official): https://supabase.com/docs/guides/storage/serving/downloads
- Server Actions vs Route Handlers — MakerKit: https://makerkit.dev/blog/tutorials/server-actions-vs-route-handlers
- Zustand + Next.js multi-step form — Build with Matija: https://www.buildwithmatija.com/blog/master-multi-step-forms-build-a-dynamic-react-form-in-6-simple-steps
- @react-pdf/renderer npm: https://www.npmjs.com/package/@react-pdf/renderer
- Puppeteer on Vercel serverless limitations: https://github.com/maheshpaulj/serverless-pdf-generator
- Next.js 15 Modern Architecture — SoftwareMill: https://softwaremill.com/modern-full-stack-application-architecture-using-next-js-15/

---

*Architecture research for: quiz-to-personalized-PDF parenting assessment (Your Parenting Blueprint)*
*Researched: 2026-02-23*
