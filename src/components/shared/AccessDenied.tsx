import { ShieldAlert } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { EmptyState } from './EmptyState'

/** Role boundary demonstration (brief §18): another centre's record is not shown. */
export function AccessDenied() {
  const { t } = useTranslation()
  return <EmptyState icon={ShieldAlert} title={t('denied.title')} body={t('denied.body')} />
}
