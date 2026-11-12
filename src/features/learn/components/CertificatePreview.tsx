import type { Course, Youth } from '@shared/types'
import { Award } from 'lucide-react'
import { useTranslation } from 'react-i18next'
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
      <span
        className="pointer-events-none absolute -start-20 -top-20 size-64 rounded-full bg-grad-unicef opacity-90"
        aria-hidden
      />
      <span
        className="pointer-events-none absolute -end-16 -bottom-16 size-56 rounded-full border-[24px] border-cyan/30"
        aria-hidden
      />
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
          <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-grad-sunrise text-white shadow-md sm:size-16">
            <Award className="size-7 sm:size-9" aria-hidden />
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
