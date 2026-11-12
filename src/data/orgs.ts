import type { Centre, Cohort, CohortId, CourseId, Partner, Programme, Trainer } from '@shared/types'
import { L } from './l'

// Brief §18 and §21: UNICEF Syria oversees; governorate is a filter, not an owner.
export const PARTNERS: Partner[] = [
  { id: 'P01', name: L('Demo Youth Development Partner', 'شريك تنمية الشباب التجريبي'), centreIds: ['T01', 'T03'] },
  { id: 'P02', name: L('Demo Skills Partner', 'شريك المهارات التجريبي'), centreIds: ['T02'] },
]

export const CENTRES: Centre[] = [
  { id: 'T01', name: L('Demo Damascus Training Centre', 'مركز دمشق التدريبي التجريبي'), governorate: 'Damascus', partnerId: 'P01', image: 'images/generated/centre-damascus.webp' },
  { id: 'T02', name: L('Demo Aleppo Training Centre', 'مركز حلب التدريبي التجريبي'), governorate: 'Aleppo', partnerId: 'P02', image: 'images/generated/centre-aleppo.webp' },
  { id: 'T03', name: L('Demo Homs Training Centre', 'مركز حمص التدريبي التجريبي'), governorate: 'Homs', partnerId: 'P01', image: 'images/generated/centre-homs.webp' },
]

export const PROGRAMMES: Programme[] = [
  { id: 'PR01', name: L('Employment Readiness', 'الجاهزية للتوظيف'), route: 'employment' },
  { id: 'PR02', name: L('Enterprise Launch', 'إطلاق المشاريع'), route: 'enterprise' },
  { id: 'PR03', name: L('Freelance Starter', 'بداية العمل الحر'), route: 'freelance' },
]

export const COHORTS: Cohort[] = [
  { id: 'K01', name: L('K01 Employment Readiness Damascus', 'K01 الجاهزية للتوظيف دمشق'), programmeId: 'PR01', centreId: 'T01', trainerId: 'TR01', size: 24 },
  { id: 'K02', name: L('K02 Enterprise Launch Aleppo', 'K02 إطلاق المشاريع حلب'), programmeId: 'PR02', centreId: 'T02', trainerId: 'TR02', size: 18 },
  { id: 'K03', name: L('K03 Freelance Starter Homs', 'K03 بداية العمل الحر حمص'), programmeId: 'PR03', centreId: 'T03', trainerId: 'TR03', size: 20 },
]

export const TRAINERS: Trainer[] = [
  { id: 'TR01', name: L('Rania Haddad', 'رانيا حداد'), cohortIds: ['K01'], mentorId: 'M01' },
  { id: 'TR02', name: L('Samer Khalil', 'سامر خليل'), cohortIds: ['K02'], mentorId: 'M02' },
  { id: 'TR03', name: L('Maya Darwish', 'مايا درويش'), cohortIds: ['K03'], mentorId: 'M03' },
]

export const ORGANISATIONS = [
  { id: 'ORG01', name: L('Demo Services Company', 'شركة الخدمات التجريبية'), sector: L('Customer services', 'خدمة العملاء'), governorate: 'Damascus', description: L('A fictional services company hiring customer-facing staff.', 'شركة خدمات وهمية توظف موظفين للتعامل مع العملاء.'), approved: true },
  { id: 'ORG02', name: L('Demo Community Services', 'الخدمات المجتمعية التجريبية'), sector: L('Community services', 'خدمات مجتمعية'), governorate: 'Damascus', description: L('A fictional community organisation offering office internships.', 'منظمة مجتمعية وهمية تقدم تدريباً مكتبياً.'), approved: true },
  { id: 'ORG03', name: L('Demo Training Services', 'خدمات التدريب التجريبية'), sector: L('Education and training', 'التعليم والتدريب'), governorate: 'Homs', description: L('A fictional training provider needing part-time administration help.', 'مزود تدريب وهمي يحتاج مساعدة إدارية بدوام جزئي.'), approved: true },
  { id: 'ORG04', name: L('Demo Local Retailer', 'متجر التجزئة المحلي التجريبي'), sector: L('Retail', 'التجزئة'), governorate: 'Remote', description: L('A fictional local shop looking for freelance social media content.', 'متجر محلي وهمي يبحث عن محتوى مستقل لوسائل التواصل.'), approved: true },
  { id: 'ORG05', name: L('Demo Business Support', 'دعم الأعمال التجريبي'), sector: L('Business services', 'خدمات الأعمال'), governorate: 'Remote', description: L('A fictional business-support firm posting short spreadsheet assignments.', 'شركة دعم أعمال وهمية تنشر مهام قصيرة على جداول البيانات.'), approved: false },
  { id: 'ORG06', name: L('Demo Enterprise Hub', 'مركز المشاريع التجريبي'), sector: L('Enterprise support', 'دعم المشاريع'), governorate: 'Aleppo', description: L('A fictional enterprise-support host running idea development clinics. No funding is offered.', 'جهة دعم مشاريع وهمية تدير عيادات تطوير الأفكار. لا يوجد تمويل.'), approved: true },
] as const satisfies readonly import('@shared/types').Organisation[]

/** Courses delivered inside each cohort programme: practical reviewed by the trainer and
 * certificate approved by the centre (brief §17 T05). Other courses issue automatically. */
export const COHORT_COURSES: Record<CohortId, CourseId[]> = {
  K01: ['C05', 'C13'],
  K02: ['C07', 'C08'],
  K03: ['C11', 'C15'],
}
