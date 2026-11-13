import type { Youth } from '@shared/types'
import { CheckCircle2, CircleHelp, Clock, UserPlus, XCircle } from 'lucide-react'
import { type ReactNode, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { COURSE_BY_ID } from '@/data/courses'
import { COHORTS, PROGRAMMES } from '@/data/orgs'
import { courseStatus } from '@/domain/completion'
import { formatDate, useLocalized } from '@/i18n'
import {
  assignCohort,
  cohortForProgramme,
  decideTrainingApplication,
} from '@/store/actions/sessions'
import type { TrainingDecision } from '../config'
import { LearnerName } from './LearnerName'
import { TrainingStatusBadge } from './TrainingStatusBadge'

const DECISIONS: { key: TrainingDecision; icon: typeof CheckCircle2 }[] = [
  { key: 'accepted', icon: CheckCircle2 },
  { key: 'needsInfo', icon: CircleHelp },
  { key: 'waitlisted', icon: Clock },
  { key: 'notSelected', icon: XCircle },
]

/** T01 review: profile summary, interests, current learning and support requests; decide and assign. */
export function ApplicationDialog({
  youth,
  open,
  onOpenChange,
}: {
  youth: Youth | null
  open: boolean
  onOpenChange: (o: boolean) => void
}) {
  const { t } = useTranslation('trainer')
  const { l, lang } = useLocalized()
  const [busy, setBusy] = useState(false)
  if (!youth?.trainingApplication) return null
  const app = youth.trainingApplication
  const programme = PROGRAMMES.find((p) => p.id === app.programmeId)
  const cohortId = cohortForProgramme(app.programmeId)
  const cohort = COHORTS.find((c) => c.id === cohortId)
  const assigned = !!cohortId && youth.cohortIds.includes(cohortId)
  const learning = Object.values(youth.progress).filter(
    (p) => p && courseStatus(p) === 'inProgress',
  )
  const completed = Object.values(youth.progress).filter((p) => p?.completedAt)
  const p = youth.profile

  const decide = (d: TrainingDecision) => {
    decideTrainingApplication(youth.id, d)
    toast.success(t('applications.decided', { name: p.name, status: t(`appStatus.${d}`) }))
  }
  const assign = () => {
    if (!cohortId) return
    setBusy(true)
    window.setTimeout(() => {
      assignCohort(youth.id, cohortId)
      setBusy(false)
      toast.success(t('applications.assigned', { name: p.name, cohort: cohortId }))
    }, 400)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-2xl sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl">{t('applications.reviewTitle')}</DialogTitle>
          <DialogDescription>
            {t('applications.reviewBody', {
              programme: l(programme?.name),
              date: formatDate(app.at, lang),
            })}
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-sky-50 p-3">
          <LearnerName
            youth={youth}
            sub={`${p.age} · ${p.governorate} · ${p.education}`}
            link={false}
          />
          <TrainingStatusBadge status={app.status} />
        </div>
        {app.motivation && (
          <figure className="rounded-xl border border-sky-200 bg-white p-4 text-sm shadow-xs">
            <figcaption className="mb-1 text-xs font-bold tracking-wide text-ink-soft uppercase">
              {t('applications.motivation')}
            </figcaption>
            <blockquote className="text-ink">“{app.motivation}”</blockquote>
            {app.availability && (
              <p className="mt-2 text-xs text-ink-soft">
                {t('applications.availability')}: {app.availability}
              </p>
            )}
          </figure>
        )}
        <dl className="grid gap-4 text-sm sm:grid-cols-2">
          <Field label={t('applications.summary')}>
            {p.employmentStatus}. {p.experience}.
          </Field>
          <Field label={t('applications.interests')}>
            {p.interests.length ? p.interests.join(', ') : t('ui.none')}
          </Field>
          <Field label={t('applications.learning')}>
            {learning.length || completed.length ? (
              <ul className="space-y-0.5">
                {learning.map(
                  (x) =>
                    x && (
                      <li key={x.courseId}>
                        {x.courseId} · {l(COURSE_BY_ID[x.courseId].title)} ({t('ui.inProgress')})
                      </li>
                    ),
                )}
                {completed.length > 0 && (
                  <li>{t('applications.completedCount', { count: completed.length })}</li>
                )}
              </ul>
            ) : (
              t('ui.none')
            )}
          </Field>
          <Field label={t('applications.support')}>
            {p.support || t('applications.noSupport')}
          </Field>
        </dl>
        <p className="rounded-xl border border-dashed border-cyan/40 bg-white p-3 text-xs text-ink-soft">
          {t('applications.generalLearning')}
        </p>
        <div>
          <p className="mb-2 text-sm font-semibold">{t('applications.decision')}</p>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {DECISIONS.map(({ key, icon: Icon }) => (
              <Button
                key={key}
                variant={app.status === key ? 'default' : 'secondary'}
                size="sm"
                aria-pressed={app.status === key}
                onClick={() => decide(key)}
              >
                <Icon className="size-4" aria-hidden />
                {t(`decide.${key}`)}
              </Button>
            ))}
          </div>
        </div>
        {app.status === 'accepted' && cohort && (
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border bg-white p-3">
            <p className="text-sm">
              {assigned
                ? t('applications.inCohort', { cohort: l(cohort.name) })
                : t('applications.assignPrompt', { cohort: l(cohort.name) })}
            </p>
            {!assigned && (
              <Button size="sm" className="rounded-full" onClick={assign} disabled={busy}>
                <UserPlus className="size-4" aria-hidden />
                {busy ? t('ui.saving') : t('applications.assign', { cohort: cohort.id })}
              </Button>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="rounded-xl border p-3">
      <dt className="text-xs font-semibold uppercase tracking-wide text-ink-soft">{label}</dt>
      <dd className="mt-1 text-ink">{children}</dd>
    </div>
  )
}
