import type { Toolkit, Youth } from '@shared/types'
import { Lightbulb, Presentation, Save } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { saveToolkit } from '@/store/actions/toolkit'
import { Field } from './Field'
import { ListEditor } from './ListEditor'
import { PitchOutline } from './PitchOutline'
import { ToolPanel } from './ToolPanel'

type Business = NonNullable<Toolkit['business']>
const EMPTY: Business = {
  customer: '',
  problem: '',
  solution: '',
  evidence: '',
  model: '',
  costs: '',
  nextExperiment: '',
  questions: [],
}
const FIELDS: (keyof Omit<Business, 'questions'>)[] = [
  'customer',
  'problem',
  'solution',
  'evidence',
  'model',
  'costs',
  'nextExperiment',
]

/** Business concept canvas with saved customer questions and a generated pitch outline. */
export function BusinessConcept({ youth }: { youth: Youth }) {
  const { t } = useTranslation('career')
  const [b, setB] = useState<Business>({ ...EMPTY, ...youth.toolkit.business })
  const [outline, setOutline] = useState<string | null>(null)
  const [error, setError] = useState('')
  const set = <K extends keyof Business>(k: K, v: Business[K]) => setB((x) => ({ ...x, [k]: v }))

  const save = () => {
    if (!b.customer.trim() || !b.problem.trim()) return setError(t('toolkit.business.required'))
    setError('')
    saveToolkit(youth.id, 'business', {
      ...b,
      questions: b.questions.map((q) => q.trim()).filter(Boolean),
    })
    toast.success(t('toolkit.business.saved'))
  }
  const generate = () => {
    const missing = t('toolkit.business.addThis')
    const line = (n: number, k: keyof Omit<Business, 'questions'>) =>
      `${n}. ${t(`toolkit.business.pitch.${k}`)}: ${b[k].trim() || missing}`
    setOutline(
      [
        t('toolkit.business.outlineHeading'),
        line(1, 'customer'),
        line(2, 'problem'),
        line(3, 'evidence'),
        line(4, 'solution'),
        line(5, 'model'),
        line(6, 'costs'),
        line(7, 'nextExperiment'),
        `8. ${t('toolkit.business.pitch.ask')}`,
      ].join('\n'),
    )
  }

  return (
    <ToolPanel
      icon={Lightbulb}
      accent="orange"
      title={t('toolkit.tabs.business')}
      intro={t('toolkit.business.intro')}
      actions={
        <>
          <Button variant="outline" className="rounded-full" onClick={generate}>
            <Presentation className="size-4" aria-hidden />
            {t('toolkit.business.generate')}
          </Button>
          <Button className="rounded-full" onClick={save}>
            <Save className="size-4" aria-hidden />
            {t('toolkit.business.save')}
          </Button>
        </>
      }
    >
      {error && (
        <p
          role="alert"
          className="mb-4 rounded-xl bg-danger-soft px-3 py-2 text-sm font-semibold text-danger"
        >
          {error}
        </p>
      )}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="grid gap-4">
          {FIELDS.map((k) => (
            <Field
              key={k}
              id={`biz-${k}`}
              label={t(`toolkit.business.fields.${k}`)}
              hint={t(`toolkit.business.hints.${k}`)}
              value={b[k]}
              onChange={(v) => set(k, v)}
              multiline
              rows={2}
              required={k === 'customer' || k === 'problem'}
            />
          ))}
        </div>
        <div className="space-y-5">
          <div className="rounded-2xl bg-sky-50 p-4">
            <ListEditor
              id="biz-q"
              label={t('toolkit.business.questions')}
              items={b.questions}
              onChange={(v) => set('questions', v)}
              addLabel={t('toolkit.business.addQuestion')}
              emptyText={t('toolkit.business.noQuestions')}
              placeholder={t('toolkit.business.questionPlaceholder')}
            />
            <p className="mt-2 text-xs text-ink-soft">{t('toolkit.business.questionsHint')}</p>
          </div>
          {outline !== null ? (
            <PitchOutline value={outline} onChange={setOutline} />
          ) : (
            <p className="rounded-2xl border border-dashed border-orange/40 bg-white p-4 text-sm text-ink-soft">
              {t('toolkit.business.outlineEmpty')}
            </p>
          )}
        </div>
      </div>
    </ToolPanel>
  )
}
