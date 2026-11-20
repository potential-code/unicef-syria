import type { Course } from '@shared/types'
import { L } from '../l'

// Brief §9. Freelance route. Every unit has a full lesson.
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
      objective: L(
        'Connect one skill you already have to a realistic need that a client or employer has.',
        'تربط مهارة تملكها فعلاً باحتياج واقعي لدى عميل أو صاحب عمل.',
      ),
      body: L(
        'Freelance and part-time work start with a simple match: a skill you can already show, and a need someone is willing to pay for. Begin by listing three skills you use with confidence, for example typing in Arabic and English, basic photo editing, tutoring a school subject or organising events. Next, think about who needs that skill. Small shops, training centres, families and local organisations all have tasks they find hard to do themselves. For each skill, write one sentence: "I can help this type of client with this task." Then decide the format. Project-based work ends when you deliver a result. Part-time work means regular hours with one organisation. Both are valid. Start with something small and realistic that you could explain and deliver well this month, not the highest-paid service you have seen online.',
        '',
      ),
      scenario: L(
        'Sami is good at typing and formatting documents. He writes: "I can help small training centres turn handwritten notes into clean, printable handouts." He decides to offer it as project-based work first, because his study timetable changes each term.',
        'يجيد سامي كتابة المستندات وتنسيقها. يكتب: "أستطيع مساعدة مراكز التدريب الصغيرة على تحويل الملاحظات المكتوبة بخط اليد إلى نشرات مرتبة جاهزة للطباعة." ويقرر أن يقدّمها في البداية كعمل بالمشروع، لأن جدول دراسته يتغير كل فصل.',
      ),
      takeaway: L(
        'Match a skill you can show today to a specific client need, then choose project-based or part-time work.',
        'طابق مهارة تستطيع إثباتها اليوم مع احتياج محدد لدى عميل، ثم اختر العمل بالمشروع أو بدوام جزئي.',
      ),
      check: {
        prompt: L(
          'Which is the best starting point for a first service?',
          'ما أفضل نقطة انطلاق لخدمة أولى؟',
        ),
        options: [
          L(
            'A skill you already use, linked to a real client need',
            'مهارة تستخدمها فعلاً، مرتبطة باحتياج حقيقي لدى العميل',
          ),
          L('The service with the highest fee online', 'الخدمة ذات الأجر الأعلى على الإنترنت'),
          L('A skill you plan to learn next year', 'مهارة تخطط لتعلّمها العام القادم'),
        ],
        correct: 0,
        feedback: L(
          'Starting from a skill you can show makes it easier to deliver well and build trust.',
          'البدء بمهارة يمكنك إثباتها يسهّل عليك الإنجاز بجودة وبناء الثقة.',
        ),
      },
      hasVideo: true,
      transcript: L(
        'Welcome to Freelance and Part Time Foundations. Let us start with you. Write down three skills you already use with confidence. Maybe typing, translation, tutoring or editing photos. Now think about who needs that skill. A small shop? A training centre? A local organisation? Make one sentence for each: I can help this client with this task. Then choose a format. Project work ends with a delivery. Part-time work means regular hours. Sami chose project work because his study timetable changes. Pick something small and realistic that you can deliver well.',
        '',
      ),
    },
    {
      id: 'C10-U2',
      title: L('Define a clear scope', 'حدّد نطاقاً واضحاً'),
      synopsis: L('Describe deliverables, boundaries and timing.', 'صِف المخرجات والحدود والتوقيت.'),
      objective: L(
        'Write a clear scope that lists deliverables, what is not included and the timing.',
        'تكتب نطاقاً واضحاً يحدد المخرجات وما لا يشمله العمل والتوقيت.',
      ),
      body: L(
        'Scope is the agreement about what you will do. Without it, a small task can slowly become a large one, and both sides can feel let down. A clear scope has three parts. Deliverables: the exact things you will hand over, such as "five formatted handouts in PDF and Word". Boundaries: what is not included, for example printing, translation or more than one round of changes. Timing: when you will start, when the client will receive a draft and when the final version is due. Write the scope in short bullet points and share it with the client before you begin. Ask them to confirm it in writing, even with a short message. If they later ask for something outside the scope, you can refer back to it calmly and discuss changes to time or fee.',
        '',
      ),
      scenario: L(
        'Maya agrees to design a simple menu for a local café. Her scope says: one A4 menu in Arabic and English, two rounds of changes, draft in four days, final file in seven days. It also says that printing and photography are not included. The owner confirms it by message.',
        'توافق مايا على تصميم قائمة طعام بسيطة لمقهى محلي. يذكر نطاق عملها: قائمة واحدة بحجم A4 بالعربية والإنجليزية، وجولتان من التعديلات، ومسودة خلال أربعة أيام، والملف النهائي خلال سبعة أيام. ويذكر أيضاً أن الطباعة والتصوير غير مشمولين. يؤكد صاحب المقهى ذلك برسالة.',
      ),
      takeaway: L(
        'Write down deliverables, boundaries and timing, and get the client to confirm them before you start.',
        'دوّن المخرجات والحدود والتوقيت، واطلب من العميل تأكيدها قبل أن تبدأ.',
      ),
      check: {
        prompt: L('Which line describes a boundary in a scope?', 'أي سطر يصف حدّاً من حدود النطاق؟'),
        options: [
          L('Printing is not included', 'الطباعة غير مشمولة'),
          L('One A4 menu in two languages', 'قائمة واحدة بحجم A4 بلغتين'),
          L('Final file in seven days', 'الملف النهائي خلال سبعة أيام'),
        ],
        correct: 0,
        feedback: L(
          'Boundaries say what is not part of the work. The other lines are a deliverable and a timing.',
          'الحدود توضح ما ليس جزءاً من العمل. أما السطران الآخران فهما مخرَج وتوقيت.',
        ),
      },
    },
    {
      id: 'C10-U3',
      title: L('Plan availability and pricing', 'خطّط لتوفرك وتسعيرك'),
      synopsis: L(
        'Estimate effort and explain a proposed fee or availability.',
        'قدّر الجهد ووضّح الأجر المقترح أو أوقات توفرك.',
      ),
      objective: L(
        'Estimate the effort a task needs and explain your proposed fee or availability clearly.',
        'تقدّر الجهد الذي تحتاجه المهمة وتشرح أجرك المقترح أو أوقات توفرك بوضوح.',
      ),
      body: L(
        'Before you agree a fee or a schedule, estimate the effort. Break the task into small steps and guess the hours for each one: understanding the brief, doing the work, checking it and making changes. Add a little extra time, because first tasks usually take longer than expected. Then look at your week honestly. Mark the hours already taken by study, family, travel and rest. The hours left are your real availability. For project work, link your proposed fee to the estimated hours and deliverables, so the client can see how you reached it. For part-time roles, state the days and hours you can commit to each week. Write it simply, for example "about six hours over four days" or "available Sunday to Tuesday afternoons". A clear, honest estimate is more useful than a fast promise you cannot keep.',
        '',
      ),
      scenario: L(
        'Hala is asked to tutor maths for two school students. She estimates one hour of preparation and two hours of teaching each week. Her university classes fill her mornings, so she offers Monday and Wednesday afternoons and explains her proposed fee per session.',
        'يُطلب من هالة تدريس الرياضيات لطالبين في المدرسة. تقدّر ساعة للتحضير وساعتين للتدريس كل أسبوع. محاضراتها الجامعية تشغل صباحاتها، لذا تعرض أيام الاثنين والأربعاء بعد الظهر وتوضح أجرها المقترح للجلسة الواحدة.',
      ),
      takeaway: L(
        'Break the task into steps, add buffer time and offer only the hours you truly have.',
        'قسّم المهمة إلى خطوات، وأضف وقتاً احتياطياً، ولا تعرض إلا الساعات المتاحة لديك فعلاً.',
      ),
      check: {
        prompt: L(
          'Why add extra time to your first estimate?',
          'لماذا تضيف وقتاً إضافياً إلى تقديرك الأول؟',
        ),
        options: [
          L(
            'First tasks often take longer than expected',
            'المهام الأولى تستغرق غالباً وقتاً أطول من المتوقع',
          ),
          L('To charge more for no reason', 'لأطلب أجراً أعلى دون سبب'),
          L('Because clients never check deadlines', 'لأن العملاء لا يتحققون من المواعيد أبداً'),
        ],
        correct: 0,
        feedback: L(
          'A small buffer helps you deliver on time, even when the work turns out harder than planned.',
          'الوقت الاحتياطي الصغير يساعدك على التسليم في الموعد، حتى عندما يكون العمل أصعب مما خططت.',
        ),
      },
      hasVideo: true,
      transcript: L(
        'In this lesson we plan availability and pricing. First, estimate the effort. Break the task into steps: reading the brief, doing the work, checking it and making changes. Guess the hours for each, then add a little extra. Next, look at your real week. Study, family and travel come first. The hours left are your availability. Now you can explain a proposed fee or a schedule. Link the fee to the effort and the deliverables. Hala offered two afternoons a week because her mornings are full. Honest planning builds trust.',
        '',
      ),
    },
    {
      id: 'C10-U4',
      title: L('Evaluate an opportunity', 'قيّم الفرصة'),
      synopsis: L(
        'Check the brief, client expectations and fit before applying.',
        'راجع الوصف وتوقعات العميل ومدى الملاءمة قبل التقديم.',
      ),
      objective: L(
        'Check an opportunity brief, the client expectations and your own fit before you apply.',
        'تراجع وصف الفرصة وتوقعات العميل ومدى ملاءمتك قبل التقديم.',
      ),
      body: L(
        'Not every opportunity is right for you, and that is fine. Before applying, read the brief carefully and answer four questions. What exactly will I deliver, and is it clear? Do I have the skills and a work sample that shows them? Can I meet the timing with my real availability? Is the format project-based or part-time, and is that what I want? Also look for warning signs. Be careful with unclear tasks, requests to work for free for a long "trial", or requests for personal documents or payment before any work starts. If something is unclear, it is professional to ask a short question before applying. Choosing fewer opportunities that fit well is better than applying everywhere and delivering poorly. Keep a short list of opportunities you checked and why you applied or skipped each one.',
        '',
      ),
      scenario: L(
        'Sami finds two sample opportunities. One is a project to format ten handouts in a week, which fits his skills and time. The other asks for full-time hours during his exams. He applies to the first and notes why he skipped the second.',
        'يجد سامي فرصتين نموذجيتين. الأولى مشروع لتنسيق عشر نشرات خلال أسبوع، وهي تناسب مهاراته ووقته. والثانية تطلب ساعات عمل كاملة خلال فترة امتحاناته. يتقدّم إلى الأولى ويدوّن سبب تركه للثانية.',
      ),
      takeaway: L(
        'Apply where the brief is clear, your skills match and the timing fits your real availability.',
        'قدّم حيث يكون الوصف واضحاً ومهاراتك مناسبة والتوقيت ملائماً لتوفرك الفعلي.',
      ),
      check: {
        prompt: L(
          'A client asks you to pay a fee before they share the task. What should you do?',
          'يطلب منك عميل دفع رسوم قبل أن يشاركك المهمة. ماذا تفعل؟',
        ),
        options: [
          L('Treat it as a warning sign and do not pay', 'أعدّها علامة تحذير ولا أدفع'),
          L('Pay quickly so you do not miss it', 'أدفع بسرعة حتى لا تفوتني'),
          L('Send your ID documents as well', 'أرسل وثائق هويتي أيضاً'),
        ],
        correct: 0,
        feedback: L(
          'Requests for payment or personal documents before any work are warning signs. Ask a trusted adviser if unsure.',
          'طلب المال أو الوثائق الشخصية قبل أي عمل علامة تحذير. استشر شخصاً تثق به إن لم تكن متأكداً.',
        ),
      },
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
