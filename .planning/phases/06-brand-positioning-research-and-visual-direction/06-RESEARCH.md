# Phase 6: Brand Positioning Research and Visual Direction - Research

**Researched:** 2026-02-27
**Domain:** Brand strategy, competitive positioning, visual identity, brand naming
**Confidence:** MEDIUM-HIGH

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**Competitive scope:**
- Study 10-15 competitors across three segments: parenting tools, wellness/therapy platforms, and personal growth/self-discovery products
- Full funnel analysis for each: visual identity, onboarding flow, quiz/assessment UX, result delivery, monetization model, email capture strategy
- Discovery-first approach — no pre-existing competitor list; research surfaces the landscape
- Audience-first lens: identify competitors and references based on where the target audience already spends time, not just by industry category

**Visual identity direction:**
- Clean slate — everything is on the table, no elements locked from current brand
- Visual register to be determined by research findings, not pre-committed
- Must move away from current "startup quiz template" feel toward something that reads as "someone who understands me"
- The visual direction must follow from positioning, not lead it

**Inspirational references:**
- getrelatio.com noted as benchmark for product framing that feels "modern and relevant" — not necessarily the right aesthetic for Raising Giants, but sets the bar for feeling current and intentional
- Reference brands should be identified through audience-first thinking: what brands do self-reflective adults already trust and engage with?
- For each reference: capture both the visual elements (colors, typography, layout) AND the emotional response they produce (trust, curiosity, warmth, exclusivity)

**Brand name evaluation:**
- "Raising Giants" is open for evaluation — if research shows the name works against the positioning, it can change
- Product names (The Mirror, The Blueprint, The Partner Match) are also open for evaluation
- Name analysis should be part of the positioning recommendation

**Research deliverables:**
- Primary deliverable: narrative positioning document — landscape, gap, and a case for where Raising Giants should position
- Positioning decision comes first, visual direction follows from it
- End-to-end scope: research → positioning strategy → visual direction → rebrand execution plan
- The execution plan should be actionable enough to implement in subsequent work

### Claude's Discretion
- Specific research methodology and competitor discovery approach
- How to structure the competitive analysis (profiles, matrices, comparisons)
- Level of visual documentation (screenshots, mood boards, annotated examples)
- How to present the final positioning recommendation (structure and argumentation)

### Deferred Ideas (OUT OF SCOPE)
None — discussion stayed within phase scope
</user_constraints>

---

## Summary

Phase 6 is a research-and-strategy phase, not an engineering phase. The output is not code — it is a positioning document and visual direction brief that can guide a future rebrand execution. The planner needs to structure this as an information-gathering and synthesis task, not a build task.

The core challenge is correctly identifying the brand territory. The product occupies a genuinely novel space: it is not a parenting advice tool, not a therapy platform, not a personality quiz, and not a wellness app. It is a self-understanding product for adults reflecting on their upbringing — the emotional proposition is "finally having language for patterns I've always sensed." This territory is currently underserved and brand-undefined in the market.

The current brand (amber-50/stone-900 palette, Cormorant Garamond display, Geist sans body) is directionally correct — it has editorial warmth and avoids the purple/clinical register of therapy brands. But the name "Raising Giants," the product names (The Mirror, The Blueprint), and the overall framing still need evaluation against the positioning territory.

**Primary recommendation:** This phase should produce three sequential deliverables: (1) a competitive landscape map with gap analysis, (2) a positioning narrative document, (3) a visual direction brief with a rebrand execution plan scoped to the existing Next.js codebase.

---

## Competitor Landscape

### Segment A: Self-Discovery / Personality Assessment

