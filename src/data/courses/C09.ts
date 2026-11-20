import type { Course } from '@shared/types'
import { L } from '../l'

// Brief §9. Enterprise route. Every unit has a full lesson.
export const C09: Course = {
  id: 'C09',
  title: L('Marketing and Sales for a Small Business', 'التسويق والمبيعات للمشاريع الصغيرة'),
  category: 'entrepreneurship',
  routes: ['enterprise'],
  minutes: 40,
  level: 'beginner',
  delivery: 'self-paced',
  outcomes: [
    L('Describe a specific customer segment and need', 'تصف شريحة عملاء محددة واحتياجها'),
    L('Write a short offer that links to a real problem', 'تكتب عرضاً قصيراً يرتبط بمشكلة حقيقية'),
    L('Plan outreach and track enquiries', 'تخطط للتواصل وتتابع الاستفسارات'),
  ],
  units: [
    {
      id: 'C09-U1',
      title: L('Know your customer', 'اعرف عميلك'),
      synopsis: L(
        'Describe a specific customer segment and need.',
        'صِف شريحة عملاء محددة واحتياجها.',
      ),
      objective: L(
        'Describe one specific customer segment and the need your offer responds to.',
        'تصف شريحة عملاء محددة والاحتياج الذي يستجيب له عرضك.',
      ),
      body: L(
        'Many new businesses try to sell to everyone. The result is a message that speaks to no one. A customer segment is a group of people or businesses with a similar need, in a similar place, who make buying decisions in a similar way. Describe your segment in one sentence. Who are they? Where are they? What problem do they face, and how do they deal with it today? For example, "working mothers in our neighbourhood who need school uniforms repaired quickly" is far more useful than "families". To check your description, talk to three or four people from the segment. Ask about their current situation, not whether they like your idea. Listen for the words they use, because those words will help you write your offer in the next unit.',
        '',
      ),
      scenario: L(
        'Karim wants to offer bicycle repairs. Instead of "anyone with a bike", he describes his segment as "delivery riders in his area who lose income when their bikes break down". He talks to three riders and learns that speed matters more to them than price.',
        'يريد كريم تقديم خدمة تصليح الدراجات. بدلاً من "أي شخص لديه دراجة"، يصف شريحته بأنها "عمّال التوصيل في منطقته الذين يخسرون دخلهم عندما تتعطل دراجاتهم". يتحدث مع ثلاثة منهم ويعرف أن السرعة أهم لديهم من السعر.',
      ),
      takeaway: L(
        'Describe one specific group, their problem and how they solve it today, then check it by talking to them.',
        'صِف مجموعة محددة ومشكلتها وكيف تحلّها اليوم، ثم تحقق من ذلك بالتحدث معهم.',
      ),
      check: {
        prompt: L(
          'Which is the most useful customer segment?',
          'أي مما يلي أكثر شرائح العملاء فائدة؟',
        ),
        options: [
          L(
            'Delivery riders in one area whose bikes break down often',
            'عمّال التوصيل في منطقة واحدة تتعطل دراجاتهم كثيراً',
          ),
          L('Everyone who has a bike', 'كل من لديه دراجة'),
          L('People who like sport', 'الأشخاص الذين يحبون الرياضة'),
        ],
        correct: 0,
        feedback: L(
          'A specific group with a clear problem helps you choose your message and channel.',
          'المجموعة المحددة ذات المشكلة الواضحة تساعدك على اختيار رسالتك وقناتك.',
        ),
      },
      hasVideo: true,
      transcript: L(
        'Welcome to Marketing and Sales for a Small Business. We start with the most important question: who is your customer? Not everyone. One specific group. Think about who they are, where they are and what problem they face. Then ask how they solve that problem today. Karim, for example, focused on delivery riders whose bikes break down. When he spoke to them, he learned that fast repairs matter most. That one insight shapes everything else: his message, his channels and his follow up. So before you market anything, go and listen.',
        '',
      ),
    },
    {
      id: 'C09-U2',
      title: L('Explain your value', 'وضّح قيمة عرضك'),
      synopsis: L(
        'Write a short message connecting the offer to the problem.',
        'اكتب رسالة قصيرة تربط العرض بالمشكلة.',
      ),
      objective: L(
        'Write a short offer statement that links your product or service to a real customer problem.',
        'تكتب عبارة عرض قصيرة تربط منتجك أو خدمتك بمشكلة حقيقية لدى العميل.',
      ),
      body: L(
        'Your value is the reason a customer should choose you. A clear offer statement explains it in one or two sentences. A simple pattern works well: for this customer, who has this problem, we offer this, so that this result is possible. Start with the problem, using the words customers used when you spoke to them. Then say what you offer in plain language. Finally, describe the benefit they will notice, such as saving time, reducing stress or getting something closer to home. Avoid big claims like "the best in Syria" or promises you cannot keep. Be specific about what is included. Read your statement aloud. If a friend cannot repeat it back after hearing it once, it is too long or too complicated. Test it with two or three customers and improve it.',
        '',
      ),
      scenario: L(
        'Karim writes: "For delivery riders who lose work when their bike breaks, I offer same-day repairs at your usual stop, so you are back on the road faster." He tests it with two riders, and one asks what "same day" means, so he adds a clear cut-off time.',
        'يكتب كريم: "لعمّال التوصيل الذين يخسرون عملهم عندما تتعطل دراجاتهم، أقدّم تصليحاً في اليوم نفسه عند نقطة توقفكم المعتادة، لتعودوا إلى الطريق بسرعة أكبر." يختبر العبارة مع اثنين منهم، فيسأل أحدهما عن معنى "اليوم نفسه"، فيضيف موعداً نهائياً واضحاً لاستلام الدراجات.',
      ),
      takeaway: L(
        'Start with the customer problem, say plainly what you offer and name the benefit they will notice.',
        'ابدأ بمشكلة العميل، وقل بوضوح ما تقدّمه، واذكر الفائدة التي سيلاحظها.',
      ),
      check: {
        prompt: L('Which offer statement is strongest?', 'أي عبارة عرض هي الأقوى؟'),
        options: [
          L(
            'For busy parents nearby, I repair school uniforms within two days so children are ready for class',
            'للأهالي المشغولين في الحي، أصلح الزي المدرسي خلال يومين ليكون الأطفال جاهزين للدراسة',
          ),
          L('The best tailoring service in Syria', 'أفضل خدمة خياطة في سوريا'),
          L('I do many kinds of sewing for everyone', 'أقوم بأنواع كثيرة من الخياطة للجميع'),
        ],
        correct: 0,
        feedback: L(
          'It names a customer, a problem, a clear offer and a benefit. The others are vague or make big claims.',
          'إنها تذكر العميل والمشكلة والعرض الواضح والفائدة. أما الخياران الآخران فعامّان أو يتضمنان ادعاءات كبيرة.',
        ),
      },
    },
    {
      id: 'C09-U3',
      title: L('Choose practical channels', 'اختر قنوات عملية'),
      synopsis: L(
        'Compare referrals, local outreach and digital channels.',
        'قارن بين التوصيات والتواصل المحلي والقنوات الرقمية.',
      ),
      objective: L(
        'Compare referrals, local outreach and digital channels and choose two that suit your customers.',
        'تقارن بين التوصيات والتواصل المحلي والقنوات الرقمية وتختار قناتين تناسبان عملاءك.',
      ),
      body: L(
        'A channel is the way customers hear about you and contact you. For a small business there are three practical groups. Referrals are recommendations from people customers already trust, such as family, neighbours or past clients. They build trust quickly, but they grow slowly. Local outreach means visiting shops, putting a notice at a community centre or speaking at a local event. It works well when customers live or work nearby. Digital channels include messaging groups and social media pages. They can reach more people, but only if your customers already use them and you can reply quickly. Choose two channels, not five. For each one, write what you will do, how often and how you will know it is working, for example the number of enquiries each week. Respect privacy and never add people to groups without permission.',
        '',
      ),
      scenario: L(
        "Hala sells handmade school bags. Her customers are parents who meet at the school gate and share news in a neighbourhood messaging group. She chooses two channels: asking satisfied parents to recommend her, and posting one clear photo and price each week in the group, with the admin's permission.",
        'تبيع هالة حقائب مدرسية مصنوعة يدوياً. عملاؤها أهالٍ يلتقون عند باب المدرسة ويتبادلون الأخبار في مجموعة مراسلة للحي. تختار قناتين: أن تطلب من الأهالي الراضين أن يوصوا بها، وأن تنشر صورة واضحة مع السعر مرة كل أسبوع في المجموعة بعد إذن المشرف.',
      ),
      takeaway: L(
        'Pick two channels your customers already use, and decide how you will measure each one.',
        'اختر قناتين يستخدمهما عملاؤك أصلاً، وحدد كيف ستقيس نتيجة كل منهما.',
      ),
      check: {
        prompt: L('What is the main strength of referrals?', 'ما القوة الرئيسية للتوصيات؟'),
        options: [
          L(
            'Customers trust a recommendation from someone they know',
            'يثق العملاء بتوصية من شخص يعرفونه',
          ),
          L('They reach thousands of people at once', 'تصل إلى آلاف الأشخاص دفعة واحدة'),
          L('They need no good offer behind them', 'لا تحتاج إلى عرض جيد خلفها'),
        ],
        correct: 0,
        feedback: L(
          'Referrals build trust, though they usually grow slowly and still need a clear offer.',
          'التوصيات تبني الثقة، رغم أنها تنمو ببطء عادةً وتحتاج دائماً إلى عرض واضح.',
        ),
      },
      hasVideo: true,
      transcript: L(
        'In this lesson we choose channels. A channel is simply how customers find you and get in touch. Think of three groups. Referrals, where happy customers recommend you. Local outreach, like visiting shops or a notice at a community centre. And digital channels, such as messaging groups or a social media page. Each has strengths. Referrals bring trust. Local outreach is personal. Digital can reach more people. The best choice is where your customers already are. Pick two channels, decide how often you will use them, and count the enquiries each one brings.',
        '',
      ),
    },
    {
      id: 'C09-U4',
      title: L('Follow up and learn', 'تابع وتعلّم'),
      synopsis: L(
        'Record enquiries, objections and the next action.',
        'سجّل الاستفسارات والاعتراضات والخطوة التالية.',
      ),
      objective: L(
        'Keep a simple log of enquiries, objections and next actions, and use it to improve your offer.',
        'تحتفظ بسجل بسيط للاستفسارات والاعتراضات والخطوات التالية، وتستخدمه لتحسين عرضك.',
      ),
      body: L(
        'Many sales are lost because nobody follows up. A simple enquiry log fixes this. Use a notebook or a spreadsheet with five columns: date, name or business, what they asked about, any objection, and the next action with a date. An objection is a reason someone hesitates, such as "it is too expensive", "I need it sooner" or "I do not know you yet". Record objections in the customer\'s own words. Do not argue. Each objection is information about your offer, your price or your channel. Follow up once, politely, on the date you wrote down, and respect a clear no. At the end of each week, read the log. If the same objection appears three times, consider changing something, such as offering a smaller package or sharing a work sample to build trust.',
        '',
      ),
      scenario: L(
        'Karim logs twelve enquiries in two weeks. Four riders say they cannot leave their bike for a whole day. He adds a quick repair option for small fixes and messages those four riders again to let them know.',
        'يسجّل كريم اثني عشر استفساراً خلال أسبوعين. يقول أربعة من عمّال التوصيل إنهم لا يستطيعون ترك دراجاتهم يوماً كاملاً. فيضيف خيار تصليح سريع للأعطال الصغيرة، ويراسل هؤلاء الأربعة مرة أخرى ليخبرهم بذلك.',
      ),
      takeaway: L(
        'Write down every enquiry, objection and next action, and change your offer when the same objection repeats.',
        'دوّن كل استفسار واعتراض وخطوة تالية، وغيّر عرضك عندما يتكرر الاعتراض نفسه.',
      ),
      check: {
        prompt: L(
          'A customer says "I need it sooner". What should you do first?',
          'قال عميل "أحتاجه في وقت أبكر". ماذا تفعل أولاً؟',
        ),
        options: [
          L('Record the objection and set a next action', 'أسجّل الاعتراض وأحدد خطوة تالية'),
          L('Argue that your timing is fine', 'أجادله بأن توقيتي مناسب'),
          L('Forget it and wait for new customers', 'أنسى الأمر وأنتظر عملاء جدداً'),
        ],
        correct: 0,
        feedback: L(
          'Recording the objection helps you learn, and a next action keeps the conversation open.',
          'تسجيل الاعتراض يساعدك على التعلّم، والخطوة التالية تُبقي الحوار مفتوحاً.',
        ),
      },
    },
  ],
  practicalTask: L(
    'Write a short offer statement for one customer segment and a simple outreach plan with two channels.',
    'اكتب عبارة عرض قصيرة لشريحة عملاء واحدة وخطة تواصل بسيطة عبر قناتين.',
  ),
  output: L('A short offer statement and outreach plan.', 'عبارة عرض قصيرة وخطة تواصل.'),
  quiz: [
    {
      prompt: L(
        'A specific customer problem makes an offer easier to explain.',
        'المشكلة المحددة لدى العميل تجعل شرح العرض أسهل.',
      ),
      options: [L('True', 'صحيح'), L('False', 'خطأ')],
      correct: 0,
      feedback: L(
        'True. When you name the problem, customers quickly see why the offer matters.',
        'صحيح. عندما تسمّي المشكلة، يرى العملاء بسرعة أهمية العرض.',
      ),
      unitIndex: 1,
    },
    {
      prompt: L(
        'Which is the most specific customer segment?',
        'أي مما يلي أكثر شرائح العملاء تحديداً؟',
      ),
      options: [
        L(
          'Small phone repair shops that take bookings by phone',
          'محلات تصليح الهواتف الصغيرة التي تأخذ الحجوزات هاتفياً',
        ),
        L('Everyone', 'الجميع'),
        L('People who like technology', 'الأشخاص الذين يحبون التكنولوجيا'),
      ],
      correct: 0,
      feedback: L(
        'A specific segment helps you choose the right message and channel.',
        'الشريحة المحددة تساعدك على اختيار الرسالة والقناة المناسبتين.',
      ),
      unitIndex: 0,
    },
    {
      prompt: L('Referrals work well because:', 'تنجح التوصيات لأن:'),
      options: [
        L('People trust recommendations from someone they know', 'الناس يثقون بتوصيات من يعرفونهم'),
        L('They are always free and instant', 'إنها مجانية وفورية دائماً'),
        L('They replace a good offer', 'إنها تغني عن العرض الجيد'),
      ],
      correct: 0,
      feedback: L(
        'Trust is the strength of referrals, but you still need a clear offer.',
        'الثقة هي قوة التوصيات، لكنك تحتاج دائماً إلى عرض واضح.',
      ),
      unitIndex: 2,
    },
    {
      prompt: L(
        'A customer says "it is too expensive". What should you record?',
        'قال عميل "السعر مرتفع جداً". ماذا تسجّل؟',
      ),
      options: [
        L('The objection and your next action', 'الاعتراض والخطوة التالية'),
        L('Nothing, it does not matter', 'لا شيء، فهذا غير مهم'),
        L('Only the customer name', 'اسم العميل فقط'),
      ],
      correct: 0,
      feedback: L(
        'Recording objections helps you learn and improve your offer.',
        'تسجيل الاعتراضات يساعدك على التعلّم وتحسين عرضك.',
      ),
      unitIndex: 3,
    },
    {
      prompt: L(
        'Before choosing a digital channel, you should check:',
        'قبل اختيار قناة رقمية، يجب أن تتحقق من:',
      ),
      options: [
        L('Whether your customers actually use it', 'أن عملاءك يستخدمونها فعلاً'),
        L('Whether it is the newest app', 'أنها أحدث تطبيق'),
        L('Whether your friends like it', 'أن أصدقاءك يحبونها'),
      ],
      correct: 0,
      feedback: L(
        'The best channel is the one your customers already use.',
        'أفضل قناة هي التي يستخدمها عملاؤك أصلاً.',
      ),
      unitIndex: 2,
    },
  ],
  resources: ['customerInterview'],
  prerequisites: ['C07'],
  image: 'images/generated/course-C09.webp',
}
