import { Languages } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { setLang, usePrefs } from '@/store/actions/session'

/** Language toggle that keeps the current screen (brief §1). */
export function LangToggle({ className, onDark }: { className?: string; onDark?: boolean }) {
  const { t } = useTranslation()
  const { lang } = usePrefs()
  const next = lang === 'ar' ? 'en' : 'ar'
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setLang(next)}
      lang={next}
      className={cn('gap-1.5', onDark && 'text-white hover:bg-white/15 hover:text-white', className)}
      aria-label={`${t('language')}: ${next === 'ar' ? t('switchToArabic') : t('switchToEnglish')}`}
    >
      <Languages className="size-4" aria-hidden />
      {next === 'ar' ? t('switchToArabic') : t('switchToEnglish')}
    </Button>
  )
}
