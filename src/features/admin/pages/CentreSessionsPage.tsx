import { CalendarX2, MapPin, Monitor } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { CHART, ChartLegend, StackedBar } from '@/components/charts'
import { EmptyState } from '@/components/shared/EmptyState'
import { PageHeader } from '@/components/shared/PageHeader'
import { StatusBadge } from '@/components/shared/StatusBadge'
import { COHORTS } from '@/data/orgs'
import { formatTime } from '@/i18n'
import { nowMs } from '@/lib/clock'
import { useSessions } from '@/store/actions/sessions'
import { useAllYouth } from '@/store/actions/youth'
import { useLabels } from '../lib/useLabels'
import { useScope } from '../lib/useScope'

/** Session capacity and attendance for the own centre's cohorts. */
export function CentreSessionsPage() {
  const { t } = useTranslation('admin')
  const { l, d, n, lang, trainer, centre } = useLabels()
  const { cohortIds } = useScope()
  const youth = Object.values(useAllYouth())
  const sessions = useSessions()
    .filter((s) => s.cohortId && cohortIds.includes(s.cohortId))
    .sort((a, b) => a.start.localeCompare(b.start))
  const legend = [
    { key: 'present', label: t('common:attendance.present'), color: CHART.primary },
    { key: 'excused', label: t('common:attendance.excused'), color: CHART.secondary },
    { key: 'absent', label: t('common:attendance.absent'), color: CHART.accent },
    { key: 'unmarked', label: t('common:attendance.unmarked'), color: CHART.neutral },
  ]
  return (
    <div className="space-y-6">
      <PageHeader title={t('sessions.title')} description={t('sessions.body')} />
      <ChartLegend items={legend} />
      {sessions.length === 0 && (
        <EmptyState
          icon={CalendarX2}
          title={t('empty.noSessions')}
          body={t('empty.noSessionsBody')}
        />
      )}
      <ul className="space-y-3">
        {sessions.map((s) => {
          const cohort = COHORTS.find((c) => c.id === s.cohortId)
          const members = youth.filter((y) => s.cohortId && y.cohortIds.includes(s.cohortId))
          const count = (m: string) =>
            members.filter((y) => (y.attendance[s.id] ?? 'unmarked') === m).length
          const past = Date.parse(s.end) < nowMs()
          return (
            <li
              key={s.id}
              className="grid gap-4 rounded-2xl border bg-white p-5 shadow-sm md:grid-cols-[1.3fr_1fr]"
            >
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-lg bg-blue px-2 py-0.5 text-xs font-bold text-white">
                    {s.id}
                  </span>
                  <StatusBadge tone={past ? 'neutral' : 'info'}>
                    {past ? t('sessions.held') : t('sessions.upcoming')}
                  </StatusBadge>
                </div>
                <h2 className="mt-2 text-lg">{l(s.title)}</h2>
                <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-ink-soft">
                  <span>
                    {d(s.start)} · {formatTime(s.start, lang)}–{formatTime(s.end, lang)}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    {s.format === 'online' ? (
                      <Monitor className="size-4" aria-hidden />
                    ) : (
                      <MapPin className="size-4" aria-hidden />
                    )}
                    {s.format === 'online' ? t('common:format.online') : centre(s.centreId)}
                  </span>
                  <span>
                    {cohort?.id} · {trainer(s.trainerId ?? undefined)}
                  </span>
                </p>
              </div>
              <div className="space-y-2">
                <p className="flex justify-between text-sm">
                  <span className="text-ink-soft">{t('sessions.capacity')}</span>
                  <strong className="tabular-nums">
                    {t('sessions.capacityValue', {
                      places: n(cohort?.size ?? 0),
                      cap: n(s.capacity),
                    })}
                  </strong>
                </p>
                <StackedBar
                  ariaLabel={legend.map((g) => `${g.label} ${count(g.key)}`).join(', ')}
                  format={n}
                  segments={legend.map((g) => ({ ...g, value: count(g.key) }))}
                />
                <p className="text-xs text-ink-soft">
                  {t('sessions.namedNote', { count: members.length })}
                </p>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
