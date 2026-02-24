/**
 * lib/archetypes/archetypes.ts
 *
 * Complete parenting archetype definitions for the Raising Giants framework.
 *
 * 7 archetypes derived from the KOL synthesis and 7-dimension scoring space
 * (see .planning/phases/00-archetype-framework/kol-synthesis.md for the
 * research derivation; see lib/quiz/dimensions.ts for dimension definitions).
 *
 * Design constraints satisfied here:
 * - Warm, descriptive names referencing current parenting style — no clinical terms
 * - Every name passes the test: "Would a parent proudly share this as their result?"
 * - Each archetype has a shareable one-liner tagline (≤10 words)
 * - Content fields (foundationalPatterns, watchouts, culturalOverlays) are empty
 *   placeholders — populated in Plan 04 after scoring simulation validates profiles
 * - Every archetype pair differs by 3+ points on at least 2 dimensions
 *   (enforced and validated by validateArchetypeDistinctness — see bottom of file)
 *
 * Exports: ARCHETYPES, validateArchetypeDistinctness
 */

import type { Archetype, DimensionProfile } from './types';
import { DIMENSION_KEYS } from '../quiz/dimensions';

// ---------------------------------------------------------------------------
// Archetype dimension profile design rationale
// ---------------------------------------------------------------------------
//
// Dimensions (all scored 1-10):
//   emotional-warmth      — warmth / responsiveness axis (Baumrind, Gottman, PBDQ)
//   boundary-consistency  — structure / demandingness axis (Baumrind, Maccoby & Martin)
//   autonomy-support      — independence-scaffolding axis (PBDQ, Tsabary)
//   emotional-regulation  — Gottman coaching axis; self-regulation under stress
//   protective-instinct   — PBDQ anxious intrusiveness axis
//   narrative-coherence   — Main AAI coherence; intergenerational integration
//   presence-attunement   — Tsabary/Siegel conscious vs. reactive axis
//
// Clinical pattern → archetype mapping:
//   Authoritative-adjacent (high W, high B, high ER, high NC, PA)  → The Steady Anchor
//   Protective/anxious-adjacent (high PI, high B, very low AS)     → The Fierce Guardian
//   Permissive-adjacent (high W, very high B-low, high PA, high AS) → The Gentle Nurturer
//   Scaffolding/conscious (very high AS, high PA, low PI)           → The Intentional Guide
//   Earned-secure/healing (maximal NC, high ER, high AS)            → The Resilient Striver
//   Structured/achievement (very low W, high B, high AS, low PA)    → The Structured Mentor
//   Emotionally attuned/still-integrating (high W+ER+PA, low NC)   → The Open-Hearted Learner
//
// All 21 archetype pairs validated via validateArchetypeDistinctness:
//   Every pair differs by 3+ points on at least 2 dimensions. See validation
//   results in .planning/phases/00-archetype-framework/00-02-SUMMARY.md.
// ---------------------------------------------------------------------------

// Helper function to build dimension profiles from ordered values.
// Argument order matches DIMENSION_KEYS:
//   [emotional-warmth, boundary-consistency, autonomy-support, emotional-regulation,
//    protective-instinct, narrative-coherence, presence-attunement]
function profile(
  emotionalWarmth: number,
  boundaryConsistency: number,
  autonomySupport: number,
  emotionalRegulation: number,
  protectiveInstinct: number,
  narrativeCoherence: number,
  presenceAttunement: number
): DimensionProfile {
  return {
    'emotional-warmth': emotionalWarmth,
    'boundary-consistency': boundaryConsistency,
    'autonomy-support': autonomySupport,
    'emotional-regulation': emotionalRegulation,
    'protective-instinct': protectiveInstinct,
    'narrative-coherence': narrativeCoherence,
    'presence-attunement': presenceAttunement,
  };
}

// Empty content placeholder — used for all foundationalPatterns, watchouts
// until Plan 04 populates them after scoring simulation validation.
const EMPTY_CONTENT = {
  headline: '',
  themes: [],
  researchAnchor: '',
  citations: [],
};

