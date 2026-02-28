---
phase: 04-brand-positioning-research-and-visual-direction
plan: "05"
subsystem: brand-rebrand-execution
tags: [rebrand, execution-plan, kin, 2026-design, deep-teal, merlot, canela, brand-name-change]

dependency_graph:
  requires:
    - 04-04-visual-direction-brief.md
    - 04-03-positioning-narrative.md
    - 04-RESEARCH.md (codebase analysis)
  provides:
    - "04-05-rebrand-execution-plan.md — file-by-file rebrand execution plan (v2, Kin/2026 direction)"
    - "26-file audit with explicit amber/stone-900 → Deep Teal/Merlot/Burnished Amber/Cloud White class map"
    - "Phased implementation scope: Foundation / Component / Asset"
    - "Brand name change checklist: Raising Giants → Kin"
  affects:
    - "Future implementation phase — execution plan is the developer-ready work order"
    - "app/globals.css (Phase A) — palette token changes documented"
    - "app/layout.tsx (Phase A) — font swap + metadata changes documented"
    - "26 components/landing/ + components/quiz/ + components/result/ files (Phase B)"
    - "MirrorIllustration.tsx + ArchetypeIcons.tsx (Phase C)"

tech_stack:
  added: []
  patterns:
    - "Deep Teal / Merlot / Burnished Amber / Cloud White / Warm Sand semantic token system documented"
    - "DM Serif Display as Canela substitute (Canela is commercial, not on Google Fonts)"
    - "Merlot for Mirror/revelation contexts; Burnished Amber for Blueprint/research contexts"
    - "Glassmorphism .glass-card utility documented for Phase A globals.css"

key_files:
  created: []
  modified:
    - ".planning/phases/04-brand-positioning-research-and-visual-direction/04-05-rebrand-execution-plan.md"

decisions:
  - "[06-05-A] Two-layer color migration required: semantic token update (globals.css Phase A) + hardcoded Tailwind class replacements in 26 component files (Phase B) — codebase uses both patterns"
  - "[06-05-B] Illustration redesign implementation path (inline SVG vs. PNG) deferred to Phase C decision at implementation time — both options documented with tradeoffs"
  - "[06-05-C] Domain acquisition for Raising Giants → Kin rename is user action required before metadataBase URL change; all other metadata string changes (title/OG/twitter) can proceed in Phase A immediately"
  - "[06-05-D] Canela not available on Google Fonts (commercial license required); DM Serif Display recommended as free substitute; executor makes final call at Phase A"
  - "[06-05-E] Merlot as Mirror/revelation accent; Burnished Amber as Blueprint/research accent — product-specific accent differentiation per 06-04 multi-product table"

metrics:
  duration: "~10 min (Task 1: 5 min, Task 2: checkpoint approved)"
  completed_date: "2026-02-27"
  tasks_completed: 2
  files_modified: 1
---

# Phase 06 Plan 05: Rebrand Execution Plan Summary (v2 — Kin / 2026 Direction)

**One-liner:** Complete rewrite of the rebrand execution plan — replaces the terracotta/Imprint/Cormorant direction with an explicit file-by-file change map for the Kin brand: Deep Teal primary, Merlot revelation accent, Burnished Amber Blueprint accent, Cloud White background, DM Serif Display (Canela substitute), covering all 26 component files plus globals.css, layout.tsx, and illustration assets across three implementation phases.

---

## What Was Built

The `04-05-rebrand-execution-plan.md` was fully rewritten as v2. The v1 (prior) plan specified a terracotta palette, Cormorant Garamond retention, School of Life editorial illustration, and used "Imprint" as the new brand name. All of these have been superseded by the v3 visual direction brief (06-04) and the founder's decision to rename to "Kin".

### Task 1: Codebase Audit + Phased Execution Plan

**Codebase audit findings:**

- 26 component files with hardcoded `amber-*` / `stone-900` Tailwind color classes
- 9 user-facing "Raising Giants" string references across 5 files
- 10+ components using `font-display` class / `var(--font-display)` — all update automatically on font swap in layout.tsx
- `globals.css` semantic tokens are currently neutral Tailwind defaults — no brand-specific tokens exist yet
- `MirrorIllustration.tsx` and `ArchetypeIcons.tsx` both use inline SVG — implementation path is clear

**v2 execution plan structure:**

**Color Change Mapping:**
- Explicit semantic token update table (10 shadcn tokens → new values)
- 6 new custom brand properties to add (`--color-deep-teal`, `--color-merlot`, `--color-burnished-amber`, etc.)
- Complete amber-class → new class mapping table (25 amber classes, 17 stone classes)
- Glassmorphism utility documented

**Change Scope Matrix:**
- 38-row file-by-file change matrix covering every visual direction recommendation
- Each row: file path, specific change, phase assignment (A/B/C), effort level

**Phased Implementation:**
- Phase A (2 plans, ~20 min): globals.css tokens + font swap + metadata. Single-file updates that propagate globally.
- Phase B (3–4 plans, ~35–45 min): 26 component color class replacements + brand name strings + copy updates. Organized by component group (landing → quiz → result).
- Phase C (3–5 plans, ~45–75 min): MirrorIllustration redesign + ArchetypeIcons redesign + OG image + favicon.

**Brand name change checklist (Raising Giants → Kin):**
- 9 user-facing string references documented with exact line numbers and replacement text
- Domain acquisition noted as user action required before metadataBase URL change
- "The Mirror by Kin" established as product eyebrow label pattern

