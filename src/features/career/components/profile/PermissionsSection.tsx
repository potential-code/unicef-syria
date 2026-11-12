import { ShieldCheck } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Checkbox } from '@/components/ui/checkbox'
import { Switch } from '@/components/ui/switch'
import type { SectionProps } from '../../config/profile'
import { CvUpload } from './CvUpload'
import { FormSection } from './FormSection'

/** Separate acknowledgements: programme participation and optional employer visibility. */
export function PermissionsSection({ p, set, errors }: SectionProps) {
  const { t } = useTranslation('career')
  return (
    <FormSection icon={ShieldCheck} title={t('profile.sections.permissions')}>
      <div className="space-y-1 sm:col-span-2">
        <div className="flex min-h-12 items-start gap-3 rounded-2xl border p-3">
          <Checkbox
            id="pf-consent"
            checked={p.consentProgramme}
            onCheckedChange={(v) => set('consentProgramme', v === true)}
            aria-invalid={Boolean(errors.consentProgramme)}
            aria-describedby={errors.consentProgramme ? 'pf-consent-error' : undefined}
            className="mt-0.5"
          />
          <label htmlFor="pf-consent" className="text-sm">
            <span className="font-semibold">{t('profile.fields.consentProgramme')}</span>
            <span className="block text-ink-soft">{t('profile.hints.consentProgramme')}</span>
          </label>
        </div>
        {errors.consentProgramme && (
          <p id="pf-consent-error" className="text-xs font-semibold text-danger">
            {errors.consentProgramme}
          </p>
        )}
      </div>
      <div className="flex min-h-12 items-start gap-3 rounded-2xl border-2 border-cyan/40 bg-sky-50 p-3 sm:col-span-2">
        <Switch
          id="pf-visible"
          checked={p.consentEmployerVisible}
          onCheckedChange={(v) => set('consentEmployerVisible', v)}
          className="mt-0.5"
        />
        <label htmlFor="pf-visible" className="text-sm">
          <span className="font-semibold">{t('profile.fields.consentEmployerVisible')}</span>
          <span className="block text-ink-soft">
            {p.consentEmployerVisible ? t('profile.visibleOn') : t('profile.visibleOff')}
          </span>
        </label>
      </div>
      <CvUpload file={p.cvFile} onChange={(f) => set('cvFile', f)} />
    </FormSection>
  )
}
