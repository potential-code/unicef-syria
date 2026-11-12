import { Link, useNavigate } from '@tanstack/react-router'
import { ArrowLeft, ArrowRight, BookOpenCheck, SearchX } from 'lucide-react'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { EmptyState } from '@/components/shared/EmptyState'
import { PageHeader } from '@/components/shared/PageHeader'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { COURSE_BY_ID } from '@/data/courses'
import { unitsDone } from '@/domain/completion'
import { useLocalized } from '@/i18n'
import { setUnitStatus } from '@/store/actions/learning'
import { useMyYouth } from '@/store/hooks'
import { LessonBody } from '../components/LessonBody'
import { TemplateDialog } from '../components/TemplateDialog'
import { UnitList } from '../components/UnitList'
import { UnitSummary } from '../components/UnitSummary'
import { isCourseId } from '../lib'

/** Y07 learning player: four-unit sidebar, lesson content, check question and Next. */
export function PlayerPage({ courseId, unit }: { courseId: string; unit: string }) {
  const { t } = useTranslation('learn')
  const { l } = useLocalized()
  const youth = useMyYouth()
  const navigate = useNavigate()
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
  const p = youth.progress[courseId]
  const full = !!u.body
  const last = n === course.units.length

  const next = () => {
    setUnitStatus(youth.id, courseId, n - 1, 'done')
    toast.success(t('player.unitDone', { n }))
    if (last) void navigate({ to: '/youth/learn/$courseId/quiz', params: { courseId } })
    else
      void navigate({
        to: '/youth/learn/$courseId/$unit',
        params: { courseId, unit: String(n + 1) },
      })
  }

  return (
    <div>
      <PageHeader
        title={l(u.title)}
        eyebrow={
          <p className="text-sm font-bold text-blue">
            {t('player.unitOf', { n, total: course.units.length, course: courseId })}
          </p>
        }
        crumbs={[
          { label: t('library.title'), to: '/youth/library' },
          { label: l(course.title), to: `/youth/library/${courseId}` },
          { label: t('player.unitN', { n }) },
        ]}
      />
      <div className="grid gap-6 lg:grid-cols-[18rem_1fr]">
        <aside
          className="space-y-4 lg:sticky lg:top-24 lg:self-start"
          aria-label={t('course.units')}
        >
          <div className="rounded-3xl border bg-white p-4 shadow-sm">
            <p className="font-bold">{l(course.title)}</p>
            <Progress
              value={(unitsDone(p) / 4) * 100}
              className="mt-2 h-2 bg-sky-100"
              aria-label={t('library.progress')}
            />
            <p className="mt-1 text-xs text-ink-soft">
              {t('dash.unitsDone', { done: unitsDone(p), total: 4 })}
            </p>
            <div className="mt-4">
              <UnitList course={course} progress={p} compact current={n} />
            </div>
            <Link
              to="/youth/learn/$courseId/quiz"
              params={{ courseId }}
              className="mt-2 flex min-h-12 items-center gap-3 rounded-2xl bg-navy p-3 font-semibold text-white"
            >
              <BookOpenCheck className="size-5 text-yellow" aria-hidden />
              {t('course.finalCheck')}
            </Link>
          </div>
          {course.resources[0] && (
            <div>
              <p className="mb-2 text-sm font-bold">{t('player.resource')}</p>
              <TemplateDialog id={course.resources[0]} compact />
            </div>
          )}
        </aside>

        <article className="min-w-0">
          {full ? (
            <LessonBody course={course} unit={u} index={n - 1} />
          ) : (
            <UnitSummary course={course} unit={u} index={n - 1} />
          )}
          <nav
            className="mt-8 flex flex-wrap items-center gap-3 border-t pt-6"
            aria-label={t('player.unitNav')}
          >
            {n > 1 && (
              <Button asChild variant="ghost" className="rounded-full">
                <Link to="/youth/learn/$courseId/$unit" params={{ courseId, unit: String(n - 1) }}>
                  <ArrowLeft className="size-4 rtl-mirror" aria-hidden />
                  {t('player.prev')}
                </Link>
              </Button>
            )}
            <Button size="lg" className="ms-auto rounded-full" onClick={next}>
              {last ? t('player.toQuiz') : t('player.next')}
              <ArrowRight className="size-5 rtl-mirror" aria-hidden />
            </Button>
          </nav>
        </article>
      </div>
    </div>
  )
}