**Canela font constraint documented:**
- Canela is a commercial font (Commercial Type) — not on Google Fonts
- DM Serif Display recommended as free substitute (Google Fonts, contemporary, screen-optimized)
- Fraunces and Playfair Display listed as alternatives
- Implementation path documented: same `--font-display` variable, automatic propagation

**6 risks documented** with mitigations:
1. Canela licensing constraint
2. oklch conversion accuracy
3. Deep Teal / Merlot WCAG contrast (Burnished Amber flagged for large-text-only use)
4. Hardcoded class coverage gaps
5. Illustration quality (requires human-verify checkpoints in Phase C)
6. Partial rebrand visual state

### Task 2: User Review and Approval (APPROVED)

Human-verify checkpoint — user reviewed all 5 Phase 4 deliverables and typed "approved", confirming:

- **Competitive Landscape** (06-01): 16+ millennial parenting digital products profiled; parent-centric/self-understanding quadrant confirmed empty
- **Reference Brand Gallery** (06-02): 8-12 aspirational brands synthesized; mission-as-architecture model confirmed; KOL-anchor anti-pattern identified
- **Positioning Narrative** (06-03): Brand territory "digital tools for parents who want to understand themselves" locked; Kin brand name confirmed (founder decision); Branded House architecture confirmed
- **Visual Direction Brief** (06-04): Deep Teal / Merlot / Canela / Cloud White / bento-grid direction confirmed; contemporary premium digital register approved
- **Rebrand Execution Plan** (06-05): Phased A/B/C implementation scope confirmed; 38-row file change matrix approved as developer work order

Phase 4 is **COMPLETE** — all strategic direction confirmed and approved.

---

## Key Decisions Made

| Decision | Detail |
|----------|--------|
| [06-05-A] Two-layer migration | globals.css tokens (Phase A) + hardcoded class replacements in 26 files (Phase B) |
| [06-05-B] Illustration path deferred | Inline SVG vs. PNG replacement is Phase C implementation-time decision |
| [06-05-C] Domain timing | metadataBase URL holds until domain confirmed; all other name changes proceed in Phase A |
| [06-05-D] Canela substitute | DM Serif Display (Google Fonts) recommended; executor decides at Phase A |
| [06-05-E] Accent differentiation | Merlot for Mirror/revelation; Burnished Amber for Blueprint/research |

---

## Deviations from Plan

### Directional Override (User-specified in prompt)

**1. [User Override] Execution plan rewritten for Kin / 2026 direction — not terracotta/Imprint direction**

- **Found during:** Plan start — prompt context specified new direction explicitly
- **Issue:** The existing `04-05-rebrand-execution-plan.md` (v1) used the terracotta/Cormorant/School-of-Life/Imprint direction — the prior visual brief before the 2026 update.
- **Fix:** Complete rewrite of the execution plan to map the v3 visual direction brief (Deep Teal / Merlot / Burnished Amber / Cloud White / Canela / bento-grid) to codebase files.
- **Files modified:** 04-05-rebrand-execution-plan.md
- **Commit:** eb13872

### Canela Font Constraint Discovery (Rule 2 — Missing Critical Info)

**2. [Rule 2 - Critical functionality] Canela font licensing documented as critical implementation constraint**

- **Found during:** Task 1 execution (font change planning)
- **Issue:** The 06-04 brief specifies Canela as the display serif. Canela is a commercial font from Commercial Type — it is NOT available on Google Fonts. Any implementation attempt using `next/font/google` for Canela would fail at build time.
- **Fix:** Documented the constraint explicitly, provided 3 free Google Fonts alternatives with recommendation (DM Serif Display), and specified the implementation path.
- **Files modified:** 04-05-rebrand-execution-plan.md (added "Font System" constraint section)

---

## Self-Check

**Files exist:**
- [x] `.planning/phases/04-brand-positioning-research-and-visual-direction/04-05-rebrand-execution-plan.md` — verified present; v2; contains 38-row change matrix, Phase A/B/C, color mapping tables, risk section, brand name checklist
- [ ] `.planning/phases/04-brand-positioning-research-and-visual-direction/04-05-SUMMARY.md` — this file (being written)

**Commits exist:**
- [x] eb13872 — `feat(06-05): rewrite rebrand execution plan for Kin — 2026 visual direction`

**Verification criteria (Task 1):**
- [x] All brand-affecting files discovered via codebase audit (26 files)
- [x] File-by-file change matrix maps every visual direction recommendation to specific files (38 rows)
- [x] Three implementation phases (A/B/C) defined with files, scope, effort, execution order
- [x] Brand name technical checklist included — Raising Giants → Kin, with exact string locations
- [x] Total implementation effort estimated (8–11 plans, ~100–140 min)
- [x] No actual codebase changes made — this is a plan, not implementation
- [x] Plan uses Kin brand name (not Imprint)
- [x] Plan uses Deep Teal / Merlot / Burnished Amber / Cloud White palette (not terracotta/amber)
- [x] Plan specifies Canela / DM Serif Display (not Cormorant Garamond)

**Task 2 (checkpoint — APPROVED):**
- [x] User has reviewed and approved all 5 Phase 4 deliverables — "approved" signal received 2026-02-27

## Self-Check: PASSED (Tasks 1 and 2 complete)
