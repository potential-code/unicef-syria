import { motion } from 'motion/react'
import { useTranslation } from 'react-i18next'

/** Profile-completion bar (brief §2 Y01). */
export function CompletionMeter({ value }: { value: number }) {
  const { t } = useTranslation('public')
  return (
    <div className="min-w-40 flex-1">
      <div className="mb-1.5 flex items-baseline justify-between gap-2 text-xs">
        <span className="inline-block font-semibold text-ink-soft first-letter:uppercase">
          {t('register.completionLabel')}
        </span>
        <span className="text-sm font-extrabold text-blue" aria-hidden>
          {value}%
        </span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-sky-100" aria-hidden>
        <motion.div
          className="h-full rounded-full bg-grad-unicef"
          initial={false}
          animate={{ width: `${value}%` }}
          transition={{ type: 'spring', stiffness: 80, damping: 18 }}
        />
      </div>
      <p className="sr-only" aria-live="polite">
        {t('register.completion', { value })}
      </p>
    </div>
  )
}
