import type { CourseId, Session } from '@shared/types'
import { Link } from '@tanstack/react-router'
import { Plus, Route as RouteIcon } from 'lucide-react'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { Reveal } from '@/components/motion'
import { EmptyState } from '@/components/shared/EmptyState'
import { NextAction } from '@/components/shared/NextAction'
import { PageHeader } from '@/components/shared/PageHeader'
import { Button } from '@/components/ui/button'
import { COURSE_BY_ID } from '@/data/courses'
import { OPTIONAL_COURSES, ROUTE_PATHS } from '@/domain/paths'
import { profileFor } from '@/domain/scoring'
import { useLocalized } from '@/i18n'
import { useSessions } from '@/store/actions/sessions'
import { addToPlan, generatePath, reorderPlan } from '@/store/actions/youth'
import { useMyYouth } from '@/store/hooks'
import { MilestonesPanel } from '../components/MilestonesPanel'
import { PathGenerating } from '../components/PathGenerating'
import { PlanCourseNode } from '../components/PlanCourseNode'
import { PlanSessionNode } from '../components/PlanSessionNode'
import { ROUTE_META, SESSION_AFTER } from '../config'
import { useNextAction } from '../hooks/use-next-action'

/** Y05 personalised learning path: generate, then a vertical journey with milestones. */
export function PathPage() {
  const { t } = useTranslation('learn')
  const { l } = useLocalized()
  const youth = useMyYouth()
  const sessions = useSessions()
  const next = useNextAction(youth)
  const onDone = useCallback(() => generatePath(youth.id), [youth.id])

  if (!youth.assessment || !youth.route) {
    return (
      <>
        <PageHeader title={t('path.pageTitle')} />
        <EmptyState
          icon={RouteIcon}
          title={t('path.noRouteTitle')}
          body={t('path.noRouteBody')}
          action={
            <Button asChild className="rounded-full">
              <Link to={youth.assessment ? '/youth/discovery/results' : '/youth/discovery'}>
                {youth.assessment ? t('next.routeCta') : t('dash.discoveryCta')}
              </Link>
            </Button>
          }
        />
      </>
    )
  }
  if (!youth.pathGenerated) {
    return (
      <>
        <PageHeader title={t('path.pageTitle')} />
        <PathGenerating onDone={onDone} />
      </>
    )
  }

  const route = youth.route
  const core = ROUTE_PATHS[route]
  const profile = profileFor(youth.assessment.scores)
  const meta = ROUTE_META[route]
  const plan = youth.plan
  const mySessions = sessions.filter((s) => s.cohortId && youth.cohortIds.includes(s.cohortId))
  const placed = new Set<string>()
  const sessionsAfter = (id: CourseId): Session[] =>
    mySessions.filter((s) => {
      if (SESSION_AFTER[s.id as keyof typeof SESSION_AFTER] !== id || placed.has(s.id)) return false
      placed.add(s.id)
      return true
    })
  const kindOf = (id: CourseId) =>
    (core.includes(id) ? 'core' : OPTIONAL_COURSES.includes(id) ? 'optional' : 'added') as
      | 'core'
      | 'optional'
      | 'added'

  const move = (i: number, dir: -1 | 1) => {
    const j = i + dir
    if (j < 0 || j >= plan.length) return
    const nextPlan = [...plan]
    const [item] = nextPlan.splice(i, 1)
    if (!item) return
    nextPlan.splice(j, 0, item)
    reorderPlan(youth.id, nextPlan)
    toast.success(t('path.reordered'))
  }
  const remove = (id: CourseId) => {
    reorderPlan(
      youth.id,
      plan.filter((c) => c !== id),
    )
    toast.success(t('path.removed', { title: l(COURSE_BY_ID[id].title) }))
  }
  const addable = OPTIONAL_COURSES.filter((id) => !plan.includes(id))
  const explanation = `${profile.balanced ? t('path.explainBalanced') : l(profile.explanation ?? undefined)} ${t(`path.explain.${route}`)}`

  return (
    <div className="space-y-8">
      <PageHeader
        title={t('path.pageTitle')}
        actions={
          <Button asChild variant="outline" className="rounded-full">
            <Link to="/youth/discovery/results">{t('path.changeRoute')}</Link>
          </Button>
        }
      />

      <Reveal className="grid gap-4 lg:grid-cols-[1.5fr_1fr]">
        <section
          className={`relative overflow-hidden rounded-3xl p-6 shadow-md sm:p-8 ${meta.block}`}
        >
          <span
            className="pointer-events-none absolute -end-12 -top-12 size-48 rounded-full bg-white/15"
            aria-hidden
          />
          <span
            className="pointer-events-none absolute end-8 bottom-6 size-20 rounded-full border-[10px] border-white/20"
            aria-hidden
          />
          <p className="relative inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-sm font-semibold">
            <meta.icon className="size-4" aria-hidden />
            {t(`common:routes.${route}`)}
          </p>
          <h2 className="relative mt-3 text-3xl text-current sm:text-4xl">
            {t(`path.title.${route}`)}
          </h2>
          <p className="relative mt-3 max-w-2xl text-lg opacity-95">{explanation}</p>
          {youth.secondaryRoute && (
            <p className="relative mt-3 text-sm opacity-90">
              {t('path.secondary', { route: t(`common:routes.${youth.secondaryRoute}`) })}
            </p>
          )}
        </section>
        <NextAction
          label={t('dash.nextLabel')}
          title={next.title}
          body={next.body}
          to={next.to}
          cta={next.cta}
          className="rounded-3xl"
        />
      </Reveal>

      <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr]">
        <section aria-labelledby="journey">
          <h2 id="journey" className="mb-1 text-2xl">
            {t('path.journey')}
          </h2>
          <p className="mb-5 text-sm text-ink-soft">{t('path.journeyNote')}</p>
          <ol className="relative space-y-4 before:absolute before:inset-y-6 before:start-6 before:w-1 before:rounded-full before:bg-sky-200">
            {plan.map((id, i) => (
              <li key={id} className="space-y-4">
                <PlanCourseNode
                  youth={youth}
                  courseId={id}
                  step={i + 1}
                  kind={kindOf(id)}
                  canUp={i > 0}
                  canDown={i < plan.length - 1}
                  onMove={(d) => move(i, d)}
                  onRemove={() => remove(id)}
                />
                {sessionsAfter(id).map((s) => (
                  <PlanSessionNode key={s.id} session={s} youth={youth} />
                ))}
              </li>
            ))}
          </ol>
          {youth.cohortIds.length === 0 && (
            <p className="mt-4 rounded-2xl bg-sky-100 p-4 text-sm text-navy">
              {t('dash.noCohort')}
            </p>
          )}
          {addable.length > 0 && (
            <div className="mt-6 rounded-3xl border border-dashed border-cyan/50 bg-white p-5">
              <p className="font-semibold">{t('path.addOptional')}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {addable.map((id) => (
                  <Button
                    key={id}
                    variant="secondary"
                    className="h-auto max-w-full shrink rounded-full py-2 text-start whitespace-normal"
                    onClick={() => {
                      addToPlan(youth.id, id)
                      toast.success(t('path.added', { title: l(COURSE_BY_ID[id].title) }))
                    }}
                  >
                    <Plus className="size-4" aria-hidden />
                    {id} {l(COURSE_BY_ID[id].title)}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </section>
        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <MilestonesPanel youth={youth} route={route} />
          <p className="rounded-2xl bg-sky-50 p-4 text-sm text-ink-soft">{t('path.readiness')}</p>
        </aside>
      </div>
    </div>
  )
}
