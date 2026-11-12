import type { Dimension, DimensionScores } from '@shared/types'
import { motion } from 'motion/react'
import { useTranslation } from 'react-i18next'
import { DIMENSION_LABELS } from '@/data/assessment'
import { useLocalized } from '@/i18n'
import { cn } from '@/lib/utils'
import { DIMENSION_TONE, DIMENSIONS } from '../config'

const MAX = 24

/** Bar chart of the four dimension scores with text values (accessible list, not colour alone). */
export function DimensionChart({ scores, top }: { scores: DimensionScores; top: Dimension[] }) {
  const { t } = useTranslation('learn')
  const { l } = useLocalized()
  return (
    <ul className="space-y-4" aria-label={t('results.chartLabel')}>
      {DIMENSIONS.map((d, i) => {
        const strong = top.includes(d)
        return (
          <li key={d}>
            <div className="flex items-baseline justify-between gap-3">
              <span className={cn('font-semibold', strong ? 'text-ink' : 'text-ink-soft')}>
                {l(DIMENSION_LABELS[d])}
                {strong && (
                  <span className="ms-2 rounded-full bg-yellow px-2 py-0.5 text-xs font-bold text-ink">
                    {t('results.strong')}
                  </span>
                )}
              </span>
              <span className="text-sm font-bold tabular-nums">
                {t('results.scoreOf', { score: scores[d], max: MAX })}
              </span>
            </div>
            <div className="mt-1.5 h-5 overflow-hidden rounded-full bg-sky-100" aria-hidden>
              <motion.div
                className={cn('h-full rounded-full', DIMENSION_TONE[d], !strong && 'opacity-50')}
                initial={{ width: 0 }}
                animate={{ width: `${Math.max(4, (scores[d] / MAX) * 100)}%` }}
                transition={{ duration: 0.9, delay: 0.1 * i, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          </li>
        )
      })}
    </ul>
  )
}
