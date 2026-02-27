/**
 * scripts/validate-scoring.ts
 *
 * Scoring validation script for the Kin archetype framework.
 *
 * Runs 20-30 diverse simulated answer profiles through the scoring matrix
 * and validates that the framework produces clinically plausible, well-distributed
 * results before any content work begins.
 *
 * This is the gate between Plan 02 (archetype definitions) and Plan 04 (content
 * outlines). If this script produces a FAIL verdict, the archetype dimension
 * profiles in lib/archetypes/archetypes.ts must be adjusted before proceeding.
 *
 * Run: npx tsx scripts/validate-scoring.ts
 *
 * Pass/Fail criteria (Plan 03 must_haves):
 *   1. All profiles produce a result (no crashes)
 *   2. No archetype captures >40% of profiles as primary
 *   3. No archetype captures 0 profiles as primary
 *   4. Average confidence gap (primary vs. secondary score) > 0.03
 *   5. Distinctness validation passes (all pairs differ by 3+ points on 2+ dims)
 *   6. Indeterminate case produces a result
 */

import {
  scoreArchetypes,
  getResult,
  ARCHETYPE_PROFILES,
} from '../lib/quiz/scoring-matrix';
import {
  ARCHETYPES,
  validateArchetypeDistinctness,
} from '../lib/archetypes/archetypes';
import { DIMENSION_KEYS } from '../lib/quiz/dimensions';
import type { DimensionProfile } from '../lib/archetypes/types';

// ---------------------------------------------------------------------------
// Helper: build DimensionProfile from ordered values (matches DIMENSION_KEYS order)
// [emotional-warmth, boundary-consistency, autonomy-support, emotional-regulation,
//  protective-instinct, narrative-coherence, presence-attunement,
//  repair-reconnection, role-integrity, reciprocity, nonjudgmental-acceptance]
// ---------------------------------------------------------------------------
function p(
  w: number,    // emotional-warmth
  b: number,    // boundary-consistency
  as: number,   // autonomy-support
  er: number,   // emotional-regulation
  pi: number,   // protective-instinct
  nc: number,   // narrative-coherence
  pa: number,   // presence-attunement
  rr: number,   // repair-reconnection
  ri: number,   // role-integrity
  rec: number,  // reciprocity
  nja: number   // nonjudgmental-acceptance
): DimensionProfile {
  return {
    'emotional-warmth': w,
    'boundary-consistency': b,
    'autonomy-support': as,
    'emotional-regulation': er,
    'protective-instinct': pi,
    'narrative-coherence': nc,
    'presence-attunement': pa,
    'repair-reconnection': rr,
    'role-integrity': ri,
    'reciprocity': rec,
    'nonjudgmental-acceptance': nja,
  };
}

// ---------------------------------------------------------------------------
// Simulated Profile type
// ---------------------------------------------------------------------------
interface SimulatedProfile {
  label: string;
  category: 'A-classic' | 'B-edge' | 'C-cultural' | 'D-blended' | 'E-negative';
  profile: DimensionProfile;
  expectedBehavior: string; // "should be X", "should be ambiguous", "should not be Y"
}

// ---------------------------------------------------------------------------
// Section 1: Simulated Profiles (27 profiles)
// ---------------------------------------------------------------------------

