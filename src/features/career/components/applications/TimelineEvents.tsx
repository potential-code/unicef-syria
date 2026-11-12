import type { Application } from '@shared/types'
import { Building2, Cpu, UserRound } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { StatusBadge } from '@/components/shared/StatusBadge'
import { formatDate, formatTime, useLocalized } from '@/i18n'
import { stageTone } from '../../config/opportunities'

/** History of status changes with who recorded each one (employer-recorded vs learner). */
export function TimelineEvents({ app }: { app: Application }) {
  const { t } = useTranslation('career')
  const { lang } = useLocalized()
  const events = [...app.timeline].reverse()
  return (
    <ol className="space-y-3">
      {events.map((e) => {
        const Icon = e.by === 'employer' ? Building2 : e.by === 'youth' ? UserRound : Cpu
        const who =
          e.by === 'employer'
            ? t(`apps.detail.by.employer.${app.track}`)
            : t(`apps.detail.by.${e.by}`)
        return (
          <li key={`${e.stage}-${e.at}`} className="flex gap-3 rounded-xl border bg-white p-3">
            <span
              className={
                e.by === 'employer'
                  ? 'flex size-10 shrink-0 items-center justify-center rounded-xl bg-navy text-white'
                  : 'flex size-10 shrink-0 items-center justify-center rounded-xl bg-sky-100 text-blue'
              }
            >
              <Icon className="size-5" aria-hidden />
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <StatusBadge tone={stageTone(e.stage)}>{t(`common:stages.${e.stage}`)}</StatusBadge>
                <span className="text-xs text-ink-soft">
                  {formatDate(e.at, lang)} · {formatTime(e.at, lang)}
                </span>
              </div>
              <p className="mt-1 text-sm font-medium">{who}</p>
              {e.note && <p className="text-sm text-ink-soft">{e.note}</p>}
            </div>
          </li>
        )
      })}
    </ol>
  )
}
