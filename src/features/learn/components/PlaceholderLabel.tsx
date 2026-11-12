import type { Localized } from '@shared/types'
import { Languages } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useLocalized } from '@/i18n'

/** Small "Arabic content placeholder" label when seed text is English-only in Arabic mode. */
export function PlaceholderLabel({ value }: { value: Localized | undefined }) {
  const { t } = useTranslation()
  const { isPlaceholder } = useLocalized()
  if (!isPlaceholder(value)) return null
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-notice-soft px-2 py-0.5 text-xs font-semibold text-notice">
      <Languages className="size-3.5" aria-hidden />
      {t('common:arabicPlaceholder')}
    </span>
  )
}
