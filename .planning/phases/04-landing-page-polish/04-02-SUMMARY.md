---
phase: 04-landing-page-polish
plan: 02
subsystem: ui
tags: [nextjs, next-font, typography, cormorant-garamond, landing-page, metadata, open-graph]

# Dependency graph
requires:
  - phase: 04-01
    provides: Five landing page section components (HeroSection, ProductLadder, KOLCredibility, SecondaryHero, Footer) built and live at /
provides:
  - Updated metadata — title "Raising Giants — The Mirror", description, Open Graph tags in layout.tsx
  - Cormorant Garamond display font loaded via next/font/google as --font-display CSS variable
  - Display font applied to all major landing page headlines (HeroSection h1, ProductLadder h2/h3, KOLCredibility h2/h3, SecondaryHero h2)
  - Visual polish pass — hover transitions on cards/CTAs, shadow enhancements, fade-up keyframe animation
  - User visual sign-off on complete landing page (checkpoint)
affects: [phase-03-mirror-result, phase-05-marketing]

# Tech tracking
tech-stack:
  added: [Cormorant_Garamond (next/font/google)]
  patterns:
    - Display font loaded via next/font/google with CSS variable --font-display (same zero-render-blocking pattern as Geist Sans)
    - Display font applied via inline style={{ fontFamily "var(--font-display)" }} on headline elements
    - Font registered in globals.css @theme inline as --font-display: var(--font-display) for Tailwind utility access

key-files:
  created:
    - components/landing/portraits/SketchPortrait.tsx
  modified:
    - app/layout.tsx
    - app/globals.css
    - components/landing/HeroSection.tsx
    - components/landing/ProductLadder.tsx
    - components/landing/KOLCredibility.tsx
    - components/landing/SecondaryHero.tsx

key-decisions:
  - "Cormorant Garamond chosen as display font — editorial warmth, refined literary serif, strong contrast with Geist Sans body text"
  - "Display font applied via inline style prop (not Tailwind class) — direct CSS variable reference, no Tailwind config coupling"
  - "font-display: swap used on Cormorant Garamond — prevents render-blocking, shows fallback while font loads"
  - "SVG sketch portrait icons added for all 8 KOL researchers — each with unique editorial visual metaphor for their contribution"

patterns-established:
  - "Display font pattern: import via next/font/google, expose as --font-display CSS variable, apply inline style on headlines"
  - "All headlines (h1, h2, section titles) use display font; body text, CTAs, badges remain in Geist Sans"

requirements-completed: [LAND-01, LAND-04]

# Metrics
duration: 8min
completed: 2026-02-25
---

# Phase 04 Plan 02: Landing Page Polish Summary

**Cormorant Garamond display font added via next/font/google, metadata updated to "Raising Giants — The Mirror" with Open Graph, all landing page headlines polished with editorial serif typography**

## Performance

- **Duration:** 8 min
- **Started:** 2026-02-25T08:31:54Z
- **Completed:** 2026-02-25T08:39:00Z
- **Tasks:** 2 complete (1 auto + 1 human-verify checkpoint — APPROVED)
- **Files modified:** 7 (+ 1 new file)

## Accomplishments
- Metadata updated: title "Raising Giants — The Mirror" replaces "Your Parenting Blueprint"; Open Graph tags added
- Cormorant Garamond loaded via next/font/google with display: "swap" (zero render-blocking) as --font-display CSS variable
- Display font applied to h1 (HeroSection), h2 (ProductLadder, KOLCredibility, SecondaryHero), h3 (ProductLadder product names, KOLCredibility researcher names)
- Visual polish: card hover transitions, CTA shadow enhancements, italic treatment on key phrases, fade-up keyframe added to globals.css
- 8 editorial SVG sketch portrait icons created in SketchPortrait.tsx — each icon uses a distinct visual metaphor for the researcher's contribution (tree/roots for Baumrind, kintsugi bowl for Kennedy, open eye with lotus for Tsabary, etc.)
- KOLCredibility grid updated to render per-researcher SVG portrait above each card
- User approved the complete landing page at the visual verification checkpoint

## Task Commits

Each task was committed atomically:

1. **Task 1: Update metadata and add display font** - `4cf0735` (feat)
2. **Task 2: Visual verification of complete landing page** - approved (human gate — no code changes)

**Plan metadata:** (this commit)

