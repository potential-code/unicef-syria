import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

/** Native radio input (visually hidden) wrapped in a styled card label. */
export function OptionRadio({
  name,
  checked,
  onChange,
  className,
  children,
}: {
  name: string
  checked: boolean
  onChange: () => void
  className?: string
  children: ReactNode
}) {
  return (
    <label
      className={cn(
        'cursor-pointer has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-blue',
        className,
      )}
    >
      <input type="radio" name={name} checked={checked} onChange={onChange} className="sr-only" />
      {children}
    </label>
  )
}
