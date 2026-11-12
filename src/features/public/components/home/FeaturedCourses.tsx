import { Link } from '@tanstack/react-router'
import { ArrowRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Reveal, Stagger, StaggerItem, TiltCard } from '@/components/motion'
import { Button } from '@/components/ui/button'
import { COURSE_BY_ID } from '@/data/courses'
import { FEATURED_COURSES } from '../../config'
import { CourseCard } from '../CourseCard'

export function FeaturedCourses() {
  const { t } = useTranslation('public')
  return (
    <section aria-labelledby="featured-title" className="bg-grad-sky py-20 sm:py-28">
      <div className="container-page">
        <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <p className="mb-3 text-sm font-bold tracking-wider text-blue uppercase">
              {t('home.featured.eyebrow')}
            </p>
            <h2 id="featured-title" className="text-4xl sm:text-5xl">
              {t('home.featured.title')}
            </h2>
            <p className="mt-3 text-lg text-ink-soft">{t('home.featured.body')}</p>
          </div>
          <Button asChild variant="outline" className="rounded-full">
            <Link to="/explore">
              {t('home.featured.cta')}
              <ArrowRight className="size-4 rtl-mirror" aria-hidden />
            </Link>
          </Button>
        </Reveal>
        <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURED_COURSES.map((id) => (
            <StaggerItem key={id}>
              <TiltCard className="h-full rounded-2xl">
                <CourseCard course={COURSE_BY_ID[id]} />
              </TiltCard>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
