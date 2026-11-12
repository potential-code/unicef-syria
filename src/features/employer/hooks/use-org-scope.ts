import type { Application, Opportunity, Organisation, Outcome } from '@shared/types'
import { useMemo } from 'react'
import { ORGANISATIONS } from '@/data/orgs'
import { useApplications, useOpportunities } from '@/store/actions/applications'
import { useDb } from '@/store/db'
import { useMe } from '@/store/hooks'

export interface OrgScope {
  org: Organisation
  approved: boolean
  opportunities: Opportunity[]
  /** Submitted applications only: employers never see a learner's draft. */
  applications: Application[]
  outcomes: Outcome[]
}

/** Own organisation only (brief §1 role access, §16). */
export function useOrgScope(): OrgScope {
  const me = useMe()
  const orgId = me.orgId ?? 'ORG01'
  const all = useOpportunities()
  const apps = useApplications()
  const outcomes = useDb((db) => db.outcomes)
  const approvedOverride = useDb((db) => db.orgApproved[orgId])
  return useMemo(() => {
    const org = (ORGANISATIONS as readonly Organisation[]).find(
      (o) => o.id === orgId,
    ) as Organisation
    const opportunities = all.filter((o) => o.orgId === orgId)
    const ids = new Set(opportunities.map((o) => o.id))
    return {
      org,
      approved: org.approved || !!approvedOverride,
      opportunities,
      applications: apps.filter((a) => ids.has(a.opportunityId) && a.stage !== 'draft'),
      outcomes: outcomes.filter((o) => !!o.opportunityId && ids.has(o.opportunityId)),
    }
  }, [orgId, all, apps, outcomes, approvedOverride])
}
