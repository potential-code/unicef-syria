/**
 * Shared entity types for the UNICEF Syria Youth Pathways mockup.
 * Every record uses a stable ID from the brief (Y001, C05, K01, S01, O01, T01, P01, PR01...).
 * All data is fictional demonstration material.
 */

export type Lang = 'en' | 'ar'
/** Translatable text. Seed content is authored in both languages (Arabic may be a placeholder). */
export interface Localized {
  en: string
  ar: string
}

// ---------------------------------------------------------------- roles and personas

export type Role =
  | 'youth'
  | 'trainer'
  | 'employer'
  | 'centre'
  | 'partner'
  | 'unicef'
  | 'viewer'

export type PersonaId =
  | 'Y001'
  | 'Y002'
  | 'Y003'
  | 'Y007'
  | 'TR01'
  | 'TR02'
  | 'TR03'
  | 'EM01'
  | 'EM02'
  | 'CA01'
  | 'PA01'
  | 'UA01'
  | 'RV01'

export interface Persona {
  id: PersonaId
  role: Role
  name: Localized
  title: Localized
  /** What this persona is allowed to see, in plain words for the sign-in card. */
  scope: Localized
  image: string
  /** Scope keys used by domain/access.ts. */
  youthId?: YouthId
  trainerId?: TrainerId
  orgId?: OrgId
  centreId?: CentreId
  partnerId?: PartnerId
}

// ---------------------------------------------------------------- organisation hierarchy

export type PartnerId = 'P01' | 'P02'
export type CentreId = 'T01' | 'T02' | 'T03'
export type ProgrammeId = 'PR01' | 'PR02' | 'PR03'
export type CohortId = 'K01' | 'K02' | 'K03'
export type Governorate = 'Damascus' | 'Aleppo' | 'Homs'

export interface Partner {
  id: PartnerId
  name: Localized
  centreIds: CentreId[]
}
export interface Centre {
  id: CentreId
  name: Localized
  governorate: Governorate
  partnerId: PartnerId
  image: string
}
export interface Programme {
  id: ProgrammeId
  name: Localized
  route: CareerRoute
}
export interface Cohort {
  id: CohortId
  name: Localized
  programmeId: ProgrammeId
  centreId: CentreId
  trainerId: TrainerId
  /** Fictional cohort size from the brief (the named learners are a subset). */
  size: number
}

// ---------------------------------------------------------------- careers and assessment

export type CareerRoute = 'employment' | 'enterprise' | 'freelance'
/** P practical, C communication, I initiative, O organisation. */
export type Dimension = 'P' | 'C' | 'I' | 'O'
export type DimensionScores = Record<Dimension, number>

export interface AssessmentOption {
  dimension: Dimension
  text: Localized
}
export interface AssessmentQuestion {
  id: number
  prompt: Localized
  options: AssessmentOption[]
}
export type PreferenceKey = 'earningModel' | 'environment' | 'priority'
export interface PreferenceQuestion {
  key: PreferenceKey
  prompt: Localized
  options: { value: string; label: Localized; route?: CareerRoute }[]
}

export interface AssessmentResult {
  answers: Dimension[]
  scores: DimensionScores
  completedAt: string
}

// ---------------------------------------------------------------- learning

export type CourseId =
  | 'C01'
  | 'C02'
  | 'C03'
  | 'C04'
  | 'C05'
  | 'C06'
  | 'C07'
  | 'C08'
  | 'C09'
  | 'C10'
  | 'C11'
  | 'C12'
  | 'C13'
  | 'C14'
  | 'C15'
  | 'C16'

export type CourseCategory =
  | 'foundations'
  | 'employment'
  | 'entrepreneurship'
  | 'freelancing'
  | 'technical'

export interface CheckQuestion {
  prompt: Localized
  options: Localized[]
  correct: number
  feedback: Localized
}

