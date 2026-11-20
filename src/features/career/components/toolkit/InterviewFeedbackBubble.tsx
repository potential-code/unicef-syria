import type { CoachId } from '@shared/types'
import { ArrowRight, RotateCcw, Save } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import type { Criterion, PracticeFeedback } from '../../config/toolkit'
import { CoachBubble } from './CoachBubble'
import { RatingBadge } from './RatingBadge'

const CRITERIA: Criterion[] = ['relevance', 'clarity', 'evidence']

/** Lina AI's reply: descriptive ratings, one next step and the follow-up actions. */
export function InterviewFeedbackBubble({
  coachId,
  feedback,
  active,
  saved,
  lastQuestion,
  onSave,
  onRetry,
  onNext,
}: {
  coachId: CoachId
  feedback: PracticeFeedback
  active: boolean
  saved: boolean
  lastQuestion: boolean
  onSave: () => void
  onRetry: () => void
  onNext: () => void
}) {
  const { t } = useTranslation('career')
  return (
    <CoachBubble coachId={coachId}>
      <p>{t(`toolkit.interview.sim.reply.${feedback.overall}`)}</p>
      <ul className="mt-3 space-y-2" aria-label={t('toolkit.interview.feedbackTitle')}>
        {CRITERIA.map((c) => (
          <li key={c} className="rounded-xl bg-sky-50 px-3 py-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-sm font-semibold">{t(`toolkit.criteria.${c}`)}</span>
              <RatingBadge rating={feedback[c]} />
            </div>
            <p className="mt-0.5 text-sm text-ink-soft">
              {t(`toolkit.interview.tips.${c}.${feedback[c]}`)}
            </p>
          </li>
        ))}
      </ul>
      <p className="mt-3 rounded-xl border-s-4 border-s-blue bg-sky-50 px-3 py-2 text-sm">
        <span className="font-bold text-blue">{t('toolkit.interview.nextStep')}: </span>
        {t(`toolkit.interview.next.${feedback.focus}`)}
      </p>
      {active && (
        <div className="mt-3 flex flex-wrap gap-2">
          <Button size="sm" className="rounded-full" onClick={onSave} disabled={saved}>
            <Save className="size-4" aria-hidden />
            {saved ? t('toolkit.interview.savedBtn') : t('toolkit.interview.save')}
          </Button>
          <Button size="sm" variant="outline" className="rounded-full" onClick={onRetry}>
            <RotateCcw className="size-4" aria-hidden />
            {t('toolkit.interview.sim.retry')}
          </Button>
          <Button size="sm" variant="outline" className="rounded-full" onClick={onNext}>
            {lastQuestion ? t('toolkit.interview.sim.restart') : t('toolkit.interview.sim.next')}
            <ArrowRight className="size-4 rtl-mirror" aria-hidden />
          </Button>
        </div>
      )}
    </CoachBubble>
  )
}
