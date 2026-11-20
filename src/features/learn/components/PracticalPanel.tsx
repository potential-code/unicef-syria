import type { Course, CourseProgress } from '@shared/types'
import { CircleCheck, ClipboardList, Hourglass, Send } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { Motif } from '@/components/brand'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useLocalized } from '@/i18n'
import { submitPractical } from '@/store/actions/learning'

const MIN = 30

/** Practical task: a short written response. Self-paced counts on submit; cohort tasks are reviewed. */
export function PracticalPanel({
  youthId,
  course,
  progress,
  reviewed,
}: {
  youthId: Parameters<typeof submitPractical>[0]
  course: Course
  progress: CourseProgress | undefined
  reviewed: boolean
}) {
  const { t } = useTranslation('learn')
  const { l } = useLocalized()
  const [text, setText] = useState('')
  const [touched, setTouched] = useState(false)
  const [busy, setBusy] = useState(false)
  const state = progress?.practical ?? 'none'
  const error = touched && text.trim().length < MIN ? t('practical.tooShort', { min: MIN }) : ''

  const submit = () => {
    setTouched(true)
    if (text.trim().length < MIN) return
    setBusy(true)
    window.setTimeout(() => {
      submitPractical(youthId, course.id, text)
      setBusy(false)
      toast.success(reviewed ? t('practical.sentReview') : t('practical.sent'))
    }, 600)
  }

  const done = state === 'approved' || (state === 'submitted' && !reviewed)
  const waiting = state === 'submitted' && reviewed

  return (
    <section
      className="relative overflow-hidden rounded-3xl bg-yellow p-5 text-ink shadow-md sm:p-6"
      aria-labelledby="practical-h"
    >
      <Motif variant="corner" className="text-white/50" />
      <h2 id="practical-h" className="relative flex items-center gap-2 text-lg">
        <ClipboardList className="size-5" aria-hidden />
        {t('practical.title')}
      </h2>
      <p className="relative mt-2">{l(course.practicalTask)}</p>
      <p className="relative mt-1 text-sm">{t('course.output', { output: l(course.output) })}</p>
      {done ? (
        <p className="relative mt-4 flex items-center gap-2 rounded-2xl bg-white p-3 font-semibold text-success shadow-sm">
          <CircleCheck className="size-5" aria-hidden />
          {state === 'approved' ? t('practical.approved') : t('practical.doneSelf')}
        </p>
      ) : waiting ? (
        <p className="relative mt-4 flex items-center gap-2 rounded-2xl bg-white p-3 font-semibold text-notice shadow-sm">
          <Hourglass className="size-5" aria-hidden />
          {t('practical.waiting')}
        </p>
      ) : (
        <div className="relative mt-4 rounded-2xl bg-white p-4 shadow-md">
          {state === 'returned' && (
            <p className="mb-3 rounded-xl bg-notice-soft p-3 text-sm text-notice">
              {t('practical.returned')}
            </p>
          )}
          <Label htmlFor="practical-text" className="font-semibold">
            {t('practical.label')}
          </Label>
          <Textarea
            id="practical-text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onBlur={() => setTouched(true)}
            aria-invalid={!!error}
            aria-describedby="practical-hint"
            className="mt-2 min-h-36"
            dir="auto"
          />
          <p
            id="practical-hint"
            className={error ? 'mt-1 text-sm text-danger' : 'mt-1 text-xs text-ink-soft'}
          >
            {error || (reviewed ? t('practical.hintReviewed') : t('practical.hintSelf'))}
          </p>
          <Button className="mt-3 rounded-full" onClick={submit} disabled={busy}>
            <Send className="size-4 rtl-mirror" aria-hidden />
            {busy ? t('practical.sending') : t('practical.submit')}
          </Button>
        </div>
      )}
    </section>
  )
}
