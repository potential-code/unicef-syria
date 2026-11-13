import { useNavigate, useRouterState } from '@tanstack/react-router'
import { ChevronLeft, ChevronRight, ListOrdered, Play, X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Avatar } from '@/components/shared/Avatar'
import { Button } from '@/components/ui/button'
import { GOLDEN_DEMO } from '@/data/golden-demo'
import { PERSONA_BY_ID } from '@/data/personas'
import { useLocalized } from '@/i18n'
import { cn } from '@/lib/utils'
import { setDemoGuide, setGuideStep } from '@/store/actions/guide'
import { signInAs, signOut, usePersona, usePrefs } from '@/store/actions/session'
import { resetDemo } from '@/store/db'

/**
 * Presenter-only golden demo guide: a small floating panel with the current step, a one-line
 * hint and Next/Back. "Go" signs in as the step's profile and opens the exact page. Hidden until
 * opened from the Presenter menu.
 */
export function DemoGuide() {
  const { t } = useTranslation()
  const { l } = useLocalized()
  const navigate = useNavigate()
  const prefs = usePrefs()
  const [list, setList] = useState(false)
  const pathname = useRouterState({ select: (r) => r.location.pathname })
  const persona = usePersona()
  const current = prefs.guideStep ?? 0

  // Follow the presenter: arriving on one of the next few steps' pages (as that step's
  // profile) by using the app itself moves the guide forward to that step.
  useEffect(() => {
    if (!prefs.demoGuide) return
    for (let k = current + 1; k <= Math.min(current + 3, GOLDEN_DEMO.length - 1); k++) {
      const s = GOLDEN_DEMO[k]
      if (!s) continue
      const samePage = pathname === s.to || (s.to !== '/' && pathname.startsWith(`${s.to}/`))
      const samePerson = s.persona ? persona?.id === s.persona : !persona || k <= 1
      if (samePage && samePerson) {
        setGuideStep(k)
        return
      }
    }
  }, [pathname, persona, current, prefs.demoGuide])

  if (!prefs.demoGuide) return null
  const i = Math.min(prefs.guideStep ?? 0, GOLDEN_DEMO.length - 1)
  const step = GOLDEN_DEMO[i]
  if (!step) return null

  const go = (n: number) => {
    const s = GOLDEN_DEMO[n]
    if (!s) return
    if (s.reset) resetDemo()
    if (s.persona) signInAs(s.persona)
    else if (s.reset) signOut()
    setGuideStep(n)
    setList(false)
    void navigate({ to: s.to })
  }
  const who = step.persona ? PERSONA_BY_ID[step.persona] : null

  return (
    <div className="fixed end-4 bottom-4 z-50 w-[min(22rem,calc(100vw-2rem))] print:hidden">
      <AnimatePresence>
        {list && (
          <motion.ol
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="card mb-2 max-h-[60vh] overflow-y-auto p-2"
          >
            {GOLDEN_DEMO.map((s, n) => {
              const p = s.persona ? PERSONA_BY_ID[s.persona] : null
              return (
                <li key={`${s.to}-${n}`}>
                  <button
                    type="button"
                    onClick={() => go(n)}
                    className={cn(
                      'flex w-full items-center gap-2.5 rounded-xl px-2.5 py-2 text-start text-sm hover:bg-sky-50',
                      n === i && 'bg-sky-100 font-semibold',
                    )}
                  >
                    <span className="w-5 shrink-0 text-xs font-bold text-blue tabular-nums">
                      {n + 1}
                    </span>
                    <span className="min-w-0 flex-1 truncate">{l(s.title)}</span>
                    <span className="shrink-0 text-xs text-ink-soft">
                      {p ? l(p.name).split(' ')[0] : t('demo.guideVisitor')}
                    </span>
                  </button>
                </li>
              )
            })}
          </motion.ol>
        )}
      </AnimatePresence>
      <div className="on-dark relative overflow-hidden rounded-2xl bg-grad-unicef-v p-4 text-white shadow-pop">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold tracking-widest text-cyan uppercase">
            {t('demo.guide')} · {i + 1}/{GOLDEN_DEMO.length}
          </span>
          <div className="ms-auto flex items-center gap-1">
            <button
              type="button"
              onClick={() => setList((v) => !v)}
              className="flex size-8 items-center justify-center rounded-lg text-white/80 hover:bg-white/10 hover:text-white"
              aria-label={t('demo.guideSteps')}
            >
              <ListOrdered className="size-4" aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => setDemoGuide(false)}
              className="flex size-8 items-center justify-center rounded-lg text-white/80 hover:bg-white/10 hover:text-white"
              aria-label={t('close')}
            >
              <X className="size-4" aria-hidden />
            </button>
          </div>
        </div>
        <div className="mt-2 flex items-start gap-3">
          {who ? (
            <Avatar src={who.image} name={l(who.name)} size={36} className="ring-2 ring-white/40" />
          ) : null}
          <div className="min-w-0">
            <p className="font-bold leading-snug">{l(step.title)}</p>
            <p className="mt-0.5 text-xs text-white/80">
              {who ? `${l(who.name)} · ${t(`roles.${who.role}`)}` : t('demo.guideVisitor')}
            </p>
          </div>
        </div>
        <p className="mt-2 text-sm leading-snug text-white/90">{l(step.hint)}</p>
        <div className="mt-3 flex items-center gap-2">
          <Button
            size="sm"
            variant="ghost"
            className="text-white hover:bg-white/10 hover:text-white"
            disabled={i === 0}
            onClick={() => go(i - 1)}
            aria-label={t('back')}
          >
            <ChevronLeft className="size-4 rtl-mirror" aria-hidden />
          </Button>
          <Button
            size="sm"
            className="rounded-full bg-white text-navy hover:bg-sky-100"
            onClick={() => go(i)}
          >
            <Play className="size-3.5" aria-hidden />
            {t('demo.guideGo')}
          </Button>
          <Button
            size="sm"
            className="ms-auto rounded-full bg-yellow text-ink hover:bg-white"
            disabled={i === GOLDEN_DEMO.length - 1}
            onClick={() => go(i + 1)}
          >
            {t('next')}
            <ChevronRight className="size-4 rtl-mirror" aria-hidden />
          </Button>
        </div>
      </div>
    </div>
  )
}
