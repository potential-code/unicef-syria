import type {
  Application,
  CourseId,
  CourseProgress,
  FollowUp,
  Outcome,
  Youth,
  YouthId,
  YouthProfile,
} from '@shared/types'
import { PRESET_ANSWERS } from './assessment'
import { L } from './l'

/** Fixed demo clock (Syria time). The walkthrough happens in the week of 23 Nov 2026. */
export const DEMO_NOW = '2026-11-20T10:00:00+03:00'

const done = (courseId: CourseId, completedAt: string): CourseProgress => ({
  courseId,
  units: ['done', 'done', 'done', 'done'],
  quizAttempts: [100],
  quizBest: 100,
  practical: 'approved',
  completedAt,
  certificate: 'issued',
})
const started = (courseId: CourseId, units: CourseProgress['units']): CourseProgress => ({
  courseId,
  units,
  quizAttempts: [],
  practical: 'none',
})

const baseProfile = (
  p: Partial<YouthProfile> &
    Pick<YouthProfile, 'name' | 'email' | 'age' | 'gender' | 'governorate'>,
): YouthProfile => ({
  lang: 'en',
  education: 'Secondary school certificate',
  employmentStatus: 'Looking for work',
  experience: 'Volunteering at community events',
  digitalAccess: 'Smartphone and shared laptop',
  learningFormat: 'blended',
  interests: [],
  skills: [],
  sectors: [],
  availability: 'Weekdays',
  disability: 'notDisclosed',
  consentProgramme: true,
  consentEmployerVisible: true,
  ...p,
})

const empty = (id: YouthId, image: string, profile: YouthProfile): Youth => ({
  id,
  profile,
  image,
  profileComplete: true,
  pathGenerated: false,
  plan: [],
  cohortIds: [],
  progress: {},
  attendance: {},
  points: [],
  seededKeys: [],
  badges: [],
  toolkit: { interviews: [], proposals: [] },
  eventRegistrations: [],
  coachingNotes: [],
})

const seedPoints = (amount: number) => [
  {
    key: 'seed',
    reason: 'seed' as const,
    amount,
    at: '2026-11-17T09:00:00+03:00',
    label: L('Points earned before this demo (sample)', 'نقاط مكتسبة قبل هذا العرض (عينة)'),
  },
]

// ---------------------------------------------------------------- the three demo stories

function nour(): Youth {
  return {
    ...empty(
      'Y001',
      'images/generated/youth-nour.webp',
      baseProfile({
        name: 'Nour Hassan',
        email: 'nour.demo@example.org',
        age: 22,
        gender: 'female',
        governorate: 'Damascus',
        interests: ['Customer service', 'Office coordination'],
        skills: ['Event registration', 'Arabic and English', 'Basic spreadsheets'],
        sectors: ['Services', 'Retail'],
        experience: 'Supported a training event at a community centre',
      }),
    ),
    assessment: {
      answers: PRESET_ANSWERS.Y001,
      scores: { C: 12, O: 8, P: 2, I: 2 },
      completedAt: '2026-11-10T11:00:00+03:00',
    },
    preferences: { earningModel: 'salary', environment: 'team', priority: 'stability' },
    route: 'employment',
    pathGenerated: true,
    plan: ['C01', 'C02', 'C03', 'C05', 'C06', 'C13'],
    cohortIds: ['K01'],
    trainingApplication: {
      programmeId: 'PR01',
      status: 'accepted',
      at: '2026-11-11T09:00:00+03:00',
    },
    progress: {
      C01: done('C01', '2026-11-11'),
      C02: done('C02', '2026-11-13'),
      C03: done('C03', '2026-11-16'),
      C05: started('C05', ['done', 'done', 'inProgress', 'todo']),
    },
    attendance: { S01: 'present' },
    points: seedPoints(80),
    seededKeys: [
      'profile',
      'assessment',
      'course:C01',
      'course:C02',
      'course:C03',
      'attendance:S01',
    ],
    badges: ['careerExplorer', 'learningStarter'],
    toolkit: {
      interviews: [],
      proposals: [],
      cv: {
        summary: 'Friendly and organised young professional interested in customer service.',
        education: 'Secondary school certificate, Damascus',
        experience: ['Helped at events'],
        projects: 'Training event volunteer',
        skills: 'Customer communication, digital records, teamwork',
        languages: 'Arabic (native), English (intermediate)',
        includeCertificates: [],
      },
    },
  }
}

