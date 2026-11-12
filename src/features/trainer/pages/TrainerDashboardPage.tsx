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
import { Button } from '@/components/ui/button'
import { useLocalized } from '@/i18n'
import { nowMs } from '@/lib/clock'
import { CohortBanner } from '../components/CohortBanner'
import { FollowUpPanel } from '../components/FollowUpPanel'
import { GradingPanel } from '../components/GradingPanel'
import { MetricTile } from '../components/MetricTile'
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

  return (
    <div className="space-y-6">
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
        <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
          <h2 id="perf" className="text-xl">
            {t('dashboard.panel')}
          </h2>
          <p className="text-xs text-ink-soft">{t('dashboard.panelNote')}</p>
        </div>
        <Stagger className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
          <StaggerItem>
            <MetricTile
              filter="all"
              icon={Users}
              label={t('metrics.participants')}
              value={sum.learners}
              hint={t('metrics.participantsHint')}
            />
          </StaggerItem>
          <StaggerItem>
            <MetricTile
              filter="attendance"
              icon={CalendarCheck}
              label={t('metrics.attendance')}
              value={sum.attendanceRate === null ? '–' : `${sum.attendanceRate}%`}
              hint={t('metrics.attendanceHint', {
                present: sum.present,
                absent: sum.absent,
                excused: sum.excused,
              })}
            />
          </StaggerItem>
          <StaggerItem>
            <MetricTile
              filter="completion"
              icon={GraduationCap}
              label={t('metrics.completion')}
              value={`${sum.completionRate}%`}
              hint={t('metrics.completionHint', { done: sum.completed, total: sum.courseSlots })}
            />
          </StaggerItem>
          <StaggerItem>
            <MetricTile
              filter="grading"
              icon={ClipboardCheck}
              label={t('metrics.grading')}
              value={sum.pendingGrading}
              hint={t('metrics.gradingHint')}
              alert={sum.pendingGrading > 0}
            />
          </StaggerItem>
          <StaggerItem>
            <MetricTile
              filter="followUp"
              icon={LifeBuoy}
              label={t('metrics.followUp')}
              value={sum.followUp}
              hint={t('metrics.followUpHint')}
              alert={sum.followUp > 0}
            />
          </StaggerItem>
        </Stagger>
      </section>

      <div className="grid gap-6 lg:grid-cols-2 [&>*]:min-w-0">
        <FollowUpPanel stats={stats} />
        <GradingPanel stats={stats} />
      </div>

      <div className="grid gap-6 lg:grid-cols-[2fr_1fr] [&>*]:min-w-0">
        <UpcomingSessions sessions={upcoming.slice(0, 4)} />
        <section className="flex flex-col rounded-2xl border bg-sky-50 p-5">
          <span className="flex size-10 items-center justify-center rounded-xl bg-white text-blue shadow-sm">
            <UserCheck className="size-5" aria-hidden />
          </span>
          <h2 className="mt-3 text-lg">{t('dashboard.appsTitle')}</h2>
          <p className="mt-1 text-sm text-ink-soft">
            {t('dashboard.appsBody', { count: pendingApps })}
          </p>
          <Button asChild variant="outline" size="sm" className="mt-auto self-start rounded-full">
            <Link to="/trainer/applications">
              {t('dashboard.openApps')}
              <ArrowRight className="size-4 rtl-mirror" aria-hidden />
            </Link>
          </Button>
        </section>
      </div>
    </div>
  )
}
