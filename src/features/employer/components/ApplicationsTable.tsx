import type { Application, Opportunity } from '@shared/types'
import { Link } from '@tanstack/react-router'
import { ArrowRight, ChevronRight } from 'lucide-react'
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

/** Submitted applications for own opportunities: compact table on desktop, row cards on mobile. */
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
  const meta = (a: Application) => {
    const y = youth[a.youthId]
    return [y ? t(`governorates.${y.profile.governorate}`) : null, y?.profile.availability]
      .filter(Boolean)
      .join(' · ')
  }
  return (
    <>
      <div className="card hidden overflow-hidden md:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t('apps.applicant')}</TableHead>
              <TableHead>{t('apps.opportunity')}</TableHead>
              <TableHead>{t('apps.stage')}</TableHead>
              <TableHead className="hidden lg:table-cell">{t('apps.updated')}</TableHead>
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
                  <TableCell className="py-2.5">
                    <span className="flex min-w-0 items-center gap-3">
                      <Avatar src={y?.image} name={y?.profile.name ?? a.youthId} size={36} />
                      <span className="min-w-0">
                        <span className="block font-semibold text-ink">{y?.profile.name}</span>
                        <span className="block text-xs text-ink-soft">{meta(a)}</span>
                      </span>
                    </span>
                  </TableCell>
                  <TableCell className="whitespace-normal">
                    <span className="block font-medium text-navy">{oppTitle(a.opportunityId)}</span>
                    <span className="block text-xs text-ink-soft">
                      {a.opportunityId} · {t(`tracks.${a.track}`)}
                    </span>
                  </TableCell>
                  <TableCell>
                    <StageBadge stage={a.stage} />
                  </TableCell>
                  <TableCell className="hidden text-ink-soft tabular-nums whitespace-nowrap lg:table-cell">
                    {last(a) && formatDate(last(a), lang)}
                  </TableCell>
                  <TableCell className="text-end">
                    <Button asChild variant="outline" size="sm" className="rounded-full">
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
                className="card card-hover flex items-center gap-3 p-4 outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <Avatar src={y?.image} name={y?.profile.name ?? a.youthId} size={40} />
                <span className="min-w-0 flex-1">
                  <span className="block font-semibold text-ink">{y?.profile.name}</span>
                  <span className="block text-sm text-navy">{oppTitle(a.opportunityId)}</span>
                  <span className="block text-xs text-ink-soft">
                    {a.opportunityId} · {t(`tracks.${a.track}`)}
                    {last(a) && ` · ${formatDate(last(a), lang)}`}
                  </span>
                  <span className="mt-2 block">
                    <StageBadge stage={a.stage} />
                  </span>
                </span>
                <ChevronRight className="size-5 shrink-0 text-blue rtl-mirror" aria-hidden />
              </Link>
            </li>
          )
        })}
      </ul>
    </>
  )
}
