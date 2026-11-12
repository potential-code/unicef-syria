import { Heart } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import type { SectionProps } from '../../config/profile'
import { Field } from '../toolkit/Field'
import { ChipInput } from './ChipInput'
import { FormSection } from './FormSection'

export function InterestsSection({ p, set, errors }: SectionProps) {
  const { t } = useTranslation('career')
  return (
    <FormSection icon={Heart} title={t('profile.sections.interests')}>
      <ChipInput
        id="pf-interests"
        label={t('profile.fields.interests')}
        values={p.interests}
        onChange={(v) => set('interests', v)}
        hint={t('profile.hints.chips')}
      />
      <ChipInput
        id="pf-skills"
        label={t('profile.fields.skills')}
        values={p.skills}
        onChange={(v) => set('skills', v)}
        hint={t('profile.hints.chips')}
      />
      <ChipInput
        id="pf-sectors"
        label={t('profile.fields.sectors')}
        values={p.sectors}
        onChange={(v) => set('sectors', v)}
        hint={t('profile.hints.chips')}
      />
      <Field
        id="pf-avail"
        label={t('profile.fields.availability')}
        value={p.availability}
        onChange={(v) => set('availability', v)}
        required
        error={errors.availability}
      />
    </FormSection>
  )
}
