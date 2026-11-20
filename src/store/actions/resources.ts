import type { CohortId, ResourceLink, TemplateId, Youth } from '@shared/types'
import { COHORT_COURSES } from '@/data/orgs'
import { now } from '@/lib/clock'
import { update, useDb } from '../db'

const NONE: ResourceLink[] = []

/** Trainer resource links, newest first. Reset demo clears them. */
export function useResourceLinks(): ResourceLink[] {
  return useDb((db) => db.resourceLinks ?? NONE)
}

export function linkResource(template: TemplateId, target: string, task: string) {
  const link: ResourceLink = {
    id: `${template}-${target}-${Date.now()}`,
    template,
    target,
    task,
    at: now(),
  }
  update((db) => ({ ...db, resourceLinks: [link, ...(db.resourceLinks ?? [])] }))
}

export function unlinkResource(id: string) {
  update((db) => ({ ...db, resourceLinks: (db.resourceLinks ?? []).filter((r) => r.id !== id) }))
}

/** Links a learner sees: for one of their cohorts, or a course taught in one of their cohorts. */
export function linksFor(y: Youth, links: ResourceLink[]): ResourceLink[] {
  const courses = y.cohortIds.flatMap((k: CohortId) => COHORT_COURSES[k])
  return links.filter(
    (r) => y.cohortIds.includes(r.target as CohortId) || courses.includes(r.target as never),
  )
}
