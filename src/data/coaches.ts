import type { Coach, CoachId, CoachStep, Localized } from '@shared/types'
import { L } from './l'

// Brief §12 (AI coaches and sample interactions) and §13 (AI practice outcomes).
// Scripted branching only: no unrestricted chat. Unrecognised prompts go to 'fallback'.
// Coaches never predict hiring, give clinical advice or promise funding.

type Starter = { label: Localized; step: string }

/** Every coach shares the same fallback wording, with replies back to its own starters. */
function fallback(starters: Starter[]): CoachStep {
  return {
    id: 'fallback',
    coach: L(
      'I can help with these topics. Try one of the questions below, or ask a mentor for human support.',
      'يمكنني المساعدة في هذه المواضيع. جرّب أحد الأسئلة أدناه، أو اطلب دعمًا بشريًا من أحد المرشدين.',
    ),
    replies: starters.map((s) => ({ label: s.label, next: s.step })),
  }
}

// ---------------------------------------------------------------- Nour AI, Career Navigator

const navigatorStarters: Starter[] = [
  {
    label: L('Help me understand my career profile', 'ساعدني على فهم ملفي المهني'),
    step: 'profile',
  },
  { label: L('Compare my three routes', 'قارن بين مساراتي الثلاثة'), step: 'compare' },
  { label: L('What should I do next?', 'ما الخطوة التالية التي عليّ القيام بها؟'), step: 'next' },
]

const routeReplies = [
  { label: L('Employment', 'التوظيف'), next: 'employment' },
  { label: L('Building a business', 'بناء مشروع تجاري'), next: 'business' },
  { label: L('Freelance work', 'العمل الحر'), next: 'freelance' },
]

