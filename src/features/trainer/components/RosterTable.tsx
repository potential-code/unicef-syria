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
  const progress = (s: LearnerStats) => (
    <div className="flex items-center gap-2">
      <Progress value={s.progress} className="h-1.5 w-20" aria-label={t('roster.progress')} />
      <span className="text-sm font-semibold tabular-nums">{s.progress}%</span>
    </div>
  )
  const attendance = (s: LearnerStats) => (
    <>
      <p className="font-semibold tabular-nums">
        {s.attendanceRate === null ? t('roster.noMarks') : `${s.attendanceRate}%`}
      </p>
      <p className="text-xs text-ink-soft tabular-nums">
        {t('roster.marks', { p: s.present, a: s.absent, e: s.excused })}
      </p>
    </>
  )
  const assessment = (s: LearnerStats) => (
    <StatusBadge tone={ASSESS_TONE[s.assessment]}>
      {t(`filters.assessmentOpt.${s.assessment}`)}
    </StatusBadge>
  )
  const practical = (s: LearnerStats) =>
    s.pendingPracticals.length > 0 ? (
      <StatusBadge tone="info">
        {t('roster.toReview', { list: s.pendingPracticals.join(', ') })}
      </StatusBadge>
    ) : (
      <span className="text-sm text-ink-soft">{t('ui.none')}</span>
    )
  const follow = (s: LearnerStats) =>
    s.followUp ? (
      <StatusBadge tone="notice">{t('roster.needsFollowUp')}</StatusBadge>
    ) : (
      <StatusBadge tone="success">{t('roster.onTrack')}</StatusBadge>
    )

  return (
    <>
      <div className="card hidden overflow-hidden xl:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t('ui.learner')}</TableHead>
              <TableHead>{t('roster.progress')}</TableHead>
              <TableHead>{t('roster.attendance')}</TableHead>
              <TableHead>{t('roster.assessment')}</TableHead>
              <TableHead>{t('roster.practical')}</TableHead>
              <TableHead>{t('roster.followUp')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((s) => (
              <TableRow key={s.youth.id}>
                <TableCell className="py-2.5">
                  <LearnerName youth={s.youth} sub={`${s.youth.id} · ${s.cohortId}`} />
                </TableCell>
                <TableCell>{progress(s)}</TableCell>
                <TableCell>{attendance(s)}</TableCell>
                <TableCell>{assessment(s)}</TableCell>
                <TableCell>{practical(s)}</TableCell>
                <TableCell>{follow(s)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <ul className="grid gap-3 md:grid-cols-2 xl:hidden">
        {rows.map((s) => (
          <li key={s.youth.id} className="card min-w-0 p-4">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <LearnerName
                youth={s.youth}
                sub={`${s.youth.id} · ${s.cohortId}`}
                className="min-w-0 flex-1"
              />
              <span className="shrink-0">{follow(s)}</span>
            </div>
            <dl className="mt-3 grid grid-cols-2 gap-3 border-t border-border/70 pt-3 text-sm">
              <div className="min-w-0">
                <dt className="text-xs font-semibold text-ink-soft">{t('roster.progress')}</dt>
                <dd className="mt-1">{progress(s)}</dd>
              </div>
              <div className="min-w-0">
                <dt className="text-xs font-semibold text-ink-soft">{t('roster.attendance')}</dt>
                <dd className="mt-1">{attendance(s)}</dd>
              </div>
              <div className="min-w-0">
                <dt className="text-xs font-semibold text-ink-soft">{t('roster.assessment')}</dt>
                <dd className="mt-1">{assessment(s)}</dd>
              </div>
              <div className="min-w-0">
                <dt className="text-xs font-semibold text-ink-soft">{t('roster.practical')}</dt>
                <dd className="mt-1">{practical(s)}</dd>
              </div>
            </dl>
          </li>
        ))}
      </ul>
    </>
  )
}
