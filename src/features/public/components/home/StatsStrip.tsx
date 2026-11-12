import { useTranslation } from 'react-i18next'
import { CountUp, Reveal } from '@/components/motion'
import { SAMPLE_STATS } from '../../config'

/** Catalogue figures only, labelled as sample data. No impact or outcome numbers. */
export function StatsStrip() {
  const { t } = useTranslation('public')
  return (
    <section
      aria-labelledby="stats-title"
      className="on-dark relative overflow-hidden bg-navy py-16 text-white"
    >
      <span
        className="pointer-events-none absolute -start-20 -top-20 size-72 rounded-full bg-cyan/30 blur-3xl"
        aria-hidden
      />
      <div className="container-page relative">
        <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-3">
          <h2 id="stats-title" className="text-3xl text-white sm:text-4xl">
            {t('home.stats.title')}
          </h2>
          <p className="rounded-full bg-white/15 px-3 py-1 text-sm font-semibold">
            {t('home.stats.label')}
          </p>
        </Reveal>
        <dl className="grid grid-cols-2 gap-6 lg:grid-cols-4">
          {SAMPLE_STATS.map((s) => (
            <div
              key={s.id}
              className="flex flex-col rounded-2xl border border-white/15 bg-white/5 p-5"
            >
              <s.icon className="mb-3 size-7 text-yellow" aria-hidden />
              <dt className="order-last mt-1 text-white/80">{t(`home.stats.${s.id}`)}</dt>
              <dd className="text-5xl font-extrabold sm:text-6xl">
                <CountUp value={s.value} />
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
