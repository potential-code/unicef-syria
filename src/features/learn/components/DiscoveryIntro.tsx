import { Clock, Info, ListChecks, Play, RotateCcw, ShieldCheck, WandSparkles } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Motif } from '@/components/brand'
import { Button } from '@/components/ui/button'

interface Props {
  resumeAt: number | null
  completedOn: string | null
  onStart: () => void
  onResume: () => void
  onPreset: () => void
  onResults: () => void
}

/** Y03 introduction: time, number of questions and what the exercise is (and is not). */
export function DiscoveryIntro({
  resumeAt,
  completedOn,
  onStart,
  onResume,
  onPreset,
  onResults,
}: Props) {
  const { t } = useTranslation('learn')
  const facts = [
    { icon: Clock, title: t('discovery.factTime'), body: t('discovery.factTimeBody') },
    {
      icon: ListChecks,
      title: t('discovery.factQuestions'),
      body: t('discovery.factQuestionsBody'),
    },
    { icon: ShieldCheck, title: t('discovery.factNoPass'), body: t('discovery.factNoPassBody') },
  ]
  return (
    <div className="space-y-6">
      <section className="on-dark relative overflow-hidden rounded-3xl bg-grad-unicef text-white shadow-lg">
        <Motif variant="banner" className="text-white/[0.12]" />
        <div className="relative p-6 sm:p-10">
          <div className="max-w-2xl">
            <p className="text-xs font-bold tracking-wider text-white/85 uppercase">
              {t('discovery.title')}
            </p>
            <h2 className="mt-2 text-3xl text-white sm:text-4xl">{t('discovery.introTitle')}</h2>
            <p className="mt-3 text-lg text-white/90">{t('discovery.introBody')}</p>
            {completedOn && (
              <p className="mt-4 border-s-4 border-yellow ps-3 text-sm text-white/90">
                {t('discovery.completedOn', { date: completedOn })}
              </p>
            )}
            <div className="mt-6 flex flex-wrap gap-3">
              {resumeAt !== null ? (
                <>
                  <Button
                    size="lg"
                    className="rounded-full bg-yellow text-ink shadow-md hover:bg-white"
                    onClick={onResume}
                  >
                    <Play className="size-4" aria-hidden />
                    {t('discovery.resume', { n: resumeAt + 1 })}
                  </Button>
                  <Button
                    size="lg"
                    variant="ghost"
                    className="rounded-full text-white hover:bg-white/15 hover:text-white"
                    onClick={onStart}
                  >
                    <RotateCcw className="size-4" aria-hidden />
                    {t('discovery.startOver')}
                  </Button>
                </>
              ) : (
                <Button
                  size="lg"
                  className="rounded-full bg-yellow text-ink shadow-md hover:bg-white"
                  onClick={onStart}
                >
                  <Play className="size-4" aria-hidden />
                  {completedOn ? t('discovery.retake') : t('discovery.start')}
                </Button>
              )}
              {completedOn && (
                <Button
                  size="lg"
                  className="rounded-full bg-white text-navy shadow-md hover:bg-sky-100"
                  onClick={onResults}
                >
                  {t('discovery.viewResults')}
                </Button>
              )}
            </div>
          </div>
        </div>
        <ul className="relative grid border-t border-white/20 bg-navy/25 sm:grid-cols-3 sm:divide-x sm:divide-white/20 rtl:sm:divide-x-reverse">
          {facts.map((f, i) => (
            <li
              key={f.title}
              className={`flex items-start gap-3 px-6 py-4 sm:px-8 sm:py-5 ${i > 0 ? 'border-t border-white/20 sm:border-t-0' : ''}`}
            >
              <f.icon className="mt-0.5 size-5 shrink-0 text-yellow" aria-hidden />
              <div className="min-w-0">
                <p className="font-bold text-white">{f.title}</p>
                <p className="mt-0.5 text-sm text-white/80">{f.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <p className="flex items-start gap-2.5 rounded-2xl bg-sky-100 px-4 py-3 text-sm text-navy">
        <Info className="mt-0.5 size-4 shrink-0 text-blue" aria-hidden />
        {t('discovery.illustrative')}
      </p>

      <div className="card flex flex-wrap items-center gap-x-3 gap-y-2 p-4">
        <span className="text-xs font-bold tracking-wide text-ink-soft uppercase">
          {t('presenter')}
        </span>
        <Button size="sm" variant="secondary" className="rounded-full" onClick={onPreset}>
          <WandSparkles className="size-4" aria-hidden />
          {t('discovery.preset')}
        </Button>
        <span className="text-sm text-ink-soft">{t('discovery.presetHint')}</span>
      </div>
    </div>
  )
}
