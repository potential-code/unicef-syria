import { Link } from '@tanstack/react-router'
import { ArrowRight, CheckCircle2, CircleDashed, Info, Sparkles } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { courseHref } from '../../lib/links'
import { itemKey, type MatchExplanation } from '../../lib/match'
import { useMatchText } from './useMatchText'

/** Full recommendation explanation: matching evidence, gaps and how to close them. */
export function MatchPanel({ match }: { match: MatchExplanation }) {
  const { t } = useTranslation('career')
  const { matchText, gapText } = useMatchText()
  return (
    <section aria-labelledby="match-title" className="card overflow-hidden">
      <div className="flex items-center gap-2 border-b border-sky-200 bg-grad-sky px-5 py-4">
        <Sparkles className="size-5 shrink-0 text-blue" aria-hidden />
        <h2 id="match-title" className="text-lg">
          {t('opps.match.title')}
        </h2>
      </div>
      <div className="grid gap-5 p-5 md:grid-cols-2">
        <div>
          <h3 className="mb-2 text-sm font-bold uppercase tracking-wide text-success">
            {t('opps.match.matchesTitle')}
          </h3>
          <ul className="space-y-2">
            {match.matches.length === 0 && (
              <li className="text-sm text-ink-soft">{t('opps.match.none')}</li>
            )}
            {match.matches.map((m) => (
              <li key={itemKey(m)} className="flex items-start gap-2 text-sm">
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-success" aria-hidden />
                {matchText(m)}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="mb-2 text-sm font-bold uppercase tracking-wide text-notice">
            {t('opps.match.gapsTitle')}
          </h3>
          <ul className="space-y-2">
            {match.gaps.length === 0 && (
              <li className="text-sm text-ink-soft">{t('opps.match.noGaps')}</li>
            )}
            {match.gaps.map((g) => (
              <li key={itemKey(g)} className="flex flex-col gap-1 text-sm">
                <span className="flex items-start gap-2">
                  <CircleDashed className="mt-0.5 size-4 shrink-0 text-notice" aria-hidden />
                  {gapText(g)}
                </span>
                {g.kind === 'course' ? (
                  <a
                    href={courseHref(g.courseId)}
                    className="ms-6 inline-flex min-h-8 items-center gap-1 font-semibold text-blue hover:underline"
                  >
                    {t('opps.match.openCourse')}
                    <ArrowRight className="size-4 rtl-mirror" aria-hidden />
                  </a>
                ) : (
                  <Link
                    to="/youth/toolkit"
                    className="ms-6 inline-flex min-h-8 items-center gap-1 font-semibold text-blue hover:underline"
                  >
                    {t('opps.match.openToolkit')}
                    <ArrowRight className="size-4 rtl-mirror" aria-hidden />
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <p className="flex items-start gap-2 border-t bg-sky-50 px-5 py-3 text-xs text-ink-soft">
        <Info className="mt-0.5 size-3.5 shrink-0" aria-hidden />
        {t('opps.match.disclaimer')}
      </p>
    </section>
  )
}
