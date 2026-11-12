import type { FollowUp } from '@shared/types'
import { now } from '@/lib/clock'
import { update, useDb } from '../db'

export function useFollowUps() {
  return useDb((db) => db.followUps)
}

/** Save as learner-reported or confirm from employer: distinct actions (brief §18). */
export function saveFollowUp(
  id: string,
  record: NonNullable<FollowUp['record']>,
  confirmed: boolean,
) {
  update((db) => ({
    ...db,
    followUps: db.followUps.map((f) =>
      f.id === id
        ? {
            ...f,
            record,
            lastContact: now().slice(0, 10),
            status: confirmed ? 'confirmed' : 'learnerReported',
          }
        : f,
    ),
  }))
}
