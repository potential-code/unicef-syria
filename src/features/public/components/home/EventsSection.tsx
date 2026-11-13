import { CalendarCheck, Clock, Globe, Users } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { Emblem, GlobeGrid, Motif } from '@/components/brand'
import { Reveal } from '@/components/motion'
import { Button } from '@/components/ui/button'
import { SESSIONS } from '@/data/sessions'
import { formatDate, formatTime, useLocalized } from '@/i18n'
import { registerForEvent, useYouth } from '@/store/actions/youth'
import type { useGate } from '../../hooks/use-gate'
import { SectionIntro } from '../SectionIntro'
import { Drift } from './Drift'

/** Upcoming public events (E01). Registering needs a profile; a signed-in youth registers directly. */
export function EventsSection({ gate }: { gate: ReturnType<typeof useGate> }) {
  const { t } = useTranslation('public')
  const { l, lang } = useLocalized()
  const youth = useYouth(gate.youthId)
  const events = SESSIONS.filter((s) => s.public)
  return (
    <section
      aria-labelledby="events-title"
      className="relative overflow-hidden bg-sky-50 py-20 sm:py-24"
    >
      <Drift y={12} rotate={-6} className="absolute start-6 top-8 text-blue/[0.07]">
        <Emblem className="h-64" />
      </Drift>
      <div className="container-page relative grid gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:items-center lg:gap-14">
        <SectionIntro
          id="events-title"
          eyebrow={t('home.events.eyebrow')}
          title={t('home.events.title')}
          body={t('home.events.body')}
        />
        {events.map((e) => {
          const registered = !!youth?.eventRegistrations.includes(e.id)
          const register = () => {
            if (!gate.youthId) return gate.ask({ next: '/', item: l(e.title) })
            registerForEvent(gate.youthId, 'E01')
            toast.success(t('home.events.done'))
          }
          return (
            <Reveal
              key={e.id}
              as="article"
              className="relative grid min-w-0 overflow-hidden rounded-3xl border border-border/70 bg-white shadow-lg sm:grid-cols-[11rem_minmax(0,1fr)]"
            >
              <Motif variant="corner" className="text-blue/[0.08]" />
              <div className="on-dark relative flex items-center gap-4 overflow-hidden bg-navy px-6 py-5 text-white sm:flex-col sm:justify-center sm:gap-1 sm:py-8 sm:text-center">
                <GlobeGrid
                  className="absolute -end-10 -bottom-10 size-36 text-white/[0.1]"
                  strokeWidth={1}
                />
                <span className="relative text-5xl leading-none font-extrabold text-white sm:text-6xl">
                  {formatDate(e.start, lang, { day: 'numeric' })}
                </span>
                <span className="relative text-sm font-bold tracking-widest text-cyan uppercase">
                  {formatDate(e.start, lang, { month: 'long' })}
                </span>
                <span className="relative text-xs text-white/80">
                  {formatDate(e.start, lang, { weekday: 'long' })}
                </span>
              </div>
              <div className="relative flex min-w-0 flex-col gap-3 p-6 sm:p-7">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-yellow px-2.5 py-0.5 text-[11px] font-bold tracking-wide text-ink uppercase">
                    {t('home.events.public')}
                  </span>
                  <span className="text-xs font-bold text-ink-soft">{e.id}</span>
                </div>
                <h3 className="text-xl sm:text-2xl">{l(e.title)}</h3>
                <p className="max-w-2xl text-ink-soft">{l(e.purpose)}</p>
                <ul className="flex flex-wrap gap-x-5 gap-y-1.5 text-sm font-medium text-ink">
                  <li className="inline-flex items-center gap-1.5">
                    <Clock className="size-4 text-blue" aria-hidden />
                    {t('home.events.time', {
                      start: formatTime(e.start, lang),
                      end: formatTime(e.end, lang),
                    })}
                  </li>
                  <li className="inline-flex items-center gap-1.5">
                    <Globe className="size-4 text-blue" aria-hidden />
                    {t(`common:format.${e.format}`)}
                  </li>
                  <li className="inline-flex items-center gap-1.5">
                    <Users className="size-4 text-blue" aria-hidden />
                    {t('home.events.capacity', { count: e.capacity })}
                  </li>
                </ul>
                <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-border/60 pt-4">
                  <Button
                    onClick={register}
                    disabled={registered}
                    className="shrink-0 rounded-full px-5"
                  >
                    <CalendarCheck className="size-4" aria-hidden />
                    {registered ? t('home.events.registered') : t('home.events.register')}
                  </Button>
                  <p className="min-w-0 flex-1 text-sm text-ink-soft">{t('home.events.note')}</p>
                </div>
              </div>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}
