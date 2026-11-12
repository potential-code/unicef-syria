import type { YouthId } from '@shared/types'
import { Link } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { AccessDenied } from '@/components/shared/AccessDenied'
import { Avatar } from '@/components/shared/Avatar'
import { PageHeader } from '@/components/shared/PageHeader'
import { StatusBadge } from '@/components/shared/StatusBadge'
import { COURSE_BY_ID } from '@/data/courses'
import { SESSIONS } from '@/data/sessions'
import { canSeeYouth } from '@/domain/access'
import { courseStatus } from '@/domain/completion'
import { useApplications } from '@/store/actions/applications'
import { useYouth } from '@/store/actions/youth'
import { useMe } from '@/store/hooks'
import { useLabels } from '../lib/useLabels'

/**
 * Learner record for the centre administrator. Another centre's learner shows AccessDenied:
 * front-end role display only; production enforcement needs backend controls (brief §18).
 */
export function LearnerRecordPage({ youthId }: { youthId: string }) {
  const { t } = useTranslation('admin')
  const { l, cohort, programme, stage } = useLabels()
  const me = useMe()
  const y = useYouth(youthId as YouthId)
  const apps = useApplications().filter((a) => a.youthId === youthId)
  const crumbs = [
    { label: t('common:nav.centre.participants'), to: '/centre/participants' },
    { label: y && canSeeYouth(me, y) ? y.profile.name : youthId },
  ]
  if (!y || !canSeeYouth(me, y))
    return (
      <div className="space-y-6">
        <PageHeader title={t('record.deniedTitle')} crumbs={crumbs} />
        <AccessDenied />
        <Link
          to="/centre/participants"
          className="inline-flex min-h-11 items-center gap-1 font-semibold text-blue hover:underline"
        >
          <ArrowLeft className="size-4 rtl-mirror" aria-hidden />
          {t('record.back')}
        </Link>
      </div>
    )
  const progress = Object.values(y.progress).filter((p) => !!p)
  return (
    <div className="space-y-6">
      <PageHeader title={y.profile.name} crumbs={crumbs} description={t('record.scopeNote')} />
      <section className="card flex flex-wrap items-center gap-4 p-5">
        <Avatar src={y.image} name={y.profile.name} size={64} />
        <dl className="grid flex-1 grid-cols-2 gap-3 text-sm sm:grid-cols-4">
          <div>
            <dt className="text-xs text-ink-soft">{t('record.age')}</dt>
            <dd className="font-semibold">{y.profile.age}</dd>
          </div>
          <div>
            <dt className="text-xs text-ink-soft">{t('filters.governorate')}</dt>
            <dd className="font-semibold">{t(`gov.${y.profile.governorate}`)}</dd>
          </div>
          <div>
            <dt className="text-xs text-ink-soft">{t('table.cohort')}</dt>
            <dd className="font-semibold">
              {y.cohortIds.map((c) => cohort(c)).join(', ') || t('none')}
            </dd>
          </div>
          <div>
            <dt className="text-xs text-ink-soft">{t('table.programme')}</dt>
            <dd className="font-semibold">
              {y.trainingApplication
                ? `${programme(y.trainingApplication.programmeId)} · ${t(`appStatus.${y.trainingApplication.status}`)}`
                : t('none')}
            </dd>
          </div>
        </dl>
      </section>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,22rem),1fr))] gap-4">
        <section className="card p-5">
          <h2 className="mb-3 text-lg">{t('record.learning')}</h2>
          <ul className="divide-y divide-border/70">
            {progress.map((p) => (
              <li
                key={p.courseId}
                className="flex flex-wrap items-center justify-between gap-2 py-2 text-sm"
              >
                <span>
                  {p.courseId} {l(COURSE_BY_ID[p.courseId].title)}
                </span>
                <span className="flex gap-2">
                  <StatusBadge tone={courseStatus(p) === 'completed' ? 'success' : 'info'}>
                    {t(`common:status.${courseStatus(p)}`)}
                  </StatusBadge>
                  {p.certificate && (
                    <StatusBadge tone="brand">
                      {t(`common:certificate.${p.certificate}`)}
                    </StatusBadge>
                  )}
                </span>
              </li>
            ))}
          </ul>
        </section>
        <section className="card p-5">
          <h2 className="mb-3 text-lg">{t('record.attendance')}</h2>
          <ul className="divide-y divide-border/70 text-sm">
            {SESSIONS.filter((s) => s.cohortId && y.cohortIds.includes(s.cohortId)).map((s) => (
              <li key={s.id} className="flex items-center justify-between gap-2 py-2">
                <span>
                  {s.id} {l(s.title)}
                </span>
                <span className="text-ink-soft">
                  {t(`common:attendance.${y.attendance[s.id] ?? 'unmarked'}`)}
                </span>
              </li>
            ))}
          </ul>
          <h2 className="mt-5 mb-3 text-lg">{t('record.applications')}</h2>
          {apps.length ? (
            <ul className="space-y-2 text-sm">
              {apps.map((a) => (
                <li key={a.id} className="flex items-center justify-between gap-2">
                  <span>{a.opportunityId}</span>
                  <StatusBadge>{stage(a.stage)}</StatusBadge>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-ink-soft">{t('record.noApplications')}</p>
          )}
        </section>
      </div>
    </div>
  )
}
