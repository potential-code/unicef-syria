import { Building2, Route, TrendingUp, Users } from 'lucide-react'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { COHORTS } from '@/data/orgs'
import { useFollowUps } from '@/store/actions/followups'
import { useAllYouth } from '@/store/actions/youth'
import { AdminHero } from '../components/AdminHero'
import { AlertList } from '../components/AlertList'
import { CentreCompare } from '../components/CentreCompare'
import { CurrentActivityPanel } from '../components/CurrentActivityPanel'
import { DrillCards } from '../components/DrillCards'
import { HistoricalEmpty } from '../components/HistoricalEmpty'
import { LayerSection } from '../components/LayerSection'
import { ReportContext } from '../components/ReportContext'
import { opsAlerts } from '../lib/alerts'
import { useAdminFilters } from '../lib/useAdminFilters'
import { useCurrentActivity } from '../lib/useCurrent'
import { useHistorical } from '../lib/useHistorical'
import { useLabels } from '../lib/useLabels'
import { useScope } from '../lib/useScope'

/** Partner overview across own centres: alerts, live activity, centre comparison. */
export function PartnerOverviewPage() {
  const { t } = useTranslation('admin')
  const { partner, centre } = useLabels()
  const { me, centreIds, governorates } = useScope()
  const youth = useAllYouth()
  const followUps = useFollowUps()
  const { filters } = useAdminFilters()
  const current = useCurrentActivity(filters)
  const h = useHistorical(filters)
  const alerts = useMemo(
    () => opsAlerts(Object.values(youth), followUps, centreIds),
    [youth, followUps, centreIds],
  )
  return (
    <div className="space-y-6">
      <AdminHero
        eyebrow={t('partner.eyebrow', { id: me.partnerId })}
        title={partner(me.partnerId)}
        body={t('partner.body', { centres: centreIds.map((c) => `${c} ${centre(c)}`).join(', ') })}
      />
      <ReportContext />
      <AlertList
        alerts={alerts}
        governorates={governorates}
        targets={{
          completion: (a) => {
            const k = COHORTS.find((c) => c.id === a.cohortId)
            return {
              to: '/partner/programmes',
              search: { centreId: k?.centreId ?? '', programmeId: k?.programmeId ?? '' },
            }
          },
          followUp: () => ({ to: '/partner/participants', search: {} }),
          practical: (a) => ({
            to: '/partner/participants',
            search: { view: 'learners', focus: a.youthIds?.[0] ?? '' },
          }),
        }}
      />
      <LayerSection layer="current">
        <CurrentActivityPanel data={current} recordsTo="/partner/participants" />
      </LayerSection>
      <LayerSection layer="historical">
        {h.availability !== 'ok' || h.empty ? (
          <HistoricalEmpty availability={h.availability} />
        ) : (
          <CentreCompare
            centreIds={centreIds.filter((c) => !filters.centreId || c === filters.centreId)}
            filters={filters}
          />
        )}
      </LayerSection>
      <DrillCards
        items={[
          {
            to: '/partner/centres',
            icon: Building2,
            title: t('common:nav.partner.centres'),
            body: t('partner.drill.centres'),
          },
          {
            to: '/partner/programmes',
            icon: Route,
            title: t('common:nav.partner.programmes'),
            body: t('partner.drill.programmes'),
          },
          {
            to: '/partner/participants',
            icon: Users,
            title: t('common:nav.partner.participants'),
            body: t('partner.drill.participants'),
          },
          {
            to: '/partner/outcomes',
            icon: TrendingUp,
            title: t('common:nav.partner.outcomes'),
            body: t('partner.drill.outcomes'),
          },
        ]}
      />
    </div>
  )
}