const navigator: Coach = {
  id: 'navigator',
  name: L('Nour AI', 'نور AI'),
  title: L('Career Navigator', 'مرشدة المسار المهني'),
  purpose: L(
    'Assessment explanation, route exploration and next steps.',
    'شرح نتائج التقييم، واستكشاف المسارات، وتحديد الخطوات التالية.',
  ),
  image: 'images/generated/coach-navigator.webp',
  starters: navigatorStarters,
  steps: [
    {
      id: 'profile',
      coach: L(
        'Your strongest preferences are communication and organisation. You may enjoy customer-facing or coordination work. Would you like to explore employment, building a business or freelance work?',
        'أقوى تفضيلاتك هي التواصل والتنظيم. قد تستمتع بالعمل الذي يتضمن التعامل مع العملاء أو التنسيق. هل تود استكشاف التوظيف، أم بناء مشروع تجاري، أم العمل الحر؟',
      ),
      replies: routeReplies,
    },
    {
      id: 'employment',
      coach: L(
        'These courses build communication, CV and customer-service skills for employment. You can add any of them to your plan. A profile helps you explore options; it does not decide your future.',
        'تبني هذه الدورات مهارات التواصل وكتابة السيرة الذاتية وخدمة العملاء للتوظيف. يمكنك إضافة أي منها إلى خطتك. يساعدك ملفك على استكشاف الخيارات، لكنه لا يحدد مستقبلك.',
      ),
      courses: [
        {
          courseId: 'C03',
          reason: L(
            'Builds on your communication preference: listening, clear messages and handling a service problem.',
            'تبني على تفضيلك للتواصل: الإصغاء، وكتابة رسائل واضحة، والتعامل مع مشكلة في الخدمة.',
          ),
        },
        {
          courseId: 'C05',
          reason: L(
            'Helps you build an honest CV and turn your training activities into clear evidence.',
            'تساعدك على إعداد سيرة ذاتية صادقة وتحويل أنشطتك التدريبية إلى أدلة واضحة.',
          ),
        },
        {
          courseId: 'C13',
          reason: L(
            'A practical taster in handling enquiries and keeping simple office records, matching your organisation preference.',
            'تجربة عملية في التعامل مع الاستفسارات ومسك السجلات المكتبية البسيطة، تتوافق مع تفضيلك للتنظيم.',
          ),
        },
      ],
      replies: [
        { label: L('What should I do next?', 'ما الخطوة التالية؟'), next: 'next' },
        { label: L('Compare my three routes', 'قارن بين مساراتي الثلاثة'), next: 'compare' },
      ],
    },
    {
      id: 'business',
      coach: L(
        'If you want to build a business, start by understanding a customer problem, then learn how a business covers its costs. These courses use fictional examples only.',
        'إذا كنت ترغب في بناء مشروع تجاري، فابدأ بفهم مشكلة العميل، ثم تعلّم كيف يغطي المشروع تكاليفه. تستخدم هذه الدورات أمثلة افتراضية فقط.',
      ),
      courses: [
        {
          courseId: 'C07',
          reason: L(
            'Teaches you to describe a real customer problem and ask open questions before building anything.',
            'تعلّمك وصف مشكلة حقيقية لدى العميل وطرح أسئلة مفتوحة قبل بناء أي شيء.',
          ),
        },
        {
          courseId: 'C08',
          reason: L(
            'Uses your organisation strength to map costs, pricing and a simple cash plan.',
            'توظّف قدرتك على التنظيم في رسم التكاليف والتسعير وخطة نقدية بسيطة.',
          ),
        },
      ],
      replies: [
        {
          label: L('Explore employment instead', 'استكشف التوظيف بدلًا من ذلك'),
          next: 'employment',
        },
        { label: L('Explore freelance work', 'استكشف العمل الحر'), next: 'freelance' },
      ],
    },
    {
      id: 'freelance',
      coach: L(
        'Freelance work means offering a defined service to clients, one project at a time. These courses help you choose a service and present your work honestly.',
        'يعني العمل الحر تقديم خدمة محددة للعملاء، مشروعًا تلو الآخر. تساعدك هذه الدورات على اختيار خدمة وعرض أعمالك بصدق.',
      ),
      courses: [
        {
          courseId: 'C10',
          reason: L(
            'Connects a skill you already have to a realistic client need, with a clear scope and availability.',
            'تربط مهارة تملكها بالفعل بحاجة واقعية لدى العميل، مع نطاق عمل وأوقات توفر واضحة.',
          ),
        },
        {
          courseId: 'C11',
          reason: L(
            'Helps you build a small portfolio and write a focused proposal for a client brief.',
            'تساعدك على بناء ملف أعمال صغير وكتابة مقترح مركّز استجابةً لطلب العميل.',
          ),
        },
      ],
      replies: [
        {
          label: L('Explore employment instead', 'استكشف التوظيف بدلًا من ذلك'),
          next: 'employment',
        },
        { label: L('Explore building a business', 'استكشف بناء مشروع تجاري'), next: 'business' },
      ],
    },
    {
      id: 'compare',
      coach: L(
        'Employment gives a regular role and team, and usually needs a CV and interview. Building a business means testing an idea with customers and managing costs. Freelance work means delivering defined services to different clients. Each route has trade-offs, and you can change direction later. Which one would you like to look at?',
        'يوفر التوظيف دورًا ثابتًا وفريق عمل، ويتطلب عادةً سيرة ذاتية ومقابلة. أما بناء مشروع تجاري فيعني اختبار فكرة مع العملاء وإدارة التكاليف. ويعني العمل الحر تقديم خدمات محددة لعملاء مختلفين. لكل مسار مزايا وتحديات، ويمكنك تغيير اتجاهك لاحقًا. أي مسار تود الاطلاع عليه؟',
      ),
      replies: routeReplies,
    },
    {
      id: 'next',
      coach: L(
        'You enjoy helping people and organising work. Your next action is to finish C05 Unit 3 and save a CV draft. Here is a short plan you can edit and save.',
        'تستمتع بمساعدة الناس وتنظيم العمل. خطوتك التالية هي إنهاء الوحدة الثالثة من الدورة C05 وحفظ مسودة لسيرتك الذاتية. إليك خطة قصيرة يمكنك تعديلها وحفظها.',
      ),
      draft: {
        target: 'plan',
        text: L(
          'Goal: prepare for a customer-service role.\n1. This week: finish C05 Unit 3 and save one honest CV bullet.\n2. Next week: complete C03 and practise one customer-service interview question.\n3. This month: review O01 and decide whether to apply.',
        ),
      },
      replies: [
        { label: L('Why these courses?', 'لماذا هذه الدورات؟'), next: 'employment' },
        { label: L('Compare my three routes', 'قارن بين مساراتي الثلاثة'), next: 'compare' },
      ],
    },
    fallback(navigatorStarters),
  ],
}

// ---------------------------------------------------------------- Rami AI, Learning Companion

const learningStarters: Starter[] = [
  { label: L('Explain this lesson simply', 'اشرح هذا الدرس ببساطة'), step: 'explain' },
  { label: L('Test my understanding', 'اختبر فهمي'), step: 'test' },
  { label: L('Which course helps my goal?', 'أي دورة تساعدني على تحقيق هدفي؟'), step: 'goal' },
]

