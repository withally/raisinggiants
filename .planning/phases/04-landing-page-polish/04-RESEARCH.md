# Phase 4: Landing Page + Polish — Research

**Researched:** 2026-02-25
**Phase:** 04-landing-page-polish
**Requirements:** LAND-01, LAND-02, LAND-03, LAND-04, LAND-05

---

## What This Phase Builds

A complete replacement for the current `app/page.tsx` placeholder (which shows a centered title card with "Take the Quiz" button). Phase 4 builds a production-quality landing page that:

- Communicates the product ladder (Mirror → Blueprint → Partner Match) as a clear journey
- Establishes credibility through named KOL research attribution — not through Sophia's credentials
- Drives visitors into the quiz at `/quiz` via a prominent CTA
- Is fully mobile-responsive and loads fast

The landing page is the only page that needs to be built from scratch. The quiz engine (`/quiz`), the result page (`/result`), and the Product 2 coming-soon page (`/blueprint`) are built in Phases 2 and 3. The landing page links into them.

---

## Requirement Mapping

| Requirement | What It Means | Notes |
|-------------|---------------|-------|
| **LAND-01** | Value proposition communicates research-backed, expert-informed nature | Lead with "grounded in research from top parenting experts" — not generic quiz framing |
| **LAND-02** | Named KOL credibility signals with specific research attribution | Display real researchers (Gottman, Siegel, Baumrind, Kennedy, etc.) with specific work titles |
| **LAND-03** | Quiz start CTA that drives conversions | Primary CTA links to `/quiz` — must be prominent, above-the-fold, and repeated |
| **LAND-04** | Mobile-responsive design | Full-screen-width mobile layouts, thumb-friendly tap targets, fast load |
| **LAND-05** | Sophia's credentials and clinical authority visible | NOTE: per 04-CONTEXT.md, Sophia is NOT on the landing page — she belongs in About Us at most. LAND-05 is satisfied by the KOL credibility framework that backs the product, not Sophia's personal credentials. |

**Clarification on LAND-05:** There is a tension between REQUIREMENTS.md (which says "Sophia's credentials and clinical authority visible") and 04-CONTEXT.md (which explicitly says "Sophia is NOT on the landing page"). The CONTEXT document records the most recent user decision. LAND-05 should be interpreted as: *the clinical authority of the product must be communicated* — and the chosen mechanism is KOL research attribution, not Sophia's personal bio. This is the correct interpretation and avoids building something the user has explicitly decided against.

---

## What Already Exists

### Current `app/page.tsx`

A minimal placeholder:

```tsx
// app/page.tsx (current state — placeholder only)
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-amber-50 p-8">
      <div className="text-center max-w-lg">
        <h1 className="text-3xl font-semibold text-stone-800 mb-4">Your Parenting Blueprint</h1>
        <p className="text-lg text-stone-600 mb-8">...</p>
        <Link href="/quiz">Take the Quiz</Link>
      </div>
    </main>
  );
}
```

This file is replaced entirely in Phase 4. No content or structure survives.

### Project name / branding to update

The current codebase uses "Your Parenting Blueprint" as the product name (visible in `app/layout.tsx` metadata and `app/quiz/page.tsx` metadata). After the product ladder pivot, the landing page should reflect the correct product name: **Raising Giants** (brand) with **The Mirror** as the free entry product. The `layout.tsx` title and metadata will need updating too.

### Design system already in place

The codebase uses:
- **Tailwind CSS v4** with `@theme inline` configuration in `globals.css`
- **Geist Sans** from Google Fonts (loaded in `layout.tsx`)
- **shadcn/ui** components in `components/ui/`
- Color palette: warm amber (`amber-50`, `amber-500`, `amber-600`), stone (`stone-600`, `stone-700`, `stone-800`)
- Border radius: `--radius: 0.625rem` with scale up to `--radius-4xl`

The landing page should extend this warm palette but can introduce new typographic choices and layout patterns — the SKILL.md frontend-design guidance applies here: choose a distinctive aesthetic direction and execute it with intentionality.

### KOL data already in the codebase

