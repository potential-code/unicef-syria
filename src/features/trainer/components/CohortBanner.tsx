import type { Cohort, Session } from '@shared/types'
import { CalendarClock, MapPin, Users } from 'lucide-react'
import { useTranslation } from 'react-i18next'
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
    <section className="on-dark relative overflow-hidden rounded-2xl bg-grad-unicef p-5 text-white shadow-md sm:p-6">
      <div
        className="pointer-events-none absolute -end-16 -top-20 size-56 rounded-full border-[28px] border-white/10"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-24 end-24 size-40 rounded-full bg-cyan/30 blur-2xl"
        aria-hidden
      />
      <div className="relative grid gap-5 md:grid-cols-[1fr_auto] md:items-end">
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-white/80">
            {t('banner.assigned')}
          </p>
          {cohorts.map((c) => {
            const centre = CENTRES.find((x) => x.id === c.centreId)
            const programme = PROGRAMMES.find((p) => p.id === c.programmeId)
            return (
              <div key={c.id}>
                <p className="text-xl font-bold leading-tight sm:text-2xl">{l(c.name)}</p>
                <p className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-white/85">
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="size-4" aria-hidden />
                    {l(centre?.name)}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Users className="size-4" aria-hidden />
                    {t('banner.size', { size: c.size, named })}
                  </span>
                  <span>{l(programme?.name)}</span>
                </p>
              </div>
            )
          })}
        </div>
        {next && (
          <div className="rounded-xl bg-white/12 p-4 backdrop-blur-sm md:min-w-64">
            <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-white/80">
              <CalendarClock className="size-4" aria-hidden />
              {t('banner.next')}
            </p>
            <p className="mt-1 font-bold">{l(next.title)}</p>
            <p className="text-sm text-white/85">
              {formatDate(next.start, lang, { weekday: 'short', day: 'numeric', month: 'short' })} ·{' '}
              {formatTime(next.start, lang)} {t('ui.syriaTime')}
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
