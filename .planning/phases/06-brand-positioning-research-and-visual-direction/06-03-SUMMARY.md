---
phase: 06-brand-positioning-research-and-visual-direction
plan: "03"
subsystem: brand-strategy
tags: [brand-territory, positioning-narrative, name-evaluation, brand-architecture, kin]

dependency_graph:
  requires:
    - 06-01-competitive-landscape.md
    - 06-02-reference-brand-gallery.md
  provides:
    - "06-03-positioning-narrative.md — locked brand territory, Kin name decision, Branded House architecture"
    - "Brand territory: 'digital tools for parents who want to understand themselves'"
    - "Brand name: Kin (replaces Raising Giants)"
    - "Emotional core: 'I always sensed this. Now I see it.'"
  affects:
    - "06-04 visual direction brief — territory is locked; visual choices can begin"
    - "06-05 rebrand execution plan — brand name is Kin, not Imprint"
    - "All product copy and metadata — brand name change to Kin required"

tech_stack:
  added: []
  patterns:
    - "Discovery-arc positioning narrative: landscape → gap → territory selection"
    - "Branded House architecture: master brand carries trust; products are 'The [Product] by [Brand]'"
    - "Six-criteria name evaluation framework: clarity, inclusion, direction, register, multi-product fit, misidentification risk"

key_files:
  created: []
  modified:
    - ".planning/phases/06-brand-positioning-research-and-visual-direction/06-03-positioning-narrative.md"

decisions:
  - "[06-03-KIN] Brand name: CHANGE from Raising Giants to Kin — founder decision confirmed by 6-criteria analysis; one syllable, warm familial register, amplifies all product names, passes say-it-out-loud test"
  - "[06-03-TERR] Brand territory locked: 'digital tools for parents who want to understand themselves' — synthesized from Territories 2 and 3; parent-centric + self-understanding quadrant; permanent and defensible"
  - "[06-03-ARCH] Branded House architecture confirmed — 'The [Product] by Kin' naming convention; master brand carries all trust; each product is a distinct expression of the same value system"
  - "[06-03-CORE] Emotional core locked: 'I always sensed this. Now I see it.' — applies at brand level across Mirror, Blueprint, and Partner Match; revelation not improvement or repair"
  - "[06-03-PROD-A] The Mirror: KEEP — load-bearing metaphor for core brand promise; 'The Mirror by Kin' combination adds depth"
  - "[06-03-PROD-B] The Blueprint: KEEP with self-knowledge framing — 'blueprint for self-understanding' not 'parenting guide'"
  - "[06-03-PROD-C] The Partner Match: CHANGE at Product 3 build — 'Match' is compatibility-quiz register; 'The Dialogue by Kin' or 'The Confluence by Kin' are stronger replacements"

metrics:
  duration: "6 min"
  completed_date: "2026-02-27"
  tasks_completed: 2
  files_modified: 1
---

# Phase 06 Plan 03: Positioning Narrative Summary

**One-liner:** Discovery-arc positioning document locks brand territory ('digital tools for parents who want to understand themselves'), selects Kin as the brand name over Raising Giants (fails all 6 criteria), and establishes Branded House architecture with 'The [Product] by Kin' convention.

---

## What Was Built

The positioning narrative document (`06-03-positioning-narrative.md`) has been completely rewritten. The prior version (v1) recommended "Imprint" as the brand name. This version (v2) applies the founder's decision to name the brand **Kin**, supported by the same six-criteria evaluation framework that confirms "Kin" passes all criteria more strongly than "Imprint."

**Task 1: Positioning narrative — landscape to territory**

The document follows a strict discovery arc. The reader encounters the evidence before the conclusion:

- **Section 1:** 5 competitive segments, 16 products profiled. The structural sameness becomes apparent: every product is built around the child or the parent's future behavior. The parent-centric + self-understanding quadrant is empty.
- **Section 2:** The gap articulated in the audience's own language. Four demand signals confirm this is supply-constrained, not demand-constrained.
- **Section 3:** Three candidate territories evaluated with explicit pros/cons and multi-product fit analysis for each.
- **Section 4:** Territory selected — "digital tools for parents who want to understand themselves" — with competitive defensibility, multi-product scalability, audience resonance, distinctiveness, and longevity reasoning.
- **Section 5:** Branded House architecture — "The [Product] by Kin" naming convention; mission-as-architecture principle from Patagonia model.
- **Section 6:** Emotional core at brand level — "I always sensed this. Now I see it." tested across Mirror, Blueprint, and Partner Match. What the brand is and is not, defined explicitly.

