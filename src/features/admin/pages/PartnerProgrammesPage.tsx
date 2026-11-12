import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { PageHeader } from '@/components/shared/PageHeader'
import { useFollowUps } from '@/store/actions/followups'
import { useAllYouth } from '@/store/actions/youth'
import { ActionList } from '../components/ActionList'
import { FilterBar } from '../components/FilterBar'
import { HistoricalEmpty } from '../components/HistoricalEmpty'
import { HistoricalKpis } from '../components/HistoricalKpis'
import { LayerSection } from '../components/LayerSection'
import { ProgrammeTable } from '../components/ProgrammeTable'
import { ReportContext } from '../components/ReportContext'
import { programmeActions } from '../lib/programmeActions'
import { useAdminFilters } from '../lib/useAdminFilters'
import { useHistorical } from '../lib/useHistorical'
import { useLabels } from '../lib/useLabels'
import { useScope } from '../lib/useScope'

/** Programme performance, drilled from partner to centre to programme, with an action list. */
export function PartnerProgrammesPage() {
  const { t } = useTranslation('admin')
  const { centre, programme } = useLabels()
  const { filters, linkSearch } = useAdminFilters()
  const { centreIds } = useScope()
  const youth = useAllYouth()
  const followUps = useFollowUps()
  const h = useHistorical(filters)
  const scopeCentres = filters.centreId ? [filters.centreId] : centreIds
  const actions = useMemo(
    () =>
      filters.programmeId
        ? programmeActions(
            t,
            filters.programmeId,
            scopeCentres,
            Object.values(youth),
            followUps,
            h.k,
          )
        : [],
    [t, filters.programmeId, scopeCentres, youth, followUps, h.k],
  )
  const crumbs = [
    { label: t('common:nav.partner.overview'), to: '/partner' },
    ...(filters.centreId
      ? [{ label: `${filters.centreId} ${centre(filters.centreId)}`, to: '/partner/centres' }]
      : []),
    {
      label: filters.programmeId
        ? `${filters.programmeId} ${programme(filters.programmeId)}`
        : t('common:nav.partner.programmes'),
    },
  ]
  return (
    <div className="space-y-6">
      <PageHeader
        title={filters.programmeId ? programme(filters.programmeId) : t('partner.programmes.title')}
        description={t('partner.programmes.body')}
        crumbs={crumbs}
      />
      <FilterBar
        keys={[
          'governorate',
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
      <ProgrammeTable
        filters={{ ...filters, programmeId: undefined }}
        to="/partner/programmes"
        selected={filters.programmeId}
      />
      {filters.programmeId && (
        <div className="grid gap-4">
          <LayerSection layer="historical">
            {h.availability !== 'ok' || h.empty ? (
              <HistoricalEmpty availability={h.availability} />
            ) : (
              <HistoricalKpis h={h} show="headline" />
            )}
          </LayerSection>
          <ActionList
            title={t('actions.title', { programme: programme(filters.programmeId) })}
            items={actions.map((a) =>
              a.to
                ? { ...a, search: { ...(linkSearch() as Record<string, string>), ...a.search } }
                : a,
            )}
          />
        </div>
      )}
      {!filters.programmeId && (
        <p className="card border-s-4 border-s-blue p-4 text-sm text-ink-soft">
          {t('partner.programmes.pick')}
        </p>
      )}
    </div>
  )
}
