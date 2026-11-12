import type { Localized } from '@shared/types'
import { useTranslation } from 'react-i18next'
import { useLocalized } from '@/i18n'

/** Seed text in the active language, with the "Arabic content placeholder" label when needed. */
export function LText({ value, className }: { value: Localized | undefined; className?: string }) {
  const { t } = useTranslation()
  const { l, isPlaceholder } = useLocalized()
  return (
    <span className={className}>
      {l(value)}
      {isPlaceholder(value) && (
        <span className="ms-2 inline-block rounded-full bg-muted px-2 py-0.5 align-middle text-[0.7rem] font-medium text-ink-soft">
          {t('common:arabicPlaceholder')}
        </span>
      )}
    </span>
  )
}
