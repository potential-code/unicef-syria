import { Link, useRouter } from '@tanstack/react-router'
import { ArrowLeft, ArrowRight, Loader2, Save, UserPlus } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { DemoControls } from '@/components/layout/DemoControls'
import { DemoTag } from '@/components/shared/DemoTag'
import { LangToggle } from '@/components/shared/LangToggle'
import { Logo } from '@/components/shared/Logo'
import { Button } from '@/components/ui/button'
import { usePageTitle } from '@/hooks/use-page-title'
import { formatTime, useLocalized } from '@/i18n'
import { setLang, signInAs } from '@/store/actions/session'
import { saveProfile, startFreshRegistration } from '@/store/actions/youth'
import { AccountStep } from '../components/register/AccountStep'
import { BackgroundStep } from '../components/register/BackgroundStep'
import { InterestsStep } from '../components/register/InterestsStep'
import { PermissionsStep } from '../components/register/PermissionsStep'
import { RegisterAside } from '../components/register/RegisterAside'
import { SuccessScreen } from '../components/register/SuccessScreen'
import { SupportStep } from '../components/register/SupportStep'
import type { StepProps } from '../components/register/types'
import { useRegistrationDraft } from '../hooks/use-registration-draft'
import {
  completion,
  type Errors,
  NOUR_SAMPLE,
  type RegForm,
  STEPS,
  type StepId,
  toProfile,
  validate,
} from '../register-config'

const STEP_VIEW: Record<StepId, (p: StepProps) => React.JSX.Element> = {
  account: AccountStep,
  background: BackgroundStep,
  interests: InterestsStep,
  support: SupportStep,
  permissions: PermissionsStep,
}

