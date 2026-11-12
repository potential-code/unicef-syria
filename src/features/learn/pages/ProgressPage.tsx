import {
  Award,
  Briefcase,
  CheckCheck,
  GraduationCap,
  Info,
  ShieldCheck,
  Trophy,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Motif } from '@/components/brand'
import { Reveal } from '@/components/motion'
import { PageHeader } from '@/components/shared/PageHeader'
import { StatCard } from '@/components/shared/StatCard'
import { balance } from '@/domain/points'
import { useApplications } from '@/store/actions/applications'
import { useDb } from '@/store/db'
import { useMyYouth } from '@/store/hooks'
import { BadgeGrid } from '../components/BadgeGrid'
import { PointsLedger } from '../components/PointsLedger'
import { PointsRules } from '../components/PointsRules'
import { BADGES } from '../config'

/** Y12 progress and rewards: points, ledger, rules, badges and separate measures. */
export function ProgressPage() {
  const { t } = useTranslation('learn')
  const youth = useMyYouth()
  const apps = useApplications().filter((a) => a.youthId === youth.id)
  const outcomes = useDb((db) => db.outcomes).filter((o) => o.youthId === youth.id && o.confirmed)
  const progress = Object.values(youth.progress)
  const completed = progress.filter((p) => p?.completedAt).length
  const units = progress.reduce((n, p) => n + (p?.units.filter((u) => u === 'done').length ?? 0), 0)
  const certs = progress.filter((p) => p?.certificate === 'issued').length
  const submitted = apps.filter((a) => a.stage !== 'draft' && a.stage !== 'withdrawn').length

  return (
    <div className="space-y-8">
      <PageHeader title={t('progress.title')} description={t('progress.subtitle')} />

      <Reveal className="on-dark relative overflow-hidden rounded-3xl bg-grad-unicef p-6 text-white shadow-lg sm:p-10">
        <Motif variant="banner" className="text-white/[0.12]" />
        <div className="relative flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="flex items-center gap-2 text-sm font-semibold text-white/85">
              <Trophy className="size-4 text-yellow" aria-hidden />
              {t('progress.balance')}
            </p>
            <p className="mt-2 text-6xl leading-none font-extrabold tracking-tight tabular-nums sm:text-7xl">
              {balance(youth)}
              <span className="ms-2 text-xl font-bold text-white/80">{t('dash.pointsUnit')}</span>
            </p>
            <p className="mt-3 max-w-md text-white/90">{t('progress.balanceNote')}</p>
          </div>
          <p className="flex max-w-sm items-start gap-2 border-s-4 border-yellow ps-3 text-sm text-white/90">
            <ShieldCheck className="mt-0.5 size-4 shrink-0 text-yellow" aria-hidden />
            {t('progress.noLeaderboard')}
          </p>
        </div>
      </Reveal>

      <div className="space-y-3">
        <div className="grid gap-6 2xl:grid-cols-[3fr_2fr]">
          <section aria-labelledby="m-learning">
            <h2 id="m-learning" className="mb-3 flex items-center gap-2 text-xl">
              <GraduationCap className="size-5 text-blue" aria-hidden />
              {t('progress.learningMeasure')}
            </h2>
            <div className="grid gap-3 sm:grid-cols-3">
              <StatCard
                label={t('progress.coursesCompleted')}
                value={completed}
                icon={CheckCheck}
                tone="blue"
              />
              <StatCard
                label={t('progress.unitsCompleted')}
                value={units}
                icon={GraduationCap}
                tone="cyan"
              />
              <StatCard
                label={t('progress.certificates')}
                value={certs}
                icon={Award}
                tone="yellow"
              />
            </div>
          </section>
          <section aria-labelledby="m-career">
            <h2 id="m-career" className="mb-3 flex items-center gap-2 text-xl">
              <Briefcase className="size-5 text-blue" aria-hidden />
              {t('progress.careerMeasure')}
            </h2>
            <div className="grid gap-3 sm:grid-cols-2">
              <StatCard
                label={t('progress.applications')}
                value={submitted}
                hint={t('progress.applicationsHint', { drafts: apps.length - submitted })}
                icon={Briefcase}
                tone="navy"
              />
              <StatCard
                label={t('progress.outcomes')}
                value={outcomes.length}
                hint={t('progress.outcomesHint')}
                icon={ShieldCheck}
                tone="orange"
              />
            </div>
          </section>
        </div>
        <p className="flex items-start gap-2 text-sm text-ink-soft">
          <Info className="mt-0.5 size-4 shrink-0 text-blue" aria-hidden />
          {t('progress.separate')}
        </p>
      </div>

      <section aria-labelledby="badges">
        <div className="mb-4 flex flex-wrap items-end justify-between gap-2">
          <div>
            <h2 id="badges" className="text-xl">
              {t('progress.badges')}
            </h2>
            <p className="mt-1 text-sm text-ink-soft">{t('progress.badgesNote')}</p>
          </div>
          <p className="text-sm font-bold text-navy tabular-nums">
            {youth.badges.length} / {BADGES.length} {t('progress.earned')}
          </p>
        </div>
        <div className="card relative overflow-hidden bg-grad-sky px-5 pt-8 pb-7 sm:px-8">
          <Motif variant="corner" className="text-blue/[0.07]" />
          <div className="relative">
            <BadgeGrid youth={youth} />
          </div>
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-2">
        <section aria-labelledby="ledger" className="min-w-0">
          <h2 id="ledger" className="mb-3 text-xl">
            {t('progress.ledger')}
          </h2>
          <PointsLedger youth={youth} />
        </section>
        <section aria-labelledby="rules" className="min-w-0">
          <h2 id="rules" className="mb-3 text-xl">
            {t('progress.rulesTitle')}
          </h2>
          <PointsRules />
          <p className="mt-3 text-sm text-ink-soft">{t('progress.rulesNote')}</p>
        </section>
      </div>
    </div>
  )
}