`/Users/yikfaiivanli/Projects/raisinggiants/lib/archetypes/archetypes.ts` contains rich citation data for every archetype, including researcher name, work title, year, and relevance note. The KOL synthesis in `.planning/phases/00-archetype-framework/kol-synthesis.md` documents 16+ researchers with their frameworks. This is the source material for LAND-02 credibility signals — no new content needs to be written.

Key researchers available for attribution on the landing page:
- Diana Baumrind — "Child care practices anteceding three patterns of preschool behavior" (1967)
- John Gottman — "Raising an Emotionally Intelligent Child" (1997)
- Daniel J. Siegel — "The Developing Mind" (2012), "Parenting from the Inside Out" (2003, with Hartzell)
- Mary Ainsworth — Strange Situation / Attachment Theory (1978)
- Dr. Becky Kennedy — "Good Inside" (2022)
- Shefali Tsabary — "Conscious Parenting" (2010)
- Bessel van der Kolk — "The Body Keeps the Score" (2014)
- Ronald P. Rohner — IPARTheory / PARQ (validated across 60+ cultures)

---

## Architecture Decisions

### Route and file structure

The landing page lives at `app/page.tsx` — the root route. This is already the correct location. No new routes needed.

The landing page is a **Server Component** (no interactivity required on the page itself — the quiz CTA is just a `<Link>`). No `"use client"` directive needed unless animations require client-side JavaScript (CSS-only animations preferred for performance).

```
app/
  page.tsx                    ← REPLACED entirely in Phase 4
  layout.tsx                  ← UPDATE: title, description metadata
  (marketing)/                ← Optional route group if layout differs from quiz
```

**Route group consideration:** The quiz and result pages use the same root layout as the landing page. If the landing page needs a different `<body>` background or navigation structure, consider wrapping it in a `(marketing)` route group with its own `layout.tsx`. However, given the quiz already uses `bg-amber-50` and the landing page will likely share the same warm base, a route group is probably not necessary for Phase 4. Defer this decision to planning.

### Component structure for the landing page

The landing page will have multiple visual sections. Each section should be a dedicated component file to keep `app/page.tsx` readable and enable independent iteration.

Recommended component location: `components/landing/` (new directory, created in Phase 4).

Likely sections (exact composition decided in planning):
- Hero section (above the fold — headline, subheadline, primary CTA)
- Product ladder section (Mirror → Blueprint → Partner Match journey)
- KOL credibility section (named researchers with attribution)
- How it works / quiz preview section (optional social proof / process)
- Secondary CTA section (repeat the quiz start CTA before footer)
- Footer (minimal — links, brand)

### No new dependencies needed

The landing page requires no new npm packages. Everything needed is already installed:
- Tailwind CSS v4 for styling
- `next/link` and `next/image` for navigation and optimized images (if needed)
- `next/font/google` for any additional font loading (already wired in `layout.tsx`)
- shadcn/ui components if needed (buttons, etc.)

### Performance considerations for LAND-04

Landing pages are performance-critical because they are the first impression and affect Core Web Vitals (which affect SEO and ad performance). Key considerations:

1. **Images:** Any researcher portraits or decorative images must use `next/image` with explicit `width`, `height`, and `priority` on above-the-fold images. Avoid large decorative images for v1 — use CSS-based visual elements instead.

2. **Fonts:** Geist Sans is already loaded with `next/font/google` (subsetting + self-hosting handled automatically by Next.js). If a second display font is added for the landing page, load it the same way — not via a `<link>` tag or Google Fonts CDN URL.

3. **Animations:** CSS-only animations (`@keyframes`, `animation`) have zero JavaScript overhead. Use them over JavaScript-driven animations for the landing page. Motion library (`framer-motion`) is not installed and should not be added just for landing page polish.

4. **Static rendering:** The landing page has no dynamic data — it should be fully statically generated at build time (`generateStaticParams` is not needed; Next.js App Router statically renders Server Components with no dynamic data by default).

5. **No client components unless necessary:** Avoid `"use client"` on landing page components. If a section needs a hover effect or scroll-triggered reveal, use CSS-only techniques (`:hover`, `@supports`, `IntersectionObserver` via a minimal client component wrapper).

---

## Content Architecture

### Headline strategy

Per 04-CONTEXT.md decisions:
- Headline speaks to the **larger aspiration** (helping people become better parents) not just "see what your parents did"
- Tone: warm, empathetic, personal — "you've always sensed this" energy
- Research backs it up but warmth leads

