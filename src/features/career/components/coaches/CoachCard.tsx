import type { Coach } from '@shared/types'
import { Link } from '@tanstack/react-router'
import { ArrowRight, MessageCircle } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { useLocalized } from '@/i18n'
import { cn } from '@/lib/utils'
import { COACH_STYLE } from '../../config/coaches'
import { AiBadge } from './AiBadge'
import { CoachAvatar } from './CoachAvatar'

/** Directory card: name, title, purpose and three starter prompts that open the chat. */
export function CoachCard({ coach }: { coach: Coach }) {
  const { t } = useTranslation('career')
  const { l } = useLocalized()
  const style = COACH_STYLE[coach.id]
  return (
    <article className="lift flex h-full flex-col overflow-hidden rounded-2xl border bg-white shadow-sm">
      <div className={cn('relative flex items-start gap-3 p-5', style.soft)}>
        <div
          className="pointer-events-none absolute -end-6 -top-6 size-24 rounded-full bg-white/50"
          aria-hidden
        />
        <CoachAvatar coachId={coach.id} className="size-14 rounded-2xl" />
        <div className="relative min-w-0">
          <h3 className="text-xl">{l(coach.name)}</h3>
          <p className={cn('text-sm font-semibold', style.text)}>{l(coach.title)}</p>
          <AiBadge className="mt-2" />
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <p className="text-sm text-ink-soft">{l(coach.purpose)}</p>
        <p className="text-xs font-bold uppercase tracking-wide text-ink-soft">
          {t('coaches.tryAsking')}
        </p>
        <ul className="space-y-2">
          {coach.starters.map((s) => (
            <li key={s.step}>
              <Link
                to="/youth/coaches/$coachId"
                params={{ coachId: coach.id }}
                search={{ start: s.step }}
                className="flex min-h-11 items-center gap-2 rounded-xl border border-sky-200 bg-sky-50 px-3 py-2 text-sm font-medium text-navy transition-colors hover:border-blue hover:bg-white"
              >
                <MessageCircle className="size-4 shrink-0 text-blue" aria-hidden />
                {l(s.label)}
              </Link>
            </li>
          ))}
        </ul>
        <Button asChild className="mt-auto rounded-full">
          <Link to="/youth/coaches/$coachId" params={{ coachId: coach.id }}>
            {t('coaches.open', { name: l(coach.name) })}
            <ArrowRight className="size-4 rtl-mirror" aria-hidden />
          </Link>
        </Button>
      </div>
    </article>
  )
}
