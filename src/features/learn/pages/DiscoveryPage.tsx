import type { Dimension } from '@shared/types'
import { useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { PageHeader } from '@/components/shared/PageHeader'
import { PRESET_ANSWERS, QUESTIONS } from '@/data/assessment'
import { formatDate, useLocalized } from '@/i18n'
import { completeAssessment } from '@/store/actions/youth'
import { useMyYouth } from '@/store/hooks'
import { DiscoveryIntro } from '../components/DiscoveryIntro'
import { DiscoveryReview } from '../components/DiscoveryReview'
import { QuestionStep } from '../components/QuestionStep'
import { PRESET_FALLBACK } from '../config'
import { useDiscoveryDraft } from '../hooks/use-discovery-draft'

type Step = 'intro' | 'question' | 'review'
const TOTAL = QUESTIONS.length
const blank = (): (Dimension | null)[] => QUESTIONS.map(() => null)

/** Y03 career discovery: intro, one question per screen, save and resume, review, submit. */
export function DiscoveryPage() {
  const { t } = useTranslation('learn')
  const { lang } = useLocalized()
  const youth = useMyYouth()
  const navigate = useNavigate()
  const draft = useDiscoveryDraft(youth.id)
  const [step, setStep] = useState<Step>('intro')
  const [answers, setAnswers] = useState<(Dimension | null)[]>(blank)
  const [index, setIndex] = useState(0)
  const [fromReview, setFromReview] = useState(false)
  const [busy, setBusy] = useState(false)

  const begin = (a: (Dimension | null)[], i: number) => {
    setAnswers(a)
    setIndex(i)
    setFromReview(false)
    setStep('question')
  }
  const select = (d: Dimension) => {
    const next = answers.map((a, i) => (i === index ? d : a))
    setAnswers(next)
    draft.save({ answers: next, index })
  }
  const goNext = () => {
    if (fromReview || index === TOTAL - 1) {
      draft.save({ answers, index })
      setStep('review')
      return
    }
    setIndex(index + 1)
    draft.save({ answers, index: index + 1 })
  }
  const goBack = () => (index === 0 ? setStep('intro') : setIndex(index - 1))
  const saveExit = () => {
    draft.save({ answers, index })
    toast.success(t('discovery.savedToast', { n: index + 1 }))
    void navigate({ to: '/youth' })
  }
  const preset = () => {
    const key =
      youth.id in PRESET_ANSWERS ? (youth.id as keyof typeof PRESET_ANSWERS) : PRESET_FALLBACK
    const a = [...PRESET_ANSWERS[key]]
    setAnswers(a)
    draft.save({ answers: a, index: TOTAL - 1 })
    setStep('review')
    toast.success(t('discovery.presetToast'))
  }
  const submit = () => {
    if (!answers.every(Boolean)) return
    setBusy(true)
    completeAssessment(youth.id, answers as Dimension[])
    draft.clear()
    toast.success(t('discovery.submittedToast'))
    void navigate({ to: '/youth/discovery/results' })
  }

  const question = QUESTIONS[index]
  return (
    <div>
      <PageHeader
        title={t('discovery.title')}
        description={step === 'intro' ? t('discovery.subtitle') : undefined}
        crumbs={
          step === 'intro'
            ? undefined
            : [
                { label: t('discovery.title'), to: '/youth/discovery' },
                {
                  label:
                    step === 'review'
                      ? t('discovery.reviewTitle')
                      : t('discovery.progress', { n: index + 1, total: TOTAL }),
                },
              ]
        }
      />
      {step === 'intro' && (
        <DiscoveryIntro
          resumeAt={draft.saved ? draft.saved.index : null}
          completedOn={youth.assessment ? formatDate(youth.assessment.completedAt, lang) : null}
          onStart={() => {
            draft.clear()
            begin(blank(), 0)
          }}
          onResume={() => draft.saved && begin(draft.saved.answers, draft.saved.index)}
          onPreset={preset}
          onResults={() => void navigate({ to: '/youth/discovery/results' })}
        />
      )}
      {step === 'question' && question && (
        <QuestionStep
          question={question}
          index={index}
          total={TOTAL}
          value={answers[index] ?? null}
          onSelect={select}
          onBack={goBack}
          onNext={goNext}
          onSave={saveExit}
          nextLabel={
            fromReview
              ? t('discovery.backToReview')
              : index === TOTAL - 1
                ? t('discovery.review')
                : t('common:next')
          }
        />
      )}
      {step === 'review' && (
        <DiscoveryReview
          answers={answers}
          busy={busy}
          onSubmit={submit}
          onEdit={(i) => {
            setIndex(i)
            setFromReview(true)
            setStep('question')
          }}
        />
      )}
    </div>
  )
}
