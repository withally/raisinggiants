---
phase: 025-archetype-content-rewrite
plan: 01
subsystem: content
tags: [archetypes, copy, parents-lens, framing, content-rewrite]

# Dependency graph
requires:
  - phase: 00-archetype-framework
    provides: 9 archetype definitions with clinical profiles and citation structure
  - phase: 02-quiz-engine
    provides: Quiz established as past-lens only (questions already correct)
provides:
  - All 9 archetypes in archetypes.ts with parents-lens taglines, foundational patterns, and watchouts
  - "You grew up [X]." tagline pattern for all 9 archetypes
  - Watchout headlines using "absorbed a quiet rule" pattern per CONTEXT.md
  - Research anchors reframed to "children raised with..." perspective
affects:
  - 025-02 (cultural overlays rewrite, same phase)
  - Phase 3 Mirror result page (reads archetype content directly)
  - Landing page archetype previews

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Parents-lens framing: all content in archetypes.ts describes parenting received, not parenting done"
    - "Tagline pattern: 'You grew up [adjective/phrase].' — 10 words or fewer"
    - "Watchout headline: 'Growing up with this kind of [quality], you may have absorbed a quiet rule: [belief]. That served you then. It may not serve you now.'"
    - "Watchout themes: past origin ('You may have learned that...') + present echo ('Many people raised this way find...')"
    - "Research anchors: 'Research on attachment shows that children raised with...' not 'Research shows that parents who...'"
    - "Caregiver reference: 'the people who raised you' — inclusive of non-traditional caregivers"

key-files:
  created: []
  modified:
    - lib/archetypes/archetypes.ts

key-decisions:
  - "[025-01-A] Resilient Striver reframed: parents' healing journey observed by child, not child having done healing work — 'the people who raised you had done their own healing work' and 'you grew up watching someone rewrite the story'"
  - "[025-01-B] Taglines use 'You grew up [X].' pattern for all 9 (anchored, protected, held, given room to become yourself, watching someone rewrite the story, expected to be capable, loved by someone still learning how, championed, with a voice in the room)"
  - "[025-01-C] Recurring watchout closer 'That served you then. It may not serve you now.' applied once per watchout headline across all 9 archetypes"
  - "[025-01-D] TypeScript structure, dimension profiles, citation objects, import/export statements, and validateArchetypeDistinctness function left entirely untouched"

requirements-completed: [COPY-01, COPY-02, COPY-03]

# Metrics
duration: 8min
completed: 2026-02-26
---

# Phase 025 Plan 01: Archetype Content Rewrite Summary

**All 9 archetypes rewritten from "you as parent" to "parenting you received" framing — parents-lens taglines, inherited foundational patterns, and absorbed-watchouts structure with research anchors shifted to child perspective**

## Performance

- **Duration:** ~8 min
- **Started:** 2026-02-25T22:38:37Z
- **Completed:** 2026-02-25T22:46:00Z
- **Tasks:** 1 of 1
- **Files modified:** 1

## Accomplishments

- Rewrote all 9 archetype taglines to "You grew up [X]." pattern per CONTEXT.md specification
- Rewrote all 9 foundational pattern headlines and 45 themes to inherited/received framing ("you grew up in a home where...", "the people who raised you...")
- Rewrote all 9 watchout headlines to "absorbed a quiet rule" pattern with past-origin + present-echo structure in every theme
- Rewrote all 18 researchAnchor strings to "children raised with..." perspective (was "parents who...")
- Preserved all citation objects (researcher, workTitle, year, relevanceNote) unchanged
- Handled The Resilient Striver carefully: shifted from "parent who did healing work" to "child who grew up watching a parent do healing work" — nuance fully preserved
- TypeScript compiles without errors; all 9 taglines pass automated pattern check; zero wrong-framing patterns remain

## Task Commits

1. **Task 1: Rewrite taglines, foundational patterns, and file comments for all 9 archetypes** - `a5050fa` (feat)

**Plan metadata:** [pending final commit]

## Files Created/Modified

- `lib/archetypes/archetypes.ts` - All content strings rewritten to parents-lens framing; file-level comments updated; TypeScript structure, dimension profiles, citations, and validation function untouched

## Decisions Made

- **[025-01-A]** The Resilient Striver required the most creative rewriting. The original framed the user as a parent who had done healing work from a difficult past. Under parents-lens this became: the people who raised you had done their own healing work, and you grew up as a witness to that journey. The watchout shifted accordingly — the child may have carried some of the weight of the parent's healing narrative. The earned-security quality is preserved but entirely reoriented.
- **[025-01-B]** Taglines for the 6 archetypes not pre-specified in CONTEXT.md were chosen as: Intentional Guide ("given room to become yourself"), Resilient Striver ("watching someone rewrite the story"), Structured Mentor ("expected to be capable"), Open-Hearted Learner ("loved by someone still learning how"), Devoted Champion ("championed"), Collaborative Ally ("with a voice in the room").
- **[025-01-C]** The recurring closer "That served you then. It may not serve you now." appears exactly once in each watchout headline — not in individual theme bullets, to avoid repetitive tone.
- **[025-01-D]** File-level design constraint comments updated from "referencing current parenting style" to "describing the parenting the user received" and from "Would a parent proudly share this as their result?" to "Would someone proudly share this as how they were raised?"

## Deviations from Plan

None — plan executed exactly as written. All specification requirements met: TypeScript compiles, 9/9 taglines use "You grew up [X]." pattern, zero wrong-framing patterns, all watchouts use absorbed-a-quiet-rule headline structure, all research anchors reframed to child-receiving perspective, citations unchanged.

## Issues Encountered

None.

## User Setup Required

None — no external service configuration required.

## Next Phase Readiness

- archetypes.ts is now fully parents-lens for all 9 core archetypes
- Phase 3 Mirror Result Page can now use archetype content directly without framing mismatches
- Cultural overlays (Plan 025-02) remain in parent-doing framing and require the same rewrite treatment
- The "warm expert friend" tone is maintained throughout — content reads as empathetic, normalizing, non-blaming

---
*Phase: 025-archetype-content-rewrite*
*Completed: 2026-02-26*
