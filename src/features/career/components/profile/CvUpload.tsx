import { FileUp, Paperclip, X } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { SAMPLE_CV } from '../../config/profile'

/** Simulated CV upload: attaches a sample filename; never asks for a real document. */
export function CvUpload({
  file,
  onChange,
}: {
  file?: string
  onChange: (f: string | undefined) => void
}) {
  const { t } = useTranslation('career')
  return (
    <div className="space-y-2 sm:col-span-2">
      <p className="font-semibold text-ink">{t('profile.fields.cvFile')}</p>
      {file ? (
        <div className="flex flex-wrap items-center gap-3 rounded-2xl bg-sky-50 px-4 py-2">
          <Paperclip className="size-4 text-blue" aria-hidden />
          <span className="flex-1 text-sm font-semibold">{file}</span>
          <Button
            type="button"
            variant="ghost"
            className="rounded-full"
            onClick={() => {
              onChange(undefined)
              toast.success(t('profile.cvRemoved'))
            }}
          >
            <X className="size-4" aria-hidden />
            {t('profile.removeFile')}
          </Button>
        </div>
      ) : (
        <Button
          type="button"
          variant="outline"
          className="rounded-full"
          onClick={() => {
            onChange(SAMPLE_CV)
            toast.success(t('profile.cvAdded', { file: SAMPLE_CV }))
          }}
        >
          <FileUp className="size-4" aria-hidden />
          {t('profile.attachSample')}
        </Button>
      )}
      <p className="text-xs text-ink-soft">{t('profile.hints.upload')}</p>
    </div>
  )
}
