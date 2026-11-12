import { motion } from 'motion/react'
import { useTranslation } from 'react-i18next'

/** Profile-completion ring (brief §2 Y01). */
export function CompletionMeter({ value }: { value: number }) {
  const { t } = useTranslation('public')
  const r = 26
  const c = 2 * Math.PI * r
  return (
    <div className="flex items-center gap-3">
      <svg viewBox="0 0 64 64" className="size-16 -rotate-90" aria-hidden>
        <circle cx="32" cy="32" r={r} className="fill-none stroke-white/20" strokeWidth="7" />
        <motion.circle
          cx="32"
          cy="32"
          r={r}
          className="fill-none stroke-yellow"
          strokeWidth="7"
          strokeLinecap="round"
          strokeDasharray={c}
          animate={{ strokeDashoffset: c - (c * value) / 100 }}
          transition={{ type: 'spring', stiffness: 80, damping: 18 }}
        />
      </svg>
      <div>
        <p className="text-2xl leading-none font-extrabold text-white" aria-hidden>
          {value}%
        </p>
        <p className="sr-only" aria-live="polite">
          {t('register.completion', { value })}
        </p>
        <p className="text-sm text-white/80">{t('register.completionLabel')}</p>
      </div>
    </div>
  )
}