function omar(): Youth {
  return {
    ...empty(
      'Y002',
      'images/generated/youth-omar.webp',
      baseProfile({
        name: 'Omar Khalil',
        email: 'omar.demo@example.org',
        age: 24,
        gender: 'male',
        governorate: 'Aleppo',
        interests: ['Small business', 'Mobile apps'],
        skills: ['Phone repair basics', 'Customer conversations'],
        sectors: ['Repair services', 'Technology'],
        employmentStatus: 'Informal part-time work',
      }),
    ),
    assessment: {
      answers: PRESET_ANSWERS.Y002,
      scores: { I: 12, C: 8, P: 2, O: 2 },
      completedAt: '2026-11-09T15:00:00+03:00',
    },
    preferences: { earningModel: 'business', environment: 'own', priority: 'independence' },
    route: 'enterprise',
    pathGenerated: true,
    plan: ['C01', 'C02', 'C03', 'C07', 'C08', 'C09', 'C16'],
    cohortIds: ['K02'],
    trainingApplication: {
      programmeId: 'PR02',
      status: 'accepted',
      at: '2026-11-10T09:00:00+03:00',
    },
    progress: {
      C01: done('C01', '2026-11-10'),
      C02: done('C02', '2026-11-12'),
      C03: done('C03', '2026-11-15'),
      C07: started('C07', ['done', 'inProgress', 'todo', 'todo']),
    },
    points: seedPoints(120),
    seededKeys: ['profile', 'assessment', 'course:C01', 'course:C02', 'course:C03'],
    badges: ['careerExplorer', 'learningStarter'],
    toolkit: {
      interviews: [],
      proposals: [],
      business: {
        customer: 'Local repair businesses in Aleppo',
        problem: 'Customers call at busy times and appointments are missed.',
        solution: 'A simple appointment-booking service by phone message.',
        evidence: '',
        model: '',
        costs: '',
        nextExperiment: 'Interview five repair shop owners about enquiries.',
        questions: [],
      },
    },
  }
}

function lina(): Youth {
  return {
    ...empty(
      'Y003',
      'images/generated/youth-lina.webp',
      baseProfile({
        name: 'Lina Saleh',
        email: 'lina.demo@example.org',
        age: 21,
        gender: 'female',
        governorate: 'Homs',
        interests: ['Digital content', 'Design'],
        skills: ['Phone photography', 'Short copywriting'],
        sectors: ['Retail', 'Media'],
        availability: 'Afternoons, remote',
      }),
    ),
    assessment: {
      answers: PRESET_ANSWERS.Y003,
      scores: { I: 8, C: 8, P: 4, O: 4 },
      completedAt: '2026-11-09T12:00:00+03:00',
    },
    preferences: { earningModel: 'projects', environment: 'flexible', priority: 'flexibility' },
    route: 'freelance',
    pathGenerated: true,
    plan: ['C01', 'C02', 'C03', 'C10', 'C11', 'C12', 'C15'],
    cohortIds: ['K03'],
    trainingApplication: {
      programmeId: 'PR03',
      status: 'accepted',
      at: '2026-11-10T09:00:00+03:00',
    },
    progress: {
      C01: done('C01', '2026-11-10'),
      C02: done('C02', '2026-11-12'),
      C03: done('C03', '2026-11-14'),
      C10: done('C10', '2026-11-17'),
      C11: started('C11', ['done', 'done', 'inProgress', 'todo']),
    },
    points: seedPoints(90),
    seededKeys: ['profile', 'assessment', 'course:C01', 'course:C02', 'course:C03', 'course:C10'],
    badges: ['careerExplorer', 'learningStarter'],
    toolkit: {
      interviews: [],
      proposals: [],
      freelanceProfile: {
        services: 'Social media posts and short copy for small shops',
        samples: 'Three original sample posts for a fictional local retailer (sample work)',
        availability: '15 hours a week, afternoons',
        assignments: 'Short content projects for local businesses',
        pricing: 'Illustrative: per five-post package',
      },
    },
  }
}

// ---------------------------------------------------------------- supporting learners (brief §21)

