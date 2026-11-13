import type { ProgrammeId, YouthId } from '@shared/types'
import { Send } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { applyToProgramme } from '@/store/actions/sessions'

const SLOTS = ['mornings', 'afternoons', 'flexible'] as const

/** Short application form for a centre programme: motivation and availability. */
export function ApplyDialog({
  youthId,
  programmeId,
  title,
}: {
  youthId: YouthId
  programmeId: ProgrammeId
  title: string
}) {
  const { t } = useTranslation('career')
  const [open, setOpen] = useState(false)
  const [why, setWhy] = useState('')
  const [slot, setSlot] = useState<string>('mornings')
  const [error, setError] = useState('')
  const submit = () => {
    if (why.trim().length < 15) return setError(t('programmes.form.whyError'))
    applyToProgramme(youthId, programmeId, why.trim(), t(`programmes.form.slots.${slot}`))
    setOpen(false)
    toast.success(t('programmes.form.sent'))
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="rounded-full">
          <Send className="size-4 rtl-mirror" aria-hidden />
          {t('programmes.apply')}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogTitle>{t('programmes.form.title', { title })}</DialogTitle>
        <DialogDescription>{t('programmes.form.body')}</DialogDescription>
        <div className="mt-2 space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="prog-why">{t('programmes.form.why')}</Label>
            <Textarea
              id="prog-why"
              rows={4}
              value={why}
              onChange={(e) => {
                setWhy(e.target.value)
                setError('')
              }}
              placeholder={t('programmes.form.whyPlaceholder')}
              aria-invalid={!!error}
              aria-describedby={error ? 'prog-why-error' : undefined}
            />
            {error && (
              <p id="prog-why-error" role="alert" className="text-sm font-medium text-danger">
                {error}
              </p>
            )}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="prog-slot">{t('programmes.form.availability')}</Label>
            <Select value={slot} onValueChange={setSlot}>
              <SelectTrigger id="prog-slot">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {SLOTS.map((s) => (
                  <SelectItem key={s} value={s}>
                    {t(`programmes.form.slots.${s}`)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <p className="rounded-xl bg-sky-50 p-3 text-xs text-ink-soft">
            {t('programmes.form.note')}
          </p>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setOpen(false)}>
              {t('common:cancel')}
            </Button>
            <Button onClick={submit}>{t('programmes.form.submit')}</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
