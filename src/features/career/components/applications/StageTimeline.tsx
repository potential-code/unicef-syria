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
                  'absolute start-[0.94rem] top-9 h-[calc(100%-2.5rem)] w-0.5 rounded-full md:start-[calc(50%+1.5rem)] md:top-[0.94rem] md:h-0.5 md:w-[calc(100%-3rem)]',
                  done
                    ? 'bg-blue'
                    : 'bg-[repeating-linear-gradient(90deg,var(--color-sky-200)_0_6px,transparent_6px_10px)] max-md:bg-[repeating-linear-gradient(180deg,var(--color-sky-200)_0_6px,transparent_6px_10px)]',
                )}
              />
            )}
            <motion.span
              initial={false}
              animate={
                current
                  ? {
                      boxShadow: [
                        '0 0 0 0px rgb(255 194 14 / 0.55)',
                        '0 0 0 8px rgb(255 194 14 / 0)',
                      ],
                    }
                  : undefined
              }
              transition={current ? { duration: 1.6, repeat: Number.POSITIVE_INFINITY } : undefined}
              className={cn(
                'relative z-10 flex size-8 shrink-0 items-center justify-center rounded-full text-xs font-bold tabular-nums',
                done && 'bg-blue text-white shadow-sm',
                current && 'bg-navy text-white shadow-md ring-[3px] ring-yellow',
                !done && !current && 'border-2 border-sky-200 bg-white text-ink-soft',
              )}
            >
              {done ? <Check className="size-4" strokeWidth={3} aria-hidden /> : i + 1}
            </motion.span>
            <span className="pt-1 md:px-1 md:pt-2.5">
              <span
                className={cn(
                  'block text-sm leading-snug font-bold',
                  current && 'text-navy',
                  !done && !current && 'text-ink-soft',
                )}
              >
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
              'relative z-10 flex size-8 shrink-0 items-center justify-center rounded-full shadow-sm',
              app.stage === 'notSelected' ? 'bg-orange text-white' : 'bg-ink-soft text-white',
            )}
          >
            {app.stage === 'notSelected' ? (
              <CircleSlash className="size-4" aria-hidden />
            ) : (
              <Undo2 className="size-4" aria-hidden />
            )}
          </span>
          <span className="pt-1 md:px-1 md:pt-2.5">
            <span className="block text-sm leading-snug font-bold">
              {t(`common:stages.${app.stage}`)}
            </span>
            <span className="block text-xs text-ink-soft">
              {t(`apps.detail.branch.${app.stage}`)}
            </span>
          </span>
        </li>
      )}
    </ol>
  )
}