const learning: Coach = {
  id: 'learning',
  name: L('Rami AI', 'رامي AI'),
  title: L('Learning Companion', 'رفيق التعلّم'),
  purpose: L(
    'Explains course concepts and recommends learning already in the library.',
    'يشرح مفاهيم الدورات ويقترح محتوى تعليميًا متوفرًا في المكتبة.',
  ),
  image: 'images/generated/coach-learning.webp',
  starters: learningStarters,
  steps: [
    {
      id: 'explain',
      coach: L('Which lesson would you like me to explain?', 'أي درس تود أن أشرحه لك؟'),
      replies: [
        {
          label: L(
            'C05 Unit 3: Show evidence of skills',
            'C05 الوحدة 3: إظهار الأدلة على المهارات',
          ),
          next: 'explainC05',
        },
        {
          label: L(
            'C03 Unit 1: Listen and ask clear questions',
            'C03 الوحدة 1: الإصغاء وطرح أسئلة واضحة',
          ),
          next: 'explainC03',
        },
      ],
    },
    {
      id: 'explainC05',
      coach: L(
        'In simple words: an employer cannot see what you did, so your CV must show it. Replace a vague claim like "helped at events" with what you actually did, such as "Registered participants and coordinated the attendance list for a training event". Never invent experience or numbers you cannot verify.',
        'بكلمات بسيطة: لا يستطيع صاحب العمل أن يرى ما قمت به، لذا يجب أن تُظهره سيرتك الذاتية. استبدل عبارة عامة مثل "ساعدت في الفعاليات" بما فعلته حقًا، مثل "سجّلت المشاركين ونسّقت قائمة الحضور في فعالية تدريبية". لا تخترع خبرة أو أرقامًا لا يمكنك التحقق منها.',
      ),
      replies: [
        { label: L('Test my understanding', 'اختبر فهمي'), next: 'test' },
        { label: L('Explain another lesson', 'اشرح درسًا آخر'), next: 'explain' },
      ],
    },
    {
      id: 'explainC03',
      coach: L(
        'In simple words: before you act, make sure you understand what the other person needs. Listen fully, then ask a short question to confirm, for example "Do you need the report today or by the end of the week?" This avoids mistakes and saves time for both of you.',
        'بكلمات بسيطة: قبل أن تبدأ العمل، تأكد من أنك تفهم ما يحتاجه الشخص الآخر. أصغِ جيدًا، ثم اطرح سؤالًا قصيرًا للتأكد، مثل "هل تحتاج التقرير اليوم أم بنهاية الأسبوع؟" هذا يجنّبك الأخطاء ويوفر الوقت عليكما.',
      ),
      replies: [
        { label: L('Test my understanding', 'اختبر فهمي'), next: 'test' },
        { label: L('Explain another lesson', 'اشرح درسًا آخر'), next: 'explain' },
      ],
    },
    {
      id: 'test',
      coach: L(
        'Quick question from C03: a colleague sends you an unclear request. What is your best first response?',
        'سؤال سريع من الدورة C03: أرسل لك زميل طلبًا غير واضح. ما أفضل استجابة أولى؟',
      ),
      replies: [
        { label: L('Ask clarifying questions', 'أطرح أسئلة توضيحية'), next: 'testRight' },
        { label: L('Start the task straight away', 'أبدأ المهمة فورًا'), next: 'testWrong' },
      ],
    },
    {
      id: 'testRight',
      coach: L(
        'Correct. Asking clarifying questions first confirms what is needed before you spend time on the task. This is covered in C03 Unit 1.',
        'إجابة صحيحة. طرح أسئلة توضيحية أولًا يؤكد المطلوب قبل أن تقضي وقتك في المهمة. يتناول ذلك الدرس الأول من الدورة C03.',
      ),
      replies: [
        { label: L('Explain a lesson', 'اشرح درسًا'), next: 'explain' },
        {
          label: L('Which course helps my goal?', 'أي دورة تساعدني على تحقيق هدفي؟'),
          next: 'goal',
        },
      ],
    },
    {
      id: 'testWrong',
      coach: L(
        'Not quite. If you start straight away, you may do the wrong thing. The better first step is to ask clarifying questions. You can review this in C03 Unit 1.',
        'ليس تمامًا. إذا بدأت فورًا فقد تنجز شيئًا غير المطلوب. الخطوة الأولى الأفضل هي طرح أسئلة توضيحية. يمكنك مراجعة ذلك في الدرس الأول من الدورة C03.',
      ),
      replies: [
        { label: L('Try again', 'حاول مجددًا'), next: 'test' },
        { label: L('Explain the lesson simply', 'اشرح الدرس ببساطة'), next: 'explainC03' },
      ],
    },
    {
      id: 'goal',
      coach: L('What is your main goal right now?', 'ما هدفك الرئيسي حاليًا؟'),
      replies: [
        { label: L('Get a job', 'الحصول على وظيفة'), next: 'goalJob' },
        { label: L('Start a small business', 'بدء مشروع صغير'), next: 'goalBusiness' },
        { label: L('Find freelance work', 'إيجاد عمل حر'), next: 'goalFreelance' },
      ],
    },
    {
      id: 'goalJob',
      coach: L(
        'These library courses support a job search.',
        'تدعم هذه الدورات من المكتبة البحث عن وظيفة.',
      ),
      courses: [
        {
          courseId: 'C05',
          reason: L(
            'Build an honest CV linked to a sample vacancy.',
            'إعداد سيرة ذاتية صادقة مرتبطة بوظيفة نموذجية.',
          ),
        },
        {
          courseId: 'C06',
          reason: L(
            'Practise answering common interview questions.',
            'التدرب على الإجابة عن أسئلة المقابلات الشائعة.',
          ),
        },
      ],
      replies: [{ label: L('Choose another goal', 'اختر هدفًا آخر'), next: 'goal' }],
    },
    {
      id: 'goalBusiness',
      coach: L(
        'These library courses support a new business idea.',
        'تدعم هذه الدورات من المكتبة فكرة مشروع جديد.',
      ),
      courses: [
        {
          courseId: 'C07',
          reason: L(
            'Test your idea by talking to potential customers.',
            'اختبار فكرتك بالتحدث مع عملاء محتملين.',
          ),
        },
        {
          courseId: 'C09',
          reason: L(
            'Explain your offer and choose practical sales channels.',
            'شرح عرضك واختيار قنوات بيع عملية.',
          ),
        },
      ],
      replies: [{ label: L('Choose another goal', 'اختر هدفًا آخر'), next: 'goal' }],
    },
    {
      id: 'goalFreelance',
      coach: L(
        'These library courses support freelance work.',
        'تدعم هذه الدورات من المكتبة العمل الحر.',
      ),
      courses: [
        {
          courseId: 'C11',
          reason: L(
            'Create a portfolio card and a proposal draft.',
            'إنشاء بطاقة لملف أعمالك ومسودة مقترح.',
          ),
        },
        {
          courseId: 'C12',
          reason: L(
            'Plan milestones and handle client changes.',
            'تخطيط المراحل والتعامل مع تغييرات العميل.',
          ),
        },
      ],
      replies: [{ label: L('Choose another goal', 'اختر هدفًا آخر'), next: 'goal' }],
    },
    fallback(learningStarters),
  ],
}

