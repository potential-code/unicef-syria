import type { CoachId } from '@shared/types'
import { motion } from 'motion/react'
import type { ReactNode } from 'react'
import { COACH_BY_ID } from '@/data/coaches'
import { useLocalized } from '@/i18n'
import { CoachAvatar } from '../coaches/CoachAvatar'

/** AI coach message bubble used by the practice simulation. */
export function CoachBubble({ coachId, children }: { coachId: CoachId; children: ReactNode }) {
  const { l } = useLocalized()
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-start gap-2"
    >
      <CoachAvatar coachId={coachId} size="sm" className="mt-1" />
      <div className="min-w-0 max-w-[92%] flex-1 rounded-2xl rounded-ss-sm border border-border/60 bg-white px-4 py-3 shadow-sm sm:max-w-[85%]">
        <p className="text-xs font-bold text-navy">{l(COACH_BY_ID[coachId].name)}</p>
        <div className="mt-0.5">{children}</div>
      </div>
    </motion.div>
  )
}