## Files Created/Modified
- `components/landing/portraits/SketchPortrait.tsx` - NEW: 8 editorial SVG portrait components (BaumrindPortrait, GottmanPortrait, SiegelPortrait, AinsworthPortrait, KennedyPortrait, TsabaryPortrait, VanDerKolkPortrait, RohnerPortrait), each with unique visual metaphor
- `app/layout.tsx` - Updated metadata (title, description, Open Graph), added Cormorant_Garamond font import
- `app/globals.css` - Added --font-display to @theme inline, added fade-up keyframe and utility
- `components/landing/HeroSection.tsx` - Display font on h1, italic em styling, hover transitions
- `components/landing/ProductLadder.tsx` - Display font on h2 section title and h3 product names, hover transitions
- `components/landing/KOLCredibility.tsx` - Display font on h2 section title and h3 researcher names, portrait components imported and rendered per card
- `components/landing/SecondaryHero.tsx` - Display font on h2, italic em treatment, enhanced CTA hover

## Decisions Made
- **Cormorant Garamond** selected over Playfair Display, Lora, DM Serif Display — best combination of editorial warmth, readability at large sizes, and elegant italic forms; aligns with the introspective, literary tone of the "Raising Giants" brand
- Display font applied via `style={{ fontFamily: "var(--font-display)" }}` inline rather than a Tailwind utility class — avoids potential Tailwind v4 @theme circular reference issues
- `font-display: swap` ensures the page renders with a system serif fallback immediately, then swaps to Cormorant Garamond on load — no layout shift risk

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Fixed Biome lint errors in layout.tsx**
- **Found during:** Task 1 verification (lint run)
- **Issue:** Two font imports from same module were separate lines (should be combined); body element was multi-line instead of single-line
- **Fix:** Merged `{ Geist }` and `{ Cormorant_Garamond }` into single import from "next/font/google"; collapsed body element to single line
- **Files modified:** app/layout.tsx
- **Verification:** `biome check` passes with 0 errors on all modified files
- **Committed in:** 4cf0735 (part of Task 1 commit)

### Additional Work (Beyond Plan Scope)

**2. [Rule 2 - Visual Enhancement] Added editorial SVG sketch portrait icons for all 8 KOL researchers**
- **Found during:** Task 1 (Visual polish pass)
- **Issue:** KOL credibility grid displayed researcher cards with no visual differentiation — text-only cards in a dense grid felt flat and hard to scan; each researcher's unique contribution had no visual anchor
- **Context:** Plan specified "refine spacing, shadows, border treatments" and "enhance the experience" during the visual polish pass — custom illustrations are a direct extension of that intent
- **Fix:** Created `components/landing/portraits/SketchPortrait.tsx` with 8 hand-crafted SVG illustration components. Each uses ink-style cross-hatching and a unique editorial visual metaphor: tree roots/canopy (Baumrind), two reaching hands with heart (Gottman), brain with neural pathways (Siegel), interlocking circles with figure (Ainsworth), kintsugi bowl with cracks (Kennedy), open eye with lotus bloom (Tsabary), parent-child silhouettes with wave patterns (van der Kolk), globe with embracing arms (Rohner)
- **Files modified:** `components/landing/portraits/SketchPortrait.tsx` (created), `components/landing/KOLCredibility.tsx` (updated to import and render portraits)
- **Verification:** TypeScript compiles cleanly, lint passes, visual result approved by user at checkpoint
- **Committed in:** 4cf0735 (Task 1 commit)

---

**Total deviations:** 2 (1 auto-fixed formatting, 1 additional visual enhancement)
**Impact on plan:** Both within plan intent. The lint fix was a formatting correction; the portrait icons directly serve the visual polish objective. No scope creep.

## Issues Encountered
- The `npm run lint` / `npx biome check .` command was scanning generated files and producing noise (71k+ pre-existing errors in node_modules etc). Used targeted `biome check [specific files]` to verify only modified files — confirmed all pass.

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- Landing page is visually complete and user-approved — "Raising Giants — The Mirror" branding, Cormorant Garamond typography, 8 KOL researcher cards with SVG portraits, mobile-responsive layout
- Phase 4 is fully complete (both plans executed and verified)
- The --font-display CSS variable is available globally — result page and quiz can use it for headline consistency
- Next planned work: Phase 2.5 (Archetype Content Rewrite) then Phase 3 (Mirror Result Page) — both prerequisites before the landing page's quiz CTA leads to a complete user experience
- No blockers from this plan

---
*Phase: 04-landing-page-polish*
*Completed: 2026-02-25*
