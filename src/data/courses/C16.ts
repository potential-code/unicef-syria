import type { Course } from '@shared/types'
import { L } from '../l'

// Brief §10. Enterprise route. Support opportunities are fictional.
export const C16: Course = {
  id: 'C16',
  title: L('Pitch Your Business and Find Support', 'اعرض مشروعك وابحث عن الدعم'),
  category: 'entrepreneurship',
  routes: ['enterprise'],
  minutes: 40,
  level: 'intermediate',
  delivery: 'self-paced',
  outcomes: [
    L('Structure a short pitch around customer, problem, solution and evidence', 'تبني عرضاً قصيراً حول العميل والمشكلة والحل والدليل'),
    L('Answer questions honestly using the evidence you have', 'تجيب عن الأسئلة بصدق بالاعتماد على ما لديك من أدلة'),
    L('Check eligibility and prepare a support application', 'تتحقق من الأهلية وتحضّر طلب دعم'),
  ],
  units: [
    { id: 'C16-U1', title: L('Structure your pitch', 'نظّم عرضك'), synopsis: L('Explain the customer, problem, solution and evidence.', 'وضّح العميل والمشكلة والحل والدليل.') },
    { id: 'C16-U2', title: L('Explain the business model', 'اشرح نموذج العمل'), synopsis: L('Describe how the idea could sustain itself.', 'صِف كيف يمكن للفكرة أن تستمر بمواردها.') },
    { id: 'C16-U3', title: L('Prepare for questions', 'استعد للأسئلة'), synopsis: L('Recognise assumptions and answer with available evidence.', 'تعرّف على افتراضاتك وأجب بالأدلة المتاحة.') },
    { id: 'C16-U4', title: L('Choose a support opportunity', 'اختر فرصة دعم'), synopsis: L('Review programme eligibility and prepare a relevant application.', 'راجع شروط الأهلية للبرنامج وحضّر طلباً مناسباً.') },
  ],
  practicalTask: L('Write a two-minute pitch outline and draft an application to a fictional enterprise-support programme.', 'اكتب مخططاً لعرض مدته دقيقتان ومسودة طلب لبرنامج دعم مشاريع افتراضي.'),
  output: L('A two-minute pitch outline and enterprise-support application draft.', 'مخطط عرض مدته دقيقتان ومسودة طلب دعم للمشروع.'),
  quiz: [
    {
      prompt: L('What should a short pitch start with?', 'بماذا يجب أن يبدأ العرض القصير؟'),
      options: [L('The customer and the problem they face', 'العميل والمشكلة التي يواجهها'), L('A long list of features', 'قائمة طويلة من الميزات'), L('How much money you want', 'المبلغ الذي تريده')],
      correct: 0,
      feedback: L('Starting with the customer problem helps listeners understand why the idea matters.', 'البدء بمشكلة العميل يساعد المستمعين على فهم أهمية الفكرة.'),
      unitIndex: 0,
    },
    {
      prompt: L('Explaining how the idea could sustain itself means describing:', 'شرح كيف تستمر الفكرة يعني وصف:'),
      options: [L('Who pays, for what, and the main costs', 'من يدفع ومقابل ماذا وما التكاليف الرئيسية'), L('Your personal hobbies', 'هواياتك الشخصية'), L('Only your logo', 'شعارك فقط')],
      correct: 0,
      feedback: L('A simple business model shows how income can cover costs over time.', 'نموذج العمل البسيط يوضح كيف يغطي الدخل التكاليف مع الوقت.'),
      unitIndex: 1,
    },
    {
      prompt: L('A reviewer asks something you have not tested yet. Best answer?', 'سألك أحد المراجعين عن أمر لم تختبره بعد. ما أفضل إجابة؟'),
      options: [L('Say it is an assumption and explain how you will test it', 'أقول إنه افتراض وأوضح كيف سأختبره'), L('Invent a number', 'أختلق رقماً'), L('Change the subject', 'أغيّر الموضوع')],
      correct: 0,
      feedback: L('Being honest about assumptions builds trust more than guessing.', 'الصدق بشأن الافتراضات يبني الثقة أكثر من التخمين.'),
      unitIndex: 2,
    },
    {
      prompt: L('Before applying to a support programme, check:', 'قبل التقديم على برنامج دعم، تحقق من:'),
      options: [L('The eligibility rules and what the programme offers', 'شروط الأهلية وما يقدمه البرنامج'), L('Only the deadline', 'الموعد النهائي فقط'), L('Whether your friend applied', 'إن كان صديقك قد تقدّم')],
      correct: 0,
      feedback: L('Matching eligibility saves time and makes your application relevant.', 'مطابقة شروط الأهلية توفر الوقت وتجعل طلبك مناسباً.'),
      unitIndex: 3,
    },
    {
      prompt: L('Which is the strongest evidence in a pitch?', 'ما أقوى دليل في العرض؟'),
      options: [L('What real potential customers told you in interviews', 'ما قاله عملاء محتملون حقيقيون في المقابلات'), L('Your belief that everyone will buy', 'اعتقادك بأن الجميع سيشتري'), L('A friend saying it is a good idea', 'قول صديق إنها فكرة جيدة')],
      correct: 0,
      feedback: L('Evidence from potential customers is more convincing than opinions.', 'الأدلة من العملاء المحتملين أقوى إقناعاً من الآراء.'),
      unitIndex: 0,
    },
  ],
  resources: ['cashPlan'],
  prerequisites: ['C08'],
  image: 'images/generated/course-C16.webp',
  note: L(
    'Incubation and funding opportunities are fictional examples; no funding is implied.',
    'فرص الاحتضان والتمويل أمثلة افتراضية، ولا يعني ذلك توفر أي تمويل.',
  ),
}
