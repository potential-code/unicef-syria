import type { Mentor } from '@shared/types'
import { L } from './l'

// Brief §13. Fictional personas; every card says "Sample mentor profile".
const at = (d: string, t: string) => `2026-${d}T${t}:00+03:00`

export const MENTORS: Mentor[] = [
  {
    id: 'M01',
    name: L('Rania Haddad', 'رانيا حداد'),
    title: L('Career Readiness Mentor', 'مرشدة الجاهزية المهنية'),
    focus: L('Employment, CVs, interviews', 'التوظيف، السير الذاتية، المقابلات'),
    languages: L('Arabic and English', 'العربية والإنجليزية'),
    slot: { start: at('11-23', '15:00'), end: at('11-23', '15:30') },
    cost: 100,
    image: 'images/generated/mentor-rania.webp',
    trainerId: 'TR01',
  },
  {
    id: 'M02',
    name: L('Samer Khalil', 'سامر خليل'),
    title: L('Entrepreneurship Mentor', 'مرشد ريادة الأعمال'),
    focus: L(
      'Customer discovery, business models, pitching',
      'اكتشاف العملاء، نماذج العمل، العروض',
    ),
    languages: L('Arabic and English', 'العربية والإنجليزية'),
    slot: { start: at('11-24', '14:00'), end: at('11-24', '14:30') },
    cost: 100,
    image: 'images/generated/mentor-samer.webp',
    trainerId: 'TR02',
  },
  {
    id: 'M03',
    name: L('Maya Darwish', 'مايا درويش'),
    title: L('Freelance Portfolio Mentor', 'مرشدة ملفات العمل الحر'),
    focus: L(
      'Digital portfolios, service offers, proposals',
      'ملفات الأعمال الرقمية، عروض الخدمات، المقترحات',
    ),
    languages: L('Arabic and English', 'العربية والإنجليزية'),
    slot: { start: at('11-25', '15:00'), end: at('11-25', '15:30') },
    cost: 100,
    image: 'images/generated/mentor-maya.webp',
    trainerId: 'TR03',
  },
  {
    id: 'M04',
    name: L('Dima Nasser', 'ديما ناصر'),
    title: L('Digital Workplace Mentor', 'مرشدة بيئة العمل الرقمية'),
    focus: L(
      'Digital confidence, office tools and work planning',
      'الثقة الرقمية، أدوات المكتب، تخطيط العمل',
    ),
    languages: L('Arabic', 'العربية'),
    slot: { start: at('11-26', '10:00'), end: at('11-26', '10:30') },
    cost: 100,
    image: 'images/generated/mentor-dima.webp',
  },
  {
    id: 'M05',
    name: L('Tarek Mansour', 'طارق منصور'),
    title: L('Employer Readiness Mentor', 'مرشد الجاهزية لسوق العمل'),
    focus: L(
      'Opportunity requirements, workplace expectations and applications',
      'متطلبات الفرص، توقعات بيئة العمل، الطلبات',
    ),
    languages: L('Arabic and English', 'العربية والإنجليزية'),
    slot: { start: at('11-26', '14:00'), end: at('11-26', '14:30') },
    cost: 100,
    image: 'images/generated/mentor-tarek.webp',
  },
]
