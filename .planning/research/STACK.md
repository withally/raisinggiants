# Stack Research

**Domain:** Paid quiz-to-premium-PDF parenting assessment — The Blueprint (v2 milestone)
**Researched:** 2026-03-13
**Confidence:** HIGH (all core additions verified against current official docs and npm; existing stack confirmed from codebase)

---

## Context: What Already Exists (Do Not Re-research)

The following are installed and working. This file covers ONLY what needs to be added for The Blueprint.

| Technology | Version in package.json | Status |
|------------|------------------------|--------|
| Next.js | ^16.1.6 | Installed |
| React | ^19.2.4 | Installed |
| TypeScript | ^5.9.3 | Installed |
| Tailwind CSS | ^4.2.1 | Installed |
| shadcn/ui + Radix UI | (via CLI) | Installed |
| Supabase JS + SSR | ^2.97.0 + ^0.8.0 | Installed |
| Zustand | ^5.0.11 | Installed |
| React Hook Form + Zod | ^7.71.2 + ^4.3.6 | Installed |
| Resend | ^6.9.3 | Installed — needs PDF attachment wiring |
| Biome | ^2.4.4 | Installed |

**Next.js config already has:**
```typescript
serverExternalPackages: ['@react-pdf/renderer'] // already in next.config.ts
```

---

## New Stack Additions for The Blueprint

### Core Additions

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| stripe (Node SDK) | ^20.4.1 | Server-side Checkout Session creation + webhook signature verification | Official Node.js Stripe SDK. 20.4.1 is current as of March 2026. Secret key stays server-only. Never use the client-side `@stripe/stripe-js` for redirect Checkout — you only need the Node SDK. |
| @react-pdf/renderer | ^4.3.2 | Generate 15-20 page PDF from React component templates | Component-based PDF authoring in JSX with Flexbox layout. Generates via `renderToBuffer()` — returns a Node Buffer ready for Resend attachment. 1.19M weekly downloads, actively maintained. React 19 compatible since v4.1.0. |

### Already Installed — Needs New Usage

| Library | Current Version | New Usage for Blueprint |
|---------|-----------------|-------------------------|
| resend | ^6.9.3 | Add `attachments` array with base64-encoded PDF buffer. Already used for transactional email — just needs PDF attachment wiring in a new `sendBlueprintPDF()` function. 40MB limit (post-base64); PDFs at 15-20 pages will be well under 5MB. |

---

## What NOT to Add

| Avoid | Why | Use Instead |
|-------|-----|-------------|
| `@stripe/stripe-js` or `@stripe/react-stripe-js` | Not needed for Checkout redirect flow. These are for Stripe Elements (embedded checkout). Redirect Checkout only needs the server-side Node SDK. | `stripe` (Node SDK) in Server Actions and Route Handlers only |
| Standard `puppeteer` package | Bundle exceeds Vercel's 250MB deployment limit. Cold start on Vercel is 10-15 seconds. | `@react-pdf/renderer` with `renderToBuffer()` |
| `puppeteer-core` + `@sparticuz/chromium` | Adds ~50MB to bundle, complex config, 10-15s cold starts. Justified only if react-pdf cannot achieve required design. | `@react-pdf/renderer` — handles custom fonts, SVG, images, background colors |
| `react-email` or `@react-email/components` | Not needed for Blueprint. Plain HTML string templates (already the pattern in `lib/email/templates/`) work well. Add complexity without proportional value for a single email type. | Continue with HTML string templates in `lib/email/templates/` |
| `openai` or any AI SDK | Decision confirmed: template-driven PDF, no AI generation. Pre-written archetype content fills template slots. | Deterministic template rendering |
| `pdf-lib` | Designed for manipulating existing PDF files (fill forms, merge). Not for building layouts from scratch. | `@react-pdf/renderer` |
| `jsPDF` | Synchronous/blocking; draws at coordinates — not component-based. Poor layout capabilities. | `@react-pdf/renderer` |
| `pdfmake` | JSON-declarative; server-side issues reported in 2025; less intuitive than JSX for component-based design. | `@react-pdf/renderer` |

---

## Installation

```bash
# Payments
npm install stripe

# PDF generation
npm install @react-pdf/renderer
```

No other new packages needed. `resend` is already installed.

---

## Integration Patterns

### Stripe Checkout — Server Action Pattern

Use a Server Action to create the session and redirect. No Route Handler needed for checkout creation:

