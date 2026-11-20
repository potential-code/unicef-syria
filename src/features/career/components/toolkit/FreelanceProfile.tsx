import type { Toolkit, Youth } from '@shared/types'
import { Eye, Palette, Save } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { useLocalized } from '@/i18n'
import { saveToolkit } from '@/store/actions/toolkit'
import { SAMPLE_FREELANCE } from '../../config/samples'
import { ClientPreview } from './ClientPreview'
import { Field } from './Field'
import { SampleDataButton } from './SampleDataButton'
import { ToolPanel } from './ToolPanel'

type Profile = NonNullable<Toolkit['freelanceProfile']>
const EMPTY: Profile = { services: '', samples: '', availability: '', assignments: '', pricing: '' }
const FIELDS: (keyof Profile)[] = ['services', 'samples', 'availability', 'assignments', 'pricing']

/** Freelance service profile with a "what a client sees" preview. */
export function FreelanceProfile({ youth }: { youth: Youth }) {
  const { t } = useTranslation('career')
  const { l } = useLocalized()
  const [p, setP] = useState<Profile>({ ...EMPTY, ...youth.toolkit.freelanceProfile })
  const [preview, setPreview] = useState(false)
  const [error, setError] = useState('')
  const save = () => {
    if (!p.services.trim()) return setError(t('toolkit.freelance.required'))
    setError('')
    saveToolkit(youth.id, 'freelanceProfile', p)
    toast.success(t('toolkit.freelance.saved'))
  }
  return (
    <ToolPanel
      icon={Palette}
      accent="navy"
      title={t('toolkit.tabs.freelance')}
      intro={t('toolkit.freelance.intro')}
      actions={
        <>
          <SampleDataButton
            onFill={() => {
              setP(
                Object.fromEntries(
                  Object.entries(SAMPLE_FREELANCE).map(([k, v]) => [k, l(v)]),
                ) as Profile,
              )
              setError('')
            }}
          />
          <Button
            variant="outline"
            className="rounded-full"
            onClick={() => setPreview((v) => !v)}
            aria-pressed={preview}
          >
            <Eye className="size-4" aria-hidden />
            {preview ? t('toolkit.freelance.hidePreview') : t('toolkit.freelance.preview')}
          </Button>
          <Button className="rounded-full" onClick={save}>
            <Save className="size-4" aria-hidden />
            {t('toolkit.freelance.save')}
          </Button>
        </>
      }
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="grid gap-4">
          {FIELDS.map((k) => (
            <Field
              key={k}
              id={`fl-${k}`}
              label={t(`toolkit.freelance.fields.${k}`)}
              hint={t(`toolkit.freelance.hints.${k}`)}
              value={p[k]}
              onChange={(v) => setP((x) => ({ ...x, [k]: v }))}
              multiline={k !== 'pricing'}
              rows={2}
              required={k === 'services'}
              optionalLabel={k === 'pricing' ? t('toolkit.optional') : undefined}
              error={k === 'services' ? error : undefined}
            />
          ))}
        </div>
        {preview ? (
          <ClientPreview youth={youth} profile={p} />
        ) : (
          <button
            type="button"
            onClick={() => setPreview(true)}
            className="flex min-h-48 flex-col items-center justify-center gap-2 rounded-3xl border-2 border-dashed border-cyan/40 bg-sky-50 p-6 text-center text-ink-soft hover:bg-sky-100"
          >
            <Eye className="size-8 text-blue" aria-hidden />
            <span className="font-semibold text-ink">{t('toolkit.freelance.preview')}</span>
            <span className="text-sm">{t('toolkit.freelance.previewHint')}</span>
          </button>
        )}
      </div>
    </ToolPanel>
  )
}
