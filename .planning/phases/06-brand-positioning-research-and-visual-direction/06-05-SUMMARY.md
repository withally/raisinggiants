---
phase: 06-brand-positioning-research-and-visual-direction
plan: 05
subsystem: brand-strategy
tags: [brand-execution-plan, rebrand, color-tokens, illustration-system, brand-name-change, implementation-scope]

# Dependency graph
requires:
  - phase: 06-brand-positioning-research-and-visual-direction
    provides: "06-04 visual direction brief — 7-color palette, typography recommendations, illustration system direction, permission-first voice"
  - phase: 06-brand-positioning-research-and-visual-direction
    provides: "06-03 positioning narrative — brand name change recommendation (Raising Giants → Imprint), grounded self-discovery territory"
provides:
  - "Developer-ready rebrand execution plan with specific file changes for every visual direction recommendation"
  - "Change scope matrix: 25+ specific changes mapped to exact files, CSS properties, and Tailwind classes"
  - "oklch color conversion table for all 8 palette values (bone, charcoal, terracotta, aged gold, deep dusk, soft clay, stone mid/light)"
  - "3-phase implementation scope: Foundation (2 plans), Component-Level (3-4 plans), Asset-Level (4-6 plans)"
  - "Brand name change technical checklist: domain acquisition, string references, metadata sequence, SEO 301 redirect strategy"
  - "5 risks with rollback strategies and visual regression scan checklist"
affects:
  - "Phase 07 (rebrand implementation) — execution plan is the primary input for all implementation plans"
  - "Phase A Foundation plans — globals.css token changes and layout.tsx metadata updates"
  - "Phase B Component plans — landing/quiz/result component color class replacements"
  - "Phase C Asset plans — illustration redesigns and brand identity creation"

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Token-first palette migration: semantic token changes in globals.css propagate globally; hardcoded Tailwind color class changes handled in separate Phase B"
    - "oklch color format: all palette values specified in oklch() notation (not hex) for globals.css consistency"
    - "Phase-gated rebrand: Foundation → Component → Asset phases allow incremental rollout with clean rollback points"

key-files:
  created:
    - ".planning/phases/06-brand-positioning-research-and-visual-direction/06-05-rebrand-execution-plan.md"
  modified: []

key-decisions:
  - "[06-05-A] Rebrand is split into token changes (globals.css, Phase A) and component-level Tailwind class replacements (Phase B) — because the codebase uses a mix of semantic tokens and hardcoded amber/stone Tailwind classes, both layers require separate implementation"
  - "[06-05-B] Illustration redesign offers two implementation paths: Option A (PNG replacement, zero code change) vs Option B (inline SVG, more flexible but more complex) — choosing at Phase C time based on creative tooling available"
  - "[06-05-C] Domain acquisition is a pre-implementation user action — metadata changes (title, OG, twitter) can proceed immediately; metadataBase URL change waits for domain confirmation"

patterns-established:
  - "Execution-plan structure: Change Scope Matrix → Implementation Constraints → Phased Scope → Name Change Checklist → Effort Estimate → Risks → Visual Regression Checklist"
  - "Dual-layer color migration: semantic tokens (Phase A) + hardcoded class replacements (Phase B) handles Tailwind v4 @theme inline + direct class usage simultaneously"

requirements-completed: [BRAND-08]

# Metrics
duration: 5min
completed: 2026-02-27
---

# Phase 6 Plan 05: Rebrand Execution Plan Summary

**331-line developer-ready rebrand execution plan mapping all visual direction recommendations to specific files, tokens, and components — terracotta palette in oklch, 3-phase implementation scope, and domain migration checklist for Raising Giants → Imprint name change**

## Performance

- **Duration:** ~5 min
- **Started:** 2026-02-27T07:31:08Z
- **Completed:** 2026-02-27T07:36:00Z
- **Tasks:** 1 of 2 complete (Task 2 is human-verify checkpoint — awaiting user review)
- **Files modified:** 1

## Accomplishments

- Created the complete rebrand execution plan (331 lines) with all required sections: Executive Summary, Change Scope Matrix (25+ entries), Implementation Constraints, Phased Implementation Scope (A/B/C), Brand Name Change Technical Checklist, Effort Estimate, Risks and Mitigations, Visual Regression Checklist
- Mapped every visual direction recommendation from 06-04 to a specific file + change: `globals.css` for all 8 palette token changes with oklch equivalents, `layout.tsx` for metadata and optional DM Sans addition, all 5 landing components for color class replacements, quiz and result component directories for color class updates
- Identified the critical constraint: the codebase uses both semantic tokens AND hardcoded Tailwind color classes — requiring a two-pass Phase A (tokens) + Phase B (hardcoded classes) migration strategy rather than a single globals.css update
- Specified the brand name change sequence: immediate metadata string replacements (title, OG, twitter) → domain acquisition user action → metadataBase URL update → Vercel 301 redirect configuration → Supabase cosmetic rename
- Estimated total rebrand scope at 9-12 implementation plans / ~2-2.5 hours of Claude execution time

