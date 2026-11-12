import type { Youth } from '@shared/types'
import { Link } from '@tanstack/react-router'
import { CheckCircle2, Paperclip } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useLocalized } from '@/i18n'
import { saveDraft, useApplications, useOpportunities } from '@/store/actions/applications'

/** Attach the reviewed proposal to one of the learner's freelance application drafts. */
export function AttachProposal({ youth }: { youth: Youth }) {
  const { t } = useTranslation('career')
  const { l } = useLocalized()
  const opps = useOpportunities()
  const apps = useApplications().filter(
    (a) => a.youthId === youth.id && a.track === 'freelance' && a.stage !== 'withdrawn',
  )
  const drafts = apps.filter((a) => a.stage === 'draft')
  const [appId, setAppId] = useState(drafts[0]?.id ?? '')
  const title = (oppId: string) => l(opps.find((o) => o.id === oppId)?.title)
  const attach = () => {
    const app = drafts.find((a) => a.id === appId)
    if (!app) return
    saveDraft(youth.id, app.opportunityId, { documents: { ...app.documents, proposal: true } })
    toast.success(t('toolkit.proposal.attached', { title: title(app.opportunityId) }))
  }
  return (
    <div className="space-y-3 rounded-2xl bg-navy p-5 text-white on-dark">
      <div className="flex items-center gap-2">
        <Paperclip className="size-5 text-yellow" aria-hidden />
        <h3 className="text-base text-white">{t('toolkit.proposal.attachTitle')}</h3>
      </div>
      {apps.length === 0 ? (
        <p className="text-sm text-white/85">
          {t('toolkit.proposal.noApps')}{' '}
          <Link to="/youth/opportunities" className="font-semibold text-yellow hover:underline">
            {t('toolkit.proposal.browse')}
          </Link>
        </p>
      ) : (
        <>
          <ul className="space-y-1.5 text-sm">
            {apps.map((a) => (
              <li key={a.id} className="flex flex-wrap items-center gap-2">
                <span className="font-semibold">{title(a.opportunityId)}</span>
                <span className="text-white/75">{t(`common:stages.${a.stage}`)}</span>
                {a.documents.proposal && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-white/15 px-2 py-0.5 text-xs">
                    <CheckCircle2 className="size-3.5" aria-hidden />
                    {t('toolkit.proposal.isAttached')}
                  </span>
                )}
              </li>
            ))}
          </ul>
          {drafts.length > 0 ? (
            <div className="flex flex-wrap items-end gap-2">
              <div className="min-w-48 flex-1 space-y-1.5">
                <Label htmlFor="attach-app" className="text-white">
                  {t('toolkit.proposal.chooseApp')}
                </Label>
                <Select value={appId} onValueChange={setAppId}>
                  <SelectTrigger id="attach-app" className="min-h-11 w-full bg-white text-ink">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {drafts.map((a) => (
                      <SelectItem key={a.id} value={a.id}>
                        {title(a.opportunityId)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button
                className="rounded-full bg-yellow text-ink hover:bg-white"
                onClick={attach}
                disabled={!appId}
              >
                <Paperclip className="size-4" aria-hidden />
                {t('toolkit.proposal.attach')}
              </Button>
            </div>
          ) : (
            <p className="text-sm text-white/85">{t('toolkit.proposal.noDrafts')}</p>
          )}
          <p className="text-xs text-white/75">{t('toolkit.proposal.reviewFirst')}</p>
        </>
      )}
    </div>
  )
}
