import type { CertificateState, CourseId, YouthId } from '@shared/types'
import { Award, FileCheck2, Sparkles } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { EmptyState } from '@/components/shared/EmptyState'
import { PageHeader } from '@/components/shared/PageHeader'
import { StatusBadge } from '@/components/shared/StatusBadge'
import { Button } from '@/components/ui/button'
import { COURSE_BY_ID } from '@/data/courses'
import { completeCourseShortcut, reviewPractical, setCertificate } from '@/store/actions/learning'
import { useAllYouth } from '@/store/actions/youth'
import { CertificateFlow } from '../components/CertificateFlow'
import { CertificatePreview } from '../components/CertificatePreview'
import { LearnerName } from '../components/LearnerName'
import { useAdminFilters } from '../lib/useAdminFilters'
import { useCurrentActivity } from '../lib/useCurrent'
import { useLabels } from '../lib/useLabels'

const NEXT: Partial<Record<CertificateState, CertificateState>> = {
  recommended: 'approved',
  approved: 'issued',
}

/** Results and certificates: the centre approves a Recommended certificate, then issues it. */
export function CentreResultsPage() {
  const { t } = useTranslation('admin')
  const { l } = useLabels()
  const { filters } = useAdminFilters()
  const { certificates } = useCurrentActivity(filters)
  const youth = useAllYouth()
  const [busy, setBusy] = useState<string | null>(null)
  const act = (youthId: YouthId, courseId: CourseId, next: CertificateState) => {
    const key = `${youthId}-${courseId}`
    setBusy(key)
    window.setTimeout(() => {
      setCertificate(youthId, courseId, next)
      setBusy(null)
      toast.success(
        t(`results.toast.${next}`, { name: youth[youthId]?.profile.name, course: courseId }),
      )
    }, 450)
  }
  const prepareSample = () => {
    completeCourseShortcut('Y007', 'C05')
    reviewPractical('Y007', 'C05', true)
    setCertificate('Y007', 'C05', 'recommended')
    toast.success(t('results.sampleReady'))
  }
  const hasRecommended = certificates.some(
    (c) => c.state === 'recommended' || c.state === 'approved',
  )
  return (
    <div className="space-y-6">
      <PageHeader title={t('results.title')} description={t('results.body')} />
      <section className="card p-5">
        <p className="mb-4 text-sm font-semibold text-navy">{t('results.flowTitle')}</p>
        <CertificateFlow state="issued" />
      </section>
      {!hasRecommended && (
        <aside className="flex flex-col gap-3 rounded-2xl bg-blue-50 p-4 ring-1 ring-blue/15 sm:flex-row sm:items-center">
          <Sparkles className="size-5 shrink-0 text-blue" aria-hidden />
          <p className="flex-1 text-sm text-ink-soft">{t('results.sampleBody')}</p>
          <Button variant="outline" size="sm" className="rounded-full" onClick={prepareSample}>
            {t('results.sampleCta')}
          </Button>
        </aside>
      )}
      {certificates.length === 0 ? (
        <EmptyState
          icon={FileCheck2}
          title={t('empty.noCertificates')}
          body={t('empty.noCertificatesBody')}
        />
      ) : (
        <ul className="space-y-3">
          {certificates.map((c) => {
            const y = youth[c.youthId]
            const next = NEXT[c.state]
            const key = `${c.youthId}-${c.courseId}`
            if (!y) return null
            return (
              <li
                key={key}
                className="card grid gap-4 p-5 lg:grid-cols-[1fr_1.4fr_auto] lg:items-center"
              >
                <div className="space-y-1">
                  <LearnerName y={y} to="/centre/participants/$youthId" />
                  <p className="text-sm">
                    {c.courseId} {l(COURSE_BY_ID[c.courseId].title)}
                  </p>
                </div>
                <CertificateFlow state={c.state} compact />
                <div className="flex flex-wrap items-center gap-2 lg:justify-end">
                  {next ? (
                    <Button
                      size="sm"
                      className="rounded-full"
                      disabled={busy === key}
                      onClick={() => act(c.youthId, c.courseId, next)}
                    >
                      <Award className="size-4" aria-hidden />
                      {busy === key ? t('processing') : t(`results.action.${next}`)}
                    </Button>
                  ) : c.state === 'issued' ? (
                    <CertificatePreview name={y.profile.name} courseId={c.courseId} />
                  ) : (
                    <StatusBadge tone="info">{t('results.awaitingTrainer')}</StatusBadge>
                  )}
                </div>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
