# Rebrand Execution Plan
## Phase 06-05 — From Visual Direction to Developer-Ready Change List

**Date:** 2026-02-27
**Status:** Complete
**Inputs:** 06-04-visual-direction-brief.md (what to change), 06-03-positioning-narrative.md (why), codebase analysis (how)
**Purpose:** Bridge strategy and implementation — every visual direction recommendation mapped to a specific file, token, or component change. Per 06-RESEARCH.md Pitfall 1: Phase 6 produces the PLAN for rebrand, not the rebrand itself.

---

## Executive Summary

The rebrand translates "grounded self-discovery" positioning into a terracotta-anchored palette, increased use of Cormorant Garamond's italic form, and a shift from abstract geometric illustrations to editorial line illustration with emotional metaphor. The changes are low-to-medium disruption: palette and typography changes are single-file, globally propagating updates; illustration and brand name changes are the highest-effort, highest-impact work. Implementation is scoped into three phases — Foundation (palette + type metadata, ~2 plans), Components (landing page copy and UI color classes, ~3-4 plans), and Assets (new illustration system + brand identity, ~4-6 plans) — to allow incremental rollout with clear rollback points at each phase boundary.

---

## Change Scope Matrix

| Visual Direction | File(s) | Specific Change | Effort |
|-----------------|---------|-----------------|--------|
| **Palette — primary background** | `/app/globals.css` | Replace `--background: oklch(1 0 0)` with bone `#F7F2EB` (oklch equivalent: `oklch(0.967 0.009 75)`) | Low |
| **Palette — primary text** | `/app/globals.css` | Replace `--foreground: oklch(0.145 0 0)` with warm charcoal `#1C1512` (oklch: `oklch(0.155 0.008 55)`) | Low |
| **Palette — primary accent (terracotta)** | `/app/globals.css` | Replace `--primary: oklch(0.205 0 0)` with terracotta `#B05A3A` (oklch: `oklch(0.505 0.115 40)`) and `--primary-foreground` with bone `#F7F2EB` | Medium |
| **Palette — secondary accent (aged gold)** | `/app/globals.css` | Replace `--accent: oklch(0.97 0 0)` with aged gold `#C4892A` (oklch: `oklch(0.635 0.115 70)`) for accent use; add custom `--color-aged-gold: oklch(0.635 0.115 70)` | Medium |
| **Palette — dark section background** | `/app/globals.css` | Add `--color-deep-dusk: oklch(0.148 0.008 55)` (hex `#1E1814`) as new custom property for dark sections | Low |
| **Palette — card surface** | `/app/globals.css` | Replace `--card: oklch(1 0 0)` with soft clay `#EBE0D5` (oklch: `oklch(0.907 0.012 70)`) | Low |
| **Palette — muted background** | `/app/globals.css` | Replace `--muted: oklch(0.97 0 0)` to align with soft clay; update `--secondary: oklch(0.97 0 0)` accordingly | Low |
| **Display font (Cormorant italic use)** | `/app/layout.tsx` | Font import stays identical (`Cormorant_Garamond` with `style: ["normal", "italic"]`). No code change needed. Application change: increase italic `<em>` usage in all headline components | Keep/Low |
| **Body font (optional DM Sans for result)** | `/app/layout.tsx` | If result-page reading fatigue validates: add `DM_Sans({ variable: "--font-body-long", subsets: ["latin"] })` alongside Geist. Apply `--font-body-long` to `.result-content` scope only | Low (optional) |
| **Metadata — brand name** | `/app/layout.tsx` | Replace `title: "Raising Giants — The Mirror"` with `"Imprint — The Mirror"` across `title`, `openGraph.title`, `openGraph.siteName`, `twitter.title`; update `metadataBase` URL when domain is ready | Medium |
| **Metadata — description** | `/app/layout.tsx` | Remove "Understand the parenting you received" (advice-framing) — rewrite in permission-first voice (example: "You've always sensed that how you were raised shaped who you are. The Mirror gives you the language.") | Low |
| **Hero illustration concept** | `/components/landing/illustrations/MirrorIllustration.tsx` | Component currently wraps `/images/illustrations/hero-mirror.png`. The PNG image needs to be replaced with editorial line illustration: a figure looking at a reflective surface that shows a past scene, not a face. SVG implementation recommended over PNG (inline, responsive, colorable). Component wrapper stays identical. | High |
| **Archetype icons illustration style** | `/components/landing/illustrations/ArchetypeIcons.tsx` | 9 PNG icons referenced via `/images/illustrations/[archetype-slug].png`. All 9 need redesign in editorial line illustration style (charcoal on bone, terracotta accent, emotional metaphor for each archetype's core pattern). PNG or inline SVG — PNG file replacement is lower effort. | High |
| **KOL portrait sketches** | `/components/landing/KOLCredibility.tsx` (or equivalent) | 8 researcher portrait SVGs. Current style: abstract sketch portraits. Direction: keep hand-drawn editorial quality, add aged-gold accent for researcher names, ensure charcoal-on-bone tonality | Medium |
| **Hero section — background and colors** | `/components/landing/HeroWithIllustration.tsx` | Replace `bg-amber-50` with bone custom property; replace amber decorative circle (`bg-amber-100`) with soft-clay equivalent; replace amber glow behind illustration with terracotta-tinted equivalent; update eyebrow label from `text-amber-700` to terracotta token; update `<em>` accent from `text-amber-600` to terracotta token | Medium |
| **Hero section — headline sizing** | `/components/landing/HeroWithIllustration.tsx` | Increase hero headline: `text-5xl sm:text-6xl lg:text-7xl` → `text-6xl sm:text-7xl lg:text-8xl`. Cormorant should fill more of the viewport above the fold. | Low |
| **Hero section — whitespace** | `/components/landing/HeroWithIllustration.tsx` | Increase section padding: `py-20 lg:py-32` → `py-24 lg:py-40` (minimum 120px on desktop per brief spec) | Low |
| **Hero section — CTA button** | `/components/landing/HeroWithIllustration.tsx` | Replace `bg-stone-900` CTA button with terracotta `bg-[#B05A3A]` (or `bg-primary` once token is updated); text from `text-amber-50` to bone token; update border styling | Medium |
| **Hero section — copy** | `/components/landing/HeroWithIllustration.tsx` | Rewrite eyebrow from "Raising Giants — The Mirror" to "Imprint — The Mirror" (or interim: just "The Mirror"); rewrite subheadline "See the patterns you inherited — in 5 minutes" in permission-first voice (drop the "5 minutes" urgency framing) | Medium |
| **Archetype showcase — background** | `/components/landing/ArchetypeShowcase.tsx` | Replace `bg-white` section with bone/soft-clay; replace `bg-stone-50 border-stone-200` card with soft-clay card + terracotta hover state (replace `hover:border-amber-300 hover:from-amber-50/60` with terracotta border/soft-clay gradient) | Medium |
| **Archetype showcase — eyebrow** | `/components/landing/ArchetypeShowcase.tsx` | Replace `text-amber-700` eyebrow with terracotta token | Low |
| **Archetype showcase — CTA button** | `/components/landing/ArchetypeShowcase.tsx` | Replace `bg-stone-900` with terracotta `bg-primary`; replace `text-amber-50` with bone token | Low |
| **Secondary hero section — colors** | `/components/landing/SecondaryHero.tsx` | Replace `bg-stone-900` with `bg-[#1E1814]` (deep dusk — warmer, more on-brand than Tailwind stone-900); replace amber glow `bg-amber-900/30` with terracotta-toned equivalent; replace eyebrow `text-amber-400` with aged gold token; replace `<em>` `text-amber-300/90` with aged gold; replace CTA `bg-amber-500` with terracotta; replace editorial end-mark amber colors with terracotta/aged-gold | Medium |
| **Quiz UI — color classes** | `/components/quiz/*.tsx` | All amber color classes in quiz components (OptionCard, QuizCard, QuizProgress, QuizShell) → replace with terracotta accent tokens; `bg-stone-900` buttons → terracotta | Medium |
| **Result page — color classes** | `/components/result/*.tsx` | All amber color classes in result components (ArchetypeReveal, BlueprintCTA, FoundationalPatternsSection, etc.) → replace with terracotta (primary) and aged gold (insight moments — archetype names, researcher names); result page body text area → consider DM Sans if Geist fatigue is an issue | Medium |
| **Brand name — string references in components** | All files containing "Raising Giants" | Replace all display references to "Raising Giants" with "Imprint" in component copy; preserve as comments where relevant for context | Medium |
| **Brand assets — OG image** | `/public/og-image.png` | New OG image (1200×630) reflecting Imprint brand identity: bone background, Cormorant Garamond headline, terracotta accent element, editorial style | Medium |
| **Brand assets — favicon** | `/public/favicon.ico` (or `/app/favicon.ico`) | New favicon reflecting Imprint brand mark | Medium |

---

## Implementation Constraints (from 06-RESEARCH.md)

### Tailwind v4 Token System

All color changes propagate through `/app/globals.css` via the `@theme inline` block. The shadcn design tokens (`--background`, `--foreground`, `--primary`, `--card`, `--muted`, `--accent`, etc.) map directly to Tailwind CSS classes (`bg-background`, `text-foreground`, `bg-primary`, etc.). A palette change is a **single-file update** that propagates everywhere — Tailwind classes used throughout the codebase do not need to change as long as they use the semantic token names.

**Critical constraint:** The current codebase uses Tailwind-specific color classes (e.g., `bg-amber-50`, `text-amber-700`, `bg-stone-900`) directly in component files, not just through semantic tokens. This means the token update in `globals.css` is insufficient alone — component-level color class replacements are also required. The matrix above identifies each instance.

**Strategy:** Phase A updates the semantic tokens (globals.css) for components that use `bg-background`, `bg-primary`, etc. Phase B manually replaces hardcoded Tailwind color classes (bg-amber-*, text-amber-*, bg-stone-900 in component files).

### oklch Color Format

The current `globals.css` uses `oklch()` notation for all color values. The new hex values from the visual direction brief must be converted to oklch equivalents:

| Hex | Color Name | oklch Equivalent |
|-----|-----------|-----------------|
| `#F7F2EB` | Bone | `oklch(0.967 0.009 75)` |
| `#1C1512` | Charcoal | `oklch(0.155 0.008 55)` |
| `#B05A3A` | Terracotta | `oklch(0.505 0.115 40)` |
| `#C4892A` | Aged Gold | `oklch(0.635 0.115 70)` |
| `#1E1814` | Deep Dusk | `oklch(0.148 0.008 55)` |
| `#EBE0D5` | Soft Clay | `oklch(0.907 0.012 70)` |
| `#7A6E65` | Stone Mid | `oklch(0.490 0.012 60)` |
| `#B8AFA6` | Stone Light | `oklch(0.735 0.010 60)` |

**Verification note:** These oklch values are approximations. The implementing executor should verify each value with a hex-to-oklch converter (e.g., oklch.com) and adjust chroma/hue to achieve perceptual accuracy.

### Font System

The `next/font/google` pattern is established and working. `Cormorant_Garamond` is loaded with both `normal` and `italic` styles — the italic form is already loaded and available. No font import changes are required for the primary typography upgrade. The italic emphasis increase is purely a component-level change (using `<em>` or `italic` Tailwind class in the right places).

If DM Sans is added for result long-form: add `DM_Sans({ variable: "--font-body-long", subsets: ["latin"], weight: ["400", "500"] })` to the import, add the variable to `<body>` className, and define `--font-body-long: var(--font-dm-sans)` in `@theme inline`.

### Biome Linting

All component changes must pass Biome linting. No configuration changes needed — the rebrand is a style/color/copy change, not a code pattern change. Key Biome rules to remember during implementation: no unused imports, no `<img>` tags (use Next.js Image), no array index keys.

### No New Dependencies

The full rebrand can be executed within the existing stack: Tailwind v4, shadcn, next/font/google, Next.js Image. No additional packages required.

---

## Phased Implementation Scope

### Phase A: Foundation (Low Risk — ~2 implementation plans)

**What changes:** Token-level and metadata changes that propagate globally with minimal component-level work.

**Scope:**
1. **Palette tokens in `/app/globals.css`:**
   - Update `:root` semantic tokens to bone/charcoal/terracotta/aged-gold/soft-clay/deep-dusk
   - Add custom properties: `--color-deep-dusk`, `--color-bone`, `--color-aged-gold`, `--color-soft-clay` for cases where components need to reference non-semantic values directly
   - Components using `bg-background`, `text-foreground`, `bg-primary`, `bg-card`, `bg-muted` will update automatically

2. **Font application in landing components:**
   - Increase Cormorant italic use: subheadings to italic, pull quotes to italic centered, emotional emphasis in `<em>` tags
   - Increase headline size in HeroWithIllustration: 7xl → 8xl on desktop
   - Add whitespace: section padding increases throughout landing

3. **Metadata update in `/app/layout.tsx`:**
   - Update title, openGraph, twitter, description to Imprint branding and permission-first copy
   - Hold `metadataBase` URL change until domain is confirmed available (see name change checklist below)

**Plans needed:** 2 (one for globals.css + layout.tsx metadata; one for font application and whitespace across landing)

**Risk:** Very low — semantic token changes affect the entire app, but the change is intentional and global. If tokens produce an unexpected visual regression in any component, it is immediately visible and easily reverted by restoring the original `globals.css`.

**Rollback:** `git revert` the globals.css commit restores the entire palette globally.

---

### Phase B: Component-Level (Medium Risk — ~3-4 implementation plans)

**What changes:** Hardcoded Tailwind color classes in component files, quiz UI, and result page.

**Scope:**
1. **Landing page components** — replace all `amber-*` color classes with terracotta/aged-gold/bone equivalents; update dark section (SecondaryHero) from stone-900 to deep-dusk; update CTA buttons to terracotta
2. **Landing page copy** — rewrite eyebrow labels, sub-headlines, and CTA text in permission-first voice; remove urgency framing; apply brand name change to all displayed strings
3. **Quiz UI components** — replace amber accent classes in OptionCard, QuizCard, QuizProgress, QuizShell, EmailCaptureScreen; maintain current layout and flow (quiz UX is tested and working — only colors change)
4. **Result page components** — replace amber accent classes; apply aged-gold to archetype name, researcher names, "now I see it" revelation moments; verify visual hierarchy with new palette

**Plans needed:** 3-4 (landing components + copy; quiz UI; result page)

**Risk:** Medium — component-level class changes are isolated but numerous. The risk is visual regressions in states (hover, focus, active) that may not be immediately caught. Each plan should include a visual scan of all interactive states.

**Rollback:** Each component file has an independent commit. Any component can be individually reverted without affecting others.

---

### Phase C: Asset-Level (Higher Effort — ~4-6 implementation plans)

**What changes:** New illustrations (high effort), new brand identity assets, optional domain migration.

**Scope:**
1. **Hero illustration redesign** — The `MirrorIllustration` component wraps `hero-mirror.png`. The asset needs to be redesigned per the visual brief: a figure at a reflective surface showing the past in the reflection, editorial line illustration style, charcoal on bone with terracotta accent. Implementation options:
   - Option A: Commission/create new PNG illustration — drop-in replacement for `hero-mirror.png`, zero component code changes
   - Option B: Convert to inline SVG — replace the `<Image>` component with an inline `<svg>` for better responsiveness, color theming, and accessibility; moderate component complexity

2. **Archetype icon redesign** — 9 PNG files (`/images/illustrations/[archetype-slug].png`) need redesign. Each icon should be an editorial line illustration encoding the archetype's core emotional pattern (not abstract geometry). Same option A/B tradeoff as hero illustration.

3. **KOL portrait refinement** — 8 researcher portrait sketches. If already in editorial line style, update color usage to charcoal/bone/aged-gold. If in abstract geometric style, redesign to match the illustration system.

4. **New brand assets:**
   - `og-image.png` (1200×630): Imprint branding, bone background, Cormorant Garamond headline, terracotta accent
   - `favicon.ico` / `apple-touch-icon.png`: Imprint brand mark (letterform or minimal mark)
   - Any `/public/logo.*` files if they exist

5. **Domain migration (if name change confirmed):** See brand name technical checklist below.

**Plans needed:** 4-6 (hero + KOL illustrations; archetype icons ×9; brand assets; domain migration)

**Risk:** Higher — illustration creation is creative/qualitative work. The execution plans for illustration work should include a checkpoint for user review before committing (the illustration visual direction is specified but the actual art requires human judgment on execution quality).

**Rollback:** Each illustration file is independently replaceable. The migration plan can be executed in stages with review after each set of illustrations.

---

## Brand Name Change — Technical Checklist

Per 06-03-A decision: name change from "Raising Giants" → "Imprint" is recommended. Per 06-RESEARCH.md Pitfall 3, the execution plan must address the technical steps.

### Pre-Implementation (User Actions Required)

- [ ] **Domain availability:** Verify `imprint.com`, `imprint.co`, `theimprint.com`, `imprint.app` availability. The ideal domain may not be available — a subdomain or alternative TLD may be required. **Action required before Phase A metadata changes become permanent.**
- [ ] **Domain acquisition:** Purchase preferred domain if available. Estimated cost: $10-$1,000+/year depending on TLD and whether domain is registered by a third party.
- [ ] **Social media handles:** Check `@getimprint`, `@imprint`, `@imprintapp` availability across Instagram, X/Twitter, TikTok. **Action required in parallel with domain check.**

### Implementation Steps (executor actions)

**Phase A (immediately implementable, no domain needed):**
- [ ] Update `title`, `openGraph.title`, `openGraph.siteName`, `twitter.title` in `/app/layout.tsx`
- [ ] Update `description` text in all three metadata locations (title, openGraph, twitter)
- [ ] Leave `metadataBase: new URL("https://raisinggiants.com")` unchanged until domain is confirmed

**Phase B (after domain confirmed):**
- [ ] Update `metadataBase` to new domain URL
- [ ] Verify all `alternates.canonical` values point to correct domain

**Phase C (after domain is live and DNS configured):**
- [ ] Configure 301 redirects from `raisinggiants.com` to new domain (Vercel → Settings → Domains → Add domain, then set old domain to redirect)
- [ ] Supabase project naming: cosmetic change only (Supabase project slug does not affect production URLs if custom domains are used). Update project display name in Supabase dashboard.
- [ ] Update any Vercel environment variables that contain the old domain string

### String References in Codebase

All instances of "Raising Giants" in component copy (not code identifiers) must be updated:

| Location | Current String | Replacement |
|----------|---------------|-------------|
| `HeroWithIllustration.tsx` line 29 | "Raising Giants — The Mirror" (eyebrow) | "Imprint — The Mirror" |
| `app/layout.tsx` line 20 | title "Raising Giants — The Mirror" | "Imprint — The Mirror" |
| `app/layout.tsx` line 24 | OG title "Raising Giants — The Mirror" | "Imprint — The Mirror" |
| `app/layout.tsx` line 28 | siteName "Raising Giants" | "Imprint" |
| `app/layout.tsx` line 34 | twitter title "Raising Giants — The Mirror" | "Imprint — The Mirror" |
| `app/layout.tsx` line 19 | metadataBase URL | Update when domain confirmed |

**Code identifiers** (variable names, type names, database table names) do not need to change — these are internal and do not affect user-facing brand.

### SEO Equity

- The current `raisinggiants.com` domain will have some accumulated SEO equity by launch time. A 301 redirect from the old domain to the new domain preserves approximately 90% of link equity per established SEO practice.
- Google Search Console: add new domain property after DNS is configured; verify 301 redirect is correctly passing equity.
- Sitemap: update `sitemap.xml` (if present) with new domain URL after migration.

---

## Effort Estimate

### Implementation Phase Breakdown

| Phase | Plans Needed | Estimated Claude Time | Dependencies |
|-------|-------------|----------------------|--------------|
| Phase A: Foundation | 2 | ~20 min | 06-04 brief (done); user confirms name change direction |
| Phase B: Component-Level | 3-4 | ~30-40 min | Phase A complete (token names available) |
| Phase C: Assets | 4-6 | ~60-90 min | Phase B complete; illustration art created (may require human creation step) |
| **Total** | **9-12 plans** | **~2-2.5 hours** | Sequential (A → B → C) |

### Critical Path Dependencies

1. Phase A must precede Phase B — component files reference the token names being established in Phase A
2. Illustration creation (Phase C) has a creative dependency that may require a human checkpoint — the executing Claude agent can create SVG illustrations following the brief's direction, but the user should review each before commit
3. Domain acquisition is a user action that may extend the timeline for metadata/domain changes — these can be done independently of illustration work in parallel

### What This Replaces

The current amber-based brand took approximately 2 plans to establish (Phase 04-01, 04-02). The rebrand scope is larger because:
- More components contain hardcoded color classes (quiz, result page components were added post-04)
- Illustration redesign is the most effort-intensive component
- Name change adds a technical migration layer that font/color changes do not

---

## Risks and Mitigations

### Risk 1: oklch Conversion Inaccuracy

**Risk:** The oklch approximations for the hex values may not be perceptually accurate, producing colors that look different from the hex spec.

**Mitigation:** The implementing executor should convert each hex value using a validated hex-to-oklch tool (oklch.com) and visually verify each color in the browser before committing. The oklch values in this document are starting approximations, not authoritative values.

**Rollback:** Single-file revert of `globals.css` restores all colors globally.

---

### Risk 2: Illustration Quality

**Risk:** The illustration redesign is creative work. A Claude executor can create SVG illustrations following the brief's direction, but creative quality is not guaranteed by a spec — the output may not match the "emotional register" described in the brief.

**Mitigation:** Phase C implementation plans should include a human-verify checkpoint after illustration creation — the user reviews each illustration before the next is committed. The hero illustration is the highest stakes; archetype icons have lower per-unit risk.

**Rollback:** Each illustration file is independently replaceable. The PNG images (if that path is chosen) are simple file replacements with no code changes.

---

### Risk 3: Hardcoded Color Class Coverage

**Risk:** The codebase has a mix of semantic tokens (`bg-primary`) and hardcoded Tailwind color classes (`bg-amber-50`). If any hardcoded classes are missed during Phase B, the rebrand will be visually inconsistent.

**Mitigation:** Before Phase B, the implementing executor should run `grep -r "amber" components/` and `grep -r "stone-900" components/` to enumerate all instances. The change scope matrix above covers all instances found at the time of this plan, but new code may be added before the rebrand is implemented.

**Rollback:** Missed instances are cosmetic visual inconsistencies — they do not break functionality. Each component file is independently correctable.

---

### Risk 4: Domain Availability

**Risk:** `imprint.com`, `imprint.co`, and `imprint.app` may all be unavailable or prohibitively expensive.

**Mitigation:** The brand name "Imprint" is the 06-03-A recommendation, but the user retains override authority. If the ideal domain is unavailable, the user may: (a) choose a modified domain (`getimprint.com`, `imprint.ai`, `theimprint.app`), (b) proceed with the name change on a non-ideal TLD, or (c) reverse the name change recommendation and keep "Raising Giants" with revised positioning language. The implementation plans can proceed with all non-domain changes while the domain question is resolved.

---

### Risk 5: Partial Rebrand State

**Risk:** If the rebrand is interrupted mid-Phase (e.g., after Phase A but before Phase B), the product will be in a mixed state — new palette tokens but old hardcoded amber classes — which could produce visual inconsistencies.

**Mitigation:** The phase boundaries are designed to be stable mid-states. Phase A alone (token changes) produces a globally consistent palette update for components using semantic tokens. Phase B separately handles the hardcoded classes. Neither state is broken — they are incremental improvements. Document the current implementation phase in STATE.md during implementation.

---

## Visual Regression Scan Checklist

Before committing any Phase B or C changes, visually verify:

- [ ] Landing page hero section (desktop + mobile)
- [ ] Hero CTA button (default, hover, focus states)
- [ ] Archetype showcase grid (card default, hover states)
- [ ] Secondary Hero dark section (dark background, text contrast)
- [ ] Quiz option cards (default, selected, hover states)
- [ ] Quiz progress bar
- [ ] Email capture screen (within quiz flow)
- [ ] Result page — archetype reveal section
- [ ] Result page — foundational patterns section
- [ ] Result page — watchouts section
- [ ] Result page — cultural section
- [ ] Blueprint CTA / email form
- [ ] Sticky blueprint bar
- [ ] All interactive states pass WCAG AA contrast ratio (4.5:1 for body text, 3:1 for large text) — terracotta on bone must be verified

---

## Summary of Decisions This Plan Inherits

| Decision | Source | Impact on Implementation |
|----------|--------|--------------------------|
| Terracotta replaces amber as primary accent | 06-04-A | All `amber-*` Tailwind classes in components → terracotta tokens |
| Cormorant Garamond: keep, increase italic | 06-04-B | No font import changes; italic application changes in heading components |
| Geist Sans: keep for UI; optional DM Sans for result long-form | 06-04-C | DM Sans addition is optional; implement only if user confirms result fatigue concern |
| Illustration: editorial line, School of Life reference | 06-04-D | Hero PNG redesign + 9 archetype icon redesigns required |
| Layout: +30-50% whitespace, editorial rhythm | 06-04-E | Section padding increases in landing components |
| Brand name: Raising Giants → Imprint | 06-03-A | Metadata + copy string replacements; domain acquisition required |
| Product names: The Mirror, The Blueprint (keep) | 06-03-E/F | No product name changes; only brand name changes |

---

*Document: 06-05-rebrand-execution-plan.md*
*Phase: 06-brand-positioning-research-and-visual-direction*
*Created: 2026-02-27*
*Status: Complete — maps all visual direction recommendations to specific files, tokens, and components; scopes implementation into 3 phases; addresses name change technical requirements*
