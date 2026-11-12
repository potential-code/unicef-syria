import type { ReactNode } from 'react'
import { Motif } from '@/components/brand'
import { Reveal } from '@/components/motion'
import { DemoTag } from '@/components/shared/DemoTag'
import { cn } from '@/lib/utils'

/** Contained brand banner at the top of the public sub-pages (sits below the sticky header). */
export function PageBanner({
  eyebrow,
  title,
  body,
  children,
  className,
}: {
  eyebrow?: string
  title: string
  body?: ReactNode
  children?: ReactNode
  className?: string
}) {
  return (
    <div className={cn('container-page pt-6 sm:pt-8', className)}>
      <section className="on-dark relative overflow-hidden rounded-3xl bg-grad-unicef px-6 py-10 text-white shadow-lg sm:px-10 sm:py-12 lg:px-12">
        <Motif variant="banner" className="text-white/[0.12]" />
        <Reveal className="relative max-w-3xl">
          <div className="mb-4 flex flex-wrap items-center gap-2">
            {eyebrow && (
              <span className="rounded-full bg-yellow px-2.5 py-0.5 text-[11px] font-bold tracking-wider text-ink uppercase">
                {eyebrow}
              </span>
            )}
            <DemoTag onDark />
          </div>
          <h1 className="text-3xl text-white sm:text-4xl lg:text-[2.75rem]">{title}</h1>
          {body && <p className="mt-3 max-w-2xl text-lg text-white/85">{body}</p>}
          {children}
        </Reveal>
      </section>
    </div>
  )
}
