import type { Course, CourseProgress, Unit, YouthId } from '@shared/types'
import { useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { useLocalized } from '@/i18n'
import { markBlocksDone, setUnitStatus } from '@/store/actions/learning'
import { unitBlocks } from '../blocks'
import { BlockPlayer } from './BlockPlayer'
import { CourseViewLayout } from './CourseViewLayout'

/** One unit in the course view: owns the open block and how many blocks are complete. */
export function UnitView({
  course,
  unit,
  n,
  youthId,
  progress,
}: {
  course: Course
  unit: Unit
  n: number
  youthId: YouthId
  progress: CourseProgress | undefined
}) {
  const { t } = useTranslation('learn')
  const { l } = useLocalized()
  const navigate = useNavigate()
  const kinds = unitBlocks(unit)
  const unitDone = progress?.units[n - 1] === 'done'
  const saved = progress?.blocks?.[unit.id] ?? 0
  const done = unitDone ? kinds.length : Math.min(saved, kinds.length)
  const [step, setStep] = useState(() => Math.min(done, kinds.length - 1))
  const lastUnit = n === course.units.length

  const finishUnit = () => {
    if (!unitDone) {
      setUnitStatus(youthId, course.id, n - 1, 'done')
      toast.success(t('player.unitDone', { n }))
    }
    if (lastUnit)
      void navigate({ to: '/youth/learn/$courseId/quiz', params: { courseId: course.id } })
    else
      void navigate({
        to: '/youth/learn/$courseId/$unit',
        params: { courseId: course.id, unit: String(n + 1) },
      })
  }

  const complete = () => {
    markBlocksDone(youthId, course.id, unit.id, step + 1)
    if (step === kinds.length - 1) finishUnit()
    else setStep(step + 1)
  }

  return (
    <CourseViewLayout
      course={course}
      progress={progress}
      current={n}
      now={l(unit.title)}
      blocks={{ kinds, step, done, onSelect: setStep }}
    >
      <BlockPlayer
        course={course}
        unit={unit}
        n={n}
        kinds={kinds}
        step={step}
        done={done}
        lastUnit={lastUnit}
        youthId={youthId}
        reflection={progress?.reflections?.[unit.id] ?? ''}
        onStep={setStep}
        onComplete={complete}
      />
    </CourseViewLayout>
  )
}
