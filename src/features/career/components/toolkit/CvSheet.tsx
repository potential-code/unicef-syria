import type { Toolkit, YouthProfile } from '@shared/types'
import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { COURSE_BY_ID } from '@/data/courses'
import { useLocalized } from '@/i18n'

type Cv = NonNullable<Toolkit['cv']>

/** Print-ready CV sheet. Shows only what the learner entered and the certificates they chose. */
export function CvSheet({ cv, profile }: { cv: Cv; profile: YouthProfile }) {
  const { t } = useTranslation('career')
  const { l } = useLocalized()
  const section = (title: string, body: ReactNode) => (
    <section className="space-y-1.5">
      <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue after:h-px after:flex-1 after:bg-border">
        {title}
      </h3>
      <div className="text-sm text-ink">{body}</div>
    </section>
  )
  const text = (v: string) =>
    v.trim() ? (
      <p className="whitespace-pre-line">{v}</p>
    ) : (
      <p className="text-ink-soft italic">{t('toolkit.cv.notAdded')}</p>
    )
  return (
    <article className="relative space-y-5 overflow-hidden rounded-2xl border border-border/70 bg-white p-6 pt-8 text-start shadow-md sm:p-9 sm:pt-10">
      <div className="absolute inset-x-0 top-0 h-2 bg-grad-unicef" aria-hidden />
      <header className="border-b border-border pb-4">
        <h2 className="text-3xl tracking-tight text-navy">{profile.name}</h2>
        <p className="mt-1 text-sm text-ink-soft">
          {[profile.email, profile.phone, profile.governorate].filter(Boolean).join(' · ')}
        </p>
      </header>
      {section(t('toolkit.cv.summary'), text(cv.summary))}
      {section(
        t('toolkit.cv.experience'),
        cv.experience.length ? (
          <ul className="list-disc space-y-1 ps-5">
            {cv.experience.map((e) => (
              <li key={e}>{e}</li>
            ))}
          </ul>
        ) : (
          text('')
        ),
      )}
      {section(t('toolkit.cv.education'), text(cv.education))}
      {cv.includeCertificates.length > 0 &&
        section(
          t('toolkit.cv.training'),
          <ul className="list-disc space-y-1 ps-5">
            {cv.includeCertificates.map((id) => (
              <li key={id}>
                {l(COURSE_BY_ID[id].title)}{' '}
                <span className="text-ink-soft">({t('toolkit.cv.platformCourse')})</span>
              </li>
            ))}
          </ul>,
        )}
      {section(t('toolkit.cv.projects'), text(cv.projects))}
      <div className="grid gap-4 sm:grid-cols-2">
        {section(t('toolkit.cv.skills'), text(cv.skills))}
        {section(t('toolkit.cv.languages'), text(cv.languages))}
      </div>
      <p className="pt-2 text-[0.7rem] text-ink-soft">{t('toolkit.cv.sampleFooter')}</p>
    </article>
  )
}
