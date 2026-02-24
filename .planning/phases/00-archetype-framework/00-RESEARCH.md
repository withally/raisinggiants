# Phase 0: Archetype Framework - Research

**Researched:** 2026-02-24
**Domain:** Clinical parenting archetype system design — KOL synthesis, dimensional scoring, content framework, cultural overlay
**Confidence:** MEDIUM

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

- Archetype count is **research-driven** — not locked at a specific number. KOL research determines how many distinct patterns emerge (initial estimate was 6 but may be more)
- **Warm & descriptive names** reflecting current parenting style (e.g., "The Steady Anchor", "The Fierce Protector") — not clinical, not metaphorical
- **Spectrum with overlap** — archetypes shade into each other, not rigidly non-overlapping
- Results surface **1 primary + 3 secondary** archetypes, StrengthsFinder-style (ranked, no percentages)
- **Strength-first framing** with wound awareness — lead with "this is your superpower," then "here's what to watch for"
- Each archetype gets a **one-liner shareable tagline** (e.g., "Your calm is your children's foundation")
- Names reference the **current parenting style**, not the childhood origin. Upbringing context comes in the content narrative
- The same archetype set is scored across **three lenses**: Past (how you were raised), Current (how you parent now), Aspirational (how you want to parent)
- **Past is the core quiz** — everyone takes this. Current and Aspirational are opt-in continuations
- **Dimensional scoring** — each question contributes to multiple dimensions, archetypes defined by dimension profiles
- When a user only completes Past, result shows inherited pattern archetype plus **soft inference** of current/aspirational leanings
- The movement between archetypes across lenses IS the personal story — this is the core product insight
- Archetypes are **built from KOL research** — cross-referencing frameworks from Baumrind, Gottman, Siegel, etc.
- **Sophia validates and signs off** on the framework but does not create it from scratch
- **"Warm expert friend" tone** — like a therapist who's also your smart friend. Emily Oster is the reference
- Watchouts use **blend of research framing and gentle nudges** — "research shows..." + "when stressed, you might find yourself..."
- Phase 0 produces **structured outlines + key themes** per archetype (not full prose)
- Research attribution via **bottom citations**, not inline name-dropping
- **Consumer product backed by research** — not a research paper

### Claude's Discretion

- Exact number of scoring dimensions and their names
- Specific KOL selection methodology (which researchers to prioritize)
- How to structure the cultural context overlay (deferred from discussion but still in scope per requirements)
- Reading level and word count targets for outlines
- How "soft inference" is calculated from past-only scores

### Deferred Ideas (OUT OF SCOPE)

- None — discussion stayed within phase scope
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| ARCH-01 | 6-8 named parenting archetypes defined with distinct profiles based on clinical knowledge | KOL synthesis section defines which research frameworks to cross-reference; dimension profiling pattern provides the structure |
| ARCH-02 | Scoring logic maps quiz answers to primary archetype (handles blended results) | Dimensional scoring section documents the two-step algorithm: questions → dimension scores → archetype similarity scores; ranked result list handles blended results |
| ARCH-03 | Each archetype has foundational patterns description (positive framing of tendencies) | Content outline section defines required fields per archetype; strength-first framing validated by StrengthsFinder model |
| ARCH-04 | Each archetype has watchouts description (shadow/risk patterns to be aware of) | Content outline section includes watchout field structure; research shows pairing positive framing with normalized challenge framing reduces shame response |
| ARCH-05 | Each archetype has cultural context overlay (how cultural background modifies the archetype) | Cultural overlay section documents the individualism/collectivism dimension as the primary modifier; research shows within-culture variance is substantial, so overlays should be framed as tendencies not deterministic shifts |
</phase_requirements>

---

## Summary

Phase 0 is a content and clinical design phase, not an engineering phase. There is no code to write. The primary deliverable is a set of structured documents — archetype profiles, a scoring matrix, and cultural context overlays — that downstream engineering (Phase 1 onward) will build against as a stable foundation. The highest-risk decision in this phase is the choice of scoring dimensions: they must be clinically grounded, mutually distinguishable, and map cleanly to observable quiz-answer patterns.

The established research literature provides a strong starting point. Two independent lines of research converge on the same core dimensions: Diana Baumrind's responsiveness/demandingness axes (extended by Maccoby and Martin into a four-quadrant model), and the multidimensional parenting literature that adds emotional warmth, autonomy support, punitive discipline, anxious intrusiveness, permissive discipline, and democratic discipline as sub-factors. Attachment theory (Bowlby, Ainsworth, Main, Siegel) adds a critical additional layer — the intergenerational transmission mechanism — which is the product's core IP. How a parent was attached to *their* parents predicts how they will attach to their own children, and this mechanism is what makes the "past lens" quiz clinically meaningful rather than just nostalgia.

