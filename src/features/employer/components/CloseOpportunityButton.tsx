import type { Opportunity } from '@shared/types'
import { Lock, LockOpen } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { useLocalized } from '@/i18n'
import { setOpportunityStatus } from '@/store/actions/applications'

/** Close keeps applications and outcomes and disables new applications (brief §16 required states). */
export function CloseOpportunityButton({ opp }: { opp: Opportunity }) {
  const { t } = useTranslation('employer')
  const { l } = useLocalized()
  if (opp.status === 'closed') {
    return (
      <Button
        variant="ghost"
        size="sm"
        className="text-blue"
        onClick={() => {
          setOpportunityStatus(opp.id, 'open')
          toast.success(t('opps.reopened'))
        }}
      >
        <LockOpen className="size-4" aria-hidden />
        {t('opps.reopen')}
      </Button>
    )
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="sm" className="text-ink">
          <Lock className="size-4" aria-hidden />
          {t('opps.close')}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t('opps.closeTitle', { title: l(opp.title) })}</AlertDialogTitle>
          <AlertDialogDescription>{t('opps.closeBody')}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{t('common:cancel')}</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              setOpportunityStatus(opp.id, 'closed')
              toast.success(t('opps.closed'))
            }}
          >
            {t('opps.close')}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
