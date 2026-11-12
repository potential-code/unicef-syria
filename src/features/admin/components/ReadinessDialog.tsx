import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { CHART, ChartLegend, StackedBar } from '@/components/charts'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { REVIEWED_CANDIDATES, SKILL_DEMAND } from '@/data/labour'
import { useLabels } from '../lib/useLabels'

/** Candidate readiness: reviewed sample candidates with and without the relevant module. */
export function ReadinessDialog({ trigger }: { trigger: ReactNode }) {
  const { t } = useTranslation('admin')
  const { l, n } = useLabels()
  const legend = [
    { key: 'ready', label: t('labour.ready'), color: CHART.primary },
    { key: 'notyet', label: t('labour.notYet'), color: CHART.neutral },
  ]
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{t('labour.readinessTitle')}</DialogTitle>
          <DialogDescription>
            {t('labour.readinessBody', { count: REVIEWED_CANDIDATES })}
          </DialogDescription>
        </DialogHeader>
        <ChartLegend items={legend} />
        <ul className="space-y-3">
          {SKILL_DEMAND.map((s) => (
            <li key={s.skill.en}>
              <p className="mb-1 flex justify-between text-sm">
                <span>
                  {l(s.skill)} <span className="text-xs text-ink-soft">({s.courseId})</span>
                </span>
                <strong className="tabular-nums">
                  {t('kpi.ofShort', { num: n(s.candidatesReady), den: n(REVIEWED_CANDIDATES) })}
                </strong>
              </p>
              <StackedBar
                height="h-5"
                ariaLabel={t('labour.readyAria', {
                  ready: s.candidatesReady,
                  total: REVIEWED_CANDIDATES,
                })}
                format={n}
                segments={[
                  {
                    key: 'ready',
                    label: t('labour.ready'),
                    value: s.candidatesReady,
                    color: CHART.primary,
                  },
                  {
                    key: 'notyet',
                    label: t('labour.notYet'),
                    value: Math.max(0, REVIEWED_CANDIDATES - s.candidatesReady),
                    color: CHART.neutral,
                  },
                ]}
              />
            </li>
          ))}
        </ul>
        <p className="text-xs text-ink-soft">{t('labour.readinessNote')}</p>
      </DialogContent>
    </Dialog>
  )
}
