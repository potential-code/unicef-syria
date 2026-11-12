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
      <h3 className="border-b border-cyan/40 pb-1 text-xs font-bold uppercase tracking-wider text-blue">
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
    <article className="space-y-4 rounded-2xl border bg-white p-6 text-start sm:p-8">
      <header className="border-b-2 border-blue pb-3">
        <h2 className="text-2xl text-navy">{profile.name}</h2>
        <p className="text-sm text-ink-soft">
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