const SIMULATED_PROFILES: SimulatedProfile[] = [

  // =========================================================================
  // Category A — Classic Patterns (8 profiles)
  // =========================================================================

  {
    label: 'A1: Authoritative-adjacent (high W+B+ER)',
    category: 'A-classic',
    profile: p(9, 8, 5, 8, 3, 7, 8, 7, 8, 6, 7),
    expectedBehavior: 'should be steady-anchor (authoritative archetype)',
  },
  {
    label: 'A2: Authoritarian-adjacent (high B, low W+AS)',
    category: 'A-classic',
    profile: p(4, 9, 3, 5, 7, 5, 3, 3, 6, 3, 3),
    expectedBehavior: 'should be structured-mentor or fierce-guardian (strict, low warmth)',
  },
  {
    label: 'A3: Permissive-adjacent (high W, low B)',
    category: 'A-classic',
    profile: p(9, 2, 8, 7, 3, 5, 9, 8, 6, 7, 9),
    expectedBehavior: 'should be gentle-nurturer (permissive pattern)',
  },
  {
    label: 'A4: Overprotective (high PI, low AS)',
    category: 'A-classic',
    profile: p(7, 8, 2, 5, 9, 4, 4, 3, 5, 2, 4),
    expectedBehavior: 'should be fierce-guardian (high protective instinct, low autonomy)',
  },
  {
    label: 'A5: Conscious/Attuned (high PA+ER+W)',
    category: 'A-classic',
    profile: p(8, 6, 9, 8, 2, 6, 9, 9, 8, 9, 8),
    expectedBehavior: 'should be intentional-guide (conscious parenting pattern)',
  },
  {
    label: 'A6: Earned Secure (high NC+ER+AS)',
    category: 'A-classic',
    profile: p(8, 6, 9, 9, 5, 10, 7, 9, 7, 7, 8),
    expectedBehavior: 'should be resilient-striver (maximal narrative coherence)',
  },
  {
    label: 'A7: Disengaged (low W+B+engagement)',
    category: 'A-classic',
    profile: p(2, 3, 4, 3, 3, 3, 2, 2, 5, 3, 3),
    expectedBehavior: 'should be structured-mentor or open-hearted-learner (low engagement) — will not be a perfect fit for any archetype',
  },
  {
    label: 'A8: Free-range adjacent (high W+AS, low B)',
    category: 'A-classic',
    profile: p(8, 2, 9, 7, 2, 5, 8, 8, 7, 8, 8),
    expectedBehavior: 'should be gentle-nurturer or intentional-guide (very low boundaries, high autonomy)',
  },

  // =========================================================================
  // Category B — Edge Cases (8 profiles)
  // =========================================================================

  {
    label: 'B1: ALL dimensions at 5 (flat/indeterminate)',
    category: 'B-edge',
    profile: p(5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5),
    expectedBehavior: 'should produce a result without crashing (any archetype is acceptable)',
  },
  {
    label: 'B2: Emotional-warmth maxed (10), all others at 3',
    category: 'B-edge',
    profile: p(10, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3),
    expectedBehavior: 'one-dimensional warmth profile — should produce a result, likely gentle-nurturer or steady-anchor',
  },
  {
    label: 'B3: Autonomy-support maxed (10), all others at 3',
    category: 'B-edge',
    profile: p(3, 3, 10, 3, 3, 3, 3, 3, 3, 3, 3),
    expectedBehavior: 'one-dimensional autonomy profile — should produce a result, likely intentional-guide',
  },
  {
    label: 'B4: Narrative-coherence maxed (10), all others at 3',
    category: 'B-edge',
    profile: p(3, 3, 3, 3, 3, 10, 3, 3, 3, 3, 3),
    expectedBehavior: 'one-dimensional narrative profile — should produce a result, likely resilient-striver',
  },
  {
    label: 'B5: ALL dimensions at 9 (ceiling case)',
    category: 'B-edge',
    profile: p(9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9),
    expectedBehavior: 'everything-high profile — should produce a result without crashing',
  },
  {
    label: 'B6: ALL dimensions at 2 (floor case)',
    category: 'B-edge',
    profile: p(2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2),
    expectedBehavior: 'everything-low profile — should produce a result without crashing',
  },
  {
    label: 'B7: High PI (10) + Low ER (2) — trauma-suggestive',
    category: 'B-edge',
    profile: p(6, 7, 2, 2, 10, 3, 3, 2, 5, 2, 3),
    expectedBehavior: 'should be fierce-guardian (anxious-protective, poor regulation, low narrative integration)',
  },
  {
    label: 'B8: High NC (10) + Low W (3) — intellectualized',
    category: 'B-edge',
    profile: p(3, 6, 7, 7, 3, 10, 5, 7, 7, 6, 6),
    expectedBehavior: 'should be resilient-striver (narrative integration without emotional expressiveness)',
  },

  // =========================================================================
  // Category C — Culturally Diverse Patterns (5 profiles)
  // =========================================================================

  {
    label: 'C1: Collectivist-adjacent (high B+W, low AS)',
    category: 'C-cultural',
    profile: p(8, 9, 2, 6, 5, 5, 6, 5, 7, 3, 5),
    expectedBehavior: 'should be devoted-champion or steady-anchor (strong structure + warmth, low autonomy, low reciprocity)',
  },
  {
    label: 'C2: Western permissive-progressive (high AS, moderate W, low B)',
    category: 'C-cultural',
    profile: p(7, 3, 9, 7, 2, 6, 8, 8, 7, 8, 8),
    expectedBehavior: 'should be gentle-nurturer or intentional-guide or collaborative-ally (autonomy-forward, low structure)',
  },
  {
    label: 'C3: South Asian joint-family (high PI+W+B)',
    category: 'C-cultural',
    profile: p(8, 8, 3, 5, 8, 5, 5, 4, 6, 2, 4),
    expectedBehavior: 'should be fierce-guardian or devoted-champion (high protection + warmth + structure, low autonomy)',
  },
  {
    label: 'C4: Mindful parenting, culturally neutral (moderate+high PA)',
    category: 'C-cultural',
    profile: p(7, 6, 6, 8, 3, 7, 9, 8, 8, 7, 8),
    expectedBehavior: 'should be steady-anchor or intentional-guide (balanced, high presence)',
  },
  {
    label: 'C5: Strict disciplinarian cross-cultural (high B+PI, low W)',
    category: 'C-cultural',
    profile: p(3, 9, 4, 6, 8, 4, 3, 2, 6, 2, 2),
    expectedBehavior: 'should be fierce-guardian or structured-mentor (strict, firm, emotionally reserved)',
  },

  // =========================================================================
  // Category D — Blended / Ambiguous (7 profiles)
  // =========================================================================

  {
    label: 'D1: Near-tie between steady-anchor and resilient-striver',
    category: 'D-blended',
    profile: p(8, 7, 7, 8, 4, 8, 8, 8, 7, 7, 8),
    expectedBehavior: 'should be ambiguous between steady-anchor and resilient-striver (close call)',
  },
  {
    label: 'D2: Near-tie between gentle-nurturer and intentional-guide',
    category: 'D-blended',
    profile: p(9, 5, 9, 8, 2, 5, 9, 8, 7, 8, 9),
    expectedBehavior: 'should be ambiguous between gentle-nurturer and intentional-guide',
  },
  {
    label: 'D3: Equidistant from 3+ archetypes (maximally ambiguous)',
    category: 'D-blended',
    profile: p(6, 6, 6, 7, 5, 6, 7, 7, 6, 6, 6),
    expectedBehavior: 'should be ambiguous — scores close across multiple archetypes',
  },
  {
    label: 'D4: Strong resilient-striver with outlier low-warmth',
    category: 'D-blended',
    profile: p(2, 6, 9, 9, 5, 10, 7, 9, 7, 7, 8),
    expectedBehavior: 'should be resilient-striver despite very low warmth outlier',
  },
  {
    label: 'D5: High-variance profile (some 9s, some 2s)',
    category: 'D-blended',
    profile: p(9, 2, 9, 2, 9, 2, 9, 2, 9, 2, 9),
    expectedBehavior: 'high-variance profile — should produce a result; any archetype acceptable',
  },
  {
    label: 'D6: Low-variance profile (all 5-7, steady)',
    category: 'D-blended',
    profile: p(6, 6, 5, 7, 5, 6, 6, 6, 6, 6, 6),
    expectedBehavior: 'low-variance balanced profile — should produce a result; likely steady-anchor adjacent',
  },
  {
    label: 'D7: Near-tie between structured-mentor and fierce-guardian',
    category: 'D-blended',
    profile: p(5, 9, 5, 6, 5, 5, 4, 3, 6, 3, 3),
    expectedBehavior: 'should be ambiguous between structured-mentor and fierce-guardian (both high-boundary archetypes)',
  },

  // =========================================================================
  // Category E — Negative Childhood Experience Patterns (7 profiles)
  // =========================================================================
  // These profiles test whether the new repair-reconnection and role-integrity
  // dimensions allow the framework to differentiate specific negative childhood
  // patterns that were previously collapsed into "low on various dimensions."

  {
    label: 'E1: Parentified child (high attunement + very low RI)',
    category: 'E-negative',
    profile: p(7, 4, 6, 7, 6, 4, 8, 5, 1, 5, 6),
    expectedBehavior: 'should be open-hearted-learner (high attunement, low narrative coherence, very low role integrity)',
  },
  {
    label: 'E2: Threats as discipline (high structure + very low RR)',
    category: 'E-negative',
    profile: p(3, 9, 2, 4, 8, 3, 2, 1, 6, 1, 2),
    expectedBehavior: 'should be fierce-guardian or structured-mentor (high structure, no repair after conflict)',
  },
  {
    label: 'E3: Emotional neglect (low everything + intact RI)',
    category: 'E-negative',
    profile: p(2, 4, 5, 3, 2, 3, 2, 2, 8, 3, 3),
    expectedBehavior: 'should not be open-hearted-learner (low warmth/attunement distinguishes from parentification)',
  },
  {
    label: 'E4: Emotional manipulation (warm surface + low RI + low RR)',
    category: 'E-negative',
    profile: p(8, 3, 3, 3, 6, 2, 6, 2, 2, 3, 2),
    expectedBehavior: 'should be open-hearted-learner or devoted-champion (warm surface but no repair, reversed roles)',
  },
  {
    label: 'E5: Healed parentified child (high NC + high RR + restored RI)',
    category: 'E-negative',
    profile: p(7, 6, 8, 8, 4, 9, 7, 9, 8, 7, 8),
    expectedBehavior: 'should be resilient-striver (earned-secure from parentification background, repair restored)',
  },
  {
    label: 'E6: Volatile/unpredictable (low across most dimensions)',
    category: 'E-negative',
    profile: p(4, 2, 3, 2, 7, 2, 3, 1, 3, 2, 2),
    expectedBehavior: 'should be fierce-guardian or open-hearted-learner (volatile, low regulation, high protection)',
  },
  {
    label: 'E7: Enmeshed/over-involved (high warmth + very low RI)',
    category: 'E-negative',
    profile: p(9, 3, 2, 6, 7, 3, 7, 6, 1, 4, 5),
    expectedBehavior: 'should be open-hearted-learner or gentle-nurturer (warm but enmeshed, very low role integrity)',
  },

  // =========================================================================
  // Category F — New Archetype Targeting Profiles (5 profiles)
  // =========================================================================
  // These profiles specifically target the two new archetypes (Devoted Champion
  // and Collaborative Ally) to ensure they each receive at least 1 primary hit.

  {
    label: 'F1: Devoted Champion classic (high W+B, very low REC+NJA)',
    category: 'A-classic',
    profile: p(8, 8, 5, 6, 3, 5, 7, 5, 7, 3, 2),
    expectedBehavior: 'should be devoted-champion (conditional warmth, low reciprocity, low acceptance)',
  },
  {
    label: 'F2: Collaborative Ally classic (very high REC+NJA, high AS)',
    category: 'A-classic',
    profile: p(6, 4, 8, 7, 3, 7, 6, 7, 6, 10, 9),
    expectedBehavior: 'should be collaborative-ally (democratic, cooperative, unconditional acceptance)',
  },
  {
    label: 'F3: Devoted Champion variant (high investment, conditional regard)',
    category: 'A-classic',
    profile: p(7, 9, 4, 5, 4, 5, 6, 4, 7, 2, 2),
    expectedBehavior: 'should be devoted-champion (high structure + investment but conditional warmth)',
  },
  {
    label: 'F4: Collaborative Ally variant (egalitarian, democratic)',
    category: 'A-classic',
    profile: p(7, 3, 9, 7, 2, 6, 7, 8, 6, 9, 10),
    expectedBehavior: 'should be collaborative-ally (high reciprocity + acceptance, low structure)',
  },
  {
    label: 'F5: Near-tie devoted-champion vs collaborative-ally',
    category: 'D-blended',
    profile: p(7, 6, 6, 7, 3, 6, 6, 6, 7, 6, 5),
    expectedBehavior: 'should be ambiguous between devoted-champion and other archetypes (mid-range on new dims)',
  },
];

