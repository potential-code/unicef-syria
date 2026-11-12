import { Info, Wand2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import type { StepId } from '../../register-config'
import { CompletionMeter } from './CompletionMeter'
import { Stepper } from './Stepper'

/** Compact progress card: stepper, completion meter, presenter shortcut and the demo note. */
export function RegisterProgress({
  step,
  done,
  completion,
  onGo,
  onSample,
}: {
  step: StepId
  done: StepId[]
  completion: number
  onGo: (s: StepId) => void
  onSample: () => void
}) {
  const { t } = useTranslation('public')
  return (
    <div className="card space-y-4 p-4 sm:p-5">
      <Stepper current={step} done={done} onGo={onGo} />
      <div className="flex flex-wrap items-center gap-x-4 gap-y-3 border-t border-border/60 pt-4">
        <CompletionMeter value={completion} />
        <Button
          type="button"
          size="sm"
          variant="secondary"
          onClick={onSample}
          className="shrink-0 rounded-full"
        >
          <Wand2 className="size-4" aria-hidden />
          {t('register.sample')}
        </Button>
      </div>
      <p className="flex gap-2 text-xs text-ink-soft">
        <Info className="mt-0.5 size-3.5 shrink-0 text-blue" aria-hidden />
        {t('register.demoNote')}
      </p>
    </div>
  )
}
