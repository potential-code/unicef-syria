import { Clock, Handshake, Repeat, Rocket, Sparkles, UserCheck, Users } from 'lucide-react'
import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { KpiTile } from '@/components/charts'
import { useAdminFilters } from '../lib/useAdminFilters'
import { useCurrentActivity } from '../lib/useCurrent'
import { useHistorical } from '../lib/useHistorical'
import { useLabels } from '../lib/useLabels'
import { EmploymentWindows } from './EmploymentWindows'
import { HistoricalEmpty } from './HistoricalEmpty'
import { LayerSection } from './LayerSection'
import { MeasureList } from './MeasureList'

/**
 * Employment, freelance and enterprise outcomes as separate measures (brief §19). Jobs,
 * internships and freelance work are never added into one "unique youth" figure; the only
 * combined figure is the labelled, deduplicated jobs-plus-internships count.
 */
export function OutcomeSections({ historicalExtra }: { historicalExtra?: ReactNode } = {}) {
  const { t } = useTranslation('admin')
  const { n } = useLabels()
  const { filters } = useAdminFilters()
  const current = useCurrentActivity(filters)
  const h = useHistorical(filters)
  const k = h.k
  const o = current.outcomesByType
  const confirmed = t('status.confirmed')
  return (
    <div className="space-y-6">
      <LayerSection layer="current">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,18rem),1fr))] gap-3">
          <MeasureList
            tone="blue"
            icon={Handshake}
            title={t('outcomes.currentEmployment')}
            definition={t('def.jobs')}
            items={[
              { key: 'job', label: t('outcomeType.job'), value: o.job },
              { key: 'intern', label: t('outcomeType.internship'), value: o.internship },
            ]}
            note={t('outcomes.offerNote')}
          />
          <MeasureList
            tone="cyan"
            icon={Sparkles}
            title={t('outcomes.currentFreelance')}
            definition={t('def.freelance')}
            items={[
              { key: 'sel', label: t('outcomeType.freelanceSelected'), value: o.freelanceSelected },
              {
                key: 'done',
                label: t('outcomeType.freelanceCompleted'),
                value: o.freelanceCompleted,
              },
            ]}
            note={t('outcomes.freelanceNote')}
          />
          <MeasureList
            tone="blue"
            icon={Rocket}
            title={t('outcomes.currentEnterprise')}
            definition={t('def.enterprise')}
            items={[
              {
                key: 'acc',
                label: t('outcomeType.enterpriseAccepted'),
                value: o.enterpriseAccepted,
              },
            ]}
            note={t('outcomes.enterpriseNote')}
          />
        </div>
      </LayerSection>
      <LayerSection layer="historical">
        {h.availability !== 'ok' || h.empty ? (
          <HistoricalEmpty availability={h.availability} />
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-3 min-[480px]:grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
              <KpiTile
                tone="navy"
                icon={Handshake}
                label={t('kpi.jobs')}
                value={k.jobStarts}
                denominatorLabel={t('kpi.jobsHint')}
                definition={t('def.jobs')}
                status="confirmed"
                statusLabel={confirmed}
              />
              <KpiTile
                tone="sky"
                icon={UserCheck}
                label={t('kpi.internships')}
                value={k.internships}
                denominatorLabel={t('kpi.internshipsHint')}
                definition={t('def.internships')}
                status="confirmed"
                statusLabel={confirmed}
              />
              <KpiTile
                tone="navy"
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
              />
              <KpiTile
                tone="sky"
                icon={Clock}
                label={t('kpi.daysToJob')}
                value={k.avgDaysToJob}
                kind="days"
                denominatorLabel={t('kpi.daysToJobHint', { count: k.jobStarts })}
                definition={t('def.daysToJob')}
                status="confirmed"
                statusLabel={confirmed}
              />
              <KpiTile
                tone="navy"
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
                extra={t('kpi.unknown', { count: k.retention.unknown })}
              />
            </div>
            <EmploymentWindows k={k} />
            <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,18rem),1fr))] gap-3">
              <MeasureList
                tone="sky"
                icon={Sparkles}
                title={t('kpi.freelance')}
                definition={t('def.freelance')}
                items={[
                  { key: 'c', label: t('kpi.freelanceCompleted'), value: k.freelance.completed },
                  { key: 'e', label: t('kpi.freelanceEarners'), value: k.freelance.earners },
                  { key: 'r', label: t('kpi.freelanceRepeat'), value: k.freelance.repeatClients },
                ]}
                note={t('kpi.freelanceNote')}
              />
              <MeasureList
                tone="navy"
                icon={Rocket}
                title={t('kpi.enterprise')}
                definition={t('def.enterprise')}
                items={[
                  { key: 'c', label: t('kpi.concepts'), value: k.enterprise.concepts },
                  { key: 't', label: t('kpi.tests'), value: k.enterprise.tests },
                  { key: 'a', label: t('kpi.acceptances'), value: k.enterprise.acceptances },
                  { key: 's', label: t('kpi.firstSales'), value: k.enterprise.firstSales },
                ]}
                note={t('kpi.enterpriseNote')}
              />
            </div>
            {historicalExtra}
          </div>
        )}
      </LayerSection>
    </div>
  )
}
