---
phase: 06-brand-positioning-research-and-visual-direction
plan: "04"
subsystem: brand-visual-direction
tags: [visual-direction, color-palette, typography, illustration, layout, brand-system, kin, 2026-design]

dependency_graph:
  requires:
    - 06-03-positioning-narrative.md
    - 06-02-reference-brand-gallery.md
  provides:
    - "06-04-visual-direction-brief.md — complete visual direction for Kin brand, 2026 direction"
    - "Color palette: Deep Teal / Cloud White / Espresso / Merlot / Burnished Amber"
    - "Typography: Canela (or contemporary display serif) + Geist Sans"
    - "Illustration register: refined craft, geometric-organic or minimal figurative"
    - "Layout: bento-grid, large typographic heroes, glassmorphism, scroll-triggered motion"
  affects:
    - "06-05 rebrand execution plan — visual direction brief is the complete spec for file-level changes"
    - "All product UI files — color tokens, typography, illustration, layout components"

tech_stack:
  added: []
  patterns:
    - "Deep Teal / Cloud White / Espresso / Merlot / Burnished Amber semantic token system"
    - "Canela or equivalent contemporary display serif for stylistic moments; Geist Sans as workhorse"
    - "Bento-grid modularity, large typographic heroes, glassmorphism on deep teal sections"
    - "Scroll-triggered fade-up with staggered card entry, prefers-reduced-motion respected"

key_files:
  created: []
  modified:
    - ".planning/phases/06-brand-positioning-research-and-visual-direction/06-04-visual-direction-brief.md"

decisions:
  - "[06-04-NEW-A] Palette: Deep Teal #0D3D3A replaces terracotta as primary brand color — oceanic depth encodes psychological intelligence and premium digital precision; terracotta is 2022-24 era, reads dated"
  - "[06-04-NEW-B] Palette: Cloud White #F5F4F2 replaces Bone #F7F2EB — Cloud White reads as premium digital surface, not parchment/analog/craft"
  - "[06-04-NEW-C] Palette: Merlot #6B1E2E added as emotional-weight accent — revelation moments, archetype reveal color; replaces terracotta's prior role in The Mirror"
  - "[06-04-NEW-D] Typography: Cormorant Garamond REMOVED — too bookish/print-editorial for Kin's digital-native product identity; replaced by Canela or contemporary display serif designed for screens"
  - "[06-04-NEW-E] Typography: Display serif is stylistic punctuation only — used for hero headlines, section openers, pull quotes, archetype reveal moments; Geist Sans does all workhorse work"
  - "[06-04-NEW-F] Illustration: School of Life register REJECTED — too analog/loose for Kin's sleek digital identity; refined craft (geometric-organic or minimal figurative) is correct register"
  - "[06-04-NEW-G] Layout: Bento-grid modularity + large typographic heroes + glassmorphism + scroll-triggered motion — replaces alternating editorial section template"
  - "[06-04-G] Tagline: 'Finally, the words for it.' confirmed as primary option — unchanged from prior brief"

metrics:
  duration: "5 min"
  completed_date: "2026-02-27"
  tasks_completed: 2
  files_modified: 1
---

# Phase 06 Plan 04: Visual Direction Brief Summary (v3 — 2026 Direction)

**One-liner:** Complete rewrite of the visual direction brief for Kin — replaces the terracotta/bone/Cormorant/School-of-Life direction with a 2026 premium-digital aesthetic: Deep Teal, Cloud White, Espresso, Merlot palette; Canela contemporary display serif; refined craft illustration; bento-grid/glassmorphism/typographic-hero layout.

---

## What Was Built

The `06-04-visual-direction-brief.md` was fully rewritten as v3. The prior version (v2) specified a terracotta/bone palette, Cormorant Garamond as display font, School of Life editorial line illustration, and an alternating editorial sections layout pattern. The founder determined this direction reads as dated (2022–2024 era, craft/analog/literary register) and incompatible with Kin's digital-native, sleek, premium identity.

