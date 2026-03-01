---
phase: 05-landing-page
plan: 01
subsystem: ui
tags: [nextjs, react, tailwind, plus-jakarta-sans, google-fonts, server-components, landing-page]

# Dependency graph
requires: []
provides:
  - "lib/landing/palette.ts: shared font family strings (ff, ffSerif, ffDisplay) and palette constants (p)"
  - "components/landing/LandingNav.tsx: glassmorphic pill nav with Link-wrapped CTA to /quiz"
  - "components/landing/HeroSection.tsx: asymmetric 7/5 hero with butter card, serif+sans headline, Link-wrapped CTAs"
  - "components/landing/EmotionalHookSection.tsx: editorial emotional bridge section (recognition phase)"
  - "app/page.tsx: thin Server Component shell importing all section components"
  - "Plus Jakarta Sans as root body font via --font-plus-jakarta CSS variable"
affects: [05-02-PLAN, 05-03-PLAN]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Shared design constants module (lib/landing/palette.ts) as single source of truth for fonts and colors"
    - "Named exports for section components (not default exports)"
    - "Server Component architecture: page.tsx + all section components are server components (no 'use client')"
    - "Content-based keys in lists (pill.label, stat.label, color value) to comply with Biome noArrayIndexKey"

key-files:
  created:
    - lib/landing/palette.ts
    - components/landing/LandingNav.tsx
    - components/landing/HeroSection.tsx
    - components/landing/EmotionalHookSection.tsx
  modified:
    - app/layout.tsx
    - app/globals.css
    - app/page.tsx

key-decisions:
  - "Biome formatting auto-applied (biome check --write) as part of Task 2 — all 7 format issues resolved before commit"
  - "ffDisplay exported from palette.ts for use by downstream components even though HeroSection doesn't use it — keeps palette.ts as the canonical source"

patterns-established:
  - "Server Component shell: page.tsx imports section components, no useState/useEffect at page level"
  - "Palette imports: all section components import { ff, ffSerif, p } from @/lib/landing/palette"
  - "Link wrapping: all CTAs use next/link Link wrapper, never bare button elements"
  - "Touch target compliance: all CTAs have minHeight 44px"

requirements-completed: [LAND-01, LAND-03, BRAND-06, BRAND-07, BRAND-08]

# Metrics
duration: 10min
completed: 2026-03-01
---

# Phase 05 Plan 01: Design Foundation and Hero Decomposition Summary

**Plus Jakarta Sans font foundation, shared palette.ts constants, and hero/nav/emotional-hook section components extracted from monolithic prototype into maintainable Server Component architecture with Link-wrapped CTAs routing to /quiz**

## Performance

- **Duration:** ~10 min
- **Started:** 2026-03-01T08:01:47Z
- **Completed:** 2026-03-01T08:11:00Z
- **Tasks:** 2
- **Files modified:** 7

## Accomplishments

- Created `lib/landing/palette.ts` exporting all font objects (ff, ffSerif, ffDisplay) and four-color palette (p) as shared constants — single source of truth for all downstream section components
- Replaced Geist with Plus Jakarta Sans in `app/layout.tsx` (--font-plus-jakarta variable) and updated `globals.css` CSS custom property
- Decomposed monolithic `app/page.tsx` prototype into three named-export Server Components: LandingNav, HeroSection, EmotionalHookSection — all importing from palette.ts with no inline font/color constants
- Added new EmotionalHookSection with Instrument Serif italic pull quote ("The patterns from your childhood don't disappear...") as recognition-phase bridge between hero and content sections
- Wired both "Take The Mirror" (HeroSection) and "Start free" (LandingNav) CTAs to `/quiz` via next/link Link components

## Task Commits

1. **Task 1: Create shared palette constants and update font foundation** - `799ade0` (feat)
2. **Task 2: Decompose hero into section components and create page shell** - `b0f2d4f` (feat)

## Files Created/Modified

- `lib/landing/palette.ts` - Shared font family strings and palette color constants; imported by all landing section components
- `components/landing/LandingNav.tsx` - Glassmorphic pill nav with "Kin" brand, segmented toggle, Link-wrapped "Start free" CTA to /quiz
- `components/landing/HeroSection.tsx` - Asymmetric 7/5 grid hero with butter card, pills, mixed serif+sans headline, quote card, stat cards, dark footer bar; Link-wrapped CTAs to /quiz and #how-it-works
- `components/landing/EmotionalHookSection.tsx` - Editorial emotional bridge with serif italic pull quote and supporting body copy
- `app/layout.tsx` - Root layout updated to Plus_Jakarta_Sans (replaced Geist)
- `app/globals.css` - --font-sans updated to reference --font-plus-jakarta
- `app/page.tsx` - Rewritten as thin Server Component shell (no "use client") importing section components

## Decisions Made

- Biome auto-formatting applied before commit (`biome check --write`) — resolved 7 format issues (import sorting, JSX inline formatting) without logic changes
- `ffDisplay` exported from palette.ts for completeness even though HeroSection doesn't use Space Grotesk directly — downstream components in Plans 02-03 may need it

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None - build succeeded on first attempt, all linting issues were formatting-only and resolved by Biome auto-fix.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- Design foundation complete: palette.ts, Plus Jakarta Sans font, page shell architecture all in place
- Plans 02 and 03 can import from `@/lib/landing/palette` and add section components to page.tsx
- Page renders at localhost:3001 with LandingNav + HeroSection + EmotionalHookSection visible
- Clicking "Take The Mirror" or "Start free" routes to /quiz
- Mobile responsive: hero stacks to single column at < lg breakpoint

---
*Phase: 05-landing-page*
*Completed: 2026-03-01*
