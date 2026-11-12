import type { CareerRoute, Youth } from '@shared/types'
import { Link } from '@tanstack/react-router'
import { CircleCheck, CircleDashed, Flag } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Motif } from '@/components/brand'
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
      className="relative overflow-hidden rounded-3xl bg-yellow p-5 text-ink shadow-md sm:p-6"
      aria-labelledby="milestones"
    >
      <Motif variant="corner" className="text-white/45" />
      <h2 id="milestones" className="relative flex items-center gap-2 text-xl">
        <Flag className="size-5" aria-hidden />
        {t('path.milestones')}
      </h2>
      <p className="relative mt-1 text-sm">
        {t('path.milestonesMet', { met, total: items.length })}
      </p>
      <ol className="relative mt-4 space-y-2">
        {items.map((m) => (
          <li
            key={m.key}
            className={cn(
              'flex items-center gap-2 rounded-xl px-3 py-2 text-sm',
              m.met ? 'bg-white shadow-sm' : 'bg-white/55',
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
        className="relative mt-4 inline-flex h-10 items-center rounded-full bg-white px-4 text-sm font-semibold text-navy shadow-md hover:bg-sky-50"
      >
        {t('path.openToolkit')}
      </Link>
    </section>
  )
}