The v3 brief specifies the 2026 direction throughout:

**Task 1: Color Palette and Typography**

**Color System (Section 1):**

| Role | Previous | New | Rationale |
|------|----------|-----|-----------|
| Background | Bone `#F7F2EB` (parchment) | Cloud White `#F5F4F2` | Digital surface, not analog craft |
| Primary brand color | Terracotta `#B05A3A` (earthen, dated) | Deep Teal `#0D3D3A` | 2026 breakout color — oceanic depth + technical precision |
| Emotional accent | — | Merlot `#6B1E2E` | Emotional weight, revelation moments |
| Text | Warm Charcoal `#1C1512` | Espresso `#1A1008` | Richer, warmer dark |
| Secondary surface | Soft Clay `#EBE0D5` | Warm Sand `#C8B89A` | Calibrated neutral, not earthy |
| Retained | Aged Gold `#C4892A` | Burnished Amber `#C4892A` (same hex) | Renamed; retained for research/insight emphasis |

Full semantic token mapping for `globals.css` provided. Glassmorphism overrides for deep teal section contexts.

**Typography System (Section 2):**
- Display serif: **Canela** (primary recommendation) or Sang Bleu Kingdom / Quiche Display / Freight Display — contemporary, screen-designed, high-contrast, associated with premium DTC and wellness tech brands. NOT Cormorant Garamond (bookish, print-editorial, hairline strokes that disappear at digital sizes).
- Body font: **Geist Sans** (retained) — the workhorse for all UI, body text, navigation, CTAs. Does the heavy lifting.
- Display serif is stylistic punctuation ONLY: hero headlines (80–108px), section openers (52–72px), pull quotes (24–36px), archetype reveal moments. Never in UI elements, never below 24px.
- Complete type scale with sizes, weights, line heights, and pairing rules.

**Task 2: Imagery, Layout, Tone, Multi-Product Summary**

**Imagery System (Section 3):**
- Illustration register: **Refined craft** — geometric-organic hybrid OR minimal figurative. Higher precision, intentional warmth. Anti-AI but not anti-digital. NOT School of Life loose gestural lines.
- Three direction options: A (sophisticated geometric-organic, Headspace register), B (refined minimal figurative), C (abstract psychological landscape for decorative elements)
- Visual references: Headspace, Calm, Linear/Pitch brand illustration
- Brand illustration subject: parent interiority (unchanged from prior brief — correct)
- Brand vs. product illustration distinction preserved
- `MirrorIllustration.tsx` redesign and `ArchetypeIcons.tsx` style update documented

**Layout Approach (Section 4):**
- **Bento-grid modularity** for feature-dense sections — asymmetric, size-varied cards, genuine depth
- **Large typographic heroes** — type IS the composition; display serif at 80–108px light weight
- **Glassmorphism** on deep teal section backgrounds — `rgba(255,255,255,0.08)` + `backdrop-filter: blur(12px)`
- **Scroll-triggered motion** — fade-up reveals (400–600ms ease-out), staggered 50–100ms card entry, `prefers-reduced-motion` respected
- Whitespace spec: 96px mobile / 140px desktop section padding
- Responsive priorities documented for mobile-first millennial parent audience

**Brand Tone and Voice (Section 5):**
- Five tone attributes: Knowing, Revelatory, Peer-level, Grounded, Confident without proclamation
- Voice register table updated to include Warm/Sleek balance axis (5/10 balanced — the brand synthesizes both)
- Vocabulary guidance: words used and words avoided (unchanged, confirmed correct)
- Tagline: "Finally, the words for it." confirmed as primary direction (unchanged)

**Multi-Product Visual System Summary (Section 6):**
- Full table proving Kin visual system applies across The Mirror, The Blueprint, The Partner Match
- Product accent differentiation: Merlot (Mirror + Partner Match), Burnished Amber (Blueprint)
- All layout patterns (bento-grid, glassmorphism, typographic hero) apply identically across products

---

## Key Decisions Made

