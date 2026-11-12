import type { TrainerId, Youth } from '@shared/types'
import { COHORTS } from '@/data/orgs'

/** Trainers who deliver one of the youth's cohorts (programme mentor allocation). */
export function cohortTrainerIds(y: Youth): TrainerId[] {
  return COHORTS.filter((c) => y.cohortIds.includes(c.id)).map((c) => c.trainerId)
}

/** Completed course ids (any certificate state). */
export function completedCourses(y: Youth) {
  return Object.values(y.progress)
    .filter((p) => p?.completedAt)
    .map((p) => p?.courseId)
    .filter((id): id is NonNullable<typeof id> => Boolean(id))
}
