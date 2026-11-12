import type { PersonaId } from '@shared/types'
import { Link, useNavigate } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { Reveal, Stagger, StaggerItem } from '@/components/motion'
import { DemoControls } from '@/components/layout/DemoControls'
import { DemoTag } from '@/components/shared/DemoTag'
import { LangToggle } from '@/components/shared/LangToggle'
import { Logo } from '@/components/shared/Logo'
import { PERSONA_BY_ID, PERSONAS } from '@/data/personas'
import { ROLE_HOME } from '@/domain/access'
import { usePageTitle } from '@/hooks/use-page-title'
import { signInAs } from '@/store/actions/session'
import { PersonaCard } from '../components/PersonaCard'
import { SignInForm } from '../components/SignInForm'

const STORY_YOUTH: PersonaId[] = ['Y001', 'Y002', 'Y003']

/** Sign-in portal: the form on top, demo profiles below as one-click cards. */
export function SignInPage() {
  const { t } = useTranslation()
  usePageTitle(t('signIn'))
  const navigate = useNavigate()
  const go = (id: PersonaId) => {
    signInAs(id)
    void navigate({ to: ROLE_HOME[PERSONA_BY_ID[id].role] })
  }
  const youth = PERSONAS.filter((p) => STORY_YOUTH.includes(p.id))
  const branch = PERSONAS.filter((p) => p.role === 'youth' && !STORY_YOUTH.includes(p.id))
  const staff = PERSONAS.filter((p) => p.role !== 'youth')

  return (
    <div className="min-h-dvh bg-grad-sky">
      <div className="relative overflow-hidden bg-grad-unicef pb-28 text-white on-dark">
        <div className="pointer-events-none absolute -end-24 -top-24 size-96 rounded-full bg-cyan/40 blur-3xl" aria-hidden />
        <div className="pointer-events-none absolute -bottom-32 start-10 size-80 rounded-full bg-yellow/25 blur-3xl" aria-hidden />
        <header className="container-page relative flex h-16 items-center gap-2">
          <Link to="/" aria-label={t('home')}>
            <Logo variant="white" className="h-7" />
          </Link>
          <div className="ms-auto flex items-center gap-1.5">
            <LangToggle onDark />
            <DemoControls onDark />
          </div>
        </header>
        <Reveal className="container-page relative pt-8 text-center">
          <DemoTag onDark className="mb-4" />
          <h1 className="text-3xl text-white sm:text-5xl">{t('signInPage.title')}</h1>
          <p className="mx-auto mt-3 max-w-xl text-white/85">{t('signInPage.subtitle')}</p>
        </Reveal>
      </div>

      <main id="main" tabIndex={-1} className="container-page relative -mt-20 pb-16 outline-none">
        <Reveal className="mx-auto max-w-md rounded-3xl border bg-white p-6 shadow-pop sm:p-8">
          <SignInForm onPersona={go} />
        </Reveal>

        <section aria-labelledby="demo-profiles" className="mt-14">
          <div className="mb-6 text-center">
            <h2 id="demo-profiles" className="text-2xl">{t('signInPage.demoTitle')}</h2>
            <p className="mt-1 text-ink-soft">{t('signInPage.demoBody')}</p>
          </div>

          <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-ink-soft">{t('signInPage.youthStories')}</h3>
          <Stagger className="grid gap-4 sm:grid-cols-3">
            {youth.map((p) => (
              <StaggerItem key={p.id}>
                <PersonaCard persona={p} featured onSelect={() => go(p.id)} />
              </StaggerItem>
            ))}
          </Stagger>

          <h3 className="mt-10 mb-3 text-sm font-bold uppercase tracking-wide text-ink-soft">{t('signInPage.staff')}</h3>
          <Stagger className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[...staff, ...branch].map((p) => (
              <StaggerItem key={p.id}>
                <PersonaCard persona={p} onSelect={() => go(p.id)} />
              </StaggerItem>
            ))}
          </Stagger>
        </section>
      </main>
    </div>
  )
}
