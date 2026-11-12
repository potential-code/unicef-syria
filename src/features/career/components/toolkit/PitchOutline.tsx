import { Copy, Presentation } from 'lucide-react'
import { motion } from 'motion/react'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Field } from './Field'

/** Editable two-minute pitch outline generated from the saved concept fields. */
export function PitchOutline({
  value,
  onChange,
}: {
  value: string
  onChange: (v: string) => void
}) {
  const { t } = useTranslation('career')
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value)
      toast.success(t('toolkit.business.copied'))
    } catch {
      toast.error(t('toolkit.business.copyFailed'))
    }
  }
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-3 rounded-2xl bg-grad-sunrise p-5"
    >
      <div className="flex items-center gap-2">
        <Presentation className="size-5" aria-hidden />
        <h3 className="text-lg">{t('toolkit.business.outlineTitle')}</h3>
      </div>
      <div className="rounded-xl bg-white p-3">
        <Field
          id="pitch-outline"
          label={t('toolkit.business.outlineLabel')}
          value={value}
          onChange={onChange}
          multiline
          rows={10}
          hint={t('toolkit.business.outlineHint')}
        />
      </div>
      <p className="text-sm text-ink">{t('toolkit.business.noFunding')}</p>
      <Button variant="secondary" className="rounded-full bg-white" onClick={copy}>
        <Copy className="size-4" aria-hidden />
        {t('toolkit.business.copy')}
      </Button>
    </motion.div>
  )
}
