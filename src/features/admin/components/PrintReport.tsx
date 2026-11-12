import { FlaskConical } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Logo } from '@/components/shared/Logo'
import { now } from '@/lib/clock'
import { useAdminFilters } from '../lib/useAdminFilters'
import { useCurrentActivity } from '../lib/useCurrent'
import { useHistorical } from '../lib/useHistorical'
import { useLabels } from '../lib/useLabels'
import { ReportContext } from './ReportContext'

/** Printable report preview with the filter context and the "Sample data" label (brief §19). */
export function PrintReport({ title, scope }: { title: string; scope: string }) {
  const { t } = useTranslation('admin')
  const { n, p, d } = useLabels()
  const { filters } = useAdminFilters()
  const c = useCurrentActivity(filters)
  const h = useHistorical(filters)
  const k = h.k
  const hist: [string, string, string][] = [
    [t('kpi.registered'), n(k.registered), t('kpi.registeredHint')],
    [
      t('kpi.active'),
      n(k.active),
      t('kpi.ratio', { num: n(k.active), den: n(k.registered), what: t('kpi.activeDen') }),
    ],
    [
      t('kpi.completion'),
      p(k.completionRate.value),
      t('kpi.ratio', {
        num: n(k.completionRate.numerator),
        den: n(k.completionRate.denominator),
        what: t('kpi.completionDen'),
      }),
    ],
    [
      t('kpi.guidance'),
      p(k.guidanceCoverage.value),
      t('kpi.ratio', {
        num: n(k.guidanceCoverage.numerator),
        den: n(k.guidanceCoverage.denominator),
        what: t('kpi.guidanceDen'),
      }),
    ],
    [t('kpi.jobs'), n(k.jobStarts), t('kpi.jobsHint')],
    [t('kpi.internships'), n(k.internships), t('kpi.internshipsHint')],
    [
      t('kpi.uniquePlaced'),
      n(k.uniquePlaced),
      t('kpi.uniquePlacedHint', {
        jobs: n(k.jobStarts),
        interns: n(k.internships),
        both: n(h.totals.bothPlacements ?? 0),
      }),
    ],
    ...k.employment.map((w): [string, string, string] => [
      t('windows.month', { count: w.months }),
      p(w.rate.value),
      t('print.window', {
        emp: n(w.rate.numerator),
        eligible: n(w.rate.denominator),
        coverage: p(w.coverage.value),
        unknown: n(w.unknown),
      }),
    ]),
    [
      t('kpi.daysToJob'),
      k.avgDaysToJob === null ? t('kpi.noData') : t('print.days', { count: k.avgDaysToJob }),
      t('kpi.daysToJobHint', { count: k.jobStarts }),
    ],
    [
      t('kpi.retention'),
      p(k.retention.rate.value),
      t('print.retention', {
        num: n(k.retention.rate.numerator),
        den: n(k.retention.rate.denominator),
        unknown: n(k.retention.unknown),
      }),
    ],
    [
      t('kpi.freelance'),
      n(k.freelance.completed),
      t('print.freelance', {
        earners: n(k.freelance.earners),
        repeat: n(k.freelance.repeatClients),
      }),
    ],
    [
      t('kpi.enterprise'),
      n(k.enterprise.concepts),
      t('print.enterprise', {
        tests: n(k.enterprise.tests),
        acc: n(k.enterprise.acceptances),
        sales: n(k.enterprise.firstSales),
      }),
    ],
  ]
  const cur: [string, string][] = [
    [t('current.places'), n(c.cohortPlaces)],
    [t('current.learners'), n(c.youth.length)],
    [t('current.active'), n(c.active.length)],
    [
      t('current.attendance'),
      t('kpi.ofShort', { num: n(c.attendance.present), den: n(c.attendance.marked) }),
    ],
    [t('current.practicals'), n(c.pendingPracticals.length)],
    [t('current.applications'), n(c.applications.length)],
  ]
  return (
    <article className="relative mx-auto max-w-3xl overflow-hidden rounded-xl border bg-white p-6 shadow-lg sm:p-10 print:max-w-none print:border-0 print:shadow-none">
      <p
        className="pointer-events-none absolute end-6 top-24 rotate-12 select-none text-5xl font-black uppercase text-sky-100 sm:text-7xl"
        aria-hidden
      >
        {t('context.sample')}
      </p>
      <header className="relative flex flex-wrap items-start justify-between gap-4 border-b pb-5">
        <div>
          <Logo className="h-6" />
          <h2 className="mt-4 text-2xl">{title}</h2>
          <p className="text-sm text-ink-soft">{scope}</p>
        </div>
        <div className="space-y-1 text-end text-xs text-ink-soft">
          <p className="inline-flex items-center gap-1 rounded-full bg-navy px-3 py-1 font-semibold text-white">
            <FlaskConical className="size-3.5" aria-hidden />
            {t('context.sample')}
          </p>
          <p>{t('print.generated', { date: d(now()) })}</p>
        </div>
      </header>
      <div className="relative my-5">
        <ReportContext readOnly />
      </div>
      <h3 className="relative mb-2 text-base font-semibold">{t('layer.current')}</h3>
      <table className="relative mb-6 w-full text-sm">
        <tbody>
          {cur.map(([a, b]) => (
            <tr key={a} className="border-b">
              <th scope="row" className="py-1.5 text-start font-normal">
                {a}
              </th>
              <td className="py-1.5 text-end font-semibold tabular-nums">{b}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3 className="relative mb-2 text-base font-semibold">
        {t('layer.historical', { date: d('2026-11-01') })}
      </h3>
      {h.availability !== 'ok' || h.empty ? (
        <p className="text-sm text-ink-soft">
          {t(`empty.${h.availability === 'ok' ? 'noRows' : h.availability}Body`)}
        </p>
      ) : (
        <table className="relative w-full text-sm">
          <thead>
            <tr className="border-b text-xs text-ink-soft">
              <th className="py-1.5 text-start font-medium">{t('print.measure')}</th>
              <th className="py-1.5 text-end font-medium">{t('print.value')}</th>
              <th className="py-1.5 ps-4 text-start font-medium">{t('print.basis')}</th>
            </tr>
          </thead>
          <tbody>
            {hist.map(([a, b, c2]) => (
              <tr key={a} className="border-b align-top">
                <th scope="row" className="py-1.5 text-start font-normal">
                  {a}
                </th>
                <td className="py-1.5 text-end font-semibold tabular-nums">{b}</td>
                <td className="py-1.5 ps-4 text-xs text-ink-soft">{c2}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <footer className="relative mt-6 border-t pt-4 text-xs text-ink-soft">
        {t('print.footer')}
      </footer>
    </article>
  )
}