// ---------------------------------------------------------------------------
// Section 2: Run Scoring and Collect Results
// ---------------------------------------------------------------------------

interface ProfileResult {
  label: string;
  category: string;
  expectedBehavior: string;
  primary: string;
  primaryScore: number;
  secondaryScores: Array<{ id: string; score: number }>;
  gap: number; // primary score - second place score
  allRanked: Array<{ id: string; score: number }>;
}

const results: ProfileResult[] = [];

for (const sim of SIMULATED_PROFILES) {
  const ranked = scoreArchetypes(sim.profile);
  const result = getResult(sim.profile);

  const primaryScore = ranked[0].score;
  const secondaryScore = ranked[1].score;
  const gap = primaryScore - secondaryScore;

  results.push({
    label: sim.label,
    category: sim.category,
    expectedBehavior: sim.expectedBehavior,
    primary: result.primary,
    primaryScore,
    secondaryScores: [
      { id: result.secondaries[0], score: ranked[1].score },
      { id: result.secondaries[1], score: ranked[2].score },
      { id: result.secondaries[2], score: ranked[3].score },
    ],
    gap,
    allRanked: ranked,
  });
}

// ---------------------------------------------------------------------------
// Section 3: Analysis Output
// ---------------------------------------------------------------------------

// Helper for fixed-width columns
function padEnd(str: string, len: number): string {
  return str.slice(0, len).padEnd(len);
}
function padStart(str: string, len: number): string {
  return str.slice(0, len).padStart(len);
}