/** Y01 registration: five steps, inline validation, draft, completion meter, then sign-in as Nour. */
export function RegisterPage({ next }: { next?: string }) {
  const { t } = useTranslation('public')
  const { lang } = useLocalized()
  usePageTitle(t('register.eyebrow'))
  const router = useRouter()
  const draft = useRegistrationDraft()
  const [form, setForm] = useState<RegForm>(draft.initialForm)
  const [step, setStep] = useState<StepId>(draft.initialStep)
  const [errors, setErrors] = useState<Errors>({})
  const [busy, setBusy] = useState(false)
  const [finished, setFinished] = useState(false)
  const idx = STEPS.indexOf(step)
  const done = STEPS.filter(
    (s) => s !== step && Object.keys(validate(s, form)).length === 0 && STEPS.indexOf(s) < idx,
  )

  const set = (patch: Partial<RegForm>) => {
    setForm((f) => ({ ...f, ...patch }))
    // Clear errors on the fields being corrected (inline validation).
    setErrors((e) => {
      const n = { ...e }
      for (const k of Object.keys(patch) as (keyof RegForm)[]) delete n[k]
      if (patch.contact !== undefined || patch.verified) delete n.verified
      return n
    })
  }
  const go = (s: StepId) => {
    setErrors({})
    setStep(s)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  const nextStep = () => {
    const e = validate(step, form)
    setErrors(e)
    if (Object.keys(e).length) return toast.error(t('register.fixErrors'))
    const following = STEPS[idx + 1]
    if (following) go(following)
  }
  const finish = () => {
    for (const s of STEPS) {
      const e = validate(s, form)
      if (Object.keys(e).length) {
        setStep(s)
        setErrors(e)
        return toast.error(t('register.fixErrors'))
      }
    }
    setBusy(true)
    window.setTimeout(() => {
      startFreshRegistration()
      saveProfile('Y001', toProfile(form), true)
      signInAs('Y001')
      if (form.lang !== lang) setLang(form.lang)
      draft.clear()
      setBusy(false)
      setFinished(true)
      window.scrollTo({ top: 0 })
    }, 800)
  }
  const applySample = () => {
    setForm(NOUR_SAMPLE)
    setErrors({})
    toast.success(t('register.sampleDone'))
  }
  const View = STEP_VIEW[step]

  return (
    <div className="min-h-dvh bg-grad-sky">
      <header className="container-page flex h-16 items-center gap-2 sm:h-18">
        <Link to="/" aria-label={t('common:home')}>
          <Logo className="h-7" />
        </Link>
        <DemoTag className="ms-3 hidden sm:inline-flex" />
        <div className="ms-auto flex items-center gap-1.5">
          <LangToggle />
          <DemoControls />
        </div>
      </header>

      <main id="main" tabIndex={-1} className="container-page pb-16 outline-none">
        {finished ? (
          <div className="mx-auto max-w-3xl pt-6">
            <SuccessScreen
              name={form.name}
              onDiscover={() => void router.navigate({ href: '/youth/discovery' })}
              onLater={() => void router.navigate({ href: next ?? '/youth' })}
            />
          </div>
        ) : (
          <>
            <div className="mb-6 pt-2 sm:pt-6">
              <p className="text-sm font-bold tracking-wider text-blue uppercase">
                {t('register.eyebrow')}
              </p>
              <h1 className="mt-1 text-3xl sm:text-5xl">
                {t('register.title')}{' '}
                <span className="text-grad-unicef">{t('register.titleAccent')}</span>
              </h1>
              {next && <p className="mt-2 text-ink-soft">{t('register.returnNote')}</p>}
              {draft.restored && (
                <p className="mt-2 text-sm text-ink-soft">{t('register.restored')}</p>
              )}
            </div>
            <div className="grid gap-6 lg:grid-cols-[20rem_1fr]">
              <RegisterAside
                step={step}
                done={done}
                completion={completion(form)}
                onGo={go}
                onSample={applySample}
              />
              <section
                aria-labelledby="step-title"
                className="rounded-[2rem] border bg-white p-5 shadow-md sm:p-8"
              >
                <p className="text-sm font-semibold text-blue">
                  {t('register.stepOf', { n: idx + 1, total: STEPS.length })}
                </p>
                <h2 id="step-title" className="mt-1 text-2xl sm:text-3xl">
                  {t(`register.steps.${step}`)}
                </h2>
                <p className="mt-1 mb-6 text-ink-soft">{t(`register.intro.${step}`)}</p>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -24 }}
                    transition={{ duration: 0.25 }}
                  >
                    <View form={form} set={set} errors={errors} />
                  </motion.div>
                </AnimatePresence>
                <div className="mt-8 flex flex-wrap items-center gap-3 border-t pt-6">
                  {idx > 0 && (
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => go(STEPS[idx - 1] ?? 'account')}
                    >
                      <ArrowLeft className="size-4 rtl-mirror" aria-hidden />
                      {t('common:back')}
                    </Button>
                  )}
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => {
                      draft.save(form, step)
                      toast.success(t('register.draftSaved'))
                    }}
                  >
                    <Save className="size-4" aria-hidden />
                    {t('register.saveDraft')}
                  </Button>
                  {draft.savedAt && (
                    <span className="text-xs text-ink-soft">
                      {t('register.savedAt', { time: formatTime(draft.savedAt, lang) })}
                    </span>
                  )}
                  <div className="ms-auto">
                    {step === 'permissions' ? (
                      <Button
                        type="button"
                        size="lg"
                        onClick={finish}
                        disabled={busy}
                        className="rounded-full"
                      >
                        {busy ? (
                          <Loader2 className="size-5 animate-spin" aria-hidden />
                        ) : (
                          <UserPlus className="size-5" aria-hidden />
                        )}
                        {busy ? t('register.creating') : t('register.create')}
                      </Button>
                    ) : (
                      <Button type="button" size="lg" onClick={nextStep} className="rounded-full">
                        {t('common:continue')}
                        <ArrowRight className="size-5 rtl-mirror" aria-hidden />
                      </Button>
                    )}
                  </div>
                </div>
              </section>
            </div>
          </>
        )}
      </main>
    </div>
  )
}
