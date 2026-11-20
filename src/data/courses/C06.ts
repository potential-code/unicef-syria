import type { Course } from '@shared/types'
import { L } from '../l'

// Brief §8. Employment route. Every unit has a full lesson.
export const C06: Course = {
  id: 'C06',
  title: L('Interview Readiness', 'الاستعداد للمقابلة'),
  category: 'employment',
  routes: ['employment'],
  minutes: 40,
  level: 'intermediate',
  delivery: 'self-paced',
  outcomes: [
    L('Prepare examples that fit a specific role', 'تحضّر أمثلة تناسب دوراً محدداً'),
    L(
      'Structure answers using situation, task, action and result',
      'تبني إجاباتك وفق الموقف والمهمة والإجراء والنتيجة',
    ),
    L('Ask useful questions and send a concise follow-up', 'تطرح أسئلة مفيدة وترسل متابعة موجزة'),
  ],
  units: [
    {
      id: 'C06-U1',
      title: L('Prepare for the role', 'استعد للدور'),
      synopsis: L(
        'Research the opportunity and prepare relevant examples.',
        'ابحث عن الفرصة وحضّر أمثلة مناسبة.',
      ),
      objective: L(
        'Research a sample opportunity and prepare examples that match what the role needs.',
        'تبحث في فرصة نموذجية وتحضّر أمثلة تتوافق مع متطلبات الدور.',
      ),
      body: L(
        'Good interviews start before you enter the room. First, read the role description again and list the three or four most important skills. Next, learn a little about the organisation: what it does, who it serves and where it works. Use its website, its social media pages or people you know. Then prepare one example for each key skill. An example is a short, true story from school, volunteering, training, family work or a previous job. For instance, if the role needs customer service, think of a time you helped someone with a problem. Write your examples on one page. Prepare practical details too: the address, the time, how long the journey takes, clean clothes and a copy of your CV. Preparation reduces stress and helps you speak with confidence.',
        '',
      ),
      scenario: L(
        'Nour has a practice interview for a customer service assistant role at a training centre. She lists three key skills from the advert: communication, organisation and basic computer use. For each one, she writes a short example from her volunteering and her course work.',
        'لدى نور مقابلة تدريبية لوظيفة مساعدة خدمة عملاء في مركز تدريب. تكتب ثلاث مهارات رئيسية من الإعلان: التواصل والتنظيم والاستخدام الأساسي للحاسوب. ولكل مهارة تكتب مثالاً قصيراً من تطوعها وعملها في الدورات.',
      ),
      takeaway: L(
        'Match one true example to each key skill in the role, and plan the practical details early.',
        'اربط مثالاً صادقاً بكل مهارة رئيسية في الدور، وخطّط للتفاصيل العملية مبكراً.',
      ),
      check: {
        prompt: L(
          'The role needs teamwork. What should you prepare?',
          'يتطلب الدور العمل الجماعي. ماذا تحضّر؟',
        ),
        options: [
          L(
            'A short, true example of working well with others',
            'مثالاً قصيراً وصادقاً عن عملك الجيد مع الآخرين',
          ),
          L('A list of every job title you know', 'قائمة بكل المسميات الوظيفية التي تعرفها'),
          L(
            'Nothing, you can think of it during the interview',
            'لا شيء، يمكنني التفكير أثناء المقابلة',
          ),
        ],
        correct: 0,
        feedback: L(
          'A prepared example gives the interviewer evidence and helps you stay calm.',
          'المثال المحضّر يقدّم للمقابِل دليلاً ويساعدك على البقاء هادئاً.',
        ),
      },
      hasVideo: true,
      transcript: L(
        'Welcome to Interview Readiness. In this first lesson we prepare for a specific role. Start with the role description. Circle the three or four skills that matter most. Then find out what the organisation does and who it serves. Now, for each skill, think of one true example from your own life. It can come from school, volunteering, training or helping your family. Write them down on one page. Finally, plan the practical things: the address, the time and a copy of your CV. With this page ready, you will walk in feeling more confident.',
        '',
      ),
    },
    {
      id: 'C06-U2',
      title: L('Tell your story', 'احكِ قصتك'),
      synopsis: L(
        'Structure an answer using situation, task, action and result.',
        'نظّم إجابتك وفق الموقف والمهمة والإجراء والنتيجة.',
      ),
      objective: L(
        'Structure an interview answer using situation, task, action and result.',
        'تبني إجابة المقابلة وفق الموقف والمهمة والإجراء والنتيجة.',
      ),
      body: L(
        'Interviewers often ask "Tell me about a time when...". The STAR structure helps you answer clearly. Situation: set the scene in one or two sentences. Where were you and what was happening? Task: explain what you needed to do or what problem you faced. Action: describe the steps you took yourself. This is the most important part, so use "I" rather than only "we". Result: say what happened in the end and, if possible, what you learned. Keep the whole answer to about one or two minutes. Use true details and do not exaggerate. If the result was not perfect, that is fine. Explain what you would do differently next time. Practise each story aloud a few times, but do not memorise it word for word, so it still sounds natural.',
        '',
      ),
      scenario: L(
        'Omar is asked about solving a problem. He explains that during a community clean-up (situation) the volunteer list was confusing (task). He made a simple table of names and zones and shared it with the group (action). Everyone knew where to go, and he learned how useful clear lists are (result).',
        'يُسأل عمر عن مشكلة حلّها. يوضح أنه خلال حملة تنظيف مجتمعية (الموقف) كانت قائمة المتطوعين مربكة (المهمة). أعدّ جدولاً بسيطاً بالأسماء والمناطق وشاركه مع المجموعة (الإجراء). عرف الجميع أين يذهبون، وتعلّم كم هي مفيدة القوائم الواضحة (النتيجة).',
      ),
      takeaway: L(
        'Situation, task, action, result: spend most of your answer on the steps you took yourself.',
        'الموقف، المهمة، الإجراء، النتيجة: خصّص معظم إجابتك للخطوات التي قمت بها بنفسك.',
      ),
      check: {
        prompt: L(
          'Which part of a STAR answer should usually be the longest?',
          'أي جزء من إجابة STAR يكون الأطول عادةً؟',
        ),
        options: [L('Action', 'الإجراء'), L('Situation', 'الموقف'), L('Result', 'النتيجة')],
        correct: 0,
        feedback: L(
          'The action shows what you personally did, which is what the interviewer most wants to hear.',
          'الإجراء يُظهر ما فعلته أنت شخصياً، وهو أكثر ما يريد المقابِل سماعه.',
        ),
      },
    },
    {
      id: 'C06-U3',
      title: L('Practise common questions', 'تدرّب على الأسئلة الشائعة'),
      synopsis: L(
        'Answer strengths, teamwork and customer-service questions.',
        'أجب عن أسئلة نقاط القوة والعمل الجماعي وخدمة العملاء.',
      ),
      objective: L(
        'Give short, honest answers to common questions about strengths, teamwork and customer service.',
        'تقدّم إجابات قصيرة وصادقة عن الأسئلة الشائعة حول نقاط القوة والعمل الجماعي وخدمة العملاء.',
      ),
      body: L(
        'Some questions appear in almost every interview. "What are your strengths?" Choose two strengths that match the role and give a quick example for each. "Tell me about working in a team." Use a STAR story that shows how you shared tasks, listened or solved a disagreement. "How would you deal with an upset customer?" Describe how you would listen, acknowledge the problem, offer a next step and involve a supervisor if needed. A real example from volunteering or family work is even better. "What is a weakness?" Pick a real area you are improving and explain what you are doing about it. Practise aloud with a friend, a trainer or the AI interview coach. Ask for feedback on length and clarity. Short, honest, specific answers are stronger than long speeches.',
        '',
      ),
      scenario: L(
        'Sami practises with the AI interview coach. His first answer to "What are your strengths?" is a long list. He shortens it to two strengths, reliability and problem solving, with one example each from his work in a phone repair shop.',
        'يتدرّب سامي مع مدرب المقابلات بالذكاء الاصطناعي. إجابته الأولى عن سؤال "ما نقاط قوتك؟" قائمة طويلة. يختصرها إلى نقطتي قوة، هما الالتزام وحل المشكلات، مع مثال واحد لكل منهما من عمله في محل لتصليح الهواتف.',
      ),
      takeaway: L(
        'Pick a few points that match the role, back each one with a short example and practise aloud.',
        'اختر نقاطاً قليلة تناسب الدور، وادعم كل نقطة بمثال قصير، وتدرّب بصوت مرتفع.',
      ),
      check: {
        prompt: L(
          'Asked "What is your weakness?", which answer is best?',
          'عند سؤالك "ما نقطة ضعفك؟"، أي إجابة هي الأفضل؟',
        ),
        options: [
          L(
            'A real area you are improving and what you are doing about it',
            'مجال حقيقي تعمل على تحسينه وما تفعله لذلك',
          ),
          L('I have no weaknesses', 'ليست لدي نقاط ضعف'),
          L('A long list of everything you find hard', 'قائمة طويلة بكل ما تجده صعباً'),
        ],
        correct: 0,
        feedback: L(
          'An honest answer with a clear improvement step shows self-awareness and a willingness to learn.',
          'الإجابة الصادقة مع خطوة تحسين واضحة تُظهر وعيك بذاتك واستعدادك للتعلّم.',
        ),
      },
      hasVideo: true,
      transcript: L(
        'In this lesson we practise common interview questions. Let us try one together: what are your strengths? Choose two that fit the role. For each one, add a short example. Sami chose reliability and problem solving, and gave an example from a phone repair shop. Now try another: how would you deal with an upset customer? Listen, acknowledge the problem, offer a next step and ask a supervisor if needed. Say your answers aloud, then make them shorter. Clear and honest beats long and perfect.',
        '',
      ),
    },
    {
      id: 'C06-U4',
      title: L('Follow up professionally', 'تابع بشكل مهني'),
      synopsis: L(
        'Ask useful questions and send a concise follow-up.',
        'اطرح أسئلة مفيدة وأرسل رسالة متابعة موجزة.',
      ),
      objective: L(
        'Ask useful questions at the end of an interview and send a short, polite follow-up message.',
        'تطرح أسئلة مفيدة في نهاية المقابلة وترسل رسالة متابعة قصيرة ومهذبة.',
      ),
      body: L(
        'Near the end of most interviews, you will hear "Do you have any questions?". Prepare two or three. Good questions show interest in the work, for example "What does a typical day look like in this role?", "How is training organised for new staff?" or "What are the next steps in the process?". Avoid asking only about breaks or holidays at this stage. Write down the answers, especially the expected timeline. Within one day, send a short follow-up message or email. Thank the interviewer for their time, mention one thing you learned or enjoyed in the conversation and restate your interest in the role. Keep it to four or five sentences. If the timeline passes with no news, one polite reminder is fine. Whatever the outcome, note what went well and what you will practise next time.',
        '',
      ),
      scenario: L(
        'After a practice interview, Hala asks how new staff are trained and what the next steps are. That evening, she emails a short thank-you note that mentions the training programme they discussed and restates her interest in the role.',
        'بعد مقابلة تدريبية، تسأل هالة عن طريقة تدريب الموظفين الجدد وعن الخطوات التالية. وفي المساء ترسل رسالة شكر قصيرة تذكر فيها برنامج التدريب الذي تحدثا عنه وتؤكد اهتمامها بالدور.',
      ),
      takeaway: L(
        'Prepare two or three questions and send a short thank-you message within a day.',
        'حضّر سؤالين أو ثلاثة وأرسل رسالة شكر قصيرة خلال يوم واحد.',
      ),
      check: {
        prompt: L(
          'Which is a useful question to ask at the end of an interview?',
          'أي سؤال مفيد تطرحه في نهاية المقابلة؟',
        ),
        options: [
          L('What are the next steps in the process?', 'ما الخطوات التالية في عملية الاختيار؟'),
          L('How many breaks do I get each day?', 'كم استراحة أحصل عليها يومياً؟'),
          L('Did I get the job?', 'هل حصلت على الوظيفة؟'),
        ],
        correct: 0,
        feedback: L(
          'Asking about next steps shows interest and helps you plan your follow-up.',
          'السؤال عن الخطوات التالية يُظهر اهتمامك ويساعدك على التخطيط للمتابعة.',
        ),
      },
    },
  ],
  practicalTask: L(
    'Save two practice interview answers using the STAR structure and write a short plan for what you will improve.',
    'احفظ إجابتين تدريبيتين للمقابلة باستخدام بنية STAR واكتب خطة قصيرة لما ستحسّنه.',
  ),
  output: L(
    'Two saved practice answers and an improvement plan.',
    'إجابتان تدريبيتان محفوظتان وخطة تحسين.',
  ),
  quiz: [
    {
      prompt: L(
        'A specific example of what you did is stronger than a general claim.',
        'المثال المحدد عمّا فعلته أقوى من الادعاء العام.',
      ),
      options: [L('True', 'صحيح'), L('False', 'خطأ')],
      correct: 0,
      feedback: L(
        'True. Specific examples give the interviewer evidence of your skills.',
        'صحيح. الأمثلة المحددة تقدّم للمقابِل دليلاً على مهاراتك.',
      ),
      unitIndex: 1,
    },
    {
      prompt: L('Before an interview, it is most useful to:', 'قبل المقابلة، من الأفضل أن:'),
      options: [
        L(
          'Read the role description and match your examples to it',
          'أقرأ وصف الدور وأربط أمثلتي به',
        ),
        L('Memorise a long speech', 'أحفظ خطاباً طويلاً'),
        L('Prepare nothing so you sound natural', 'لا أحضّر شيئاً لأبدو طبيعياً'),
      ],
      correct: 0,
      feedback: L(
        'Matching your examples to the role shows you understand what the employer needs.',
        'ربط أمثلتك بالدور يُظهر أنك تفهم احتياجات صاحب العمل.',
      ),
      unitIndex: 0,
    },
    {
      prompt: L(
        'In the STAR structure, what does the "A" describe?',
        'في بنية STAR، ماذا يصف حرف "A"؟',
      ),
      options: [
        L('The action you personally took', 'الإجراء الذي قمت به أنت'),
        L('The award you received', 'الجائزة التي حصلت عليها'),
        L('The address of the workplace', 'عنوان مكان العمل'),
      ],
      correct: 0,
      feedback: L(
        'Action is what you did yourself. Focus on your own steps, not only the team.',
        'الإجراء هو ما فعلته بنفسك. ركّز على خطواتك أنت، لا على الفريق فقط.',
      ),
      unitIndex: 1,
    },
    {
      prompt: L(
        'Asked "How do you deal with an upset customer?", the best answer:',
        'عند سؤالك "كيف تتعامل مع عميل منزعج؟"، أفضل إجابة:',
      ),
      options: [
        L(
          'Gives a short real example of listening and solving the problem',
          'تقدّم مثالاً واقعياً قصيراً عن الاستماع وحل المشكلة',
        ),
        L('Says customers are always wrong', 'تقول إن العملاء مخطئون دائماً'),
        L('Says you have never met one', 'تقول إنك لم تقابل عميلاً كهذا'),
      ],
      correct: 0,
      feedback: L(
        'A short real example shows the interviewer how you actually behave.',
        'المثال الواقعي القصير يُظهر للمقابِل كيف تتصرف فعلاً.',
      ),
      unitIndex: 2,
    },
    {
      prompt: L(
        'A good follow-up message after an interview is:',
        'رسالة المتابعة الجيدة بعد المقابلة:',
      ),
      options: [
        L(
          'Short, thanks the interviewer and restates your interest',
          'قصيرة، تشكر المقابِل وتؤكد اهتمامك',
        ),
        L('Long and repeats your whole CV', 'طويلة وتكرر سيرتك الذاتية كلها'),
        L('Sent ten times the same day', 'تُرسل عشر مرات في اليوم نفسه'),
      ],
      correct: 0,
      feedback: L(
        'A concise thank-you note is professional and easy to read.',
        'رسالة الشكر الموجزة مهنية وسهلة القراءة.',
      ),
      unitIndex: 3,
    },
  ],
  resources: ['starWorksheet'],
  prerequisites: ['C01'],
  image: 'images/generated/course-C06.webp',
}
