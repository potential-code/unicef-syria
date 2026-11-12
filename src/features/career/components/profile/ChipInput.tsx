import { Plus, X } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

/** Tag input for interests, skills and sectors. */
export function ChipInput({
  id,
  label,
  values,
  onChange,
  hint,
}: {
  id: string
  label: string
  values: string[]
  onChange: (v: string[]) => void
  hint?: string
}) {
  const { t } = useTranslation('career')
  const [draft, setDraft] = useState('')
  const add = () => {
    const parts = draft
      .split(',')
      .map((s) => s.trim())
      .filter((s) => s && !values.includes(s))
    if (parts.length) onChange([...values, ...parts])
    setDraft('')
  }
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id} className="font-semibold">
        {label}
      </Label>
      {values.length > 0 && (
        <ul className="flex flex-wrap gap-1.5">
          {values.map((v) => (
            <li
              key={v}
              className="inline-flex items-center gap-1 rounded-full bg-sky-100 py-1 ps-3 pe-1 text-sm font-medium text-navy"
            >
              {v}
              <button
                type="button"
                onClick={() => onChange(values.filter((x) => x !== v))}
                className="flex size-7 items-center justify-center rounded-full hover:bg-white"
                aria-label={t('profile.removeChip', { value: v })}
              >
                <X className="size-3.5" aria-hidden />
              </button>
            </li>
          ))}
        </ul>
      )}
      <div className="flex gap-2">
        <Input
          id={id}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault()
              add()
            }
          }}
          aria-describedby={hint ? `${id}-hint` : undefined}
        />
        <Button
          type="button"
          variant="secondary"
          size="icon"
          onClick={add}
          disabled={!draft.trim()}
          aria-label={t('profile.addChip', { label })}
        >
          <Plus className="size-4" aria-hidden />
        </Button>
      </div>
      {hint && (
        <p id={`${id}-hint`} className="text-xs text-ink-soft">
          {hint}
        </p>
      )}
    </div>
  )
}
