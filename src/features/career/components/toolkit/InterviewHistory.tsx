import type { Toolkit } from '@shared/types'
import { History } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { EmptyState } from '@/components/shared/EmptyState'
import { formatDate, useLocalized } from '@/i18n'
import { RatingBadge } from './RatingBadge'

/** Saved practice attempts, newest first, each with its next step. */
export function InterviewHistory({ items }: { items: Toolkit['interviews'] }) {
  const { t } = useTranslation('career')
  const { lang } = useLocalized()
  if (items.length === 0)
    return (
      <EmptyState
        icon={History}
        title={t('toolkit.interview.historyEmpty')}
        body={t('toolkit.interview.historyEmptyBody')}
      />
    )
  return (
    <ol className="space-y-3">
      {[...items].reverse().map((it) => (
        <li key={it.at} className="card p-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="font-semibold">{it.question}</p>
            <RatingBadge rating={it.rating} />
          </div>
          <p className="mt-1 line-clamp-3 text-sm text-ink-soft whitespace-pre-line">{it.answer}</p>
          <p className="mt-2 text-sm">
            <span className="font-semibold text-blue">{t('toolkit.interview.nextStep')}: </span>
            {it.next}
          </p>
          <p className="mt-1 text-xs text-ink-soft">{formatDate(it.at, lang)}</p>
        </li>
      ))}
    </ol>
  )
}
