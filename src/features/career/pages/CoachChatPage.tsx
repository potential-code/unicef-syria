import type { CoachId } from '@shared/types'
import { Link } from '@tanstack/react-router'
import { Bot, HandHeart, RotateCcw, Send } from 'lucide-react'
import { AnimatePresence } from 'motion/react'
import { type FormEvent, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { EmptyState } from '@/components/shared/EmptyState'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { COACH_BY_ID } from '@/data/coaches'
import { useLocalized } from '@/i18n'
import { useMyYouth } from '@/store/hooks'
import { CareerHero } from '../components/CareerHero'
import { AiBadge } from '../components/coaches/AiBadge'
import { CoachMessage } from '../components/coaches/CoachMessage'
import { CoachSidePanel } from '../components/coaches/CoachSidePanel'
import { TypingIndicator } from '../components/coaches/TypingIndicator'
import { UserMessage } from '../components/coaches/UserMessage'
import { TYPING_MS } from '../config/coaches'
import { matchStep } from '../lib/coach-match'
import { saveCoachDraft } from '../lib/save-draft'

type Msg =
  | { id: number; from: 'user'; text: string }
  | { id: number; from: 'coach'; stepId: string }

/** Y09 scripted coach chat: starters, branching replies, drafts and course suggestions. */
export function CoachChatPage({ coachId, start }: { coachId: string; start?: string }) {
  const { t } = useTranslation('career')
  const { l } = useLocalized()
  const youth = useMyYouth()
  const coach = COACH_BY_ID[coachId as CoachId]
  const [msgs, setMsgs] = useState<Msg[]>([])
  const [typing, setTyping] = useState(false)
  const [text, setText] = useState('')
  const seq = useRef(0)
  const started = useRef(false)
  const endRef = useRef<HTMLDivElement>(null)

  const say = (userText: string, stepId: string) => {
    if (typing) return
    setMsgs((m) => [...m, { id: ++seq.current, from: 'user', text: userText }])
    setTyping(true)
    window.setTimeout(() => {
      setMsgs((m) => [...m, { id: ++seq.current, from: 'coach', stepId }])
      setTyping(false)
    }, TYPING_MS)
  }

  // Opening from a starter on the directory card sends that starter once.
  // biome-ignore lint/correctness/useExhaustiveDependencies: run once on mount
  useEffect(() => {
    if (started.current || !coach || !start) return
    const s = coach.starters.find((x) => x.step === start)
    started.current = true
    if (s) say(l(s.label), s.step)
  }, [])

  // biome-ignore lint/correctness/useExhaustiveDependencies: scroll when the conversation grows
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
  }, [msgs.length, typing])

  if (!coach) {
    return (
      <EmptyState
        icon={Bot}
        title={t('coaches.notFound')}
        action={
          <Button asChild className="rounded-full">
            <Link to="/youth/coaches">{t('coaches.backToCoaches')}</Link>
          </Button>
        }
      />
    )
  }

  const lastCoach = [...msgs].reverse().find((m) => m.from === 'coach')
  const submit = (e: FormEvent) => {
    e.preventDefault()
    const value = text.trim()
    if (!value) return
    setText('')
    say(value, matchStep(coach, value))
  }

  const applyDraft = (
    msgIndex: number,
    target: Parameters<typeof saveCoachDraft>[1],
    draftText: string,
  ) => {
    const answer = [...msgs.slice(0, msgIndex)].reverse().find((m) => m.from === 'user')
    saveCoachDraft(youth, target, draftText, {
      answer: answer?.from === 'user' ? answer.text : '',
      client: t('coaches.sampleClient'),
      fallbackQuestion: t('coaches.practiceQuestion'),
    })
    toast.success(t('coaches.draft.savedToast', { target: t(`coaches.targets.${target}`) }))
  }

  return (
    <div>
      <CareerHero
        tone="navy"
        eyebrow={<AiBadge />}
        title={`${l(coach.name)} · ${l(coach.title)}`}
        body={l(coach.purpose)}
        crumbs={[{ label: t('coaches.title'), to: '/youth/coaches' }, { label: l(coach.name) }]}
        actions={
          msgs.length > 0 && (
            <Button
              variant="secondary"
              className="rounded-full bg-white text-navy"
              onClick={() => setMsgs([])}
              disabled={typing}
            >
              <RotateCcw className="size-4" aria-hidden />
              {t('coaches.restart')}
            </Button>
          )
        }
      />
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
        <section
          aria-label={t('coaches.chatLabel', { name: l(coach.name) })}
          className="flex min-h-[28rem] flex-col rounded-3xl bg-sky-50 p-3 sm:p-5"
        >
          <div className="flex-1 space-y-4" aria-live="polite">
            <CoachMessage
              coach={coach}
              text={t('coaches.greeting', {
                name: youth.profile.name.split(' ')[0],
                coach: l(coach.name),
              })}
              youth={youth}
            />
            {msgs.map((m, i) =>
              m.from === 'user' ? (
                <UserMessage key={m.id} text={m.text} />
              ) : (
                <CoachMessage
                  key={m.id}
                  coach={coach}
                  step={coach.steps.find((s) => s.id === m.stepId)}
                  youth={youth}
                  active={m === lastCoach && !typing}
                  onReply={(label, next) => say(label, next)}
                  onUseDraft={(target, draft) => applyDraft(i, target, draft)}
                />
              ),
            )}
            <AnimatePresence>
              {typing && <TypingIndicator coachId={coach.id} name={l(coach.name)} />}
            </AnimatePresence>
            <div ref={endRef} />
          </div>
          <div className="mt-5 border-t border-sky-200 pt-4">
            <p className="mb-2 text-xs font-bold uppercase tracking-wide text-ink-soft">
              {t('coaches.starters')}
            </p>
            <div className="flex flex-wrap gap-2">
              {coach.starters.map((s) => (
                <button
                  key={s.step}
                  type="button"
                  disabled={typing}
                  onClick={() => say(l(s.label), s.step)}
                  className="min-h-11 rounded-full border border-blue/30 bg-white px-4 text-sm font-medium text-navy transition-colors hover:border-blue hover:bg-blue hover:text-white disabled:opacity-50"
                >
                  {l(s.label)}
                </button>
              ))}
            </div>
            <form onSubmit={submit} className="mt-3 flex gap-2">
              <label htmlFor="coach-input" className="sr-only">
                {t('coaches.inputLabel')}
              </label>
              <Input
                id="coach-input"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder={t('coaches.inputPlaceholder')}
                className="min-h-12 rounded-full bg-white px-5"
              />
              <Button
                type="submit"
                size="icon"
                className="rounded-full"
                disabled={typing || !text.trim()}
                aria-label={t('coaches.send')}
              >
                <Send className="size-5 rtl-mirror" aria-hidden />
              </Button>
            </form>
            <p className="mt-2 text-xs text-ink-soft">{t('coaches.scriptedNote')}</p>
          </div>
        </section>
        <CoachSidePanel />
      </div>
      <p className="mt-6 flex items-center gap-2 text-sm text-ink-soft">
        <HandHeart className="size-4 text-blue" aria-hidden />
        {t('coaches.humanHelp')}{' '}
        <Link to="/youth/mentors" className="font-semibold text-blue hover:underline">
          {t('coaches.bookMentor')}
        </Link>
      </p>
    </div>
  )
}
