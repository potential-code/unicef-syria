import type { Course } from '@shared/types'
import { L } from '../l'

// Brief §7. Career foundations, all routes.
export const C01: Course = {
  id: 'C01',
  title: L('Discover Your Career Direction', 'اكتشف اتجاهك المهني'),
  category: 'foundations',
  routes: 'all',
  minutes: 35,
  level: 'beginner',
  delivery: 'self-paced',
  outcomes: [
    L(
      'Describe your interests and strengths without treating them as fixed labels',
      'تصف اهتماماتك ونقاط قوتك دون أن تعدّها تصنيفات ثابتة',
    ),
    L(
      'Compare employment, entrepreneurship and freelancing realistically',
      'تقارن بين التوظيف وريادة الأعمال والعمل الحر بواقعية',
    ),
    L(
      'Set one goal, one learning action and one milestone for next month',
      'تحدد هدفاً وخطوة تعلّم ومحطة إنجاز للشهر القادم',
    ),
  ],
  units: [
    {
      id: 'C01-U1',
      title: L('Know your strengths', 'اعرف نقاط قوتك'),
      synopsis: L(
        'Interpret interests and preferences without treating them as fixed labels.',
        'افهم اهتماماتك وتفضيلاتك دون أن تعاملها كتصنيفات ثابتة.',
      ),
    },
    {
      id: 'C01-U2',
      title: L('Explore ways of earning', 'استكشف طرق كسب الدخل'),
      synopsis: L(
        'Compare employment, entrepreneurship and freelancing using realistic trade-offs.',
        'قارن بين التوظيف وريادة الأعمال والعمل الحر من خلال موازنات واقعية.',
      ),
    },
    {
      id: 'C01-U3',
      title: L('Understand roles and skills', 'افهم الأدوار والمهارات'),
      synopsis: L(
        'Read a sample opportunity and identify its required capabilities.',
        'اقرأ فرصة نموذجية وحدد القدرات التي تتطلبها.',
      ),
    },
    {
      id: 'C01-U4',
      title: L('Build your next step plan', 'ابنِ خطة خطوتك التالية'),
      synopsis: L(
        'Choose a goal, learning action and milestone for the next month.',
        'اختر هدفاً وخطوة تعلّم ومحطة إنجاز للشهر القادم.',
      ),
    },
  ],
  practicalTask: L(
    'Write a three-step career action plan with a goal, a learning action and a milestone for the next month.',
    'اكتب خطة عمل مهنية من ثلاث خطوات تتضمن هدفاً وخطوة تعلّم ومحطة إنجاز للشهر القادم.',
  ),
  output: L('A three-step career action plan.', 'خطة عمل مهنية من ثلاث خطوات.'),
  quiz: [
    {
      prompt: L(
        'A career profile should help you explore options, not decide your future permanently.',
        'يجب أن يساعدك الملف المهني على استكشاف الخيارات، لا أن يحدد مستقبلك بشكل نهائي.',
      ),
      options: [L('True', 'صحيح'), L('False', 'خطأ')],
      correct: 0,
      feedback: L(
        'True. Interests and strengths can grow, so use your profile as a starting point for exploring.',
        'صحيح. الاهتمامات ونقاط القوة تتطور، لذا استخدم ملفك نقطة بداية للاستكشاف.',
      ),
      unitIndex: 0,
    },
    {
      prompt: L(
        'Which is a realistic trade-off of freelancing?',
        'ما الموازنة الواقعية في العمل الحر؟',
      ),
      options: [
        L(
          'Flexible hours, but income can change from month to month',
          'ساعات مرنة، لكن الدخل قد يتغير من شهر لآخر',
        ),
        L('Guaranteed monthly salary', 'راتب شهري مضمون'),
        L('No need to find clients', 'لا حاجة للبحث عن عملاء'),
      ],
      correct: 0,
      feedback: L(
        'Freelancing often brings flexibility, but work and income depend on finding clients.',
        'يمنح العمل الحر مرونة غالباً، لكن العمل والدخل يعتمدان على إيجاد العملاء.',
      ),
      unitIndex: 1,
    },
    {
      prompt: L(
        'When reading a sample opportunity, what should you look for first?',
        'عند قراءة فرصة نموذجية، ما الذي تبحث عنه أولاً؟',
      ),
      options: [
        L('The capabilities the role requires', 'القدرات التي يتطلبها الدور'),
        L('The colour of the logo', 'لون الشعار'),
        L('How many people will apply', 'عدد المتقدمين المتوقع'),
      ],
      correct: 0,
      feedback: L(
        'The required capabilities tell you what to show and what you may still need to learn.',
        'القدرات المطلوبة تخبرك بما يجب أن تُظهره وما قد تحتاج إلى تعلّمه.',
      ),
      unitIndex: 2,
    },
    {
      prompt: L('Which goal is best for a one-month plan?', 'أي هدف هو الأنسب لخطة مدتها شهر؟'),
      options: [
        L(
          'Finish the CV course and save a first CV draft',
          'إنهاء دورة السيرة الذاتية وحفظ مسودة أولى',
        ),
        L('Become a manager', 'أن أصبح مديراً'),
        L('Be successful', 'أن أكون ناجحاً'),
        L('Learn everything about business', 'تعلّم كل شيء عن الأعمال'),
      ],
      correct: 0,
      feedback: L(
        'A good short-term goal is specific and can be checked at the end of the month.',
        'الهدف قصير المدى الجيد محدد ويمكن التحقق منه في نهاية الشهر.',
      ),
      unitIndex: 3,
    },
    {
      prompt: L('A milestone in your plan is:', 'المحطة في خطتك هي:'),
      options: [
        L('A visible sign that you made progress', 'علامة واضحة على أنك أحرزت تقدماً'),
        L('A reward from your trainer', 'مكافأة من المدرب'),
        L('A job offer', 'عرض عمل'),
      ],
      correct: 0,
      feedback: L(
        'A milestone is something you can see or show, such as a saved draft or a completed course.',
        'المحطة شيء يمكنك رؤيته أو عرضه، مثل مسودة محفوظة أو دورة مكتملة.',
      ),
      unitIndex: 3,
    },
  ],
  resources: ['actionPlan'],
  prerequisites: [],
  image: 'images/generated/course-C01.webp',
}
