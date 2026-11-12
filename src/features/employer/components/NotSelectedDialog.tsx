import type { Application } from '@shared/types'
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
  DialogTrigger,
} from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { moveApplication } from '@/store/actions/applications'
import { Field } from './Field'

/** Not selected with respectful feedback; never reveals other applicants (brief §16 required states). */
export function NotSelectedDialog({ app, name }: { app: Application; name: string }) {
  const { t } = useTranslation('employer')
  const [open, setOpen] = useState(false)
  const [text, setText] = useState(() => t('notSelected.template', { name: name.split(' ')[0] }))
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const confirm = () => {
    if (text.trim().length < 20) return setError(t('notSelected.error'))
    setBusy(true)
    window.setTimeout(() => {
      moveApplication(app.id, 'notSelected', undefined, text.trim())
      setBusy(false)
      setOpen(false)
      toast.success(t('notSelected.done'))
    }, 500)
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="text-ink">
          {t('actions.notSelected')}
        </Button>
      </DialogTrigger>
      <DialogContent className="rounded-2xl sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{t('notSelected.title')}</DialogTitle>
          <DialogDescription>{t('notSelected.body')}</DialogDescription>
        </DialogHeader>
        <Field
          id="ns-feedback"
          label={t('notSelected.label')}
          error={error}
          hint={t('notSelected.hint')}
        >
          <Textarea
            id="ns-feedback"
            rows={6}
            value={text}
            onChange={(e) => setText(e.target.value)}
            aria-invalid={!!error || undefined}
          />
        </Field>
        <DialogFooter className="gap-2">
          <Button variant="ghost" onClick={() => setOpen(false)}>
            {t('common:cancel')}
          </Button>
          <Button disabled={busy} onClick={confirm} className="rounded-full">
            {busy && <Loader2 className="size-4 animate-spin" aria-hidden />}
            {t('notSelected.confirm')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
