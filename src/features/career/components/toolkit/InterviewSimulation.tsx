import type { CoachId, Opportunity, Youth } from '@shared/types'
import { Send } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { COACH_BY_ID } from '@/data/coaches'
import { useLocalized } from '@/i18n'
import { addInterviewPractice } from '@/store/actions/toolkit'
import { TYPING_MS } from '../../config/coaches'
import { SAMPLE_ANSWERS } from '../../config/samples'
import { type PracticeFeedback, practiceFeedback, questionsFor } from '../../config/toolkit'
import { TypingIndicator } from '../coaches/TypingIndicator'
import { UserMessage } from '../coaches/UserMessage'
import { CoachBubble } from './CoachBubble'
import { Field } from './Field'
import { InterviewFeedbackBubble } from './InterviewFeedbackBubble'
import { SampleDataButton } from './SampleDataButton'

/** Coach that runs the practice for each opportunity type (brief §12 coach roles). */
export function coachFor(opp: Opportunity): CoachId {
  return opp.type === 'enterprise' ? 'enterprise' : opp.type === 'freelance' ? 'freelance' : 'cv'
}

type Turn = { id: number; answer: string; feedback: PracticeFeedback; saved: boolean }

/** Mock interview with Lina AI: question, typed answer, scripted feedback, retry or next. */
export function InterviewSimulation({ youth, opp }: { youth: Youth; opp: Opportunity }) {
  const { t } = useTranslation('career')
  const { l } = useLocalized()
  const questions = questionsFor(opp.id)
  const [qi, setQi] = useState(0)
  const [turns, setTurns] = useState<Turn[]>([])
  const [typing, setTyping] = useState(false)
  const [answer, setAnswer] = useState('')
  const [error, setError] = useState('')
  const endRef = useRef<HTMLDivElement>(null)
  const seq = useRef(0)
  const q = questions[qi] ?? questions[0]
  const coach = coachFor(opp)
  const coachName = l(COACH_BY_ID[coach].name)

  // biome-ignore lint/correctness/useExhaustiveDependencies: scroll on every new message
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
  }, [turns.length, typing, qi])

  if (!q) return null

  const send = () => {
    const text = answer.trim()
    if (text.split(/\s+/).length < 5) return setError(t('toolkit.interview.tooShort'))
    setError('')
    setAnswer('')
    setTyping(true)
    const feedback = practiceFeedback(
      text,
      q,
      opp.skills.flatMap((s) => [s.en, s.ar]),
    )
    window.setTimeout(() => {
      setTyping(false)
      seq.current += 1
      const id = seq.current
      setTurns((ts) => [...ts, { id, answer: text, feedback, saved: false }])
    }, TYPING_MS)
  }
  const save = (i: number) => {
    const turn = turns[i]
    if (!turn) return
    addInterviewPractice(
      youth.id,
      l(q.text),
      turn.answer,
      turn.feedback.overall,
      t(`toolkit.interview.next.${turn.feedback.focus}`),
    )
    setTurns((ts) => ts.map((x, j) => (j === i ? { ...x, saved: true } : x)))
    toast.success(t('toolkit.interview.saved'))
  }
  const next = () => {
    setQi((i) => (i + 1) % questions.length)
    setTurns([])
    setAnswer('')
  }

  return (
    <div className="rounded-3xl bg-sky-50 p-4 sm:p-5">
      <div className="space-y-4" aria-live="polite">
        <CoachBubble coachId={coach}>
          <p>
            {t(`toolkit.interview.sim.hello.${coach}`, { role: l(opp.title), name: coachName })}
          </p>
        </CoachBubble>
        <CoachBubble key={q.id} coachId={coach}>
          <p className="text-xs font-bold uppercase tracking-wide text-blue">
            {t('toolkit.interview.sim.questionOf', { n: qi + 1, total: questions.length })}
          </p>
          <p className="mt-1 text-lg font-bold text-navy">“{l(q.text)}”</p>
        </CoachBubble>
        {turns.map((turn, i) => (
          <div key={turn.id} className="space-y-4">
            <UserMessage text={turn.answer} />
            <InterviewFeedbackBubble
              coachId={coach}
              feedback={turn.feedback}
              active={i === turns.length - 1 && !typing}
              saved={turn.saved}
              lastQuestion={qi === questions.length - 1}
              onSave={() => save(i)}
              onRetry={() => document.getElementById('iv-answer')?.focus()}
              onNext={next}
            />
          </div>
        ))}
        {typing && <TypingIndicator coachId={coach} name={coachName} />}
        <div ref={endRef} />
      </div>

      <div className="mt-5 rounded-2xl bg-white p-4 shadow-sm">
        <Field
          id="iv-answer"
          label={turns.length ? t('toolkit.interview.sim.tryAgain') : t('toolkit.interview.answer')}
          value={answer}
          onChange={setAnswer}
          multiline
          rows={4}
          hint={t('toolkit.interview.answerHint')}
          error={error}
        />
        <div className="mt-3 flex flex-wrap justify-end gap-2">
          <SampleDataButton
            label={t('toolkit.sample.answer')}
            onFill={() => setAnswer(l(SAMPLE_ANSWERS[q.id] ?? SAMPLE_ANSWERS.g1))}
          />
          <Button className="rounded-full" onClick={send} disabled={typing}>
            <Send className="size-4 rtl-mirror" aria-hidden />
            {t('toolkit.interview.sim.send')}
          </Button>
        </div>
      </div>
    </div>
  )
}
