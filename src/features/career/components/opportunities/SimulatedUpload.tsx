import { FileText, Upload, X } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'

/** Simulated upload (brief §22): shows a sample filename with Remove; nothing leaves the prototype. */
export function SimulatedUpload({
  id,
  label,
  sample,
  file,
  onChange,
  disabled,
}: {
  id: string
  label: string
  sample: string
  file: string | null
  onChange: (file: string | null) => void
  disabled?: boolean
}) {
  const { t } = useTranslation('career')
  return (
    <div className="space-y-2">
      <p id={id} className="text-sm font-semibold">
        {label}
      </p>
      {file ? (
        <div className="flex items-center gap-3 rounded-xl border-2 border-success/30 bg-success-soft p-2 ps-3">
          <FileText className="size-5 shrink-0 text-success" aria-hidden />
          <span className="min-w-0 flex-1 truncate text-sm font-medium">{file}</span>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            disabled={disabled}
            onClick={() => onChange(null)}
            aria-label={t('opps.apply.removeFile', { file })}
          >
            <X className="size-4" aria-hidden />
            {t('opps.apply.remove')}
          </Button>
        </div>
      ) : (
        <Button
          type="button"
          variant="outline"
          className="w-full rounded-xl border-dashed"
          disabled={disabled}
          aria-describedby={id}
          onClick={() => onChange(sample)}
        >
          <Upload className="size-4" aria-hidden />
          {t('opps.apply.upload')}
        </Button>
      )}
      <p className="text-xs text-ink-soft">{t('opps.apply.uploadNote')}</p>
    </div>
  )
}
