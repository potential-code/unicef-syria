import { BadgeCheck, Loader2, MailCheck } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Field, SelectField } from './Field'
import type { StepProps } from './types'

/** Name, contact, password and language. Verification is an explicit demo action: no OTP is sent. */
export function AccountStep({ form, set, errors }: StepProps) {
  const { t } = useTranslation('public')
  const [verifying, setVerifying] = useState(false)
  const contactOk =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.contact.trim()) ||
    /^\+?[\d\s]{8,15}$/.test(form.contact.trim())
  const verify = () => {
    setVerifying(true)
    window.setTimeout(() => {
      set({ verified: true })
      setVerifying(false)
      toast.success(t('register.account.verifiedToast'))
    }, 700)
  }
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="sm:col-span-2">
        <Field id="name" label={t('register.account.name')} error={errors.name}>
          <Input
            id="name"
            autoComplete="name"
            value={form.name}
            onChange={(e) => set({ name: e.target.value })}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'name-error' : undefined}
          />
        </Field>
      </div>
      <div className="sm:col-span-2">
        <Field
          id="contact"
          label={t('register.account.contact')}
          hint={t('register.account.contactHint')}
          error={errors.contact ?? errors.verified}
        >
          <div className="flex flex-col gap-2 sm:flex-row">
            <Input
              id="contact"
              autoComplete="email"
              value={form.contact}
              onChange={(e) => set({ contact: e.target.value, verified: false })}
              aria-invalid={!!(errors.contact ?? errors.verified)}
              aria-describedby={
                errors.contact || errors.verified ? 'contact-error' : 'contact-hint'
              }
              className="flex-1"
            />
            {form.verified ? (
              <span className="inline-flex h-10 shrink-0 items-center gap-1.5 rounded-xl bg-success-soft px-4 text-sm font-bold text-success">
                <BadgeCheck className="size-5" aria-hidden />
                {t('register.account.verified')}
              </span>
            ) : (
              <Button
                type="button"
                variant="outline"
                onClick={verify}
                disabled={!contactOk || verifying}
              >
                {verifying ? (
                  <Loader2 className="size-4 animate-spin" aria-hidden />
                ) : (
                  <MailCheck className="size-4" aria-hidden />
                )}
                {verifying ? t('register.account.verifying') : t('register.account.verify')}
              </Button>
            )}
          </div>
        </Field>
        <p className="mt-1.5 text-xs text-ink-soft">{t('register.account.noOtp')}</p>
      </div>
      <Field
        id="password"
        label={t('register.account.password')}
        hint={t('register.account.passwordHint')}
        error={errors.password}
      >
        <Input
          id="password"
          type="password"
          autoComplete="new-password"
          value={form.password}
          onChange={(e) => set({ password: e.target.value })}
          aria-invalid={!!errors.password}
          aria-describedby={errors.password ? 'password-error' : 'password-hint'}
        />
      </Field>
      <SelectField
        id="lang"
        label={t('register.account.lang')}
        value={form.lang}
        onChange={(v) => set({ lang: v === 'ar' ? 'ar' : 'en' })}
        options={[
          { v: 'en', label: 'English' },
          { v: 'ar', label: 'العربية' },
        ]}
      />
    </div>
  )
}
