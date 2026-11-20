import type { Course } from '@shared/types'
import { L } from '../l'

// Brief §9. Freelance route. Every unit has a full lesson.
export const C12: Course = {
  id: 'C12',
  title: L('Client Communication and Project Delivery', 'التواصل مع العملاء وتسليم المشاريع'),
  category: 'freelancing',
  routes: ['freelance'],
  minutes: 40,
  level: 'intermediate',
  delivery: 'self-paced',
  outcomes: [
    L('Agree what success looks like before starting', 'تتفق على معنى النجاح قبل البدء'),
    L('Break an assignment into reviewable milestones', 'تقسّم المهمة إلى مراحل قابلة للمراجعة'),
    L(
      'Handle change requests and close an assignment well',
      'تتعامل مع طلبات التغيير وتُنهي المهمة بشكل جيد',
    ),
  ],
  units: [
    {
      id: 'C12-U1',
      title: L('Clarify the brief', 'وضّح المطلوب'),
      synopsis: L(
        'Agree what success looks like before starting.',
        'اتفق على معنى النجاح قبل البدء.',
      ),
      objective: L(
        'Ask questions that help you and the client agree what a successful result looks like.',
        'تطرح أسئلة تساعدك أنت والعميل على الاتفاق على شكل النتيجة الناجحة.',
      ),
      body: L(
        'Many freelance problems start on day one, when the freelancer and the client imagine different results. Clarifying the brief means asking questions until you both describe success the same way. Useful questions include: Who is this work for? What should it help them do? What does a good result look like to you? Are there examples you like or dislike? What format, length and deadline do you need? Who will give feedback and approve the final version? Write the answers down, then send a short summary back to the client: "To confirm, I will deliver this, for this purpose, by this date." Ask them to reply with any corrections. This takes ten minutes and can save days of rework. It also shows the client that you take their needs seriously.',
        '',
      ),
      scenario: L(
        'Lina is asked to write social media posts for a fictional local bakery. She asks who the posts are for, what the owner wants customers to do and which tone she prefers. Then she sends a summary: five posts promoting the new breakfast menu, friendly tone, ready by Thursday.',
        'يُطلب من لينا كتابة منشورات على وسائل التواصل الاجتماعي لمخبز محلي افتراضي. تسأل لمن ستكون المنشورات، وماذا تريد صاحبة المخبز من الزبائن أن يفعلوا، وأي أسلوب تفضّل. ثم ترسل ملخصاً: خمسة منشورات للترويج لقائمة الفطور الجديدة، بأسلوب ودود، جاهزة يوم الخميس.',
      ),
      takeaway: L(
        'Ask clear questions, write a short summary of what success looks like and get the client to confirm it.',
        'اطرح أسئلة واضحة، واكتب ملخصاً قصيراً لشكل النجاح، واطلب من العميل تأكيده.',
      ),
      check: {
        prompt: L(
          'After asking your questions, what should you send the client?',
          'بعد طرح أسئلتك، ماذا ترسل إلى العميل؟',
        ),
        options: [
          L(
            'A short written summary of the agreed result to confirm',
            'ملخصاً مكتوباً قصيراً للنتيجة المتفق عليها لتأكيده',
          ),
          L('The finished work straight away', 'العمل النهائي مباشرة'),
          L('Nothing until the deadline', 'لا شيء حتى الموعد النهائي'),
        ],
        correct: 0,
        feedback: L(
          'A written summary lets the client correct misunderstandings before you start.',
          'الملخص المكتوب يتيح للعميل تصحيح أي سوء فهم قبل أن تبدأ.',
        ),
      },
      hasVideo: true,
      transcript: L(
        'Welcome to Client Communication and Project Delivery. Good projects start with a clear brief. Before you begin, ask questions. Who is the work for? What should it achieve? What does a good result look like? Are there examples the client likes? When is it due, and who approves it? Then write a short summary and send it back. To confirm, I will deliver this, for this purpose, by this date. Lina did this with a bakery owner, and they agreed on five friendly posts by Thursday. Ten minutes of questions can save days of rework.',
        '',
      ),
    },
    {
      id: 'C12-U2',
      title: L('Plan milestones', 'خطّط للمراحل'),
      synopsis: L(
        'Break the assignment into reviewable stages.',
        'قسّم المهمة إلى مراحل يمكن مراجعتها.',
      ),
      objective: L(
        'Break an assignment into milestones that the client can review along the way.',
        'تقسّم المهمة إلى مراحل يستطيع العميل مراجعتها خلال العمل.',
      ),
      body: L(
        'A milestone is a point in the project where you share something the client can review. Instead of working alone for two weeks and delivering everything at the end, you break the assignment into stages. A simple plan might have three milestones: an outline or first sample, a full draft, and the final version. For each milestone, write what you will share, the date and what feedback you need. Agree the plan with the client at the start. Early milestones catch misunderstandings when they are still small and quick to fix. They also give the client confidence that work is moving. Keep each milestone realistic for your availability, and leave time between them for the client to reply. If you will miss a date, tell the client early and propose a new one.',
        '',
      ),
      scenario: L(
        'Maya plans a five-page brochure for a fictional youth centre. Milestone one is a page layout sketch on day two. Milestone two is a full draft on day five. Milestone three is the final file on day eight. At milestone one, the client asks for larger text, which takes Maya only minutes to change.',
        'تخطط مايا لكتيّب من خمس صفحات لمركز شبابي افتراضي. المرحلة الأولى رسم تخطيطي للصفحات في اليوم الثاني، والثانية مسودة كاملة في اليوم الخامس، والثالثة الملف النهائي في اليوم الثامن. في المرحلة الأولى يطلب العميل خطاً أكبر، وهو تعديل لا يأخذ من مايا إلا دقائق.',
      ),
      takeaway: L(
        'Plan reviewable stages with dates, so problems are caught early when they are easy to fix.',
        'خطّط لمراحل قابلة للمراجعة بمواعيد محددة، لتكتشف المشكلات مبكراً حين يسهل إصلاحها.',
      ),
      check: {
        prompt: L(
          'What is the main benefit of an early milestone?',
          'ما الفائدة الرئيسية للمرحلة المبكرة؟',
        ),
        options: [
          L(
            'Misunderstandings are found while they are small',
            'اكتشاف سوء الفهم وهو ما زال صغيراً',
          ),
          L('The project becomes longer', 'يصبح المشروع أطول'),
          L("You no longer need the client's feedback", 'لا تعود بحاجة إلى ملاحظات العميل'),
        ],
        correct: 0,
        feedback: L(
          'Sharing early work lets the client correct direction before you invest many hours.',
          'مشاركة العمل مبكراً تتيح للعميل تصحيح الاتجاه قبل أن تستثمر ساعات كثيرة.',
        ),
      },
    },
    {
      id: 'C12-U3',
      title: L('Manage feedback and changes', 'أدِر الملاحظات والتغييرات'),
      synopsis: L(
        'Record revisions and discuss scope changes.',
        'سجّل التعديلات وناقش تغييرات النطاق.',
      ),
      objective: L(
        'Record client feedback clearly and handle requests that change the agreed scope.',
        'تسجّل ملاحظات العميل بوضوح وتتعامل مع الطلبات التي تغيّر النطاق المتفق عليه.',
      ),
      body: L(
        'Feedback is a normal part of any project. Handle it in three steps. First, record it. Feedback often arrives in calls or voice messages, so write each requested change as a short numbered list and send it back to confirm. Second, sort it. Some requests are revisions inside the agreed scope, such as changing a colour or fixing a sentence. Others are scope changes, such as adding a new deliverable or a new language. Third, respond. Make agreed revisions within the number of rounds you agreed. For scope changes, stay calm and friendly: thank the client, explain that this is new work, and propose options with a new date or fee. Never say yes to extra work without agreeing what it means for time and payment. A short, clear reply protects the relationship and your time.',
        '',
      ),
      scenario: L(
        'Lina has delivered five draft posts. The bakery owner sends a voice message asking for two text changes and three extra posts for a holiday offer. Lina confirms the two revisions in writing and replies that the extra posts are new work, offering a new delivery date and a proposed fee for them.',
        'سلّمت لينا خمسة منشورات كمسودة. ترسل صاحبة المخبز رسالة صوتية تطلب فيها تعديلين في النص وثلاثة منشورات إضافية لعرض العيد. تؤكد لينا التعديلين كتابياً، وتردّ بأن المنشورات الإضافية عمل جديد، وتقترح موعد تسليم جديداً وأجراً لها.',
      ),
      takeaway: L(
        'Write feedback down, separate revisions from scope changes, and agree time and fee before extra work.',
        'دوّن الملاحظات، وميّز بين التعديلات وتغييرات النطاق، واتفق على الوقت والأجر قبل أي عمل إضافي.',
      ),
      check: {
        prompt: L(
          'The client asks for a new deliverable that was not in the scope. What should you do?',
          'يطلب العميل مخرَجاً جديداً لم يكن في النطاق. ماذا تفعل؟',
        ),
        options: [
          L(
            'Explain it is new work and agree time and fee first',
            'أوضح أنه عمل جديد وأتفق على الوقت والأجر أولاً',
          ),
          L('Do it quietly for free', 'أنجزه بصمت ومجاناً'),
          L('Refuse and stop replying', 'أرفض وأتوقف عن الرد'),
        ],
        correct: 0,
        feedback: L(
          'A new deliverable changes the scope, so discuss timing and fee before you start it.',
          'المخرَج الجديد يغيّر النطاق، لذا ناقش التوقيت والأجر قبل أن تبدأ به.',
        ),
      },
      hasVideo: true,
      transcript: L(
        'In this lesson we manage feedback and changes. Clients often give feedback quickly, by phone or voice message. So write it down as a numbered list and send it back to confirm. Then sort each request. Is it a revision inside the agreed scope? Or is it new work? Revisions you simply make. New work needs a conversation. Thank the client, explain that this is extra, and suggest a new date or fee. Lina did exactly this when the bakery asked for three more posts. Clear and friendly replies keep the project on track.',
        '',
      ),
    },
    {
      id: 'C12-U4',
      title: L('Close the assignment', 'أنهِ المهمة'),
      synopsis: L(
        'Confirm delivery and request constructive feedback.',
        'أكّد التسليم واطلب ملاحظات بنّاءة.',
      ),
      objective: L(
        'Confirm final delivery clearly and ask the client for constructive feedback.',
        'تؤكد التسليم النهائي بوضوح وتطلب من العميل ملاحظات بنّاءة.',
      ),
      body: L(
        'How you finish a project matters as much as how you start it. When the work is ready, send a short delivery message. List each deliverable you are sending, mention where the files are and in which formats, and note anything the client needs to do next, such as checking the final print size. Ask the client to confirm they have received everything. Keep a copy of the final files and your messages. Then ask for constructive feedback with two or three simple questions: What worked well? What could I do better next time? Would you be comfortable recommending this work to others? Thank them for their time. If the client agrees, you may ask whether you can show the work, or a sample version of it, in your portfolio. Respect their answer.',
        '',
      ),
      scenario: L(
        'Maya sends the final brochure files in PDF and the original design format, with a short list of what is included. The youth centre confirms receipt. She asks two feedback questions and learns that her clear milestones were helpful, but that she could reply to messages a little faster.',
        'ترسل مايا الملفات النهائية للكتيّب بصيغة PDF وبصيغة ملف التصميم الأصلي، مع قائمة قصيرة بما هو مرفق. يؤكد المركز الشبابي الاستلام. تطرح سؤالين للحصول على ملاحظات، فتعرف أن مراحلها الواضحة كانت مفيدة، لكن بإمكانها الرد على الرسائل بسرعة أكبر قليلاً.',
      ),
      takeaway: L(
        'Send a clear delivery message, get confirmation and ask a few simple questions to improve next time.',
        'أرسل رسالة تسليم واضحة، واحصل على التأكيد، واطرح أسئلة بسيطة لتتحسّن في المرة القادمة.',
      ),
      check: {
        prompt: L(
          'What should a good delivery message include?',
          'ماذا يجب أن تتضمن رسالة التسليم الجيدة؟',
        ),
        options: [
          L(
            'A list of what is delivered and a request to confirm receipt',
            'قائمة بما تم تسليمه وطلباً لتأكيد الاستلام',
          ),
          L('Only the files, with no message', 'الملفات فقط دون أي رسالة'),
          L(
            'A request for a new project before they check the work',
            'طلب مشروع جديد قبل أن يراجع العميل العمل',
          ),
        ],
        correct: 0,
        feedback: L(
          'Listing deliverables and asking for confirmation closes the assignment clearly for both sides.',
          'ذكر المخرجات وطلب التأكيد يُنهيان المهمة بوضوح للطرفين.',
        ),
      },
    },
  ],
  practicalTask: L(
    'Write a short project plan with milestones and reply to a sample client request that adds a new deliverable.',
    'اكتب خطة مشروع قصيرة بمراحلها، وردّ على طلب عميل نموذجي يضيف مخرَجاً جديداً.',
  ),
  output: L(
    'A short project plan and a response to a change request.',
    'خطة مشروع قصيرة ورد على طلب تغيير.',
  ),
  quiz: [
    {
      prompt: L(
        'A new deliverable should trigger a scope discussion.',
        'إضافة مخرَج جديد يجب أن تفتح نقاشاً حول النطاق.',
      ),
      options: [L('True', 'صحيح'), L('False', 'خطأ')],
      correct: 0,
      feedback: L(
        'True. Extra work may change the timeline or fee, so agree it with the client first.',
        'صحيح. العمل الإضافي قد يغيّر الجدول أو الأجر، لذا اتفق عليه مع العميل أولاً.',
      ),
      unitIndex: 2,
    },
    {
      prompt: L(
        'Before starting, what should you agree with the client?',
        'قبل البدء، على ماذا تتفق مع العميل؟',
      ),
      options: [
        L('What a successful result looks like', 'شكل النتيجة الناجحة'),
        L('Your favourite colour', 'لونك المفضل'),
        L('Nothing, start straight away', 'لا شيء، أبدأ مباشرة'),
      ],
      correct: 0,
      feedback: L(
        'A shared idea of success avoids rework and disappointment.',
        'الفهم المشترك للنجاح يجنّبك إعادة العمل وخيبة الأمل.',
      ),
      unitIndex: 0,
    },
    {
      prompt: L('Why break an assignment into milestones?', 'لماذا تقسّم المهمة إلى مراحل؟'),
      options: [
        L('So the client can review progress early', 'ليتمكن العميل من مراجعة التقدّم مبكراً'),
        L('To make the work longer', 'لجعل العمل أطول'),
        L('To avoid talking to the client', 'لتجنب التواصل مع العميل'),
      ],
      correct: 0,
      feedback: L(
        'Reviewable stages catch problems early, when they are easy to fix.',
        'المراحل القابلة للمراجعة تكشف المشكلات مبكراً حين يسهل إصلاحها.',
      ),
      unitIndex: 1,
    },
    {
      prompt: L(
        'The client sends feedback by voice message. What should you do?',
        'أرسل العميل ملاحظاته برسالة صوتية. ماذا تفعل؟',
      ),
      options: [
        L('Write the revisions down and confirm them in writing', 'أكتب التعديلات وأؤكدها كتابياً'),
        L('Rely on memory', 'أعتمد على الذاكرة'),
        L('Ignore it until the end', 'أتجاهلها حتى النهاية'),
      ],
      correct: 0,
      feedback: L(
        'A written record of revisions keeps both sides clear.',
        'السجل المكتوب للتعديلات يُبقي الطرفين على وضوح.',
      ),
      unitIndex: 2,
    },
    {
      prompt: L(
        'When closing an assignment, it is good practice to:',
        'عند إنهاء المهمة، من الممارسات الجيدة:',
      ),
      options: [
        L('Confirm delivery and ask for constructive feedback', 'تأكيد التسليم وطلب ملاحظات بنّاءة'),
        L('Stop replying once you are paid', 'التوقف عن الرد بعد الدفع'),
        L('Send the files with no message', 'إرسال الملفات دون أي رسالة'),
      ],
      correct: 0,
      feedback: L(
        'Confirming delivery and asking for feedback builds trust and helps you improve.',
        'تأكيد التسليم وطلب الملاحظات يبنيان الثقة ويساعدانك على التحسّن.',
      ),
      unitIndex: 3,
    },
  ],
  resources: ['proposal'],
  prerequisites: ['C11'],
  image: 'images/generated/course-C12.webp',
}
