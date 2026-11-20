import type { Unit } from '@shared/types'
import { Target } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useLocalized } from '@/i18n'
import { PlaceholderLabel } from './PlaceholderLabel'

/** Lesson text block: learning objective callout, then the lesson explanation. */
export function LessonText({ unit }: { unit: Unit }) {
  const { t } = useTranslation('learn')
  const { l } = useLocalized()
  const body = unit.body ?? unit.synopsis
  return (
    <section className="card rounded-3xl p-5 sm:p-7">
      {unit.objective && (
        <div className="flex items-start gap-3 rounded-2xl border-s-4 border-blue bg-sky-50 px-4 py-3">
          <Target className="mt-0.5 size-5 shrink-0 text-blue" aria-hidden />
          <p>
            <span className="block text-xs font-bold uppercase tracking-wide text-blue">
              {t('player.objective')}
            </span>
            <span className="font-semibold text-navy">{l(unit.objective)}</span>
          </p>
        </div>
      )}
      <div className="mt-5 empty:hidden">
        <PlaceholderLabel value={body} />
      </div>
      <p className="mt-3 max-w-[70ch] leading-7 text-ink">{l(body)}</p>
    </section>
  )
}
