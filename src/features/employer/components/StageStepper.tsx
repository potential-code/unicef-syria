import type { Application } from '@shared/types'
import { Check } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { STAGES, stageIndex } from '@/domain/application-stages'
import { cn } from '@/lib/utils'

/** Track stages from submission onward, with the current stage highlighted. */
export function StageStepper({ app }: { app: Application }) {
  const { t } = useTranslation()
  const stages = STAGES[app.track].filter((s) => s !== 'draft')
  const reached = (() => {
    const i = stageIndex(app.track, app.stage)
    if (i >= 0) return i
    // Closed branch: the furthest stage recorded before it.
    return Math.max(...app.timeline.map((e) => stageIndex(app.track, e.stage)))
  })()
  return (
    <ol className="flex flex-wrap gap-x-1 gap-y-2" aria-label={t('employer:detail.progress')}>
      {stages.map((s) => {
        const i = stageIndex(app.track, s)
        const done =
          i < reached || (i === reached && (app.stage === 'hired' || app.stage === 'completed'))
        const current = i === reached && !done
        return (
          <li
            key={s}
            className="flex items-center gap-1"
            aria-current={current ? 'step' : undefined}
          >
            <span
              className={cn(
                'inline-flex min-h-8 items-center gap-1 rounded-full px-3 text-xs font-semibold',
                done
                  ? 'bg-blue text-white'
                  : current
                    ? 'bg-sky-200 text-navy ring-2 ring-blue'
                    : 'bg-muted text-ink-soft',
              )}
            >
              {done && <Check className="size-3.5" aria-hidden />}
              {t(`stages.${s}`)}
            </span>
          </li>
        )
      })}
    </ol>
  )
}