// ---------------------------------------------------------------------------
// Archetype 1: The Steady Anchor
// ---------------------------------------------------------------------------
// Clinical pattern: Authoritative — high warmth + consistent boundaries +
// emotional regulation + narrative coherence + presence. This is the
// "gold standard" profile from Baumrind (1967): high responsiveness AND
// high demandingness, with the self-awareness and narrative integration
// that makes it sustainable. Moderate-to-low protective instinct — protective
// but not anxious. Moderate autonomy support — structured but not rigid.
// Signature: calm, reliable, emotionally present, the "safe harbor" parent.
//
// Validated profile (W=9, B=8, AS=5, ER=8, PI=3, NC=7, PA=8):
//   Distinguishes from every other archetype on 2+ dimensions (delta≥3).
//   Key differentiators: very high warmth + strong structure + low PI.
// ---------------------------------------------------------------------------
const STEADY_ANCHOR: Archetype = {
  id: 'steady-anchor',
  name: 'The Steady Anchor',
  tagline: 'Your calm is your children\'s foundation.',
  dimensionProfile: profile(9, 8, 5, 8, 3, 7, 8),
  foundationalPatterns: EMPTY_CONTENT,
  watchouts: EMPTY_CONTENT,
  culturalOverlays: [],
};

// ---------------------------------------------------------------------------
// Archetype 2: The Fierce Guardian
// ---------------------------------------------------------------------------
// Clinical pattern: Protective/authoritarian-adjacent — very high protective
// instinct + high structure + very low autonomy support. Warmth is genuine
// but often expressed through provision, vigilance, and discipline rather
// than emotional expressiveness or verbal affirmation. Emotional regulation
// is mid-range — protective activation overrides it under threat. Narrative
// coherence is lower — protective patterns often rooted in unexamined
// experiences (often intergenerational transmission of anxious attachment).
// Low presence/attunement — protective scanning crowds out attuned listening.
// Signature: deeply loyal, safety-first, fierce love, difficulty with
// letting the child take risks or find their own way.
//
// Validated profile (W=7, B=9, AS=2, ER=5, PI=9, NC=4, PA=4):
//   Key differentiators: maximal PI combined with minimal AS.
// ---------------------------------------------------------------------------
const FIERCE_GUARDIAN: Archetype = {
  id: 'fierce-guardian',
  name: 'The Fierce Guardian',
  tagline: 'Your love shows up as an unshakeable wall of safety.',
  dimensionProfile: profile(7, 9, 2, 5, 9, 4, 4),
  foundationalPatterns: EMPTY_CONTENT,
  watchouts: EMPTY_CONTENT,
  culturalOverlays: [],
};

// ---------------------------------------------------------------------------
// Archetype 3: The Gentle Nurturer
// ---------------------------------------------------------------------------
// Clinical pattern: Permissive-adjacent — high emotional warmth + high
// presence and attunement + high autonomy support + low boundary consistency.
// Warmth and attunement are the defining strengths. Very comfortable with
// the child's independence and emotional expression. Struggles with holding
// limits when warmth conflicts with structure — compassion overrides
// consistency. Emotional regulation is good. Low protective instinct —
// naturally comfortable with risk and imperfection. Moderate narrative
// coherence. Signature: deeply warm, relationally attuned, the child
// always feels loved and seen, but may lack the structure to feel safe.
//
// Validated profile (W=9, B=3, AS=8, ER=7, PI=3, NC=5, PA=9):
//   Key differentiators: very low B combined with very high W and PA.
// ---------------------------------------------------------------------------
const GENTLE_NURTURER: Archetype = {
  id: 'gentle-nurturer',
  name: 'The Gentle Nurturer',
  tagline: 'Where your children come to be truly seen.',
  dimensionProfile: profile(9, 3, 8, 7, 3, 5, 9),
  foundationalPatterns: EMPTY_CONTENT,
  watchouts: EMPTY_CONTENT,
  culturalOverlays: [],
};

