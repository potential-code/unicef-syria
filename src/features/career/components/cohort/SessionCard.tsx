import type { Session, Youth } from '@shared/types'
import {
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  Clock,
  FileText,
  MapPin,
  MonitorPlay,
  UserRound,
  Users,
  Video,
} from 'lucide-react'
import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { StatusBadge } from '@/components/shared/StatusBadge'
import { Button } from '@/components/ui/button'
import { COURSE_BY_ID } from '@/data/courses'
import { CENTRES, TRAINERS } from '@/data/orgs'
import { TEMPLATE_BY_ID } from '@/data/templates'
import { formatDate, formatTime, useLocalized } from '@/i18n'
import { cn } from '@/lib/utils'
import { SESSION_EXTRAS } from '../../config/cohort'
import { courseHref } from '../../lib/links'
import { sessionTiming } from '../../lib/session'
import { LText } from '../LText'

const ATTENDANCE_TONE = { present: 'success', absent: 'danger', excused: 'notice' } as const

/** One assigned session with every detail the brief lists for Y08. */
export function SessionCard({
  session: s,
  youth,
  onJoin,
  highlight,
}: {
  session: Session
  youth: Youth
  onJoin: (s: Session) => void
  highlight?: boolean
}) {
  const { t } = useTranslation('career')
  const { l, lang } = useLocalized()
  const timing = sessionTiming(s)
  const trainer = TRAINERS.find((x) => x.id === s.trainerId)
  const centre = CENTRES.find((c) => c.id === s.centreId)
  const extras = SESSION_EXTRAS[s.id]
  const mark = youth.attendance[s.id]
  const assignment = extras?.assignment
  const practical = assignment ? (youth.progress[assignment]?.practical ?? 'none') : undefined
  const online = s.format === 'online'

  return (
    <article
      id={`session-${s.id}`}
      className={cn(
        'lift relative overflow-hidden rounded-2xl border bg-white p-5 shadow-sm',
        highlight && 'ring-4 ring-cyan/40',
        timing === 'upcoming' ? 'border-sky-200' : 'border-border',
      )}
    >
      <span
        className={cn('absolute inset-y-0 start-0 w-1.5', online ? 'bg-cyan' : 'bg-yellow')}
        aria-hidden
      />
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs font-bold uppercase tracking-wide text-blue">
            {s.id} · {s.cohortId ?? t('cohort.publicEvent')}
          </p>
          <h3 className="mt-1 text-lg">
            <LText value={s.title} />
          </h3>
          <p className="mt-1 text-sm text-ink-soft">
            <LText value={s.purpose} />
          </p>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {timing === 'completed' && (
            <>
              <StatusBadge tone="success" icon={<CheckCircle2 className="size-3.5" aria-hidden />}>
                {t('common:status.completed')}
              </StatusBadge>
              <StatusBadge tone="notice">{t('cohort.sampleScenario')}</StatusBadge>
            </>
          )}
          {timing === 'past' && <StatusBadge tone="neutral">{t('cohort.timing.past')}</StatusBadge>}
          {timing === 'upcoming' && (
            <StatusBadge tone="brand">{t('cohort.timing.upcoming')}</StatusBadge>
          )}
        </div>
      </div>

      <dl className="mt-4 grid gap-x-5 gap-y-2.5 text-sm sm:grid-cols-2">
        <Detail icon={online ? MonitorPlay : MapPin} label={t('cohort.fields.where')}>
          {online ? t('cohort.onlineRoom') : l(centre?.name)}
          <span className="ms-1 text-ink-soft">({t(`common:format.${s.format}`)})</span>
        </Detail>
        <Detail icon={UserRound} label={t('cohort.fields.trainer')}>
          {trainer ? l(trainer.name) : t('cohort.panelHosts')}
        </Detail>
        <Detail icon={CalendarDays} label={t('cohort.fields.date')}>
          {formatDate(s.start, lang, {
            weekday: 'short',
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          })}
        </Detail>
        <Detail icon={Clock} label={t('cohort.fields.time')}>
          {t('cohort.timeRange', {
            start: formatTime(s.start, lang),
            end: formatTime(s.end, lang),
          })}
          <span className="ms-1 text-ink-soft">{t('cohort.syriaTime')}</span>
        </Detail>
        <Detail icon={Users} label={t('cohort.fields.capacity')}>
          {t('cohort.capacity', { count: s.capacity })}
        </Detail>
        {s.cohortId && (
          <Detail icon={CheckCircle2} label={t('cohort.fields.attendance')}>
            {mark ? (
              <StatusBadge tone={ATTENDANCE_TONE[mark]}>
                {t(`common:attendance.${mark}`)}
              </StatusBadge>
            ) : (
              <span className="text-ink-soft">
                {timing === 'upcoming'
                  ? t('cohort.attendanceLater')
                  : t('cohort.attendancePending')}
              </span>
            )}
          </Detail>
        )}
      </dl>

      {(extras?.materials.length || assignment) && (
        <div className="mt-4 flex flex-col gap-3 rounded-xl bg-sky-50 p-3.5 text-sm sm:flex-row sm:gap-6">
          {extras && extras.materials.length > 0 && (
            <div className="min-w-0 flex-1">
              <p className="flex items-center gap-1.5 font-semibold text-navy">
                <FileText className="size-4" aria-hidden />
                {t('cohort.fields.materials')}
              </p>
              <ul className="mt-1 space-y-0.5">
                {extras.materials.map((m) => (
                  <li key={m}>{l(TEMPLATE_BY_ID[m].title)}</li>
                ))}
              </ul>
            </div>
          )}
          {assignment && (
            <div className="min-w-0 flex-1">
              <p className="flex items-center gap-1.5 font-semibold text-navy">
                <ClipboardList className="size-4" aria-hidden />
                {t('cohort.fields.assignment')}
              </p>
              <a
                href={courseHref(assignment)}
                className="mt-1 block font-medium text-blue hover:underline"
              >
                {assignment} {l(COURSE_BY_ID[assignment].title)}
              </a>
              <p className="text-ink-soft">{t(`cohort.practical.${practical}`)}</p>
            </div>
          )}
        </div>
      )}

      {online && s.cohortId && (
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <Button
            className="rounded-full"
            disabled={timing !== 'upcoming'}
            onClick={() => onJoin(s)}
          >
            <Video className="size-4" aria-hidden />
            {t('cohort.join')}
          </Button>
          {timing !== 'upcoming' && (
            <span className="text-sm text-ink-soft">{t('cohort.joinEnded')}</span>
          )}
        </div>
      )}
    </article>
  )
}

function Detail({
  icon: Icon,
  label,
  children,
}: {
  icon: typeof Clock
  label: string
  children: ReactNode
}) {
  return (
    <div className="flex items-start gap-2">
      <Icon className="mt-0.5 size-4 shrink-0 text-blue" aria-hidden />
      <div className="min-w-0">
        <dt className="sr-only">{label}</dt>
        <dd>{children}</dd>
      </div>
    </div>
  )
}
