import {
  Building2,
  CalendarClock,
  ClipboardList,
  FolderOpen,
  Pencil,
  Users,
  Video,
} from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { AccessDenied } from '@/components/shared/AccessDenied'
import { PageHeader } from '@/components/shared/PageHeader'
import { StatusBadge } from '@/components/shared/StatusBadge'
import { Button } from '@/components/ui/button'
import { CENTRES, COHORTS, TRAINERS } from '@/data/orgs'
import { formatDate, formatTime, useLocalized } from '@/i18n'
import { parseSessionDetails, useSessionDetailsRaw } from '@/store/actions/work-extra'
import { AttendanceRegister } from '../components/AttendanceRegister'
import { SessionFormDialog } from '../components/SessionFormDialog'
import { SessionNote } from '../components/SessionNote'
import { useTrainerScope } from '../hooks/useTrainerScope'

/** One session: delivery details, attendance register and follow-up note. Other cohorts → access denied. */
export function TrainerSessionDetailPage({ sessionId }: { sessionId: string }) {
  const { t } = useTranslation('trainer')
  const { l, lang } = useLocalized()
  const { sessions, learners, cohortIds } = useTrainerScope()
  const details = parseSessionDetails(useSessionDetailsRaw(sessionId))
  const [editing, setEditing] = useState(false)
  const session = sessions.find((s) => s.id === sessionId)
  const crumbs = [
    { label: t('sessions.title'), to: '/trainer/sessions' },
    { label: session ? l(session.title) : sessionId },
  ]

  if (!session) {
    return (
      <div className="space-y-6">
        <PageHeader title={t('sessions.deniedTitle')} crumbs={crumbs} />
        <AccessDenied />
      </div>
    )
  }
  const cohort = COHORTS.find((c) => c.id === session.cohortId)
  const centre = CENTRES.find((c) => c.id === session.centreId)
  const trainer = TRAINERS.find((x) => x.id === session.trainerId)
  const roster = learners
    .filter((y) => session.cohortId && y.cohortIds.includes(session.cohortId))
    .sort((a, b) => a.profile.name.localeCompare(b.profile.name))
  const where =
    session.format === 'online'
      ? details.link || t('detail.demoRoom')
      : [l(centre?.name), details.room].filter(Boolean).join(' · ')
  const facts = [
    {
      icon: CalendarClock,
      label: t('detail.when'),
      value: `${formatDate(session.start, lang, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}, ${formatTime(session.start, lang)}–${formatTime(session.end, lang)} ${t('ui.syriaTime')}`,
    },
    {
      icon: session.format === 'online' ? Video : Building2,
      label: t('detail.where'),
      value: where,
    },
    {
      icon: Users,
      label: t('detail.cohort'),
      value: `${l(cohort?.name)} · ${l(trainer?.name)} · ${t('detail.capacity', { count: session.capacity })}`,
    },
    {
      icon: FolderOpen,
      label: t('detail.resources'),
      value: details.resources || t('detail.noResources'),
    },
    {
      icon: ClipboardList,
      label: t('detail.assignment'),
      value: details.assignment || l(session.purpose),
    },
  ]

  return (
    <div className="space-y-6">
      <PageHeader
        title={`${session.id} · ${l(session.title)}`}
        crumbs={crumbs}
        eyebrow={
          <StatusBadge tone={session.format === 'online' ? 'info' : 'brand'}>
            {t(`common:format.${session.format}`)}
          </StatusBadge>
        }
        actions={
          <Button variant="outline" className="rounded-full" onClick={() => setEditing(true)}>
            <Pencil className="size-4" aria-hidden />
            {t('detail.edit')}
          </Button>
        }
      />
      <dl className="card grid gap-x-6 gap-y-4 p-5 sm:grid-cols-2 sm:p-6 xl:grid-cols-3">
        {facts.map(({ icon: Icon, label, value }) => (
          <div key={label} className="min-w-0">
            <dt className="flex items-center gap-1.5 text-xs font-semibold text-ink-soft">
              <Icon className="size-4 shrink-0 text-blue" aria-hidden />
              {label}
            </dt>
            <dd className="mt-1 text-sm font-medium break-words text-ink">{value}</dd>
          </div>
        ))}
      </dl>
      <div className="grid gap-6 xl:grid-cols-[1fr_20rem] [&>*]:min-w-0">
        <AttendanceRegister session={session} learners={roster} />
        <SessionNote sessionId={session.id} />
      </div>
      {editing && (
        <SessionFormDialog
          open={editing}
          onOpenChange={setEditing}
          session={session}
          details={details}
          cohortIds={cohortIds}
        />
      )}
    </div>
  )
}
