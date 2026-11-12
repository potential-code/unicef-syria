import type { Youth } from '@shared/types'
import { Link } from '@tanstack/react-router'
import { HandHeart } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { balance, MENTOR_COST } from '@/domain/points'
import { CAREER_LINKS } from '../config'

/** Mentor access: points booking or programme allocation. */
export function MentorAccessCard({ youth }: { youth: Youth }) {
  const { t } = useTranslation('learn')
  const enough = balance(youth) >= MENTOR_COST
  return (
    <section
      className="relative overflow-hidden rounded-3xl bg-yellow p-5 text-ink shadow-sm sm:p-6"
      aria-labelledby="dash-mentor"
    >
      <span
        className="pointer-events-none absolute -end-6 -top-6 size-24 rounded-full bg-white/40"
        aria-hidden
      />
      <h2 id="dash-mentor" className="relative flex items-center gap-2 text-xl">
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
        className="relative mt-4 inline-flex min-h-11 items-center rounded-full bg-ink px-4 font-semibold text-white hover:bg-navy"
      >
        {t('dash.mentorCta')}
      </Link>
    </section>
  )
}
