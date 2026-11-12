import type { Youth } from '@shared/types'
import { Lock } from 'lucide-react'
import { motion } from 'motion/react'
import { useTranslation } from 'react-i18next'
import { StatusBadge } from '@/components/shared/StatusBadge'
import { cn } from '@/lib/utils'
import { BADGES } from '../config'

/** Earned and locked badges with how to unlock them. */
export function BadgeGrid({ youth }: { youth: Youth }) {
  const { t } = useTranslation('learn')
  return (
    <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
      {BADGES.map((b) => {
        const earned = youth.badges.includes(b.id)
        return (
          <motion.li
            key={b.id}
            whileHover={{ y: -4 }}
            className={cn(
              'flex flex-col items-center rounded-3xl border p-5 text-center shadow-sm',
              earned ? 'bg-white' : 'bg-muted',
            )}
          >
            <span
              className={cn(
                'flex size-16 items-center justify-center rounded-full shadow-md',
                earned ? b.tone : 'bg-white text-ink-soft',
              )}
            >
              {earned ? (
                <b.icon className="size-8" aria-hidden />
              ) : (
                <Lock className="size-7" aria-hidden />
              )}
            </span>
            <p className="mt-3 font-bold">{t(`badges.${b.id}.name`)}</p>
            <StatusBadge tone={earned ? 'success' : 'neutral'} className="mt-2">
              {earned ? t('progress.earned') : t('progress.locked')}
            </StatusBadge>
            <p className="mt-2 text-xs text-ink-soft">{t(`badges.${b.id}.how`)}</p>
          </motion.li>
        )
      })}
    </ul>
  )
}
