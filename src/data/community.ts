import type { CommunityPost, Localized } from '@shared/types'
import { L } from './l'

// Brief §14 (Y13 Community and events). Moderated groups; cohort groups are members only.
// All authors are fictional first names. No personal support data appears in posts.

export type CommunityGroupId = 'career' | 'jobSearch' | 'enterprise' | 'freelance'

export interface CommunityGroup {
  id: CommunityGroupId
  name: Localized
  description: Localized
  moderated: true
}

export const COMMUNITY_GROUPS: CommunityGroup[] = [
  {
    id: 'career',
    name: L('Career Questions', 'أسئلة المسار المهني'),
    description: L(
      'Ask about routes, courses and next steps. Peers and trainers share practical tips.',
      'اسأل عن المسارات والدورات والخطوات التالية. يتبادل الزملاء والمدربون نصائح عملية.',
    ),
    moderated: true,
  },
  {
    id: 'jobSearch',
    name: L('Job Search Practice', 'التدرب على البحث عن عمل'),
    description: L(
      'Practise CV bullets and interview answers and give each other constructive feedback.',
      'تدرّب على نقاط السيرة الذاتية وإجابات المقابلات، وقدّموا لبعضكم ملاحظات بنّاءة.',
    ),
    moderated: true,
  },
  {
    id: 'enterprise',
    name: L('Enterprise Ideas', 'أفكار المشاريع'),
    description: L(
      'Share business ideas, customer questions and what you learned from testing.',
      'شارك أفكار المشاريع وأسئلة العملاء وما تعلمته من الاختبار.',
    ),
    moderated: true,
  },
  {
    id: 'freelance',
    name: L('Freelance Portfolio Feedback', 'ملاحظات على ملفات العمل الحر'),
    description: L(
      'Get feedback on sample work, service profiles and proposals.',
      'احصل على ملاحظات حول الأعمال النموذجية وملفات الخدمات والمقترحات.',
    ),
    moderated: true,
  },
]

const at = (day: number, time: string) => `2026-11-${String(day).padStart(2, '0')}T${time}:00+03:00`

