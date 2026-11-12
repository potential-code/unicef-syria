import type { Application, CourseId } from '@shared/types'
import { Link } from '@tanstack/react-router'
import { ArrowRight, BookOpen, Bot, Briefcase, HandHeart, HeartHandshake } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { COURSE_BY_ID } from '@/data/courses'
import { useLocalized } from '@/i18n'
import { courseHref } from '../../lib/links'

/**
 * Not selected branch (brief §15, §23): constructive feedback, one relevant learning activity
 * and continued access to opportunities, mentors and coaches.
 */
export function NotSelectedSupport({ app, courseId }: { app: Application; courseId: CourseId }) {
  const { t } = useTranslation('career')
  const { l } = useLocalized()
  const course = COURSE_BY_ID[courseId]
  return (
    <section
      aria-labelledby="ns-title"
      className="overflow-hidden rounded-3xl border-2 border-orange/40 bg-white shadow-md"
    >
      <div className="relative overflow-hidden bg-grad-sunrise p-5 sm:p-6">
        <div
          className="pointer-events-none absolute -end-10 -top-10 size-36 rounded-full bg-white/25"
          aria-hidden
        />
        <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-ink/80">
          <HeartHandshake className="size-4" aria-hidden />
          {t('apps.notSelected.eyebrow')}
        </p>
        <h2 id="ns-title" className="mt-1 text-xl text-ink sm:text-2xl">
          {t('apps.notSelected.title')}
        </h2>
        <p className="mt-1 max-w-2xl text-ink/85">{t('apps.notSelected.reassurance')}</p>
      </div>
      <div className="grid gap-4 p-5 sm:p-6 md:grid-cols-2">
        <div className="rounded-2xl bg-sky-50 p-4">
          <h3 className="text-base">{t('apps.notSelected.feedbackTitle')}</h3>
          <p className="mt-1 text-sm">{app.feedback || t('apps.notSelected.defaultFeedback')}</p>
        </div>
        <div className="rounded-2xl bg-yellow/15 p-4">
          <h3 className="flex items-center gap-2 text-base">
            <BookOpen className="size-4" aria-hidden />
            {t('apps.notSelected.learnTitle')}
          </h3>
          <p className="mt-1 text-sm font-semibold">
            {course.id} {l(course.title)}
          </p>
          <p className="text-sm text-ink-soft">{t('apps.notSelected.learnBody')}</p>
          <a
            href={courseHref(courseId)}
            className="mt-2 inline-flex min-h-11 items-center gap-1 font-semibold text-blue hover:underline"
          >
            {t('apps.notSelected.openCourse')}
            <ArrowRight className="size-4 rtl-mirror" aria-hidden />
          </a>
        </div>
      </div>
      <div className="flex flex-col gap-2 border-t p-5 sm:flex-row sm:flex-wrap sm:p-6">
        <Button asChild className="rounded-full">
          <Link to="/youth/opportunities">
            <Briefcase className="size-4" aria-hidden />
            {t('apps.notSelected.keepGoing')}
          </Link>
        </Button>
        <Button asChild variant="outline" className="rounded-full">
          <Link to="/youth/mentors">
            <HandHeart className="size-4" aria-hidden />
            {t('apps.notSelected.mentor')}
          </Link>
        </Button>
        <Button asChild variant="secondary" className="rounded-full">
          <Link to="/youth/coaches">
            <Bot className="size-4" aria-hidden />
            {t('apps.notSelected.coach')}
          </Link>
        </Button>
      </div>
    </section>
  )
}
