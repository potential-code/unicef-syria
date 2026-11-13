import type { CohortId, Session } from '@shared/types'
import {
  BookOpen,
  CalendarCheck,
  CalendarClock,
  CalendarDays,
  CheckCircle2,
  List,
  MapPin,
  School,
  Ticket,
  UserRound,
  Users,
} from 'lucide-react'
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Reveal, Stagger, StaggerItem } from '@/components/motion'
import { EmptyState } from '@/components/shared/EmptyState'
import { StatCard } from '@/components/shared/StatCard'
import { Button } from '@/components/ui/button'
import { CENTRES, COHORTS, TRAINERS } from '@/data/orgs'
import { useLocalized } from '@/i18n'
import { useSessions } from '@/store/actions/sessions'
import { useMyYouth } from '@/store/hooks'
import { CareerHero } from '../components/CareerHero'
import { DemoRoomDialog } from '../components/cohort/DemoRoomDialog'
import { RestrictedNotice } from '../components/cohort/RestrictedNotice'
import { SessionCalendar } from '../components/cohort/SessionCalendar'
import { SessionCard } from '../components/cohort/SessionCard'
import { EventCard } from '../components/EventCard'
import { ViewToggle } from '../components/ViewToggle'
import { hashHref } from '../lib/links'
import { sessionTiming } from '../lib/session'

/** Y08 My Cohort and Sessions: assigned cohort sessions only, plus the public E01 event. */
export function CohortPage() {
  const { t } = useTranslation('career')
  const { l } = useLocalized()
  const youth = useMyYouth()
  const all = useSessions()
  const [view, setView] = useState<'list' | 'calendar'>('list')
  const [selected, setSelected] = useState<string>()
  const [room, setRoom] = useState<Session | null>(null)

  const mine = useMemo(
    () =>
      all
        .filter((s) => s.cohortId && youth.cohortIds.includes(s.cohortId))
        .sort((a, b) => a.start.localeCompare(b.start)),
    [all, youth.cohortIds],
  )
  const hidden = all.filter((s) => s.cohortId && !youth.cohortIds.includes(s.cohortId))
  const hiddenCohorts = [...new Set(hidden.map((s) => s.cohortId))].filter(
    (k): k is CohortId => !!k,
  )
  const cohorts = COHORTS.filter((c) => youth.cohortIds.includes(c.id))
  const publicEvents = all.filter((s) => s.public)
  const attended = mine.filter((s) => youth.attendance[s.id] === 'present').length
  const upcoming = mine.filter((s) => sessionTiming(s) === 'upcoming').length

  const pick = (id: string) => {
    setSelected(id)
    if (id === 'E01') return
    window.requestAnimationFrame(() =>
      document
        .getElementById(`session-${id}`)
        ?.scrollIntoView({ behavior: 'smooth', block: 'center' }),
    )
  }
  const shown = view === 'calendar' && selected ? mine.filter((s) => s.id === selected) : mine

  return (
    <div className="space-y-8">
      <CareerHero
        icon={CalendarCheck}
        eyebrow={t('cohort.eyebrow')}
        title={t('cohort.title')}
        body={t('cohort.intro')}
      >
        {cohorts.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {cohorts.map((c) => {
              const trainer = TRAINERS.find((x) => x.id === c.trainerId)
              const centre = CENTRES.find((x) => x.id === c.centreId)
              return (
                <div
                  key={c.id}
                  className="flex flex-wrap items-center gap-x-4 gap-y-1 rounded-xl bg-white/15 px-4 py-2.5 text-sm ring-1 ring-white/20"
                >
                  <span className="font-bold">{l(c.name)}</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="size-4" aria-hidden />
                    {l(centre?.name)}
                  </span>
                  <span className="flex items-center gap-1">
                    <UserRound className="size-4" aria-hidden />
                    {l(trainer?.name)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="size-4" aria-hidden />
                    {t('cohort.learners', { count: c.size })}
                  </span>
                </div>
              )
            })}
          </div>
        )}
      </CareerHero>

      {cohorts.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-3">
          <StatCard
            tone="blue"
            icon={CheckCircle2}
            label={t('cohort.stats.attended')}
            value={`${attended}/${mine.length}`}
            hint={t('cohort.stats.attendedHint', { total: mine.length })}
          />
          <StatCard
            tone="cyan"
            icon={CalendarClock}
            label={t('cohort.stats.upcoming')}
            value={upcoming}
            hint={t('cohort.stats.upcomingHint')}
          />
          <StatCard
            tone="yellow"
            icon={Ticket}
            label={t('cohort.stats.events')}
            value={publicEvents.length}
            hint={t('cohort.stats.eventsHint')}
          />
        </div>
      )}

      {cohorts.length === 0 ? (
        <EmptyState
          icon={Users}
          title={t('cohort.none.title')}
          body={t('cohort.none.body')}
          action={
            <div className="flex flex-wrap justify-center gap-2">
              <Button asChild className="rounded-full">
                <a href={hashHref('/youth/programmes')}>
                  <School className="size-4" aria-hidden />
                  {t('cohort.none.programmes')}
                </a>
              </Button>
              <Button asChild variant="outline" className="rounded-full">
                <a href={hashHref('/youth/library')}>
                  <BookOpen className="size-4" aria-hidden />
                  {t('cohort.none.cta')}
                </a>
              </Button>
            </div>
          }
        />
      ) : (
        <section aria-labelledby="sessions-heading" className="space-y-4">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 id="sessions-heading" className="text-xl">
                {t('cohort.sessionsTitle')}
              </h2>
              <p className="text-sm text-ink-soft">{t('cohort.sessionsBody')}</p>
            </div>
            <ViewToggle
              label={t('cohort.viewLabel')}
              value={view}
              onChange={(v) => {
                setView(v)
                setSelected(undefined)
              }}
              options={[
                { value: 'list', label: t('cohort.list'), icon: List },
                { value: 'calendar', label: t('cohort.calendar'), icon: CalendarDays },
              ]}
            />
          </div>
          {view === 'calendar' && (
            <Reveal>
              <SessionCalendar
                sessions={[...mine, ...publicEvents]}
                selected={selected}
                onSelect={pick}
              />
              <p className="mt-2 text-sm text-ink-soft">
                {selected ? t('cohort.calendarSelected') : t('cohort.calendarHint')}
              </p>
            </Reveal>
          )}
          {view === 'calendar' && selected && (
            <Button variant="ghost" className="rounded-full" onClick={() => setSelected(undefined)}>
              {t('cohort.showAll')}
            </Button>
          )}
          <Stagger className="grid gap-4 lg:grid-cols-2">
            {shown.map((s) => (
              <StaggerItem key={s.id}>
                <SessionCard
                  session={s}
                  youth={youth}
                  onJoin={setRoom}
                  highlight={selected === s.id}
                />
              </StaggerItem>
            ))}
          </Stagger>
          {mine.length === 0 && (
            <EmptyState
              icon={CalendarDays}
              title={t('cohort.noSessions.title')}
              body={t('cohort.noSessions.body')}
            />
          )}
        </section>
      )}

      {hidden.length > 0 && (
        <RestrictedNotice hiddenCount={hidden.length} hiddenCohorts={hiddenCohorts} />
      )}

      <section aria-labelledby="events-heading" className="space-y-3">
        <h2 id="events-heading" className="text-xl">
          {t('cohort.eventsTitle')}
        </h2>
        <EventCard youth={youth} />
      </section>

      <DemoRoomDialog session={room} youthName={youth.profile.name} onClose={() => setRoom(null)} />
    </div>
  )
}
