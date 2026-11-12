import { Link } from '@tanstack/react-router'
import { Bot, HandHeart, ShieldCheck, Sparkles } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Stagger, StaggerItem } from '@/components/motion'
import { COACHES } from '@/data/coaches'
import { CareerHero } from '../components/CareerHero'
import { CoachCard } from '../components/coaches/CoachCard'

/** Y09 directory of the five scripted AI coaches. */
export function CoachesPage() {
  const { t } = useTranslation('career')
  return (
    <div className="space-y-8">
      <CareerHero
        icon={Bot}
        eyebrow={t('coaches.eyebrow')}
        title={t('coaches.title')}
        body={t('coaches.intro')}
      >
        <ul className="flex flex-wrap gap-2 text-sm">
          <li className="flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5">
            <Sparkles className="size-4" aria-hidden />
            {t('coaches.chips.scripted')}
          </li>
          <li className="flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5">
            <ShieldCheck className="size-4" aria-hidden />
            {t('coaches.chips.review')}
          </li>
          <li className="flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5">
            <HandHeart className="size-4" aria-hidden />
            {t('coaches.chips.human')}
          </li>
        </ul>
      </CareerHero>
      <Stagger className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {COACHES.map((c) => (
          <StaggerItem key={c.id} className="h-full">
            <CoachCard coach={c} />
          </StaggerItem>
        ))}
        <StaggerItem className="h-full">
          <div className="flex h-full flex-col justify-center gap-3 rounded-2xl border-2 border-dashed border-blue/30 bg-blue-50 p-6">
            <HandHeart className="size-8 text-blue" aria-hidden />
            <h3 className="text-xl">{t('coaches.mentorCard.title')}</h3>
            <p className="text-sm text-ink-soft">{t('coaches.mentorCard.body')}</p>
            <Link
              to="/youth/mentors"
              className="inline-flex min-h-11 w-fit items-center rounded-full bg-blue px-5 font-semibold text-white hover:bg-navy"
            >
              {t('coaches.bookMentor')}
            </Link>
          </div>
        </StaggerItem>
      </Stagger>
    </div>
  )
}
