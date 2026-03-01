# Phase 5: Landing Page Rebuild — Research

**Researched:** 2026-03-01
**Domain:** Next.js 16 landing page — visual design implementation, component architecture, KOL data sourcing, mobile-responsive layout, FAQ accordion pattern
**Confidence:** HIGH (codebase is fully readable; visual direction is locked; tech stack is established)

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**Conversion Architecture:**
- Single CTA throughout the entire page: "Take The Mirror" → routes to /quiz
- No competing CTAs (no Blueprint waitlist, no email capture on product cards)
- Every section that can host a CTA should have one (hero, Mirror product card, final section)

**Page Sections & Order (6-8 sections):**
1. Hero — Existing prototype (Variant A: Warm Solid). Asymmetric 7/5 grid, butter hero card, pills, headline, dual CTAs
2. Emotional hook — Below-the-fold opening. Bridges from hero headline to the "why" (recognition phase of the arc)
3. How it works — Process — 3-step visual: Take the quiz → Get your Mirror result → Understand your patterns
4. How it works — Science — The research foundation: 11 dimensions, 9 archetypes, research-backed methodology
5. KOL Credibility — Named researcher cards with research snippets
6. Product Ladder — Three side-by-side cards: Mirror (live), Blueprint (coming soon), Partner Match (future)
7. About Sophia — Dedicated section for clinical co-founder credentials, photo, personal connection
8. FAQ — 5-7 objection-handling questions
9. Final CTA — Emotional callback: "Ready to see what shaped you?" with quiz button

