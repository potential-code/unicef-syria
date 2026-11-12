import {
  Clock,
  Compass,
  ListChecks,
  Play,
  RotateCcw,
  ShieldCheck,
  WandSparkles,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { Blobs } from './Blobs'

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
    {
      icon: Clock,
      title: t('discovery.factTime'),
      body: t('discovery.factTimeBody'),
      tone: 'bg-cyan text-ink',
    },
    {
      icon: ListChecks,
      title: t('discovery.factQuestions'),
      body: t('discovery.factQuestionsBody'),
      tone: 'bg-yellow text-ink',
    },
    {
      icon: ShieldCheck,
      title: t('discovery.factNoPass'),
      body: t('discovery.factNoPassBody'),
      tone: 'bg-orange text-white',
    },
  ]
  return (
    <div className="space-y-6">
      <section className="on-dark relative overflow-hidden rounded-3xl bg-grad-unicef p-6 text-white shadow-lg sm:p-10">
        <Blobs />
        <div className="relative max-w-2xl">
          <span className="flex size-14 items-center justify-center rounded-2xl bg-white/15">
            <Compass className="size-8" aria-hidden />
          </span>
          <h2 className="mt-4 text-3xl text-white sm:text-4xl">{t('discovery.introTitle')}</h2>
          <p className="mt-3 text-lg text-white/90">{t('discovery.introBody')}</p>
          {completedOn && (
            <p className="mt-4 rounded-2xl bg-white/15 p-3 text-sm">
              {t('discovery.completedOn', { date: completedOn })}
            </p>
          )}
          <div className="mt-6 flex flex-wrap gap-3">
            {resumeAt !== null ? (
              <>
                <Button
                  size="lg"
                  className="rounded-full bg-yellow text-ink hover:bg-white"
                  onClick={onResume}
                >
                  <Play className="size-5" aria-hidden />
                  {t('discovery.resume', { n: resumeAt + 1 })}
                </Button>
                <Button
                  size="lg"
                  variant="ghost"
                  className="rounded-full text-white hover:bg-white/15 hover:text-white"
                  onClick={onStart}
                >
                  <RotateCcw className="size-5" aria-hidden />
                  {t('discovery.startOver')}
                </Button>
              </>
            ) : (
              <Button
                size="lg"
                className="rounded-full bg-yellow text-ink hover:bg-white"
                onClick={onStart}
              >
                <Play className="size-5" aria-hidden />
                {completedOn ? t('discovery.retake') : t('discovery.start')}
              </Button>
            )}
            {completedOn && (
              <Button
                size="lg"
                variant="ghost"
                className="rounded-full bg-white/15 text-white hover:bg-white/25 hover:text-white"
                onClick={onResults}
              >
                {t('discovery.viewResults')}
              </Button>
            )}
          </div>
        </div>
      </section>

      <ul className="grid gap-4 sm:grid-cols-3">
        {facts.map((f) => (
          <li key={f.title} className="rounded-3xl border bg-white p-5 shadow-sm">
            <span className={`flex size-11 items-center justify-center rounded-2xl ${f.tone}`}>
              <f.icon className="size-6" aria-hidden />
            </span>
            <p className="mt-3 text-lg font-bold">{f.title}</p>
            <p className="mt-1 text-sm text-ink-soft">{f.body}</p>
          </li>
        ))}
      </ul>

      <p className="rounded-2xl bg-sky-100 p-4 text-sm text-navy">{t('discovery.illustrative')}</p>

      <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-dashed border-cyan/50 bg-white p-4">
        <span className="text-xs font-bold uppercase tracking-wide text-ink-soft">
          {t('presenter')}
        </span>
        <Button variant="secondary" className="rounded-full" onClick={onPreset}>
          <WandSparkles className="size-4" aria-hidden />
          {t('discovery.preset')}
        </Button>
        <span className="text-sm text-ink-soft">{t('discovery.presetHint')}</span>
      </div>
    </div>
  )
}
