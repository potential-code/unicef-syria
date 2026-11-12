import { useTranslation } from 'react-i18next'
import { StatusBadge, type Tone } from '@/components/shared/StatusBadge'
import { Progress } from '@/components/ui/progress'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import type { LearnerStats } from '../hooks/useTrainerScope'
import { LearnerName } from './LearnerName'

const ASSESS_TONE: Record<LearnerStats['assessment'], Tone> = {
  passed: 'success',
  pending: 'info',
  needsSupport: 'notice',
  notStarted: 'neutral',
}

/** T02 roster: progress, attendance (excused separate), assessment status, practicals and follow-up. */
export function RosterTable({ rows }: { rows: LearnerStats[] }) {
  const { t } = useTranslation('trainer')
  return (
    <div className="overflow-x-auto rounded-2xl border bg-card shadow-sm">
      <Table>
        <TableHeader className="bg-sky-50">
          <TableRow>
            <TableHead>{t('ui.learner')}</TableHead>
            <TableHead className="min-w-36">{t('roster.progress')}</TableHead>
            <TableHead>{t('roster.attendance')}</TableHead>
            <TableHead>{t('roster.assessment')}</TableHead>
            <TableHead>{t('roster.practical')}</TableHead>
            <TableHead>{t('roster.followUp')}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((s) => (
            <TableRow key={s.youth.id}>
              <TableCell className="min-w-48">
                <LearnerName youth={s.youth} sub={`${s.youth.id} · ${s.cohortId}`} />
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Progress
                    value={s.progress}
                    className="h-2 w-24"
                    aria-label={t('roster.progress')}
                  />
                  <span className="text-sm tabular-nums">{s.progress}%</span>
                </div>
              </TableCell>
              <TableCell>
                <p className="font-semibold tabular-nums">
                  {s.attendanceRate === null ? t('roster.noMarks') : `${s.attendanceRate}%`}
                </p>
                <p className="text-xs text-ink-soft tabular-nums">
                  {t('roster.marks', { p: s.present, a: s.absent, e: s.excused })}
                </p>
              </TableCell>
              <TableCell>
                <StatusBadge tone={ASSESS_TONE[s.assessment]}>
                  {t(`filters.assessmentOpt.${s.assessment}`)}
                </StatusBadge>
              </TableCell>
              <TableCell>
                {s.pendingPracticals.length > 0 ? (
                  <StatusBadge tone="info">
                    {t('roster.toReview', { list: s.pendingPracticals.join(', ') })}
                  </StatusBadge>
                ) : (
                  <span className="text-sm text-ink-soft">{t('ui.none')}</span>
                )}
              </TableCell>
              <TableCell>
                {s.followUp ? (
                  <StatusBadge tone="notice">{t('roster.needsFollowUp')}</StatusBadge>
                ) : (
                  <StatusBadge tone="success">{t('roster.onTrack')}</StatusBadge>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
