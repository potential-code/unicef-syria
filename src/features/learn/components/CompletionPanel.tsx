import type { CourseId, CourseProgress } from '@shared/types'
import { Link } from '@tanstack/react-router'
import { Award, PartyPopper } from 'lucide-react'
import { motion } from 'motion/react'
import { useTranslation } from 'react-i18next'
import { LaurelWreath, Motif } from '@/components/brand'
import { Button } from '@/components/ui/button'
import { POINTS } from '@/domain/points'
import { Burst } from './Burst'

/** Course completed: celebration, points earned and the certificate state. */
export function CompletionPanel({
  courseId,
  progress,
}: {
  courseId: CourseId
  progress: CourseProgress
}) {
  const { t } = useTranslation('learn')
  const cert = progress.certificate ?? 'pendingReview'
  return (
    <section
      className="on-dark relative overflow-hidden rounded-3xl bg-grad-unicef p-6 text-center text-white shadow-lg sm:p-10"
      aria-live="polite"
    >
      <Motif variant="banner" className="text-white/[0.1]" />
      <Burst />
      <motion.span
        initial={{ scale: 0.4, rotate: -20 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 14 }}
        className="relative mx-auto flex h-24 w-32 items-center justify-center"
        aria-hidden
      >
        <LaurelWreath className="absolute inset-0 size-full text-yellow" />
        <PartyPopper className="relative -mt-2 size-10 text-white" />
      </motion.span>
      <h2 className="relative mt-5 text-3xl text-white">{t('complete.title')}</h2>
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="relative mx-auto mt-3 inline-flex rounded-full bg-white px-5 py-2 text-2xl font-extrabold text-navy shadow-md"
      >
        {t('complete.points', { n: POINTS.course })}
      </motion.p>
      <p className="relative mx-auto mt-4 max-w-md text-white/90">{t('complete.body')}</p>
      <p className="relative mt-4 text-sm font-semibold">
        {t('complete.cert', { state: t(`common:certificate.${cert}`) })}
      </p>
      <div className="relative mt-6 flex flex-wrap justify-center gap-3">
        <Button
          asChild
          size="lg"
          className="rounded-full bg-yellow text-ink shadow-md hover:bg-white"
        >
          <Link to="/youth/certificate/$courseId" params={{ courseId }}>
            <Award className="size-4" aria-hidden />
            {cert === 'issued' ? t('complete.viewCert') : t('complete.certStatus')}
          </Link>
        </Button>
        <Button
          asChild
          size="lg"
          variant="ghost"
          className="rounded-full text-white hover:bg-white/15 hover:text-white"
        >
          <Link to="/youth/path">{t('complete.backToPath')}</Link>
        </Button>
      </div>
    </section>
  )
}
