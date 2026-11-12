import type { Course } from '@shared/types'
import { L } from '../l'

// Brief §10. Illustrative technical taster for freelancing.
export const C15: Course = {
  id: 'C15',
  title: L('Digital Content and Design Basics', 'أساسيات المحتوى الرقمي والتصميم'),
  category: 'technical',
  routes: ['freelance'],
  minutes: 45,
  level: 'beginner',
  delivery: 'self-paced',
  outcomes: [
    L(
      'Identify the audience, message and action in a content brief',
      'تحدد الجمهور والرسالة والإجراء المطلوب في وصف المحتوى',
    ),
    L(
      'Create readable visuals and short copy with a call to action',
      'تنشئ تصاميم واضحة ونصوصاً قصيرة مع دعوة لاتخاذ إجراء',
    ),
    L('Present sample work with honest attribution', 'تعرض نماذج أعمالك مع نسبة صادقة للمصادر'),
  ],
  units: [
    {
      id: 'C15-U1',
      title: L('Understand a content brief', 'افهم وصف المحتوى'),
      synopsis: L(
        'Identify the audience, message and desired action.',
        'حدد الجمهور والرسالة والإجراء المطلوب.',
      ),
    },
    {
      id: 'C15-U2',
      title: L('Create clear visual content', 'أنشئ محتوى بصرياً واضحاً'),
      synopsis: L(
        'Apply readable layout, contrast and original assets.',
        'طبّق تخطيطاً مقروءاً وتبايناً جيداً وعناصر أصلية.',
      ),
    },
    {
      id: 'C15-U3',
      title: L('Write useful short copy', 'اكتب نصوصاً قصيرة مفيدة'),
      synopsis: L(
        'Create a headline, supporting copy and call to action.',
        'اكتب عنواناً ونصاً داعماً ودعوة لاتخاذ إجراء.',
      ),
    },
    {
      id: 'C15-U4',
      title: L('Package a portfolio sample', 'جهّز نموذجاً لملف أعمالك'),
      synopsis: L(
        'Present sample work with a clear description and honest attribution.',
        'اعرض نموذج عملك مع وصف واضح ونسبة صادقة للمصادر.',
      ),
    },
  ],
  practicalTask: L(
    'Create three sample posts for a fictional business using free tools and your own original assets.',
    'أنشئ ثلاثة منشورات نموذجية لنشاط تجاري افتراضي باستخدام أدوات مجانية وعناصر أصلية من إعدادك.',
  ),
  output: L(
    'Three sample posts for a fictional business.',
    'ثلاثة منشورات نموذجية لنشاط تجاري افتراضي.',
  ),
  quiz: [
    {
      prompt: L('A content brief should tell you:', 'يجب أن يخبرك وصف المحتوى بـ:'),
      options: [
        L('The audience, the message and the action wanted', 'الجمهور والرسالة والإجراء المطلوب'),
        L('Only the font name', 'اسم الخط فقط'),
        L('Your fee', 'أجرك'),
      ],
      correct: 0,
      feedback: L(
        'Audience, message and action guide every design choice.',
        'الجمهور والرسالة والإجراء توجّه كل قرار في التصميم.',
      ),
      unitIndex: 0,
    },
    {
      prompt: L('Which text is easiest to read on a post?', 'أي نص هو الأسهل قراءة في المنشور؟'),
      options: [
        L('Dark text on a light background', 'نص داكن على خلفية فاتحة'),
        L('Light grey text on white', 'نص رمادي فاتح على خلفية بيضاء'),
        L('Red text on orange', 'نص أحمر على خلفية برتقالية'),
      ],
      correct: 0,
      feedback: L(
        'Strong contrast between text and background makes posts readable.',
        'التباين القوي بين النص والخلفية يجعل المنشور مقروءاً.',
      ),
      unitIndex: 1,
    },
    {
      prompt: L(
        'Can you use any image you find online in client work?',
        'هل يمكنك استخدام أي صورة تجدها على الإنترنت في عمل لعميل؟',
      ),
      options: [
        L(
          'No, use original or properly licensed assets',
          'لا، أستخدم عناصر أصلية أو مرخّصة بشكل صحيح',
        ),
        L('Yes, if it looks good', 'نعم، إذا كانت جميلة'),
        L('Yes, if you change the colour', 'نعم، إذا غيّرت لونها'),
      ],
      correct: 0,
      feedback: L(
        'Only use assets you created or have the right to use.',
        'استخدم فقط العناصر التي أنشأتها أو التي يحق لك استخدامها.',
      ),
      unitIndex: 1,
    },
    {
      prompt: L('Which is a clear call to action?', 'أي مما يلي دعوة واضحة لاتخاذ إجراء؟'),
      options: [
        L(
          'Visit the shop this week for the new school bags',
          'زوروا المحل هذا الأسبوع لرؤية الحقائب المدرسية الجديدة',
        ),
        L('We exist', 'نحن موجودون'),
        L('Nice products', 'منتجات جميلة'),
      ],
      correct: 0,
      feedback: L(
        'A call to action tells the reader exactly what to do next.',
        'الدعوة لاتخاذ إجراء تخبر القارئ بما يفعله بالضبط.',
      ),
      unitIndex: 2,
    },
    {
      prompt: L(
        'When adding sample posts to a portfolio, you should:',
        'عند إضافة منشورات نموذجية إلى ملف أعمالك، يجب أن:',
      ),
      options: [
        L(
          'Label them as sample work for a fictional business',
          'أوضح أنها أعمال نموذجية لنشاط افتراضي',
        ),
        L('Say a real client paid for them', 'أقول إن عميلاً حقيقياً دفع مقابلها'),
        L('Hide who made them', 'أخفي من صنعها'),
      ],
      correct: 0,
      feedback: L(
        'Honest labels build trust with future clients.',
        'الوصف الصادق يبني الثقة مع العملاء المستقبليين.',
      ),
      unitIndex: 3,
    },
  ],
  resources: ['portfolioChecklist'],
  prerequisites: [],
  image: 'images/generated/course-C15.webp',
  note: L(
    'Illustrative technical taster; it does not establish an occupational qualification. No paid design tool or unlicensed assets are required.',
    'دورة تقنية تعريفية توضيحية لا تمنح مؤهلاً مهنياً. لا تتطلب أداة تصميم مدفوعة أو عناصر غير مرخّصة.',
  ),
}
