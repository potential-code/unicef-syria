import type { CourseId, Youth } from '@shared/types'
import { CheckCircle2, RotateCcw } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { StatusBadge } from '@/components/shared/StatusBadge'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { COURSE_BY_ID } from '@/data/courses'
import { RUBRIC_PASS, rubricPasses } from '@/domain/completion'
import { useLocalized } from '@/i18n'
import { now } from '@/lib/clock'
import { cn } from '@/lib/utils'
import { reviewPractical } from '@/store/actions/learning'
import { saveReview } from '@/store/actions/work-extra'
import { GENERIC_SUBMISSION, RUBRIC_CRITERIA, SAMPLE_SUBMISSIONS } from '../config'
import { FieldError } from './FieldError'
import { LearnerName } from './LearnerName'

/** T04 rubric review: three criteria 0 to 2; 4/6 meets the threshold, otherwise return for revision. */
export function ReviewDialog({
  youth,
  courseId,
  onClose,
}: {
  youth: Youth
  courseId: CourseId
  onClose: () => void
}) {
  const { t } = useTranslation('trainer')
  const { l, isPlaceholder } = useLocalized()
  const course = COURSE_BY_ID[courseId]
  const sample = SAMPLE_SUBMISSIONS[courseId] ?? GENERIC_SUBMISSION
  const [scores, setScores] = useState<(number | null)[]>([null, null, null])
  const [feedback, setFeedback] = useState('')
  const [tried, setTried] = useState(false)
  const [busy, setBusy] = useState(false)
  const scored = scores.every((s) => s !== null)
  const total = scores.reduce<number>((a, b) => a + (b ?? 0), 0)
  const passes = scored && rubricPasses(scores as number[])

  const finish = (approve: boolean) => {
    setTried(true)
    if (!scored || (!approve && !feedback.trim())) return
    setBusy(true)
    window.setTimeout(() => {
      reviewPractical(youth.id, courseId, approve)
      saveReview(youth.id, courseId, {
        scores: scores as number[],
        feedback: feedback.trim(),
        approved: approve,
        at: now(),
      })
      toast.success(
        approve
          ? t('review.approvedToast', { name: youth.profile.name, total })
          : t('review.returnedToast', { name: youth.profile.name }),
      )
      onClose()
    }, 400)
  }

  return (
    <Dialog open onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="rounded-2xl sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl">
            {t('review.title', { course: `${course.id} ${l(course.title)}` })}
          </DialogTitle>
          <DialogDescription>{l(course.practicalTask)}</DialogDescription>
        </DialogHeader>
        <LearnerName youth={youth} sub={t('review.submittedBy')} link={false} />
        <figure className="rounded-xl border border-sky-200 bg-sky-50 p-4">
          <figcaption className="mb-1 text-xs font-semibold uppercase tracking-wide text-ink-soft">
            {t('review.response')}
          </figcaption>
          <p className="text-sm leading-relaxed text-ink">{l(sample)}</p>
          {isPlaceholder(sample) && (
            <p className="mt-1 text-xs text-ink-soft">{t('common:arabicPlaceholder')}</p>
          )}
        </figure>
        <fieldset className="space-y-3">
          <legend className="text-sm font-semibold">{t('review.rubric')}</legend>
          {RUBRIC_CRITERIA.map((c, i) => (
            <div
              key={c}
              className="flex flex-wrap items-center justify-between gap-2 rounded-xl border p-3"
            >
              <div className="min-w-0">
                <p className="font-semibold">{t(`rubric.${c}.label`)}</p>
                <p className="text-xs text-ink-soft">{t(`rubric.${c}.hint`)}</p>
              </div>
              <div className="flex gap-1.5">
                {[0, 1, 2].map((v) => (
                  <label
                    key={v}
                    className={cn(
                      'flex size-11 cursor-pointer items-center justify-center rounded-lg border-2 font-bold tabular-nums transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring',
                      scores[i] === v
                        ? 'border-blue bg-blue text-white'
                        : 'border-border bg-white text-ink hover:bg-sky-50',
                    )}
                  >
                    <input
                      type="radio"
                      name={`rubric-${c}`}
                      value={v}
                      checked={scores[i] === v}
                      onChange={() => setScores(scores.map((s, j) => (j === i ? v : s)))}
                      className="sr-only"
                      aria-label={`${t(`rubric.${c}.label`)}: ${v}`}
                    />
                    {v}
                  </label>
                ))}
              </div>
            </div>
          ))}
        </fieldset>
        <div
          className="flex flex-wrap items-center justify-between gap-2 rounded-xl bg-muted p-3"
          aria-live="polite"
        >
          <p className="font-semibold tabular-nums">{t('review.total', { total, max: 6 })}</p>
          {scored ? (
            <StatusBadge tone={passes ? 'success' : 'notice'}>
              {passes
                ? t('review.meets', { pass: RUBRIC_PASS })
                : t('review.below', { pass: RUBRIC_PASS })}
            </StatusBadge>
          ) : (
            <span className="text-xs text-ink-soft">{t('review.scoreAll')}</span>
          )}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="r-feedback">{t('review.feedback')}</Label>
          <Textarea
            id="r-feedback"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder={t('review.feedbackPlaceholder')}
            aria-invalid={tried && !passes && !feedback.trim()}
          />
          {tried && !scored && <FieldError>{t('review.errScores')}</FieldError>}
          {tried && scored && !passes && !feedback.trim() && (
            <FieldError>{t('review.errFeedback')}</FieldError>
          )}
        </div>
        <div className="flex flex-wrap justify-end gap-2">
          <Button
            variant={passes ? 'outline' : 'default'}
            className="rounded-full"
            disabled={busy}
            onClick={() => finish(false)}
          >
            <RotateCcw className="size-4" aria-hidden />
            {t('review.return')}
          </Button>
          <Button className="rounded-full" disabled={busy || !passes} onClick={() => finish(true)}>
            <CheckCircle2 className="size-4" aria-hidden />
            {t('review.approve')}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
