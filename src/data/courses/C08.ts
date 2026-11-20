import type { Course } from '@shared/types'
import { L } from '../l'

// Brief §8. Enterprise route. Fictional amounts only. Every unit has a full lesson.
export const C08: Course = {
  id: 'C08',
  title: L('Business Model and Money Basics', 'نموذج العمل وأساسيات المال'),
  category: 'entrepreneurship',
  routes: ['enterprise'],
  minutes: 45,
  level: 'intermediate',
  delivery: 'self-paced',
  outcomes: [
    L(
      'Map customers, value, channels and key activities',
      'ترسم خريطة العملاء والقيمة والقنوات والأنشطة الرئيسية',
    ),
    L(
      'Separate setup costs, regular costs and a proposed price',
      'تميّز بين تكاليف التأسيس والتكاليف الدورية والسعر المقترح',
    ),
    L(
      'Compare optimistic and cautious cash examples',
      'تقارن بين مثال متفائل وآخر حذر للتدفق النقدي',
    ),
  ],
  units: [
    {
      id: 'C08-U1',
      title: L('Map how the business works', 'ارسم طريقة عمل المشروع'),
      synopsis: L(
        'Identify customers, value, channels and key activities.',
        'حدد العملاء والقيمة والقنوات والأنشطة الرئيسية.',
      ),
      objective: L(
        'Describe your customers, the value you offer, your channels and your key activities on one page.',
        'تصف عملاءك والقيمة التي تقدّمها وقنواتك وأنشطتك الرئيسية في صفحة واحدة.',
      ),
      body: L(
        'A business model is a simple picture of how your idea works day to day. You can draw it on one page with four boxes. Customers: who exactly will use or pay for your offer? Value: what problem do you solve for them, or what do you make easier? Channels: how will customers find you, buy from you and receive what you sell? Key activities: what must you do every week to keep the business running, such as buying materials, answering messages or delivering orders? Fill each box with short, specific notes, not long paragraphs. If a box is hard to fill, that is useful information. It shows where you need to learn more before spending time or money. Keep the page and update it as you talk to more customers.',
        '',
      ),
      scenario: L(
        'Omar is exploring an appointment-booking service for local repair shops. In his customers box he writes "small phone repair shops in his neighbourhood", and in his value box he writes "fewer missed appointments". He leaves the channels box half empty and plans to ask two shop owners how they prefer to be contacted.',
        'يستكشف عمر خدمة لحجز المواعيد لمحلات التصليح المحلية. يكتب في خانة العملاء "محلات تصليح الهواتف الصغيرة في حيّه"، وفي خانة القيمة "مواعيد فائتة أقل". يترك خانة القنوات نصف فارغة ويخطط لسؤال صاحبَي محلين عن الطريقة التي يفضّلانها للتواصل.',
      ),
      takeaway: L(
        'A one-page model with short, specific notes shows how the business works and where you still need answers.',
        'نموذج من صفحة واحدة بملاحظات قصيرة ومحددة يوضح طريقة عمل المشروع وأين ما زلت تحتاج إلى إجابات.',
      ),
      check: {
        prompt: L(
          'Which note belongs in the "key activities" box?',
          'أي ملاحظة تنتمي إلى خانة "الأنشطة الرئيسية"؟',
        ),
        options: [
          L('Answering booking messages every day', 'الرد على رسائل الحجز يومياً'),
          L('Small repair shops in the neighbourhood', 'محلات التصليح الصغيرة في الحي'),
          L('Fewer missed appointments', 'مواعيد فائتة أقل'),
        ],
        correct: 0,
        feedback: L(
          'Key activities are the regular tasks that keep the business running. The other two are customers and value.',
          'الأنشطة الرئيسية هي المهام المتكررة التي تُبقي المشروع قائماً. الخياران الآخران يتعلقان بالعملاء والقيمة.',
        ),
      },
      hasVideo: true,
      transcript: L(
        'Welcome to Business Model and Money Basics. In this first lesson we draw a simple map of how a business works. Take one page and make four boxes. Customers, value, channels and key activities. Write short notes in each box. Who are your customers? What problem do you solve for them? How will they find you and receive your offer? What do you need to do every week? If a box feels empty, that is fine. It tells you what to find out next. All the amounts in this course are fictional examples.',
        '',
      ),
    },
    {
      id: 'C08-U2',
      title: L('Understand costs and pricing', 'افهم التكاليف والتسعير'),
      synopsis: L(
        'Separate setup costs, regular costs and a proposed price.',
        'ميّز بين تكاليف التأسيس والتكاليف الدورية والسعر المقترح.',
      ),
      objective: L(
        'Separate setup costs from regular costs and use both to think about a proposed price.',
        'تميّز بين تكاليف التأسيس والتكاليف الدورية وتستخدمها للتفكير في سعر مقترح.',
      ),
      body: L(
        'Costs come in two main types. Setup costs are paid once to get started, for example a second-hand phone, a small sign or basic tools. Regular costs repeat every week or month, such as internet, transport, materials or a small rent. List both types separately, because they affect your plans in different ways. Setup costs tell you how much you need before you begin. Regular costs tell you how much you must cover just to keep going. A proposed price should at least cover the regular cost of each sale and, over time, help you recover setup costs. Then check the price against what customers can realistically pay and what similar services charge locally. Write your price as a proposal to test, not a final decision. All amounts in this course are fictional.',
        '',
      ),
      scenario: L(
        'Rania plans a small home baking service. She lists a mixer and baking trays as setup costs, and flour, sugar, gas and delivery transport as regular costs. Using fictional amounts, she works out the cost of one box of pastries before she proposes a price to test with three neighbours.',
        'تخطط رانيا لخدمة خَبز منزلية صغيرة. تكتب الخلاط وصواني الخَبز كتكاليف تأسيس، والطحين والسكر والغاز ومواصلات التوصيل كتكاليف دورية. باستخدام مبالغ افتراضية، تحسب تكلفة علبة معجنات واحدة قبل أن تقترح سعراً تختبره مع ثلاث من جاراتها.',
      ),
      takeaway: L(
        'List setup and regular costs separately, then test a price that covers your costs and fits what customers can pay.',
        'اكتب تكاليف التأسيس والتكاليف الدورية بشكل منفصل، ثم اختبر سعراً يغطي تكاليفك ويناسب قدرة العملاء على الدفع.',
      ),
      check: {
        prompt: L(
          'Which of these is a regular cost for a home baking service?',
          'أي مما يلي تكلفة دورية لخدمة خَبز منزلية؟',
        ),
        options: [
          L('Flour bought every week', 'الطحين الذي يُشترى كل أسبوع'),
          L('A mixer bought once', 'خلاط يُشترى مرة واحدة'),
          L('Baking trays bought at the start', 'صواني خَبز تُشترى في البداية'),
        ],
        correct: 0,
        feedback: L(
          'Flour is bought again and again, so it is a regular cost. The mixer and trays are setup costs.',
          'الطحين يُشترى مرة بعد مرة، لذا فهو تكلفة دورية. أما الخلاط والصواني فهي تكاليف تأسيس.',
        ),
      },
    },
    {
      id: 'C08-U3',
      title: L('Plan simple cash flow', 'خطّط لتدفق نقدي بسيط'),
      synopsis: L(
        'Estimate when cash comes in and when costs are paid.',
        'قدّر متى يدخل المال ومتى تُدفع التكاليف.',
      ),
      objective: L(
        'Build a simple month-by-month plan showing when cash comes in and when costs are paid.',
        'تبني خطة بسيطة شهراً بشهر توضح متى يدخل المال ومتى تُدفع التكاليف.',
      ),
      body: L(
        'A business can look profitable on paper and still run out of cash. This happens when costs must be paid before customers pay you. A simple cash plan helps you see this early. Make a small table with one column for each of the next three months. In each month, write the cash you expect to come in and the cash you expect to go out. Be honest about timing. If a customer usually pays after two weeks, put that money in the month you will actually receive it. Subtract money out from money in to see the balance for each month, then carry it forward. A month with a negative balance is a warning sign. You may need to delay a purchase, ask for a deposit or start smaller. Use fictional amounts while you practise.',
        '',
      ),
      scenario: L(
        'Omar fills in a three-month sample cash plan with fictional amounts. In month one he pays for a phone line and printed cards, but shops only pay him at the end of the month. His plan shows a small gap in month one, so he decides to start with two shops instead of five.',
        'يملأ عمر خطة نقدية نموذجية لثلاثة أشهر بمبالغ افتراضية. في الشهر الأول يدفع ثمن خط هاتف وبطاقات مطبوعة، لكن المحلات لا تدفع له إلا في نهاية الشهر. تُظهر خطته فجوة صغيرة في الشهر الأول، فيقرر أن يبدأ بمحلين بدلاً من خمسة.',
      ),
      takeaway: L(
        'Record money in and money out in the month it really happens, and watch for months with a negative balance.',
        'سجّل المال الداخل والخارج في الشهر الذي يحدث فيه فعلاً، وانتبه إلى الأشهر ذات الرصيد السالب.',
      ),
      check: {
        prompt: L(
          'A customer pays at the end of the month for work done in week one. In a cash plan, you record that money:',
          'عميل يدفع في نهاية الشهر مقابل عمل أُنجز في الأسبوع الأول. في الخطة النقدية تسجّل هذا المال:',
        ),
        options: [
          L('When you actually receive it', 'عندما تستلمه فعلاً'),
          L('When you start the work', 'عندما تبدأ العمل'),
          L('Only at the end of the year', 'في نهاية السنة فقط'),
        ],
        correct: 0,
        feedback: L(
          'A cash plan follows real timing. Record money in the month it reaches you.',
          'الخطة النقدية تتبع التوقيت الحقيقي. سجّل المال في الشهر الذي يصلك فيه.',
        ),
      },
      hasVideo: true,
      transcript: L(
        'In this lesson we plan cash flow. Cash flow simply means when money comes in and when money goes out. Draw a table with three months. For each month, write the money you expect to receive and the money you need to pay. Then find the balance. Here is the key idea. Write each amount in the month it really happens, not the month you hope for. Omar found that he paid his costs in month one but received payment later. Seeing that gap early helped him start smaller. Remember, these are fictional amounts for practice.',
        '',
      ),
    },
    {
      id: 'C08-U4',
      title: L('Check assumptions', 'تحقق من الافتراضات'),
      synopsis: L(
        'Compare an optimistic and cautious example before committing resources.',
        'قارن بين مثال متفائل وآخر حذر قبل الالتزام بالموارد.',
      ),
      objective: L(
        'Compare an optimistic and a cautious example to see risk before you commit time or money.',
        'تقارن بين مثال متفائل وآخر حذر لترى المخاطر قبل أن تلتزم بالوقت أو المال.',
      ),
      body: L(
        'Every plan rests on assumptions: how many customers you will have, what they will pay and how quickly they will pay. These are guesses until you test them. A good habit is to make two versions of your cash plan. The optimistic example uses the numbers you hope for. The cautious example assumes fewer customers, lower sales and slower payments. Put them side by side. If the cautious example still works, your plan is more robust. If it shows a large gap, think about what you can change before committing resources. You might start part time, borrow equipment instead of buying it, or test with a small group first. Write down your three biggest assumptions and one simple way to check each, such as asking five potential customers. Planning carefully is not the same as expecting to fail.',
        '',
      ),
      scenario: L(
        'Rania compares two fictional examples. Her optimistic plan has twenty orders a month, while her cautious plan has eight. The cautious plan only works if she does not buy a new oven, so she decides to use her family oven for the first three months and review again.',
        'تقارن رانيا بين مثالين افتراضيين. خطتها المتفائلة فيها عشرون طلباً في الشهر، بينما خطتها الحذرة فيها ثمانية. لا تنجح الخطة الحذرة إلا إذا لم تشترِ فرناً جديداً، فتقرر استخدام فرن العائلة في الأشهر الثلاثة الأولى ثم تراجع الخطة.',
      ),
      takeaway: L(
        'If your cautious example does not work, change the plan before you commit resources.',
        'إذا لم ينجح مثالك الحذر، غيّر الخطة قبل أن تلتزم بالموارد.',
      ),
      check: {
        prompt: L(
          'Your cautious example shows a large cash gap. What is a sensible next step?',
          'يُظهر مثالك الحذر فجوة نقدية كبيرة. ما الخطوة التالية المعقولة؟',
        ),
        options: [
          L(
            'Adjust the plan, for example start smaller or delay a purchase',
            'أعدّل الخطة، مثلاً أبدأ بحجم أصغر أو أؤجل عملية شراء',
          ),
          L('Ignore it and follow the optimistic plan', 'أتجاهلها وأتبع الخطة المتفائلة'),
          L('Remove all costs from the plan', 'أحذف كل التكاليف من الخطة'),
        ],
        correct: 0,
        feedback: L(
          'The cautious example is there to show risk. Use it to change the plan before you spend.',
          'المثال الحذر موجود ليُظهر المخاطر. استخدمه لتعديل الخطة قبل أن تنفق.',
        ),
      },
    },
  ],
  practicalTask: L(
    'Complete a one-page business model and a three-month sample cash plan using fictional amounts.',
    'أكمل نموذج عمل من صفحة واحدة وخطة نقدية نموذجية لثلاثة أشهر بمبالغ افتراضية.',
  ),
  output: L(
    'One-page business model and sample cash plan.',
    'نموذج عمل من صفحة واحدة وخطة نقدية نموذجية.',
  ),
  quiz: [
    {
      prompt: L(
        'Which is a setup cost rather than a regular cost?',
        'أي مما يلي تكلفة تأسيس وليس تكلفة دورية؟',
      ),
      options: [
        L('Buying a phone for bookings once', 'شراء هاتف للحجوزات مرة واحدة'),
        L('Monthly internet bill', 'فاتورة الإنترنت الشهرية'),
        L('Weekly transport', 'المواصلات الأسبوعية'),
      ],
      correct: 0,
      feedback: L(
        'Setup costs are paid once to start. Regular costs repeat every week or month.',
        'تكاليف التأسيس تُدفع مرة واحدة للبدء، والتكاليف الدورية تتكرر أسبوعياً أو شهرياً.',
      ),
      unitIndex: 1,
    },
    {
      prompt: L('In a business model, "channels" means:', 'في نموذج العمل، "القنوات" تعني:'),
      options: [
        L('How you reach and deliver to customers', 'كيف تصل إلى العملاء وتقدّم لهم الخدمة'),
        L('Television stations', 'المحطات التلفزيونية'),
        L('Your bank account', 'حسابك المصرفي'),
      ],
      correct: 0,
      feedback: L(
        'Channels are the ways customers find, buy and receive your offer.',
        'القنوات هي الطرق التي يجد بها العملاء عرضك ويشترونه ويستلمونه.',
      ),
      unitIndex: 0,
    },
    {
      prompt: L(
        'Why plan cash flow and not only total profit?',
        'لماذا نخطط للتدفق النقدي وليس للربح الإجمالي فقط؟',
      ),
      options: [
        L(
          'Costs may need paying before customers pay you',
          'قد تحتاج إلى دفع التكاليف قبل أن يدفع العملاء',
        ),
        L('Cash flow is only for large companies', 'التدفق النقدي للشركات الكبيرة فقط'),
        L('Profit is never important', 'الربح غير مهم أبداً'),
      ],
      correct: 0,
      feedback: L(
        'Timing matters. A plan shows months when cash may run short.',
        'التوقيت مهم. تُظهر الخطة الأشهر التي قد ينقص فيها المال.',
      ),
      unitIndex: 2,
    },
    {
      prompt: L('A cautious example assumes:', 'المثال الحذر يفترض:'),
      options: [
        L('Fewer customers and slower payments than hoped', 'عملاء أقل ودفعات أبطأ مما نأمل'),
        L('Every customer pays early', 'أن كل العملاء يدفعون مبكراً'),
        L('No costs at all', 'عدم وجود أي تكاليف'),
      ],
      correct: 0,
      feedback: L(
        'Comparing a cautious example helps you see risk before committing resources.',
        'المقارنة بمثال حذر تساعدك على رؤية المخاطر قبل الالتزام بالموارد.',
      ),
      unitIndex: 3,
    },
    {
      prompt: L(
        'When setting a proposed price, you should consider:',
        'عند وضع سعر مقترح، يجب أن تراعي:',
      ),
      options: [
        L(
          'Your costs and what customers can realistically pay',
          'تكاليفك وما يستطيع العملاء دفعه فعلياً',
        ),
        L('Only what a friend suggests', 'ما يقترحه صديق فقط'),
        L('The highest price you can imagine', 'أعلى سعر يمكن تخيله'),
      ],
      correct: 0,
      feedback: L(
        'A workable price covers costs and fits what customers are willing to pay.',
        'السعر المناسب يغطي التكاليف ويناسب ما يرغب العملاء في دفعه.',
      ),
      unitIndex: 1,
    },
  ],
  resources: ['cashPlan'],
  prerequisites: ['C07'],
  image: 'images/generated/course-C08.webp',
  note: L(
    'Fictional amounts only; no financing promise or registration advice.',
    'المبالغ افتراضية فقط، ولا يتضمن المحتوى وعداً بتمويل أو نصيحة بشأن تسجيل الأعمال.',
  ),
}
