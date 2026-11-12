import type { Governorate, Lang, YouthProfile } from '@shared/types'

export const STEPS = ['account', 'background', 'interests', 'support', 'permissions'] as const
export type StepId = (typeof STEPS)[number]

/** Option values are stored in English (what trainers and employers read); labels come from i18n. */
export const OPTIONS = {
  education: ['basic', 'secondary', 'vocational', 'university'],
  employment: ['looking', 'informal', 'studying', 'employed'],
  digital: ['smartphone', 'shared', 'own', 'limited'],
  format: ['online', 'centre', 'blended'],
  availability: ['weekdays', 'evenings', 'weekends', 'flexible'],
  interests: ['customerService', 'office', 'business', 'digitalContent', 'repair', 'tech'],
  skills: ['registration', 'languages', 'spreadsheets', 'social', 'repairBasics', 'conversations'],
  sectors: ['services', 'retail', 'education', 'technology', 'repairServices', 'community'],
  supportPrefs: ['captions', 'largeText', 'extraTime', 'screenReader', 'quietSpace', 'stepAccess'],
} as const

/** English stored values for each option key (seed records use these strings). */
export const VALUE: Record<string, string> = {
  basic: 'Basic education',
  secondary: 'Secondary school certificate',
  vocational: 'Vocational diploma',
  university: 'University studies',
  looking: 'Looking for work',
  informal: 'Informal part-time work',
  studying: 'Studying',
  employed: 'Employed and looking to grow',
  smartphone: 'Smartphone only',
  shared: 'Smartphone and shared laptop',
  own: 'Own laptop and internet',
  limited: 'Limited or occasional access',
  weekdays: 'Weekdays',
  evenings: 'Evenings',
  weekends: 'Weekends',
  flexible: 'Flexible',
  customerService: 'Customer service',
  office: 'Office coordination',
  business: 'Small business',
  digitalContent: 'Digital content',
  repair: 'Repair and maintenance',
  tech: 'Mobile apps',
  registration: 'Event registration',
  languages: 'Arabic and English',
  spreadsheets: 'Basic spreadsheets',
  social: 'Social media',
  repairBasics: 'Phone repair basics',
  conversations: 'Customer conversations',
  services: 'Services',
  retail: 'Retail',
  education: 'Education and training',
  technology: 'Technology',
  repairServices: 'Repair services',
  community: 'Community services',
  captions: 'Captions on videos',
  largeText: 'Larger text',
  extraTime: 'Extra time for activities',
  screenReader: 'Screen reader friendly content',
  quietSpace: 'Quiet space at the centre',
  stepAccess: 'Step-free access at the centre',
}

export interface RegForm {
  name: string
  contact: string
  password: string
  lang: Lang
  verified: boolean
  age: string
  gender: YouthProfile['gender']
  governorate: Governorate | ''
  education: string
  employment: string
  experience: string
  digital: string
  format: YouthProfile['learningFormat'] | ''
  interests: string[]
  skills: string[]
  sectors: string[]
  availability: string
  cvFile: string
  supportPrefs: string[]
  supportNote: string
  disability: NonNullable<YouthProfile['disability']>
  consentProgramme: boolean
  consentEmployerVisible: boolean
}

export const EMPTY_FORM: RegForm = {
  name: '',
  contact: '',
  password: '',
  lang: 'en',
  verified: false,
  age: '',
  gender: 'notDisclosed',
  governorate: '',
  education: '',
  employment: '',
  experience: '',
  digital: '',
  format: '',
  interests: [],
  skills: [],
  sectors: [],
  availability: '',
  cvFile: '',
  supportPrefs: [],
  supportNote: '',
  disability: 'notDisclosed',
  consentProgramme: false,
  consentEmployerVisible: false,
}