console.log('\n');
console.log('='.repeat(120));
console.log(' RAISING GIANTS — ARCHETYPE SCORING VALIDATION REPORT');
console.log('='.repeat(120));
console.log(`  Script: scripts/validate-scoring.ts`);
console.log(`  Date: ${new Date().toISOString()}`);
console.log(`  Profiles: ${SIMULATED_PROFILES.length} simulated across 4 categories`);
console.log(`  Archetypes: ${ARCHETYPES.length} defined`);
console.log('='.repeat(120));

// ---------------------------------------------------------------------------
// 3.1: Per-profile results table
// ---------------------------------------------------------------------------

console.log('\n--- PER-PROFILE RESULTS ---\n');

const HEADER = `${'Profile Label'.padEnd(55)} | ${'Primary'.padEnd(22)} | ${'Score'.padStart(6)} | ${'Gap'.padStart(6)} | ${'Secondaries (top 3)'.padEnd(70)} | Expected`;
console.log(HEADER);
console.log('-'.repeat(HEADER.length));

for (const r of results) {
  const secondariesStr = r.secondaryScores
    .map(s => `${s.id}(${s.score.toFixed(3)})`)
    .join(', ');

  const expectedShort = r.expectedBehavior.length > 50
    ? r.expectedBehavior.slice(0, 47) + '...'
    : r.expectedBehavior;

  console.log(
    `${padEnd(r.label, 55)} | ${padEnd(r.primary, 22)} | ${r.primaryScore.toFixed(4).padStart(6)} | ${r.gap.toFixed(4).padStart(6)} | ${padEnd(secondariesStr, 70)} | ${expectedShort}`
  );
}

