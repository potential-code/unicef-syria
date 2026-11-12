import type { Application, OutcomeType } from '@shared/types'
import { BadgeCheck, Flag, Handshake, PackageCheck } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useOpportunities } from '@/store/actions/applications'
import { useDb } from '@/store/db'
import { OutcomeRow } from './OutcomeRow'
import { ReportOutcomeButton } from './ReportOutcomeButton'

const REPORTABLE: Record<
  Application['track'],
  { type: OutcomeType; stages: Application['stage'][] }
> = {
  employment: { type: 'job', stages: ['shortlisted', 'interview', 'offer'] },
  freelance: { type: 'freelanceCompleted', stages: ['selected', 'inDelivery'] },
  enterprise: { type: 'enterpriseAccepted', stages: ['review'] },
}

/**
 * Outcomes for one application (brief §15 Y15, §16 E03): employer-recorded outcomes are confirmed;
 * learner-reported ones are labelled pending confirmation. Freelance selection and completed work
 * are tracked separately; enterprise acceptance is a milestone, never funding or a placement.
 */
export function OutcomesPanel({ app }: { app: Application }) {
  const { t } = useTranslation('career')
  const all = useDb((db) => db.outcomes)
  const mine = all.filter((o) => o.youthId === app.youthId && o.opportunityId === app.opportunityId)
  const find = (type: OutcomeType) => mine.find((o) => o.type === type)
  const opp = useOpportunities().find((o) => o.id === app.opportunityId)
  const reportable = REPORTABLE[app.track]
  const canReport =
    reportable.stages.includes(app.stage) &&
    !find(reportable.type) &&
    !(app.track === 'employment' && find('internship'))

  return (
    <section
      aria-labelledby="outcomes-title"
      className="space-y-3 rounded-2xl border bg-sky-50 p-5"
    >
      <h2 id="outcomes-title" className="text-lg">
        {t('apps.outcomes.title')}
      </h2>
      {app.track === 'freelance' && (
        <>
          <div className="grid gap-3 md:grid-cols-2">
            <OutcomeRow
              track={app.track}
              icon={Handshake}
              title={t('apps.outcomes.freelance.selected')}
              body={t('apps.outcomes.freelance.selectedBody')}
              outcome={find('freelanceSelected')}
            />
            <OutcomeRow
              track={app.track}
              icon={PackageCheck}
              title={t('apps.outcomes.freelance.completed')}
              body={t('apps.outcomes.freelance.completedBody')}
              outcome={find('freelanceCompleted')}
            />
          </div>
          <p className="text-sm">{t('apps.outcomes.freelance.explain')}</p>
        </>
      )}
      {app.track === 'enterprise' && (
        <>
          <OutcomeRow
            track={app.track}
            icon={Flag}
            title={t('apps.outcomes.enterprise.accepted')}
            body={t('apps.outcomes.enterprise.body')}
            outcome={find('enterpriseAccepted')}
          />
          <p className="text-sm">{t('apps.outcomes.enterprise.explain')}</p>
        </>
      )}
      {app.track === 'employment' && (
        <>
          <OutcomeRow
            track={app.track}
            icon={BadgeCheck}
            title={find('internship') ? t('apps.outcomes.internship') : t('apps.outcomes.job')}
            body={t('apps.outcomes.jobBody')}
            outcome={find('job') ?? find('internship')}
          />
          {app.stage === 'offer' && (
            <p className="text-sm font-medium">{t('apps.outcomes.offerNote')}</p>
          )}
        </>
      )}
      {canReport && (
        <ReportOutcomeButton
          app={app}
          type={opp?.type === 'internship' ? 'internship' : reportable.type}
        />
      )}
    </section>
  )
}
