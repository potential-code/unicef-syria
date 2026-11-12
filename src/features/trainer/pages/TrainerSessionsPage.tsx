import type { Session, Youth } from '@shared/types'
import { CalendarPlus, CalendarX } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Stagger, StaggerItem } from '@/components/motion'
import { EmptyState } from '@/components/shared/EmptyState'
import { PageHeader } from '@/components/shared/PageHeader'
import { Button } from '@/components/ui/button'
import { nowMs } from '@/lib/clock'
import { SessionFormDialog } from '../components/SessionFormDialog'
import { SessionRow } from '../components/SessionRow'
import { useTrainerScope } from '../hooks/useTrainerScope'

/** T03 Sessions and attendance for the trainer's cohorts only. */
export function TrainerSessionsPage() {
  const { t } = useTranslation('trainer')
  const { sessions, learners, cohortIds } = useTrainerScope()
  const [creating, setCreating] = useState(false)
  const sorted = [...sessions].sort((a, b) => a.start.localeCompare(b.start))
  const upcoming = sorted.filter((s) => Date.parse(s.end) >= nowMs())
  const past = sorted.filter((s) => Date.parse(s.end) < nowMs()).reverse()

  const meta = (s: Session) => {
    const roster = learners.filter((y) => s.cohortId && y.cohortIds.includes(s.cohortId))
    const marked = roster.filter((y) => y.attendance[s.id as keyof Youth['attendance']]).length
    return (
      <span className="tabular-nums">{t('sessions.marked', { marked, total: roster.length })}</span>
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
        <div className="grid gap-8 lg:grid-cols-2 [&>*]:min-w-0">
          {group(t('sessions.upcoming'), upcoming)}
          {group(t('sessions.past'), past)}
        </div>
      )}
      <p className="text-xs text-ink-soft">{t('sessions.sampleNote')}</p>
      {creating && (
        <SessionFormDialog open={creating} onOpenChange={setCreating} cohortIds={cohortIds} />
      )}
    </div>
  )
}
