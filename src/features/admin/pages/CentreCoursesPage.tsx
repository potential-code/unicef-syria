import type { TrainerId } from '@shared/types'
import { BookOpen, Layers } from 'lucide-react'
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
import { MiniStats } from '../components/MiniStats'
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
              <article className="card overflow-hidden">
                <div className="flex flex-wrap items-start justify-between gap-3 border-b border-border/70 bg-sky-50/70 px-5 py-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-blue">
                      {k.programmeId} · {programme(k.programmeId)}
                    </p>
                    <h2 className="mt-1 text-lg">{l(k.name)}</h2>
                  </div>
                  <StatusBadge tone="brand">
                    {t(`common:routes.${prog?.route ?? 'employment'}`)}
                  </StatusBadge>
                </div>
                <div className="grid gap-5 p-5 lg:grid-cols-[1fr_1.2fr]">
                  <MiniStats
                    className="self-start"
                    items={[
                      { key: 'places', label: t('centre.courses.places'), value: n(k.size) },
                      {
                        key: 'named',
                        label: t('centre.courses.named'),
                        value: n(members.length),
                      },
                      {
                        key: 'sessions',
                        label: t('centre.courses.sessions'),
                        value: n(ks.length),
                      },
                    ]}
                  />
                  <TrainerAssignment
                    cohortId={k.id}
                    value={assign[k.id] ?? k.trainerId}
                    onChange={(v) => setAssign((a) => ({ ...a, [k.id]: v }))}
                  />
                </div>
                <div className="border-t border-border/70 p-5">
                  <p className="mb-3 flex items-center gap-2 text-sm font-semibold">
                    <BookOpen className="size-4 text-blue" aria-hidden />
                    {t('centre.courses.cohortCourses')}
                  </p>
                  <ul className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,16rem),1fr))] gap-2">
                    {COHORT_COURSES[k.id].map((c) => (
                      <li
                        key={c}
                        className="flex items-start gap-2.5 rounded-xl bg-white px-3 py-2.5 shadow-xs ring-1 ring-border/70"
                      >
                        <BookOpen className="mt-0.5 size-4 shrink-0 text-blue" aria-hidden />
                        <span className="min-w-0">
                          <span className="block text-sm font-semibold">
                            <span className="me-1.5 text-blue">{c}</span>
                            {l(COURSE_BY_ID[c].title)}
                          </span>
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