export interface Unit {
  /** e.g. 'C05-U3' */
  id: string
  title: Localized
  synopsis: Localized
  /** Full lesson only on showcase courses C05, C07, C11. */
  objective?: Localized
  body?: Localized
  scenario?: Localized
  takeaway?: Localized
  check?: CheckQuestion
  hasVideo?: boolean
  transcript?: Localized
}

export interface QuizQuestion extends CheckQuestion {
  /** Unit to revisit when this answer is wrong. */
  unitIndex: number
}

export interface Course {
  id: CourseId
  title: Localized
  category: CourseCategory
  routes: CareerRoute[] | 'all'
  minutes: number
  level: 'beginner' | 'intermediate'
  delivery: 'self-paced' | 'blended'
  outcomes: Localized[]
  units: Unit[]
  practicalTask: Localized
  output: Localized
  quiz: QuizQuestion[]
  resources: TemplateId[]
  prerequisites: CourseId[]
  image: string
  /** Caveat shown on the course page, e.g. "not a professional qualification". */
  note?: Localized
  showcase?: boolean
}

export type TemplateId =
  | 'actionPlan'
  | 'cvOutline'
  | 'starWorksheet'
  | 'customerInterview'
  | 'cashPlan'
  | 'proposal'
  | 'portfolioChecklist'

export interface Template {
  id: TemplateId
  title: Localized
  body: Localized
}

export type UnitStatus = 'todo' | 'inProgress' | 'done'
export interface CourseProgress {
  courseId: CourseId
  units: UnitStatus[]
  quizAttempts: number[]
  /** Best quiz score percent, if attempted. */
  quizBest?: number
  practical: 'none' | 'submitted' | 'approved' | 'returned'
  completedAt?: string
  certificate?: CertificateState
}
export type CertificateState = 'pendingReview' | 'recommended' | 'approved' | 'issued'

// ---------------------------------------------------------------- sessions and mentors

export type SessionId = 'S01' | 'S02' | 'S03' | 'S04' | 'S05' | 'S06' | 'S07' | 'S08' | 'S09' | 'E01'
export interface Session {
  id: SessionId
  title: Localized
  cohortId: CohortId | null
  trainerId: TrainerId | null
  format: 'online' | 'centre'
  centreId?: CentreId
  /** ISO date-time in Syria time (UTC+3). */
  start: string
  end: string
  capacity: number
  purpose: Localized
  public?: boolean
}
export type AttendanceMark = 'present' | 'absent' | 'excused'

export type TrainerId = 'TR01' | 'TR02' | 'TR03'
export interface Trainer {
  id: TrainerId
  name: Localized
  cohortIds: CohortId[]
  mentorId?: MentorId
}

export type MentorId = 'M01' | 'M02' | 'M03' | 'M04' | 'M05'
export interface Mentor {
  id: MentorId
  name: Localized
  title: Localized
  focus: Localized
  languages: Localized
  slot: { start: string; end: string }
  cost: number
  image: string
  trainerId?: TrainerId
}
export interface MentorBooking {
  id: string
  mentorId: MentorId
  youthId: YouthId
  goal: string
  question: string
  method: 'points' | 'allocation'
  status: 'booked' | 'cancelled' | 'completed'
  feedback?: { note: Localized; actions: Localized[]; rating?: number }
}

// ---------------------------------------------------------------- AI coaches

export type CoachId = 'navigator' | 'learning' | 'cv' | 'enterprise' | 'freelance'
export type ToolkitTarget = 'cv' | 'interview' | 'business' | 'freelanceProfile' | 'proposal' | 'plan'
export interface CoachStep {
  id: string
  coach: Localized
  /** User reply buttons; 'next' is the step id to go to. */
  replies?: { label: Localized; next: string }[]
  /** Editable draft the user can save to the toolkit. */
  draft?: { target: ToolkitTarget; text: Localized }
  /** Course suggestions with reasons. */
  courses?: { courseId: CourseId; reason: Localized }[]
}
export interface Coach {
  id: CoachId
  name: Localized
  title: Localized
  purpose: Localized
  image: string
  starters: { label: Localized; step: string }[]
  steps: CoachStep[]
}

// ---------------------------------------------------------------- opportunities

