---
phase: 06-brand-positioning-research-and-visual-direction
plan: 02
subsystem: brand-strategy
tags: [brand-research, visual-identity, typography, color-theory, editorial-design, reference-gallery]

# Dependency graph
requires:
  - phase: 06-brand-positioning-research-and-visual-direction
    provides: "Phase 06-01 competitive landscape — positioned Raising Giants in the competitive gap"
provides:
  - "Reference brand gallery with 10 detailed brand profiles (visual attributes + emotional response)"
  - "Pattern synthesis across color, typography, imagery, layout, and tone"
  - "7 direction signals actionable for the visual direction brief"
  - "getrelatio.com deep benchmark analysis"
affects:
  - "06-03 (positioning narrative) — vocabulary gift and permission patterns inform tone direction"
  - "06-04 (visual direction brief) — 7 direction signals feed directly into visual recommendations"
  - "06-05 (rebrand execution plan) — typography, color, and illustration findings scope implementation"

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Audience-first brand research: identify reference brands by where the target audience already spends time, not by industry category"
    - "Visual attributes + emotional response dual documentation: capture both what the brand looks like AND how it makes you feel"
    - "Pattern synthesis before direction: discover recurring patterns across multiple brands before prescribing visual direction"

key-files:
  created:
    - ".planning/phases/06-brand-positioning-research-and-visual-direction/06-02-reference-brand-gallery.md"
  modified: []

key-decisions:
  - "[06-02-A] Serif display fonts (confirmed): Cormorant Garamond is aligned with the reference brand pattern — high-contrast editorial serifs dominate the deep+warm register across all 10 reference brands. Maintain and increase expressive use of Cormorant italic."
  - "[06-02-B] Accent color specificity: Current amber is directionally correct but lacks specific emotional meaning. Signal 2 recommends evaluating terracotta (the earthen, the past) or aged gold (wisdom, accumulated understanding) as more semantically specific alternatives."
  - "[06-02-C] Whitespace as trust signal: 30-50% increase in section padding and inter-element spacing is warranted based on the pattern — whitespace is the most reliable signal of depth in the target audience's visual experience."
  - "[06-02-D] Illustration direction: Shift from 'geometric abstraction' to 'emotionally evocative metaphor' — specific scenes depicting the act of looking back, recognizing patterns, or the parent-child relationship."
  - "[06-02-E] Vocabulary gift as core brand mechanism: The naming pattern (Brené Brown's 'vulnerability', Gottman's 'bids for connection') is the primary trust mechanism — archetype names and marketing copy must be positioned as vocabulary gifts, not labels."
  - "[06-02-F] Permission-giving tone: On Being and Brené Brown pattern — give permission before revelation. Landing page and quiz copy should acknowledge what users might be feeling before asking them to engage."

patterns-established:
  - "Pattern: Deep + Warm register = warm near-neutrals + earthy chromatic accent + high-contrast serif display + generous whitespace + editorial rhythm"
  - "Pattern: Vocabulary gift mechanism — naming unnamed experiences creates the 'seen' feeling more reliably than description"
  - "Pattern: Permission before revelation — normalize the experience before asking the user to engage with it"

requirements-completed: [BRAND-03]

# Metrics
duration: 5min
completed: 2026-02-27
---

# Phase 06 Plan 02: Reference Brand Gallery Summary

**10 reference brands profiled (getrelatio.com deep benchmark + 9 cross-industry brands) with 7 direction signals for the visual brief, identifying the deep+warm register as the target aesthetic and vocabulary-gift as the core trust mechanism**

## Performance

- **Duration:** 5 min
- **Started:** 2026-02-27T07:05:33Z
- **Completed:** 2026-02-27T07:10:52Z
- **Tasks:** 2
- **Files modified:** 1

## Accomplishments

- Built a 679-line reference brand gallery profiling 10 brands across 6+ industries (relationship assessment, personal growth publishing, research-storytelling, journaling, editorial lifestyle, spiritual inquiry, relationship psychology, sleep tech, mindfulness, book publishing)
- Synthesized 5 pattern categories (color, typography, imagery, layout, tone) from the cross-brand analysis with specific brand examples for each pattern
- Distilled 7 actionable direction signals that bridge research findings to concrete visual choices in the Plan 04 visual direction brief
- Confirmed Cormorant Garamond as correctly chosen display font (aligned with every high-depth brand in the study); identified accent color specificity as the primary visual gap in the current brand

## Task Commits

Each task was committed atomically:

1. **Task 1: Identify and profile 8-12 reference brands with visual + emotional analysis** - `3ef7e2d` (feat)
2. **Task 2: Synthesize visual and tonal patterns across reference brands** - `3ef7e2d` (feat — included in same document creation; pattern synthesis written concurrently with brand profiles)

**Plan metadata:** (final docs commit — see below)

## Files Created/Modified

- `.planning/phases/06-brand-positioning-research-and-visual-direction/06-02-reference-brand-gallery.md` — Complete reference brand gallery: 10 brand profiles, pattern synthesis, 7 direction signals

## Decisions Made

- **[06-02-A] Cormorant Garamond confirmed:** Every high-depth brand in the reference set uses high-contrast editorial serif display fonts. The current font choice is correct and should be maintained and extended.
- **[06-02-B] Accent color requires specificity:** The current amber is warm but generic. Terracotta (earthen, the past, the enduring) or aged gold (wisdom, accumulated understanding) would encode Raising Giants' brand territory more specifically.
- **[06-02-C] Whitespace standards needed:** The whitespace pattern analysis recommends specifying minimum whitespace standards in the visual brief — 30-50% increase from current implementation.
- **[06-02-D] Illustration brief direction:** Move from geometric abstraction to emotionally evocative metaphor — specific scenes that depict interior psychological states (looking back, pattern recognition, the space between past and present).
- **[06-02-E] Vocabulary gift as brand mechanism:** The naming of unnamed experiences (Brené Brown model, Gottman Institute model) is the core trust mechanism. Archetype names must be framed as vocabulary gifts in copy.
- **[06-02-F] Permission-giving tone pattern:** Add explicit permission language before depth-requiring content throughout the product — landing page, quiz, and result page.

## Deviations from Plan

None — plan executed exactly as written. Both tasks completed in a single document creation since the pattern synthesis was developed concurrently with the brand profiles (each brand profile includes the "what works / what doesn't" analysis that feeds directly into the synthesis). This is an efficient execution of the task intent, not a deviation from it.

## Issues Encountered

None.

## User Setup Required

None — no external service configuration required.

## Next Phase Readiness

- Plan 03 (Positioning Narrative): The vocabulary gift and permission-giving patterns identified in Signal 6 and Signal 7 directly inform the tone and voice of the positioning narrative. The brand territory of "grounded self-discovery" is confirmed as unoccupied by any reference brand — all 10 profiled brands occupy adjacent but distinct territories.
- Plan 04 (Visual Direction Brief): All 7 direction signals are specific enough to guide concrete visual choices. The brief should reference Signals 1-7 explicitly and translate each into specific visual specifications (font weights, color hex codes, whitespace values, illustration style description).
- Plan 05 (Rebrand Execution Plan): The illustration system direction (Signal 4) is likely the highest-effort execution item — current abstract/geometric SVG illustrations would need new direction (not full rebuild). Typography and color changes can be implemented in single-file edits.

---
*Phase: 06-brand-positioning-research-and-visual-direction*
*Completed: 2026-02-27*
