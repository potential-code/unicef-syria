import type { MentorBooking } from '@shared/types'
import {
  CalendarClock,
  CheckCircle2,
  Coins,
  MessageSquareQuote,
  PlayCircle,
  XCircle,
} from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { Avatar } from '@/components/shared/Avatar'
import { StatusBadge } from '@/components/shared/StatusBadge'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { MENTORS } from '@/data/mentors'
import { MENTOR_COST } from '@/domain/points'
import { formatDate, formatTime, useLocalized } from '@/i18n'
import { cancelBooking, completeBooking } from '@/store/actions/mentors'
import { MentorFeedback } from './MentorFeedback'

const STATUS_TONE = { booked: 'brand', cancelled: 'neutral', completed: 'success' } as const

/** One mentor booking with Cancel (refund once), Simulate completed session and feedback. */
export function BookingItem({ booking: b }: { booking: MentorBooking }) {
  const { t } = useTranslation('career')
  const { l, lang } = useLocalized()
  const [busy, setBusy] = useState(false)
  const m = MENTORS.find((x) => x.id === b.mentorId)
  if (!m) return null

  const complete = () => {
    setBusy(true)
    window.setTimeout(() => {
      completeBooking(b.id)
      setBusy(false)
      toast.success(t('mentors.booking.completedToast'))
    }, 600)
  }

  return (
    <article className="card p-5">
      <div className="flex flex-wrap items-start gap-4">
        <Avatar src={m.image} name={l(m.name)} size={48} />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="min-w-0 text-lg">{l(m.name)}</h3>
            <StatusBadge tone={STATUS_TONE[b.status]}>
              {t(`mentors.booking.status.${b.status}`)}
            </StatusBadge>
          </div>
          <p className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-ink-soft">
            <span className="flex items-center gap-1">
              <CalendarClock className="size-4" aria-hidden />
              {formatDate(m.slot.start, lang, { weekday: 'short', day: 'numeric', month: 'short' })}
              , {formatTime(m.slot.start, lang)} {t('cohort.syriaTime')}
            </span>
            <span className="flex items-center gap-1">
              <Coins className="size-4" aria-hidden />
              {b.method === 'points'
                ? t('mentors.booking.paidPoints', { count: MENTOR_COST })
                : t('mentors.included')}
            </span>
          </p>
          <dl className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
            <div className="rounded-xl border-s-4 border-s-cyan bg-sky-50 p-3">
              <dt className="font-semibold text-navy">{t('mentors.form.goal')}</dt>
              <dd>{b.goal}</dd>
            </div>
            <div className="rounded-xl border-s-4 border-s-cyan bg-sky-50 p-3">
              <dt className="font-semibold text-navy">{t('mentors.form.question')}</dt>
              <dd>{b.question}</dd>
            </div>
          </dl>
        </div>
      </div>

      {b.status === 'booked' && (
        <div className="mt-4 flex flex-wrap gap-2">
          <Button className="rounded-full" disabled={busy} onClick={complete}>
            <PlayCircle className="size-4" aria-hidden />
            {busy ? t('mentors.booking.completing') : t('mentors.booking.simulate')}
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" className="rounded-full" disabled={busy}>
                <XCircle className="size-4" aria-hidden />
                {t('mentors.booking.cancel')}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>{t('mentors.booking.cancelTitle')}</AlertDialogTitle>
                <AlertDialogDescription>
                  {b.method === 'points'
                    ? t('mentors.booking.cancelBodyPoints', { count: MENTOR_COST })
                    : t('mentors.booking.cancelBodyAllocation')}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>{t('mentors.booking.keep')}</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => {
                    cancelBooking(b.id)
                    toast.success(
                      b.method === 'points'
                        ? t('mentors.booking.cancelledRefund', { count: MENTOR_COST })
                        : t('mentors.booking.cancelled'),
                    )
                  }}
                >
                  {t('mentors.booking.confirmCancel')}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      )}
      {b.status === 'cancelled' && b.method === 'points' && (
        <p className="mt-3 flex items-center gap-1.5 text-sm text-success">
          <CheckCircle2 className="size-4" aria-hidden />
          {t('mentors.booking.refunded', { count: MENTOR_COST })}
        </p>
      )}
      {b.status === 'completed' && b.feedback && (
        <div className="mt-4">
          <p className="mb-2 flex items-center gap-1.5 text-sm font-bold text-navy">
            <MessageSquareQuote className="size-4" aria-hidden />
            {t('mentors.feedback.title')}
          </p>
          <MentorFeedback booking={b} />
        </div>
      )}
    </article>
  )
}