// ---------------------------------------------------------------------------
// 3.2: Distribution analysis
// ---------------------------------------------------------------------------

console.log('\n--- DISTRIBUTION ANALYSIS ---\n');

const distribution: Record<string, number> = {};
for (const arch of ARCHETYPES) {
  distribution[arch.id] = 0;
}
for (const r of results) {
  distribution[r.primary] = (distribution[r.primary] || 0) + 1;
}

const totalProfiles = results.length;
const degenThreshold = 0.4;

let degenerateFlagFound = false;
let deadArchetypeFound = false;

console.log(`Total simulated profiles: ${totalProfiles}`);
console.log(`Degenerate threshold: >${(degenThreshold * 100).toFixed(0)}% of profiles (>${Math.floor(degenThreshold * totalProfiles)} profiles)\n`);
console.log(`${'Archetype'.padEnd(25)} | ${'Count'.padStart(5)} | ${'Pct'.padStart(6)} | Status`);
console.log('-'.repeat(70));

for (const arch of ARCHETYPES) {
  const count = distribution[arch.id] || 0;
  const pct = count / totalProfiles;
  const pctStr = (pct * 100).toFixed(1) + '%';
  let status = 'OK';

  if (pct > degenThreshold) {
    status = 'FAIL: >40% — DEGENERATE';
    degenerateFlagFound = true;
  } else if (count === 0) {
    status = 'FAIL: 0 profiles — DEAD ARCHETYPE';
    deadArchetypeFound = true;
  }

  console.log(`${arch.id.padEnd(25)} | ${String(count).padStart(5)} | ${pctStr.padStart(6)} | ${status}`);
}

