import type { QuizQuestion } from '@shared/types'
import { Check, Send } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { useLocalized } from '@/i18n'
import { cn } from '@/lib/utils'
import { OptionRadio } from './OptionRadio'

/** Five-question final quiz. `questions` are already arranged with arrangeOptions. */
export function QuizForm({
  questions,
  answers,
  onAnswer,
  onSubmit,
  attempt,
}: {
  questions: QuizQuestion[]
  answers: (number | null)[]
  onAnswer: (q: number, o: number) => void
  onSubmit: () => void
  attempt: number
}) {
  const { t } = useTranslation('learn')
  const { l } = useLocalized()
  const ready = answers.every((a) => a !== null)
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        if (ready) onSubmit()
      }}
      className="space-y-4"
    >
      <p className="text-sm font-semibold text-ink-soft">{t('quiz.attempt', { n: attempt })}</p>
      {questions.map((q, qi) => (
        <fieldset key={q.prompt.en} className="card p-5 sm:p-6">
          <legend className="sr-only">{l(q.prompt)}</legend>
          <p aria-hidden className="text-xs font-extrabold tracking-wider text-blue uppercase">
            {t('quiz.questionN', { n: qi + 1, total: questions.length })}
          </p>
          <p aria-hidden className="mt-1 text-base font-bold sm:text-lg">
            {l(q.prompt)}
          </p>
          <div className="mt-3 grid gap-2">
            {q.options.map((o, oi) => {
              const on = answers[qi] === oi
              return (
                <OptionRadio
                  key={o.en}
                  name={`quiz-q${qi}`}
                  checked={on}
                  onChange={() => onAnswer(qi, oi)}
                  className={cn(
                    'flex min-h-12 items-center gap-3 rounded-xl border px-4 py-2.5 text-start text-sm font-medium shadow-sm transition-[background-color,border-color,box-shadow,translate] duration-200',
                    on
                      ? 'border-blue bg-blue text-white shadow-md'
                      : 'border-border/70 bg-white hover:-translate-y-0.5 hover:border-cyan/60 hover:shadow-md',
                  )}
                >
                  <span
                    className={cn(
                      'flex size-5 shrink-0 items-center justify-center rounded-full border-2',
                      on ? 'border-white bg-white text-blue' : 'border-input bg-white',
                    )}
                    aria-hidden
                  >
                    {on && <Check className="size-3.5" strokeWidth={3} />}
                  </span>
                  {l(o)}
                </OptionRadio>
              )
            })}
          </div>
        </fieldset>
      ))}
      <div className="flex flex-wrap items-center gap-3">
        {!ready && <p className="text-sm text-ink-soft">{t('quiz.answerAll')}</p>}
        <Button type="submit" className="ms-auto rounded-full" disabled={!ready}>
          <Send className="size-4 rtl-mirror" aria-hidden />
          {t('quiz.submit')}
        </Button>
      </div>
    </form>
  )
}