## Task Commits

1. **Task 1: Create phased rebrand execution plan** - `12cffa0` (feat)
2. **Task 2: Human verify Phase 6 deliverables** - CHECKPOINT (awaiting user approval)

## Files Created/Modified

- `.planning/phases/06-brand-positioning-research-and-visual-direction/06-05-rebrand-execution-plan.md` — 331-line execution plan covering: executive summary (3 sentences), change scope matrix with 25+ rows mapping each visual direction recommendation to exact file/token/class changes, implementation constraints (Tailwind v4 @theme inline, oklch format, next/font/google, Biome), 3-phase implementation scope (Foundation: 2 plans / Component: 3-4 plans / Asset: 4-6 plans), brand name technical checklist (domain, string references, SEO, Supabase), effort estimate table (9-12 plans total), 5 risks with rollback strategies, visual regression scan checklist

## Decisions Made

**[06-05-A] Two-layer color migration strategy**
The codebase uses a mix of semantic Tailwind tokens (`bg-background`, `bg-primary`) and hardcoded Tailwind color classes (`bg-amber-50`, `text-amber-700`, `bg-stone-900`). A single globals.css update is insufficient — component files with hardcoded classes also need updating. Phase A updates semantic tokens; Phase B separately handles the hardcoded class replacements. This keeps each migration layer independently rollback-able.

**[06-05-B] Illustration implementation path deferred to Phase C**
The illustration redesign can be done via PNG replacement (zero component code changes, simpler) or inline SVG (more flexible, color-themeable, requires component changes). The choice depends on the creative tooling available at Phase C implementation time. The execution plan documents both options — the implementing executor chooses at implementation time based on asset format.

**[06-05-C] Domain acquisition gating**
The user must verify and acquire the new domain before the `metadataBase` URL change goes live. All other metadata string changes (title, description, OG title, twitter) can proceed without domain confirmation. The execution plan documents this sequence explicitly to prevent implementing domain-dependent changes prematurely.

## Deviations from Plan

None — plan executed exactly as written. The execution plan was created as specified, referencing all codebase files listed in the plan context, mapping all 06-04 visual direction recommendations to specific implementation changes, and addressing the name change (Raising Giants → Imprint per 06-03-A) with full technical scope.

## Issues Encountered

None.

## User Setup Required

**Domain acquisition is a user action required before Phase C name change implementation:**
- Check availability of: `imprint.com`, `imprint.co`, `theimprint.com`, `imprint.app`
- Purchase preferred domain if available
- Check social handles: `@getimprint`, `@imprint`, `@imprintapp` on Instagram, X/Twitter, TikTok

This is non-blocking for Phase A (palette + font) and Phase B (component colors) work — only Phase C name-change steps depend on domain confirmation.

## Next Phase Readiness

**Phase 6 is complete after user verification of this checkpoint:**
- 06-01: Competitive landscape — done
- 06-02: Reference brand gallery — done
- 06-03: Positioning narrative — done
- 06-04: Visual direction brief — done
- 06-05: Rebrand execution plan — done (awaiting human-verify)

**Phase 7 (Rebrand Implementation) can begin after user approves Phase 6 direction:**
- A Claude executor in a future phase can read 06-05-rebrand-execution-plan.md and know exactly which files to modify, in what order, with what specific values
- Phase A (Foundation) is the recommended starting point — lowest risk, globally propagating changes, clean rollback point
- Illustration work (Phase C) may require human checkpoints for visual quality review

## Self-Check

- FOUND: `.planning/phases/06-brand-positioning-research-and-visual-direction/06-05-rebrand-execution-plan.md` — PASS
- File is 331 lines (requirement: 150+) — PASS
- All required sections present: Executive Summary, Change Scope Matrix, Implementation Constraints, Phased Implementation Scope, Effort Estimate, Risks — PASS
- Change Scope Matrix references specific files (globals.css, layout.tsx, component files) — PASS
- Specific tokens listed (oklch values, CSS property names, Tailwind class names) — PASS
- Implementation scoped into 3 phases (Phase A/B/C) — PASS
- Brand name change technical checklist included — PASS (06-03-A recommended name change)
- Effort estimate provides plan count and time estimate — PASS
- FOUND commit: `12cffa0` (Task 1) — PASS

## Self-Check: PASSED

---
*Phase: 06-brand-positioning-research-and-visual-direction*
*Completed: 2026-02-27*
