import { useTranslation } from 'react-i18next'
import { CENTRES, COHORTS, PARTNERS, PROGRAMMES, TRAINERS } from '@/data/orgs'
import { formatDate, formatNumber, useLocalized } from '@/i18n'
import type { AdminFilterKey } from './filters'

/** Display names for filter values, organisations and numbers in the active language. */
export function useLabels() {
  const { t } = useTranslation('admin')
  const { l, lang } = useLocalized()
  const centre = (id?: string) => l(CENTRES.find((c) => c.id === id)?.name)
  const partner = (id?: string) => l(PARTNERS.find((p) => p.id === id)?.name)
  const programme = (id?: string) => l(PROGRAMMES.find((p) => p.id === id)?.name)
  const cohort = (id?: string) => l(COHORTS.find((c) => c.id === id)?.name)
  const trainer = (id?: string) => l(TRAINERS.find((x) => x.id === id)?.name)
  const value = (key: AdminFilterKey, v: string): string => {
    switch (key) {
      case 'governorate':
        return t(`gov.${v}`)
      case 'partnerId':
        return `${v} ${partner(v)}`
      case 'centreId':
        return `${v} ${centre(v)}`
      case 'programmeId':
        return `${v} ${programme(v)}`
      case 'cohortId':
        return cohort(v)
      case 'route':
        return t(`common:routesShort.${v}`)
      case 'gender':
        return t(`gender.${v}`)
      case 'ageGroup':
        return t('ageGroup', { range: v })
      case 'disability':
        return t(`disability.${v}`)
      case 'period':
        return t(`period.${v}`)
    }
  }
  const n = (x: number) => formatNumber(x, lang)
  const p = (x: number | null) => (x === null ? t('kpi.noData') : `${formatNumber(x, lang)}%`)
  const d = (iso?: string) => (iso ? formatDate(iso, lang) : t('none'))
  const stage = (s: string) =>
    s === 'completed' ? t('common:status.completed') : t(`common:stages.${s}`)
  return { stage, centre, partner, programme, cohort, trainer, value, n, p, d, l, lang, t }
}
