import type { Application, Opportunity, Outcome } from '@shared/types'
import { PenTool } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Avatar } from '@/components/shared/Avatar'
import { EmptyState } from '@/components/shared/EmptyState'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { formatDate, useLocalized } from '@/i18n'
import { usePlacementDetails } from '@/store/actions/employer-extra'
import { useAllYouth } from '@/store/actions/youth'
import { StageBadge } from './StageBadge'

/** Freelance assignments: selection, start, completion and optional sample fee, tracked separately. */
export function FreelanceAssignments({
  apps,
  outcomes,
  opportunities,
}: {
  apps: Application[]
  outcomes: Outcome[]
  opportunities: Opportunity[]
}) {
  const { t } = useTranslation('employer')
  const { l, lang } = useLocalized()
  const youth = useAllYouth()
  const details = usePlacementDetails()
  const rows = apps.filter(
    (a) => a.track === 'freelance' && outcomes.some((o) => o.id === `OUT-${a.id}-sel`),
  )
  if (rows.length === 0)
    return (
      <EmptyState
        icon={PenTool}
        title={t('placements.freelanceEmpty.title')}
        body={t('placements.freelanceEmpty.body')}
      />
    )
  const dash = t('placements.notYet')
  return (
    <div className="card overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{t('apps.applicant')}</TableHead>
            <TableHead className="hidden md:table-cell">{t('placements.selection')}</TableHead>
            <TableHead className="hidden xl:table-cell">{t('placements.start')}</TableHead>
            <TableHead className="hidden md:table-cell">{t('placements.completion')}</TableHead>
            <TableHead className="hidden lg:table-cell">{t('placements.fee')}</TableHead>
            <TableHead>{t('apps.stage')}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((a) => {
            const sel = outcomes.find((o) => o.id === `OUT-${a.id}-sel`)
            const done = outcomes.find((o) => o.id === `OUT-${a.id}-done`)
            const d = details[a.id] ?? {}
            const y = youth[a.youthId]
            return (
              <TableRow key={a.id}>
                <TableCell className="py-2.5 whitespace-normal">
                  <span className="flex min-w-0 items-center gap-3">
                    <Avatar src={y?.image} name={y?.profile.name ?? a.youthId} size={36} />
                    <span className="min-w-0">
                      <span className="block font-semibold text-ink">{y?.profile.name}</span>
                      <span className="block text-xs text-ink-soft">
                        {l(opportunities.find((o) => o.id === a.opportunityId)?.title)}
                      </span>
                    </span>
                  </span>
                </TableCell>
                <TableCell className="hidden text-ink-soft tabular-nums md:table-cell">
                  {sel ? formatDate(d.selectionDate ?? sel.date, lang) : dash}
                </TableCell>
                <TableCell className="hidden text-ink-soft tabular-nums xl:table-cell">
                  {d.startDate ? formatDate(d.startDate, lang) : dash}
                </TableCell>
                <TableCell className="hidden text-ink-soft tabular-nums md:table-cell">
                  {done ? formatDate(done.date, lang) : dash}
                </TableCell>
                <TableCell className="hidden text-ink-soft lg:table-cell">
                  {d.sampleFee ?? dash}
                </TableCell>
                <TableCell>
                  <StageBadge stage={a.stage} />
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}
