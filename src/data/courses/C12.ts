import type { Course } from '@shared/types'
import { L } from '../l'

// Brief §9. Freelance route.
export const C12: Course = {
  id: 'C12',
  title: L('Client Communication and Project Delivery', 'التواصل مع العملاء وتسليم المشاريع'),
  category: 'freelancing',
  routes: ['freelance'],
  minutes: 40,
  level: 'intermediate',
  delivery: 'self-paced',
  outcomes: [
    L('Agree what success looks like before starting', 'تتفق على معنى النجاح قبل البدء'),
    L('Break an assignment into reviewable milestones', 'تقسّم المهمة إلى مراحل قابلة للمراجعة'),
    L('Handle change requests and close an assignment well', 'تتعامل مع طلبات التغيير وتُنهي المهمة بشكل جيد'),
  ],
  units: [
    { id: 'C12-U1', title: L('Clarify the brief', 'وضّح المطلوب'), synopsis: L('Agree what success looks like before starting.', 'اتفق على معنى النجاح قبل البدء.') },
    { id: 'C12-U2', title: L('Plan milestones', 'خطّط للمراحل'), synopsis: L('Break the assignment into reviewable stages.', 'قسّم المهمة إلى مراحل يمكن مراجعتها.') },
    { id: 'C12-U3', title: L('Manage feedback and changes', 'أدِر الملاحظات والتغييرات'), synopsis: L('Record revisions and discuss scope changes.', 'سجّل التعديلات وناقش تغييرات النطاق.') },
    { id: 'C12-U4', title: L('Close the assignment', 'أنهِ المهمة'), synopsis: L('Confirm delivery and request constructive feedback.', 'أكّد التسليم واطلب ملاحظات بنّاءة.') },
  ],
  practicalTask: L('Write a short project plan with milestones and reply to a sample client request that adds a new deliverable.', 'اكتب خطة مشروع قصيرة بمراحلها، وردّ على طلب عميل نموذجي يضيف مخرَجاً جديداً.'),
  output: L('A short project plan and a response to a change request.', 'خطة مشروع قصيرة ورد على طلب تغيير.'),
  quiz: [
    {
      prompt: L('A new deliverable should trigger a scope discussion.', 'إضافة مخرَج جديد يجب أن تفتح نقاشاً حول النطاق.'),
      options: [L('True', 'صحيح'), L('False', 'خطأ')],
      correct: 0,
      feedback: L('True. Extra work may change the timeline or fee, so agree it with the client first.', 'صحيح. العمل الإضافي قد يغيّر الجدول أو الأجر، لذا اتفق عليه مع العميل أولاً.'),
      unitIndex: 2,
    },
    {
      prompt: L('Before starting, what should you agree with the client?', 'قبل البدء، على ماذا تتفق مع العميل؟'),
      options: [L('What a successful result looks like', 'شكل النتيجة الناجحة'), L('Your favourite colour', 'لونك المفضل'), L('Nothing, start straight away', 'لا شيء، أبدأ مباشرة')],
      correct: 0,
      feedback: L('A shared idea of success avoids rework and disappointment.', 'الفهم المشترك للنجاح يجنّبك إعادة العمل وخيبة الأمل.'),
      unitIndex: 0,
    },
    {
      prompt: L('Why break an assignment into milestones?', 'لماذا تقسّم المهمة إلى مراحل؟'),
      options: [L('So the client can review progress early', 'ليتمكن العميل من مراجعة التقدّم مبكراً'), L('To make the work longer', 'لجعل العمل أطول'), L('To avoid talking to the client', 'لتجنب التواصل مع العميل')],
      correct: 0,
      feedback: L('Reviewable stages catch problems early, when they are easy to fix.', 'المراحل القابلة للمراجعة تكشف المشكلات مبكراً حين يسهل إصلاحها.'),
      unitIndex: 1,
    },
    {
      prompt: L('The client sends feedback by voice message. What should you do?', 'أرسل العميل ملاحظاته برسالة صوتية. ماذا تفعل؟'),
      options: [L('Write the revisions down and confirm them in writing', 'أكتب التعديلات وأؤكدها كتابياً'), L('Rely on memory', 'أعتمد على الذاكرة'), L('Ignore it until the end', 'أتجاهلها حتى النهاية')],
      correct: 0,
      feedback: L('A written record of revisions keeps both sides clear.', 'السجل المكتوب للتعديلات يُبقي الطرفين على وضوح.'),
      unitIndex: 2,
    },
    {
      prompt: L('When closing an assignment, it is good practice to:', 'عند إنهاء المهمة، من الممارسات الجيدة:'),
      options: [L('Confirm delivery and ask for constructive feedback', 'تأكيد التسليم وطلب ملاحظات بنّاءة'), L('Stop replying once you are paid', 'التوقف عن الرد بعد الدفع'), L('Send the files with no message', 'إرسال الملفات دون أي رسالة')],
      correct: 0,
      feedback: L('Confirming delivery and asking for feedback builds trust and helps you improve.', 'تأكيد التسليم وطلب الملاحظات يبنيان الثقة ويساعدانك على التحسّن.'),
      unitIndex: 3,
    },
  ],
  resources: ['proposal'],
  prerequisites: ['C11'],
  image: 'images/generated/course-C12.webp',
}
