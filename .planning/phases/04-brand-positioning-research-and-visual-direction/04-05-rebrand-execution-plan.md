# Rebrand Execution Plan
## Phase 06-05 — From Visual Direction to Developer-Ready Change List

**Date:** 2026-02-27 (v2 — REWRITTEN for Kin brand, 2026 visual direction)
**Status:** Complete
**Inputs:** 04-04-visual-direction-brief.md (what to change — v3, 2026 direction), 04-03-positioning-narrative.md (why), codebase analysis (how)
**Purpose:** Bridge strategy and implementation — every visual direction recommendation mapped to a specific file, token, or component change. Per 04-RESEARCH.md Pitfall 1: Phase 4 produces the PLAN for rebrand, not the rebrand itself.

---

## Executive Summary

The rebrand translates the "digital tools for parents who want to understand themselves" positioning into a Deep Teal-anchored premium digital palette, a shift from Cormorant Garamond to Canela (or equivalent contemporary display serif), a move from abstract geometric illustrations to refined craft illustration, and a bento-grid/glassmorphism/typographic-hero layout system. The changes affect every layer of the stack: CSS custom properties in `globals.css` (palette tokens), font import in `layout.tsx` (display serif swap), 26 component files (hardcoded amber/stone color class replacements), and new illustration assets.

The changes are low-to-medium disruption. Palette is a single-file update that propagates everywhere tokens are used. Font swap is two lines of code. Component color class replacements are numerous but mechanical. Illustration redesign is the highest-effort work. Implementation is scoped into three phases — Foundation (palette + font + metadata, ~2 plans), Components (color class replacements + copy + brand name, ~3–4 plans), and Assets (illustrations + brand identity, ~3–5 plans) — to allow incremental rollout with clear rollback points at each phase boundary.

**Critical brand name context:** The brand is now **Kin** (not "Raising Giants", not "Imprint"). The naming convention is **"The [Product] by Kin"** (e.g., "The Mirror by Kin"). All string replacements in this plan use **Kin** as the brand name.

---

## Codebase Audit — Current State

### Files with hardcoded `amber-*` / `stone-900` color classes (26 files)

**Landing page components:**
- `components/landing/HeroWithIllustration.tsx` — amber-50 bg, amber-100 circle, amber-700 eyebrow, amber-600 em, stone-900 CTA, amber-50 CTA text, amber-200 border, amber-200/30 glow
- `components/landing/ArchetypeShowcase.tsx` — amber-700 eyebrow, stone-900 heading, stone-50/stone-200 card, amber-300 hover border, amber-50 hover bg, stone-900 CTA, amber-50 CTA text
- `components/landing/SecondaryHero.tsx` — stone-900 section bg, amber-900/30 glow, amber-400 eyebrow, amber-300/90 em, amber-500 CTA, stone-900 CTA text, amber-800/20 editorial mark
- `components/landing/KOLCredibility.tsx` — stone-900 headings (font-display)
- `components/landing/ProductLadder.tsx` — font-display headings (style prop pattern)
- `components/landing/SocialProof.tsx` — stone-900 font-display heading
- `components/landing/KOLNarrative.tsx` — italic font-display quote
- `components/landing/FAQ.tsx` — stone-900 font-display heading
- `components/landing/ArchetypePreview.tsx` — stone-900 headings, stone-800 body (font-display)
- `components/landing/HeroSection.tsx` — Raising Giants brand name, font-display headings
- `components/landing/Footer.tsx` — "Raising Giants" brand strings ×2

**Quiz components:**
- `components/quiz/QuizShell.tsx` — amber-50 bg ×4, stone-900 headings ×2, stone-900 CTA, amber-50 CTA text, amber-500 CTA, amber-50 hover state
- `components/quiz/OptionCard.tsx` — amber-400 focus ring, amber-50/amber-500/amber-900 selected state, amber-300/amber-50 hover state, amber-600 check icon
- `components/quiz/QuizProgress.tsx` — amber-500 progress bar fill
- `components/quiz/EmailCaptureScreen.tsx` — amber-50 bg, amber-100 border, amber-500 button
- `components/quiz/ProcessingScreen.tsx` — amber-50 bg, amber-400 bounce dots ×3
- `components/quiz/CulturalDropdown.tsx` — amber-400 focus ring, amber-50/amber-900 selected, amber-600 icon
- `components/quiz/WhyWeAskThis.tsx` — amber-400 focus ring
- `components/quiz/QuizCard.tsx` — stone-900 heading

**Result components:**
- `components/result/ArchetypeReveal.tsx` — amber-50 section bg, stone-900 heading, amber-400 divider
- `components/result/FoundationalPatternsSection.tsx` — stone-900 heading, amber-400 left border accent
- `components/result/CulturalSection.tsx` — amber-50 section bg, stone-900 headings ×2, amber-400 bullet dot
- `components/result/WatchoutsSection.tsx` — stone-900 heading
- `components/result/BlueprintCTA.tsx` — stone-900 section bg, amber-500/20 badge bg, amber-300 badge text, amber-500/30 badge ring, amber-500 CTA, stone-900 CTA text
- `components/result/EmailGateOverlay.tsx` — amber-50/95 overlay bg, amber-100 border, stone-900 heading, amber-500 button
- `components/result/ResultPageClient.tsx` — amber-50/95 fade overlay
- `components/result/StickyBlueprintBar.tsx` — stone-900/95 bar bg, stone-700 border, amber-500 CTA, stone-900 CTA text
- `components/result/BlueprintEmailForm.tsx` — amber-100/amber-200 card, amber-400/30 icon bg, amber-700 label, amber-500 button

