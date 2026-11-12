import type { Application } from '@shared/types'
import { Undo2 } from 'lucide-react'
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
import { withdrawApplication } from '@/store/actions/applications'
import { FINAL_STAGES } from '../../config/opportunities'

/** Learner withdraws an application that has not reached a final stage. */
export function WithdrawButton({ app }: { app: Application }) {
  const { t } = useTranslation('career')
  if (FINAL_STAGES.includes(app.stage)) return null
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" className="rounded-full text-danger hover:bg-danger-soft">
          <Undo2 className="size-4" aria-hidden />
          {t('apps.withdraw.button')}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t('apps.withdraw.title')}</AlertDialogTitle>
          <AlertDialogDescription>{t('apps.withdraw.body')}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{t('common:cancel')}</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              withdrawApplication(app.id)
              toast.success(t('apps.withdraw.done'))
            }}
          >
            {t('apps.withdraw.confirm')}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
