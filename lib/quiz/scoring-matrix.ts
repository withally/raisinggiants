/**
 * lib/quiz/scoring-matrix.ts
 *
 * Scoring algorithm and dimension weight matrix for the Kin
 * archetype framework.
 *
 * Implements the two-step scoring algorithm from RESEARCH.md:
 *
 *   Step 1: Quiz answers × question weights → user DimensionProfile
 *           (handled by the question bank in Phase 2 — not in this file)
 *
 *   Step 2: User DimensionProfile vs. archetype reference profiles →
 *           ranked ScoredArchetype list → 1 primary + 3 secondary result
 *           (implemented here)
 *
 * Algorithm: Normalized weighted similarity distance (NOT cosine similarity).
 * For each dimension: similarity = 1 - |user_val - archetype_val| / MAX_DELTA
 * where MAX_DELTA = 9 (scale is 1-10, max difference is 9).
 * Final score is the weighted mean across all 11 dimensions.
 *
 * Source: RESEARCH.md §Architecture Patterns — Pattern 1: Dimensional Scoring.
 * Adapted from SWCPQ character matching methodology (openpsychometrics.org).
 *
 * Exports: scoreArchetypes, getResult, softInferCurrentFromPast,
 *          ARCHETYPE_PROFILES, DIMENSION_WEIGHTS
 */

import type {
  ArchetypeId,
  DimensionProfile,
  LensResult,
} from '../archetypes/types';
import { DIMENSION_KEYS } from './dimensions';
import { ARCHETYPES } from '../archetypes/archetypes';

// ---------------------------------------------------------------------------
// Supporting types
// ---------------------------------------------------------------------------

/**
 * ScoredArchetype represents a single archetype's similarity score relative
 * to a user's dimension profile.
 *
 * Score is a 0-1 normalized value:
 *   1.0 = perfect match on every dimension
 *   0.0 = maximum distance on every dimension (impossible in practice)
 */
export interface ScoredArchetype {
  /** Archetype identifier matching an entry in ARCHETYPES. */
  archetypeId: ArchetypeId;
  /**
   * Weighted similarity score, 0-1 normalized.
   * Higher = more similar to the user's dimension profile.
   * No percentages are displayed to the user (StrengthsFinder model) —
   * this value is used for ranking only.
   */
  score: number;
}

/**
 * GetResultReturn is the output of getResult — the primary archetype plus
 * the three secondary archetypes in ranked order.
 */
export interface GetResultReturn {
  /** The top-ranked archetype (closest match). */
  primary: ArchetypeId;
  /**
   * The next three ranked archetypes, in descending similarity order.
   * Tuple of exactly 3 — a user always receives 3 secondary archetypes.
   */
  secondaries: [ArchetypeId, ArchetypeId, ArchetypeId];
}

// ---------------------------------------------------------------------------
// ARCHETYPE_PROFILES — lookup record for scoring
// ---------------------------------------------------------------------------

/**
 * ARCHETYPE_PROFILES is a Record<ArchetypeId, DimensionProfile> extracted from
 * the ARCHETYPES array. Provides direct O(1) lookup of reference dimension
 * profiles during scoring without iterating the full Archetype objects.
 *
 * Used by scoreArchetypes as the set of reference profiles to compare against.
 * Populated from ARCHETYPES at module initialization.
 */
export const ARCHETYPE_PROFILES: Record<ArchetypeId, DimensionProfile> =
  Object.fromEntries(
    ARCHETYPES.map((archetype) => [archetype.id, archetype.dimensionProfile])
  );

// ---------------------------------------------------------------------------
// DIMENSION_WEIGHTS — relative importance weights per dimension
// ---------------------------------------------------------------------------

/**
 * DIMENSION_WEIGHTS assigns a relative importance multiplier to each scoring
 * dimension. All defaults are 1.0 (equal weighting).
 *
 * Sophia may adjust these weights during the Plan 03 scoring simulation to
 * improve archetype discrimination — for example, if simulated answer sets
 * reveal that the Narrative Coherence dimension needs to count more heavily
 * to produce clinically meaningful rankings.
 *
 * Design note: Narrative Coherence may deserve a higher weight (1.5–2.0)
 * because it is the dimension most directly tied to the three-lens model and
 * the product's core IP (intergenerational transmission mechanism). However,
 * this requires empirical validation against simulated answer sets before
 * any weight is changed from the default.
 *
 * Weight semantics: A dimension with weight 2.0 counts twice as much as a
 * dimension with weight 1.0 in the final similarity score. Weights are
 * normalized by total weight so the final score remains in the 0-1 range.
 */
