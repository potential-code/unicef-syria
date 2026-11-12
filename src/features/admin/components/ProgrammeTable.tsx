import type { ProgrammeId } from '@shared/types'
import { Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { ANALYTICS_ROWS } from '@/data/analytics'
import { PROGRAMMES } from '@/data/orgs'
import { filterRows, kpis, sumRows } from '@/domain/kpi'
import { cn } from '@/lib/utils'
import { type AdminFilters, toKpiFilters } from '../lib/filters'
import { useAdminFilters } from '../lib/useAdminFilters'
import { useLabels } from '../lib/useLabels'

/** Per-programme KPIs (historical sample). Outcome column uses the measure that fits the route. */
export function ProgrammeTable({
  filters,
  to,
  selected,
}: {
  filters: AdminFilters
  to: string
  selected?: ProgrammeId
}) {
  const { t } = useTranslation('admin')
  const { n, p, programme } = useLabels()
  const { linkSearch } = useAdminFilters()
  return (
    <div className="overflow-x-auto rounded-2xl border bg-white shadow-sm">
      <Table className="min-w-[48rem]">
        <TableHeader>
          <TableRow>
            <TableHead>{t('table.programme')}</TableHead>
            <TableHead>{t('kpi.registered')}</TableHead>
            <TableHead>{t('compare.enrolments')}</TableHead>
            <TableHead>{t('kpi.completion')}</TableHead>
            <TableHead>{t('metric.graduates')}</TableHead>
            <TableHead>{t('kpi.guidance')}</TableHead>
            <TableHead>{t('table.outcome')}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {PROGRAMMES.map((pr) => {
            const k = kpis(
              sumRows(filterRows(ANALYTICS_ROWS, { ...toKpiFilters(filters), programmeId: pr.id })),
            )
            const outcome =
              pr.route === 'employment'
                ? t('table.outcomeJobs', { jobs: n(k.jobStarts), interns: n(k.internships) })
                : pr.route === 'freelance'
                  ? t('table.outcomeFreelance', {
                      count: k.freelance.completed,
                      earners: n(k.freelance.earners),
                    })
                  : t('table.outcomeEnterprise', {
                      count: k.enterprise.concepts,
                      accepted: n(k.enterprise.acceptances),
                    })
            return (
              <TableRow
                key={pr.id}
                className={cn(selected === pr.id && 'bg-sky-50')}
                aria-selected={selected === pr.id}
              >
                <TableCell>
                  <Link
                    to={to}
                    search={linkSearch({ programmeId: pr.id })}
                    className="font-semibold text-blue hover:underline"
                  >
                    {pr.id} {programme(pr.id)}
                  </Link>
                  <span className="block text-xs text-ink-soft">
                    {t(`common:routesShort.${pr.route}`)}
                  </span>
                </TableCell>
                <TableCell className="tabular-nums">{n(k.registered)}</TableCell>
                <TableCell className="tabular-nums">{n(k.completionRate.denominator)}</TableCell>
                <TableCell className="tabular-nums">{p(k.completionRate.value)}</TableCell>
                <TableCell className="tabular-nums">{n(k.graduates)}</TableCell>
                <TableCell className="tabular-nums">{p(k.guidanceCoverage.value)}</TableCell>
                <TableCell className="text-sm">{outcome}</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}
