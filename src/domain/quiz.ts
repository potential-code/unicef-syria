import type { CheckQuestion } from '@shared/types'

/** Seed data lists the correct option first; rotate options deterministically for display. */
export function arrangeOptions<Q extends CheckQuestion>(q: Q, salt = 0): Q {
  const n = q.options.length
  if (n < 2) return q
  let h = salt
  for (const ch of q.prompt.en) h = (h * 31 + ch.charCodeAt(0)) >>> 0
  const shift = h % n
  const options = q.options.map((_, i) => q.options[(i + shift) % n]!)
  const correct = (q.correct - shift + n) % n
  return { ...q, options, correct }
}

export function scoreQuiz(correct: boolean[]): number {
  return correct.length ? Math.round((correct.filter(Boolean).length / correct.length) * 100) : 0
}