export type OrgId = 'ORG01' | 'ORG02' | 'ORG03' | 'ORG04' | 'ORG05' | 'ORG06'
export interface Organisation {
  id: OrgId
  name: Localized
  sector: Localized
  governorate: Governorate | 'Remote'
  description: Localized
  approved: boolean
}
export type OpportunityId = 'O01' | 'O02' | 'O03' | 'O04' | 'O05' | 'O06'
export type OpportunityType = 'job' | 'internship' | 'partTime' | 'freelance' | 'enterprise'
export interface Opportunity {
  id: OpportunityId
  title: Localized
  orgId: OrgId
  type: OpportunityType
  location: Localized
  workFormat: 'onsite' | 'hybrid' | 'remote'
  deadline: string
  skills: Localized[]
  evidence: Localized
  description: Localized
  status: 'open' | 'closed'
  /** Courses whose completion counts as matching evidence. */
  evidenceCourses: CourseId[]
}

export type ApplicationTrack = 'employment' | 'freelance' | 'enterprise'
export type EmploymentStage =
  | 'draft'
  | 'submitted'
  | 'underReview'
  | 'shortlisted'
  | 'interview'
  | 'offer'
  | 'hired'
export type FreelanceStage =
  | 'draft'
  | 'submitted'
  | 'clientDiscussion'
  | 'selected'
  | 'inDelivery'
  | 'completed'
export type EnterpriseStage =
  | 'draft'
  | 'submitted'
  | 'review'
  | 'accepted'
  | 'participating'
  | 'completed'
export type ApplicationStage =
  | EmploymentStage
  | FreelanceStage
  | EnterpriseStage
  | 'notSelected'
  | 'withdrawn'

export interface ApplicationEvent {
  stage: ApplicationStage
  at: string
  by: 'youth' | 'employer' | 'system'
  note?: string
}
export interface Application {
  id: string
  youthId: YouthId
  opportunityId: OpportunityId
  track: ApplicationTrack
  stage: ApplicationStage
  timeline: ApplicationEvent[]
  documents: { cv?: boolean; proposal?: boolean; businessConcept?: boolean; portfolio?: boolean }
  motivation?: string
  feedback?: string
}

// ---------------------------------------------------------------- outcomes and follow-up

export type OutcomeType = 'job' | 'internship' | 'freelanceSelected' | 'freelanceCompleted' | 'enterpriseAccepted'
export interface Outcome {
  id: string
  youthId: YouthId
  type: OutcomeType
  opportunityId?: OpportunityId
  date: string
  source: 'employer' | 'learnerReported'
  confirmed: boolean
}
export interface FollowUp {
  id: string
  youthId: YouthId
  window: 3 | 6 | 12
  due: string
  centreId: CentreId
  lastContact?: string
  status: 'due' | 'overdue' | 'learnerReported' | 'confirmed'
  record?: {
    employed: boolean
    workType?: string
    startDate?: string
    stillInRole?: boolean
    challenges?: string
    support?: string
  }
}

// ---------------------------------------------------------------- youth

export type YouthId =
  | 'Y001'
  | 'Y002'
  | 'Y003'
  | 'Y004'
  | 'Y005'
  | 'Y006'
  | 'Y007'

export type PointsReason =
  | 'profile'
  | 'assessment'
  | 'course'
  | 'practical'
  | 'attendance'
  | 'mentor'
  | 'mentorRefund'
  | 'seed'
export interface PointsEntry {
  /** Unique event key, e.g. 'course:C05'. A key is never awarded twice. */
  key: string
  reason: PointsReason
  amount: number
  at: string
  label: Localized
}

export type BadgeId = 'careerExplorer' | 'learningStarter' | 'jobReady' | 'enterpriseExplorer' | 'freelanceStarter'

