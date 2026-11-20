import type { Course } from '@shared/types'
import { L } from '../l'

// Brief §7. Career foundations, all routes. Every unit has a full lesson.
export const C03: Course = {
  id: 'C03',
  title: L('Communication and Teamwork at Work', 'التواصل والعمل الجماعي في بيئة العمل'),
  category: 'foundations',
  routes: 'all',
  minutes: 40,
  level: 'beginner',
  delivery: 'self-paced',
  outcomes: [
    L('Ask clarifying questions before acting', 'تطرح أسئلة توضيحية قبل التصرف'),
    L(
      'Write short messages with a clear request and next step',
      'تكتب رسائل قصيرة فيها طلب واضح وخطوة تالية',
    ),
    L(
      'Respond calmly to feedback and a service problem',
      'تستجيب بهدوء للملاحظات ولمشكلة في الخدمة',
    ),
  ],
  units: [
    {
      id: 'C03-U1',
      title: L('Listen and ask clear questions', 'استمع واطرح أسئلة واضحة'),
      synopsis: L(
        'Confirm what another person needs before acting.',
        'تأكد مما يحتاجه الشخص الآخر قبل أن تتصرف.',
      ),
      objective: L(
        'Confirm what someone needs by listening fully and asking clarifying questions before you act.',
        'تتأكد مما يحتاجه الشخص الآخر بالاستماع الجيد وطرح أسئلة توضيحية قبل أن تتصرف.',
      ),
      body: L(
        'Many mistakes at work happen because someone acted before they understood the request. Good listening means giving the speaker your full attention. Put your phone away, look at the person and let them finish before you answer. Then ask clarifying questions. Useful questions start with what, when, who and how. For example: "What should the final list include?" or "When do you need it?". Finally, repeat the request in your own words: "So you need the attendance list by Thursday, sorted by name. Is that right?". This short summary gives the other person a chance to correct you. It may feel slow at first, but it saves time, avoids doing the wrong task and shows that you take the work seriously. The same skill helps with customers, trainers and teammates.',
        '',
      ),
      scenario: L(
        'Hala\'s supervisor asks her to "prepare the room for tomorrow". Hala asks how many people are coming, what time the session starts and whether a projector is needed. She then repeats the plan back, and her supervisor adds that water bottles are needed too.',
        'تطلب مشرفة هالة منها "تجهيز القاعة للغد". تسأل هالة عن عدد الحضور وموعد بدء الجلسة وهل يلزم جهاز عرض. ثم تعيد الخطة بكلماتها، فتضيف المشرفة أن قوارير الماء مطلوبة أيضاً.',
      ),
      takeaway: L(
        'Listen fully, ask what, when, who and how, then repeat the request to confirm it.',
        'استمع جيداً، واسأل عن ماذا ومتى ومن وكيف، ثم أعد صياغة الطلب لتتأكد منه.',
      ),
      check: {
        prompt: L(
          'Your manager says "sort out the files". What is the best first response?',
          'يقول مديرك "رتّب الملفات". ما أفضل استجابة أولى؟',
        ),
        options: [
          L(
            'Ask which files and how they should be sorted',
            'أسأل عن الملفات المقصودة وطريقة ترتيبها',
          ),
          L('Start sorting immediately in your own way', 'أبدأ الترتيب فوراً بطريقتي'),
          L('Wait for someone else to do it', 'أنتظر أن يقوم بها شخص آخر'),
        ],
        correct: 0,
        feedback: L(
          'A quick clarifying question avoids wasted work and shows you care about getting it right.',
          'السؤال التوضيحي السريع يمنع ضياع الجهد ويُظهر حرصك على إتقان العمل.',
        ),
      },
      hasVideo: true,
      transcript: L(
        'Welcome to Communication and Teamwork at Work. In this first lesson we practise listening. When someone gives you a task, stop what you are doing and listen until they finish. Then ask short questions. What exactly is needed? When is it due? Who is it for? Finally, repeat the request in your own words. You might say: so you need the room ready by nine, with chairs for twenty people. This simple check catches mistakes early. It also shows the other person that you are reliable and that you care about the result.',
        '',
      ),
    },
    {
      id: 'C03-U2',
      title: L('Write with purpose', 'اكتب بهدف واضح'),
      synopsis: L(
        'Create concise messages with a clear request and next step.',
        'اكتب رسائل موجزة تتضمن طلباً واضحاً وخطوة تالية.',
      ),
      objective: L(
        'Write a short work message that states the request, the deadline and the next step.',
        'تكتب رسالة عمل قصيرة توضح الطلب والموعد النهائي والخطوة التالية.',
      ),
      body: L(
        'At work, people are busy and read messages quickly. A purposeful message gets to the point. Before you write, ask yourself: what do I need, from whom and by when? Put the request in the first or second sentence. Give one short reason if it helps the reader understand. Include a clear deadline, such as "by Thursday at 12:00", rather than "soon". End with the next step, for example "Once I have the list, I will prepare the certificates". Keep sentences short and use a polite tone. If you need several things, use a short numbered list. Read the message once as if you were the receiver. If they could reply "What do you mean?", rewrite it. Clear messages reduce back-and-forth and help the whole team move faster.',
        '',
      ),
      scenario: L(
        'Omar needs a teammate to send him photos from a community event. His first draft says "Hi, about the photos". He rewrites it: "Could you send me the event photos by Wednesday? I will use them in our project report on Thursday."',
        'يحتاج عمر من زميله أن يرسل له صور فعالية مجتمعية. مسودته الأولى تقول "مرحباً، بخصوص الصور". يعيد كتابتها: "هل يمكنك إرسال صور الفعالية قبل الأربعاء؟ سأستخدمها في تقرير مشروعنا يوم الخميس."',
      ),
      takeaway: L(
        'Say what you need, by when and what happens next, in as few words as possible.',
        'اذكر ما تحتاجه وموعده وما سيحدث بعده، بأقل عدد ممكن من الكلمات.',
      ),
      check: {
        prompt: L(
          'Which deadline is clearest in a work message?',
          'أي موعد نهائي هو الأوضح في رسالة عمل؟',
        ),
        options: [
          L('By Thursday at 12:00', 'قبل الخميس الساعة 12:00'),
          L('Soon, if possible', 'قريباً إن أمكن'),
          L('Whenever you have time', 'متى ما سنح لك الوقت'),
        ],
        correct: 0,
        feedback: L(
          'A specific day and time leaves no doubt about when the task is needed.',
          'اليوم والساعة المحددان لا يتركان شكاً في موعد الحاجة إلى المهمة.',
        ),
      },
    },
    {
      id: 'C03-U3',
      title: L('Work with others', 'اعمل مع الآخرين'),
      synopsis: L(
        'Allocate tasks and raise concerns respectfully.',
        'وزّع المهام وعبّر عن مخاوفك باحترام.',
      ),
      objective: L(
        'Share tasks fairly in a team and raise a concern in a respectful, solution-focused way.',
        'توزّع المهام بعدل في الفريق وتعبّر عن مخاوفك بطريقة محترمة تركّز على الحلول.',
      ),
      body: L(
        'Teamwork works best when everyone knows who is doing what. At the start of a group task, list all the steps together. Then match each step to a person, thinking about their skills and the time they have. Write the plan where everyone can see it, with names and dates. Check in briefly as you go. Problems will still happen. A teammate may be late, or you may feel the work is not shared fairly. Raise the concern early and privately. Describe the situation, not the person: "The budget section is not ready and we present on Sunday" works better than "You never do your part". Then ask a question and look for a solution together, such as sharing the task or agreeing a new time. Respectful honesty keeps the team working.',
        '',
      ),
      scenario: L(
        "Rania's group is preparing a short presentation. Two days before the deadline, Sami has not finished his slides. Rania messages him privately, describes what is missing and asks if he needs help. They agree that she will find the images while he writes the text.",
        'تُعدّ مجموعة رانيا عرضاً تقديمياً قصيراً. قبل الموعد النهائي بيومين لم ينهِ سامي شرائحه. تراسله رانيا على انفراد، وتوضح ما ينقص وتسأله إن كان يحتاج مساعدة. يتفقان على أن تبحث هي عن الصور بينما يكتب هو النص.',
      ),
      takeaway: L(
        'Agree in writing who does what, and raise concerns early, privately and with a solution.',
        'اتفقوا كتابياً على من يفعل ماذا، وعبّر عن مخاوفك مبكراً وعلى انفراد ومع اقتراح حل.',
      ),
      check: {
        prompt: L(
          'Which sentence raises a concern respectfully?',
          'أي جملة تعبّر عن القلق باحترام؟',
        ),
        options: [
          L(
            'The budget part is not ready yet. How can we finish it by Sunday?',
            'جزء الميزانية لم يجهز بعد. كيف يمكننا إنهاؤه قبل الأحد؟',
          ),
          L('You never do your share of the work.', 'أنت لا تقوم بنصيبك من العمل أبداً.'),
          L('I will tell the trainer you are lazy.', 'سأخبر المدرب بأنك كسول.'),
        ],
        correct: 0,
        feedback: L(
          'Describing the situation and asking for a solution keeps the focus on the work, not the person.',
          'وصف الموقف وطلب الحل يبقيان التركيز على العمل، لا على الشخص.',
        ),
      },
      hasVideo: true,
      transcript: L(
        'In this lesson we look at working with others. Start every group task by listing the steps and agreeing who does each one. Write names and dates where the whole team can see them. When something goes wrong, speak up early. Talk to the person privately. Describe what is happening, not what kind of person they are. Then ask a question, like: how can we finish this together? Rania did this with Sami, and they shared the work in a new way. Clear plans and respectful honesty help teams succeed.',
        '',
      ),
    },
    {
      id: 'C03-U4',
      title: L('Handle difficult conversations', 'تعامل مع المحادثات الصعبة'),
      synopsis: L(
        'Respond calmly to feedback and resolve a service problem.',
        'استجب بهدوء للملاحظات وعالج مشكلة في الخدمة.',
      ),
      objective: L(
        'Respond calmly to feedback and to an unhappy customer by acknowledging the issue and offering a next step.',
        'تستجيب بهدوء للملاحظات ولعميل غير راضٍ بالاعتراف بالمشكلة واقتراح خطوة تالية.',
      ),
      body: L(
        'Difficult conversations are part of every job. When you receive critical feedback, take a breath before you answer. Listen to the whole point, then ask for an example if it is unclear. Thank the person and choose one thing you will try to improve. Feedback is about your work, not your value as a person. Unhappy customers need a similar calm approach. First, listen without interrupting. Next, acknowledge the problem: "I understand the delay has caused you trouble". Then explain what you can do and when, for example "I will check with the workshop and call you back by 3 pm". Do not blame colleagues or make promises you cannot keep. If the issue is beyond your role, involve your supervisor. A calm, honest reply often turns a complaint into trust.',
        '',
      ),
      scenario: L(
        'A customer messages Lina angrily because a printed order is late. Lina replies: "I am sorry for the delay. I understand you need it today. I will check with the print team and update you within one hour." She then follows up as promised.',
        'يراسل أحد العملاء لينا بغضب لأن طلب الطباعة تأخر. ترد لينا: "أعتذر عن التأخير، وأتفهم أنك تحتاجه اليوم. سأتحقق من فريق الطباعة وأبلغك خلال ساعة." ثم تتابع معه كما وعدت.',
      ),
      takeaway: L(
        'Listen, acknowledge the problem, offer a realistic next step and follow up as promised.',
        'استمع، واعترف بالمشكلة، واقترح خطوة تالية واقعية، وتابع كما وعدت.',
      ),
      check: {
        prompt: L(
          'A customer complains about a late order. Which reply is best?',
          'يشتكي عميل من تأخر طلبه. أي رد هو الأفضل؟',
        ),
        options: [
          L(
            'I am sorry for the delay. I will check and update you within an hour.',
            'أعتذر عن التأخير. سأتحقق وأبلغك خلال ساعة.',
          ),
          L('That is not my department.', 'هذا ليس من اختصاص قسمي.'),
          L('It will definitely be ready in five minutes.', 'سيكون جاهزاً حتماً خلال خمس دقائق.'),
        ],
        correct: 0,
        feedback: L(
          'It acknowledges the problem and gives a realistic next step. The last option promises something you may not control.',
          'يعترف بالمشكلة ويقدّم خطوة تالية واقعية. أما الخيار الأخير فيعد بشيء قد لا يكون بيدك.',
        ),
      },
    },
  ],
  practicalTask: L(
    'Write a calm, helpful reply to a dissatisfied customer that acknowledges the problem and offers a next step.',
    'اكتب رداً هادئاً ومفيداً على عميل غير راضٍ يعترف بالمشكلة ويقترح خطوة تالية.',
  ),
  output: L('A response to a dissatisfied customer.', 'رد على عميل غير راضٍ.'),
  quiz: [
    {
      prompt: L(
        'The first response to an unclear request is to ask clarifying questions.',
        'أول استجابة لطلب غير واضح هي طرح أسئلة توضيحية.',
      ),
      options: [L('True', 'صحيح'), L('False', 'خطأ')],
      correct: 0,
      feedback: L(
        'True. Clarifying first saves time and avoids doing the wrong task.',
        'صحيح. التوضيح أولاً يوفر الوقت ويمنع تنفيذ المهمة الخطأ.',
      ),
      unitIndex: 0,
    },
    {
      prompt: L(
        'Which message has a clear request and next step?',
        'أي رسالة تتضمن طلباً واضحاً وخطوة تالية؟',
      ),
      options: [
        L(
          'Please send the attendance list by Thursday so I can prepare the certificates.',
          'يرجى إرسال قائمة الحضور قبل الخميس لأجهّز الشهادات.',
        ),
        L('Hi, about the thing we discussed.', 'مرحباً، بخصوص ما تحدثنا عنه.'),
        L('Let me know.', 'أخبرني.'),
      ],
      correct: 0,
      feedback: L('It says what is needed, by when and why.', 'تذكر المطلوب والموعد والسبب.'),
      unitIndex: 1,
    },
    {
      prompt: L(
        'A teammate has not finished their part. What is a respectful first step?',
        'لم ينهِ زميلك جزءه من العمل. ما الخطوة الأولى المحترمة؟',
      ),
      options: [
        L(
          'Ask privately if they need help and agree a new time',
          'أسأله على انفراد إن كان يحتاج مساعدة ونتفق على موعد جديد',
        ),
        L('Complain in the group chat', 'أشتكي في مجموعة المحادثة'),
        L('Do nothing and hope', 'لا أفعل شيئاً وأنتظر'),
      ],
      correct: 0,
      feedback: L(
        'Raising concerns privately and offering support keeps the team working together.',
        'طرح المخاوف على انفراد وعرض المساعدة يحافظ على تعاون الفريق.',
      ),
      unitIndex: 2,
    },
    {
      prompt: L(
        'A customer is upset about a delay. What should you say first?',
        'عميل منزعج من تأخير. ماذا تقول أولاً؟',
      ),
      options: [
        L(
          'Acknowledge the problem and explain what you will do next',
          'أعترف بالمشكلة وأوضح ما سأفعله بعد ذلك',
        ),
        L('Tell them it is not your fault', 'أقول إن الخطأ ليس خطئي'),
        L('Ignore the message', 'أتجاهل الرسالة'),
      ],
      correct: 0,
      feedback: L(
        'Acknowledging the problem and giving a next step helps calm the conversation.',
        'الاعتراف بالمشكلة وتقديم خطوة تالية يساعدان على تهدئة الحوار.',
      ),
      unitIndex: 3,
    },
    {
      prompt: L(
        'When you receive critical feedback, a good response is to:',
        'عند تلقي ملاحظات نقدية، الاستجابة الجيدة هي:',
      ),
      options: [
        L(
          'Listen, ask for an example and decide one thing to improve',
          'أستمع وأطلب مثالاً وأختار أمراً واحداً لتحسينه',
        ),
        L('Defend yourself immediately', 'أدافع عن نفسي فوراً'),
        L('Stop working on the task', 'أتوقف عن العمل على المهمة'),
      ],
      correct: 0,
      feedback: L(
        'Calm listening and one clear improvement turn feedback into progress.',
        'الاستماع بهدوء واختيار تحسين واضح يحوّلان الملاحظات إلى تقدّم.',
      ),
      unitIndex: 3,
    },
  ],
  resources: [],
  prerequisites: [],
  image: 'images/generated/course-C03.webp',
}
