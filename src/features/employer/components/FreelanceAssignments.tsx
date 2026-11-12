import type { Application, Opportunity, Outcome } from '@shared/types'
import { PenTool } from 'lucide-react'
import { useTranslation } from 'react-i18next'
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
    <div className="overflow-x-auto rounded-2xl border bg-white shadow-sm">
      <Table>
        <TableHeader className="bg-sky-50">
          <TableRow>
            <TableHead>{t('apps.applicant')}</TableHead>
            <TableHead>{t('apps.opportunity')}</TableHead>
            <TableHead>{t('placements.selection')}</TableHead>
            <TableHead>{t('placements.start')}</TableHead>
            <TableHead>{t('placements.completion')}</TableHead>
            <TableHead>{t('placements.fee')}</TableHead>
            <TableHead>{t('apps.stage')}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((a) => {
            const sel = outcomes.find((o) => o.id === `OUT-${a.id}-sel`)
            const done = outcomes.find((o) => o.id === `OUT-${a.id}-done`)
            const d = details[a.id] ?? {}
            return (
              <TableRow key={a.id}>
                <TableCell className="font-semibold">{youth[a.youthId]?.profile.name}</TableCell>
                <TableCell>
                  {l(opportunities.find((o) => o.id === a.opportunityId)?.title)}
                </TableCell>
                <TableCell className="tabular-nums">
                  {sel ? formatDate(d.selectionDate ?? sel.date, lang) : dash}
                </TableCell>
                <TableCell className="tabular-nums">
                  {d.startDate ? formatDate(d.startDate, lang) : dash}
                </TableCell>
                <TableCell className="tabular-nums">
                  {done ? formatDate(done.date, lang) : dash}
                </TableCell>
                <TableCell>{d.sampleFee ?? dash}</TableCell>
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
