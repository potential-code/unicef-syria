import type { Youth } from '@shared/types'
import { CalendarHeart, Check, Clock, Globe2, Ticket } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
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
    <article className="relative overflow-hidden rounded-3xl bg-grad-sunrise p-6 text-ink shadow-md">
      <div
        className="pointer-events-none absolute -end-12 -top-12 size-40 rounded-full bg-white/25"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-10 end-16 size-24 rounded-full border-8 border-white/30"
        aria-hidden
      />
      <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-4">
          <span className="flex size-14 shrink-0 flex-col items-center justify-center rounded-2xl bg-white text-navy shadow-sm">
            <span className="text-[0.65rem] font-bold uppercase">
              {formatDate(EVENT.start, lang, { month: 'short' })}
            </span>
            <span className="text-xl leading-none font-bold">
              {formatDate(EVENT.start, lang, { day: 'numeric' })}
            </span>
          </span>
          <div className="min-w-0">
            <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-ink/75">
              <CalendarHeart className="size-3.5" aria-hidden />
              {t('event.eyebrow')}
            </p>
            <h3 className="text-xl text-ink">
              <LText value={EVENT.title} />
            </h3>
            <p className="mt-1 text-sm text-ink/80">
              <LText value={EVENT.purpose} />
            </p>
            <p className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm font-medium">
              <span className="flex items-center gap-1">
                <Clock className="size-4" aria-hidden />
                {t('cohort.timeRange', {
                  start: formatTime(EVENT.start, lang),
                  end: formatTime(EVENT.end, lang),
                })}{' '}
                {t('cohort.syriaTime')}
              </span>
              <span className="flex items-center gap-1">
                <Globe2 className="size-4" aria-hidden />
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
              className="rounded-full bg-navy hover:bg-blue"
              disabled={busy}
              onClick={register}
            >
              <Ticket className="size-4" aria-hidden />
              {busy ? t('event.registering') : t('event.register')}
            </Button>
          )}
          <p className="max-w-56 text-xs text-ink/75 sm:text-end">
            {registered ? t('event.registeredNote') : t('event.openToAll')}
          </p>
        </div>
      </div>
    </article>
  )
}
