import type { Toolkit } from '@shared/types'
import { Save, X } from 'lucide-react'
import type { FormEvent } from 'react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { Field } from './Field'

export type ProposalDraft = Omit<Toolkit['proposals'][number], 'id'>
export const EMPTY_PROPOSAL: ProposalDraft = {
  client: '',
  goal: '',
  experience: '',
  deliverables: '',
  timing: '',
  review: '',
  assumptions: '',
  fee: '',
}
const FIELDS: (keyof ProposalDraft)[] = [
  'client',
  'goal',
  'experience',
  'deliverables',
  'timing',
  'review',
  'assumptions',
  'fee',
]
const REQUIRED: (keyof ProposalDraft)[] = ['client', 'goal', 'deliverables', 'timing']

/** Proposal fields from the brief (§14 Y11), with inline validation of the essentials. */
export function ProposalForm({
  initial,
  onSave,
  onCancel,
}: {
  initial: ProposalDraft
  onSave: (p: ProposalDraft) => void
  onCancel: () => void
}) {
  const { t } = useTranslation('career')
  const [p, setP] = useState<ProposalDraft>(initial)
  const [tried, setTried] = useState(false)
  const missing = (k: keyof ProposalDraft) => tried && REQUIRED.includes(k) && !p[k].trim()
  const submit = (e: FormEvent) => {
    e.preventDefault()
    setTried(true)
    if (REQUIRED.some((k) => !p[k].trim())) return
    onSave(p)
  }
  return (
    <form
      onSubmit={submit}
      noValidate
      className="space-y-4 rounded-2xl border-2 border-cyan/30 bg-sky-50 p-4 sm:p-5"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {FIELDS.map((k) => (
          <Field
            key={k}
            id={`prp-${k}`}
            label={t(`toolkit.proposal.fields.${k}`)}
            value={p[k]}
            onChange={(v) => setP((x) => ({ ...x, [k]: v }))}
            multiline={k !== 'client' && k !== 'fee' && k !== 'timing'}
            rows={3}
            required={REQUIRED.includes(k)}
            optionalLabel={k === 'fee' ? t('toolkit.proposal.feeOptional') : undefined}
            error={missing(k) ? t('toolkit.proposal.requiredField') : undefined}
            className={k === 'deliverables' || k === 'assumptions' ? 'sm:col-span-2' : undefined}
          />
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        <Button type="submit" className="rounded-full">
          <Save className="size-4" aria-hidden />
          {t('toolkit.proposal.save')}
        </Button>
        <Button type="button" variant="ghost" className="rounded-full" onClick={onCancel}>
          <X className="size-4" aria-hidden />
          {t('common:cancel')}
        </Button>
      </div>
    </form>
  )
}
