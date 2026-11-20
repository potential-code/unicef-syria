import type { Session } from '@shared/types'
import { Link } from '@tanstack/react-router'
import { ArrowRight, Building2, CalendarClock, Users, Video } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Motif } from '@/components/brand'
import { Button } from '@/components/ui/button'
import { COHORTS } from '@/data/orgs'
import { formatDate, formatTime, useLocalized } from '@/i18n'

/** Highlight of the next session for the trainer's cohorts, with a direct link to it. */
export function NextSessionCard({ session, roster }: { session: Session; roster: number }) {
  const { t } = useTranslation('trainer')
  const { l, lang } = useLocalized()
  const cohort = COHORTS.find((c) => c.id === session.cohortId)
  const Fmt = session.format === 'online' ? Video : Building2
  return (
    <section className="on-dark relative overflow-hidden rounded-3xl bg-grad-unicef p-5 text-white shadow-lg sm:p-6">
      <Motif variant="banner" className="text-white/[0.12]" />
      <p className="relative text-xs font-bold uppercase tracking-wide text-yellow">
        {t('sessions.next')}
      </p>
      <h2 className="relative mt-1 text-2xl leading-tight font-extrabold text-white">
        {session.id} · {l(session.title)}
      </h2>
      <ul className="relative mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-sm text-white/90">
        <li className="flex items-center gap-1.5">
          <CalendarClock className="size-4 text-yellow" aria-hidden />
          {formatDate(session.start, lang, { weekday: 'short', day: 'numeric', month: 'short' })},{' '}
          {formatTime(session.start, lang)}–{formatTime(session.end, lang)} {t('ui.syriaTime')}
        </li>
        <li className="flex items-center gap-1.5">
          <Fmt className="size-4 text-yellow" aria-hidden />
          {t(`common:format.${session.format}`)}
        </li>
        <li className="flex items-center gap-1.5">
          <Users className="size-4 text-yellow" aria-hidden />
          {cohort ? `${cohort.id} · ` : ''}
          {t('sessions.learnersN', { count: roster })}
        </li>
      </ul>
      <Button asChild className="relative mt-5 rounded-full bg-white text-navy hover:bg-sky-100">
        <Link to="/trainer/sessions/$sessionId" params={{ sessionId: session.id }}>
          {t('sessions.open')}
          <ArrowRight className="size-4 rtl-mirror" aria-hidden />
        </Link>
      </Button>
    </section>
  )
}