export const COMMUNITY_POSTS: CommunityPost[] = [
  // ---- Career Questions
  {
    id: 'CP01',
    groupId: 'career',
    author: L('Hala', 'هالة'),
    body: L(
      'My profile shows both communication and practical preferences. Is it fine to start C03 before choosing a route?',
      'يُظهر ملفي تفضيلات للتواصل وللعمل العملي معًا. هل يمكنني البدء بالدورة C03 قبل اختيار مسار؟',
    ),
    at: at(3, '10:15'),
    replies: [
      {
        author: L('Karim', 'كريم'),
        body: L(
          'Yes. C03 is useful for every route, so you can start it while you decide.',
          'نعم. الدورة C03 مفيدة لجميع المسارات، لذا يمكنك البدء بها ريثما تقرر.',
        ),
        at: at(3, '12:40'),
      },
    ],
  },
  {
    id: 'CP02',
    groupId: 'career',
    author: L('Sami', 'سامي'),
    body: L(
      'Has anyone switched from the employment route to freelancing? How did you decide?',
      'هل انتقل أحد من مسار التوظيف إلى العمل الحر؟ كيف اتخذت القرار؟',
    ),
    at: at(5, '17:05'),
    replies: [
      {
        author: L('Rasha', 'رشا'),
        body: L(
          'I tried a small sample project first and talked to my mentor before changing.',
          'جربت مشروعًا نموذجيًا صغيرًا أولًا، وتحدثت مع مرشدتي قبل أن أغيّر مساري.',
        ),
        at: at(6, '09:20'),
      },
    ],
  },
  // ---- Job Search Practice
  {
    id: 'CP03',
    groupId: 'jobSearch',
    author: L('Lamar', 'لمار'),
    body: L(
      'Feedback please on this CV bullet: "Answered visitor questions and recorded enquiries at a community centre front desk."',
      'أرجو ملاحظاتكم على هذه النقطة في سيرتي الذاتية: "أجبت عن أسئلة الزوار وسجّلت الاستفسارات في مكتب الاستقبال بمركز مجتمعي."',
    ),
    at: at(4, '14:30'),
    replies: [
      {
        author: L('Yazan', 'يزن'),
        body: L(
          'Clear and specific. It shows both communication and record keeping.',
          'واضحة ومحددة. تُظهر مهارتي التواصل ومسك السجلات معًا.',
        ),
        at: at(4, '16:10'),
      },
    ],
  },
  {
    id: 'CP04',
    groupId: 'jobSearch',
    author: L('Fadi', 'فادي'),
    body: L(
      'I practised "Tell me about a time you helped a customer" and got Developing for clarity. Any tips?',
      'تدربت على سؤال "حدّثني عن موقف ساعدت فيه عميلًا" وحصلت على تقييم "قيد التطور" في الوضوح. هل من نصائح؟',
    ),
    at: at(8, '11:00'),
    replies: [
      {
        author: L('Hala', 'هالة'),
        body: L(
          'Finish with the result in one sentence. That helped my answer a lot.',
          'اختم بالنتيجة في جملة واحدة. ساعدني ذلك كثيرًا في إجابتي.',
        ),
        at: at(8, '13:25'),
      },
    ],
  },
  // ---- Enterprise Ideas
  {
    id: 'CP05',
    groupId: 'enterprise',
    author: L('Majd', 'مجد'),
    body: L(
      'I spoke to four small bakeries this week. Three said their biggest problem is planning daily orders, not marketing.',
      'تحدثت مع أربعة مخابز صغيرة هذا الأسبوع. قال ثلاثة منها إن مشكلتهم الكبرى هي تخطيط الطلبات اليومية، وليس التسويق.',
    ),
    at: at(6, '18:45'),
    replies: [
      {
        author: L('Nada', 'ندى'),
        body: L(
          'That is useful evidence. Maybe ask how they plan orders today before suggesting anything.',
          'هذا دليل مفيد. ربما تسألهم عن طريقة تخطيطهم للطلبات حاليًا قبل أن تقترح أي شيء.',
        ),
        at: at(7, '10:05'),
      },
    ],
  },
  {
    id: 'CP06',
    groupId: 'enterprise',
    author: L('Nada', 'ندى'),
    body: L(
      'How do you write a customer question that is not leading? Mine keep mentioning my idea.',
      'كيف تكتب سؤالًا للعملاء لا يكون موجّهًا؟ أسئلتي تذكر فكرتي دائمًا.',
    ),
    at: at(9, '15:15'),
    replies: [
      {
        author: L('Majd', 'مجد'),
        body: L(
          'Ask about the last time the problem happened. C07 Unit 2 has good examples.',
          'اسأل عن آخر مرة حدثت فيها المشكلة. في الدرس الثاني من الدورة C07 أمثلة جيدة.',
        ),
        at: at(9, '17:30'),
      },
    ],
  },
  // ---- Freelance Portfolio Feedback
  {
    id: 'CP07',
    groupId: 'freelance',
    author: L('Reem', 'ريم'),
    body: L(
      'I made three sample posts for a fictional café and labelled them as sample work. Is the call to action clear?',
      'صممت ثلاثة منشورات نموذجية لمقهى افتراضي ووصفتها بأنها أعمال نموذجية. هل الدعوة إلى الإجراء واضحة؟',
    ),
    at: at(7, '12:10'),
    replies: [
      {
        author: L('Tamer', 'تامر'),
        body: L(
          'The design is readable. The call to action could be shorter, for example "Visit us this week".',
          'التصميم سهل القراءة. يمكن أن تكون الدعوة إلى الإجراء أقصر، مثل "زورونا هذا الأسبوع".',
        ),
        at: at(7, '14:50'),
      },
    ],
  },
  {
    id: 'CP08',
    groupId: 'freelance',
    author: L('Tamer', 'تامر'),
    body: L(
      'Should I include a proposed fee in my first proposal, or wait for the client to ask?',
      'هل أضع أجرًا مقترحًا في مقترحي الأول، أم أنتظر حتى يسأل العميل؟',
    ),
    at: at(10, '19:00'),
    replies: [
      {
        author: L('Reem', 'ريم'),
        body: L(
          'Include it if the brief asks for it, and explain what it covers so the scope is clear.',
          'أضفه إذا طلبه العميل في الطلب، ووضّح ما يشمله حتى يكون نطاق العمل واضحًا.',
        ),
        at: at(11, '09:40'),
      },
    ],
  },
  // ---- Cohort group K01 (members only)
  {
    id: 'CP09',
    groupId: 'K01',
    author: L('Yazan', 'يزن'),
    body: L(
      'Reminder for our cohort: bring your saved CV draft to the next session so we can review it in pairs.',
      'تذكير لدفعتنا: أحضروا مسودة سيرتكم الذاتية المحفوظة إلى الجلسة القادمة لنراجعها في مجموعات ثنائية.',
    ),
    at: at(11, '18:20'),
    replies: [
      {
        author: L('Lamar', 'لمار'),
        body: L('Thanks. I will bring mine and the job advert for O01.', 'شكرًا. سأحضر سيرتي وإعلان الوظيفة O01.'),
        at: at(11, '20:05'),
      },
    ],
  },
]