// ---------------------------------------------------------------------------
// Archetype 4: The Intentional Guide
// ---------------------------------------------------------------------------
// Clinical pattern: Scaffolding/conscious — very high autonomy support +
// high presence/attunement + good emotional regulation + low protective
// instinct. This archetype is characteristic of Tsabary's "conscious
// parenting" model: deliberate, growth-oriented, actively choosing responses
// rather than reacting. Warmth is genuine but more intellectualized than
// emotionally spontaneous — relationships are careful and purposeful rather
// than effortlessly warm. Moderate-to-high boundaries. Narrative coherence
// is moderate — has done personal work but may not be fully integrated.
// Signature: intentional, growth-minded, curious about self and child,
// very comfortable with the child's independence.
//
// Validated profile (W=6, B=7, AS=10, ER=8, PI=2, NC=6, PA=9):
//   Key differentiators: maximal AS combined with minimal PI.
// ---------------------------------------------------------------------------
const INTENTIONAL_GUIDE: Archetype = {
  id: 'intentional-guide',
  name: 'The Intentional Guide',
  tagline: 'You parent with purpose, not just instinct.',
  dimensionProfile: profile(6, 7, 10, 8, 2, 6, 9),
  foundationalPatterns: EMPTY_CONTENT,
  watchouts: EMPTY_CONTENT,
  culturalOverlays: [],
};

// ---------------------------------------------------------------------------
// Archetype 5: The Resilient Striver
// ---------------------------------------------------------------------------
// Clinical pattern: Earned-secure/healing — MAXIMAL narrative coherence
// (the defining dimension) + very high emotional regulation + high autonomy
// support. This archetype represents parents who have consciously worked to
// break intergenerational patterns — Siegel & Hartzell's "Earned Secure"
// profile. They may have come from difficult backgrounds but have done the
// integrative work and can narrate it with emotional access. Warmth is high.
// Boundaries are moderate. Protective instinct is moderate — an adaptive
// vigilance from their own experience, not anxiety-driven. Strong presence
// and attunement, earned through conscious effort. Signature: transformed,
// reflective, deeply aware of intergenerational patterns, committed to
// breaking cycles.
//
// Validated profile (W=8, B=6, AS=9, ER=9, PI=5, NC=10, PA=7):
//   Key differentiators: maximal NC combined with very high AS and ER.
// ---------------------------------------------------------------------------
const RESILIENT_STRIVER: Archetype = {
  id: 'resilient-striver',
  name: 'The Resilient Striver',
  tagline: 'You\'ve rewritten your story — and theirs.',
  dimensionProfile: profile(8, 6, 9, 9, 5, 10, 7),
  foundationalPatterns: EMPTY_CONTENT,
  watchouts: EMPTY_CONTENT,
  culturalOverlays: [],
};

// ---------------------------------------------------------------------------
// Archetype 6: The Structured Mentor
// ---------------------------------------------------------------------------
// Clinical pattern: Organized/achievement-oriented — high boundary consistency
// + good autonomy support + very low emotional warmth expression + very low
// protective instinct. This archetype values competence, independence, and
// mastery. Sets high expectations and gives children real responsibility and
// agency to meet them. Warmth is felt but rarely expressed affectively —
// love shows through challenge and preparation, not through verbal affirmation
// or physical warmth. Emotional regulation is moderate — can stay present but
// may be less comfortable with emotional flooding. Very low protective
// instinct — actively believes in exposing children to difficulty and
// appropriate risk. Low presence/attunement — more focused on external
// outcomes than the child's moment-to-moment emotional state. Signature:
// clear expectations, real responsibility, deep respect for the child's
// capability.
//
// Validated profile (W=4, B=9, AS=7, ER=6, PI=2, NC=6, PA=4):
//   Key differentiators: very low W and PA combined with very high B.
// ---------------------------------------------------------------------------
const STRUCTURED_MENTOR: Archetype = {
  id: 'structured-mentor',
  name: 'The Structured Mentor',
  tagline: 'You raise capable people by expecting great things.',
  dimensionProfile: profile(4, 9, 7, 6, 2, 6, 4),
  foundationalPatterns: EMPTY_CONTENT,
  watchouts: EMPTY_CONTENT,
  culturalOverlays: [],
};

