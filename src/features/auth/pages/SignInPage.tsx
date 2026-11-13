import type { PersonaId } from '@shared/types'
import { useNavigate } from '@tanstack/react-router'
import { ChevronDown } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { AuthLayout } from '@/components/layout/AuthLayout'
import { Stagger, StaggerItem } from '@/components/motion'
import { PERSONA_BY_ID, PERSONAS } from '@/data/personas'
import { ROLE_HOME } from '@/domain/access'
import { usePageTitle } from '@/hooks/use-page-title'
import { signInAs } from '@/store/actions/session'
import { PersonaCard } from '../components/PersonaCard'
import { SignInForm } from '../components/SignInForm'

/** Sign-in portal: image panel on one side; form, then compact demo profile cards, on the other. */
export function SignInPage() {
  const { t } = useTranslation()
  usePageTitle(t('signIn'))
  const navigate = useNavigate()
  const go = (id: PersonaId) => {
    signInAs(id)
    void navigate({ to: ROLE_HOME[PERSONA_BY_ID[id].role] })
  }
  const golden = PERSONAS.filter((p) => p.golden).sort((a, b) => (a.golden ?? 0) - (b.golden ?? 0))
  const extras = PERSONAS.filter((p) => !p.golden)

  return (
    <AuthLayout
      image="images/generated/scene-mentor.webp"
      eyebrow={t('signInPage.panelEyebrow')}
      title={t('signInPage.panelTitle')}
      points={[t('signInPage.point1'), t('signInPage.point2'), t('signInPage.point3')]}
    >
      <h1 className="text-3xl">{t('signInPage.title')}</h1>
      <p className="mt-1.5 text-ink-soft">{t('signInPage.subtitle')}</p>
      <div className="card mt-6 p-6">
        <SignInForm onPersona={go} />
      </div>

      <section aria-labelledby="demo-profiles" className="mt-10">
        <div className="mb-4 flex items-center gap-3">
          <h2 id="demo-profiles" className="text-base">
            {t('signInPage.demoTitle')}
          </h2>
          <span className="h-px flex-1 bg-border" aria-hidden />
        </div>
        <p className="mb-4 text-sm text-ink-soft">{t('signInPage.demoBody')}</p>

        <h3 className="mb-2 text-[11px] font-bold tracking-widest text-ink-soft uppercase">
          {t('signInPage.golden')}
        </h3>
        <Stagger className="grid gap-2 sm:grid-cols-2">
          {golden.map((p) => (
            <StaggerItem key={p.id}>
              <PersonaCard persona={p} onSelect={() => go(p.id)} />
            </StaggerItem>
          ))}
        </Stagger>

        <details className="group mt-6">
          <summary className="flex cursor-pointer list-none items-center gap-2 text-[11px] font-bold tracking-widest text-ink-soft uppercase hover:text-blue">
            <ChevronDown
              className="size-4 transition-transform group-open:rotate-180"
              aria-hidden
            />
            {t('signInPage.more')}
          </summary>
          <div className="mt-2 grid gap-2 sm:grid-cols-2">
            {extras.map((p) => (
              <PersonaCard key={p.id} persona={p} onSelect={() => go(p.id)} />
            ))}
          </div>
        </details>
      </section>
    </AuthLayout>
  )
}
