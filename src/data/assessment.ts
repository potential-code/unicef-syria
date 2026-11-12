import type { AssessmentQuestion, Dimension, PreferenceQuestion } from '@shared/types'
import { L } from './l'

// Brief §3–4. Illustrative scenario exercise, not a validated psychometric instrument.
// Option order is always P, C, I, O; each option awards 2 points to its dimension.
const q = (
  id: number,
  prompt: [string, string],
  p: [string, string],
  c: [string, string],
  i: [string, string],
  o: [string, string],
): AssessmentQuestion => ({
  id,
  prompt: L(...prompt),
  options: [
    { dimension: 'P', text: L(...p) },
    { dimension: 'C', text: L(...c) },
    { dimension: 'I', text: L(...i) },
    { dimension: 'O', text: L(...o) },
  ],
})

export const QUESTIONS: AssessmentQuestion[] = [
  q(
    1,
    [
      'A training project is falling behind. What do you do first?',
      'مشروع تدريبي متأخر عن موعده. ماذا تفعل أولاً؟',
    ],
    ['Fix the task causing the delay.', 'أصلح المهمة التي تسبب التأخير.'],
    ['Ask the group what support they need.', 'أسأل المجموعة عن الدعم الذي تحتاجه.'],
    ['Suggest a new approach to the project.', 'أقترح طريقة جديدة للمشروع.'],
    ['Break the remaining work into a schedule.', 'أقسّم العمل المتبقي إلى جدول زمني.'],
  ),
  q(
    2,
    [
      'A local business wants to improve its service. What interests you most?',
      'نشاط تجاري محلي يريد تحسين خدمته. ما الذي يهمك أكثر؟',
    ],
    ['Finding a practical tool that solves the problem.', 'إيجاد أداة عملية تحل المشكلة.'],
    ['Talking to customers about their experience.', 'التحدث مع العملاء عن تجربتهم.'],
    ['Designing a new service people would buy.', 'تصميم خدمة جديدة قد يشتريها الناس.'],
    ['Improving the daily process and records.', 'تحسين الإجراءات اليومية والسجلات.'],
  ),
  q(
    3,
    [
      'You are asked to help run a community event. Which task do you choose?',
      'طُلب منك المساعدة في تنظيم فعالية مجتمعية. أي مهمة تختار؟',
    ],
    ['Set up equipment and troubleshoot.', 'تجهيز المعدات وحل المشكلات.'],
    ['Welcome participants and answer questions.', 'استقبال المشاركين والإجابة عن أسئلتهم.'],
    ['Create a new activity and attract interest.', 'ابتكار نشاط جديد وجذب الاهتمام.'],
    ['Coordinate bookings and the timetable.', 'تنسيق الحجوزات والجدول الزمني.'],
  ),
  q(
    4,
    [
      'You have a free afternoon to learn something. What do you choose?',
      'لديك فترة بعد الظهر للتعلم. ماذا تختار؟',
    ],
    ['Practise a hands-on technical skill.', 'التدرب على مهارة تقنية عملية.'],
    ['Join a group discussion or presentation workshop.', 'المشاركة في نقاش جماعي أو ورشة عرض.'],
    ['Test an idea for a service.', 'تجربة فكرة لخدمة.'],
    ['Learn a tool for planning or handling data.', 'تعلم أداة للتخطيط أو التعامل مع البيانات.'],
  ),
  q(
    5,
    [
      'A customer explains an unclear request. What is your first step?',
      'عميل يشرح طلباً غير واضح. ما خطوتك الأولى؟',
    ],
    ['Build a small example to check what works.', 'أصنع مثالاً صغيراً لأتحقق مما ينجح.'],
    ['Ask questions and listen to their priorities.', 'أطرح الأسئلة وأستمع إلى أولوياته.'],
    ['Offer several creative possibilities.', 'أقدم عدة احتمالات إبداعية.'],
    ['Write down the requirements and constraints.', 'أدوّن المتطلبات والقيود.'],
  ),
  q(
    6,
    [
      'Your group receives a small project budget. What do you enjoy doing?',
      'حصلت مجموعتك على ميزانية صغيرة لمشروع. ما الذي تستمتع بفعله؟',
    ],
    ['Choose the tools and materials.', 'اختيار الأدوات والمواد.'],
    ['Agree responsibilities with the team.', 'الاتفاق على المسؤوليات مع الفريق.'],
    ['Find a way to create extra value.', 'إيجاد طريقة لخلق قيمة إضافية.'],
    ['Track costs and deadlines.', 'متابعة التكاليف والمواعيد النهائية.'],
  ),
  q(
    7,
    [
      'You receive feedback that your work needs improvement. What helps you most?',
      'تلقيت ملاحظة بأن عملك يحتاج إلى تحسين. ما الذي يساعدك أكثر؟',
    ],
    ['A practical demonstration and another attempt.', 'عرض عملي ومحاولة أخرى.'],
    ['A conversation to understand the feedback.', 'حوار لفهم الملاحظات.'],
    ['Freedom to try a different solution.', 'حرية تجربة حل مختلف.'],
    ['A clear checklist of improvements.', 'قائمة واضحة بالتحسينات.'],
  ),
  q(
    8,
    [
      'A new opportunity has an unfamiliar task. What appeals to you?',
      'فرصة جديدة فيها مهمة غير مألوفة. ما الذي يجذبك؟',
    ],
    ['Learning how to do the technical work.', 'تعلم كيفية أداء العمل التقني.'],
    ['Working with new people.', 'العمل مع أشخاص جدد.'],
    ['Exploring what the opportunity could become.', 'استكشاف ما يمكن أن تصبح عليه الفرصة.'],
    ['Understanding the process and delivering reliably.', 'فهم الإجراءات والتسليم بموثوقية.'],
  ),
  q(
    9,
    [
      'A team disagrees about a solution. What role do you naturally take?',
      'الفريق مختلف حول حل ما. ما الدور الذي تأخذه عادة؟',
    ],
    ['Test the options against the actual problem.', 'أختبر الخيارات مقابل المشكلة الفعلية.'],
    ['Help people hear each other’s views.', 'أساعد الآخرين على سماع آراء بعضهم.'],
    ['Suggest a fresh option.', 'أقترح خياراً جديداً.'],
    ['Compare options against agreed criteria.', 'أقارن الخيارات وفق معايير متفق عليها.'],
  ),
  q(
    10,
    ['You are proudest after completing which task?', 'بعد إنجاز أي مهمة تشعر بالفخر أكثر؟'],
    ['Repairing or creating something useful.', 'إصلاح أو صنع شيء مفيد.'],
    ['Helping a person or team succeed.', 'مساعدة شخص أو فريق على النجاح.'],
    ['Turning an idea into an opportunity.', 'تحويل فكرة إلى فرصة.'],
    ['Delivering accurate work on time.', 'تسليم عمل دقيق في الوقت المحدد.'],
  ),
  q(
    11,
    [
      'A freelance client changes the request. What do you focus on first?',
      'عميل في العمل الحر غيّر طلبه. على ماذا تركز أولاً؟',
    ],
    ['Check what is technically possible.', 'أتحقق مما هو ممكن تقنياً.'],
    ['Clarify the client’s priorities.', 'أوضح أولويات العميل.'],
    ['Explore an improved solution.', 'أستكشف حلاً أفضل.'],
    ['Agree the revised scope and timeline.', 'أتفق على النطاق والجدول الزمني المعدّلين.'],
  ),
  q(
    12,
    [
      'You are planning your next learning step. What draws your attention?',
      'تخطط لخطوتك التعليمية التالية. ما الذي يلفت انتباهك؟',
    ],
    ['A technical skill I can practise.', 'مهارة تقنية يمكنني التدرب عليها.'],
    ['A role involving service or teamwork.', 'دور يتضمن الخدمة أو العمل الجماعي.'],
    ['An opportunity to create my own service.', 'فرصة لإنشاء خدمتي الخاصة.'],
    ['A role involving coordination and reliable delivery.', 'دور يتضمن التنسيق والتسليم الموثوق.'],
  ),
]

