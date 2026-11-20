import type { Course, Unit } from '@shared/types'
import { Lightbulb, MessageSquareQuote, Target } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Motif } from '@/components/brand'
import { useLocalized } from '@/i18n'
import type { BlockKind } from '../blocks'
import { CheckQuestion } from './CheckQuestion'
import { PlaceholderLabel } from './PlaceholderLabel'
import { VideoPreview } from './VideoPreview'

/** One learning block of a unit: video preview, lesson text, scenario or knowledge check. */
export function UnitBlock({
  kind,
  course,
  unit,
  index,
  onPlayed,
  onAnswered,
}: {
  kind: BlockKind
  course: Course
  unit: Unit
  index: number
  onPlayed: () => void
  onAnswered: (right: boolean) => void
}) {
  const { t } = useTranslation('learn')
  const { l } = useLocalized()

  if (kind === 'video' && unit.transcript)
    return <VideoPreview title={l(unit.title)} transcript={unit.transcript} onPlayed={onPlayed} />

  if (kind === 'check' && unit.check)
    return (
      <CheckQuestion
        key={unit.id}
        question={unit.check}
        salt={index + course.id.charCodeAt(2)}
        onAnswered={onAnswered}
      />
    )

  if (kind === 'scenario')
    return (
      <div className="space-y-5">
        {unit.scenario && (
          <section className="relative overflow-hidden rounded-3xl bg-yellow p-5 text-ink shadow-md sm:p-6">
            <MessageSquareQuote className="absolute -end-4 -top-5 size-24 opacity-10" aria-hidden />
            <p className="relative text-lg">{l(unit.scenario)}</p>
          </section>
        )}
        {unit.takeaway && (
          <div className="on-dark relative flex items-start gap-3 overflow-hidden rounded-3xl bg-navy p-5 text-white shadow-md">
            <Motif variant="corner" className="text-cyan/20" />
            <Lightbulb className="relative mt-0.5 size-5 shrink-0 text-yellow" aria-hidden />
            <span className="relative">
              <span className="block text-xs font-bold uppercase tracking-wide text-yellow">
                {t('player.takeaway')}
              </span>
              <span className="text-lg font-semibold">{l(unit.takeaway)}</span>
            </span>
          </div>
        )}
      </div>
    )

  const body = unit.body ?? unit.synopsis
  return (
    <section className="card overflow-hidden rounded-3xl">
      {unit.objective && (
        <p className="flex items-start gap-3 bg-cyan px-5 py-4 font-semibold text-ink sm:px-6">
          <Target className="mt-0.5 size-5 shrink-0" aria-hidden />
          <span>
            <span className="block text-xs font-bold uppercase tracking-wide">
              {t('player.objective')}
            </span>
            {l(unit.objective)}
          </span>
        </p>
      )}
      <div className="p-5 sm:p-6">
        <div className="mb-3 empty:hidden">
          <PlaceholderLabel value={body} />
        </div>
        <p className="text-lg leading-relaxed">{l(body)}</p>
      </div>
    </section>
  )
}
