import { History } from 'lucide-react'
import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { SNAPSHOT_DATE } from '@/data/analytics'
import { cn } from '@/lib/utils'
import { useLabels } from '../lib/useLabels'

/**
 * The two data layers are always visibly separate. Live current-cohort activity sits on white
 * under a blue "Live demo records" tag with blue and cyan cards; the synthetic historical sample
 * sits on a sky panel under a navy tag with navy and sky cards, its snapshot date in the heading.
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
  const id = `layer-${layer}`
  return (
    <section
      aria-labelledby={id}
      className={cn(
        'rounded-3xl p-4 sm:p-6',
        current ? 'card' : 'bg-sky-100/70 ring-1 ring-sky-200',
        className,
      )}
    >
      <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
        <div className="min-w-0 space-y-1.5">
          <span
            className={cn(
              'inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold text-white',
              current ? 'bg-blue' : 'bg-navy',
            )}
          >
            {current ? (
              <span className="relative flex size-2" aria-hidden>
                <span className="absolute inset-0 animate-ping rounded-full bg-cyan opacity-75" />
                <span className="relative size-2 rounded-full bg-cyan" />
              </span>
            ) : (
              <History className="size-3.5" aria-hidden />
            )}
            {current ? t('layer.liveTag') : t('layer.sampleTag')}
          </span>
          <h2 id={id} className="text-xl">
            {current ? t('layer.current') : t('layer.historical', { date: d(SNAPSHOT_DATE) })}
          </h2>
          <p className="max-w-3xl text-sm text-ink-soft">
            {current ? t('layer.currentBody') : t('layer.historicalBody')}
          </p>
        </div>
        {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
      </div>
      {children}
    </section>
  )
}
