import { useTranslation } from 'react-i18next'
import { POINTS } from '@/domain/points'
import { cn } from '@/lib/utils'
import { POINT_RULES } from '../config'

/** Points rules from the brief (§14 Y12) as a readable list of rule rows. */
export function PointsRules() {
  const { t } = useTranslation('learn')
  return (
    <ul className="card divide-y divide-border/70 overflow-hidden">
      {POINT_RULES.map((k) => {
        const n = POINTS[k]
        return (
          <li key={k} className="flex items-start gap-4 px-5 py-3.5">
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-ink">{t(`progress.rules.${k}.action`)}</p>
              <p className="mt-0.5 text-xs leading-snug text-ink-soft">
                {t(`progress.rules.${k}.condition`)}
              </p>
            </div>
            <span
              className={cn(
                'mt-0.5 shrink-0 rounded-full px-2.5 py-1 text-xs font-extrabold tabular-nums',
                n < 0 ? 'bg-danger-soft text-danger' : 'bg-success-soft text-success',
              )}
            >
              <span dir="ltr">{n > 0 ? `+${n}` : n}</span> {t('dash.pointsUnit')}
            </span>
          </li>
        )
      })}
    </ul>
  )
}
