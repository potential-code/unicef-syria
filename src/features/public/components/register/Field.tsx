import { AlertCircle } from 'lucide-react'
import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

/** Label, optional hint and inline error around one input. */
export function Field({
  id,
  label,
  hint,
  error,
  optional,
  children,
}: {
  id: string
  label: string
  hint?: string
  error?: string
  optional?: boolean
  children: ReactNode
}) {
  const { t } = useTranslation('public')
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id} className="text-sm font-semibold">
        {label}
        {optional ? (
          <span className="ms-1 font-normal text-ink-soft">({t('register.optional')})</span>
        ) : (
          <span className="ms-0.5 text-danger" aria-hidden>
            *
          </span>
        )}
      </Label>
      {children}
      {hint && !error && (
        <p id={`${id}-hint`} className="text-xs text-ink-soft">
          {hint}
        </p>
      )}
      {error && (
        <p
          id={`${id}-error`}
          role="alert"
          className="flex items-center gap-1 text-sm font-medium text-danger"
        >
          <AlertCircle className="size-4" aria-hidden />
          {t(`register.errors.${error}`)}
        </p>
      )}
    </div>
  )
}

export function SelectField({
  id,
  label,
  value,
  options,
  onChange,
  error,
  hint,
  optional,
}: {
  id: string
  label: string
  value: string
  options: { v: string; label: string }[]
  onChange: (v: string) => void
  error?: string
  hint?: string
  optional?: boolean
}) {
  const { t } = useTranslation('public')
  return (
    <Field id={id} label={label} error={error} hint={hint} optional={optional}>
      <Select value={value || undefined} onValueChange={onChange}>
        <SelectTrigger
          id={id}
          className="w-full"
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
        >
          <SelectValue placeholder={t('register.choose')} />
        </SelectTrigger>
        <SelectContent>
          {options.map((o) => (
            <SelectItem key={o.v} value={o.v}>
              {o.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </Field>
  )
}

/** Multi-select as tappable chips (aria-pressed toggles). */
export function ChipGroup({
  id,
  label,
  options,
  value,
  onChange,
  error,
  optional,
}: {
  id: string
  label: string
  options: { v: string; label: string }[]
  value: string[]
  onChange: (v: string[]) => void
  error?: string
  optional?: boolean
}) {
  const { t } = useTranslation('public')
  return (
    <fieldset className="space-y-2" aria-describedby={error ? `${id}-error` : undefined}>
      <legend className="text-sm font-semibold">
        {label}
        {optional ? (
          <span className="ms-1 font-normal text-ink-soft">({t('register.optional')})</span>
        ) : (
          <span className="ms-0.5 text-danger" aria-hidden>
            *
          </span>
        )}
      </legend>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => {
          const on = value.includes(o.v)
          return (
            <button
              key={o.v}
              type="button"
              aria-pressed={on}
              onClick={() => onChange(on ? value.filter((x) => x !== o.v) : [...value, o.v])}
              className={`h-9 rounded-full border px-3.5 text-sm font-semibold transition-colors ${on ? 'border-blue bg-blue text-white' : 'border-border bg-white text-ink hover:border-blue'}`}
            >
              {o.label}
            </button>
          )
        })}
      </div>
      {error && (
        <p id={`${id}-error`} role="alert" className="text-sm font-medium text-danger">
          {t(`register.errors.${error}`)}
        </p>
      )}
    </fieldset>
  )
}
