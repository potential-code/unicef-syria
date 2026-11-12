import type { Governorate, Localized } from '@shared/types'
import { L } from './l'

// Brief §20: "Illustrative insights from sample platform opportunities and employer feedback".
// Not verified national labour-market intelligence.
export const LABOUR_LABEL = L(
  'Illustrative insights from sample platform opportunities and employer feedback',
  'رؤى توضيحية من فرص المنصة النموذجية وملاحظات أصحاب العمل',
)

export const VACANCY_RECORDS = 30
export const REVIEWED_CANDIDATES = 25

export const OCCUPATION_DEMAND: { occupation: Localized; vacancies: number }[] = [
  { occupation: L('Customer service assistant', 'مساعد خدمة عملاء'), vacancies: 9 },
  { occupation: L('Office support', 'دعم مكتبي'), vacancies: 6 },
  { occupation: L('Sales associate', 'مندوب مبيعات'), vacancies: 5 },
  { occupation: L('Digital content', 'محتوى رقمي'), vacancies: 4 },
  { occupation: L('Administration assistant', 'مساعد إداري'), vacancies: 4 },
  { occupation: L('Data entry', 'إدخال بيانات'), vacancies: 2 },
]

/** Skill appearances in the 30 sample vacancy records vs reviewed candidates with the module. */
export const SKILL_DEMAND: { skill: Localized; vacancies: number; candidatesReady: number; courseId: string }[] = [
  { skill: L('Customer communication', 'التواصل مع العملاء'), vacancies: 18, candidatesReady: 11, courseId: 'C03' },
  { skill: L('Spreadsheets', 'جداول البيانات'), vacancies: 12, candidatesReady: 6, courseId: 'C14' },
  { skill: L('Digital records', 'السجلات الرقمية'), vacancies: 10, candidatesReady: 9, courseId: 'C13' },
  { skill: L('Teamwork', 'العمل الجماعي'), vacancies: 9, candidatesReady: 14, courseId: 'C03' },
  { skill: L('Social media content', 'محتوى التواصل الاجتماعي'), vacancies: 5, candidatesReady: 4, courseId: 'C15' },
  { skill: L('Basic pricing and cash planning', 'التسعير والتخطيط النقدي'), vacancies: 3, candidatesReady: 2, courseId: 'C08' },
]

export const SKILL_GAPS: { sector: Localized; governorate: Governorate; gap: Localized; severity: 'high' | 'medium' | 'low' }[] = [
  { sector: L('Services', 'الخدمات'), governorate: 'Damascus', gap: L('Customer communication', 'التواصل مع العملاء'), severity: 'high' },
  { sector: L('Office and administration', 'المكاتب والإدارة'), governorate: 'Damascus', gap: L('Spreadsheets', 'جداول البيانات'), severity: 'high' },
  { sector: L('Retail', 'التجزئة'), governorate: 'Homs', gap: L('Digital content', 'المحتوى الرقمي'), severity: 'medium' },
  { sector: L('Repair services', 'خدمات الإصلاح'), governorate: 'Aleppo', gap: L('Booking and records', 'الحجوزات والسجلات'), severity: 'medium' },
  { sector: L('Education and training', 'التعليم والتدريب'), governorate: 'Homs', gap: L('Scheduling', 'الجدولة'), severity: 'low' },
]

/** Monthly sample vacancy postings and confirmed placements (historical dataset). */
export const MONTHLY_TRENDS: { month: string; vacancies: number; placements: number }[] = [
  { month: '2026-05', vacancies: 3, placements: 14 },
  { month: '2026-06', vacancies: 4, placements: 19 },
  { month: '2026-07', vacancies: 5, placements: 24 },
  { month: '2026-08', vacancies: 5, placements: 31 },
  { month: '2026-09', vacancies: 6, placements: 38 },
  { month: '2026-10', vacancies: 7, placements: 54 },
]
