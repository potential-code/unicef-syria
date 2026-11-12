import { FileText, Paperclip, Trash2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { ChipGroup, SelectField } from './Field'
import { optionsFor, type StepProps } from './types'

/** Interests, skills, sectors, availability and a CV upload simulation (no real file is read). */
export function InterestsStep({ form, set, errors }: StepProps) {
  const { t } = useTranslation('public')
  const sampleName = `${(form.name.trim() || 'Sample').replace(/\s+/g, '_')}_CV_sample.pdf`
  return (
    <div className="space-y-6">
      <ChipGroup
        id="interests"
        label={t('register.interests.interests')}
        options={optionsFor(t, 'interests')}
        value={form.interests}
        onChange={(v) => set({ interests: v })}
        error={errors.interests}
      />
      <ChipGroup
        id="skills"
        optional
        label={t('register.interests.skills')}
        options={optionsFor(t, 'skills')}
        value={form.skills}
        onChange={(v) => set({ skills: v })}
      />
      <ChipGroup
        id="sectors"
        optional
        label={t('register.interests.sectors')}
        options={optionsFor(t, 'sectors')}
        value={form.sectors}
        onChange={(v) => set({ sectors: v })}
      />
      <div className="max-w-sm">
        <SelectField
          id="availability"
          label={t('register.interests.availability')}
          value={form.availability}
          onChange={(v) => set({ availability: v })}
          error={errors.availability}
          options={optionsFor(t, 'availability')}
        />
      </div>
      <div className="rounded-2xl border-2 border-dashed border-cyan/50 bg-sky-50 p-5">
        <p className="font-semibold">
          {t('register.interests.cv')}{' '}
          <span className="font-normal text-ink-soft">({t('register.optional')})</span>
        </p>
        <p className="mt-1 text-sm text-ink-soft">{t('register.interests.cvNote')}</p>
        {form.cvFile ? (
          <div className="mt-3 flex items-center gap-3 rounded-xl bg-white p-3 shadow-sm">
            <FileText className="size-6 text-blue" aria-hidden />
            <span className="min-w-0 flex-1 truncate font-semibold">{form.cvFile}</span>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label={t('register.interests.cvRemove', { file: form.cvFile })}
              onClick={() => set({ cvFile: '' })}
            >
              <Trash2 className="size-5 text-danger" aria-hidden />
            </Button>
          </div>
        ) : (
          <Button
            type="button"
            variant="outline"
            className="mt-3 rounded-full"
            onClick={() => {
              set({ cvFile: sampleName })
              toast.success(t('register.interests.cvAdded'))
            }}
          >
            <Paperclip className="size-4" aria-hidden />
            {t('register.interests.cvAttach')}
          </Button>
        )}
      </div>
    </div>
  )
}
