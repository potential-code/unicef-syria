import type { Session, Youth } from '@shared/types'
import {
  CalendarClock,
  CalendarPlus,
  CalendarX,
  ClipboardCheck,
  UserCheck,
  UserX,
} from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Stagger, StaggerItem } from '@/components/motion'
import { EmptyState } from '@/components/shared/EmptyState'
import { PageHeader } from '@/components/shared/PageHeader'
import { StatCard } from '@/components/shared/StatCard'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { nowMs } from '@/lib/clock'
import { AbsenceList } from '../components/AbsenceList'
import { NextSessionCard } from '../components/NextSessionCard'
import { SessionFormDialog } from '../components/SessionFormDialog'
import { SessionRow } from '../components/SessionRow'
import { summarise, useTrainerScope } from '../hooks/useTrainerScope'

/** T03 Sessions and attendance for the trainer's cohorts only. */
export function TrainerSessionsPage() {
  const { t } = useTranslation('trainer')
  const { sessions, learners, cohortIds, stats } = useTrainerScope()
  const sum = summarise(stats)
  const [creating, setCreating] = useState(false)
  const sorted = [...sessions].sort((a, b) => a.start.localeCompare(b.start))
  const upcoming = sorted.filter((s) => Date.parse(s.end) >= nowMs())
  const past = sorted.filter((s) => Date.parse(s.end) < nowMs()).reverse()

  const rosterOf = (s: Session) =>
    learners.filter((y) => s.cohortId && y.cohortIds.includes(s.cohortId))
  const markedOf = (s: Session) =>
    rosterOf(s).filter((y) => y.attendance[s.id as keyof Youth['attendance']]).length
  const toMark = past.filter((s) => markedOf(s) < rosterOf(s).length).length
  const [next, ...later] = upcoming
  const meta = (s: Session) => {
    const total = rosterOf(s).length
    const marked = markedOf(s)
    return (
      <span className="flex items-center gap-2">
        <Progress
          value={total ? (marked / total) * 100 : 0}
          className="h-1.5 w-14 bg-sky-100"
          aria-hidden
        />
        <span className="tabular-nums">{t('sessions.marked', { marked, total })}</span>
      </span>
    )
  }
  const group = (title: string, list: Session[]) => (
    <section className="space-y-3">
      <h2 className="flex items-center gap-2 text-xl text-navy">
        {title}
        <span className="rounded-full bg-sky-100 px-2 py-0.5 text-xs font-bold text-navy tabular-nums">
          {list.length}
        </span>
      </h2>
      {list.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-cyan/40 bg-sky-50/70 p-4 text-sm text-ink-soft">
          {t('sessions.noneInGroup')}
        </p>
      ) : (
        <Stagger className="space-y-2">
          {list.map((s) => (
            <StaggerItem key={s.id}>
              <SessionRow session={s} meta={meta(s)} />
            </StaggerItem>
          ))}
        </Stagger>
      )}
    </section>
  )

  return (
    <div className="space-y-8">
      <PageHeader
        title={t('sessions.title')}
        description={t('sessions.subtitle')}
        actions={
          <Button className="rounded-full" onClick={() => setCreating(true)}>
            <CalendarPlus className="size-4" aria-hidden />
            {t('sessions.new')}
          </Button>
        }
      />
      {sessions.length === 0 ? (
        <EmptyState icon={CalendarX} title={t('sessions.empty')} body={t('sessions.emptyBody')} />
      ) : (
        <>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
              tone="blue"
              icon={CalendarClock}
              label={t('sessions.stat.upcoming')}
              value={upcoming.length}
              hint={t('sessions.stat.upcomingHint')}
            />
            <StatCard
              tone="yellow"
              icon={ClipboardCheck}
              label={t('sessions.stat.toMark')}
              value={toMark}
              hint={t('sessions.stat.toMarkHint')}
            />
            <StatCard
              tone="cyan"
              icon={UserCheck}
              label={t('sessions.stat.rate')}
              value={
                sum.attendanceRate === null ? t('sessions.stat.none') : `${sum.attendanceRate}%`
              }
              hint={t('sessions.stat.rateHint', { excused: sum.excused })}
            />
            <StatCard
              tone="navy"
              icon={UserX}
              label={t('sessions.stat.absent')}
              value={sum.absent}
              hint={t('sessions.stat.absentHint')}
            />
          </div>
          <div className="grid gap-8 lg:grid-cols-2 [&>*]:min-w-0">
            <div className="space-y-6">
              {next && <NextSessionCard session={next} roster={rosterOf(next).length} />}
              {(!next || later.length > 0) && group(t('sessions.later'), later)}
            </div>
            <div className="space-y-6">
              {group(t('sessions.past'), past)}
              <AbsenceList learners={learners} sessions={past} />
            </div>
          </div>
        </>
      )}
      <p className="text-xs text-ink-soft">{t('sessions.sampleNote')}</p>
      {creating && (
        <SessionFormDialog open={creating} onOpenChange={setCreating} cohortIds={cohortIds} />
      )}
    </div>
  )
}