// ---------------------------------------------------------------- Lina AI, CV and Interview Coach

const cvStarters: Starter[] = [
  { label: L('Improve this CV bullet', 'حسّن هذه النقطة في سيرتي الذاتية'), step: 'bullet' },
  {
    label: L('Practise a customer-service interview', 'تدرّب على مقابلة لوظيفة خدمة العملاء'),
    step: 'interview',
  },
  { label: L('Help me explain my strengths', 'ساعدني على شرح نقاط قوتي'), step: 'strengths' },
]

const cv: Coach = {
  id: 'cv',
  name: L('Lina AI', 'لينا AI'),
  title: L('CV and Interview Coach', 'مدربة السيرة الذاتية والمقابلات'),
  purpose: L(
    'Supports honest CV writing and interview practice.',
    'تدعم كتابة سيرة ذاتية صادقة والتدرب على المقابلات.',
  ),
  image: 'images/generated/coach-cv.webp',
  starters: cvStarters,
  steps: [
    {
      id: 'bullet',
      coach: L(
        'Tell me what you actually did during your training project.',
        'أخبرني بما قمت به فعلًا خلال مشروعك التدريبي.',
      ),
      replies: [
        { label: L('I helped register people.', 'ساعدت في تسجيل الأشخاص.'), next: 'bulletDraft' },
      ],
    },
    {
      id: 'bulletDraft',
      coach: L(
        'You could write: Supported participant registration and maintained the attendance list for a training event. Add numbers only if you can verify them.',
        'يمكنك أن تكتب: دعمت تسجيل المشاركين وحافظت على قائمة الحضور في فعالية تدريبية. أضف أرقامًا فقط إذا كان بإمكانك التحقق منها.',
      ),
      draft: {
        target: 'cv',
        text: L(
          'Supported participant registration and maintained the attendance list for a training event.',
          'دعمت تسجيل المشاركين وحافظت على قائمة الحضور في فعالية تدريبية.',
        ),
      },
      replies: [
        { label: L('Practise an interview', 'تدرّب على مقابلة'), next: 'interview' },
        { label: L('Improve another bullet', 'حسّن نقطة أخرى'), next: 'bullet' },
      ],
    },
    {
      id: 'interview',
      coach: L(
        'Practice question for a Customer Service Assistant role: Tell me about a time you helped a customer with a problem.',
        'سؤال تدريبي لوظيفة مساعد خدمة العملاء: حدّثني عن موقف ساعدت فيه عميلًا على حل مشكلة.',
      ),
      replies: [
        {
          label: L(
            'At a training event, a participant was not on the list. I listened, checked the registration form, added her details and told the trainer.',
            'في فعالية تدريبية، لم يكن اسم إحدى المشاركات في القائمة. أصغيت إليها، وراجعت استمارة التسجيل، وأضفت بياناتها، وأبلغت المدرّب.',
          ),
          next: 'interviewFeedback',
        },
        { label: L('I am not sure what to say', 'لست متأكدًا مما أقول'), next: 'interviewHint' },
      ],
    },
    {
      id: 'interviewHint',
      coach: L(
        'Try this structure: the situation, what you needed to do, what you did, and the result. A small, real example is better than a big general claim.',
        'جرّب هذا الهيكل: الموقف، وما كان مطلوبًا منك، وما فعلته، والنتيجة. المثال الصغير الحقيقي أفضل من ادعاء عام كبير.',
      ),
      replies: [{ label: L('Try the question again', 'جرّب السؤال مجددًا'), next: 'interview' }],
    },
    {
      id: 'interviewFeedback',
      coach: L(
        'Feedback on your answer. Relevance: Clear. You chose a real customer problem. Clarity: Developing. Name the result at the end, for example that the participant joined the session. Evidence: Clear. You described specific actions you took. This is practice feedback only, not a prediction of any hiring decision.',
        'ملاحظات على إجابتك. الصلة بالسؤال: واضحة. اخترت مشكلة حقيقية لعميل. الوضوح: قيد التطور. اذكر النتيجة في النهاية، مثلًا أن المشاركة انضمت إلى الجلسة. الأدلة: واضحة. وصفت خطوات محددة قمت بها. هذه ملاحظات تدريبية فقط، وليست توقعًا لأي قرار توظيف.',
      ),
      draft: {
        target: 'interview',
        text: L(
          'Question: Tell me about a time you helped a customer with a problem.\nRatings: Relevance Clear; Clarity Developing; Evidence Clear.\nNext practice task: Answer the same question again and finish with one sentence about the result.',
        ),
      },
      replies: [
        { label: L('Practise another question', 'تدرّب على سؤال آخر'), next: 'interview' },
        { label: L('Help me explain my strengths', 'ساعدني على شرح نقاط قوتي'), next: 'strengths' },
      ],
    },
    {
      id: 'strengths',
      coach: L('Which strength would you like to explain?', 'أي نقطة قوة تود أن تشرحها؟'),
      replies: [
        { label: L('Organising', 'التنظيم'), next: 'strengthsOrganise' },
        { label: L('Communicating', 'التواصل'), next: 'strengthsCommunicate' },
      ],
    },
    {
      id: 'strengthsOrganise',
      coach: L(
        'Link the strength to something you did. You could say: "I am organised. During a training event I kept the attendance list up to date so the trainer always knew who was present."',
        'اربط نقطة القوة بشيء قمت به. يمكنك أن تقول: "أنا شخص منظّم. خلال فعالية تدريبية، حافظت على تحديث قائمة الحضور حتى يعرف المدرّب دائمًا من الحاضر."',
      ),
      draft: {
        target: 'cv',
        text: L(
          'Organised and reliable: kept attendance records up to date during a training event.',
          'منظّم وموثوق: حافظت على تحديث سجلات الحضور خلال فعالية تدريبية.',
        ),
      },
      replies: [
        { label: L('Explain another strength', 'اشرح نقطة قوة أخرى'), next: 'strengths' },
        { label: L('Practise an interview', 'تدرّب على مقابلة'), next: 'interview' },
      ],
    },
    {
      id: 'strengthsCommunicate',
      coach: L(
        'Give one example. You could say: "I communicate clearly. When a participant was confused about the schedule, I explained it and confirmed she understood."',
        'قدّم مثالًا واحدًا. يمكنك أن تقول: "أتواصل بوضوح. عندما كانت إحدى المشاركات غير متأكدة من الجدول، شرحته لها وتأكدت من أنها فهمته."',
      ),
      draft: {
        target: 'cv',
        text: L(
          'Clear communicator: explained session schedules to participants and confirmed their understanding.',
          'أتواصل بوضوح: شرحت جداول الجلسات للمشاركين وتأكدت من فهمهم لها.',
        ),
      },
      replies: [
        { label: L('Explain another strength', 'اشرح نقطة قوة أخرى'), next: 'strengths' },
        { label: L('Practise an interview', 'تدرّب على مقابلة'), next: 'interview' },
      ],
    },
    fallback(cvStarters),
  ],
}