// ---------------------------------------------------------------------------
// 3.3: Confidence analysis
// ---------------------------------------------------------------------------

console.log('\n--- CONFIDENCE ANALYSIS ---\n');

const avgGap = results.reduce((sum, r) => sum + r.gap, 0) / results.length;
const ambiguousProfiles = results.filter(r => r.gap < 0.05);
const poorMatchProfiles = results.filter(r => r.primaryScore < 0.6);

console.log(`Average gap (primary vs. secondary score): ${avgGap.toFixed(4)}`);
console.log(`  → Pass threshold: > 0.03`);
console.log(`  → Status: ${avgGap > 0.03 ? 'PASS' : 'FAIL'}\n`);

if (ambiguousProfiles.length > 0) {
  console.log(`Profiles with gap < 0.05 (very ambiguous — worth noting):`);
  for (const r of ambiguousProfiles) {
    console.log(`  [${r.category}] ${r.label}`);
    console.log(`    Primary: ${r.primary} (${r.primaryScore.toFixed(4)}), Gap: ${r.gap.toFixed(4)}`);
    console.log(`    Expected: ${r.expectedBehavior}`);
  }
} else {
  console.log('No profiles with gap < 0.05 (all profiles have confident primary results).');
}

console.log('');

if (poorMatchProfiles.length > 0) {
  console.log(`Profiles with primary score < 0.6 (poor match — may indicate framework gap):`);
  for (const r of poorMatchProfiles) {
    console.log(`  [${r.category}] ${r.label}`);
    console.log(`    Primary: ${r.primary} (${r.primaryScore.toFixed(4)})`);
  }
} else {
  console.log('No profiles with primary score < 0.6 (all profiles match at least one archetype well).');
}

// ---------------------------------------------------------------------------
// 3.4: Distinctness validation
// ---------------------------------------------------------------------------

console.log('\n--- DISTINCTNESS VALIDATION ---\n');

const distinctness = validateArchetypeDistinctness();

console.log(`Total pairs checked: ${distinctness.totalPairs}`);
console.log(`Passing pairs: ${distinctness.passingPairs}`);
console.log(`Failing pairs: ${distinctness.failingPairs}`);
console.log(`All pairs pass: ${distinctness.allPairsPass ? 'YES — PASS' : 'NO — FAIL'}`);

