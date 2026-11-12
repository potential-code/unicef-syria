import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

/** Small labelled-select helper: options are value plus translated label. */
export function ChoiceSelect<T extends string>({
  id,
  value,
  onChange,
  options,
  invalid,
  size = 'default',
}: {
  id: string
  value: T
  onChange: (v: T) => void
  options: { value: T; label: string }[]
  invalid?: boolean
  size?: 'sm' | 'default'
}) {
  return (
    <Select value={value} onValueChange={(v) => onChange(v as T)}>
      <SelectTrigger
        id={id}
        aria-invalid={invalid || undefined}
        size={size}
        className="w-full bg-white"
      >
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {options.map((o) => (
          <SelectItem key={o.value} value={o.value}>
            {o.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
