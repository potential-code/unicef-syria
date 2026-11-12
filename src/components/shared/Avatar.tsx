import { useState } from 'react'
import { asset } from '@/lib/asset'
import { cn } from '@/lib/utils'

const TONES = [
  'bg-cyan text-ink',
  'bg-blue text-white',
  'bg-yellow text-ink',
  'bg-navy text-white',
  'bg-orange text-white',
]

/** Photo avatar with an initials fallback (also used for learners without a photo). */
export function Avatar({
  src,
  name,
  size = 40,
  className,
}: {
  src?: string
  name: string
  size?: number
  className?: string
}) {
  const [failed, setFailed] = useState(!src)
  const initials = name
    .split(/\s+/)
    .map((p) => p[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
  const tone = TONES[name.length % TONES.length]
  return (
    <span
      className={cn(
        'inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full font-bold',
        failed && tone,
        className,
      )}
      style={{ width: size, height: size, fontSize: size * 0.38 }}
    >
      {failed ? (
        <span aria-hidden>{initials}</span>
      ) : (
        <img
          src={asset(src ?? '')}
          alt=""
          className="size-full object-cover"
          onError={() => setFailed(true)}
        />
      )}
    </span>
  )
}
