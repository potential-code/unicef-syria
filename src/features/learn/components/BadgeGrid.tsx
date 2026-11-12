import type { Youth } from '@shared/types'
import { CircleCheck } from 'lucide-react'
import { motion } from 'motion/react'
import { useTranslation } from 'react-i18next'
import { BadgeMedal } from '@/components/shared/BadgeMedal'
import { cn } from '@/lib/utils'
import { BADGES } from '../config'

/** Achievement shelf: earned and locked laurel medals with how to unlock them. */
export function BadgeGrid({ youth, compact = false }: { youth: Youth; compact?: boolean }) {
  const { t } = useTranslation('learn')
  return (
    <ul
      className={cn(
        compact
          ? 'flex flex-wrap justify-center gap-x-1 gap-y-4'
          : 'grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 xl:grid-cols-5',
      )}
      aria-label={t('progress.badges')}
    >
      {BADGES.map((b) => {
        const earned = youth.badges.includes(b.id)
        return (
          <motion.li
            key={b.id}
            whileHover={{ y: -3 }}
            className={cn('flex flex-col items-center text-center', compact && 'w-[5.5rem]')}
          >
            <BadgeMedal badge={b.id} earned={earned} size={compact ? 64 : 96} />
            <span
              className={cn('mt-1 h-1.5 rounded-[50%] bg-navy/10', compact ? 'w-10' : 'w-14')}
              aria-hidden
            />
            <p
              className={cn(
                'mt-2 leading-tight font-bold',
                compact ? 'text-xs' : 'text-sm',
                earned ? 'text-ink' : 'text-ink-soft',
              )}
            >
              {t(`badges.${b.id}.name`)}
            </p>
            {earned ? (
              <p className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-success">
                <CircleCheck className="size-3.5" aria-hidden />
                {t('progress.earned')}
              </p>
            ) : (
              <p className="mt-1 text-xs font-semibold text-ink-soft">{t('progress.locked')}</p>
            )}
            {!compact && (
              <p className="mt-1.5 max-w-44 text-xs leading-snug text-ink-soft">
                {t(`badges.${b.id}.how`)}
              </p>
            )}
          </motion.li>
        )
      })}
    </ul>
  )
}
