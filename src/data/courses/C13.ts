import type { Course } from '@shared/types'
import { L } from '../l'

// Brief §10. Illustrative technical taster for employment. Every unit has a full lesson.
export const C13: Course = {
  id: 'C13',
  title: L('Customer Service and Office Support', 'خدمة العملاء والدعم المكتبي'),
  category: 'technical',
  routes: ['employment'],
  minutes: 40,
  level: 'beginner',
  delivery: 'self-paced',
  outcomes: [
    L(
      'Identify a customer request and who handles it next',
      'تحدد طلب العميل والشخص المسؤول عن متابعته',
    ),
    L('Record enquiries accurately in a simple log', 'تسجّل الاستفسارات بدقة في سجل بسيط'),
    L('Know when to solve an issue or escalate it', 'تعرف متى تحل المشكلة ومتى تحيلها'),
  ],
  units: [
    {
      id: 'C13-U1',
      title: L('Understand the service journey', 'افهم رحلة الخدمة'),
      synopsis: L(
        'Identify the customer request and next responsible person.',
        'حدد طلب العميل والشخص المسؤول التالي.',
      ),
      objective: L(
        'Identify what a customer needs and who is responsible for the next step.',
        'تحدد ما يحتاجه العميل ومن المسؤول عن الخطوة التالية.',
      ),
      body: L(
        'Every customer contact is part of a service journey. It starts when a person arrives with a need and ends when that need is met or passed to the right place. Your first job is to understand the request. Listen to the whole question before you answer. Then repeat it back in one sentence, for example: "So you would like to know when the next course starts?" Next, decide who handles it. Some requests you can answer yourself, such as opening hours. Others belong to a colleague, such as registration changes or payments. Keep a simple list of common requests and the person or desk responsible for each one. When you pass a request on, tell the customer who will contact them and when. Nobody should leave without knowing the next step.',
        '',
      ),
      scenario: L(
        'Omar works at the front desk of a sample youth centre. A visitor asks to change her course group. Omar repeats the request, checks his list, and explains that the registration officer handles group changes and will call her the same afternoon.',
        'يعمل عمر في مكتب الاستقبال في مركز شبابي نموذجي. تطلب زائرة تغيير مجموعة دورتها. يعيد عمر صياغة الطلب، ويراجع قائمته، ويوضح لها أن مسؤول التسجيل يتولى تغيير المجموعات وسيتصل بها بعد ظهر اليوم نفسه.',
      ),
      takeaway: L(
        'Confirm the request in one sentence, then make sure the customer knows who acts next and when.',
        'أكّد الطلب في جملة واحدة، ثم تأكد أن العميل يعرف من سيتابع ومتى.',
      ),
      check: {
        prompt: L(
          'A visitor asks about a payment you do not handle. What is the best first step?',
          'يسأل زائر عن دفعة لا تتولاها أنت. ما أفضل خطوة أولى؟',
        ),
        options: [
          L(
            'Confirm the request and tell them who will follow up',
            'أؤكد الطلب وأخبره بمن سيتابعه',
          ),
          L('Give your best guess', 'أعطي أفضل تخمين لدي'),
          L('Ask them to come back another day', 'أطلب منه العودة في يوم آخر'),
        ],
        correct: 0,
        feedback: L(
          'Understanding the request and naming the next responsible person keeps the journey moving.',
          'فهم الطلب وتحديد المسؤول التالي يُبقي رحلة الخدمة مستمرة.',
        ),
      },
      hasVideo: true,
      transcript: L(
        'Welcome to Customer Service and Office Support. In this first lesson we follow a service journey. A customer arrives with a need. Your job is to listen to the whole request, then repeat it back so you both agree. Next, ask yourself one question: who handles this? Sometimes it is you. Sometimes it is a colleague or another desk. Either way, the customer should leave knowing what happens next, who will act and when. In the next lessons you will practise asking good questions and keeping simple records.',
        '',
      ),
    },
    {
      id: 'C13-U2',
      title: L('Handle enquiries', 'تعامل مع الاستفسارات'),
      synopsis: L(
        'Ask questions and record accurate information.',
        'اطرح الأسئلة وسجّل المعلومات بدقة.',
      ),
      objective: L(
        'Ask clear questions and record the key details of an enquiry accurately.',
        'تطرح أسئلة واضحة وتسجّل التفاصيل الأساسية للاستفسار بدقة.',
      ),
      body: L(
        'An enquiry is any question or request from a customer, in person, by phone or by message. Good enquiries start with good questions. Use open questions to understand the need, such as "What would you like help with today?" Then use closed questions to confirm details, such as "Is this the best number to reach you?" Record the information while it is fresh. A useful record has the date, the customer\'s name, a contact detail, the request in one clear sentence, the action taken and who will follow up. Write what the customer said, not your opinion of them. Spell names carefully and read the phone number back. Keep personal details private and only record what you need. An accurate record means anyone on the team can continue the conversation without asking the customer to repeat everything.',
        '',
      ),
      scenario: L(
        'Hala answers a call from a parent asking about evening classes. She asks which course interests him, confirms his phone number by reading it back, and writes the request in one clear sentence in the enquiry log.',
        'تجيب هالة على اتصال من أحد الآباء يسأل عن الدروس المسائية. تسأله عن الدورة التي تهمه، وتتأكد من رقم هاتفه بقراءته عليه، وتكتب الطلب في جملة واحدة واضحة في سجل الاستفسارات.',
      ),
      takeaway: L(
        'Ask, confirm and record: a clear note means nobody has to ask the customer twice.',
        'اسأل وتأكد وسجّل: الملاحظة الواضحة تعني ألا يضطر أحد إلى سؤال العميل مرتين.',
      ),
      check: {
        prompt: L(
          'Why should you read a phone number back to the customer?',
          'لماذا يجب أن تقرأ رقم الهاتف على العميل؟',
        ),
        options: [
          L('To make sure it is recorded correctly', 'للتأكد من تسجيله بشكل صحيح'),
          L('To fill time in the call', 'لملء الوقت في المكالمة'),
          L('Because the customer expects small talk', 'لأن العميل ينتظر حديثاً جانبياً'),
        ],
        correct: 0,
        feedback: L(
          'Reading details back catches mistakes before they cause a missed follow-up.',
          'قراءة التفاصيل على العميل تكشف الأخطاء قبل أن تتسبب في ضياع المتابعة.',
        ),
      },
    },
    {
      id: 'C13-U3',
      title: L('Use simple office records', 'استخدم سجلات مكتبية بسيطة'),
      synopsis: L(
        'Maintain an enquiry or attendance spreadsheet.',
        'حافظ على جدول بيانات للاستفسارات أو الحضور.',
      ),
      objective: L(
        'Keep an enquiry or attendance spreadsheet that is consistent and easy to check.',
        'تحافظ على جدول استفسارات أو حضور متسق وسهل المراجعة.',
      ),
      body: L(
        'Many offices keep simple records in a spreadsheet: who called, who attended, what is still open. A good record is boring in the best way. Every row is one enquiry or one person. Every column holds one kind of information, such as date, name, contact, request, status and owner. Use the same date format every time and choose from a short list for status, for example open, in progress or closed. Do not merge cells or write notes in random places, because this breaks sorting. Update the sheet at the end of each task, not at the end of the week. Once a day, filter for open items and check nothing has been forgotten. Save the file in the agreed shared folder with a clear name, and never share personal details outside the team.',
        '',
      ),
      scenario: L(
        'Sami keeps the attendance sheet for a sample training week. He uses one row per participant, writes every date the same way and marks status as present, absent or excused. On Thursday he filters for absences and shares the list with the trainer.',
        'يتولى سامي جدول الحضور لأسبوع تدريبي نموذجي. يخصص صفاً لكل مشارك، ويكتب كل التواريخ بالصيغة نفسها، ويحدد الحالة بحاضر أو غائب أو معذور. يوم الخميس يصفّي الغيابات ويشارك القائمة مع المدرب.',
      ),
      takeaway: L(
        'One row per record, one type of data per column and the same format every time.',
        'صف واحد لكل سجل، ونوع واحد من البيانات لكل عمود، والصيغة نفسها في كل مرة.',
      ),
      check: {
        prompt: L(
          'Which status column is easiest to filter?',
          'أي عمود حالة هو الأسهل في التصفية؟',
        ),
        options: [
          L(
            'One that uses only open, in progress or closed',
            'عمود يستخدم فقط: مفتوح، قيد المتابعة، مغلق',
          ),
          L('One where everyone writes in their own words', 'عمود يكتب فيه كل شخص بكلماته الخاصة'),
          L('One with merged cells and notes', 'عمود فيه خلايا مدمجة وملاحظات'),
        ],
        correct: 0,
        feedback: L(
          'A short fixed list of values keeps the sheet consistent and easy to sort and filter.',
          'القائمة القصيرة الثابتة من القيم تُبقي الجدول متسقاً وسهل الترتيب والتصفية.',
        ),
      },
      hasVideo: true,
      transcript: L(
        'In this lesson we look at simple office records. Imagine an enquiry sheet. Each row is one enquiry. Each column holds one kind of information: the date, the name, the contact, the request, the status and the person responsible. Now look at the status column. If it only says open, in progress or closed, you can filter it in seconds and see what still needs action. If everyone writes in their own words, nobody can be sure. Keep it consistent, update it as you go, and check open items every day.',
        '',
      ),
    },
    {
      id: 'C13-U4',
      title: L('Resolve and escalate', 'عالج المشكلة أو أحِلها'),
      synopsis: L(
        'Know when to solve the issue or involve a supervisor.',
        'اعرف متى تحل المشكلة بنفسك ومتى تُشرك المشرف.',
      ),
      objective: L(
        'Decide when to solve an issue yourself and when to involve a supervisor.',
        'تقرر متى تحل المشكلة بنفسك ومتى تُشرك المشرف.',
      ),
      body: L(
        'Not every problem should go to a manager, and not every problem should stay with you. Start by listening calmly and apologising for the inconvenience, even if it is not your fault. Then ask: can I fix this within my role and the rules? If the answer is yes, solve it, tell the customer what you did and record it. Escalate when the issue is outside your authority, involves money or personal safety, breaks a rule, or keeps happening. When you escalate, give your supervisor a short summary: what happened, what the customer wants and what you already tried. Then tell the customer who is now handling it and when they can expect an update. Escalating is not a failure. It makes sure the right person makes the decision.',
        '',
      ),
      scenario: L(
        'Fadi receives a complaint that a certificate shows the wrong name. He cannot change records himself. He apologises, notes the correct spelling and sends his supervisor a three-line summary. He tells the customer to expect an update within two working days.',
        'يتلقى فادي شكوى بأن اسماً كُتب خطأً في إحدى الشهادات. لا يملك صلاحية تعديل السجلات بنفسه. يعتذر، ويسجّل الاسم الصحيح، ويرسل إلى مشرفه ملخصاً من ثلاثة أسطر، ويخبر العميل بأنه سيتلقى رداً خلال يومي عمل.',
      ),
      takeaway: L(
        'Solve what is within your role, escalate the rest with a short clear summary, and always tell the customer the next step.',
        'حلّ ما يقع ضمن دورك، وأحِل الباقي بملخص قصير وواضح، وأخبر العميل دائماً بالخطوة التالية.',
      ),
      check: {
        prompt: L(
          'What should a good escalation message include?',
          'ماذا يجب أن تتضمن رسالة الإحالة الجيدة؟',
        ),
        options: [
          L(
            'What happened, what the customer wants and what you tried',
            'ما حدث وما يريده العميل وما جرّبته',
          ),
          L("Only the customer's name", 'اسم العميل فقط'),
          L('Your opinion of the customer', 'رأيك في العميل'),
        ],
        correct: 0,
        feedback: L(
          'A short, factual summary lets your supervisor act quickly without repeating questions.',
          'الملخص القصير القائم على الحقائق يتيح للمشرف التصرف بسرعة دون تكرار الأسئلة.',
        ),
      },
    },
  ],
  practicalTask: L(
    'Fill in a sample enquiry log with three fictional enquiries and write a reply to one customer.',
    'املأ سجل استفسارات نموذجياً بثلاثة استفسارات افتراضية واكتب رداً على أحد العملاء.',
  ),
  output: L('A sample enquiry log and customer response.', 'سجل استفسارات نموذجي ورد على عميل.'),
  quiz: [
    {
      prompt: L(
        'A customer asks about a delivery you do not manage. What do you do?',
        'يسأل عميل عن توصيل لا تتولاه أنت. ماذا تفعل؟',
      ),
      options: [
        L(
          'Note the request and pass it to the responsible person',
          'أسجّل الطلب وأحيله إلى الشخص المسؤول',
        ),
        L('Guess an answer', 'أخمّن إجابة'),
        L('Tell them to call back later with no details', 'أطلب منه الاتصال لاحقاً دون تفاصيل'),
      ],
      correct: 0,
      feedback: L(
        'Knowing who is responsible next keeps the service journey moving.',
        'معرفة المسؤول التالي تُبقي رحلة الخدمة مستمرة.',
      ),
      unitIndex: 0,
    },
    {
      prompt: L(
        'Which detail is most important to record for an enquiry?',
        'ما أهم تفصيل يجب تسجيله في الاستفسار؟',
      ),
      options: [
        L('Contact details and what the customer needs', 'بيانات التواصل وما يحتاجه العميل'),
        L('What the customer was wearing', 'ما كان يرتديه العميل'),
        L('Your opinion of the customer', 'رأيك في العميل'),
      ],
      correct: 0,
      feedback: L(
        'Accurate contact details and the request let anyone follow up.',
        'بيانات التواصل الدقيقة والطلب الواضح تتيح لأي شخص المتابعة.',
      ),
      unitIndex: 1,
    },
    {
      prompt: L(
        'In an attendance spreadsheet, why use the same format for every date?',
        'في جدول الحضور، لماذا نستخدم الصيغة نفسها لكل تاريخ؟',
      ),
      options: [
        L('So records can be sorted and checked easily', 'ليسهل ترتيب السجلات والتحقق منها'),
        L('It looks nicer only', 'لأنه أجمل شكلاً فقط'),
        L('It is not important', 'هذا غير مهم'),
      ],
      correct: 0,
      feedback: L(
        'Consistent entries make records reliable and easy to search.',
        'الإدخالات المتسقة تجعل السجلات موثوقة وسهلة البحث.',
      ),
      unitIndex: 2,
    },
    {
      prompt: L('When should you involve a supervisor?', 'متى يجب أن تُشرك المشرف؟'),
      options: [
        L(
          'When the issue is outside your authority or keeps repeating',
          'عندما تكون المشكلة خارج صلاحياتك أو تتكرر',
        ),
        L('For every small question', 'في كل سؤال صغير'),
        L('Never', 'أبداً'),
      ],
      correct: 0,
      feedback: L(
        'Escalate when you cannot solve it yourself or the rules require it.',
        'أحِل المشكلة عندما لا تستطيع حلها بنفسك أو عندما تتطلب القواعد ذلك.',
      ),
      unitIndex: 3,
    },
    {
      prompt: L('Which reply is most professional?', 'أي رد هو الأكثر مهنية؟'),
      options: [
        L(
          'Thank you for your message. I have noted your request and will update you by tomorrow.',
          'شكراً لرسالتك. سجّلت طلبك وسأوافيك بالمستجدات غداً.',
        ),
        L('Not my problem.', 'هذه ليست مشكلتي.'),
        L('ok', 'حسناً'),
      ],
      correct: 0,
      feedback: L(
        'It is polite, confirms the request and gives a clear next step.',
        'الرد مهذب ويؤكد الطلب ويحدد خطوة تالية واضحة.',
      ),
      unitIndex: 3,
    },
  ],
  resources: [],
  prerequisites: ['C03'],
  image: 'images/generated/course-C13.webp',
  note: L(
    'Introductory skills demonstration, not a professional qualification. Technical tasters are illustrative and do not establish occupational qualifications.',
    'عرض تمهيدي للمهارات وليس مؤهلاً مهنياً. الدورات التقنية التعريفية توضيحية ولا تمنح مؤهلات مهنية.',
  ),
}
