# Stack Research

**Domain:** Personalized quiz-to-premium-PDF parenting assessment (Next.js / Vercel / Supabase / Stripe / Moonshot AI)
**Researched:** 2026-02-23
**Confidence:** MEDIUM-HIGH (core framework stack HIGH; PDF generation approach MEDIUM due to active Next.js 15 compatibility issues; Kimi API MEDIUM due to limited ecosystem documentation)

---

## Recommended Stack

### Core Technologies

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| Next.js | 15.5.x (latest stable) | Full-stack React framework | App Router + Server Actions eliminate the need for a separate API layer. Server Actions directly create Stripe Checkout sessions without additional route handlers, reducing attack surface. Vercel-native deployment means zero config. |
| React | 19.x | UI rendering | Required by Next.js 15.5. React 19 includes native async handling that simplifies Server Actions and form submissions. |
| TypeScript | 5.x | Type safety | Strict typing prevents entire categories of bugs in quiz scoring logic, PDF template rendering, and Stripe webhook payloads. Non-negotiable for a payment-handling product. |
| Tailwind CSS | 4.x | Utility styling | v4 is stable (February 2025 shadcn/ui milestone). New `@theme` directive enables design token customization that maps directly to the warm/approachable brand palette without fighting the framework. |
| shadcn/ui | Latest (post-Feb 2025) | Component primitives | Not a dependency — it copies component source into your repo. All components updated for Tailwind v4 + React 19. Radix UI accessibility foundations included. Use for quiz radio groups, progress indicators, and modal sheets. |
| Supabase | `@supabase/supabase-js` 2.80.x + `@supabase/ssr` 0.8.x | Database + auth | Postgres with Row Level Security. `@supabase/ssr` is the current official package (replaces deprecated `auth-helpers`). Stores quiz sessions, responses, payment records, and PDF delivery status. |
| Stripe | `stripe` 20.3.x (Node SDK) | Payments | Stripe Checkout (redirect) handles PCI compliance, SCA/3DS, and receipt emails out of the box. Webhook `checkout.session.completed` is the authoritative fulfillment trigger. |
| Moonshot AI Kimi 2.5 | `kimi-k2.5` model via OpenAI SDK | Content personalization | OpenAI-compatible API: use `openai` npm package with `baseURL: "https://api.moonshot.cn/v1"` and `apiKey: process.env.MOONSHOT_API_KEY`. 256K context window handles full quiz responses + generation prompt in one call. |
| Resend | `resend` 6.9.x | Transactional email + PDF delivery | Send generated PDF as email attachment after payment. `react-email` 5.x integration allows branded HTML emails. More reliable than Supabase Storage download links for instant digital delivery. |

### PDF Generation (Detailed Rationale)

This is the highest-risk technical decision. Two viable approaches exist — the right choice depends on design complexity needs.

#### Option A (Recommended): @react-pdf/renderer — Component-based PDF authoring

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| @react-pdf/renderer | 4.3.2 | Author PDF templates as React components | All PDF pages — cover, archetype section, reflection prompts, research snippets |
| Custom fonts via `Font.register()` | — | Register warm/approachable Google Fonts (e.g., Lora, Inter) | Required for non-default typefaces |

**Why @react-pdf/renderer:**
- Author PDFs in JSX with Flexbox layout — the closest mental model to building web UIs
- Supports custom fonts, SVG illustrations, background colors/gradients, images
- Generates PDFs server-side via `renderToBuffer()` — output is a `Buffer` ready for Resend attachment
- 1.19M weekly downloads; actively maintained (4.3.2 published December 2025)
- Reviewer at dmitriiboikov.com (January 2025): "For me, it's the number one library now for PDF generation"

