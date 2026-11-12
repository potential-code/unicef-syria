import { Link } from '@tanstack/react-router'
import { ArrowRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { LaurelWreath } from '@/components/brand'
import { Stagger, StaggerItem, TiltCard } from '@/components/motion'
import { Button } from '@/components/ui/button'
import { COURSE_BY_ID } from '@/data/courses'
import { FEATURED_COURSES } from '../../config'
import { CourseCard } from '../CourseCard'
import { SectionIntro } from '../SectionIntro'
import { Drift } from './Drift'

export function FeaturedCourses() {
  const { t } = useTranslation('public')
  return (
    <section
      aria-labelledby="featured-title"
      className="relative overflow-hidden bg-grad-sky py-20 sm:py-24"
    >
      <Drift
        y={20}
        rotate={14}
        className="absolute end-[8%] top-8 hidden text-blue/[0.07] lg:block"
      >
        <LaurelWreath className="h-40" />
      </Drift>
      <div className="container-page relative">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <SectionIntro
            id="featured-title"
            eyebrow={t('home.featured.eyebrow')}
            title={t('home.featured.title')}
            body={t('home.featured.body')}
          />
          <Button asChild variant="outline" className="shrink-0 rounded-full">
            <Link to="/explore">
              {t('home.featured.cta')}
              <ArrowRight className="size-4 rtl-mirror" aria-hidden />
            </Link>
          </Button>
        </div>
        <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
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