/** Presenter shortcut: Nour Hassan's sample details (brief §23 step 1). */
export const NOUR_SAMPLE: RegForm = {
  name: 'Nour Hassan',
  contact: 'nour.demo@example.org',
  password: 'demo-pass',
  lang: 'en',
  verified: true,
  age: '22',
  gender: 'female',
  governorate: 'Damascus',
  education: 'secondary',
  employment: 'looking',
  experience: 'Supported a training event at a community centre',
  digital: 'shared',
  format: 'blended',
  interests: ['customerService', 'office'],
  skills: ['registration', 'languages', 'spreadsheets'],
  sectors: ['services', 'retail'],
  availability: 'weekdays',
  cvFile: 'Nour_Hassan_CV_sample.pdf',
  supportPrefs: ['captions'],
  supportNote: '',
  disability: 'notDisclosed',
  consentProgramme: true,
  consentEmployerVisible: true,
}

export type Errors = Partial<Record<keyof RegForm, string>>

/** Required fields per step; values are i18n keys under register.errors. */
export function validate(step: StepId, f: RegForm): Errors {
  const e: Errors = {}
  if (step === 'account') {
    if (f.name.trim().length < 2) e.name = 'name'
    const c = f.contact.trim()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(c) && !/^\+?[\d\s]{8,15}$/.test(c)) e.contact = 'contact'
    if (f.password.length < 6) e.password = 'password'
    if (!f.verified && !e.contact) e.verified = 'verify'
  }
  if (step === 'background') {
    const age = Number(f.age)
    if (!f.age || !Number.isInteger(age) || age < 15 || age > 35) e.age = 'age'
    if (!f.governorate) e.governorate = 'required'
    if (!f.education) e.education = 'required'
    if (!f.employment) e.employment = 'required'
    if (!f.digital) e.digital = 'required'
    if (!f.format) e.format = 'required'
  }
  if (step === 'interests') {
    if (f.interests.length === 0) e.interests = 'interests'
    if (!f.availability) e.availability = 'required'
  }
  if (step === 'permissions' && !f.consentProgramme) e.consentProgramme = 'consent'
  return e
}

const COUNTED: (keyof RegForm)[] = [
  'name',
  'contact',
  'password',
  'verified',
  'age',
  'governorate',
  'education',
  'employment',
  'experience',
  'digital',
  'format',
  'interests',
  'skills',
  'sectors',
  'availability',
  'cvFile',
  'consentProgramme',
]

/** Profile completion percent shown in the meter. Optional support details never count against it. */
export function completion(f: RegForm): number {
  const filled = COUNTED.filter((k) => {
    const v = f[k]
    return Array.isArray(v) ? v.length > 0 : typeof v === 'boolean' ? v : String(v).trim() !== ''
  }).length
  return Math.round((filled / COUNTED.length) * 100)
}

export function toProfile(f: RegForm): YouthProfile {
  const email = f.contact.includes('@') ? f.contact.trim() : ''
  const support = [...f.supportPrefs.map((k) => VALUE[k] ?? k), f.supportNote.trim()]
    .filter(Boolean)
    .join('; ')
  return {
    name: f.name.trim(),
    email,
    phone: email ? undefined : f.contact.trim(),
    lang: f.lang,
    age: Number(f.age),
    gender: f.gender,
    governorate: f.governorate || 'Damascus',
    education: VALUE[f.education] ?? f.education,
    employmentStatus: VALUE[f.employment] ?? f.employment,
    experience: f.experience.trim(),
    digitalAccess: VALUE[f.digital] ?? f.digital,
    learningFormat: f.format || 'blended',
    interests: f.interests.map((k) => VALUE[k] ?? k),
    skills: f.skills.map((k) => VALUE[k] ?? k),
    sectors: f.sectors.map((k) => VALUE[k] ?? k),
    availability: VALUE[f.availability] ?? f.availability,
    support: support || undefined,
    disability: f.disability,
    consentProgramme: f.consentProgramme,
    consentEmployerVisible: f.consentEmployerVisible,
    cvFile: f.cvFile || undefined,
  }
}
