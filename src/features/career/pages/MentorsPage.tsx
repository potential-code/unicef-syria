import { CalendarCheck, Coins, HandHeart } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Stagger, StaggerItem } from '@/components/motion'
import { EmptyState } from '@/components/shared/EmptyState'
import { MENTORS } from '@/data/mentors'
import { balance } from '@/domain/points'
import { useBookings } from '@/store/actions/mentors'
import { useDb } from '@/store/db'
import { useMyYouth } from '@/store/hooks'
import { CareerHero } from '../components/CareerHero'
import { BookingItem } from '../components/mentors/BookingItem'
import { MentorCard } from '../components/mentors/MentorCard'
import { slotState } from '../lib/mentors'

/** Y10 human mentor directory and the learner's mentor sessions. */
export function MentorsPage() {
  const { t } = useTranslation('career')
  const youth = useMyYouth()
  const all = useBookings()
  const bookedSlots = useDb((db) => db.bookedSlots)
  const mine = all
    .filter((b) => b.youthId === youth.id)
    .slice()
    .reverse()

  return (
    <div className="space-y-10">
      <CareerHero
        icon={HandHeart}
        eyebrow={t('mentors.eyebrow')}
        title={t('mentors.title')}
        body={t('mentors.intro')}
        actions={
          <div className="flex items-center gap-3 rounded-2xl bg-white px-5 py-3 text-navy shadow-sm">
            <Coins className="size-7 text-orange" aria-hidden />
            <div>
              <p className="text-2xl leading-none font-bold tabular-nums">{balance(youth)}</p>
              <p className="text-xs font-semibold">{t('mentors.balance')}</p>
            </div>
          </div>
        }
      >
        <p className="text-sm text-white/85">{t('mentors.rules')}</p>
      </CareerHero>

      <Stagger className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {MENTORS.map((m) => (
          <StaggerItem key={m.id} className="h-full">
            <MentorCard mentor={m} youth={youth} slot={slotState(m, youth, all, bookedSlots)} />
          </StaggerItem>
        ))}
      </Stagger>

      <section
        id="my-sessions"
        aria-labelledby="my-sessions-heading"
        className="scroll-mt-24 space-y-4"
      >
        <h2 id="my-sessions-heading" className="text-2xl">
          {t('mentors.mySessions')}
        </h2>
        {mine.length === 0 ? (
          <EmptyState
            icon={CalendarCheck}
            title={t('mentors.noSessions.title')}
            body={t('mentors.noSessions.body')}
          />
        ) : (
          <div className="space-y-4">
            {mine.map((b) => (
              <BookingItem key={b.id} booking={b} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