### Files with brand name "Raising Giants" (user-facing copy)

| File | Line | Current | Replacement |
|------|------|---------|-------------|
| `app/layout.tsx` | 20 | `title: "Raising Giants — The Mirror"` | `"Kin — The Mirror"` |
| `app/layout.tsx` | 24 | OG title `"Raising Giants — The Mirror"` | `"Kin — The Mirror"` |
| `app/layout.tsx` | 28 | `siteName: "Raising Giants"` | `"Kin"` |
| `app/layout.tsx` | 34 | twitter `"Raising Giants — The Mirror"` | `"Kin — The Mirror"` |
| `app/layout.tsx` | 19 | `metadataBase: new URL("https://raisinggiants.com")` | Update when domain confirmed |
| `components/landing/HeroWithIllustration.tsx` | 30 | `"Raising Giants — The Mirror"` (eyebrow) | `"The Mirror by Kin"` |
| `components/landing/HeroSection.tsx` | 26 | `"Raising Giants — The Mirror"` (eyebrow) | `"The Mirror by Kin"` |
| `components/landing/Footer.tsx` | 7 | `"Raising Giants"` (logo text) | `"Kin"` |
| `components/landing/Footer.tsx` | 19 | `"© {year} Raising Giants. All rights reserved."` | `"© {year} Kin. All rights reserved."` |

### Files with `font-display` (Cormorant Garamond — requires font swap)

All files using `className="... font-display"` or `style={{ fontFamily: "var(--font-display)" }}` will update automatically once the font import in `layout.tsx` is changed from `Cormorant_Garamond` to the new display serif. No individual file changes needed for the font swap — it is a single-file update.

**Components currently using `font-display`:** HeroWithIllustration.tsx, ArchetypeShowcase.tsx, KOLCredibility.tsx, ProductLadder.tsx, SocialProof.tsx, KOLNarrative.tsx, FAQ.tsx, ArchetypePreview.tsx, HeroSection.tsx, SecondaryHero.tsx.

### CSS Custom Properties (globals.css — current state)

All semantic tokens are currently set to neutral Tailwind defaults (oklch black/white/grey). No brand-specific tokens have been set yet. The codebase relies primarily on hardcoded Tailwind color classes rather than semantic tokens for brand colors — this is why Phase B (component-level class replacements) is required alongside Phase A.

### Illustration files requiring redesign

- `components/landing/illustrations/MirrorIllustration.tsx` — wraps `public/images/illustrations/` (no PNG found in audit; likely inline SVG component)
- `components/landing/illustrations/ArchetypeIcons.tsx` — renders archetype icons (inline SVG component)

---

## Color Change Mapping — New Palette

All hex values are from 04-04-visual-direction-brief.md (v3). oklch values below are conversion approximations — implementing executor must verify with oklch.com.

### Semantic Token Updates (globals.css — Phase A)

| Token | Current | New Value | Color Name | Hex | oklch |
|-------|---------|-----------|-----------|-----|-------|
| `--background` | `oklch(1 0 0)` | Cloud White | `#F5F4F2` | `oklch(0.963 0.004 75)` |
| `--foreground` | `oklch(0.145 0 0)` | Espresso | `#1A1008` | `oklch(0.148 0.012 55)` |
| `--card` | `oklch(1 0 0)` | Cloud White (cards) | `#F5F4F2` | `oklch(0.963 0.004 75)` |
| `--card-foreground` | `oklch(0.145 0 0)` | Espresso | `#1A1008` | `oklch(0.148 0.012 55)` |
| `--primary` | `oklch(0.205 0 0)` | Deep Teal | `#0D3D3A` | `oklch(0.295 0.068 185)` |
| `--primary-foreground` | `oklch(0.985 0 0)` | Cloud White | `#F5F4F2` | `oklch(0.963 0.004 75)` |
| `--secondary` | `oklch(0.97 0 0)` | Warm Sand | `#C8B89A` | `oklch(0.765 0.038 75)` |
| `--secondary-foreground` | `oklch(0.205 0 0)` | Espresso | `#1A1008` | `oklch(0.148 0.012 55)` |
| `--muted` | `oklch(0.97 0 0)` | Warm Sand (muted) | `#C8B89A` | `oklch(0.765 0.038 75)` |
| `--muted-foreground` | `oklch(0.556 0 0)` | Warm mid-tone | `#7A6E65` | `oklch(0.490 0.012 60)` |
| `--accent` | `oklch(0.97 0 0)` | Burnished Amber | `#C4892A` | `oklch(0.635 0.115 70)` |
| `--accent-foreground` | `oklch(0.205 0 0)` | Espresso | `#1A1008` | `oklch(0.148 0.012 55)` |
| `--border` | `oklch(0.922 0 0)` | Warm Sand light | `#C8B89A` at 40% | `oklch(0.765 0.038 75 / 40%)` |

### New Custom Properties to Add (globals.css — Phase A)

| Property Name | Value | Purpose |
|--------------|-------|---------|
| `--color-deep-teal` | `oklch(0.295 0.068 185)` | Deep Teal `#0D3D3A` — primary brand color, hero section background on dark sections |
| `--color-cloud-white` | `oklch(0.963 0.004 75)` | Cloud White `#F5F4F2` — default page background |
| `--color-espresso` | `oklch(0.148 0.012 55)` | Espresso `#1A1008` — primary text |
| `--color-merlot` | `oklch(0.380 0.120 10)` | Merlot `#6B1E2E` — revelation moments, archetype reveal, emotional weight |
| `--color-burnished-amber` | `oklch(0.635 0.115 70)` | Burnished Amber `#C4892A` — research/insight emphasis (Blueprint product accent) |
| `--color-warm-sand` | `oklch(0.765 0.038 75)` | Warm Sand `#C8B89A` — card surfaces, secondary backgrounds |

