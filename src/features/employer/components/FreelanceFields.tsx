import { useTranslation } from 'react-i18next'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import type { DraftErrors, OpportunityDraft } from '../opportunity-draft'
import { ChoiceSelect } from './ChoiceSelect'
import { Field } from './Field'

/** Freelance postings also need deliverables, timeline, review expectations and fee format. */
export function FreelanceFields({
  draft,
  errors,
  set,
}: {
  draft: OpportunityDraft
  errors: DraftErrors
  set: <K extends keyof OpportunityDraft>(k: K, v: OpportunityDraft[K]) => void
}) {
  const { t } = useTranslation('employer')
  return (
    <fieldset className="grid gap-4 rounded-2xl border border-cyan/40 bg-sky-50/70 p-4 sm:grid-cols-2 sm:p-5">
      <legend className="px-2 text-sm font-semibold text-navy">{t('form.freelanceLegend')}</legend>
      <Field
        id="opp-deliverables"
        label={t('form.deliverables')}
        error={errors.deliverables}
        className="sm:col-span-2"
      >
        <Textarea
          id="opp-deliverables"
          value={draft.deliverables}
          onChange={(e) => set('deliverables', e.target.value)}
          placeholder={t('form.deliverablesPh')}
          aria-invalid={!!errors.deliverables || undefined}
        />
      </Field>
      <Field id="opp-timeline" label={t('form.timeline')}>
        <Input
          id="opp-timeline"
          value={draft.timeline}
          onChange={(e) => set('timeline', e.target.value)}
          placeholder={t('form.timelinePh')}
        />
      </Field>
      <Field id="opp-fee" label={t('form.feeFormat')}>
        <ChoiceSelect
          id="opp-fee"
          value={draft.feeFormat}
          onChange={(v) => set('feeFormat', v)}
          options={(['fixed', 'perDeliverable', 'toAgree'] as const).map((v) => ({
            value: v,
            label: t(`form.feeOptions.${v}`),
          }))}
        />
      </Field>
      <Field id="opp-review" label={t('form.review')} className="sm:col-span-2">
        <Input
          id="opp-review"
          value={draft.review}
          onChange={(e) => set('review', e.target.value)}
          placeholder={t('form.reviewPh')}
        />
      </Field>
    </fieldset>
  )
}