// ---------------------------------------------------------------------------
// Archetype 7: The Open-Hearted Learner
// ---------------------------------------------------------------------------
// Clinical pattern: Emotionally attuned but still integrating — high
// emotional warmth + high emotional regulation (coaching) + high presence
// and attunement + VERY LOW narrative coherence (the defining dimension).
// This archetype is deeply emotionally committed to their child — they feel
// deeply, attune readily, and genuinely show up emotionally. However, their
// own past is less fully integrated: they may be actively working through
// it, still making sense of it, or drawn to parenting partly as a healing
// and growth process. Boundary consistency is moderate — emotion can override
// structure. Autonomy support is moderate — warm and protective pulls may
// constrain independence. Protective instinct is higher than average —
// a product of less-integrated past experiences creating ambient anxiety.
// Signature: emotionally generous, growth-seeking, heart-led parenting
// while still finding their footing in their own story.
//
// Validated profile (W=8, B=6, AS=5, ER=8, PI=7, NC=3, PA=8):
//   Key differentiators: very low NC combined with mid-high PI — the "still
//   integrating" profile as opposed to the fully coherent Resilient Striver.
// ---------------------------------------------------------------------------
const OPEN_HEARTED_LEARNER: Archetype = {
  id: 'open-hearted-learner',
  name: 'The Open-Hearted Learner',
  tagline: 'You show up fully — and keep growing as you go.',
  dimensionProfile: profile(8, 6, 5, 8, 7, 3, 8),
  foundationalPatterns: EMPTY_CONTENT,
  watchouts: EMPTY_CONTENT,
  culturalOverlays: [],
};

// ---------------------------------------------------------------------------
// ARCHETYPES — the complete exported array
// ---------------------------------------------------------------------------

/**
 * ARCHETYPES is the canonical ordered array of all parenting archetype definitions.
 *
 * 7 archetypes — research-driven count from the 7-dimension scoring space.
 * Every pair satisfies the minimum differentiation rule:
 *   "Any two archetypes must differ by 3+ points on at least 2 dimensions."
 * See validateArchetypeDistinctness for the enforcement function.
 *
 * Content fields (foundationalPatterns, watchouts, culturalOverlays) are
 * empty placeholders. They will be populated in Plan 04 after the scoring
 * simulation in Plan 03 validates the dimension profiles.
 *
 * Downstream consumers:
 * - lib/quiz/scoring-matrix.ts — extracts dimension profiles for scoring
 * - Phase 3 result page — displays archetype name, tagline, content
 * - Phase 5 AI prompts — uses archetype id as personalization context
 */
export const ARCHETYPES: Archetype[] = [
  STEADY_ANCHOR,
  FIERCE_GUARDIAN,
  GENTLE_NURTURER,
  INTENTIONAL_GUIDE,
  RESILIENT_STRIVER,
  STRUCTURED_MENTOR,
  OPEN_HEARTED_LEARNER,
];

// ---------------------------------------------------------------------------
// Validation
// ---------------------------------------------------------------------------

/**
 * Result type for a single archetype pair's differentiation check.
 */
export interface PairValidationResult {
  archetypeA: string;
  archetypeB: string;
  /** Number of dimensions where the two archetypes differ by minimumDelta+ points. */
  distinguishingDimensions: number;
  /** True if the pair meets the minimum differentiation rule. */
  passes: boolean;
  /** Per-dimension delta detail for debugging and Sophia's review. */
  dimensionDeltas: Array<{
    dimension: string;
    valueA: number;
    valueB: number;
    absoluteDelta: number;
    distinguishing: boolean;
  }>;
}

