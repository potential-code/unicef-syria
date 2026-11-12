import type { CourseId, YouthId } from '@shared/types'
import { Award, FileCheck2 } from 'lucide-react'
import { type ReactNode, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { EmptyState } from '@/components/shared/EmptyState'
import { PageHeader } from '@/components/shared/PageHeader'
import { StatusBadge, type Tone } from '@/components/shared/StatusBadge'
import { Button } from '@/components/ui/button'
import { COURSE_BY_ID } from '@/data/courses'
import { COHORT_COURSES } from '@/data/orgs'
import { isComplete, QUIZ_PASS } from '@/domain/completion'
import { useLocalized } from '@/i18n'
import { setCertificate } from '@/store/actions/learning'
import { CertificateSteps } from '../components/CertificateSteps'
import { LearnerName } from '../components/LearnerName'
import { MissingList } from '../components/MissingList'
import { useTrainerScope } from '../hooks/useTrainerScope'

const PRACTICAL_TONE: Record<string, Tone> = {
  none: 'neutral',
  submitted: 'info',
  returned: 'notice',
  approved: 'success',
}

function Cell({ label, children, wide }: { label: string; children: ReactNode; wide?: boolean }) {
  return (
    <div className={wide ? 'col-span-2 min-w-0 sm:col-span-1' : 'min-w-0'}>
      <dt className="mb-1.5 text-[11px] font-bold tracking-wider text-ink-soft uppercase">
        {label}
      </dt>
      <dd>{children}</dd>
    </div>
  )
}

/** T05 results: quiz, practical review and prerequisites per cohort course; trainer recommends certification. */
export function TrainerResultsPage() {
  const { t } = useTranslation('trainer')
  const { l } = useLocalized()
  const { stats } = useTrainerScope()
  const [busy, setBusy] = useState<string | null>(null)
  const rows = stats.flatMap((s) =>
    COHORT_COURSES[s.cohortId].map((c) => ({ y: s.youth, c, p: s.youth.progress[c] })),
  )

  const recommend = (youthId: YouthId, courseId: CourseId, name: string) => {
    const key = `${youthId}-${courseId}`
    setBusy(key)
    window.setTimeout(() => {
      setCertificate(youthId, courseId, 'recommended')
      setBusy(null)
      toast.success(t('results.recommendedToast', { name, course: courseId }))
    }, 400)
  }

  return (
    <div className="space-y-6">
      <PageHeader title={t('results.title')} description={t('results.subtitle')} />
      <div className="card flex flex-wrap items-center gap-x-3 gap-y-2 p-4 text-sm">
        <span className="inline-flex items-center gap-1.5 font-semibold text-navy">
          <Award className="size-4 text-blue" aria-hidden />
          {t('results.flow')}
        </span>
        <CertificateSteps />
        <span className="basis-full text-xs text-ink-soft">{t('results.flowNote')}</span>
      </div>
      {rows.length === 0 ? (
        <EmptyState icon={FileCheck2} title={t('results.empty')} body={t('results.emptyBody')} />
      ) : (
        <ul className="space-y-3">
          {rows.map(({ y, c, p }) => {
            const key = `${y.id}-${c}`
            const complete = isComplete(p, true) && !!p?.completedAt
            return (
              <li key={key} className="card p-4 sm:p-5">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                  <LearnerName youth={y} sub={y.id} className="min-w-0 sm:flex-1" />
                  <div className="min-w-0 sm:max-w-[50%] sm:text-end">
                    <p className="text-xs font-bold tracking-wide text-blue uppercase">{c}</p>
                    <p className="font-semibold text-navy">{l(COURSE_BY_ID[c].title)}</p>
                  </div>
                </div>
                <dl className="mt-3 grid grid-cols-2 gap-4 border-t border-border/70 pt-3 xl:grid-cols-[minmax(0,0.7fr)_minmax(0,0.8fr)_minmax(0,1.2fr)_minmax(0,1.5fr)]">
                  <Cell label={t('results.quiz')}>
                    {p?.quizBest !== undefined ? (
                      <StatusBadge tone={p.quizBest >= QUIZ_PASS ? 'success' : 'notice'}>
                        <span className="tabular-nums">{p.quizBest}%</span>
                      </StatusBadge>
                    ) : (
                      <span className="text-sm text-ink-soft">{t('results.notAttempted')}</span>
                    )}
                  </Cell>
                  <Cell label={t('results.practical')}>
                    <StatusBadge tone={PRACTICAL_TONE[p?.practical ?? 'none']}>
                      {t(`practical.${p?.practical ?? 'none'}`)}
                    </StatusBadge>
                  </Cell>
                  <Cell label={t('results.prerequisites')} wide>
                    <MissingList progress={p} />
                  </Cell>
                  <Cell label={t('results.certificate')} wide>
                    {complete ? (
                      <div className="space-y-2">
                        <CertificateSteps state={p?.certificate} />
                        {p?.certificate === 'pendingReview' && (
                          <Button
                            size="sm"
                            className="rounded-full"
                            disabled={busy === key}
                            onClick={() => recommend(y.id, c, y.profile.name)}
                          >
                            {busy === key ? t('ui.saving') : t('results.recommend')}
                          </Button>
                        )}
                        {p?.certificate === 'recommended' && (
                          <p className="text-xs text-ink-soft">{t('results.awaitingCentre')}</p>
                        )}
                      </div>
                    ) : (
                      <p className="text-sm text-ink-soft">{t('results.notEligible')}</p>
                    )}
                  </Cell>
                </dl>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
