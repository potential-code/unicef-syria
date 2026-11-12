import { Link } from '@tanstack/react-router'
import { BookOpen, HandHeart, ListChecks, ShieldCheck } from 'lucide-react'
import { useTranslation } from 'react-i18next'
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
      <div className="rounded-2xl border bg-white p-5 shadow-sm">
        <h2 className="text-lg">{t('coaches.rules.title')}</h2>
        <ul className="mt-3 space-y-3 text-sm">
          {items.map((it) => (
            <li key={it.text} className="flex gap-2.5">
              <it.icon className="mt-0.5 size-4 shrink-0 text-blue" aria-hidden />
              <span>{it.text}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="relative overflow-hidden rounded-2xl bg-grad-sunrise p-5">
        <div
          className="pointer-events-none absolute -end-6 -top-6 size-20 rounded-full bg-white/30"
          aria-hidden
        />
        <HandHeart className="relative size-7 text-ink" aria-hidden />
        <p className="relative mt-2 font-bold text-ink">{t('coaches.mentorCard.title')}</p>
        <p className="relative mt-1 text-sm text-ink/80">{t('coaches.mentorCard.body')}</p>
        <Button asChild className="relative mt-3 rounded-full bg-navy hover:bg-blue">
          <Link to="/youth/mentors">{t('coaches.bookMentor')}</Link>
        </Button>
      </div>
    </aside>
  )
}
