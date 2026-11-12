import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'

/** Labelled input or textarea with optional hint and inline error. */
export function Field({
  id,
  label,
  value,
  onChange,
  hint,
  error,
  required,
  multiline,
  rows = 3,
  type = 'text',
  placeholder,
  className,
  optionalLabel,
}: {
  id: string
  label: string
  value: string
  onChange: (v: string) => void
  hint?: string
  error?: string
  required?: boolean
  multiline?: boolean
  rows?: number
  type?: string
  placeholder?: string
  className?: string
  optionalLabel?: string
}) {
  const describedBy =
    [hint && `${id}-hint`, error && `${id}-error`].filter(Boolean).join(' ') || undefined
  return (
    <div className={cn('space-y-1.5', className)}>
      <Label htmlFor={id} className="font-semibold text-ink">
        {label}
        {required && (
          <span className="text-danger" aria-hidden>
            {' '}
            *
          </span>
        )}
        {optionalLabel && (
          <span className="ms-1 text-xs font-normal text-ink-soft">({optionalLabel})</span>
        )}
      </Label>
      {multiline ? (
        <Textarea
          id={id}
          rows={rows}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
          aria-required={required}
        />
      ) : (
        <Input
          id={id}
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
          aria-required={required}
          className="min-h-11"
        />
      )}
      {hint && !error && (
        <p id={`${id}-hint`} className="text-xs text-ink-soft">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="text-xs font-semibold text-danger">
          {error}
        </p>
      )}
    </div>
  )
}
