import type { Youth } from '@shared/types'
import { Check } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { PREFERENCE_QUESTIONS } from '@/data/assessment'
import { useLocalized } from '@/i18n'
import { cn } from '@/lib/utils'
import { setPreference } from '@/store/actions/youth'
import { OptionRadio } from './OptionRadio'

/** Three separate preference questions; the earning model drives the recommended route (§4). */
export function PreferenceQuestions({ youth }: { youth: Youth }) {
  const { t } = useTranslation('learn')
  const { l } = useLocalized()
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {PREFERENCE_QUESTIONS.map((q, qi) => (
        <fieldset key={q.key} className="card p-5">
          <legend className="sr-only">{l(q.prompt)}</legend>
          <p className="text-xs font-bold uppercase tracking-wide text-blue">
            {t('results.prefN', { n: qi + 1 })}
          </p>
          <p aria-hidden className="mt-1 text-base font-bold">
            {l(q.prompt)}
          </p>
          <div className="mt-3 flex flex-col gap-2">
            {q.options.map((o) => {
              const on = youth.preferences?.[q.key] === o.value
              return (
                <OptionRadio
                  key={o.value}
                  name={`pref-${q.key}`}
                  checked={on}
                  onChange={() => setPreference(youth.id, q.key, o.value)}
                  className={cn(
                    'flex min-h-11 items-center gap-2.5 rounded-xl border px-3 py-2 text-start text-sm font-semibold transition-[background-color,border-color,box-shadow]',
                    on
                      ? 'border-blue bg-blue text-white shadow-md'
                      : 'border-border bg-white hover:border-cyan/60 hover:shadow-sm',
                  )}
                >
                  <span
                    className={cn(
                      'flex size-5 shrink-0 items-center justify-center rounded-full border-2',
                      on ? 'border-white bg-white text-blue' : 'border-input bg-white',
                    )}
                  >
                    {on && <Check className="size-3.5" strokeWidth={3} aria-hidden />}
                  </span>
                  {l(o.label)}
                </OptionRadio>
              )
            })}
          </div>
        </fieldset>
      ))}
    </div>
  )
}
