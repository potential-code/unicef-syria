import type { Youth } from '@shared/types'
import { Link } from '@tanstack/react-router'
import { Lock, Trophy } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { balance } from '@/domain/points'
import { cn } from '@/lib/utils'
import { BADGES } from '../config'

/** Points balance and badges summary for the dashboard. */
export function PointsBadgesCard({ youth }: { youth: Youth }) {
  const { t } = useTranslation('learn')
  return (
    <section
      className="rounded-3xl border bg-white p-5 shadow-sm sm:p-6"
      aria-labelledby="dash-points"
    >
      <div className="flex items-center justify-between gap-3">
        <h2 id="dash-points" className="flex items-center gap-2 text-xl">
          <span className="flex size-9 items-center justify-center rounded-xl bg-grad-sunrise text-white">
            <Trophy className="size-5" aria-hidden />
          </span>
          {t('dash.points')}
        </h2>
        <Link to="/youth/progress" className="text-sm font-semibold text-blue hover:underline">
          {t('dash.viewRewards')}
        </Link>
      </div>
      <p className="mt-4 text-5xl font-extrabold tracking-tight text-navy tabular-nums">
        {balance(youth)}
        <span className="ms-2 text-base font-semibold text-ink-soft">{t('dash.pointsUnit')}</span>
      </p>
      <ul className="mt-4 flex flex-wrap gap-2" aria-label={t('progress.badges')}>
        {BADGES.map((b) => {
          const earned = youth.badges.includes(b.id)
          return (
            <li
              key={b.id}
              className={cn(
                'inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold',
                earned ? b.tone : 'bg-muted text-ink-soft',
              )}
            >
              {earned ? (
                <b.icon className="size-3.5" aria-hidden />
              ) : (
                <Lock className="size-3.5" aria-hidden />
              )}
              {t(`badges.${b.id}.name`)}
              <span className="sr-only">
                {earned ? t('progress.earned') : t('progress.locked')}
              </span>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
