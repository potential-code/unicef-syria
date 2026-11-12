import type { CourseId, Localized, Opportunity, Youth } from '@shared/types'

export interface MatchExplanation {
  /** Declared skill (learner wording) next to the requirement it supports. */
  skills: { declared: string; requirement: Localized }[]
  /** Completed courses the opportunity lists as evidence. */
  evidence: CourseId[]
  /** Evidence courses not yet completed: shown as gaps, never as a score. */
  gaps: CourseId[]
}

const STOP = new Set(['with', 'and', 'the', 'basic', 'one', 'five', 'short', 'round', 'original'])
const words = (s: string) =>
  s
    .toLowerCase()
    .split(/[^a-z]+/)
    .filter((w) => w.length >= 4 && !STOP.has(w))
    .map((w) => w.slice(0, 6))

export function completedCourses(y: Youth): CourseId[] {
  return (Object.keys(y.progress) as CourseId[]).filter((c) => !!y.progress[c]?.completedAt)
}

/** Declared skills from the profile and the learner's own CV skills line. */
export function declaredSkills(y: Youth): string[] {
  const cv = y.toolkit.cv?.skills.split(',').map((s) => s.trim()) ?? []
  return Array.from(new Set([...y.profile.skills, ...cv].filter(Boolean)))
}

/** Explains a suggested match from declared skills and evidence only (brief §16 E02). */
export function explainMatch(y: Youth, opp: Opportunity | undefined): MatchExplanation {
  if (!opp) return { skills: [], evidence: [], gaps: [] }
  const done = completedCourses(y)
  const skills: MatchExplanation['skills'] = []
  for (const req of opp.skills) {
    const reqWords = words(req.en)
    const hit = declaredSkills(y).find((d) => words(d).some((w) => reqWords.includes(w)))
    if (hit) skills.push({ declared: hit, requirement: req })
  }
  return {
    skills,
    evidence: opp.evidenceCourses.filter((c) => done.includes(c)),
    gaps: opp.evidenceCourses.filter((c) => !done.includes(c)),
  }
}

export function hasMatch(m: MatchExplanation): boolean {
  return m.skills.length > 0 || m.evidence.length > 0
}
