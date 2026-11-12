import { Link } from '@tanstack/react-router'
import { Briefcase, ClipboardList } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Stagger, StaggerItem } from '@/components/motion'
import { EmptyState } from '@/components/shared/EmptyState'
import { Button } from '@/components/ui/button'
import { useApplications, useOpportunities } from '@/store/actions/applications'
import { useMyYouth } from '@/store/hooks'
import { ApplicationCard } from '../components/applications/ApplicationCard'
import { CareerHero } from '../components/CareerHero'

/** Y15 list: every application the youth has started, with stage and next action. */
export function ApplicationsPage() {
  const { t } = useTranslation('career')
  const youth = useMyYouth()
  const opps = useOpportunities()
  const apps = useApplications().filter((a) => a.youthId === youth.id)
  const active = apps.filter((a) => a.stage !== 'withdrawn' && a.stage !== 'notSelected')
  const closed = apps.filter((a) => a.stage === 'withdrawn' || a.stage === 'notSelected')

  const grid = (list: typeof apps) => (
    <Stagger className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {list.map((a) => (
        <StaggerItem key={a.id} className="h-full">
          <ApplicationCard app={a} opp={opps.find((o) => o.id === a.opportunityId)} />
        </StaggerItem>
      ))}
    </Stagger>
  )

  return (
    <div>
      <CareerHero
        icon={ClipboardList}
        eyebrow={t('apps.eyebrow')}
        title={t('apps.title')}
        body={t('apps.body')}
        crumbs={[
          { label: t('opps.title'), to: '/youth/opportunities' },
          { label: t('apps.title') },
        ]}
        actions={
          <Button
            asChild
            variant="secondary"
            className="rounded-full bg-white text-navy hover:bg-sky-100"
          >
            <Link to="/youth/opportunities">
              <Briefcase className="size-4" aria-hidden />
              {t('apps.browse')}
            </Link>
          </Button>
        }
      />
      {apps.length === 0 ? (
        <EmptyState
          icon={ClipboardList}
          title={t('apps.empty.title')}
          body={t('apps.empty.body')}
          action={
            <Button asChild className="rounded-full">
              <Link to="/youth/opportunities">{t('apps.browse')}</Link>
            </Button>
          }
        />
      ) : (
        <div className="space-y-8">
          <section aria-labelledby="active-apps">
            <h2 id="active-apps" className="mb-3 text-xl">
              {t('apps.activeTitle', { count: active.length })}
            </h2>
            {active.length > 0 ? (
              grid(active)
            ) : (
              <p className="text-ink-soft">{t('apps.noActive')}</p>
            )}
          </section>
          {closed.length > 0 && (
            <section aria-labelledby="closed-apps">
              <h2 id="closed-apps" className="mb-3 text-xl">
                {t('apps.closedTitle', { count: closed.length })}
              </h2>
              {grid(closed)}
            </section>
          )}
        </div>
      )}
    </div>
  )
}
