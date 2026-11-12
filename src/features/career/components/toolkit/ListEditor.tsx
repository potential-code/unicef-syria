import { Plus, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

/** Editable list of short text items (CV bullets, customer questions): edit, remove, add. */
export function ListEditor({
  id,
  label,
  items,
  onChange,
  addLabel,
  emptyText,
  placeholder,
}: {
  id: string
  label: string
  items: string[]
  onChange: (items: string[]) => void
  addLabel: string
  emptyText: string
  placeholder?: string
}) {
  const { t } = useTranslation('career')
  const [draft, setDraft] = useState('')
  const add = () => {
    const v = draft.trim()
    if (!v) return
    onChange([...items, v])
    setDraft('')
  }
  return (
    <fieldset className="space-y-2">
      <legend className="mb-1.5 text-sm font-semibold text-ink">{label}</legend>
      {items.length === 0 && (
        <p className="rounded-xl bg-muted px-3 py-2 text-sm text-ink-soft">{emptyText}</p>
      )}
      <ol className="space-y-2">
        {items.map((item, i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: items are edited in place by position
          <li key={i} className="flex items-center gap-2">
            <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-sky-100 text-xs font-bold text-navy">
              {i + 1}
            </span>
            <Label htmlFor={`${id}-${i}`} className="sr-only">
              {t('toolkit.itemLabel', { label, n: i + 1 })}
            </Label>
            <Input
              id={`${id}-${i}`}
              value={item}
              onChange={(e) => onChange(items.map((x, j) => (j === i ? e.target.value : x)))}
              className="min-h-11"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label={t('toolkit.removeItem', { n: i + 1 })}
              onClick={() => onChange(items.filter((_, j) => j !== i))}
            >
              <Trash2 className="size-4" aria-hidden />
            </Button>
          </li>
        ))}
      </ol>
      <div className="flex gap-2">
        <Label htmlFor={`${id}-new`} className="sr-only">
          {addLabel}
        </Label>
        <Input
          id={`${id}-new`}
          value={draft}
          placeholder={placeholder}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault()
              add()
            }
          }}
          className="min-h-11"
        />
        <Button
          type="button"
          variant="secondary"
          onClick={add}
          disabled={!draft.trim()}
          className="rounded-full"
        >
          <Plus className="size-4" aria-hidden />
          {addLabel}
        </Button>
      </div>
    </fieldset>
  )
}
