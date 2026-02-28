---
phase: 04-brand-positioning-research-and-visual-direction
plan: 01
subsystem: brand-strategy
tags: [competitive-landscape, positioning-map, gap-analysis, millennial-parenting, market-research]

dependency_graph:
  requires: []
  provides:
    - "04-01-competitive-landscape.md — 16-product competitive landscape with 2x2 positioning map and gap analysis"
    - "Evidence base: parent-centric + self-understanding quadrant is empty across all 16 products"
    - "Demand evidence: 4 independent signals confirming whitespace is supply-constrained, not demand-constrained"
  affects:
    - "06-03 positioning narrative — gap analysis reveals the territory to claim"
    - "06-04 visual direction — competitor visual audit identifies what not to do (child-coded vs. clinical)"
    - "All downstream positioning and naming decisions — evidence base is now established"

tech_stack:
  added: []
  patterns:
    - "Past-lens differentiation: Raising Giants is the only product in 16-product landscape with backward-looking upbringing orientation"
    - "2x2 positioning map: Child-centric/Parent-centric × Advice-giving/Self-understanding — replaces old Clinical/Warm × Shallow/Deep axes"

key_files:
  created: []
  modified:
    - ".planning/phases/04-brand-positioning-research-and-visual-direction/04-01-competitive-landscape.md"

decisions:
  - "[06-01-R1] The parent-centric + self-understanding quadrant is empty across all 16 millennial parenting digital products surveyed — supply gap, not demand gap"
  - "[06-01-R2] Good Inside (Dr. Becky Kennedy) is the nearest competitor but occupies behavioral-advice territory, not revelation territory — differentiable, not competing"
  - "[06-01-R3] Past-lens framing (understanding parenting received) is the single strongest differentiator — zero competitors engage this dimension at all"
  - "[06-01-R4] 'Cycle-breaking' culture provides demand evidence but must not become brand language — therapy-adjacent register must be avoided"
  - "[06-01-R5] Visual register constraint: child-coded (bright, playful) and clinical (teal/white, professional) are both occupied — earthy editorial register is the unoccupied visual direction"

metrics:
  duration: "5 min"
  completed_date: "2026-02-27"
  tasks_completed: 2
  files_modified: 1
---

# Phase 06 Plan 01: Competitive Landscape Audit Summary

**One-liner:** 16 millennial parenting digital products mapped on child-centric/parent-centric × advice-giving/self-understanding axes, revealing the parent-centric + self-understanding quadrant as completely empty and supply-constrained.

---

## What Was Built

The competitive landscape document (`04-01-competitive-landscape.md`) has been completely replaced. The prior version profiled self-discovery/personality assessment competitors (16Personalities, Enneagram Institute, etc.) under the old single-product self-discovery scope. This version profiles 16 millennial parenting digital products across 5 competitive segments.

**The 16 products profiled:**
- Segment A (Logistics): Huckleberry, Wonder Weeks, Kinedu, The Bump
- Segment B (Child Wellness): Moshi, Big Life Journal, Headspace for Kids
- Segment C (Active Coaching): Good Inside, ParentLab, Aha! Parenting
- Segment D (Organization): Cozi, FamilyAlbum
- Segment E (Mental Health Adjacent): BetterHelp, Talkspace, Headspace (adult)
- Raising Giants (self-reference for comparison)

**Each profile covers all 12 dimensions:** target audience, visual identity, core value proposition, onboarding flow, monetization, emotional register, audience engagement, parent as subject, past-lens, multi-product, and gap for Raising Giants.

**The positioning map** uses the new correct axes for the millennial parenting market:
- X: Child-centric ← → Parent-centric
- Y: Advice-giving/Behavioral ← → Self-understanding/Revelatory

The 2x2 map plots all 16 products in clusters and clearly identifies the parent-centric + self-understanding quadrant as the only empty quadrant in the landscape.

**The gap analysis** answers three required questions:
1. Which quadrant is empty: parent-centric + self-understanding
2. Empty because of low supply (not low demand) — 4 independent demand signals documented
3. What Raising Giants uniquely offers: past-lens framing, revelation not advice, multi-product brand architecture in unoccupied territory

**The implications section** provides 5 observations for Plan 06-03:
1. Good Inside is the nearest competitor but in a different quadrant
2. No multi-product brand for the parent-as-subject territory exists
3. Therapy products establish ceiling/floor; Raising Giants must distinguish from clinical register
4. Cycle-breaking culture = audience entry point, not brand voice
5. Visual system must avoid both child-coded and clinical visual registers

---

## Decisions Made

| Decision | Detail |
|----------|--------|
| [06-01-R1] Empty quadrant confirmed | Parent-centric + self-understanding: zero of 16 products occupy this quadrant |
| [06-01-R2] Good Inside differentiation | Nearest competitor is behavioral-advice, not revelatory; different quadrant, potentially complementary |
| [06-01-R3] Past-lens as primary differentiator | Only product in the landscape with a backward-looking upbringing orientation |
| [06-01-R4] Cycle-breaking: evidence not brand voice | Use as demand signal and audience identification; avoid as brand vocabulary |
| [06-01-R5] Visual register white space | Earthy editorial register (terracotta, serif, editorial illustration) is unoccupied in this competitive landscape |

---

## Deviations from Plan

None — plan executed exactly as written.

The plan specified replacing the existing 04-01-competitive-landscape.md (old self-discovery scope) with a new document profiling millennial parenting digital products. This was done. Both Task 1 (product profiles) and Task 2 (positioning map + gap analysis) were completed in a single document write, which resulted in a single commit (7dbc5bd) covering both tasks because the tasks write to the same file.

---

## Self-Check: PASSED

Files created/modified:
- [x] `.planning/phases/04-brand-positioning-research-and-visual-direction/04-01-competitive-landscape.md` — exists and contains 16 product profiles, positioning map, gap analysis, competitive summary table, implications section

Commits:
- [x] 7dbc5bd — `feat(06-01): profile 16 millennial parenting digital products with full-funnel analysis`

Verification criteria:
- [x] 16+ millennial parenting digital products profiled (34 sections total, 16 product profiles)
- [x] Each profile covers all 12 analysis dimensions
- [x] 2x2 positioning map with correct axes (child/parent-centric × advice/self-understanding)
- [x] All products plotted on the map
- [x] Gap analysis identifies empty quadrant with 4 demand evidence signals
- [x] No pre-commitment to positioning territory — observations only
- [x] Summary table includes all products
- [x] No self-discovery quiz tools (16Personalities, Enneagram Institute) appear as primary competitors
