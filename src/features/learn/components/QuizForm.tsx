import type { QuizQuestion } from '@shared/types'
import { Send } from 'lucide-react'
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
        <fieldset key={q.prompt.en} className="rounded-3xl border bg-white p-5 shadow-sm">
          <legend className="sr-only">{l(q.prompt)}</legend>
          <p aria-hidden className="text-lg font-bold">
            <span className="me-2 inline-flex size-8 items-center justify-center rounded-xl bg-yellow text-sm text-ink">
              {qi + 1}
            </span>
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
                    'flex min-h-12 items-center gap-3 rounded-2xl border-2 px-4 py-2 text-start font-medium transition-colors',
                    on ? 'border-blue bg-blue-50' : 'border-border hover:border-sky-200',
                  )}
                >
                  <span
                    className={cn(
                      'size-4 shrink-0 rounded-full border-2',
                      on ? 'border-blue bg-blue' : 'border-input',
                    )}
                    aria-hidden
                  />
                  {l(o)}
                </OptionRadio>
              )
            })}
          </div>
        </fieldset>
      ))}
      <div className="flex flex-wrap items-center gap-3">
        {!ready && <p className="text-sm text-ink-soft">{t('quiz.answerAll')}</p>}
        <Button type="submit" size="lg" className="ms-auto rounded-full" disabled={!ready}>
          <Send className="size-5 rtl-mirror" aria-hidden />
          {t('quiz.submit')}
        </Button>
      </div>
    </form>
  )
}
