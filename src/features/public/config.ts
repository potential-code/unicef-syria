import type {
  CareerRoute,
  CentreId,
  CourseCategory,
  CourseId,
  Governorate,
  OpportunityType,
} from '@shared/types'
import {
  Briefcase,
  Compass,
  GraduationCap,
  HandHeart,
  Lightbulb,
  type LucideIcon,
  Rocket,
  Route,
  Wallet,
} from 'lucide-react'
import { CENTRES, COHORT_COURSES, COHORTS } from '@/data/orgs'

/** Three career routes on the homepage (brief §2 P01). Copy lives in i18n under home.routes.<id>. */
export const ROUTE_CARDS: {
  id: CareerRoute
  image: string
  icon: LucideIcon
  tone: string
  courses: CourseId[]
}[] = [
  {
    id: 'employment',
    image: 'images/generated/route-employment.webp',
    icon: Briefcase,
    tone: 'bg-cyan text-ink',
    courses: ['C03', 'C05', 'C13'],
  },
  {
    id: 'enterprise',
    image: 'images/generated/route-enterprise.webp',
    icon: Lightbulb,
    tone: 'bg-yellow text-ink',
    courses: ['C07', 'C08', 'C16'],
  },
  {
    id: 'freelance',
    image: 'images/generated/route-freelance.webp',
    icon: Rocket,
    tone: 'bg-orange text-white',
    courses: ['C10', 'C11', 'C15'],
  },
]

/** "How the journey works": discover → choose route → learn → get support → earn. */
export const JOURNEY_STEPS: { id: string; icon: LucideIcon; image: string }[] = [
  { id: 'discover', icon: Compass, image: 'images/generated/course-C01.webp' },
  { id: 'choose', icon: Route, image: 'images/generated/scene-learning.webp' },
  { id: 'learn', icon: GraduationCap, image: 'images/generated/course-C02.webp' },
  { id: 'support', icon: HandHeart, image: 'images/generated/scene-mentor.webp' },
  { id: 'earn', icon: Wallet, image: 'images/generated/band-employer.webp' },
]

export const FEATURED_COURSES: CourseId[] = ['C01', 'C05', 'C07', 'C11']

export const CATEGORIES: CourseCategory[] = [
  'foundations',
  'employment',
  'entrepreneurship',
  'freelancing',
  'technical',
]
export const ROUTES: CareerRoute[] = ['employment', 'enterprise', 'freelance']
export const GOVERNORATES: Governorate[] = ['Damascus', 'Aleppo', 'Homs']
export const LEVELS = ['beginner', 'intermediate'] as const

/** Courses a centre adds blended (centre-based) sessions to, through its cohort programme. */
export function blendedAt(centreId: CentreId): CourseId[] {
  return COHORTS.filter((k) => k.centreId === centreId).flatMap((k) => COHORT_COURSES[k.id])
}
export function centresOffering(courseId: CourseId): CentreId[] {
  return CENTRES.filter((c) => blendedAt(c.id).includes(courseId)).map((c) => c.id)
}

/** Opportunity tabs (brief §2 P02, §15). */
export const OPP_TABS: { id: 'jobs' | 'flexible' | 'enterprise'; types: OpportunityType[] }[] = [
  { id: 'jobs', types: ['job', 'internship'] },
  { id: 'flexible', types: ['partTime', 'freelance'] },
  { id: 'enterprise', types: ['enterprise'] },
]

/** Only internal paths are accepted as a post-registration return target. */
export function safeNext(v: unknown): string | undefined {
  return typeof v === 'string' && v.startsWith('/') && !v.startsWith('//') ? v : undefined
}

export interface ExploreSearch {
  route?: CareerRoute
  category?: CourseCategory
  delivery?: 'online' | 'blended'
  governorate?: Governorate
  centre?: CentreId
  level?: (typeof LEVELS)[number]
}
const pick = <T extends string>(v: unknown, allowed: readonly T[]): T | undefined =>
  allowed.includes(v as T) ? (v as T) : undefined

/** Catalogue filters live in the URL so the language toggle and back button keep them. */
export function validateExploreSearch(s: Record<string, unknown>): ExploreSearch {
  return {
    route: pick(s.route, ROUTES),
    category: pick(s.category, CATEGORIES),
    delivery: pick(s.delivery, ['online', 'blended'] as const),
    governorate: pick(s.governorate, GOVERNORATES),
    centre: pick(
      s.centre,
      CENTRES.map((c) => c.id),
    ),
    level: pick(s.level, LEVELS),
  }
}

export function validateOppSearch(s: Record<string, unknown>): { item?: string } {
  return { item: typeof s.item === 'string' && /^O\d{2}$/.test(s.item) ? s.item : undefined }
}
