import type { Youth } from '@shared/types'
import { CheckCircle2, UserPlus } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { StatusBadge, type Tone } from '@/components/shared/StatusBadge'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  assignCohort,
  cohortForProgramme,
  decideTrainingApplication,
} from '@/store/actions/sessions'
import { useLabels } from '../lib/useLabels'
import { LearnerName } from './LearnerName'

const TONE: Record<string, Tone> = {
  pending: 'info',
  needsInfo: 'notice',
  accepted: 'success',
  waitlisted: 'neutral',
  notSelected: 'neutral',
}

/** Training applications for the centre's programmes, with accept and assign-to-cohort actions. */
export function ApplicationsTable({ youth }: { youth: Youth[] }) {
  const { t } = useTranslation('admin')
  const { d, programme } = useLabels()
  const [busy, setBusy] = useState<string | null>(null)
  const run = (id: string, fn: () => void, msg: string) => {
    setBusy(id)
    window.setTimeout(() => {
      fn()
      setBusy(null)
      toast.success(msg)
    }, 450)
  }
  return (
    <div className="card overflow-hidden">
      <Table className="min-w-[44rem] lg:min-w-0 [&_th]:whitespace-normal">
        <TableHeader>
          <TableRow>
            <TableHead>{t('table.learner')}</TableHead>
            <TableHead>{t('table.programme')}</TableHead>
            <TableHead>{t('table.applied')}</TableHead>
            <TableHead>{t('table.status')}</TableHead>
            <TableHead className="text-end">{t('table.action')}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {youth.map((y) => {
            const app = y.trainingApplication
            if (!app) return null
            const cohort = cohortForProgramme(app.programmeId)
            const inCohort = !!cohort && y.cohortIds.includes(cohort)
            return (
              <TableRow key={y.id}>
                <TableCell>
                  <LearnerName y={y} to="/centre/participants/$youthId" />
                </TableCell>
                <TableCell>
                  {app.programmeId} {programme(app.programmeId)}
                </TableCell>
                <TableCell className="tabular-nums">{d(app.at)}</TableCell>
                <TableCell>
                  <StatusBadge tone={TONE[app.status]}>{t(`appStatus.${app.status}`)}</StatusBadge>
                </TableCell>
                <TableCell className="text-end">
                  {app.status === 'accepted' && cohort && !inCohort && (
                    <Button
                      size="sm"
                      className="rounded-full"
                      disabled={busy === y.id}
                      onClick={() =>
                        run(
                          y.id,
                          () => assignCohort(y.id, cohort),
                          t('participants.assigned', { name: y.profile.name, cohort }),
                        )
                      }
                    >
                      <UserPlus className="size-4" aria-hidden />
                      {busy === y.id ? t('processing') : t('participants.assign', { cohort })}
                    </Button>
                  )}
                  {app.status === 'accepted' && inCohort && (
                    <span className="inline-flex items-center gap-1 text-sm font-medium text-success">
                      <CheckCircle2 className="size-4" aria-hidden />
                      {t('participants.inCohort', { cohort })}
                    </span>
                  )}
                  {(app.status === 'pending' ||
                    app.status === 'needsInfo' ||
                    app.status === 'waitlisted') && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="rounded-full"
                      disabled={busy === y.id}
                      onClick={() =>
                        run(
                          y.id,
                          () => decideTrainingApplication(y.id, 'accepted'),
                          t('participants.accepted', { name: y.profile.name }),
                        )
                      }
                    >
                      {busy === y.id ? t('processing') : t('participants.accept')}
                    </Button>
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
