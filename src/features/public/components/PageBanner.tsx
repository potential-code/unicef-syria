import type { ReactNode } from 'react'
import { Reveal } from '@/components/motion'
import { DemoTag } from '@/components/shared/DemoTag'
import { cn } from '@/lib/utils'

/** Gradient banner for the public sub-pages (sits below the solid header). */
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
    <section
      className={cn(
        'on-dark relative overflow-hidden bg-grad-unicef pt-28 pb-16 text-white sm:pt-32 sm:pb-20',
        className,
      )}
    >
      <span
        className="pointer-events-none absolute -end-24 -top-16 size-96 rounded-full bg-cyan/40 blur-3xl"
        aria-hidden
      />
      <span
        className="pointer-events-none absolute -bottom-40 start-1/4 size-80 rounded-full bg-yellow/25 blur-3xl"
        aria-hidden
      />
      <span
        className="pointer-events-none absolute end-[12%] bottom-6 hidden size-40 rounded-full border-[14px] border-white/10 md:block"
        aria-hidden
      />
      <Reveal className="container-page relative">
        <div className="mb-4 flex flex-wrap items-center gap-2">
          {eyebrow && (
            <span className="rounded-full bg-yellow px-3 py-1 text-xs font-bold tracking-wide text-ink uppercase">
              {eyebrow}
            </span>
          )}
          <DemoTag onDark />
        </div>
        <h1 className="max-w-3xl text-4xl text-white sm:text-5xl lg:text-6xl">{title}</h1>
        {body && <p className="mt-4 max-w-2xl text-lg text-white/85">{body}</p>}
        {children}
      </Reveal>
    </section>
  )
}
