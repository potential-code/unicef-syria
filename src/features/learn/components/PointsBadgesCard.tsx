import type { Youth } from '@shared/types'
import { Link } from '@tanstack/react-router'
import { Trophy } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { balance } from '@/domain/points'
import { BadgeGrid } from './BadgeGrid'

/** Points balance and a compact badge shelf for the dashboard. */
export function PointsBadgesCard({ youth }: { youth: Youth }) {
  const { t } = useTranslation('learn')
  return (
    <section className="card h-full p-5 sm:p-6" aria-labelledby="dash-points">
      <div className="flex items-center justify-between gap-3">
        <h2 id="dash-points" className="flex items-center gap-2 text-lg">
          <Trophy className="size-5 text-orange" aria-hidden />
          {t('dash.points')}
        </h2>
        <Link to="/youth/progress" className="text-sm font-semibold text-blue hover:underline">
          {t('dash.viewRewards')}
        </Link>
      </div>
      <p className="mt-2 text-sm text-ink-soft">
        <span className="text-lg font-extrabold text-navy tabular-nums">{balance(youth)}</span>{' '}
        {t('dash.pointsUnit')}
      </p>
      <div className="mt-4 rounded-2xl bg-grad-sky px-2 pt-4 pb-3">
        <BadgeGrid youth={youth} compact />
      </div>
    </section>
  )
}
