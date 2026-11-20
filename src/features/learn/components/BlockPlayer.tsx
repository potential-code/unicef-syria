import type { Course, Unit, YouthId } from '@shared/types'
import { ArrowLeft, ArrowRight, CircleCheck, Info } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { useLocalized } from '@/i18n'
import { BLOCK_ICON, type BlockKind } from '../blocks'
import { UnitBlock } from './UnitBlock'

/**
 * Main pane of the course view: the unit's learning blocks one at a time, with step progress,
 * Previous, and Mark complete (after the video is played or the check is answered correctly).
 */
export function BlockPlayer({
  course,
  unit,
  n,
  kinds,
  step,
  done,
  lastUnit,
  youthId,
  reflection,
  onStep,
  onComplete,
}: {
  course: Course
  unit: Unit
  n: number
  kinds: BlockKind[]
  step: number
  done: number
  lastUnit: boolean
  youthId: YouthId
  reflection: string
  onStep: (i: number) => void
  onComplete: () => void
}) {
  const { t } = useTranslation('learn')
  const { l } = useLocalized()
  const [played, setPlayed] = useState<number[]>([])
  const [right, setRight] = useState<number[]>([])
  const [reflected, setReflected] = useState<number[]>([])
  const kind = kinds[step] ?? 'lesson'
  const Icon = BLOCK_ICON[kind]
  const isDone = step < done
  const lastBlock = step === kinds.length - 1
  const gate =
    !isDone && kind === 'video' && !played.includes(step)
      ? 'watch'
      : !isDone && kind === 'check' && !right.includes(step)
        ? 'answer'
        : !isDone && kind === 'scenario' && !reflection && !reflected.includes(step)
          ? 'reflect'
          : null

  const completeLabel = !lastBlock
    ? t('block.markComplete')
    : lastUnit
      ? t('block.finishToQuiz')
      : t('block.finishUnit')

  return (
    <article aria-labelledby="unit-title">
      <header className="border-b border-border/70 pb-4">
        <p className="text-sm font-bold text-blue">
          {t('player.unitOf', { n, total: course.units.length, course: course.id })}
        </p>
        <h2 id="unit-title" className="mt-1 text-2xl leading-tight font-extrabold">
          {l(unit.title)}
        </h2>
        <p className="mt-1 text-ink-soft">{l(unit.synopsis)}</p>
        <div className="mt-3 flex items-center gap-3">
          <Progress
            value={((step + 1) / kinds.length) * 100}
            className="h-1.5 bg-sky-100"
            aria-label={t('block.unitProgress')}
          />
          <span className="shrink-0 text-xs font-semibold text-ink-soft">
            {t('block.stepOf', { n: step + 1, total: kinds.length })}
          </span>
        </div>
      </header>

      <div className="mt-5">
        <p className="mb-3 flex items-center gap-2 text-sm font-bold text-navy">
          <Icon className="size-4 text-blue" aria-hidden />
          {t(`block.kind.${kind}`)}
          {isDone && (
            <span className="ms-auto inline-flex items-center gap-1 text-xs font-semibold text-success">
              <CircleCheck className="size-4" aria-hidden />
              {t('block.completed')}
            </span>
          )}
        </p>
        <UnitBlock
          key={`${unit.id}-${kind}`}
          kind={kind}
          course={course}
          unit={unit}
          index={n - 1}
          onPlayed={() => setPlayed((s) => [...s, step])}
          onAnswered={(ok) => ok && setRight((s) => [...s, step])}
          youthId={youthId}
          reflection={reflection}
          onSaved={() => setReflected((s) => [...s, step])}
        />
      </div>

      {gate && (
        <p className="mt-5 flex items-center gap-2 text-sm text-ink-soft" aria-live="polite">
          <Info className="size-4 shrink-0 text-blue" aria-hidden />
          {t(`block.${gate}ToContinue`)}
        </p>
      )}

      <nav
        className="mt-6 flex flex-wrap items-center gap-3 border-t pt-6"
        aria-label={t('player.unitNav')}
      >
        <Button
          variant="outline"
          className="rounded-full"
          disabled={step === 0}
          onClick={() => onStep(step - 1)}
        >
          <ArrowLeft className="size-4 rtl-mirror" aria-hidden />
          {t('block.previous')}
        </Button>
        <div className="ms-auto flex flex-wrap items-center gap-2">
          {isDone && !lastBlock ? (
            <Button className="rounded-full" onClick={() => onStep(step + 1)}>
              {t('block.next')}
              <ArrowRight className="size-4 rtl-mirror" aria-hidden />
            </Button>
          ) : (
            <Button className="rounded-full" disabled={!!gate} onClick={onComplete}>
              <CircleCheck className="size-4" aria-hidden />
              {completeLabel}
            </Button>
          )}
        </div>
      </nav>
    </article>
  )
}
