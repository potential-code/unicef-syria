import { type ImgHTMLAttributes, useState } from 'react'
import { asset } from '@/lib/asset'
import { cn } from '@/lib/utils'

/**
 * Image from public/ with a branded gradient fallback, so a missing generated image never shows
 * as broken. `src` is relative to public/ (e.g. 'images/generated/hero-main.webp').
 */
export function SmartImage({
  src,
  alt,
  className,
  fallbackClassName,
  ...rest
}: ImgHTMLAttributes<HTMLImageElement> & { src?: string; fallbackClassName?: string }) {
  const [failed, setFailed] = useState(!src)
  if (failed) {
    return (
      <svg
        role="img"
        aria-label={alt || undefined}
        aria-hidden={alt ? undefined : true}
        className={cn('bg-grad-unicef', className, fallbackClassName)}
      >
        {alt ? <title>{alt}</title> : null}
      </svg>
    )
  }
  return (
    <img
      src={asset(src ?? '')}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
      className={cn('object-cover', className)}
      {...rest}
    />
  )
}
