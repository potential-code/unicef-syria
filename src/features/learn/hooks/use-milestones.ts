import type { CareerRoute, Youth } from '@shared/types'
import { useMemo } from 'react'
import { ROUTE_MILESTONES } from '@/domain/paths'
import { useApplications } from '@/store/actions/applications'

const DISCUSSED = ['clientDiscussion', 'selected', 'inDelivery', 'completed']

/** Route milestones (brief §5) with whether each is met from toolkit, progress and applications. */
export function useMilestones(y: Youth, route: CareerRoute | undefined) {
  const all = useApplications()
  return useMemo(() => {
    if (!route) return []
    const apps = all.filter((a) => a.youthId === y.id)
    const sent = (track: string) =>
      apps.some((a) => a.track === track && a.stage !== 'draft' && a.stage !== 'withdrawn')
    const done = (id: keyof Youth['progress']) => !!y.progress[id]?.completedAt
    const b = y.toolkit.business
    const f = y.toolkit.freelanceProfile
    const met: Record<string, boolean> = {
      profile: y.profileComplete,
      cv: !!y.toolkit.cv,
      interview: y.toolkit.interviews.length > 0,
      evidence: Object.values(y.progress).some((p) => p?.completedAt),
      application: sent('employment'),
      problem: !!b?.problem,
      customerEvidence: !!b?.evidence || (b?.questions.length ?? 0) > 0,
      businessModel: !!b?.model,
      cashPlan: !!b?.costs,
      pitch: done('C16') || sent('enterprise'),
      serviceProfile: !!f?.services,
      workSample: !!f?.samples,
      proposal: y.toolkit.proposals.length > 0,
      clientDiscussion: apps.some((a) => a.track === 'freelance' && DISCUSSED.includes(a.stage)),
      assignment: sent('freelance'),
    }
    return ROUTE_MILESTONES[route].map((key) => ({ key, met: !!met[key] }))
  }, [all, y, route])
}
