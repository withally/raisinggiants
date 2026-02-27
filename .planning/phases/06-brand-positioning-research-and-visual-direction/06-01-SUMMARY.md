---
phase: 06-brand-positioning-research-and-visual-direction
plan: 01
subsystem: brand-strategy
tags: [competitive-analysis, brand-positioning, self-discovery, wellness, personality-assessment]

# Dependency graph
requires: []
provides:
  - "15-competitor landscape audit across 3 segments with full 8-dimension profile for each"
  - "Audience-first discovery methodology applied (self-reflective adults, not parenting-tool category)"
  - "2x2 positioning map: Clinical/Institutional ↔ Warm/Intimate × Shallow/Generic ↔ Deep/Specific"
  - "Competitive gap summary: deep+warm quadrant identified as unoccupied territory"
  - "Segment-level insights for all 3 segments (self-discovery, wellness, parenting)"
  - "Cross-segment opportunity matrix establishing Raising Giants' unique position"
affects:
  - "06-03-PLAN.md (positioning narrative — gap analysis is primary input)"
  - "06-04-PLAN.md (visual direction brief)"
  - "06-05-PLAN.md (rebrand execution plan)"

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Audience-first competitor discovery: start with target user's actual consumption habits, not industry category"
    - "8-dimension full-funnel profile: brand identity, visual identity, onboarding, quiz UX, result delivery, monetization, email capture, emotional response"
    - "Positioning-before-visual sequencing: competitive gap established before any visual decisions"

key-files:
  created:
    - ".planning/phases/06-brand-positioning-research-and-visual-direction/06-01-competitive-landscape.md"
  modified: []

key-decisions:
  - "Deep+warm quadrant (upper-right) is the target positioning territory — unoccupied by all 15 competitors"
  - "Raising Giants is a revelation product not a validation product — 'I see what made me' not 'I know what I am'"
  - "Past-lens framing (parenting received) is the single strongest differentiator — no competitor occupies this lens"
  - "getrelatio.com is the benchmark for 'assessment as meaningful experience' not 'lead magnet quiz'"
  - "Segment A lesson: audit learned psychology CAN be warm and accessible; Raising Giants must go deeper than type categories"
  - "Segment B lesson: audit learned behavioral change framing is wrong register; revelation framing is unoccupied"
  - "Segment C lesson: advice-giving parenting niche is the category trap to avoid; upbringing lens is distinct"

patterns-established:
  - "Full-funnel competitive analysis: 8 dimensions per competitor in structured profile format"
  - "Competitor gap statement: explicit articulation of what each competitor does NOT do that Raising Giants does"
  - "Positioning map annotation: each competitor's X/Y position with rationale, not just placement"

requirements-completed: [BRAND-01, BRAND-02]

# Metrics
duration: 6min
completed: 2026-02-27
---

# Phase 6 Plan 01: Competitive Landscape Summary

**15-competitor audit across self-discovery, wellness, and parenting segments revealing unoccupied "deep + warm" positioning territory — the intersection of research-backed specificity and emotional intimacy — that Raising Giants is uniquely structured to claim.**

## Performance

- **Duration:** ~6 min
- **Started:** 2026-02-27T07:05:35Z
- **Completed:** 2026-02-27T07:11:14Z
- **Tasks:** 2 (both included in single document)
- **Files modified:** 1

## Accomplishments

- 15 competitor profiles written with full 8-dimension funnel analysis across three competitive segments
- Audience-first discovery methodology applied: self-reflective adult consumption habits drove competitor selection, not parenting tool category
- 2x2 positioning map created with ASCII visualization + annotated justification table for all 15 competitors
- Competitive gap summary written (600+ words): identifies four occupied clusters and the structural reason the deep+warm quadrant is underserved
- Segment-level insights for all three segments with explicit "what to learn" and "how to differentiate" guidance
- Cross-segment opportunity matrix synthesizing the gap into a single defensible positioning brief

## Task Commits

