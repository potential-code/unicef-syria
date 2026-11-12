import { Activity, History } from 'lucide-react'
import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { SNAPSHOT_DATE } from '@/data/analytics'
import { cn } from '@/lib/utils'
import { useLabels } from '../lib/useLabels'

/**
 * The two data layers are always visibly separate: live current-cohort activity on white, the
 * synthetic historical sample on a sky panel with its snapshot date in the heading.
 */
export function LayerSection({
  layer,
  children,
  actions,
  className,
}: {
  layer: 'current' | 'historical'
  children: ReactNode
  actions?: ReactNode
  className?: string
}) {
  const { t } = useTranslation('admin')
  const { d } = useLabels()
  const current = layer === 'current'
  const Icon = current ? Activity : History
  const id = `layer-${layer}`
  return (
    <section
      aria-labelledby={id}
      className={cn(
        'rounded-3xl border p-4 sm:p-6',
        current ? 'border-blue/15 bg-white shadow-sm' : 'border-cyan/30 bg-sky-50',
        className,
      )}
    >
      <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <span
            className={cn(
              'flex size-10 shrink-0 items-center justify-center rounded-2xl',
              current ? 'bg-blue text-white' : 'bg-white text-blue shadow-sm',
            )}
          >
            <Icon className="size-5" aria-hidden />
          </span>
          <div>
            <h2 id={id} className="text-lg sm:text-xl">
              {current ? t('layer.current') : t('layer.historical', { date: d(SNAPSHOT_DATE) })}
            </h2>
            <p className="mt-0.5 max-w-2xl text-sm text-ink-soft">
              {current ? t('layer.currentBody') : t('layer.historicalBody')}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={cn(
              'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold',
              current ? 'bg-success-soft text-success' : 'bg-white text-navy',
            )}
          >
            {current && (
              <span className="size-1.5 animate-pulse rounded-full bg-success" aria-hidden />
            )}
            {current ? t('layer.liveTag') : t('layer.sampleTag')}
          </span>
          {actions}
        </div>
      </div>
      {children}
    </section>
  )
}
