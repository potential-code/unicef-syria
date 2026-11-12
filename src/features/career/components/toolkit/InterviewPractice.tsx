import type { Youth } from '@shared/types'
import { MessageSquareText, Wand2 } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { Motif } from '@/components/brand'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useLocalized } from '@/i18n'
import { useOpportunities } from '@/store/actions/applications'
import { addInterviewPractice } from '@/store/actions/toolkit'
import { type PracticeFeedback, practiceFeedback, questionsFor } from '../../config/toolkit'
import { Field } from './Field'
import { InterviewFeedbackCard } from './InterviewFeedbackCard'
import { InterviewHistory } from './InterviewHistory'
import { ToolPanel } from './ToolPanel'

const DEFAULT_OPP = { employment: 'O01', enterprise: 'O06', freelance: 'O04' } as const

/** Interview practice (brief §13): opportunity, question, typed answer, descriptive feedback. */
export function InterviewPractice({ youth }: { youth: Youth }) {
  const { t } = useTranslation('career')
  const { l } = useLocalized()
  const opps = useOpportunities()
  const [oppId, setOppId] = useState<string>(DEFAULT_OPP[youth.route ?? 'employment'])
  const questions = questionsFor(oppId)
  const [qId, setQId] = useState(questions[0]?.id ?? '')
  const question = questions.find((q) => q.id === qId) ?? questions[0]
  const [answer, setAnswer] = useState('')
  const [error, setError] = useState('')
  const [feedback, setFeedback] = useState<PracticeFeedback | null>(null)
  const [saved, setSaved] = useState(false)
  const opp = opps.find((o) => o.id === oppId)

  const reset = () => {
    setFeedback(null)
    setSaved(false)
  }
  const check = () => {
    if (!question) return
    if (answer.trim().split(/\s+/).length < 5) return setError(t('toolkit.interview.tooShort'))
    setError('')
    setFeedback(
      practiceFeedback(
        answer,
        question,
        (opp?.skills ?? []).flatMap((s) => [s.en, s.ar]),
      ),
    )
    setSaved(false)
  }
  const save = () => {
    if (!feedback || !question) return
    addInterviewPractice(
      youth.id,
      l(question.text),
      answer.trim(),
      feedback.overall,
      t(`toolkit.interview.next.${feedback.focus}`),
    )
    setSaved(true)
    toast.success(t('toolkit.interview.saved'))
  }

  return (
    <ToolPanel
      icon={MessageSquareText}
      accent="yellow"
      title={t('toolkit.tabs.interview')}
      intro={t('toolkit.interview.intro')}
    >
      <div className="grid gap-6 lg:grid-cols-[1fr_22rem]">
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="iv-opp" className="font-semibold">
                {t('toolkit.interview.opportunity')}
              </Label>
              <Select
                value={oppId}
                onValueChange={(v) => {
                  setOppId(v)
                  setQId(questionsFor(v)[0]?.id ?? '')
                  reset()
                }}
              >
                <SelectTrigger id="iv-opp" className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {opps.map((o) => (
                    <SelectItem key={o.id} value={o.id}>
                      {o.id} {l(o.title)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="iv-q" className="font-semibold">
                {t('toolkit.interview.question')}
              </Label>
              <Select
                value={question?.id ?? ''}
                onValueChange={(v) => {
                  setQId(v)
                  reset()
                }}
              >
                <SelectTrigger id="iv-q" className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {questions.map((q, i) => (
                    <SelectItem key={q.id} value={q.id}>
                      {t('toolkit.interview.questionN', { n: i + 1 })}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          {question && (
            <blockquote className="relative overflow-hidden rounded-2xl bg-grad-unicef p-5 text-lg font-bold text-white shadow-md on-dark">
              <Motif variant="corner" className="text-white/15" />
              <span className="relative">“{l(question.text)}”</span>
            </blockquote>
          )}
          <Field
            id="iv-answer"
            label={t('toolkit.interview.answer')}
            value={answer}
            onChange={(v) => {
              setAnswer(v)
              reset()
            }}
            multiline
            rows={6}
            hint={t('toolkit.interview.answerHint')}
            error={error}
          />
          <Button className="rounded-full" onClick={check}>
            <Wand2 className="size-4" aria-hidden />
            {t('toolkit.interview.getFeedback')}
          </Button>
          {feedback && <InterviewFeedbackCard feedback={feedback} onSave={save} saved={saved} />}
        </div>
        <div className="space-y-3">
          <h3 className="text-base">{t('toolkit.interview.history')}</h3>
          <InterviewHistory items={youth.toolkit.interviews} />
        </div>
      </div>
    </ToolPanel>
  )
}
