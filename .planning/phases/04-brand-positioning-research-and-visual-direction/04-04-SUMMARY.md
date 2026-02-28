---
phase: 04-brand-positioning-research-and-visual-direction
plan: 04
subsystem: ui
tags: [design-system, visual-direction, typography, color-palette, landing-page, ux, neo-minimalism, pp-pangaia]

requires:
  - phase: 06-03
    provides: Brand name (Kin), brand territory, emotional core "I always sensed this. Now I see it.", multi-product architecture

provides:
  - "design-system/MASTER.md — synthesized design system with decision log covering 11 searches"
  - "design-system/pages/landing.md — section-by-section landing page composition specs"
  - "design-system/kin/MASTER.md — persisted skill-generated design system"
  - "design-system/kin/pages/landing.md — persisted skill-generated landing overrides"
  - "04-04-visual-direction-brief.md — section-by-section visual spec for all 8 landing sections"

affects:
  - 04-05-rebrand-execution-plan
  - components/landing/HeroSection.tsx
  - components/landing/SocialProof.tsx
  - components/landing/ArchetypePreview.tsx
  - components/landing/KOLCredibility.tsx
  - components/landing/KOLNarrative.tsx
  - components/landing/FAQ.tsx
  - components/landing/SecondaryHero.tsx
  - components/landing/Footer.tsx

tech-stack:
  added: []
  patterns:
    - "Design system exploration: run 3+ design system generations + 5 domain-specific searches before committing to direction"
    - "Decision documentation: all visual choices documented with 'what was rejected and why' reasoning"
    - "Skill validation pattern: use ui-ux-pro-max searches to validate/challenge existing decisions, not just generate new ones"

key-files:
  created:
    - design-system/MASTER.md
    - design-system/pages/landing.md
    - design-system/kin/MASTER.md
    - design-system/kin/pages/landing.md
    - .planning/phases/04-brand-positioning-research-and-visual-direction/04-04-visual-direction-brief.md
  modified: []

key-decisions:
  - "PP Pangaia KEEP (comparison-based, not inherited) — evaluated against 15 Google Font pairings, won on weight range + humanist warmth + Neo-Minimalism hero-scale capability"
  - "Existing Kin palette VALIDATED by color searches — Deep Teal + Burnished Amber + Cloud White confirmed aligned with skill recommendations; rebalancing (not replacement)"
  - "Trend formula confirmed: #5 Neo-Minimalism as structure, #6 Emotion-Led as content, #9 Raw Authenticity as texture"
  - "Liquid Glass / Glassmorphism rejected — wrong register for trust product; performance concerns"
  - "Scroll-Triggered Storytelling pattern selected for landing — narrative arc matches Kin's revelation emotional journey"
  - "Amber use rebalanced: now reserved for emotional emphasis only (hand-drawn elements, italic display moments)"
  - "Merlot (#6B1E2E) use rebalanced: reserved for emotional peaks only (SecondaryHero CTA, climactic moments)"
  - "ONE bold typographic moment per section rule established — prevents visual competition between elements"
  - "Left-aligned hero confirmed — not centered; asymmetric negative space is the Neo-Minimalism composition"
  - "Brief is implementation-ready: each section has Layout, Typography, Color, Craft, ONE bold moment, What changes"

patterns-established:
  - "One bold moment per section: every section has exactly ONE element that commands attention — no competing focal points"
  - "Hand-drawn elements as functional craft signals, not decoration: they mark section boundaries and emotional emphasis"
  - "Type at hero scale IS the composition: remove decoration, let the headline occupy space like a physical object"
  - "Emotional arc through backgrounds: Cloud White → Cloud White → White → Cloud White → Cloud White → Cloud White → Deep Teal → Deep Teal"

requirements-completed: [BRAND-06, BRAND-07]

duration: 7min
completed: 2026-02-28
---

# Phase 06 Plan 04: Visual Direction Brief Summary

