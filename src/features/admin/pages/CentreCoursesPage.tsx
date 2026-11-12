import type { TrainerId } from '@shared/types'
import { BookOpen, CalendarCheck, Layers, Users } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Stagger, StaggerItem } from '@/components/motion'
import { EmptyState } from '@/components/shared/EmptyState'
import { PageHeader } from '@/components/shared/PageHeader'
import { StatusBadge } from '@/components/shared/StatusBadge'
import { COURSE_BY_ID } from '@/data/courses'
import { COHORT_COURSES, COHORTS, PROGRAMMES } from '@/data/orgs'
import { useSessions } from '@/store/actions/sessions'
import { useAllYouth } from '@/store/actions/youth'
import { TrainerAssignment } from '../components/TrainerAssignment'
import { useLabels } from '../lib/useLabels'
import { useScope } from '../lib/useScope'

/** Programme and cohort setup for the own centre. Trainer changes stay in local state. */
export function CentreCoursesPage() {
  const { t } = useTranslation('admin')
  const { l, programme, n } = useLabels()
  const { cohortIds } = useScope()
  const youth = useAllYouth()
  const sessions = useSessions()
  const cohorts = COHORTS.filter((c) => cohortIds.includes(c.id))
  const [assign, setAssign] = useState<Record<string, TrainerId>>({})
  return (
    <div className="space-y-6">
      <PageHeader title={t('centre.courses.title')} description={t('centre.courses.body')} />
      {cohorts.length === 0 && (
        <EmptyState icon={Layers} title={t('empty.noCohorts')} body={t('empty.noCohortsBody')} />
      )}
      <Stagger className="space-y-4">
        {cohorts.map((k) => {
          const prog = PROGRAMMES.find((p) => p.id === k.programmeId)
          const members = Object.values(youth).filter((y) => y.cohortIds.includes(k.id))
          const ks = sessions.filter((s) => s.cohortId === k.id)
          return (
            <StaggerItem key={k.id}>
              <article className="overflow-hidden rounded-3xl border bg-white shadow-sm">
                <div className="flex flex-wrap items-start justify-between gap-3 bg-sky-50 p-5">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-blue">
                      {k.programmeId} · {programme(k.programmeId)}
                    </p>
                    <h2 className="mt-1 text-xl">{l(k.name)}</h2>
                  </div>
                  <StatusBadge tone="brand">
                    {t(`common:routes.${prog?.route ?? 'employment'}`)}
                  </StatusBadge>
                </div>
                <div className="grid gap-5 p-5 lg:grid-cols-[1fr_1.2fr]">
                  <dl className="grid grid-cols-3 gap-3">
                    {[
                      { icon: Users, label: t('centre.courses.places'), value: n(k.size) },
                      { icon: Users, label: t('centre.courses.named'), value: n(members.length) },
                      {
                        icon: CalendarCheck,
                        label: t('centre.courses.sessions'),
                        value: n(ks.length),
                      },
                    ].map((s) => (
                      <div key={s.label} className="flex flex-col-reverse rounded-2xl border p-3">
                        <dt className="text-xs text-ink-soft">{s.label}</dt>
                        <dd className="text-2xl font-bold tabular-nums">{s.value}</dd>
                      </div>
                    ))}
                  </dl>
                  <TrainerAssignment
                    cohortId={k.id}
                    value={assign[k.id] ?? k.trainerId}
                    onChange={(v) => setAssign((a) => ({ ...a, [k.id]: v }))}
                  />
                </div>
                <div className="border-t p-5">
                  <p className="mb-3 flex items-center gap-2 text-sm font-semibold">
                    <BookOpen className="size-4 text-blue" aria-hidden />
                    {t('centre.courses.cohortCourses')}
                  </p>
                  <ul className="grid gap-2 sm:grid-cols-2">
                    {COHORT_COURSES[k.id].map((c) => (
                      <li key={c} className="flex items-center gap-3 rounded-2xl border p-3">
                        <span className="flex size-10 items-center justify-center rounded-xl bg-blue text-sm font-bold text-white">
                          {c}
                        </span>
                        <span className="min-w-0">
                          <span className="block font-medium">{l(COURSE_BY_ID[c].title)}</span>
                          <span className="text-xs text-ink-soft">
                            {t('centre.courses.reviewed')}
                          </span>
                        </span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-3 text-xs text-ink-soft">{t('centre.courses.openLibrary')}</p>
                </div>
              </article>
            </StaggerItem>
          )
        })}
      </Stagger>
      <p className="text-xs text-ink-soft">{t('trainers.localNote')}</p>
    </div>
  )
}