The quiz is framed as "the starting point of a journey" — the headline should position it that way.

**Headline candidate direction** (exact copy decided in planning):
The subtext to communicate: *You absorbed more from your childhood than you realize. Understanding it is how you change it.*

### Product ladder presentation

All three products must appear on the landing page. The user decision is explicit:

> "Show the full product ladder explicitly on the landing page: Mirror → Blueprint → Partner Match"
> "Visitors should see the complete vision so they understand where this goes"

**Mirror** — free entry. "Understand your upbringing." CTA: Take the free quiz.
**Blueprint** — paid. "Understand your own tendencies and aspirations." Status: Coming soon.
**Partner Match** — premium. "Have a dialogue with your partner about parenting." Status: Coming soon.

The ladder creates context — visitors understand the Mirror isn't the whole product, which increases perceived value and justifies taking the quiz even for people who don't yet intend to pay.

### KOL credibility signals (LAND-02)

The credibility section must show **named researchers** with **specific research attribution** — not generic "based on research" language. This is what differentiates the product from pop psychology quizzes.

Format options (decided in planning):
- **Researcher cards:** Photo (if available/appropriate) + name + framework contribution + work title
- **Quote pull-outs:** Brief insight attributed to a specific researcher with work citation
- **Inline citations:** Within copy, like "Gottman's 40 years of research on emotional coaching..." with footnote
- **Research mosaic:** Grid of researcher names + key insight (brief, scannable)

**Recommended approach for Phase 4:** A visual grid of 6-8 researchers with name, one-line framework contribution, and work title. This is scannable on mobile and authoritative without requiring photos or long bios. The data for this already exists in `kol-synthesis.md` and `archetypes.ts`.

Researchers to feature (suggested — exact selection decided in planning):
1. Diana Baumrind — authoritative parenting framework (the foundational model)
2. John Gottman — emotional coaching and repair research
3. Daniel J. Siegel — interpersonal neurobiology, narrative coherence
4. Mary Ainsworth — attachment theory
5. Dr. Becky Kennedy — repair as the cornerstone of connection
6. Shefali Tsabary — conscious parenting
7. Bessel van der Kolk — intergenerational relational trauma
8. Ronald P. Rohner — cross-cultural parental acceptance (60+ cultures validated)

### CTA strategy (LAND-03)

Per 04-CONTEXT.md: "A prominent quiz start CTA drives visitors into the quiz flow."

The quiz starts at `/quiz`. The CTA links there directly — no intermediate page.

CTA placement decisions:
- **Above the fold:** Primary CTA must be visible without scrolling on all viewports
- **After product ladder:** Secondary CTA after users understand the full journey
- **After KOL section:** Third CTA placement once credibility is established

CTA copy should be action-oriented and specific to the Mirror (free, no commitment):
- "Discover your parents' parenting style — it's free" (emphasizes no cost, specific outcome)
- "Take the free quiz" (simple, direct)
- "Begin your mirror" (evocative, brand-aligned)

Exact copy decided in planning.

---

## Mobile Responsiveness (LAND-04)

The existing quiz is built mobile-first with Tailwind's responsive utilities. The landing page should follow the same approach.

Key mobile considerations:
- **Hero section:** Single-column layout on mobile, potentially two-column on large screens
- **Product ladder:** Stacked cards on mobile (vertical progression), horizontal row on desktop
- **KOL grid:** 2-column on mobile, 3-4 column on desktop
- **CTAs:** Full-width buttons on mobile (easier tap targets), auto-width centered on desktop
- **Typography:** Larger base font sizes on mobile for readability; display type scales down gracefully

Tailwind v4 responsive approach: use the `sm:`, `md:`, `lg:` prefixes. The existing codebase uses this pattern consistently.

---

## Design Direction (Claude's Discretion)

Per 04-CONTEXT.md, the following are explicitly left to Claude's discretion:
- Visual tone, layout structure, above-the-fold design
- Section ordering and flow
- CTA placement, copy, and conversion approach
- How KOL credibility signals are displayed
- Light vs dark theme, color palette, typography
- Animation and interaction design
- Mobile-specific layout adaptations