**Section-by-section visual direction for all 8 Kin landing page sections, generated via 11 ui-ux-pro-max skill searches with explicit typography/palette validation against 2026 trend formula (#5 Neo-Minimalism + #6 Emotion-Led + #9 Raw Authenticity)**

## Performance

- **Duration:** 7 min
- **Started:** 2026-02-28T12:59:50Z
- **Completed:** 2026-02-28T13:07:17Z
- **Tasks:** 2
- **Files modified:** 5 created

## Accomplishments

- Generated and persisted design system via ui-ux-pro-max skill (3 design system generations + 8 domain-specific searches = 11 total)
- Validated typography decision: PP Pangaia keeps its role after comparison against 15 evaluated Google Font alternatives — confirmed superior weight range and humanist warmth for the brand
- Validated color palette: existing Kin palette confirmed aligned with skill recommendations; rebalanced application (amber more intentional, merlot at peaks only)
- Created visual direction brief with all 8 sections fully specified (Layout, Typography, Color, Craft elements, ONE bold moment, What changes)
- Established page emotional arc: 8-section narrative from recognition → belonging → curiosity → trust → deep read → safety → climax → exhale
- Documented 10 explicit rejections (Liquid Glass, centered hero, violet palette, all-caps fonts, full anti-polish) to prevent scope creep in 06-05

## Task Commits

Each task was committed atomically:

1. **Task 1: Design system exploration via ui-ux-pro-max skill** - `8c4d5ed` (feat)
2. **Task 2: Visual direction brief** - `60361dd` (feat)

**Plan metadata:** (docs commit follows)

## Files Created/Modified

- `design-system/MASTER.md` — synthesized design system with full decision log (11 searches documented, rejected options explained)
- `design-system/pages/landing.md` — section-by-section landing page composition specs with ASCII layout diagrams
- `design-system/kin/MASTER.md` — raw skill-generated design system (persisted via `--persist` flag)
- `design-system/kin/pages/landing.md` — raw skill-generated landing page overrides
- `.planning/phases/04-brand-positioning-research-and-visual-direction/04-04-visual-direction-brief.md` — full visual direction spec: 5 parts, all 8 sections

## Decisions Made

- **PP Pangaia KEEP** — comparison-based conclusion after evaluating 15 alternatives. Ultralight at 140px embodies #5 Neo-Minimalism (type IS the composition). Italic embodies #6 Emotion-Led (warmth). No evaluated Google Font achieves both simultaneously.
- **Kin palette VALIDATED** — luxury/premium dark + gold accent from skill color searches confirms Deep Teal + Burnished Amber direction. Nature Distilled style confirms Cloud White warm background. No palette change needed.
- **Trend formula confirmed** — #5 (Exaggerated Minimalism style from skill) + #6 (Nature Distilled texture) + #9 (Anti-Polish/Raw for craft signals) maps exactly to the formula derived from 2026 trend research.
- **Scroll-Triggered Storytelling** — landing pattern from skill search. Chapter-by-chapter narrative arc matches Kin's revelation emotional journey exactly.
- **Liquid Glass rejected** — performance poor, wrong register for trust product. Glassmorphism only on deep teal cards where it's genuinely atmospheric.
- **ONE bold moment rule** — every section has one typographic or visual element that commands attention. No competing focal points.

## Deviations from Plan

None — plan executed exactly as written. All 6 skill search steps performed (plus additional searches beyond minimum). Design system persisted. Decision log documented. Visual direction brief created with all 8 sections specified.

## Issues Encountered

- Skill auto-matcher returned "Liquid Glass" and "Vibrant & Block-based" for most searches — these don't match the Kin direction. This is expected behavior: the skill recommends from its database based on keyword matching, and the practitioner's role is to synthesize the recommendations against the specific brand context. The skill's typography and style domain searches were more useful than the design system generators.

## Next Phase Readiness

- Plan 06-05 (implementation) has a complete visual direction brief to implement from
- All 8 sections have implementation-ready specs
- What already works in the current codebase is explicitly documented (PP Pangaia loading, globals.css grain/breathe/organic-easing, scroll-reveal, hand-drawn components) — 06-05 can build from this base
- Implementation targets for 06-05: KOLNarrative quote size (push to 24-28px italic), KOLCredibility header left-alignment, SecondaryHero font-weight verification, ArchetypePreview option button hover states

---
*Phase: 04-brand-positioning-research-and-visual-direction*
*Completed: 2026-02-28*
