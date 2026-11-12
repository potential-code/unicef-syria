import type { AssessmentQuestion, Dimension } from '@shared/types'
import { ArrowLeft, ArrowRight, Check, Save } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { useLocalized } from '@/i18n'
import { cn } from '@/lib/utils'
import { OptionRadio } from './OptionRadio'

const LETTERS = ['A', 'B', 'C', 'D']

interface Props {
  question: AssessmentQuestion
  index: number
  total: number
  value: Dimension | null
  onSelect: (d: Dimension) => void
  onBack: () => void
  onNext: () => void
  onSave: () => void
  nextLabel: string
}

/** One discovery question per screen with four option cards (brief §3 Y03). */
export function QuestionStep({
  question,
  index,
  total,
  value,
  onSelect,
  onBack,
  onNext,
  onSave,
  nextLabel,
}: Props) {
  const { t } = useTranslation('learn')
  const { l } = useLocalized()
  // Rotate the display order per question so the dimensions do not always sit in the same place.
  const shift = question.id % 4
  const options = [...question.options.slice(shift), ...question.options.slice(0, shift)]
  const pct = Math.round(((index + 1) / total) * 100)

  return (
    <div className="mx-auto max-w-3xl">
      <div className="flex items-center justify-between gap-3 text-sm font-semibold">
        <span className="text-blue">{t('discovery.progress', { n: index + 1, total })}</span>
        <span className="text-ink-soft">{pct}%</span>
      </div>
      <Progress
        value={pct}
        className="mt-2 h-2.5 bg-sky-100"
        aria-label={t('discovery.progress', { n: index + 1, total })}
      />

      <AnimatePresence mode="wait">
        <motion.fieldset
          key={question.id}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -24 }}
          transition={{ duration: 0.25 }}
          className="mt-6"
        >
          <legend className="text-2xl font-bold leading-snug sm:text-3xl">
            {l(question.prompt)}
          </legend>
          <p className="mt-2 text-sm text-ink-soft">{t('discovery.pickOne')}</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {options.map((o, i) => {
              const selected = value === o.dimension
              return (
                <OptionRadio
                  key={o.dimension}
                  name={`q${question.id}`}
                  checked={selected}
                  onChange={() => onSelect(o.dimension)}
                  className={cn(
                    'group relative flex min-h-20 items-start gap-3 rounded-2xl border p-4 text-start shadow-sm transition-[transform,box-shadow,background-color,border-color] duration-200 active:scale-[0.99] sm:p-5',
                    selected
                      ? 'border-blue bg-blue text-white shadow-lg'
                      : 'border-border/70 bg-white hover:-translate-y-0.5 hover:border-cyan/60 hover:shadow-md',
                  )}
                >
                  <span
                    className={cn(
                      'w-4 shrink-0 pt-0.5 text-sm font-bold tabular-nums',
                      selected ? 'text-white/70' : 'text-ink-soft/70 group-hover:text-blue',
                    )}
                    aria-hidden
                  >
                    {LETTERS[i]}
                  </span>
                  <span className="flex-1 pe-7 leading-snug font-semibold">{l(o.text)}</span>
                  <span
                    className={cn(
                      'absolute end-4 top-4 flex size-5 items-center justify-center rounded-full border-2 transition-colors sm:end-5 sm:top-5',
                      selected ? 'border-white bg-white text-blue' : 'border-input bg-white',
                    )}
                    aria-hidden
                  >
                    {selected && <Check className="size-3.5" strokeWidth={3} />}
                  </span>
                </OptionRadio>
              )
            })}
          </div>
        </motion.fieldset>
      </AnimatePresence>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <Button variant="ghost" className="rounded-full" onClick={onBack}>
          <ArrowLeft className="size-4 rtl-mirror" aria-hidden />
          {t('common:back')}
        </Button>
        <Button variant="outline" className="rounded-full" onClick={onSave}>
          <Save className="size-4" aria-hidden />
          {t('discovery.saveExit')}
        </Button>
        <Button className="ms-auto rounded-full" onClick={onNext} disabled={!value}>
          {nextLabel}
          <ArrowRight className="size-4 rtl-mirror" aria-hidden />
        </Button>
      </div>
    </div>
  )
}
