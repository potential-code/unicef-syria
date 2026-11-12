import { Info, Wand2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import type { StepId } from '../../register-config'
import { CompletionMeter } from './CompletionMeter'
import { Stepper } from './Stepper'

/** Gradient side panel: stepper, completion meter, presenter shortcut and the demo explanation. */
export function RegisterAside({
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
    <aside className="on-dark relative overflow-hidden rounded-[2rem] bg-grad-unicef p-4 text-white shadow-lg sm:p-6 lg:sticky lg:top-6 lg:self-start">
      <span
        className="pointer-events-none absolute -end-16 -bottom-16 size-48 rounded-full bg-yellow/25 blur-2xl"
        aria-hidden
      />
      <div className="relative space-y-6">
        <Stepper current={step} done={done} onGo={onGo} />
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/20 pt-5">
          <CompletionMeter value={completion} />
          <Button
            type="button"
            onClick={onSample}
            className="rounded-full bg-white text-blue hover:bg-yellow hover:text-ink"
          >
            <Wand2 className="size-4" aria-hidden />
            {t('register.sample')}
          </Button>
        </div>
        <p className="flex gap-2 rounded-2xl bg-white/10 p-3 text-sm text-white/90">
          <Info className="mt-0.5 size-4 shrink-0" aria-hidden />
          {t('register.demoNote')}
        </p>
      </div>
    </aside>
  )
}
