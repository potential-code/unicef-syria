import type { OpportunityType } from '@shared/types'
import { Loader2, Save } from 'lucide-react'
import { type FormEvent, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { type OrgProfileEdit, saveOrgProfile } from '@/store/actions/employer-extra'
import { GOVERNORATES, OPP_TYPES } from '../config'
import type { OrgScope } from '../hooks/use-org-scope'
import { ChoiceSelect } from './ChoiceSelect'
import { Field } from './Field'

type Errors = Partial<Record<'name' | 'description' | 'contactEmail', string>>

/** Organisation profile fields (brief §16 E01). Fictional organisations only. */
export function ProfileForm({ scope, initial }: { scope: OrgScope; initial: OrgProfileEdit }) {
  const { t } = useTranslation('employer')
  const [p, setP] = useState<OrgProfileEdit>(initial)
  const [errors, setErrors] = useState<Errors>({})
  const [busy, setBusy] = useState(false)
  const set = <K extends keyof OrgProfileEdit>(k: K, v: OrgProfileEdit[K]) =>
    setP((x) => ({ ...x, [k]: v }))
  const toggleType = (v: OpportunityType, on: boolean) =>
    set(
      'opportunityTypes',
      on ? [...p.opportunityTypes, v] : p.opportunityTypes.filter((x) => x !== v),
    )

  const submit = (e: FormEvent) => {
    e.preventDefault()
    const found: Errors = {}
    if (p.name.trim().length < 3) found.name = t('profile.errors.name')
    if (p.description.trim().length < 20) found.description = t('profile.errors.description')
    if (!/^\S+@\S+\.\S+$/.test(p.contactEmail.trim()))
      found.contactEmail = t('profile.errors.email')
    setErrors(found)
    if (Object.keys(found).length) return
    setBusy(true)
    window.setTimeout(() => {
      saveOrgProfile(scope.org.id, p)
      setBusy(false)
      toast.success(t('profile.saved'))
    }, 500)
  }

  return (
    <form onSubmit={submit} noValidate className="card grid gap-5 p-5 sm:grid-cols-2 sm:p-7">
      <Field
        id="org-name"
        label={t('profile.name')}
        error={errors.name}
        hint={t('profile.nameHint')}
      >
        <Input
          id="org-name"
          value={p.name}
          onChange={(e) => set('name', e.target.value)}
          aria-invalid={!!errors.name || undefined}
        />
      </Field>
      <Field id="org-sector" label={t('profile.sector')}>
        <Input id="org-sector" value={p.sector} onChange={(e) => set('sector', e.target.value)} />
      </Field>
      <Field id="org-gov" label={t('profile.governorate')}>
        <ChoiceSelect
          id="org-gov"
          value={p.governorate}
          onChange={(v) => set('governorate', v)}
          options={GOVERNORATES.map((v) => ({ value: v, label: t(`governorates.${v}`) }))}
        />
      </Field>
      <Field id="org-contact-name" label={t('profile.contactName')}>
        <Input
          id="org-contact-name"
          value={p.contactName}
          onChange={(e) => set('contactName', e.target.value)}
        />
      </Field>
      <Field
        id="org-description"
        label={t('profile.description')}
        error={errors.description}
        className="sm:col-span-2"
      >
        <Textarea
          id="org-description"
          rows={3}
          value={p.description}
          onChange={(e) => set('description', e.target.value)}
          aria-invalid={!!errors.description || undefined}
        />
      </Field>
      <Field
        id="org-email"
        label={t('profile.contactEmail')}
        error={errors.contactEmail}
        hint={t('profile.emailHint')}
      >
        <Input
          id="org-email"
          type="email"
          value={p.contactEmail}
          onChange={(e) => set('contactEmail', e.target.value)}
          aria-invalid={!!errors.contactEmail || undefined}
        />
      </Field>
      <fieldset className="sm:col-span-2">
        <legend className="mb-2 text-sm font-medium text-ink">{t('profile.types')}</legend>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
          {OPP_TYPES.map((v) => (
            <Label
              key={v}
              htmlFor={`org-type-${v}`}
              className="h-10 cursor-pointer rounded-xl border border-border bg-white px-3 hover:border-blue has-[[data-state=checked]]:border-blue has-[[data-state=checked]]:bg-sky-50"
            >
              <Checkbox
                id={`org-type-${v}`}
                checked={p.opportunityTypes.includes(v)}
                onCheckedChange={(c) => toggleType(v, c === true)}
              />
              {t(`common:oppTypes.${v}`)}
            </Label>
          ))}
        </div>
      </fieldset>
      <div className="flex justify-end border-t border-border/70 pt-5 sm:col-span-2">
        <Button type="submit" disabled={busy} className="rounded-full">
          {busy ? (
            <Loader2 className="size-4 animate-spin" aria-hidden />
          ) : (
            <Save className="size-4" aria-hidden />
          )}
          {t('profile.save')}
        </Button>
      </div>
    </form>
  )
}
