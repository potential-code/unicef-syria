import type { CourseId, YouthId } from '@shared/types'
import { Award, FileCheck2 } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { EmptyState } from '@/components/shared/EmptyState'
import { PageHeader } from '@/components/shared/PageHeader'
import { StatusBadge, type Tone } from '@/components/shared/StatusBadge'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
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
      <div className="flex flex-wrap items-center gap-2 rounded-2xl border bg-sky-50 p-4 text-sm">
        <Award className="size-5 text-blue" aria-hidden />
        <span className="font-semibold">{t('results.flow')}</span>
        <CertificateSteps />
        <span className="text-ink-soft">{t('results.flowNote')}</span>
      </div>
      {rows.length === 0 ? (
        <EmptyState icon={FileCheck2} title={t('results.empty')} body={t('results.emptyBody')} />
      ) : (
        <div className="overflow-x-auto rounded-2xl border bg-card shadow-sm">
          <Table>
            <TableHeader className="bg-sky-50">
              <TableRow>
                <TableHead>{t('ui.learner')}</TableHead>
                <TableHead>{t('results.course')}</TableHead>
                <TableHead>{t('results.quiz')}</TableHead>
                <TableHead>{t('results.practical')}</TableHead>
                <TableHead className="min-w-56">{t('results.prerequisites')}</TableHead>
                <TableHead className="min-w-72">{t('results.certificate')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map(({ y, c, p }) => {
                const key = `${y.id}-${c}`
                const complete = isComplete(p, true) && !!p?.completedAt
                return (
                  <TableRow key={key} className="align-top">
                    <TableCell className="min-w-44">
                      <LearnerName youth={y} sub={y.id} />
                    </TableCell>
                    <TableCell className="min-w-44">
                      <p className="text-xs font-semibold text-blue">{c}</p>
                      <p className="font-medium">{l(COURSE_BY_ID[c].title)}</p>
                    </TableCell>
                    <TableCell className="tabular-nums">
                      {p?.quizBest !== undefined ? (
                        <StatusBadge tone={p.quizBest >= QUIZ_PASS ? 'success' : 'notice'}>
                          {p.quizBest}%
                        </StatusBadge>
                      ) : (
                        <span className="text-sm text-ink-soft">{t('results.notAttempted')}</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <StatusBadge tone={PRACTICAL_TONE[p?.practical ?? 'none']}>
                        {t(`practical.${p?.practical ?? 'none'}`)}
                      </StatusBadge>
                    </TableCell>
                    <TableCell>
                      <MissingList progress={p} />
                    </TableCell>
                    <TableCell>
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
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  )
}
