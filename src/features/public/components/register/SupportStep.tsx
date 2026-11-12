import { Lock } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Textarea } from '@/components/ui/textarea'
import type { RegForm } from '../../register-config'
import { ChipGroup, Field, SelectField } from './Field'
import { optionsFor, type StepProps } from './types'

/** Optional accessibility and learning-support preferences, with who can see them. */
export function SupportStep({ form, set }: StepProps) {
  const { t } = useTranslation('public')
  return (
    <div className="space-y-6">
      <div className="flex gap-3 rounded-2xl bg-sky-100 p-4 text-sm text-navy">
        <Lock className="mt-0.5 size-5 shrink-0" aria-hidden />
        <div>
          <p className="font-bold">{t('register.support.whoTitle')}</p>
          <p className="mt-1">{t('register.support.who')}</p>
        </div>
      </div>
      <ChipGroup
        id="supportPrefs"
        optional
        label={t('register.support.prefs')}
        options={optionsFor(t, 'supportPrefs')}
        value={form.supportPrefs}
        onChange={(v) => set({ supportPrefs: v })}
      />
      <Field
        id="supportNote"
        optional
        label={t('register.support.note')}
        hint={t('register.support.noteHint')}
      >
        <Textarea
          id="supportNote"
          rows={3}
          value={form.supportNote}
          onChange={(e) => set({ supportNote: e.target.value })}
          aria-describedby="supportNote-hint"
        />
      </Field>
      <div className="max-w-sm">
        <SelectField
          id="disability"
          optional
          label={t('register.support.disability')}
          hint={t('register.support.disabilityHint')}
          value={form.disability}
          onChange={(v) => set({ disability: v as RegForm['disability'] })}
          options={(['notDisclosed', 'yes', 'no'] as const).map((v) => ({
            v,
            label: t(`register.options.d_${v}`),
          }))}
        />
      </div>
    </div>
  )
}
