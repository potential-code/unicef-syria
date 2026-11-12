import type { Application, Opportunity, Youth } from '@shared/types'
import { FileText, Lightbulb, MessageSquareQuote, Palette, ScrollText } from 'lucide-react'
import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { COURSE_BY_ID } from '@/data/courses'
import { useLocalized } from '@/i18n'
import { completedCourses } from '../lib/match'

function Block({
  icon: Icon,
  title,
  children,
}: {
  icon: typeof FileText
  title: string
  children: ReactNode
}) {
  return (
    <section className="rounded-2xl border bg-white p-5 shadow-sm">
      <h3 className="mb-3 flex items-center gap-2 text-base">
        <Icon className="size-5 text-blue" aria-hidden />
        {title}
      </h3>
      <div className="space-y-2 text-sm">{children}</div>
    </section>
  )
}

function Row({ label, value }: { label: string; value?: string }) {
  if (!value) return null
  return (
    <p>
      <span className="font-semibold text-ink">{label}: </span>
      <span className="text-ink">{value}</span>
    </p>
  )
}

/** Applicant-approved career evidence only: CV, proposal, service profile or business concept. */
export function EvidencePanel({
  app,
  youth,
  opp,
}: {
  app: Application
  youth: Youth
  opp?: Opportunity
}) {
  const { t } = useTranslation('employer')
  const { l } = useLocalized()
  const { cv, freelanceProfile, business, proposals } = youth.toolkit
  const proposal = proposals[proposals.length - 1]
  const evidence = completedCourses(youth).filter((c) => opp?.evidenceCourses.includes(c))
  return (
    <div className="flex flex-col gap-4">
      {app.track === 'employment' && (
        <Block icon={FileText} title={t('evidence.cv')}>
          {cv ? (
            <>
              <p className="text-ink">{cv.summary}</p>
              <Row label={t('evidence.education')} value={cv.education} />
              <div>
                <p className="font-semibold text-ink">{t('evidence.experience')}</p>
                <ul className="list-disc ps-5">
                  {cv.experience.map((e) => (
                    <li key={e}>{e}</li>
                  ))}
                </ul>
              </div>
              <Row label={t('evidence.projects')} value={cv.projects} />
              <Row label={t('evidence.skills')} value={cv.skills} />
              <Row label={t('evidence.languages')} value={cv.languages} />
            </>
          ) : (
            <p className="text-ink-soft">{t('evidence.noCv')}</p>
          )}
        </Block>
      )}
      {app.track === 'freelance' && (
        <>
          <Block icon={Palette} title={t('evidence.serviceProfile')}>
            {freelanceProfile ? (
              <>
                <Row label={t('evidence.services')} value={freelanceProfile.services} />
                <Row label={t('evidence.samples')} value={freelanceProfile.samples} />
                <Row label={t('evidence.availability')} value={freelanceProfile.availability} />
                <Row label={t('evidence.pricing')} value={freelanceProfile.pricing} />
              </>
            ) : (
              <p className="text-ink-soft">{t('evidence.none')}</p>
            )}
          </Block>
          <Block icon={ScrollText} title={t('evidence.proposal')}>
            {proposal ? (
              <>
                <Row label={t('evidence.goal')} value={proposal.goal} />
                <Row label={t('evidence.deliverables')} value={proposal.deliverables} />
                <Row label={t('evidence.timing')} value={proposal.timing} />
                <Row label={t('evidence.review')} value={proposal.review} />
                <Row label={t('evidence.fee')} value={proposal.fee} />
              </>
            ) : (
              <p className="text-ink-soft">{t('evidence.none')}</p>
            )}
          </Block>
        </>
      )}
      {app.track === 'enterprise' && (
        <Block icon={Lightbulb} title={t('evidence.business')}>
          {business ? (
            <>
              <Row label={t('evidence.customer')} value={business.customer} />
              <Row label={t('evidence.problem')} value={business.problem} />
              <Row label={t('evidence.solution')} value={business.solution} />
              <Row label={t('evidence.evidenceLabel')} value={business.evidence} />
              <Row label={t('evidence.nextExperiment')} value={business.nextExperiment} />
            </>
          ) : (
            <p className="text-ink-soft">{t('evidence.none')}</p>
          )}
        </Block>
      )}
      {app.motivation && (
        <Block icon={MessageSquareQuote} title={t('evidence.motivation')}>
          <p className="text-ink">{app.motivation}</p>
        </Block>
      )}
      <Block icon={FileText} title={t('evidence.courses')}>
        {evidence.length ? (
          <ul className="flex flex-wrap gap-1.5">
            {evidence.map((c) => (
              <li
                key={c}
                className="rounded-full bg-sky-50 px-2.5 py-1 text-xs font-medium text-navy"
              >
                {c} {l(COURSE_BY_ID[c].title)}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-ink-soft">{t('evidence.noCourses')}</p>
        )}
      </Block>
    </div>
  )
}
