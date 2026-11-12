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
        className="z-10 flex size-12 shrink-0 items-center justify-center rounded-full bg-navy text-white shadow-md"
        aria-hidden
      >
        <Users className="size-5" />
      </span>
      <Link
        to={CAREER_LINKS.cohort}
        className="lift min-w-0 flex-1 rounded-3xl bg-navy p-4 text-white shadow-sm on-dark"
      >
        <p className="flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-wide text-yellow">
          <CalendarCheck className="size-4" aria-hidden />
          {t('path.cohortSession', { id: session.cohortId })}
        </p>
        <p className="mt-1 text-lg font-bold">{l(session.title)}</p>
        <p className="text-sm text-white/85">
          {formatDate(session.start, lang, { weekday: 'short', day: 'numeric', month: 'short' })} ·{' '}
          {formatTime(session.start, lang)} · {t(`common:format.${session.format}`)}
          {mark && ` · ${t(`common:attendance.${mark}`)}`}
        </p>
      </Link>
    </div>
  )
}
