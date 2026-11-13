import type { Cohort, Youth } from '@shared/types'
import { Link } from '@tanstack/react-router'
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock,
  MapPin,
  Sparkles,
  Users,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Motif } from '@/components/brand'
import { Avatar } from '@/components/shared/Avatar'
import { SmartImage } from '@/components/shared/SmartImage'
import { StatusBadge, type Tone } from '@/components/shared/StatusBadge'
import { Button } from '@/components/ui/button'
import { CENTRES, PROGRAMMES } from '@/data/orgs'
import { PERSONA_BY_ID } from '@/data/personas'
import { formatDate, useLocalized } from '@/i18n'
import { cn } from '@/lib/utils'
import { ApplyDialog } from './ApplyDialog'

const STATUS_TONE: Record<string, Tone> = {
  pending: 'info',
  needsInfo: 'notice',
  accepted: 'success',
  waitlisted: 'notice',
  notSelected: 'neutral',
}

/** One centre programme intake with its status for this learner and an Apply action. */
export function ProgrammeCard({
  cohort,
  youth,
  start,
  placesLeft,
  sessions,
  recommended,
}: {
  cohort: Cohort
  youth: Youth
  start: string
  placesLeft: number
  sessions: number
  recommended: boolean
}) {
  const { t } = useTranslation('career')
  const { l, lang } = useLocalized()
  const programme = PROGRAMMES.find((p) => p.id === cohort.programmeId)
  const centre = CENTRES.find((c) => c.id === cohort.centreId)
  const trainer = PERSONA_BY_ID[cohort.trainerId]
  const app = youth.trainingApplication
  const mine = app?.programmeId === cohort.programmeId
  const inClass = youth.cohortIds.includes(cohort.id)
  const elsewhere = !!app && !mine && app.status !== 'notSelected'
  if (!programme || !centre) return null
  return (
    <article
      className={cn(
        'card card-hover relative flex flex-col overflow-hidden',
        recommended && 'ring-2 ring-blue',
      )}
    >
      <div className="relative h-40 overflow-hidden">
        <SmartImage src={centre.image} alt="" className="size-full" />
        <div className="absolute inset-0 bg-linear-to-t from-navy/80 via-navy/20 to-transparent" />
        {recommended && (
          <span className="absolute start-3 top-3 inline-flex items-center gap-1 rounded-full bg-yellow px-2.5 py-1 text-xs font-bold text-ink shadow-md">
            <Sparkles className="size-3.5" aria-hidden />
            {t('programmes.recommended')}
          </span>
        )}
        <div className="absolute inset-x-4 bottom-3 text-white">
          <p className="text-xs font-semibold text-white/85">
            {t(`common:routes.${programme.route}`)}
          </p>
          <h2 className="text-xl text-white">{l(programme.name)}</h2>
        </div>
      </div>
      <div className="relative flex flex-1 flex-col gap-4 p-5">
        <Motif variant="corner" className="text-blue/[0.06]" />
        <ul className="relative space-y-2 text-sm">
          <li className="flex items-center gap-2">
            <MapPin className="size-4 shrink-0 text-blue" aria-hidden />
            {l(centre.name)}
          </li>
          <li className="flex items-center gap-2">
            <CalendarDays className="size-4 shrink-0 text-blue" aria-hidden />
            {t('programmes.starts', { date: formatDate(start, lang) })} ·{' '}
            {t('programmes.sessions', { count: sessions })}
          </li>
          <li className="flex items-center gap-2">
            <Users className="size-4 shrink-0 text-blue" aria-hidden />
            {t('programmes.places', { left: placesLeft, total: cohort.size })}
          </li>
        </ul>
        <div className="relative flex items-center gap-3 rounded-xl bg-sky-50 p-3">
          <Avatar src={trainer?.image} name={trainer ? l(trainer.name) : ''} size={36} />
          <div className="min-w-0 text-sm">
            <p className="font-semibold">{trainer ? l(trainer.name) : ''}</p>
            <p className="text-xs text-ink-soft">{t('programmes.trainer')}</p>
          </div>
        </div>
        <div className="relative mt-auto flex flex-wrap items-center gap-2 border-t pt-4">
          {inClass ? (
            <>
              <StatusBadge tone="success" icon={<CheckCircle2 className="size-3.5" aria-hidden />}>
                {youth.graduated
                  ? t('programmes.status.graduated')
                  : t('programmes.status.inClass', { cohort: cohort.id })}
              </StatusBadge>
              <Button asChild size="sm" variant="outline" className="ms-auto rounded-full">
                <Link to="/youth/cohort">
                  {t('programmes.openClass')}
                  <ArrowRight className="size-4 rtl-mirror" aria-hidden />
                </Link>
              </Button>
            </>
          ) : mine && app ? (
            <>
              <StatusBadge
                tone={STATUS_TONE[app.status] ?? 'neutral'}
                icon={<Clock className="size-3.5" aria-hidden />}
              >
                {t(`programmes.status.${app.status}`)}
              </StatusBadge>
              <p className="w-full text-xs text-ink-soft">
                {t(`programmes.statusHint.${app.status}`)}
              </p>
            </>
          ) : elsewhere ? (
            <p className="text-xs text-ink-soft">{t('programmes.oneAtATime')}</p>
          ) : (
            <ApplyDialog youthId={youth.id} programmeId={programme.id} title={l(programme.name)} />
          )}
        </div>
      </div>
    </article>
  )
}
