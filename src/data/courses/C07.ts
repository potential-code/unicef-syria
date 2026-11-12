import type { Course } from '@shared/types'
import { L } from '../l'

// Brief §8. Enterprise showcase course: every unit has a full lesson.
export const C07: Course = {
  id: 'C07',
  title: L('Business Idea and Customer Discovery', 'فكرة المشروع واكتشاف العملاء'),
  category: 'entrepreneurship',
  routes: ['enterprise'],
  minutes: 45,
  level: 'beginner',
  delivery: 'self-paced',
  showcase: true,
  outcomes: [
    L(
      'Describe a customer and their problem before proposing a product',
      'تصف العميل ومشكلته قبل اقتراح منتج',
    ),
    L(
      'Ask open questions about what customers do today',
      'تطرح أسئلة مفتوحة عمّا يفعله العملاء حالياً',
    ),
    L(
      'Run a small test and decide what to keep, change or test next',
      'تجري اختباراً صغيراً وتقرر ما تبقيه أو تغيّره أو تختبره لاحقاً',
    ),
  ],
  units: [
    {
      id: 'C07-U1',
      title: L('Choose a problem worth solving', 'اختر مشكلة تستحق الحل'),
      synopsis: L(
        'Describe the customer and the problem before proposing a product.',
        'صِف العميل والمشكلة قبل اقتراح أي منتج.',
      ),
      objective: L(
        'Write a short problem statement that names a specific customer and their problem.',
        'تكتب عبارة مشكلة قصيرة تحدد عميلاً بعينه ومشكلته.',
      ),
      body: L(
        'Many new businesses start with a product idea and then look for someone to buy it. A stronger start is the other way round. First, choose a group of customers you can actually reach, such as small shops on your street or students at your centre. Then describe a problem they face, in their words, not yours. A useful problem statement has three parts: who the customer is, what they are trying to do, and what gets in the way. For example: "Small repair shops want to keep their day organised, but they lose track of phone bookings." Notice that this statement does not mention an app or a solution. Keeping the solution out at this stage helps you stay open to what customers really need, and saves you from building something nobody wants.',
        '',
      ),
      scenario: L(
        'Omar has an idea for an appointment-booking service. Before designing anything, he writes a problem statement: "Local repair businesses want to serve customers on time, but they find it hard to manage enquiries and missed appointments."',
        'لدى عمر فكرة لخدمة حجز المواعيد. قبل أن يصمم أي شيء، يكتب عبارة المشكلة: "تريد محلات التصليح المحلية خدمة عملائها في الوقت المحدد، لكنها تجد صعوبة في إدارة الاستفسارات والمواعيد الفائتة".',
      ),
      takeaway: L(
        'Describe who the customer is and what gets in their way before you describe your product.',
        'صِف من هو العميل وما الذي يعيقه قبل أن تصف منتجك.',
      ),
      check: {
        prompt: L('Which is the best problem statement?', 'أي مما يلي أفضل عبارة مشكلة؟'),
        options: [
          L(
            'Local repair shops lose track of phone bookings during busy days',
            'محلات التصليح المحلية تفقد متابعة الحجوزات الهاتفية في الأيام المزدحمة',
          ),
          L('I will build a booking app', 'سأبني تطبيقاً للحجز'),
          L('Everyone needs technology', 'الجميع يحتاج إلى التكنولوجيا'),
        ],
        correct: 0,
        feedback: L(
          'It names a specific customer and problem, and does not jump to a solution.',
          'تحدد عميلاً ومشكلة بعينها، ولا تقفز مباشرة إلى الحل.',
        ),
      },
      hasVideo: true,
      transcript: L(
        'Welcome to Business Idea and Customer Discovery. Many people start with a product and hope customers will come. In this course we start with people instead. Think of a group you can really reach, like shops in your neighbourhood. What are they trying to do each day? What gets in their way? Write that down in one sentence, without mentioning your idea. In this course you will follow Omar, who is exploring an appointment-booking service for local repair businesses. His first step is not building anything. It is understanding the problem.',
        '',
      ),
    },
    {
      id: 'C07-U2',
      title: L('Talk to potential customers', 'تحدّث مع العملاء المحتملين'),
      synopsis: L(
        'Ask open questions about current behaviour rather than leading questions.',
        'اطرح أسئلة مفتوحة عن السلوك الحالي بدلاً من الأسئلة الموجِّهة.',
      ),
      objective: L(
        'Write three open interview questions about what customers do today.',
        'تكتب ثلاثة أسئلة مقابلة مفتوحة عمّا يفعله العملاء حالياً.',
      ),
      body: L(
        'Talking to potential customers is the fastest way to learn if a problem is real. The hard part is asking good questions. A leading question pushes people toward the answer you want, such as "Would you use my booking app?" Most people will say yes to be polite, and you learn nothing. An open question asks about what people already do, such as "How do you take bookings at the moment?" or "What happened the last time a customer missed an appointment?" Questions about past behaviour give you real stories. Listen more than you talk, and write down their exact words. Do not try to sell your idea during the conversation. Aim for short conversations with several people, and keep your notes in one place so you can compare answers later.',
        '',
      ),
      scenario: L(
        'Omar visits local repair businesses. Instead of describing his idea, he asks: "How do you manage enquiries now?", "What happens when a customer misses an appointment?" and "What have you tried to fix this?" He writes down what each owner says.',
        'يزور عمر محلات تصليح محلية. بدلاً من شرح فكرته، يسأل: "كيف تديرون الاستفسارات حالياً؟" و"ماذا يحدث عندما يفوّت عميل موعده؟" و"ما الذي جربتموه لحل ذلك؟" ويدوّن ما يقوله كل صاحب محل.',
      ),
      takeaway: L(
        'Ask about what people did last time, not whether they would like your idea.',
        'اسأل عمّا فعله الناس آخر مرة، لا عمّا إذا كانت فكرتك تعجبهم.',
      ),
      check: {
        prompt: L(
          'Which is an open question about current behaviour?',
          'أي مما يلي سؤال مفتوح عن السلوك الحالي؟',
        ),
        options: [
          L('How do you manage enquiries at the moment?', 'كيف تديرون الاستفسارات حالياً؟'),
          L('Would you pay for my app?', 'هل ستدفع مقابل تطبيقي؟'),
          L("Don't you think booking is a big problem?", 'ألا تعتقد أن الحجز مشكلة كبيرة؟'),
        ],
        correct: 0,
        feedback: L(
          'It asks about what the customer does now, without pushing them toward an answer.',
          'يسأل عمّا يفعله العميل الآن دون أن يدفعه نحو إجابة معينة.',
        ),
      },
    },
    {
      id: 'C07-U3',
      title: L('Test a small solution', 'اختبر حلاً صغيراً'),
      synopsis: L(
        'Create a simple service trial or prototype.',
        'أنشئ تجربة خدمة بسيطة أو نموذجاً أولياً.',
      ),
      objective: L(
        'Plan a low-cost trial that tests one important assumption.',
        'تخطط لتجربة منخفضة التكلفة تختبر افتراضاً مهماً واحداً.',
      ),
      body: L(
        'After listening to customers, you may feel ready to build the full product. Wait. First, design a small test that checks your most important assumption. A test does not need to be perfect or expensive. It can be a paper form, a shared spreadsheet, a simple message template or a service you run by hand for one week. Before you start, write down what you expect to happen and how you will know if the test worked. Keep the test short and agree it clearly with the people taking part. Be honest that it is a trial. During the test, note what people actually do, not only what they say. Small, cheap tests help you learn quickly and reduce the risk of spending time and money on the wrong thing.',
        '',
      ),
      scenario: L(
        'Omar agrees a one-week trial with a repair shop owner who is willing to try. He sets up a shared booking sheet and sends a reminder message to customers the day before each appointment. He records which customers confirm and any problems the owner notices.',
        'يتفق عمر على تجربة لمدة أسبوع مع صاحب محل تصليح مستعد للتجربة. يُعدّ جدول حجوزات مشتركاً ويرسل رسالة تذكير للعملاء قبل كل موعد بيوم. ويسجّل من يؤكد من العملاء وأي مشكلات يلاحظها صاحب المحل.',
      ),
      takeaway: L(
        'Test your biggest assumption with the simplest, cheapest trial you can run.',
        'اختبر أهم افتراضاتك بأبسط تجربة وأقلها تكلفة.',
      ),
      check: {
        prompt: L(
          'Which is a good first test for a booking service?',
          'ما الاختبار الأول المناسب لخدمة حجز؟',
        ),
        options: [
          L(
            'A shared booking sheet and reminder messages for one week',
            'جدول حجوزات مشترك ورسائل تذكير لمدة أسبوع',
          ),
          L('Building a full app before talking to anyone', 'بناء تطبيق كامل قبل التحدث مع أحد'),
          L('Printing a thousand flyers', 'طباعة ألف منشور إعلاني'),
        ],
        correct: 0,
        feedback: L(
          'A small, cheap trial shows whether the idea helps before you invest more.',
          'التجربة الصغيرة منخفضة التكلفة تُظهر إن كانت الفكرة مفيدة قبل أن تستثمر أكثر.',
        ),
      },
      hasVideo: true,
      transcript: L(
        'You have listened to customers. Now it is time to test, but not to build everything. Ask yourself: what is the one thing that must be true for my idea to work? For Omar, it is that reminders help repair shops reduce missed appointments. So he runs a one-week trial with a shared booking sheet and simple reminder messages. Before starting, he writes down what he expects to happen. During the week, he watches what people actually do. A small test like this costs very little and teaches a lot.',
        '',
      ),
    },
    {
      id: 'C07-U4',
      title: L('Review the evidence', 'راجع الأدلة'),
      synopsis: L(
        'Decide what to keep, change or test next.',
        'قرّر ما تبقيه أو تغيّره أو تختبره لاحقاً.',
      ),
      objective: L(
        'Use your interview notes and test results to decide your next step.',
        'تستخدم ملاحظات المقابلات ونتائج الاختبار لتحديد خطوتك التالية.',
      ),
      body: L(
        'Evidence is only useful if you look at it honestly. Bring together your interview notes and what happened in your test. Read them with three questions in mind. What should I keep, because customers clearly valued it? What should I change, because it confused people or did not work? What should I test next, because I still do not know? Look for patterns across several people, not one strong opinion. Be careful with results that only confirm what you hoped. It is normal for evidence to show that part of your idea is wrong. That is a useful result, not a failure. Write your decision in a few lines and plan your next small test. This review is also strong material for a pitch or a support application later.',
        '',
      ),
      scenario: L(
        'Omar reviews his notes. Owners liked the reminder messages, but the shared sheet was hard to update while they were busy with repairs. He decides to keep the reminders, change how bookings are recorded, and test next whether owners would pay for the service.',
        'يراجع عمر ملاحظاته. أعجب أصحاب المحلات برسائل التذكير، لكن تحديث الجدول المشترك كان صعباً أثناء انشغالهم بالتصليح. يقرر الإبقاء على التذكيرات، وتغيير طريقة تسجيل الحجوزات، واختبار ما إذا كان أصحاب المحلات مستعدين للدفع مقابل الخدمة.',
      ),
      takeaway: L(
        'Sort your evidence into keep, change and test next, and treat surprises as useful learning.',
        'صنّف أدلتك إلى ما تبقيه وما تغيّره وما تختبره لاحقاً، وتعامل مع المفاجآت كتعلّم مفيد.',
      ),
      check: {
        prompt: L(
          'Your test shows part of your idea did not work. What does this mean?',
          'أظهر اختبارك أن جزءاً من فكرتك لم ينجح. ماذا يعني ذلك؟',
        ),
        options: [
          L(
            'You learned something useful and can change that part',
            'تعلّمت شيئاً مفيداً ويمكنك تغيير ذلك الجزء',
          ),
          L('You should hide the result', 'يجب أن تخفي النتيجة'),
          L('The whole idea has failed', 'الفكرة كلها فشلت'),
        ],
        correct: 0,
        feedback: L(
          'Evidence that something does not work is valuable. It tells you what to change.',
          'الدليل على أن شيئاً لا ينجح قيّم، لأنه يخبرك بما يجب تغييره.',
        ),
      },
    },
  ],
  practicalTask: L(
    'Write a problem statement for your own idea and three open customer interview questions.',
    'اكتب عبارة مشكلة لفكرتك الخاصة وثلاثة أسئلة مفتوحة لمقابلة العملاء.',
  ),
  output: L(
    'Problem statement and three customer interview questions.',
    'عبارة المشكلة وثلاثة أسئلة لمقابلة العملاء.',
  ),
  quiz: [
    {
      prompt: L(
        'What should you describe before proposing a product?',
        'ما الذي يجب أن تصفه قبل اقتراح منتج؟',
      ),
      options: [
        L('The customer and their problem', 'العميل ومشكلته'),
        L('The product price', 'سعر المنتج'),
        L('The logo and name', 'الشعار والاسم'),
        L('Your competitors', 'منافسيك'),
      ],
      correct: 0,
      feedback: L(
        'Starting with the customer and problem keeps you focused on a real need.',
        'البدء بالعميل والمشكلة يُبقيك مركّزاً على حاجة حقيقية.',
      ),
      unitIndex: 0,
    },
    {
      prompt: L(
        '"Would you use my app?" is a leading question.',
        'سؤال "هل ستستخدم تطبيقي؟" سؤال موجِّه.',
      ),
      options: [L('True', 'صحيح'), L('False', 'خطأ')],
      correct: 0,
      feedback: L(
        'True. People often say yes to be polite. Ask about what they do now instead.',
        'صحيح. كثيراً ما يجيب الناس بنعم من باب المجاملة. اسأل بدلاً من ذلك عمّا يفعلونه الآن.',
      ),
      unitIndex: 1,
    },
    {
      prompt: L('Omar first asks repair businesses:', 'أول ما يسأله عمر لمحلات التصليح هو:'),
      options: [
        L(
          'How they currently manage enquiries and missed appointments',
          'كيف يديرون حالياً الاستفسارات والمواعيد الفائتة',
        ),
        L('How much they would pay for his app', 'كم سيدفعون مقابل تطبيقه'),
        L('Whether they like his logo', 'هل يعجبهم شعاره'),
      ],
      correct: 0,
      feedback: L(
        'Asking about current behaviour shows whether the problem is real.',
        'السؤال عن السلوك الحالي يُظهر إن كانت المشكلة حقيقية.',
      ),
      unitIndex: 1,
    },
    {
      prompt: L('A good first test of a business idea is:', 'الاختبار الأول الجيد لفكرة مشروع هو:'),
      options: [
        L('Small, cheap and focused on one assumption', 'صغير ورخيص ويركّز على افتراض واحد'),
        L('As large as possible', 'كبير قدر الإمكان'),
        L('Only done after launch', 'يُجرى فقط بعد الإطلاق'),
      ],
      correct: 0,
      feedback: L(
        'Small tests let you learn quickly with little risk.',
        'الاختبارات الصغيرة تتيح لك التعلّم بسرعة وبمخاطرة قليلة.',
      ),
      unitIndex: 2,
    },
    {
      prompt: L(
        'When reviewing evidence, you should look for:',
        'عند مراجعة الأدلة، يجب أن تبحث عن:',
      ),
      options: [
        L('Patterns across several customers', 'أنماط مشتركة بين عدة عملاء'),
        L('Only the comments you agree with', 'التعليقات التي تتفق معها فقط'),
        L('The loudest single opinion', 'أعلى رأي منفرد'),
      ],
      correct: 0,
      feedback: L(
        'Patterns across several people are more reliable than one opinion.',
        'الأنماط المشتركة بين عدة أشخاص أكثر موثوقية من رأي واحد.',
      ),
      unitIndex: 3,
    },
  ],
  resources: ['customerInterview'],
  prerequisites: ['C01'],
  image: 'images/generated/course-C07.webp',
}