**Frontend-design SKILL.md guidance applies:** Choose a distinctive aesthetic and execute it with precision. The existing quiz uses warm amber/stone palette — the landing page should feel cohesive but can elevate the design further.

**Aesthetic direction for planning to consider:**
- The product's emotional register: warm, reflective, personal, slightly literary — not clinical, not corporate, not childish
- Reference design categories: editorial/magazine (long-form journalism feel), warm editorial (The Atlantic meets therapy workbook), or refined organic (natural textures, warm off-whites, hand-lettered touches)
- Typography: the current Geist Sans is functional but generic for a landing page. A distinctive display font for headlines elevates perceived quality. Candidates: Playfair Display (editorial warmth), Lora (literary warmth), DM Serif Display (modern editorial), Cormorant Garamond (refined literary). Body text can stay Geist Sans or move to a warm humanist sans.
- Avoid: purple gradients, Inter/Roboto, standard "startup landing page" layout patterns

---

## Plan Decomposition (Expected)

Phase 4 is a contained build. Expected plan count: **2-3 plans**.

**Plan 04-01: Landing page core** — The full landing page at `app/page.tsx` with all sections (hero, product ladder, KOL credibility, CTA). This is the majority of the work.

**Plan 04-02: Metadata + polish** — Update `app/layout.tsx` title/metadata to reflect the correct product name ("Raising Giants — The Mirror"), add any missing SEO metadata (Open Graph, description), and verify mobile responsiveness. May also include any content refinements to the landing page copy from Plan 04-01.

**Optional Plan 04-03: Typography/font upgrade** — If the distinctive display font needs to be added to `layout.tsx` and scoped only to landing page components, this could be a separate small plan. Alternatively this is folded into 04-01.

---

## Pitfalls and Risks

### Risk 1: Metadata drift between landing page and quiz
The current `app/layout.tsx` has `title: "Your Parenting Blueprint"` and a description referencing "parenting archetype." After the product ladder pivot, the brand is "Raising Giants" and the product is "The Mirror." The layout.tsx metadata must be updated in this phase to avoid the old name appearing in browser tabs and search results.

### Risk 2: LAND-05 / Sophia misinterpretation
The REQUIREMENTS.md says "Sophia's credentials and clinical authority visible" but the CONTEXT.md explicitly says Sophia is not on the landing page. Building a Sophia bio section would contradict the user's explicit decision. The correct interpretation is: the *framework's* clinical authority is communicated through KOL attribution, not a personal bio. If unclear, confirm with user before planning.

### Risk 3: Product ladder CTA confusion
The landing page shows three products but only Mirror is live. Blueprint and Partner Match are "coming soon." The CTA must be unambiguous — only Mirror has a live quiz link. Blueprint and Partner Match should show "coming soon" labels, not clickable CTAs that lead nowhere. The coming-soon page for Blueprint is built in Phase 3 (`/blueprint`) — the landing page can link to it if it exists.

### Risk 4: Over-engineering for a static page
The landing page has no dynamic data, no authentication, and no form submissions (except the CTA link to `/quiz`). It should be a fast, statically rendered Server Component. Avoid adding `"use client"` unnecessarily, which would cause the page to re-render on every navigation.

### Risk 5: Font loading strategy
If a new display font is introduced for landing page headlines, it must be loaded via `next/font/google` in `layout.tsx` or in a dedicated `(marketing)/layout.tsx` — not via a Google Fonts `<link>` tag in the HTML, which introduces a render-blocking request and fails the performance goals of LAND-04.

---

## Success Verification Criteria

When Phase 4 plans are complete, these must all be TRUE:

1. Navigating to `/` shows the full landing page — not the old placeholder
2. The page loads in under 3 seconds on a simulated 3G mobile connection (Lighthouse mobile score)
3. All three products (Mirror, Blueprint, Partner Match) are visible and their relationship is clear
4. At least 6 named KOL researchers appear with specific work attribution (name + work title)
5. The quiz CTA is visible above the fold on mobile (375px viewport)
6. No mention of Sophia's personal credentials appears on the landing page
7. `app/layout.tsx` metadata reflects the correct product name (Raising Giants / The Mirror)
8. The design is visually distinct from the current placeholder and reflects the warm, empathetic brand tone

---

*Phase: 04-landing-page-polish*
*Researched: 2026-02-25*
