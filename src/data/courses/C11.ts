import type { Course } from '@shared/types'
import { L } from '../l'

// Brief §9. Freelance showcase course: every unit has a full lesson.
export const C11: Course = {
  id: 'C11',
  title: L('Build a Portfolio and Write Proposals', 'ابنِ ملف أعمالك واكتب العروض'),
  category: 'freelancing',
  routes: ['freelance'],
  minutes: 45,
  level: 'intermediate',
  delivery: 'self-paced',
  showcase: true,
  outcomes: [
    L('Choose or create work samples that show a relevant skill', 'تختار أو تنشئ نماذج أعمال تُظهر مهارة مناسبة'),
    L('Describe your contribution honestly', 'تصف مساهمتك بصدق'),
    L('Write and review a focused proposal for a client brief', 'تكتب عرضاً مركّزاً لطلب عميل وتراجعه'),
  ],
  units: [
    {
      id: 'C11-U1',
      title: L('Select useful work samples', 'اختر نماذج أعمال مفيدة'),
      synopsis: L('Choose or create a sample showing a relevant skill.', 'اختر أو أنشئ نموذجاً يُظهر مهارة مناسبة.'),
      objective: L('Pick or create two or three samples that match the service you want to offer.', 'تختار أو تنشئ نموذجين أو ثلاثة تناسب الخدمة التي تريد تقديمها.'),
      body: L(
        'A portfolio shows clients what you can do before they hire you. It does not need to be large. Two or three good samples that match the service you offer are better than many unrelated ones. Start by naming your service, for example writing social media posts for small shops. Then look at what you already have. A course output, a school project or volunteer work may fit. If you have nothing suitable, create a sample. Choose a fictional business, set yourself a small brief and complete it as if it were real. This is a common and honest way to start, as long as you label the work clearly as sample work. Use only your own words, images you made and free tools, so you have the right to show everything in your portfolio.',
        '',
      ),
      scenario: L(
        'Lina wants to offer social media posts for small shops, but she has no client work yet. She invents a fictional local retailer that sells school supplies and creates three original sample posts for it, using her own photos and text.',
        'تريد لينا تقديم خدمة منشورات التواصل الاجتماعي للمحلات الصغيرة، لكنها لا تملك أعمالاً لعملاء بعد. تبتكر متجراً محلياً افتراضياً يبيع اللوازم المدرسية، وتنشئ له ثلاثة منشورات نموذجية أصلية باستخدام صورها ونصوصها الخاصة.',
      ),
      takeaway: L('A few relevant, original samples are better than many unrelated ones.', 'بضعة نماذج أصلية ومناسبة أفضل من نماذج كثيرة لا علاقة لها بخدمتك.'),
      check: {
        prompt: L('You have no client work yet. What is a good first step?', 'لا تملك أعمالاً لعملاء بعد. ما الخطوة الأولى الجيدة؟'),
        options: [
          L('Create an original sample for a fictional business and label it as sample work', 'إنشاء نموذج أصلي لنشاط افتراضي ووصفه بأنه عمل نموذجي'),
          L('Copy another designer\'s work', 'نسخ عمل مصمم آخر'),
          L('Wait until someone hires you', 'الانتظار حتى يوظفك أحد'),
        ],
        correct: 0,
        feedback: L('Original, clearly labelled sample work is an honest way to show your skills.', 'العمل النموذجي الأصلي الموصوف بوضوح طريقة صادقة لإظهار مهاراتك.'),
      },
      hasVideo: true,
      transcript: L(
        'Welcome to Build a Portfolio and Write Proposals. Clients want to see what you can do, so your portfolio matters. You do not need many pieces. Two or three samples that match your service are enough to start. If you have no client work yet, that is fine. In this course you will follow Lina, who wants to create social media posts for small shops. She made three original sample posts for a fictional local retailer. She used her own photos and words, and she labels them clearly as sample work.',
        '',
      ),
    },
    {
      id: 'C11-U2',
      title: L('Explain your contribution', 'وضّح مساهمتك'),
      synopsis: L('Describe the task, approach and result honestly.', 'صِف المهمة وطريقتك والنتيجة بصدق.'),
      objective: L('Write a short, honest description for each portfolio sample.', 'تكتب وصفاً قصيراً وصادقاً لكل نموذج في ملف أعمالك.'),
      body: L(
        'A sample on its own leaves the client guessing. A short description helps them understand what you did and how you think. For each sample, write three or four lines. First, the task: what was the brief and who was it for? Second, your approach: what choices did you make and why? Third, the result: what did you deliver? Be honest about the context. If it is sample work for a fictional business, say so. If you worked in a team, say which part was yours. Do not claim results you cannot show, such as sales or followers, especially for sample work that was never published. Clients value honesty, and an accurate description makes it easier to talk confidently about your work in a client discussion.',
        '',
      ),
      scenario: L(
        'Lina writes a portfolio card: "Sample work. Three social posts for a fictional school supplies shop, aimed at parents before the new term. I wrote the text, took the photos and chose a simple layout with large, readable headlines." She does not claim any engagement results.',
        'تكتب لينا بطاقة لملف أعمالها: "عمل نموذجي. ثلاثة منشورات لمتجر لوازم مدرسية افتراضي، موجّهة للأهالي قبل بدء الفصل الدراسي. كتبت النصوص والتقطت الصور واخترت تصميماً بسيطاً بعناوين كبيرة وواضحة". ولا تدّعي أي نتائج تفاعل.',
      ),
      takeaway: L('Describe the task, your approach and the result, and say clearly when work is a sample.', 'صِف المهمة وطريقتك والنتيجة، ووضّح بجلاء عندما يكون العمل نموذجياً.'),
      check: {
        prompt: L('Which description of a sample post is honest?', 'أي وصف لمنشور نموذجي هو الصادق؟'),
        options: [
          L('Sample work for a fictional shop. I wrote the text and designed the layout.', 'عمل نموذجي لمتجر افتراضي. كتبت النص وصممت التخطيط.'),
          L('This post doubled the shop\'s sales.', 'ضاعف هذا المنشور مبيعات المتجر.'),
          L('Made for a famous brand.', 'صُمّم لعلامة تجارية مشهورة.'),
        ],
        correct: 0,
        feedback: L('It explains the context and your part without claiming results that did not happen.', 'يوضح السياق ودورك دون ادعاء نتائج لم تحدث.'),
      },
    },
    {
      id: 'C11-U3',
      title: L('Write a focused proposal', 'اكتب عرضاً مركّزاً'),
      synopsis: L('Connect the client brief to a deliverable and timeline.', 'اربط طلب العميل بمخرَج محدد وجدول زمني.'),
      objective: L('Write a short proposal that links the client goal to clear deliverables, timing and fee.', 'تكتب عرضاً قصيراً يربط هدف العميل بمخرجات وتوقيت وأجر واضحة.'),
      body: L(
        'A proposal is your answer to a client brief. Clients often read many proposals, so keep yours short and focused on them. Start by repeating their goal in one sentence, to show you understood it. Then describe what you will deliver, as specifically as you can: how many items, in what format and how many rounds of changes. Add a realistic timeline with one review point. Link to one or two relevant portfolio samples. State your fee or how you will agree it, and list any assumptions, such as the client providing their logo. Avoid long stories about yourself and promises you cannot keep. Finish with a clear next step, such as a short call to confirm details. A focused proposal shows the client you are organised and easy to work with.',
        '',
      ),
      scenario: L(
        'A fictional local retailer asks for help with social media. Lina proposes a five-post starter package: five original posts over two weeks, one round of changes after the first two posts, and a link to her three sample posts. She lists that the shop will provide product photos.',
        'يطلب متجر محلي افتراضي مساعدة في التواصل الاجتماعي. تقترح لينا باقة بداية من خمسة منشورات: خمسة منشورات أصلية خلال أسبوعين، وجولة تعديل واحدة بعد أول منشورين، ورابط إلى منشوراتها النموذجية الثلاثة. وتذكر أن المتجر سيوفر صور المنتجات.',
      ),
      takeaway: L('Repeat the client goal, then state deliverables, timing, assumptions and a next step.', 'أعد صياغة هدف العميل، ثم حدد المخرجات والتوقيت والافتراضات والخطوة التالية.'),
      check: {
        prompt: L('What should a focused proposal start with?', 'بماذا يجب أن يبدأ العرض المركّز؟'),
        options: [
          L('The client\'s goal in one sentence', 'هدف العميل في جملة واحدة'),
          L('Your full life story', 'قصة حياتك الكاملة'),
          L('A list of every tool you know', 'قائمة بكل الأدوات التي تعرفها'),
        ],
        correct: 0,
        feedback: L('Repeating the goal shows the client you understood the brief.', 'إعادة صياغة الهدف تُظهر للعميل أنك فهمت طلبه.'),
      },
      hasVideo: true,
      transcript: L(
        'In this lesson we write a proposal. A good proposal is short and about the client, not about you. Start by repeating their goal. Then say exactly what you will deliver and when. Lina proposes a five-post starter package for a local retailer. She will create five original posts over two weeks, with one round of changes after the first two. She links to her three sample posts and notes that the shop will send product photos. Finally, she suggests a short call to confirm the details.',
        '',
      ),
    },
    {
      id: 'C11-U4',
      title: L('Review before submitting', 'راجع قبل الإرسال'),
      synopsis: L('Check scope, clarity, portfolio links and next steps.', 'تحقق من النطاق والوضوح وروابط ملف الأعمال والخطوات التالية.'),
      objective: L('Use a short checklist to review a proposal before you send it.', 'تستخدم قائمة تحقق قصيرة لمراجعة العرض قبل إرساله.'),
      body: L(
        'Small mistakes in a proposal can cost you an opportunity. Before you submit, take five minutes to review it with fresh eyes. Check the scope: is it clear what is included and what is not? Check clarity: could someone who has never met you understand it in one quick read? Check your portfolio links: do they open, and do they show work relevant to this client? Check the details: the client name, dates and fee should all be correct. Check the next step: does the client know what to do if they are interested? Read the proposal aloud once, because this helps you catch confusing sentences. If possible, ask a trainer or peer to read it. Then save a copy, so you can compare it with the client response later.',
        '',
      ),
      scenario: L(
        'Before sending, Lina reviews her proposal. She notices she forgot to say how many changes are included, so she adds "one round of changes". She checks that her sample links open and that the retailer\'s name is spelled correctly, then saves a copy.',
        'قبل الإرسال، تراجع لينا عرضها. تلاحظ أنها نسيت ذكر عدد التعديلات المشمولة، فتضيف "جولة تعديل واحدة". تتأكد من أن روابط نماذجها تعمل وأن اسم المتجر مكتوب بشكل صحيح، ثم تحفظ نسخة.',
      ),
      takeaway: L('Check scope, clarity, links, details and next step every time before you submit.', 'تحقق في كل مرة قبل الإرسال من النطاق والوضوح والروابط والتفاصيل والخطوة التالية.'),
      check: {
        prompt: L('Which check helps avoid disagreements later?', 'أي تحقق يساعد على تجنب الخلافات لاحقاً؟'),
        options: [
          L('Making the scope clear, including the number of changes', 'توضيح النطاق، بما في ذلك عدد التعديلات'),
          L('Using more colours in the proposal', 'استخدام ألوان أكثر في العرض'),
          L('Making the proposal as long as possible', 'جعل العرض أطول ما يمكن'),
        ],
        correct: 0,
        feedback: L('A clear scope means you and the client agree on what is included from the start.', 'النطاق الواضح يعني أنك والعميل متفقان على ما يشمله العمل منذ البداية.'),
      },
    },
  ],
  practicalTask: L('Create a portfolio card for one sample and draft a proposal for a fictional client using the proposal template.', 'أنشئ بطاقة ملف أعمال لنموذج واحد واكتب مسودة عرض لعميل افتراضي باستخدام قالب العرض.'),
  output: L('A portfolio card and proposal draft.', 'بطاقة ملف أعمال ومسودة عرض.'),
  quiz: [
    {
      prompt: L('Original sample work for a fictional business should be labelled as sample work.', 'يجب وصف العمل النموذجي الأصلي لنشاط افتراضي بأنه عمل نموذجي.'),
      options: [L('True', 'صحيح'), L('False', 'خطأ')],
      correct: 0,
      feedback: L('True. Clear labels keep your portfolio honest and build client trust.', 'صحيح. الوصف الواضح يُبقي ملف أعمالك صادقاً ويبني ثقة العملاء.'),
      unitIndex: 0,
    },
    {
      prompt: L('Which is the best set of portfolio samples for a social media service?', 'ما أفضل مجموعة نماذج لخدمة منشورات التواصل الاجتماعي؟'),
      options: [L('Three relevant sample posts', 'ثلاثة منشورات نموذجية مناسبة'), L('Ten unrelated school essays', 'عشرة مقالات مدرسية لا علاقة لها بالخدمة'), L('Posts copied from a big brand', 'منشورات منسوخة من علامة تجارية كبيرة')],
      correct: 0,
      feedback: L('A few relevant, original samples show exactly the skill the client needs.', 'بضعة نماذج أصلية ومناسبة تُظهر بالضبط المهارة التي يحتاجها العميل.'),
      unitIndex: 0,
    },
    {
      prompt: L('A portfolio description should include:', 'يجب أن يتضمن وصف نموذج ملف الأعمال:'),
      options: [L('The task, your approach and the result', 'المهمة وطريقتك والنتيجة'), L('Results you hope it would have had', 'نتائج تتمنى لو حققها'), L('Only the date', 'التاريخ فقط')],
      correct: 0,
      feedback: L('Task, approach and result help clients understand your work honestly.', 'المهمة والطريقة والنتيجة تساعد العملاء على فهم عملك بصدق.'),
      unitIndex: 1,
    },
    {
      prompt: L('In Lina\'s five-post starter package, what makes the proposal clear?', 'في باقة لينا من خمسة منشورات، ما الذي يجعل العرض واضحاً؟'),
      options: [L('A specific number of posts, a timeline and one round of changes', 'عدد محدد من المنشورات وجدول زمني وجولة تعديل واحدة'), L('A promise of more followers', 'وعد بزيادة المتابعين'), L('No timeline, to stay flexible', 'عدم وضع جدول زمني للحفاظ على المرونة')],
      correct: 0,
      feedback: L('Specific deliverables and timing let the client know exactly what they get.', 'المخرجات والتوقيت المحددان يُعلمان العميل بما سيحصل عليه بالضبط.'),
      unitIndex: 2,
    },
    {
      prompt: L('Before submitting a proposal, you should check:', 'قبل إرسال العرض، يجب أن تتحقق من:'),
      options: [L('Scope, clarity, portfolio links and next step', 'النطاق والوضوح وروابط ملف الأعمال والخطوة التالية'), L('Only the font', 'الخط فقط'), L('Nothing, speed is most important', 'لا شيء، السرعة هي الأهم')],
      correct: 0,
      feedback: L('A short review catches mistakes that could cost you the opportunity.', 'المراجعة القصيرة تكشف أخطاء قد تُفقدك الفرصة.'),
      unitIndex: 3,
    },
  ],
  resources: ['proposal', 'portfolioChecklist'],
  prerequisites: ['C10'],
  image: 'images/generated/course-C11.webp',
}