### Component Color Class Replacement Map

**Amber → New palette mapping:**

| Current Tailwind Class | New Class | Color | Use Context |
|----------------------|-----------|-------|-------------|
| `bg-amber-50` | `bg-[#F5F4F2]` or `bg-background` | Cloud White | Page/section backgrounds |
| `bg-amber-100` | `bg-[#C8B89A]/30` | Warm Sand light | Card borders, subtle fills |
| `bg-amber-200` | `bg-[#C8B89A]/50` | Warm Sand mid | Decorative elements |
| `bg-amber-400` | `bg-[#C4892A]` | Burnished Amber | Dividers, bullet dots, progress bar, focus rings on quiz |
| `bg-amber-500` | `bg-[#6B1E2E]` | Merlot | Primary CTAs on light backgrounds (Mirror product) |
| `bg-amber-600` | `bg-[#5a1925]` | Merlot dark | CTA hover state |
| `bg-amber-900/30` | `bg-[#0D3D3A]/40` | Deep Teal glow | Dark section background glow |
| `text-amber-300` | `text-[#C4892A]/80` | Burnished Amber muted | Dark-section emotional emphasis |
| `text-amber-400` | `text-[#C4892A]` | Burnished Amber | Dark-section eyebrows, accents |
| `text-amber-50` | `text-[#F5F4F2]` | Cloud White | Text on dark/teal backgrounds |
| `text-amber-600` | `text-[#6B1E2E]` | Merlot | Inline emotional emphasis on light bg |
| `text-amber-700` | `text-[#6B1E2E]` | Merlot | Eyebrow labels on light backgrounds |
| `text-amber-900` | `text-[#1A1008]` | Espresso | Selected state text |
| `border-amber-100` | `border-[#C8B89A]/40` | Warm Sand border | Card borders |
| `border-amber-200` | `border-[#C8B89A]/50` | Warm Sand border | Section dividers |
| `border-amber-300` | `border-[#C4892A]/50` | Burnished Amber border | Hover state borders |
| `border-amber-400` | `border-[#C4892A]` | Burnished Amber | Dividers, left border accents |
| `border-amber-500/30` | `border-[#6B1E2E]/30` | Merlot | Badge rings |
| `hover:border-amber-300` | `hover:border-[#0D3D3A]/40` | Deep Teal border hover | Card hover state |
| `hover:from-amber-50` | `hover:from-[#0D3D3A]/5` | Deep Teal tint | Card hover gradient start |
| `hover:to-amber-50/20` | `hover:to-[#0D3D3A]/3` | Deep Teal tint | Card hover gradient end |
| `hover:bg-amber-400` | `hover:bg-[#5a1925]` | Merlot dark | CTA hover |
| `hover:bg-amber-600` | `hover:bg-[#5a1925]` | Merlot dark | Button hover |
| `ring-amber-400` | `ring-[#C4892A]` | Burnished Amber | Focus rings (quiz accessibility) |
| `ring-amber-500/30` | `ring-[#6B1E2E]/30` | Merlot ring | Badge ring |
| `focus-visible:ring-amber-400` | `focus-visible:ring-[#C4892A]` | Burnished Amber | Focus accessibility |

**Stone → New palette mapping:**

| Current Tailwind Class | New Class | Color | Use Context |
|----------------------|-----------|-------|-------------|
| `bg-stone-50` | `bg-[#C8B89A]/15` | Warm Sand very light | Card default backgrounds |
| `bg-stone-900` | `bg-[#0D3D3A]` | Deep Teal | Dark sections, dark CTAs |
| `bg-stone-900/95` | `bg-[#0D3D3A]/95` | Deep Teal | Sticky bar background |
| `border-stone-100` | `border-[#C8B89A]/30` | Warm Sand | Subtle borders |
| `border-stone-200` | `border-[#C8B89A]/40` | Warm Sand | Card borders |
| `border-stone-700` | `border-[#0D3D3A]/60` | Deep Teal | Dark borders |
| `text-stone-100` | `text-[#F5F4F2]` | Cloud White | Text on teal/dark bg |
| `text-stone-300` | `text-[#C8B89A]` | Warm Sand | Muted text on dark bg |
| `text-stone-500` | `text-[#7A6E65]` | Muted mid | Secondary text |
| `text-stone-600` | `text-[#7A6E65]` | Muted mid | Footer, secondary text |
| `text-stone-700` | `text-[#1A1008]/80` | Espresso muted | Body text on light bg |
| `text-stone-800` | `text-[#1A1008]/90` | Espresso near | Strong body text |
| `text-stone-900` | `text-[#1A1008]` | Espresso | Headings, primary text |
| `hover:bg-stone-700` | `hover:bg-[#0a302d]` | Deep Teal dark | Dark button hover |
| `hover:bg-stone-800` | `hover:bg-[#0a302d]` | Deep Teal dark | Button hover |
| `hover:text-stone-700` | `hover:text-[#1A1008]` | Espresso | Link hover |
| `hover:text-stone-900` | `hover:text-[#1A1008]` | Espresso | Link hover |