| Competitor | Brand Register | Visual Identity | Gap for Raising Giants |
|------------|---------------|-----------------|------------------------|
| 16Personalities | Warm professionalism | Circular dot system, pastel colors, sans-serif, nature imagery | Mass market; feels validating but shallow; "everyone is like this" — not specific enough to create the "seen" feeling |
| Enneagram Institute | Scholarly warmth | Rustic imagery (barn), gold accents, clean sans-serif | Academic and slightly dated; no intimacy; more reference source than emotional experience |
| The Attachment Project | Clinical-warm hybrid | Purple (#604c8d) + white, modern sans-serif, curved layouts | Purple = clinical/therapeutic; positions as "healing past" (therapy framing); directly relevant competitor but aesthetically flat |
| Wondermind | Playful wellness media | Pastel multicolor (cyan, coral, sage, pink), documentary photography, cloud illustrations | Media brand not product; celebrity-driven; lacks depth of individual insight; feels like content scroll, not personal revelation |

### Segment B: Wellness / Therapy Platforms

| Competitor | Brand Register | Visual Identity | Gap for Raising Giants |
|------------|---------------|-----------------|------------------------|
| Headspace | Optimistic accessibility | Vibrant orange (primary), orange circle character, playful custom sans-serif, fluid illustrations | Energetic/fitness framing; meditation context; "practice" mindset vs. "revelation" mindset |
| Hims & Hers | Modern clinical discretion | Deep gray (#333333) + white; minimal; pharmaceutical-adjacent | Clinical, product-delivery oriented; no emotional intimacy; wrong register entirely |
| getrelatio.com (benchmark) | Modern + intentional | Warm pastels, heart iconography, consent-first language, community-driven social proof | Sets the bar for feeling current; positions assessment as meaningful experience not lead magnet; tone: trusted friend not clinical intervention |
| Calm | Nature-calm aesthetic | Deep blue, moonlit imagery, nature photography, high-contrast serif | Meditation/sleep focused; not insight-oriented; creates calm, not understanding |

### Segment C: Parenting Tools / Education

| Competitor | Brand Register | Visual Identity | Gap for Raising Giants |
|------------|---------------|-----------------|------------------------|
| BetterUp | Corporate-professional | Enterprise SaaS aesthetic; coaching platform | B2B focused; coaching/performance framing; entirely different audience intent |
| Generic parenting quiz apps | Generic startup | Template UI, purple or blue gradients, stock illustrations | The exact aesthetic trap Raising Giants must avoid; "personality quiz as lead magnet" feel |

### Competitive Gap Summary

The unoccupied territory in the landscape is: **emotional depth + clinical credibility + adult self-understanding (not advice)**. Every competitor falls into one of:
- Warm but shallow (16Personalities, Wondermind)
- Credible but clinical (Attachment Project, Hims, therapy platforms)
- Personal but lightweight (generic quiz apps)
- Wrong audience (BetterUp, parenting advice tools)

No competitor addresses adults seeking to understand the parenting they *received* through a lens that is simultaneously research-grounded, emotionally intimate, and free of therapeutic or advice-giving framing.

---

## Brand Territory Analysis

### The Positioning Statement (Research-Supported)

**Brand territory:** Grounded self-discovery — the intersection of clinical credibility and emotional intimacy.

**What it is NOT:**
- Not therapy (no healing journey language, no "trauma" framing in primary messaging)
- Not wellness (no "self-care" or "practice" framing)
- Not parenting advice (no prescriptive guidance on how to parent)
- Not a personality quiz (not light, playful, or entertainment-adjacent)

**What it IS:**
- A mirror — shows you patterns you've always felt but never articulated
- Research-grounded — the insight comes from clinical science, not astrology or pop psychology
- Past-lens — specifically about the parenting you received, not who you are or what you do
- Language-giving — the core value is vocabulary: "finally having words for it"

**Emotional core:** "I always sensed this. Now I see it."

### The Misidentification Problem

The current name "Raising Giants" creates a semantic trap. The phrase implies:
1. Parenting advice (you are raising children who will be great)
2. The user is a parent (excludes non-parents who are the primary audience)
3. Achievement/aspiration framing (giants = success, not understanding)

This conflicts with the actual product: a self-understanding tool for adults reflecting on their own upbringing. The target user is not raising giants — they are discovering they are one, or discovering what shaped them. The name should be evaluated against whether it clarifies or obscures the "this is about you, not your children" proposition.

**MEDIUM confidence** — This is a strategic hypothesis supported by the audience-first principle from the CONTEXT.md. Name change is open for evaluation per locked decisions.

### Product Names Assessment

**The Mirror** — works well. Evokes reflection, self-examination, the experience of being shown something true about yourself. Clean, visual, metaphorically resonant with "seeing patterns."

**The Blueprint** — works well for the paid product. Implies structure, a map forward, something actionable built from the Mirror insight.

**The Partner Match** — descriptively accurate but less evocative. Lowest priority.

---

## Architecture Patterns for the Phase

This is a research-and-strategy phase. The "architecture" is the work structure, not code structure.

### Phase Work Structure

```
Phase 6
├── Research Sprint           # Competitor audit + reference brand gallery
│   ├── 06-01-PLAN.md        # Competitive landscape: 10-15 profiles + positioning map
│   └── 06-02-PLAN.md        # Reference brand gallery + audience-first analysis
│
├── Positioning Sprint        # Synthesis into narrative positioning document
│   └── 06-03-PLAN.md        # Positioning narrative: landscape → gap → territory → name eval
│
└── Visual Direction Sprint   # Translate positioning to visual brief + execution plan
    ├── 06-04-PLAN.md        # Visual direction brief: palette, type, imagery, tone
    └── 06-05-PLAN.md        # Rebrand execution plan: what changes in codebase, phased scope
```

### Pattern 1: Positioning-First Sequencing

**What:** Positioning narrative is written and locked before any visual decisions are made.
**When to use:** Always in this phase — visual direction is downstream of positioning.
**Why:** The current brand's problem is that visuals were chosen before positioning was defined. The fix is the reverse order.

### Pattern 2: Audience-First Competitor Discovery

**What:** Find competitors by following the target audience (self-reflective adults who seek personal growth content), not by searching the parenting niche.
**When to use:** For selecting the 10-15 competitors to audit.
**Why:** The product is misidentified as a parenting tool by many — competitors should be found by asking "where does someone who would resonate with this product currently spend time?" Answer: journaling apps, Enneagram/MBTI platforms, therapy-adjacent content, self-help books.

### Pattern 3: Emotional Response Documentation

**What:** For each competitor and reference brand, document both the visual attributes (colors, type, layout) AND the emotional response produced (trust, curiosity, warmth, distance, superficiality).
**When to use:** Throughout all competitor and reference brand research.
**Why:** Visual attributes alone don't explain why a brand works. The emotional response is the signal.

### Pattern 4: Positioning Map

**What:** Two-axis map of the competitor landscape to visually identify the white space.
**Axes to use:** X: Clinical/institutional → Warm/intimate. Y: Shallow/generic → Deep/specific.
**Target quadrant:** Deep + Warm (upper-right)
**Current position:** Most competitors cluster in deep+clinical or warm+shallow. Target quadrant is underoccupied.

### Anti-Patterns to Avoid

- **Aesthetic-first planning:** Choosing visual direction before positioning is defined. The current brand's template-feel problem came from building visuals before a strategic foundation.
- **Category-first competitor selection:** Looking for competitors by industry category (parenting tools, wellness apps) instead of following the audience.
- **Confusion of "clinical credibility" with "clinical aesthetic":** The brand can carry research credibility without purple, white, institutional imagery. Credibility comes from copy and structure, not aesthetic register.
- **Naming as afterthought:** Brand name evaluation must happen in the positioning phase, not after visual direction is decided. A renamed product needs visual direction built around the new name's connotations.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Competitor brand audit | Custom research process from scratch | Structured audit template covering: identity, copywriting tone, onboarding UX, result delivery, email strategy, pricing | Consistent frame enables comparison |
| Positioning map | Text list of competitors | 2x2 matrix visualization (even a rough one) | Visual pattern recognition surfaces white space that text cannot |
| Color palette validation | Gut-feel selection | Color psychology principles + emotional association testing against target user mental model | Earthy warm palette hypothesis needs justification, not just preference |
| Brand name evaluation | Binary keep/change decision | Linguistic analysis (connotations, exclusions, misreadings) + audience alignment test | Systematic framework prevents anchoring bias |

**Key insight:** In a strategy phase, the "don't hand-roll" principle applies to process design, not code. Structured frameworks for competitor analysis and positioning produce more reliable outputs than unstructured exploration.

---

## Common Pitfalls

### Pitfall 1: Rebrand Scope Creep

**What goes wrong:** Visual direction phase expands to include full codebase rebrand, new illustrations, new copy, new everything — all within Phase 6.
**Why it happens:** The energy of "everything is on the table" (clean slate decision) can make it feel like all change happens now.
**How to avoid:** Phase 6 produces a *plan and brief* for rebrand execution. Actual rebrand implementation is Phase 7 or executed in stages. The planner should scope Phase 6 plans to research and documentation outputs only.
**Warning signs:** Plans that include tasks like "update globals.css with new palette" or "create new hero section" — these belong in an implementation phase.

### Pitfall 2: Visual Direction Without Codebase Context

**What goes wrong:** A visual brief is written in the abstract, without accounting for the specific technical constraints of the existing Next.js / Tailwind v4 / shadcn stack.
**Why it happens:** Brand strategy work typically ignores implementation details.
**How to avoid:** The rebrand execution plan must reference the specific components to change (`/app/globals.css`, `/app/layout.tsx` for font changes, landing components, quiz UI) and the specific token system in use (Tailwind v4 CSS custom properties, shadcn design tokens).
**Warning signs:** Execution plan that says "update colors" without specifying which Tailwind tokens change, or "change font" without specifying the `next/font/google` load pattern already established.

### Pitfall 3: Name Change Without URL/SEO Consideration

**What goes wrong:** A brand name change is recommended without accounting for domain availability, SEO implications, and the cost of updating all metadata.
**Why it happens:** Pure positioning work doesn't consider technical constraints.
**How to avoid:** Any name change recommendation must include a flag about `raisinggiants.com` domain (presumably owned), URL redirects, and the metadata already defined in `app/layout.tsx`. The execution plan is the right place to address this — Phase 6 positioning can recommend a name change, but execution plan must address the technical steps.
**Warning signs:** "Rename to X" without "check domain availability for X, plan migration of existing SEO equity."

### Pitfall 4: Competitor Selection Based on Category, Not Audience

**What goes wrong:** The 10-15 competitors selected are all "parenting apps" because that's what the product is labeled as — missing the real competitive context.
**Why it happens:** Default to industry category for competitive research.
**How to avoid:** Lead with "what does a self-reflective adult who resonates with this product already use?" and select competitors from the answer: Enneagram tools, journaling apps, therapy-adjacent content brands, personal growth communities.
**Warning signs:** A competitor list that includes parenting advice apps (BabyCenter, Ovia) and no personality/self-insight brands.

### Pitfall 5: Overcomplication of the Positioning Document

**What goes wrong:** The positioning narrative becomes a 40-page brand bible instead of a clear, actionable directional document.
**Why it happens:** Brand strategy templates are often comprehensive and exhaustive.
**How to avoid:** The positioning document should answer exactly three questions: (1) What is the landscape? (2) What is the gap? (3) What is the case for positioning Raising Giants here? It should be readable in under 20 minutes and directly actionable by a visual designer.
**Warning signs:** Any section titled "Brand Values," "Brand Pillars," "Mission/Vision/Values" — these are often filler in early-stage products.

---

## Current Brand State Assessment

### What Currently Exists

The existing brand has evolved through early phases and has stronger bones than "startup quiz template":

**Typography:** Cormorant Garamond (display) + Geist Sans (body). This pairing is directionally strong — editorial warmth + modern legibility. Cormorant has calligraphic roots, high stroke contrast, and italic forms that convey emotional depth. This choice should be evaluated as a keeper rather than defaulting to change.

**Color palette (current):**
- Primary backgrounds: `amber-50` (warm cream), `white`, `stone-900` (deep charcoal)
- Accent: `amber-600` / `amber-700` / `amber-400`
- Text: `stone-900`, `stone-600`, `stone-500`

This palette is warmer than the clinical purple space but reads "startup warm neutral" rather than "emotionally distinctive." The amber is functional but not specifically meaningful — it doesn't communicate anything unique about this product's territory.

**What the brand currently communicates:**
- "A warm, thoughtful quiz app" ✓
- "Research-grounded" ✓ (via KOL credibility section, researcher names)
- "Specifically about understanding your upbringing" ✗ (easily misread as parenting advice)
- "Something that will show me myself" ✗ (not clear from visual identity)
- "I can trust this" ✓ (partially, via Cormorant + stone palette)

**The gap:** The brand is warm but not distinctive. The visual identity doesn't encode the product's singular proposition — that this is a *revelation* product, not an advice product or a quiz product.

---

## Visual Direction Research Findings

### Color Psychology for the Brand Territory

**Research finding:** Earthy warm palettes (terracotta, stone, sage, cream) are 2025's authenticity signals. Brands in the wellness-adjacent space have moved away from clinical whites and tech purples toward organic, nature-grounded tones. These colors communicate: trust, groundedness, durability, return to basics. (Source: NW Brand Design, Vivid Creative — MEDIUM confidence, multiple sources agree on direction.)

**Research finding:** The amber palette currently in use communicates warmth and approachability, but lacks specificity. More distinctive earthy palettes combine warm neutrals with a specific chromatic accent that carries meaning. Examples: terracotta (grounded, earthy), warm sage (growth, organic), deep charcoal (depth, substance), bone/parchment (aged wisdom, intimacy).

**Recommendation for research/evaluation:** The visual direction brief should evaluate whether to deepen and differentiate the current amber palette (low disruption) or shift to a more specific palette that better encodes the "grounded self-discovery" territory. Both are valid — the choice should follow from what the positioning narrative establishes as the brand's feeling.

### Typography Research Findings

**Cormorant Garamond (current display font):** Calligraphic roots, high stroke contrast, elegant italic forms. Research confirms this aligns with "editorial warmth" — used by luxury/wellness brands seeking sophistication without corporate coldness. The `--font-display` variable is already set up in the codebase. (Source: Figma resource library, font pairing analysis — MEDIUM confidence.)

**Research finding:** For the brand territory of "grounded self-discovery," editorial serif display fonts with high stroke contrast (Cormorant, Canela, Freight Display, Playfair Display) outperform geometric sans-serifs because they carry intimacy and depth. The current Cormorant choice should be validated against the positioning, but the direction is right.

**Alternative to evaluate:** If the name changes (e.g., away from "Raising Giants"), a new display typeface could signal the shift. But if the positioning strengthens the current name, Cormorant should likely stay.

### Imagery / Illustration Research Findings

**Research finding:** The strongest brands in the self-understanding space use one of two imagery systems:
1. **Character/illustration-based** (16Personalities, Headspace) — relatable characters in everyday situations, abstract metaphors for internal states
2. **Documentary/real people** (Wondermind) — candid photography that signals authenticity over polish

**Current state:** Raising Giants uses custom SVG illustrations (MirrorIllustration, ArchetypeIcons, KOL portrait sketches). This is directionally better than stock photography for a psychological product — it allows for intentional metaphor. The question is whether the current illustration style (abstract/geometric) communicates the right emotional register.

**Research finding:** The getrelatio.com benchmark achieves its "modern and intentional" feel through specificity of illustration metaphor — each visual element serves a clear emotional purpose. The gap in most quiz products is that illustrations feel generic (abstract shapes, generic people) rather than encoding the specific emotional experience of the product.

---

## Name Evaluation Framework

### "Raising Giants" — Analysis

**What it communicates:**
- Primary read: parenting advice ("I am raising children to be giants")
- Secondary read: child development / achievement orientation
- Tertiary read: empowerment / aspiration

**What it fails to communicate:**
- Self-understanding ("this is about me, not my children")
- Universality (implies you must be a parent or planning to parent)
- The looking-back orientation (it sounds forward-facing, product is backward-facing)

**The core problem:** The name describes the wrong person doing the wrong thing. The user is not raising giants — they are discovering what *made* them. The name points outward (toward children) when the product looks inward (at the user's own upbringing).

**Risk if name stays:** Users who are not parents may feel excluded. Users looking for parenting advice may feel deceived when they discover the product is about their own upbringing. The name creates a mismatch between expectation and experience.

**Naming direction alternatives to evaluate:**
- Names that reference self-revelation, patterns, origins, or the looking-glass
- Names with a clinical-warmth register (not medical, not trendy)
- Names that could accommodate The Mirror, The Blueprint, The Partner Match as product names underneath

**Confidence on name evaluation:** MEDIUM — the hypothesis that the name creates a mismatch is supported by the CONTEXT.md's own note that "the current product is often mistaken for a parenting advice tool." The name is likely contributing to that misread.

### Framework for Positioning Research to Evaluate

The positioning plan should test the name against four criteria:
1. **Clarity:** Does it communicate self-understanding (not parenting advice)?
2. **Inclusion:** Does it include non-parents?
3. **Direction:** Does it suggest looking inward (past) or outward (future)?
4. **Register:** Does it match the grounded-intimate tone, or does it sound aspirational/corporate?

---

## Rebrand Execution Plan Scope (for Visual Direction Brief)

When the visual direction brief reaches the execution plan section, it should reference these specific files and changes:

### What Can Change (Brand-Affecting Files)

| File | What It Controls | Change Scope |
|------|-----------------|--------------|
| `/app/globals.css` | All CSS custom properties (colors, radius, shadows) | Palette tokens — can replace all `--color-*` values |
| `/app/layout.tsx` | Font loading (`next/font/google`), metadata (title, description, OG) | Font change = update import + variable; metadata = brand name change |
| `/public/` | Logo, OG image, favicon | New brand assets |
| `/components/landing/*.tsx` | All landing page sections | Copy, color class names, illustrations |
| `/components/landing/illustrations/` | SVG illustrations (MirrorIllustration, ArchetypeIcons, KOL portraits) | Style + content of all custom illustrations |
| `/components/quiz/` | Quiz UI (card style, progress bar, question layout) | Color classes, type treatment |
| `/components/result/` | Result page layout and components | Color classes, type treatment |

### Implementation Constraints

- **Tailwind v4 token system:** All color changes happen in `/app/globals.css` using CSS custom properties (`--color-*`). The shadcn design tokens map to these. A palette change is a single-file update that propagates everywhere via `@theme inline`.
- **Font change:** `next/font/google` pattern is established in `layout.tsx`. Adding or replacing a font is a low-risk single-file change. The `--font-display` variable is already the CSS hook for display font.
- **Biome linting:** All new code must pass Biome checks. No config changes needed for a rebrand — it's a style change, not a code pattern change.
- **No new dependencies:** A rebrand execution for an existing site should not require new libraries. Tailwind v4 + shadcn + existing font infrastructure is sufficient.

---

## State of the Art (2025 Relevance)

| Old Approach | Current Approach | Impact for Raising Giants |
|--------------|------------------|--------------------------|
| Purple/blue = "trusted wellness" | Earthy warm = "authentic, grounded" | Purple is now the clinical register; amber/stone is the right direction |
| Generic stock photography | Documentary or purposeful illustration | Custom SVG illustrations are already ahead of generic stock |
| Bold, broad sans-serif typography | Editorial serif (Canela, Cormorant, Freight) for depth products | Current Cormorant choice is aligned with 2025 direction |
| "Lead magnet quiz" framing | "Meaningful personal experience" framing (getrelatio.com model) | Core reframing needed in copy + product UX, not just visuals |
| Wellness = advice + practice | Wellness = understanding + revelation | Raising Giants needs to occupy the revelation column, not advice |

---

## Open Questions

1. **Brand name change decision**
   - What we know: "Raising Giants" creates a semantic mismatch with the actual product; audience-first framing suggests the name should point inward at self-understanding, not outward at child-raising
   - What's unclear: Whether the brand equity in the current name (however nascent) is worth preserving; what alternative names pass all four evaluation criteria
   - Recommendation: The positioning plan (06-03) should include a name evaluation section with at least 3 alternative candidates tested against the framework; the final recommendation can be made after positioning narrative is written

2. **Palette differentiation vs. palette deepening**
   - What we know: The current amber palette is directionally warm and non-clinical; earthy palettes are the 2025 authenticity signal; the current palette reads "startup warm neutral" not "emotionally distinctive"
   - What's unclear: Whether to deepen and differentiate the existing amber palette (low disruption, preserves continuity) or shift to a more distinctive chromatic identity
   - Recommendation: Evaluate against what the positioning narrative establishes as the target emotional feeling; do not decide visually before positioning is written

3. **Illustration system direction**
   - What we know: Custom SVG illustrations exist for hero, archetypes, and KOL portraits; character/illustration-based systems outperform stock for self-understanding products; current illustrations are abstract-geometric in style
   - What's unclear: Whether the current illustration style can be evolved (same style, stronger direction) or needs a new visual language
   - Recommendation: Include illustration system direction in the visual brief (06-04); cost of evolution vs. replacement is important input for execution plan scoping

4. **Competitor research methodology**
   - What we know: The audience-first approach is locked; the three segments are defined (parenting tools, wellness platforms, self-discovery products)
   - What's unclear: Specific tool/process for capturing full-funnel competitor analysis (what does "email capture strategy" research look like without signing up for every competitor?)
   - Recommendation: Plan should include a structured audit template; researcher can capture screenshots, note CTA language, and simulate the email capture flow without completing purchase

---

## Sources

### Primary (HIGH confidence)
- Direct WebFetch of getrelatio.com — visual design and positioning analysis
- Direct WebFetch of 16personalities.com — brand identity and emotional positioning analysis
- Direct WebFetch of attachmentproject.com — competitor analysis, visual identity
- Direct WebFetch of enneagraminstitute.com — competitor analysis, brand register
- Direct WebFetch of wondermind.com — competitor analysis, visual system
- Direct WebFetch of headspace.com via kimp.io analysis — brand system documentation
- Project codebase analysis (`/app/globals.css`, `/app/layout.tsx`, `/components/landing/`) — current brand state

### Secondary (MEDIUM confidence)
- Design Bridge (designbridge.com) — brand refresh process phases and deliverables
- NW Brand Design — color psychology for earthy warm palettes in wellness branding
- Vivid Creative — 2025 color trends and earthy palette associations
- Multiple WebSearch results — competitor landscape, font pairing research, brand naming psychology

### Tertiary (LOW confidence)
- General WebSearch results on "personality quiz brand design" — landscape framing only, not verified with specific brands
- WebSearch results on "self-help psychological product naming" — directional, not verified with authoritative naming research

---

## Metadata

**Confidence breakdown:**
- Competitor landscape: MEDIUM — based on direct site analysis of major competitors; smaller/newer competitors may have been missed
- Brand territory analysis: MEDIUM — logic-based inference from audience description and competitor gap analysis; hypothesis not validated by user research
- Name evaluation: MEDIUM — mismatch hypothesis is consistent with CONTEXT.md observation that product is "often mistaken for parenting advice tool"; not validated by A/B testing or user surveys
- Visual direction findings: MEDIUM — color psychology findings supported by multiple sources; specific recommendations are directional, not validated against user emotional response testing
- Execution plan scope: HIGH — based on direct codebase analysis; files identified are accurate and complete for a rebrand scope

**Research date:** 2026-02-27
**Valid until:** 2026-03-27 (30 days — brand research is stable; competitor landscape may shift)
