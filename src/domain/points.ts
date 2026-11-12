import type { BadgeId, Localized, PointsEntry, PointsReason, Youth } from '@shared/types'

/** Brief §14 Y12. Each key is awarded at most once; repeat clicks never add points twice. */
export const POINTS = {
  profile: 20,
  assessment: 30,
  course: 40,
  practical: 20,
  attendance: 20,
  mentor: -100,
} as const

export const MENTOR_COST = 100

export function balance(y: Youth): number {
  return y.points.reduce((sum, e) => sum + e.amount, 0)
}

export function hasAwarded(y: Youth, key: string): boolean {
  return y.seededKeys.includes(key) || y.points.some((e) => e.key === key)
}

/** Returns the youth with the entry added, or unchanged if the key was already used. */
export function award(y: Youth, key: string, reason: PointsReason, amount: number, label: Localized, at: string): Youth {
  if (hasAwarded(y, key)) return y
  const entry: PointsEntry = { key, reason, amount, at, label }
  return { ...y, points: [...y.points, entry] }
}

/** Badge rules (brief §14). Badges show completed demo activities only. */
export function earnedBadges(y: Youth): BadgeId[] {
  const done = (id: string) => Boolean(y.progress[id as keyof typeof y.progress]?.completedAt)
  const anyCourse = Object.values(y.progress).some((p) => p?.completedAt)
  const out: BadgeId[] = []
  if (y.assessment && y.route) out.push('careerExplorer')
  if (anyCourse) out.push('learningStarter')
  if (y.toolkit.cv && y.toolkit.interviews.length > 0) out.push('jobReady')
  if (y.toolkit.business && done('C07')) out.push('enterpriseExplorer')
  if (y.toolkit.freelanceProfile && y.toolkit.proposals.length > 0) out.push('freelanceStarter')
  return out
}
