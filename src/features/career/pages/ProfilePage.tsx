import type { YouthProfile } from '@shared/types'
import { Save, UserRoundPen } from 'lucide-react'
import { type FormEvent, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { Reveal } from '@/components/motion'
import { Button } from '@/components/ui/button'
import { saveProfile } from '@/store/actions/youth'
import { useMyYouth } from '@/store/hooks'
import { CareerHero } from '../components/CareerHero'
import { AccountSection } from '../components/profile/AccountSection'
import { BackgroundSection } from '../components/profile/BackgroundSection'
import { CompletionMeter } from '../components/profile/CompletionMeter'
import { InterestsSection } from '../components/profile/InterestsSection'
import { PermissionsSection } from '../components/profile/PermissionsSection'
import { SupportSection } from '../components/profile/SupportSection'
import { VisibilityPanel } from '../components/profile/VisibilityPanel'
import { profileCompletion, validateProfile } from '../config/profile'

/** Youth profile (brief §2 Y01): every registration field, validation, sharing controls. */
export function ProfilePage() {
  const { t } = useTranslation('career')
  const youth = useMyYouth()
  const [p, setP] = useState<YouthProfile>(youth.profile)
  const [tried, setTried] = useState(false)
  const [busy, setBusy] = useState(false)
  const set = <K extends keyof YouthProfile>(k: K, v: YouthProfile[K]) =>
    setP((x) => ({ ...x, [k]: v }))
  const codes = validateProfile(p)
  const valid = Object.keys(codes).length === 0
  const errors = tried
    ? Object.fromEntries(Object.entries(codes).map(([k, c]) => [k, t(`profile.errors.${c}`)]))
    : {}
  const props = { p, set, errors }

  const save = (e: FormEvent) => {
    e.preventDefault()
    setTried(true)
    if (!valid) {
      toast.error(t('profile.fixErrors'))
      return
    }
    setBusy(true)
    const clean: YouthProfile = {
      ...p,
      name: p.name.trim(),
      email: p.email.trim(),
      phone: p.phone?.trim() || undefined,
      support: p.support?.trim() || undefined,
    }
    saveProfile(youth.id, clean, true)
    toast.success(t('profile.saved'))
    setBusy(false)
  }

  return (
    <form onSubmit={save} noValidate className="space-y-6">
      <CareerHero
        icon={UserRoundPen}
        eyebrow={t('profile.eyebrow')}
        title={t('profile.title')}
        body={t('profile.body')}
      />
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_21rem]">
        <div className="space-y-5">
          <AccountSection {...props} />
          <BackgroundSection {...props} />
          <InterestsSection {...props} />
          <SupportSection {...props} />
          <PermissionsSection {...props} />
          <div className="sticky bottom-3 z-10 flex flex-wrap items-center gap-3 rounded-2xl border border-border/70 bg-white/95 p-3 shadow-lg backdrop-blur">
            <Button type="submit" className="shrink-0 rounded-full" disabled={busy}>
              <Save className="size-4" aria-hidden />
              {t('profile.save')}
            </Button>
            <p className="min-w-0 flex-1 text-sm text-ink-soft">{t('profile.saveHint')}</p>
          </div>
        </div>
        <Reveal className="space-y-5 xl:sticky xl:top-20 xl:order-last xl:self-start">
          <CompletionMeter value={profileCompletion(p)} complete={valid} />
          <VisibilityPanel employerVisible={p.consentEmployerVisible} />
        </Reveal>
      </div>
    </form>
  )
}
