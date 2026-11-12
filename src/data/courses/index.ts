import type { Course, CourseCategory, CourseId, Localized } from '@shared/types'
import { L } from '../l'
import { C01 } from './C01'
import { C02 } from './C02'
import { C03 } from './C03'
import { C04 } from './C04'
import { C05 } from './C05'
import { C06 } from './C06'
import { C07 } from './C07'
import { C08 } from './C08'
import { C09 } from './C09'
import { C10 } from './C10'
import { C11 } from './C11'
import { C12 } from './C12'
import { C13 } from './C13'
import { C14 } from './C14'
import { C15 } from './C15'
import { C16 } from './C16'

// Brief §6–10. Sixteen seeded courses, in catalogue order.
export const COURSES: Course[] = [
  C01,
  C02,
  C03,
  C04,
  C05,
  C06,
  C07,
  C08,
  C09,
  C10,
  C11,
  C12,
  C13,
  C14,
  C15,
  C16,
]

export const COURSE_BY_ID = Object.fromEntries(COURSES.map((c) => [c.id, c])) as Record<
  CourseId,
  Course
>

export const CATEGORY_LABELS: Record<CourseCategory, Localized> = {
  foundations: L('Career Foundations', 'أساسيات المسار المهني'),
  employment: L('Employment', 'التوظيف'),
  entrepreneurship: L('Entrepreneurship', 'ريادة الأعمال'),
  freelancing: L('Freelancing', 'العمل الحر'),
  technical: L('Technical Tasters', 'دورات تقنية تعريفية'),
}