Tasks 1 and 2 produced a single document committed together (Task 2 positioning map and gap analysis were authored simultaneously with competitor profiles):

1. **Task 1+2: Competitive landscape with 15 profiles + positioning map + gap analysis** - `596c421` (feat)

**Plan metadata commit:** to follow with SUMMARY.md

## Files Created/Modified

- `.planning/phases/06-brand-positioning-research-and-visual-direction/06-01-competitive-landscape.md` — 957-line competitive landscape document: discovery methodology, summary table, 15 full profiles, 2x2 positioning map, competitive gap summary (narrative), segment insights, opportunity matrix

## Decisions Made

**[06-01-A] Deep+warm quadrant is the target position**
The 2x2 map confirms: all 15 competitors cluster in either deep+clinical (upper left) or warm+shallow (lower right). The upper-right quadrant — research-grounded AND emotionally intimate — is structurally unoccupied. Raising Giants should claim it.

**[06-01-B] Past-lens framing is the single strongest differentiator**
Every competitor describes the user's current personality or current behavior. Zero competitors ask "what was your experience of being parented?" The upbringing lens is completely unoccupied — this is the primary positioning claim.

**[06-01-C] Revelation vs. validation as emotional proposition**
The segment A (personality assessment) ceiling is validation ("I am like this and millions of others are too"). The unexplored territory is revelation ("I finally understand what created this in me"). Raising Giants must explicitly position against the validation frame.

**[06-01-D] getrelatio.com as benchmark for product framing, not aesthetic**
getrelatio.com demonstrates the "assessment as meaningful experience" register. The lesson is in product framing (consent-first language, assessment IS the product) not visual identity — Raising Giants' territory is different but the product philosophy is the same.

**[06-01-E] Category trap: avoid parenting segment classification**
Being classified as a "parenting advice tool" is the primary misidentification risk. The competitive audit confirms no parenting tools address self-understanding for adults — but they also don't help. Raising Giants must aggressively signal "this is about you, not your children."

## Deviations from Plan

None — plan executed exactly as written.

Tasks 1 and 2 were executed in a single pass because the positioning map and gap analysis are naturally developed during competitor profiling rather than as a post-hoc addition. All required content (15 profiles, positioning map, gap summary, segment insights) was produced in sequence.

## Issues Encountered

None. All 15 competitors were profiled from existing research in 06-RESEARCH.md and Phase 6 context, supplemented with brand pattern analysis.

## User Setup Required

None — no external service configuration required.

## Next Phase Readiness

- **06-02 (Reference Brand Gallery):** Competitive landscape complete. Reference brand research can use the positioning map as a frame — find brands that already occupy the "deep+warm" register in other categories.
- **06-03 (Positioning Narrative):** The gap analysis section of this document is the direct input for positioning narrative. The four questions from success criteria are answered:
  1. 15 brands profiled across self-discovery, wellness, and parenting segments
  2. Each has full-funnel analysis and explicit gap statement
  3. Positioning map places all competitors on clinical-warm × shallow-deep axes
  4. Specific unoccupied territory: deep + warm + past-lens + revelation framing + non-parent inclusive

**No blockers for subsequent plans.**

## Self-Check: PASSED

- FOUND: `.planning/phases/06-brand-positioning-research-and-visual-direction/06-01-competitive-landscape.md`
- FOUND: `.planning/phases/06-brand-positioning-research-and-visual-direction/06-01-SUMMARY.md`
- FOUND commit: `596c421` (feat: competitive landscape)
- FOUND commit: `a0c55aa` (docs: plan complete with SUMMARY.md and STATE.md)
- Verification: 957 lines in competitive landscape (requirement: 200+) — PASS
- Verification: 15 competitor profiles present — PASS
- Verification: Positioning Map, Competitive Gap Summary, Segment-Level Insights all present — PASS

---
*Phase: 06-brand-positioning-research-and-visual-direction*
*Completed: 2026-02-27*
