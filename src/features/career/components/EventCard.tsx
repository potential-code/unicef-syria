import type { Youth } from '@shared/types'
import { CalendarHeart, Check, Clock, Globe2, Ticket } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { Motif } from '@/components/brand'
import { StatusBadge } from '@/components/shared/StatusBadge'
import { Button } from '@/components/ui/button'
import { SESSIONS } from '@/data/sessions'
import { formatDate, formatTime, useLocalized } from '@/i18n'
import { registerForEvent } from '@/store/actions/youth'
import { LText } from './LText'

const EVENT = SESSIONS.find((s) => s.id === 'E01')

/** E01 public sample event with a working registration state (brief §11, §14 Y13). */
export function EventCard({ youth }: { youth: Youth }) {
  const { t } = useTranslation('career')
  const { lang } = useLocalized()
  const [busy, setBusy] = useState(false)
  if (!EVENT) return null
  const registered = youth.eventRegistrations.includes('E01')

  const register = () => {
    setBusy(true)
    window.setTimeout(() => {
      registerForEvent(youth.id, 'E01')
      setBusy(false)
      toast.success(t('event.registeredToast'))
    }, 500)
  }

  return (
    <article className="on-dark relative overflow-hidden rounded-3xl bg-[linear-gradient(135deg,var(--unicef-navy)_0%,var(--unicef-blue)_100%)] p-6 text-white shadow-lg sm:p-7">
      <Motif variant="banner" className="text-white/[0.12]" />
      <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-4 sm:gap-5">
          <time
            dateTime={EVENT.start}
            className="flex min-w-16 shrink-0 flex-col items-center overflow-hidden rounded-2xl bg-white text-navy shadow-md"
          >
            <span className="w-full bg-yellow px-2 py-1 text-center text-[0.65rem] whitespace-nowrap font-extrabold uppercase tracking-wider text-ink">
              {formatDate(EVENT.start, lang, { month: 'short' })}
            </span>
            <span className="py-1.5 text-2xl leading-none font-extrabold tabular-nums">
              {formatDate(EVENT.start, lang, { day: 'numeric' })}
            </span>
          </time>
          <div className="min-w-0">
            <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-yellow">
              <CalendarHeart className="size-3.5" aria-hidden />
              {t('event.eyebrow')}
            </p>
            <h3 className="mt-1 text-xl text-white">
              <LText value={EVENT.title} />
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-white/85">
              <LText value={EVENT.purpose} />
            </p>
            <p className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1 text-sm font-medium text-white/90">
              <span className="flex items-center gap-1.5">
                <Clock className="size-4 text-cyan" aria-hidden />
                {t('cohort.timeRange', {
                  start: formatTime(EVENT.start, lang),
                  end: formatTime(EVENT.end, lang),
                })}{' '}
                {t('cohort.syriaTime')}
              </span>
              <span className="flex items-center gap-1.5">
                <Globe2 className="size-4 text-cyan" aria-hidden />
                {t('common:format.online')}
              </span>
            </p>
          </div>
        </div>
        <div className="flex shrink-0 flex-col items-start gap-2 sm:items-end">
          {registered ? (
            <StatusBadge
              tone="success"
              icon={<Check className="size-3.5" aria-hidden />}
              className="bg-white text-sm"
            >
              {t('event.registered')}
            </StatusBadge>
          ) : (
            <Button
              className="bg-yellow font-bold text-ink shadow-md hover:bg-yellow/90"
              disabled={busy}
              onClick={register}
            >
              <Ticket className="size-4" aria-hidden />
              {busy ? t('event.registering') : t('event.register')}
            </Button>
          )}
          <p className="max-w-60 text-xs leading-snug text-white/80 sm:text-end">
            {registered ? t('event.registeredNote') : t('event.openToAll')}
          </p>
        </div>
      </div>
    </article>
  )
}