| Decision | Detail |
|----------|--------|
| [06-04-NEW-A] Deep Teal as primary | Replaces terracotta — depth, precision, 2026 premium digital |
| [06-04-NEW-B] Cloud White as background | Replaces Bone — digital surface, not parchment |
| [06-04-NEW-C] Merlot added | Emotional weight color for revelation moments |
| [06-04-NEW-D] Cormorant Garamond OUT | Too bookish/print-editorial; Canela or contemporary display serif IN |
| [06-04-NEW-E] Serif = stylistic punctuation | Only at 24px+, only for hero/opener/pull-quote/reveal moments; Geist Sans does everything else |
| [06-04-NEW-F] Illustration register shift | School of Life OUT; refined craft (geometric-organic / minimal figurative) IN |
| [06-04-NEW-G] Layout: 2026 patterns | Bento-grid + large typographic heroes + glassmorphism + scroll motion |
| [06-04-G] Tagline confirmed | "Finally, the words for it." — unchanged, confirmed |

---

## Deviations from Plan

### Scope Expansion (Auto-applied)

**1. [Rule 2 - Critical functionality] Task 2 sections written in Task 1 commit**

- **Found during:** Task 1 execution
- **Issue:** The visual direction brief is a single document. Separating color/typography (Task 1) from imagery/layout/tone (Task 2) into two commits would have produced an incomplete document after Task 1. The PLAN.md specifies Task 2 as "Append to the visual direction brief."
- **Fix:** All six sections were written together in the single Task 1 commit. Task 2 verification was run separately and confirmed all required sections are present. This is a documentation artifact of the plan structure, not a gap in execution.
- **Files modified:** 06-04-visual-direction-brief.md
- **Commit:** 6c2a2cc

### Auto-fixed Directional Overrides

**2. [User Override] Entire prior visual direction replaced per founder 2026 direction**

The prior brief (v2) specified terracotta palette, Cormorant Garamond, School of Life illustration, and alternating editorial sections. The plan (v3 — written by founder/GSD system) explicitly required replacing all four of these elements. This is not a deviation — it is the stated objective. Documented here for traceability.

**Specific elements replaced:**
- Terracotta `#B05A3A` → Deep Teal `#0D3D3A` as primary brand color
- Bone `#F7F2EB` → Cloud White `#F5F4F2` as background
- Cormorant Garamond → Canela / contemporary display serif
- School of Life editorial line illustration → Refined craft (geometric-organic / minimal figurative)
- Alternating editorial sections → Bento-grid + typographic heroes + glassmorphism

---

## Self-Check

**Files exist:**
- [x] `.planning/phases/06-brand-positioning-research-and-visual-direction/06-04-visual-direction-brief.md` — verified present; contains 51 hex codes, 11 semantic tokens, all 6 sections
- [x] `.planning/phases/06-brand-positioning-research-and-visual-direction/06-04-SUMMARY.md` — this file

**Commits exist:**
- [x] 6c2a2cc — `feat(06-04): rewrite visual direction brief for Kin — 2026 direction`

**Verification criteria:**
- [x] Color palette has 5+ colors with hex codes and emotional rationale
- [x] Semantic tokens mapped to CSS custom property names
- [x] Typography: display font, body font, scale, and rules — all specified
- [x] Imagery system distinguishes brand-level from product-specific illustration
- [x] Layout approach covers whitespace, density, bento-grid, glassmorphism, motion, responsive
- [x] Brand tone has 5 attributes, voice register table, vocabulary guidance
- [x] Multi-product visual system summary table exists
- [x] Every visual decision traces to positioning territory and Kin brand identity
- [x] No product-specific metaphors at brand level
- [x] NO terracotta as primary recommendation
- [x] NO Cormorant Garamond as recommendation (only referenced as "being replaced")
- [x] Sans-serif (Geist Sans) is the workhorse; serif (Canela) is stylistic punctuation only
- [x] Overall aesthetic is sleek/digital/premium, not literary/editorial/analog

## Self-Check: PASSED