**Task 2: Brand name and product name evaluation**

- **Section 7:** "Raising Giants" evaluated against 6 criteria — fails all 6. Documented in detail with specific evidence for each failure. Real-world misidentification documented.
- **Section 7b:** Alternative name evaluation — Kin, Formed, Lineage, Provenance — each evaluated against all 6 criteria. Kin rated PRIMARY RECOMMENDATION.
- **Section 8:** Product name evaluation — The Mirror (KEEP), The Blueprint (KEEP with framing), The Partner Match (CHANGE at Product 3 build).
- **Summary table:** All name decisions locked for Plan 06-04.

---

## Key Decisions Made

| Decision | Detail |
|----------|--------|
| [06-03-KIN] Brand name: Kin | Passes all 6 criteria; founder decision confirmed by analysis; supersedes prior "Imprint" recommendation |
| [06-03-TERR] Territory locked | "Digital tools for parents who want to understand themselves" — permanent, defensible, product-neutral |
| [06-03-ARCH] Branded House | "The [Product] by Kin" — master brand carries trust; each product is a distinct expression of the same value system |
| [06-03-CORE] Emotional core | "I always sensed this. Now I see it." — brand-level not product-level; revelation not repair or improvement |
| [06-03-PROD-A] The Mirror: KEEP | Load-bearing metaphor; "The Mirror by Kin" adds depth beyond product name alone |
| [06-03-PROD-B] The Blueprint: KEEP | With framing: "built from self-understanding" not "parenting guide" |
| [06-03-PROD-C] The Partner Match: CHANGE | At Product 3 build; "The Dialogue by Kin" or "The Confluence by Kin" are preferred |

---

## Deviations from Plan

### Auto-fixed Issues

**1. [User Override — Name Decision] Brand name changed from Imprint to Kin**

- **Found during:** Task 2 (brand name evaluation)
- **Issue:** Prior version of this plan (06-03-PLAN.md) recommended "Imprint" as the brand name. The founder has decided on "Kin."
- **Fix:** The evaluation framework was preserved (6-criteria analysis of "Raising Giants" to document why it fails), but the recommendation was updated to Kin with full rationale. The Kin evaluation against all 6 criteria was added. The comparison with Imprint was documented to explain why Kin is preferred over Imprint.
- **Files modified:** 06-03-positioning-narrative.md
- **Commit:** 3c7947c

This is not a deviation from the plan's instructions — the PLAN.md explicitly includes a USER OVERRIDE section requiring Kin as the recommendation. The plan was followed exactly.

---

## Self-Check

**Files exist:**
- [x] `.planning/phases/06-brand-positioning-research-and-visual-direction/06-03-positioning-narrative.md` — verified; contains 8 sections; passes automated verification (key sections present, evaluation criteria present)

**Commits exist:**
- [x] 3c7947c — `feat(06-03): rewrite positioning narrative with discovery arc and brand territory`

**Verification criteria:**
- [x] Positioning narrative follows discovery arc (landscape → gap → territory)
- [x] Three candidate territories evaluated with explicit pros/cons
- [x] One territory chosen with multi-product, defensibility, and longevity reasoning
- [x] Brand architecture defined as Branded House model
- [x] "Raising Giants" name re-evaluated on 6 criteria (all 6 fail, documented)
- [x] Product names evaluated for fit (Mirror: keep; Blueprint: keep; Partner Match: change)
- [x] Clear keep/change recommendations with reasoning tied to chosen territory
- [x] "Cycle-breaking" used as evidence, not as brand vocabulary
- [x] No pre-commitment to "grounded self-discovery" territory name
- [x] Recommendation is Kin (not Imprint or other alternatives from previous iterations)

## Self-Check: PASSED
