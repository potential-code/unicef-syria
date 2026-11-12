import type { FollowUp } from '@shared/types'
import { BadgeCheck, MessageSquareText } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import { saveFollowUp } from '@/store/actions/followups'

const WORK_TYPES = ['job', 'internship', 'partTime', 'freelance', 'ownBusiness'] as const

/**
 * Short follow-up form (brief §18). "Save as learner-reported" and "Confirm from employer" are
 * distinct actions with distinct outcome sources.
 */
export function FollowUpForm({ f, onDone }: { f: FollowUp; onDone: () => void }) {
  const { t } = useTranslation('admin')
  const r = f.record
  const [employed, setEmployed] = useState(r ? (r.employed ? 'yes' : 'no') : '')
  const [workType, setWorkType] = useState(r?.workType ?? '')
  const [startDate, setStartDate] = useState(r?.startDate ?? '')
  const [still, setStill] = useState(r?.stillInRole ?? true)
  const [challenges, setChallenges] = useState(r?.challenges ?? '')
  const [support, setSupport] = useState(r?.support ?? '')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [busy, setBusy] = useState<'reported' | 'confirmed' | null>(null)

  const submit = (confirmed: boolean) => {
    const e: Record<string, string> = {}
    if (!employed) e.employed = t('followup.form.required')
    if (employed === 'yes' && !workType) e.workType = t('followup.form.required')
    if (employed === 'yes' && !startDate) e.startDate = t('followup.form.required')
    setErrors(e)
    if (Object.keys(e).length) return
    setBusy(confirmed ? 'confirmed' : 'reported')
    window.setTimeout(() => {
      saveFollowUp(
        f.id,
        {
          employed: employed === 'yes',
          workType: employed === 'yes' ? workType : undefined,
          startDate: employed === 'yes' ? startDate : undefined,
          stillInRole: employed === 'yes' ? still : undefined,
          challenges,
          support,
        },
        confirmed,
      )
      setBusy(null)
      toast.success(
        confirmed ? t('followup.form.confirmedToast') : t('followup.form.reportedToast'),
      )
      onDone()
    }, 500)
  }

  const err = (k: string) =>
    errors[k] && (
      <p id={`${k}-err`} className="text-xs font-medium text-danger">
        {errors[k]}
      </p>
    )
  return (
    <form className="space-y-5" onSubmit={(e) => e.preventDefault()} noValidate>
      <fieldset className="space-y-2">
        <legend className="text-sm font-medium">{t('followup.form.status')}</legend>
        <RadioGroup
          value={employed}
          onValueChange={setEmployed}
          className="flex gap-4"
          aria-describedby={errors.employed ? 'employed-err' : undefined}
        >
          {['yes', 'no'].map((v) => (
            <div key={v} className="flex min-h-11 items-center gap-2">
              <RadioGroupItem id={`emp-${v}`} value={v} />
              <Label htmlFor={`emp-${v}`}>{t(`followup.form.employed.${v}`)}</Label>
            </div>
          ))}
        </RadioGroup>
        {err('employed')}
      </fieldset>
      {employed === 'yes' && (
        <>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="fu-type">{t('followup.form.workType')}</Label>
              <Select value={workType} onValueChange={setWorkType}>
                <SelectTrigger id="fu-type" className="w-full" aria-invalid={!!errors.workType}>
                  <SelectValue placeholder={t('followup.form.choose')} />
                </SelectTrigger>
                <SelectContent>
                  {WORK_TYPES.map((w) => (
                    <SelectItem key={w} value={w}>
                      {t(`followup.form.types.${w}`)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {err('workType')}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="fu-start">{t('followup.form.startDate')}</Label>
              <Input
                id="fu-start"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                aria-invalid={!!errors.startDate}
              />
              {err('startDate')}
            </div>
          </div>
          <div className="flex min-h-11 items-center justify-between gap-3 rounded-2xl border p-3">
            <Label htmlFor="fu-still">{t('followup.form.stillInRole')}</Label>
            <Switch id="fu-still" checked={still} onCheckedChange={setStill} />
          </div>
        </>
      )}
      <div className="space-y-1.5">
        <Label htmlFor="fu-ch">{t('followup.form.challenges')}</Label>
        <Textarea
          id="fu-ch"
          value={challenges}
          onChange={(e) => setChallenges(e.target.value)}
          rows={2}
        />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="fu-sup">{t('followup.form.support')}</Label>
        <Textarea
          id="fu-sup"
          value={support}
          onChange={(e) => setSupport(e.target.value)}
          rows={2}
        />
      </div>
      <p className="text-xs text-ink-soft">{t('followup.form.sourceNote')}</p>
      <div className="flex flex-col gap-2 sm:flex-row">
        <Button
          type="button"
          variant="outline"
          className="flex-1 rounded-full"
          disabled={!!busy}
          onClick={() => submit(false)}
        >
          <MessageSquareText className="size-4" aria-hidden />
          {busy === 'reported' ? t('processing') : t('followup.form.saveReported')}
        </Button>
        <Button
          type="button"
          className="flex-1 rounded-full"
          disabled={!!busy}
          onClick={() => submit(true)}
        >
          <BadgeCheck className="size-4" aria-hidden />
          {busy === 'confirmed' ? t('processing') : t('followup.form.confirmEmployer')}
        </Button>
      </div>
    </form>
  )
}
