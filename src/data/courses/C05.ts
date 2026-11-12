import type { Course } from '@shared/types'
import { L } from '../l'

// Brief §8. Employment showcase course: every unit has a full lesson.
export const C05: Course = {
  id: 'C05',
  title: L('Job Search and CV Essentials', 'أساسيات البحث عن عمل والسيرة الذاتية'),
  category: 'employment',
  routes: ['employment'],
  minutes: 45,
  level: 'beginner',
  delivery: 'self-paced',
  showcase: true,
  outcomes: [
    L(
      'Separate required skills, desirable skills and instructions in a job advert',
      'تميّز في إعلان الوظيفة بين المهارات المطلوبة والمفضّلة وتعليمات التقديم',
    ),
    L(
      'Build a clear CV with honest, specific evidence',
      'تبني سيرة ذاتية واضحة بأدلة صادقة ومحددة',
    ),
    L(
      'Tailor your CV to a role and submit a complete application',
      'تكيّف سيرتك مع الدور وتقدّم طلباً مكتملاً',
    ),
  ],
  units: [
    {
      id: 'C05-U1',
      title: L('Read a job advert', 'اقرأ إعلان الوظيفة'),
      synopsis: L(
        'Separate required skills, desirable skills and application instructions.',
        'ميّز بين المهارات المطلوبة والمهارات المفضّلة وتعليمات التقديم.',
      ),
      objective: L(
        'Identify what an employer must have, would like to have and how they want you to apply.',
        'تحدد ما يشترطه صاحب العمل وما يفضّله وكيف يريدك أن تتقدّم.',
      ),
      body: L(
        'A job advert is a short message from an employer about what they need. Read it slowly, at least twice. First, find the required skills. These are often listed under words like "must have" or "essential". If you do not meet most of them, the role may not be the right fit yet. Next, find the desirable skills, sometimes written as "an advantage" or "preferred". You do not need all of these to apply. Finally, look for the application instructions: the deadline, which documents to send and how to send them. Many applications are rejected only because instructions were not followed. A simple habit helps: copy the advert into a document and mark each line as required, desirable or instruction. This gives you a checklist for your CV and your application.',
        '',
      ),
      scenario: L(
        'Nour finds a sample advert for a customer service assistant at a training centre. She marks "good communication" and "basic computer skills" as required, "Arabic and English" as desirable, and notes that the CV must be sent before the deadline with a short motivation answer.',
        'تجد نور إعلاناً نموذجياً لوظيفة مساعدة خدمة عملاء في مركز تدريب. تضع علامة على "مهارات تواصل جيدة" و"مهارات حاسوب أساسية" كمتطلبات، و"العربية والإنجليزية" كمهارة مفضّلة، وتلاحظ أن السيرة الذاتية يجب أن تُرسل قبل الموعد النهائي مع إجابة قصيرة عن دافعها.',
      ),
      takeaway: L(
        'Sort every line of an advert into required, desirable or instruction before you start writing.',
        'صنّف كل سطر في الإعلان إلى مطلوب أو مفضّل أو تعليمات قبل أن تبدأ الكتابة.',
      ),
      check: {
        prompt: L(
          'An advert says "experience with spreadsheets is an advantage". This is:',
          'يقول الإعلان "الخبرة في جداول البيانات ميزة إضافية". هذه:',
        ),
        options: [
          L('A desirable skill', 'مهارة مفضّلة'),
          L('A required skill', 'مهارة مطلوبة'),
          L('An application instruction', 'تعليمات تقديم'),
        ],
        correct: 0,
        feedback: L(
          '"An advantage" means it would help, but you can still apply without it.',
          'عبارة "ميزة إضافية" تعني أنها مفيدة، لكن يمكنك التقديم من دونها.',
        ),
      },
      hasVideo: true,
      transcript: L(
        'Welcome to Job Search and CV Essentials. In this first lesson we look at a job advert together. Every advert has three parts. Required skills are what the employer needs from day one. Desirable skills would help, but they are not essential. Instructions tell you how, where and when to apply. Take a pen, or open a document, and sort each line into one of these three groups. When you finish, you have a checklist. You will use it to build and tailor your CV in the next lessons.',
        '',
      ),
    },
    {
      id: 'C05-U2',
      title: L('Build your CV', 'ابنِ سيرتك الذاتية'),
      synopsis: L(
        'Organise education, experience, practical projects and contact details.',
        'نظّم التعليم والخبرة والمشاريع العملية وبيانات التواصل.',
      ),
      objective: L(
        'Organise the main sections of a one-page CV in a clear order.',
        'ترتّب الأقسام الرئيسية لسيرة ذاتية من صفحة واحدة بترتيب واضح.',
      ),
      body: L(
        'A CV is a short summary of what you can offer. For most entry-level roles, one page is enough. Start with your name, phone number, email and city. You do not need a photo, your full address or your ID number. Then add a two-line summary that says what kind of role you want and one or two strengths. Next comes education, with the most recent first. After that, list experience. Experience is not only paid jobs. Volunteering, helping in a family shop, supporting a community event or a training project all count if you describe them honestly. Add a short section for practical projects and course outputs. Finish with skills and languages. Use the same font, clear headings and simple bullet points so a busy reader can scan it quickly.',
        '',
      ),
      scenario: L(
        'Nour has never had a formal job. She lists her secondary school certificate, her volunteering at a training event and her completed course outputs. She adds her phone, email and city, and leaves out her ID number and home address.',
        'لم تعمل نور في وظيفة رسمية من قبل. تكتب شهادتها الثانوية وتطوعها في فعالية تدريبية ومخرجات الدورات التي أكملتها. تضيف هاتفها وبريدها ومدينتها، وتحذف رقم هويتها وعنوان منزلها.',
      ),
      takeaway: L(
        'Volunteering and practical projects are real experience when you describe them honestly.',
        'التطوع والمشاريع العملية خبرة حقيقية عندما تصفها بصدق.',
      ),
      check: {
        prompt: L(
          'Which detail should you leave out of your CV?',
          'أي معلومة يجب حذفها من سيرتك الذاتية؟',
        ),
        options: [
          L('Your ID number', 'رقم هويتك'),
          L('Your email address', 'بريدك الإلكتروني'),
          L('Your education', 'تعليمك'),
        ],
        correct: 0,
        feedback: L(
          'Keep sensitive details like ID numbers private. Contact details and education are enough.',
          'احتفظ بالمعلومات الحساسة مثل رقم الهوية لنفسك. بيانات التواصل والتعليم كافية.',
        ),
      },
    },
    {
      id: 'C05-U3',
      title: L('Show evidence of skills', 'أظهر الدليل على مهاراتك'),
      synopsis: L(
        'Rewrite vague claims into specific examples without inventing experience.',
        'أعد صياغة العبارات العامة إلى أمثلة محددة دون اختلاق خبرة.',
      ),
      objective: L(
        'Turn a vague CV line into a specific, honest description of what you did.',
        'تحوّل سطراً عاماً في سيرتك إلى وصف محدد وصادق لما فعلته.',
      ),
      body: L(
        'Employers read many CVs that say "hard-working" or "good with people". These words are easy to write and hard to believe. Evidence is stronger. To find it, take one vague line and ask three questions. What exactly did I do? Who was it for? What was the result or purpose? Then rewrite the line starting with an action verb, such as registered, organised, answered or prepared. Keep it true. Do not add numbers you did not count, titles you did not hold or results you cannot explain in an interview. If you are unsure about a detail, leave it out or describe it in general words. A shorter honest line is always better than an impressive line you cannot support. Your trainer or the CV coach can help you check each rewrite.',
        '',
      ),
      scenario: L(
        'Nour wrote "helped at events". She asks herself what she actually did. She rewrites it as "Registered participants and coordinated the attendance list for a training event". She does not add how many people attended, because she did not count them.',
        'كتبت نور "ساعدت في الفعاليات". تسأل نفسها عمّا فعلته بالضبط، ثم تعيد صياغتها إلى "سجّلت المشاركين ونسّقت قائمة الحضور لفعالية تدريبية". لا تضيف عدد الحضور لأنها لم تعدّهم.',
      ),
      takeaway: L(
        'Start with an action verb, say what you did and for whom, and never invent numbers.',
        'ابدأ بفعل، واذكر ما فعلته ولمن، ولا تختلق الأرقام أبداً.',
      ),
      check: {
        prompt: L(
          'Which rewrite of "helped at events" is best?',
          'أي إعادة صياغة لعبارة "ساعدت في الفعاليات" هي الأفضل؟',
        ),
        options: [
          L(
            'Registered participants and coordinated the attendance list for a training event',
            'سجّلت المشاركين ونسّقت قائمة الحضور لفعالية تدريبية',
          ),
          L('Managed events for over 500 people', 'أدرت فعاليات لأكثر من 500 شخص'),
          L('Very helpful at events', 'متعاونة جداً في الفعاليات'),
        ],
        correct: 0,
        feedback: L(
          'It is specific and true. The second option invents a number, and the third is still vague.',
          'إنها محددة وصادقة. الخيار الثاني يختلق رقماً، والثالث ما زال عاماً.',
        ),
      },
      hasVideo: true,
      transcript: L(
        'In this lesson we turn vague claims into evidence. Look at the line "helped at events". It tells the employer very little. Ask yourself what you actually did. For Nour, the answer was registering participants and keeping the attendance list. So her new line reads: Registered participants and coordinated the attendance list for a training event. Notice what she did not do. She did not add a number she never counted. Honest, specific lines are easier to explain in an interview and easier for employers to trust.',
        '',
      ),
    },
    {
      id: 'C05-U4',
      title: L('Tailor and apply', 'كيّف سيرتك وقدّم طلبك'),
      synopsis: L(
        'Adapt a CV to a role and submit a complete application.',
        'كيّف سيرتك الذاتية مع الدور وقدّم طلباً مكتملاً.',
      ),
      objective: L(
        'Adapt your CV to one vacancy and check the application is complete before you submit.',
        'تكيّف سيرتك مع وظيفة محددة وتتحقق من اكتمال الطلب قبل إرساله.',
      ),
      body: L(
        'Sending the same CV to every employer is quick, but it rarely works well. Tailoring means making small changes so the reader can quickly see you fit the role. Go back to the checklist you made from the advert. Move your most relevant experience higher. Use some of the same words the advert uses, as long as they are true for you. Adjust your summary so it names the type of role. Then check the instructions again. Did you include every requested document? Is the file named clearly, for example with your name and the role? Did you answer the motivation question in your own words? Read everything once more for spelling. Finally, save a copy of what you sent and note the date, so you can follow up and prepare for an interview.',
        '',
      ),
      scenario: L(
        'Nour links her CV to the sample customer service vacancy. She moves her event registration line to the top of her experience, adds "customer service" to her summary, names the file with her name and the role, and answers the motivation question before submitting.',
        'تربط نور سيرتها الذاتية بوظيفة خدمة العملاء النموذجية. تنقل سطر تسجيل المشاركين إلى أعلى قسم الخبرة، وتضيف "خدمة العملاء" إلى ملخصها، وتسمّي الملف باسمها واسم الدور، وتجيب عن سؤال الدافع قبل الإرسال.',
      ),
      takeaway: L(
        'Tailor the top of your CV to the role and check every instruction before you submit.',
        'كيّف الجزء العلوي من سيرتك مع الدور وتحقق من كل التعليمات قبل الإرسال.',
      ),
      check: {
        prompt: L('What does tailoring a CV mean?', 'ماذا يعني تكييف السيرة الذاتية؟'),
        options: [
          L(
            'Making true changes so your fit for the role is easy to see',
            'إجراء تعديلات صادقة ليظهر بوضوح أنك مناسب للدور',
          ),
          L('Adding skills you do not have', 'إضافة مهارات لا تملكها'),
          L('Sending the same CV everywhere', 'إرسال السيرة نفسها إلى كل مكان'),
        ],
        correct: 0,
        feedback: L(
          'Tailoring highlights real, relevant experience. It never means adding things that are not true.',
          'التكييف يُبرز خبرة حقيقية ومناسبة، ولا يعني أبداً إضافة ما ليس صحيحاً.',
        ),
      },
    },
  ],
  practicalTask: L(
    'Build and save a one-page CV in your toolkit and link it to the sample customer service vacancy.',
    'أنشئ سيرة ذاتية من صفحة واحدة واحفظها في أدواتك، ثم اربطها بوظيفة خدمة العملاء النموذجية.',
  ),
  output: L('A saved CV linked to a sample vacancy.', 'سيرة ذاتية محفوظة ومرتبطة بوظيفة نموذجية.'),
  quiz: [
    {
      prompt: L(
        'In a job advert, "must have good communication skills" is:',
        'في إعلان الوظيفة، عبارة "يجب أن يمتلك مهارات تواصل جيدة" هي:',
      ),
      options: [
        L('A required skill', 'مهارة مطلوبة'),
        L('A desirable skill', 'مهارة مفضّلة'),
        L('An application instruction', 'تعليمات تقديم'),
        L('Not important', 'غير مهمة'),
      ],
      correct: 0,
      feedback: L(
        '"Must have" signals a requirement. Show evidence of it clearly in your CV.',
        'عبارة "يجب أن" تدل على شرط. أظهر الدليل عليه بوضوح في سيرتك.',
      ),
      unitIndex: 0,
    },
    {
      prompt: L('Which counts as experience on a CV?', 'أي مما يلي يُعد خبرة في السيرة الذاتية؟'),
      options: [
        L(
          'Volunteering at a community event, described honestly',
          'التطوع في فعالية مجتمعية، موصوفاً بصدق',
        ),
        L('Only paid jobs', 'الوظائف المدفوعة فقط'),
        L('Jobs your friends have done', 'وظائف قام بها أصدقاؤك'),
      ],
      correct: 0,
      feedback: L(
        'Volunteering, family work and projects all count when described honestly.',
        'التطوع والعمل العائلي والمشاريع كلها تُحسب عندما توصف بصدق.',
      ),
      unitIndex: 1,
    },
    {
      prompt: L(
        'A specific, honest example is stronger than a vague claim like "hard-working".',
        'المثال المحدد والصادق أقوى من عبارة عامة مثل "مجتهد".',
      ),
      options: [L('True', 'صحيح'), L('False', 'خطأ')],
      correct: 0,
      feedback: L(
        'True. Specific examples give employers evidence they can trust.',
        'صحيح. الأمثلة المحددة تقدّم لأصحاب العمل دليلاً يمكنهم الوثوق به.',
      ),
      unitIndex: 2,
    },
    {
      prompt: L(
        'You are not sure how many people attended an event you supported. What should you write?',
        'لست متأكداً من عدد من حضروا فعالية ساعدت فيها. ماذا تكتب؟',
      ),
      options: [
        L('Describe what you did without a number', 'أصف ما فعلته دون ذكر رقم'),
        L('Guess a large number', 'أخمّن رقماً كبيراً'),
        L('Leave the whole experience out', 'أحذف التجربة كلها'),
      ],
      correct: 0,
      feedback: L(
        'Never invent numbers. A clear description of your actions is enough.',
        'لا تختلق الأرقام أبداً. الوصف الواضح لما فعلته كافٍ.',
      ),
      unitIndex: 2,
    },
    {
      prompt: L('Before submitting an application, you should:', 'قبل إرسال الطلب، يجب أن:'),
      options: [
        L(
          'Check every instruction and requested document',
          'أتحقق من كل التعليمات والوثائق المطلوبة',
        ),
        L('Send it as fast as possible without reading', 'أرسله بأسرع ما يمكن دون قراءة'),
        L('Use the same CV for every role', 'أستخدم السيرة نفسها لكل الأدوار'),
      ],
      correct: 0,
      feedback: L(
        'Many applications fail only because an instruction was missed.',
        'كثير من الطلبات تُرفض فقط لأن تعليمات ما لم تُتّبع.',
      ),
      unitIndex: 3,
    },
  ],
  resources: ['cvOutline'],
  prerequisites: ['C01'],
  image: 'images/generated/course-C05.webp',
}
