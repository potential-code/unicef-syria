import type { Application, Opportunity, Youth } from '@shared/types'
import { Link } from '@tanstack/react-router'
import { ArrowRight, FileEdit, Lock } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { StatusBadge } from '@/components/shared/StatusBadge'
import { Button } from '@/components/ui/button'
import { stageTone } from '../../config/opportunities'
import { ApplyForm } from './ApplyForm'

/** Right-hand panel on the opportunity detail: closed state, existing application or the form. */
export function ApplyPanel({
  youth,
  opp,
  app,
}: {
  youth: Youth
  opp: Opportunity
  app?: Application
}) {
  const { t } = useTranslation('career')
  const closed = opp.status === 'closed'
  const submitted = app && app.stage !== 'draft'

  return (
    <section
      aria-labelledby="apply-title"
      className="overflow-hidden rounded-2xl border bg-white shadow-md"
    >
      <div className="bg-grad-sunrise px-5 py-4">
        <h2 id="apply-title" className="flex items-center gap-2 text-lg text-ink">
          <FileEdit className="size-5" aria-hidden />
          {submitted ? t('opps.apply.existingTitle') : t('opps.apply.title')}
        </h2>
        {!submitted && !closed && (
          <p className="mt-1 text-sm text-ink/80">{t(`opps.apply.intro.${opp.type}`)}</p>
        )}
      </div>
      <div className="p-5">
        {submitted ? (
          <div className="space-y-4">
            <p className="flex flex-wrap items-center gap-2">
              {t('opps.apply.existingBody')}
              <StatusBadge tone={stageTone(app.stage)}>
                {t(`common:stages.${app.stage}`)}
              </StatusBadge>
            </p>
            <Button asChild className="w-full rounded-full">
              <Link to="/youth/applications/$appId" params={{ appId: app.id }}>
                {t('opps.apply.openApplication')}
                <ArrowRight className="size-4 rtl-mirror" aria-hidden />
              </Link>
            </Button>
          </div>
        ) : closed ? (
          <div className="space-y-3 text-center">
            <span className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-muted text-ink-soft">
              <Lock className="size-6" aria-hidden />
            </span>
            <p className="font-semibold">{t('opps.closedNote')}</p>
            <p className="text-sm text-ink-soft">{t('opps.apply.closedBody')}</p>
            <Button disabled className="w-full rounded-full">
              {t('opps.apply.submit')}
            </Button>
            <Button asChild variant="outline" className="w-full rounded-full">
              <Link to="/youth/opportunities">{t('opps.detail.back')}</Link>
            </Button>
          </div>
        ) : (
          <>
            {app && (
              <StatusBadge tone="neutral" className="mb-4">
                {t('opps.apply.draftExists')}
              </StatusBadge>
            )}
            <ApplyForm youth={youth} opp={opp} app={app} />
          </>
        )}
      </div>
    </section>
  )
}
