import { SearchX } from 'lucide-react'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { EmptyState } from '@/components/shared/EmptyState'
import { PageHeader } from '@/components/shared/PageHeader'
import { COURSE_BY_ID } from '@/data/courses'
import { setUnitStatus } from '@/store/actions/learning'
import { useMyYouth } from '@/store/hooks'
import { UnitView } from '../components/UnitView'
import { isCourseId } from '../lib'

/** Y07 course view route page: validates the unit, marks it started, renders the unit view. */
export function PlayerPage({ courseId, unit }: { courseId: string; unit: string }) {
  const { t } = useTranslation('learn')
  const youth = useMyYouth()
  const n = Number(unit)
  const valid = isCourseId(courseId) && Number.isInteger(n) && n >= 1 && n <= 4
  const status = valid ? (youth.progress[courseId]?.units[n - 1] ?? 'todo') : 'done'

  // Opening a unit marks it in progress.
  useEffect(() => {
    if (valid && status === 'todo') setUnitStatus(youth.id, courseId, n - 1, 'inProgress')
  }, [valid, status, youth.id, courseId, n])

  if (!valid) {
    return (
      <>
        <PageHeader
          title={t('course.notFound')}
          crumbs={[{ label: t('library.title'), to: '/youth/library' }, { label: courseId }]}
        />
        <EmptyState icon={SearchX} title={t('course.notFound')} body={t('course.notFoundBody')} />
      </>
    )
  }

  const course = COURSE_BY_ID[courseId]
  const u = course.units[n - 1]
  if (!u) return null
  return (
    <UnitView
      course={course}
      unit={u}
      n={n}
      youthId={youth.id}
      progress={youth.progress[courseId]}
    />
  )
}
