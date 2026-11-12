import type { YouthId } from '@shared/types'
import { Link } from '@tanstack/react-router'
import { ArrowRight, Compass } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Reveal } from '@/components/motion'
import { AccessDenied } from '@/components/shared/AccessDenied'
import { PageHeader } from '@/components/shared/PageHeader'
import { StatusBadge } from '@/components/shared/StatusBadge'
import { Button } from '@/components/ui/button'
import { COURSE_BY_ID } from '@/data/courses'
import { COHORT_COURSES } from '@/data/orgs'
import { canSeeYouth } from '@/domain/access'
import { useLocalized } from '@/i18n'
import { useYouth } from '@/store/actions/youth'
import { LearnerName } from '../components/LearnerName'
import { MissingList } from '../components/MissingList'
import { TrainingRecord } from '../components/TrainingRecord'
import { useLearnerRecord } from '../hooks/useLearnerRecord'
import { useTrainerScope } from '../hooks/useTrainerScope'

/** Learner detail: chronological training record and next support action. Out of scope → access denied. */
export function TrainerLearnerPage({ youthId }: { youthId: string }) {
  const { t } = useTranslation('trainer')
  const { l } = useLocalized()
  const { me, sessions, stats, cohortIds } = useTrainerScope()
  const youth = useYouth(youthId as YouthId)
  const { items, next } = useLearnerRecord(youth, sessions)
  const crumbs = [
    { label: t('cohorts.title'), to: '/trainer/cohorts' },
    { label: youth && canSeeYouth(me, youth) ? youth.profile.name : youthId },
  ]

  if (!youth || !canSeeYouth(me, youth)) {
    return (
      <div className="space-y-6">
        <PageHeader title={t('learner.deniedTitle')} crumbs={crumbs} />
        <AccessDenied />
      </div>
    )
  }
  const s = stats.find((x) => x.youth.id === youth.id)
  const cohort = youth.cohortIds.find((k) => cohortIds.includes(k))
  const courses = cohort ? COHORT_COURSES[cohort] : []
  const p = youth.profile

  return (
    <div className="space-y-6">
      <PageHeader title={p.name} crumbs={crumbs} description={t('learner.subtitle')} />
      <div className="grid gap-6 lg:grid-cols-[1fr_22rem] [&>*]:min-w-0">
        <div className="space-y-6">
          <section className="rounded-2xl border bg-card p-5 shadow-sm">
            <LearnerName
              youth={youth}
              sub={`${youth.id} · ${p.age} · ${p.governorate}`}
              link={false}
            />
            <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-3">
              <div>
                <dt className="text-xs text-ink-soft">{t('learner.cohort')}</dt>
                <dd className="font-semibold">{cohort ?? t('learner.notAssigned')}</dd>
              </div>
              <div>
                <dt className="text-xs text-ink-soft">{t('roster.attendance')}</dt>
                <dd className="font-semibold tabular-nums">
                  {s?.attendanceRate == null ? t('roster.noMarks') : `${s.attendanceRate}%`}
                  {s ? ` · ${t('roster.marks', { p: s.present, a: s.absent, e: s.excused })}` : ''}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-ink-soft">{t('applications.interests')}</dt>
                <dd className="font-semibold">{p.interests.join(', ') || t('ui.none')}</dd>
              </div>
            </dl>
            {youth.supportFlag && (
              <StatusBadge tone="notice" className="mt-4">
                {youth.supportFlag}
              </StatusBadge>
            )}
          </section>

          {courses.length > 0 && (
            <section className="grid gap-4 sm:grid-cols-2">
              {courses.map((c) => (
                <div key={c} className="rounded-2xl border bg-card p-5 shadow-sm">
                  <p className="text-xs font-semibold text-blue">{c}</p>
                  <p className="font-bold">{l(COURSE_BY_ID[c].title)}</p>
                  <div className="mt-3">
                    <MissingList progress={youth.progress[c]} />
                  </div>
                </div>
              ))}
            </section>
          )}

          <section className="rounded-2xl border bg-card p-5 shadow-sm">
            <h2 className="mb-4 text-lg">{t('learner.record')}</h2>
            <TrainingRecord items={items} />
          </section>
        </div>

        {next && (
          <Reveal>
            <aside className="on-dark relative overflow-hidden rounded-2xl bg-grad-unicef p-5 text-white shadow-md lg:sticky lg:top-24">
              <div
                className="pointer-events-none absolute -end-10 -top-10 size-40 rounded-full bg-white/10"
                aria-hidden
              />
              <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-white/85">
                <Compass className="size-4" aria-hidden />
                {t('learner.nextAction')}
              </p>
              <p className="mt-2 text-lg font-bold leading-snug">
                {t(`nextAction.${next.key}.title`)}
              </p>
              <p className="mt-1 text-sm text-white/85">{t(`nextAction.${next.key}.body`)}</p>
              <Button
                asChild
                variant="secondary"
                className="mt-4 rounded-full bg-white text-navy hover:bg-sky-100"
              >
                <Link to={next.to} params={next.params}>
                  {t(`nextAction.${next.key}.cta`)}
                  <ArrowRight className="size-4 rtl-mirror" aria-hidden />
                </Link>
              </Button>
            </aside>
          </Reveal>
        )}
      </div>
    </div>
  )
}
