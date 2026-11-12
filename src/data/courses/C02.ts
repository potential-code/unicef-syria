import type { Course } from '@shared/types'
import { L } from '../l'

// Brief §7. Career foundations, all routes.
export const C02: Course = {
  id: 'C02',
  title: L('Digital Essentials for Learning and Work', 'المهارات الرقمية الأساسية للتعلّم والعمل'),
  category: 'foundations',
  routes: 'all',
  minutes: 40,
  level: 'beginner',
  delivery: 'self-paced',
  outcomes: [
    L(
      'Organise files and join online learning with confidence',
      'تنظّم ملفاتك وتشارك في التعلّم عبر الإنترنت بثقة',
    ),
    L('Write a clear, professional email', 'تكتب بريداً إلكترونياً مهنياً وواضحاً'),
    L(
      'Protect personal information and check AI outputs',
      'تحمي معلوماتك الشخصية وتتحقق من مخرجات الذكاء الاصطناعي',
    ),
  ],
  units: [
    {
      id: 'C02-U1',
      title: L('Use digital tools confidently', 'استخدم الأدوات الرقمية بثقة'),
      synopsis: L(
        'Organise files, create documents and join online learning.',
        'نظّم الملفات وأنشئ المستندات وشارك في التعلّم عبر الإنترنت.',
      ),
    },
    {
      id: 'C02-U2',
      title: L('Communicate online', 'تواصل عبر الإنترنت'),
      synopsis: L(
        'Write clear emails and use collaborative documents.',
        'اكتب رسائل بريد واضحة واستخدم المستندات التشاركية.',
      ),
    },
    {
      id: 'C02-U3',
      title: L('Protect information', 'احمِ معلوماتك'),
      synopsis: L(
        'Recognise suspicious messages and share personal information carefully.',
        'تعرّف على الرسائل المشبوهة وشارك معلوماتك الشخصية بحذر.',
      ),
    },
    {
      id: 'C02-U4',
      title: L('Use AI thoughtfully', 'استخدم الذكاء الاصطناعي بوعي'),
      synopsis: L(
        'Check AI outputs and avoid uploading sensitive information.',
        'تحقق من مخرجات الذكاء الاصطناعي وتجنب رفع المعلومات الحساسة.',
      ),
    },
  ],
  practicalTask: L(
    'Write a short professional email to a trainer and set up a sample folder structure for your learning files.',
    'اكتب بريداً مهنياً قصيراً إلى مدرب وأنشئ هيكل مجلدات نموذجياً لملفات تعلّمك.',
  ),
  output: L(
    'A professional email and organised sample folder structure.',
    'بريد إلكتروني مهني وهيكل مجلدات نموذجي منظّم.',
  ),
  quiz: [
    {
      prompt: L(
        'An unexpected request for your password should be independently verified, not answered.',
        'يجب التحقق بشكل مستقل من أي طلب غير متوقع لكلمة المرور، لا الرد عليه.',
      ),
      options: [L('True', 'صحيح'), L('False', 'خطأ')],
      correct: 0,
      feedback: L(
        'True. Contact the person or service through a channel you already trust before doing anything.',
        'صحيح. تواصل مع الشخص أو الجهة عبر قناة تثق بها قبل أي تصرف.',
      ),
      unitIndex: 2,
    },
    {
      prompt: L(
        'Which file name is easiest to find later?',
        'أي اسم ملف هو الأسهل للعثور عليه لاحقاً؟',
      ),
      options: [
        L('CV_Nour_2026-11.docx', 'CV_Nour_2026-11.docx'),
        L('new file (3).docx', 'new file (3).docx'),
        L('document.docx', 'document.docx'),
      ],
      correct: 0,
      feedback: L(
        'Clear names with a topic, name and date make files quick to find.',
        'الأسماء الواضحة التي تتضمن الموضوع والاسم والتاريخ تسهّل العثور على الملفات.',
      ),
      unitIndex: 0,
    },
    {
      prompt: L('A clear work email should include:', 'يجب أن يتضمن البريد المهني الواضح:'),
      options: [
        L('A specific subject line and a clear request', 'سطر موضوع محدد وطلباً واضحاً'),
        L('No subject so the reader is curious', 'لا موضوع ليثير فضول القارئ'),
        L('Only emojis', 'رموزاً تعبيرية فقط'),
      ],
      correct: 0,
      feedback: L(
        'A specific subject and a clear request help the reader respond quickly.',
        'الموضوع المحدد والطلب الواضح يساعدان القارئ على الرد بسرعة.',
      ),
      unitIndex: 1,
    },
    {
      prompt: L(
        'What should you do before using an AI answer in your work?',
        'ماذا تفعل قبل استخدام إجابة من الذكاء الاصطناعي في عملك؟',
      ),
      options: [
        L('Check it for mistakes and missing facts', 'أتحقق منها بحثاً عن أخطاء أو معلومات ناقصة'),
        L('Copy it exactly', 'أنسخها كما هي'),
        L('Share it with everyone first', 'أشاركها مع الجميع أولاً'),
      ],
      correct: 0,
      feedback: L(
        'AI tools can be wrong, so always review the output before you rely on it.',
        'قد تخطئ أدوات الذكاء الاصطناعي، لذا راجع المخرجات دائماً قبل الاعتماد عليها.',
      ),
      unitIndex: 3,
    },
    {
      prompt: L(
        'Which information should you avoid uploading to an AI tool?',
        'ما المعلومات التي يجب تجنب رفعها إلى أداة ذكاء اصطناعي؟',
      ),
      options: [
        L('Your ID number and private documents', 'رقم هويتك ووثائقك الخاصة'),
        L('A general question about email structure', 'سؤال عام عن بنية البريد الإلكتروني'),
        L('A practice interview question', 'سؤال تدريبي للمقابلة'),
      ],
      correct: 0,
      feedback: L(
        'Keep identity details and private documents out of AI tools.',
        'أبقِ بيانات الهوية والوثائق الخاصة بعيداً عن أدوات الذكاء الاصطناعي.',
      ),
      unitIndex: 3,
    },
  ],
  resources: [],
  prerequisites: [],
  image: 'images/generated/course-C02.webp',
}
