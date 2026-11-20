import type { Course } from '@shared/types'
import { L } from '../l'

// Brief §7. Career foundations, all routes. Every unit has a full lesson.
export const C02: Course = {
  id: 'C02',
  title: L('Digital Essentials for Learning and Work', 'المهارات الرقمية الأساسية للتعلّم والعمل'),
  category: 'foundations',
  routes: 'all',
  minutes: 40,
  level: 'beginner',
  delivery: 'self-paced',
  outcomes: [
    L(
      'Organise files and join online learning with confidence',
      'تنظّم ملفاتك وتشارك في التعلّم عبر الإنترنت بثقة',
    ),
    L('Write a clear, professional email', 'تكتب بريداً إلكترونياً مهنياً وواضحاً'),
    L(
      'Protect personal information and check AI outputs',
      'تحمي معلوماتك الشخصية وتتحقق من مخرجات الذكاء الاصطناعي',
    ),
  ],
  units: [
    {
      id: 'C02-U1',
      title: L('Use digital tools confidently', 'استخدم الأدوات الرقمية بثقة'),
      synopsis: L(
        'Organise files, create documents and join online learning.',
        'نظّم الملفات وأنشئ المستندات وشارك في التعلّم عبر الإنترنت.',
      ),
      objective: L(
        'Organise your files with clear names and folders and join an online session with confidence.',
        'تنظّم ملفاتك بأسماء ومجلدات واضحة وتنضم إلى جلسة عبر الإنترنت بثقة.',
      ),
      body: L(
        'Digital tools save time when your work is easy to find. Start with folders. Create one main folder for your learning, then a folder for each course or topic inside it. Name every file clearly with the topic, your name and a date, for example "CV_Nour_2026-11". Avoid names like "new file" or "final final". When you create a document, save it straight away and keep saving as you work. Before an online class, test your connection, charge your device and open the link a few minutes early. Mute your microphone when you are not speaking and use the chat to ask questions. If the connection drops, rejoin calmly and tell the trainer which part you missed. These simple habits make online learning less stressful.',
        '',
      ),
      scenario: L(
        'Fadi keeps all his course files on his phone with names like "doc1" and "doc2". He creates a "Learning" folder with one subfolder per course and renames each file with the topic and date. Before his next online session, he charges his phone and joins five minutes early.',
        'يحفظ فادي كل ملفات دوراته على هاتفه بأسماء مثل "doc1" و"doc2". ينشئ مجلداً باسم "التعلّم" فيه مجلد فرعي لكل دورة، ويعيد تسمية كل ملف بالموضوع والتاريخ. وقبل جلسته التالية عبر الإنترنت يشحن هاتفه وينضم قبل الموعد بخمس دقائق.',
      ),
      takeaway: L(
        'Clear folders, clear file names and a quick check before class save you time and stress.',
        'المجلدات الواضحة وأسماء الملفات الواضحة وفحص سريع قبل الحصة توفر عليك الوقت والتوتر.',
      ),
      check: {
        prompt: L(
          'What should you do a few minutes before an online class?',
          'ماذا تفعل قبل الحصة عبر الإنترنت ببضع دقائق؟',
        ),
        options: [
          L('Test your connection and open the link', 'أختبر الاتصال وأفتح الرابط'),
          L('Start downloading large files', 'أبدأ بتنزيل ملفات كبيرة'),
          L('Wait until the class has started', 'أنتظر حتى تبدأ الحصة'),
        ],
        correct: 0,
        feedback: L(
          'A quick check before class helps you join on time and avoid problems.',
          'الفحص السريع قبل الحصة يساعدك على الانضمام في الوقت المحدد وتجنب المشكلات.',
        ),
      },
      hasVideo: true,
      transcript: L(
        'Welcome to Digital Essentials for Learning and Work. In this first lesson we make your digital space easier to use. First, folders. Create one main folder called Learning, and one folder inside it for each course. Second, file names. Use the topic, your name and the date, so you can find any file in seconds. Third, online classes. Charge your device, test your connection and join a few minutes early. Small habits like these make a big difference when you are busy with study and work.',
        '',
      ),
    },
    {
      id: 'C02-U2',
      title: L('Communicate online', 'تواصل عبر الإنترنت'),
      synopsis: L(
        'Write clear emails and use collaborative documents.',
        'اكتب رسائل بريد واضحة واستخدم المستندات التشاركية.',
      ),
      objective: L(
        'Write a short, clear email and work politely in a shared document.',
        'تكتب بريداً إلكترونياً قصيراً وواضحاً وتعمل بلباقة في مستند مشترك.',
      ),
      body: L(
        'Online messages are often the first impression you make. A clear email has four parts. The subject line says what the email is about, for example "Question about Unit 2 task". The greeting is polite and simple, such as "Dear Ms Hala" or "Hello Mr Karim". The body states your request in two or three short sentences. The closing thanks the reader and includes your full name. Read it once before sending to check spelling and tone. Shared documents need care too. Write in the section you were given, use comments to suggest changes to the work of others and do not delete someone else\'s text without asking. Add your name to comments so others know who wrote them. Respectful habits online build trust with trainers, teammates and employers.',
        '',
      ),
      scenario: L(
        'Salma needs to ask her trainer for an extra day to finish a task. She writes the subject "Request: extra day for Unit 3 task", explains the reason in two sentences, proposes a new date and thanks the trainer. In the group document, she adds a comment instead of changing a teammate\'s paragraph.',
        'تحتاج سلمى إلى أن تطلب من مدربتها يوماً إضافياً لإنهاء مهمة. تكتب الموضوع "طلب: يوم إضافي لمهمة الوحدة الثالثة"، وتشرح السبب في جملتين، وتقترح موعداً جديداً وتشكر المدربة. وفي المستند الجماعي تضيف تعليقاً بدلاً من تعديل فقرة زميلتها.',
      ),
      takeaway: L(
        'Use a specific subject, one clear request and a polite closing, and suggest changes in shared documents with comments.',
        'استخدم موضوعاً محدداً وطلباً واحداً واضحاً وختاماً مهذباً، واقترح التعديلات في المستندات المشتركة عبر التعليقات.',
      ),
      check: {
        prompt: L(
          'You disagree with a sentence a teammate wrote in a shared document. What should you do?',
          'لا توافق على جملة كتبها زميلك في مستند مشترك. ماذا تفعل؟',
        ),
        options: [
          L('Add a comment suggesting a change', 'أضيف تعليقاً أقترح فيه تعديلاً'),
          L('Delete it without telling them', 'أحذفها دون إخباره'),
          L('Rewrite the whole section yourself', 'أعيد كتابة القسم كله بنفسي'),
        ],
        correct: 0,
        feedback: L(
          'Comments let your teammate see your idea so you can decide together, which keeps trust in the team.',
          'التعليقات تتيح لزميلك رؤية فكرتك لتقررا معاً، وهذا يحافظ على الثقة في الفريق.',
        ),
      },
    },
    {
      id: 'C02-U3',
      title: L('Protect information', 'احمِ معلوماتك'),
      synopsis: L(
        'Recognise suspicious messages and share personal information carefully.',
        'تعرّف على الرسائل المشبوهة وشارك معلوماتك الشخصية بحذر.',
      ),
      objective: L(
        'Recognise common signs of a suspicious message and decide what personal information is safe to share.',
        'تتعرّف على العلامات الشائعة للرسائل المشبوهة وتقرر أي معلومات شخصية يمكن مشاركتها بأمان.',
      ),
      body: L(
        'Some messages are designed to trick you into sharing passwords, codes or money. Warning signs include urgent pressure, such as "your account will close today", offers that sound too good to be true, unknown links and spelling mistakes. A message can look like it comes from a friend, a bank or a training centre and still be fake. Never share a password or a verification code with anyone, even if they say they are from support. If you are unsure, do not click. Contact the person or organisation through a number or website you already trust. Be careful with personal details too. Your ID number, home address and family information should only be shared when there is a clear and safe reason. Use different passwords for important accounts and turn on extra verification when you can.',
        '',
      ),
      scenario: L(
        'Karim receives a message saying he has won a free laptop and must send a code to claim it. The message has spelling mistakes and an unknown link. He does not reply, deletes it and tells his trainer so others in the group can be warned.',
        'تصل إلى كريم رسالة تقول إنه فاز بحاسوب محمول مجاني وعليه إرسال رمز لاستلامه. في الرسالة أخطاء إملائية ورابط مجهول. لا يرد عليها، بل يحذفها ويخبر مدربه ليتم تنبيه بقية المجموعة.',
      ),
      takeaway: L(
        'Pause before you click, never share codes or passwords and verify through a channel you trust.',
        'توقّف قبل أن تضغط، ولا تشارك الرموز أو كلمات المرور أبداً، وتحقق عبر قناة تثق بها.',
      ),
      check: {
        prompt: L(
          'A message asks you to send the code you just received by SMS. What should you do?',
          'تطلب منك رسالة إرسال الرمز الذي وصلك للتو برسالة نصية. ماذا تفعل؟',
        ),
        options: [
          L(
            'Do not send it, and check with the service directly',
            'لا أرسله، وأتحقق مباشرة من الجهة المعنية',
          ),
          L('Send it quickly before it expires', 'أرسله بسرعة قبل أن تنتهي صلاحيته'),
          L('Post it in a group chat to ask about it', 'أنشره في مجموعة محادثة لأسأل عنه'),
        ],
        correct: 0,
        feedback: L(
          'Verification codes are private. Real services do not ask you to send them in a message.',
          'رموز التحقق خاصة، والجهات الحقيقية لا تطلب منك إرسالها في رسالة.',
        ),
      },
      hasVideo: true,
      transcript: L(
        'In this lesson we learn to spot suspicious messages. Look for four warning signs. Urgent pressure, like "act now or lose your account". Offers that sound too good to be true. Links you do not recognise. And spelling mistakes. When you see these signs, stop. Do not click and do not reply. If the message seems to come from someone you know, contact them another way. And remember one simple rule: never share a password or a verification code with anyone. Protecting your information protects your learning and your work.',
        '',
      ),
    },
    {
      id: 'C02-U4',
      title: L('Use AI thoughtfully', 'استخدم الذكاء الاصطناعي بوعي'),
      synopsis: L(
        'Check AI outputs and avoid uploading sensitive information.',
        'تحقق من مخرجات الذكاء الاصطناعي وتجنب رفع المعلومات الحساسة.',
      ),
      objective: L(
        'Use AI tools to support your work while checking outputs and keeping sensitive information private.',
        'تستخدم أدوات الذكاء الاصطناعي لدعم عملك مع التحقق من مخرجاتها وإبقاء المعلومات الحساسة خاصة.',
      ),
      body: L(
        'AI tools can help you brainstorm, improve the wording of a message or practise interview questions. They can also be wrong. An AI answer may sound confident and still include mistakes, missing facts or invented details. Treat every output as a first draft. Read it carefully, compare important facts with a trusted source and change anything that does not sound like you. When you use AI to help with a CV or an application, make sure every line is true about your own experience. Protect your privacy too. Do not upload your ID, private documents, passwords or personal details about other people. Ask general questions instead, for example "How do I structure a short work email?". Used thoughtfully, AI is a helpful assistant, but you stay responsible for the final work.',
        '',
      ),
      scenario: L(
        'Maya asks an AI tool to improve her CV summary. The new version says she has "three years of sales experience", which is not true. She removes that line, keeps the clearer wording and checks every other sentence before saving.',
        'تطلب مايا من أداة ذكاء اصطناعي تحسين ملخص سيرتها الذاتية. تقول النسخة الجديدة إن لديها "ثلاث سنوات من الخبرة في المبيعات"، وهذا غير صحيح. تحذف هذا السطر وتحتفظ بالصياغة الأوضح وتراجع كل جملة أخرى قبل الحفظ.',
      ),
      takeaway: L(
        'Treat AI output as a draft: check it, keep it true and never upload sensitive information.',
        'تعامل مع مخرجات الذكاء الاصطناعي كمسودة: راجعها، واحرص على صدقها، ولا ترفع معلومات حساسة أبداً.',
      ),
      check: {
        prompt: L(
          'An AI tool adds a skill to your CV that you do not have. What should you do?',
          'أضافت أداة ذكاء اصطناعي إلى سيرتك مهارة لا تملكها. ماذا تفعل؟',
        ),
        options: [
          L('Remove it and keep only true information', 'أحذفها وأحتفظ بالمعلومات الصحيحة فقط'),
          L('Keep it because the AI suggested it', 'أبقيها لأن الأداة اقترحتها'),
          L('Add more skills to match it', 'أضيف مهارات أخرى لتتناسب معها'),
        ],
        correct: 0,
        feedback: L(
          'You are responsible for your CV. Every line must be true and something you can explain.',
          'أنت مسؤول عن سيرتك، ويجب أن يكون كل سطر فيها صحيحاً ويمكنك شرحه.',
        ),
      },
    },
  ],
  practicalTask: L(
    'Write a short professional email to a trainer and set up a sample folder structure for your learning files.',
    'اكتب بريداً مهنياً قصيراً إلى مدرب وأنشئ هيكل مجلدات نموذجياً لملفات تعلّمك.',
  ),
  output: L(
    'A professional email and organised sample folder structure.',
    'بريد إلكتروني مهني وهيكل مجلدات نموذجي منظّم.',
  ),
  quiz: [
    {
      prompt: L(
        'An unexpected request for your password should be independently verified, not answered.',
        'يجب التحقق بشكل مستقل من أي طلب غير متوقع لكلمة المرور، لا الرد عليه.',
      ),
      options: [L('True', 'صحيح'), L('False', 'خطأ')],
      correct: 0,
      feedback: L(
        'True. Contact the person or service through a channel you already trust before doing anything.',
        'صحيح. تواصل مع الشخص أو الجهة عبر قناة تثق بها قبل أي تصرف.',
      ),
      unitIndex: 2,
    },
    {
      prompt: L(
        'Which file name is easiest to find later?',
        'أي اسم ملف هو الأسهل للعثور عليه لاحقاً؟',
      ),
      options: [
        L('CV_Nour_2026-11.docx', 'CV_Nour_2026-11.docx'),
        L('new file (3).docx', 'new file (3).docx'),
        L('document.docx', 'document.docx'),
      ],
      correct: 0,
      feedback: L(
        'Clear names with a topic, name and date make files quick to find.',
        'الأسماء الواضحة التي تتضمن الموضوع والاسم والتاريخ تسهّل العثور على الملفات.',
      ),
      unitIndex: 0,
    },
    {
      prompt: L('A clear work email should include:', 'يجب أن يتضمن البريد المهني الواضح:'),
      options: [
        L('A specific subject line and a clear request', 'سطر موضوع محدد وطلباً واضحاً'),
        L('No subject so the reader is curious', 'لا موضوع ليثير فضول القارئ'),
        L('Only emojis', 'رموزاً تعبيرية فقط'),
      ],
      correct: 0,
      feedback: L(
        'A specific subject and a clear request help the reader respond quickly.',
        'الموضوع المحدد والطلب الواضح يساعدان القارئ على الرد بسرعة.',
      ),
      unitIndex: 1,
    },
    {
      prompt: L(
        'What should you do before using an AI answer in your work?',
        'ماذا تفعل قبل استخدام إجابة من الذكاء الاصطناعي في عملك؟',
      ),
      options: [
        L('Check it for mistakes and missing facts', 'أتحقق منها بحثاً عن أخطاء أو معلومات ناقصة'),
        L('Copy it exactly', 'أنسخها كما هي'),
        L('Share it with everyone first', 'أشاركها مع الجميع أولاً'),
      ],
      correct: 0,
      feedback: L(
        'AI tools can be wrong, so always review the output before you rely on it.',
        'قد تخطئ أدوات الذكاء الاصطناعي، لذا راجع المخرجات دائماً قبل الاعتماد عليها.',
      ),
      unitIndex: 3,
    },
    {
      prompt: L(
        'Which information should you avoid uploading to an AI tool?',
        'ما المعلومات التي يجب تجنب رفعها إلى أداة ذكاء اصطناعي؟',
      ),
      options: [
        L('Your ID number and private documents', 'رقم هويتك ووثائقك الخاصة'),
        L('A general question about email structure', 'سؤال عام عن بنية البريد الإلكتروني'),
        L('A practice interview question', 'سؤال تدريبي للمقابلة'),
      ],
      correct: 0,
      feedback: L(
        'Keep identity details and private documents out of AI tools.',
        'أبقِ بيانات الهوية والوثائق الخاصة بعيداً عن أدوات الذكاء الاصطناعي.',
      ),
      unitIndex: 3,
    },
  ],
  resources: [],
  prerequisites: [],
  image: 'images/generated/course-C02.webp',
}
