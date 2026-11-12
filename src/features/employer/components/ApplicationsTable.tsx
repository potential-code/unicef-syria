import type { Application, Opportunity } from '@shared/types'
import { Link } from '@tanstack/react-router'
import { ArrowRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Avatar } from '@/components/shared/Avatar'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { formatDate, useLocalized } from '@/i18n'
import { useAllYouth } from '@/store/actions/youth'
import { StageBadge } from './StageBadge'

/** Submitted applications for own opportunities: table on desktop, cards on mobile. */
export function ApplicationsTable({
  apps,
  opportunities,
}: {
  apps: Application[]
  opportunities: Opportunity[]
}) {
  const { t } = useTranslation('employer')
  const { l, lang } = useLocalized()
  const youth = useAllYouth()
  const oppTitle = (id: string) => l(opportunities.find((o) => o.id === id)?.title)
  const last = (a: Application) => a.timeline[a.timeline.length - 1]?.at ?? ''
  return (
    <>
      <div className="hidden overflow-hidden rounded-2xl border bg-white shadow-sm md:block">
        <Table>
          <TableHeader className="bg-sky-50">
            <TableRow>
              <TableHead>{t('apps.applicant')}</TableHead>
              <TableHead>{t('apps.opportunity')}</TableHead>
              <TableHead>{t('apps.stage')}</TableHead>
              <TableHead>{t('apps.updated')}</TableHead>
              <TableHead className="text-end">
                <span className="sr-only">{t('apps.open')}</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {apps.map((a) => {
              const y = youth[a.youthId]
              return (
                <TableRow key={a.id}>
                  <TableCell>
                    <span className="flex items-center gap-3 font-semibold text-ink">
                      <Avatar src={y?.image} name={y?.profile.name ?? a.youthId} size={36} />
                      {y?.profile.name}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="block font-medium">{oppTitle(a.opportunityId)}</span>
                    <span className="text-xs text-ink-soft">
                      {a.opportunityId} · {t(`tracks.${a.track}`)}
                    </span>
                  </TableCell>
                  <TableCell>
                    <StageBadge stage={a.stage} />
                  </TableCell>
                  <TableCell className="tabular-nums text-ink-soft">
                    {last(a) && formatDate(last(a), lang)}
                  </TableCell>
                  <TableCell className="text-end">
                    <Button asChild variant="ghost" size="sm" className="text-blue">
                      <Link to="/employer/applications/$appId" params={{ appId: a.id }}>
                        {t('apps.review')}
                        <ArrowRight className="size-4 rtl-mirror" aria-hidden />
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
      <ul className="flex flex-col gap-3 md:hidden">
        {apps.map((a) => {
          const y = youth[a.youthId]
          return (
            <li key={a.id}>
              <Link
                to="/employer/applications/$appId"
                params={{ appId: a.id }}
                className="lift flex items-center gap-3 rounded-2xl border bg-white p-4 shadow-sm"
              >
                <Avatar src={y?.image} name={y?.profile.name ?? a.youthId} size={44} />
                <span className="min-w-0 flex-1">
                  <span className="block font-semibold text-ink">{y?.profile.name}</span>
                  <span className="block truncate text-sm text-ink-soft">
                    {oppTitle(a.opportunityId)}
                  </span>
                  <span className="mt-1.5 block">
                    <StageBadge stage={a.stage} />
                  </span>
                </span>
                <ArrowRight className="size-5 text-blue rtl-mirror" aria-hidden />
              </Link>
            </li>
          )
        })}
      </ul>
    </>
  )
}
