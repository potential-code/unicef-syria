import type { CareerRoute } from '@shared/types'
import { Link, useNavigate } from '@tanstack/react-router'
import { Compass, Info, RotateCcw } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { Reveal, Stagger, StaggerItem } from '@/components/motion'
import { EmptyState } from '@/components/shared/EmptyState'
import { PageHeader } from '@/components/shared/PageHeader'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { DIMENSION_LABELS } from '@/data/assessment'
import { profileFor, recommendedRoute } from '@/domain/scoring'
import { useLocalized } from '@/i18n'
import { chooseRoute } from '@/store/actions/youth'
import { useMyYouth } from '@/store/hooks'
import { DimensionChart } from '../components/DimensionChart'
import { PreferenceQuestions } from '../components/PreferenceQuestions'
import { RouteCard } from '../components/RouteCard'
import { ROUTES } from '../config'

const NONE = 'none'

/** Y04 results and route choice. */
export function ResultsPage() {
  const { t } = useTranslation('learn')
  const { l } = useLocalized()
  const youth = useMyYouth()
  const navigate = useNavigate()
  const [secondary, setSecondary] = useState<string>(youth.secondaryRoute ?? NONE)

  const crumbs = [
    { label: t('discovery.title'), to: '/youth/discovery' },
    { label: t('results.title') },
  ]
  if (!youth.assessment) {
    return (
      <>
        <PageHeader title={t('results.title')} crumbs={crumbs} />
        <EmptyState
          icon={Compass}
          title={t('results.noneTitle')}
          body={t('results.noneBody')}
          action={
            <Button asChild className="rounded-full">
              <Link to="/youth/discovery">{t('dash.discoveryCta')}</Link>
            </Button>
          }
        />
      </>
    )
  }

  const { scores } = youth.assessment
  const profile = profileFor(scores)
  const rec = recommendedRoute(youth.preferences?.earningModel)
  const allAnswered =
    !!youth.preferences?.earningModel &&
    !!youth.preferences?.environment &&
    !!youth.preferences?.priority

  const choose = (route: CareerRoute) => {
    const sec = secondary !== NONE && secondary !== route ? (secondary as CareerRoute) : undefined
    chooseRoute(youth.id, route, sec)
    toast.success(t('results.chosenToast', { route: t(`common:routes.${route}`) }))
    void navigate({ to: '/youth/path' })
  }

  return (
    <div className="space-y-10">
      <PageHeader title={t('results.title')} crumbs={crumbs} description={t('results.subtitle')} />

      <Reveal className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
        <section className="on-dark relative overflow-hidden rounded-3xl bg-navy p-6 text-white shadow-lg sm:p-8">
          <span
            className="pointer-events-none absolute -end-10 -bottom-10 size-48 rounded-full bg-cyan/30 blur-2xl"
            aria-hidden
          />
          <p className="relative text-sm font-semibold text-yellow">{t('results.profileLabel')}</p>
          <h2 className="relative mt-2 text-3xl text-white sm:text-4xl">
            {profile.balanced ? t('results.balanced') : l(profile.name ?? undefined)}
          </h2>
          <p className="relative mt-3 text-lg text-white/90">
            {profile.balanced ? t('results.balancedBody') : l(profile.explanation ?? undefined)}
          </p>
          {!profile.balanced && (
            <p className="relative mt-3 text-sm text-white/85">
              {t('results.strongest', {
                a: l(profile.top[0] && DIMENSION_LABELS[profile.top[0]]),
                b: l(profile.top[1] && DIMENSION_LABELS[profile.top[1]]),
              })}
            </p>
          )}
          <p className="relative mt-6 flex items-start gap-2 rounded-2xl bg-white/15 p-3 text-sm font-semibold">
            <Info className="mt-0.5 size-4 shrink-0" aria-hidden />
            {t('results.startingPoint')}
          </p>
        </section>
        <section
          className="rounded-3xl border bg-white p-6 shadow-sm sm:p-8"
          aria-labelledby="chart-title"
        >
          <h2 id="chart-title" className="text-xl">
            {t('results.chartTitle')}
          </h2>
          <p className="mt-1 mb-5 text-sm text-ink-soft">{t('results.chartNote')}</p>
          <DimensionChart scores={scores} top={profile.balanced ? [] : profile.top} />
        </section>
      </Reveal>

      <section aria-labelledby="prefs-title">
        <h2 id="prefs-title" className="text-2xl">
          {t('results.prefsTitle')}
        </h2>
        <p className="mt-1 mb-4 text-ink-soft">{t('results.prefsBody')}</p>
        <PreferenceQuestions youth={youth} />
      </section>

      <section aria-labelledby="routes-title">
        <h2 id="routes-title" className="text-2xl">
          {t('results.routesTitle')}
        </h2>
        <p className="mt-1 mb-4 text-ink-soft">
          {rec
            ? t('results.recLine', { route: t(`common:routes.${rec}`) })
            : t('results.recPending')}
          {!allAnswered && rec && ` ${t('results.recMore')}`}
        </p>
        <Stagger className="grid gap-4 lg:grid-cols-3">
          {ROUTES.map((r) => (
            <StaggerItem key={r} className="h-full [&>article]:h-full">
              <RouteCard
                route={r}
                top={profile.top}
                recommended={rec === r}
                current={youth.route === r}
                onChoose={() => choose(r)}
              />
            </StaggerItem>
          ))}
        </Stagger>
        <div className="mt-6 grid gap-4 rounded-3xl bg-sky-100 p-5 sm:grid-cols-[1fr_auto] sm:items-end">
          <div className="max-w-sm">
            <Label htmlFor="secondary" className="font-semibold">
              {t('results.secondary')}
            </Label>
            <Select value={secondary} onValueChange={setSecondary}>
              <SelectTrigger id="secondary" className="mt-2 min-h-12 w-full bg-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={NONE}>{t('results.secondaryNone')}</SelectItem>
                {ROUTES.map((r) => (
                  <SelectItem key={r} value={r}>
                    {t(`common:routes.${r}`)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="mt-2 text-xs text-ink-soft">{t('results.secondaryHint')}</p>
          </div>
          <div className="flex flex-col gap-2 text-sm text-ink-soft sm:items-end">
            <p>{t('results.changeLater')}</p>
            <Button asChild variant="outline" className="rounded-full">
              <Link to="/youth/discovery">
                <RotateCcw className="size-4" aria-hidden />
                {t('results.retake')}
              </Link>
            </Button>
          </div>
        </div>
        <p className="mt-4 text-xs text-ink-soft">{t('results.noPrediction')}</p>
      </section>
    </div>
  )
}
