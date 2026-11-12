import type { Course } from '@shared/types'
import { L } from '../l'

// Brief §9. Freelance route.
export const C10: Course = {
  id: 'C10',
  title: L('Freelance and Part Time Foundations', 'أساسيات العمل الحر والعمل الجزئي'),
  category: 'freelancing',
  routes: ['freelance'],
  minutes: 40,
  level: 'beginner',
  delivery: 'self-paced',
  outcomes: [
    L(
      'Link an existing skill to a realistic client need',
      'تربط مهارة لديك باحتياج واقعي لدى العميل',
    ),
    L('Describe deliverables, boundaries and timing', 'تصف المخرجات والحدود والتوقيت'),
    L('Check an opportunity for fit before applying', 'تتحقق من ملاءمة الفرصة قبل التقديم'),
  ],
  units: [
    {
      id: 'C10-U1',
      title: L('Choose a service or role', 'اختر خدمة أو دوراً'),
      synopsis: L(
        'Connect an existing skill to a realistic client need.',
        'اربط مهارة لديك باحتياج واقعي لدى العميل.',
      ),
    },
    {
      id: 'C10-U2',
      title: L('Define a clear scope', 'حدّد نطاقاً واضحاً'),
      synopsis: L('Describe deliverables, boundaries and timing.', 'صِف المخرجات والحدود والتوقيت.'),
    },
    {
      id: 'C10-U3',
      title: L('Plan availability and pricing', 'خطّط لتوفرك وتسعيرك'),
      synopsis: L(
        'Estimate effort and explain a proposed fee or availability.',
        'قدّر الجهد ووضّح الأجر المقترح أو أوقات توفرك.',
      ),
    },
    {
      id: 'C10-U4',
      title: L('Evaluate an opportunity', 'قيّم الفرصة'),
      synopsis: L(
        'Check the brief, client expectations and fit before applying.',
        'راجع الوصف وتوقعات العميل ومدى الملاءمة قبل التقديم.',
      ),
    },
  ],
  practicalTask: L(
    'Write a short service profile and set your weekly availability, noting whether you want project-based or part-time work.',
    'اكتب وصفاً قصيراً لخدمتك وحدد توفرك الأسبوعي، مع توضيح إن كنت تريد عملاً بالمشروع أو بدوام جزئي.',
  ),
  output: L('A service profile and weekly availability.', 'وصف للخدمة وجدول التوفر الأسبوعي.'),
  quiz: [
    {
      prompt: L(
        'Which is a realistic first freelance service?',
        'أي مما يلي خدمة عمل حر أولى واقعية؟',
      ),
      options: [
        L(
          'Typing and formatting documents, a skill you already use',
          'كتابة المستندات وتنسيقها، وهي مهارة تستخدمها فعلاً',
        ),
        L('Building a large app you have never studied', 'بناء تطبيق كبير لم تدرسه من قبل'),
        L('Any service that pays the most', 'أي خدمة تدفع أكثر'),
      ],
      correct: 0,
      feedback: L(
        'Start from a skill you can already show, linked to a real client need.',
        'ابدأ بمهارة يمكنك إثباتها، مرتبطة باحتياج حقيقي لدى العميل.',
      ),
      unitIndex: 0,
    },
    {
      prompt: L('A clear scope describes:', 'النطاق الواضح يصف:'),
      options: [
        L(
          'What you will deliver, what is not included and when',
          'ما ستسلّمه وما لا يشمله العمل والموعد',
        ),
        L('Only the price', 'السعر فقط'),
        L('Your life story', 'قصة حياتك'),
      ],
      correct: 0,
      feedback: L(
        'Deliverables, boundaries and timing prevent misunderstandings later.',
        'المخرجات والحدود والتوقيت تمنع سوء الفهم لاحقاً.',
      ),
      unitIndex: 1,
    },
    {
      prompt: L('How should you explain a proposed fee?', 'كيف توضح الأجر المقترح؟'),
      options: [
        L('Link it to the estimated effort and deliverables', 'أربطه بالجهد المتوقع والمخرجات'),
        L('Give no reason', 'لا أذكر أي سبب'),
        L('Copy the highest fee you have seen', 'أنسخ أعلى أجر رأيته'),
      ],
      correct: 0,
      feedback: L(
        'Linking the fee to effort helps the client understand and trust it.',
        'ربط الأجر بالجهد يساعد العميل على فهمه والثقة به.',
      ),
      unitIndex: 2,
    },
    {
      prompt: L(
        'What is the difference between project-based and part-time work?',
        'ما الفرق بين العمل بالمشروع والعمل بدوام جزئي؟',
      ),
      options: [
        L(
          'Project work ends with a deliverable; part-time work has regular hours',
          'العمل بالمشروع ينتهي بتسليم مخرَج، والدوام الجزئي له ساعات منتظمة',
        ),
        L('There is no difference', 'لا يوجد فرق'),
        L('Part-time work is always remote', 'الدوام الجزئي يكون عن بُعد دائماً'),
      ],
      correct: 0,
      feedback: L(
        'They are separate formats, so check which one an opportunity offers.',
        'هما شكلان مختلفان، لذا تحقق من الشكل الذي تقدّمه الفرصة.',
      ),
      unitIndex: 3,
    },
    {
      prompt: L('Before applying to an opportunity, check:', 'قبل التقديم على فرصة، تحقق من:'),
      options: [
        L(
          'The brief, the client expectations and your availability',
          'الوصف وتوقعات العميل وتوفرك',
        ),
        L('Only the deadline', 'الموعد النهائي فقط'),
        L('Nothing, apply to everything', 'لا شيء، أقدّم على كل شيء'),
      ],
      correct: 0,
      feedback: L(
        'Checking fit first means you apply where you can deliver well.',
        'التحقق من الملاءمة أولاً يعني أن تقدّم حيث تستطيع الإنجاز بجودة.',
      ),
      unitIndex: 3,
    },
  ],
  resources: ['proposal'],
  prerequisites: ['C01'],
  image: 'images/generated/course-C10.webp',
  note: L(
    'Project-based and part-time opportunities are shown as separate example formats.',
    'تُعرض فرص العمل بالمشروع والعمل بدوام جزئي كشكلين منفصلين على سبيل المثال.',
  ),
}
