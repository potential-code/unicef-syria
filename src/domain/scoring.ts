import type { CareerRoute, Dimension, DimensionScores, Localized } from '@shared/types'
import { PREFERENCE_QUESTIONS, PROFILE_EXPLANATIONS, PROFILE_NAMES } from '@/data/assessment'

const DIMS: Dimension[] = ['P', 'C', 'I', 'O']
export const POINTS_PER_ANSWER = 2

/** Deterministic mockup scoring (brief §3): each answer gives 2 points to its dimension. */
export function scoreAnswers(answers: Dimension[]): DimensionScores {
  const s: DimensionScores = { P: 0, C: 0, I: 0, O: 0 }
  for (const a of answers) s[a] += POINTS_PER_ANSWER
  return s
}

export interface ProfileResult {
  top: Dimension[]
  /** True when the second and third dimensions tie, so the top two are not clear. */
  balanced: boolean
  name: Localized | null
  explanation: Localized | null
}

/** Strongest two dimensions. Ties for the second place show "Balanced preferences". */
export function profileFor(scores: DimensionScores): ProfileResult {
  const sorted = [...DIMS].sort((a, b) => scores[b] - scores[a] || DIMS.indexOf(a) - DIMS.indexOf(b))
  const [first, second, third] = sorted as [Dimension, Dimension, Dimension, Dimension]
  const balanced = scores[second] === scores[third]
  const key = [first, second].sort().join('')
  return {
    top: [first, second],
    balanced,
    name: balanced ? null : (PROFILE_NAMES[key] ?? null),
    explanation: balanced ? null : (PROFILE_EXPLANATIONS[key] ?? null),
  }
}

/** The earning-model answer drives the recommended route; the score alone never does (§4). */
export function recommendedRoute(earningModel: string | undefined): CareerRoute | null {
  const q = PREFERENCE_QUESTIONS.find((p) => p.key === 'earningModel')
  return q?.options.find((o) => o.value === earningModel)?.route ?? null
}
