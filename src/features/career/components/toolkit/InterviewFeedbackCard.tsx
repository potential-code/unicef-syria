import { Save } from 'lucide-react'
import { motion } from 'motion/react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import type { Criterion, PracticeFeedback } from '../../config/toolkit'
import { RatingBadge } from './RatingBadge'

const CRITERIA: Criterion[] = ['relevance', 'clarity', 'evidence']

/** Feedback against relevance, clarity and evidence, plus a suggested next practice task. */
export function InterviewFeedbackCard({
  feedback,
  onSave,
  saved,
}: {
  feedback: PracticeFeedback
  onSave: () => void
  saved: boolean
}) {
  const { t } = useTranslation('career')
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="card relative space-y-4 overflow-hidden p-5 before:absolute before:inset-x-0 before:top-0 before:h-1 before:bg-cyan"
      aria-live="polite"
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="min-w-0 text-lg">{t('toolkit.interview.feedbackTitle')}</h3>
        <span className="flex items-center gap-2 text-sm font-semibold">
          {t('toolkit.interview.overall')} <RatingBadge rating={feedback.overall} />
        </span>
      </div>
      <ul className="grid gap-3 sm:grid-cols-3">
        {CRITERIA.map((c) => (
          <li key={c} className="space-y-2 rounded-xl bg-sky-50 p-3">
            <div className="flex items-center justify-between gap-2">
              <span className="font-semibold">{t(`toolkit.criteria.${c}`)}</span>
              <RatingBadge rating={feedback[c]} />
            </div>
            <p className="text-xs text-ink-soft">
              {t(`toolkit.interview.tips.${c}.${feedback[c]}`)}
            </p>
          </li>
        ))}
      </ul>
      <div className="rounded-xl border-s-4 border-s-blue bg-sky-50 p-3">
        <p className="text-xs font-bold uppercase tracking-wide text-blue">
          {t('toolkit.interview.nextStep')}
        </p>
        <p className="text-sm">{t(`toolkit.interview.next.${feedback.focus}`)}</p>
      </div>
      <p className="text-xs text-ink-soft">{t('toolkit.interview.disclaimer')}</p>
      <Button className="rounded-full" onClick={onSave} disabled={saved}>
        <Save className="size-4" aria-hidden />
        {saved ? t('toolkit.interview.savedBtn') : t('toolkit.interview.save')}
      </Button>
    </motion.div>
  )
}
