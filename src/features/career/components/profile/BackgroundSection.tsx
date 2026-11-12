import { GraduationCap } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { FORMATS, GENDERS, GOVERNORATES, type SectionProps } from '../../config/profile'
import { Field } from '../toolkit/Field'
import { ChoiceField } from './ChoiceField'
import { FormSection } from './FormSection'

export function BackgroundSection({ p, set, errors }: SectionProps) {
  const { t } = useTranslation('career')
  return (
    <FormSection icon={GraduationCap} title={t('profile.sections.background')}>
      <Field
        id="pf-age"
        type="number"
        label={t('profile.fields.age')}
        value={Number.isFinite(p.age) ? String(p.age) : ''}
        onChange={(v) => set('age', v === '' ? Number.NaN : Number(v))}
        required
        error={errors.age}
        hint={t('profile.hints.age')}
      />
      <ChoiceField
        id="pf-gender"
        label={t('profile.fields.gender')}
        value={p.gender}
        options={GENDERS.map((g) => ({ value: g, label: t(`profile.gender.${g}`) }))}
        onChange={(v) => set('gender', v)}
      />
      <ChoiceField
        id="pf-gov"
        label={t('profile.fields.governorate')}
        value={p.governorate}
        options={GOVERNORATES.map((g) => ({ value: g, label: t(`profile.governorates.${g}`) }))}
        onChange={(v) => set('governorate', v)}
      />
      <ChoiceField
        id="pf-format"
        label={t('profile.fields.learningFormat')}
        value={p.learningFormat}
        options={FORMATS.map((f) => ({ value: f, label: t(`profile.formats.${f}`) }))}
        onChange={(v) => set('learningFormat', v)}
      />
      <Field
        id="pf-edu"
        label={t('profile.fields.education')}
        value={p.education}
        onChange={(v) => set('education', v)}
        required
        error={errors.education}
      />
      <Field
        id="pf-emp"
        label={t('profile.fields.employmentStatus')}
        value={p.employmentStatus}
        onChange={(v) => set('employmentStatus', v)}
        required
        error={errors.employmentStatus}
      />
      <Field
        id="pf-exp"
        label={t('profile.fields.experience')}
        value={p.experience}
        onChange={(v) => set('experience', v)}
        multiline
        rows={2}
        className="sm:col-span-2"
      />
      <Field
        id="pf-digital"
        label={t('profile.fields.digitalAccess')}
        value={p.digitalAccess}
        onChange={(v) => set('digitalAccess', v)}
        required
        error={errors.digitalAccess}
        className="sm:col-span-2"
      />
    </FormSection>
  )
}
