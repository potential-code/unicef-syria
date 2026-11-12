import { Link } from '@tanstack/react-router'
import {
  ArrowRight,
  CalendarClock,
  ClipboardList,
  CornerDownRight,
  MessageSquareText,
  SearchX,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Motif } from '@/components/brand'
import { Reveal } from '@/components/motion'
import { EmptyState } from '@/components/shared/EmptyState'
import { StatusBadge } from '@/components/shared/StatusBadge'
import { Button } from '@/components/ui/button'
import { formatDate, useLocalized } from '@/i18n'
import { useApplications, useOpportunities } from '@/store/actions/applications'
import { useMyYouth } from '@/store/hooks'
import { DocumentsCard } from '../components/applications/DocumentsCard'
import { NotSelectedSupport } from '../components/applications/NotSelectedSupport'
import { OutcomesPanel } from '../components/applications/OutcomesPanel'
import { StageTimeline } from '../components/applications/StageTimeline'
import { TimelineEvents } from '../components/applications/TimelineEvents'
import { WithdrawButton } from '../components/applications/WithdrawButton'
import { CareerHero } from '../components/CareerHero'
import { FALLBACK_COURSE, FINAL_STAGES, orgOf, stageTone } from '../config/opportunities'

/** Y15 application detail: timeline, documents, deadline, next action, feedback and outcomes. */
export function ApplicationDetailPage({ appId }: { appId: string }) {
  const { t } = useTranslation('career')
  const { l, lang } = useLocalized()
  const youth = useMyYouth()
  const app = useApplications().find((a) => a.id === appId && a.youthId === youth.id)
  const opp = useOpportunities().find((o) => o.id === app?.opportunityId)

  if (!app) {
    return (
      <EmptyState
        icon={SearchX}
        title={t('apps.detail.notFoundTitle')}
        body={t('apps.detail.notFoundBody')}
        action={
          <Button asChild className="rounded-full">
            <Link to="/youth/applications">{t('apps.title')}</Link>
          </Button>
        }
      />
    )
  }

  const org = opp ? orgOf(opp.orgId) : undefined
  const missingCourse = opp?.evidenceCourses.find((c) => !youth.progress[c]?.completedAt)
  const title = opp ? l(opp.title) : app.opportunityId

  return (
    <div>
      <CareerHero
        icon={ClipboardList}
        tone={app.stage === 'notSelected' ? 'navy' : 'unicef'}
        crumbs={[{ label: t('apps.title'), to: '/youth/applications' }, { label: title }]}
        eyebrow={`${t(`apps.track.${app.track}`)}${org ? ` · ${l(org.name)}` : ''}`}
        title={title}
        body={
          <span className="flex flex-wrap items-center gap-2">
            {t('apps.detail.currentStage')}
            <StatusBadge tone={stageTone(app.stage)}>{t(`common:stages.${app.stage}`)}</StatusBadge>
          </span>
        }
        actions={
          <>
            {app.stage === 'draft' && opp && (
              <Button
                asChild
                variant="secondary"
                className="rounded-full bg-white text-navy hover:bg-sky-100"
              >
                <Link to="/youth/opportunities/$oppId" params={{ oppId: opp.id }}>
                  {t('apps.detail.continueDraft')}
                  <ArrowRight className="size-4 rtl-mirror" aria-hidden />
                </Link>
              </Button>
            )}
            {!FINAL_STAGES.includes(app.stage) && (
              <div className="rounded-full bg-white">
                <WithdrawButton app={app} />
              </div>
            )}
          </>
        }
      />

      <Reveal className="card mb-6 p-5 sm:p-6">
        <h2 className="mb-5 text-lg">{t('apps.detail.timeline')}</h2>
        <StageTimeline app={app} />
      </Reveal>

      {app.stage === 'notSelected' && (
        <div className="mb-6">
          <NotSelectedSupport app={app} courseId={missingCourse ?? FALLBACK_COURSE[app.track]} />
        </div>
      )}

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_22rem]">
        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="relative flex gap-3 overflow-hidden rounded-2xl bg-[linear-gradient(140deg,var(--unicef-navy),#002a73)] p-5 text-white shadow-md on-dark [&>*:not(:first-child)]:relative">
              <Motif variant="corner" className="text-cyan/25" />
              <CornerDownRight
                className="mt-0.5 size-5 shrink-0 text-yellow rtl-mirror"
                aria-hidden
              />
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-white/80">
                  {t('apps.nextTitle')}
                </p>
                <p className="mt-1 font-semibold">{t(`apps.next.${app.track}.${app.stage}`)}</p>
              </div>
            </div>
            <div className="relative flex gap-3 overflow-hidden rounded-2xl bg-[linear-gradient(140deg,#ffd666,var(--unicef-yellow))] p-5 text-ink shadow-md [&>*:not(:first-child)]:relative">
              <Motif variant="corner" className="text-white/50" />
              <CalendarClock className="mt-0.5 size-5 shrink-0" aria-hidden />
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-ink/75">
                  {t('apps.detail.deadline')}
                </p>
                <p className="mt-1 font-semibold">
                  {opp ? formatDate(opp.deadline, lang) : t('apps.detail.noDeadline')}
                </p>
                {opp?.status === 'closed' && (
                  <p className="text-sm">{t('apps.detail.oppClosed')}</p>
                )}
              </div>
            </div>
          </div>
          {app.stage !== 'notSelected' && (
            <section aria-labelledby="fb-title" className="card p-5">
              <h2 id="fb-title" className="mb-2 flex items-center gap-2 text-lg">
                <MessageSquareText className="size-5 text-blue" aria-hidden />
                {t('apps.detail.feedback')}
              </h2>
              <p className={app.feedback ? '' : 'text-sm text-ink-soft'}>
                {app.feedback || t('apps.detail.noFeedback')}
              </p>
            </section>
          )}
          <OutcomesPanel app={app} />
          <section aria-labelledby="history-title">
            <h2 id="history-title" className="mb-3 text-lg">
              {t('apps.detail.events')}
            </h2>
            <TimelineEvents app={app} />
          </section>
        </div>
        <div className="space-y-6">
          <DocumentsCard app={app} opp={opp} youth={youth} />
          {opp && (
            <Button asChild variant="outline" className="w-full rounded-full">
              <Link to="/youth/opportunities/$oppId" params={{ oppId: opp.id }}>
                {t('apps.detail.viewOpportunity')}
              </Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
