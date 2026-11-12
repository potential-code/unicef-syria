import type { Youth } from '@shared/types'
import { useTranslation } from 'react-i18next'
import { StatusBadge } from '@/components/shared/StatusBadge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { COURSES } from '@/data/courses'
import { useLabels } from '../lib/useLabels'
import { LearnerName } from './LearnerName'

/** Cohort roster: courses completed, sessions attended and any support flag (no private notes). */
export function RosterTable({ youth }: { youth: Youth[] }) {
  const { t } = useTranslation('admin')
  const { n } = useLabels()
  return (
    <div className="card overflow-hidden">
      <Table className="min-w-[40rem] lg:min-w-0 [&_th]:whitespace-normal">
        <TableHeader>
          <TableRow>
            <TableHead>{t('table.learner')}</TableHead>
            <TableHead>{t('table.cohort')}</TableHead>
            <TableHead>{t('table.route')}</TableHead>
            <TableHead>{t('table.courses')}</TableHead>
            <TableHead>{t('table.attended')}</TableHead>
            <TableHead>{t('table.flag')}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {youth.map((y) => {
            const done = COURSES.filter((c) => y.progress[c.id]?.completedAt).length
            const marks = Object.values(y.attendance)
            return (
              <TableRow key={y.id}>
                <TableCell>
                  <LearnerName y={y} to="/centre/participants/$youthId" />
                </TableCell>
                <TableCell>{y.cohortIds.join(', ')}</TableCell>
                <TableCell>{y.route ? t(`common:routesShort.${y.route}`) : t('none')}</TableCell>
                <TableCell className="tabular-nums">
                  {t('kpi.ofShort', { num: n(done), den: n(COURSES.length) })}
                </TableCell>
                <TableCell className="tabular-nums">
                  {t('kpi.ofShort', {
                    num: n(marks.filter((m) => m === 'present').length),
                    den: n(marks.length),
                  })}
                </TableCell>
                <TableCell>
                  {y.supportFlag ? (
                    <StatusBadge tone="notice">{t('participants.attendanceFlag')}</StatusBadge>
                  ) : (
                    <span className="text-ink-soft">{t('none')}</span>
                  )}
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}
