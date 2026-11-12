import { Link } from '@tanstack/react-router'
import {
  ArrowRight,
  CalendarCheck,
  ClipboardCheck,
  GraduationCap,
  LifeBuoy,
  UserCheck,
  Users,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Stagger, StaggerItem } from '@/components/motion'
import { PageHeader } from '@/components/shared/PageHeader'
import { STAT_TONES } from '@/components/shared/StatCard'
import { Button } from '@/components/ui/button'
import { useLocalized } from '@/i18n'
import { nowMs } from '@/lib/clock'
import { CohortBanner } from '../components/CohortBanner'
import { FollowUpPanel } from '../components/FollowUpPanel'
import { GradingPanel } from '../components/GradingPanel'
import { MetricTile } from '../components/MetricTile'
import { PanelHeader } from '../components/PanelHeader'
import { UpcomingSessions } from '../components/UpcomingSessions'
import { summarise, useTrainerScope } from '../hooks/useTrainerScope'

/** Trainer home with the performance panel (brief §17). Every metric opens its roster view. */
export function TrainerDashboardPage() {
  const { t } = useTranslation('trainer')
  const { l } = useLocalized()
  const { me, cohorts, sessions, stats, applicants } = useTrainerScope()
  const sum = summarise(stats)
  const upcoming = [...sessions]
    .filter((s) => Date.parse(s.end) >= nowMs())
    .sort((a, b) => a.start.localeCompare(b.start))
  const pendingApps = applicants.filter(
    (y) =>
      y.trainingApplication?.status === 'pending' || y.trainingApplication?.status === 'needsInfo',
  ).length
  const metrics = [
    {
      filter: 'all',
      icon: Users,
      label: t('metrics.participants'),
      value: sum.learners,
      hint: t('metrics.participantsHint'),
    },
    {
      filter: 'attendance',
      icon: CalendarCheck,
      label: t('metrics.attendance'),
      value: sum.attendanceRate === null ? '–' : `${sum.attendanceRate}%`,
      hint: t('metrics.attendanceHint', {
        present: sum.present,
        absent: sum.absent,
        excused: sum.excused,
      }),
    },
    {
      filter: 'completion',
      icon: GraduationCap,
      label: t('metrics.completion'),
      value: `${sum.completionRate}%`,
      hint: t('metrics.completionHint', { done: sum.completed, total: sum.courseSlots }),
    },
    {
      filter: 'grading',
      icon: ClipboardCheck,
      label: t('metrics.grading'),
      value: sum.pendingGrading,
      hint: t('metrics.gradingHint'),
    },
    {
      filter: 'followUp',
      icon: LifeBuoy,
      label: t('metrics.followUp'),
      value: sum.followUp,
      hint: t('metrics.followUpHint'),
    },
  ] as const

  return (
    <div className="space-y-8">
      <PageHeader
        title={t('dashboard.title', { name: l(me.name).split(' ')[0] })}
        description={t('dashboard.subtitle')}
        actions={
          <Button asChild className="rounded-full">
            <Link to="/trainer/sessions">
              <CalendarCheck className="size-4" aria-hidden />
              {t('dashboard.recordAttendance')}
            </Link>
          </Button>
        }
      />
      <CohortBanner cohorts={cohorts} next={upcoming[0]} named={stats.length} />

      <section aria-labelledby="perf">
        <div className="mb-4 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <h2 id="perf" className="text-xl text-navy">
            {t('dashboard.panel')}
          </h2>
          <p className="text-xs text-ink-soft">{t('dashboard.panelNote')}</p>
        </div>
        <Stagger className="grid grid-cols-2 gap-3 max-sm:[&>*:last-child:nth-child(odd)]:col-span-2 sm:grid-cols-[repeat(auto-fit,minmax(12.5rem,1fr))] sm:gap-4">
          {metrics.map((m, i) => (
            <StaggerItem key={m.filter} className="h-full">
              <MetricTile {...m} tone={STAT_TONES[i % STAT_TONES.length] ?? 'blue'} />
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <div className="grid gap-6 lg:grid-cols-2 [&>*]:min-w-0">
        <FollowUpPanel stats={stats} />
        <GradingPanel stats={stats} />
      </div>

      <div className="grid gap-6 lg:grid-cols-[2fr_1fr] [&>*]:min-w-0">
        <UpcomingSessions sessions={upcoming.slice(0, 4)} />
        <section className="card flex flex-col p-5 sm:p-6">
          <PanelHeader icon={UserCheck} title={t('dashboard.appsTitle')} count={pendingApps} />
          <p className="mt-2 text-sm text-ink-soft">
            {t('dashboard.appsBody', { count: pendingApps })}
          </p>
          <div className="mt-auto pt-5">
            <Button asChild size="sm" className="rounded-full">
              <Link to="/trainer/applications">
                {t('dashboard.openApps')}
                <ArrowRight className="size-4 rtl-mirror" aria-hidden />
              </Link>
            </Button>
          </div>
        </section>
      </div>
    </div>
  )
}
