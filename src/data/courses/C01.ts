import type { Course } from '@shared/types'
import { L } from '../l'

// Brief §7. Career foundations, all routes. Every unit has a full lesson.
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
      objective: L(
        'Describe your interests and strengths as a starting point for exploring, not as fixed labels.',
        'تصف اهتماماتك ونقاط قوتك كنقطة بداية للاستكشاف، لا كتصنيفات ثابتة.',
      ),
      body: L(
        'Your interests are the activities you enjoy and keep coming back to. Your strengths are the things you already do well, even if nobody paid you for them. A career assessment can help you notice patterns, such as enjoying helping people, solving problems or making things with your hands. Treat the result as a mirror, not a verdict. People change as they learn, and a strength can grow with practice. Start by listing three activities you enjoy and three things others often ask you to help with. Look for overlaps. Then ask a friend, family member or trainer what they see in you. Their view may surprise you. Finally, write your findings in simple words, for example "I like organising" rather than "I am an organiser". This keeps your options open while you explore.',
        '',
      ),
      scenario: L(
        'Omar takes the career assessment and his result shows a strong preference for practical, hands-on work. He also notices that he enjoys explaining things to younger students. He writes both down and decides to explore technical and training-related roles before choosing.',
        'يُجري عمر التقييم المهني فتُظهر النتيجة ميلاً قوياً إلى العمل العملي واليدوي. ويلاحظ أيضاً أنه يستمتع بشرح الأمور للطلاب الأصغر سناً. يدوّن الأمرين ويقرر استكشاف أدوار تقنية وأخرى مرتبطة بالتدريب قبل أن يختار.',
      ),
      takeaway: L(
        'Use your interests and strengths to guide exploration, and expect them to grow.',
        'استخدم اهتماماتك ونقاط قوتك لتوجيه الاستكشاف، وتوقّع أن تتطور مع الوقت.',
      ),
      check: {
        prompt: L(
          'Which sentence treats an assessment result in a healthy way?',
          'أي جملة تتعامل مع نتيجة التقييم بطريقة صحية؟',
        ),
        options: [
          L(
            'I like organising, so I will explore roles that use it',
            'أحب التنظيم، لذا سأستكشف أدواراً تستفيد منه',
          ),
          L(
            'My result says I can only do office work',
            'تقول نتيجتي إنني لا أستطيع إلا العمل المكتبي',
          ),
          L(
            'I scored low on creativity, so I will never be creative',
            'حصلت على درجة منخفضة في الإبداع، لذا لن أكون مبدعاً أبداً',
          ),
        ],
        correct: 0,
        feedback: L(
          'Results point to options to explore. They do not limit what you can learn.',
          'النتائج تشير إلى خيارات للاستكشاف، ولا تحدّ مما يمكنك تعلّمه.',
        ),
      },
      hasVideo: true,
      transcript: L(
        'Welcome to Discover Your Career Direction. In this first lesson we look at your interests and strengths. Interests are what you enjoy. Strengths are what you already do well. Think of a time you helped someone, fixed something or organised an event. What did you enjoy about it? Write three examples now. Your career assessment can add more ideas, but remember: it is a starting point, not a label. You can grow new strengths at any age. In the next lesson, we compare different ways of earning.',
        '',
      ),
    },
    {
      id: 'C01-U2',
      title: L('Explore ways of earning', 'استكشف طرق كسب الدخل'),
      synopsis: L(
        'Compare employment, entrepreneurship and freelancing using realistic trade-offs.',
        'قارن بين التوظيف وريادة الأعمال والعمل الحر من خلال موازنات واقعية.',
      ),
      objective: L(
        'Compare employment, entrepreneurship and freelancing by their realistic benefits and challenges.',
        'تقارن بين التوظيف وريادة الأعمال والعمل الحر من حيث مزاياها وتحدياتها الواقعية.',
      ),
      body: L(
        'There are three common ways young people build a working life. Employment means working for an organisation, usually with set hours, a manager and regular tasks. It can offer structure and the chance to learn from colleagues, but you follow the rules of the employer. Entrepreneurship means starting your own small business. You make the decisions, but you also carry the risk, and income may be slow or uneven at first. Freelancing means offering a service, such as design or translation, to different clients. Hours can be flexible, but you must find clients yourself and income can change from month to month. None of these is better for everyone. Many people combine them, for example a part-time job and a small freelance service. Think about your situation, your need for stability and the skills you want to build.',
        '',
      ),
      scenario: L(
        'Rania enjoys baking and wonders whether to start a home bakery or apply for a job at a local café. She lists the benefits and challenges of each. She decides to gain experience in a café first while testing a few orders for neighbours.',
        'تحب رانيا الخَبز وتتساءل هل تبدأ مشروع مخبز منزلي أم تتقدّم لوظيفة في مقهى محلي. تكتب مزايا كل خيار وتحدياته، ثم تقرر أن تكتسب خبرة في مقهى أولاً بينما تجرّب تلبية بعض الطلبات لجيرانها.',
      ),
      takeaway: L(
        'Every way of earning has trade-offs, so choose based on your situation and goals.',
        'لكل طريقة لكسب الدخل موازنات، فاختر بناءً على ظروفك وأهدافك.',
      ),
      check: {
        prompt: L(
          'Which statement about entrepreneurship is realistic?',
          'أي عبارة عن ريادة الأعمال واقعية؟',
        ),
        options: [
          L(
            'You make the decisions, but income can be slow at first',
            'تتخذ القرارات بنفسك، لكن الدخل قد يكون بطيئاً في البداية',
          ),
          L('Success is guaranteed if you work hard', 'النجاح مضمون إذا عملت بجد'),
          L('There is no risk involved', 'لا توجد أي مخاطرة'),
        ],
        correct: 0,
        feedback: L(
          'Running a business gives you control, but it also brings risk and uncertain income.',
          'إدارة مشروع تمنحك التحكم، لكنها تحمل أيضاً مخاطرة ودخلاً غير مؤكد.',
        ),
      },
    },
    {
      id: 'C01-U3',
      title: L('Understand roles and skills', 'افهم الأدوار والمهارات'),
      synopsis: L(
        'Read a sample opportunity and identify its required capabilities.',
        'اقرأ فرصة نموذجية وحدد القدرات التي تتطلبها.',
      ),
      objective: L(
        'Identify the capabilities a sample opportunity asks for and compare them with your own.',
        'تحدد القدرات التي تطلبها فرصة نموذجية وتقارنها بقدراتك.',
      ),
      body: L(
        'Every role is a mix of tasks, and each task needs certain capabilities. Capabilities include technical skills, such as using a spreadsheet, and transferable skills, such as communication, reliability and teamwork. When you read a sample opportunity, look past the job title. Read the list of duties and ask: what would I actually do each day? Then underline the skills those duties need. Make two columns: skills I can already show and skills I still need to build. Be honest. A gap is not a failure. It is a learning target. Many skills, like answering customers politely or keeping records, can be learned through short courses and practice. This simple comparison helps you decide which opportunities to explore now and which to prepare for later.',
        '',
      ),
      scenario: L(
        'Sami reads a sample opportunity for a stock assistant at a local shop. He sees duties like receiving deliveries, counting items and updating a simple list. He is already good at organising, but he notes that he needs to practise basic spreadsheets.',
        'يقرأ سامي فرصة نموذجية لمساعد مخزن في متجر محلي. يرى مهاماً مثل استلام البضائع وعدّ القطع وتحديث قائمة بسيطة. هو جيد في التنظيم، لكنه يلاحظ أنه يحتاج إلى التدرّب على جداول البيانات الأساسية.',
      ),
      takeaway: L(
        'Read the duties, list the skills they need and turn each gap into a learning target.',
        'اقرأ المهام، واكتب المهارات التي تحتاجها، وحوّل كل فجوة إلى هدف تعلّم.',
      ),
      check: {
        prompt: L(
          'A duty says "keep daily records of deliveries". Which capability does this need?',
          'تقول إحدى المهام "الاحتفاظ بسجلات يومية للبضائع الواردة". ما القدرة التي تحتاجها؟',
        ),
        options: [
          L('Accurate record keeping', 'تدوين السجلات بدقة'),
          L('Public speaking', 'الخطابة أمام الجمهور'),
          L('Graphic design', 'التصميم الجرافيكي'),
        ],
        correct: 0,
        feedback: L(
          'Daily records need accuracy and organisation. Look for the skill behind each duty.',
          'السجلات اليومية تحتاج إلى الدقة والتنظيم. ابحث عن المهارة الكامنة خلف كل مهمة.',
        ),
      },
      hasVideo: true,
      transcript: L(
        'In this lesson we read a sample opportunity together. Do not stop at the job title. Read the duties line by line. For each duty, ask what skill it needs. Receiving deliveries needs care and attention. Updating a stock list needs basic spreadsheet skills. Talking to customers needs clear communication. Now make two columns: skills you can show today and skills to build. Sami did this and found one clear gap. That gap became his next learning target. You can do the same with any opportunity.',
        '',
      ),
    },
    {
      id: 'C01-U4',
      title: L('Build your next step plan', 'ابنِ خطة خطوتك التالية'),
      synopsis: L(
        'Choose a goal, learning action and milestone for the next month.',
        'اختر هدفاً وخطوة تعلّم ومحطة إنجاز للشهر القادم.',
      ),
      objective: L(
        'Write one goal, one learning action and one milestone for the next month.',
        'تكتب هدفاً واحداً وخطوة تعلّم واحدة ومحطة إنجاز واحدة للشهر القادم.',
      ),
      body: L(
        'A plan turns ideas into action. Keep it small and specific. Start with one goal you can reach in about a month, for example "save a first CV draft" or "complete the digital essentials course". Avoid goals like "be successful", because you cannot check them. Next, choose one learning action that moves you toward the goal, such as finishing two course units each week. Then set a milestone: something you can see or show when you are done, like a saved document or a course badge. Write a date next to each step. Share the plan with your trainer or a friend, because telling someone helps you keep going. At the end of the month, review what worked, adjust the plan and set the next step. Progress comes from many small steps.',
        '',
      ),
      scenario: L(
        'Lina wants to work in customer service. Her goal for next month is to save a first CV draft. Her learning action is to finish two units of the CV course each week, and her milestone is sharing the draft with her trainer by the end of the month.',
        'تريد لينا العمل في خدمة العملاء. هدفها للشهر القادم هو حفظ مسودة أولى لسيرتها الذاتية. خطوة التعلّم لديها هي إنهاء وحدتين من دورة السيرة الذاتية كل أسبوع، ومحطة الإنجاز هي مشاركة المسودة مع مدربتها في نهاية الشهر.',
      ),
      takeaway: L(
        'A good plan is small, specific, dated and easy to check.',
        'الخطة الجيدة صغيرة ومحددة ولها مواعيد ويسهل التحقق منها.',
      ),
      check: {
        prompt: L('Which is a milestone you can check?', 'أي مما يلي محطة إنجاز يمكن التحقق منها؟'),
        options: [
          L(
            'A CV draft saved and shared with your trainer',
            'مسودة سيرة ذاتية محفوظة ومُرسلة إلى المدرب',
          ),
          L('Feeling more confident', 'الشعور بثقة أكبر'),
          L('Thinking about your future', 'التفكير في مستقبلك'),
        ],
        correct: 0,
        feedback: L(
          'A milestone is something visible. Feelings matter, but they are hard to check.',
          'المحطة شيء ملموس. المشاعر مهمة، لكن يصعب التحقق منها.',
        ),
      },
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
