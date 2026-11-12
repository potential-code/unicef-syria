import type {
  BadgeId,
  CareerRoute,
  CourseCategory,
  CourseId,
  Dimension,
  SessionId,
} from '@shared/types'
import {
  Briefcase,
  Compass,
  GraduationCap,
  Laptop,
  Lightbulb,
  type LucideIcon,
  Rocket,
  Star,
  Wrench,
} from 'lucide-react'

/** Visual identity per career route (youth screens: colour blocks). */
export const ROUTE_META: Record<
  CareerRoute,
  { icon: LucideIcon; block: string; soft: string; ring: string }
> = {
  employment: {
    icon: Briefcase,
    block: 'bg-blue text-white',
    soft: 'bg-blue-50 text-navy',
    ring: 'ring-blue',
  },
  enterprise: {
    icon: Rocket,
    block: 'bg-yellow text-ink',
    soft: 'bg-notice-soft text-notice',
    ring: 'ring-yellow',
  },
  freelance: {
    icon: Laptop,
    block: 'bg-cyan text-ink',
    soft: 'bg-sky-100 text-navy',
    ring: 'ring-cyan',
  },
}
export const ROUTES: CareerRoute[] = ['employment', 'enterprise', 'freelance']

/** Dimension bar colours (always paired with the text label and value). */
export const DIMENSION_TONE: Record<Dimension, string> = {
  P: 'bg-orange',
  C: 'bg-cyan',
  I: 'bg-yellow',
  O: 'bg-blue',
}
export const DIMENSIONS: Dimension[] = ['P', 'C', 'I', 'O']

export const CATEGORY_ORDER: CourseCategory[] = [
  'foundations',
  'employment',
  'entrepreneurship',
  'freelancing',
  'technical',
]
export const CATEGORY_META: Record<
  CourseCategory,
  { icon: LucideIcon; chip: string; block: string }
> = {
  foundations: { icon: Compass, chip: 'bg-navy text-white', block: 'bg-navy' },
  employment: { icon: Briefcase, chip: 'bg-blue text-white', block: 'bg-blue' },
  entrepreneurship: { icon: Lightbulb, chip: 'bg-yellow text-ink', block: 'bg-yellow' },
  freelancing: { icon: Laptop, chip: 'bg-cyan text-ink', block: 'bg-cyan' },
  technical: { icon: Wrench, chip: 'bg-orange text-white', block: 'bg-orange' },
}

/** Courses with full English lessons (Arabic summaries); the rest are bilingual summaries. */
export const FULL_LESSON_COURSES: CourseId[] = ['C05', 'C07', 'C11']

/** Where a cohort session sits in the learning path (after the related course). */
export const SESSION_AFTER: Partial<Record<SessionId, CourseId>> = {
  S01: 'C01',
  S02: 'C03',
  S03: 'C05',
  S04: 'C07',
  S05: 'C08',
  S06: 'C16',
  S07: 'C11',
  S08: 'C11',
  S09: 'C12',
}

export const BADGES: { id: BadgeId; icon: LucideIcon; tone: string }[] = [
  { id: 'careerExplorer', icon: Compass, tone: 'bg-cyan text-ink' },
  { id: 'learningStarter', icon: GraduationCap, tone: 'bg-blue text-white' },
  { id: 'jobReady', icon: Briefcase, tone: 'bg-navy text-white' },
  { id: 'enterpriseExplorer', icon: Rocket, tone: 'bg-yellow text-ink' },
  { id: 'freelanceStarter', icon: Star, tone: 'bg-orange text-white' },
]

/** Points rules table rows (amounts come from domain/points POINTS). */
export const POINT_RULES = [
  'profile',
  'assessment',
  'course',
  'practical',
  'attendance',
  'mentor',
] as const

/** External youth routes owned by the career area (linked by path only). */
export const CAREER_LINKS = {
  opportunities: '/youth/opportunities',
  mentors: '/youth/mentors',
  cohort: '/youth/cohort',
  toolkit: '/youth/toolkit',
  coaches: '/youth/coaches',
} as const satisfies Record<string, string>

export const DURATION_BUCKETS = ['short', 'medium', 'long'] as const
export type DurationBucket = (typeof DURATION_BUCKETS)[number]
export function durationBucket(minutes: number): DurationBucket {
  if (minutes <= 35) return 'short'
  if (minutes <= 40) return 'medium'
  return 'long'
}

/** Presenter: demo youth with preset answers. Other youth fall back to Nour's preset. */
export const PRESET_FALLBACK = 'Y001' as const