export const DIMENSION_WEIGHTS: Partial<Record<string, number>> = {
  'emotional-warmth': 1.0,
  'boundary-consistency': 1.0,
  'autonomy-support': 1.0,
  'emotional-regulation': 1.0,
  'protective-instinct': 1.0,
  // Narrative Coherence: default weight 1.0. Consider raising to 1.5-2.0
  // after scoring simulation (Plan 03) if it improves archetype discrimination.
  // Rationale: this is the dimension most directly tied to the intergenerational
  // transmission mechanism — the product's core clinical IP.
  'narrative-coherence': 1.0,
  'presence-attunement': 1.0,
  'repair-reconnection': 1.0,
  'role-integrity': 1.0,
  'reciprocity': 1.0,
  'nonjudgmental-acceptance': 1.0,
};

// ---------------------------------------------------------------------------
// MAX_DELTA constant
// ---------------------------------------------------------------------------

/**
 * MAX_DELTA is the maximum possible absolute difference between two values
 * on the 1-10 scoring scale (10 - 1 = 9).
 *
 * Used in the similarity formula:
 *   similarity = 1 - |user_val - archetype_val| / MAX_DELTA
 *
 * A delta of 0 → similarity = 1.0 (perfect match on this dimension)
 * A delta of 9 → similarity = 0.0 (maximum possible distance)
 */
const MAX_DELTA = 9;

// ---------------------------------------------------------------------------
// scoreArchetypes — core scoring function
// ---------------------------------------------------------------------------

/**
 * scoreArchetypes computes a ranked list of all archetypes ordered by their
 * weighted similarity to the provided user dimension profile.
 *
 * **Algorithm:**
 * For each archetype, compute weighted similarity:
 *   1. For each dimension key:
 *      - similarity_i = 1 - |user_val_i - archetype_val_i| / MAX_DELTA
 *      - weighted_similarity_i = similarity_i × weight_i
 *   2. total_score = sum(weighted_similarity_i) / sum(weight_i)
 *      (normalizing by total weight keeps the final score in 0-1 range
 *      regardless of the number of dimensions or weight values)
 *
 * This is a normalized distance measure, NOT cosine similarity. Cosine
 * similarity is appropriate for high-dimensional text embeddings. For
 * 11 named dimensions with human-interpretable 1-10 scales, normalized
 * distance is simpler, more explainable, and produces equivalent rank
 * ordering. See RESEARCH.md §Architecture Patterns for full rationale.
 *
 * @param userProfile - The user's scored DimensionProfile (all dimensions 1-10).
 * @param weights - Optional weight overrides. Merged with DIMENSION_WEIGHTS;
 *   omitted dimensions fall back to DIMENSION_WEIGHTS or 1.0.
 * @returns Array of ScoredArchetype sorted descending by score (best match first).
 */
export function scoreArchetypes(
  userProfile: DimensionProfile,
  weights?: Partial<Record<string, number>>
): ScoredArchetype[] {
  const resolvedWeights = {
    ...DIMENSION_WEIGHTS,
    ...(weights ?? {}),
  };

  const scored: ScoredArchetype[] = Object.entries(ARCHETYPE_PROFILES).map(
    ([archetypeId, archetypeProfile]) => {
      let weightedSimilaritySum = 0;
      let totalWeight = 0;

      for (const key of DIMENSION_KEYS) {
        const userVal = userProfile[key] ?? 5; // default to midpoint if dimension missing
        const archetypeVal = archetypeProfile[key] ?? 5;
        const weight = resolvedWeights[key] ?? 1.0;

        const similarity = 1 - Math.abs(userVal - archetypeVal) / MAX_DELTA;
        weightedSimilaritySum += similarity * weight;
        totalWeight += weight;
      }

      const score = totalWeight > 0 ? weightedSimilaritySum / totalWeight : 0;

      return { archetypeId, score };
    }
  );

  // Sort descending: highest similarity first
  return scored.sort((a, b) => b.score - a.score);
}

// ---------------------------------------------------------------------------
// getResult — convenience function for 1 primary + 3 secondary
// ---------------------------------------------------------------------------

