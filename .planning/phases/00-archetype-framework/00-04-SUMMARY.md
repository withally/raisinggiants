---
phase: 00-archetype-framework
plan: 04
subsystem: framework
tags: [typescript, archetypes, parenting, content-outlines, cultural-overlays, kol-research]

# Dependency graph
requires:
  - 00-01 (DimensionProfile type, DIMENSION_KEYS, CulturalOverlay interface from types.ts)
  - 00-02 (ARCHETYPES array structure with EMPTY_CONTENT placeholders)
  - 00-03 (scoring simulation PASS gate — content work gated on validated archetype profiles)
provides:
  - Fully populated archetype content: foundationalPatterns + watchouts for all 7 archetypes (lib/archetypes/archetypes.ts)
  - 35 cultural overlay entries: 7 archetypes x 5 contexts (lib/archetypes/cultural-overlays.ts)
  - CULTURAL_OVERLAYS exported record keyed by ArchetypeId (lib/archetypes/cultural-overlays.ts)
  - Complete archetype data structure — ready for Sophia's clinical validation review (Plan 05)
affects:
  - 00-05-PLAN.md (Sophia validation review — all archetype content and cultural overlays ready)
  - Phase 3 result page (consumes archetype name, tagline, foundationalPatterns, watchouts)
  - Phase 5 AI prompts (uses archetype id + foundationalPatterns/watchouts themes as generation context)
  - Phase 5 AI prompts (uses cultural context for personalized overlay content)

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Import CULTURAL_OVERLAYS from cultural-overlays.ts into archetypes.ts — separation of concerns between archetype identity/scoring (archetypes.ts) and cultural expression modifiers (cultural-overlays.ts)"
    - "Nullish coalescing fallback for culturalOverlays assignment: CULTURAL_OVERLAYS['id'] ?? [] — safe even if an id is missing from the record"
    - "Content structured as outline bullet points (themes: string[]) not prose — skeleton for Phase 5 AI expansion"

key-files:
  created:
    - lib/archetypes/cultural-overlays.ts
  modified:
    - lib/archetypes/archetypes.ts

key-decisions:
  - "5 cultural contexts chosen (not 4 or 6): East Asian collectivist, South Asian joint-family, Latin American familismo, Sub-Saharan African community-centred, Western individualist — covers highest-diversity segments with distinct enough profiles to produce meaningful overlays"
  - "Western individualist treated as one context among equals with full strengthsInContext and tensionsInContext arrays — not an empty baseline; avoids the anti-pattern of treating Western as the default"
  - "5 themes per content section (not 3-4): the plan specified 3-5; every archetype received 5 themes because the clinical nuance of each archetype warranted complete exploration at the outline stage"
  - "3 items per overlay array (strengthsInContext and tensionsInContext): sufficient specificity for Sophia's review without over-specifying content that AI will expand in Phase 5"

patterns-established:
  - "Content outline discipline: themes are 1-2 sentence structured bullet points with research reference where applicable — not full prose, not bare noun phrases; the right level of specificity for clinical validation before AI expansion"
  - "Watchout tone formula: normalized framing headline ('when stress runs high...') + 'when stressed, you might find yourself...' within individual themes + specific researcher/framework reference — the blend of research grounding and gentle directness specified in CONTEXT.md"
  - "Cultural overlay expression modifier structure: 2-4 sentences describing the surface manifestation shift, grounded in cultural context specifics (e.g., filial piety, familismo, communal child-rearing) rather than vague cultural generalizations"

requirements-completed: [ARCH-03, ARCH-04, ARCH-05]

# Metrics
duration: 10min
completed: 2026-02-24
---

# Phase 0 Plan 04: Content Outlines and Cultural Overlays Summary

**All 7 archetype content sections populated (5 themes + research anchor + citations each for foundational patterns and watchouts) and 35 cultural overlay entries created across 5 named cultural contexts — full archetype data structure ready for Sophia's clinical review**

## Performance

- **Duration:** 10 min
- **Started:** 2026-02-24T01:16:04Z
- **Completed:** 2026-02-24T01:26:08Z
- **Tasks:** 2
- **Files modified:** 2 (1 created, 1 substantially modified)

## Accomplishments

- All 7 archetypes have populated foundationalPatterns: headline (strength-first, parent-proud-to-share), 5 themes (structured outline bullets with research references), researchAnchor (specific KOL framework), 2 citations (researcher + workTitle + year + relevanceNote)
- All 7 archetypes have populated watchouts: normalized headline using "when stress runs high..." framing, 5 themes using "when stressed, you might find yourself..." language, researchAnchor, 2 citations
- 35 cultural overlay entries created: every archetype x 5 cultural contexts, each with expressionModifier (2-4 sentences), 3 strengthsInContext bullets, 3 tensionsInContext bullets
- Western individualist context treated as one context among equals — not an empty baseline
- No archetype watchout reads as pathologizing — each is framed as a normalized challenge every parent faces
- Scoring validation still passes (npx tsx scripts/validate-scoring.ts: VERDICT: PASS) — content additions did not break any existing functionality

