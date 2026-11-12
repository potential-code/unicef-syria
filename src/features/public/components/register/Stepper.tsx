import { Check } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/utils'
import { STEPS, type StepId } from '../../register-config'

/** Compact five-step indicator. Completed and earlier steps can be revisited. */
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
    <ol className="grid grid-cols-5 gap-1">
      {STEPS.map((s, i) => {
        const complete = done.includes(s)
        const active = s === current
        const reachable = complete || i <= idx
        return (
          <li key={s} className="min-w-0">
            <button
              type="button"
              onClick={() => reachable && onGo(s)}
              disabled={!reachable}
              aria-current={active ? 'step' : undefined}
              className="group flex w-full flex-col items-center gap-1.5 rounded-lg px-0.5 py-1 text-center disabled:cursor-default"
            >
              <span
                className={cn(
                  'h-1.5 w-full rounded-full transition-colors',
                  complete ? 'bg-blue' : active ? 'bg-yellow' : 'bg-sky-100',
                )}
                aria-hidden
              />
              <span
                className={cn(
                  'flex items-center gap-1 text-[11px] leading-tight font-semibold sm:text-xs',
                  active ? 'text-ink' : complete ? 'text-blue' : 'text-ink-soft',
                  reachable && !active && 'group-hover:text-blue',
                )}
              >
                {complete ? (
                  <Check className="size-3.5 shrink-0" aria-hidden />
                ) : (
                  <span className="hidden sm:inline">{i + 1}.</span>
                )}
                <span className="min-w-0">{t(`register.steps.${s}`)}</span>
              </span>
              {complete && <span className="sr-only">{t('register.stepDone')}</span>}
            </button>
          </li>
        )
      })}
    </ol>
  )
}
