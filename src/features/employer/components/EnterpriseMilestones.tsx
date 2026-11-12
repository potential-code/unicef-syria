import type { Application } from '@shared/types'
import { Lightbulb } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { EmptyState } from '@/components/shared/EmptyState'
import { useAllYouth } from '@/store/actions/youth'
import { StageBadge } from './StageBadge'

/** Enterprise support milestones, kept separate from employment placements (brief §16). */
export function EnterpriseMilestones({ apps }: { apps: Application[] }) {
  const { t } = useTranslation('employer')
  const youth = useAllYouth()
  const rows = apps.filter((a) => a.track === 'enterprise')
  if (rows.length === 0)
    return (
      <EmptyState
        icon={Lightbulb}
        title={t('placements.enterpriseEmpty.title')}
        body={t('placements.enterpriseEmpty.body')}
      />
    )
  return (
    <ul className="flex flex-col gap-2">
      {rows.map((a) => (
        <li key={a.id} className="card flex flex-wrap items-center justify-between gap-2 p-4">
          <span className="min-w-0 flex-1 font-semibold text-ink">
            {youth[a.youthId]?.profile.name}
          </span>
          <StageBadge stage={a.stage} />
        </li>
      ))}
    </ul>
  )
}
