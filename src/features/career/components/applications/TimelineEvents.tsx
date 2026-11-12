import type { Application } from '@shared/types'
import { Building2, Cpu, UserRound } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { StatusBadge } from '@/components/shared/StatusBadge'
import { formatDate, formatTime, useLocalized } from '@/i18n'
import { cn } from '@/lib/utils'
import { stageTone } from '../../config/opportunities'

/** History of status changes with who recorded each one (employer-recorded vs learner). */
export function TimelineEvents({ app }: { app: Application }) {
  const { t } = useTranslation('career')
  const { lang } = useLocalized()
  const events = [...app.timeline].reverse()
  return (
    <ol className="card relative p-5">
      {events.map((e, i) => {
        const Icon = e.by === 'employer' ? Building2 : e.by === 'youth' ? UserRound : Cpu
        const who =
          e.by === 'employer'
            ? t(`apps.detail.by.employer.${app.track}`)
            : t(`apps.detail.by.${e.by}`)
        const last = i === events.length - 1
        return (
          <li key={`${e.stage}-${e.at}`} className={cn('relative flex gap-4', !last && 'pb-5')}>
            {!last && (
              <span
                aria-hidden
                className="absolute start-[0.31rem] top-4 h-[calc(100%-0.75rem)] w-0.5 bg-sky-200"
              />
            )}
            <span
              aria-hidden
              className={cn(
                'relative z-10 mt-1.5 size-3 shrink-0 rounded-full ring-4 ring-white',
                i === 0 ? 'bg-blue' : e.by === 'employer' ? 'bg-navy' : 'bg-cyan',
              )}
            />
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <StatusBadge tone={stageTone(e.stage)}>{t(`common:stages.${e.stage}`)}</StatusBadge>
                <time dateTime={e.at} className="text-xs text-ink-soft tabular-nums">
                  {formatDate(e.at, lang)} · {formatTime(e.at, lang)}
                </time>
              </div>
              <p className="mt-1.5 flex items-center gap-1.5 text-sm font-medium">
                <Icon
                  className={cn('size-4 shrink-0', e.by === 'employer' ? 'text-navy' : 'text-blue')}
                  aria-hidden
                />
                {who}
              </p>
              {e.note && <p className="mt-0.5 text-sm text-ink-soft">{e.note}</p>}
            </div>
          </li>
        )
      })}
    </ol>
  )
}
