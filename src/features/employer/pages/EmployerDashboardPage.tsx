import { Link } from '@tanstack/react-router'
import {
  ArrowRight,
  Briefcase,
  CalendarClock,
  Handshake,
  Inbox,
  Plus,
  Star,
  Users,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Reveal, Stagger, StaggerItem } from '@/components/motion'
import { EmptyState } from '@/components/shared/EmptyState'
import { STAT_TONES, StatCard } from '@/components/shared/StatCard'
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
          <Button asChild className="rounded-full bg-white text-navy shadow-md hover:bg-sky-100">
            <Link to="/employer/opportunities/new">
              <Plus className="size-4" aria-hidden />
              {t('opps.create')}
            </Link>
          </Button>
        }
      />

      <div>
        <Stagger className="grid grid-cols-2 gap-3 max-sm:[&>*:last-child:nth-child(odd)]:col-span-2 sm:grid-cols-[repeat(auto-fit,minmax(12.5rem,1fr))] sm:gap-4">
          {stats.map((s, i) => (
            <StaggerItem key={s.key} className="h-full">
              <StatCard
                label={t(`dashboard.stats.${s.key}`)}
                value={s.value}
                icon={s.icon}
                hint={t(`dashboard.hints.${s.key}`)}
                tone={STAT_TONES[i % STAT_TONES.length]}
                to={s.to}
                className="h-full"
              />
            </StaggerItem>
          ))}
        </Stagger>
        <p className="mt-3 text-xs text-ink-soft">
          {t('dashboard.freelanceNote', { count: freelanceDone })}
        </p>
      </div>

      <Reveal as="section" className="mt-10">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h2 className="min-w-0 flex-1 text-xl text-navy">{t('dashboard.needsAction')}</h2>
          <Button asChild variant="ghost" size="sm" className="shrink-0 text-blue">
            <Link to="/employer/applications">
              {t('common:viewAll')}
              <ArrowRight className="size-4 rtl-mirror" aria-hidden />
            </Link>
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
      <Reveal as="section" className="mt-10" delay={0.1}>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h2 className="min-w-0 flex-1 text-xl text-navy">{t('dashboard.yourOpps')}</h2>
          <Button asChild variant="ghost" size="sm" className="shrink-0 text-blue">
            <Link to="/employer/opportunities">
              {t('common:viewAll')}
              <ArrowRight className="size-4 rtl-mirror" aria-hidden />
            </Link>
          </Button>
        </div>
        <OpportunitySnapshot opportunities={opportunities} applications={applications} />
      </Reveal>
    </div>
  )
}
