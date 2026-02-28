# Kin Landing Page — Visual Direction Brief (v4)

**Phase:** 06, Plan 04
**Date:** 2026-02-28
**Status:** Generated from skill exploration + 2026 trend research. Ready for Plan 06-05 implementation.

---

## Part 1: Design System (From Skill-Generated Exploration)

### 1.1 The Design Formula

**"#5 Neo-Minimalism as the container. #6 Emotion-Led Humanity as the content. #9 Raw Authenticity as the texture."**

This formula was confirmed across 11 ui-ux-pro-max searches. Exaggerated Minimalism emerged as the primary structural style. Nature Distilled (warm earth tones, grain, organic shadows) emerged as the texture layer. Scroll-Triggered Storytelling emerged as the page pattern. All three align with the Kin brand territory and the target feel: "A premium product that clearly had a human behind it — a beautifully designed book that lives on the web."

### 1.2 Palette

The existing Kin palette was validated by skill color searches. Rebalancing (not replacement) is the direction.

| Name | Hex | Role | Emotional Function |
|------|-----|------|--------------------|
| Deep Teal | `#0D3D3A` | Primary — dominant | Oceanic depth. The ground. Authority without coldness. |
| Cloud White | `#F5F4F2` | Background — primary | Warmth. Paper. Breath. Aligns with Pantone 2026 (Cloud Dancer). |
| Espresso | `#1A1008` | Text primary | Presence. Weight. Not harsh black — warm dark. |
| Burnished Amber | `#C4892A` | Accent — emotional emphasis | Craft. Gold. Warmth at a distance. Used sparingly. |
| Merlot | `#6B1E2E` | Emotional peak accent | Revelation. The deepest feeling. Used at emotional climax only. |
| Warm Sand | `#C8B89A` | Secondary / borders | Rest. Transition. Connective tissue between elements. |
| Muted Warm | `#8A7A66` | Body text muted | Body copy, captions, secondary information. |
| Border Edge | `#E8E4DF` | Structural separator | Cards, dividers. Warm, not cool-gray. |