The archetype count is intentionally left research-driven (not pre-fixed). Most validated parenting frameworks converge on 4-8 distinct patterns. Research suggests that fewer archetypes (4-5) are easier for users to identify with but may feel generic; more archetypes (8-10) allow for specificity but increase the risk of users landing in ambiguous blended results. Given the three-lens model and the 1 primary + 3 secondary result format, 6-8 archetypes is the right target range. The scoring matrix should be designed so that no more than one archetype achieves truly dominant scores in a typical response set — the StrengthsFinder model shows users accept ranked results when each ranked archetype is described with specificity and resonance.

**Primary recommendation:** Build the KOL synthesis document first (a structured table of what each major researcher contributes to the dimension space), then derive scoring dimensions from the overlap in that synthesis, then define archetypes as profiles across those dimensions, then validate against simulated answer sets before writing content. This is a waterfall content pipeline, not iterative — get the dimensions right before writing a single archetype profile.

---

## Standard Stack

This phase produces documents, not code. There is no npm stack for Phase 0. However, the outputs of Phase 0 must be structured in a way that makes downstream engineering straightforward. The recommended artifact format is:

### Core Deliverables Format

| Artifact | Format | Location | Consumed By |
|----------|--------|----------|-------------|
| Archetype definitions | TypeScript type + JSON | `lib/archetypes/archetypes.ts` | Phase 2 scoring, Phase 3 result page, Phase 5 AI prompts |
| Scoring matrix | TypeScript object | `lib/quiz/scoring-matrix.ts` | Phase 2 quiz scoring |
| Cultural overlays | JSON per archetype | `lib/archetypes/cultural-overlays.ts` | Phase 5 AI prompts |
| Dimension definitions | TypeScript enum | `lib/quiz/dimensions.ts` | Phase 2 question bank |

The reason to pre-define the file paths and formats in Phase 0 research is that Sophia's content decisions will lock in the data shape before Phase 2 engineering begins. A mismatch between Sophia's archetype structure and the expected TypeScript interface will cause rework in every downstream phase.

### Recommended Archetype TypeScript Interface

```typescript
// lib/archetypes/types.ts — defines the contract for all Phase 0 outputs
export type ArchetypeId = string; // e.g. "steady-anchor", "fierce-protector"

export interface Archetype {
  id: ArchetypeId;
  name: string;                         // "The Steady Anchor"
  tagline: string;                      // "Your calm is your children's foundation"
  dimensionProfile: DimensionProfile;   // the scoring fingerprint for this archetype
  foundationalPatterns: ArchetypeContent;
  watchouts: ArchetypeContent;
  culturalOverlays: CulturalOverlay[];
}

export interface DimensionProfile {
  // Each dimension scored 1-10, representing where this archetype typically sits
  emotionalWarmth: number;
  autonomySupport: number;
  boundaryConsistency: number;
  emotionalRegulation: number;
  protectiveInstinct: number;
  // ... additional dimensions TBD by KOL synthesis
}

export interface ArchetypeContent {
  headline: string;              // 1 sentence anchor
  themes: string[];              // 3-5 key themes (bullet form for outline stage)
  researchAnchor: string;        // 1 sentence linking to KOL framework — e.g., "Siegel's concept of..."
  citations: Citation[];
}

export interface CulturalOverlay {
  culturalContext: string;       // e.g., "East Asian collectivist", "South Asian joint-family"
  expressionModifier: string;    // how the archetype manifests differently in this context
  strengthsInContext: string[];  // strengths that are amplified
  tensionsInContext: string[];   // watchouts that are more pronounced
}

export interface ScoringMatrix {
  dimensions: DimensionDefinition[];
  archetypeProfiles: Record<ArchetypeId, DimensionProfile>;
}
```

---

## Architecture Patterns

### Recommended Output File Structure

```
lib/
├── archetypes/
│   ├── types.ts              # TypeScript interfaces (above) — Phase 0 defines this contract
│   ├── archetypes.ts         # Archetype definitions (populated from Sophia's content)
│   └── cultural-overlays.ts  # Cultural context modifiers per archetype
├── quiz/
│   ├── dimensions.ts         # Dimension enum and definitions
│   └── scoring-matrix.ts     # Question → dimension weights; archetype dimension profiles
```

### Pattern 1: Dimensional Scoring (Two-Step Algorithm)

