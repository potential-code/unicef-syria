import { HandHeart, Lock } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { DISABILITY, type SectionProps } from '../../config/profile'
import { Field } from '../toolkit/Field'
import { ChoiceField } from './ChoiceField'
import { FormSection } from './FormSection'

/** Optional support preferences: affect access arrangements only, never shown to employers. */
export function SupportSection({ p, set }: SectionProps) {
  const { t } = useTranslation('career')
  return (
    <FormSection
      icon={HandHeart}
      title={t('profile.sections.support')}
      intro={t('profile.sections.supportIntro')}
    >
      <Field
        id="pf-support"
        label={t('profile.fields.support')}
        value={p.support ?? ''}
        onChange={(v) => set('support', v)}
        multiline
        rows={2}
        optionalLabel={t('toolkit.optional')}
        hint={t('profile.hints.support')}
      />
      <ChoiceField
        id="pf-disability"
        label={t('profile.fields.disability')}
        value={p.disability ?? 'notDisclosed'}
        options={DISABILITY.map((d) => ({ value: d, label: t(`profile.disability.${d}`) }))}
        onChange={(v) => set('disability', v)}
      />
      <p className="flex items-start gap-2 rounded-xl bg-success-soft px-3 py-2 text-sm text-success sm:col-span-2">
        <Lock className="mt-0.5 size-4 shrink-0" aria-hidden />
        {t('profile.supportPrivate')}
      </p>
    </FormSection>
  )
}
