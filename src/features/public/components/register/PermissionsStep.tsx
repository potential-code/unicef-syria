import { Building2, EyeOff, ShieldCheck } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import type { StepProps } from './types'

/** Separate acknowledgements: programme participation (required) and employer visibility (optional). */
export function PermissionsStep({ form, set, errors }: StepProps) {
  const { t } = useTranslation('public')
  const shared = t('register.permissions.shared', { returnObjects: true }) as string[]
  const hidden = t('register.permissions.hidden', { returnObjects: true }) as string[]
  return (
    <div className="space-y-4">
      <div
        className={`rounded-xl border bg-white p-4 shadow-xs ${errors.consentProgramme ? 'border-danger' : 'border-border'}`}
      >
        <div className="flex gap-3">
          <Checkbox
            id="consentProgramme"
            checked={form.consentProgramme}
            onCheckedChange={(v) => set({ consentProgramme: v === true })}
            className="mt-0.5 size-5"
            aria-invalid={!!errors.consentProgramme}
            aria-describedby="consentProgramme-body"
          />
          <div className="min-w-0 flex-1">
            <Label htmlFor="consentProgramme" className="text-sm font-bold">
              <ShieldCheck className="size-4 shrink-0 text-blue" aria-hidden />
              {t('register.permissions.programme')}
              <span className="text-danger" aria-hidden>
                *
              </span>
            </Label>
            <p id="consentProgramme-body" className="mt-1 text-sm text-ink-soft">
              {t('register.permissions.programmeBody')}
            </p>
          </div>
        </div>
        {errors.consentProgramme && (
          <p role="alert" className="mt-2 text-sm font-medium text-danger">
            {t(`register.errors.${errors.consentProgramme}`)}
          </p>
        )}
      </div>

      <div className="rounded-xl border border-border bg-white p-4 shadow-xs">
        <div className="flex items-start gap-3">
          <div className="min-w-0 flex-1">
            <Label htmlFor="consentEmployer" className="text-sm font-bold">
              <Building2 className="size-4 shrink-0 text-blue" aria-hidden />
              {t('register.permissions.employer')}
              <span className="font-normal text-ink-soft">({t('register.optional')})</span>
            </Label>
            <p className="mt-1 text-sm text-ink-soft">{t('register.permissions.employerBody')}</p>
          </div>
          <Switch
            id="consentEmployer"
            checked={form.consentEmployerVisible}
            onCheckedChange={(v) => set({ consentEmployerVisible: v })}
          />
        </div>
        <p className="mt-3 text-sm font-semibold" aria-live="polite">
          {form.consentEmployerVisible
            ? t('register.permissions.on')
            : t('register.permissions.off')}
        </p>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <div className="rounded-lg bg-success-soft p-3">
            <p className="mb-2 text-sm font-bold text-success">
              {t('register.permissions.sharedTitle')}
            </p>
            <ul className="list-disc space-y-1 ps-5 text-sm">
              {shared.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-lg bg-muted p-3">
            <p className="mb-2 flex items-center gap-1.5 text-sm font-bold">
              <EyeOff className="size-4" aria-hidden />
              {t('register.permissions.hiddenTitle')}
            </p>
            <ul className="list-disc space-y-1 ps-5 text-sm">
              {hidden.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <p className="text-sm text-ink-soft">{t('register.permissions.sample')}</p>
    </div>
  )
}
