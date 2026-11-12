import type { Cohort, Session } from '@shared/types'
import { CalendarClock, MapPin, Users } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Motif } from '@/components/brand'
import { CENTRES, PROGRAMMES } from '@/data/orgs'
import { formatDate, formatTime, useLocalized } from '@/i18n'

/** Branded band naming the trainer's assigned cohorts and the next session. */
export function CohortBanner({
  cohorts,
  next,
  named,
}: {
  cohorts: Cohort[]
  next?: Session
  named: number
}) {
  const { t } = useTranslation('trainer')
  const { l, lang } = useLocalized()
  return (
    <section className="on-dark relative overflow-hidden rounded-3xl bg-grad-unicef p-6 text-white shadow-lg sm:p-8">
      <Motif variant="banner" className="text-white/[0.12]" />
      <div className="relative grid gap-6 lg:grid-cols-[1fr_minmax(16rem,20rem)] lg:items-center">
        <div className="min-w-0 space-y-4">
          <p className="text-xs font-semibold tracking-wider text-white/80 uppercase">
            {t('banner.assigned')}
          </p>
          {cohorts.map((c) => {
            const centre = CENTRES.find((x) => x.id === c.centreId)
            const programme = PROGRAMMES.find((p) => p.id === c.programmeId)
            return (
              <div key={c.id} className="min-w-0">
                <p className="text-2xl leading-tight font-extrabold text-balance sm:text-3xl">
                  {l(c.name)}
                </p>
                <p className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-sm text-white/85">
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="size-4 shrink-0" aria-hidden />
                    {l(centre?.name)}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Users className="size-4 shrink-0" aria-hidden />
                    {t('banner.size', { size: c.size, named })}
                  </span>
                  {programme && <span className="text-white/80">{l(programme.name)}</span>}
                </p>
              </div>
            )
          })}
        </div>
        {next && (
          <div className="rounded-2xl border border-white/25 bg-white/12 p-4 shadow-sm backdrop-blur-md sm:p-5">
            <p className="flex items-center gap-1.5 text-xs font-semibold tracking-wider text-white/80 uppercase">
              <CalendarClock className="size-4" aria-hidden />
              {t('banner.next')}
            </p>
            <p className="mt-2 leading-snug font-bold">{l(next.title)}</p>
            <p className="mt-1 text-sm text-white/85 tabular-nums">
              {formatDate(next.start, lang, { weekday: 'short', day: 'numeric', month: 'short' })} ·{' '}
              {formatTime(next.start, lang)} {t('ui.syriaTime')}
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