// ---------------------------------------------------------------- Amal AI, Enterprise Coach

const enterpriseStarters: Starter[] = [
  { label: L('Help me test my idea', 'ساعدني على اختبار فكرتي'), step: 'idea' },
  { label: L('Review my customer questions', 'راجع أسئلتي للعملاء'), step: 'questions' },
  { label: L('Practise my pitch', 'تدرّب على عرض فكرتي'), step: 'pitch' },
]

const enterprise: Coach = {
  id: 'enterprise',
  name: L('Amal AI', 'أمل AI'),
  title: L('Enterprise Coach', 'مدربة ريادة الأعمال'),
  purpose: L(
    'Problem discovery, customer questions, business model and pitch practice.',
    'اكتشاف المشكلة، وأسئلة العملاء، ونموذج العمل، والتدرب على العرض.',
  ),
  image: 'images/generated/coach-enterprise.webp',
  starters: enterpriseStarters,
  steps: [
    {
      id: 'idea',
      coach: L(
        'Who experiences the problem you want to solve?',
        'من يواجه المشكلة التي تريد حلها؟',
      ),
      replies: [
        { label: L('Local repair businesses', 'محلات التصليح المحلية'), next: 'ideaEnquiries' },
        { label: L('I am not sure yet', 'لست متأكدًا بعد'), next: 'ideaUnsure' },
      ],
    },
    {
      id: 'ideaUnsure',
      coach: L(
        'That is fine. Think of people you see every day who struggle with the same task. Start with one group you can actually talk to. C07 Unit 1 can help.',
        'لا بأس. فكّر في أشخاص تراهم يوميًا يواجهون صعوبة في المهمة نفسها. ابدأ بفئة واحدة يمكنك التحدث إليها فعلًا. يمكن أن يساعدك الدرس الأول من الدورة C07.',
      ),
      courses: [
        {
          courseId: 'C07',
          reason: L(
            'Shows how to describe a customer and problem before a product.',
            'توضح كيفية وصف العميل والمشكلة قبل التفكير في المنتج.',
          ),
        },
      ],
      replies: [
        { label: L('I have a customer group now', 'حددت فئة من العملاء الآن'), next: 'idea' },
      ],
    },
    {
      id: 'ideaEnquiries',
      coach: L(
        'Good. Before proposing a solution, find out how they work today. How do local repair businesses currently handle customer enquiries and appointments?',
        'جيد. قبل اقتراح حل، اكتشف كيف يعملون اليوم. كيف تتعامل محلات التصليح المحلية حاليًا مع استفسارات العملاء ومواعيدهم؟',
      ),
      replies: [
        {
          label: L(
            'Mostly by phone, and some appointments are missed',
            'غالبًا عبر الهاتف، وتفوتهم بعض المواعيد',
          ),
          next: 'ideaQuestions',
        },
        { label: L('I do not know yet', 'لا أعرف بعد'), next: 'ideaQuestions' },
      ],
    },
    {
      id: 'ideaQuestions',
      coach: L(
        'The best way to find out is to ask them. Here are three open questions about what they do now. They do not suggest an answer or mention your idea.',
        'أفضل طريقة لمعرفة ذلك هي أن تسألهم. إليك ثلاثة أسئلة مفتوحة عمّا يفعلونه الآن. لا توحي هذه الأسئلة بإجابة معينة ولا تذكر فكرتك.',
      ),
      draft: {
        target: 'business',
        text: L(
          'Customer: local repair businesses\nOpen customer questions:\n1. How do customers usually contact you to book a repair?\n2. Tell me about the last time an appointment was missed. What happened?\n3. What do you currently do to keep track of enquiries?',
        ),
      },
      replies: [
        { label: L('Review my customer questions', 'راجع أسئلتي للعملاء'), next: 'questions' },
        { label: L('Practise my pitch', 'تدرّب على عرض فكرتي'), next: 'pitch' },
      ],
    },
    {
      id: 'questions',
      coach: L(
        'Here is a question many people start with: "Would you use an app that books your appointments?" It is a leading question, because it suggests your solution and invites a polite yes.',
        'إليك سؤالًا يبدأ به كثيرون: "هل ستستخدم تطبيقًا يحجز لك المواعيد؟" هذا سؤال موجّه، لأنه يقترح حلك ويدفع إلى إجابة مجاملة بـ"نعم".',
      ),
      replies: [
        { label: L('Show me a better version', 'أرني صيغة أفضل'), next: 'questionsBetter' },
      ],
    },
    {
      id: 'questionsBetter',
      coach: L(
        'Ask about past behaviour instead. Open questions about what people already do give you more honest evidence.',
        'اسأل عن السلوك السابق بدلًا من ذلك. الأسئلة المفتوحة عمّا يفعله الناس بالفعل تمنحك أدلة أكثر صدقًا.',
      ),
      draft: {
        target: 'business',
        text: L(
          'Instead of: "Would you use an app that books your appointments?"\nAsk: "How did you arrange your last three repair appointments?"\nAsk: "What happens when a customer does not arrive?"\nAsk: "What have you tried to reduce missed appointments?"',
        ),
      },
      replies: [
        { label: L('Help me test my idea', 'ساعدني على اختبار فكرتي'), next: 'idea' },
        { label: L('Practise my pitch', 'تدرّب على عرض فكرتي'), next: 'pitch' },
      ],
    },
    {
      id: 'pitch',
      coach: L(
        'Let us practise. Give me your opening sentence: who your customer is and what problem you solve.',
        'لنتدرب. قدّم لي جملتك الافتتاحية: من هو عميلك، وما المشكلة التي تحلها.',
      ),
      replies: [
        {
          label: L(
            'I help local repair shops stop losing customers because of missed appointments.',
            'أساعد محلات التصليح المحلية على عدم خسارة العملاء بسبب المواعيد الفائتة.',
          ),
          next: 'pitchFeedback',
        },
      ],
    },
    {
      id: 'pitchFeedback',
      coach: L(
        'Clarity: Clear. The customer and problem are easy to understand. Evidence: Developing. Add what you learned from customer conversations. Would you like a full pitch outline?',
        'الوضوح: واضح. من السهل فهم العميل والمشكلة. الأدلة: قيد التطور. أضف ما تعلمته من محادثاتك مع العملاء. هل تريد مخططًا كاملًا للعرض؟',
      ),
      replies: [
        { label: L('Build my pitch outline', 'أنشئ مخطط عرضي'), next: 'pitchOutline' },
        { label: L('Try my opening again', 'جرّب جملتي الافتتاحية مجددًا'), next: 'pitch' },
      ],
    },
    {
      id: 'pitchOutline',
      coach: L(
        'Here is a pitch outline you can edit. Fill each part with what you have actually learned. Support programmes set their own criteria, so this outline does not guarantee acceptance or funding.',
        'إليك مخططًا للعرض يمكنك تعديله. املأ كل جزء بما تعلمته فعلًا. لبرامج الدعم معاييرها الخاصة، لذا فإن هذا المخطط لا يضمن القبول أو التمويل.',
      ),
      draft: {
        target: 'business',
        text: L(
          'Pitch outline\n1. Customer: local repair businesses.\n2. Problem: enquiries arrive by phone and some appointments are missed.\n3. Evidence: what customers told me in interviews (add your notes).\n4. Proposed solution: a simple appointment-booking service to test.\n5. How it could earn: a proposed monthly fee (fictional amount for practice).\n6. Next experiment: trial the service with two businesses for two weeks.\n7. Support I am looking for: mentoring and feedback.',
        ),
      },
      courses: [
        {
          courseId: 'C16',
          reason: L(
            'Practise and improve your pitch, and learn how to find support.',
            'التدرب على عرضك وتحسينه، وتعلّم كيفية إيجاد الدعم.',
          ),
        },
      ],
      replies: [
        { label: L('Review my customer questions', 'راجع أسئلتي للعملاء'), next: 'questions' },
      ],
    },
    fallback(enterpriseStarters),
  ],
}

