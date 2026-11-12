import type { Course } from '@shared/types'
import { L } from '../l'

// Brief §7. Career foundations, all routes.
export const C03: Course = {
  id: 'C03',
  title: L('Communication and Teamwork at Work', 'التواصل والعمل الجماعي في بيئة العمل'),
  category: 'foundations',
  routes: 'all',
  minutes: 40,
  level: 'beginner',
  delivery: 'self-paced',
  outcomes: [
    L('Ask clarifying questions before acting', 'تطرح أسئلة توضيحية قبل التصرف'),
    L(
      'Write short messages with a clear request and next step',
      'تكتب رسائل قصيرة فيها طلب واضح وخطوة تالية',
    ),
    L(
      'Respond calmly to feedback and a service problem',
      'تستجيب بهدوء للملاحظات ولمشكلة في الخدمة',
    ),
  ],
  units: [
    {
      id: 'C03-U1',
      title: L('Listen and ask clear questions', 'استمع واطرح أسئلة واضحة'),
      synopsis: L(
        'Confirm what another person needs before acting.',
        'تأكد مما يحتاجه الشخص الآخر قبل أن تتصرف.',
      ),
    },
    {
      id: 'C03-U2',
      title: L('Write with purpose', 'اكتب بهدف واضح'),
      synopsis: L(
        'Create concise messages with a clear request and next step.',
        'اكتب رسائل موجزة تتضمن طلباً واضحاً وخطوة تالية.',
      ),
    },
    {
      id: 'C03-U3',
      title: L('Work with others', 'اعمل مع الآخرين'),
      synopsis: L(
        'Allocate tasks and raise concerns respectfully.',
        'وزّع المهام وعبّر عن مخاوفك باحترام.',
      ),
    },
    {
      id: 'C03-U4',
      title: L('Handle difficult conversations', 'تعامل مع المحادثات الصعبة'),
      synopsis: L(
        'Respond calmly to feedback and resolve a service problem.',
        'استجب بهدوء للملاحظات وعالج مشكلة في الخدمة.',
      ),
    },
  ],
  practicalTask: L(
    'Write a calm, helpful reply to a dissatisfied customer that acknowledges the problem and offers a next step.',
    'اكتب رداً هادئاً ومفيداً على عميل غير راضٍ يعترف بالمشكلة ويقترح خطوة تالية.',
  ),
  output: L('A response to a dissatisfied customer.', 'رد على عميل غير راضٍ.'),
  quiz: [
    {
      prompt: L(
        'The first response to an unclear request is to ask clarifying questions.',
        'أول استجابة لطلب غير واضح هي طرح أسئلة توضيحية.',
      ),
      options: [L('True', 'صحيح'), L('False', 'خطأ')],
      correct: 0,
      feedback: L(
        'True. Clarifying first saves time and avoids doing the wrong task.',
        'صحيح. التوضيح أولاً يوفر الوقت ويمنع تنفيذ المهمة الخطأ.',
      ),
      unitIndex: 0,
    },
    {
      prompt: L(
        'Which message has a clear request and next step?',
        'أي رسالة تتضمن طلباً واضحاً وخطوة تالية؟',
      ),
      options: [
        L(
          'Please send the attendance list by Thursday so I can prepare the certificates.',
          'يرجى إرسال قائمة الحضور قبل الخميس لأجهّز الشهادات.',
        ),
        L('Hi, about the thing we discussed.', 'مرحباً، بخصوص ما تحدثنا عنه.'),
        L('Let me know.', 'أخبرني.'),
      ],
      correct: 0,
      feedback: L('It says what is needed, by when and why.', 'تذكر المطلوب والموعد والسبب.'),
      unitIndex: 1,
    },
    {
      prompt: L(
        'A teammate has not finished their part. What is a respectful first step?',
        'لم ينهِ زميلك جزءه من العمل. ما الخطوة الأولى المحترمة؟',
      ),
      options: [
        L(
          'Ask privately if they need help and agree a new time',
          'أسأله على انفراد إن كان يحتاج مساعدة ونتفق على موعد جديد',
        ),
        L('Complain in the group chat', 'أشتكي في مجموعة المحادثة'),
        L('Do nothing and hope', 'لا أفعل شيئاً وأنتظر'),
      ],
      correct: 0,
      feedback: L(
        'Raising concerns privately and offering support keeps the team working together.',
        'طرح المخاوف على انفراد وعرض المساعدة يحافظ على تعاون الفريق.',
      ),
      unitIndex: 2,
    },
    {
      prompt: L(
        'A customer is upset about a delay. What should you say first?',
        'عميل منزعج من تأخير. ماذا تقول أولاً؟',
      ),
      options: [
        L(
          'Acknowledge the problem and explain what you will do next',
          'أعترف بالمشكلة وأوضح ما سأفعله بعد ذلك',
        ),
        L('Tell them it is not your fault', 'أقول إن الخطأ ليس خطئي'),
        L('Ignore the message', 'أتجاهل الرسالة'),
      ],
      correct: 0,
      feedback: L(
        'Acknowledging the problem and giving a next step helps calm the conversation.',
        'الاعتراف بالمشكلة وتقديم خطوة تالية يساعدان على تهدئة الحوار.',
      ),
      unitIndex: 3,
    },
    {
      prompt: L(
        'When you receive critical feedback, a good response is to:',
        'عند تلقي ملاحظات نقدية، الاستجابة الجيدة هي:',
      ),
      options: [
        L(
          'Listen, ask for an example and decide one thing to improve',
          'أستمع وأطلب مثالاً وأختار أمراً واحداً لتحسينه',
        ),
        L('Defend yourself immediately', 'أدافع عن نفسي فوراً'),
        L('Stop working on the task', 'أتوقف عن العمل على المهمة'),
      ],
      correct: 0,
      feedback: L(
        'Calm listening and one clear improvement turn feedback into progress.',
        'الاستماع بهدوء واختيار تحسين واضح يحوّلان الملاحظات إلى تقدّم.',
      ),
      unitIndex: 3,
    },
  ],
  resources: [],
  prerequisites: [],
  image: 'images/generated/course-C03.webp',
}