function supporting(): Youth[] {
  const waitlisted = empty(
    'Y004',
    '',
    baseProfile({
      name: 'Rasha Omran',
      email: 'rasha.demo@example.org',
      age: 19,
      gender: 'female',
      governorate: 'Damascus',
      interests: ['Office support'],
    }),
  )
  waitlisted.trainingApplication = {
    programmeId: 'PR01',
    status: 'waitlisted',
    at: '2026-11-14T09:00:00+03:00',
  }
  waitlisted.progress = { C01: started('C01', ['done', 'inProgress', 'todo', 'todo']) }

  const lowAttendance = empty(
    'Y005',
    '',
    baseProfile({
      name: 'Yazan Saad',
      email: 'yazan.demo@example.org',
      age: 20,
      gender: 'male',
      governorate: 'Damascus',
      interests: ['Customer service'],
    }),
  )
  lowAttendance.route = 'employment'
  lowAttendance.cohortIds = ['K01']
  lowAttendance.trainingApplication = {
    programmeId: 'PR01',
    status: 'accepted',
    at: '2026-11-11T09:00:00+03:00',
  }
  lowAttendance.attendance = { S01: 'absent' }
  lowAttendance.progress = {
    C01: done('C01', '2026-11-12'),
    C03: {
      ...started('C03', ['done', 'done', 'done', 'done']),
      quizAttempts: [80],
      quizBest: 80,
      practical: 'submitted',
    },
  }
  lowAttendance.supportFlag = 'Missed the career goals workshop'

  const graduate = empty(
    'Y006',
    '',
    baseProfile({
      name: 'Hiba Aswad',
      email: 'hiba.demo@example.org',
      age: 23,
      gender: 'female',
      governorate: 'Homs',
      employmentStatus: 'Graduated, looking for work',
    }),
  )
  graduate.route = 'employment'
  graduate.graduated = '2026-08-10'
  graduate.progress = {
    C01: done('C01', '2026-07-01'),
    C03: done('C03', '2026-07-10'),
    C05: done('C05', '2026-07-25'),
  }

  const notSelected = empty(
    'Y007',
    '',
    baseProfile({
      name: 'Sami Ahmad',
      email: 'sami.demo@example.org',
      age: 22,
      gender: 'male',
      governorate: 'Damascus',
      interests: ['Customer service'],
    }),
  )
  notSelected.route = 'employment'
  notSelected.assessment = {
    answers: PRESET_ANSWERS.Y001,
    scores: { C: 12, O: 8, P: 2, I: 2 },
    completedAt: '2026-11-08T10:00:00+03:00',
  }
  notSelected.preferences = { earningModel: 'salary', environment: 'team', priority: 'stability' }
  notSelected.pathGenerated = true
  notSelected.plan = ['C01', 'C02', 'C03', 'C05', 'C06', 'C13']
  notSelected.cohortIds = ['K01']
  notSelected.trainingApplication = {
    programmeId: 'PR01',
    status: 'accepted',
    at: '2026-11-11T09:00:00+03:00',
  }
  notSelected.progress = { C01: done('C01', '2026-11-12'), C03: done('C03', '2026-11-15') }
  notSelected.attendance = { S01: 'present' }
  notSelected.toolkit.cv = {
    summary: 'Reliable team member.',
    education: 'Secondary school',
    experience: ['Shop assistant, family business'],
    projects: '',
    skills: 'Teamwork',
    languages: 'Arabic',
    includeCertificates: ['C03'],
  }
  return [waitlisted, lowAttendance, graduate, notSelected]
}

export function seedYouth(): Record<YouthId, Youth> {
  const all = [nour(), omar(), lina(), ...supporting()]
  return Object.fromEntries(all.map((y) => [y.id, y])) as Record<YouthId, Youth>
}

/**
 * A freshly registered Nour (main walkthrough step 1): profile prefilled for the presenter,
 * no assessment, no cohort; a pending training application for Employment Readiness.
 */
export function freshNour(): Youth {
  const n = nour()
  return {
    ...empty('Y001', n.image, { ...n.profile }),
    profileComplete: false,
    trainingApplication: { programmeId: 'PR01', status: 'pending', at: DEMO_NOW },
    toolkit: { interviews: [], proposals: [] },
  }
}

export function seedApplications(): Application[] {
  const t = (
    stage: Application['stage'],
    at: string,
    by: 'youth' | 'employer' | 'system' = 'youth',
  ) => ({ stage, at, by })
  return [
    {
      id: 'A-O01-Y001',
      youthId: 'Y001',
      opportunityId: 'O01',
      track: 'employment',
      stage: 'draft',
      timeline: [t('draft', '2026-11-18T12:00:00+03:00')],
      documents: {},
    },
    {
      id: 'A-O06-Y002',
      youthId: 'Y002',
      opportunityId: 'O06',
      track: 'enterprise',
      stage: 'draft',
      timeline: [t('draft', '2026-11-18T12:00:00+03:00')],
      documents: { businessConcept: true },
    },
    {
      id: 'A-O04-Y003',
      youthId: 'Y003',
      opportunityId: 'O04',
      track: 'freelance',
      stage: 'draft',
      timeline: [t('draft', '2026-11-18T12:00:00+03:00')],
      documents: { portfolio: true },
    },
    {
      id: 'A-O01-Y007',
      youthId: 'Y007',
      opportunityId: 'O01',
      track: 'employment',
      stage: 'underReview',
      timeline: [
        t('draft', '2026-11-14T10:00:00+03:00'),
        t('submitted', '2026-11-14T10:05:00+03:00'),
        t('underReview', '2026-11-16T09:00:00+03:00', 'employer'),
      ],
      documents: { cv: true },
      motivation: 'I enjoy helping customers and want to learn office systems.',
    },
  ]
}

export function seedOutcomes(): Outcome[] {
  return []
}

export function seedFollowUps(): FollowUp[] {
  return [
    {
      id: 'F-Y006-3',
      youthId: 'Y006',
      window: 3,
      due: '2026-11-10',
      centreId: 'T03',
      lastContact: '2026-08-12',
      status: 'overdue',
    },
  ]
}
