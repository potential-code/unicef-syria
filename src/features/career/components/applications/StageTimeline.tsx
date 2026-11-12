import type { Application } from '@shared/types'
import { Check, CircleSlash, Undo2 } from 'lucide-react'
import { motion } from 'motion/react'
import { useTranslation } from 'react-i18next'
import { STAGES } from '@/domain/application-stages'
import { cn } from '@/lib/utils'
import { reachedIndex } from '../../config/opportunities'

/**
 * Stage timeline from STAGES[track] (brief §15 Y15): completed, current and upcoming stages,
 * with Not selected or Withdrawn shown as a distinct end node. Horizontal on desktop, vertical on mobile.
 */
export function StageTimeline({ app }: { app: Application }) {
  const { t } = useTranslation('career')
  const stages = STAGES[app.track]
  const branch = app.stage === 'notSelected' || app.stage === 'withdrawn'
  const reached = reachedIndex(app)
  const nodes = branch ? stages.slice(0, reached + 1) : stages

  return (
    <ol
      className="flex flex-col gap-0 md:flex-row md:items-start"
      aria-label={t('apps.detail.timeline')}
    >
      {nodes.map((s, i) => {
        const done = branch ? true : i < reached
        const current = !branch && i === reached
        const state = current
          ? t('apps.detail.current')
          : done
            ? t('apps.detail.reached')
            : t('apps.detail.upcoming')
        return (
          <li
            key={s}
            className="relative flex flex-1 gap-3 pb-5 md:flex-col md:items-center md:pb-0 md:text-center"
          >
            {i < nodes.length - 1 + (branch ? 1 : 0) && (
              <span
                aria-hidden
                className={cn(
                  'absolute start-[1.1rem] top-10 h-[calc(100%-2.5rem)] w-1 rounded-full md:start-[calc(50%+1.5rem)] md:top-[1.1rem] md:h-1 md:w-[calc(100%-3rem)]',
                  done ? 'bg-blue' : 'bg-sky-200',
                )}
              />
            )}
            <motion.span
              initial={false}
              animate={current ? { scale: [1, 1.12, 1] } : { scale: 1 }}
              transition={current ? { duration: 1.6, repeat: Number.POSITIVE_INFINITY } : undefined}
              className={cn(
                'relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full border-4 text-sm font-bold',
                done && 'border-blue bg-blue text-white',
                current && 'border-yellow bg-navy text-white shadow-lg',
                !done && !current && 'border-sky-200 bg-white text-ink-soft',
              )}
            >
              {done ? <Check className="size-5" aria-hidden /> : i + 1}
            </motion.span>
            <span className="pt-1.5 md:px-1">
              <span className={cn('block text-sm font-bold', !done && !current && 'text-ink-soft')}>
                {t(`common:stages.${s}`)}
              </span>
              <span className="block text-xs text-ink-soft">{state}</span>
            </span>
          </li>
        )
      })}
      {branch && (
        <li className="relative flex flex-1 gap-3 md:flex-col md:items-center md:text-center">
          <span
            className={cn(
              'relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full border-4',
              app.stage === 'notSelected'
                ? 'border-orange bg-orange text-white'
                : 'border-ink-soft bg-muted text-ink',
            )}
          >
            {app.stage === 'notSelected' ? (
              <CircleSlash className="size-5" aria-hidden />
            ) : (
              <Undo2 className="size-5" aria-hidden />
            )}
          </span>
          <span className="pt-1.5 md:px-1">
            <span className="block text-sm font-bold">{t(`common:stages.${app.stage}`)}</span>
            <span className="block text-xs text-ink-soft">
              {t(`apps.detail.branch.${app.stage}`)}
            </span>
          </span>
        </li>
      )}
    </ol>
  )
}