**Known limitation — Next.js 15 renderToStream bug:**
There is an open GitHub issue (#2994) reporting `renderToStream` broken in Next.js 15 App Router route handlers (confirmed January 2025, not yet resolved). **Mitigation: use `renderToBuffer()` instead of `renderToStream()` inside a Route Handler (`app/api/generate-pdf/route.ts`), not a Server Action.** `renderToBuffer()` returns a Promise resolving to a Node.js Buffer, which sidesteps the stream incompatibility. Add `@react-pdf/renderer` to `serverExternalPackages` in `next.config.ts`.

```typescript
// next.config.ts
const nextConfig = {
  serverExternalPackages: ['@react-pdf/renderer'],
};
```

```typescript
// app/api/generate-pdf/route.ts
import { renderToBuffer } from '@react-pdf/renderer';
import { MyPDFDocument } from '@/components/pdf/blueprint-document';

export async function POST(req: Request) {
  const data = await req.json();
  const buffer = await renderToBuffer(<MyPDFDocument data={data} />);
  return new Response(buffer, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="your-blueprint.pdf"',
    },
  });
}
```

#### Option B (Fallback): Puppeteer + @sparticuz/chromium — HTML-to-PDF

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| puppeteer-core | Latest | Drive headless Chrome | Only if react-pdf's layout system cannot achieve the required design fidelity |
| @sparticuz/chromium | Latest | Serverless-compatible Chromium binary | Required for Vercel — standard puppeteer bundle exceeds 250MB limit |

**Why NOT Option B for this product:**
- Cold start overhead on Vercel: 10-15 seconds to download/unpack Chromium (leads to timeouts on free/hobby tier)
- Bundle size requires careful configuration to stay under Vercel's 250MB limit
- HTML/CSS designed for screen often needs significant rework for print/PDF (page breaks, orphans/widows)
- Higher operational complexity vs. @react-pdf/renderer's self-contained approach
- **Only use if** the design requires CSS features react-pdf cannot handle (e.g., CSS Grid, CSS animation, complex background-image positioning)

### Quiz Flow & Form Management

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| Zustand | 5.0.11 | Quiz state (responses, current step, archetype score) | Persists responses across all quiz steps in client memory; use `persist` middleware with `sessionStorage` to survive page refresh |
| React Hook Form | 7.71.x | Per-step form field management + validation | Manages controlled inputs for each question step; `zodResolver` adapter connects to Zod schemas |
| Zod | 4.3.x | Schema validation | Validates each step's responses before advancing; prevents invalid data reaching AI generation |
| nuqs | 2.8.x | URL-synced quiz step state | Stores current step in URL query param (`?step=3`); enables browser Back button navigation; shareability of quiz link at any step |

**Pattern: Zustand + React Hook Form + nuqs**
```
URL (?step=N) → nuqs → current step display
User answers → React Hook Form → Zod validation → Zustand store
Zustand store → final payload for AI generation
```
Zustand handles cross-step accumulation (React Hook Form only manages the current step's values). nuqs handles URL state for navigation. Zod provides per-step validation schemas with clear error messages.

### Infrastructure & Deployment

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Vercel | — | Hosting + CDN + Serverless Functions | Native Next.js deployment; Fluid compute for PDF generation functions avoids cold-start penalties; automatic preview deployments per branch |
| Supabase (managed Postgres) | — | Database | Stores quiz sessions, responses, Stripe payment records, PDF generation status; RLS policies enforce data access |
| Supabase Storage | — | PDF file storage (optional) | Store generated PDFs for re-download; use signed URLs for secure access; supplement email delivery |

### Development Tools

| Tool | Purpose | Notes |
|------|---------|-------|
| Stripe CLI | Local webhook testing | `stripe listen --forward-to localhost:3000/api/webhooks/stripe` — test fulfillment flow without deploying |
| Stripe Dashboard (test mode) | Payment simulation | Use test card `4242 4242 4242 4242` for end-to-end testing |
| Supabase local dev | Local Postgres + auth | `npx supabase start` spins up local instance; use `supabase db diff` for migrations |
| Biome | Linting + formatting | Next.js 15.5 deprecates `next lint`; Biome replaces ESLint + Prettier in one fast tool |

---

## Installation

```bash
# Core framework (create new project)
npx create-next-app@latest raisinggiants --typescript --tailwind --app

# Database + auth
npm install @supabase/supabase-js @supabase/ssr

# Payments
npm install stripe

# AI content generation (use OpenAI SDK with Moonshot base URL)
npm install openai

# Email delivery
npm install resend react-email @react-email/components

# PDF generation
npm install @react-pdf/renderer

# Quiz form management
npm install react-hook-form zod @hookform/resolvers zustand nuqs

# UI components (shadcn — installs via CLI, not npm)
npx shadcn@latest init

# Dev tools
npm install -D @biomejs/biome
npx supabase init
```

---

## Alternatives Considered

| Category | Recommended | Alternative | Why Not |
|----------|-------------|-------------|---------|
| PDF generation | @react-pdf/renderer | Puppeteer + @sparticuz/chromium | Cold starts (10-15s), bundle size complexity, operational overhead for Vercel serverless. Only valid fallback if design requires CSS Grid or complex background-image positioning that react-pdf cannot handle. |
| PDF generation | @react-pdf/renderer | pdf-lib | pdf-lib is excellent for programmatic PDF manipulation (fill existing forms, merge documents) but requires thinking in PDF coordinate space (y=0 at bottom). Not suited for building document layouts from scratch. |
| PDF generation | @react-pdf/renderer | pdfmake | JSON-declarative structure is less intuitive for component-based design. Server-side issues reported in 2025. |
| Quiz state | Zustand | URL state only (nuqs) | URL state max length is ~2000 chars; 10-20 min quiz with 30+ questions exceeds this. Use nuqs for step index only, Zustand for response accumulation. |
| Quiz state | Zustand | Redux Toolkit | Redux is overkill for a single-flow quiz app. Zustand has a simpler API, smaller bundle, and less boilerplate. |
| Quiz state | Zustand | React context | Context re-renders entire tree on every state change — unacceptable for a multi-step form with 30+ questions. |
| Email delivery | Resend | SendGrid / Mailgun | Resend has native React component templates (`react-email`) and cleaner DX. SendGrid and Mailgun require HTML string templates. Resend free tier: 3,000 emails/month. |
| Email delivery | Resend | Supabase Storage download link only | Download links expire; users lose access if email contains only link. Attach PDF directly to email for guaranteed delivery. |
| AI integration | openai SDK + Moonshot baseURL | Moonshot SDK (if one exists) | OpenAI SDK is the standard; Kimi 2.5 is explicitly OpenAI-compatible. No custom SDK needed — just set `baseURL` and `apiKey`. Reduces dependencies. |
| Payments | Stripe Checkout (redirect) | Stripe Elements (embedded) | Checkout redirect is simpler (fewer PCI compliance steps), handles 3DS/SCA automatically, and works without JavaScript-heavy checkout page. For a $14 one-time product, conversion loss from redirect is minimal. |
| Component library | shadcn/ui | Chakra UI / MUI | shadcn copies source into your project — no version lock-in, full customization. Chakra/MUI force you into their design system. For a brand-specific aesthetic (therapy workbook meets Canva premium), shadcn's transparency wins. |
| Linting | Biome | ESLint + Prettier | Next.js 15.5 deprecates `next lint`; Biome is 10-100x faster, single tool for lint + format, and Next.js now scaffolds Biome as a first-class option. |

---

## What NOT to Use

| Avoid | Why | Use Instead |
|-------|-----|-------------|
| Standard `puppeteer` npm package on Vercel | Bundle exceeds Vercel's 250MB limit; causes deployment failures | `puppeteer-core` + `@sparticuz/chromium` IF puppeteer route is chosen |
| `renderToStream()` from @react-pdf/renderer in Next.js 15 | Open bug (#2994, unresolved as of Jan 2025) — crashes route handlers in App Router | `renderToBuffer()` in a Route Handler with `serverExternalPackages` config |
| Server Actions for PDF generation | PDF generation is CPU-intensive and can exceed Server Action timeouts; Server Actions don't support streaming binary responses cleanly | Route Handler (`app/api/generate-pdf/route.ts`) returning `Response` with binary buffer |
| Client-side PDF generation | Exposes AI prompt logic and quiz scoring algorithm in browser; also slow on low-end devices | Server-side `renderToBuffer()` in Route Handler |
| `@supabase/auth-helpers-nextjs` | Deprecated; officially replaced by `@supabase/ssr` in 2024 | `@supabase/ssr` 0.8.x with `createBrowserClient` / `createServerClient` |
| Trusting Stripe success URL for fulfillment | Users can navigate to success URL without paying; easy to spoof | Stripe webhook `checkout.session.completed` as the only authoritative fulfillment trigger |
| Fully AI-generated PDF content | Hallucination risk; no consistent structure; PDF length unpredictable | Templated sections with AI-personalized paragraphs only; AI fills slots in fixed structure |
| Storing quiz responses only in URL state (nuqs) | URL has ~2000 char limit; 30+ question quiz blows this | Zustand for response accumulation; nuqs for step index only |
| jsPDF | Synchronous blocking; poor layout capabilities; generates PDFs by drawing primitives at coordinates rather than component-based flow | @react-pdf/renderer |

---

## Stack Patterns by Variant

**If @react-pdf/renderer renderToBuffer fails in Route Handler (edge case compatibility issues):**
- Use Vercel's Fluid compute with a Node.js runtime route and `serverExternalPackages: ['@react-pdf/renderer']`
- Consider pinning to `@react-pdf/renderer` 3.4.x (last v3 release) which has documented stability in Next.js 14/15

**If PDF design requirements exceed @react-pdf/renderer capabilities (e.g., CSS Grid, complex overlapping elements):**
- Fall back to Puppeteer + @sparticuz/chromium
- Design the PDF as a Next.js page at `/pdf/blueprint/[sessionId]` with print CSS
- Use a Vercel Function with extended timeout (60s) for PDF generation
- Cache generated PDFs in Supabase Storage; serve signed URL on repeat download requests

**If Kimi 2.5 API is unavailable or rate-limited:**
- OpenAI SDK allows swapping `baseURL` and `model` as environment variables
- Design AI integration to be provider-agnostic from day one; abstract behind a `generatePersonalizedContent(prompt)` function
- Fallback: GPT-4o-mini at `api.openai.com/v1` with model `gpt-4o-mini`

**If quiz has branching logic (adaptive questions based on answers):**
- Replace linear nuqs step counter with a step-graph computed by a `getNextStep(currentStep, responses)` function
- Zustand store holds both responses and the computed step sequence
- nuqs still tracks current step index in URL for Back button support

---

## Version Compatibility Matrix

| Package | Version | Compatible With | Notes |
|---------|---------|-----------------|-------|
| `next` | 15.5.x | React 19.x | React 19 required (not optional) in Next.js 15.3+ |
| `@react-pdf/renderer` | 4.3.2 | React 19 (since 4.1.0), Node.js 18/20/22 | Add to `serverExternalPackages`; use `renderToBuffer` not `renderToStream` |
| `zustand` | 5.0.11 | React 18+ | Dropped React < 18 support; uses native `useSyncExternalStore` |
| `zod` | 4.3.x | TypeScript 5.x | Zod v4 has breaking API changes from v3; ~57% smaller bundle |
| `@supabase/supabase-js` | 2.80.x | Node.js 20+ | Dropped Node.js 18 support in 2.79.0 |
| `stripe` (Node SDK) | 20.3.x | Node.js 16+ LTS | Server-side only; never expose secret key client-side |
| `tailwindcss` | 4.x | Next.js 15.x | No `tailwind.config.js` — configuration via CSS `@theme` directive |
| `shadcn/ui` | Post-Feb 2025 CLI | Tailwind v4, React 19 | Updated for Tailwind v4 in February 2025 shadcn changelog |
| `nuqs` | 2.8.x | Next.js App Router, React 19 | Used by Vercel, Supabase, Clerk in production |

---

## Kimi API Integration Pattern

```typescript
// lib/ai/kimi.ts
import OpenAI from 'openai';

const kimi = new OpenAI({
  apiKey: process.env.MOONSHOT_API_KEY!,
  baseURL: 'https://api.moonshot.cn/v1',
});

export async function generateBlueprintSection(
  archetypeId: string,
  quizResponses: QuizResponses,
  sectionType: 'origin_profile' | 'cultural_insights' | 'reflection_prompts' | 'conversation_starters'
): Promise<string> {
  const completion = await kimi.chat.completions.create({
    model: 'kimi-k2.5',
    messages: [
      { role: 'system', content: SYSTEM_PROMPT_BY_SECTION[sectionType] },
      { role: 'user', content: buildPrompt(archetypeId, quizResponses, sectionType) },
    ],
    max_tokens: 800,
    temperature: 0.7,
  });
  return completion.choices[0].message.content ?? '';
}
```

Key points:
- Model ID: `kimi-k2.5` (confirmed via Kimi K2.5 API documentation and OpenRouter listing)
- Context window: 256K tokens — sufficient for full quiz responses + detailed prompt in one call
- Pricing: $0.60/1M input tokens (cache miss), $3.00/1M output tokens
- Generate each PDF section independently (origin profile, cultural insights, reflection prompts, conversation starters) — enables parallel generation with `Promise.all()`

---

## Stripe Checkout Flow Pattern

```
User clicks "Get My Full Blueprint ($14)"
  → Server Action: create Stripe Checkout Session
      → session.metadata = { quizSessionId, email, archetypeId }
      → success_url = /blueprint/success?session_id={CHECKOUT_SESSION_ID}
      → cancel_url = /results
  → Redirect to Stripe-hosted Checkout page
  → Payment completes
  → Stripe fires checkout.session.completed webhook
      → /api/webhooks/stripe Route Handler
      → Verify Stripe signature (svix or stripe.webhooks.constructEvent)
      → Trigger: generatePDF(quizSessionId) → attach to Resend email → send to customer
      → Mark session as fulfilled in Supabase
  → User lands on /blueprint/success
      → Page also calls fulfill_checkout (idempotent) as backup
      → Shows "Check your email" + download link if PDF already ready
```

**Critical:** Never trigger PDF generation from the success URL redirect alone. Always trigger from the webhook. The success URL is a convenience UX path only.

---

## Sources

- [Next.js 15.5 release blog](https://nextjs.org/blog/next-15-5) — Version confirmed 15.5, August 18 2025; Turbopack builds beta; Node.js middleware stable — HIGH confidence
- [Next.js 16 upgrade guide](https://nextjs.org/docs/app/guides/upgrading/version-16) — Next.js 16 signaled but not yet released; 15.5 is current stable — HIGH confidence
- [@react-pdf/renderer npm](https://www.npmjs.com/package/@react-pdf/renderer) — Version 4.3.2, 1.19M weekly downloads — HIGH confidence
- [react-pdf GitHub issue #2994](https://github.com/diegomura/react-pdf/issues/2994) — Next.js 15 renderToStream bug, unresolved Jan 2025 — HIGH confidence
- [react-pdf compatibility docs](https://react-pdf.org/compatibility) — Node.js 18/20/22; Next.js ≥ 14.1.1; `serverExternalPackages` workaround — HIGH confidence
- [dmitriiboikov.com PDF library comparison Jan 2025](https://dmitriiboikov.com/posts/2025/01/pdf-generation-comarison/) — @react-pdf/renderer ranked #1, pdfmake server-side issues noted — MEDIUM confidence (single author review)
- [Kimi K2.5 API developer guide](https://kimi-k25.com/blog/kimi-k2-5-api) — Model ID `kimi-k2.5`, baseURL `api.moonshot.cn/v1`, 256K context, OpenAI-compatible — MEDIUM confidence (third-party blog, verified against OpenRouter listing)
- [OpenRouter Kimi K2.5 listing](https://openrouter.ai/moonshotai/kimi-k2.5) — Confirms model availability and OpenAI-compatible API — MEDIUM confidence
- [Stripe fulfillment docs](https://docs.stripe.com/checkout/fulfillment) — `checkout.session.completed` event; idempotent `fulfill_checkout` pattern; dual webhook + success page approach — HIGH confidence (official Stripe docs)
- [stripe-node releases](https://github.com/stripe/stripe-node/releases) — Version 20.3.1 — HIGH confidence
- [Zustand npm](https://www.npmjs.com/package/zustand) — Version 5.0.11, 5,650 dependents — HIGH confidence
- [React Hook Form npm](https://www.npmjs.com/package/react-hook-form) — Version 7.71.2 — HIGH confidence
- [Zod v4 release notes](https://zod.dev/v4) — Version 4.3.6; stable August 2025; 57% smaller bundle, 14x faster parsing — HIGH confidence
- [nuqs npm](https://www.npmjs.com/package/nuqs) — Version 2.8.8; used by Vercel, Supabase, Clerk — HIGH confidence
- [resend npm](https://www.npmjs.com/package/resend) — Version 6.9.2 — HIGH confidence
- [@supabase/supabase-js](https://www.npmjs.com/package/@supabase/supabase-js) — Version 2.80.0; Node.js 20+ required — HIGH confidence
- [shadcn/ui Tailwind v4 docs](https://ui.shadcn.com/docs/tailwind-v4) — All components updated Feb 2025 for Tailwind v4 + React 19 — HIGH confidence
- [Vercel Puppeteer deployment guide](https://vercel.com/kb/guide/deploying-puppeteer-with-nextjs-on-vercel) — Bundle size 250MB limit; @sparticuz/chromium required — HIGH confidence (official Vercel docs)
- [buildwithmatija.com multi-step form tutorial](https://www.buildwithmatija.com/blog/master-multi-step-forms-build-a-dynamic-react-form-in-6-simple-steps) — React Hook Form + Zustand + Zod multi-step pattern — MEDIUM confidence (verified by multiple sources)

---

*Stack research for: Personalized quiz-to-PDF parenting assessment (Your Parenting Blueprint)*
*Researched: 2026-02-23*