**Gradient applications (Trend #7 reinterpreted within palette):**
- Teal sections: `linear-gradient(180deg, #0D3D3A 0%, #092D2B 50%, #0D3D3A 100%)` — oceanic depth
- Teal decorative blobs: `radial-gradient(circle, rgba(13,61,58,0.08) 0%, transparent 100%)` — atmospheric

**What changed from previous implementation:**
- Amber (#C4892A): previously scattered. Now used ONLY for hand-drawn elements, eyebrow circles, and emotional italic moments in display headlines.
- Merlot (#6B1E2E): previously used for quote marks casually. Now reserved for peak emotional moments (SecondaryHero CTA, climactic pull quotes).
- Teal: previously just for CTAs. Now used more boldly as a compositional background in SecondaryHero.

### 1.3 Typography

**Typography decision came from comparison, not inheritance. PP Pangaia won on merit.**

| Element | Font | Weight | Size | Italic? |
|---------|------|--------|------|---------|
| Hero headline | PP Pangaia | Ultralight (200) | 60px → 140px (clamp) | No |
| Hero tagline / emotional moment | PP Pangaia | Ultralight (200) | 48px → 80px | Yes — italic |
| Section h2 | PP Pangaia | Medium (500) | 36px → 56px | No |
| Pull quotes (KOLNarrative) | PP Pangaia | Ultralight (200) | 20px → 24px | Yes — italic |
| Researcher names in cards | PP Pangaia | Medium (500) | 16px | No |
| CTA button labels | Geist Sans | Semibold (600) | 16px | No |
| Body copy | Geist Sans | Regular (400) | 16-18px | No |
| Captions / attribution | Geist Sans | Regular (400) | 12-14px | No |
| Eyebrow labels | Geist Sans | Medium (500) | 11px, tracking 0.25em | No |

**Why PP Pangaia beats evaluated alternatives:**
- Cormorant Garamond: bookish, print-oriented, too cold for emotional product
- Newsreader: journalism register, too neutral
- Bodoni Moda: high contrast but cold, luxury register not warm-intimate
- Lora: wellness correct but lacks weight range for Neo-Minimalism dramatic moments
- PP Pangaia: geometric-humanist, Ultralight at scale IS the composition (#5), italic IS the warmth (#6)

**The typographic rule:** At hero scale, PP Pangaia Ultralight is NOT a font choice — it IS the design. The words occupy space like physical objects. This is how Neo-Minimalism works: you remove decoration and let type carry the entire visual weight of the composition.

### 1.4 Style + Effects

| Element | Spec | Purpose |
|---------|------|---------|
| Grain texture | CSS `feTurbulence` at 3.5% opacity | Tactile, warm — "someone made this" |
| Grain application | Hero + teal sections ONLY | Not blanket — selective, deliberate |
| Organic easing | `cubic-bezier(0.22, 1, 0.36, 1)` | Contemplative, not energetic |
| Reveal animations | 800ms, 24px distance, organic easing | Slow, intentional — matches brand pace |
| Breathing animation | 6s, scale 1→1.03, opacity 0.6→0.8 | Decorative teal blob — alive |
| Border radius | Mostly `rounded-2xl` (16px), full pill for CTAs | Warm, not sharp |
| Archetype pill radius | Deterministic irregular (per index) | Organic variety — hand-crafted feel |
| Sample card rotation | `rotate(-0.5deg)` | Subtle tilt — paper on a desk |

**Hand-drawn elements (visible craft signals — Trend #6 + #9):**

These are not decoration. They are functional markers of human presence:
- `HandDrawnDivider`: wavy SVG line at section boundaries, in amber (0.3 opacity)
- `HandDrawnQuoteMark`: organic quote marks on testimonials, in merlot (0.4 opacity)
- `HandDrawnCircle`: imperfect circle accent for eyebrow labels, in amber (0.6 opacity)
- Vertical organic line in blockquotes: teal SVG path, hand-drawn feel

**What makes this NOT generic AI-polished SaaS:**
1. PP Pangaia Ultralight at 140px — not a "safe" sans-serif choice
2. The grain texture — not a clean, flat background
3. Hand-drawn SVG details — not geometric icon sets
4. Organic border-radius variation — not uniform `rounded-lg` everywhere
5. The -0.5deg card tilt — not perfectly horizontal
6. Scroll-triggered narrative arc — not independent section blocks

---

## Part 2: Design Philosophy

### 2.1 How 2026 Trends Map to Design Decisions

| Trend | Kin Application |
|-------|----------------|
| **#5 Neo-Minimalism** | One bold typographic moment per section. Type IS the composition at hero. Extreme whitespace. Left-aligned hero (not centered). Each section has ONE thing that commands attention. |
| **#6 Emotion-Led Humanised** | Hand-drawn SVG micro-details at every section boundary. PP Pangaia italic for emotional emphasis. Copy that sounds like a real person wrote it. Organic easing that feels natural, not mechanical. |
| **#9 Raw Authenticity** | CSS grain texture on hero and teal sections. Organic border-radius variation. Sample card tilted -0.5deg. Hand-drawn vertical lines on blockquotes. Slightly irregular archetype pill shapes. |
| **#7 Vibrant Color (reinterpreted)** | Gradient depth within teal palette. Color as emotional signal (amber = craft, merlot = revelation, teal = depth). Not chromatic-bold — restrained and intentional. |
| **#2 Brutalist (whisper only)** | Deliberate layout asymmetry in hero (left-aligned, not centered). KOL bento grid (2-column featured + single for others). Not full brutalism — just its discipline around asymmetry. |

### 2.2 What Makes This Page UNFORGETTABLE

One answer: **the headline.**

"Finally, the words for it." at 140px PP Pangaia Ultralight. No decoration around it. No illustration competing with it. Just the words — enormous, warm, almost architectural. When someone arrives at this page, the first thing they see is a sentence that might describe exactly how they've felt for years, rendered at a scale that makes it impossible to look away.

This is the moment. Everything else serves it.

Secondary memorable elements:
- The -0.5deg tilted sample question card — "wait, that's a real question I'd think about"
- The pull quote from van der Kolk at 24px italic — "The body remembers what the mind forgets"
- SecondaryHero: "You've always known." (Ultralight) + "Now you'll see it." (italic, amber) — the emotional climax

### 2.3 Emotional Arc of the Scroll

```
[HIGH RECOGNITION] "Finally, the words for it." ← Hero
       ↓
[SOCIAL PROOF] "Others have done this. I'm not alone."
       ↓
[INTRIGUE] "Which one am I?" — nine archetype names. A real question.
       ↓
[TRUST BUILD] 8 researchers. Real science. This isn't arbitrary.
       ↓
[HUMAN CONNECTION] The science becomes human through the researchers' words.
       ↓
[FRICTION REMOVED] "My childhood was complicated. Will this work for me?"
       ↓
[EMOTIONAL PEAK] "You've always known. Now you'll see it." ← the recognition moment
       ↓
[EXHALE] Footer — minimal. The page is complete.
```

The emotional arc is a revelation arc. You enter curious. You leave certain. The design supports this by increasing emotional intensity through the scroll: light sections at top, deep teal emotional peak at bottom.

---

## Part 3: Section-by-Section Composition Specs

### Section 1: HeroSection

**The ONE bold moment:** PP Pangaia Ultralight at 140px. The headline is the design.

**Layout:**
- Full viewport height, flex column justify-center
- Left-aligned content column (max-w-3xl on xl screens, max-w-6xl container)
- Vast whitespace to the right — intentional negative space
- Teal radial gradient blob at top-right (60% opacity, hidden on mobile)

**Typography:**
- Eyebrow: `text-xs tracking-[0.25em] uppercase font-display italic` in Teal — "Kin — The Mirror"
- Headline: `text-6xl sm:text-7xl lg:text-[108px] xl:text-[140px] font-extralight` PP Pangaia, Espresso, `leading-[0.95]`
- Subtitle: `text-lg sm:text-xl` Geist Sans, Warm Sand, max-w-xl
- Supporting copy: `text-base` Geist Sans, Warm Sand, 2 paragraphs

**Color:**
- Background: Cloud White (#F5F4F2) + grain class
- Headline: Espresso (#1A1008)
- Body: Muted warm (#8A7A66)
- CTA button: Deep Teal (#0D3D3A) pill, Cloud White text

**Craft elements:**
- `HandDrawnCircle` at size 16, amber, 60% opacity — precedes eyebrow label
- CSS grain texture on section via `.grain` class
- Breathing teal gradient blob (abstract atmospheric depth)

**What stops the scroll here:** The headline. 140px weight in the warmest digital context most users have encountered.

**What changes from current implementation:**
- NONE — current implementation is already correct. Headline at correct scale, eyebrow with hand-drawn circle, left-aligned, vast whitespace, teal blob, grain, CTA pill.
- **Improvement target:** Increase xl headline scale from `xl:text-[140px]` (already set — good). Ensure `max-w-3xl` clamp on the headline itself.

---

### Section 2: SocialProof

**The ONE bold moment:** The animated counter "2,847 people have already taken The Mirror" in bold display font.

**Layout:**
- Centered content, max-w-5xl
- Counter prominent above the quote grid
- 3-column quote card grid (responsive: 1 col mobile, 3 col sm+)

**Typography:**
- Counter number: `text-3xl sm:text-4xl font-bold font-display` in Espresso — large enough to register
- "have already taken The Mirror": inline muted text — underplays the number (makes it feel casual, not boastful)
- Quote text: `text-sm italic` Geist Sans, Muted warm
- Attribution: `text-xs font-medium` Geist Sans, Muted warm

**Color:**
- Background: Cloud White (#F5F4F2)
- Cards: `bg-white/80 border border-[#E8E4DF]/60 rounded-2xl`
- Quote marks: Merlot at 40% opacity

**Craft elements:**
- `HandDrawnQuoteMark` in merlot — visible mark of care on every testimonial
- Cards: `rounded-2xl` with subtle shadow
- Each card has slightly different content height — feels organic, not templated

**What stops the scroll here:** The counter + the human specificity of quotes (city, age, role).

**What changes from current implementation:**
- Current: correct structure. Counter present. Quotes present. Hand-drawn quote marks present.
- **Improvement target:** Consider making counter number more dramatic (larger, display font weight). The muted treatment of "people" text below it is good — contrast the number boldness.

---

### Section 3: ArchetypePreview

**The ONE bold moment:** The nine archetype pills floating in an organic flex-wrap cloud.

**Layout:**
- Centered content column, max-w-5xl
- Centered text header (exception to left-align rule — this section is about discovery, not authority)
- Organic pill cloud flex-wrap
- Sample question card: tilted -0.5deg, max-w-lg, centered

**Typography:**
- Eyebrow: `text-xs tracking-[0.25em] uppercase font-medium` Teal
- h2: `text-4xl sm:text-5xl font-bold font-display` Espresso — "Nine patterns. One of them is yours."
- Body: `text-base` Muted warm, max-w-xl
- Archetype pill text: `text-sm` Espresso
- Sample card question: `text-lg sm:text-xl font-display` Espresso

**Color:**
- Background: White (#FFFFFF) — deliberate break from Cloud White for visual rhythm
- Archetype pills: `border border-[#E8E4DF] bg-[#F5F4F2]/60`
- Pill hover: `border-[#0D3D3A]/30 bg-[#F5F4F2]`
- Sample card: `bg-[#F5F4F2] border border-[#E8E4DF]` + grain texture

**Craft elements:**
- `HandDrawnCircle` in amber — eyebrow label
- Each pill has unique `organicRadius()` — deterministic irregular corners
- Sample card rotated -0.5deg — paper on a desk
- `.grain` on sample card — tactile feel

**What stops the scroll here:** "Nine patterns. One of them is yours." — the specificity triggers self-identification.

**What changes from current implementation:**
- Current: correct and well-structured. Organic pills, tilted card, grain, hand-drawn circle.
- **Improvement target:** h2 could go bolder — currently `font-bold` which maps to 700 in display font. This is correct. Sample question card interior: option buttons could be more visually distinct (slightly warmer border color on hover state).

---

### Section 4: KOLCredibility

**The ONE bold moment:** The bento-style researcher grid with sketch portrait icons — an asymmetric, human-feeling layout.

**Layout:**
- Left-aligned section header (max-w-2xl) — asymmetric, echoes hero
- 4-column bento grid (responsive: 2 col mobile, 4 col lg)
- Featured researchers (Baumrind, Ainsworth) span 2 columns
- All 8 researchers visible — no carousels

**Typography:**
- Eyebrow: `text-xs tracking-[0.25em] uppercase font-medium` Teal
- h2: `text-4xl sm:text-5xl font-semibold font-display` Espresso — left-aligned
- Subheading: `text-[#8A7A66] text-base leading-relaxed`
- Researcher name: `text-base font-semibold font-display` Espresso
- Contribution: `text-xs font-medium` Teal
- Work title: `text-xs italic` Muted warm
- Year: `text-xs` Muted warm

**Color:**
- Background: Cloud White (#F5F4F2)
- Cards: same background (intentional — makes sketch portraits pop without card elevation)
- Card hover: `hover:bg-white` — subtle lift
- Divider in card: `HandDrawnDivider` in Teal at 20% opacity

**Craft elements:**
- Sketch portrait SVGs — hand-drawn editorial line illustration style (already implemented)
- `HandDrawnDivider` between contribution and work title in each card
- Grid asymmetry: featured cards at 2-column width

**What stops the scroll here:** The sketch portrait style — these look like real hand-drawn portraits, not stock icons.

**What changes from current implementation:**
- Current: correct structure. Portraits, bento grid, hand-drawn dividers.
- **Improvement target:** Header is currently centered-ish. Push it to strict left-align (remove `max-w-2xl` centering, make it `ml-0 mr-auto`). Make h2 slightly larger on desktop. This echoes the hero's authority asymmetry.

---

### Section 5: KOLNarrative

**The ONE bold moment:** Research quotes at 24px PP Pangaia Ultralight Italic — the researchers speaking in the brand's voice.

**Layout:**
- Narrow reading column, max-w-3xl, centered (reading mode — not authority mode)
- Each researcher gets: quote + source + discovery + Mirror connection
- Separated by organic amber dividers
- No card containers — just type on background

**Typography:**
- Eyebrow: `text-xs tracking-[0.25em] uppercase font-medium` Teal, centered
- Quote: `text-xl sm:text-2xl italic font-display font-extralight` — PP Pangaia Ultralight Italic, Espresso
- Attribution: `text-sm font-bold font-display` + year, Muted warm
- Discovery: `text-sm leading-relaxed` Muted warm
- Mirror connection: `text-sm font-medium` Teal at 80% opacity

**Color:**
- Background: Cloud White (#F5F4F2) — continuation from KOLCredibility
- Hand-drawn left vertical line on blockquote: Teal at 30% opacity
- Dividers between sections: Amber at 30% opacity

**Craft elements:**
- Hand-drawn teal vertical line left of blockquote (already implemented inline SVG)
- `HandDrawnDivider` in amber between researcher sections
- No box shadows, no cards — pure typographic composition

**What stops the scroll here:** Van der Kolk quote at 24px italic: "Being able to feel safe with other people is probably the single most important aspect of mental health." — at that size, in italic, it's almost architectural.

**What changes from current implementation:**
- Current: well-structured. Quote size, vertical line, attribution, discovery.
- **Improvement target:** Quote font-weight should be explicitly `font-extralight` (200) not default. The current `font-display italic` may render at a different weight. Increase quote size from `text-xl sm:text-2xl` — push to `text-2xl sm:text-3xl` for maximum typographic impact.

---

### Section 6: FAQ

**The ONE bold moment:** "Before you begin" — massive, centered, display font. The heading sets a tone of safety.

**Layout:**
- Narrow reading column, max-w-2xl, centered
- Q&A pairs separated by `HandDrawnDivider`
- No accordion (all answers visible — trust through transparency)

**Typography:**
- Eyebrow: `text-xs tracking-[0.25em] uppercase font-medium` Muted warm (softer eyebrow — gentle section)
- h2: `text-4xl sm:text-5xl font-bold font-display` Espresso — "Before you begin"
- Question: `text-base font-semibold` Espresso
- Answer: `text-sm leading-relaxed` Muted warm

**Color:**
- Background: Cloud White (#F5F4F2)
- Dividers: `HandDrawnDivider` in amber at 30% opacity

**Craft elements:**
- Hand-drawn amber dividers between FAQ items
- No icons, no chevrons — pure typography

**What stops the scroll here:** "Before you begin" heading — it acknowledges hesitation before the user even names it.

**What changes from current implementation:**
- Current: well-structured. Correct structure.
- **Improvement target:** Remove the last divider after final FAQ item (currently `i < faqs.length - 1` guard is correct — good). Ensure question text is semibold not just regular.

---

### Section 7: SecondaryHero

**The ONE bold moment:** "Now you'll see it." in PP Pangaia Bold Italic, amber — at the emotional peak of the page.

**Layout:**
- Full-width deep teal gradient background
- Centered content, max-w-3xl
- Small illustration (decorative) above eyebrow — atmospheric, not illustrative
- Heading in two lines: Ultralight + Bold Italic contrast

**Typography:**
- Eyebrow: `text-xs tracking-[0.25em] uppercase font-medium` Amber (#C4892A)
- h2 line 1: `text-5xl sm:text-6xl lg:text-7xl font-extralight` Cloud White — "You've always known."
- h2 line 2: `text-5xl sm:text-6xl lg:text-7xl font-bold italic` Amber (#C4892A) — "Now you'll see it."
- Body: `text-base sm:text-lg` Teal muted (#7A9E9C), max-w-xl
- CTA trust text: `text-xs` Teal muted

**Color:**
- Background: `linear-gradient(180deg, #0D3D3A 0%, #092D2B 50%, #0D3D3A 100%)`
- Headline line 1: Cloud White (#F5F4F2)
- Headline line 2: Burnished Amber (#C4892A/90)
- CTA button: Merlot (#6B1E2E) — the emotional climax, the deepest color, the biggest decision

**Craft elements:**
- Grain texture via footer's `.grain` class (or inline on section)
- Decorative abstract illustration (current: secondary-hero-decoration.png, opacity 30%)
- `HandDrawnDivider` at bottom in Cloud White at 15% opacity
- Breathing gradient glow effect (ambient, not literal)

**What stops the scroll here:** The two-line headline contrast: Ultralight White vs. Bold Italic Amber. Maximum typographic drama. This is the emotional climax of the page.

**What changes from current implementation:**
- Current: correct direction. Two-line headline contrast exists.
- **Improvement target:** Ensure line 2 is `font-bold italic` (700 italic), not just `italic`. Current code has `<em className="font-bold italic">` — correct. The amber CTA (merlot button) is present and correct. Illustration could be reduced further in opacity or replaced with a simple teal geometric shape.

---

### Section 8: Footer

**The ONE bold moment:** "Kin" — alone, in display font, on deep teal. The brand as its own statement.

**Layout:**
- Full-width deep teal background + grain
- 3-column flex: wordmark left, links center, copyright right
- Minimal, no CTA, no decorative elements

**Typography:**
- "Kin" wordmark: `text-sm font-bold font-display` Cloud White at 80% opacity
- Links: `text-xs` Teal muted (#7A9E9C)
- Copyright: `text-xs` Teal muted

**Color:**
- Background: Deep Teal (#0D3D3A) + grain texture
- Text: Cloud White at 80% (not full white — deliberate warmth reduction)

**Craft elements:**
- Grain texture (`.grain` class) on footer background
- No borders, no additional decoration

**What stops the scroll here:** Nothing. This is the exhale. The page is complete. The minimal footer says "that's it — go take the quiz."

**What changes from current implementation:**
- Current: correct and minimal. Grain, deep teal, 3-column.
- NO CHANGES NEEDED.

---

## Part 4: What This Is NOT

**This visual direction explicitly rejects:**

1. **Glassmorphism as a design system** — Liquid Glass was recommended by the skill but rejected. It's performance-intensive and carries the wrong register (premium-SaaS, not warm-human). Glass elements are ONLY used on deep teal backgrounds for cards (`.glass-card`).

2. **Centered hero text** — The hero is left-aligned. Centered hero text is the default SaaS template pattern. Left-alignment plus vast negative space is Neo-Minimalism.

3. **Violet/indigo/purple palette** — The skill suggested indigo for a parenting/wellness product. Rejected. Indigo reads as mental health app cliché. Kin's palette is warmer and more grounded.

4. **Bold all-caps display fonts (Bebas, Anton, Lexend Mega)** — Aggressive. Wrong emotional register for an intimate psychological product.

5. **Full anti-polish/raw aesthetic** — Scanned textures, VHS effects, collage style. Kin is intentional craft, not rough. "Someone made this with care" not "this was made carelessly."

6. **Illustration as primary visual element** — No large decorative illustrations competing with the headline. The type IS the hero visual.

7. **Scattered hand-drawn elements** — Hand-drawn details appear at section boundaries and specific emotional emphasis points. Not scattered randomly as "decoration."

8. **Generic card grids** — Equal-height, equal-width, uniform spacing. The KOL bento grid is intentionally asymmetric.

9. **Generic font families** — Inter, Roboto, Arial, Space Grotesk, Poppins anywhere in the landing page display treatment.

10. **Multiple competing bold elements per section** — Each section has ONE bold moment. Not three.

---

## Part 5: Page Flow Map

**Emotional arc across 8 sections:**

```
SECTION          | BACKGROUND      | DENSITY  | EMOTION       | TYPOGRAPHY SCALE
─────────────────┼─────────────────┼──────────┼───────────────┼──────────────────
HeroSection      | Cloud White     | SPARSE   | Recognition   | GIANT (140px)
                 | + Teal blob     |          | "Finally..."  |
─────────────────┼─────────────────┼──────────┼───────────────┼──────────────────
SocialProof      | Cloud White     | MEDIUM   | Belonging     | LARGE (40px)
                 |                 |          | "Not alone"   |
─────────────────┼─────────────────┼──────────┼───────────────┼──────────────────
ArchetypePreview | White           | MEDIUM+  | Curiosity     | LARGE (48px)
                 |                 |          | "Which am I?" |
─────────────────┼─────────────────┼──────────┼───────────────┼──────────────────
KOLCredibility   | Cloud White     | DENSE    | Trust build   | LARGE (48px)
                 |                 |          | "Science"     |
─────────────────┼─────────────────┼──────────┼───────────────┼──────────────────
KOLNarrative     | Cloud White     | LIGHT    | Deep read     | MEDIUM ITALIC
                 |                 | (reading)|"Their words"  | (24px italic)
─────────────────┼─────────────────┼──────────┼───────────────┼──────────────────
FAQ              | Cloud White     | LIGHT    | Safety        | LARGE (48px)
                 |                 | (reading)|"It's ok"      |
─────────────────┼─────────────────┼──────────┼───────────────┼──────────────────
SecondaryHero    | Deep Teal       | SPARSE   | Climax        | GIANT (72px)
                 | gradient        |          | "Now you see" | + amber italic
─────────────────┼─────────────────┼──────────┼───────────────┼──────────────────
Footer           | Deep Teal       | MINIMAL  | Exhale        | TINY (wordmark)
                 | + grain         |          | "Done"        |
```

**Background rhythm:** Cloud White → Cloud White → White (break) → Cloud White → Cloud White → Cloud White → Deep Teal → Deep Teal

**Key transitions:**
- Cloud White → White (ArchetypePreview): subtle break provides visual fresh start before curiosity section
- Cloud White → Deep Teal (SecondaryHero): maximum contrast moment — the emotional peak is announced by the background before a word is read
- Deep Teal → Deep Teal (Footer): teal continues, density drops to zero — closing statement

**Density rhythm:** SPARSE → MEDIUM → MEDIUM+ → DENSE → LIGHT → LIGHT → SPARSE → MINIMAL
- Enters spacious, builds through mid-page density, returns to spacious for emotional climax, empties for close

---

## Implementation Notes for Plan 06-05

**What already exists and is CORRECT (keep exactly as-is):**
- app/layout.tsx — PP Pangaia multi-weight loading, correct CSS variables
- app/globals.css — grain class, breathe animation, organic easing, fade-up, section-deep
- components/ui/scroll-reveal.tsx — organic easing, 800ms, 24px distance
- components/ui/hand-drawn.tsx — HandDrawnDivider, HandDrawnQuoteMark, HandDrawnCircle

**What needs refinement (Plan 06-05 targets):**
- KOLNarrative: quote text should explicitly use `font-extralight` (weight 200) — confirm CSS variable correctly maps weight 200 to `font-extralight` Tailwind class
- KOLCredibility: section header needs stricter left-align (not `max-w-2xl` centerd block — fully left flush)
- HeroSection: already at target scale. Verify `xl:text-[140px]` class is rendering correctly
- SecondaryHero: ensure `<em>` uses correct font-weight 700 italic mapping
- ArchetypePreview: option buttons inside sample card could have slightly warmer border on hover

**Fonts confirmed, no changes needed:**
- PP Pangaia: Ultralight (200), Ultralight Italic (200i), Medium (500), Medium Italic (500i), Bold (700), Bold Italic (700i) — all loaded
- Geist Sans: loaded via Google Fonts, correct variable

**The brief is sufficient for a developer to implement all 8 sections.** Plan 06-05 will translate this brief directly into component code changes.
