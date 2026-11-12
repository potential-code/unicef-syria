import { motion } from 'motion/react'
import { useTranslation } from 'react-i18next'

/** Profile completion ring with a plain-language status. */
export function CompletionMeter({ value, complete }: { value: number; complete: boolean }) {
  const { t } = useTranslation('career')
  const r = 28
  const c = 2 * Math.PI * r
  return (
    <div className="flex items-center gap-4 rounded-2xl bg-white/15 p-3 pe-5">
      <svg
        width="72"
        height="72"
        viewBox="0 0 72 72"
        className="-rotate-90"
        role="img"
        aria-label={t('profile.completion', { value })}
      >
        <circle
          cx="36"
          cy="36"
          r={r}
          fill="none"
          stroke="currentColor"
          strokeOpacity="0.25"
          strokeWidth="8"
        />
        <motion.circle
          cx="36"
          cy="36"
          r={r}
          fill="none"
          stroke="currentColor"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          animate={{ strokeDashoffset: c - (c * value) / 100 }}
          transition={{ duration: 0.8 }}
          className="text-yellow"
        />
      </svg>
      <div>
        <p className="text-2xl font-bold tabular-nums text-white">{value}%</p>
        <p className="text-sm text-white/85">
          {complete ? t('profile.requiredDone') : t('profile.requiredMissing')}
        </p>
      </div>
    </div>
  )
}
