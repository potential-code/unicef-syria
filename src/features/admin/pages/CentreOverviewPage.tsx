import { Link } from '@tanstack/react-router'
import { BarChart3, BookOpen, FileCheck2, MapPin, Users } from 'lucide-react'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { useFollowUps } from '@/store/actions/followups'
import { useAllYouth } from '@/store/actions/youth'
import { AdminHero } from '../components/AdminHero'
import { AlertList } from '../components/AlertList'
import { CurrentActivityPanel } from '../components/CurrentActivityPanel'
import { DrillCards } from '../components/DrillCards'
import { HistoricalEmpty } from '../components/HistoricalEmpty'
import { HistoricalKpis } from '../components/HistoricalKpis'
import { LayerSection } from '../components/LayerSection'
import { ReportContext } from '../components/ReportContext'
import { opsAlerts } from '../lib/alerts'
import { useAdminFilters } from '../lib/useAdminFilters'
import { useCurrentActivity } from '../lib/useCurrent'
import { useHistorical } from '../lib/useHistorical'
import { useLabels } from '../lib/useLabels'
import { useScope } from '../lib/useScope'

/** Centre administrator overview: own centre only, alerts first, then the two data layers. */
export function CentreOverviewPage() {
  const { t } = useTranslation('admin')
  const { centre, partner, value } = useLabels()
  const { centreIds, centres, governorates } = useScope()
  const youth = useAllYouth()
  const followUps = useFollowUps()
  const { filters } = useAdminFilters()
  const current = useCurrentActivity(filters)
  const h = useHistorical(filters)
  const alerts = useMemo(
    () => opsAlerts(Object.values(youth), followUps, centreIds),
    [youth, followUps, centreIds],
  )
  const c = centres[0]
  return (
    <div className="space-y-6">
      <AdminHero
        eyebrow={t('centre.eyebrow', { id: c?.id })}
        title={centre(c?.id)}
        body={
          <span className="inline-flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="inline-flex items-center gap-1">
              <MapPin className="size-4" aria-hidden />
              {value('governorate', c?.governorate ?? 'Damascus')}
            </span>
            <span>{t('centre.partnerLine', { partner: partner(c?.partnerId) })}</span>
          </span>
        }
        actions={
          <Button
            asChild
            variant="secondary"
            className="rounded-full bg-white text-navy hover:bg-sky-100"
          >
            <Link to="/centre/reports">
              <BarChart3 className="size-4" aria-hidden />
              {t('centre.openReports')}
            </Link>
          </Button>
        }
      />
      <ReportContext />
      <AlertList
        alerts={alerts}
        governorates={governorates}
        targets={{
          completion: (a) => ({
            to: '/centre/participants',
            search: { cohortId: a.cohortId ?? '', view: 'completion' },
          }),
          practical: () => ({ to: '/centre/participants', search: { view: 'practicals' } }),
        }}
        missingNote={alerts.some((a) => a.kind === 'followUp') ? undefined : t('alerts.noFollowUp')}
      />
      <LayerSection layer="current">
        <CurrentActivityPanel data={current} />
      </LayerSection>
      <LayerSection
        layer="historical"
        actions={
          <Link
            to="/centre/reports"
            className="inline-flex h-9 items-center gap-1 rounded-full bg-white px-3 text-sm font-semibold text-blue shadow-xs ring-1 ring-blue/20 hover:bg-blue hover:text-white"
          >
            {t('centre.fullReport')}
          </Link>
        }
      >
        {h.availability !== 'ok' || h.empty ? (
          <HistoricalEmpty availability={h.availability} />
        ) : (
          <HistoricalKpis h={h} show="headline" />
        )}
      </LayerSection>
      <DrillCards
        items={[
          {
            to: '/centre/courses',
            icon: BookOpen,
            title: t('common:nav.centre.courses'),
            body: t('centre.drill.courses'),
          },
          {
            to: '/centre/participants',
            icon: Users,
            title: t('common:nav.centre.participants'),
            body: t('centre.drill.participants'),
          },
          {
            to: '/centre/results',
            icon: FileCheck2,
            title: t('common:nav.centre.results'),
            body: t('centre.drill.results'),
          },
          {
            to: '/centre/reports',
            icon: BarChart3,
            title: t('common:nav.centre.reports'),
            body: t('centre.drill.reports'),
          },
        ]}
      />
    </div>
  )
}
