import type { Course, Unit } from '@shared/types'
import { Lightbulb, MessageSquareQuote, Target } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useLocalized } from '@/i18n'
import { CheckQuestion } from './CheckQuestion'
import { PlaceholderLabel } from './PlaceholderLabel'
import { VideoPreview } from './VideoPreview'

/** Full showcase lesson: objective, video preview, explanation, scenario, takeaway and check. */
export function LessonBody({ course, unit, index }: { course: Course; unit: Unit; index: number }) {
  const { t } = useTranslation('learn')
  const { l } = useLocalized()
  return (
    <div className="space-y-5">
      {unit.objective && (
        <p className="flex items-start gap-3 rounded-3xl bg-cyan p-5 font-semibold text-ink">
          <Target className="mt-0.5 size-5 shrink-0" aria-hidden />
          <span>
            <span className="block text-xs font-bold uppercase tracking-wide">
              {t('player.objective')}
            </span>
            {l(unit.objective)}
          </span>
        </p>
      )}
      {unit.hasVideo && unit.transcript && (
        <VideoPreview title={l(unit.title)} transcript={unit.transcript} />
      )}
      {unit.body && (
        <section className="rounded-3xl border bg-white p-5 shadow-sm sm:p-6">
          <h2 className="flex flex-wrap items-center gap-2 text-xl">
            {t('player.lesson')}
            <PlaceholderLabel value={unit.body} />
          </h2>
          <p className="mt-3 text-lg leading-relaxed">{l(unit.body)}</p>
        </section>
      )}
      {unit.scenario && (
        <section className="relative overflow-hidden rounded-3xl bg-yellow p-5 text-ink sm:p-6">
          <MessageSquareQuote className="absolute -end-2 -top-2 size-24 opacity-15" aria-hidden />
          <h2 className="relative text-xs font-bold uppercase tracking-wide">
            {t('player.scenario')}
          </h2>
          <p className="relative mt-2 text-lg">{l(unit.scenario)}</p>
        </section>
      )}
      {unit.takeaway && (
        <p className="on-dark flex items-start gap-3 rounded-3xl bg-navy p-5 text-white">
          <Lightbulb className="mt-0.5 size-5 shrink-0 text-yellow" aria-hidden />
          <span>
            <span className="block text-xs font-bold uppercase tracking-wide text-yellow">
              {t('player.takeaway')}
            </span>
            <span className="text-lg font-semibold">{l(unit.takeaway)}</span>
          </span>
        </p>
      )}
      {unit.check && (
        <CheckQuestion key={unit.id} question={unit.check} salt={index + course.id.charCodeAt(2)} />
      )}
    </div>
  )
}
