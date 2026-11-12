import type { Coach } from '@shared/types'
import { Link } from '@tanstack/react-router'
import { ArrowRight, MessageCircle } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Motif } from '@/components/brand'
import { Button } from '@/components/ui/button'
import { useLocalized } from '@/i18n'
import { cn } from '@/lib/utils'
import { COACH_STYLE } from '../../config/coaches'
import { AiBadge } from './AiBadge'
import { CoachAvatar } from './CoachAvatar'

/** Directory card: portrait-style header, title, purpose and three starter prompts. */
export function CoachCard({ coach }: { coach: Coach }) {
  const { t } = useTranslation('career')
  const { l } = useLocalized()
  const style = COACH_STYLE[coach.id]
  return (
    <article className="card card-hover flex h-full flex-col overflow-hidden">
      <div className={cn('relative h-20 overflow-hidden', style.grad)}>
        <Motif variant="card" className={style.motif} />
        <AiBadge className="absolute end-4 top-3 border-transparent shadow-sm" />
      </div>
      <div className="relative -mt-10 px-5">
        <CoachAvatar coachId={coach.id} size="lg" />
        <h3 className="mt-3 text-xl">{l(coach.name)}</h3>
        <p
          className={cn(
            'text-sm font-semibold',
            style.text === 'text-ink' ? 'text-navy' : style.text,
          )}
        >
          {l(coach.title)}
        </p>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5 pt-3">
        <p className="text-sm text-ink-soft">{l(coach.purpose)}</p>
        <p className="mt-1 text-xs font-bold uppercase tracking-wide text-ink-soft">
          {t('coaches.tryAsking')}
        </p>
        <ul className="divide-y divide-border/70 rounded-xl border border-border/70">
          {coach.starters.map((s) => (
            <li key={s.step}>
              <Link
                to="/youth/coaches/$coachId"
                params={{ coachId: coach.id }}
                search={{ start: s.step }}
                className="group flex items-center gap-2.5 px-3 py-2.5 text-sm font-medium text-navy transition-colors first:rounded-t-xl last:rounded-b-xl hover:bg-sky-50"
              >
                <MessageCircle className="size-4 shrink-0 text-blue" aria-hidden />
                <span className="flex-1">{l(s.label)}</span>
                <ArrowRight
                  className="size-3.5 shrink-0 text-blue opacity-0 transition-opacity group-hover:opacity-100 rtl-mirror"
                  aria-hidden
                />
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
