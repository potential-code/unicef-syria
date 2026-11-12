import { Link } from '@tanstack/react-router'
import { BookOpen, HandHeart, ListChecks, ShieldCheck } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Motif } from '@/components/brand'
import { Button } from '@/components/ui/button'

/** How the scripted coaches work: grounded, reviewable, with human support available. */
export function CoachSidePanel() {
  const { t } = useTranslation('career')
  const items = [
    { icon: ListChecks, text: t('coaches.rules.scripted') },
    { icon: BookOpen, text: t('coaches.rules.grounded') },
    { icon: ShieldCheck, text: t('coaches.rules.review') },
  ]
  return (
    <aside className="space-y-4">
      <div className="card p-5">
        <h2 className="text-base">{t('coaches.rules.title')}</h2>
        <ul className="mt-3 space-y-3 text-sm">
          {items.map((it) => (
            <li key={it.text} className="flex gap-2.5">
              <it.icon className="mt-0.5 size-4 shrink-0 text-blue" aria-hidden />
              <span>{it.text}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="on-dark relative overflow-hidden rounded-2xl bg-[linear-gradient(150deg,var(--unicef-blue),var(--unicef-navy))] p-5 text-white shadow-md">
        <Motif variant="corner" className="text-white/[0.14]" />
        <p className="relative flex items-center gap-2 font-bold text-white">
          <HandHeart className="size-5 shrink-0 text-yellow" aria-hidden />
          {t('coaches.mentorCard.title')}
        </p>
        <p className="relative mt-1 text-sm text-white/85">{t('coaches.mentorCard.body')}</p>
        <Button
          asChild
          className="relative mt-4 rounded-full bg-yellow font-bold text-ink hover:bg-yellow/90"
        >
          <Link to="/youth/mentors">{t('coaches.bookMentor')}</Link>
        </Button>
      </div>
    </aside>
  )
}
