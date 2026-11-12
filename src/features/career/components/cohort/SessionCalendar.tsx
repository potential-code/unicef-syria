import type { Session } from '@shared/types'
import { useTranslation } from 'react-i18next'
import { Motif } from '@/components/brand'
import { formatDate, formatTime, useLocalized } from '@/i18n'
import { now } from '@/lib/clock'
import { cn } from '@/lib/utils'
import { CALENDAR_MONTH } from '../../config/cohort'
import { dayKey } from '../../lib/session'

const pad = (n: number) => String(n).padStart(2, '0')

/** Simple month grid for the sample schedule month, Syria time. Week starts on Sunday. */
export function SessionCalendar({
  sessions,
  selected,
  onSelect,
}: {
  sessions: Session[]
  selected?: string
  onSelect: (id: string) => void
}) {
  const { t } = useTranslation('career')
  const { l, lang } = useLocalized()
  const { year, month } = CALENDAR_MONTH
  const first = new Date(Date.UTC(year, month - 1, 1))
  const days = new Date(Date.UTC(year, month, 0)).getUTCDate()
  const lead = first.getUTCDay()
  const today = dayKey(now())
  const cells: (number | null)[] = [
    ...Array.from({ length: lead }, () => null),
    ...Array.from({ length: days }, (_, i) => i + 1),
  ]
  while (cells.length % 7) cells.push(null)
  // Weekday names from the first Sunday of the month onwards.
  const firstSunday = 1 + ((7 - lead) % 7)
  const weekdays = Array.from({ length: 7 }, (_, i) =>
    formatDate(`${year}-${pad(month)}-${pad(firstSunday + i)}T12:00:00+03:00`, lang, {
      weekday: 'short',
    }),
  )

  return (
    <div className="card overflow-hidden">
      <div className="relative flex items-center justify-between overflow-hidden bg-grad-unicef px-5 py-3.5 text-white">
        <Motif variant="corner" className="text-white/15" />
        <p className="relative text-lg font-bold">
          {formatDate(first.toISOString(), lang, { month: 'long', year: 'numeric' })}
        </p>
        <p className="relative text-xs text-white/85">{t('cohort.syriaTime')}</p>
      </div>
      <div className="grid grid-cols-7 border-b bg-sky-50 text-center text-xs font-semibold text-navy">
        {weekdays.map((w) => (
          <div key={w} className="py-2">
            {w}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7">
        {cells.map((d, i) => {
          const key = d ? `${year}-${pad(month)}-${pad(d)}` : `empty-${i}`
          const items = d ? sessions.filter((s) => dayKey(s.start) === key) : []
          return (
            <div
              key={key}
              className={cn(
                'min-h-20 border-e border-b p-1 sm:min-h-28 sm:p-1.5',
                !d && 'bg-muted/40',
                (i + 1) % 7 === 0 && 'border-e-0',
              )}
            >
              {d && (
                <span
                  className={cn(
                    'inline-flex size-6 items-center justify-center rounded-full text-xs font-semibold',
                    key === today ? 'bg-blue text-white' : 'text-ink-soft',
                  )}
                >
                  {d}
                </span>
              )}
              <div className="mt-0.5 space-y-1">
                {items.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => onSelect(s.id)}
                    aria-pressed={selected === s.id}
                    className={cn(
                      'block min-h-9 w-full rounded-md px-1 py-0.5 text-start text-[0.65rem] leading-tight font-semibold sm:px-1.5 sm:text-xs',
                      s.public
                        ? 'bg-yellow text-ink'
                        : s.format === 'online'
                          ? 'bg-sky-100 text-navy ring-1 ring-cyan/40'
                          : 'bg-blue text-white',
                      selected === s.id && 'ring-2 ring-navy ring-offset-1',
                    )}
                  >
                    <span className="block">{s.id}</span>
                    <span className="hidden sm:block sm:truncate">
                      {formatTime(s.start, lang)} {l(s.title)}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )
        })}
      </div>
      <div className="flex flex-wrap gap-4 px-5 py-3 text-xs text-ink-soft">
        <Legend className="bg-sky-100 ring-1 ring-cyan/40" label={t('common:format.online')} />
        <Legend className="bg-blue" label={t('common:format.centre')} />
        <Legend className="bg-yellow" label={t('cohort.publicEvent')} />
      </div>
    </div>
  )
}

function Legend({ className, label }: { className: string; label: string }) {
  return (
    <span className="flex items-center gap-1.5">
      <span className={cn('size-3 rounded-sm', className)} aria-hidden />
      {label}
    </span>
  )
}
