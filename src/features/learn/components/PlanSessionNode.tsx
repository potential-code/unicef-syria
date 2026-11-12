import type { Session, Youth } from '@shared/types'
import { Link } from '@tanstack/react-router'
import { CalendarCheck, Users } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { formatDate, formatTime, useLocalized } from '@/i18n'
import { CAREER_LINKS } from '../config'

/** Eligible cohort session mixed into the path (shown only to assigned learners). */
export function PlanSessionNode({ session, youth }: { session: Session; youth: Youth }) {
  const { t } = useTranslation('learn')
  const { l, lang } = useLocalized()
  const mark = youth.attendance[session.id]
  return (
    <div className="relative flex gap-4">
      <span
        className="z-10 mt-5 size-4 shrink-0 rounded-full bg-navy ring-4 ring-background"
        aria-hidden
      />
      <Link
        to={CAREER_LINKS.cohort}
        className="card-hover on-dark relative min-w-0 flex-1 overflow-hidden rounded-2xl bg-navy p-4 text-white shadow-md"
      >
        <Users
          className="pointer-events-none absolute -end-2 -bottom-4 size-20 text-white/10"
          aria-hidden
        />
        <p className="relative flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-wide text-yellow">
          <CalendarCheck className="size-4" aria-hidden />
          {t('path.cohortSession', { id: session.cohortId })}
        </p>
        <p className="relative mt-1 text-base font-bold">{l(session.title)}</p>
        <p className="relative text-sm text-white/85">
          {formatDate(session.start, lang, { weekday: 'short', day: 'numeric', month: 'short' })} ·{' '}
          {formatTime(session.start, lang)} · {t(`common:format.${session.format}`)}
          {mark && ` · ${t(`common:attendance.${mark}`)}`}
        </p>
      </Link>
    </div>
  )
}
