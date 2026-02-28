# Design System — Kin (Master)

> **RECOMMENDED DESIGN SYSTEM** — Synthesized from ui-ux-pro-max skill exploration + 2026 trend research.
> All visual choices were derived from multiple skill searches, not inherited from prior phase decisions.
> For page-specific overrides, see `design-system/pages/landing.md`.

---

**Project:** Kin
**Brand territory:** "digital tools for parents who want to understand themselves"
**Emotional core:** "I always sensed this. Now I see it."
**Generated:** 2026-02-28 (Phase 06, Plan 04)
**Trend formula:** #5 Neo-Minimalism + #6 Emotion-Led, seasoned with #9 Raw Authenticity

---

## DECISION LOG — How This Design System Was Chosen

### Searches Performed

**Design System Generations (3 attempts):**

1. `"editorial neo-minimalism emotion-led humanist premium warm book-like craft organic"` → Style: Liquid Glass (glass morphism) — REJECTED (performance poor, wrong register for trust/warmth)
2. `"parenting self-understanding revelation intimate warm premium digital wellness"` → Style: Liquid Glass with indigo/violet palette — REJECTED (wrong color register, too clinical/digital-SaaS)
3. `"brutalist whisper raw authenticity hand-drawn organic imperfection intentional craft"` → Style: Organic Biophilic + Space Mono typography — PARTIALLY USEFUL (Organic Biophilic resonates; Space Mono typography wrong register for emotion-led)

**Typography Explorations (3 searches, 15 results evaluated):**

4. `"warm humanist editorial"` → top results: Newsreader/Roboto (editorial journalism), **Cormorant Garamond/Libre Baskerville** (all-serif editorial — HIGH RELEVANCE), Playfair Display/Inter
5. `"organic emotional intimate premium"` → Lora/Raleway (wellness calm — good resonance), Bodoni Moda/Jost (luxury minimalist), Cormorant/Montserrat (luxury serif — NOTED)
6. `"neo-minimalism bold statement"` → Bebas Neue (all-caps, too aggressive), Lexend Mega (neubrutalist), Anton (Gen Z — wrong register) — ALL REJECTED

**Color Explorations (2 searches):**

