import type { Course } from '@shared/types'
import { L } from '../l'

// Brief §10. Illustrative technical taster for employment.
export const C13: Course = {
  id: 'C13',
  title: L('Customer Service and Office Support', 'خدمة العملاء والدعم المكتبي'),
  category: 'technical',
  routes: ['employment'],
  minutes: 40,
  level: 'beginner',
  delivery: 'self-paced',
  outcomes: [
    L('Identify a customer request and who handles it next', 'تحدد طلب العميل والشخص المسؤول عن متابعته'),
    L('Record enquiries accurately in a simple log', 'تسجّل الاستفسارات بدقة في سجل بسيط'),
    L('Know when to solve an issue or escalate it', 'تعرف متى تحل المشكلة ومتى تحيلها'),
  ],
  units: [
    { id: 'C13-U1', title: L('Understand the service journey', 'افهم رحلة الخدمة'), synopsis: L('Identify the customer request and next responsible person.', 'حدد طلب العميل والشخص المسؤول التالي.') },
    { id: 'C13-U2', title: L('Handle enquiries', 'تعامل مع الاستفسارات'), synopsis: L('Ask questions and record accurate information.', 'اطرح الأسئلة وسجّل المعلومات بدقة.') },
    { id: 'C13-U3', title: L('Use simple office records', 'استخدم سجلات مكتبية بسيطة'), synopsis: L('Maintain an enquiry or attendance spreadsheet.', 'حافظ على جدول بيانات للاستفسارات أو الحضور.') },
    { id: 'C13-U4', title: L('Resolve and escalate', 'عالج المشكلة أو أحِلها'), synopsis: L('Know when to solve the issue or involve a supervisor.', 'اعرف متى تحل المشكلة بنفسك ومتى تُشرك المشرف.') },
  ],
  practicalTask: L('Fill in a sample enquiry log with three fictional enquiries and write a reply to one customer.', 'املأ سجل استفسارات نموذجياً بثلاثة استفسارات افتراضية واكتب رداً على أحد العملاء.'),
  output: L('A sample enquiry log and customer response.', 'سجل استفسارات نموذجي ورد على عميل.'),
  quiz: [
    {
      prompt: L('A customer asks about a delivery you do not manage. What do you do?', 'يسأل عميل عن توصيل لا تتولاه أنت. ماذا تفعل؟'),
      options: [L('Note the request and pass it to the responsible person', 'أسجّل الطلب وأحيله إلى الشخص المسؤول'), L('Guess an answer', 'أخمّن إجابة'), L('Tell them to call back later with no details', 'أطلب منه الاتصال لاحقاً دون تفاصيل')],
      correct: 0,
      feedback: L('Knowing who is responsible next keeps the service journey moving.', 'معرفة المسؤول التالي تُبقي رحلة الخدمة مستمرة.'),
      unitIndex: 0,
    },
    {
      prompt: L('Which detail is most important to record for an enquiry?', 'ما أهم تفصيل يجب تسجيله في الاستفسار؟'),
      options: [L('Contact details and what the customer needs', 'بيانات التواصل وما يحتاجه العميل'), L('What the customer was wearing', 'ما كان يرتديه العميل'), L('Your opinion of the customer', 'رأيك في العميل')],
      correct: 0,
      feedback: L('Accurate contact details and the request let anyone follow up.', 'بيانات التواصل الدقيقة والطلب الواضح تتيح لأي شخص المتابعة.'),
      unitIndex: 1,
    },
    {
      prompt: L('In an attendance spreadsheet, why use the same format for every date?', 'في جدول الحضور، لماذا نستخدم الصيغة نفسها لكل تاريخ؟'),
      options: [L('So records can be sorted and checked easily', 'ليسهل ترتيب السجلات والتحقق منها'), L('It looks nicer only', 'لأنه أجمل شكلاً فقط'), L('It is not important', 'هذا غير مهم')],
      correct: 0,
      feedback: L('Consistent entries make records reliable and easy to search.', 'الإدخالات المتسقة تجعل السجلات موثوقة وسهلة البحث.'),
      unitIndex: 2,
    },
    {
      prompt: L('When should you involve a supervisor?', 'متى يجب أن تُشرك المشرف؟'),
      options: [L('When the issue is outside your authority or keeps repeating', 'عندما تكون المشكلة خارج صلاحياتك أو تتكرر'), L('For every small question', 'في كل سؤال صغير'), L('Never', 'أبداً')],
      correct: 0,
      feedback: L('Escalate when you cannot solve it yourself or the rules require it.', 'أحِل المشكلة عندما لا تستطيع حلها بنفسك أو عندما تتطلب القواعد ذلك.'),
      unitIndex: 3,
    },
    {
      prompt: L('Which reply is most professional?', 'أي رد هو الأكثر مهنية؟'),
      options: [L('Thank you for your message. I have noted your request and will update you by tomorrow.', 'شكراً لرسالتك. سجّلت طلبك وسأوافيك بالمستجدات غداً.'), L('Not my problem.', 'هذه ليست مشكلتي.'), L('ok', 'حسناً')],
      correct: 0,
      feedback: L('It is polite, confirms the request and gives a clear next step.', 'الرد مهذب ويؤكد الطلب ويحدد خطوة تالية واضحة.'),
      unitIndex: 3,
    },
  ],
  resources: [],
  prerequisites: ['C03'],
  image: 'images/generated/course-C13.webp',
  note: L(
    'Introductory skills demonstration, not a professional qualification. Technical tasters are illustrative and do not establish occupational qualifications.',
    'عرض تمهيدي للمهارات وليس مؤهلاً مهنياً. الدورات التقنية التعريفية توضيحية ولا تمنح مؤهلات مهنية.',
  ),
}