```typescript
// app/blueprint/actions.ts
'use server';
import Stripe from 'stripe';
import { redirect } from 'next/navigation';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function createBlueprintCheckout(
  email: string,
  quizSessionId: string,
  archetypeId: string
) {
  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: [{ price: process.env.STRIPE_BLUEPRINT_PRICE_ID!, quantity: 1 }],
    customer_email: email,
    success_url: `${process.env.NEXT_PUBLIC_URL}/blueprint/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_URL}/blueprint`,
    metadata: {
      quiz_session_id: quizSessionId, // string — metadata values must be strings
      archetype_id: archetypeId,
      email,
    },
  });
  redirect(session.url!); // Server Action redirect — no client-side URL needed
}
```

### Stripe Webhook — Route Handler Pattern

The webhook Route Handler is the authoritative fulfillment trigger. Use `req.text()` — not `req.json()` — for raw body access. This is the required pattern for App Router; the old `export const config = { api: { bodyParser: false } }` syntax is deprecated and ignored in Next.js 15+:

```typescript
// app/api/webhooks/stripe/route.ts
import Stripe from 'stripe';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: Request) {
  const body = await req.text(); // raw body required for signature verification
  const signature = (await headers()).get('stripe-signature')!;

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    // Check idempotency — Stripe retries webhooks; never process twice
    await fulfillBlueprint(session);
  }

  return NextResponse.json({ received: true });
}
```

**Critical idempotency:** Before generating the PDF, check Supabase to confirm this `session.id` has not already been fulfilled. Stripe retries failed webhooks; processing twice wastes compute and sends duplicate emails.

### PDF Generation — Route Handler Pattern

Use a Route Handler (not a Server Action) for PDF generation. Server Actions don't support streaming binary responses cleanly and can hit timeout limits for CPU-intensive work:

```typescript
// app/api/generate-blueprint-pdf/route.ts
import { renderToBuffer } from '@react-pdf/renderer';
import { BlueprintDocument } from '@/components/pdf/blueprint-document';

export async function POST(req: Request) {
  const { archetypeId, mirrorArchetypeId, email } = await req.json();

  // Build template data from local archetype content files (no AI calls)
  const data = buildBlueprintData(archetypeId, mirrorArchetypeId);

  const buffer = await renderToBuffer(<BlueprintDocument data={data} />);

  return new Response(buffer, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="your-blueprint.pdf"',
    },
  });
}
```

The `serverExternalPackages: ['@react-pdf/renderer']` config in `next.config.ts` is already in place — this resolves the "PDFDocument is not a constructor" error that occurs when Next.js tries to bundle the library instead of treating it as a Node.js external.

### Resend — PDF Attachment Pattern

Extend the existing `lib/email/send.ts` pattern with a new function:

```typescript
// lib/email/send.ts — add this function
export async function sendBlueprintPDF(to: string, pdfBuffer: Buffer) {
  if (!resend) {
    console.warn('[email] RESEND_API_KEY not set — skipping blueprint PDF email');
    return;
  }

  const { error } = await resend.emails.send({
    from: FROM_EMAIL,
    to,
    subject: 'Your Blueprint is here',
    html: blueprintDeliveryTemplate(),
    attachments: [
      {
        content: pdfBuffer.toString('base64'),
        filename: 'your-blueprint.pdf',
      },
    ],
  });

  if (error) {
    console.error('[email] Failed to send blueprint PDF email:', error);
  }
}
```

Resend accepts the PDF as a base64-encoded string in the `content` field. Size limit is 40MB total email (including base64 overhead); a 15-20 page PDF will be well under 5MB before encoding.

### Fulfillment Flow (Webhook → PDF → Email)

```
checkout.session.completed webhook fires
  → verify stripe signature (req.text() + constructEvent)
  → check Supabase: session already fulfilled? → skip (idempotent)
  → mark session as "processing" in Supabase
  → POST /api/generate-blueprint-pdf with archetype data
  → receive Buffer from renderToBuffer()
  → sendBlueprintPDF(email, buffer) via Resend
  → mark session as "fulfilled" in Supabase
  → return { received: true } to Stripe within 30s
```

**PDF storage is optional.** For v2, send PDF directly as email attachment. Supabase Storage + signed URL for re-download is a v2.1 addition if users request it.

---

## Environment Variables to Add

```bash
# Stripe
STRIPE_SECRET_KEY=sk_live_...        # server-only, never client-exposed
STRIPE_WEBHOOK_SECRET=whsec_...      # from Stripe CLI or dashboard webhook endpoint
STRIPE_BLUEPRINT_PRICE_ID=price_...  # create in Stripe dashboard (one-time, $39-49)

# No new Resend variables needed — RESEND_API_KEY and RESEND_FROM_EMAIL already defined
```

---

## Development Tooling

| Tool | Purpose | Notes |
|------|---------|-------|
| Stripe CLI | Local webhook forwarding | `stripe listen --forward-to localhost:3001/api/webhooks/stripe` — dev server runs on port 3001 per `package.json` |
| Stripe test cards | End-to-end payment testing | `4242 4242 4242 4242` (success), `4000 0000 0000 9995` (declined) |

