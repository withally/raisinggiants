---
phase: 02-quiz-engine
plan: 02
subsystem: quiz
tags: [typescript, quiz, question-bank, scoring, archetypes]

# Dependency graph
requires:
  - phase: 02-quiz-engine/02-01
    provides: "Quiz session infrastructure and DimensionProfile types"
  - phase: 00-archetype-framework
    provides: "11 scoring dimensions (DIMENSION_KEYS), archetype types, scoring-matrix.ts"
provides:
  - "lib/quiz/questions.ts — complete QUESTIONS array (32 questions), QuizQuestion/QuizOption/QuizSection types, SECTIONS, TOTAL_QUESTIONS"
  - "lib/quiz/compute-profile.ts — computeDimensionProfile() function bridging raw answers to DimensionProfile"
affects:
  - quiz-ui
  - quiz-store
  - scoring-integration
  - phase-03-result-display
  - phase-05-ai-generation

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "dimensionScores mapping: each option ID maps to Partial<Record<DimensionKey, number>> enabling multi-dimension scoring per option"
    - "Question sections as separate SECTIONS array decoupled from QUESTIONS for UI layout flexibility"
    - "whyWeAskThis + leadIn pattern for sensitive questions (tap-to-reveal helper + normalizing sentence)"
    - "Searchable-dropdown inputType as escape hatch for metadata questions (cultural background)"
    - "Midpoint default (5) for uncovered dimensions in computeDimensionProfile — prevents zero-score artifacts"

key-files:
  created:
    - lib/quiz/questions.ts
    - lib/quiz/compute-profile.ts
  modified: []

key-decisions:
  - "32 questions total (vs 25-30 target) — extra questions added to achieve 2+ contributions per dimension at minimum; all pass automated verify (25-35 range)"
  - "dimensionScores allows multi-dimension scoring per option — e.g. hug-listen answer scores both emotional-warmth:9 and presence-attunement:9"
  - "computeDimensionProfile defaults uncovered dimensions to 5 (midpoint) rather than 0 — avoids extreme archetype bias from unanswered sections"
  - "Cultural background question has empty dimensionScores — explicitly metadata, not scored, consistent with QUIZ-06 spec"
  - "All string literals with apostrophes use double-quote delimiters to avoid TypeScript parse errors"

patterns-established:
  - "Question ID convention: q-{dimension}-{lens}-{nn} e.g. q-warmth-past-01"
  - "Sensitive questions require both whyWeAskThis and (optionally) leadIn normalizing sentence"
  - "Likert-scale options: always(9), often(7), sometimes(5), rarely(3), never(1) — consistent across all frequency questions"
  - "Behavioral scenario options: 4-5 options with scenario-specific scores rather than fixed Likert values"

requirements-completed: [QUIZ-05, QUIZ-06, QUIZ-08]

# Metrics
duration: 5min
completed: 2026-02-24
---

# Phase 2 Plan 02: Question Bank and Scoring Bridge Summary

**32-question warm conversational quiz bank covering all 11 scoring dimensions, with computeDimensionProfile() bridging raw answers to archetype scoring**

## Performance

- **Duration:** 5 min
- **Started:** 2026-02-24T12:11:32Z
- **Completed:** 2026-02-24T12:16:38Z
- **Tasks:** 2
- **Files modified:** 2 created

## Accomplishments

- Complete QUESTIONS array (32 questions) covering all 11 dimensions with zero uncovered dimensions confirmed by automated verification
- Every question passes the warm-friend test: second-person, behavioral, non-clinical language with no option feeling obviously "better"
- 10 questions include whyWeAskThis helper text (Narrative Coherence x3, Role Integrity x2, Repair/Reconnection x2, Cultural Background x1, current Repair x1, current Role Integrity x1)
- Cultural background question uses searchable-dropdown inputType with 5 cultural contexts matching cultural-overlays.ts plus Other
- computeDimensionProfile() integrates end-to-end: answers -> DimensionProfile -> getResult() returns valid primary + 3 secondaries

## Task Commits

Each task was committed atomically:

1. **Task 1: Create question bank with 32 warm conversational questions** - `1bbc045` (feat)
2. **Task 2: Create computeDimensionProfile function** - `92f8452` (feat)

## Files Created/Modified

- `lib/quiz/questions.ts` — QuizOption/QuizQuestion/QuizSection types, SECTIONS array, QUESTIONS array (32 questions), TOTAL_QUESTIONS export
- `lib/quiz/compute-profile.ts` — computeDimensionProfile() function converting Record<questionId, optionId> to DimensionProfile

## Decisions Made

- **32 questions (vs 25-30 target):** Extra coverage ensures every dimension has multiple contributing questions and the 25-35 automated verify range is satisfied
- **Multi-dimension scoring per option:** e.g. the "hug-listen" option scores both emotional-warmth (9) and presence-attunement (9), reflecting real-world construct correlation
- **Midpoint default (5):** computeDimensionProfile defaults uncovered dimensions to 5 rather than 0 to avoid artificially low scores for dimensions that happen to have no answers in a partial session
- **Double-quote strings for contractions:** TypeScript esbuild transform requires double quotes when string contains apostrophes; fixed during Task 1 execution

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Fixed apostrophe-in-single-quote parse errors**
- **Found during:** Task 1 (question bank creation)
- **Issue:** Several question option labels contained contractions (they'd, wasn't, it'll, they're, don't) inside single-quoted TypeScript string literals, causing esbuild parse errors
- **Fix:** Changed affected string delimiters from single quotes to double quotes for all 7 affected labels
- **Files modified:** lib/quiz/questions.ts
- **Verification:** npx tsx verification script passed after fixes
- **Committed in:** 1bbc045 (Task 1 commit — fixes applied before commit)

---

**Total deviations:** 1 auto-fixed (1 bug — string escaping)
**Impact on plan:** Trivial fix required during Task 1; no scope change. Plan executed substantially as written.

## Issues Encountered

- TypeScript string literal parse errors on apostrophes required inline fix before first verification run passed. Resolved in under 2 minutes.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- Question bank and scoring bridge are complete and verified end-to-end
- getResult(computeDimensionProfile(answers)) confirmed to return valid primary archetype + 3 secondaries
- Ready for Phase 2 Plan 03: Quiz Store (Zustand state management for quiz progress and answers)
- No blockers

---
## Self-Check: PASSED

- FOUND: lib/quiz/questions.ts
- FOUND: lib/quiz/compute-profile.ts
- FOUND: .planning/phases/02-quiz-engine/02-02-SUMMARY.md
- FOUND: commit 1bbc045 (Task 1 — question bank)
- FOUND: commit 92f8452 (Task 2 — computeDimensionProfile)

---
*Phase: 02-quiz-engine*
*Completed: 2026-02-24*
