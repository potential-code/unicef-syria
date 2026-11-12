import type { TemplateId } from '@shared/types'
import { Copy, Download, FileText } from 'lucide-react'
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
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { TEMPLATE_BY_ID } from '@/data/templates'
import { useLocalized } from '@/i18n'
import { cn } from '@/lib/utils'
import { PlaceholderLabel } from './PlaceholderLabel'

/** Editable text template in a dialog, with copy and download as .txt (brief §6 resources). */
export function TemplateDialog({
  id,
  className,
  compact,
}: {
  id: TemplateId
  className?: string
  compact?: boolean
}) {
  const { t } = useTranslation('learn')
  const { l } = useLocalized()
  const tpl = TEMPLATE_BY_ID[id]
  const [text, setText] = useState(() => l(tpl.body))
  const fieldId = `tpl-${id}`

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      toast.success(t('template.copied'))
    } catch {
      toast.error(t('template.copyFailed'))
    }
  }
  const download = () => {
    const url = URL.createObjectURL(new Blob([text], { type: 'text/plain;charset=utf-8' }))
    const a = document.createElement('a')
    a.href = url
    a.download = `${id}-template.txt`
    a.click()
    URL.revokeObjectURL(url)
    toast.success(t('template.downloaded'))
  }

  return (
    <Dialog onOpenChange={(open) => open && setText(l(tpl.body))}>
      <DialogTrigger asChild>
        <button
          type="button"
          className={cn(
            'lift group flex min-h-12 w-full items-center gap-3 rounded-2xl border bg-white p-3 text-start shadow-sm',
            compact && 'p-2.5',
            className,
          )}
        >
          <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-yellow text-ink">
            <FileText className="size-5" aria-hidden />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block font-semibold">{l(tpl.title)}</span>
            <span className="block text-xs text-ink-soft">{t('template.hint')}</span>
          </span>
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>{l(tpl.title)}</DialogTitle>
          <DialogDescription>{t('template.description')}</DialogDescription>
        </DialogHeader>
        <PlaceholderLabel value={tpl.body} />
        <Label htmlFor={fieldId} className="sr-only">
          {l(tpl.title)}
        </Label>
        <Textarea
          id={fieldId}
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="min-h-80 font-mono text-sm"
          dir="auto"
        />
        <DialogFooter className="gap-2 sm:justify-start">
          <Button type="button" variant="outline" className="rounded-full" onClick={copy}>
            <Copy className="size-4" aria-hidden />
            {t('template.copy')}
          </Button>
          <Button type="button" className="rounded-full" onClick={download}>
            <Download className="size-4" aria-hidden />
            {t('template.download')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
