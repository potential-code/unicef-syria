import type { Coach, Localized } from '@shared/types'

const STOP = new Set([
  'a',
  'an',
  'the',
  'my',
  'me',
  'i',
  'to',
  'do',
  'how',
  'what',
  'this',
  'is',
  'of',
  'for',
  'and',
  'with',
  'can',
  'you',
  'please',
  'help',
  'في',
  'من',
  'على',
  'عن',
  'أن',
  'ما',
  'هل',
  'لي',
])

function words(s: string): string[] {
  return s
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 1 && !STOP.has(w))
}

/**
 * Map free text to a scripted step: compare with the coach's starters and every reply label in
 * both languages. Weak matches return 'fallback' so the coach never improvises an answer.
 */
export function matchStep(coach: Coach, text: string): string {
  const input = new Set(words(text))
  if (input.size === 0) return 'fallback'
  const candidates: { label: Localized; next: string }[] = [
    ...coach.starters.map((s) => ({ label: s.label, next: s.step })),
    ...coach.steps.flatMap((s) => s.replies ?? []),
  ]
  let best = { next: 'fallback', score: 0 }
  for (const c of candidates) {
    for (const label of [c.label.en, c.label.ar]) {
      const target = words(label)
      if (!target.length) continue
      const hits = target.filter((w) => input.has(w)).length
      const score = hits / Math.max(target.length, 1)
      if (hits >= 2 && score > best.score) best = { next: c.next, score }
    }
  }
  return best.score >= 0.5 ? best.next : 'fallback'
}
