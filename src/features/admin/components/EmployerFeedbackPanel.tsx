import { MessageSquareQuote } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { EmptyState } from '@/components/shared/EmptyState'
import { ORGANISATIONS } from '@/data/orgs'
import { useDb } from '@/store/db'
import { useLabels } from '../lib/useLabels'

/** Employer feedback recorded in the demo, aggregated by organisation sector. */
export function EmployerFeedbackPanel() {
  const { t } = useTranslation('admin')
  const { l, n } = useLabels()
  const feedback = useDb((db) => db.employerFeedback)
  if (!feedback.length)
    return (
      <EmptyState
        icon={MessageSquareQuote}
        title={t('labour.noFeedback')}
        body={t('labour.noFeedbackBody')}
      />
    )
  const bySector = new Map<string, { count: number; missing: string[] }>()
  for (const f of feedback) {
    const sector = l(ORGANISATIONS.find((o) => o.id === f.orgId)?.sector)
    const e = bySector.get(sector) ?? { count: 0, missing: [] }
    e.count++
    if (f.missing.trim()) e.missing.push(f.missing.trim())
    bySector.set(sector, e)
  }
  return (
    <div className="card p-5">
      <p className="text-base font-semibold">
        {t('labour.feedbackTitle', { count: feedback.length })}
      </p>
      <p className="mb-3 text-xs text-ink-soft">{t('labour.feedbackSub')}</p>
      <ul className="divide-y divide-border/70 overflow-hidden rounded-xl ring-1 ring-border/70">
        {[...bySector.entries()].map(([sector, e]) => (
          <li key={sector} className="px-4 py-3 text-sm">
            <p className="font-medium">
              {sector}{' '}
              <span className="text-xs text-ink-soft">
                · {t('labour.responses', { count: e.count, n: n(e.count) })}
              </span>
            </p>
            {e.missing.length > 0 && (
              <p className="mt-1 text-ink-soft">
                {t('labour.missing')}: {e.missing.join('; ')}
              </p>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
