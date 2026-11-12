import { useNavigate } from '@tanstack/react-router'
import { Loader2, Send } from 'lucide-react'
import { type FormEvent, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { now } from '@/lib/clock'
import { createOpportunity } from '@/store/actions/applications'
import { GOVERNORATES, HOURS, OPP_TYPES, WORK_FORMATS } from '../config'
import type { OrgScope } from '../hooks/use-org-scope'
import {
  type DraftErrors,
  EMPTY_DRAFT,
  type OpportunityDraft,
  toOpportunity,
  validateDraft,
} from '../opportunity-draft'
import { ChoiceSelect } from './ChoiceSelect'
import { Field } from './Field'
import { FreelanceFields } from './FreelanceFields'

/** Create opportunity (brief §16 E01). Publication is simulated. */
export function OpportunityForm({ scope }: { scope: OrgScope }) {
  const { t } = useTranslation('employer')
  const navigate = useNavigate()
  const [draft, setDraft] = useState<OpportunityDraft>(EMPTY_DRAFT)
  const [errors, setErrors] = useState<DraftErrors>({})
  const [busy, setBusy] = useState(false)
  const set = <K extends keyof OpportunityDraft>(k: K, v: OpportunityDraft[K]) =>
    setDraft((d) => ({ ...d, [k]: v }))
  const showHours = draft.type !== 'freelance' && draft.type !== 'enterprise'

  const submit = (e: FormEvent) => {
    e.preventDefault()
    const found = validateDraft(draft, now().slice(0, 10), t)
    setErrors(found)
    if (Object.keys(found).length) {
      toast.error(t('form.fixErrors'))
      return
    }
    setBusy(true)
    window.setTimeout(() => {
      createOpportunity(toOpportunity(draft, scope.org.id, t))
      toast.success(scope.approved ? t('form.published') : t('form.queued'))
      void navigate({ to: '/employer/opportunities' })
    }, 600)
  }

  const text = (
    k: 'title' | 'skills' | 'qualifications' | 'compensation' | 'contact',
    ph?: string,
  ) => (
    <Input
      id={`opp-${k}`}
      value={draft[k]}
      onChange={(e) => set(k, e.target.value)}
      placeholder={ph}
      aria-invalid={!!errors[k] || undefined}
      aria-describedby={errors[k] ? `opp-${k}-error` : undefined}
    />
  )

  return (
    <form onSubmit={submit} noValidate className="card grid gap-5 p-5 sm:grid-cols-2 sm:p-7">
      <Field id="opp-type" label={t('form.type')}>
        <ChoiceSelect
          id="opp-type"
          value={draft.type}
          onChange={(v) => set('type', v)}
          options={OPP_TYPES.map((v) => ({ value: v, label: t(`common:oppTypes.${v}`) }))}
        />
      </Field>
      <Field id="opp-title" label={t('form.title')} error={errors.title}>
        {text('title', t('form.titlePh'))}
      </Field>
      <Field
        id="opp-description"
        label={t('form.description')}
        error={errors.description}
        hint={t('form.descriptionHint')}
        className="sm:col-span-2"
      >
        <Textarea
          id="opp-description"
          rows={4}
          value={draft.description}
          onChange={(e) => set('description', e.target.value)}
          aria-invalid={!!errors.description || undefined}
          aria-describedby={errors.description ? 'opp-description-error' : undefined}
        />
      </Field>
      <Field id="opp-location" label={t('form.location')}>
        <ChoiceSelect
          id="opp-location"
          value={draft.governorate}
          onChange={(v) => set('governorate', v)}
          options={GOVERNORATES.map((v) => ({ value: v, label: t(`governorates.${v}`) }))}
        />
      </Field>
      <Field id="opp-format" label={t('form.workFormat')}>
        <ChoiceSelect
          id="opp-format"
          value={draft.workFormat}
          onChange={(v) => set('workFormat', v)}
          options={WORK_FORMATS.map((v) => ({ value: v, label: t(`common:format.${v}`) }))}
        />
      </Field>
      {showHours && (
        <Field id="opp-hours" label={t('form.hours')}>
          <ChoiceSelect
            id="opp-hours"
            value={draft.hours}
            onChange={(v) => set('hours', v)}
            options={HOURS.map((v) => ({ value: v, label: t(`form.hoursOptions.${v}`) }))}
          />
        </Field>
      )}
      <Field id="opp-skills" label={t('form.skills')} hint={t('form.skillsHint')}>
        {text('skills', t('form.skillsPh'))}
      </Field>
      <Field id="opp-qualifications" label={t('form.qualifications')} className="sm:col-span-2">
        {text('qualifications', t('form.qualificationsPh'))}
      </Field>
      <Field id="opp-start" label={t('form.startDate')}>
        <Input
          id="opp-start"
          type="date"
          value={draft.startDate}
          onChange={(e) => set('startDate', e.target.value)}
        />
      </Field>
      <Field id="opp-deadline" label={t('form.deadline')} error={errors.deadline}>
        <Input
          id="opp-deadline"
          type="date"
          value={draft.deadline}
          onChange={(e) => set('deadline', e.target.value)}
          aria-invalid={!!errors.deadline || undefined}
          aria-describedby={errors.deadline ? 'opp-deadline-error' : undefined}
        />
      </Field>
      <Field
        id="opp-questions"
        label={t('form.questions')}
        hint={t('form.questionsHint')}
        className="sm:col-span-2"
      >
        <Textarea
          id="opp-questions"
          value={draft.questions}
          onChange={(e) => set('questions', e.target.value)}
          placeholder={t('form.questionsPh')}
        />
      </Field>
      <Field id="opp-compensation" label={t('form.compensation')} hint={t('form.compensationHint')}>
        {text('compensation')}
      </Field>
      <Field id="opp-contact" label={t('form.contact')} error={errors.contact}>
        {text('contact', t('form.contactPh'))}
      </Field>
      {draft.type === 'freelance' && (
        <div className="sm:col-span-2">
          <FreelanceFields draft={draft} errors={errors} set={set} />
        </div>
      )}
      <div className="flex flex-col-reverse gap-3 border-t border-border/70 pt-5 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="min-w-0 flex-1 text-sm text-ink-soft">
          {scope.approved ? t('form.publishNote') : t('form.approvalNote')}
        </p>
        <Button type="submit" disabled={busy} className="shrink-0 rounded-full">
          {busy ? (
            <Loader2 className="size-4 animate-spin" aria-hidden />
          ) : (
            <Send className="size-4 rtl-mirror" aria-hidden />
          )}
          {t('form.publish')}
        </Button>
      </div>
    </form>
  )
}
