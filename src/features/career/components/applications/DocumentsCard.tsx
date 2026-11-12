import type { Application, Opportunity, Youth } from '@shared/types'
import { CheckCircle2, CircleDashed, FileText } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { COURSE_BY_ID } from '@/data/courses'
import { useLocalized } from '@/i18n'

type Doc = { key: string; label: string; ok: boolean }

/** Required documents for the application's track, with what has been attached. */
export function DocumentsCard({
  app,
  opp,
  youth,
}: {
  app: Application
  opp?: Opportunity
  youth: Youth
}) {
  const { t } = useTranslation('career')
  const { l } = useLocalized()
  const d = app.documents
  const docs: Doc[] =
    app.track === 'freelance'
      ? [
          {
            key: 'serviceProfile',
            label: t('apps.docs.serviceProfile'),
            ok: Boolean(youth.toolkit.freelanceProfile),
          },
          { key: 'portfolio', label: t('apps.docs.portfolio'), ok: Boolean(d.portfolio) },
          { key: 'proposal', label: t('apps.docs.proposal'), ok: Boolean(d.proposal) },
        ]
      : app.track === 'enterprise'
        ? [
            {
              key: 'business',
              label: t('apps.docs.businessConcept'),
              ok: Boolean(d.businessConcept),
            },
            { key: 'motivation', label: t('apps.docs.motivation'), ok: Boolean(app.motivation) },
          ]
        : [
            { key: 'cv', label: t('apps.docs.cv'), ok: Boolean(d.cv) },
            ...(opp?.evidenceCourses ?? []).map((c) => ({
              key: c,
              label: t('apps.docs.course', { course: `${c} ${l(COURSE_BY_ID[c].title)}` }),
              ok: Boolean(youth.progress[c]?.completedAt),
            })),
            ...(opp?.type === 'partTime'
              ? [{ key: 'work', label: t('apps.docs.workSample'), ok: Boolean(d.portfolio) }]
              : []),
            { key: 'motivation', label: t('apps.docs.motivation'), ok: Boolean(app.motivation) },
          ]
  return (
    <section aria-labelledby="docs-title" className="rounded-2xl border bg-white p-5 shadow-sm">
      <h2 id="docs-title" className="mb-3 flex items-center gap-2 text-lg">
        <FileText className="size-5 text-blue" aria-hidden />
        {t('apps.detail.documents')}
      </h2>
      <ul className="space-y-2">
        {docs.map((doc) => (
          <li key={doc.key} className="flex items-start gap-2 text-sm">
            {doc.ok ? (
              <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-success" aria-hidden />
            ) : (
              <CircleDashed className="mt-0.5 size-4 shrink-0 text-notice" aria-hidden />
            )}
            <span className="flex-1">{doc.label}</span>
            <span className={doc.ok ? 'text-success' : 'text-ink-soft'}>
              {doc.ok ? t('apps.docs.attached') : t('apps.docs.notAttached')}
            </span>
          </li>
        ))}
      </ul>
      {app.motivation && (
        <blockquote className="mt-4 rounded-xl bg-sky-50 p-3 text-sm italic">
          “{app.motivation}”
        </blockquote>
      )}
    </section>
  )
}