**KOL Credibility Display:**
- Card format: researcher name + one-line research snippet
- Styled in dark teal (#002833) cards with pastel accent text, matching visual direction stat card pattern
- Show 4-6 most recognizable researchers upfront (Gottman, Siegel, etc.)
- "See all researchers" expands to reveal the full list (8+)
- No headshots — research citation itself is the trust signal
- No institution logos

**Product Ladder Presentation:**
- Three side-by-side cards with status badges
- Mirror: "Free — Available now" with "Take The Mirror" CTA button
- Blueprint: "Coming soon" — name + one-liner + status badge only
- Partner Match: "Future" — name + one-liner + status badge only
- Minimal detail per card; no email waitlist capture on Blueprint/Partner Match cards

**Sophia Section:**
- Separate from KOL research section — elevated, personal
- Clinical credentials, photo, personal connection to the work
- Positioned after KOL credibility

**FAQ Section:**
- 5-7 questions addressing pre-quiz objections
- Likely topics: Is this real science? How long does it take? Is it really free? What happens with my email? Who made this?
- Positioned just before final CTA

**Copy & Emotional Arc:**
- Arc: Recognition → Validation → Action
- Headline locked: "Finally see what shaped you." (mixed serif + sans)
- Tone: Warm + direct — conversational but confident
- Final CTA: Emotional callback, not a repeat of the hero

**Social Proof Strategy:**
- KOL research IS the social proof — no user testimonials
- Stats in hero (9 archetypes, 11 dimensions) serve as quantitative proof

### Claude's Discretion
- Exact section-to-section transitions and spacing
- Specific copy for each section (beyond headline which is locked)
- FAQ question wording and answers
- Mobile responsive breakpoint behavior (visual direction says it degrades naturally)
- Animation/scroll behavior (subtle or none)
- Emotional hook section content and format
- Dark teal vs pastel card choices per section (within visual direction constraints)

### Deferred Ideas (OUT OF SCOPE)
None — discussion stayed within phase scope

</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| LAND-01 | Clear value proposition communicating research-backed, expert-informed nature | Hero headline + pills (Free, 15 min, Research-backed) + KOL section satisfy this. Hero card already exists in page.tsx |
| LAND-02 | KOL credibility signals (named experts, research attribution) | KOL data exists in `lib/quiz/dimensions.ts` researchAnchors. 8+ researchers identified. KOL section in current page.tsx has 6, expandable pattern works |
| LAND-03 | Quiz start CTA that drives conversions | Single CTA decision is locked. Routes to /quiz. Pattern already implemented in page.tsx button with `p.blue.dark` color |
| LAND-04 | Mobile-responsive design | Existing page.tsx uses Tailwind responsive classes (col-span-12 lg:col-span-7). Stack mobile-first. Touch targets must be 44px+ per skill rules |
| LAND-05 | Sophia's credentials and clinical authority visible | New section required. Sophia photo TBD (no public/images asset found). Credentials content must be authored |
| BRAND-06 | Visual direction brief — color palette with hex codes and emotional rationale | Already captured in VISUAL-DIRECTION.md (locked). Phase 5 execution implements it in code |
| BRAND-07 | Visual direction brief — typography, imagery system, layout approach | Already captured in VISUAL-DIRECTION.md. Fonts (Plus Jakarta Sans, Instrument Serif, Space Grotesk) already loaded in page.tsx |
| BRAND-08 | Rebrand execution plan mapping visual recommendations to specific codebase files | Phase 5 landing page rebuild IS the primary rebrand execution. layout.tsx still uses Geist font — needs updating |

</phase_requirements>

---

## Summary

Phase 5 builds a full multi-section landing page for "The Mirror by Kin." The foundation is already partially built: `app/page.tsx` contains a working hero + 3-step process + KOL section prototype using the locked visual direction (Warm Solid palette, asymmetric 7/5 grid, correct fonts, dark teal KOL cards). The task is to extend this into a complete 8-9 section page and remove the placeholder structure.

The tech stack is clear and requires no new dependencies — the page uses inline Tailwind-style JSX with Next.js font loading, matching patterns already present in the codebase. The only structural decision is whether to keep the single `page.tsx` file (acceptable for a landing page) or decompose into section components for maintainability. Given page complexity (8+ sections, KOL expand logic, FAQ accordion), decomposing into a `components/landing/` directory is the right call.

Key content gaps: (1) Sophia section has no content yet — credentials, photo, and personal narrative copy need to be authored; (2) FAQ answers need to be written; (3) Emotional hook section needs copy direction. The KOL data gap is partially solved — `lib/quiz/dimensions.ts` contains 11 `researchAnchors` arrays covering Gottman, Siegel, Ainsworth, Bowlby, Bryson, Tsabary, Kennedy, Baumrind, and more — the landing page needs a curated extraction of 8+ named researchers from this data.

**Primary recommendation:** Decompose `app/page.tsx` into section components in `components/landing/`, using the existing hero prototype as Section 1 and building remaining sections to match. Treat KOL expansion as a Client Component (useState), keep all other sections as Server Components. Use `<details>/<summary>` for FAQ accordion (zero JS, consistent with existing pattern in result page).

---

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Next.js | ^16.1.6 | App Router, RSC, routing | Already in project; /quiz route confirmed |
| React | ^19.2.4 | Component model | Already in project |
| Tailwind CSS | ^4.2.1 | Utility styling | Already in project; entire page.tsx uses it |
| next/font/google | Built-in | Plus Jakarta Sans, Instrument Serif, Space Grotesk | Already loaded in page.tsx |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| lucide-react | ^0.575.0 | SVG icons for decorative elements | Available, but visual direction is icon-light — use sparingly |
| clsx / tailwind-merge | ^2.1.1 / ^3.5.0 | Conditional class merging | Already in project, use for variant states |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| HTML `<details>/<summary>` FAQ | Radix UI Accordion | details/summary is zero-JS, consistent with existing result page pattern (WatchoutsSection.tsx), works without hydration |
| Inline `style={}` for palette | Tailwind custom colors | Existing page.tsx uses inline styles for palette; maintain consistency. Avoids Tailwind config changes |
| Single page.tsx | Section components | Components is better for 8+ section page — easier to edit, test, maintain |

**Installation:** No new packages required.

---

## Architecture Patterns

### Recommended Project Structure

```
app/
└── page.tsx                    # Thin shell: imports section components, no "use client"

components/
└── landing/
    ├── LandingNav.tsx           # Glassmorphic pill nav — Server Component (no interaction)
    ├── HeroSection.tsx          # Asymmetric 7/5 grid — Server Component (static content)
    ├── EmotionalHookSection.tsx # Below-fold opening — Server Component
    ├── HowItWorksProcess.tsx    # 3-step cards — Server Component
    ├── HowItWorksScience.tsx    # 11 dims / 9 archetypes — Server Component
    ├── KOLSection.tsx           # "use client" — needs useState for expand/collapse
    ├── ProductLadder.tsx        # Three cards — Server Component
    ├── SophiaSection.tsx        # About co-founder — Server Component
    ├── FAQSection.tsx           # HTML details/summary — Server Component (zero JS)
    └── FinalCTASection.tsx      # Emotional callback + quiz button — Server Component
```

### Pattern 1: Server Component Default, Client Component Opt-in

**What:** Keep all sections as React Server Components unless they require client-side state. Only `KOLSection.tsx` needs `"use client"` for the expand/collapse toggle.

**When to use:** Always — RSC reduces bundle size and hydration cost.

**Example:**
```typescript
// components/landing/KOLSection.tsx
"use client";
import { useState } from "react";

const ALL_RESEARCHERS = [
  { name: "John Gottman", finding: "Emotion coaching as the core of secure parent-child attunement" },
  { name: "Daniel Siegel", finding: "Mindsight and narrative coherence as markers of integrated parenting" },
  { name: "Mary Ainsworth", finding: "Sensitive responsiveness as the marker of secure attachment" },
  { name: "John Bowlby", finding: "The attachment figure as provider of a secure base" },
  { name: "Tina Payne Bryson", finding: "Whole-brain reconnection after disconnection as core practice" },
  { name: "Shefali Tsabary", finding: "Conscious parenting — allowing the child's own selfhood to emerge" },
  { name: "Diana Baumrind", finding: "Responsiveness and demandingness as the two axes of parenting style" },
  { name: "Becky Kennedy", finding: "Repair as the cornerstone of secure attachment — 'the most important parenting skill'" },
  { name: "Bessel van der Kolk", finding: "Parentification as developmental trauma distinct from other ACEs" },
  // Additional from dimensions.ts researchAnchors
];

export function KOLSection() {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? ALL_RESEARCHERS : ALL_RESEARCHERS.slice(0, 6);
  // ...
}
```

### Pattern 2: HTML `<details>/<summary>` for FAQ Accordion

**What:** Zero-JS accordion using native HTML. No Radix, no useState. Consistent with `WatchoutsSection.tsx` pattern already in production.

**When to use:** FAQ section — static content, no animations needed, works on all devices including reduced-motion.

**Example:**
```typescript
// components/landing/FAQSection.tsx
// Server Component — no "use client" needed

const FAQS = [
  { q: "Is this real science?", a: "..." },
  // ...
];

export function FAQSection() {
  return (
    <section>
      {FAQS.map((faq) => (
        <details key={faq.q} className="group border-b border-[#002833]/10">
          <summary className="cursor-pointer py-5 list-none flex items-center justify-between">
            <span style={{ fontFamily: ff, fontWeight: 600 }}>{faq.q}</span>
            <span className="group-open:rotate-180 transition-transform">▾</span>
          </summary>
          <p className="pb-5 text-sm leading-relaxed" style={{ color: "#666" }}>
            {faq.a}
          </p>
        </details>
      ))}
    </section>
  );
}
```

### Pattern 3: CTA Routing to /quiz (Link, not button)

**What:** Use `next/link` `<Link href="/quiz">` wrapped around the CTA button — correct for internal navigation in Next.js App Router. Current page.tsx uses bare `<button>` tags with no routing wired up. This must be fixed.

**When to use:** Every "Take The Mirror" CTA on the page.

**Example:**
```typescript
import Link from "next/link";

// CTA button pattern — used in Hero, Product Ladder (Mirror card), Final CTA
<Link href="/quiz">
  <button
    className="px-8 py-4 text-sm cursor-pointer"
    style={{
      fontFamily: ff,
      fontWeight: 700,
      backgroundColor: p.blue.dark,   // #002833
      color: "#F0EDE8",
      borderRadius: "16px",
    }}
  >
    Take The Mirror
  </button>
</Link>
```

### Pattern 4: Font Variables as Module-Level Constants

**What:** Current `page.tsx` pattern of extracting `ff`, `ffSerif`, `ffDisplay` from font objects at module level. This must be replicated in each section component — either re-declare or extract to a shared `lib/landing/fonts.ts` constant file.

**When to use:** Every section component that renders text.

**Example:**
```typescript
// lib/landing/palette.ts — extract shared constants
import { Space_Grotesk, Instrument_Serif, Plus_Jakarta_Sans } from "next/font/google";

export const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: ["400","500","600","700"] });
export const instrumentSerif = Instrument_Serif({ subsets: ["latin"], weight: ["400"], style: ["normal","italic"] });
export const plusJakarta = Plus_Jakarta_Sans({ subsets: ["latin"], weight: ["400","500","600","700","800"] });

export const ff = plusJakarta.style.fontFamily;
export const ffSerif = instrumentSerif.style.fontFamily;
export const ffDisplay = spaceGrotesk.style.fontFamily;

export const p = {
  blue:   { light: "#B3D5DE", dark: "#002833" },
  pink:   { light: "#EEC0DA", dark: "#4A1942" },
  mint:   { light: "#B2DECD", dark: "#1A4A3A" },
  butter: { light: "#FEF4AC", dark: "#3D3B1A" },
};
```

**Important:** Next.js requires that fonts loaded with `next/font/google` are initialized at module level in a layout or page, not imported across files as instances. The safer pattern is to use CSS variables via font.variable in layout.tsx and reference those, OR re-instantiate in each file (Next.js deduplicates by URL). The existing page.tsx pattern of inline instantiation works because each load resolves to the same bundle. For shared use, extract to `lib/landing/palette.ts` and import `ff`/`ffSerif` strings only (not the font objects themselves).

### Pattern 5: Mobile-First Responsive Grid

**What:** The existing 7/5 asymmetric grid uses `col-span-12 lg:col-span-7`. Below-fold sections should stack single-column on mobile, multi-column on lg+.

**When to use:** All sections with multiple columns.

**Example:**
```typescript
// KOL grid — 1 col mobile, 2 col sm+
<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

// Product ladder — 1 col mobile, 3 col lg+
<div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

// Hero — already correct in page.tsx
<div className="grid grid-cols-12 gap-3">
  <div className="col-span-12 lg:col-span-7">...</div>
  <div className="col-span-12 lg:col-span-5">...</div>
</div>
```

### Anti-Patterns to Avoid

- **"use client" on all sections:** Only KOL needs client state. Keep all others as Server Components.
- **Gradient text on headline:** Visual direction explicitly prohibits this. "see what" is solid plum (#4A1942), not gradient.
- **Glassmorphic content cards:** Cards should be solid pastel fills. Only the nav is glassmorphic.
- **Bare `<button>` for CTA:** Current page.tsx has unrouted buttons. Fix with `next/link`.
- **Re-importing fonts in every file as new instances:** Use module-level shared constants from `lib/landing/palette.ts`.
- **Array index keys in JSX:** Biome enforces `noArrayIndexKey`. Current page.tsx already violates this in some places (pill map uses `pill.label` as key — fine; but unnamed maps need content-based keys).
- **Emoji icons:** Skills rule: use SVG (Lucide), never emojis as icons. Landing page should have no emoji icons.
- **Touch targets < 44px:** CTAs must be `min-h-[44px]` on mobile per ui-ux-pro-max skill rules.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| FAQ expand/collapse | Custom accordion with JS | HTML `<details>/<summary>` | Zero JS, SSR-safe, exact pattern used in result page WatchoutsSection.tsx |
| KOL expand | Custom animation library | `useState` toggle (existing page.tsx pattern) | Already working; no animation needed per visual direction |
| Internal navigation | Custom router | `next/link` `<Link href="/quiz">` | Next.js App Router standard — prefetching, accessibility built in |
| Typography loading | Custom font loading | `next/font/google` | Already in page.tsx; zero layout shift, automatic subsetting |
| Color token system | CSS custom properties or Tailwind config | Module-level palette constants (existing page.tsx `p` object pattern) | Consistency with existing code; no Tailwind config changes needed |
| Mobile breakpoints | Custom media queries | Tailwind responsive prefixes (`sm:`, `lg:`) | Already in use throughout codebase |

**Key insight:** The codebase has already solved most of this. The biggest risk is over-engineering new solutions that diverge from existing patterns.

---

## Common Pitfalls

### Pitfall 1: Leaving CTAs Unrouted

**What goes wrong:** Current `page.tsx` CTAs are bare `<button>` elements with no `onClick` or `href`. They look correct but do nothing when clicked.

**Why it happens:** Prototype was visual-only, not functional.

**How to avoid:** Every "Take The Mirror" button must be wrapped in `<Link href="/quiz">` or use `router.push('/quiz')`.

**Warning signs:** Running the app and clicking "Take The Mirror" — if nothing happens, CTA is unrouted.

### Pitfall 2: layout.tsx Still Uses Geist Font

**What goes wrong:** `app/layout.tsx` loads `Geist` as the default body font and sets it via CSS variable `--font-geist-sans`. The landing page bypasses this by loading its own fonts in `page.tsx`, but `body` styles in `globals.css` will still apply Geist to elements that don't have explicit `fontFamily` overrides.

**Why it happens:** layout.tsx was not updated during the visual direction phase.

**How to avoid:** Update `app/layout.tsx` to load the brand fonts (Plus Jakarta Sans as primary) OR ensure every text element in the landing page has an explicit `fontFamily` style override (current page.tsx already does this for all text).

**Warning signs:** Any text without an explicit `fontFamily` style showing up in a different font (Geist).

### Pitfall 3: KOL Data Needs Curation, Not Just Copy

**What goes wrong:** Copying raw `researchAnchors` strings from `dimensions.ts` directly as card content. The strings are in format `"Gottman (1997) — Emotion Coaching vs. Emotion Dismissing parenting styles"` — the year and dimension-specific detail is not landing-page-appropriate.

**Why it happens:** Temptation to reuse existing data verbatim.

**How to avoid:** Curate a separate `RESEARCHERS` constant in the landing component with landing-appropriate copy (name + punchy one-liner without year references). The current page.tsx `researchers` array already does this correctly — extend it to 8+ entries.

**Warning signs:** Card copy that says "(1997)" or "PBDQ Factor 5" — that's research-paper language, not brand language.

### Pitfall 4: Sophia Photo Does Not Exist

**What goes wrong:** Planning a Sophia section with a prominent photo placement when no photo asset exists in `/public/`.

**Why it happens:** CONTEXT.md says "photo" but no image has been added to the repo.

**How to avoid:** Plan the Sophia section to work with or without a photo. Either (a) use a styled placeholder/initial that matches the brand (e.g., a pastel circle with "S"), or (b) design the section to be copy-forward with credentials, so it reads credibly without a photo. Document that photo asset is needed and treat it as a content gap.

**Warning signs:** `<Image src="/images/sophia.jpg">` 404ing on deploy.

### Pitfall 5: "use client" Bubble — Converting Server Components to Client

**What goes wrong:** Adding `useState` or `onClick` to a section that should be a Server Component, forcing the entire section tree to hydrate on the client.

**Why it happens:** Easy to reach for `useState` for any interactive behavior.

**How to avoid:** FAQ = `<details>/<summary>` (no client state needed). KOL expand = isolated Client Component. All other sections = no interactivity → Server Components.

**Warning signs:** Multiple `"use client"` directives in section files.

### Pitfall 6: Biome Linting Failures on Commit

**What goes wrong:** The project uses Biome for linting (`biome check .`). Common violations: array index keys (`noArrayIndexKey`), improper quotes, unused imports.

**Why it happens:** Existing `page.tsx` already has some patterns that may need linting fixes.

**How to avoid:** Use content-based keys (e.g., `researcher.name`, `faq.q`) not index keys. Run `npm run lint` before committing each section component.

**Warning signs:** Pre-commit hook or CI failure on push.

---

## Code Examples

Verified patterns from existing codebase:

### Existing KOL Card Pattern (from app/page.tsx)
```typescript
// Source: /Users/yikfaiivanli/Projects/raisinggiants/app/page.tsx lines 394-414
<div
  key={r.name}
  className="px-7 py-6 flex flex-col gap-3"
  style={{ backgroundColor: p.blue.dark, borderRadius: "24px" }}
>
  <p className="text-sm" style={{ fontFamily: ff, fontWeight: 700, color: p.mint.light }}>
    {r.name}
  </p>
  <p className="text-sm leading-relaxed" style={{ fontFamily: ff, fontWeight: 400, color: "rgba(255,255,255,0.45)" }}>
    {r.finding}
  </p>
</div>
```

### Existing Stat Card Pattern (from app/page.tsx)
```typescript
// Source: /Users/yikfaiivanli/Projects/raisinggiants/app/page.tsx lines 226-250
{[
  { n: "9", label: "Archetypes mapped", bg: p.mint.light, color: p.mint.dark },
  { n: "11", label: "Dimensions analyzed", bg: p.blue.light, color: p.blue.dark },
].map((s) => (
  <div
    key={s.n}
    className="px-6 py-6 flex flex-col justify-between"
    style={{ backgroundColor: s.bg, borderRadius: "24px" }}
  >
    <p className="text-4xl leading-none mb-3" style={{ fontFamily: ff, fontWeight: 800, color: s.color }}>
      {s.n}
    </p>
    <p className="text-xs leading-relaxed" style={{ fontFamily: ff, fontWeight: 400, color: s.color, opacity: 0.6 }}>
      {s.label}
    </p>
  </div>
))}
```

### HTML details/summary FAQ (from components/result/WatchoutsSection.tsx)
```typescript
// Source: /Users/yikfaiivanli/Projects/raisinggiants/components/result/WatchoutsSection.tsx line 58-78
<details className="group">
  <summary className="cursor-pointer text-sm text-[#8A7A66] hover:text-[#1A1008] transition-colors list-none flex items-center gap-2 select-none">
    {/* summary content */}
  </summary>
  {/* expanded content */}
</details>
```

### Mixed Serif + Sans Headline (locked design, from app/page.tsx)
```typescript
// Source: /Users/yikfaiivanli/Projects/raisinggiants/app/page.tsx lines 145-164
<h1 className="text-5xl md:text-6xl lg:text-8xl leading-[0.92] tracking-tight">
  <span style={{ fontFamily: ff, fontWeight: 800, color: p.butter.dark }}>Finally</span>
  <br />
  <span style={{ fontFamily: ffSerif, fontStyle: "italic", fontWeight: 400, color: p.pink.dark }}>
    see what
  </span>
  <br />
  <span style={{ fontFamily: ff, fontWeight: 800, color: p.butter.dark }}>shaped you.</span>
</h1>
```

### Link-wrapped CTA (correction pattern)
```typescript
// Required correction — current page.tsx has unrouted buttons
import Link from "next/link";

<Link href="/quiz" className="block">
  <button
    className="px-8 py-4 text-sm cursor-pointer w-full sm:w-auto"
    style={{
      fontFamily: ff,
      fontWeight: 700,
      backgroundColor: p.blue.dark,
      color: "#F0EDE8",
      borderRadius: "16px",
      minHeight: "44px", // Touch target compliance
    }}
  >
    Take The Mirror
  </button>
</Link>
```

---

## KOL Data Available in Codebase

Curated from `lib/quiz/dimensions.ts` `researchAnchors` arrays — these researchers are named across the 11 dimension definitions:

| Researcher | Source | Landing-Appropriate One-Liner |
|------------|--------|-------------------------------|
| John Gottman | Dim 1, 4, 7, 11 | Emotion coaching as the foundation of secure attunement |
| Daniel Siegel | Dim 4, 6, 7, 8 | Narrative coherence as the marker of integrated parenting |
| Mary Ainsworth | Dim 1, 5 | Sensitive responsiveness as the core of secure attachment |
| John Bowlby | Dim 9 | The attachment figure as provider of a secure base |
| Tina Payne Bryson | Dim 8 | Reconnection after disconnection as a core parenting practice |
| Shefali Tsabary | Dim 3, 4, 7 | Conscious parenting — allowing the child's own selfhood to emerge |
| Becky Kennedy | Dim 1, 4, 8 | Repair as the most important skill a parent can build |
| Diana Baumrind | Dim 1, 2, 3 | Warmth and structure as the two axes of healthy parenting |
| Bessel van der Kolk | Dim 9 | Parentification as a distinct and often invisible developmental trauma |
| Gregory Jurkovic | Dim 9 | Role reversal between parent and child as relational trauma |
| Edward Tronick | Dim 8 | Rupture-and-repair as the normative rhythm of secure relationships |
| Martin van IJzendoorn | Dim 6 | Coherent childhood narrative predicts secure attachment in children |

This gives **12 named researchers** — well above the 8+ requirement. The initial display should show 6 (Gottman, Siegel, Ainsworth, Bowlby, Bryson, Tsabary — the most recognizable names). "See all researchers" reveals the full 12.

---

## Content Gaps (Require Authoring)

The following content does not exist yet and must be written as part of implementation:

| Gap | Section | Notes |
|-----|---------|-------|
| Sophia section copy | SophiaSection | Clinical credentials, personal connection, photo or placeholder |
| Sophia photo | SophiaSection | No image in /public/. Either add asset or design photo-optional layout |
| Emotional hook copy | EmotionalHookSection | Below-fold bridge from hero to "why" — Claude's discretion on format |
| FAQ questions and answers | FAQSection | 5-7 Q&As addressing pre-quiz objections — Claude writes these |
| Product Ladder one-liners | ProductLadder | Mirror, Blueprint, Partner Match descriptions |
| Final CTA copy | FinalCTASection | Emotional callback line (not "Finally see what shaped you" — that's the hero) |
| "How it works — Science" copy | HowItWorksScience | Explaining 11 dimensions + 9 archetypes in landing page language |

---

## State of the Art

| Old Approach | Current Approach | Impact |
|--------------|------------------|--------|
| `app/page.tsx` single file with all content | Decompose into `components/landing/` section components | Maintainability, easier per-section editing |
| Unrouted `<button>` CTAs | `<Link href="/quiz">` wrapped CTAs | LAND-03 compliance — CTA must actually route to /quiz |
| Geist in layout.tsx | Plus Jakarta Sans as body font (matches visual direction) | BRAND-07 compliance — typography system |
| `researchers` array in page.tsx (6 entries) | Curated 12-entry researchers list from dimensions.ts data | LAND-02 compliance — 8+ named experts required |
| No emotional hook section | Emotional hook as Section 2 | Completes the Recognition → Validation → Action arc |
| No Sophia section | Dedicated SophiaSection component | LAND-05 compliance — credentials must be visible |
| No FAQ section | FAQSection with `<details>/<summary>` | Addresses last-moment pre-quiz objections |
| No product ladder | ProductLadder with 3 cards | Shows full Mirror → Blueprint → Partner Match arc |
| No final CTA section | FinalCTASection | Closes conversion arc |

---

## Open Questions

1. **Sophia Photo Asset**
   - What we know: No image exists in `/public/`. CONTEXT.md says "photo" is part of the section.
   - What's unclear: Will a real photo be provided before implementation? What should the fallback be?
   - Recommendation: Design the section to work beautifully without a photo (credentials-forward layout). Add a `TODO: replace with real photo` comment in the component for an easy swap-in later.

2. **"How it works — Science" vs. "How it works — Process" — Are these two separate sections?**
   - What we know: CONTEXT.md lists both as distinct sections (Steps 3 and 4). Current page.tsx only has the 3-step process section.
   - What's unclear: Should Science section be a standalone visual section or a sub-section within How It Works?
   - Recommendation: Make it a separate section after the 3-step cards. Use the stat card visual language (9 archetypes, 11 dimensions, research foundation) to create a visually distinct "The Science" section with dark teal stat cards and a short paragraph.

3. **Emotional Hook Section Format**
   - What we know: It's "Claude's discretion" — between hero and How It Works. Arc function: bridges from "Finally see what shaped you" to "here's how."
   - What's unclear: Is it a full-width editorial text block? A quote? A two-column layout?
   - Recommendation: Full-width warm editorial block on background (#FAFAF7), no card. Large serif-italic pull quote with supporting body copy. Something like: *"The patterns from your childhood don't disappear. They just become invisible — until now."*

4. **layout.tsx Font Update Scope**
   - What we know: layout.tsx still loads Geist. The landing page inline-overrides all font families.
   - What's unclear: Should layout.tsx be updated to load brand fonts (affecting all pages: /quiz, /result, /blueprint)?
   - Recommendation: Update layout.tsx to load Plus Jakarta Sans as the base body font. This aligns all pages with the brand. The quiz and result pages already use their own font decisions — adding Plus Jakarta Sans as the layout default is a low-risk brand alignment. Flag for separate task.

---

## Validation Architecture

> `workflow.nyquist_validation` is not present in `.planning/config.json` (only `workflow.research`, `plan_check`, `verifier` are listed). Skipping this section — no automated test infrastructure required.

---

## Sources

### Primary (HIGH confidence)

- `/Users/yikfaiivanli/Projects/raisinggiants/app/page.tsx` — Existing hero prototype, visual patterns, font loading, palette constants
- `/Users/yikfaiivanli/Projects/raisinggiants/lib/quiz/dimensions.ts` — All 12 researcher names and research anchors (KOL data source)
- `/Users/yikfaiivanli/Projects/raisinggiants/.planning/phases/05-landing-page/VISUAL-DIRECTION.md` — Locked visual direction: palette, typography, layout rules
- `/Users/yikfaiivanli/Projects/raisinggiants/.planning/phases/05-landing-page/05-CONTEXT.md` — Locked user decisions on sections, CTAs, KOL display, product ladder
- `/Users/yikfaiivanli/Projects/raisinggiants/components/result/WatchoutsSection.tsx` — HTML details/summary accordion pattern (production-proven)
- `/Users/yikfaiivanli/Projects/raisinggiants/package.json` — Confirmed dependency versions
- `/Users/yikfaiivanli/Projects/raisinggiants/.planning/REQUIREMENTS.md` — LAND-01–05, BRAND-06–08 definitions
- `/Users/yikfaiivanli/Projects/raisinggiants/app/layout.tsx` — Confirmed Geist font issue in layout

### Secondary (MEDIUM confidence)

- `.agents/skills/vercel-react-best-practices/SKILL.md` — RSC patterns, bundle optimization, Server Component default approach
- `.agents/skills/ui-ux-pro-max/SKILL.md` — Touch target (44px), responsive breakpoints, accessibility rules, no-emoji-icons rule
- `.agents/skills/frontend-design/SKILL.md` — Aesthetic intentionality, production-grade code standards

### Tertiary (LOW confidence)

- None — all findings verified from codebase or project files

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — package.json confirms all versions; page.tsx demonstrates working patterns
- Architecture: HIGH — existing codebase patterns are clear and consistent; decomposition approach is standard Next.js
- KOL data: HIGH — dimensions.ts is the canonical source; 12 researchers extracted and verified
- Content gaps: HIGH — confirmed by absence (no Sophia photo, no FAQ copy, no emotional hook copy)
- Pitfalls: HIGH — identified from direct codebase inspection (unrouted buttons, Geist in layout, array index keys)

**Research date:** 2026-03-01
**Valid until:** 2026-04-01 (stable tech stack; Next.js 16 + React 19 + Tailwind 4 are current)