/**
 * Overall result from validateArchetypeDistinctness.
 */
export interface ArchetypeDistinctnessReport {
  /** True if every archetype pair satisfies the minimum differentiation rule. */
  allPairsPass: boolean;
  /**
   * Total number of pairs checked.
   * For N archetypes: N*(N-1)/2 pairs. For 7 archetypes: 21 pairs.
   */
  totalPairs: number;
  /** Number of pairs that pass the minimum differentiation rule. */
  passingPairs: number;
  /** Number of pairs that fail. */
  failingPairs: number;
  /** Full details for every pair. */
  results: PairValidationResult[];
  /** Pairs that failed the rule, extracted for quick review. */
  failures: PairValidationResult[];
}

/**
 * validateArchetypeDistinctness checks that every pair of archetypes satisfies
 * the minimum differentiation rule:
 *
 *   "Any two archetypes must differ by at least 3 points on at least 2 dimensions."
 *
 * This rule ensures that no two archetypes are so similar that the scoring
 * algorithm would routinely conflate them — which would cause the primary vs.
 * secondary archetype distinction to feel arbitrary to users.
 *
 * Source: RESEARCH.md open question #3 — recommended minimum differentiation rule.
 * Sophia to validate this threshold clinically when reviewing the profiles.
 *
 * Current status: All 21 pairs of the 7 defined archetypes pass this check.
 * The tightest pairs (2 distinguishing dimensions each) are:
 *   - steady-anchor vs gentle-nurturer (B=5, AS=3)
 *   - steady-anchor vs intentional-guide (W=3, AS=5)
 *   - steady-anchor vs resilient-striver (AS=4, NC=3)
 *   - gentle-nurturer vs resilient-striver (B=3, NC=5)
 *   - intentional-guide vs resilient-striver (PI=3, NC=4)
 *   - intentional-guide vs structured-mentor (AS=3, PA=5)
 *   - resilient-striver vs open-hearted-learner (AS=4, NC=7)
 *
 * @param minimumDistinguishingDimensions - Number of dimensions that must differ
 *   by minimumDelta or more. Default: 2.
 * @param minimumDelta - Minimum point difference to count as "distinguishing."
 *   Default: 3.
 * @returns ArchetypeDistinctnessReport with pass/fail summary and full pair details.
 */
export function validateArchetypeDistinctness(
  minimumDistinguishingDimensions = 2,
  minimumDelta = 3
): ArchetypeDistinctnessReport {
  const results: PairValidationResult[] = [];

  for (let i = 0; i < ARCHETYPES.length; i++) {
    for (let j = i + 1; j < ARCHETYPES.length; j++) {
      const a = ARCHETYPES[i];
      const b = ARCHETYPES[j];
      const dimensionDeltas: PairValidationResult['dimensionDeltas'] = [];
      let distinguishingDimensions = 0;

      for (const key of DIMENSION_KEYS) {
        const valueA = a.dimensionProfile[key] ?? 0;
        const valueB = b.dimensionProfile[key] ?? 0;
        const absoluteDelta = Math.abs(valueA - valueB);
        const distinguishing = absoluteDelta >= minimumDelta;

        if (distinguishing) {
          distinguishingDimensions += 1;
        }

        dimensionDeltas.push({
          dimension: key,
          valueA,
          valueB,
          absoluteDelta,
          distinguishing,
        });
      }

      const passes = distinguishingDimensions >= minimumDistinguishingDimensions;
      results.push({
        archetypeA: a.id,
        archetypeB: b.id,
        distinguishingDimensions,
        passes,
        dimensionDeltas,
      });
    }
  }

  const failures = results.filter((r) => !r.passes);

  return {
    allPairsPass: failures.length === 0,
    totalPairs: results.length,
    passingPairs: results.filter((r) => r.passes).length,
    failingPairs: failures.length,
    results,
    failures,
  };
}
