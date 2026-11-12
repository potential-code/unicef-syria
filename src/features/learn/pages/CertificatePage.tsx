import { Link } from '@tanstack/react-router'
import { CircleDashed, Printer, SearchX } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Reveal } from '@/components/motion'
import { EmptyState } from '@/components/shared/EmptyState'
import { PageHeader } from '@/components/shared/PageHeader'
import { Button } from '@/components/ui/button'
import { COURSE_BY_ID } from '@/data/courses'
import { missingRequirements } from '@/domain/completion'
import { useLocalized } from '@/i18n'
import { isCohortCourse } from '@/store/actions/learning'
import { useMyYouth } from '@/store/hooks'
import { CertificatePreview } from '../components/CertificatePreview'
import { CertificateSteps } from '../components/CertificateSteps'
import { isCourseId, resumeTarget } from '../lib'

const PRINT_CSS = `@media print {
  @page { size: landscape; margin: 10mm; }
  body * { visibility: hidden !important; }
  .print-cert, .print-cert * { visibility: visible !important; print-color-adjust: exact; -webkit-print-color-adjust: exact; }
  .print-cert { position: fixed !important; inset: 0; margin: auto; box-shadow: none !important; max-width: none !important; }
}`

/** Certificate preview, or its state and what is still missing. */
export function CertificatePage({ courseId }: { courseId: string }) {
  const { t } = useTranslation('learn')
  const { l } = useLocalized()
  const youth = useMyYouth()

  if (!isCourseId(courseId)) {
    return (
      <>
        <PageHeader
          title={t('course.notFound')}
          crumbs={[{ label: t('library.title'), to: '/youth/library' }, { label: courseId }]}
        />
        <EmptyState icon={SearchX} title={t('course.notFound')} body={t('course.notFoundBody')} />
      </>
    )
  }

  const course = COURSE_BY_ID[courseId]
  const p = youth.progress[courseId]
  const reviewed = isCohortCourse(youth, courseId)
  const issued = !!p?.completedAt && p.certificate === 'issued'
  const missing = missingRequirements(p, reviewed)
  const where = resumeTarget(p)

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('cert.title')}
        description={l(course.title)}
        crumbs={[
          { label: t('library.title'), to: '/youth/library' },
          { label: l(course.title), to: `/youth/library/${courseId}` },
          { label: t('cert.title') },
        ]}
        actions={
          issued && (
            <Button className="rounded-full" onClick={() => window.print()}>
              <Printer className="size-4" aria-hidden />
              {t('cert.print')}
            </Button>
          )
        }
      />
      {issued && p?.completedAt ? (
        <Reveal>
          <style>{PRINT_CSS}</style>
          <CertificatePreview youth={youth} course={course} completedAt={p.completedAt} />
          <p className="mt-4 text-center text-sm text-ink-soft">{t('cert.printHint')}</p>
        </Reveal>
      ) : (
        <section className="card space-y-5 rounded-3xl p-6 sm:p-8">
          <h2 className="text-xl">{t('cert.notIssued')}</h2>
          <CertificateSteps state={p?.completedAt ? p.certificate : undefined} />
          {p?.completedAt ? (
            <p className="rounded-2xl bg-sky-100 px-4 py-3 text-sm text-navy">
              {t(`cert.waiting.${p.certificate ?? 'pendingReview'}`)}
            </p>
          ) : (
            <div>
              <p className="font-semibold">{t('cert.missingTitle')}</p>
              <ul className="mt-2 space-y-2">
                {missing.map((m) => (
                  <li
                    key={m}
                    className="flex items-center gap-2 rounded-xl border border-notice/20 bg-notice-soft px-3.5 py-2.5 text-sm text-notice"
                  >
                    <CircleDashed className="size-4 shrink-0" aria-hidden />
                    {t(`cert.missing.${m}`)}
                    {m === 'practical' &&
                      reviewed &&
                      p?.practical === 'submitted' &&
                      ` ${t('cert.inReview')}`}
                  </li>
                ))}
              </ul>
              <Button asChild className="mt-4 rounded-full">
                {where === 'quiz' ? (
                  <Link to="/youth/learn/$courseId/quiz" params={{ courseId }}>
                    {t('course.continue')}
                  </Link>
                ) : (
                  <Link
                    to="/youth/learn/$courseId/$unit"
                    params={{ courseId, unit: String(where) }}
                  >
                    {t('course.continue')}
                  </Link>
                )}
              </Button>
            </div>
          )}
          <p className="text-xs text-ink-soft">{t('cert.disclaimer')}</p>
        </section>
      )}
    </div>
  )
}
