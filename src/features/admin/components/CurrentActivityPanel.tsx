import type { ApplicationStage, OutcomeType } from '@shared/types'
import { Link } from '@tanstack/react-router'
import { Briefcase, CalendarCheck, ClipboardList, Layers, UserRound, Users } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { ChartLegend, KpiTile, StackedBar } from '@/components/charts'
import { EmptyState } from '@/components/shared/EmptyState'
import { pct } from '@/domain/kpi'
import type { CurrentActivity } from '../lib/current'
import { STAGE_COLOR, STAGE_GROUP, STAGE_GROUPS } from '../lib/stages'
import { useAdminFilters } from '../lib/useAdminFilters'
import { useLabels } from '../lib/useLabels'

const OUTCOME_TYPES: OutcomeType[] = [
  'job',
  'internship',
  'freelanceSelected',
  'freelanceCompleted',
  'enterpriseAccepted',
]

/** Live counts from the demo store for cohorts K01 to K03 and the named learners. */
export function CurrentActivityPanel({
  data,
  recordsTo,
}: {
  data: CurrentActivity
  recordsTo?: string
}) {
  const { t } = useTranslation('admin')
  const { n, p } = useLabels()
  const { linkSearch } = useAdminFilters()
  if (data.youth.length === 0 && data.cohorts.length === 0)
    return <EmptyState icon={Users} title={t('empty.currentTitle')} body={t('empty.currentBody')} />
  const groups = STAGE_GROUPS.map((g) => ({
    key: g,
    label: t(`stageGroup.${g}`),
    color: STAGE_COLOR[g],
    value: (Object.entries(data.byStage) as [ApplicationStage, number][])
      .filter(([s]) => STAGE_GROUP[s] === g)
      .reduce((a, [, v]) => a + v, 0),
  }))
  const live = t('status.live')
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-3 min-[420px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        <KpiTile
          icon={Layers}
          label={t('current.places')}
          value={data.cohortPlaces}
          denominatorLabel={t('current.placesHint', {
            count: data.cohorts.length,
            ids: data.cohorts.map((c) => c.id).join(', ') || t('none'),
          })}
          definition={t('def.places')}
          status="live"
          statusLabel={live}
        />
        <KpiTile
          icon={UserRound}
          label={t('current.learners')}
          value={data.youth.length}
          denominatorLabel={t('current.learnersHint', { count: data.inCohort.length })}
          definition={t('def.learners')}
          status="live"
          statusLabel={live}
        />
        <KpiTile
          icon={Users}
          label={t('current.active')}
          value={data.active.length}
          numerator={data.active.length}
          denominator={data.youth.length}
          denominatorLabel={t('current.activeDen')}
          definition={t('def.currentActive')}
          status="activity"
          statusLabel={t('status.activity')}
        />
        <KpiTile
          icon={CalendarCheck}
          label={t('current.attendance')}
          value={data.attendance.present}
          numerator={data.attendance.present}
          denominator={data.attendance.marked}
          denominatorLabel={t('current.attendanceDen')}
          definition={t('def.attendance')}
          status="activity"
          statusLabel={t('status.trainerRecorded')}
          extra={
            <p className="text-xs text-ink-soft">
              {t('current.attendanceRate', {
                rate: p(pct(data.attendance.present, data.attendance.marked)),
              })}
            </p>
          }
        />
        <KpiTile
          icon={ClipboardList}
          label={t('current.practicals')}
          value={data.pendingPracticals.length}
          denominatorLabel={t('current.practicalsHint')}
          definition={t('def.practicals')}
          status="live"
          statusLabel={live}
        />
      </div>
      <div className="grid gap-3 lg:grid-cols-2">
        <div className="rounded-2xl border bg-card p-5 shadow-sm">
          <div className="flex items-baseline justify-between gap-2">
            <p className="font-semibold text-ink">{t('current.applications')}</p>
            <p className="text-xs text-ink-soft">
              {t('current.applicationsTotal', { count: data.applications.length })}
            </p>
          </div>
          <p className="mb-3 text-xs text-ink-soft">{t('current.applicationsHint')}</p>
          <StackedBar
            segments={groups}
            ariaLabel={groups.map((g) => `${g.label} ${g.value}`).join(', ')}
            format={n}
          />
          <div className="mt-3">
            <ChartLegend
              items={groups.map((g) => ({
                key: g.key,
                label: `${g.label} (${n(g.value)})`,
                color: g.color,
              }))}
            />
          </div>
        </div>
        <div className="rounded-2xl border bg-card p-5 shadow-sm">
          <p className="flex items-center gap-2 font-semibold text-ink">
            <Briefcase className="size-4 text-blue" aria-hidden />
            {t('current.outcomes')}
          </p>
          <p className="mb-3 text-xs text-ink-soft">{t('current.outcomesHint')}</p>
          <dl className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {OUTCOME_TYPES.map((o) => (
              <div key={o} className="rounded-xl bg-sky-50 px-3 py-2">
                <dt className="text-xs text-ink-soft">{t(`outcomeType.${o}`)}</dt>
                <dd className="text-xl font-bold tabular-nums text-ink">
                  {n(data.outcomesByType[o])}
                </dd>
              </div>
            ))}
          </dl>
          {recordsTo && (
            <Link
              to={recordsTo}
              search={linkSearch()}
              className="mt-3 inline-flex min-h-11 items-center text-sm font-semibold text-blue hover:underline"
            >
              {t('current.openRecords')}
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
