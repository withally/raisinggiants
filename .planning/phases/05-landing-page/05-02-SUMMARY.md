---
phase: 05-landing-page
plan: 02
subsystem: landing
tags: [landing, sections, kol, research, how-it-works, react, server-components, client-component]
dependency_graph:
  requires: [05-01]
  provides: [HowItWorksProcess, HowItWorksScience, KOLSection]
  affects: [app/page.tsx]
tech_stack:
  added: []
  patterns: [client-component-island, server-component, expand-collapse-toggle]
key_files:
  created:
    - components/landing/HowItWorksProcess.tsx
    - components/landing/HowItWorksScience.tsx
    - components/landing/KOLSection.tsx
  modified:
    - app/page.tsx
decisions:
  - "KOLSection is the only Client Component in the landing page — useState for expand/collapse requires hydration; all other sections remain pure Server Components"
  - "Researcher names used as React keys (guaranteed unique) per Biome noArrayIndexKey rule"
  - "Inline span text content in headings instead of JSX whitespace interpolation — required for Biome formatter compliance"
metrics:
  duration: 4 min
  completed_date: "2026-03-01"
  tasks: 2
  files_created: 3
  files_modified: 1
---

# Phase 05 Plan 02: Middle Content Sections Summary

**One-liner:** Three Validation-phase sections (3-step process cards, dark teal research stats, 12 KOL researcher cards with expand/collapse) wired into the landing page shell.

## What Was Built

### Task 1: HowItWorksProcess and HowItWorksScience (commit d357c9b)

**HowItWorksProcess.tsx** — Server Component, `id="how-it-works"` anchor for hero CTA scroll.
- Section label: "HOW IT WORKS" in mint dark, 0.2em letter-spacing
- Heading: "Three steps to *understanding*" (understanding in Instrument Serif italic pink)
- 3-step cards in responsive grid (1 col mobile, 3 col md+), solid pastel fills, 24px radius, min-height 320px
  - Step 01: butter card — "Take the quiz"
  - Step 02: pink card — "Get your Mirror"
  - Step 03: mint card — "Understand your patterns"
- Step numbers in Space Grotesk 700 at 50% opacity for visual hierarchy

**HowItWorksScience.tsx** — Server Component, new section not in prototype.
- Section label: "THE SCIENCE" in blue dark at 50% opacity
- Heading: "Grounded in *decades* of research"
- 3 dark teal stat cards (bg `#002833`, 24px radius) in responsive grid:
  - "11" — Research-backed dimensions (mint light number)
  - "9" — Distinct parenting archetypes (pink light number)
  - "100+" — Published studies referenced (butter light number)

### Task 2: KOLSection + page.tsx wiring (commit 90bc5af)

**KOLSection.tsx** — Client Component island (`"use client"`, only one in landing page).
- 12 named researchers: first 6 shown by default (Gottman, Siegel, Ainsworth, Kennedy, Bowlby, Tsabary), expands to show all 12 on click
- Dark teal cards (bg `#002833`, 24px radius), name in mint light (`#B2DECD`) at 700 weight, finding at `rgba(255,255,255,0.45)`
- "See all researchers" expand button: transparent bg, 44px touch target, 100px radius, hides itself when `showAll` is true
- `useState(false)` for expand/collapse; researcher.name used as React key (Biome noArrayIndexKey compliance)
- Curated landing-appropriate one-liners — no year references, no dimension-specific jargon

**app/page.tsx** — Server Component, updated to render full 6-section order:
1. LandingNav
2. HeroSection
3. EmotionalHookSection
4. HowItWorksProcess
5. HowItWorksScience
6. KOLSection
7. (Plan 03 placeholder comment)

## Verification Results

- `npx next build` — passed (all 10 static pages generated, no TypeScript errors)
- `npx biome check` — passed after inline span formatting fix
- page.tsx remains a Server Component (no `"use client"`)
- LAND-02 satisfied: 12 named researchers with research attribution, 6 visible by default

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Biome formatter: multi-line span with whitespace JSX interpolation**
- **Found during:** Task 2 (lint check)
- **Issue:** Biome formatter required heading `<span>` elements with trailing spaces to be written inline — JSX whitespace interpolation (`{" "}`) across multiple lines caused format error
- **Fix:** Inlined `<span>` content — `Three steps to ` and `Grounded in ` with trailing space written directly within the opening/closing tag on one line
- **Files modified:** `components/landing/HowItWorksProcess.tsx`, `components/landing/HowItWorksScience.tsx`
- **Commit:** 90bc5af (included in Task 2 commit)

## Self-Check: PASSED

Files verified:
- FOUND: components/landing/HowItWorksProcess.tsx
- FOUND: components/landing/HowItWorksScience.tsx
- FOUND: components/landing/KOLSection.tsx
- FOUND: app/page.tsx (modified)

Commits verified:
- FOUND: d357c9b (Task 1)
- FOUND: 90bc5af (Task 2)
