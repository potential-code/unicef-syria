import type { Course, Youth } from '@shared/types'
import { Award } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { GlobeGrid, LaurelBranch, LaurelWreath } from '@/components/brand'
import { Logo } from '@/components/shared/Logo'
import { formatDate, useLocalized } from '@/i18n'
import { certificateId } from '../lib'

/** UNICEF-style demonstration certificate. Never described as accredited (brief §6). */
export function CertificatePreview({
  youth,
  course,
  completedAt,
}: {
  youth: Youth
  course: Course
  completedAt: string
}) {
  const { t } = useTranslation('learn')
  const { l, lang } = useLocalized()
  return (
    <div className="print-cert relative mx-auto w-full sm:aspect-[1.414/1] max-w-4xl overflow-hidden rounded-3xl border-8 border-sky-100 bg-white p-6 shadow-pop sm:p-12">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-2 bg-grad-unicef"
        aria-hidden
      />
      <GlobeGrid
        className="pointer-events-none absolute -end-20 -top-24 size-64 text-cyan/20"
        strokeWidth={1}
      />
      <LaurelBranch
        className="pointer-events-none absolute -end-2 -bottom-6 h-36 w-auto text-cyan/20"
        mirrored
      />
      <LaurelBranch className="pointer-events-none absolute -start-2 -bottom-6 h-36 w-auto text-cyan/20" />
      <p
        className="pointer-events-none absolute inset-0 flex items-center justify-center whitespace-nowrap text-2xl font-extrabold uppercase tracking-widest text-blue/10 select-none sm:text-5xl"
        style={{ transform: 'rotate(-18deg)' }}
        aria-hidden
      >
        {t('cert.watermark')}
      </p>
      <div className="relative flex h-full flex-col items-center justify-between gap-6 text-center sm:gap-0">
        <div className="flex w-full items-center justify-between">
          <Logo className="h-6 rounded bg-white p-0.5 sm:h-8" />
          <span className="rounded-full bg-yellow px-3 py-1 text-xs font-bold text-ink">
            {t('cert.watermark')}
          </span>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-blue sm:text-sm">
            {t('cert.heading')}
          </p>
          <p className="mt-2 text-sm text-ink-soft sm:mt-4">{t('cert.presented')}</p>
          <p className="mt-1 text-2xl font-extrabold text-navy sm:text-5xl">{youth.profile.name}</p>
          <p className="mt-2 text-sm text-ink-soft sm:mt-4">{t('cert.forCompleting')}</p>
          <p className="mt-1 text-lg font-bold sm:text-2xl">
            {course.id} · {l(course.title)}
          </p>
        </div>
        <div className="grid w-full grid-cols-3 items-end gap-2 text-xs sm:text-sm">
          <div className="text-start">
            <p className="text-ink-soft">{t('cert.date')}</p>
            <p className="font-bold">{formatDate(completedAt, lang)}</p>
          </div>
          <span
            className="relative mx-auto flex h-14 w-20 items-center justify-center sm:h-20 sm:w-28"
            aria-hidden
          >
            <LaurelWreath className="absolute inset-0 h-full text-yellow" />
            <Award className="relative -mt-1 size-6 text-blue sm:size-8" />
          </span>
          <div className="text-end">
            <p className="text-ink-soft">{t('cert.id')}</p>
            <p className="font-mono font-bold">{certificateId(course.id, youth.id)}</p>
          </div>
        </div>
        <p className="text-[10px] text-ink-soft sm:text-xs">{t('cert.disclaimer')}</p>
      </div>
    </div>
  )
}
