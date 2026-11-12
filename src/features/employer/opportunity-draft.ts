import type { Localized, Opportunity, OpportunityType, OrgId } from '@shared/types'
import type { TFunction } from 'i18next'
import type { GOVERNORATES, HOURS, WORK_FORMATS } from './config'

export interface OpportunityDraft {
  type: OpportunityType
  title: string
  description: string
  governorate: (typeof GOVERNORATES)[number]
  workFormat: (typeof WORK_FORMATS)[number]
  hours: (typeof HOURS)[number]
  skills: string
  qualifications: string
  startDate: string
  deadline: string
  questions: string
  compensation: string
  contact: string
  deliverables: string
  timeline: string
  review: string
  feeFormat: 'fixed' | 'perDeliverable' | 'toAgree'
}

export const EMPTY_DRAFT: OpportunityDraft = {
  type: 'job',
  title: '',
  description: '',
  governorate: 'Damascus',
  workFormat: 'onsite',
  hours: 'fullTime',
  skills: '',
  qualifications: '',
  startDate: '',
  deadline: '',
  questions: '',
  compensation: '',
  contact: '',
  deliverables: '',
  timeline: '',
  review: '',
  feeFormat: 'fixed',
}

export type DraftErrors = Partial<Record<keyof OpportunityDraft, string>>

/** Validate title, scope, deadline and contact before publishing (brief §16 E01). */
export function validateDraft(d: OpportunityDraft, today: string, t: TFunction): DraftErrors {
  const e: DraftErrors = {}
  if (d.title.trim().length < 4) e.title = t('employer:form.errors.title')
  if (d.description.trim().length < 20) e.description = t('employer:form.errors.description')
  if (!d.deadline) e.deadline = t('employer:form.errors.deadline')
  else if (d.deadline <= today) e.deadline = t('employer:form.errors.deadlinePast')
  if (!/^\S+@\S+\.\S+$/.test(d.contact.trim()) && !/^\+?[\d\s]{7,}$/.test(d.contact.trim()))
    e.contact = t('employer:form.errors.contact')
  if (d.type === 'freelance' && d.deliverables.trim().length < 5)
    e.deliverables = t('employer:form.errors.deliverables')
  return e
}

/** Compose the stored opportunity. Extra fields become clear labelled lines in the description. */
export function toOpportunity(
  d: OpportunityDraft,
  orgId: OrgId,
  t: TFunction,
): Omit<Opportunity, 'id' | 'status'> {
  const line = (key: string, value: string) =>
    value.trim() ? `${t(`employer:form.${key}`)}: ${value.trim()}` : ''
  const extra = [
    line(
      'hours',
      d.type === 'freelance' || d.type === 'enterprise'
        ? ''
        : t(`employer:form.hoursOptions.${d.hours}`),
    ),
    line('qualifications', d.qualifications),
    line('startDate', d.startDate),
    line('questions', d.questions),
    line('compensation', d.compensation),
    ...(d.type === 'freelance'
      ? [
          line('deliverables', d.deliverables),
          line('timeline', d.timeline),
          line('review', d.review),
          line('feeFormat', t(`employer:form.feeOptions.${d.feeFormat}`)),
        ]
      : []),
    line('contact', d.contact),
  ].filter(Boolean)
  const text = [d.description.trim(), ...extra].join('\n')
  const same = (s: string): Localized => ({ en: s, ar: s })
  const location = t(`employer:governorates.${d.governorate}`)
  return {
    title: same(d.title.trim()),
    orgId,
    type: d.type,
    location: same(location),
    workFormat: d.workFormat,
    deadline: d.deadline,
    skills: d.skills
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)
      .map(same),
    evidence: same(d.questions.trim() || t('employer:form.defaultEvidence')),
    description: same(text),
    evidenceCourses: [],
  }
}
