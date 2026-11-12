import { useTranslation } from 'react-i18next'
import { ChartCard, ChartLegend } from '@/components/charts'
import { REVIEWED_CANDIDATES, SKILL_DEMAND, VACANCY_RECORDS } from '@/data/labour'
import { useLabels } from '../lib/useLabels'

/**
 * Requested skills vs candidate readiness. Two different populations (30 vacancy records,
 * 25 reviewed candidates), so each bar is a share of its own base, labelled with both counts.
 */
export function SkillDemandList() {
  const { t } = useTranslation('admin')
  const { l, n } = useLabels()
  return (
    <ChartCard
      title={t('labour.skillsTitle')}
      subtitle={t('labour.skillsSub', { vac: VACANCY_RECORDS, cand: REVIEWED_CANDIDATES })}
      table={{
        columns: [t('labour.skill'), t('labour.inVacancies'), t('labour.candidatesReady')],
        rows: SKILL_DEMAND.map((s) => [
          l(s.skill),
          `${s.vacancies}/${VACANCY_RECORDS}`,
          `${s.candidatesReady}/${REVIEWED_CANDIDATES}`,
        ]),
      }}
    >
      <ChartLegend
        items={[
          { key: 'v', label: t('labour.inVacancies'), color: 'var(--unicef-blue)' },
          { key: 'c', label: t('labour.candidatesReady'), color: 'var(--unicef-cyan)' },
        ]}
      />
      <ul className="mt-4 space-y-3">
        {SKILL_DEMAND.map((s) => (
          <li key={s.skill.en} className="grid gap-1.5 sm:grid-cols-[11rem_1fr] sm:items-center">
            <p className="text-sm font-medium">{l(s.skill)}</p>
            <div className="space-y-1">
              {[
                { key: 'v', value: s.vacancies, den: VACANCY_RECORDS, color: 'bg-blue' },
                { key: 'c', value: s.candidatesReady, den: REVIEWED_CANDIDATES, color: 'bg-cyan' },
              ].map((b) => (
                <div key={b.key} className="flex items-center gap-2">
                  <div className="h-2.5 flex-1 rounded-full bg-sky-50">
                    <div
                      className={`h-full rounded-full ${b.color}`}
                      style={{ width: `${(Math.min(b.value, b.den) / b.den) * 100}%` }}
                    />
                  </div>
                  <span className="w-14 text-end text-xs tabular-nums text-ink">
                    {t('kpi.ofShort', { num: n(b.value), den: n(b.den) })}
                  </span>
                </div>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </ChartCard>
  )
}
