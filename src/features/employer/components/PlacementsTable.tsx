import type { Opportunity, Outcome } from '@shared/types'
import { Handshake } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { EmptyState } from '@/components/shared/EmptyState'
import { StatusBadge } from '@/components/shared/StatusBadge'
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
import { useFollowUps } from '@/store/actions/followups'
import { useAllYouth } from '@/store/actions/youth'

const addMonths = (iso: string, n: number) => {
  const d = new Date(`${iso.slice(0, 10)}T12:00:00+03:00`)
  d.setMonth(d.getMonth() + n)
  return d.toISOString()
}

/** Confirmed employment placements only: an offer or selection is never counted (brief §16 E03). */
export function PlacementsTable({
  outcomes,
  opportunities,
}: {
  outcomes: Outcome[]
  opportunities: Opportunity[]
}) {
  const { t } = useTranslation('employer')
  const { l, lang } = useLocalized()
  const youth = useAllYouth()
  const details = usePlacementDetails()
  const followUps = useFollowUps()
  if (outcomes.length === 0)
    return (
      <EmptyState
        icon={Handshake}
        title={t('placements.empty.title')}
        body={t('placements.empty.body')}
      />
    )
  return (
    <div className="overflow-x-auto rounded-2xl border bg-white shadow-sm">
      <Table>
        <TableHeader className="bg-sky-50">
          <TableRow>
            <TableHead>{t('apps.applicant')}</TableHead>
            <TableHead>{t('placements.role')}</TableHead>
            <TableHead>{t('placements.start')}</TableHead>
            <TableHead>{t('placements.workType')}</TableHead>
            <TableHead>{t('placements.source')}</TableHead>
            <TableHead>{t('placements.followUp')}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {outcomes.map((o) => {
            const appId = o.id.replace(/^OUT-/, '')
            const d = details[appId] ?? {}
            const opp = opportunities.find((x) => x.id === o.opportunityId)
            const start = d.startDate ?? o.date
            const fu = followUps.find((f) => f.youthId === o.youthId)
            return (
              <TableRow key={o.id}>
                <TableCell className="font-semibold">{youth[o.youthId]?.profile.name}</TableCell>
                <TableCell>{d.role ?? l(opp?.title)}</TableCell>
                <TableCell className="tabular-nums">{formatDate(start, lang)}</TableCell>
                <TableCell>
                  {t(
                    `workTypes.${d.workType ?? (o.type === 'internship' ? 'internship' : 'fullTime')}`,
                  )}
                </TableCell>
                <TableCell>
                  <StatusBadge tone="success">
                    {o.source === 'employer' && o.confirmed
                      ? t('placements.confirmedByEmployer')
                      : t('placements.learnerReported')}
                  </StatusBadge>
                </TableCell>
                <TableCell className="text-sm">
                  {fu
                    ? t(`placements.fuStatus.${fu.status}`)
                    : t('placements.fuDue', { date: formatDate(addMonths(start, 3), lang) })}
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}
