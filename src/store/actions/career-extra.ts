import type { OpportunityId, OutcomeType, YouthId } from '@shared/types'
import { now } from '@/lib/clock'
import { update } from '../db'

/**
 * Learner-reported outcome (brief §15 Y15): stored with source 'learnerReported' and
 * confirmed false, so it shows as "pending confirmation" and never counts as a confirmed
 * placement until the employer or client records it.
 */
export function reportOutcome(youthId: YouthId, opportunityId: OpportunityId, type: OutcomeType) {
  update((db) => {
    const id = `OUT-LR-${opportunityId}-${youthId}-${type}`
    if (db.outcomes.some((o) => o.id === id)) return db
    return {
      ...db,
      outcomes: [
        ...db.outcomes,
        {
          id,
          youthId,
          type,
          opportunityId,
          date: now(),
          source: 'learnerReported' as const,
          confirmed: false,
        },
      ],
    }
  })
}