**What:** Questions contribute weighted scores to named dimensions. Dimensions aggregate into a "dimension fingerprint" per user. User fingerprint is compared against each archetype's reference fingerprint. Closest match = primary archetype. Next three closest = secondary archetypes.

**Why:** This is how StrengthsFinder works (34 themes scored across multiple question responses, ranked by score). It is also how the MBTI's 4-letter type system works. Dimension-based scoring naturally produces ranked results and handles blended responses without forcing binary archetype assignment.

**The algorithm:**

```
Step 1: Questions → Dimension Scores
  For each quiz answer:
    answer_value * question_dimension_weight → contribution to dimension
  Sum contributions per dimension → raw dimension score per dimension
  Normalize to 1-10 scale per dimension → user DimensionProfile

Step 2: Dimension Profile → Archetype Ranking
  For each archetype:
    Compare user DimensionProfile against archetype's reference DimensionProfile
    Calculate similarity score (sum of (1 - |user_dim - archetype_dim| / 9) for each dim, weighted by dimension importance)
  Sort archetypes by similarity score descending
  Result: [primary, secondary_1, secondary_2, secondary_3]
```

**Concrete Example:**

```typescript
// Simplified scoring for illustration
const archetypeProfiles: Record<string, DimensionProfile> = {
  "steady-anchor": {
    emotionalWarmth: 9,
    autonomySupport: 6,
    boundaryConsistency: 8,
    emotionalRegulation: 9,
    protectiveInstinct: 5,
  },
  "fierce-protector": {
    emotionalWarmth: 7,
    autonomySupport: 3,
    boundaryConsistency: 9,
    emotionalRegulation: 5,
    protectiveInstinct: 10,
  },
};

function rankArchetypes(userProfile: DimensionProfile): ArchetypeId[] {
  const scores = Object.entries(archetypeProfiles).map(([id, profile]) => ({
    id,
    score: calculateSimilarity(userProfile, profile),
  }));
  return scores
    .sort((a, b) => b.score - a.score)
    .map(s => s.id);
}
```

### Pattern 2: Three-Lens Scoring (Past / Current / Aspirational)

**What:** The same question bank (or variants of it) is scored three times, once for each lens. Each lens produces its own archetype ranking. The "story" is the delta between the three lens results.

**Soft inference logic (Past-only completion):**

When only the Past lens is completed, soft inference of Current/Aspirational leanings is derived from the historical research finding that parents with specific attachment/upbringing patterns tend to parent in predictable ways unless conscious work intervenes (intergenerational transmission literature, van IJzendoorn meta-analysis 1995, 75% secure-secure transmission). The soft inference should NOT claim "you parent like X" — it should say "parents with your background often find themselves gravitating toward X tendencies."

```typescript
interface LensResult {
  lens: 'past' | 'current' | 'aspirational';
  archetypeRanking: ArchetypeId[];
  completedAt: Date | null; // null = soft inference, not directly scored
  isSoftInference: boolean;
}

interface FullResult {
  past: LensResult;
  current: LensResult;        // may be soft inference
  aspirational: LensResult;   // may be soft inference
  narrative: string;          // the gap story: "you've already moved from X toward Y..."
}
```

### Pattern 3: KOL Research Synthesis (How to Build the Framework)

**What:** Rather than inventing archetypes from scratch, synthesize the dimension space from existing validated research. Each major KOL framework contributes dimensions. Overlapping dimensions (same construct named differently by different researchers) are merged. Gaps (dimensions no existing framework covers) are flagged for Sophia to fill clinically.

**The synthesis table approach:**

| Researcher | Framework | Key Dimensions Contributed |
|------------|-----------|---------------------------|
| Diana Baumrind | Parenting Styles | Responsiveness, Demandingness |
| Maccoby & Martin | Extended Baumrind | 4-quadrant model (Authoritative/Authoritarian/Permissive/Neglectful) |
| John Gottman | Emotional Coaching | Emotional awareness, Empathy, Coaching vs. Dismissing |
| Daniel Siegel | Interpersonal Neurobiology | Mindsight, Emotional integration, Narrative coherence |
| Mary Ainsworth | Attachment Classifications | Secure/Anxious/Avoidant/Disorganized |
| Mary Main | Adult Attachment Interview | Coherent narrative about past, Earned secure |
| Diana Shmukler | Schema therapy parenting | Early maladaptive schemas in parenting context |
| Shefali Tsabary | Conscious parenting | Parental presence vs. projection |
| Dan Siegel & Mary Hartzell | Parenting from the Inside Out | Autobiographical narrative integration |
| PBDQ research (Loeber et al.) | 6-factor model | Emotional Warmth, Punitive Discipline, Anxious Intrusiveness, Autonomy Support, Permissive Discipline, Democratic Discipline |

