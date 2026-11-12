import type { Course } from '@shared/types'
import { L } from '../l'

// Brief §8. Enterprise route. Fictional amounts only.
export const C08: Course = {
  id: 'C08',
  title: L('Business Model and Money Basics', 'نموذج العمل وأساسيات المال'),
  category: 'entrepreneurship',
  routes: ['enterprise'],
  minutes: 45,
  level: 'intermediate',
  delivery: 'self-paced',
  outcomes: [
    L(
      'Map customers, value, channels and key activities',
      'ترسم خريطة العملاء والقيمة والقنوات والأنشطة الرئيسية',
    ),
    L(
      'Separate setup costs, regular costs and a proposed price',
      'تميّز بين تكاليف التأسيس والتكاليف الدورية والسعر المقترح',
    ),
    L(
      'Compare optimistic and cautious cash examples',
      'تقارن بين مثال متفائل وآخر حذر للتدفق النقدي',
    ),
  ],
  units: [
    {
      id: 'C08-U1',
      title: L('Map how the business works', 'ارسم طريقة عمل المشروع'),
      synopsis: L(
        'Identify customers, value, channels and key activities.',
        'حدد العملاء والقيمة والقنوات والأنشطة الرئيسية.',
      ),
    },
    {
      id: 'C08-U2',
      title: L('Understand costs and pricing', 'افهم التكاليف والتسعير'),
      synopsis: L(
        'Separate setup costs, regular costs and a proposed price.',
        'ميّز بين تكاليف التأسيس والتكاليف الدورية والسعر المقترح.',
      ),
    },
    {
      id: 'C08-U3',
      title: L('Plan simple cash flow', 'خطّط لتدفق نقدي بسيط'),
      synopsis: L(
        'Estimate when cash comes in and when costs are paid.',
        'قدّر متى يدخل المال ومتى تُدفع التكاليف.',
      ),
    },
    {
      id: 'C08-U4',
      title: L('Check assumptions', 'تحقق من الافتراضات'),
      synopsis: L(
        'Compare an optimistic and cautious example before committing resources.',
        'قارن بين مثال متفائل وآخر حذر قبل الالتزام بالموارد.',
      ),
    },
  ],
  practicalTask: L(
    'Complete a one-page business model and a three-month sample cash plan using fictional amounts.',
    'أكمل نموذج عمل من صفحة واحدة وخطة نقدية نموذجية لثلاثة أشهر بمبالغ افتراضية.',
  ),
  output: L(
    'One-page business model and sample cash plan.',
    'نموذج عمل من صفحة واحدة وخطة نقدية نموذجية.',
  ),
  quiz: [
    {
      prompt: L(
        'Which is a setup cost rather than a regular cost?',
        'أي مما يلي تكلفة تأسيس وليس تكلفة دورية؟',
      ),
      options: [
        L('Buying a phone for bookings once', 'شراء هاتف للحجوزات مرة واحدة'),
        L('Monthly internet bill', 'فاتورة الإنترنت الشهرية'),
        L('Weekly transport', 'المواصلات الأسبوعية'),
      ],
      correct: 0,
      feedback: L(
        'Setup costs are paid once to start. Regular costs repeat every week or month.',
        'تكاليف التأسيس تُدفع مرة واحدة للبدء، والتكاليف الدورية تتكرر أسبوعياً أو شهرياً.',
      ),
      unitIndex: 1,
    },
    {
      prompt: L('In a business model, "channels" means:', 'في نموذج العمل، "القنوات" تعني:'),
      options: [
        L('How you reach and deliver to customers', 'كيف تصل إلى العملاء وتقدّم لهم الخدمة'),
        L('Television stations', 'المحطات التلفزيونية'),
        L('Your bank account', 'حسابك المصرفي'),
      ],
      correct: 0,
      feedback: L(
        'Channels are the ways customers find, buy and receive your offer.',
        'القنوات هي الطرق التي يجد بها العملاء عرضك ويشترونه ويستلمونه.',
      ),
      unitIndex: 0,
    },
    {
      prompt: L(
        'Why plan cash flow and not only total profit?',
        'لماذا نخطط للتدفق النقدي وليس للربح الإجمالي فقط؟',
      ),
      options: [
        L(
          'Costs may need paying before customers pay you',
          'قد تحتاج إلى دفع التكاليف قبل أن يدفع العملاء',
        ),
        L('Cash flow is only for large companies', 'التدفق النقدي للشركات الكبيرة فقط'),
        L('Profit is never important', 'الربح غير مهم أبداً'),
      ],
      correct: 0,
      feedback: L(
        'Timing matters. A plan shows months when cash may run short.',
        'التوقيت مهم. تُظهر الخطة الأشهر التي قد ينقص فيها المال.',
      ),
      unitIndex: 2,
    },
    {
      prompt: L('A cautious example assumes:', 'المثال الحذر يفترض:'),
      options: [
        L('Fewer customers and slower payments than hoped', 'عملاء أقل ودفعات أبطأ مما نأمل'),
        L('Every customer pays early', 'أن كل العملاء يدفعون مبكراً'),
        L('No costs at all', 'عدم وجود أي تكاليف'),
      ],
      correct: 0,
      feedback: L(
        'Comparing a cautious example helps you see risk before committing resources.',
        'المقارنة بمثال حذر تساعدك على رؤية المخاطر قبل الالتزام بالموارد.',
      ),
      unitIndex: 3,
    },
    {
      prompt: L(
        'When setting a proposed price, you should consider:',
        'عند وضع سعر مقترح، يجب أن تراعي:',
      ),
      options: [
        L(
          'Your costs and what customers can realistically pay',
          'تكاليفك وما يستطيع العملاء دفعه فعلياً',
        ),
        L('Only what a friend suggests', 'ما يقترحه صديق فقط'),
        L('The highest price you can imagine', 'أعلى سعر يمكن تخيله'),
      ],
      correct: 0,
      feedback: L(
        'A workable price covers costs and fits what customers are willing to pay.',
        'السعر المناسب يغطي التكاليف ويناسب ما يرغب العملاء في دفعه.',
      ),
      unitIndex: 1,
    },
  ],
  resources: ['cashPlan'],
  prerequisites: ['C07'],
  image: 'images/generated/course-C08.webp',
  note: L(
    'Fictional amounts only; no financing promise or registration advice.',
    'المبالغ افتراضية فقط، ولا يتضمن المحتوى وعداً بتمويل أو نصيحة بشأن تسجيل الأعمال.',
  ),
}
