import { Info } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Reveal } from '@/components/motion'
import { PageHeader } from '@/components/shared/PageHeader'
import { EnterpriseMilestones } from '../components/EnterpriseMilestones'
import { FeedbackForm } from '../components/FeedbackForm'
import { FeedbackList } from '../components/FeedbackList'
import { FreelanceAssignments } from '../components/FreelanceAssignments'
import { PlacementsTable } from '../components/PlacementsTable'
import { useOrgScope } from '../hooks/use-org-scope'

/** E03 placements and workforce feedback for own opportunities. */
export function PlacementsPage() {
  const { t } = useTranslation('employer')
  const { org, opportunities, applications, outcomes } = useOrgScope()
  const placements = outcomes.filter(
    (o) => (o.type === 'job' || o.type === 'internship') && o.confirmed,
  )
  const offers = applications.filter((a) => a.stage === 'offer').length
  const hasFreelance = opportunities.some((o) => o.type === 'freelance')
  const hasEnterprise = opportunities.some((o) => o.type === 'enterprise')
  const hasEmployment =
    opportunities.length === 0 ||
    opportunities.some((o) => o.type !== 'freelance' && o.type !== 'enterprise')
  return (
    <div>
      <PageHeader title={t('placements.title')} description={t('placements.body')} />
      <p className="mb-8 flex items-start gap-2 rounded-xl bg-sky-50 p-3 text-sm text-navy ring-1 ring-cyan/25">
        <Info className="mt-0.5 size-4 shrink-0" aria-hidden />
        {t('placements.rule', { count: offers })}
      </p>
      <div className="flex flex-col gap-10">
        {hasEmployment && (
          <Reveal as="section">
            <h2 className="mb-4 text-xl text-navy">{t('placements.employmentTitle')}</h2>
            <PlacementsTable outcomes={placements} opportunities={opportunities} />
          </Reveal>
        )}
        {hasFreelance && (
          <Reveal as="section">
            <h2 className="mb-1 text-xl text-navy">{t('placements.freelanceTitle')}</h2>
            <p className="mb-4 text-sm text-ink-soft">{t('placements.freelanceNote')}</p>
            <FreelanceAssignments
              apps={applications}
              outcomes={outcomes}
              opportunities={opportunities}
            />
          </Reveal>
        )}
        {hasEnterprise && (
          <Reveal as="section">
            <h2 className="mb-4 text-xl text-navy">{t('placements.enterpriseTitle')}</h2>
            <EnterpriseMilestones apps={applications} />
          </Reveal>
        )}
        <Reveal as="section" className="grid gap-6 xl:grid-cols-2 [&>*]:min-w-0">
          <div>
            <h2 className="mb-4 text-xl text-navy">{t('feedback.title')}</h2>
            <FeedbackForm orgId={org.id} />
          </div>
          <div>
            <h2 className="mb-4 text-xl text-navy">{t('feedback.previous')}</h2>
            <FeedbackList orgId={org.id} />
          </div>
        </Reveal>
      </div>
    </div>
  )
}