export const DIMENSION_LABELS: Record<Dimension, ReturnType<typeof L>> = {
  P: L('Practical problem solving', 'حل المشكلات العملية'),
  C: L('Communication and collaboration', 'التواصل والتعاون'),
  I: L('Initiative and enterprise', 'المبادرة وروح الريادة'),
  O: L('Organisation and delivery', 'التنظيم والإنجاز'),
}

/** Profile names for the strongest two dimensions (order-insensitive key, e.g. 'CO'). */
export const PROFILE_NAMES: Record<string, ReturnType<typeof L>> = {
  OP: L('Practical organiser', 'المنظّم العملي'),
  CO: L('People-focused coordinator', 'المنسّق المهتم بالناس'),
  CI: L('Enterprising communicator', 'المتواصل الريادي'),
  CP: L('Hands-on helper', 'المساعد العملي'),
  IP: L('Practical innovator', 'المبتكر العملي'),
  IO: L('Enterprising planner', 'المخطط الريادي'),
}

export const PROFILE_EXPLANATIONS: Record<string, ReturnType<typeof L>> = {
  OP: L(
    'You like fixing real problems and keeping work on track.',
    'تحب حل المشكلات الحقيقية والحفاظ على سير العمل.',
  ),
  CO: L('You enjoy helping people and organising work.', 'تستمتع بمساعدة الناس وتنظيم العمل.'),
  CI: L(
    'You enjoy new ideas and talking with people about them.',
    'تستمتع بالأفكار الجديدة والتحدث مع الناس عنها.',
  ),
  CP: L(
    'You like hands-on tasks that help other people.',
    'تحب المهام العملية التي تساعد الآخرين.',
  ),
  IP: L(
    'You like building practical things and trying new ways.',
    'تحب صنع أشياء عملية وتجربة طرق جديدة.',
  ),
  IO: L(
    'You like new opportunities and a clear plan to reach them.',
    'تحب الفرص الجديدة وخطة واضحة للوصول إليها.',
  ),
}

