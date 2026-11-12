import type { CourseId } from '@shared/types'
import { Link } from '@tanstack/react-router'
import {
  Bookmark,
  CheckCircle2,
  Clock,
  Hammer,
  Languages,
  Layers,
  MapPin,
  Monitor,
  SearchX,
  Signal,
  Sparkles,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { Motif } from '@/components/brand'
import { Reveal } from '@/components/motion'
import { EmptyState } from '@/components/shared/EmptyState'
import { SmartImage } from '@/components/shared/SmartImage'
import { Button } from '@/components/ui/button'
import { CATEGORY_LABELS, COURSE_BY_ID } from '@/data/courses'
import { CENTRES } from '@/data/orgs'
import { usePageTitle } from '@/hooks/use-page-title'
import { useLocalized } from '@/i18n'
import { startCourse } from '@/store/actions/learning'
import { addToPlan, useYouth } from '@/store/actions/youth'
import { Breadcrumbs } from '../components/Breadcrumbs'
import { CourseUnits } from '../components/CourseUnits'
import { RegisterPrompt } from '../components/RegisterPrompt'
import { centresOffering } from '../config'
import { useGate } from '../hooks/use-gate'

/** Public course detail: outcomes, units, duration, language, prerequisites, practical task. */
export function CourseDetailPage({ courseId }: { courseId: string }) {
  const { t } = useTranslation('public')
  const { l, isPlaceholder } = useLocalized()
  const course = COURSE_BY_ID[courseId as CourseId]
  usePageTitle(course ? l(course.title) : t('course.missing'))
  const gate = useGate()
  const youth = useYouth(gate.youthId)

  if (!course) {
    return (
      <div className="container-page pt-12 pb-20">
        <EmptyState
          icon={SearchX}
          title={t('course.missing')}
          body={t('course.missingBody')}
          action={
            <Button asChild className="rounded-full">
              <Link to="/explore">{t('nav.explore')}</Link>
            </Button>
          }
        />
      </div>
    )
  }

  const inPlan = !!youth?.plan.includes(course.id)
  const centres = CENTRES.filter((c) => centresOffering(course.id).includes(c.id))
  const act = (kind: 'enrol' | 'save') => {
    if (!gate.youthId) return gate.ask({ next: `/explore/${course.id}`, item: l(course.title) })
    addToPlan(gate.youthId, course.id)
    if (kind === 'enrol') startCourse(gate.youthId, course.id)
    toast.success(t(kind === 'enrol' ? 'course.enrolled' : 'course.saved'))
  }
  const facts = [
    {
      icon: Clock,
      label: t('course.duration'),
      value: t('common:minutes', { count: course.minutes }),
    },
    { icon: Signal, label: t('course.level'), value: t(`levels.${course.level}`) },
    { icon: Languages, label: t('course.language'), value: t('course.languages') },
    {
      icon: Monitor,
      label: t('course.format'),
      value: centres.length ? t('explore.delivery.blended') : t('explore.delivery.online'),
    },
  ]

  return (
    <>
      <div className="container-page pt-6 sm:pt-8">
        <section className="on-dark relative overflow-hidden rounded-3xl bg-grad-unicef p-6 text-white shadow-lg sm:p-10 lg:p-12">
          <Motif variant="banner" className="text-white/[0.12]" />
          <div className="relative grid items-center gap-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:gap-12">
            <Reveal className="min-w-0">
              <Breadcrumbs
                items={[
                  { label: t('nav.home'), to: '/' },
                  { label: t('nav.explore'), to: '/explore' },
                  { label: course.id },
                ]}
              />
              <span className="rounded-full bg-yellow px-2.5 py-0.5 text-[11px] font-bold tracking-wider text-ink uppercase">
                {l(CATEGORY_LABELS[course.category])}
              </span>
              <h1 className="mt-3 text-3xl text-white sm:text-4xl lg:text-[2.75rem]">
                {l(course.title)}
              </h1>
              <p className="mt-3 text-white/85">
                {course.routes === 'all'
                  ? t('course.allRoutes')
                  : course.routes.map((r) => t(`common:routes.${r}`)).join(' · ')}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button
                  onClick={() => act('enrol')}
                  className="rounded-full bg-yellow px-5 text-ink hover:bg-white"
                >
                  <Sparkles className="size-4" aria-hidden />
                  {t('course.enrol')}
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => act('save')}
                  disabled={inPlan}
                  className="rounded-full border border-white/60 px-5 text-white hover:bg-white/15 hover:text-white"
                >
                  <Bookmark className="size-4" aria-hidden />
                  {inPlan ? t('course.inPlan') : t('course.save')}
                </Button>
              </div>
            </Reveal>
            <Reveal className="overflow-hidden rounded-2xl shadow-pop ring-1 ring-white/25">
              <SmartImage src={course.image} alt="" className="aspect-[4/3] w-full" />
            </Reveal>
          </div>
        </section>
      </div>

      <div className="container-page grid gap-10 py-12 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
        <div className="space-y-10">
          <Reveal as="section">
            <h2 className="mb-4 text-xl sm:text-2xl">{t('course.outcomes')}</h2>
            <ul className="card space-y-3 p-5">
              {course.outcomes.map((o) => (
                <li key={o.en} className="flex gap-3">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-success" aria-hidden />
                  <span>{l(o)}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal as="section">
            <h2 className="mb-4 text-xl sm:text-2xl">{t('course.units')}</h2>
            <CourseUnits course={course} />
          </Reveal>
          <Reveal as="section" className="card relative overflow-hidden p-6">
            <span className="absolute inset-x-0 top-0 h-1.5 bg-yellow" aria-hidden />
            <Motif variant="corner" className="text-blue/[0.07]" />
            <h2 className="relative mb-2 flex items-center gap-2 text-xl">
              <Hammer className="size-5 shrink-0 text-blue" aria-hidden />
              {t('course.practical')}
            </h2>
            <p className="relative">{l(course.practicalTask)}</p>
            <p className="relative mt-2 text-sm text-ink-soft">
              <strong>{t('course.output')}</strong> {l(course.output)}
            </p>
            {isPlaceholder(course.practicalTask) && (
              <p className="mt-1 text-xs text-ink-soft italic">{t('common:arabicPlaceholder')}</p>
            )}
          </Reveal>
        </div>

        <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
          <dl className="card divide-y divide-border/60 px-5 py-1">
            {facts.map((f) => (
              <div key={f.label} className="flex items-center gap-3 py-3">
                <dt className="flex min-w-0 flex-1 items-center gap-2 text-sm text-ink-soft">
                  <f.icon className="size-4 shrink-0 text-blue" aria-hidden />
                  {f.label}
                </dt>
                <dd className="text-end text-sm font-semibold">{f.value}</dd>
              </div>
            ))}
          </dl>
          <div className="card p-5">
            <h2 className="mb-2 flex items-center gap-2 text-base">
              <Layers className="size-5 text-blue" aria-hidden />
              {t('course.prerequisites')}
            </h2>
            {course.prerequisites.length === 0 ? (
              <p className="text-ink-soft">{t('course.noPrereq')}</p>
            ) : (
              <ul className="space-y-1">
                {course.prerequisites.map((p) => (
                  <li key={p}>
                    <Link
                      to="/explore/$courseId"
                      params={{ courseId: p }}
                      className="text-sm font-semibold text-blue hover:underline"
                    >
                      {p} · {l(COURSE_BY_ID[p].title)}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="card p-5">
            <h2 className="mb-2 flex items-center gap-2 text-base">
              <MapPin className="size-5 text-blue" aria-hidden />
              {t('course.where')}
            </h2>
            <p className="text-sm text-ink-soft">{t('course.online')}</p>
            {centres.map((c) => (
              <p key={c.id} className="mt-2 text-sm font-semibold">
                {t('course.blendedAt', { centre: l(c.name) })}
              </p>
            ))}
          </div>
          {course.note && (
            <p className="rounded-2xl bg-notice-soft p-4 text-sm text-notice">{l(course.note)}</p>
          )}
        </aside>
      </div>
      <RegisterPrompt prompt={gate.prompt} onClose={gate.close} />
    </>
  )
}
