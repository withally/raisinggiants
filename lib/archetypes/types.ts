/**
 * lib/archetypes/types.ts
 *
 * TypeScript type contracts for the Kin archetype framework.
 *
 * These interfaces define the complete data shape for all Phase 0 outputs.
 * Every downstream artifact — archetype profiles, scoring matrix, AI prompts,
 * PDF generation, and cultural overlays — consumes these types. Do not add
 * runtime values here; this file is types only.
 *
 * Design decisions baked into these types:
 * - DimensionProfile uses Record<DimensionKey, number> so adding or removing
 *   dimensions does not require interface changes.
 * - Results surface 1 primary + 3 secondary archetypes (StrengthsFinder model),
 *   no percentages — archetypeRanking is an ordered array.
 * - The three-lens model (Past/Current/Aspirational) is first-class: each lens
 *   produces its own LensResult; the gap between lenses is the personal story.
 * - Strength-first framing: foundationalPatterns always precedes watchouts.
 * - Names reference the current parenting style, not childhood origin.
 */

// ---------------------------------------------------------------------------
// Primitive / alias types
// ---------------------------------------------------------------------------

/**
 * ArchetypeId is a kebab-case string literal identifying a single archetype.
 * Examples: "steady-anchor", "fierce-protector", "gentle-guide".
 * Kept as a plain string (not a union) so the set can be extended without
 * touching this file.
 */
export type ArchetypeId = string;

/**
 * DimensionKey is a kebab-case string literal identifying a scoring dimension.
 * Examples: "emotional-warmth", "boundary-consistency", "narrative-coherence".
 * Kept as a plain string so dimensions can be added without a type change.
 */
export type DimensionKey = string;

// ---------------------------------------------------------------------------
// Archetype types
// ---------------------------------------------------------------------------

/**
 * DimensionProfile maps every scoring dimension to a 1-10 value representing
 * where this archetype (or user) typically sits on that dimension.
 *
 * Using Record<DimensionKey, number> rather than named fields means the
 * dimension set can evolve (add, rename, remove) without breaking this type
 * or any code that consumes it structurally.
 *
 * Scale: 1 = dimension is barely expressed; 10 = dimension is maximally expressed.
 */
export type DimensionProfile = Record<DimensionKey, number>;

/**
 * Citation represents a single research reference supporting a claim within
 * an archetype's content. Citations are collected at the bottom of content
 * sections — never inline — to maintain the warm, conversational voice.
 */
export interface Citation {
  /** Full name of the researcher or institutional author. */
  researcher: string;
  /** Title of the book, paper, or validated instrument. */
  workTitle: string;
  /** Publication or study year. */
  year: number;
  /**
   * Brief note (1-2 sentences) explaining how this work is relevant to the
   * archetype or dimension it supports.
   */
  relevanceNote: string;
}

/**
 * ArchetypeContent is a structured content outline for a single content section
 * within an archetype (either foundationalPatterns or watchouts).
 *
 * Phase 0 produces outlines only — not full prose. AI fills in personalized
 * prose in Phase 5. Sophia validates the outline structure before prose work begins.
 */
export interface ArchetypeContent {
  /** One-sentence anchor that frames the entire section. */
  headline: string;
  /**
   * 3-5 key themes expressed as concise bullet-form phrases.
   * These are the outline stage — enough for Sophia to validate clinical
   * accuracy before AI expands them into personalized paragraphs.
   */
  themes: string[];
  /**
   * One sentence linking this section's content back to a specific KOL
   * framework (e.g., "Siegel's concept of mindsight explains why...").
   * Grounds the content in credible research without mid-sentence name-dropping.
   */
  researchAnchor: string;
  /** Full citation list for this section. Rendered at the bottom of the section. */
  citations: Citation[];
}

/**
 * CulturalOverlay describes how a specific cultural context modifies the way an
 * archetype is expressed, what gets amplified, and what tensions become more
 * pronounced.
 *
 * Overlays are modifiers, not alternative archetypes. A "Fierce Protector"
 * within an East Asian collectivist context is still a Fierce Protector —
 * the protective instinct manifests through family honor and academic pressure
 * rather than physical vigilance. Same archetype, different expression.
 *
 * Based on: Lansford et al. cross-cultural parenting research (PMC11542638).
 * Within-culture variance exceeds between-culture variance, so overlays must
 * be framed as tendencies, not deterministic shifts.
 */
