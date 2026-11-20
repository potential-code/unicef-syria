import type { CheckQuestion as Q } from '@shared/types'
import { CircleCheck, CircleQuestionMark, CircleX } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { arrangeOptions } from '@/domain/quiz'
import { useLocalized } from '@/i18n'
import { cn } from '@/lib/utils'
import { OptionRadio } from './OptionRadio'

/** Unit check question with feedback. Options always pass through arrangeOptions. */
export function CheckQuestion({
  question,
  salt,
  onAnswered,
}: {
  question: Q
  salt: number
  /** Called each time the learner checks an answer, with whether it was right. */
  onAnswered?: (right: boolean) => void
}) {
  const { t } = useTranslation('learn')
  const { l } = useLocalized()
  const q = arrangeOptions(question, salt)
  const [picked, setPicked] = useState<number | null>(null)
  const [checked, setChecked] = useState(false)
  const right = checked && picked === q.correct
  const name = `check-${salt}`

  return (
    <section
      className="card rounded-3xl border-t-4 border-t-cyan p-5 sm:p-6"
      aria-labelledby={`${name}-h`}
    >
      <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-blue">
        <CircleQuestionMark className="size-4" aria-hidden />
        {t('player.check')}
      </p>
      <h3 id={`${name}-h`} className="mt-2 text-lg">
        {l(q.prompt)}
      </h3>
      <fieldset aria-labelledby={`${name}-h`} className="mt-4 grid gap-2">
        {q.options.map((o, i) => {
          const on = picked === i
          const showRight = checked && i === q.correct
          const showWrong = checked && on && i !== q.correct
          return (
            <OptionRadio
              key={o.en}
              name={name}
              checked={on}
              onChange={() => {
                setPicked(i)
                setChecked(false)
              }}
              className={cn(
                'flex min-h-12 items-center gap-3 rounded-xl border px-4 py-2.5 text-start text-sm font-medium shadow-sm transition-[background-color,border-color,box-shadow,translate] duration-200',
                showRight
                  ? 'border-success bg-success-soft'
                  : showWrong
                    ? 'border-danger bg-danger-soft'
                    : on
                      ? 'border-blue bg-blue text-white shadow-md'
                      : 'border-border/70 bg-white hover:-translate-y-0.5 hover:border-cyan/60 hover:shadow-md',
              )}
            >
              <span
                className={cn(
                  'size-4 shrink-0 rounded-full border-2',
                  on && !checked
                    ? 'border-white bg-white ring-2 ring-inset ring-blue'
                    : on
                      ? 'border-current bg-current'
                      : 'border-input bg-white',
                )}
                aria-hidden
              />
              <span className="flex-1">{l(o)}</span>
              {showRight && (
                <CircleCheck className="size-5 text-success" aria-label={t('player.correct')} />
              )}
              {showWrong && (
                <CircleX className="size-5 text-danger" aria-label={t('player.incorrect')} />
              )}
            </OptionRadio>
          )
        })}
      </fieldset>
      <Button
        className="mt-4 rounded-full"
        disabled={picked === null}
        onClick={() => {
          setChecked(true)
          onAnswered?.(picked === q.correct)
        }}
      >
        {t('player.checkAnswer')}
      </Button>
      {checked && (
        <p
          role="status"
          className={cn(
            'mt-4 rounded-2xl px-4 py-3 text-sm',
            right ? 'bg-success-soft text-success' : 'bg-notice-soft text-notice',
          )}
        >
          <strong>{right ? t('player.rightTitle') : t('player.wrongTitle')}</strong> {l(q.feedback)}
        </p>
      )}
    </section>
  )
}
