import type { Governorate, YouthProfile } from '@shared/types'

export const GOVERNORATES: Governorate[] = ['Damascus', 'Aleppo', 'Homs']
export const GENDERS: YouthProfile['gender'][] = ['female', 'male', 'notDisclosed']
export const FORMATS: YouthProfile['learningFormat'][] = ['online', 'centre', 'blended']
export const DISABILITY: NonNullable<YouthProfile['disability']>[] = ['notDisclosed', 'no', 'yes']
export const SAMPLE_CV = 'sample-cv.pdf'

export type ProfileErrorKey =
  | 'name'
  | 'contact'
  | 'email'
  | 'age'
  | 'education'
  | 'employmentStatus'
  | 'digitalAccess'
  | 'availability'
  | 'consentProgramme'

/** Required-field validation (brief §2 Y01). Returns error keys; empty means valid. */
export function validateProfile(p: YouthProfile): Partial<Record<ProfileErrorKey, string>> {
  const e: Partial<Record<ProfileErrorKey, string>> = {}
  if (!p.name.trim()) e.name = 'required'
  if (!p.email.trim() && !p.phone?.trim()) e.contact = 'contact'
  if (p.email.trim() && !/^\S+@\S+\.\S+$/.test(p.email.trim())) e.email = 'email'
  if (!Number.isFinite(p.age) || p.age < 15 || p.age > 35) e.age = 'age'
  if (!p.education.trim()) e.education = 'required'
  if (!p.employmentStatus.trim()) e.employmentStatus = 'required'
  if (!p.digitalAccess.trim()) e.digitalAccess = 'required'
  if (!p.availability.trim()) e.availability = 'required'
  if (!p.consentProgramme) e.consentProgramme = 'consent'
  return e
}

/** Share of profile items filled in (required and recommended), for the completion meter. */
export function profileCompletion(p: YouthProfile): number {
  const checks = [
    p.name.trim(),
    p.email.trim() || p.phone?.trim(),
    p.age > 0,
    p.education.trim(),
    p.employmentStatus.trim(),
    p.experience.trim(),
    p.digitalAccess.trim(),
    p.interests.length > 0,
    p.skills.length > 0,
    p.sectors.length > 0,
    p.availability.trim(),
    p.consentProgramme,
  ]
  return Math.round((checks.filter(Boolean).length / checks.length) * 100)
}

export interface SectionProps {
  p: YouthProfile
  set: <K extends keyof YouthProfile>(k: K, v: YouthProfile[K]) => void
  /** Visible error messages (already translated), keyed by field. */
  errors: Partial<Record<ProfileErrorKey, string>>
}
