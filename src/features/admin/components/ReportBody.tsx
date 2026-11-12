import { useAdminFilters } from '../lib/useAdminFilters'
import { useCurrentActivity } from '../lib/useCurrent'
import { useHistorical } from '../lib/useHistorical'
import { CurrentActivityPanel } from './CurrentActivityPanel'
import { EmploymentWindows } from './EmploymentWindows'
import { HistoricalEmpty } from './HistoricalEmpty'
import { HistoricalKpis } from './HistoricalKpis'
import { LayerSection } from './LayerSection'
import { ParticipationCharts } from './ParticipationCharts'

/**
 * The two-layer report used by every dashboard: live current-cohort activity first, then the
 * synthetic historical outcomes, both driven by the same filter context.
 */
export function ReportBody({
  recordsTo,
  showCurrent = true,
  charts = true,
  windows = true,
}: {
  recordsTo?: string
  showCurrent?: boolean
  charts?: boolean
  windows?: boolean
}) {
  const { filters } = useAdminFilters()
  const current = useCurrentActivity(filters)
  const h = useHistorical(filters)
  return (
    <div className="space-y-6">
      {showCurrent && (
        <LayerSection layer="current">
          <CurrentActivityPanel data={current} recordsTo={recordsTo} />
        </LayerSection>
      )}
      <LayerSection layer="historical">
        {h.availability !== 'ok' || h.empty ? (
          <HistoricalEmpty availability={h.availability} />
        ) : (
          <div className="space-y-4">
            <HistoricalKpis h={h} />
            {windows && <EmploymentWindows k={h.k} />}
            {charts && <ParticipationCharts rows={h.rows} />}
          </div>
        )}
      </LayerSection>
    </div>
  )
}
