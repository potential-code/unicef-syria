import type { OrgId } from '@shared/types'
import { useTranslation } from 'react-i18next'
import { formatDate, useLocalized } from '@/i18n'
import { useDb } from '@/store/db'

/** Previously submitted workforce feedback for this organisation only. */
export function FeedbackList({ orgId }: { orgId: OrgId }) {
  const { t } = useTranslation('employer')
  const { lang } = useLocalized()
  const all = useDb((db) => db.employerFeedback)
  const mine = all.filter((f) => f.orgId === orgId)
  if (mine.length === 0)
    return (
      <p className="rounded-2xl border border-dashed border-cyan/40 bg-sky-50 p-4 text-sm text-ink-soft">
        {t('feedback.none')}
      </p>
    )
  return (
    <ul className="flex flex-col gap-3">
      {[...mine].reverse().map((f) => (
        <li key={f.at} className="card space-y-1 p-4 text-sm">
          <p className="mb-2 text-xs font-bold tracking-wide text-blue uppercase tabular-nums">
            {formatDate(f.at, lang)}
          </p>
          {(['strengths', 'missing', 'needs'] as const).map((k) =>
            f[k] ? (
              <p key={k}>
                <span className="font-semibold">{t(`feedback.${k}`)}: </span>
                {f[k]}
              </p>
            ) : null,
          )}
        </li>
      ))}
    </ul>
  )
}
