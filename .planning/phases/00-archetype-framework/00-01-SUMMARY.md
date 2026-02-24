---
phase: 00-archetype-framework
plan: 01
subsystem: framework
tags: [typescript, archetypes, parenting, kol-research, dimensional-scoring]

# Dependency graph
requires: []
provides:
  - TypeScript type contracts for the complete archetype data shape (lib/archetypes/types.ts)
  - 7 scoring dimension definitions with KOL anchors and candidate quiz questions (lib/quiz/dimensions.ts)
  - KOL synthesis document cross-referencing 11 major parenting research frameworks
affects:
  - 00-02-PLAN.md (archetype dimension profiles — uses DimensionProfile type and DIMENSION_KEYS)
  - 00-03-PLAN.md (scoring validation script — uses ScoringMatrix, DimensionDefinition, LensResult)
  - 00-04-PLAN.md (content outlines — uses ArchetypeContent, CulturalOverlay, Citation types)
  - 00-05-PLAN.md (Sophia review — all types used throughout)
  - Phase 2 Quiz Engine (imports DimensionDefinition from lib/quiz/dimensions.ts)
  - Phase 3 Result Page (imports Archetype, LensResult, FullResult from lib/archetypes/types.ts)

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Record<DimensionKey, number> for dimension profiles — adding/removing dimensions requires no type change"
    - "KOL synthesis first, then dimension derivation, then archetypes — waterfall content pipeline to avoid rework"
    - "candidateQuestions on each DimensionDefinition to validate quiz-translatability before finalizing dimensions"

key-files:
  created:
    - lib/archetypes/types.ts
    - lib/quiz/dimensions.ts
    - .planning/phases/00-archetype-framework/kol-synthesis.md
  modified: []

key-decisions:
  - "DimensionProfile uses Record<DimensionKey, number> not named fields — dimension count can change without type breakage"
  - "7 dimensions selected (not 6): added Presence/Attunement as a dimension distinct from Emotional Regulation, capturing Tsabary's conscious-vs-reactive axis that cuts across warmth and structure"
  - "Punitive Discipline (PBDQ factor 2) excluded — collinear with inverse Emotional Warmth and inverse Emotional Regulation"
  - "Narrative Coherence dimension is primarily Past-lens-only — Sophia to confirm if modified form applies to Current lens"
  - "Presence/Attunement and Emotional Regulation are distinct dimensions — Sophia to validate discriminant validity in Plan 02"

patterns-established:
  - "Types-only files: lib/archetypes/types.ts exports no runtime values — clean separation of contract from implementation"
  - "KOL synthesis document format: table → overlap matrix → recommended → excluded → final summary table"
  - "DimensionDefinition shape: key, name, description, lowLabel, highLabel, researchAnchors, candidateQuestions, lensNotes"

requirements-completed: [ARCH-01, ARCH-02]

# Metrics
duration: 6min
completed: 2026-02-24
---

# Phase 0 Plan 01: TypeScript Contracts, KOL Synthesis, and Scoring Dimensions Summary

**7 scoring dimensions derived from 11-framework KOL synthesis, TypeScript data contracts for the full archetype system including three-lens model, and validated quiz-translatability for all dimensions**

## Performance

- **Duration:** 6 min
- **Started:** 2026-02-24T00:49:21Z
- **Completed:** 2026-02-24T00:55:30Z
- **Tasks:** 2
- **Files modified:** 3

## Accomplishments

- TypeScript type system defining the complete data shape for all Phase 0 outputs — 11 exported types covering the full archetype lifecycle from DimensionProfile to FullResult with three-lens model
- KOL synthesis document cross-referencing 11 major parenting research frameworks (Baumrind, Maccoby & Martin, Gottman, Siegel, Ainsworth, Main, Tsabary, Siegel & Hartzell, PBDQ, Lansford, van IJzendoorn) with dimension overlap matrix and exclusion rationale
- 7 DimensionDefinition objects with descriptions, 1-10 scale labels, research anchors, 2-3 candidate quiz questions each, and lens notes — all dimensions pass the quiz-translatability test

## Task Commits

Each task was committed atomically:

1. **Task 1: Create TypeScript type contracts** - `7c65809` (feat)
2. **Task 2: Build KOL synthesis and define scoring dimensions** - `0188300` (feat)

**Plan metadata:** *(pending final metadata commit)*

## Files Created/Modified

- `lib/archetypes/types.ts` — 11 exported TypeScript types: ArchetypeId, DimensionKey, DimensionProfile, Citation, ArchetypeContent, CulturalOverlay, Archetype, DimensionDefinition, ScoringMatrix, LensResult, FullResult. Types only — no runtime values. Full JSDoc on every interface.
- `lib/quiz/dimensions.ts` — DIMENSION_KEYS array and DIMENSIONS array with 7 DimensionDefinition objects. Imports DimensionKey and DimensionDefinition from ../archetypes/types. 382 lines.
- `.planning/phases/00-archetype-framework/kol-synthesis.md` — Structured KOL synthesis table (11 researchers), dimension overlap matrix, 7 recommended dimensions with justification, excluded dimensions table, final summary table. 148 lines.

## Decisions Made

- **7 dimensions, not 6:** Research synthesis naturally produced 7 distinct, clinically independent dimensions. Presence/Attunement (Tsabary, Siegel) was added as the 7th — it captures the conscious-vs-reactive axis that cuts across warmth and structure levels, which cannot be reduced to either Emotional Warmth or Emotional Regulation.
- **DimensionProfile as Record type:** Using `Record<DimensionKey, number>` instead of named fields means adding or removing a dimension in a future revision does not require any type changes across consuming code. This is the most important structural decision in the type contract.
- **Punitive Discipline excluded:** PBDQ Factor 2 was excluded because it is largely collinear with the inverse of Emotional Warmth and Emotional Regulation. Including it as a separate dimension would create redundant quiz questions and confound scoring.
- **Narrative Coherence is primarily Past-lens-only:** The dimension most directly tied to the Past lens (Main's AAI coherence scale, van IJzendoorn transmission research). Sophia needs to confirm whether a modified form applies to the Current lens or whether it should be excluded from Current scoring entirely.

## Deviations from Plan

None — plan executed exactly as written. The 7th dimension (Presence/Attunement) was included as planned — the research synthesis supported it and the task specification listed it as dimension 7.

## Issues Encountered

None.

## User Setup Required

None — no external service configuration required.

## Next Phase Readiness

- **Plan 02 (Archetype definitions):** Ready. `DimensionProfile`, `Archetype`, `ArchetypeContent`, `CulturalOverlay`, and `DIMENSION_KEYS` are all defined and stable. Sophia can now author archetype dimension profiles using the 7-dimension schema.
- **Blocker note:** Sophia's review of the KOL synthesis and dimension set should happen before Plan 02 proceeds. The dimension count (7) and the Narrative Coherence lens scope question are the two items most likely to require Sophia's adjustment.
- **Simulation (Plan 03):** The `ScoringMatrix` and `LensResult` types are ready; scoring algorithm implementation can proceed once archetype profiles exist (Plan 02).

---
*Phase: 00-archetype-framework*
*Completed: 2026-02-24*