export interface CulturalOverlay {
  /**
   * Named cultural context this overlay applies to.
   * Examples: "East Asian collectivist (Chinese, Korean, Japanese)",
   * "South Asian joint-family (Indian, Pakistani, Bangladeshi)",
   * "Latin American familismo", "Sub-Saharan African community-centred",
   * "Western individualist (baseline)".
   */
  culturalContext: string;
  /**
   * How the archetype's core tendencies manifest differently within this
   * cultural context. 2-4 sentences describing the surface-level expression shift.
   */
  expressionModifier: string;
  /**
   * Archetype strengths that are amplified or particularly well-received in
   * this cultural context.
   */
  strengthsInContext: string[];
  /**
   * Archetype watchouts that are more pronounced or carry additional risk in
   * this cultural context.
   */
  tensionsInContext: string[];
}

/**
 * Archetype is the complete definition of a single parenting archetype.
 *
 * Archetypes are built from KOL research (not invented from scratch) and
 * defined as profiles across the scoring dimensions. Every archetype must
 * have genuine strengths AND genuine watchouts — no archetype should feel
 * obviously better or worse than the others.
 *
 * Naming convention: warm and descriptive names reflecting the current
 * parenting style (e.g., "The Steady Anchor"), never clinical diagnoses.
 * Each name must pass the test: "Would a parent proudly share this result?"
 */
export interface Archetype {
  /**
   * Unique kebab-case identifier used in scoring, data lookups, and URLs.
   * Example: "steady-anchor"
   */
  id: ArchetypeId;
  /**
   * Warm, descriptive name for public display.
   * Example: "The Steady Anchor"
   */
  name: string;
  /**
   * One-liner shareable tagline — the phrase a parent would quote when
   * telling someone about their result.
   * Example: "Your calm is your children's foundation."
   */
  tagline: string;
  /**
   * The scoring fingerprint for this archetype: the reference DimensionProfile
   * that user scores are compared against when ranking archetypes. Populated
   * by Sophia's clinical review and validated against simulated answer sets.
   */
  dimensionProfile: DimensionProfile;
  /**
   * Strength-first content section describing the positive, foundational
   * tendencies of this parenting style. Always precedes watchouts.
   * (ARCH-03)
   */
  foundationalPatterns: ArchetypeContent;
  /**
   * Content section describing the shadow patterns — the risks and watchouts
   * a parent with this archetype should be aware of. Framed with normalization,
   * not pathologizing: "when stressed, you might find yourself..."
   * (ARCH-04)
   */
  watchouts: ArchetypeContent;
  /**
   * Cultural context overlays describing how this archetype expresses itself
   * differently across cultural backgrounds. Minimum 3-4 contexts per archetype.
   * (ARCH-05)
   */
  culturalOverlays: CulturalOverlay[];
}

// ---------------------------------------------------------------------------
// Scoring matrix types
// ---------------------------------------------------------------------------

/**
 * DimensionDefinition contains all metadata for a single scoring dimension.
 *
 * Dimensions are the intermediate layer between quiz answers and archetype results.
 * Every quiz question contributes weighted scores to one or more dimensions.
 * User dimension scores are then compared against archetype reference profiles
 * to produce a ranked archetype result.
 */
