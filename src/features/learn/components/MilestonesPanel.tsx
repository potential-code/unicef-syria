import type { CareerRoute, Youth } from '@shared/types'
import { Link } from '@tanstack/react-router'
import { CircleCheck, CircleDashed, Flag } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/utils'
import { CAREER_LINKS } from '../config'
import { useMilestones } from '../hooks/use-milestones'

/** Route milestones with met or not yet (text plus icon). */
export function MilestonesPanel({ youth, route }: { youth: Youth; route: CareerRoute }) {
  const { t } = useTranslation('learn')
  const items = useMilestones(youth, route)
  const met = items.filter((m) => m.met).length
  return (
    <section
      className="rounded-3xl bg-yellow p-5 text-ink shadow-sm sm:p-6"
      aria-labelledby="milestones"
    >
      <h2 id="milestones" className="flex items-center gap-2 text-xl">
        <Flag className="size-5" aria-hidden />
        {t('path.milestones')}
      </h2>
      <p className="mt-1 text-sm">{t('path.milestonesMet', { met, total: items.length })}</p>
      <ol className="mt-4 space-y-2">
        {items.map((m) => (
          <li
            key={m.key}
            className={cn(
              'flex items-center gap-2 rounded-2xl px-3 py-2',
              m.met ? 'bg-white' : 'bg-white/50',
            )}
          >
            {m.met ? (
              <CircleCheck className="size-5 shrink-0 text-success" aria-hidden />
            ) : (
              <CircleDashed className="size-5 shrink-0" aria-hidden />
            )}
            <span className="flex-1 font-semibold">{t(`milestones.${m.key}`)}</span>
            <span className="text-xs font-bold">{m.met ? t('path.met') : t('path.notYet')}</span>
          </li>
        ))}
      </ol>
      <Link
        to={CAREER_LINKS.toolkit}
        className="mt-4 inline-flex min-h-11 items-center rounded-full bg-ink px-4 font-semibold text-white hover:bg-navy"
      >
        {t('path.openToolkit')}
      </Link>
    </section>
  )
}
