import type { Youth } from '@shared/types'
import { Link } from '@tanstack/react-router'
import { CalendarDays, MapPin, Video } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Motif } from '@/components/brand'
import { CENTRES } from '@/data/orgs'
import { formatDate, formatTime, useLocalized } from '@/i18n'
import { nowMs } from '@/lib/clock'
import { useSessions } from '@/store/actions/sessions'
import { CAREER_LINKS } from '../config'

/** Next assigned cohort session. Restricted sessions show only for the learner's cohorts. */
export function NextSessionCard({ youth }: { youth: Youth }) {
  const { t } = useTranslation('learn')
  const { l, lang } = useLocalized()
  const sessions = useSessions()
  const next = sessions
    .filter(
      (s) => s.cohortId && youth.cohortIds.includes(s.cohortId) && Date.parse(s.end) >= nowMs(),
    )
    .sort((a, b) => a.start.localeCompare(b.start))[0]
  const centre = next?.centreId ? CENTRES.find((c) => c.id === next.centreId) : undefined

  return (
    <section
      className="on-dark relative h-full overflow-hidden rounded-3xl bg-navy p-5 text-white shadow-lg sm:p-6"
      aria-labelledby="dash-session"
    >
      <Motif variant="card" className="text-cyan/20" />
      <h2 id="dash-session" className="relative flex items-center gap-2 text-lg text-white">
        <CalendarDays className="size-5 text-yellow" aria-hidden />
        {t('dash.nextSession')}
      </h2>
      {youth.cohortIds.length === 0 ? (
        <div className="relative mt-4">
          <p className="text-white/90">{t('dash.noCohort')}</p>
          <Link
            to="/youth/library"
            className="mt-4 inline-flex h-10 items-center rounded-full bg-white px-4 text-sm font-semibold text-navy shadow-md hover:bg-sky-100"
          >
            {t('dash.browseLibrary')}
          </Link>
        </div>
      ) : next ? (
        <div className="relative mt-4">
          <p className="text-xl font-bold">{l(next.title)}</p>
          <p className="mt-1 text-white/85">{l(next.purpose)}</p>
          <dl className="mt-4 grid gap-2 text-sm">
            <div className="flex items-center gap-2">
              <dt className="sr-only">{t('dash.when')}</dt>
              <CalendarDays className="size-4" aria-hidden />
              <dd>
                {formatDate(next.start, lang, { weekday: 'short', day: 'numeric', month: 'short' })}{' '}
                · {formatTime(next.start, lang)}–{formatTime(next.end, lang)} {t('dash.syriaTime')}
              </dd>
            </div>
            <div className="flex items-center gap-2">
              <dt className="sr-only">{t('dash.where')}</dt>
              {next.format === 'online' ? (
                <Video className="size-4" aria-hidden />
              ) : (
                <MapPin className="size-4" aria-hidden />
              )}
              <dd>{next.format === 'online' ? t('common:format.online') : l(centre?.name)}</dd>
            </div>
          </dl>
          <Link
            to={CAREER_LINKS.cohort}
            className="mt-4 inline-flex h-10 items-center rounded-full bg-yellow px-4 text-sm font-semibold text-ink shadow-md hover:bg-white"
          >
            {t('dash.openCohort')}
          </Link>
        </div>
      ) : (
        <p className="relative mt-4 text-white/90">{t('dash.noUpcoming')}</p>
      )}
    </section>
  )
}
