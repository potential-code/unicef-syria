import type { Toolkit, YouthProfile } from '@shared/types'
import { Eye, Printer } from 'lucide-react'
import { useTranslation } from 'react-i18next'
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
import { CvSheet } from './CvSheet'

// While printing, show only the CV sheet (the rest of the app is hidden).
const PRINT_CSS =
  '@media print { body * { visibility: hidden !important; } #cv-print, #cv-print * { visibility: visible !important; } #cv-print { position: absolute; inset: 0; margin: 0; } }'

/** Preview the CV as a document and print (or save as PDF) a sample copy. */
export function CvPreviewDialog({
  cv,
  profile,
}: {
  cv: NonNullable<Toolkit['cv']>
  profile: YouthProfile
}) {
  const { t } = useTranslation('career')
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="rounded-full">
          <Eye className="size-4" aria-hidden />
          {t('toolkit.cv.preview')}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <style>{PRINT_CSS}</style>
        <DialogHeader>
          <DialogTitle>{t('toolkit.cv.previewTitle')}</DialogTitle>
          <DialogDescription>{t('toolkit.cv.previewBody')}</DialogDescription>
        </DialogHeader>
        <div id="cv-print">
          <CvSheet cv={cv} profile={profile} />
        </div>
        <DialogFooter>
          <Button className="rounded-full" onClick={() => window.print()}>
            <Printer className="size-4" aria-hidden />
            {t('toolkit.cv.print')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