---

## Alternatives Considered

| Category | Recommended | Alternative | Why Not |
|----------|-------------|-------------|---------|
| PDF generation | @react-pdf/renderer | Puppeteer + @sparticuz/chromium | 10-15s cold start on Vercel, 50MB+ bundle overhead, print CSS complexities. Use only if react-pdf cannot achieve design fidelity required (CSS Grid, complex image overlays). |
| PDF generation | @react-pdf/renderer | pdf-lib | Designed for manipulating existing PDFs, not authoring layouts from scratch. |
| Stripe integration | Server Action + redirect | Stripe Elements (embedded) | Embedded checkout requires `@stripe/react-stripe-js` dependency and more complex client-side state. Redirect Checkout handles PCI compliance and 3DS/SCA with zero extra code. Conversion difference is negligible for a $39-49 considered purchase. |
| Email delivery | Resend attachment | Supabase Storage signed URL in email body | Signed URLs expire; user loses access if they don't download in time. Attaching PDF directly guarantees delivery without dependency on storage availability. |
| Content generation | Template-driven (pre-written per archetype) | AI generation (Kimi, GPT-4o) | Decision confirmed in PROJECT.md: archetype data + pre-written content is rich enough; AI adds complexity without proportional value for a 9-archetype system with known content. |

---

## Version Compatibility

| Package | Version | Compatible With | Notes |
|---------|---------|-----------------|-------|
| `stripe` | ^20.4.1 | Node.js 16+ LTS | Server-side only. Never expose secret key to client. |
| `@react-pdf/renderer` | ^4.3.2 | React 19 (since v4.1.0), Node.js 18/20/22 | Must be in `serverExternalPackages`. Use `renderToBuffer` not `renderToStream` (stream is broken in Next.js 15+). |
| `resend` | ^6.9.3 (installed) | Node.js 18+ | `attachments` array accepts `{ content: base64string, filename: string }`. 40MB total email limit. |
| `next` | ^16.1.6 (installed) | React 19 | `serverExternalPackages` (not `serverComponentsExternalPackages`) is the correct config key. |

---

## Sources

- [Stripe Checkout quickstart — Next.js](https://docs.stripe.com/checkout/quickstart?client=next) — Route handler pattern, environment variable setup, webhook forwarding — HIGH confidence (official Stripe docs)
- [Stripe Next.js 2025 complete guide](https://www.pedroalonso.net/blog/stripe-nextjs-complete-guide-2025/) — Server Action checkout pattern; `req.text()` for webhook raw body; idempotency guidance; metadata string-only constraint — MEDIUM confidence (verified against Stripe official docs)
- [Next.js App Router Stripe webhook raw body](https://dev.to/thekarlesi/how-to-handle-stripe-and-paystack-webhooks-in-nextjs-the-app-router-way-5bgi) — Confirmed `req.text()` is the current pattern; `export const config = { api: { bodyParser: false } }` deprecated in Next.js 15+ — MEDIUM confidence (multiple community sources agree)
- [stripe npm releases](https://github.com/stripe/stripe-node/releases) — Version 20.4.1 current as of March 2026 — HIGH confidence
- [@react-pdf/renderer npm](https://www.npmjs.com/package/@react-pdf/renderer) — Version 4.3.2, last published December 2025, 1.19M weekly downloads — HIGH confidence
- [react-pdf issue #2994 Next.js 15 renderToStream broken](https://github.com/diegomura/react-pdf/issues/2994) — Confirmed `renderToBuffer` as workaround; `renderToStream` broken in Next.js 15 Route Handlers — HIGH confidence
- [react-pdf issue #3074 Next.js 15 renderToBuffer](https://github.com/diegomura/react-pdf/issues/3074) — `serverExternalPackages` config resolves "PDFDocument is not a constructor" in Next.js 15 — HIGH confidence
- [Resend attachments docs](https://resend.com/docs/dashboard/emails/attachments) — `{ content: base64, filename }` format; 40MB limit; attachments incompatible with batching endpoint — HIGH confidence (official Resend docs)
- [resend npm](https://www.npmjs.com/package/resend) — Version 6.9.3 installed (6.10.0 preview available) — HIGH confidence
- [Nutrient top JS PDF libraries 2026](https://www.nutrient.io/blog/top-js-pdf-libraries/) — Ecosystem survey confirming react-pdf, puppeteer, pdfkit, pdf-lib as primary options — MEDIUM confidence
- Existing codebase audit (`package.json`, `next.config.ts`, `lib/email/`) — confirmed installed packages, existing email patterns, serverExternalPackages already set — HIGH confidence

---

*Stack research for: The Blueprint — paid quiz-to-PDF product (v2 milestone)*
*Researched: 2026-03-13*