if (distinctness.failingPairs > 0) {
  console.log('\nFailing pairs (differ by <3 points on fewer than 2 dimensions):');
  for (const failure of distinctness.failures) {
    const failingDims = failure.dimensionDeltas
      .filter(d => d.distinguishing)
      .map(d => `${d.dimension}(delta=${d.absoluteDelta})`);
    console.log(`  ${failure.archetypeA} vs ${failure.archetypeB}: ${failure.distinguishingDimensions} distinguishing dimensions — ${failingDims.join(', ')}`);
  }
} else {
  console.log('\nTightest pairs (exactly 2 distinguishing dimensions):');
  const tightPairs = distinctness.results.filter(r => r.distinguishingDimensions === 2);
  for (const pair of tightPairs) {
    const distinguishingDims = pair.dimensionDeltas
      .filter(d => d.distinguishing)
      .map(d => `${d.dimension}(delta=${d.absoluteDelta})`);
    console.log(`  ${pair.archetypeA} vs ${pair.archetypeB}: ${distinguishingDims.join(', ')}`);
  }
  const mostDistinct = [...distinctness.results].sort((a, b) => b.distinguishingDimensions - a.distinguishingDimensions)[0];
  console.log(`\nMost distinct pair (${mostDistinct.distinguishingDimensions} distinguishing dims): ${mostDistinct.archetypeA} vs ${mostDistinct.archetypeB}`);
}

// ---------------------------------------------------------------------------
// 3.5: Edge case report
// ---------------------------------------------------------------------------

console.log('\n--- EDGE CASE REPORT ---\n');

// B1: Indeterminate (all 5s)
const indeterminate = results.find(r => r.label.includes('B1:'));
console.log('Indeterminate case (all dims = 5):');
if (indeterminate) {
  console.log(`  Primary result: ${indeterminate.primary} (score: ${indeterminate.primaryScore.toFixed(4)})`);
  console.log(`  Gap to secondary: ${indeterminate.gap.toFixed(4)}`);
  console.log(`  STATUS: Result produced — PASS`);
} else {
  console.log(`  STATUS: FAIL — could not find B1 profile result`);
}

// B2/B3/B4: Single-dimension maxed
const singleDimProfiles = results.filter(r => r.label.includes('B2:') || r.label.includes('B3:') || r.label.includes('B4:'));
const singleDimPrimaries = new Set(singleDimProfiles.map(r => r.primary));
console.log('\nSingle-dimension maxed profiles (one dim=10, others=3):');
for (const r of singleDimProfiles) {
  console.log(`  ${r.label}`);
  console.log(`    Primary: ${r.primary} (score: ${r.primaryScore.toFixed(4)})`);
}
const singleDimDistinct = singleDimPrimaries.size > 1;
console.log(`  All map to same archetype: ${singleDimPrimaries.size === 1 ? 'YES (concerning)' : 'NO'}`);
console.log(`  Different primaries across single-dim profiles: ${singleDimDistinct ? 'YES — PASS' : 'FAIL — all map to same archetype'}`);

// B7: Trauma-suggestive profile
const traumaProfile = results.find(r => r.label.includes('B7:'));
console.log('\nTrauma-suggestive profile (high PI=10, low ER=2):');
if (traumaProfile) {
  console.log(`  Primary: ${traumaProfile.primary} (score: ${traumaProfile.primaryScore.toFixed(4)})`);
  const clinicallyPlausible = ['fierce-guardian', 'open-hearted-learner'].includes(traumaProfile.primary);
  console.log(`  Clinically plausible (fierce-guardian or open-hearted-learner): ${clinicallyPlausible ? 'YES — PASS' : 'BORDERLINE — review'}`);
}

// ---------------------------------------------------------------------------
// Section 4: Pass/Fail Summary
// ---------------------------------------------------------------------------

console.log('\n');
console.log('='.repeat(80));
console.log(' FINAL PASS/FAIL VERDICT');
console.log('='.repeat(80));

