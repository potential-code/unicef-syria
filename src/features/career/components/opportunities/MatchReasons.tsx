import { CheckCircle2, CircleDashed } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { itemKey, type MatchExplanation } from '../../lib/match'
import { useMatchText } from './useMatchText'

/** Compact "why" line on a hub card: top matching evidence and the first gap. */
export function MatchReasons({ match }: { match: MatchExplanation }) {
  const { t } = useTranslation('career')
  const { matchText, gapText } = useMatchText()
  const top = match.matches.slice(0, 2)
  const gap = match.gaps[0]
  return (
    <div className="rounded-xl bg-sky-50 p-3 text-sm">
      <p className="mb-1.5 text-xs font-bold uppercase tracking-wide text-navy">
        {t('opps.match.short')}
      </p>
      <ul className="space-y-1">
        {top.length === 0 && <li className="text-ink-soft">{t('opps.match.none')}</li>}
        {top.map((m) => (
          <li key={itemKey(m)} className="flex items-start gap-1.5">
            <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-success" aria-hidden />
            <span>{matchText(m)}</span>
          </li>
        ))}
        {gap && (
          <li className="flex items-start gap-1.5 text-ink-soft">
            <CircleDashed className="mt-0.5 size-4 shrink-0 text-notice" aria-hidden />
            <span>{gapText(gap)}</span>
          </li>
        )}
      </ul>
    </div>
  )
}
