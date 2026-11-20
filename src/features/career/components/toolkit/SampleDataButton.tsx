import { Sparkles } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'

/** Presenter helper: fills the form with realistic sample content that stays editable. */
export function SampleDataButton({ onFill, label }: { onFill: () => void; label?: string }) {
  const { t } = useTranslation('career')
  return (
    <Button
      variant="outline"
      className="rounded-full border-dashed"
      onClick={() => {
        onFill()
        toast.success(t('toolkit.sample.filled'))
      }}
    >
      <Sparkles className="size-4 text-orange" aria-hidden />
      {label ?? t('toolkit.sample.fill')}
    </Button>
  )
}