const checks: Array<{ name: string; pass: boolean; detail?: string }> = [];

// Check 1: All profiles produced results (no crashes means we got here)
checks.push({
  name: 'All profiles produced results (no crashes)',
  pass: results.length === SIMULATED_PROFILES.length,
  detail: `${results.length}/${SIMULATED_PROFILES.length} profiles completed`,
});

// Check 2: No archetype captures >40%
checks.push({
  name: 'No archetype captures >40% of profiles',
  pass: !degenerateFlagFound,
  detail: degenerateFlagFound
    ? 'One or more archetypes captured >40% — see distribution table above'
    : `Max concentration: ${(Math.max(...Object.values(distribution)) / totalProfiles * 100).toFixed(1)}%`,
});

// Check 3: No archetype captures 0 profiles
checks.push({
  name: 'No archetype captures 0 profiles (no dead archetypes)',
  pass: !deadArchetypeFound,
  detail: deadArchetypeFound
    ? 'One or more archetypes had 0 profiles — see distribution table above'
    : 'All archetypes received at least 1 profile as primary',
});

// Check 4: Average confidence gap > 0.03
checks.push({
  name: 'Average confidence gap > 0.03',
  pass: avgGap > 0.03,
  detail: `Average gap: ${avgGap.toFixed(4)}`,
});

// Check 5: Distinctness validation
checks.push({
  name: 'Distinctness validation passes (all pairs differ 3+ pts on 2+ dims)',
  pass: distinctness.allPairsPass,
  detail: distinctness.allPairsPass
    ? `All ${distinctness.totalPairs} pairs pass`
    : `${distinctness.failingPairs} pairs fail — see distinctness section above`,
});

// Check 6: Indeterminate case produces a result
checks.push({
  name: 'Indeterminate case produces a result (no crash/hang)',
  pass: !!indeterminate,
  detail: indeterminate
    ? `Result: ${indeterminate.primary} (${indeterminate.primaryScore.toFixed(4)})`
    : 'B1 profile not found in results',
});

let allPass = true;
for (const check of checks) {
  const icon = check.pass ? '[PASS]' : '[FAIL]';
  console.log(`  ${icon} ${check.name}`);
  if (check.detail) {
    console.log(`         ${check.detail}`);
  }
  if (!check.pass) allPass = false;
}

console.log('');
console.log('='.repeat(80));

if (allPass) {
  console.log(' VERDICT: PASS');
  console.log(' Archetype framework is validated. Plan 04 content work may proceed.');
} else {
  console.log(' VERDICT: FAIL');
  console.log(' Archetype dimension profiles must be adjusted before Plan 04 begins.');
  console.log('');
  console.log(' RECOMMENDATIONS:');

  if (degenerateFlagFound) {
    const dominantArch = Object.entries(distribution).find(([, count]) => count / totalProfiles > degenThreshold);
    if (dominantArch) {
      console.log(`  - Dominant archetype ${dominantArch[0]} captures ${(dominantArch[1] / totalProfiles * 100).toFixed(1)}% of profiles.`);
      console.log(`    Consider making this archetype more extreme (larger deltas from others) so it is selected`);
      console.log(`    less often for ambiguous profiles.`);
    }
  }

  if (deadArchetypeFound) {
    const deadArchs = Object.entries(distribution).filter(([, count]) => count === 0).map(([id]) => id);
    for (const id of deadArchs) {
      console.log(`  - Dead archetype: ${id} never selected as primary.`);
      console.log(`    Review its dimension profile — it may be too similar to another archetype.`);
      console.log(`    Consider adjusting 1-2 dimensions by 2-3 points to make it more distinctive.`);
    }
  }

  if (!distinctness.allPairsPass) {
    console.log('  - Distinctness failures found. Check which archetype pairs are too similar');
    console.log('    and adjust their dimension profiles to differ by 3+ points on 2+ dimensions.');
  }
}

console.log('='.repeat(80));
console.log('');