// ---------------------------------------------------------------- Ziad AI, Freelance and Client Coach

const freelanceStarters: Starter[] = [
  { label: L('Help me define my service', 'ساعدني على تحديد خدمتي'), step: 'service' },
  { label: L('Review my proposal', 'راجع مقترحي'), step: 'proposal' },
  { label: L('How do I respond to a change request?', 'كيف أرد على طلب تغيير؟'), step: 'change' },
]

const freelance: Coach = {
  id: 'freelance',
  name: L('Ziad AI', 'زياد AI'),
  title: L('Freelance and Client Coach', 'مدرب العمل الحر والعملاء'),
  purpose: L(
    'Service positioning, portfolio, proposals and scope discussions.',
    'تحديد الخدمة، وملف الأعمال، والمقترحات، ومناقشة نطاق العمل.',
  ),
  image: 'images/generated/coach-freelance.webp',
  starters: freelanceStarters,
  steps: [
    {
      id: 'service',
      coach: L(
        'A clear service connects a skill you already have to a real client need. Which skill would you like to offer?',
        'الخدمة الواضحة تربط مهارة تملكها بالفعل بحاجة حقيقية لدى العميل. أي مهارة تود أن تقدمها؟',
      ),
      replies: [
        {
          label: L('Writing social media posts', 'كتابة منشورات لوسائل التواصل الاجتماعي'),
          next: 'serviceContent',
        },
        { label: L('Organising spreadsheets', 'تنظيم جداول البيانات'), next: 'serviceSheets' },
      ],
    },
    {
      id: 'serviceContent',
      coach: L(
        'Here is a service profile draft. Keep it specific and label any sample work as sample work.',
        'إليك مسودة لملف خدمتك. اجعلها محددة، وضع على أي عمل نموذجي وصفًا يوضح أنه عمل نموذجي.',
      ),
      draft: {
        target: 'freelanceProfile',
        text: L(
          'Service: short social media posts for small local businesses, including copy and a simple design.\nWork samples: three original sample posts for a fictional retailer (labelled as sample work).\nAvailability: 10 hours per week.\nPreferred assignments: starter packages of five posts with one review round.',
        ),
      },
      replies: [
        { label: L('Review my proposal', 'راجع مقترحي'), next: 'proposal' },
        { label: L('Choose a different skill', 'اختر مهارة أخرى'), next: 'service' },
      ],
    },
    {
      id: 'serviceSheets',
      coach: L(
        'Here is a service profile draft for spreadsheet work. Use fictional data in your samples.',
        'إليك مسودة لملف خدمة العمل على جداول البيانات. استخدم بيانات افتراضية في نماذجك.',
      ),
      draft: {
        target: 'freelanceProfile',
        text: L(
          'Service: organising and cleaning simple spreadsheets for small businesses.\nWork samples: a sample inventory worksheet using fictional data.\nAvailability: weekday mornings.\nPreferred assignments: short, clearly scoped cleanup tasks.',
        ),
      },
      courses: [
        {
          courseId: 'C14',
          reason: L(
            'Strengthens the spreadsheet skills behind this service.',
            'تعزز مهارات جداول البيانات التي تقوم عليها هذه الخدمة.',
          ),
        },
      ],
      replies: [
        { label: L('Review my proposal', 'راجع مقترحي'), next: 'proposal' },
        { label: L('Choose a different skill', 'اختر مهارة أخرى'), next: 'service' },
      ],
    },
    {
      id: 'proposal',
      coach: L('Choose a sample client brief to work from.', 'اختر طلب عميل نموذجيًا للعمل عليه.'),
      replies: [
        {
          label: L(
            'Sample content brief: five social media posts for a local retailer',
            'طلب محتوى نموذجي: خمسة منشورات لوسائل التواصل لمتجر محلي',
          ),
          next: 'proposalStructure',
        },
      ],
    },
    {
      id: 'proposalStructure',
      coach: L(
        'A focused proposal follows this structure: client goal, five deliverables, review stage, timing and assumptions. Here is a draft. Please review and edit it before you submit anything.',
        'يتبع المقترح المركّز هذا الهيكل: هدف العميل، والمخرجات الخمسة، ومرحلة المراجعة، والتوقيت، والافتراضات. إليك مسودة. يُرجى مراجعتها وتعديلها قبل تقديم أي شيء.',
      ),
      draft: {
        target: 'proposal',
        text: L(
          'Client goal: attract more local customers through social media.\nDeliverables: five original posts, each with an image and short copy.\nReview stage: one round of feedback after the first draft of all five posts.\nTiming: drafts within 5 working days; final posts 2 days after feedback.\nAssumptions: the client provides product details and approves the brand colours before work begins.',
        ),
      },
      replies: [
        {
          label: L('What should I check before sending?', 'ما الذي عليّ التحقق منه قبل الإرسال؟'),
          next: 'proposalCheck',
        },
        {
          label: L('How do I respond to a change request?', 'كيف أرد على طلب تغيير؟'),
          next: 'change',
        },
      ],
    },
    {
      id: 'proposalCheck',
      coach: L(
        'Before sending, check that the scope matches the brief, the timing is realistic for your availability, your portfolio link works and any sample work is clearly labelled.',
        'قبل الإرسال، تحقق من أن نطاق العمل يطابق الطلب، وأن التوقيت واقعي بحسب أوقات توفرك، وأن رابط ملف أعمالك يعمل، وأن أي عمل نموذجي موصوف بوضوح.',
      ),
      courses: [
        {
          courseId: 'C11',
          reason: L(
            'Unit 4 covers reviewing a proposal before submitting.',
            'يتناول الدرس الرابع مراجعة المقترح قبل تقديمه.',
          ),
        },
      ],
      replies: [
        { label: L('Help me define my service', 'ساعدني على تحديد خدمتي'), next: 'service' },
      ],
    },
    {
      id: 'change',
      coach: L('What has the client asked for?', 'ما الذي طلبه العميل؟'),
      replies: [
        {
          label: L('The client wants two extra posts', 'يريد العميل منشورين إضافيين'),
          next: 'changeResponse',
        },
        {
          label: L('The client wants a different colour scheme', 'يريد العميل ألوانًا مختلفة'),
          next: 'changeRevision',
        },
      ],
    },
    {
      id: 'changeResponse',
      coach: L(
        'A new deliverable is a change in scope, so discuss it before starting. Thank the client, confirm the request, and explain the effect on timing and fee. Here is a response you can edit.',
        'المخرج الجديد يعني تغييرًا في نطاق العمل، لذا ناقشه قبل البدء. اشكر العميل، وأكّد الطلب، ووضّح أثره على التوقيت والأجر. إليك ردًا يمكنك تعديله.',
      ),
      draft: {
        target: 'proposal',
        text: L(
          'Thank you for your message. I understand you would like two extra posts in addition to the five agreed. I can add them as a separate item: this would add 2 working days and an additional fee that we can agree. Please confirm if you would like to go ahead, and I will update the plan.',
        ),
      },
      replies: [{ label: L('Review my proposal', 'راجع مقترحي'), next: 'proposal' }],
    },
    {
      id: 'changeRevision',
      coach: L(
        'If the change fits within the agreed review round, record it and make the revision. If it goes beyond what was agreed, explain this politely and suggest how it could be added.',
        'إذا كان التغيير ضمن جولة المراجعة المتفق عليها، فسجّله ونفّذ التعديل. وإذا تجاوز ما اتُّفق عليه، فوضّح ذلك بلطف واقترح طريقة لإضافته.',
      ),
      courses: [
        {
          courseId: 'C12',
          reason: L(
            'Unit 3 covers recording revisions and discussing scope changes.',
            'يتناول الدرس الثالث تسجيل التعديلات ومناقشة تغييرات النطاق.',
          ),
        },
      ],
      replies: [{ label: L('Another change request', 'طلب تغيير آخر'), next: 'change' }],
    },
    fallback(freelanceStarters),
  ],
}

export const COACHES: Coach[] = [navigator, learning, cv, enterprise, freelance]

export const COACH_BY_ID: Record<CoachId, Coach> = {
  navigator,
  learning,
  cv,
  enterprise,
  freelance,
}
