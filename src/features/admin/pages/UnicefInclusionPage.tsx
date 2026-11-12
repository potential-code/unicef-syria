import { ShieldCheck } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { PageHeader } from '@/components/shared/PageHeader'
import { FilterBar } from '../components/FilterBar'
import { HistoricalEmpty } from '../components/HistoricalEmpty'
import { InclusionTable } from '../components/InclusionTable'
import { LayerSection } from '../components/LayerSection'
import { ParticipationCharts } from '../components/ParticipationCharts'
import { ReportContext } from '../components/ReportContext'
import { useAdminFilters } from '../lib/useAdminFilters'
import { useHistorical } from '../lib/useHistorical'

/** Reach and inclusion: aggregate only, never individual support needs (brief §22). */
export function UnicefInclusionPage() {
  const { t } = useTranslation('admin')
  const { filters } = useAdminFilters()
  const h = useHistorical(filters)
  return (
    <div className="space-y-6">
      <PageHeader title={t('inclusion.title')} description={t('inclusion.body')} />
      <aside className="flex items-start gap-3 rounded-2xl border border-cyan/40 bg-sky-50 p-4 text-sm">
        <ShieldCheck className="mt-0.5 size-5 shrink-0 text-blue" aria-hidden />
        <p>{t('inclusion.privacy')}</p>
      </aside>
      <FilterBar />
      <ReportContext />
      <LayerSection layer="historical">
        {h.availability !== 'ok' || h.empty ? (
          <HistoricalEmpty availability={h.availability} />
        ) : (
          <div className="space-y-4">
            <ParticipationCharts rows={h.rows} />
            <div className="grid gap-3 xl:grid-cols-2">
              <InclusionTable rows={h.rows} dim="disability" />
              <InclusionTable rows={h.rows} dim="gender" />
            </div>
          </div>
        )}
      </LayerSection>
    </div>
  )
}
