import type { Toolkit, Youth } from '@shared/types'
import { Link } from '@tanstack/react-router'
import { FileText, Save } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { Motif } from '@/components/brand'
import { Button } from '@/components/ui/button'
import { saveToolkit } from '@/store/actions/toolkit'
import { CertificateSuggestions } from './CertificateSuggestions'
import { CvPreviewDialog } from './CvPreviewDialog'
import { Field } from './Field'
import { ListEditor } from './ListEditor'
import { ToolPanel } from './ToolPanel'

type Cv = NonNullable<Toolkit['cv']>
const EMPTY: Cv = {
  summary: '',
  education: '',
  experience: [],
  projects: '',
  skills: '',
  languages: '',
  includeCertificates: [],
}

/** CV builder: contact details from the profile, editable sections, reviewed certificates. */
export function CvBuilder({ youth }: { youth: Youth }) {
  const { t } = useTranslation('career')
  const [cv, setCv] = useState<Cv>(youth.toolkit.cv ?? EMPTY)
  const set = <K extends keyof Cv>(k: K, v: Cv[K]) => setCv((c) => ({ ...c, [k]: v }))
  const p = youth.profile
  const save = () => {
    saveToolkit(youth.id, 'cv', {
      ...cv,
      experience: cv.experience.map((e) => e.trim()).filter(Boolean),
    })
    toast.success(t('toolkit.cv.saved'))
  }
  return (
    <ToolPanel
      icon={FileText}
      title={t('toolkit.tabs.cv')}
      intro={t('toolkit.cv.intro')}
      actions={
        <>
          <CvPreviewDialog cv={cv} profile={p} />
          <Button className="rounded-full" onClick={save}>
            <Save className="size-4" aria-hidden />
            {t('toolkit.cv.save')}
          </Button>
        </>
      }
    >
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_18rem]">
        <div className="space-y-5">
          <Field
            id="cv-summary"
            label={t('toolkit.cv.summary')}
            value={cv.summary}
            onChange={(v) => set('summary', v)}
            multiline
            hint={t('toolkit.cv.summaryHint')}
          />
          <ListEditor
            id="cv-exp"
            label={t('toolkit.cv.experience')}
            items={cv.experience}
            onChange={(v) => set('experience', v)}
            addLabel={t('toolkit.cv.addBullet')}
            emptyText={t('toolkit.cv.noBullets')}
            placeholder={t('toolkit.cv.bulletPlaceholder')}
          />
          <p className="text-xs text-ink-soft">{t('toolkit.cv.honestHint')}</p>
          <Field
            id="cv-education"
            label={t('toolkit.cv.education')}
            value={cv.education}
            onChange={(v) => set('education', v)}
            multiline
            rows={2}
          />
          <Field
            id="cv-projects"
            label={t('toolkit.cv.projects')}
            value={cv.projects}
            onChange={(v) => set('projects', v)}
            multiline
            rows={2}
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <Field
              id="cv-skills"
              label={t('toolkit.cv.skills')}
              value={cv.skills}
              onChange={(v) => set('skills', v)}
              hint={t('toolkit.cv.commaHint')}
            />
            <Field
              id="cv-languages"
              label={t('toolkit.cv.languages')}
              value={cv.languages}
              onChange={(v) => set('languages', v)}
            />
          </div>
          <CertificateSuggestions
            youth={youth}
            selected={cv.includeCertificates}
            onChange={(v) => set('includeCertificates', v)}
          />
        </div>
        <aside className="relative h-fit space-y-2 overflow-hidden rounded-2xl bg-[linear-gradient(150deg,var(--unicef-navy),#002a73)] p-5 text-white shadow-lg on-dark [&>*:not(:first-child)]:relative">
          <Motif variant="corner" className="text-cyan/25" />
          <h3 className="text-sm font-bold uppercase tracking-wide text-white/80">
            {t('toolkit.cv.contact')}
          </h3>
          <p className="text-lg font-bold text-white">{p.name}</p>
          <p className="text-sm text-white/85">{p.email}</p>
          {p.phone && <p className="text-sm text-white/85">{p.phone}</p>}
          <p className="text-sm text-white/85">{p.governorate}</p>
          <p className="pt-2 text-xs text-white/75">{t('toolkit.cv.contactHint')}</p>
          <Link
            to="/youth/profile"
            className="inline-flex min-h-9 items-center font-semibold text-yellow hover:underline"
          >
            {t('toolkit.cv.editProfile')}
          </Link>
        </aside>
      </div>
    </ToolPanel>
  )
}
