import type { Coach, CoachStep, ToolkitTarget, Youth } from '@shared/types'
import { CornerDownRight } from 'lucide-react'
import { motion } from 'motion/react'
import { useLocalized } from '@/i18n'
import { LText } from '../LText'
import { CoachAvatar } from './CoachAvatar'
import { CourseSuggestions } from './CourseSuggestions'
import { DraftCard } from './DraftCard'

/** Coach bubble: scripted text, optional draft card, course suggestions and reply buttons. */
export function CoachMessage({
  coach,
  step,
  text,
  youth,
  active,
  onReply,
  onUseDraft,
}: {
  coach: Coach
  step?: CoachStep
  text?: string
  youth: Youth
  active?: boolean
  onReply?: (label: string, next: string) => void
  onUseDraft?: (target: ToolkitTarget, text: string) => void
}) {
  const { l } = useLocalized()
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-start gap-2"
    >
      <CoachAvatar coachId={coach.id} size="sm" className="mt-1" />
      <div className="min-w-0 max-w-[92%] flex-1 sm:max-w-[85%]">
        <div className="rounded-2xl rounded-ss-sm border border-border/60 bg-white px-4 py-3 shadow-sm">
          <p className="text-xs font-bold text-navy">{l(coach.name)}</p>
          <p className="mt-0.5 whitespace-pre-line">{step ? <LText value={step.coach} /> : text}</p>
        </div>
        {step?.draft && onUseDraft && (
          <DraftCard
            target={step.draft.target}
            initial={l(step.draft.text)}
            onUse={(t) => onUseDraft(step.draft?.target ?? 'plan', t)}
          />
        )}
        {step?.courses && <CourseSuggestions courses={step.courses} youth={youth} />}
        {active && step?.replies && step.replies.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {step.replies.map((r) => (
              <button
                key={`${r.next}-${r.label.en}`}
                type="button"
                onClick={() => onReply?.(l(r.label), r.next)}
                className="flex min-h-9 items-center gap-1.5 rounded-full border border-blue/40 bg-white px-3.5 py-1.5 text-start text-sm font-semibold text-blue shadow-xs transition-colors hover:border-blue hover:bg-blue hover:text-white"
              >
                <CornerDownRight className="size-4 shrink-0 rtl-mirror" aria-hidden />
                {l(r.label)}
              </button>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  )
}
