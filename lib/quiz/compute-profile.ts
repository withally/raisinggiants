/**
 * lib/quiz/compute-profile.ts
 *
 * Converts raw quiz answers into a DimensionProfile suitable for use with
 * the scoreArchetypes() and getResult() functions from scoring-matrix.ts.
 *
 * This is the bridge between Step 1 (quiz answers) and Step 2 (archetype scoring):
 *
 *   Quiz answers (Record<questionId, optionId>)
 *     ↓  computeDimensionProfile()
 *   DimensionProfile (Record<DimensionKey, number 1-10>)
 *     ↓  getResult()
 *   GetResultReturn { primary: ArchetypeId, secondaries: [ArchetypeId, ...] }
 *
 * Algorithm:
 *   For each answered question, look up the dimension scores contributed by the
 *   selected option. Accumulate all scores per dimension across all questions.
 *   Average the accumulated scores for each dimension.
 *   Dimensions with no contributing answers default to 5 (scale midpoint).
 *
 * The cultural background question (inputType === 'searchable-dropdown') is
 * skipped because it is metadata, not a scoring dimension.
 *
 * Exports: computeDimensionProfile
 */

import type { DimensionProfile } from '@/lib/archetypes/types'
import { DIMENSION_KEYS } from '@/lib/quiz/dimensions'
import { QUESTIONS } from '@/lib/quiz/questions'
import type { QuizQuestion } from '@/lib/quiz/questions'

/**
 * Computes a DimensionProfile from raw quiz answers.
 *
 * For each dimension, averages all scores contributed by the selected options.
 * Dimensions with no contributing questions default to 5 (midpoint).
 *
 * Skips the cultural background question (inputType === 'searchable-dropdown')
 * since it is metadata, not a scoring dimension.
 *
 * @param answers - Record<questionId, optionId> from the quiz store
 * @param questions - Optional question array override (defaults to QUESTIONS)
 * @returns DimensionProfile with all 11 dimensions populated (1-10 scale)
 */
export function computeDimensionProfile(
  answers: Record<string, string>,
  questions: QuizQuestion[] = QUESTIONS
): DimensionProfile {
  // Accumulate per-dimension score arrays
  const accumulators: Record<string, number[]> = {}

  for (const question of questions) {
    // Skip cultural background — it is metadata, not a dimension score
    if (question.inputType === 'searchable-dropdown') continue

    const selectedOptionId = answers[question.id]
    if (!selectedOptionId) continue

    const optionScores = question.dimensionScores[selectedOptionId]
    if (!optionScores) continue

    for (const [dimKey, score] of Object.entries(optionScores)) {
      if (!accumulators[dimKey]) accumulators[dimKey] = []
      accumulators[dimKey].push(score as number)
    }
  }

  // Build profile: average accumulated scores; default uncovered dimensions to 5
  const profile: DimensionProfile = {} as DimensionProfile
  for (const key of DIMENSION_KEYS) {
    const scores = accumulators[key]
    if (scores && scores.length > 0) {
      profile[key] = scores.reduce((a, b) => a + b, 0) / scores.length
    } else {
      profile[key] = 5 // midpoint default for dimensions with no answers
    }
  }

  return profile
}
