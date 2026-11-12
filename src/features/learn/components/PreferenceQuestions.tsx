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
    <div className="grid gap-4 lg:grid-cols-3">
      {PREFERENCE_QUESTIONS.map((q, qi) => (
        <fieldset key={q.key} className="rounded-3xl border bg-white p-5 shadow-sm">
          <legend className="sr-only">{l(q.prompt)}</legend>
          <p className="text-xs font-bold uppercase tracking-wide text-blue">
            {t('results.prefN', { n: qi + 1 })}
          </p>
          <p aria-hidden className="mt-1 text-lg font-bold">
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
                    'flex min-h-12 items-center gap-2 rounded-2xl border-2 px-3 py-2 text-start font-semibold transition-colors',
                    on
                      ? 'border-blue bg-blue text-white'
                      : 'border-sky-200 bg-sky-50 hover:border-blue',
                  )}
                >
                  <span
                    className={cn(
                      'flex size-6 shrink-0 items-center justify-center rounded-full',
                      on ? 'bg-white text-blue' : 'bg-white',
                    )}
                  >
                    {on && <Check className="size-4" aria-hidden />}
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
