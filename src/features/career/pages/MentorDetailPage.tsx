import type { MentorId } from '@shared/types'
import { Link } from '@tanstack/react-router'
import { GraduationCap, HandHeart, Languages, ShieldCheck, Target } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Motif } from '@/components/brand'
import { Reveal } from '@/components/motion'
import { Avatar } from '@/components/shared/Avatar'
import { EmptyState } from '@/components/shared/EmptyState'
import { Button } from '@/components/ui/button'
import { MENTORS } from '@/data/mentors'
import { TRAINERS } from '@/data/orgs'
import { usePageTitle } from '@/hooks/use-page-title'
import { useLocalized } from '@/i18n'
import { useBookings } from '@/store/actions/mentors'
import { useDb } from '@/store/db'
import { useMyYouth } from '@/store/hooks'
import { BookingForm } from '../components/mentors/BookingForm'
import { SampleProfileTag } from '../components/mentors/SampleProfileTag'
import { slotState } from '../lib/mentors'

/** Mentor profile and the booking journey (brief §13). */
export function MentorDetailPage({ mentorId }: { mentorId: string }) {
  const { t } = useTranslation('career')
  const { l } = useLocalized()
  const youth = useMyYouth()
  const bookings = useBookings()
  const bookedSlots = useDb((db) => db.bookedSlots)
  const m = MENTORS.find((x) => x.id === (mentorId as MentorId))
  usePageTitle(m ? l(m.name) : t('mentors.title'))
  if (!m) {
    return (
      <EmptyState
        icon={HandHeart}
        title={t('mentors.notFound')}
        action={
          <Button asChild className="rounded-full">
            <Link to="/youth/mentors">{t('mentors.back')}</Link>
          </Button>
        }
      />
    )
  }
  const trainer = TRAINERS.find((x) => x.id === m.trainerId)

  return (
    <div className="space-y-6">
      <nav aria-label={t('common:breadcrumb')} className="text-sm text-ink-soft">
        <Link to="/youth/mentors" className="hover:text-blue hover:underline">
          {t('mentors.title')}
        </Link>
        <span className="mx-1.5" aria-hidden>
          /
        </span>
        <span aria-current="page" className="text-ink">
          {l(m.name)}
        </span>
      </nav>
      <div className="grid gap-6 xl:grid-cols-[320px_minmax(0,1fr)]">
        <Reveal as="section" className="card h-fit overflow-hidden rounded-3xl">
          <div className="relative overflow-hidden bg-grad-unicef px-6 pt-8 pb-16 text-center text-white">
            <Motif variant="card" className="text-white/15" />
            <SampleProfileTag />
          </div>
          <div className="relative -mt-12 px-6 pb-6 text-center">
            <Avatar
              src={m.image}
              name={l(m.name)}
              size={96}
              className="mx-auto ring-4 ring-white"
            />
            <h1 className="mt-3 text-2xl">{l(m.name)}</h1>
            <p className="font-semibold text-blue">{l(m.title)}</p>
            <ul className="mt-4 space-y-2 text-start text-sm">
              <li className="flex gap-2">
                <Target className="mt-0.5 size-4 shrink-0 text-blue" aria-hidden />
                {l(m.focus)}
              </li>
              <li className="flex gap-2">
                <Languages className="mt-0.5 size-4 shrink-0 text-blue" aria-hidden />
                {l(m.languages)}
              </li>
              {trainer && (
                <li className="flex gap-2">
                  <GraduationCap className="mt-0.5 size-4 shrink-0 text-blue" aria-hidden />
                  {t('mentors.trainerOf', { cohorts: trainer.cohortIds.join(', ') })}
                </li>
              )}
            </ul>
            <p className="mt-4 flex gap-2 rounded-xl bg-sky-50 p-3 text-start text-xs text-ink-soft">
              <ShieldCheck className="size-4 shrink-0 text-blue" aria-hidden />
              {t('mentors.privacy')}
            </p>
          </div>
        </Reveal>
        <section className="card rounded-3xl p-5 sm:p-7">
          <h2 className="text-xl">{t('mentors.form.title', { name: l(m.name) })}</h2>
          <p className="mt-1 mb-6 text-sm text-ink-soft">{t('mentors.form.intro')}</p>
          <BookingForm mentor={m} youth={youth} slot={slotState(m, youth, bookings, bookedSlots)} />
        </section>
      </div>
    </div>
  )
}
