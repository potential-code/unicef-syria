import type { Course, Unit } from '@shared/types'
import { BookOpenText, Hammer, Sparkles } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Motif } from '@/components/brand'
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
      tone: 'text-blue',
    },
    {
      icon: Hammer,
      title: t('player.sumPractise'),
      body: t('player.sumPractiseBody', { output: l(course.output) }),
      tone: 'text-orange',
    },
    {
      icon: Sparkles,
      title: t('player.sumReflect'),
      body: t('player.sumReflectBody'),
      tone: 'text-navy',
    },
  ]
  return (
    <div className="space-y-5">
      <section className="on-dark relative overflow-hidden rounded-3xl bg-grad-unicef p-6 text-white shadow-lg sm:p-8">
        <Motif variant="card" className="text-white/[0.12]" />
        <p className="relative text-xs font-bold uppercase tracking-wide text-yellow">
          {t('player.summary')}
        </p>
        <p className="relative mt-2 text-2xl font-bold leading-snug">{l(unit.synopsis)}</p>
      </section>
      <section className="card rounded-3xl p-5 sm:p-6">
        <h2 className="text-lg">{t('player.inThisUnit')}</h2>
        <ol className="mt-3 divide-y divide-border/70">
          {steps.map((s, i) => (
            <li key={s.title} className="flex items-start gap-3 py-3.5 last:pb-0">
              <s.icon className={`mt-0.5 size-5 shrink-0 ${s.tone}`} aria-hidden />
              <div className="min-w-0 flex-1">
                <p className="font-bold">
                  <span className="me-1.5 text-ink-soft tabular-nums">{i + 1}.</span>
                  {s.title}
                </p>
                <p className="mt-0.5 text-sm text-ink-soft">{s.body}</p>
              </div>
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
