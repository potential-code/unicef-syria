import type { Youth } from '@shared/types'
import { Award, GraduationCap, Medal, Trophy } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { StatCard } from '@/components/shared/StatCard'
import { courseStatus } from '@/domain/completion'
import { balance } from '@/domain/points'
import { BADGES } from '../config'

/** Dashboard KPI row: learning, points, badges and certificates as separate measures. */
export function DashboardStats({ youth }: { youth: Youth }) {
  const { t } = useTranslation('learn')
  const plan = youth.plan
  const done = plan.filter((id) => courseStatus(youth.progress[id]) === 'completed').length
  const pct = plan.length ? Math.round((done / plan.length) * 100) : 0
  const certs = Object.values(youth.progress).filter((p) => p?.certificate === 'issued').length
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
      <StatCard
        label={t('dash.learning')}
        value={`${pct}%`}
        hint={t('dash.coursesDone', { done, total: plan.length })}
        icon={GraduationCap}
        tone="blue"
        to="/youth/path"
      />
      <StatCard
        label={t('progress.balance')}
        value={balance(youth)}
        hint={t('dash.pointsUnit')}
        icon={Trophy}
        tone="cyan"
        to="/youth/progress"
      />
      <StatCard
        label={t('progress.badges')}
        value={`${youth.badges.length}/${BADGES.length}`}
        hint={t('progress.earned')}
        icon={Medal}
        tone="navy"
        to="/youth/progress"
      />
      <StatCard
        label={t('progress.certificates')}
        value={certs}
        icon={Award}
        tone="yellow"
        to="/youth/progress"
      />
    </div>
  )
}
