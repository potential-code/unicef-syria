import type { Course } from '@shared/types'
import { L } from '../l'

// Brief §7. Career foundations, all routes. Educational only.
export const C04: Course = {
  id: 'C04',
  title: L('Work Habits and Personal Wellbeing', 'عادات العمل والرفاه الشخصي'),
  category: 'foundations',
  routes: 'all',
  minutes: 30,
  level: 'beginner',
  delivery: 'self-paced',
  outcomes: [
    L('Break a goal into tasks and priorities', 'تقسّم الهدف إلى مهام وأولويات'),
    L('Use checklists and calendars to stay on track', 'تستخدم قوائم المهام والتقويم للمتابعة'),
    L('Know when and how to ask for support', 'تعرف متى وكيف تطلب الدعم'),
  ],
  units: [
    {
      id: 'C04-U1',
      title: L('Plan your time', 'خطّط لوقتك'),
      synopsis: L(
        'Break a goal into manageable tasks and priorities.',
        'قسّم الهدف إلى مهام وأولويات يمكن إدارتها.',
      ),
    },
    {
      id: 'C04-U2',
      title: L('Build dependable habits', 'ابنِ عادات يمكن الاعتماد عليها'),
      synopsis: L(
        'Use checklists, calendars and progress reviews.',
        'استخدم قوائم المهام والتقويم ومراجعات التقدّم.',
      ),
    },
    {
      id: 'C04-U3',
      title: L('Manage pressure', 'تعامل مع الضغط'),
      synopsis: L(
        'Identify practical ways to pause, ask for help and adjust workload.',
        'حدد طرقاً عملية للتوقف وطلب المساعدة وتعديل حجم العمل.',
      ),
    },
    {
      id: 'C04-U4',
      title: L('Set boundaries and seek support', 'ضع حدوداً واطلب الدعم'),
      synopsis: L(
        'Recognise when to contact a trainer or appropriate support service.',
        'تعرّف على الوقت المناسب للتواصل مع مدرب أو خدمة دعم مناسبة.',
      ),
    },
  ],
  practicalTask: L(
    'Create a weekly plan that lists your learning and work tasks, their priority and one review point.',
    'أنشئ خطة أسبوعية تتضمن مهام التعلّم والعمل وأولوياتها ونقطة مراجعة واحدة.',
  ),
  output: L('A weekly learning and work plan.', 'خطة أسبوعية للتعلّم والعمل.'),
  quiz: [
    {
      prompt: L(
        'A large goal feels hard to start. What helps most?',
        'هدف كبير يبدو صعب البدء. ما الذي يساعد أكثر؟',
      ),
      options: [
        L(
          'Break it into small tasks and pick the first one',
          'تقسيمه إلى مهام صغيرة واختيار أولها',
        ),
        L('Wait until you feel ready', 'الانتظار حتى أشعر بالاستعداد'),
        L('Do everything in one night', 'إنجاز كل شيء في ليلة واحدة'),
      ],
      correct: 0,
      feedback: L(
        'Small tasks make a goal manageable and show you where to start.',
        'المهام الصغيرة تجعل الهدف قابلاً للإدارة وتوضح نقطة البداية.',
      ),
      unitIndex: 0,
    },
    {
      prompt: L('Why is a weekly progress review useful?', 'لماذا تفيد مراجعة التقدّم الأسبوعية؟'),
      options: [
        L('It shows what worked and what to adjust', 'تُظهر ما نجح وما يحتاج إلى تعديل'),
        L('It replaces doing the tasks', 'تغني عن تنفيذ المهام'),
        L('It is only for trainers', 'إنها للمدربين فقط'),
      ],
      correct: 0,
      feedback: L(
        'Regular reviews help you notice progress and change your plan early.',
        'المراجعة المنتظمة تساعدك على ملاحظة التقدّم وتعديل خطتك مبكراً.',
      ),
      unitIndex: 1,
    },
    {
      prompt: L(
        'You feel overloaded with tasks this week. A practical step is to:',
        'تشعر بضغط كبير من المهام هذا الأسبوع. الخطوة العملية هي:',
      ),
      options: [
        L(
          'Pause, list priorities and ask your trainer about deadlines',
          'التوقف وترتيب الأولويات وسؤال المدرب عن المواعيد',
        ),
        L('Hide the problem', 'إخفاء المشكلة'),
        L('Stop all learning', 'إيقاف كل التعلّم'),
      ],
      correct: 0,
      feedback: L(
        'Pausing and asking for help early lets you adjust your workload.',
        'التوقف وطلب المساعدة مبكراً يتيحان لك تعديل حجم العمل.',
      ),
      unitIndex: 2,
    },
    {
      prompt: L('Which is an example of a healthy boundary?', 'أي مما يلي مثال على حدّ صحي؟'),
      options: [
        L(
          'Agreeing set hours for study and keeping them',
          'الاتفاق على ساعات محددة للدراسة والالتزام بها',
        ),
        L('Answering every message at any hour', 'الرد على كل رسالة في أي ساعة'),
        L('Never saying no to extra work', 'عدم رفض أي عمل إضافي أبداً'),
      ],
      correct: 0,
      feedback: L(
        'Clear, agreed hours protect both your learning time and your rest.',
        'الساعات الواضحة المتفق عليها تحمي وقت تعلّمك وراحتك.',
      ),
      unitIndex: 3,
    },
    {
      prompt: L(
        'If stress is affecting your daily life, what should you do?',
        'إذا كان التوتر يؤثر في حياتك اليومية، ماذا تفعل؟',
      ),
      options: [
        L(
          'Contact your trainer or an appropriate support service',
          'أتواصل مع المدرب أو خدمة دعم مناسبة',
        ),
        L('Rely only on this course', 'أعتمد على هذه الدورة فقط'),
        L('Keep it to yourself', 'أحتفظ بالأمر لنفسي'),
      ],
      correct: 0,
      feedback: L(
        'This course is educational. A trainer can help you find the right support service.',
        'هذه الدورة تعليمية فقط. يمكن للمدرب مساعدتك في الوصول إلى خدمة الدعم المناسبة.',
      ),
      unitIndex: 3,
    },
  ],
  resources: ['actionPlan'],
  prerequisites: [],
  image: 'images/generated/course-C04.webp',
  note: L(
    'Educational only; not clinical assessment or treatment.',
    'محتوى تعليمي فقط، ولا يقدّم تقييماً أو علاجاً سريرياً.',
  ),
}
