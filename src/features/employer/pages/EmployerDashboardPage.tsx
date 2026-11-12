import { Link } from '@tanstack/react-router'
import { Briefcase, CalendarClock, Handshake, Inbox, Plus, Star, Users } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Reveal, Stagger, StaggerItem } from '@/components/motion'
import { EmptyState } from '@/components/shared/EmptyState'
import { StatCard } from '@/components/shared/StatCard'
import { Button } from '@/components/ui/button'
import { ApplicationsTable } from '../components/ApplicationsTable'
import { OpportunitySnapshot } from '../components/OpportunitySnapshot'
import { OrgHero } from '../components/OrgHero'
import { FINAL_STAGES, PENDING_INTERVIEW, reachedShortlist } from '../config'
import { useOrgScope } from '../hooks/use-org-scope'

/** Employer dashboard (brief §16 E01): own organisation only. */
export function EmployerDashboardPage() {
  const { t } = useTranslation('employer')
  const scope = useOrgScope()
  const { opportunities, applications, outcomes } = scope
  const open = opportunities.filter((o) => o.status === 'open')
  const placements = outcomes.filter(
    (o) => (o.type === 'job' || o.type === 'internship') && o.confirmed,
  )
  const freelanceDone = outcomes.filter((o) => o.type === 'freelanceCompleted').length
  const active = applications.filter((a) => !FINAL_STAGES.includes(a.stage))
  const stats = [
    { key: 'open', value: open.length, icon: Briefcase, to: '/employer/opportunities' },
    { key: 'applicants', value: applications.length, icon: Users, to: '/employer/applications' },
    {
      key: 'shortlisted',
      value: applications.filter(reachedShortlist).length,
      icon: Star,
      to: '/employer/applications',
    },
    {
      key: 'interviews',
      value: applications.filter((a) => PENDING_INTERVIEW.includes(a.stage)).length,
      icon: CalendarClock,
      to: '/employer/applications',
    },
    { key: 'placements', value: placements.length, icon: Handshake, to: '/employer/placements' },
  ] as const

  return (
    <div>
      <OrgHero
        scope={scope}
        title={t('dashboard.title')}
        body={t('dashboard.body')}
        actions={
          <Button
            asChild
            variant="secondary"
            className="rounded-full bg-white text-navy hover:bg-sky-100"
          >
            <Link to="/employer/opportunities/new">
              <Plus className="size-4" aria-hidden />
              {t('opps.create')}
            </Link>
          </Button>
        }
      />

      <Stagger className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-5">
        {stats.map((s) => (
          <StaggerItem key={s.key}>
            <Link
              to={s.to}
              className="lift block rounded-2xl focus-visible:outline-2 focus-visible:outline-blue"
            >
              <StatCard
                label={t(`dashboard.stats.${s.key}`)}
                value={s.value}
                icon={s.icon}
                hint={t(`dashboard.hints.${s.key}`)}
                className="h-full"
              />
            </Link>
          </StaggerItem>
        ))}
      </Stagger>
      <p className="mt-3 text-xs text-ink-soft">
        {t('dashboard.freelanceNote', { count: freelanceDone })}
      </p>

      <div className="mt-8 grid gap-6 xl:grid-cols-[1fr_22rem]">
        <Reveal as="section">
          <div className="mb-3 flex items-center justify-between gap-3">
            <h2 className="text-xl">{t('dashboard.needsAction')}</h2>
            <Button asChild variant="ghost" size="sm" className="text-blue">
              <Link to="/employer/applications">{t('common:viewAll')}</Link>
            </Button>
          </div>
          {applications.length === 0 ? (
            <EmptyState
              icon={Inbox}
              title={t('empty.noApplicants.title')}
              body={t('empty.noApplicants.body')}
              action={
                <Button asChild className="rounded-full">
                  <Link to="/employer/opportunities/new">{t('opps.create')}</Link>
                </Button>
              }
            />
          ) : active.length === 0 ? (
            <EmptyState
              icon={Inbox}
              title={t('dashboard.allClear.title')}
              body={t('dashboard.allClear.body')}
            />
          ) : (
            <ApplicationsTable apps={active} opportunities={opportunities} />
          )}
        </Reveal>
        <Reveal as="section" delay={0.1}>
          <h2 className="mb-3 text-xl">{t('dashboard.yourOpps')}</h2>
          <OpportunitySnapshot opportunities={opportunities} applications={applications} />
        </Reveal>
      </div>
    </div>
  )
}
