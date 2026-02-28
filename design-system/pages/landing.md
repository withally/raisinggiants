# Landing Page Overrides

> **PROJECT:** Kin
> **Generated:** 2026-02-28 (Phase 06, Plan 04)
> **Page Type:** Landing / Marketing

> **IMPORTANT:** Rules in this file **override** the Master file (`design-system/MASTER.md`).
> Only deviations from the Master are documented here. For all other rules, refer to the Master.

---

## Page-Specific Rules

### Layout Overrides

- **Max Width:** 1200px (max-w-6xl) for full sections; max-w-3xl for reading sections (KOLNarrative, FAQ)
- **Hero container:** max-w-6xl px-6 lg:px-16 — asymmetric left-aligned text, vast whitespace right
- **Section alternation:** Cloud White (#F5F4F2) alternates with White (#FFF) for subtle rhythm; Deep Teal for emotional peak sections

### Typography Overrides

**Hero headline scale:**
- Mobile: `text-6xl` (60px)
- Tablet: `text-7xl` (72px)
- Large: `text-[108px]` (108px)
- XL: `text-[140px]` (140px)
- Font: PP Pangaia Ultralight (font-extralight = weight 200)
- Line height: 0.9 to 0.95 (tighter than comfortable — deliberate dramatic compression)

**Section h2 scale:**
- Mobile: `text-4xl` (36px)
- Large: `text-5xl` (48px)
- Font: PP Pangaia Medium (font-semibold = weight 500-600 via display variable)

**Pull quotes (KOLNarrative):**
- Mobile: `text-xl` (20px)
- Large: `text-2xl` (24px)
- Font: PP Pangaia Ultralight Italic — maximum emotional resonance

### Section-by-Section Color Map

| Section | Background | Text Primary | Accent Use |
|---------|-----------|--------------|------------|
| HeroSection | #F5F4F2 + teal gradient blob | #1A1008 | Amber for eyebrow circle |
| SocialProof | #F5F4F2 | #1A1008 | Merlot for quote marks |
| ArchetypePreview | #FFFFFF | #1A1008 | Amber for eyebrow circle |
| KOLCredibility | #F5F4F2 | #1A1008 | Teal for contribution labels |
| KOLNarrative | #F5F4F2 | #1A1008 | Amber for hand-drawn dividers, Teal for vertical line |
| FAQ | #F5F4F2 | #1A1008 | Amber for dividers |
| SecondaryHero | #0D3D3A gradient | #F5F4F2 | Amber for eyebrow + emotional text |
| Footer | #0D3D3A + grain | #F5F4F2/80 | Muted teal for links |

### Scroll-Triggered Animation Settings

- Distance: 24px (gentle, contemplative — not energetic)
- Duration: 800ms (slow, intentional — matches brand emotional pace)
- Easing: `cubic-bezier(0.22, 1, 0.36, 1)` (organic, natural deceleration)
- Delay stagger: 80-150ms between items in grids/lists

---

## Page-Specific Components

### Hero Composition (one bold moment: headline at massive scale)

```
┌─────────────────────────────────────────────────────────────────┐
│  [teal gradient blob — absolute, top right, 600px × 600px]      │
│                                                                   │
│  ◯ Kin — The Mirror (eyebrow, amber circle + small italic)      │
│                                                                   │
│  "Finally, the                                                    │
│   words for it."              [vast empty space — intentional]   │
│   ← 140px PP Pangaia Ultralight, left-aligned                   │
│                                                                   │
│  [subtitle — 18px, muted, max-w-xl]                             │
│                                                                   │
│  [CTA pill] [trust line — muted]                                │
│                                                                   │
│  [supporting copy — 2 short paragraphs, fade-up]                │
│                                                                   │
│  [research badge — border-top, researcher names]                 │
└─────────────────────────────────────────────────────────────────┘
```

Bold moment: The headline at 140px. Type IS the composition. The white space to the right is deliberate — it breathes.

### SocialProof Composition (one bold moment: the counter)

```
2,847 people have already taken The Mirror
← CountUp animation, 36-40px bold display font
```

3-column quote cards below. Hand-drawn quote marks in merlot. Organic border-radius variation per card.

### ArchetypePreview Composition (one bold moment: archetype name cloud)

Nine organic-radius pill tags flowing in a responsive flex-wrap. Sample question card tilted -0.5deg with grain texture and paper-like feel.

### KOLCredibility Composition (one bold moment: asymmetric bento grid)

Featured researchers (Baumrind + Ainsworth) span 2 columns. Others in single columns. Left-aligned header, NOT centered — matches hero's asymmetric logic.

### KOLNarrative Composition (one bold moment: full-width pull quote in italic)

Research quotes at 24px PP Pangaia Ultralight Italic, left-aligned with hand-drawn teal vertical line. Each researcher quote is a beat in the revelation arc.

### FAQ Composition (one bold moment: "Before you begin" headline)

Clean reading column, max-w-2xl. Questions in semibold, answers in muted. Hand-drawn amber dividers between items.

### SecondaryHero Composition (one bold moment: "Now you'll see it." in amber italic)

Deep teal gradient background. Two-line headline: Ultralight + Bold Italic in amber. Maximum contrast, maximum emotional punch. This is the emotional climax section.

### Footer Composition (one bold moment: "Kin" wordmark alone)

Minimal. Three columns: wordmark left, links center, copyright right. Grain texture. Deep teal background. This is the exhale after SecondaryHero.

---

## Recommendations

- Effects: Grain texture on hero + teal sections. Natural easing. Breathing animation on teal blob.
- CTA Placement: Above fold (hero) + Mid-scroll (ArchetypePreview) + Peak emotion (KOLNarrative) + Climax (SecondaryHero)
- Mobile: Stack all horizontal layouts. Maintain headline scale proportionally. Keep grain and hand-drawn elements.
