import type { Course, Unit, YouthId } from '@shared/types'
import { useLocalized } from '@/i18n'
import type { BlockKind } from '../blocks'
import { CheckQuestion } from './CheckQuestion'
import { LessonText } from './LessonText'
import { ScenarioActivity } from './ScenarioActivity'
import { VideoPreview } from './VideoPreview'

/** One learning block of a unit: video preview, lesson text, scenario activity or knowledge check. */
export function UnitBlock({
  kind,
  course,
  unit,
  index,
  youthId,
  reflection,
  onPlayed,
  onAnswered,
  onSaved,
}: {
  kind: BlockKind
  course: Course
  unit: Unit
  index: number
  onPlayed: () => void
  onAnswered: (right: boolean) => void
  youthId: YouthId
  /** The learner's saved scenario reflection, if any. */
  reflection: string
  onSaved: () => void
}) {
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
      <ScenarioActivity
        unit={unit}
        courseId={course.id}
        youthId={youthId}
        initial={reflection}
        onSaved={onSaved}
      />
    )

  return <LessonText unit={unit} />
}
