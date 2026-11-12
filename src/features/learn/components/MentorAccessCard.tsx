import type { Youth } from '@shared/types'
import { Link } from '@tanstack/react-router'
import { HandHeart } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Motif } from '@/components/brand'
import { balance, MENTOR_COST } from '@/domain/points'
import { CAREER_LINKS } from '../config'

/** Mentor access: points booking or programme allocation. */
export function MentorAccessCard({ youth }: { youth: Youth }) {
  const { t } = useTranslation('learn')
  const enough = balance(youth) >= MENTOR_COST
  return (
    <section
      className="relative overflow-hidden rounded-3xl bg-yellow p-5 text-ink shadow-md sm:p-6"
      aria-labelledby="dash-mentor"
    >
      <Motif variant="corner" className="text-white/50" />
      <h2 id="dash-mentor" className="relative flex items-center gap-2 text-lg">
        <HandHeart className="size-5" aria-hidden />
        {t('dash.mentor')}
      </h2>
      <p className="relative mt-2 text-sm">
        {enough
          ? t('dash.mentorReady', { cost: MENTOR_COST })
          : t('dash.mentorLocked', { cost: MENTOR_COST })}
      </p>
      <Link
        to={CAREER_LINKS.mentors}
        className="relative mt-4 inline-flex h-10 items-center rounded-full bg-white px-4 text-sm font-semibold text-navy shadow-md hover:bg-sky-50"
      >
        {t('dash.mentorCta')}
      </Link>
    </section>
  )
}