/**
 * getResult returns the top-4 ranked archetypes in the 1-primary + 3-secondary
 * format per the product's StrengthsFinder-style result presentation.
 *
 * This is the function consumed by Phase 2 quiz scoring and Phase 3 result
 * display. It wraps scoreArchetypes and extracts the top-4 into the typed
 * GetResultReturn shape.
 *
 * @param userProfile - The user's scored DimensionProfile.
 * @param weights - Optional dimension weight overrides (passed through to scoreArchetypes).
 * @returns GetResultReturn with primary and exactly 3 secondaries.
 * @throws Error if fewer than 4 archetypes are defined (should never happen in practice).
 */
export function getResult(
  userProfile: DimensionProfile,
  weights?: Partial<Record<string, number>>
): GetResultReturn {
  const ranked = scoreArchetypes(userProfile, weights);

  if (ranked.length < 4) {
    throw new Error(
      `getResult requires at least 4 archetypes to produce 1 primary + 3 secondary results. ` +
      `Only ${ranked.length} archetypes are defined. Add more archetypes to ARCHETYPES in lib/archetypes/archetypes.ts.`
    );
  }

  return {
    primary: ranked[0].archetypeId,
    secondaries: [
      ranked[1].archetypeId,
      ranked[2].archetypeId,
      ranked[3].archetypeId,
    ],
  };
}

// ---------------------------------------------------------------------------
// softInferCurrentFromPast — soft inference stub for three-lens model
// ---------------------------------------------------------------------------

/**
 * softInferCurrentFromPast derives an inferred Current and Aspirational lens
 * result from a completed Past lens result, for users who only complete the
 * Past lens quiz.
 *
 * **Current implementation (stub):**
 * Returns the same archetype ranking as the Past lens result with
 * `isSoftInference: true` and `completedAt: null`.
 *
 * This assumes direct intergenerational transmission — the default null
 * hypothesis that a parent's current parenting patterns closely mirror the
 * patterns they experienced in childhood, unless conscious work has intervened.
 *
 * **Research basis for the stub:**
 * Van IJzendoorn meta-analysis (1995) found ~75% secure-to-secure transmission
 * across 13 studies, meaning direct pattern transmission is the best single
 * prediction when no other data is available. Siegel & Hartzell (2003)
 * document how unresolved narrative (low Narrative Coherence) specifically
 * increases pattern repetition risk.
 *
 * **TODO: Replace with empirical mapping table after launch data collection.**
 * The correct implementation is a weighted probability distribution over
 * archetype shifts, calibrated from users who complete all three lenses.
 * Current implementation assumes intergenerational transmission (van IJzendoorn
 * 75% secure-secure transmission). Actual current/aspirational distributions
 * will differ — Resilient Strivers (high NC) likely show the largest current-vs-past
 * divergence; Fierce Guardians and Open-Hearted Learners may show the least
 * divergence (lower NC suggests less conscious pattern-breaking).
 *
 * The UI must clearly communicate inferred results:
 * "Based on parents with similar upbringings, you may find yourself
 * gravitating toward [archetype] tendencies — but only a completed quiz
 * can confirm this for you specifically."
 *
 * @param pastResult - The completed Past lens result (archetypeRanking must
 *   contain at least 4 entries for a valid 1+3 result).
 * @returns A tuple of [currentLensResult, aspirationalLensResult], both
 *   soft-inferred from the past result.
 */
export function softInferCurrentFromPast(
  pastResult: Pick<LensResult, 'archetypeRanking'>
): [currentLensResult: LensResult, aspirationalLensResult: LensResult] {
  // TODO: Replace with empirical mapping table after launch data collection.
  // Current implementation assumes intergenerational transmission
  // (van IJzendoorn 75% secure-secure transmission). Real current and
  // aspirational archetype distributions will differ meaningfully from past
  // distributions — this stub is a placeholder that always returns the same
  // archetype ranking as the past lens.
  //
  // Future implementation should:
  // 1. Load an empirically calibrated transition matrix
  //    (Past ArchetypeId → probabilities over Current ArchetypeIds)
  // 2. Return the most probable current/aspirational archetype ranking
  // 3. Include a confidence score so the UI can adjust the inference framing

  const currentLensResult: LensResult = {
    lens: 'current',
    archetypeRanking: [...pastResult.archetypeRanking],
    completedAt: null,
    isSoftInference: true,
  };

  const aspirationalLensResult: LensResult = {
    lens: 'aspirational',
    archetypeRanking: [...pastResult.archetypeRanking],
    completedAt: null,
    isSoftInference: true,
  };

  return [currentLensResult, aspirationalLensResult];
}
