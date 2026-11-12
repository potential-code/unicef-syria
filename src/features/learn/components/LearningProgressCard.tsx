import type { Youth } from '@shared/types'
import { Link } from '@tanstack/react-router'
import { ArrowRight, GraduationCap } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { EmptyState } from '@/components/shared/EmptyState'
import { Progress } from '@/components/ui/progress'
import { COURSE_BY_ID } from '@/data/courses'
import { courseStatus, unitsDone } from '@/domain/completion'
import { useLocalized } from '@/i18n'
import { resumeTarget } from '../lib'

/** Learning progress on the plan (a measure separate from points and career outcomes). */
export function LearningProgressCard({ youth }: { youth: Youth }) {
  const { t } = useTranslation('learn')
  const { l } = useLocalized()
  const plan = youth.plan
  const completed = plan.filter((id) => courseStatus(youth.progress[id]) === 'completed').length
  const pct = plan.length ? Math.round((completed / plan.length) * 100) : 0
  const active = plan.filter((id) => courseStatus(youth.progress[id]) === 'inProgress')

  return (
    <section className="card p-5 sm:p-6" aria-labelledby="dash-learning">
      <div className="flex items-center justify-between gap-3">
        <h2 id="dash-learning" className="flex min-w-0 flex-1 items-center gap-2 text-lg">
          <GraduationCap className="size-5 shrink-0 text-blue" aria-hidden />
          {t('dash.learning')}
        </h2>
        <Link to="/youth/path" className="shrink-0 text-sm font-semibold text-blue hover:underline">
          {t('dash.viewPath')}
        </Link>
      </div>
      {plan.length === 0 ? (
        <EmptyState
          className="mt-4"
          icon={GraduationCap}
          title={t('dash.noPlanTitle')}
          body={t('dash.noPlanBody')}
        />
      ) : (
        <>
          <div className="mt-4 flex items-baseline justify-between gap-3 text-sm">
            <p className="text-ink-soft">
              {t('dash.coursesDone', { done: completed, total: plan.length })}
            </p>
            <p className="font-extrabold text-navy tabular-nums">{pct}%</p>
          </div>
          <Progress value={pct} className="mt-2 h-2.5 bg-sky-100" aria-label={t('dash.learning')} />
          <ul className="mt-5 space-y-2">
            {active.map((id) => {
              const where = resumeTarget(youth.progress[id])
              return (
                <li key={id}>
                  <Link
                    to={
                      where === 'quiz'
                        ? '/youth/learn/$courseId/quiz'
                        : '/youth/learn/$courseId/$unit'
                    }
                    params={
                      where === 'quiz' ? { courseId: id } : { courseId: id, unit: String(where) }
                    }
                    className="card-hover flex min-h-12 items-center gap-3 rounded-xl border border-border/70 bg-white p-3 shadow-sm"
                  >
                    <span className="min-w-0 flex-1">
                      <span className="block text-xs font-bold tracking-wide text-blue">{id}</span>
                      <span className="block truncate text-sm font-semibold">
                        {l(COURSE_BY_ID[id].title)}
                      </span>
                      <span className="block text-xs text-ink-soft">
                        {t('dash.unitsDone', { done: unitsDone(youth.progress[id]), total: 4 })}
                      </span>
                    </span>
                    <ArrowRight className="size-4 text-blue rtl-mirror" aria-hidden />
                  </Link>
                </li>
              )
            })}
          </ul>
        </>
      )}
    </section>
  )
}
