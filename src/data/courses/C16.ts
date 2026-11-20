import type { Course } from '@shared/types'
import { L } from '../l'

// Brief §10. Enterprise route. Support opportunities are fictional. Every unit has a full lesson.
export const C16: Course = {
  id: 'C16',
  title: L('Pitch Your Business and Find Support', 'اعرض مشروعك وابحث عن الدعم'),
  category: 'entrepreneurship',
  routes: ['enterprise'],
  minutes: 40,
  level: 'intermediate',
  delivery: 'self-paced',
  outcomes: [
    L(
      'Structure a short pitch around customer, problem, solution and evidence',
      'تبني عرضاً قصيراً حول العميل والمشكلة والحل والدليل',
    ),
    L(
      'Answer questions honestly using the evidence you have',
      'تجيب عن الأسئلة بصدق بالاعتماد على ما لديك من أدلة',
    ),
    L('Check eligibility and prepare a support application', 'تتحقق من الأهلية وتحضّر طلب دعم'),
  ],
  units: [
    {
      id: 'C16-U1',
      title: L('Structure your pitch', 'نظّم عرضك'),
      synopsis: L(
        'Explain the customer, problem, solution and evidence.',
        'وضّح العميل والمشكلة والحل والدليل.',
      ),
      objective: L(
        'Structure a short pitch around the customer, the problem, your solution and your evidence.',
        'تبني عرضاً قصيراً حول العميل والمشكلة والحل والدليل.',
      ),
      body: L(
        'A pitch is a short, spoken explanation of your business idea. In two minutes, you can cover four parts. Customer: who exactly are you serving? Be specific, for example working mothers in one neighbourhood, not everyone. Problem: what difficulty do they face, and how do they deal with it today? Solution: what you offer and why it is easier or better for them. Evidence: what you have learned so far, such as customer interviews or a small test sale. Put the customer and problem first, because listeners need to care about the problem before they hear the solution. Use plain words and one example. Practise aloud with a timer, and cut anything that does not support these four parts. End with what you are asking for, such as feedback or a mentor.',
        '',
      ),
      scenario: L(
        'Karim plans a home repair service for older residents in his area. His pitch opens with a neighbour who waited two weeks for a simple tap repair. He then explains his service and shares what eight residents told him in short interviews.',
        'يخطط كريم لخدمة إصلاحات منزلية لكبار السن في حيّه. يبدأ عرضه بقصة جار انتظر أسبوعين لإصلاح صنبور بسيط، ثم يشرح خدمته ويعرض ما قاله له ثمانية من السكان في مقابلات قصيرة.',
      ),
      takeaway: L(
        'Put the customer and problem first, then the solution and evidence, all in plain words.',
        'ضع العميل والمشكلة أولاً، ثم الحل والدليل، وكل ذلك بكلمات بسيطة.',
      ),
      check: {
        prompt: L(
          'Why start a pitch with the customer and their problem?',
          'لماذا تبدأ العرض بالعميل ومشكلته؟',
        ),
        options: [
          L(
            'Listeners need to understand the problem before the solution makes sense',
            'يحتاج المستمعون إلى فهم المشكلة قبل أن يصبح للحل معنى',
          ),
          L('It makes the pitch longer', 'لأنه يجعل العرض أطول'),
          L('So you do not need evidence', 'لكي لا تحتاج إلى أدلة'),
        ],
        correct: 0,
        feedback: L(
          'When people care about the problem, your solution and evidence are easier to follow.',
          'عندما يهتم الناس بالمشكلة، يصبح فهم الحل والدليل أسهل.',
        ),
      },
      hasVideo: true,
      transcript: L(
        'Welcome to Pitch Your Business and Find Support. In this first lesson we build a two-minute pitch. Use four parts. Start with the customer: who exactly are they? Then the problem: what is hard for them today? Next, your solution: what you offer and why it helps. Finally, your evidence: what real people have told you or done. Keep it plain and use one short example. Practise with a timer on your phone. If a sentence does not support one of these four parts, cut it. Short and clear always wins.',
        '',
      ),
    },
    {
      id: 'C16-U2',
      title: L('Explain the business model', 'اشرح نموذج العمل'),
      synopsis: L(
        'Describe how the idea could sustain itself.',
        'صِف كيف يمكن للفكرة أن تستمر بمواردها.',
      ),
      objective: L(
        'Describe simply who pays, for what, and how income could cover the main costs.',
        'تصف ببساطة من يدفع ومقابل ماذا وكيف يمكن أن يغطي الدخل التكاليف الرئيسية.',
      ),
      body: L(
        "A business model explains how an idea could keep going with its own resources. You do not need complex finance terms. Answer four questions. Who pays? This may be the customer, or sometimes another person, like a parent paying for a child's lesson. What do they pay for, and roughly how much? What are the main costs, such as materials, transport, rent or phone credit? And how many sales would you need each month to cover those costs? Use your basic cash plan to show these numbers, and say clearly which ones are estimates. Mention one or two risks, such as rising material prices, and how you would respond. A simple, honest model shows reviewers that you have thought about sustainability, even if the numbers are still small.",
        '',
      ),
      scenario: L(
        'Salma sells homemade pickles in reused jars. In her pitch she explains that neighbours pay per jar and her main costs are vegetables, salt and jars. She estimates she needs to sell 40 jars a month to cover costs, and says clearly that this is an estimate she is still testing.',
        'تبيع سلمى المخللات المنزلية في مرطبانات معاد استخدامها. في عرضها توضح أن الجيران يدفعون ثمن كل مرطبان، وأن تكاليفها الرئيسية هي الخضار والملح والمرطبانات. وتقدّر أنها تحتاج إلى بيع 40 مرطباناً شهرياً لتغطية التكاليف، وتوضح أن هذا الرقم تقدير ما زالت تختبره.',
      ),
      takeaway: L(
        'Say who pays, for what, your main costs and how many sales cover them, and mark estimates clearly.',
        'وضّح من يدفع ومقابل ماذا، وما تكاليفك الرئيسية، وكم عملية بيع تغطيها، وحدّد التقديرات بوضوح.',
      ),
      check: {
        prompt: L(
          'Which question belongs in a simple business model?',
          'أي سؤال يندرج ضمن نموذج العمل البسيط؟',
        ),
        options: [
          L('How many sales would cover the monthly costs?', 'كم عملية بيع تغطي التكاليف الشهرية؟'),
          L('What is your favourite colour?', 'ما لونك المفضل؟'),
          L('How famous will the business become?', 'إلى أي مدى سيصبح المشروع مشهوراً؟'),
        ],
        correct: 0,
        feedback: L(
          'Comparing sales with costs shows whether the idea could sustain itself.',
          'مقارنة المبيعات بالتكاليف توضح إن كانت الفكرة قادرة على الاستمرار.',
        ),
      },
    },
    {
      id: 'C16-U3',
      title: L('Prepare for questions', 'استعد للأسئلة'),
      synopsis: L(
        'Recognise assumptions and answer with available evidence.',
        'تعرّف على افتراضاتك وأجب بالأدلة المتاحة.',
      ),
      objective: L(
        'Separate facts from assumptions and answer questions using the evidence you have.',
        'تميّز بين الحقائق والافتراضات وتجيب عن الأسئلة بالأدلة المتوفرة لديك.',
      ),
      body: L(
        'After a pitch, reviewers usually ask questions. They are not trying to trap you. They want to see how well you understand your idea. Prepare by listing your assumptions: things you believe but have not yet tested, such as the price customers will accept or how often they will buy. Next to each one, write what evidence you have so far and how you could test it. Then practise answers to common questions. Who are your competitors? What happens if costs rise? Why are you the right person to do this? When you do not know an answer, say so. A good reply is: "That is still an assumption. I plan to test it by asking ten customers next month." Honest answers build more trust than confident guesses.',
        '',
      ),
      scenario: L(
        'Hala pitches a tutoring service for secondary students. A reviewer asks how many families would pay monthly. Hala explains that she has interviewed six families, four showed interest, and she will run a two-week trial before setting a price.',
        'تعرض هالة فكرة خدمة دروس تقوية لطلاب المرحلة الثانوية. يسألها أحد المراجعين عن عدد الأسر التي ستدفع شهرياً. توضح هالة أنها قابلت ست أسر أبدت أربع منها اهتماماً، وأنها ستجري تجربة لمدة أسبوعين قبل تحديد السعر.',
      ),
      takeaway: L(
        'Know your assumptions, share the evidence you have and explain how you will test the rest.',
        'اعرف افتراضاتك، وشارك ما لديك من أدلة، واشرح كيف ستختبر الباقي.',
      ),
      check: {
        prompt: L(
          'What is an assumption in a business idea?',
          'ما المقصود بالافتراض في فكرة المشروع؟',
        ),
        options: [
          L('Something you believe but have not tested yet', 'أمر تعتقده لكنك لم تختبره بعد'),
          L('A proven fact', 'حقيقة مثبتة'),
          L('A question from a reviewer', 'سؤال من أحد المراجعين'),
        ],
        correct: 0,
        feedback: L(
          'Naming assumptions shows you know what still needs testing.',
          'تسمية الافتراضات تُظهر أنك تعرف ما يحتاج إلى اختبار.',
        ),
      },
      hasVideo: true,
      transcript: L(
        'In this lesson we prepare for questions after your pitch. Questions are a good sign: they mean people are listening. Start by writing down your assumptions, the things you believe but have not tested yet. Beside each one, note your evidence and how you could test it. Now practise with a friend. If someone asks something you do not know, do not invent a number. Say: that is still an assumption, and here is how I will test it. Reviewers trust honest answers more than confident guesses.',
        '',
      ),
    },
    {
      id: 'C16-U4',
      title: L('Choose a support opportunity', 'اختر فرصة دعم'),
      synopsis: L(
        'Review programme eligibility and prepare a relevant application.',
        'راجع شروط الأهلية للبرنامج وحضّر طلباً مناسباً.',
      ),
      objective: L(
        "Check a programme's eligibility rules and prepare an application that matches what it offers.",
        'تتحقق من شروط الأهلية لبرنامج ما وتحضّر طلباً يتناسب مع ما يقدمه.',
      ),
      body: L(
        'Support programmes for young entrepreneurs can offer different things, such as training, mentoring, workspace or connections to other organisations. Each one has its own rules. Before you apply, read the eligibility criteria carefully: age range, location, stage of the business, sector and any documents required. If you do not meet a core rule, choose another programme rather than hoping for an exception. Next, check what the programme offers and whether it matches your current need. An early idea may benefit more from mentoring than from equipment. Then tailor your application. Use your pitch outline, answer each question directly and include your evidence. Keep a list of deadlines. Remember that programmes are selective and applying does not guarantee a place. Feedback from one application can improve the next. The programmes shown here are fictional examples.',
        '',
      ),
      scenario: L(
        'Sami finds two fictional programmes: an incubation track for registered businesses and a mentoring track for early ideas. His idea is still at the testing stage, so he chooses the mentoring track and adapts his pitch outline to its application questions.',
        'يجد سامي برنامجين افتراضيين: مسار احتضان للمشاريع المسجّلة، ومسار إرشاد للأفكار في مراحلها الأولى. ما زالت فكرته في مرحلة الاختبار، لذلك يختار مسار الإرشاد ويكيّف مخطط عرضه مع أسئلة طلب التقديم.',
      ),
      takeaway: L(
        'Match the eligibility rules and your real need before you apply, and answer each question with your evidence.',
        'طابق شروط الأهلية مع حاجتك الفعلية قبل التقديم، وأجب عن كل سؤال بأدلتك.',
      ),
      check: {
        prompt: L(
          "You do not meet a programme's core eligibility rule. What is the best step?",
          'لا تستوفي أحد شروط الأهلية الأساسية لبرنامج ما. ما أفضل خطوة؟',
        ),
        options: [
          L('Look for a programme that matches your situation', 'أبحث عن برنامج يناسب وضعي'),
          L('Apply anyway and hide the detail', 'أتقدّم على أي حال وأخفي هذه المعلومة'),
          L('Change your answers to fit the rules', 'أغيّر إجاباتي لتناسب الشروط'),
        ],
        correct: 0,
        feedback: L(
          'Choosing programmes that fit you saves time and keeps your application honest.',
          'اختيار البرامج المناسبة لك يوفر الوقت ويحافظ على صدق طلبك.',
        ),
      },
    },
  ],
  practicalTask: L(
    'Write a two-minute pitch outline and draft an application to a fictional enterprise-support programme.',
    'اكتب مخططاً لعرض مدته دقيقتان ومسودة طلب لبرنامج دعم مشاريع افتراضي.',
  ),
  output: L(
    'A two-minute pitch outline and enterprise-support application draft.',
    'مخطط عرض مدته دقيقتان ومسودة طلب دعم للمشروع.',
  ),
  quiz: [
    {
      prompt: L('What should a short pitch start with?', 'بماذا يجب أن يبدأ العرض القصير؟'),
      options: [
        L('The customer and the problem they face', 'العميل والمشكلة التي يواجهها'),
        L('A long list of features', 'قائمة طويلة من الميزات'),
        L('How much money you want', 'المبلغ الذي تريده'),
      ],
      correct: 0,
      feedback: L(
        'Starting with the customer problem helps listeners understand why the idea matters.',
        'البدء بمشكلة العميل يساعد المستمعين على فهم أهمية الفكرة.',
      ),
      unitIndex: 0,
    },
    {
      prompt: L(
        'Explaining how the idea could sustain itself means describing:',
        'شرح كيف تستمر الفكرة يعني وصف:',
      ),
      options: [
        L('Who pays, for what, and the main costs', 'من يدفع ومقابل ماذا وما التكاليف الرئيسية'),
        L('Your personal hobbies', 'هواياتك الشخصية'),
        L('Only your logo', 'شعارك فقط'),
      ],
      correct: 0,
      feedback: L(
        'A simple business model shows how income can cover costs over time.',
        'نموذج العمل البسيط يوضح كيف يغطي الدخل التكاليف مع الوقت.',
      ),
      unitIndex: 1,
    },
    {
      prompt: L(
        'A reviewer asks something you have not tested yet. Best answer?',
        'سألك أحد المراجعين عن أمر لم تختبره بعد. ما أفضل إجابة؟',
      ),
      options: [
        L(
          'Say it is an assumption and explain how you will test it',
          'أقول إنه افتراض وأوضح كيف سأختبره',
        ),
        L('Invent a number', 'أختلق رقماً'),
        L('Change the subject', 'أغيّر الموضوع'),
      ],
      correct: 0,
      feedback: L(
        'Being honest about assumptions builds trust more than guessing.',
        'الصدق بشأن الافتراضات يبني الثقة أكثر من التخمين.',
      ),
      unitIndex: 2,
    },
    {
      prompt: L(
        'Before applying to a support programme, check:',
        'قبل التقديم على برنامج دعم، تحقق من:',
      ),
      options: [
        L('The eligibility rules and what the programme offers', 'شروط الأهلية وما يقدمه البرنامج'),
        L('Only the deadline', 'الموعد النهائي فقط'),
        L('Whether your friend applied', 'إن كان صديقك قد تقدّم'),
      ],
      correct: 0,
      feedback: L(
        'Matching eligibility saves time and makes your application relevant.',
        'مطابقة شروط الأهلية توفر الوقت وتجعل طلبك مناسباً.',
      ),
      unitIndex: 3,
    },
    {
      prompt: L('Which is the strongest evidence in a pitch?', 'ما أقوى دليل في العرض؟'),
      options: [
        L(
          'What real potential customers told you in interviews',
          'ما قاله عملاء محتملون حقيقيون في المقابلات',
        ),
        L('Your belief that everyone will buy', 'اعتقادك بأن الجميع سيشتري'),
        L('A friend saying it is a good idea', 'قول صديق إنها فكرة جيدة'),
      ],
      correct: 0,
      feedback: L(
        'Evidence from potential customers is more convincing than opinions.',
        'الأدلة من العملاء المحتملين أقوى إقناعاً من الآراء.',
      ),
      unitIndex: 0,
    },
  ],
  resources: ['cashPlan'],
  prerequisites: ['C08'],
  image: 'images/generated/course-C16.webp',
  note: L(
    'Incubation and funding opportunities are fictional examples; no funding is implied.',
    'فرص الاحتضان والتمويل أمثلة افتراضية، ولا يعني ذلك توفر أي تمويل.',
  ),
}
