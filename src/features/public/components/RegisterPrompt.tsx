import { Link } from '@tanstack/react-router'
import { ArrowRight, BookmarkCheck, ShieldCheck, Sparkles } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Motif } from '@/components/brand'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import type { GatePrompt } from '../hooks/use-gate'

/** Shown when a visitor without a profile tries to enrol, save or apply. */
export function RegisterPrompt({
  prompt,
  onClose,
}: {
  prompt: GatePrompt | null
  onClose: () => void
}) {
  const { t } = useTranslation('public')
  return (
    <Dialog open={!!prompt} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="overflow-hidden p-0 sm:max-w-md">
        <div className="on-dark relative overflow-hidden bg-grad-unicef px-6 pt-7 pb-6 text-white">
          <Motif variant="card" className="text-white/[0.12]" />
          <DialogHeader className="relative text-start">
            <p className="flex items-center gap-1.5 text-xs font-bold tracking-widest text-yellow uppercase">
              <Sparkles className="size-4" aria-hidden />
              {t('common:appFullName')}
            </p>
            <DialogTitle className="text-2xl text-white">{t('prompt.title')}</DialogTitle>
            <DialogDescription className="text-white/85">
              {t('prompt.body', { item: prompt?.item ?? '' })}
            </DialogDescription>
          </DialogHeader>
        </div>
        <div className="space-y-4 px-6 pb-6">
          <ul className="space-y-2 text-sm text-ink-soft">
            <li className="flex gap-2">
              <BookmarkCheck className="mt-0.5 size-4 shrink-0 text-blue" aria-hidden />
              {t('prompt.point1')}
            </li>
            <li className="flex gap-2">
              <ShieldCheck className="mt-0.5 size-4 shrink-0 text-blue" aria-hidden />
              {t('prompt.point2')}
            </li>
          </ul>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Button asChild className="flex-1 rounded-full">
              <Link to="/register" search={{ next: prompt?.next }} onClick={onClose}>
                {t('prompt.create')}
                <ArrowRight className="size-4 rtl-mirror" aria-hidden />
              </Link>
            </Button>
            <Button asChild variant="outline" className="flex-1 rounded-full">
              <Link to="/sign-in" onClick={onClose}>
                {t('prompt.signIn')}
              </Link>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
