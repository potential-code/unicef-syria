import { CalendarCheck, Clock, Globe, Users } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { Reveal } from '@/components/motion'
import { Button } from '@/components/ui/button'
import { SESSIONS } from '@/data/sessions'
import { formatDate, formatTime, useLocalized } from '@/i18n'
import { registerForEvent, useYouth } from '@/store/actions/youth'
import type { useGate } from '../../hooks/use-gate'

/** Upcoming public events (E01). Registering needs a profile; a signed-in youth registers directly. */
export function EventsSection({ gate }: { gate: ReturnType<typeof useGate> }) {
  const { t } = useTranslation('public')
  const { l, lang } = useLocalized()
  const youth = useYouth(gate.youthId)
  const events = SESSIONS.filter((s) => s.public)
  return (
    <section aria-labelledby="events-title" className="bg-sky-50 py-20 sm:py-28">
      <div className="container-page">
        <Reveal className="mb-10 max-w-2xl">
          <p className="mb-3 text-sm font-bold tracking-wider text-blue uppercase">
            {t('home.events.eyebrow')}
          </p>
          <h2 id="events-title" className="text-4xl sm:text-5xl">
            {t('home.events.title')}
          </h2>
          <p className="mt-3 text-lg text-ink-soft">{t('home.events.body')}</p>
        </Reveal>
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
              className="grid overflow-hidden rounded-[2rem] bg-white shadow-lg md:grid-cols-[auto_1fr]"
            >
              <div className="flex flex-row items-center justify-center gap-4 bg-grad-sunrise p-6 text-ink md:flex-col md:px-12">
                <span className="text-6xl leading-none font-extrabold">
                  {formatDate(e.start, lang, { day: 'numeric' })}
                </span>
                <span className="text-xl font-bold uppercase">
                  {formatDate(e.start, lang, { month: 'long', year: 'numeric' })}
                </span>
              </div>
              <div className="flex flex-col gap-4 p-6 sm:p-8">
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-bold text-navy">
                    {t('home.events.public')}
                  </span>
                  <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-bold text-navy">
                    {e.id}
                  </span>
                </div>
                <h3 className="text-3xl">{l(e.title)}</h3>
                <p className="text-ink-soft">{l(e.purpose)}</p>
                <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium">
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
                <div className="flex flex-wrap items-center gap-3">
                  <Button onClick={register} disabled={registered} className="rounded-full">
                    <CalendarCheck className="size-4" aria-hidden />
                    {registered ? t('home.events.registered') : t('home.events.register')}
                  </Button>
                  <p className="text-sm text-ink-soft">{t('home.events.note')}</p>
                </div>
              </div>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}
