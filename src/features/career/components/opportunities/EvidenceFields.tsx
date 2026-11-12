import type { Opportunity, Youth } from '@shared/types'
import { Link } from '@tanstack/react-router'
import { CheckCircle2, CircleDashed } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { COURSE_BY_ID } from '@/data/courses'
import { trackFor } from '@/domain/application-stages'
import { useLocalized } from '@/i18n'
import { EVIDENCE_RULE, SIMULATED_FILES } from '../../config/opportunities'
import { courseHref } from '../../lib/links'
import type { ApplyForm } from '../../lib/match'
import { SimulatedUpload } from './SimulatedUpload'

/** Track-specific evidence (brief §15): CV and courses, service profile and proposal, or business concept. */
export function EvidenceFields({
  youth,
  opp,
  form,
  set,
  disabled,
}: {
  youth: Youth
  opp: Opportunity
  form: ApplyForm
  set: (p: Partial<ApplyForm>) => void
  disabled: boolean
}) {
  const { t } = useTranslation('career')
  const { l } = useLocalized()
  const track = trackFor(opp.type)
  const tk = youth.toolkit
  const toolkitLink = (
    <Link to="/youth/toolkit" className="font-semibold text-blue hover:underline">
      {t('opps.apply.fix.toolkit')}
    </Link>
  )

  if (track === 'freelance') {
    return (
      <div className="space-y-5">
        <div className="rounded-xl border border-border/70 bg-sky-50/40 p-3">
          <p className="text-sm font-semibold">{t('opps.apply.req.serviceProfile')}</p>
          {tk.freelanceProfile ? (
            <p className="mt-1 text-sm text-ink-soft">{tk.freelanceProfile.services}</p>
          ) : (
            <p className="mt-1 text-sm">
              {t('opps.apply.noServiceProfile')} {toolkitLink}
            </p>
          )}
        </div>
        <SimulatedUpload
          id="up-portfolio"
          label={t('opps.apply.req.portfolio')}
          sample={SIMULATED_FILES.portfolio}
          file={form.portfolioFile}
          onChange={(f) => set({ portfolioFile: f })}
          disabled={disabled}
        />
        <div className="space-y-1.5">
          <Label htmlFor="proposal">{t('opps.apply.req.proposal')}</Label>
          {tk.proposals.length === 0 && form.proposalId !== 'attached' ? (
            <p className="text-sm">
              {t('opps.apply.noProposals')} {toolkitLink}
            </p>
          ) : (
            <Select
              value={form.proposalId || 'none'}
              onValueChange={(v) => set({ proposalId: v === 'none' ? '' : v })}
              disabled={disabled}
            >
              <SelectTrigger id="proposal">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">{t('opps.apply.proposalNone')}</SelectItem>
                {form.proposalId === 'attached' && (
                  <SelectItem value="attached">{t('opps.apply.proposalAttached')}</SelectItem>
                )}
                {tk.proposals.map((p) => (
                  <SelectItem key={p.id} value={p.id}>
                    {p.client || p.goal.slice(0, 40) || p.id}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
          <p className="text-xs text-ink-soft">{t('opps.apply.proposalReview')}</p>
        </div>
      </div>
    )
  }

  if (track === 'enterprise') {
    return tk.business ? (
      <div className="flex items-start gap-3 rounded-xl border border-border/70 bg-sky-50/40 p-3">
        <Checkbox
          id="attach-biz"
          checked={form.attachBusiness}
          onCheckedChange={(c) => set({ attachBusiness: c === true })}
          disabled={disabled}
          className="mt-1"
        />
        <Label htmlFor="attach-biz" className="flex-col items-start gap-1">
          <span>{t('opps.apply.attachBusiness')}</span>
          <span className="text-sm font-normal text-ink-soft">
            {tk.business.problem || tk.business.customer}
          </span>
        </Label>
      </div>
    ) : (
      <p className="rounded-xl border border-border/70 bg-sky-50/40 p-3 text-sm">
        {t('opps.apply.noBusiness')} {toolkitLink}
      </p>
    )
  }

  const rule = EVIDENCE_RULE[opp.id] ?? 'any'
  return (
    <div className="space-y-5">
      {tk.cv ? (
        <div className="flex items-start gap-3 rounded-xl border border-border/70 bg-sky-50/40 p-3">
          <Checkbox
            id="attach-cv"
            checked={form.attachCv}
            onCheckedChange={(c) => set({ attachCv: c === true })}
            disabled={disabled}
            className="mt-1"
          />
          <Label htmlFor="attach-cv" className="flex-col items-start gap-1">
            <span>{t('opps.apply.attachCv')}</span>
            <span className="text-sm font-normal text-ink-soft">{tk.cv.summary}</span>
          </Label>
        </div>
      ) : (
        <p className="rounded-xl border border-border/70 bg-sky-50/40 p-3 text-sm">
          {t('opps.apply.noCv')} {toolkitLink}
        </p>
      )}
      {opp.evidenceCourses.length > 0 && (
        <fieldset className="rounded-xl border border-border/70 bg-sky-50/40 p-3">
          <legend className="px-1 text-sm font-semibold">
            {t(`opps.apply.coursesRule.${rule}`)}
          </legend>
          <ul className="space-y-1.5">
            {opp.evidenceCourses.map((c) => {
              const ok = Boolean(youth.progress[c]?.completedAt)
              return (
                <li key={c} className="flex items-center gap-2 text-sm">
                  {ok ? (
                    <CheckCircle2 className="size-4 text-success" aria-hidden />
                  ) : (
                    <CircleDashed className="size-4 text-notice" aria-hidden />
                  )}
                  <span className="flex-1">
                    {c} {l(COURSE_BY_ID[c].title)}
                  </span>
                  {ok ? (
                    <span className="text-success">{t('opps.apply.completed')}</span>
                  ) : (
                    <a href={courseHref(c)} className="font-semibold text-blue hover:underline">
                      {t('opps.apply.fix.courses')}
                    </a>
                  )}
                </li>
              )
            })}
          </ul>
        </fieldset>
      )}
      {(opp.type === 'internship' || opp.type === 'partTime') && (
        <p className="rounded-xl bg-sky-50 p-3 text-sm">
          {t('opps.apply.availabilityValue', {
            value: youth.profile.availability || t('opps.apply.notSet'),
          })}
        </p>
      )}
      {opp.type === 'partTime' && (
        <SimulatedUpload
          id="up-work"
          label={t('opps.apply.req.workSample')}
          sample={SIMULATED_FILES.workSample}
          file={form.workSampleFile}
          onChange={(f) => set({ workSampleFile: f })}
          disabled={disabled}
        />
      )}
    </div>
  )
}
