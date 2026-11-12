import { useMemo } from 'react'
import { ANALYTICS_ROWS } from '@/data/analytics'
import { filterRows, kpis, sumRows } from '@/domain/kpi'
import { type AdminFilters, historicalAvailability, toKpiFilters } from './filters'

/** Historical sample layer (snapshot 1 Nov 2026), filtered with the same context. */
export function useHistorical(f: AdminFilters) {
  return useMemo(() => {
    const availability = historicalAvailability(f)
    const rows = availability === 'ok' ? filterRows(ANALYTICS_ROWS, toKpiFilters(f)) : []
    const totals = sumRows(rows)
    return {
      availability,
      rows,
      totals,
      k: kpis(totals),
      empty: rows.length === 0 || (totals.registered ?? 0) === 0,
    }
  }, [f])
}
export type Historical = ReturnType<typeof useHistorical>
