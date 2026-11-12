import type { Application, ApplicationStage } from '@shared/types'
import { ArrowRight, Loader2 } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { nextStage } from '@/domain/application-stages'
import { moveApplication } from '@/store/actions/applications'
import { DETAIL_STAGES, FINAL_STAGES } from '../config'
import { MoveDialog } from './MoveDialog'
import { NotSelectedDialog } from './NotSelectedDialog'

/** Human-led stage actions per track, driven by domain nextStage (brief §15 Y15, §16 E02). */
export function StageActions({
  app,
  name,
  roleTitle,
}: {
  app: Application
  name: string
  roleTitle: string
}) {
  const { t } = useTranslation('employer')
  const [dialog, setDialog] = useState<ApplicationStage | null>(null)
  const [busy, setBusy] = useState(false)
  const next = nextStage(app.track, app.stage)
  if (FINAL_STAGES.includes(app.stage) || app.stage === 'draft') return null

  const go = (target: ApplicationStage) => {
    if (DETAIL_STAGES.includes(target)) return setDialog(target)
    setBusy(true)
    window.setTimeout(() => {
      moveApplication(app.id, target)
      setBusy(false)
      toast.success(t(`move.done.${target}`, { defaultValue: t('move.doneGeneric') }))
    }, 400)
  }

  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm text-ink-soft">{t(`hints.${app.stage}`, { defaultValue: '' })}</p>
      <div className="flex flex-wrap gap-2">
        {next && (
          <Button disabled={busy} onClick={() => go(next)} className="rounded-full">
            {busy ? (
              <Loader2 className="size-4 animate-spin" aria-hidden />
            ) : (
              <ArrowRight className="size-4 rtl-mirror" aria-hidden />
            )}
            {t(`actions.${next}`)}
          </Button>
        )}
        <NotSelectedDialog app={app} name={name} />
      </div>
      {dialog && (
        <MoveDialog
          key={dialog}
          app={app}
          target={dialog}
          roleTitle={roleTitle}
          open
          onOpenChange={(o) => !o && setDialog(null)}
        />
      )}
    </div>
  )
}
