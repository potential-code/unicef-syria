import type { Mentor, Youth } from '@shared/types'
import { Link } from '@tanstack/react-router'
import { ArrowRight, CalendarClock, Coins, GraduationCap, Languages, Target } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Avatar } from '@/components/shared/Avatar'
import { StatusBadge } from '@/components/shared/StatusBadge'
import { Button } from '@/components/ui/button'
import { formatDate, formatTime, useLocalized } from '@/i18n'
import { hasAllocation, type SlotState } from '../../lib/mentors'
import { SampleProfileTag } from './SampleProfileTag'

const SLOT_TONE = { available: 'success', mine: 'brand', taken: 'neutral' } as const

/** Directory card: sample label, focus, languages, slot, cost or allocation, trainer badge. */
export function MentorCard({
  mentor: m,
  youth,
  slot,
}: {
  mentor: Mentor
  youth: Youth
  slot: SlotState
}) {
  const { t } = useTranslation('career')
  const { l, lang } = useLocalized()
  const allocation = hasAllocation(youth, m)
  return (
    <article className="lift flex h-full flex-col rounded-2xl border bg-white p-5 shadow-sm">
      <div className="flex items-start gap-4">
        <Avatar src={m.image} name={l(m.name)} size={64} className="ring-4 ring-sky-100" />
        <div className="min-w-0">
          <SampleProfileTag />
          <h3 className="mt-1.5 text-lg">{l(m.name)}</h3>
          <p className="text-sm font-semibold text-blue">{l(m.title)}</p>
          {m.trainerId && (
            <StatusBadge
              tone="info"
              className="mt-1.5"
              icon={<GraduationCap className="size-3.5" aria-hidden />}
            >
              {t('mentors.alsoTrainer')}
            </StatusBadge>
          )}
        </div>
      </div>
      <dl className="mt-4 space-y-2 text-sm">
        <div className="flex gap-2">
          <Target className="mt-0.5 size-4 shrink-0 text-blue" aria-hidden />
          <dt className="sr-only">{t('mentors.focus')}</dt>
          <dd>{l(m.focus)}</dd>
        </div>
        <div className="flex gap-2">
          <Languages className="mt-0.5 size-4 shrink-0 text-blue" aria-hidden />
          <dt className="sr-only">{t('mentors.languages')}</dt>
          <dd>{l(m.languages)}</dd>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <CalendarClock className="size-4 shrink-0 text-blue" aria-hidden />
          <dt className="sr-only">{t('mentors.slot')}</dt>
          <dd>
            {formatDate(m.slot.start, lang, { weekday: 'short', day: 'numeric', month: 'short' })},{' '}
            {t('cohort.timeRange', {
              start: formatTime(m.slot.start, lang),
              end: formatTime(m.slot.end, lang),
            })}
          </dd>
          <StatusBadge tone={SLOT_TONE[slot]}>{t(`mentors.slotState.${slot}`)}</StatusBadge>
        </div>
        <div className="flex flex-wrap gap-2">
          <Coins className="mt-0.5 size-4 shrink-0 text-blue" aria-hidden />
          <dt className="sr-only">{t('mentors.access')}</dt>
          <dd>
            {allocation
              ? t('mentors.costOrAllocation', { count: m.cost })
              : t('mentors.costPoints', { count: m.cost })}
          </dd>
        </div>
      </dl>
      {allocation && (
        <p className="mt-3 rounded-xl bg-success-soft px-3 py-2 text-sm font-semibold text-success">
          {t('mentors.included')}
        </p>
      )}
      <div className="mt-auto pt-4">
        <Button
          asChild
          className="w-full rounded-full"
          variant={slot === 'available' ? 'default' : 'outline'}
        >
          <Link to="/youth/mentors/$mentorId" params={{ mentorId: m.id }}>
            {slot === 'available' ? t('mentors.viewAndBook') : t('mentors.viewProfile')}
            <ArrowRight className="size-4 rtl-mirror" aria-hidden />
          </Link>
        </Button>
      </div>
    </article>
  )
}
