import type { CentreId } from '@shared/types'
import { useMemo } from 'react'
import { CENTRES } from '@/data/orgs'
import { centresInScope, cohortsInScope } from '@/domain/access'
import { useMe } from '@/store/hooks'

/** Centres, cohorts and governorates the signed-in admin may see. */
export function useScope() {
  const me = useMe()
  return useMemo(() => {
    const centreIds: CentreId[] = centresInScope(me)
    return {
      me,
      centreIds,
      cohortIds: cohortsInScope(me),
      centres: CENTRES.filter((c) => centreIds.includes(c.id)),
      governorates: CENTRES.filter((c) => centreIds.includes(c.id)).map(
        (c) => c.governorate as string,
      ),
    }
  }, [me])
}
