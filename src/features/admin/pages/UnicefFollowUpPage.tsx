import { Info } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { PageHeader } from '@/components/shared/PageHeader'
import { CENTRES } from '@/data/orgs'
import { useFollowUps } from '@/store/actions/followups'
import { FilterBar } from '../components/FilterBar'
import { FollowUpSummary } from '../components/FollowUpSummary'
import { FollowUpTable } from '../components/FollowUpTable'
import { HistoricalEmpty } from '../components/HistoricalEmpty'
import { LayerSection } from '../components/LayerSection'
import { PathwayValue } from '../components/PathwayValue'
import { ReportContext } from '../components/ReportContext'
import { useAdminFilters } from '../lib/useAdminFilters'
import { useHistorical } from '../lib/useHistorical'

/** Follow-up oversight: due 3, 6 and 12-month follow-ups, with the short form per record. */
export function UnicefFollowUpPage() {
  const { t } = useTranslation('admin')
  const { filters } = useAdminFilters()
  const h = useHistorical(filters)
  const items = useFollowUps().filter((f) => {
    const c = CENTRES.find((x) => x.id === f.centreId)
    return (
      (!filters.centreId || filters.centreId === f.centreId) &&
      (!filters.partnerId || filters.partnerId === c?.partnerId) &&
      (!filters.governorate || filters.governorate === c?.governorate)
    )
  })
  return (
    <div className="space-y-6">
      <PageHeader
        title={t('followup.title')}
        description={t('followup.body')}
        crumbs={[
          { label: t('common:nav.unicef.overview'), to: '/unicef' },
          { label: t('common:nav.unicef.followup') },
        ]}
      />
      <FilterBar
        keys={[
          'governorate',
          'partnerId',
          'centreId',
          'programmeId',
          'route',
          'gender',
          'ageGroup',
          'disability',
          'period',
        ]}
      />
      <ReportContext />
      <LayerSection layer="current">
        <div className="space-y-3">
          <p className="flex items-start gap-2 rounded-2xl bg-sky-50 p-3 text-sm text-ink-soft">
            <Info className="mt-0.5 size-4 shrink-0 text-blue" aria-hidden />
            {t('followup.reminderNote')}
          </p>
          <FollowUpTable items={items} />
        </div>
      </LayerSection>
      <LayerSection layer="historical">
        {h.availability !== 'ok' || h.empty ? (
          <HistoricalEmpty availability={h.availability} />
        ) : (
          <FollowUpSummary k={h.k} />
        )}
      </LayerSection>
      <PathwayValue />
    </div>
  )
}
