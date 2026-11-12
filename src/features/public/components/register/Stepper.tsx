import { Check } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/utils'
import { STEPS, type StepId } from '../../register-config'

/** Five-step indicator. Completed steps can be revisited. */
export function Stepper({
  current,
  done,
  onGo,
}: {
  current: StepId
  done: StepId[]
  onGo: (s: StepId) => void
}) {
  const { t } = useTranslation('public')
  const idx = STEPS.indexOf(current)
  return (
    <ol className="flex gap-1.5 lg:flex-col lg:gap-1">
      {STEPS.map((s, i) => {
        const complete = done.includes(s)
        const active = s === current
        const reachable = complete || i <= idx
        return (
          <li key={s} className="flex-1 lg:flex-none">
            <button
              type="button"
              onClick={() => reachable && onGo(s)}
              disabled={!reachable}
              aria-current={active ? 'step' : undefined}
              className={cn(
                'flex w-full flex-col items-center gap-1 rounded-xl p-1.5 text-center transition-colors lg:flex-row lg:gap-3 lg:p-2.5 lg:text-start',
                active ? 'bg-white/20' : 'hover:bg-white/10',
                !reachable && 'opacity-60',
              )}
            >
              <span
                className={cn(
                  'flex size-9 shrink-0 items-center justify-center rounded-full text-sm font-extrabold',
                  complete
                    ? 'bg-yellow text-ink'
                    : active
                      ? 'bg-white text-blue'
                      : 'border-2 border-white/50 text-white',
                )}
              >
                {complete ? <Check className="size-4" aria-hidden /> : i + 1}
              </span>
              <span className="text-[11px] leading-tight font-semibold text-white sm:text-xs lg:text-base">
                {t(`register.steps.${s}`)}
              </span>
              {complete && <span className="sr-only">{t('register.stepDone')}</span>}
            </button>
          </li>
        )
      })}
    </ol>
  )
}
