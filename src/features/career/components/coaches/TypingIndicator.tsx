import type { CoachId } from '@shared/types'
import { motion } from 'motion/react'
import { useTranslation } from 'react-i18next'
import { CoachAvatar } from './CoachAvatar'

/** Three bouncing dots while the scripted reply "types". */
export function TypingIndicator({ coachId, name }: { coachId: CoachId; name: string }) {
  const { t } = useTranslation('career')
  return (
    <div className="flex items-end gap-2" role="status" aria-label={t('coaches.typing', { name })}>
      <CoachAvatar coachId={coachId} className="size-9 rounded-xl" />
      <div className="flex gap-1.5 rounded-2xl rounded-es-sm bg-white px-4 py-3 shadow-sm">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="size-2 rounded-full bg-blue"
            animate={{ y: [0, -5, 0], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY, delay: i * 0.15 }}
          />
        ))}
      </div>
    </div>
  )
}
