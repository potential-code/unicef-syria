import { FlaskConical } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/utils'

/** "Demonstration platform — sample data", shown unobtrusively on every demo view (brief §1). */
export function DemoTag({ className, onDark }: { className?: string; onDark?: boolean }) {
  const { t } = useTranslation()
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium',
        onDark ? 'bg-white/15 text-white' : 'bg-sky-100 text-navy',
        className,
      )}
    >
      <FlaskConical className="size-3.5" aria-hidden />
      {t('demoLabel')}
    </span>
  )
}
