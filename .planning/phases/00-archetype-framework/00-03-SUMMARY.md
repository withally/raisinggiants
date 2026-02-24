---
phase: 00-archetype-framework
plan: 03
subsystem: framework
tags: [typescript, archetypes, parenting, validation, simulation, scoring]

# Dependency graph
requires:
  - 00-01 (DimensionProfile type, DIMENSION_KEYS, DimensionDefinition types)
  - 00-02 (scoreArchetypes, getResult, ARCHETYPE_PROFILES, DIMENSION_WEIGHTS, ARCHETYPES, validateArchetypeDistinctness)
provides:
  - Scoring validation script with 28 simulated profiles across 4 categories (scripts/validate-scoring.ts)
  - Confirmed PASS verdict: archetype framework ready for Plan 04 content work
  - Distribution analysis: all 7 archetypes active, max concentration 25.0% (structured-mentor)
  - Confidence baseline: average gap 0.0805 between primary and secondary scores
  - Edge case coverage: indeterminate, single-dim maxed, ceiling, floor, trauma-suggestive, intellectualized
affects:
  - 00-04-PLAN.md (content outlines may now begin — framework is validated)
  - 00-05-PLAN.md (Sophia review — simulation output is now available for clinical review alongside dimension profiles)

# Tech tracking
tech-stack:
  added:
    - tsx (v4.21.0 via npx — TypeScript executor for script running)
    - package.json (project dependency manifest — did not previously exist)
    - tsconfig.json (TypeScript config — did not previously exist)
  patterns:
    - "Profile simulation approach: build diverse DimensionProfile instances representing clinical categories, run through scoring, analyze distribution and confidence"
    - "Pass/Fail gate pattern: define explicit numeric thresholds before running, report binary verdict — prevents subjective interpretation of results"
    - "p() helper function in validation script mirrors archetypes.ts profile() helper — dimension values in DIMENSION_KEYS order for readability"

key-files:
  created:
    - scripts/validate-scoring.ts
    - package.json
    - tsconfig.json
  modified: []

key-decisions:
  - "28 profiles validated (not 20 minimum) — additional profiles added for edge case completeness (B8: intellectualized NC) and to ensure all 7 archetypes had representative classic-pattern profiles"
  - "No dimension weight adjustments made — simulation passed with all weights = 1.0, deferring weight elevation discussion to Sophia's clinical review in Plan 05"
  - "structured-mentor as indeterminate (all-5s) result is clinically acceptable — with equal dimension values, the archetype with the most mid-range profile across more dimensions wins by narrow margin"
  - "B3 (autonomy-support-only) maps to structured-mentor not intentional-guide — clinically coherent because intentional-guide also requires high presence/attunement and moderate warmth which are absent when all other dims are 3; structured-mentor's moderate-everything profile is a closer match"

patterns-established:
  - "Simulation-first validation gate: content work (foundationalPatterns, watchouts, culturalOverlays) must not begin until this script produces PASS — enforced by plan dependency chain 00-03 → 00-04"
  - "Distribution ceiling rule: no archetype should exceed 40% of simulated profiles as primary — enforced numerically, not subjectively"
  - "4-category profile design: Classic (named clinical patterns) + Edge (extremes and indeterminate) + Cultural (cross-cultural variants) + Blended (ambiguous near-ties) — ensures comprehensive coverage of the realistic user answer space"

requirements-completed: [ARCH-01, ARCH-02]

# Metrics
duration: 3min
completed: 2026-02-24
---

# Phase 0 Plan 03: Scoring Validation Summary

**28-profile simulation across 4 categories produces VERDICT: PASS on first run — all 7 archetypes active, max concentration 25%, average confidence gap 0.0805, all 21 distinctness pairs valid**

## Performance

- **Duration:** 3 min
- **Started:** 2026-02-24T01:08:40Z
- **Completed:** 2026-02-24T01:11:24Z
- **Tasks:** 1
- **Files modified:** 3 (scripts/validate-scoring.ts, package.json, tsconfig.json)

## Accomplishments

- 28 simulated profiles created across 4 categories: Classic (8), Edge (7+1), Cultural (5), Blended (7) — exceeds the 20-30 requirement
- All 6 pass/fail gate criteria satisfied on first script run — no archetype profile adjustments required
- Distribution validated: all 7 archetypes receive at least 1 profile; structured-mentor highest at 25.0% (well below 40% ceiling)
- Edge cases confirmed: indeterminate (all-5s) produces structured-mentor result cleanly; trauma-suggestive (PI=10, ER=2) correctly maps to fierce-guardian
- Average confidence gap 0.0805 between primary and secondary scores — well above the 0.03 threshold, indicating scoring produces meaningfully distinct rankings
- All 21 archetype distinctness pairs confirmed passing (diff 3+ pts on 2+ dims), consistent with Plan 02 inline validation

## Task Commits

Each task was committed atomically:

1. **Task 1: Create scoring validation script with 28 simulated profiles** — `81365a6` (feat)

## Files Created/Modified

- `scripts/validate-scoring.ts` — 283 lines. 28 SimulatedProfile objects with label, category, profile, and expectedBehavior. Scoring via scoreArchetypes() and getResult(). Per-profile results table, distribution analysis (with degenerate/dead archetype flags), confidence analysis (gap thresholds), distinctness validation via validateArchetypeDistinctness(), edge case report, and binary PASS/FAIL verdict with remediation recommendations.

- `package.json` — 14 lines. Created for the project (did not previously exist). Includes tsx devDependency and validate-scoring npm script.

- `tsconfig.json` — 20 lines. Created for the project (did not previously exist). Bundler module resolution, strict mode, ES2022 target — compatible with npx tsx execution.

