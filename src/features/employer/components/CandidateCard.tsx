import type { Opportunity, Youth } from '@shared/types'
import {
  BookOpenCheck,
  Briefcase,
  CheckCircle2,
  CircleDashed,
  Clock,
  Image,
  MapPin,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Avatar } from '@/components/shared/Avatar'
import { COURSE_BY_ID } from '@/data/courses'
import { useLocalized } from '@/i18n'
import { completedCourses, declaredSkills, explainMatch } from '../lib/match'

/**
 * Candidate card (brief §16 E02): experience, portfolio and course evidence only.
 * Never reads assessment, disability, support or coaching notes (EMPLOYER_HIDDEN_FIELDS).
 */
export function CandidateCard({ youth, opp }: { youth: Youth; opp?: Opportunity }) {
  const { t } = useTranslation('employer')
  const { l } = useLocalized()
  const m = explainMatch(youth, opp)
  const courses = completedCourses(youth)
  const experience = [youth.profile.experience, ...(youth.toolkit.cv?.experience ?? [])].filter(
    Boolean,
  )
  const portfolio = youth.toolkit.freelanceProfile?.samples
  return (
    <article className="flex h-full flex-col gap-4 rounded-2xl border bg-white p-5 shadow-sm">
      <header className="flex items-center gap-3">
        <Avatar src={youth.image} name={youth.profile.name} size={48} />
        <div className="min-w-0">
          <h3 className="text-lg">{youth.profile.name}</h3>
          <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-ink-soft">
            <span className="inline-flex items-center gap-1">
              <MapPin className="size-3.5" aria-hidden />
              {t(`governorates.${youth.profile.governorate}`)}
            </span>
            <span className="inline-flex items-center gap-1">
              <Clock className="size-3.5" aria-hidden />
              {youth.profile.availability}
            </span>
          </p>
        </div>
      </header>

      <section>
        <h4 className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-ink-soft">
          <Briefcase className="size-3.5" aria-hidden />
          {t('candidates.experience')}
        </h4>
        <ul className="list-disc space-y-0.5 ps-5 text-sm">
          {experience.map((e) => (
            <li key={e}>{e}</li>
          ))}
        </ul>
      </section>

      {portfolio && (
        <section>
          <h4 className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-ink-soft">
            <Image className="size-3.5" aria-hidden />
            {t('candidates.portfolio')}
          </h4>
          <p className="text-sm">{portfolio}</p>
        </section>
      )}

      <section>
        <h4 className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-ink-soft">
          <BookOpenCheck className="size-3.5" aria-hidden />
          {t('candidates.courses')}
        </h4>
        {courses.length ? (
          <ul className="flex flex-wrap gap-1.5">
            {courses.map((c) => (
              <li
                key={c}
                className="rounded-full bg-sky-50 px-2.5 py-1 text-xs font-medium text-navy"
              >
                {c} {l(COURSE_BY_ID[c].title)}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-ink-soft">{t('candidates.noCourses')}</p>
        )}
        <p className="mt-2 text-xs text-ink-soft">
          {t('candidates.skills')}: {declaredSkills(youth).join(', ') || t('candidates.none')}
        </p>
      </section>

      {opp && (
        <section className="mt-auto rounded-xl bg-sky-50 p-3">
          <h4 className="mb-2 text-sm font-semibold text-navy">
            {t('candidates.whyTitle', { title: l(opp.title) })}
          </h4>
          <ul className="space-y-1.5 text-sm">
            {m.skills.map((s) => (
              <li key={s.declared + s.requirement.en} className="flex gap-2">
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-success" aria-hidden />
                {t('candidates.skillMatch', {
                  declared: s.declared,
                  requirement: l(s.requirement),
                })}
              </li>
            ))}
            {m.evidence.map((c) => (
              <li key={c} className="flex gap-2">
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-success" aria-hidden />
                {t('candidates.evidenceMatch', { course: `${c} ${l(COURSE_BY_ID[c].title)}` })}
              </li>
            ))}
            {m.gaps.map((c) => (
              <li key={c} className="flex gap-2 text-ink-soft">
                <CircleDashed className="mt-0.5 size-4 shrink-0" aria-hidden />
                {t('candidates.gap', { course: `${c} ${l(COURSE_BY_ID[c].title)}` })}
              </li>
            ))}
            {m.skills.length + m.evidence.length + m.gaps.length === 0 && (
              <li className="text-ink-soft">{t('candidates.noSignals')}</li>
            )}
          </ul>
        </section>
      )}
    </article>
  )
}
