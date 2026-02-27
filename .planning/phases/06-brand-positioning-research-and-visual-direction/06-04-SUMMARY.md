---
phase: 06-brand-positioning-research-and-visual-direction
plan: "04"
subsystem: brand-strategy
tags: [brand, visual-direction, color-palette, typography, illustration, multi-product, millennial-parent]

dependency_graph:
  requires:
    - phase: 06-03-positioning-narrative.md
      provides: "Brand territory locked: 'digital tools for parents who want to understand themselves'; Branded House model; Imprint name recommendation"
    - phase: 06-02-reference-brand-gallery.md
      provides: "5 design direction signals; School of Life illustration register; terracotta and aged gold confirmed; Cormorant Garamond underutilization identified"
  provides:
    - "06-04-visual-direction-brief.md — complete multi-product visual direction brief"
    - "Color palette: terracotta primary accent, bone background, warm charcoal text, aged gold secondary — hex codes with semantic rationale"
    - "Semantic token mapping for globals.css CSS custom properties"
    - "Typography: Cormorant Garamond italic use dramatically expanded; Geist Sans body with DM Sans option for long-form"
    - "Imagery system: brand-level parent interiority vs. product-level metaphor distinction defined; School of Life editorial line register"
    - "Layout approach: editorial sequence, whitespace philosophy (30-50% more padding), section rhythm"
    - "Brand tone: knowing, revelatory, peer-level, grounded, permission-giving with do/don't examples"
    - "Tagline options: 'Finally, the words for it.' recommended"
    - "Multi-product visual system summary table across Mirror, Blueprint, Partner Match"
  affects:
    - "06-05-rebrand-execution-plan.md — this brief is the spec for file-level execution mapping"
    - "All UI component styling (MirrorIllustration, ArchetypeIcons, globals.css)"
    - "Landing page copy and tone"

tech-stack:
  added: []
  patterns:
    - "Multi-product brand palette: terracotta semantic anchor + bone background + aged gold insight accent — not single-product-metaphor color choices"
    - "Illustration distinction: brand-level (parent interiority) vs. product-level (product metaphors) — prevents MirrorIllustration anti-pattern repeating"
    - "Editorial sequence layout: narrative → visual rest → evidence → testimony → CTA — replaces startup grid pattern"
    - "Permission-first voice pattern: name the sensing → normalize → deliver vocabulary gift → invite action"
    - "Revelation register test: every copy and visual decision evaluated against 'I always sensed this. Now I see it.'"

key-files:
  created: []
  modified:
    - ".planning/phases/06-brand-positioning-research-and-visual-direction/06-04-visual-direction-brief.md"

key-decisions:
  - "[06-04-A] Terracotta #B05A3A replaces amber — semantically encodes 'earthen, past, permanent' not 'startup warm'; terracotta is 'baked earth' — directly encodes the brand territory of 'the ground on which you were built'"
  - "[06-04-B] Cormorant Garamond: KEEP — dramatically increase italic utilization; font correctly chosen (06-02-A confirmed), critically underdeployed; italic form is the brand's warmest typographic gesture"
  - "[06-04-C] Bone #F7F2EB replaces amber-50 — ages parchment quality vs. generic off-white; semantic fit for 'analog memory record'"
  - "[06-04-D] Aged Gold #C4892A as secondary accent — 'earned wisdom' register; distinct from amber because it reads as earned over time, not applied as decoration"
  - "[06-04-E] Brand illustration subject: parent interiority (not product metaphor) — MirrorIllustration.tsx redesign required from reflection metaphor to brand-level parent interiority scene"
  - "[06-04-F] Editorial line illustration register (School of Life) confirmed as target — Kai Brammer and Olimpia Zagnoli as illustrator references"
  - "[06-04-G] Tagline: 'Finally, the words for it.' recommended as primary option — encodes vocabulary gift mechanism; works across Mirror, Blueprint, Partner Match"
  - "[06-04-H] Product differentiation without fragmentation: terracotta-dominant for Mirror and Partner Match; aged-gold leaning for Blueprint — differentiation through illustration subject and accent emphasis, not separate visual languages"

patterns-established:
  - "Multi-product color test: every palette decision tested against Mirror, Blueprint, AND Partner Match before inclusion"
  - "Semantic token over hardcoded color: CSS custom properties map directly to color names (--primary = Terracotta) for maintainable rebrand"
  - "Brand illustration vs. product illustration distinction: establish this hierarchy before second product launches to prevent anti-pattern"
  - "Permission-first voice: name sensing → normalize → vocabulary gift → invite — the sequence that creates psychological safety for depth"

requirements-completed: [BRAND-06, BRAND-07]

duration: "5min"
completed: "2026-02-27"
---

# Phase 06 Plan 04: Visual Direction Brief Summary

**Multi-product visual direction brief: terracotta/bone/aged-gold palette with semantic token mapping, expanded Cormorant italic usage, editorial line illustration system distinguishing brand-level from product-level imagery, and permission-first revelation voice — all tested against Mirror, Blueprint, and Partner Match coherence.**

## Performance

- **Duration:** 5 min
- **Started:** 2026-02-27T12:56:41Z
- **Completed:** 2026-02-27T13:02:22Z
- **Tasks:** 2
- **Files modified:** 1

## Accomplishments

