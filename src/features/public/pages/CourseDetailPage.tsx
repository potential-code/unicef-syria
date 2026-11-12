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
      <div className="container-page pt-32 pb-20">
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
      <section className="on-dark relative overflow-hidden bg-grad-unicef pt-28 pb-14 text-white sm:pt-32">
        <span
          className="pointer-events-none absolute -end-24 -top-24 size-96 rounded-full bg-cyan/40 blur-3xl"
          aria-hidden
        />
        <div className="container-page relative grid items-center gap-10 lg:grid-cols-[1.3fr_1fr]">
          <Reveal>
            <Breadcrumbs
              items={[
                { label: t('nav.home'), to: '/' },
                { label: t('nav.explore'), to: '/explore' },
                { label: course.id },
              ]}
            />
            <span className="rounded-full bg-yellow px-3 py-1 text-xs font-bold text-ink">
              {l(CATEGORY_LABELS[course.category])}
            </span>
            <h1 className="mt-4 text-4xl text-white sm:text-5xl">{l(course.title)}</h1>
            <p className="mt-3 text-white/85">
              {course.routes === 'all'
                ? t('course.allRoutes')
                : course.routes.map((r) => t(`common:routes.${r}`)).join(' · ')}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button
                size="lg"
                onClick={() => act('enrol')}
                className="rounded-full bg-yellow text-ink hover:bg-white"
              >
                <Sparkles className="size-5" aria-hidden />
                {t('course.enrol')}
              </Button>
              <Button
                size="lg"
                variant="ghost"
                onClick={() => act('save')}
                disabled={inPlan}
                className="rounded-full border-2 border-white/60 text-white hover:bg-white/15 hover:text-white"
              >
                <Bookmark className="size-5" aria-hidden />
                {inPlan ? t('course.inPlan') : t('course.save')}
              </Button>
            </div>
          </Reveal>
          <Reveal className="overflow-hidden rounded-[2rem] border-4 border-white/20 shadow-pop">
            <SmartImage src={course.image} alt="" className="aspect-[4/3] w-full" />
          </Reveal>
        </div>
      </section>

      <div className="container-page grid gap-10 py-14 lg:grid-cols-[1.5fr_1fr]">
        <div className="space-y-10">
          <Reveal as="section">
            <h2 className="mb-4 text-2xl">{t('course.outcomes')}</h2>
            <ul className="space-y-3">
              {course.outcomes.map((o) => (
                <li key={o.en} className="flex gap-3">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-success" aria-hidden />
                  <span>{l(o)}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal as="section">
            <h2 className="mb-4 text-2xl">{t('course.units')}</h2>
            <CourseUnits course={course} />
          </Reveal>
          <Reveal as="section" className="rounded-2xl bg-yellow/20 p-6">
            <h2 className="mb-2 flex items-center gap-2 text-2xl">
              <Hammer className="size-6 text-blue" aria-hidden />
              {t('course.practical')}
            </h2>
            <p>{l(course.practicalTask)}</p>
            <p className="mt-2 text-sm text-ink-soft">
              <strong>{t('course.output')}</strong> {l(course.output)}
            </p>
            {isPlaceholder(course.practicalTask) && (
              <p className="mt-1 text-xs text-ink-soft italic">{t('common:arabicPlaceholder')}</p>
            )}
          </Reveal>
        </div>

        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <dl className="grid grid-cols-2 gap-3">
            {facts.map((f) => (
              <div key={f.label} className="rounded-2xl border bg-white p-4 shadow-sm">
                <f.icon className="mb-2 size-5 text-blue" aria-hidden />
                <dt className="text-xs font-bold tracking-wide text-ink-soft uppercase">
                  {f.label}
                </dt>
                <dd className="font-semibold">{f.value}</dd>
              </div>
            ))}
          </dl>
          <div className="rounded-2xl border bg-white p-5 shadow-sm">
            <h2 className="mb-2 flex items-center gap-2 text-lg">
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
                      className="font-semibold text-blue hover:underline"
                    >
                      {p} · {l(COURSE_BY_ID[p].title)}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="rounded-2xl border bg-white p-5 shadow-sm">
            <h2 className="mb-2 flex items-center gap-2 text-lg">
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
