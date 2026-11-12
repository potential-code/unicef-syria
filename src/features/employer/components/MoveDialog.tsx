import type { Application, ApplicationStage } from '@shared/types'
import { Loader2 } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { now } from '@/lib/clock'
import { moveApplication } from '@/store/actions/applications'
import { savePlacementDetail } from '@/store/actions/employer-extra'
import { WORK_TYPES } from '../config'
import { ChoiceSelect } from './ChoiceSelect'
import { Field } from './Field'

/**
 * Records a stage change that needs details: interview or discussion date, confirmed job start
 * (start date, role, work type), freelance selection, delivery start and completion.
 */
export function MoveDialog({
  app,
  target,
  roleTitle,
  open,
  onOpenChange,
}: {
  app: Application
  target: ApplicationStage
  roleTitle: string
  open: boolean
  onOpenChange: (o: boolean) => void
}) {
  const { t } = useTranslation('employer')
  const today = now().slice(0, 10)
  const [date, setDate] = useState(today)
  const [role, setRole] = useState(roleTitle)
  const [workType, setWorkType] = useState<(typeof WORK_TYPES)[number]>('fullTime')
  const [fee, setFee] = useState('')
  const [note, setNote] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const hired = target === 'hired'
  const fcomplete = target === 'completed' && app.track === 'freelance'

  const confirm = () => {
    if (!date) return setError(t('move.dateRequired'))
    if (hired && !role.trim()) return setError(t('move.roleRequired'))
    setBusy(true)
    window.setTimeout(() => {
      const wt = t(`workTypes.${workType}`)
      const parts = hired
        ? [t('move.noteHired', { date, role: role.trim(), workType: wt })]
        : [t(`move.noteDate.${target}`, { date })]
      if (fcomplete && fee.trim()) parts.push(t('move.noteFee', { fee: fee.trim() }))
      if (note.trim()) parts.push(note.trim())
      if (hired) savePlacementDetail(app.id, { startDate: date, role: role.trim(), workType })
      if (target === 'interview' || target === 'clientDiscussion')
        savePlacementDetail(app.id, { interviewDate: date })
      if (target === 'selected') savePlacementDetail(app.id, { selectionDate: date })
      if (target === 'inDelivery') savePlacementDetail(app.id, { startDate: date })
      if (fcomplete) savePlacementDetail(app.id, { sampleFee: fee.trim() || undefined })
      moveApplication(app.id, target, parts.join('. '))
      setBusy(false)
      onOpenChange(false)
      toast.success(t(`move.done.${target}`, { defaultValue: t('move.doneGeneric') }))
    }, 500)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-2xl sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{t(`actions.${target}`)}</DialogTitle>
          <DialogDescription>
            {t(`move.body.${target}`, { defaultValue: t('move.bodyGeneric') })}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <Field
            id="mv-date"
            label={t(hired ? 'move.startDate' : `move.dateLabel.${target}`, {
              defaultValue: t('move.date'),
            })}
            error={error}
          >
            <Input
              id="mv-date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </Field>
          {hired && (
            <>
              <Field id="mv-role" label={t('move.role')}>
                <Input id="mv-role" value={role} onChange={(e) => setRole(e.target.value)} />
              </Field>
              <Field id="mv-type" label={t('move.workType')}>
                <ChoiceSelect
                  id="mv-type"
                  value={workType}
                  onChange={setWorkType}
                  options={WORK_TYPES.map((v) => ({ value: v, label: t(`workTypes.${v}`) }))}
                />
              </Field>
            </>
          )}
          {fcomplete && (
            <Field id="mv-fee" label={t('move.fee')} hint={t('move.feeHint')}>
              <Input id="mv-fee" value={fee} onChange={(e) => setFee(e.target.value)} />
            </Field>
          )}
          <Field id="mv-note" label={t('move.note')}>
            <Textarea id="mv-note" value={note} onChange={(e) => setNote(e.target.value)} />
          </Field>
        </div>
        <DialogFooter className="gap-2">
          <Button variant="ghost" onClick={() => onOpenChange(false)}>
            {t('common:cancel')}
          </Button>
          <Button disabled={busy} onClick={confirm} className="rounded-full">
            {busy && <Loader2 className="size-4 animate-spin" aria-hidden />}
            {t(`actions.${target}`)}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