export interface YouthProfile {
  name: string
  email: string
  phone?: string
  lang: Lang
  age: number
  gender: 'female' | 'male' | 'notDisclosed'
  governorate: Governorate
  education: string
  employmentStatus: string
  experience: string
  digitalAccess: string
  learningFormat: 'online' | 'centre' | 'blended'
  interests: string[]
  skills: string[]
  sectors: string[]
  availability: string
  /** Optional, never shown to employers. */
  support?: string
  disability?: 'yes' | 'no' | 'notDisclosed'
  consentProgramme: boolean
  consentEmployerVisible: boolean
  cvFile?: string
}

export interface Toolkit {
  cv?: {
    summary: string
    education: string
    experience: string[]
    projects: string
    skills: string
    languages: string
    includeCertificates: CourseId[]
  }
  interviews: { question: string; answer: string; rating: 'developing' | 'clear' | 'strong'; next: string; at: string }[]
  business?: {
    customer: string
    problem: string
    solution: string
    evidence: string
    model: string
    costs: string
    nextExperiment: string
    questions: string[]
  }
  freelanceProfile?: { services: string; samples: string; availability: string; assignments: string; pricing: string }
  proposals: { id: string; client: string; goal: string; experience: string; deliverables: string; timing: string; review: string; assumptions: string; fee: string }[]
  plan?: string
}

export interface Youth {
  id: YouthId
  profile: YouthProfile
  image: string
  profileComplete: boolean
  assessment?: AssessmentResult
  preferences?: Partial<Record<PreferenceKey, string>>
  route?: CareerRoute
  secondaryRoute?: CareerRoute
  pathGenerated: boolean
  /** Ordered course plan; optional courses can be reordered. */
  plan: CourseId[]
  cohortIds: CohortId[]
  /** Training application to a programme (trainer screening). */
  trainingApplication?: {
    programmeId: ProgrammeId
    status: 'pending' | 'needsInfo' | 'accepted' | 'waitlisted' | 'notSelected'
    at: string
  }
  progress: Partial<Record<CourseId, CourseProgress>>
  attendance: Partial<Record<SessionId, AttendanceMark>>
  points: PointsEntry[]
  /** Point events already counted inside a seeded opening balance (never awarded again). */
  seededKeys: string[]
  badges: BadgeId[]
  toolkit: Toolkit
  eventRegistrations: SessionId[]
  /** Private notes: only learner and authorised support views. */
  coachingNotes: string[]
  graduated?: string
  supportFlag?: string
}

// ---------------------------------------------------------------- community

export interface CommunityPost {
  id: string
  groupId: 'career' | 'jobSearch' | 'enterprise' | 'freelance' | CohortId
  author: Localized
  body: Localized
  at: string
  replies: { author: Localized; body: Localized; at: string }[]
  reported?: boolean
}

// ---------------------------------------------------------------- analytics (historical)

/**
 * One synthetic partition row of the historical dataset (snapshot 1 Nov 2026).
 * Rows are disjoint, so summing any filtered set of rows never double counts.
 */
export interface AnalyticsRow {
  partnerId: PartnerId
  centreId: CentreId
  governorate: Governorate
  programmeId: ProgrammeId
  route: CareerRoute
  gender: 'female' | 'male'
  ageGroup: '18-20' | '21-22' | '23-24'
  disability: 'yes' | 'no' | 'notDisclosed'
  registered: number
  active: number
  enrolments: number
  completedEnrolments: number
  graduates: number
  guided: number
  jobStarts: number
  internships: number
  /** Youth with both a job start and an internship (for the unique count). */
  bothPlacements: number
  m3Eligible: number
  m3Responses: number
  m3Employed: number
  m6Eligible: number
  m6Responses: number
  m6Employed: number
  m12Eligible: number
  m12Responses: number
  m12Employed: number
  /** Sum of days graduation→first job, for placed graduates with both dates. */
  daysToJobSum: number
  retentionEligible: number
  retentionResponses: number
  retained: number
  freelanceCompleted: number
  freelanceEarners: number
  repeatClients: number
  businessConcepts: number
  customerTests: number
  clinicAcceptances: number
  firstSales: number
}

export interface Prefs {
  lang: Lang
  reducedMotion: boolean
}