export const PREFERENCE_QUESTIONS: PreferenceQuestion[] = [
  {
    key: 'earningModel',
    prompt: L('How would you most like to earn?', 'كيف تفضل أن تكسب دخلك؟'),
    options: [
      {
        value: 'salary',
        label: L('A regular job with a salary', 'وظيفة منتظمة براتب'),
        route: 'employment',
      },
      {
        value: 'business',
        label: L('Building my own business', 'بناء مشروعي الخاص'),
        route: 'enterprise',
      },
      {
        value: 'projects',
        label: L('Projects or part-time work for clients', 'مشاريع أو عمل بدوام جزئي للعملاء'),
        route: 'freelance',
      },
    ],
  },
  {
    key: 'environment',
    prompt: L('Where would you like to work?', 'أين تفضل أن تعمل؟'),
    options: [
      { value: 'team', label: L('In a team at a workplace', 'ضمن فريق في مكان عمل') },
      { value: 'own', label: L('Running my own space', 'في مساحتي الخاصة') },
      { value: 'flexible', label: L('Flexible, often remote', 'بمرونة، غالباً عن بعد') },
    ],
  },
  {
    key: 'priority',
    prompt: L('What matters most to you right now?', 'ما الأهم بالنسبة لك الآن؟'),
    options: [
      { value: 'stability', label: L('Stable income soon', 'دخل مستقر قريباً') },
      { value: 'independence', label: L('Independence and growth', 'الاستقلالية والنمو') },
      { value: 'flexibility', label: L('Flexibility with my time', 'المرونة في وقتي') },
    ],
  },
]

/** Preset answers for the presenter shortcut (match each demo youth's seeded scores). */
export const PRESET_ANSWERS: Record<'Y001' | 'Y002' | 'Y003', Dimension[]> = {
  // C12 O8 P2 I2
  Y001: ['C', 'C', 'C', 'O', 'C', 'O', 'C', 'O', 'C', 'P', 'O', 'I'],
  // I12 C8 P2 O2
  Y002: ['I', 'C', 'I', 'C', 'I', 'C', 'I', 'C', 'I', 'P', 'I', 'O'],
  // I8 C8 P4 O4
  Y003: ['I', 'C', 'I', 'C', 'I', 'C', 'P', 'C', 'I', 'P', 'O', 'O'],
}
