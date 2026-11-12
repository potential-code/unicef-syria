import { Info, MessageSquareHeart } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { AccessDenied } from '@/components/shared/AccessDenied'
import { PageHeader } from '@/components/shared/PageHeader'
import { useLocalized } from '@/i18n'
import { useApplications } from '@/store/actions/applications'
import { useAllYouth } from '@/store/actions/youth'
import { ApplicantSummary } from '../components/ApplicantSummary'
import { ApplicationTimeline } from '../components/ApplicationTimeline'
import { EvidencePanel } from '../components/EvidencePanel'
import { StageActions } from '../components/StageActions'
import { StageBadge } from '../components/StageBadge'
import { StageStepper } from '../components/StageStepper'
import { useOrgScope } from '../hooks/use-org-scope'

/** E02 application review: evidence, stage actions and the shared learner timeline. */
export function ApplicationDetailPage({ appId }: { appId: string }) {
  const { t } = useTranslation('employer')
  const { l } = useLocalized()
  const { opportunities } = useOrgScope()
  const app = useApplications().find((a) => a.id === appId)
  const youth = useAllYouth()[app?.youthId ?? 'Y001']
  const opp = opportunities.find((o) => o.id === app?.opportunityId)
  // Own organisation only; a learner's draft is never visible to an employer.
  if (!app || !opp || !youth || app.stage === 'draft') {
    return (
      <div>
        <PageHeader
          title={t('detail.deniedTitle')}
          crumbs={[{ label: t('apps.title'), to: '/employer/applications' }, { label: appId }]}
        />
        <AccessDenied />
      </div>
    )
  }
  const placed = app.stage === 'hired'
  return (
    <div>
      <PageHeader
        title={youth.profile.name}
        eyebrow={<StageBadge stage={app.stage} />}
        description={`${opp.id} ${l(opp.title)} · ${t(`tracks.${app.track}`)}`}
        crumbs={[
          { label: t('apps.title'), to: '/employer/applications' },
          { label: youth.profile.name },
        ]}
      />
      {opp.status === 'closed' && (
        <p className="mb-4 flex items-start gap-2 rounded-xl bg-muted p-3 text-sm">
          <Info className="mt-0.5 size-4 shrink-0" aria-hidden />
          {t('opps.closedNote')}
        </p>
      )}
      <section className="mb-6 rounded-2xl border bg-white p-5 shadow-sm">
        <h2 className="mb-3 text-lg">{t('detail.progress')}</h2>
        <StageStepper app={app} />
        <div className="mt-4 border-t pt-4">
          <StageActions app={app} name={youth.profile.name} roleTitle={l(opp.title)} />
          {placed && <p className="text-sm font-medium text-success">{t('detail.placed')}</p>}
          {app.stage === 'completed' && (
            <p className="text-sm font-medium text-success">{t(`detail.completed.${app.track}`)}</p>
          )}
        </div>
      </section>
      <div className="grid gap-6 lg:grid-cols-[1fr_22rem]">
        <div className="flex flex-col gap-4">
          <h2 className="text-lg">{t('detail.evidence')}</h2>
          <EvidencePanel app={app} youth={youth} opp={opp} />
        </div>
        <div className="flex flex-col gap-4">
          <ApplicantSummary youth={youth} />
          {app.feedback && (
            <section className="rounded-2xl border bg-white p-5 shadow-sm">
              <h2 className="mb-2 flex items-center gap-2 text-base">
                <MessageSquareHeart className="size-5 text-blue" aria-hidden />
                {t('detail.feedback')}
              </h2>
              <p className="whitespace-pre-line text-sm">{app.feedback}</p>
            </section>
          )}
          <section className="rounded-2xl border bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-base">{t('detail.timeline')}</h2>
            <ApplicationTimeline app={app} />
          </section>
        </div>
      </div>
    </div>
  )
}
