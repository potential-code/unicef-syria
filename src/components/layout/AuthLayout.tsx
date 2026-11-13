import { Link } from '@tanstack/react-router'
import { CheckCircle2 } from 'lucide-react'
import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { Motif } from '@/components/brand'
import { Reveal } from '@/components/motion'
import { DemoTag } from '@/components/shared/DemoTag'
import { LangToggle } from '@/components/shared/LangToggle'
import { Logo } from '@/components/shared/Logo'
import { SmartImage } from '@/components/shared/SmartImage'
import { DemoControls } from './DemoControls'

/**
 * Split auth layout for sign-in and registration: a photo panel with a navy overlay, the emblem
 * motif and a short message on one side; the form on the other. On phones the panel becomes a
 * compact banner above the form.
 */
export function AuthLayout({
  image,
  eyebrow,
  title,
  points,
  children,
}: {
  image: string
  eyebrow: string
  title: string
  points: string[]
  children: ReactNode
}) {
  const { t } = useTranslation()
  return (
    <div className="min-h-dvh bg-background lg:grid lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
      <aside className="on-dark relative isolate overflow-hidden text-white lg:sticky lg:top-0 lg:h-dvh">
        <SmartImage src={image} alt="" className="absolute inset-0 -z-20 size-full" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(170deg,rgb(0_71_187/0.5)_0%,rgb(0_57_150/0.62)_40%,rgb(0_30_80/0.9)_100%)]" />
        <Motif variant="auth" className="text-white/[0.16]" />
        <div className="relative flex h-full flex-col gap-6 px-6 py-6 sm:px-10 lg:py-10">
          <Link to="/" aria-label={t('home')} className="w-fit">
            <Logo variant="white" className="h-7" />
          </Link>
          <Reveal className="mt-auto hidden max-w-md space-y-5 lg:block">
            <p className="text-xs font-bold tracking-widest text-cyan uppercase">{eyebrow}</p>
            <h2 className="text-4xl leading-tight text-white xl:text-5xl">{title}</h2>
            <ul className="space-y-3">
              {points.map((p) => (
                <li key={p} className="flex items-start gap-2.5 text-white/90">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-yellow" aria-hidden />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
            <DemoTag onDark />
          </Reveal>
          <div className="lg:hidden">
            <p className="text-xs font-bold tracking-widest text-cyan uppercase">{eyebrow}</p>
            <p className="mt-1 text-2xl font-bold text-white">{title}</p>
          </div>
        </div>
      </aside>

      <div className="flex min-w-0 flex-col">
        <header className="flex h-16 items-center justify-end gap-2 px-4 sm:px-8">
          <LangToggle />
          <DemoControls />
        </header>
        <main
          id="main"
          tabIndex={-1}
          className="flex flex-1 justify-center px-4 pt-4 pb-16 outline-none sm:px-8 lg:pt-10"
        >
          <div className="w-full max-w-xl">{children}</div>
        </main>
      </div>
    </div>
  )
}
