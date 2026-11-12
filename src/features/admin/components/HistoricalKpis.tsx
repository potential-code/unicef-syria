import {
  Clock,
  Compass,
  GraduationCap,
  Handshake,
  Repeat,
  Rocket,
  Sparkles,
  UserCheck,
  UserPlus,
  Users,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { KpiTile } from '@/components/charts'
import { pct } from '@/domain/kpi'
import type { Historical } from '../lib/useHistorical'
import { useLabels } from '../lib/useLabels'
import { MeasureList } from './MeasureList'

/** Historical sample KPI tiles: every brief §19 metric with numerator, denominator and status. */
export function HistoricalKpis({ h, show = 'all' }: { h: Historical; show?: 'all' | 'headline' }) {
  const { t } = useTranslation('admin')
  const { n } = useLabels()
  const k = h.k
  const confirmed = t('status.confirmed')
  const recorded = t('status.recorded')
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-1 gap-3 min-[420px]:grid-cols-2 lg:grid-cols-4">
        <KpiTile
          icon={UserPlus}
          label={t('kpi.registered')}
          value={k.registered}
          denominatorLabel={t('kpi.registeredHint')}
          definition={t('def.registered')}
          status="activity"
          statusLabel={recorded}
        />
        <KpiTile
          icon={Users}
          label={t('kpi.active')}
          value={k.active}
          numerator={k.active}
          denominator={k.registered}
          denominatorLabel={t('kpi.activeDen')}
          definition={t('def.active')}
          status="activity"
          statusLabel={recorded}
          extra={
            <p className="text-xs text-ink-soft">
              {t('kpi.share', { rate: pct(k.active, k.registered) ?? 0 })}
            </p>
          }
        />
        <KpiTile
          icon={GraduationCap}
          label={t('kpi.completion')}
          value={k.completionRate.value}
          kind="pct"
          numerator={k.completionRate.numerator}
          denominator={k.completionRate.denominator}
          denominatorLabel={t('kpi.completionDen')}
          definition={t('def.completion')}
          status="activity"
          statusLabel={recorded}
        />
        <KpiTile
          icon={Compass}
          label={t('kpi.guidance')}
          value={k.guidanceCoverage.value}
          kind="pct"
          numerator={k.guidanceCoverage.numerator}
          denominator={k.guidanceCoverage.denominator}
          denominatorLabel={t('kpi.guidanceDen')}
          definition={t('def.guidance')}
          status="activity"
          statusLabel={recorded}
        />
      </div>
      {show === 'all' && (
        <>
          <div className="grid grid-cols-1 gap-3 min-[420px]:grid-cols-2 lg:grid-cols-4">
            <KpiTile
              icon={Handshake}
              label={t('kpi.jobs')}
              value={k.jobStarts}
              denominatorLabel={t('kpi.jobsHint')}
              definition={t('def.jobs')}
              status="confirmed"
              statusLabel={confirmed}
            />
            <KpiTile
              icon={UserCheck}
              label={t('kpi.internships')}
              value={k.internships}
              denominatorLabel={t('kpi.internshipsHint')}
              definition={t('def.internships')}
              status="confirmed"
              statusLabel={confirmed}
            />
            <KpiTile
              icon={Users}
              label={t('kpi.uniquePlaced')}
              value={k.uniquePlaced}
              denominatorLabel={t('kpi.uniquePlacedHint', {
                jobs: n(k.jobStarts),
                interns: n(k.internships),
                both: n(h.totals.bothPlacements ?? 0),
              })}
              definition={t('def.uniquePlaced')}
              status="confirmed"
              statusLabel={confirmed}
              emphasis
            />
            <KpiTile
              icon={Clock}
              label={t('kpi.daysToJob')}
              value={k.avgDaysToJob}
              kind="days"
              denominatorLabel={t('kpi.daysToJobHint', { count: k.jobStarts })}
              definition={t('def.daysToJob')}
              status="confirmed"
              statusLabel={confirmed}
            />
          </div>
          <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
            <KpiTile
              icon={Repeat}
              label={t('kpi.retention')}
              value={k.retention.rate.value}
              kind="pct"
              numerator={k.retention.rate.numerator}
              denominator={k.retention.rate.denominator}
              denominatorLabel={t('kpi.retentionDen')}
              definition={t('def.retention')}
              status="confirmed"
              statusLabel={t('status.followUp')}
              extra={
                <p className="text-xs text-ink-soft">
                  {t('kpi.unknown', { count: k.retention.unknown })}
                </p>
              }
            />
            <MeasureList
              icon={Sparkles}
              title={t('kpi.freelance')}
              definition={t('def.freelance')}
              items={[
                {
                  key: 'completed',
                  label: t('kpi.freelanceCompleted'),
                  value: k.freelance.completed,
                },
                { key: 'earners', label: t('kpi.freelanceEarners'), value: k.freelance.earners },
                {
                  key: 'repeat',
                  label: t('kpi.freelanceRepeat'),
                  value: k.freelance.repeatClients,
                },
              ]}
              note={t('kpi.freelanceNote')}
            />
            <MeasureList
              icon={Rocket}
              title={t('kpi.enterprise')}
              definition={t('def.enterprise')}
              items={[
                { key: 'concepts', label: t('kpi.concepts'), value: k.enterprise.concepts },
                { key: 'tests', label: t('kpi.tests'), value: k.enterprise.tests },
                {
                  key: 'acceptances',
                  label: t('kpi.acceptances'),
                  value: k.enterprise.acceptances,
                },
                { key: 'sales', label: t('kpi.firstSales'), value: k.enterprise.firstSales },
              ]}
              note={t('kpi.enterpriseNote')}
            />
          </div>
        </>
      )}
    </div>
  )
}
