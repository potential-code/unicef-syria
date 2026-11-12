import { CircleCheck } from 'lucide-react'
import { motion } from 'motion/react'
import { useTranslation } from 'react-i18next'
import { StatCard } from '@/components/shared/StatCard'

/** Profile completion as a stat card with a plain-language status and a progress bar. */
export function CompletionMeter({ value, complete }: { value: number; complete: boolean }) {
  const { t } = useTranslation('career')
  return (
    <StatCard
      tone={complete ? 'blue' : 'yellow'}
      icon={CircleCheck}
      label={t('profile.completionLabel')}
      value={`${value}%`}
      hint={complete ? t('profile.requiredDone') : t('profile.requiredMissing')}
      footer={
        <div
          className="h-2 overflow-hidden rounded-full bg-black/15"
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={t('profile.completion', { value })}
        >
          <motion.div
            className={complete ? 'h-full rounded-full bg-yellow' : 'h-full rounded-full bg-navy'}
            initial={{ width: 0 }}
            animate={{ width: `${value}%` }}
            transition={{ duration: 0.8 }}
          />
        </div>
      }
    />
  )
}
