import type { Application } from '@shared/types'
import { useTranslation } from 'react-i18next'
import { formatDate, formatTime, useLocalized } from '@/i18n'

/** The same timeline the learner sees: every stage change is recorded on one record. */
export function ApplicationTimeline({ app }: { app: Application }) {
  const { t } = useTranslation('employer')
  const { lang } = useLocalized()
  const events = app.timeline.filter((e) => e.stage !== 'draft').reverse()
  return (
    <ol className="relative space-y-4 border-s-2 border-sky-200 ps-5">
      {events.map((e) => (
        <li key={`${e.stage}-${e.at}`} className="relative">
          <span
            className="absolute -start-[1.72rem] top-1 size-3 rounded-full border-2 border-white bg-blue"
            aria-hidden
          />
          <p className="font-semibold text-ink">{t(`common:stages.${e.stage}`)}</p>
          <p className="text-xs text-ink-soft">
            {formatDate(e.at, lang)} {formatTime(e.at, lang)} · {t(`detail.by.${e.by}`)}
          </p>
          {e.note && <p className="mt-1 text-sm text-ink">{e.note}</p>}
        </li>
      ))}
    </ol>
  )
}
