import type { Opportunity, Outcome } from '@shared/types'
import { Handshake } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Avatar } from '@/components/shared/Avatar'
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
    <div className="card overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{t('apps.applicant')}</TableHead>
            <TableHead>{t('placements.role')}</TableHead>
            <TableHead className="hidden md:table-cell">{t('placements.source')}</TableHead>
            <TableHead className="hidden sm:table-cell">{t('placements.followUp')}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {outcomes.map((o) => {
            const appId = o.id.replace(/^OUT-/, '')
            const d = details[appId] ?? {}
            const opp = opportunities.find((x) => x.id === o.opportunityId)
            const start = d.startDate ?? o.date
            const fu = followUps.find((f) => f.youthId === o.youthId)
            const y = youth[o.youthId]
            return (
              <TableRow key={o.id}>
                <TableCell className="py-2.5">
                  <span className="flex min-w-0 items-center gap-3">
                    <Avatar src={y?.image} name={y?.profile.name ?? o.youthId} size={36} />
                    <span className="min-w-0">
                      <span className="block font-semibold text-ink">{y?.profile.name}</span>
                      <span className="block text-xs text-ink-soft">
                        {t(
                          `workTypes.${d.workType ?? (o.type === 'internship' ? 'internship' : 'fullTime')}`,
                        )}
                      </span>
                    </span>
                  </span>
                </TableCell>
                <TableCell className="whitespace-normal">
                  <span className="block font-medium text-navy">{d.role ?? l(opp?.title)}</span>
                  <span className="block text-xs text-ink-soft tabular-nums">
                    {t('placements.start')}: {formatDate(start, lang)}
                  </span>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <StatusBadge tone="success">
                    {o.source === 'employer' && o.confirmed
                      ? t('placements.confirmedByEmployer')
                      : t('placements.learnerReported')}
                  </StatusBadge>
                </TableCell>
                <TableCell className="hidden text-sm whitespace-normal text-ink-soft sm:table-cell">
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
