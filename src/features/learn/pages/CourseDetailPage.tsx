import { Link, useNavigate } from '@tanstack/react-router'
import {
  Award,
  BookOpenCheck,
  CircleCheck,
  ClipboardList,
  Info,
  ListPlus,
  Lock,
  Play,
  SearchX,
  Target,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { Motif } from '@/components/brand'
import { Reveal } from '@/components/motion'
import { EmptyState } from '@/components/shared/EmptyState'
import { PageHeader } from '@/components/shared/PageHeader'
import { SmartImage } from '@/components/shared/SmartImage'
import { Button } from '@/components/ui/button'
import { CATEGORY_LABELS, COURSE_BY_ID } from '@/data/courses'
import { courseStatus, QUIZ_ATTEMPTS, QUIZ_PASS } from '@/domain/completion'
import { useLocalized } from '@/i18n'
import { cn } from '@/lib/utils'
import { isCohortCourse, startCourse } from '@/store/actions/learning'
import { addToPlan } from '@/store/actions/youth'
import { useMyYouth } from '@/store/hooks'
import { CourseStatusBadge } from '../components/CourseStatusBadge'
import { TemplateDialog } from '../components/TemplateDialog'
import { UnitList } from '../components/UnitList'
import { CATEGORY_META } from '../config'
import { isCourseId, resumeTarget } from '../lib'

/** Y06 course detail: outcomes, units, resources, practical task, final check and actions. */
export function CourseDetailPage({ courseId }: { courseId: string }) {
  const { t } = useTranslation('learn')
  const { l } = useLocalized()
  const youth = useMyYouth()
  const navigate = useNavigate()

  if (!isCourseId(courseId)) {
    return (
      <>
        <PageHeader
          title={t('course.notFound')}
          crumbs={[{ label: t('library.title'), to: '/youth/library' }, { label: courseId }]}
        />
        <EmptyState
          icon={SearchX}
          title={t('course.notFound')}
          body={t('course.notFoundBody')}
          action={
            <Button asChild className="rounded-full">
              <Link to="/youth/library">{t('library.title')}</Link>
            </Button>
          }
        />
      </>
    )
  }

  const c = COURSE_BY_ID[courseId]
  const p = youth.progress[courseId]
  const status = courseStatus(p)
  const meta = CATEGORY_META[c.category]
  const inPlan = youth.plan.includes(courseId)
  const cohort = isCohortCourse(youth, courseId)
  const unitsComplete = !!p && p.units.every((u) => u === 'done')

  const go = () => {
    const where = resumeTarget(p)
    if (where === 'quiz') void navigate({ to: '/youth/learn/$courseId/quiz', params: { courseId } })
    else
      void navigate({
        to: '/youth/learn/$courseId/$unit',
        params: { courseId, unit: String(where) },
      })
  }
  const start = () => {
    startCourse(youth.id, courseId)
    toast.success(t('course.started', { title: l(c.title) }))
    go()
  }
  const add = () => {
    addToPlan(youth.id, courseId)
    toast.success(t('path.added', { title: l(c.title) }))
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title={l(c.title)}
        crumbs={[{ label: t('library.title'), to: '/youth/library' }, { label: l(c.title) }]}
        eyebrow={<CourseStatusBadge progress={p} />}
      />

      <Reveal className="card overflow-hidden rounded-3xl lg:grid lg:grid-cols-[1fr_1.2fr]">
        <div className="relative min-h-52">
          <SmartImage src={c.image} alt="" className="absolute inset-0 size-full" />
          <span
            className={cn(
              'absolute start-4 top-4 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-bold shadow-sm',
              meta.chip,
            )}
          >
            <meta.icon className="size-4" aria-hidden />
            {l(CATEGORY_LABELS[c.category])}
          </span>
        </div>
        <div className="p-6 sm:p-8">
          <dl className="grid grid-cols-2 gap-x-6 gap-y-4 text-sm">
            {[
              [t('course.duration'), t('common:minutes', { count: c.minutes })],
              [t('library.f.level'), t(`library.level.${c.level}`)],
              [t('course.delivery'), t(`library.delivery.${c.delivery}`)],
              [
                t('course.routes'),
                c.routes === 'all'
                  ? t('library.allRoutes')
                  : c.routes.map((r) => t(`common:routesShort.${r}`)).join(', '),
              ],
            ].map(([k, v]) => (
              <div key={k} className="min-w-0 border-s-2 border-cyan ps-3">
                <dt className="text-xs font-semibold text-ink-soft">{k}</dt>
                <dd className="mt-0.5 font-bold text-navy">{v}</dd>
              </div>
            ))}
          </dl>
          {c.prerequisites.length > 0 && (
            <p className="mt-4 text-sm text-ink-soft">
              {t('course.prereqs', {
                list: c.prerequisites.map((id) => `${id} ${l(COURSE_BY_ID[id].title)}`).join(', '),
              })}
            </p>
          )}
          <div className="mt-6 flex flex-wrap gap-3">
            {status === 'todo' ? (
              <Button className="rounded-full" onClick={start}>
                <Play className="size-4" aria-hidden />
                {t('course.start')}
              </Button>
            ) : (
              <Button className="rounded-full" onClick={go}>
                <Play className="size-4" aria-hidden />
                {status === 'completed' ? t('course.reviewLessons') : t('course.continue')}
              </Button>
            )}
            <Button variant="outline" className="rounded-full" onClick={add} disabled={inPlan}>
              {inPlan ? (
                <CircleCheck className="size-4" aria-hidden />
              ) : (
                <ListPlus className="size-4" aria-hidden />
              )}
              {inPlan ? t('course.inPlan') : t('course.addToPlan')}
            </Button>
            {p?.completedAt && (
              <Button asChild variant="secondary" className="rounded-full">
                <Link to="/youth/certificate/$courseId" params={{ courseId }}>
                  <Award className="size-4" aria-hidden />
                  {t('course.certificate')}
                </Link>
              </Button>
            )}
          </div>
          <p className="mt-5 flex items-start gap-2 rounded-2xl bg-sky-100 px-4 py-3 text-sm text-navy">
            <Info className="mt-0.5 size-4 shrink-0 text-blue" aria-hidden />
            {cohort ? t('course.accessCohort') : t('course.accessOpen')}
          </p>
        </div>
      </Reveal>

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div className="space-y-6">
          <section className="card p-6" aria-labelledby="outcomes">
            <h2 id="outcomes" className="flex items-center gap-2 text-xl">
              <Target className="size-5 text-blue" aria-hidden />
              {t('course.outcomes')}
            </h2>
            <ul className="mt-4 space-y-2">
              {c.outcomes.map((o) => (
                <li key={o.en} className="flex items-start gap-2 text-sm sm:text-base">
                  <CircleCheck className="mt-1 size-4 shrink-0 text-success" aria-hidden />
                  {l(o)}
                </li>
              ))}
            </ul>
          </section>
          <section aria-labelledby="units">
            <h2 id="units" className="mb-3 text-xl">
              {t('course.units')}
            </h2>
            <UnitList course={c} progress={p} />
          </section>
        </div>

        <aside className="space-y-4">
          <section
            className="relative overflow-hidden rounded-3xl bg-yellow p-5 text-ink shadow-md"
            aria-labelledby="practical"
          >
            <Motif variant="corner" className="text-white/50" />
            <h2 id="practical" className="relative flex items-center gap-2 text-lg">
              <ClipboardList className="size-4" aria-hidden />
              {t('course.practical')}
            </h2>
            <p className="relative mt-2 text-sm">{l(c.practicalTask)}</p>
            <p className="relative mt-2 text-sm font-semibold">
              {t('course.output', { output: l(c.output) })}
            </p>
            <p className="relative mt-2 text-xs">
              {cohort ? t('course.practicalReviewed') : t('course.practicalSelf')}
            </p>
          </section>
          <section
            className="on-dark relative overflow-hidden rounded-3xl bg-navy p-5 text-white shadow-md"
            aria-labelledby="final"
          >
            <Motif variant="corner" className="text-cyan/25" />
            <h2 id="final" className="relative flex items-center gap-2 text-lg text-white">
              <BookOpenCheck className="size-5 text-yellow" aria-hidden />
              {t('course.finalCheck')}
            </h2>
            <p className="relative mt-2 text-sm text-white/90">
              {t('course.finalCheckBody', {
                n: c.quiz.length,
                pass: QUIZ_PASS,
                attempts: QUIZ_ATTEMPTS,
              })}
            </p>
            {unitsComplete ? (
              <Button
                asChild
                className="relative mt-4 rounded-full bg-white text-navy shadow-md hover:bg-sky-100"
              >
                <Link to="/youth/learn/$courseId/quiz" params={{ courseId }}>
                  {t('course.openQuiz')}
                </Link>
              </Button>
            ) : (
              <p className="relative mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-white/85">
                <Lock className="size-4" aria-hidden />
                {t('course.quizLocked')}
              </p>
            )}
          </section>
          <section className="card p-5" aria-labelledby="resources">
            <h2 id="resources" className="text-lg">
              {t('course.resources')}
            </h2>
            <div className="mt-3 space-y-2">
              {c.resources.length ? (
                c.resources.map((id) => <TemplateDialog key={id} id={id} />)
              ) : (
                <p className="text-sm text-ink-soft">{t('course.noResources')}</p>
              )}
            </div>
          </section>
          {c.note && (
            <p className="rounded-2xl border border-notice/20 bg-notice-soft px-4 py-3 text-sm text-notice shadow-sm">
              {l(c.note)}
            </p>
          )}
        </aside>
      </div>
    </div>
  )
}
