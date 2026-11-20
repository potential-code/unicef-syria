import type { Unit } from '@shared/types'
import {
  CircleQuestionMark,
  FileText,
  type LucideIcon,
  MessageSquareQuote,
  Play,
} from 'lucide-react'

/** Learning block kinds a unit is built from, in the order the learner meets them. */
export type BlockKind = 'video' | 'lesson' | 'scenario' | 'check'

export const BLOCK_ICON: Record<BlockKind, LucideIcon> = {
  video: Play,
  lesson: FileText,
  scenario: MessageSquareQuote,
  check: CircleQuestionMark,
}

/** The unit's learning blocks: video preview, lesson text, scenario and knowledge check. */
export function unitBlocks(u: Unit): BlockKind[] {
  const out: BlockKind[] = []
  if (u.hasVideo && u.transcript) out.push('video')
  out.push('lesson')
  if (u.scenario || u.takeaway) out.push('scenario')
  if (u.check) out.push('check')
  return out
}
