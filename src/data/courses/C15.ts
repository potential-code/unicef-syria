import type { Course } from '@shared/types'
import { L } from '../l'

// Brief §10. Illustrative technical taster for freelancing. Every unit has a full lesson.
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
      objective: L(
        'Identify the audience, the main message and the action wanted in a content brief.',
        'تحدد الجمهور والرسالة الرئيسية والإجراء المطلوب في وصف المحتوى.',
      ),
      body: L(
        'A content brief is a short description of what a client needs. Before you open any design tool, find three things. First, the audience: who will see this content? A post for parents looks and sounds different from one for university students. Second, the message: the one idea the audience should remember. If a brief lists five messages, ask the client which one matters most. Third, the action: what should people do after seeing it, such as visit a shop, send a message or register for a workshop. Also note practical details: the platform or size, the deadline, the languages and any colours or logo you must use. If something is missing or unclear, ask before you start. A few questions at the beginning save hours of changes later.',
        '',
      ),
      scenario: L(
        'Fadi receives a sample brief from a fictional bakery in Homs. He writes three lines: audience, families nearby; message, fresh bread every morning from 6 am; action, order by phone. He then asks the owner which phone number to show.',
        'يتلقى فادي وصف محتوى نموذجياً من مخبز افتراضي في حمص. يكتب ثلاثة أسطر: الجمهور هو العائلات القريبة، والرسالة خبز طازج كل صباح من الساعة السادسة، والإجراء هو الطلب عبر الهاتف. ثم يسأل صاحب المخبز عن رقم الهاتف الذي يريد إظهاره.',
      ),
      takeaway: L(
        'Write down audience, message and action in three lines before you design anything.',
        'اكتب الجمهور والرسالة والإجراء في ثلاثة أسطر قبل أن تبدأ أي تصميم.',
      ),
      check: {
        prompt: L(
          'A brief lists five different messages for one post. What should you do?',
          'يتضمن وصف المحتوى خمس رسائل مختلفة لمنشور واحد. ماذا تفعل؟',
        ),
        options: [
          L('Ask the client which message matters most', 'أسأل العميل عن الرسالة الأهم'),
          L('Fit all five in small text', 'أضع الرسائل الخمس كلها بخط صغير'),
          L('Choose one without asking', 'أختار واحدة دون أن أسأل'),
        ],
        correct: 0,
        feedback: L(
          'One clear message per post works best. Asking keeps the client involved and avoids rework.',
          'رسالة واحدة واضحة لكل منشور هي الأفضل، والسؤال يُبقي العميل مشاركاً ويجنّبك إعادة العمل.',
        ),
      },
      hasVideo: true,
      transcript: L(
        'Welcome to Digital Content and Design Basics. Every good piece of content starts with a brief. In this lesson you learn to read one. Look for three things. Who is the audience? What is the one message they should remember? And what action do you want them to take? Write each answer in one line. If the brief is unclear, ask the client before you design. You will also note the platform, the size, the languages and the deadline. With these answers, every choice you make later has a reason.',
        '',
      ),
    },
    {
      id: 'C15-U2',
      title: L('Create clear visual content', 'أنشئ محتوى بصرياً واضحاً'),
      synopsis: L(
        'Apply readable layout, contrast and original assets.',
        'طبّق تخطيطاً مقروءاً وتبايناً جيداً وعناصر أصلية.',
      ),
      objective: L(
        'Apply readable layout, strong contrast and original or properly licensed assets.',
        'تطبّق تخطيطاً مقروءاً وتبايناً قوياً وعناصر أصلية أو مرخّصة بشكل صحيح.',
      ),
      body: L(
        'A clear visual is understood in a few seconds, often on a small phone screen. Use one main focal point, such as a product photo or a large headline, and give it space. Limit yourself to two fonts and a small number of colours. Make sure text has strong contrast with its background: dark text on a light background, or white text on a dark colour. Avoid placing text over busy parts of a photo. Keep important text away from the edges, where it may be cropped. For Arabic and English, check the reading direction and alignment. Use photos and icons you created yourself, or free assets whose licence allows your use, and keep a note of the source. Free design tools are enough for this work, and you do not need paid software.',
        '',
      ),
      scenario: L(
        'Rania designs a sample post for a fictional tailoring shop. Her first version has light grey text on a beige photo. She moves the headline to a dark band at the bottom, uses her own photo of fabric and checks the post on her phone.',
        'تصمم رانيا منشوراً نموذجياً لمحل خياطة افتراضي. في النسخة الأولى كان النص رمادياً فاتحاً فوق صورة بلون البيج. تنقل العنوان إلى شريط داكن في الأسفل، وتستخدم صورة قماش التقطتها بنفسها، وتتحقق من المنشور على هاتفها.',
      ),
      takeaway: L(
        'Use one focal point, strong contrast and assets you have the right to use.',
        'استخدم نقطة تركيز واحدة وتبايناً قوياً وعناصر يحق لك استخدامها.',
      ),
      check: {
        prompt: L(
          'Which image can you use in a client post?',
          'أي صورة يمكنك استخدامها في منشور لعميل؟',
        ),
        options: [
          L('A photo you took yourself', 'صورة التقطتها بنفسك'),
          L('Any image from a search engine', 'أي صورة من محرك البحث'),
          L("A photo from another shop's page", 'صورة من صفحة محل آخر'),
        ],
        correct: 0,
        feedback: L(
          'Use original assets or ones whose licence allows your use. Search results are not automatically free to use.',
          'استخدم عناصر أصلية أو عناصر يسمح ترخيصها باستخدامك لها. نتائج البحث ليست مجانية الاستخدام تلقائياً.',
        ),
      },
    },
    {
      id: 'C15-U3',
      title: L('Write useful short copy', 'اكتب نصوصاً قصيرة مفيدة'),
      synopsis: L(
        'Create a headline, supporting copy and call to action.',
        'اكتب عنواناً ونصاً داعماً ودعوة لاتخاذ إجراء.',
      ),
      objective: L(
        'Write a headline, supporting copy and a clear call to action for a short post.',
        'تكتب عنواناً ونصاً داعماً ودعوة واضحة لاتخاذ إجراء في منشور قصير.',
      ),
      body: L(
        'Short copy has three parts. The headline catches attention and states the main benefit in a few words, such as "New school bags have arrived". The supporting copy adds one or two useful details: what, where, when or price range. It answers the reader\'s next question, not every question. The call to action tells the reader exactly what to do next: "Visit us this week", "Send us a message to reserve" or "Register by Thursday". Use simple, friendly words and short sentences. Write for the audience in the brief, in the language they use. Avoid claims you cannot support, such as "the best in Syria". Read your copy aloud. If it sounds natural and fits on a phone screen without scrolling, it is probably ready.',
        '',
      ),
      scenario: L(
        'Omar writes copy for a fictional bicycle repair shop. His headline is "Back on the road today". The supporting line mentions quick repairs for flat tyres and brakes, and his call to action reads "Bring your bike before 5 pm".',
        'يكتب عمر نصاً لمحل افتراضي لتصليح الدراجات. عنوانه هو "عُد إلى الطريق اليوم". يذكر السطر الداعم التصليح السريع للإطارات المثقوبة والمكابح، وتقول دعوته لاتخاذ إجراء: "أحضر دراجتك قبل الساعة الخامسة مساءً".',
      ),
      takeaway: L(
        'Lead with the benefit, add one or two useful details, then ask for one clear action.',
        'ابدأ بالفائدة، وأضف تفصيلاً أو اثنين مفيدين، ثم اطلب إجراءً واحداً واضحاً.',
      ),
      check: {
        prompt: L('Which line is a call to action?', 'أي سطر يمثل دعوة لاتخاذ إجراء؟'),
        options: [
          L('Send us a message to reserve your order', 'أرسلوا لنا رسالة لحجز طلبكم'),
          L('We care about quality', 'نحن نهتم بالجودة'),
          L('Our shop opened in 2020', 'افتُتح محلنا عام 2020'),
        ],
        correct: 0,
        feedback: L(
          'A call to action names one specific thing the reader should do next.',
          'الدعوة لاتخاذ إجراء تحدد شيئاً واحداً بعينه يفعله القارئ بعد ذلك.',
        ),
      },
      hasVideo: true,
      transcript: L(
        'In this lesson we write short copy that works. Think of three layers. First, a headline that says the main benefit in a few words. Second, a line or two of support: what, where or when. Third, a call to action: one clear thing the reader should do now. Let us try it with a bicycle repair shop. Headline: Back on the road today. Support: quick repairs for flat tyres and brakes. Action: bring your bike before five. Read it aloud. Short, clear and honest is what you are aiming for.',
        '',
      ),
    },
    {
      id: 'C15-U4',
      title: L('Package a portfolio sample', 'جهّز نموذجاً لملف أعمالك'),
      synopsis: L(
        'Present sample work with a clear description and honest attribution.',
        'اعرض نموذج عملك مع وصف واضح ونسبة صادقة للمصادر.',
      ),
      objective: L(
        'Present a sample piece with a short description, your role and honest attribution.',
        'تعرض نموذج عمل مع وصف قصير ودورك ونسبة صادقة للمصادر.',
      ),
      body: L(
        'A portfolio sample shows a future client how you think, not only what you made. For each piece, write a short case note. Start with the brief in one sentence: who it was for and what they needed. Then explain two or three choices you made and why, for example the colours, the layout or the headline. State your role clearly. If you worked with someone else, say what each person did. If the business is fictional or the piece was a course exercise, label it as sample work. Credit any free assets you used, with their source. Export the work in a clear format and give the file a simple name. Three honest, well explained samples are more convincing than ten pieces with no context.',
        '',
      ),
      scenario: L(
        'Maya adds her three sample posts for a fictional juice stand to her portfolio. Under each one she writes the brief, her design choices and a label: sample work for a fictional business. She also credits the free icon set she used.',
        'تضيف مايا منشوراتها النموذجية الثلاثة لكشك عصير افتراضي إلى ملف أعمالها. تكتب تحت كل منشور وصف المحتوى وخياراتها في التصميم، وتضع عبارة: عمل نموذجي لنشاط تجاري افتراضي. وتذكر أيضاً مصدر مجموعة الأيقونات المجانية التي استخدمتها.',
      ),
      takeaway: L(
        'Explain the brief and your choices, state your role and label sample work honestly.',
        'اشرح وصف المحتوى وخياراتك، ووضّح دورك، واذكر بصدق أن العمل نموذجي.',
      ),
      check: {
        prompt: L(
          'You made a post for a course exercise. How should you label it in your portfolio?',
          'صمّمت منشوراً ضمن تمرين في دورة. كيف تصفه في ملف أعمالك؟',
        ),
        options: [
          L('Sample work for a fictional business', 'عمل نموذجي لنشاط تجاري افتراضي'),
          L('Paid client project', 'مشروع مدفوع لعميل'),
          L('No label is needed', 'لا حاجة إلى أي وصف'),
        ],
        correct: 0,
        feedback: L(
          'Honest labels build trust, and clients value clear thinking in sample work too.',
          'الوصف الصادق يبني الثقة، والعملاء يقدّرون التفكير الواضح في الأعمال النموذجية أيضاً.',
        ),
      },
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