- Replaced prior single-product "grounded self-discovery" visual brief with a multi-product brand visual direction system anchored to the new positioning territory ("digital tools for parents who want to understand themselves")
- Complete color palette with 7 colors (hex codes, names, emotional rationale, usage context, multi-product test); semantic token mapping for all CSS custom properties in globals.css
- Typography direction: Cormorant Garamond italic use specified precisely (subheadings, pull quotes, archetype names in prose, minimum 22px rule); full type scale with size/weight/line-height specifications
- Imagery system establishes brand-level (parent interiority) vs. product-level (product metaphors) distinction — prevents anti-pattern of building brand identity around one product's metaphor
- Layout approach: editorial sequence (narrative → visual rest → evidence → testimony → CTA), whitespace philosophy, section rhythm, responsive priorities
- Brand tone: 5 attributes with do/don't examples, voice register table, vocabulary guidance (words to use/avoid), 5 tagline options with rationale
- Multi-product visual system summary table shows how every element (palette, type, illustration, tone, CTAs) applies across Mirror, Blueprint, and Partner Match

## Task Commits

Both tasks write to the same file — committed as a single complete document:

1. **Task 1: Color palette and typography** — `9cf24aa` (feat)
2. **Task 2: Imagery, layout, tone, multi-product summary** — `9cf24aa` (covered in same commit — complete document written in one pass)

**Plan metadata:** (docs commit to follow)

## Files Created/Modified

- `.planning/phases/06-brand-positioning-research-and-visual-direction/06-04-visual-direction-brief.md` — Complete replacement (prior version was anchored to old "grounded self-discovery" territory). New document: 6 sections, ~5,000 words. Sections: Positioning Anchor, Color Palette (primary/secondary/tokens/what replaced/multi-product test), Typography (Cormorant/Geist/scale/rules), Imagery System (brand vs. product illustration/photography/references), Layout Approach (whitespace/density/rhythm/responsive), Brand Tone (attributes/register/vocabulary/taglines), Multi-Product Summary Table, Implementation Notes for 06-05.

## Decisions Made

| Decision | Reasoning |
|----------|-----------|
| Terracotta `#B05A3A` replaces amber | Terracotta = "baked earth" — semantic match for "the ground on which you were built"; amber encodes nothing specific about the brand territory |
| Cormorant Garamond: keep + expand italic | Font is correctly chosen (06-02-A); underutilized — italic form is its most expressive feature and is absent from current implementation |
| Bone `#F7F2EB` replaces amber-50 | Aged parchment quality vs. generic warm white; semantic fit for analog/memory register |
| Aged Gold `#C4892A` as secondary accent | "Earned wisdom" register — deeper/more saturated than amber; marks insight and evidence moments |
| Brand illustration subject: parent interiority | MirrorIllustration.tsx anti-pattern corrected — brand level cannot encode one product's metaphor |
| School of Life register | Editorial line illustration; confirms 06-02-ILLUS finding; Kai Brammer and Olimpia Zagnoli as references |
| "Finally, the words for it." as primary tagline | Encodes vocabulary-gift mechanism; works for all three products without modification |
| Product differentiation via accent emphasis not separate palette | Terracotta-dominant (Mirror/Partner Match), aged-gold leaning (Blueprint) — coherence maintained |

## Deviations from Plan

None — plan executed exactly as written.

The plan specified replacing the existing 06-04-visual-direction-brief.md (old single-product version) with a new document anchored to the new positioning territory. Both tasks (Task 1: color palette and typography; Task 2: imagery, layout, tone, multi-product summary) were completed in a single document write — same file, same commit — consistent with how prior 06-series plans were executed.

The PLAN.md's critical instruction was: "Every visual direction choice is tested against multi-product fit: does it work for The Mirror, The Blueprint, AND The Partner Match?" The document does this. Section 1.5 (Multi-Product Color Test Summary) and Section 6 (Multi-Product Visual System Summary) both contain explicit tables confirming each element's fit across all three products.

## Issues Encountered

None.

## User Setup Required

None — this is a research and strategy plan with no external service configuration.

## Next Phase Readiness

Plan 06-05 (Rebrand Execution Plan) can begin immediately. The locked inputs are:

- **Color system:** Terracotta `#B05A3A` primary accent; Bone `#F7F2EB` background; Warm Charcoal `#1C1512` text; Aged Gold `#C4892A` secondary; full semantic token mapping in Section 1.3
- **Typography:** Cormorant Garamond with expanded italic use; Geist Sans body; full type scale in Section 2.3
- **Illustration:** Brand-level (parent interiority, editorial line); product-level (product metaphors in School of Life style); `MirrorIllustration.tsx` redesign required; `ArchetypeIcons.tsx` style update required
- **Layout:** Editorial sequence with whitespace minimum specs; editorial vs. app-like distinction; section rhythm pattern
- **Tone:** Permission-first pattern; vocabulary guidance; forbidden patterns list
- **Tagline:** "Finally, the words for it." (primary recommendation)

The execution plan must map each visual direction decision to specific codebase files and specific implementation changes. No further creative decisions are needed.

---

## Self-Check: PASSED

Files verified:
- [x] `.planning/phases/06-brand-positioning-research-and-visual-direction/06-04-visual-direction-brief.md` — exists; complete replacement; all 6 sections present; multi-product test tables present

Commits verified:
- [x] `9cf24aa` — `feat(06-04): write visual direction brief — multi-product brand territory`

Automated verification checks passed:
- [x] Task 1: `grep -c "hex\|#[0-9a-fA-F]"` returns PASS (50 occurrences >= 5 required)
- [x] Task 2: `grep -c "Imagery\|Layout\|Tone\|Voice\|Multi-Product"` returns PASS (10 occurrences >= 4 required)
- [x] Semantic tokens mapped: 11 occurrences of token names (`--background`, `--foreground`, `--primary`, etc.)
- [x] Typography: 3 typography sections (Display Font, Body Font, Type Scale)
- [x] Imagery system: 8 occurrences of brand vs. product illustration distinction
- [x] Multi-product summary table: present (Section 6)
- [x] No mirror-only metaphor at brand level: anti-pattern explicitly documented and corrected

---

*Phase: 06-brand-positioning-research-and-visual-direction*
*Completed: 2026-02-27*
