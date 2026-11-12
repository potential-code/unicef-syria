import { useMemo } from 'react'
import { useApplications } from '@/store/actions/applications'
import { useFollowUps } from '@/store/actions/followups'
import { useSessions } from '@/store/actions/sessions'
import { useAllYouth } from '@/store/actions/youth'
import { useDb } from '@/store/db'
import { currentActivity } from './current'
import type { AdminFilters } from './filters'

export function useCurrentActivity(f: AdminFilters) {
  const youth = useAllYouth()
  const applications = useApplications()
  const outcomes = useDb((db) => db.outcomes)
  const followUps = useFollowUps()
  const sessions = useSessions()
  return useMemo(
    () => currentActivity(youth, applications, outcomes, followUps, sessions, f),
    [youth, applications, outcomes, followUps, sessions, f],
  )
}