7. `"wellness parenting premium"` → Luxury/Premium: #1C1917 (near-black) + #CA8A04 (gold) — RESONANT. Mental Health: lavender/violet — REJECTED. Consulting: navy/gold — PARTIALLY RELEVANT.
8. `"warm organic editorial"` style domain → **Nature Distilled: terracotta/sand beige** (closest to Kin territory), Editorial Grid (high contrast, magazine layout), Vintage Analog (film grain — partial resonance with #9 Raw Authenticity)

**Style Explorations (2 searches, 10 results):**

9. `"exaggerated minimalism editorial craft"` → **Exaggerated Minimalism** (oversized type, extreme negative space — CORE RECOMMENDATION for #5), **Editorial Grid/Magazine** (asymmetric, pull quotes — USEFUL for composition), Anti-Polish/Raw (hand-drawn, scanned textures — USEFUL for #9)
10. `"organic texture warm humanist"` → Nature Distilled (terracotta, warm clay, grain — HIGH ALIGNMENT)

**Landing Page Patterns (1 search):**

11. `"emotional editorial hero narrative"` → **Scroll-Triggered Storytelling** (narrative arc, chapter-by-chapter, builds intensity — DIRECTLY APPLICABLE to Kin's revelation arc)

### Final Persist

Keyword combination: `"editorial neo-minimalism warm organic craft humanist premium wellness"` — persisted as `design-system/kin/MASTER.md` and `design-system/kin/pages/landing.md`.

### What Each Search Recommended (Summary)

| Search Focus | Best Recommendation | Adopted? |
|---|---|---|
| Design system #1 (trend keywords) | Liquid Glass style | NO — wrong register |
| Design system #2 (brand territory) | Indigo/violet digital palette | NO — wrong color |
| Design system #3 (raw authenticity) | Organic Biophilic + Space Mono | PARTIAL — Organic Biophilic YES, Space Mono NO |
| Typography: warm humanist | Cormorant Garamond (editorial) | YES — confirms PP Pangaia decision |
| Typography: organic intimate | Lora/Raleway (wellness), Bodoni Moda | Lora NOTED as fallback |
| Typography: neo-minimalism bold | Bebas Neue, Lexend Mega, Anton | ALL REJECTED — wrong emotional register |
| Color: wellness premium | Luxury dark + gold accent | CONFIRMS existing Kin palette direction |
| Style: warm organic | Nature Distilled (terracotta, grain) | CONFIRMS terrain of existing palette |
| Style: editorial craft | Exaggerated Minimalism (#5 confirmation) | YES — primary structural framework |
| Landing pattern | Scroll-Triggered Storytelling | YES — narrative arc structure |

### Typography Decision

**PP Pangaia: KEEP.** This conclusion comes from comparison, not inheritance.

Evaluation against all 15 typography search results:

- Cormorant Garamond: excellent editorial serif — but too bookish/print-oriented. Best used as a companion/accent, not primary display.
- Newsreader: journalism editorial — too neutral for emotional product.
- Bodoni Moda: luxury minimalist — high contrast but cold. Wrong emotional register.
- Amatic SC: craft/indie — too casual, undermines clinical credibility.
- PP Pangaia (self-hosted): geometric-humanist display. Large x-height. Extreme weight range (Ultralight 200 → Bold 700). Warmth without casualness. The Ultralight at 120-140px IS the Neo-Minimalism moment — type becomes composition.

**Verdict:** PP Pangaia Ultralight at hero scale embodies Trend #5 (type IS the design). PP Pangaia italic embodies Trend #6 (warmth, character). No evaluated Google Font achieves both simultaneously. PP Pangaia stays.

**Body font:** Geist Sans (already loaded) — clean, geometric, readable. Neutral enough to not compete with display. Confirmed.

### Color Decision

**Existing Kin palette: VALIDATED AND KEPT. Colors rebalanced for bolder application.**

The skill's color recommendations (luxury dark + gold accent; terracotta/warm earth tones) confirm rather than contradict the existing Kin palette:

- Deep Teal (#0D3D3A): "oceanic depth + clinical precision + 2026 premium digital" — maps to the luxury/premium dark tone recommended
- Cloud White (#F5F4F2): maps to the warm cream background, aligned with Pantone 2026 (Cloud Dancer)
- Burnished Amber (#C4892A): maps directly to the craft gold accent recommended
- Merlot (#6B1E2E): strong emotional accent, used selectively
- Warm Sand (#C8B89A): body/muted text warmth

**Color rebalancing (new direction vs. prior implementation):**
- Teal as dominant: more confident application of deep teal (not just for CTAs — also large typographic blocks, section backgrounds)
- Amber used MORE intentionally: for emotional moments, hand-drawn elements, italics in display headlines — not scattered
- Gradient depth: teal-to-darker-teal layering within sections (Trend #7 reinterpreted)
- Merlot: used at emotional peaks only — never decorative

### Style Decision

**Formula confirmed: #5 Neo-Minimalism + #6 Emotion-Led + #9 Raw Authenticity (texture layer)**

From skill explorations:
- Exaggerated Minimalism style: "oversized typography (clamp 3rem-12rem), extreme negative space, single accent color only" — THIS is the frame
- Nature Distilled: "subtle parallax, natural easing (ease-out), texture overlays, grain effects, soft shadows" — THIS is the texture
- Anti-Polish/Raw: "hand-drawn elements, paper texture overlays, sketch reveal" — these are the craft micro-details
- Editorial Grid/Magazine: "asymmetric grid, pull quotes, column layout, reveal on scroll" — informs composition

### What Was Rejected and Why

- **Liquid Glass / Glassmorphism**: wrong register for psychological trust product. Feels premium-SaaS not warm-human.
- **Space Mono / monospace fonts**: brutalist typography register wrong. Undermines clinical credibility and warmth simultaneously.
- **Indigo/violet palette**: therapy/mental health cliché. Kin is NOT a therapy or mental health app.
- **Full Anti-Polish/Raw**: scanned textures, collage, VHS effects — too artsy, would undermine trust for a parenting science product.
- **Cormorant Garamond as primary**: too print-bookish for a web product. Better as secondary/italic emphasis than primary display.
- **Bold statement fonts (Bebas, Anton, Lexend Mega)**: all-caps or excessive weight — wrong emotional register for intimate, revelatory brand.

---

## Global Design Rules (Synthesized)

### Color Palette

| Role | Hex | CSS Variable | Usage |
|------|-----|--------------|-------|
| Primary | `#0D3D3A` | `--color-deep-teal` | Dominant background, CTA buttons, typographic blocks |
| Accent | `#C4892A` | `--color-burnished-amber` | Emotional emphasis, hand-drawn elements, italic accents |
| Emotional | `#6B1E2E` | `--color-merlot` | Peak emotional moments only, not decorative |
| Background | `#F5F4F2` | `--color-cloud-white` | Primary page background, light sections |
| Text | `#1A1008` | `--color-espresso` | All body text on light backgrounds |
| Muted text | `#8A7A66` | `--color-warm-sand-text` | Secondary copy, captions, meta |
| Border | `#E8E4DF` | `--color-border` | Dividers, card borders |

**Deep Teal Gradient (Trend #7 reinterpreted):**
- Section backgrounds: `linear-gradient(180deg, #0D3D3A 0%, #092D2B 50%, #0D3D3A 100%)`
- Card depth on teal: `rgba(255,255,255,0.06)` to `rgba(255,255,255,0.10)` range

### Typography

**Display:** PP Pangaia (self-hosted, already loaded)
- Ultralight (200): hero headlines, massive typographic moments
- Ultralight Italic (200i): emotional emphasis, taglines, pull-quote italics
- Medium (500): section headings, card titles
- Medium Italic (500i): blockquote attribution, captions
- Bold (700): CTA labels, section labels when display weight needed
- **Scale hero:** `clamp(72px, 10vw, 140px)` — type IS the composition
- **Scale h2:** `clamp(36px, 5vw, 56px)` — still large, still commanding

**Body:** Geist Sans (already loaded)
- Regular (400): body copy, FAQ answers, testimonials
- Medium (500): navigation, labels, emphasis within body
- Semibold (600): CTA text, card headings
- **Scale body:** 16px minimum (18px preferred for long-form)
- **Scale small:** 13-14px for metadata, attribution, timestamps

**Type hierarchy principle:** Giant display serif at hero. Clean sans at body. Never compete.

### Texture / Grain

- CSS `feTurbulence` grain at 3.5% opacity: already implemented in `.grain` class
- Use grain on: hero section, deep teal sections, sample card
- NOT on: plain white/cream sections (grain is selective, not blanket)

### Animation

- **Easing:** `--ease-organic: cubic-bezier(0.22, 1, 0.36, 1)` — already implemented
- **Duration:** 800ms for reveal animations, 200ms for hover, 6s for breathe
- **Scroll reveals:** `distance: 24px`, `threshold: 0.1` — already implemented
- **Breathing:** 6s organic pulse for decorative gradients — already implemented

### Spatial Composition

- **Whitespace:** py-28 lg:py-40 for hero, py-24 lg:py-32 for sections
- **One bold moment per section:** every section has ONE typographic or visual element that commands attention
- **Asymmetry:** left-aligned hero (not centered) — deliberate typographic asymmetry
- **Container:** max-w-6xl for most sections, max-w-3xl for reading sections

### Hand-Drawn Elements (Trend #6 + #9)

These are the visible craft signals that differentiate from AI-polished SaaS:
- `HandDrawnDivider`: wavy SVG line (already implemented)
- `HandDrawnQuoteMark`: organic quote marks for testimonials (already implemented)
- `HandDrawnCircle`: imperfect circle accent for eyebrow labels (already implemented)
- Hand-drawn vertical line in blockquotes (KOLNarrative already uses this)

Craft signals applied consistently — not decorative, functional markers of section boundaries.

### Page Pattern: Scroll-Triggered Storytelling

From landing domain search: narrative builds through chapters. Each section is a beat in the revelation arc:

1. **Hook** (Hero): "Finally, the words for it." — the recognition moment before explanation
2. **Social proof** (SocialProof): other people have had this recognition — you're not alone
3. **The terrain** (ArchetypePreview): what this names — 9 patterns, one of them yours
4. **The authority** (KOLCredibility): why this can be trusted — 60 years of science
5. **The science made human** (KOLNarrative): the researchers speak — revelation through their words
6. **Friction removal** (FAQ): the hesitations named and answered
7. **The commitment moment** (SecondaryHero): "You've always known. Now you'll see it." — emotional peak
8. **The close** (Footer): minimal, brand presence

Emotional intensity: low → medium → high → high → medium → back-to-zero → surge → rest.

---

## Component Specs

### Buttons

```css
/* Primary CTA */
.btn-primary {
  background: #0D3D3A;
  color: #F5F4F2;
  padding: 16px 32px;
  border-radius: 9999px;   /* full pill */
  font-weight: 600;
  font-size: 16px;
  min-height: 52px;
  transition: all 200ms var(--ease-organic);
  cursor: pointer;
}
.btn-primary:hover {
  background: #0F4F4B;
  box-shadow: 0 10px 25px rgba(13,61,58,0.3);
}

/* Emotional CTA (on teal sections) */
.btn-emotional {
  background: #6B1E2E;
  color: #F5F4F2;
  /* same sizing as primary */
}
.btn-emotional:hover {
  background: #8B2A3D;
  box-shadow: 0 10px 25px rgba(107,30,46,0.3);
}
```

### Cards (light background)

```css
.card-light {
  background: rgba(255,255,255,0.80);
  border: 1px solid #E8E4DF;
  border-radius: 16px;
  padding: 20px 24px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.04);
}

/* Researcher card (featured) */
.card-featured {
  /* same as card-light */
  /* lg:col-span-2 for featured researchers */
}
```

### Cards (teal background — glassmorphism)

```css
.card-deep {
  background: rgba(255,255,255,0.08);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255,255,255,0.12);
  border-radius: 16px;
  padding: 20px 24px;
}
```

---

## Anti-Patterns (DO NOT USE)

- Liquid Glass / Glassmorphism on light backgrounds
- Inter, Roboto, Arial, system-ui as display fonts
- Indigo, violet, purple color palette
- All-caps display fonts (Bebas, Anton)
- Uniform section heights and spacing (avoid sameness)
- Centered hero text (use left-aligned)
- Decorative gradients that serve no emotional function
- Hand-drawn elements as mere decoration (they mark section boundaries, emphasis)
- Bold italic text in body copy (italic reserved for display font emotional emphasis)

---

## Pre-Delivery Checklist

- [ ] PP Pangaia Ultralight visible at hero scale (120-140px desktop)
- [ ] One bold typographic or visual moment per section
- [ ] Grain texture on hero and teal sections (not on all sections)
- [ ] Hand-drawn elements present at section boundaries
- [ ] Amber (#C4892A) used for emotional emphasis, not scattered
- [ ] Merlot (#6B1E2E) used at emotional peaks only
- [ ] All CTAs use pill border-radius (rounded-full)
- [ ] Scroll reveals working with organic easing
- [ ] No emoji used as icons
- [ ] Color contrast 4.5:1 minimum on all text
- [ ] prefers-reduced-motion respected
- [ ] Responsive at 375px, 768px, 1024px, 1440px
