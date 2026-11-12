import type { Application, CourseId } from '@shared/types'
import { Link } from '@tanstack/react-router'
import { ArrowRight, BookOpen, Bot, Briefcase, HandHeart, HeartHandshake } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Motif } from '@/components/brand'
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
    <section aria-labelledby="ns-title" className="card overflow-hidden rounded-3xl">
      <div className="on-dark relative overflow-hidden bg-[linear-gradient(135deg,var(--unicef-navy),var(--unicef-blue))] p-5 text-white sm:p-6 [&>*:not(:first-child)]:relative">
        <Motif variant="banner" className="text-white/[0.12]" />
        <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-yellow">
          <HeartHandshake className="size-4" aria-hidden />
          {t('apps.notSelected.eyebrow')}
        </p>
        <h2 id="ns-title" className="mt-1 text-xl text-white sm:text-2xl">
          {t('apps.notSelected.title')}
        </h2>
        <p className="mt-1 max-w-2xl text-white/85">{t('apps.notSelected.reassurance')}</p>
      </div>
      <div className="grid gap-4 p-5 sm:p-6 md:grid-cols-2">
        <div className="rounded-2xl border-s-4 border-s-blue bg-sky-50 p-4">
          <h3 className="text-base">{t('apps.notSelected.feedbackTitle')}</h3>
          <p className="mt-1 text-sm">{app.feedback || t('apps.notSelected.defaultFeedback')}</p>
        </div>
        <div className="rounded-2xl border-s-4 border-s-yellow bg-notice-soft p-4">
          <h3 className="flex items-center gap-2 text-base">
            <BookOpen className="size-4 shrink-0 text-orange" aria-hidden />
            {t('apps.notSelected.learnTitle')}
          </h3>
          <p className="mt-1 text-sm font-semibold">
            {course.id} {l(course.title)}
          </p>
          <p className="text-sm text-ink-soft">{t('apps.notSelected.learnBody')}</p>
          <a
            href={courseHref(courseId)}
            className="mt-2 inline-flex min-h-9 items-center gap-1 font-semibold text-blue hover:underline"
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
