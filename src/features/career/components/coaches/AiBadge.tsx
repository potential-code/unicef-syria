import { Bot } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/utils'

/** "AI coach (scripted demo)" label on every coach surface. */
export function AiBadge({ className }: { className?: string }) {
  const { t } = useTranslation('career')
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full border border-navy/15 bg-white px-2.5 py-0.5 text-xs font-semibold text-navy',
        className,
      )}
    >
      <Bot className="size-3.5" aria-hidden />
      {t('coaches.aiLabel')}
    </span>
  )
}
