import { Link } from '@tanstack/react-router'
import { ArrowRight, Bot, HandHeart, ShieldCheck, Sparkles } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Motif } from '@/components/brand'
import { Stagger, StaggerItem } from '@/components/motion'
import { Button } from '@/components/ui/button'
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
          <div className="on-dark relative flex h-full min-h-72 flex-col justify-center gap-3 overflow-hidden rounded-2xl bg-[linear-gradient(150deg,var(--unicef-blue),var(--unicef-navy))] p-6 text-white shadow-md">
            <Motif variant="card" className="text-white/[0.14]" />
            <p className="relative flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-yellow">
              <HandHeart className="size-4" aria-hidden />
              {t('coaches.chips.human')}
            </p>
            <h3 className="relative text-xl text-white">{t('coaches.mentorCard.title')}</h3>
            <p className="relative text-sm text-white/85">{t('coaches.mentorCard.body')}</p>
            <Button
              asChild
              className="relative mt-2 w-fit rounded-full bg-yellow font-bold text-ink hover:bg-yellow/90"
            >
              <Link to="/youth/mentors">
                {t('coaches.bookMentor')}
                <ArrowRight className="size-4 rtl-mirror" aria-hidden />
              </Link>
            </Button>
          </div>
        </StaggerItem>
      </Stagger>
    </div>
  )
}
