import type { Course, Unit } from '@shared/types'
import { BookOpenText, Hammer, Sparkles } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useLocalized } from '@/i18n'
import { CheckQuestion } from './CheckQuestion'

/** Readable unit summary for non-showcase courses (brief §6: "useful readable summary"). */
export function UnitSummary({
  course,
  unit,
  index,
}: {
  course: Course
  unit: Unit
  index: number
}) {
  const { t } = useTranslation('learn')
  const { l } = useLocalized()
  const steps = [
    {
      icon: BookOpenText,
      title: t('player.sumExplore'),
      body: l(unit.synopsis),
      tone: 'bg-cyan text-ink',
    },
    {
      icon: Hammer,
      title: t('player.sumPractise'),
      body: t('player.sumPractiseBody', { output: l(course.output) }),
      tone: 'bg-yellow text-ink',
    },
    {
      icon: Sparkles,
      title: t('player.sumReflect'),
      body: t('player.sumReflectBody'),
      tone: 'bg-orange text-white',
    },
  ]
  return (
    <div className="space-y-5">
      <section className="on-dark relative overflow-hidden rounded-3xl bg-grad-unicef p-6 text-white sm:p-8">
        <span
          className="pointer-events-none absolute -end-10 -bottom-10 size-40 rounded-full bg-white/10"
          aria-hidden
        />
        <p className="relative text-xs font-bold uppercase tracking-wide text-yellow">
          {t('player.summary')}
        </p>
        <p className="relative mt-2 text-2xl font-bold leading-snug">{l(unit.synopsis)}</p>
      </section>
      <section className="rounded-3xl border bg-white p-5 shadow-sm sm:p-6">
        <h2 className="text-xl">{t('player.inThisUnit')}</h2>
        <ol className="mt-4 grid gap-3 md:grid-cols-3">
          {steps.map((s, i) => (
            <li key={s.title} className="rounded-2xl bg-sky-50 p-4">
              <span className={`flex size-10 items-center justify-center rounded-xl ${s.tone}`}>
                <s.icon className="size-5" aria-hidden />
              </span>
              <p className="mt-3 font-bold">
                {i + 1}. {s.title}
              </p>
              <p className="mt-1 text-sm text-ink-soft">{s.body}</p>
            </li>
          ))}
        </ol>
      </section>
      {unit.check && (
        <CheckQuestion key={unit.id} question={unit.check} salt={index + course.id.charCodeAt(2)} />
      )}
    </div>
  )
}
