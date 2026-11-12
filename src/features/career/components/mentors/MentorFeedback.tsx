import type { MentorBooking } from '@shared/types'
import { ListChecks, Star } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import { rateBooking } from '@/store/actions/mentors'
import { LText } from '../LText'

/** Mentor feedback, two agreed actions and the learner's rating of the session. */
export function MentorFeedback({ booking: b }: { booking: MentorBooking }) {
  const { t } = useTranslation('career')
  const fb = b.feedback
  if (!fb) return null
  return (
    <div className="grid gap-3 md:grid-cols-[1.2fr_1fr]">
      <div className="rounded-xl bg-blue-50 p-4 text-sm">
        <p className="italic">
          <LText value={fb.note} />
        </p>
        <p className="mt-3 flex items-center gap-1.5 font-semibold text-navy">
          <ListChecks className="size-4" aria-hidden />
          {t('mentors.feedback.actions')}
        </p>
        <ol className="mt-1 list-decimal space-y-1 ps-5">
          {fb.actions.map((a) => (
            <li key={a.en}>
              <LText value={a} />
            </li>
          ))}
        </ol>
      </div>
      <fieldset className="rounded-xl border p-4">
        <legend className="px-1 text-sm font-semibold">{t('mentors.feedback.rate')}</legend>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              aria-label={t('mentors.feedback.star', { count: n })}
              aria-pressed={fb.rating === n}
              onClick={() => {
                rateBooking(b.id, n)
                toast.success(t('mentors.feedback.thanks'))
              }}
              className="flex size-11 items-center justify-center rounded-xl hover:bg-yellow/20"
            >
              <Star
                className={cn(
                  'size-6',
                  fb.rating && n <= fb.rating ? 'fill-yellow text-notice' : 'text-ink-soft',
                )}
                aria-hidden
              />
            </button>
          ))}
        </div>
        <p className="mt-1 text-xs text-ink-soft">
          {fb.rating
            ? t('mentors.feedback.rated', { count: fb.rating })
            : t('mentors.feedback.notRated')}
        </p>
      </fieldset>
    </div>
  )
}
