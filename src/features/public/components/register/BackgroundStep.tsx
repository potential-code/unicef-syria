import type { YouthProfile } from '@shared/types'
import { Info } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { GOVERNORATES } from '../../config'
import type { RegForm } from '../../register-config'
import { Field, SelectField } from './Field'
import { optionsFor, type StepProps } from './types'

export function BackgroundStep({ form, set, errors }: StepProps) {
  const { t } = useTranslation('public')
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      <Field
        id="age"
        label={t('register.background.age')}
        error={errors.age}
        hint={t('register.background.ageHint')}
      >
        <Input
          id="age"
          inputMode="numeric"
          value={form.age}
          onChange={(e) => set({ age: e.target.value.replace(/\D/g, '').slice(0, 2) })}
          aria-invalid={!!errors.age}
          aria-describedby={errors.age ? 'age-error' : 'age-hint'}
        />
      </Field>
      <SelectField
        id="gender"
        optional
        label={t('register.background.gender')}
        value={form.gender}
        onChange={(v) => set({ gender: v as YouthProfile['gender'] })}
        options={(['female', 'male', 'notDisclosed'] as const).map((v) => ({
          v,
          label: t(`register.options.${v}`),
        }))}
      />
      <p className="flex gap-2 rounded-xl bg-notice-soft px-3 py-2 text-sm text-notice sm:col-span-2">
        <Info className="mt-0.5 size-4 shrink-0" aria-hidden />
        {t('register.background.ageNote')}
      </p>
      <SelectField
        id="governorate"
        label={t('register.background.governorate')}
        value={form.governorate}
        onChange={(v) => set({ governorate: v as RegForm['governorate'] })}
        error={errors.governorate}
        options={GOVERNORATES.map((g) => ({ v: g, label: t(`governorates.${g}`) }))}
      />
      <SelectField
        id="education"
        label={t('register.background.education')}
        value={form.education}
        onChange={(v) => set({ education: v })}
        error={errors.education}
        options={optionsFor(t, 'education')}
      />
      <SelectField
        id="employment"
        label={t('register.background.employment')}
        value={form.employment}
        onChange={(v) => set({ employment: v })}
        error={errors.employment}
        options={optionsFor(t, 'employment')}
      />
      <SelectField
        id="digital"
        label={t('register.background.digital')}
        value={form.digital}
        onChange={(v) => set({ digital: v })}
        error={errors.digital}
        options={optionsFor(t, 'digital')}
      />
      <SelectField
        id="format"
        label={t('register.background.format')}
        value={form.format}
        onChange={(v) => set({ format: v as RegForm['format'] })}
        error={errors.format}
        options={optionsFor(t, 'format')}
      />
      <div className="sm:col-span-2">
        <Field
          id="experience"
          optional
          label={t('register.background.experience')}
          hint={t('register.background.experienceHint')}
        >
          <Textarea
            id="experience"
            rows={3}
            value={form.experience}
            onChange={(e) => set({ experience: e.target.value })}
            aria-describedby="experience-hint"
          />
        </Field>
      </div>
    </div>
  )
}