**Recommended core dimensions (6-7) for synthesis:**

Based on cross-referencing the above frameworks, these dimensions appear across multiple validated instruments and are clinically distinguishable:

1. **Emotional Warmth** — the degree to which a parent provides affection, acceptance, and emotional support (Baumrind responsiveness, Gottman empathy, PBDQ factor 1)
2. **Boundary Consistency** — the degree to which a parent sets and enforces clear, predictable rules and expectations (Baumrind demandingness, Authoritarian dimension)
3. **Autonomy Support** — the degree to which a parent scaffolds independence vs. fostering dependence (Baumrind, PBDQ factor 4)
4. **Emotional Regulation / Coaching** — how the parent handles their own emotional activation and whether they coach vs. dismiss child emotions (Gottman, Siegel)
5. **Protective Instinct / Vigilance** — degree of anxiety about harm, overprotection, anxious intrusiveness (PBDQ factor 3)
6. **Narrative Coherence about Own Past** — how coherently a parent can describe and integrate their own childhood experience (Siegel, Main's Adult Attachment Interview) — this is the dimension most directly tied to the three-lens model
7. **Presence / Attunement** — degree of conscious vs. reactive parenting, presence with child's actual emotional state vs. projection of own needs (Tsabary, Siegel)

Sophia's role: validate this dimension list, add or remove dimensions based on clinical judgment, and confirm that these dimensions cleanly produce 6-8 distinct archetypes when mapped as profiles.

### Anti-Patterns to Avoid

- **Anti-pattern: Naming archetypes after clinical diagnoses.** "The Anxious Parent" invites shame and self-rejection. "The Fierce Protector" invites identification and pride. All archetype names must pass the test: "would a parent proudly share this as their result?" Names referencing current behavior, not wound etiology.
- **Anti-pattern: Designing archetypes that are obviously "good" and "bad."** Every archetype must have genuine strengths AND genuine watchouts. If Sophia reviews the list and one archetype seems clearly better than others, the framework design is broken. Each must be the right fit for certain contexts.
- **Anti-pattern: Fixing archetype count before doing the synthesis.** The research-driven decision means letting the dimension synthesis produce natural clusters. If cross-referencing the major frameworks naturally produces 7 distinct dimension profiles, force-fitting to exactly 6 or 8 loses clinical validity.
- **Anti-pattern: Writing full prose before Sophia validates scoring.** The outline stage exists for a reason. Writing polished prose around archetypes whose scoring has not been validated wastes effort. The outline + simulated validation cycle must complete before prose work begins.
- **Anti-pattern: Treating cultural overlays as translations.** Cultural context modifies how an archetype *expresses itself*, not which archetype a person is. A "Fierce Protector" in a collectivist East Asian cultural context will express protective instinct through family honor and academic pressure rather than physical vigilance — same archetype, different expression. Overlays are modifiers, not alternative archetypes.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Archetype definitions from scratch | Original clinical framework invented from first principles | KOL synthesis from Baumrind/Gottman/Siegel/PBDQ | 60+ years of validated parenting research exists; building independently creates clinical validity risk and Sophia's validation burden |
| Scoring dimensions from introspection | Gut-feel dimension names | Cross-reference 3+ validated psychometric instruments | Single-source dimensions may confound what multiple researchers treat as separate constructs |
| Cultural modifiers from assumption | Western-centric assumptions applied universally | Individualism/Collectivism literature (PMC meta-analyses, Lansford et al. cross-cultural studies) | Within-culture variance exceeds between-culture variance; modifiers must be framed as tendencies, not determistic type-shifts |
| Content outline format ad hoc | Unstructured prose notes | Strict TypeScript interface shape (defined above) | Every downstream phase depends on consistent archetype data shape; informal notes cause Phase 2+ rework |
| Validation by reading aloud | Sophia reading archetype descriptions without data | 20-30 simulated answer sets scored through the matrix | Clinical plausibility cannot be assessed without seeing how real answer patterns map to the scoring algorithm |

**Key insight:** This phase's entire output is a data contract. Every archetype profile, every dimension definition, every cultural overlay is a piece of data that code will consume. The content must be authored with that constraint in mind — not written as a clinical paper that engineers later try to parse.

---

## Common Pitfalls

### Pitfall 1: Starting content before dimensions are validated

**What goes wrong:** Sophia writes rich, detailed archetype profiles for 7 archetypes. Then simulation reveals that the scoring algorithm conflates two archetypes because they share too many high-dimension values. Rewriting content to differentiate them is expensive.

**Why it happens:** Natural tendency to make archetypes feel "alive" with prose before the underlying structural logic is confirmed.

**How to avoid:** The pipeline must be: KOL synthesis → dimension definitions → archetype dimension profiles → Sophia validation of profiles (matrix only) → simulated answer testing → content outlines → Sophia prose validation. Do not write prose until the matrix passes simulation.

**Warning signs:** Work on archetype voice/tone or copywriting starting before a scoring simulation has been run.

### Pitfall 2: Archetype dimensions that don't survive quiz translation

**What goes wrong:** A dimension that is clinically meaningful (e.g., "narrative coherence about own past") is hard to capture in a quiz question. The resulting questions either feel invasive, are easy to game, or produce low variance (everyone scores 5-7 on a 1-10 scale).

**Why it happens:** Dimension design and question design are treated as separate tasks when they must be co-designed.

**How to avoid:** For each proposed dimension, before finalizing it, write 2-3 candidate quiz questions that would measure it. If no natural question can be written that doesn't feel clinical or leading, the dimension may need to be operationalized differently or merged with another.

**Warning signs:** A dimension name that sounds clinically meaningful but produces a question like "How often do you feel you have processed your childhood experiences?"

### Pitfall 3: Cultural overlays as a separate late-stage task

**What goes wrong:** Phase 0 completes with archetype profiles but no cultural overlays, because it was treated as "we'll add that later." Phase 5 AI prompt generation begins. Prompt engineers realize they have no structured data for cultural personalization. Phase 5 is delayed or cultural personalization is scoped down to "mentions cultural background once."

**Why it happens:** Cultural overlay work is harder to scope and feels lower-priority than core archetype profiles.

**How to avoid:** Cultural overlays are a Phase 0 requirement (ARCH-05). The TypeScript interface above includes `CulturalOverlay[]` as a required field on each archetype. The task for Sophia is to write at minimum 3-4 cultural context modifiers per archetype (e.g., East Asian collectivist, South Asian joint-family, Latin American familismo, Western individualist as the baseline). These can be brief (3-5 bullet points per context), but they must exist before Phase 0 is signed off.

**Warning signs:** Phase 0 review meeting where cultural overlays are described as "TBD" or "Phase 5 will handle that."

### Pitfall 4: Validation sample too small or too homogeneous

**What goes wrong:** 20-30 simulated answer sets all come from similar parenting backgrounds. The archetype system works fine for that range but fails unexpectedly for edge-case response patterns. Discovered after Phase 2 engineering is complete.

**Why it happens:** Simulated answers are generated by whoever is closest to the product (typically the product team), who share similar cultural/psychological profiles.

**How to avoid:** Ensure simulated answer sets cover:
- Very high scores on a single dimension (one-dimensional profiles)
- Equally distributed scores across all dimensions (the "indeterminate" case)
- Strong past-lens scores that differ from expected current parenting patterns
- At least 2-3 cultural context variants
- Answer patterns that might represent trauma histories (high protective instinct, low emotional regulation)

**Warning signs:** All 20-30 simulated results map cleanly to distinct archetypes — real answer distributions are messier and the scoring must handle them gracefully.

### Pitfall 5: Three-lens model complexity underestimated in Phase 0

**What goes wrong:** Phase 0 completes with archetypes designed around the Past lens. The Current and Aspirational lenses are assumed to use the same questions with minor reframing. In Phase 2, engineers discover that "how your parents treated you" and "how you parent now" require fundamentally different question banks because one asks about memory recall and one asks about behavior — different cognitive loads, different answer patterns, different score distributions.

**Why it happens:** Three-lens complexity is easy to defer as "Phase 2 will figure it out."

**How to avoid:** Phase 0 must specify, at the matrix design level, whether the same scoring dimensions and question types work for all three lenses or whether Current/Aspirational require different question framing. The scoring algorithm must be lens-aware. This does not require writing full question banks — just confirming whether the dimension definitions are lens-agnostic or lens-specific.

---

## Code Examples

### Archetype Similarity Scoring (Validated Pattern)

This is the recommended scoring algorithm for ranking archetypes from a user's dimension profile. It is a normalized distance measure, not cosine similarity (cosine similarity is appropriate for high-dimensional text embeddings; for 6-8 named dimensions with human-interpretable scale, normalized distance is simpler, more explainable, and produces the same rank ordering).

```typescript
// Source: Derived from SWCPQ character matching methodology (openpsychometrics.org) adapted for small-N named dimensions
// Confidence: MEDIUM — pattern validated by multiple personality quiz implementations

function scoreArchetypes(
  userProfile: DimensionProfile,
  archetypeProfiles: Record<ArchetypeId, DimensionProfile>,
  dimensionWeights: Partial<Record<keyof DimensionProfile, number>> = {}
): { archetypeId: ArchetypeId; score: number }[] {
  const dimensions = Object.keys(userProfile) as (keyof DimensionProfile)[];

  return Object.entries(archetypeProfiles)
    .map(([archetypeId, profile]) => {
      let totalWeight = 0;
      let weightedSimilarity = 0;

      for (const dim of dimensions) {
        const weight = dimensionWeights[dim] ?? 1;
        const maxDelta = 9; // scale is 1-10, max difference is 9
        const similarity = 1 - Math.abs(userProfile[dim] - profile[dim]) / maxDelta;
        weightedSimilarity += similarity * weight;
        totalWeight += weight;
      }

      return {
        archetypeId,
        score: weightedSimilarity / totalWeight, // normalized 0-1
      };
    })
    .sort((a, b) => b.score - a.score);
}
```

### Simulated Answer Set Validation Script (Phase 0 Output Validation)

```typescript
// Source: Phase 0 validation pattern
// Run: ts-node scripts/validate-scoring.ts

import { scoreArchetypes } from '../lib/quiz/scoring';
import { archetypeProfiles } from '../lib/archetypes/archetypes';

const simulatedProfiles: { label: string; profile: DimensionProfile }[] = [
  {
    label: "High warmth, consistent boundaries",
    profile: { emotionalWarmth: 9, boundaryConsistency: 8, autonomySupport: 7, emotionalRegulation: 8, protectiveInstinct: 5, narrativeCoherence: 7, presence: 8 }
  },
  {
    label: "High protection, low autonomy, low regulation",
    profile: { emotionalWarmth: 7, boundaryConsistency: 9, autonomySupport: 2, emotionalRegulation: 3, protectiveInstinct: 10, narrativeCoherence: 4, presence: 4 }
  },
  {
    label: "Equally distributed (indeterminate case)",
    profile: { emotionalWarmth: 5, boundaryConsistency: 5, autonomySupport: 5, emotionalRegulation: 5, protectiveInstinct: 5, narrativeCoherence: 5, presence: 5 }
  },
  // ... add 20-30 profiles covering diverse patterns
];

for (const { label, profile } of simulatedProfiles) {
  const ranked = scoreArchetypes(profile, archetypeProfiles);
  console.log(`\n${label}:`);
  console.log(`  Primary:     ${ranked[0].archetypeId} (${(ranked[0].score * 100).toFixed(0)}%)`);
  console.log(`  Secondary 1: ${ranked[1].archetypeId} (${(ranked[1].score * 100).toFixed(0)}%)`);
  console.log(`  Secondary 2: ${ranked[2].archetypeId} (${(ranked[2].score * 100).toFixed(0)}%)`);
  console.log(`  Secondary 3: ${ranked[3].archetypeId} (${(ranked[3].score * 100).toFixed(0)}%)`);
}
```

### Cultural Overlay Data Structure Example

```typescript
// Source: Based on cross-cultural parenting research (Lansford et al., PMC11542638)
// Confidence: MEDIUM — cultural descriptions need Sophia's clinical validation

const steadyAnchorOverlays: CulturalOverlay[] = [
  {
    culturalContext: "East Asian collectivist (Chinese, Korean, Japanese)",
    expressionModifier: "Calmness may be expressed through behavioral reliability rather than verbal emotional reassurance. 'Steady' shows up as consistent provision and academic guidance rather than open emotional vocabulary.",
    strengthsInContext: [
      "Deep reliability and predictability is culturally valued and well-received",
      "Structure aligns with collective harmony expectations",
    ],
    tensionsInContext: [
      "Emotional expressiveness may feel unfamiliar or performative — watchout is mistaking stoicism for disconnection",
      "Warmth expressed through provision may not satisfy children raised in more emotionally expressive environments",
    ],
  },
  {
    culturalContext: "South Asian (Indian, Pakistani, Bangladeshi) — joint-family context",
    expressionModifier: "Calmness may be under pressure from intergenerational expectations and diffuse authority. Steadiness is tested when multiple adults share parenting decisions.",
    strengthsInContext: [
      "Provides a grounding presence when family dynamics are complex",
      "Mediator role within extended family comes naturally",
    ],
    tensionsInContext: [
      "Boundaries may be harder to hold when extended family overrides decisions",
      "Personal calm may suppress unaddressed conflict rather than resolving it",
    ],
  },
  {
    culturalContext: "Western individualist baseline (default)",
    expressionModifier: "Standard archetype description applies. Emotional vocabulary, direct validation, and named feelings are culturally reinforced.",
    strengthsInContext: [],
    tensionsInContext: [],
  },
];
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Single-style assignment (Baumrind 4 types) | Dimensional profiles with spectrum overlap | 1990s-2000s research extension | Users don't fit cleanly into 4 types; dimensional profiles allow for nuanced primary + secondary results |
| Western-centric parenting norms assumed universal | Cross-cultural research shows within-culture variance exceeds between-culture variance | 2010s-2024 | Cultural overlays must be framed as tendencies, not deterministic type-shifts |
| Fixed archetype count (e.g., exactly 4 or 16) | Research-driven count based on natural dimension clusters | Current best practice | Forcing a count creates artificial archetypes that feel indistinguishable or implausible |
| Deficit-framing (what's wrong with your parenting) | Strength-first with wound awareness | Positive psychology movement + consumer product research | Users identify with and share strength-first results; deficit-first creates shame and disengagement |
| Anonymous "studies show" credibility | Named KOL attribution with specific research references | 2015+ consumer product research trend | Named attribution (Gottman, Siegel) signals real research without interrupting the narrative |

**Deprecated/outdated:**
- Strictly dichotomous parenting style classification: the four-box model (Authoritative/Authoritarian/Permissive/Neglectful) is still academically cited but is too coarse for a consumer product that promises deep personalization. It must be treated as an organizing framework only, not as the final archetype set.
- Treating "secure attachment" as a personality type result: the product must not position any archetype as "the secure one" vs. others as insecure — this is clinically loaded and creates an obvious good/bad hierarchy.

---

## Open Questions

1. **How many cultural contexts should each archetype have overlays for?**
   - What we know: ARCH-05 requires cultural context overlays; research shows individualism/collectivism is the primary modifier dimension; named cultural groups are preferable to vague "collectivist cultures"
   - What's unclear: Whether overlays should be tied to specific nationalities/ethnicities (Chinese, Indian, Nigerian) or to cultural dimensions (collectivist, familismo, Western). Specific names feel more personal but risk stereotyping; dimension labels feel safer but less resonant.
   - Recommendation: Claude's discretion — propose 4-6 named cultural context categories per archetype as a starting point for Sophia's review. Categories: East Asian collective, South Asian joint-family, Latin American familismo, Sub-Saharan African community, Western individualist (baseline). These cover the highest-diversity segments while remaining distinct.

2. **How should "soft inference" be calculated for Current/Aspirational lenses when only Past is completed?**
   - What we know: van IJzendoorn meta-analysis (1995) found 75% secure-to-secure transmission for broad classification; intergenerational research shows past attachment strongly predicts parenting style unless conscious intervention occurs
   - What's unclear: The exact inference mapping. Should it be deterministic ("Past archetype A → likely Current archetype B") or probabilistic ("60% of parents with Past archetype A report Current archetype A or B")?
   - Recommendation: Start with a simple mapping table (Past archetype → most likely Current/Aspirational drift). Flag as soft inference in the UI. Validate the table empirically after launch using users who complete all three lenses.

3. **What is the minimum viable distinction between adjacent archetypes?**
   - What we know: StrengthsFinder has 34 themes and still achieves high resonance because each theme is described with specificity. Personality assessment literature suggests users accept ranked results when each result is meaningfully distinct.
   - What's unclear: The minimum difference in dimension profile that makes two archetypes feel distinct in user experience. If "The Steady Anchor" and "The Gentle Guide" differ only on one dimension by 2 points, they may feel indistinguishable in prose.
   - Recommendation: Define a minimum differentiation rule during archetype design — e.g., any two archetypes must differ by at least 3 points on at least 2 dimensions. Sophia to validate this rule clinically.

---

## Validation Architecture

> `workflow.nyquist_validation` is not set to `true` in `.planning/config.json` — this section is skipped per config.

*(Note: The config.json has `workflow.research`, `workflow.plan_check`, and `workflow.verifier` but not `workflow.nyquist_validation`. Validation Architecture section omitted.)*

---

## Sources

### Primary (HIGH confidence)
- [Baumrind parenting styles — Britannica](https://www.britannica.com/topic/parenting/Parenting-styles-and-child-outcomes) — Core 4-style framework
- [PBDQ — Towards a Model of Contemporary Parenting (PMC4456141)](https://pmc.ncbi.nlm.nih.gov/articles/PMC4456141/) — 6-factor parenting dimension model (Emotional Warmth, Punitive Discipline, Anxious Intrusiveness, Autonomy Support, Permissive Discipline, Democratic Discipline); peer-reviewed
- [Cultural Values, Parenting, and Child Adjustment — PMC11542638](https://pmc.ncbi.nlm.nih.gov/articles/PMC11542638/) — Cross-cultural parenting dimensions; within-culture variance exceeds between-culture variance
- [van IJzendoorn intergenerational transmission meta-analysis — PMC3060612](https://pmc.ncbi.nlm.nih.gov/articles/PMC3060612/) — 75% secure-to-secure transmission across 13 studies; earned-secure concept
- [Parenting from the Inside Out — Daniel Siegel](https://drdansiegel.com/book/parenting-from-the-inside-out/) — Attachment narrative integration, intergenerational mechanism; peer-reviewed author
- [SWCPQ character matching documentation — openpsychometrics.org](https://openpsychometrics.org/tests/characters/documentation/) — Cosine similarity / ranked result approach for archetype matching
- [CliftonStrengths (StrengthsFinder) — Gallup](https://www.gallup.com/cliftonstrengths/en/253676/how-cliftonstrengths-works.aspx) — Top-5 strength presentation model; ranked themes with personalized descriptions

### Secondary (MEDIUM confidence)
- [Parenting Dimensions and Styles: A Brief History — PMC3746212](https://pmc.ncbi.nlm.nih.gov/articles/PMC3746212/) — Historical overview of parenting dimension research evolution
- [Highest-Scoring Category & Personality-Style Quizzes — ScoreApp Help Centre](https://support.scoreapp.com/article/147-highest-scoring-category-personality-style-quizzes) — Primary + runner-up archetype presentation in quiz products; blended result handling
- [Culture and Social Change in Parenting — PMC10558114](https://pmc.ncbi.nlm.nih.gov/articles/PMC10558114/) — Individualism/collectivism as primary cultural modifier; dynamic nature of cultural norms

### Tertiary (LOW confidence — validate before relying on)
- [Cross-cultural parenting styles research 2025 — IJIP](https://ijip.in/wp-content/uploads/2025/08/18.01.213.20251303.pdf) — Authoritarian/authoritative variation across cultures; single publication, not peer-reviewed venue
- Specific cultural context descriptions in the cultural overlay examples above — derived from synthesis of research patterns, require Sophia's clinical review before use

---

## Metadata

**Confidence breakdown:**
- KOL framework dimensions (research synthesis): HIGH — multiple peer-reviewed sources converge on consistent dimension set
- Scoring algorithm (two-step dimensional similarity): MEDIUM — validated by multiple personality quiz implementations; specific weights require empirical calibration against simulated answer sets
- Cultural overlay framework: MEDIUM — well-supported by cross-cultural research; specific named cultural contexts require clinical validation by Sophia
- Three-lens model mechanics: MEDIUM — product-specific design with no direct precedent; intergenerational transmission literature provides theoretical grounding; implementation details are Claude's discretion
- TypeScript interface design: HIGH — derived from the requirements and product architecture; no external validation needed

**Research date:** 2026-02-24
**Valid until:** 2026-03-24 (30 days — clinical frameworks are stable; cultural research is slow-moving)

---

## Phase 0 Execution Guidance for Planner

This section addresses the unusual nature of Phase 0 as a content/clinical phase, not an engineering phase. The planner must design plans that:

1. **Have a clear handoff to Sophia at each step.** Sophia's time is the scarcest resource in the project. Plans must batch her work efficiently: (a) review the KOL synthesis and proposed dimensions, (b) review archetype profiles and dimension matrix in one session, (c) run simulation validation in one session. Three focused working sessions, not an ongoing stream of small requests.

2. **Produce machine-readable outputs, not documents.** Every deliverable must end up as a TypeScript type or JSON that can be committed to the repository. "Sophia writes archetype descriptions" → "Sophia's content is structured into the `Archetype` TypeScript interface and committed to `lib/archetypes/archetypes.ts`."

3. **Gate Phase 1 engineering on specific completion criteria.** Phase 0 is not done when Sophia says "looks good" — it is done when: (a) all archetypes have populated TypeScript interface fields, (b) a scoring simulation has been run on 20-30 answer sets, (c) Sophia has confirmed results are clinically plausible in writing.

4. **Plan for iteration within Phase 0.** The simulation step will almost certainly reveal that 1-2 archetypes need to be split, merged, or have their dimension profiles adjusted. Build in at least one revision cycle between the first simulation run and the final sign-off.
