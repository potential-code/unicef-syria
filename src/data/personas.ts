import type { Persona } from '@shared/types'
import { L } from './l'

// One list drives both the sign-in profile cards and the presenter role switcher.
export const PERSONAS: Persona[] = [
  { id: 'Y001', role: 'youth', youthId: 'Y001', name: L('Nour Hassan', 'نور حسن'), title: L('Youth · Full-time employment', 'شابة · وظيفة بدوام كامل'), scope: L('Damascus · cohort K01', 'دمشق · المجموعة K01'), image: 'images/generated/youth-nour.webp' },
  { id: 'Y002', role: 'youth', youthId: 'Y002', name: L('Omar Khalil', 'عمر خليل'), title: L('Youth · Entrepreneurship', 'شاب · ريادة الأعمال'), scope: L('Aleppo · cohort K02', 'حلب · المجموعة K02'), image: 'images/generated/youth-omar.webp' },
  { id: 'Y003', role: 'youth', youthId: 'Y003', name: L('Lina Saleh', 'لينا صالح'), title: L('Youth · Freelancing', 'شابة · العمل الحر'), scope: L('Homs · cohort K03', 'حمص · المجموعة K03'), image: 'images/generated/youth-lina.webp' },
  { id: 'TR01', role: 'trainer', trainerId: 'TR01', name: L('Rania Haddad', 'رانيا حداد'), title: L('Trainer', 'مدربة'), scope: L('Assigned cohort K01 only', 'المجموعة K01 فقط'), image: 'images/generated/mentor-rania.webp' },
  { id: 'TR02', role: 'trainer', trainerId: 'TR02', name: L('Samer Khalil', 'سامر خليل'), title: L('Trainer', 'مدرب'), scope: L('Assigned cohort K02 only', 'المجموعة K02 فقط'), image: 'images/generated/mentor-samer.webp' },
  { id: 'TR03', role: 'trainer', trainerId: 'TR03', name: L('Maya Darwish', 'مايا درويش'), title: L('Trainer', 'مدربة'), scope: L('Assigned cohort K03 only', 'المجموعة K03 فقط'), image: 'images/generated/mentor-maya.webp' },
  { id: 'EM01', role: 'employer', orgId: 'ORG01', name: L('Karim Aziz', 'كريم عزيز'), title: L('Employer · Demo Services Company', 'صاحب عمل · شركة الخدمات التجريبية'), scope: L('Own organisation only', 'منظمته فقط'), image: 'images/generated/persona-employer.webp' },
  { id: 'EM02', role: 'employer', orgId: 'ORG04', name: L('Hala Youssef', 'هالة يوسف'), title: L('Client · Demo Local Retailer', 'عميلة · متجر التجزئة المحلي التجريبي'), scope: L('Own organisation only', 'منظمتها فقط'), image: 'images/generated/persona-hub.webp' },
  { id: 'CA01', role: 'centre', centreId: 'T01', name: L('Salma Ibrahim', 'سلمى إبراهيم'), title: L('Centre administrator', 'مديرة مركز'), scope: L('Demo Damascus Training Centre only', 'مركز دمشق التدريبي التجريبي فقط'), image: 'images/generated/persona-centre.webp' },
  { id: 'PA01', role: 'partner', partnerId: 'P01', name: L('Fadi Mourad', 'فادي مراد'), title: L('Partner administrator', 'مدير الشريك'), scope: L('Demo Youth Development Partner: Damascus and Homs', 'شريك تنمية الشباب التجريبي: دمشق وحمص'), image: 'images/generated/persona-partner.webp' },
  { id: 'UA01', role: 'unicef', name: L('Leila Najjar', 'ليلى نجار'), title: L('UNICEF administrator', 'مسؤولة في اليونيسف'), scope: L('National oversight', 'إشراف وطني'), image: 'images/generated/persona-unicef.webp' },
  { id: 'RV01', role: 'viewer', name: L('Bassam Haddad', 'بسام حداد'), title: L('Reporting viewer (optional role)', 'مطّلع على التقارير (دور اختياري)'), scope: L('Read-only aggregate reports', 'تقارير مجمّعة للقراءة فقط'), image: 'images/generated/persona-viewer.webp' },
]

export const PERSONA_BY_ID = Object.fromEntries(PERSONAS.map((p) => [p.id, p])) as Record<
  Persona['id'],
  Persona
>
