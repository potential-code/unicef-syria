import type { Application, Opportunity, Youth } from '@shared/types'
import { Link } from '@tanstack/react-router'
import { ArrowRight, FileEdit, Lock } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Motif } from '@/components/brand'
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
    <section aria-labelledby="apply-title" className="card overflow-hidden">
      <div className="on-dark relative overflow-hidden bg-grad-unicef px-5 py-4 text-white">
        <Motif variant="corner" className="text-white/15" />
        <h2 id="apply-title" className="relative flex items-center gap-2 text-lg text-white">
          <FileEdit className="size-5 shrink-0 text-yellow" aria-hidden />
          {submitted ? t('opps.apply.existingTitle') : t('opps.apply.title')}
        </h2>
        {!submitted && !closed && (
          <p className="relative mt-1 text-sm text-white/85">{t(`opps.apply.intro.${opp.type}`)}</p>
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
            <Lock className="mx-auto size-7 text-ink-soft" aria-hidden />
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
