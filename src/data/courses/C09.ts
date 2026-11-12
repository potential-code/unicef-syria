import type { Course } from '@shared/types'
import { L } from '../l'

// Brief §9. Enterprise route.
export const C09: Course = {
  id: 'C09',
  title: L('Marketing and Sales for a Small Business', 'التسويق والمبيعات للمشاريع الصغيرة'),
  category: 'entrepreneurship',
  routes: ['enterprise'],
  minutes: 40,
  level: 'beginner',
  delivery: 'self-paced',
  outcomes: [
    L('Describe a specific customer segment and need', 'تصف شريحة عملاء محددة واحتياجها'),
    L('Write a short offer that links to a real problem', 'تكتب عرضاً قصيراً يرتبط بمشكلة حقيقية'),
    L('Plan outreach and track enquiries', 'تخطط للتواصل وتتابع الاستفسارات'),
  ],
  units: [
    { id: 'C09-U1', title: L('Know your customer', 'اعرف عميلك'), synopsis: L('Describe a specific customer segment and need.', 'صِف شريحة عملاء محددة واحتياجها.') },
    { id: 'C09-U2', title: L('Explain your value', 'وضّح قيمة عرضك'), synopsis: L('Write a short message connecting the offer to the problem.', 'اكتب رسالة قصيرة تربط العرض بالمشكلة.') },
    { id: 'C09-U3', title: L('Choose practical channels', 'اختر قنوات عملية'), synopsis: L('Compare referrals, local outreach and digital channels.', 'قارن بين التوصيات والتواصل المحلي والقنوات الرقمية.') },
    { id: 'C09-U4', title: L('Follow up and learn', 'تابع وتعلّم'), synopsis: L('Record enquiries, objections and the next action.', 'سجّل الاستفسارات والاعتراضات والخطوة التالية.') },
  ],
  practicalTask: L('Write a short offer statement for one customer segment and a simple outreach plan with two channels.', 'اكتب عبارة عرض قصيرة لشريحة عملاء واحدة وخطة تواصل بسيطة عبر قناتين.'),
  output: L('A short offer statement and outreach plan.', 'عبارة عرض قصيرة وخطة تواصل.'),
  quiz: [
    {
      prompt: L('A specific customer problem makes an offer easier to explain.', 'المشكلة المحددة لدى العميل تجعل شرح العرض أسهل.'),
      options: [L('True', 'صحيح'), L('False', 'خطأ')],
      correct: 0,
      feedback: L('True. When you name the problem, customers quickly see why the offer matters.', 'صحيح. عندما تسمّي المشكلة، يرى العملاء بسرعة أهمية العرض.'),
      unitIndex: 1,
    },
    {
      prompt: L('Which is the most specific customer segment?', 'أي مما يلي أكثر شرائح العملاء تحديداً؟'),
      options: [L('Small phone repair shops that take bookings by phone', 'محلات تصليح الهواتف الصغيرة التي تأخذ الحجوزات هاتفياً'), L('Everyone', 'الجميع'), L('People who like technology', 'الأشخاص الذين يحبون التكنولوجيا')],
      correct: 0,
      feedback: L('A specific segment helps you choose the right message and channel.', 'الشريحة المحددة تساعدك على اختيار الرسالة والقناة المناسبتين.'),
      unitIndex: 0,
    },
    {
      prompt: L('Referrals work well because:', 'تنجح التوصيات لأن:'),
      options: [L('People trust recommendations from someone they know', 'الناس يثقون بتوصيات من يعرفونهم'), L('They are always free and instant', 'إنها مجانية وفورية دائماً'), L('They replace a good offer', 'إنها تغني عن العرض الجيد')],
      correct: 0,
      feedback: L('Trust is the strength of referrals, but you still need a clear offer.', 'الثقة هي قوة التوصيات، لكنك تحتاج دائماً إلى عرض واضح.'),
      unitIndex: 2,
    },
    {
      prompt: L('A customer says "it is too expensive". What should you record?', 'قال عميل "السعر مرتفع جداً". ماذا تسجّل؟'),
      options: [L('The objection and your next action', 'الاعتراض والخطوة التالية'), L('Nothing, it does not matter', 'لا شيء، فهذا غير مهم'), L('Only the customer name', 'اسم العميل فقط')],
      correct: 0,
      feedback: L('Recording objections helps you learn and improve your offer.', 'تسجيل الاعتراضات يساعدك على التعلّم وتحسين عرضك.'),
      unitIndex: 3,
    },
    {
      prompt: L('Before choosing a digital channel, you should check:', 'قبل اختيار قناة رقمية، يجب أن تتحقق من:'),
      options: [L('Whether your customers actually use it', 'أن عملاءك يستخدمونها فعلاً'), L('Whether it is the newest app', 'أنها أحدث تطبيق'), L('Whether your friends like it', 'أن أصدقاءك يحبونها')],
      correct: 0,
      feedback: L('The best channel is the one your customers already use.', 'أفضل قناة هي التي يستخدمها عملاؤك أصلاً.'),
      unitIndex: 2,
    },
  ],
  resources: ['customerInterview'],
  prerequisites: ['C07'],
  image: 'images/generated/course-C09.webp',
}
