import { UserRound } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import type { SectionProps } from '../../config/profile'
import { Field } from '../toolkit/Field'
import { ChoiceField } from './ChoiceField'
import { FormSection } from './FormSection'

export function AccountSection({ p, set, errors }: SectionProps) {
  const { t } = useTranslation('career')
  return (
    <FormSection
      icon={UserRound}
      title={t('profile.sections.account')}
      intro={t('profile.sections.accountIntro')}
    >
      <Field
        id="pf-name"
        label={t('profile.fields.name')}
        value={p.name}
        onChange={(v) => set('name', v)}
        required
        error={errors.name}
        className="sm:col-span-2"
      />
      <Field
        id="pf-email"
        type="email"
        label={t('profile.fields.email')}
        value={p.email}
        onChange={(v) => set('email', v)}
        error={errors.email ?? errors.contact}
        hint={t('profile.hints.contact')}
      />
      <Field
        id="pf-phone"
        type="tel"
        label={t('profile.fields.phone')}
        value={p.phone ?? ''}
        onChange={(v) => set('phone', v)}
        optionalLabel={t('toolkit.optional')}
      />
      <ChoiceField
        id="pf-lang"
        label={t('profile.fields.lang')}
        value={p.lang}
        options={[
          { value: 'en', label: 'English' },
          { value: 'ar', label: 'العربية' },
        ]}
        onChange={(v) => set('lang', v)}
      />
      <p className="self-end rounded-xl bg-sky-50 px-3 py-2 text-xs text-ink-soft">
        {t('profile.hints.password')}
      </p>
    </FormSection>
  )
}