---

## Change Scope Matrix

| Visual Direction | File(s) | Specific Change | Phase | Effort |
|-----------------|---------|-----------------|-------|--------|
| **Palette — background** | `/app/globals.css` | Replace `--background` with Cloud White `#F5F4F2` | A | Trivial |
| **Palette — foreground** | `/app/globals.css` | Replace `--foreground` with Espresso `#1A1008` | A | Trivial |
| **Palette — primary (Deep Teal)** | `/app/globals.css` | Replace `--primary` with Deep Teal `#0D3D3A`; `--primary-foreground` with Cloud White | A | Trivial |
| **Palette — secondary (Warm Sand)** | `/app/globals.css` | Replace `--secondary` and `--muted` with Warm Sand `#C8B89A` | A | Trivial |
| **Palette — accent (Burnished Amber)** | `/app/globals.css` | Replace `--accent` with Burnished Amber `#C4892A` | A | Trivial |
| **Palette — custom brand tokens** | `/app/globals.css` | Add `--color-deep-teal`, `--color-cloud-white`, `--color-espresso`, `--color-merlot`, `--color-burnished-amber`, `--color-warm-sand` | A | Low |
| **Display font — swap Cormorant for Canela** | `/app/layout.tsx` | Replace `Cormorant_Garamond` import with Canela or chosen display serif; update import name; keep `variable: "--font-display"` | A | Low |
| **Metadata — brand name** | `/app/layout.tsx` | Replace all "Raising Giants" with "Kin" across title, openGraph, twitter; hold `metadataBase` URL until domain confirmed | A | Trivial |
| **Metadata — description** | `/app/layout.tsx` | Rewrite description in permission-first voice aligned with 'I always sensed this. Now I see it.' — remove advice framing | A | Low |
| **Hero section — background + decorative** | `HeroWithIllustration.tsx` | `bg-amber-50` → `bg-background`; amber-100 circle → warm-sand tint; amber glow → teal glow | B | Moderate |
| **Hero section — eyebrow + brand name** | `HeroWithIllustration.tsx` | "Raising Giants — The Mirror" → "The Mirror by Kin"; `text-amber-700` → `text-[#6B1E2E]` (Merlot) | B | Low |
| **Hero section — em italic accent** | `HeroWithIllustration.tsx` | `text-amber-600` → `text-[#6B1E2E]` (Merlot) | B | Trivial |
| **Hero section — CTA button** | `HeroWithIllustration.tsx` | `bg-stone-900` → `bg-[#0D3D3A]` (Deep Teal); `text-amber-50` → `text-[#F5F4F2]` (Cloud White) | B | Trivial |
| **Hero section — headline size** | `HeroWithIllustration.tsx` | `text-5xl sm:text-6xl lg:text-7xl` → `text-6xl sm:text-7xl lg:text-8xl` | B | Trivial |
| **Hero section — whitespace** | `HeroWithIllustration.tsx` | `py-20 lg:py-32` → `py-24 lg:py-40` (140px desktop per brief spec) | B | Trivial |
| **Archetype showcase — card colors** | `ArchetypeShowcase.tsx` | `bg-stone-50 border-stone-200` → warm-sand light card; hover to teal-tinted | B | Moderate |
| **Archetype showcase — eyebrow + CTA** | `ArchetypeShowcase.tsx` | amber-700 → Merlot eyebrow; stone-900 CTA → Deep Teal | B | Low |
| **Secondary hero — dark section bg** | `SecondaryHero.tsx` | `bg-stone-900` → `bg-[#0D3D3A]` (Deep Teal, not stone) | B | Trivial |
| **Secondary hero — glow + accents** | `SecondaryHero.tsx` | amber-900/30 glow → teal/40 glow; amber-400 eyebrow → Burnished Amber; amber-300/90 em → Burnished Amber; amber-500 CTA → Merlot | B | Moderate |
| **Landing copy — subheadlines** | `HeroWithIllustration.tsx`, others | Rewrite subheadline copy in permission-first voice; remove "5 minutes" urgency framing | B | Low |
| **KOL components — color classes** | `KOLCredibility.tsx`, `KOLNarrative.tsx` | stone-900 headings → Espresso (via text-[#1A1008] or semantic token); update any amber accents | B | Low |
| **Quiz shell — background + CTAs** | `QuizShell.tsx` | All `bg-amber-50` → `bg-background`; stone-900/amber CTAs → Deep Teal/Merlot equivalents | B | Moderate |
| **Quiz option cards** | `OptionCard.tsx` | amber selected/hover states → Deep Teal selected; amber-400 check → Burnished Amber; focus ring → Burnished Amber | B | Moderate |
| **Quiz progress bar** | `QuizProgress.tsx` | `bg-amber-500` → `bg-[#0D3D3A]` (Deep Teal progress fill) | B | Trivial |
| **Quiz processing + email screens** | `ProcessingScreen.tsx`, `EmailCaptureScreen.tsx` | amber backgrounds/buttons → Cloud White bg, Merlot CTAs, Burnished Amber dots | B | Moderate |
| **Quiz cultural dropdown** | `CulturalDropdown.tsx` | amber focus ring/selected → Burnished Amber focus, teal selected state | B | Low |
| **Result archetype reveal** | `ArchetypeReveal.tsx` | `bg-amber-50` → Cloud White; amber-400 divider → **Merlot** (revelation moment — primary Merlot use); stone-900 heading → Espresso | B | Low |
| **Result foundational patterns** | `FoundationalPatternsSection.tsx` | amber-400 left border accent → Merlot | B | Trivial |
| **Result cultural section** | `CulturalSection.tsx` | amber-50 bg → Cloud White; amber-400 bullets → Burnished Amber; stone-900 → Espresso | B | Low |
| **Result watchouts** | `WatchoutsSection.tsx` | stone-900 → Espresso | B | Trivial |
| **Result Blueprint CTA** | `BlueprintCTA.tsx` | stone-900 dark section → Deep Teal; amber-500/amber-300 badge → Burnished Amber; amber-500 CTA → Burnished Amber (Blueprint accent) | B | Moderate |
| **Result email gate overlay** | `EmailGateOverlay.tsx` | amber-50/95 overlay → Cloud White/95; amber-100 border → Warm Sand; amber-500 button → Merlot | B | Moderate |
| **Result sticky bar** | `StickyBlueprintBar.tsx` | stone-900/95 → Deep Teal/95; stone-700 border → teal border; amber-500 CTA → Burnished Amber | B | Low |
| **Result Blueprint email form** | `BlueprintEmailForm.tsx` | amber-100/200 card → Warm Sand; amber-400 icon bg → Burnished Amber; amber-700 label → Espresso; amber-500 button → Burnished Amber | B | Moderate |
| **Footer — brand name** | `Footer.tsx` | "Raising Giants" → "Kin" (×2: logo text + copyright) | B | Trivial |
| **Hero illustration concept** | `MirrorIllustration.tsx` | Redesign inline SVG to refined craft direction (geometric-organic or minimal figurative) per 06-04 Section 3. Subject: parent interiority scene, NOT mirror-reflection metaphor. Deep Teal / Cloud White / Merlot palette. | C | Significant |
| **Archetype icons — illustration style** | `ArchetypeIcons.tsx` | Update 9 archetype icons from current geometric abstract SVG to refined craft register. Deep Teal outlines, Burnished Amber / Merlot accents per archetype product assignment. | C | Significant |
| **OG image** | `public/og-image.png` (if exists) | New 1200×630 OG image: Kin branding, Cloud White background, Canela headline, Deep Teal accent | C | Moderate |
| **Favicon** | `public/favicon.ico` or `app/favicon.ico` | New favicon reflecting Kin brand mark | C | Moderate |

---

## Implementation Constraints

### Tailwind v4 Token System

`@theme inline` in `globals.css` maps CSS custom properties to Tailwind classes. Semantic tokens (`bg-background`, `text-foreground`, `bg-primary`, `bg-card`) propagate globally from a single file. However, the current codebase uses hardcoded Tailwind color classes (`bg-amber-50`, `text-amber-700`, `bg-stone-900`) directly in most components — these do NOT respond to token changes. Both layers require updating.

**Strategy:** Phase A updates semantic tokens. Phase B replaces hardcoded Tailwind color classes in 26 component files.

### Canela Font — Google Fonts Availability

Canela is a commercial font (Commercial Type) and is NOT available on Google Fonts. This is a critical constraint. Options:

1. **Canela via self-hosting** — requires purchasing a license ($$$). Self-hosted with `next/font/local`. Highest quality match to brief.
2. **Playfair Display (Google Fonts)** — free, similar high-contrast editorial feel, slightly more bookish than Canela. Acceptable substitute.
3. **DM Serif Display (Google Fonts)** — free, contemporary, screen-optimized, lower contrast than Canela. Closest free alternative in spirit.
4. **Fraunces (Google Fonts)** — free, optical size variable, contemporary display with warmth. Strong free option.

**Recommendation:** Use **DM Serif Display** as the Canela substitute from Google Fonts — it is contemporary, screen-optimized, and carries the stylistic punctuation intent of the brief without the bookish weight of Cormorant Garamond. Implementation path: `DM_Serif_Display({ variable: "--font-display", subsets: ["latin"], style: ["normal", "italic"] })`. The implementation executor makes the final call from these options at execution time.

**Implementation note:** The `--font-display` CSS variable name stays identical. All components using `font-display` class or `var(--font-display)` update automatically — no component-level changes needed for the font swap.

### oklch Color Format

`globals.css` uses `oklch()` notation. All hex values must be converted. The implementing executor must verify values at oklch.com — the values in this document are approximations.

| Hex | Color Name | Role | oklch Approximation |
|-----|-----------|------|---------------------|
| `#F5F4F2` | Cloud White | Background | `oklch(0.963 0.004 75)` |
| `#1A1008` | Espresso | Primary text | `oklch(0.148 0.012 55)` |
| `#0D3D3A` | Deep Teal | Primary brand | `oklch(0.295 0.068 185)` |
| `#6B1E2E` | Merlot | Revelation accent | `oklch(0.380 0.120 10)` |
| `#C4892A` | Burnished Amber | Research/insight | `oklch(0.635 0.115 70)` |
| `#C8B89A` | Warm Sand | Card surface | `oklch(0.765 0.038 75)` |
| `#7A6E65` | Muted mid | Secondary text | `oklch(0.490 0.012 60)` |

### Glassmorphism — New CSS Required

The brief specifies glassmorphism effects on deep teal section backgrounds. The current codebase has no glassmorphism. Add to `globals.css`:

```css
.glass-card {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.12);
}
```

**Note:** Glassmorphism is a new layout pattern. The component changes to implement bento-grid layouts with glassmorphism are beyond Phase B scope (color class replacement). If a layout rebuild is desired, it belongs in a separate Phase D or is deferred to the Phase B landing component plans at the implementor's discretion.

### Scroll-triggered Motion — New Utility Required

The brief specifies fade-up reveals with staggered card entry. The current codebase has no motion utilities. `tw-animate-css` is already imported. Implementation path: add `@keyframes fade-up` to `globals.css` and apply with Tailwind utility classes. `prefers-reduced-motion` must be respected.

**Note:** Motion animations are a new capability. Adding them is a Phase B+ enhancement and should be scoped separately from the color class replacement work.

### Biome Linting

All component changes must pass Biome. The color class replacements are style changes only — no Biome rule violations expected. Key rules to observe during Phase B: no unused imports, no `<img>` tags (use Next.js Image), no array index keys.

### No New Dependencies

The full rebrand (Phases A and B) can be executed within the existing stack. Canela substitute font loads via `next/font/google`. No additional packages required for palette, font, or color class changes.

---

## Phased Implementation Scope

### Phase A: Foundation (~2 implementation plans, ~20 min)

**What changes:** Single-file updates that propagate globally.

1. **`/app/globals.css`** — Update all 10 semantic tokens to the new Kin palette (Cloud White, Espresso, Deep Teal, Warm Sand, Burnished Amber). Add 6 custom brand color properties for cases where hardcoded classes are used. Add `.glass-card` utility. Add `@keyframes fade-up` motion.

2. **`/app/layout.tsx`** — Two changes in one file:
   - Replace `Cormorant_Garamond` font import with chosen display serif (DM Serif Display recommended). Keep `variable: "--font-display"`.
   - Replace all "Raising Giants" metadata strings with "Kin". Update description to permission-first voice. Hold `metadataBase` URL until domain confirmed.

**Risk:** Very low. Token changes are globally propagating — visual regressions are immediately visible and single-command reversible. Font swap is two lines. Metadata changes are strings.

**Rollback:** `git revert` the globals.css commit restores all palette tokens globally.

---

### Phase B: Component-Level (~3–4 implementation plans, ~35–45 min)

**What changes:** Hardcoded color class replacements across 26 component files, plus copy updates.

1. **Landing page components** (HeroWithIllustration, ArchetypeShowcase, SecondaryHero, Footer, KOLCredibility, KOLNarrative, SocialProof, FAQ, ArchetypePreview, HeroSection, ProductLadder) — Replace amber-*/stone-900 classes with Deep Teal / Merlot / Burnished Amber / Cloud White equivalents. Update brand name strings. Update copy to permission-first voice.

2. **Quiz components** (QuizShell, OptionCard, QuizProgress, EmailCaptureScreen, ProcessingScreen, CulturalDropdown, WhyWeAskThis, QuizCard) — Replace amber-*/stone-900 classes. Maintain current layout and interaction UX — only colors change.

3. **Result components** (ArchetypeReveal, FoundationalPatternsSection, CulturalSection, WatchoutsSection, BlueprintCTA, EmailGateOverlay, ResultPageClient, StickyBlueprintBar, BlueprintEmailForm) — Replace amber-*/stone-900 classes. Apply **Merlot** to revelation moments (archetype reveal divider, left border accent) and **Burnished Amber** to Blueprint-related CTAs/accents.

**Merlot vs. Burnished Amber by product context:**
- The Mirror (quiz, result reveal, email gate): **Merlot** as primary accent — encodes revelation/emotional weight
- The Blueprint (CTA section, sticky bar, email form): **Burnished Amber** — Blueprint product accent per multi-product table in 06-04 brief

**Risk:** Medium. Numerous changes across isolated files. Risk is hover/focus/active state misses. Run `grep -r "amber" components/` and `grep -r "stone-900" components/` before committing each component to verify complete coverage.

**Rollback:** Each component file is independently reversible.

---

### Phase C: Asset-Level (~3–5 implementation plans, ~45–75 min)

**What changes:** New illustrations and brand identity assets.

1. **`MirrorIllustration.tsx` redesign** — Current implementation renders inline SVG geometric shapes. Redesign to refined craft per 06-04 Section 3: Direction A (geometric-organic, Headspace register), Direction B (minimal figurative), or Direction C (abstract psychological landscape for decorative use). Color palette: Deep Teal `#0D3D3A` outlines / fills, Cloud White `#F5F4F2` background, Merlot `#6B1E2E` emotional accent. Subject: parent interiority (internal emotional landscape), NOT a literal mirror reflection metaphor. The brand-level illustration depicts the feeling of recognition, not the product name.

   Implementation options:
   - Option A: Inline SVG (recommended) — redesign the component directly; responsive, colorable, no external assets; zero `<Image>` compliance issues
   - Option B: PNG replacement — create new `hero-mirror.png`; simpler code but less flexible

2. **`ArchetypeIcons.tsx` redesign** — 9 archetype icons. Update from current geometric abstract style to refined craft register. Each icon encodes the archetype's core emotional pattern as a visual metaphor (not abstract geometry). Color palette: Deep Teal outlines, Burnished Amber accents. Consistent visual weight and style across all 9.

3. **Brand assets:**
   - OG image (`public/og-image.png`, 1200×630): Kin branding, Cloud White background, display serif headline ("Finally, the words for it."), Deep Teal accent mark
   - Favicon: Kin brand mark — "K" letterform in Canela/DM Serif Display, Deep Teal on Cloud White, or minimal teal mark

**Risk:** Higher. Illustration creation is creative/qualitative work. Phase C implementation plans should include a human-verify checkpoint after the hero illustration and after the archetype icon set — the user reviews each before the next is committed. The brief specifies visual direction but final art requires human judgment on execution quality.

**Rollback:** Each illustration file is independently replaceable. PNG options are simple file swaps with no code changes.

---

## Brand Name Change — Technical Checklist

Per 06-03-KIN decision: name change from "Raising Giants" to **Kin** (founder decision, supersedes prior "Imprint" recommendation).

### Pre-Implementation (User Actions Required)

- [ ] **Domain availability:** Verify `kin.com`, `kin.co`, `getkin.com`, `kin.app`, `withkin.com` availability. The brand name "Kin" is common — several domains will be taken. **Action required before metadataBase URL change becomes permanent.**
- [ ] **Domain acquisition:** Purchase preferred domain.
- [ ] **Social media handles:** Check `@getkin`, `@kinapp`, `@withkin` across Instagram, X/Twitter, TikTok.

### Implementation Steps (executor actions)

**Phase A (immediately implementable, no domain needed):**
- [ ] Update `title`, `openGraph.title`, `openGraph.siteName`, `twitter.title` in `/app/layout.tsx` — "Raising Giants" → "Kin"
- [ ] Update description text in all three metadata locations
- [ ] Leave `metadataBase: new URL("https://raisinggiants.com")` unchanged until domain confirmed

**Phase B (after domain confirmed):**
- [ ] Update `metadataBase` to new domain URL
- [ ] Verify all `alternates.canonical` values

**Phase C (after domain is live and DNS configured):**
- [ ] Configure 301 redirects from `raisinggiants.com` to new domain (Vercel → Settings → Domains)
- [ ] Supabase project: cosmetic display name update only — does not affect production URLs
- [ ] Update any Vercel environment variables containing the old domain string

### String References in Codebase (complete list)

| File | Line | Current | Replacement |
|------|------|---------|-------------|
| `app/layout.tsx` | 20 | `"Raising Giants — The Mirror"` | `"Kin — The Mirror"` |
| `app/layout.tsx` | 24 | OG `"Raising Giants — The Mirror"` | `"Kin — The Mirror"` |
| `app/layout.tsx` | 28 | `siteName: "Raising Giants"` | `"Kin"` |
| `app/layout.tsx` | 34 | twitter `"Raising Giants — The Mirror"` | `"Kin — The Mirror"` |
| `app/layout.tsx` | 19 | `metadataBase` URL | Hold until domain confirmed |
| `components/landing/HeroWithIllustration.tsx` | 30 | `"Raising Giants — The Mirror"` | `"The Mirror by Kin"` |
| `components/landing/HeroSection.tsx` | 26 | `"Raising Giants — The Mirror"` | `"The Mirror by Kin"` |
| `components/landing/Footer.tsx` | 7 | `"Raising Giants"` | `"Kin"` |
| `components/landing/Footer.tsx` | 19 | `"© {year} Raising Giants."` | `"© {year} Kin."` |

Code identifiers (variable names, type names, database table names) do NOT need to change.

### SEO Equity

301 redirect from `raisinggiants.com` preserves ~90% of link equity. Add new domain to Google Search Console after DNS configuration. Update `sitemap.xml` with new domain URL after migration.

---

## Total Effort Estimate

| Phase | Plans Needed | Estimated Time | Dependencies |
|-------|-------------|----------------|--------------|
| Phase A: Foundation | 2 | ~20 min | 06-04 brief done; font choice confirmed |
| Phase B: Component-Level | 3–4 | ~35–45 min | Phase A complete (tokens available) |
| Phase C: Assets | 3–5 | ~45–75 min | Phase B complete; illustration direction chosen |
| **Total** | **8–11 plans** | **~100–140 min** | Sequential (A → B → C) |

### Critical Path Dependencies

1. Phase A must precede Phase B — semantic token names used in Phase B class replacements are defined in Phase A
2. Font choice decision: Canela (self-hosted, license required) vs. DM Serif Display (Google Fonts, free) — executor makes final call at Phase A; either works technically
3. Domain acquisition is a user action that may extend the Phase A metadataBase change — all other Phase A changes can proceed immediately
4. Phase C illustration work requires human review checkpoints — build these into Phase C implementation plans

---

## Risks and Mitigations

### Risk 1: Canela Not Available on Google Fonts

**Risk:** Canela is a commercial font and cannot be loaded via `next/font/google`. If the implementation tries to import it as a Google Font, the build will fail.

**Mitigation:** Use DM Serif Display as the recommended free substitute, or Fraunces, or Playfair Display. Self-hosting Canela requires a Commercial Type license — check with project owner before Phase A execution.

**Rollback:** If display font causes issues, `--font-display` fallback (system serif) is always available; or revert to `Cormorant_Garamond` temporarily.

---

### Risk 2: oklch Conversion Inaccuracy

**Risk:** oklch approximations in this document may not be perceptually accurate for the specified hex values, producing colors that differ from the brief spec.

**Mitigation:** Verify each hex → oklch conversion at oklch.com before writing to `globals.css`. Visually verify each color in the browser before committing Phase A.

**Rollback:** Single-file revert of `globals.css` restores all colors globally.

---

### Risk 3: Deep Teal WCAG Contrast

**Risk:** Deep Teal `#0D3D3A` on Cloud White `#F5F4F2` backgrounds, and Merlot `#6B1E2E` on Cloud White, may not meet WCAG AA contrast ratio (4.5:1 for body text, 3:1 for large text) in all usage contexts.

**Mitigation:** Before committing Phase B, check contrast ratios at webaim.org/resources/contrastchecker:
- Deep Teal `#0D3D3A` on Cloud White `#F5F4F2` — should pass (dark teal on near-white)
- Merlot `#6B1E2E` on Cloud White — verify: dark maroon, should pass AA
- Burnished Amber `#C4892A` on Cloud White — may fail AA for small text (medium contrast ratio); use for decorative elements and large text only, not body copy

**Rollback:** Any failing contrast combination can be adjusted independently per component.

---

### Risk 4: Hardcoded Class Coverage Gaps

**Risk:** New component files added after this plan was written may contain amber/stone classes not covered in the matrix.

**Mitigation:** Before Phase B commit, run: `grep -r "amber\|stone-900" components/ --include="*.tsx" -l` to enumerate any uncovered files. The Phase C visual regression scan checklist below covers all interactive surfaces.

**Rollback:** Missed instances are cosmetic visual inconsistencies — they do not break functionality. Each component file is independently correctable.

---

### Risk 5: Illustration Quality

**Risk:** Inline SVG illustrations require creative judgment. An executor can create refined geometric-organic SVG following the brief's direction, but the output may not match the intended emotional register.

**Mitigation:** Phase C implementation plans must include human-verify checkpoints after hero illustration and after archetype icon set. The user reviews each before the next is committed.

**Rollback:** Each illustration is independently replaceable. SVG inline edits are low-risk code changes with no functional side effects.

---

### Risk 6: Partial Rebrand Visual State

**Risk:** If the rebrand is interrupted mid-Phase B, the product will show a mixed palette — some components teal/merlot, others amber — which is visually inconsistent.

**Mitigation:** Phase boundaries are designed to be stable mid-states. Phase A alone produces a globally consistent semantic token update. Phase B is organized by component group (landing → quiz → result) — each group is internally consistent after its plan completes. Document current phase in STATE.md during implementation.

---

## Visual Regression Scan Checklist

Before committing any Phase B or C changes, visually verify:

- [ ] Landing page hero section (desktop + mobile)
- [ ] Hero CTA button (default, hover, focus)
- [ ] Archetype showcase grid (card default, hover)
- [ ] Secondary Hero dark section (Deep Teal background — check text contrast)
- [ ] Quiz option cards (default, selected, hover, focus-visible ring)
- [ ] Quiz progress bar (Deep Teal fill)
- [ ] Email capture screen (within quiz flow)
- [ ] Processing screen (Burnished Amber dots)
- [ ] Result page — archetype reveal (Merlot divider)
- [ ] Result page — foundational patterns (Merlot left border)
- [ ] Result page — watchouts section
- [ ] Result page — cultural section
- [ ] Blueprint CTA (Burnished Amber badge + CTA)
- [ ] Email gate overlay (Cloud White background)
- [ ] Sticky blueprint bar (Deep Teal + Burnished Amber)
- [ ] Blueprint email form
- [ ] WCAG contrast: Deep Teal on Cloud White
- [ ] WCAG contrast: Merlot on Cloud White
- [ ] WCAG contrast: Burnished Amber on Cloud White (large text only)
- [ ] WCAG contrast: Cloud White text on Deep Teal backgrounds

---

## Summary of Design Decisions This Plan Inherits

| Decision | Source | Implementation Impact |
|----------|--------|----------------------|
| Deep Teal `#0D3D3A` replaces amber as primary brand color | 06-04-NEW-A | All `stone-900` dark sections → Deep Teal; dark CTAs → Deep Teal |
| Merlot `#6B1E2E` as revelation/Mirror accent | 06-04-NEW-C | All Mirror-context CTAs, archetype reveal, emotional em tags → Merlot |
| Burnished Amber `#C4892A` as Blueprint/research accent | 06-04-G (retained) | All Blueprint-context CTAs, badges, research dividers → Burnished Amber |
| Cloud White `#F5F4F2` replaces amber-50 as background | 06-04-NEW-B | All `bg-amber-50` page/section backgrounds → Cloud White |
| Cormorant Garamond OUT — Canela/DM Serif Display IN | 06-04-NEW-D | Single font import change in layout.tsx; all components using font-display update automatically |
| Illustration: refined craft, NOT School of Life | 06-04-NEW-F | MirrorIllustration.tsx and ArchetypeIcons.tsx redesign to geometric-organic or minimal figurative register |
| Layout: bento-grid + glassmorphism + typographic heroes | 06-04-NEW-G | Phase B color changes are prerequisite; layout rebuild is a separate Phase D |
| Brand name: Raising Giants → Kin | 06-03-KIN | Metadata strings + component copy strings; domain acquisition is user action |
| Product names: The Mirror, The Blueprint (keep) | 06-03-NEW-D | No product name changes; only brand name changes |
| Brand naming convention: "The [Product] by Kin" | 06-03-ARCH | Eyebrow labels updated to this pattern: "The Mirror by Kin" |

---

*Document: 04-05-rebrand-execution-plan.md*
*Phase: 04-brand-positioning-research-and-visual-direction*
*Created: 2026-02-27*
*Updated: 2026-02-27 (v2 — rewritten for Kin brand, 2026 visual direction: Deep Teal / Merlot / Burnished Amber / Cloud White / Canela / bento-grid)*
*Status: Complete — maps all visual direction recommendations (v3 brief) to specific files, tokens, and components; scopes implementation into Phases A/B/C; addresses Kin name change technical requirements; supersedes v1 (terracotta/Imprint direction)*
