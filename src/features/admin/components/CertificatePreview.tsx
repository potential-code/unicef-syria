import type { CourseId } from '@shared/types'
import { Award, Eye } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Logo } from '@/components/shared/Logo'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { COURSE_BY_ID } from '@/data/courses'
import { useLabels } from '../lib/useLabels'
import { useScope } from '../lib/useScope'

/** Sample certificate of completion (not a qualification). */
export function CertificatePreview({ name, courseId }: { name: string; courseId: CourseId }) {
  const { t } = useTranslation('admin')
  const { l, centre } = useLabels()
  const { centreIds } = useScope()
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline" className="rounded-full">
          <Eye className="size-4" aria-hidden />
          {t('results.preview')}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl">
        <DialogTitle className="sr-only">{t('results.preview')}</DialogTitle>
        <DialogDescription className="sr-only">{t('results.previewNote')}</DialogDescription>
        <div className="relative overflow-hidden rounded-2xl border-4 border-double border-blue/40 bg-sky-50 p-8 text-center">
          <div
            className="pointer-events-none absolute -end-12 -top-12 size-40 rounded-full border-[18px] border-cyan/20"
            aria-hidden
          />
          <Logo className="mx-auto h-7" />
          <Award className="mx-auto mt-5 size-10 text-blue" aria-hidden />
          <p className="mt-3 text-xs font-semibold uppercase tracking-widest text-ink-soft">
            {t('results.certHeading')}
          </p>
          <p className="mt-3 text-2xl font-bold text-navy">{name}</p>
          <p className="mt-2 text-sm text-ink-soft">{t('results.certBody')}</p>
          <p className="mt-1 font-semibold">
            {courseId} {l(COURSE_BY_ID[courseId].title)}
          </p>
          <p className="mt-4 text-xs text-ink-soft">{centre(centreIds[0])}</p>
          <p className="mt-4 rounded-full bg-white px-3 py-1 text-[11px] text-ink-soft">
            {t('results.previewNote')}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
