import type { Mentor, Youth } from '@shared/types'
import { Link } from '@tanstack/react-router'
import { CalendarClock, Check, CheckCircle2, Coins, Gift, Info, Loader2 } from 'lucide-react'
import { type FormEvent, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { Motif } from '@/components/brand'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { balance, MENTOR_COST } from '@/domain/points'
import { formatDate, formatTime, useLocalized } from '@/i18n'
import { cn } from '@/lib/utils'
import { type BookResult, bookMentor } from '@/store/actions/mentors'
import { UNAVAILABLE_SLOT_DAYS_LATER } from '../../config/mentors'
import { hasAllocation, type SlotState } from '../../lib/mentors'
import { LockedAccess } from './LockedAccess'
import { StepHeading } from './StepHeading'

/** Booking journey: slot, goal and question, points or programme allocation, confirm. */
export function BookingForm({
  mentor: m,
  youth,
  slot,
}: {
  mentor: Mentor
  youth: Youth
  slot: SlotState
}) {
  const { t } = useTranslation('career')
  const { lang } = useLocalized()
  const allocation = hasAllocation(youth, m)
  const bal = balance(youth)
  const [picked, setPicked] = useState(false)
  const [goal, setGoal] = useState('')
  const [question, setQuestion] = useState('')
  const [method, setMethod] = useState<'points' | 'allocation'>(
    allocation ? 'allocation' : 'points',
  )
  const [tried, setTried] = useState(false)
  const [busy, setBusy] = useState(false)
  const [result, setResult] = useState<BookResult | null>(null)

  const when = (iso: string) =>
    `${formatDate(iso, lang, { weekday: 'long', day: 'numeric', month: 'long' })}, ${formatTime(iso, lang)}`
  const altStart = new Date(
    Date.parse(m.slot.start) + UNAVAILABLE_SLOT_DAYS_LATER * 86_400_000,
  ).toISOString()
  const errors = {
    slot: !picked,
    goal: goal.trim().length < 5,
    question: question.trim().length < 5,
  }
  const invalid = errors.slot || errors.goal || errors.question

  const submit = (e: FormEvent) => {
    e.preventDefault()
    setTried(true)
    if (invalid || busy) return
    setBusy(true)
    window.setTimeout(() => {
      const r = bookMentor(youth.id, m.id, goal.trim(), question.trim(), method)
      setResult(r)
      setBusy(false)
      if (r === 'ok') toast.success(t('mentors.form.bookedToast'))
    }, 700)
  }

  if (result === 'ok' || slot === 'mine') {
    return (
      <div className="rounded-2xl bg-success-soft p-6 text-center">
        <CheckCircle2 className="mx-auto size-10 text-success" aria-hidden />
        <p className="mt-2 text-xl font-bold">{t('mentors.form.confirmedTitle')}</p>
        <p className="mt-1 text-sm">
          {t('mentors.form.confirmedBody', { when: when(m.slot.start) })}
        </p>
        <Button asChild className="mt-4 rounded-full">
          <Link to="/youth/mentors" hash="my-sessions">
            {t('mentors.form.seeSessions')}
          </Link>
        </Button>
      </div>
    )
  }

  const slotTaken = slot === 'taken' || result === 'slotTaken'
  return (
    <form onSubmit={submit} noValidate className="space-y-6">
      <section>
        <StepHeading n={1} title={t('mentors.form.step1')} />
        <div className="grid gap-2 sm:grid-cols-[repeat(auto-fit,minmax(15rem,1fr))]">
          <button
            type="button"
            disabled={slotTaken}
            aria-pressed={picked}
            onClick={() => setPicked((v) => !v)}
            className={cn(
              'relative flex items-center gap-3 rounded-2xl border p-4 text-start shadow-sm transition-colors',
              picked
                ? 'border-blue bg-blue text-white shadow-md'
                : 'border-border bg-white hover:border-blue/50',
              slotTaken && 'cursor-not-allowed opacity-60',
            )}
          >
            <CalendarClock
              className={cn('size-5 shrink-0', picked ? 'text-yellow' : 'text-blue')}
              aria-hidden
            />
            <span className="min-w-0 flex-1 text-sm">
              <span className="block font-semibold">{when(m.slot.start)}</span>
              {slotTaken ? t('mentors.slotState.taken') : t('mentors.form.thirtyMin')}
            </span>
            {picked && <Check className="size-5 shrink-0" aria-hidden />}
          </button>
          <div
            className="flex items-center gap-3 rounded-2xl border border-dashed bg-muted/40 p-4 text-sm text-ink-soft"
            aria-disabled="true"
          >
            <CalendarClock className="size-5 shrink-0" aria-hidden />
            <span>
              <span className="block font-semibold line-through">{when(altStart)}</span>
              {t('mentors.form.unavailable')}
            </span>
          </div>
        </div>
        {slotTaken && <p className="mt-2 text-sm text-danger">{t('mentors.form.slotTakenHelp')}</p>}
        {tried && errors.slot && !slotTaken && (
          <p className="mt-2 text-sm text-danger">{t('mentors.form.errSlot')}</p>
        )}
      </section>

      <section className="space-y-3">
        <StepHeading n={2} title={t('mentors.form.step2')} />
        <div className="space-y-1.5">
          <Label htmlFor="goal">{t('mentors.form.goal')}</Label>
          <Input
            id="goal"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            placeholder={t('mentors.form.goalPlaceholder')}
            aria-invalid={tried && errors.goal}
          />
          {tried && errors.goal && (
            <p className="text-sm text-danger">{t('mentors.form.errGoal')}</p>
          )}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="question">{t('mentors.form.question')}</Label>
          <Textarea
            id="question"
            rows={3}
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder={t('mentors.form.questionPlaceholder')}
            aria-invalid={tried && errors.question}
          />
          {tried && errors.question && (
            <p className="text-sm text-danger">{t('mentors.form.errQuestion')}</p>
          )}
        </div>
      </section>

      <section>
        <StepHeading n={3} title={t('mentors.form.step3')} />
        <div
          className="grid gap-2 sm:grid-cols-[repeat(auto-fit,minmax(15rem,1fr))]"
          role="radiogroup"
          aria-label={t('mentors.form.step3')}
        >
          {(['allocation', 'points'] as const).map((opt) => {
            const disabled = opt === 'allocation' && !allocation
            const Icon = opt === 'allocation' ? Gift : Coins
            return (
              // biome-ignore lint/a11y/useSemanticElements: styled radio card
              <button
                key={opt}
                type="button"
                role="radio"
                aria-checked={method === opt}
                disabled={disabled}
                onClick={() => setMethod(opt)}
                className={cn(
                  'flex items-start gap-3 rounded-2xl border p-4 text-start shadow-sm transition-colors',
                  method === opt
                    ? 'border-blue bg-blue text-white shadow-md'
                    : 'border-border bg-white hover:border-blue/50',
                  disabled && 'cursor-not-allowed opacity-60',
                )}
              >
                <Icon
                  className={cn(
                    'mt-0.5 size-5 shrink-0',
                    method === opt ? 'text-yellow' : 'text-blue',
                  )}
                  aria-hidden
                />
                <span className="min-w-0 flex-1 text-sm">
                  <span className="block font-semibold">
                    {opt === 'allocation'
                      ? t('mentors.included')
                      : t('mentors.costPoints', { count: MENTOR_COST })}
                  </span>
                  {opt === 'allocation'
                    ? allocation
                      ? t('mentors.form.allocationYes')
                      : t('mentors.form.allocationNo')
                    : bal < MENTOR_COST
                      ? t('mentors.form.pointsShort', { balance: bal })
                      : t('mentors.form.pointsBalance', { balance: bal, after: bal - MENTOR_COST })}
                </span>
                {method === opt && <Check className="mt-0.5 size-5 shrink-0" aria-hidden />}
              </button>
            )
          })}
        </div>
      </section>

      {result === 'insufficientPoints' && <LockedAccess youth={youth} />}
      {result === 'alreadyBooked' && (
        <p className="flex items-center gap-2 rounded-xl bg-info-soft p-3 text-sm text-info">
          <Info className="size-4" aria-hidden />
          {t('mentors.form.alreadyBooked')}
        </p>
      )}

      <section className="relative overflow-hidden rounded-2xl bg-[linear-gradient(135deg,var(--unicef-navy),#002a73)] p-5 text-white shadow-lg on-dark [&>*:not(:first-child)]:relative">
        <Motif variant="corner" className="text-cyan/25" />
        <StepHeading n={4} title={t('mentors.form.step4')} dark />
        <p className="text-sm text-white/85">
          {method === 'points'
            ? t('mentors.form.summaryPoints', { count: MENTOR_COST })
            : t('mentors.form.summaryAllocation')}
        </p>
        <Button
          type="submit"
          disabled={busy || slotTaken}
          className="mt-4 rounded-full bg-yellow text-ink hover:bg-white"
        >
          {busy && <Loader2 className="size-4 animate-spin" aria-hidden />}
          {busy ? t('mentors.form.booking') : t('mentors.form.confirm')}
        </Button>
        <p className="mt-2 text-xs text-white/75">{t('mentors.form.noInvites')}</p>
      </section>
    </form>
  )
}
