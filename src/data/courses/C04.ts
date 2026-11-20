import type { Course } from '@shared/types'
import { L } from '../l'

// Brief §7. Career foundations, all routes. Educational only. Every unit has a full lesson.
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
      objective: L(
        'Break one goal into small tasks and put them in order of priority.',
        'تقسّم هدفاً واحداً إلى مهام صغيرة وترتّبها حسب الأولوية.',
      ),
      body: L(
        'Big goals can feel heavy when they sit on your list as one item. Planning makes them lighter. Write the goal at the top of a page, for example "finish the CV course". Underneath, list every small task it needs: watch Unit 1, write a first draft, ask a trainer for feedback. Each task should take no more than an hour or two. Next, decide the order. Ask two questions: what is urgent, because it has a close deadline, and what is important, because it moves the goal forward most? Do urgent and important tasks first. Then place tasks in your week, thinking about other duties such as family responsibilities, work or travel time. Leave some free space, because plans rarely go exactly as expected. Finally, cross tasks off as you finish them.',
        '',
      ),
      scenario: L(
        'Maya wants to finish two courses this month while helping in her family shop. She lists every unit as a separate task, marks the ones with deadlines as urgent and plans three short study blocks each week in the evenings.',
        'تريد مايا إنهاء دورتين هذا الشهر بينما تساعد في متجر عائلتها. تكتب كل وحدة كمهمة مستقلة، وتضع علامة "عاجل" على المهام ذات المواعيد النهائية، وتخطط لثلاث فترات دراسة قصيرة كل أسبوع في المساء.',
      ),
      takeaway: L(
        'Split big goals into small tasks, do urgent and important ones first and leave room for the unexpected.',
        'قسّم الأهداف الكبيرة إلى مهام صغيرة، وابدأ بالعاجل والمهم، واترك مساحة لما لا تتوقعه.',
      ),
      check: {
        prompt: L('Which task should usually come first?', 'أي مهمة تأتي أولاً عادةً؟'),
        options: [
          L('One that is both urgent and important', 'مهمة عاجلة ومهمة في الوقت نفسه'),
          L('The easiest one, even if it can wait', 'أسهل مهمة، حتى لو كان يمكن تأجيلها'),
          L('The one you enjoy most', 'المهمة التي تستمتع بها أكثر'),
        ],
        correct: 0,
        feedback: L(
          'Urgent and important tasks have a close deadline and move your goal forward, so they come first.',
          'المهام العاجلة والمهمة لها موعد قريب وتدفع هدفك إلى الأمام، لذا تأتي أولاً.',
        ),
      },
      hasVideo: true,
      transcript: L(
        'Welcome to Work Habits and Personal Wellbeing. This course is educational and gives practical tips for everyday life. In this first lesson we plan our time. Take one goal and write it down. Under it, list the small tasks it needs. Now ask: which tasks are urgent, and which are important? Start with the ones that are both. Then place each task in your week, around your other duties. Leave some space for surprises. When you finish a task, cross it off. Seeing progress helps you keep going.',
        '',
      ),
    },
    {
      id: 'C04-U2',
      title: L('Build dependable habits', 'ابنِ عادات يمكن الاعتماد عليها'),
      synopsis: L(
        'Use checklists, calendars and progress reviews.',
        'استخدم قوائم المهام والتقويم ومراجعات التقدّم.',
      ),
      objective: L(
        'Use a checklist, a calendar and a weekly review to stay on track.',
        'تستخدم قائمة مهام وتقويماً ومراجعة أسبوعية للبقاء على المسار.',
      ),
      body: L(
        'Being dependable means people can trust you to do what you said, when you said. Habits make this easier than willpower alone. Use three simple tools. First, a checklist for each day, with no more than five tasks. Second, a calendar for fixed times such as classes, shifts and deadlines. Add reminders the day before and an hour before. Third, a weekly review. Choose the same time each week, for example Friday evening, and spend ten minutes asking: what did I finish, what did I miss and why, and what will I change next week? Start small. One habit kept for a month is better than five habits dropped after three days. If you miss a day, simply restart the next day without blaming yourself.',
        '',
      ),
      scenario: L(
        'Fadi often forgets online sessions. He adds every session to his phone calendar with two reminders and writes a short daily checklist. On Friday evening he reviews his week and sees that he missed nothing.',
        'كثيراً ما ينسى فادي الجلسات عبر الإنترنت. يضيف كل جلسة إلى تقويم هاتفه مع تذكيرين، ويكتب قائمة مهام يومية قصيرة. وفي مساء الجمعة يراجع أسبوعه فيجد أنه لم يفوّت شيئاً.',
      ),
      takeaway: L(
        'Small, repeated habits like checklists, reminders and weekly reviews make you dependable.',
        'العادات الصغيرة المتكررة مثل قوائم المهام والتذكيرات والمراجعات الأسبوعية تجعلك شخصاً يُعتمد عليه.',
      ),
      check: {
        prompt: L(
          'What is the main purpose of a weekly review?',
          'ما الهدف الرئيسي من المراجعة الأسبوعية؟',
        ),
        options: [
          L('To see what worked and adjust next week', 'معرفة ما نجح وتعديل خطة الأسبوع القادم'),
          L('To add as many new tasks as possible', 'إضافة أكبر عدد ممكن من المهام الجديدة'),
          L('To blame yourself for missed tasks', 'لوم نفسك على المهام الفائتة'),
        ],
        correct: 0,
        feedback: L(
          'A review is for learning and adjusting, not for blame.',
          'المراجعة للتعلّم والتعديل، لا للوم.',
        ),
      },
    },
    {
      id: 'C04-U3',
      title: L('Manage pressure', 'تعامل مع الضغط'),
      synopsis: L(
        'Identify practical ways to pause, ask for help and adjust workload.',
        'حدد طرقاً عملية للتوقف وطلب المساعدة وتعديل حجم العمل.',
      ),
      objective: L(
        'Use practical steps to pause, ask for help and adjust your workload when pressure builds.',
        'تستخدم خطوات عملية للتوقف وطلب المساعدة وتعديل حجم العمل عندما يزداد الضغط.',
      ),
      body: L(
        'Everyone feels pressure sometimes, especially when study, work and family duties meet in the same week. Notice the early signs, such as poor sleep, difficulty focusing or feeling irritable. When you see them, pause. Even a few minutes away from the screen, a short walk or slow breathing can help you think more clearly. Next, look at your list. Which tasks really must happen this week, and which can move? Write them in order. Then talk to someone. Tell your trainer or supervisor early if a deadline is not realistic and suggest a new plan. Asking for help is a professional skill, not a weakness. Look after the basics too: regular meals, water, sleep and time with people who support you. This lesson offers practical tips only, not clinical advice.',
        '',
      ),
      scenario: L(
        'Karim has two course deadlines and extra shifts at the workshop in the same week. He notices he is sleeping badly. He lists his tasks, sees that one assignment can move and messages his trainer to ask for three more days. The trainer agrees a new date.',
        'لدى كريم موعدان نهائيان لدورتين ونوبات عمل إضافية في الورشة في الأسبوع نفسه. يلاحظ أن نومه أصبح سيئاً. يكتب مهامه، ويرى أن إحدى المهام يمكن تأجيلها، ويراسل مدربه طالباً ثلاثة أيام إضافية. يوافق المدرب على موعد جديد.',
      ),
      takeaway: L(
        'Notice the signs early, pause, reorder your tasks and ask for help before deadlines pass.',
        'لاحظ العلامات مبكراً، وتوقّف، وأعد ترتيب مهامك، واطلب المساعدة قبل فوات المواعيد.',
      ),
      check: {
        prompt: L(
          'You realise a deadline is not realistic. When should you tell your trainer?',
          'أدركت أن موعداً نهائياً غير واقعي. متى تخبر مدربك؟',
        ),
        options: [
          L(
            'As early as possible, with a suggested new plan',
            'في أقرب وقت ممكن، مع اقتراح خطة جديدة',
          ),
          L('After the deadline has passed', 'بعد انقضاء الموعد النهائي'),
          L('Never, it is better to stay silent', 'أبداً، من الأفضل أن أصمت'),
        ],
        correct: 0,
        feedback: L(
          'Telling your trainer early gives you both time to adjust the plan.',
          'إخبار المدرب مبكراً يمنحكما وقتاً لتعديل الخطة.',
        ),
      },
      hasVideo: true,
      transcript: L(
        'In this lesson we talk about pressure. Pressure is normal, but it helps to notice it early. Maybe you are sleeping badly, or finding it hard to focus. When that happens, pause. Step away for a few minutes and breathe slowly. Then look at your tasks and decide what can move. Next, talk to someone. Your trainer would rather hear about a problem early than late. Karim did this and agreed a new date for his assignment. Remember, this course shares practical tips. If stress feels heavy, ask your trainer about support.',
        '',
      ),
    },
    {
      id: 'C04-U4',
      title: L('Set boundaries and seek support', 'ضع حدوداً واطلب الدعم'),
      synopsis: L(
        'Recognise when to contact a trainer or appropriate support service.',
        'تعرّف على الوقت المناسب للتواصل مع مدرب أو خدمة دعم مناسبة.',
      ),
      objective: L(
        'Set healthy limits on your time and know when to contact a trainer or an appropriate support service.',
        'تضع حدوداً صحية لوقتك وتعرف متى تتواصل مع مدرب أو خدمة دعم مناسبة.',
      ),
      body: L(
        'Boundaries are the limits that protect your time, energy and wellbeing. Examples include agreeing set study hours, not answering group messages late at night and saying "I cannot take this on this week" when your list is already full. You can say no politely and still be a good teammate, especially if you suggest another time or person. Sometimes pressure becomes more than practical tips can solve. If stress, worry or low mood affects your sleep, eating, relationships or daily life for a long time, reach out. Start with someone you trust, such as your trainer, who can help you find an appropriate support service. Seeking support is a sign of strength. This course is educational only and does not replace a professional assessment or treatment.',
        '',
      ),
      scenario: L(
        "Salma's group chat sends messages late every night and she feels she must answer straight away. She tells the group she will reply between 9 am and 8 pm. When worry starts to affect her sleep for several weeks, she speaks with her trainer, who shares details of a support service.",
        'تصل إلى سلمى رسائل من مجموعة المحادثة في وقت متأخر كل ليلة وتشعر أن عليها الرد فوراً. تخبر المجموعة أنها سترد بين التاسعة صباحاً والثامنة مساءً. وعندما يبدأ القلق بالتأثير في نومها عدة أسابيع، تتحدث مع مدربتها التي تزوّدها بمعلومات عن خدمة دعم.',
      ),
      takeaway: L(
        'Healthy boundaries protect your energy, and asking for support early is a sign of strength.',
        'الحدود الصحية تحمي طاقتك، وطلب الدعم مبكراً علامة قوة.',
      ),
      check: {
        prompt: L(
          'Worry has affected your sleep for several weeks. What is a good step?',
          'يؤثر القلق في نومك منذ عدة أسابيع. ما الخطوة المناسبة؟',
        ),
        options: [
          L(
            'Talk to your trainer about an appropriate support service',
            'أتحدث مع المدرب عن خدمة دعم مناسبة',
          ),
          L('Ignore it until it goes away', 'أتجاهله حتى يزول'),
          L('Rely only on this course', 'أعتمد على هذه الدورة فقط'),
        ],
        correct: 0,
        feedback: L(
          'A trainer can help you find the right support. This course is educational and does not replace it.',
          'يمكن للمدرب مساعدتك في الوصول إلى الدعم المناسب، وهذه الدورة تعليمية ولا تغني عنه.',
        ),
      },
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