## Simulation Results Summary

### Distribution (primary archetype per profile)

| Archetype | Count | Pct | Status |
|-----------|-------|-----|--------|
| steady-anchor | 3 | 10.7% | OK |
| fierce-guardian | 6 | 21.4% | OK |
| gentle-nurturer | 6 | 21.4% | OK |
| intentional-guide | 1 | 3.6% | OK |
| resilient-striver | 3 | 10.7% | OK |
| structured-mentor | 7 | 25.0% | OK |
| open-hearted-learner | 2 | 7.1% | OK |

No archetype exceeds 40%. No dead archetypes.

### Key Edge Case Results

| Profile | Result | Clinically Plausible |
|---------|--------|---------------------|
| B1: All dims = 5 (indeterminate) | structured-mentor (0.7937) | Yes — produces result without crash |
| B7: PI=10, ER=2 (trauma) | fierce-guardian (0.8571) | Yes — anxious-protective pattern |
| B4: NC=10, all others = 3 | structured-mentor (0.6825) | Acceptable — without high ER+AS, resilient-striver is not the closest match |
| B5: All dims = 9 (ceiling) | resilient-striver (0.8254) | Yes — high-everything maps to earned-secure |
| B6: All dims = 2 (floor) | structured-mentor (0.6190) | Acceptable — produces result without crash |

### Notable Observations for Sophia's Review

1. **intentional-guide is selected least frequently (1/28, 3.6%)** — its profile (W=6, B=7, AS=10, ER=8, PI=2, NC=6, PA=9) requires a very specific combination of maximal autonomy-support + high presence/attunement. Real users are unlikely to have that specific profile without also having high warmth. This may warrant a Sophia review: should intentional-guide be redefined slightly, or is its rarity acceptable given its clinical specificity?

2. **structured-mentor is selected most frequently (7/28, 25%)** — this includes several edge cases (all-low, all-mid) where structured-mentor wins by being most "moderately everything." The archetype's low-warmth, high-boundary profile is actually moderately close to many ambiguous profiles. This is not degenerate (25% < 40%) but worth flagging for Sophia.

3. **B3 (autonomy-support maxed) → structured-mentor not intentional-guide** — when only autonomy-support is high and all other dimensions are at 3, structured-mentor wins over intentional-guide because the intentional-guide profile also has high PA=9, NC=6, and W=6 which are absent. Scoring is working correctly here.

## Decisions Made

- **No dimension weight adjustments made:** All weights remain 1.0. The simulation PASS with equal weights means the originally planned "consider raising Narrative Coherence weight" (from Plan 02 notes) is not empirically warranted at this stage. Sophia may still advocate for NC weight elevation on clinical grounds, which can be re-tested with this script.

- **28 profiles (not 20 minimum):** One extra edge case added (B8: high NC + low warmth = intellectualized) to specifically cover the "makes sense of past but emotionally disconnected" clinical pattern. This brought edges to 8 (plan specified 6-8, so within range).

- **package.json and tsconfig.json created:** These were absent from the project (which had only a lib directory). Required as a Rule 3 deviation to enable script execution. Both are minimal — package.json tracks the tsx devDependency, tsconfig.json provides compilation settings.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Created package.json and tsconfig.json (missing project infrastructure)**
- **Found during:** Task 1, before creating the script
- **Issue:** Project had no package.json or tsconfig.json — required to run `npx tsx scripts/validate-scoring.ts`
- **Fix:** Created minimal package.json with tsx devDependency and tsconfig.json with bundler module resolution
- **Files modified:** package.json, tsconfig.json
- **Verification:** `npx tsx scripts/validate-scoring.ts` runs without errors
- **Committed in:** 81365a6 (part of task commit)

---

**Total deviations:** 1 auto-fixed (1 blocking infrastructure)
**Impact on plan:** Auto-fix was prerequisite infrastructure. No scope creep — package.json and tsconfig.json are minimal and necessary for any TypeScript script execution.

## Issues Encountered

None — script ran to completion on first execution with PASS verdict.

The only noteworthy observation (not a problem): the intentional-guide low selection rate (3.6%) and the structured-mentor high selection rate (25%) are flagged as Sophia review items. Both are within acceptable bounds (0% and >40% would fail) but warrant clinical discussion.

## User Setup Required

None — no external service configuration required.

## Next Phase Readiness

- **Plan 04 (Content outlines):** Ready. Scoring validation gate has passed. `foundationalPatterns`, `watchouts`, and `culturalOverlays` population may now begin.
- **Sophia review (Plan 05):** The simulation output provides additional data for Sophia's clinical review:
  - intentional-guide low frequency (3.6%) — is this clinically acceptable or does the profile need adjustment?
  - structured-mentor as default for ambiguous profiles — is this clinically appropriate or should a different archetype serve as the "baseline"?
  - B3 result (autonomy-maxed → structured-mentor) — clinically interesting, worth discussing
- **Pending Sophia questions from Plans 01-02 (still open):**
  - Does Narrative Coherence apply to Current lens scoring?
  - Presence/Attunement vs. Emotional Regulation discriminant validity
- **Dimension weight tuning:** Not required for Plan 04 but remains available — re-run this script with modified DIMENSION_WEIGHTS to test any weight adjustments Sophia recommends

## Self-Check: PASSED

- scripts/validate-scoring.ts: FOUND
- package.json: FOUND
- tsconfig.json: FOUND
- .planning/phases/00-archetype-framework/00-03-SUMMARY.md: FOUND (this file)
- Commit 81365a6: FOUND (task 1)

---
*Phase: 00-archetype-framework*
*Completed: 2026-02-24*