export interface DimensionDefinition {
  /**
   * Kebab-case identifier matching the key used in DimensionProfile records.
   * Example: "emotional-warmth"
   */
  key: DimensionKey;
  /** Human-readable name for internal documentation and Sophia's review. */
  name: string;
  /** 2-3 sentence description of what this dimension measures clinically. */
  description: string;
  /**
   * What a low score (1-3) on this dimension looks like in a parent's behavior.
   * Example: "Emotionally reserved; affection expressed through action rather than words."
   */
  lowLabel: string;
  /**
   * What a high score (8-10) on this dimension looks like in a parent's behavior.
   * Example: "Openly affectionate; verbally expressive of love and consistent validation."
   */
  highLabel: string;
  /**
   * Named KOL frameworks and researchers this dimension derives from.
   * Example: ["Baumrind responsiveness", "Gottman emotional coaching", "PBDQ factor 1"]
   */
  researchAnchors: string[];
  /**
   * 2-3 candidate quiz question ideas that would measure this dimension.
   * Required to validate that the dimension survives quiz translation —
   * if no natural question can be written without feeling clinical or leading,
   * the dimension may need to be operationalized differently.
   */
  candidateQuestions: string[];
  /**
   * Brief note on whether and how this dimension measures differently across
   * Past / Current / Aspirational lenses. For example, "Narrative Coherence"
   * only applies to the Past lens; "Emotional Warmth" applies to all three but
   * Past questions invoke memory while Current questions invoke behavior.
   */
  lensNotes: string;
}

/**
 * ScoringMatrix is the complete data structure for the two-step scoring algorithm:
 * 1. Quiz answers → dimension scores (handled by question bank with weights)
 * 2. User dimension profile → archetype ranking (handled by this matrix)
 *
 * The archetypeProfiles record provides the reference fingerprint for each archetype
 * so the scoring algorithm can compute similarity scores and rank results.
 */
export interface ScoringMatrix {
  /** All dimension definitions, in the order they appear in dimension profiles. */
  dimensions: DimensionDefinition[];
  /**
   * Reference dimension profiles per archetype — the "ideal" dimension fingerprint
   * for each archetype that user scores are compared against.
   * Key: ArchetypeId, Value: reference DimensionProfile with 1-10 scores per dimension.
   */
  archetypeProfiles: Record<ArchetypeId, DimensionProfile>;
}

// ---------------------------------------------------------------------------
// Three-lens result types
// ---------------------------------------------------------------------------

/**
 * LensResult represents the archetype ranking produced by one quiz lens.
 *
 * The three lenses are: Past (how you were raised), Current (how you parent now),
 * and Aspirational (how you want to parent). Past is the core quiz everyone
 * completes; Current and Aspirational are opt-in continuations.
 *
 * When only Past is completed, Current and Aspirational are soft-inferred from
 * the intergenerational transmission research (van IJzendoorn 1995 meta-analysis:
 * ~75% secure-to-secure transmission). Soft inferences are clearly flagged and
 * framed as tendencies, never as definitive results.
 */
export interface LensResult {
  /** Which quiz lens this result comes from. */
  lens: 'past' | 'current' | 'aspirational';
  /**
   * Ordered array of ArchetypeIds from highest to lowest similarity score.
   * Index 0 = primary archetype; indices 1-3 = secondary archetypes.
   * No percentages are surfaced — ranked presence, StrengthsFinder style.
   */
  archetypeRanking: ArchetypeId[];
  /**
   * When the quiz for this lens was actually completed.
   * null if this result is a soft inference from another lens.
   */
  completedAt: Date | null;
  /**
   * true when this result was derived via soft inference rather than direct
   * quiz completion. Downstream UI must clearly communicate inferred results
   * differently from completed results.
   */
  isSoftInference: boolean;
}

/**
 * FullResult is the top-level structure returned after a user completes the quiz.
 *
 * Contains all three lens results (some may be soft inferences) plus a narrative
 * string that describes the arc — the story of where the parent came from, where
 * they are now, and where they want to go. The movement between lenses IS the
 * personal story; the gap between past and current shows what has already changed,
 * and the gap between current and aspirational shows where to grow.
 */
export interface FullResult {
  /** Result from the Past lens (how you were raised). Always directly scored. */
  past: LensResult;
  /**
   * Result from the Current lens (how you parent now).
   * May be a soft inference if the user did not complete the Current lens quiz.
   */
  current: LensResult;
  /**
   * Result from the Aspirational lens (how you want to parent).
   * May be a soft inference if the user did not complete the Aspirational lens quiz.
   */
  aspirational: LensResult;
  /**
   * AI-generated narrative string describing the arc between the three lens results.
   * Populated in Phase 5. Examples: "You've already moved from X toward Y —
   * the gap you're now working to close is..."
   * This is the core personalization hook that makes the full PDF feel specific.
   */
  narrative: string;
}