## Task Commits

Each task was committed atomically:

1. **Task 1: Populate foundational patterns and watchouts for every archetype** — `5df531f` (feat)
2. **Task 2: Create cultural context overlays for every archetype** — `30380b4` (feat)

## Files Created/Modified

- `lib/archetypes/archetypes.ts` — 764 lines (was 437). All 7 archetypes now have fully populated foundationalPatterns and watchouts replacing EMPTY_CONTENT. Added import of CULTURAL_OVERLAYS from cultural-overlays.ts. Each archetype's culturalOverlays field now assigned from CULTURAL_OVERLAYS record. EMPTY_CONTENT constant removed.

- `lib/archetypes/cultural-overlays.ts` — 633 lines (new file). Exports CULTURAL_OVERLAYS as Record<ArchetypeId, CulturalOverlay[]>. 5 named cultural context labels defined as constants for consistency. 7 archetype overlay arrays (STEADY_ANCHOR_OVERLAYS, etc.) each containing 5 CulturalOverlay objects.

## Content Summary by Archetype

| Archetype | FP Headline | FP Themes | WO Framing | WO Themes | Overlays |
|-----------|-------------|-----------|------------|-----------|---------|
| Steady Anchor | "calm, consistent presence gives children deep sense of safety" | 5 | "steadiness can tip into emotional distance" | 5 | 5 |
| Fierce Guardian | "move mountains to keep them safe" | 5 | "fierce protection can become what keeps children from strength" | 5 | 5 |
| Gentle Nurturer | "inner world matters — foundation of emotional intelligence" | 5 | "warmth can leave children without structure they need" | 5 | 5 |
| Intentional Guide | "most conscious and transformative acts" | 5 | "parenting as project to perfect rather than relationship to inhabit" | 5 | 5 |
| Resilient Striver | "hard, quiet work of understanding where you came from" | 5 | "story of where you came from takes up more space than where you are" | 5 | 5 |
| Structured Mentor | "parent who genuinely believes they are capable of hard things" | 5 | "competent at everything except knowing loved for who they are" | 5 | 5 |
| Open-Hearted Learner | "bring whole self to parenting — warmth, sensitivity, commitment" | 5 | "children's emotional moments sometimes activate yours" | 5 | 5 |

## Decisions Made

- **5 themes per content section (not 3-4):** The plan specified 3-5; every archetype received 5 because the clinical nuance of each warranted complete exploration. The outline level of specificity makes 5 themes readable without becoming prose.

- **5 cultural contexts:** The plan recommended 4-5; 5 was chosen to ensure complete coverage of the highest-diversity segments. Western individualist is included as a full context (not empty baseline) per the anti-pattern guidance.

- **3 items in strengthsInContext and tensionsInContext:** Sufficient for specificity without pre-empting the AI expansion work in Phase 5. Each item is 1-2 sentences (outline, not prose).

## Deviations from Plan

None — plan executed exactly as written. Both cultural-overlays.ts and archetypes.ts updated in the same execution pass (archetypes.ts must import from cultural-overlays.ts, so both had to be consistent from the first commit).

## Issues Encountered

None. TypeScript compiles without errors. The scoring validation script still produces VERDICT: PASS with all 28 profiles mapped correctly.

## User Setup Required

None — no external service configuration required.

## Next Phase Readiness

- **Plan 05 (Sophia validation):** Ready. The complete archetype data structure is now fully populated:
  - 7 archetype dimension profiles (validated in Plan 03)
  - 7 archetype foundational patterns content outlines (populated in this plan)
  - 7 archetype watchout content outlines (populated in this plan)
  - 35 cultural overlay entries across 5 contexts (created in this plan)
  - Sophia can review all three content dimensions in a single session
- **Key questions for Sophia's Plan 05 review:**
  - Clinical accuracy of foundationalPatterns themes — does each archetype's pattern description feel clinically real and distinct?
  - Watchout tone check — does any watchout inadvertently read as pathologizing or make the archetype sound like the "bad" type?
  - Cultural overlay respectfulness and accuracy check — do any overlays tip into stereotyping?
  - intentional-guide low selection rate (3.6% in simulation) — clinically acceptable or needs profile adjustment?
  - structured-mentor as default for ambiguous profiles — clinically appropriate?
  - Ongoing Sophia questions from Plans 01-02: Narrative Coherence in Current lens? PA vs ER discriminant validity?

## Self-Check: PASSED

- lib/archetypes/archetypes.ts: FOUND
- lib/archetypes/cultural-overlays.ts: FOUND
- .planning/phases/00-archetype-framework/00-04-SUMMARY.md: FOUND (this file)
- Commit 5df531f (Task 1): FOUND
- Commit 30380b4 (Task 2): FOUND
- Validation: ARCHETYPES loads 7 archetypes, each with 5 themes in foundationalPatterns, 5 themes in watchouts, 5 cultural overlays
- Scoring validation: VERDICT: PASS (all 28 profiles still mapped correctly)

---
*Phase: 00-archetype-framework*
*Completed: 2026-02-24*
