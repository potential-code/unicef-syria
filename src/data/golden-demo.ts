import type { Localized, PersonaId } from '@shared/types'
import { L } from './l'

export interface GuideStep {
  persona: PersonaId | null
  to: string
  title: Localized
  hint: Localized
  /** Reset the demo before this step (the start of the story). */
  reset?: boolean
}

/**
 * The golden demo: the brief's main story (§23) told through the seven golden profiles.
 * Each step signs in as the right person and opens the exact page.
 */
export const GOLDEN_DEMO: GuideStep[] = [
  {
    persona: null,
    to: '/',
    reset: true,
    title: L('Homepage', 'الصفحة الرئيسية'),
    hint: L(
      'Show the three routes and the journey, then click "Start my journey".',
      'اعرض المسارات الثلاثة والرحلة، ثم انقر "ابدأ رحلتي".',
    ),
  },
  {
    persona: null,
    to: '/register',
    title: L('Nour registers', 'نور تسجّل'),
    hint: L(
      'Click "Use Nour\'s sample details", go through the steps and finish.',
      'انقر "استخدم بيانات نور النموذجية"، وتابع الخطوات حتى النهاية.',
    ),
  },
  {
    persona: 'Y001',
    to: '/youth/discovery',
    title: L('Career discovery', 'استكشاف المسار المهني'),
    hint: L(
      'On the intro screen click "Use preset answers", then "Submit and see results".',
      'في شاشة البداية انقر "استخدام الإجابات الجاهزة"، ثم "أرسل واعرض النتائج".',
    ),
  },
  {
    persona: 'Y001',
    to: '/youth/discovery/results',
    title: L('Results and route', 'النتائج والمسار'),
    hint: L(
      'Show "People-focused coordinator", answer the three preferences and choose Full-time employment.',
      'اعرض "المنسّق المهتم بالناس"، أجب عن التفضيلات الثلاثة واختر الوظيفة بدوام كامل.',
    ),
  },
  {
    persona: 'Y001',
    to: '/youth/path',
    title: L('Learning path', 'المسار التعليمي'),
    hint: L(
      'Explain why C03, C05 and C13 are recommended.',
      'اشرح سبب التوصية بالدورات C03 وC05 وC13.',
    ),
  },
  {
    persona: 'Y001',
    to: '/youth/coaches/cv',
    title: L('AI CV coach', 'مدرّب السيرة الذاتية الذكي'),
    hint: L(
      '"Improve this CV bullet", tick "reviewed" and save the honest bullet to the CV.',
      '"حسّن هذا البند"، أكّد المراجعة واحفظ البند في السيرة الذاتية.',
    ),
  },
  {
    persona: 'TR01',
    to: '/trainer/applications',
    title: L('Rania accepts Nour', 'رانيا تقبل نور'),
    hint: L(
      "Open Nour's pending application, Accept, then assign to K01.",
      'افتح طلب نور المعلّق، اقبله، ثم عيّنها في المجموعة K01.',
    ),
  },
  {
    persona: 'Y001',
    to: '/youth/learn/C03/quiz',
    title: L('Nour completes courses', 'نور تكمل الدورات'),
    hint: L(
      '"Complete this course (demo)" on C03, then on C05. Points go up; C05 waits for trainer review.',
      'انقر "أكمل هذه الدورة (عرض)" في C03 ثم C05. ترتفع النقاط؛ وC05 بانتظار مراجعة المدرّبة.',
    ),
  },
  {
    persona: 'TR01',
    to: '/trainer/assessments',
    title: L('Rania grades and recommends', 'رانيا تقيّم وتوصي'),
    hint: L(
      "Review Nour's C05 practical (score 4/6 or more, approve), mark S02 attendance, then Recommend in Results.",
      'راجعي المهمة العملية C05 لنور (4/6 أو أكثر واعتمدي)، سجّلي حضور S02، ثم أوصي بها في النتائج.',
    ),
  },
  {
    persona: 'CA01',
    to: '/centre/results',
    title: L('Salma issues the certificate', 'سلمى تصدر الشهادة'),
    hint: L("Approve, then Issue Nour's C05 certificate.", 'اعتمدي ثم أصدري شهادة C05 لنور.'),
  },
  {
    persona: 'Y001',
    to: '/youth/mentors/M01',
    title: L('Mentor and interview practice', 'الإرشاد والتدرّب على المقابلة'),
    hint: L(
      'Book Rania (included in the programme), then practise an interview in the Career Toolkit.',
      'احجز جلسة مع رانيا (ضمن البرنامج)، ثم تدرّب على مقابلة في أدوات المسار المهني.',
    ),
  },
  {
    persona: 'Y001',
    to: '/youth/opportunities/O01',
    title: L('Apply to O01', 'التقديم إلى O01'),
    hint: L(
      'Show the match explanation, add the CV and motivation answer, submit.',
      'اعرض شرح التطابق، أضف السيرة الذاتية وإجابة الدافع، ثم أرسل.',
    ),
  },
  {
    persona: 'EM01',
    to: '/employer/applications',
    title: L('Karim hires Nour', 'كريم يوظّف نور'),
    hint: L(
      "Open Nour's application: shortlist, record the interview, offer, confirm job start.",
      'افتح طلب نور: القائمة المختصرة، المقابلة، العرض، ثم تأكيد بدء العمل.',
    ),
  },
  {
    persona: 'Y001',
    to: '/youth/applications',
    title: L('Nour sees "Hired"', 'نور ترى "تم التوظيف"'),
    hint: L('Open the O01 application timeline.', 'افتح الجدول الزمني لطلب O01.'),
  },
  {
    persona: 'PA01',
    to: '/partner',
    title: L('Fadi: partner view', 'فادي: عرض الشريك'),
    hint: L(
      'Compare Damascus and Homs centres; drill into a programme.',
      'قارن بين مركزي دمشق وحمص؛ وتعمّق في أحد البرامج.',
    ),
  },
  {
    persona: 'UA01',
    to: '/unicef',
    title: L('Leila: national view', 'ليلى: النظرة الوطنية'),
    hint: L(
      'Live cohort activity vs historical outcomes, then Follow-up.',
      'نشاط المجموعات الحالي مقابل النتائج السابقة، ثم المتابعة.',
    ),
  },
  {
    persona: 'RV01',
    to: '/viewer',
    title: L('Bassam: read-only reports', 'بسام: تقارير للقراءة فقط'),
    hint: L(
      'Aggregate figures only; no individual records (optional role).',
      'أرقام مجمّعة فقط؛ دون سجلات فردية (دور اختياري).',
    ),
  },
]
