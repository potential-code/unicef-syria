import type { CareerRoute, Localized } from '@shared/types'
import { L } from '@/data/l'

/**
 * Presenter sample data for the Career Toolkit forms. Fictional, honest and modest: no invented
 * employers, qualifications or numbers that could not be verified.
 */

const CV_EMPLOYMENT = {
  summary: L(
    'Organised and friendly young person looking for a customer service or office support role. I listen carefully, keep clear records and like learning new tools.',
    'شابة منظمة وودودة تبحث عن دور في خدمة العملاء أو الدعم المكتبي. أصغي بعناية وأحافظ على سجلات واضحة وأحب تعلّم أدوات جديدة.',
  ),
  experience: [
    L(
      'Supported participant registration and kept the attendance list for a community training event.',
      'دعمت تسجيل المشاركين وحافظت على قائمة الحضور في فعالية تدريبية مجتمعية.',
    ),
    L(
      'Helped in a family shop: served customers, answered questions and tracked daily sales in a notebook.',
      'ساعدت في متجر العائلة: خدمت العملاء وأجبت عن أسئلتهم وتابعت المبيعات اليومية في دفتر.',
    ),
    L(
      'Organised shared study notes for a group of six classmates before exams.',
      'نظّمت ملاحظات دراسية مشتركة لمجموعة من ستة زملاء قبل الامتحانات.',
    ),
  ],
  education: L(
    'Secondary school certificate, Damascus. Online courses: Digital Essentials, Workplace Communication.',
    'شهادة الثانوية العامة، دمشق. دورات إلكترونية: أساسيات المهارات الرقمية، التواصل في مكان العمل.',
  ),
  projects: L(
    'Three-step career action plan (course output). Sample customer FAQ sheet for a training centre.',
    'خطة عمل مهنية من ثلاث خطوات (مخرج دورة). ورقة أسئلة شائعة نموذجية لمركز تدريب.',
  ),
  skills: L(
    'Customer service, record keeping, spreadsheets, email, teamwork',
    'خدمة العملاء، حفظ السجلات، جداول البيانات، البريد الإلكتروني، العمل الجماعي',
  ),
  languages: L(
    'Arabic (native), English (intermediate)',
    'العربية (اللغة الأم)، الإنجليزية (متوسط)',
  ),
}

const CV_ENTERPRISE = {
  summary: L(
    'Hands-on young person testing a small service idea for repair shops in Aleppo. I talk to customers, keep simple records and learn quickly from feedback.',
    'أختبر فكرة خدمة صغيرة لمحلات الإصلاح في حلب. أتحدث مع العملاء وأحتفظ بسجلات بسيطة وأتعلم بسرعة من الملاحظات.',
  ),
  experience: [
    L(
      'Interviewed five repair shop owners about how they handle customer enquiries and wrote up what I learned.',
      'أجريت مقابلات مع خمسة من أصحاب محلات الإصلاح حول طريقة تعاملهم مع استفسارات العملاء ودوّنت ما تعلمته.',
    ),
    L(
      "Helped in a relative's phone repair shop: logged repairs, called customers when devices were ready.",
      'ساعدت في محل إصلاح هواتف لأحد الأقارب: سجلت الإصلاحات واتصلت بالعملاء عند جاهزية الأجهزة.',
    ),
    L(
      'Drafted a one-page business model and a three-month sample cash plan with fictional amounts.',
      'أعددت نموذج عمل من صفحة واحدة وخطة نقدية نموذجية لثلاثة أشهر بمبالغ خيالية.',
    ),
  ],
  education: L(
    'Secondary school certificate, Aleppo. Online courses: Business Idea and Customer Discovery, Business Model and Money Basics.',
    'شهادة الثانوية العامة، حلب. دورات إلكترونية: فكرة المشروع واكتشاف العملاء، نموذج العمل وأساسيات المال.',
  ),
  projects: L(
    'Repair reminder service idea: problem statement, three customer questions and a two-week test plan.',
    'فكرة خدمة تذكير للإصلاحات: بيان المشكلة، وثلاثة أسئلة للعملاء، وخطة تجربة لمدة أسبوعين.',
  ),
  skills: L(
    'Customer interviews, record keeping, basic budgeting, phone and messaging, problem solving',
    'مقابلات العملاء، حفظ السجلات، الميزانية الأساسية، الهاتف والمراسلة، حل المشكلات',
  ),
  languages: L('Arabic (native), English (basic)', 'العربية (اللغة الأم)، الإنجليزية (أساسي)'),
}

const CV_FREELANCE = {
  summary: L(
    'Creative young person offering social media posts and simple graphics for small local businesses. I plan carefully, meet agreed deadlines and welcome feedback.',
    'أقدّم منشورات لوسائل التواصل الاجتماعي وتصاميم بسيطة للأعمال المحلية الصغيرة. أخطط بعناية وألتزم بالمواعيد المتفق عليها وأرحب بالملاحظات.',
  ),
  experience: [
    L(
      'Created five sample posts for a fictional bakery as part of a course portfolio.',
      'أنشأت خمسة منشورات نموذجية لمخبز خيالي ضمن ملف أعمال لإحدى الدورات.',
    ),
    L(
      'Designed a simple event poster for a community youth activity, with one review round.',
      'صممت ملصقاً بسيطاً لفعالية شبابية مجتمعية مع جولة مراجعة واحدة.',
    ),
    L(
      'Planned a two-week posting calendar and shared drafts for feedback before publishing.',
      'خططت تقويم نشر لمدة أسبوعين وشاركت المسودات لأخذ الملاحظات قبل النشر.',
    ),
  ],
  education: L(
    'Secondary school certificate, Homs. Online courses: Freelance and Part Time Foundations, Build a Portfolio and Write Proposals.',
    'شهادة الثانوية العامة، حمص. دورات إلكترونية: أساسيات العمل الحر والعمل الجزئي، ابنِ ملف أعمالك واكتب العروض.',
  ),
  projects: L(
    'Portfolio card with one sample project and a proposal draft for a fictional client.',
    'بطاقة ملف أعمال بمشروع نموذجي واحد ومسودة عرض لعميل خيالي.',
  ),
  skills: L(
    'Social media content, simple graphic design, copywriting, planning, client communication',
    'محتوى وسائل التواصل، التصميم الجرافيكي البسيط، كتابة النصوص، التخطيط، التواصل مع العملاء',
  ),
  languages: L(
    'Arabic (native), English (intermediate)',
    'العربية (اللغة الأم)، الإنجليزية (متوسط)',
  ),
}

/** CV sample matching the learner's route (employment is the default). */
export function sampleCv(route: CareerRoute | undefined) {
  return route === 'enterprise'
    ? CV_ENTERPRISE
    : route === 'freelance'
      ? CV_FREELANCE
      : CV_EMPLOYMENT
}

export const SAMPLE_BUSINESS = {
  customer: L(
    'Small phone and appliance repair shops in my neighbourhood.',
    'محلات صغيرة لإصلاح الهواتف والأجهزة في حيّي.',
  ),
  problem: L(
    'Owners miss customer enquiries and forget to call back when a repair is ready.',
    'يفوّت أصحاب المحلات استفسارات العملاء وينسون الاتصال عند جاهزية الإصلاح.',
  ),
  solution: L(
    'A simple booking and reminder service: I log each repair and send the customer a message when it is ready.',
    'خدمة بسيطة للحجز والتذكير: أسجّل كل إصلاح وأرسل للعميل رسالة عند جاهزيته.',
  ),
  evidence: L(
    'I spoke with five shop owners. Four said they lose track of repairs in busy weeks.',
    'تحدثت مع خمسة من أصحاب المحلات. قال أربعة منهم إنهم يفقدون متابعة الإصلاحات في الأسابيع المزدحمة.',
  ),
  model: L(
    'A small weekly fee per shop, tested with one shop first.',
    'رسوم أسبوعية صغيرة لكل محل، تُجرَّب أولاً مع محل واحد.',
  ),
  costs: L(
    'Phone credit, a notebook and spreadsheet, and travel between shops.',
    'رصيد الهاتف، ودفتر وجدول بيانات، والتنقل بين المحلات.',
  ),
  nextExperiment: L(
    'Run the service free for one shop for two weeks and count the missed calls before and after.',
    'تقديم الخدمة مجاناً لمحل واحد لمدة أسبوعين وعدّ المكالمات الفائتة قبل التجربة وبعدها.',
  ),
  questions: [
    L(
      'How do customers contact you about a repair today?',
      'كيف يتواصل معك العملاء اليوم بخصوص الإصلاح؟',
    ),
    L(
      'Tell me about the last time a customer did not collect a repair.',
      'حدّثني عن آخر مرة لم يستلم فيها عميل جهازه المُصلَح.',
    ),
    L('What do you do now to remember who to call back?', 'ماذا تفعل الآن لتتذكر بمن يجب أن تتصل؟'),
  ],
}

export const SAMPLE_FREELANCE = {
  services: L(
    'Social media posts and simple graphics for small local shops.',
    'منشورات لوسائل التواصل الاجتماعي وتصاميم بسيطة للمحلات المحلية الصغيرة.',
  ),
  samples: L(
    'Five sample posts for a fictional bakery, made during the Digital Content Skills course.',
    'خمسة منشورات نموذجية لمخبز خيالي، أُعدّت خلال دورة مهارات المحتوى الرقمي.',
  ),
  availability: L(
    'Weekdays after 4 pm and Saturday mornings, about ten hours a week.',
    'أيام الأسبوع بعد الساعة الرابعة عصراً وصباح السبت، نحو عشر ساعات أسبوعياً.',
  ),
  assignments: L(
    'Short assignments of one to two weeks, such as a set of posts for an opening or an offer.',
    'مهام قصيرة من أسبوع إلى أسبوعين، مثل مجموعة منشورات لافتتاح أو عرض.',
  ),
  pricing: L(
    'Agreed per assignment after we discuss the brief.',
    'يُتفق عليه لكل مهمة بعد مناقشة المتطلبات.',
  ),
}

export const SAMPLE_PROPOSAL = {
  client: L('Demo Bakery, Homs', 'مخبز تجريبي، حمص'),
  goal: L(
    'Tell neighbours about the new weekend breakfast offer.',
    'تعريف سكان الحي بعرض فطور نهاية الأسبوع الجديد.',
  ),
  experience: L(
    'I made five sample posts for a bakery in my course portfolio and planned a weekly posting calendar.',
    'أعددت خمسة منشورات نموذجية لمخبز ضمن ملف أعمالي في الدورة وخططت تقويماً أسبوعياً للنشر.',
  ),
  deliverables: L(
    'Five posts with short captions, one simple offer graphic and a two-week posting plan.',
    'خمسة منشورات مع تعليقات قصيرة، وتصميم بسيط للعرض، وخطة نشر لمدة أسبوعين.',
  ),
  timing: L(
    'First drafts in 5 days, final set in 10 days',
    'المسودات الأولى خلال 5 أيام، والمجموعة النهائية خلال 10 أيام',
  ),
  review: L(
    'One review round: you comment on the drafts and I update them within two days.',
    'جولة مراجعة واحدة: تعلّق على المسودات وأحدّثها خلال يومين.',
  ),
  assumptions: L(
    'You share photos of the products and approve the offer text before I start.',
    'تشارك صور المنتجات وتوافق على نص العرض قبل أن أبدأ.',
  ),
  fee: L('To agree after this proposal', 'يُتفق عليها بعد هذا العرض'),
}

/** Strong sample answers (situation, action, result) per practice question id. */
export const SAMPLE_ANSWERS: Record<string, Localized> = {
  g1: L(
    'I am a recent secondary school graduate and I enjoy helping people and organising information. I helped with registration at a community training event, and I checked the attendance list so every participant was recorded. I am interested in this opportunity because I want to learn on the job and use my communication skill. As a result of my courses I can use spreadsheets and email confidently.',
    'أنا خريجة ثانوية حديثة وأحب مساعدة الناس وتنظيم المعلومات. ساعدت في التسجيل في فعالية تدريبية مجتمعية، وراجعت قائمة الحضور ليُسجَّل كل مشارك. أهتم بهذه الفرصة لأنني أريد أن أتعلم أثناء العمل وأستخدم مهارة التواصل لديّ. وبالتالي أصبحت أستخدم جداول البيانات والبريد الإلكتروني بثقة بعد دوراتي.',
  ),
  g2: L(
    'Before exams our study group of six had notes everywhere. I organised a shared folder, I asked each person to cover one topic, and I checked the notes for gaps. We worked together on the hardest topic. As a result, everyone had complete notes a week before the exam and the team finished the task on time.',
    'قبل الامتحانات كانت ملاحظات مجموعتنا الدراسية المكونة من ستة أشخاص مبعثرة. نظمت مجلداً مشتركاً، وسألت كل شخص أن يغطي موضوعاً واحداً، وراجعت الملاحظات بحثاً عن نواقص. عملنا معاً على أصعب موضوع. وبالتالي أصبحت لدى الجميع ملاحظات كاملة قبل الامتحان بأسبوع وأنهى الفريق المهمة في الوقت المحدد.',
  ),
  o01a: L(
    'In my family shop a customer was upset because a product she bought did not work. I listened to her problem without interrupting, I checked the receipt and I explained the exchange options calmly. I helped her choose a replacement and I wrote the issue in our notebook. As a result the problem was solved, she left satisfied and she came back the next week.',
    'في متجر عائلتي كانت عميلة منزعجة لأن منتجاً اشترته لم يعمل. أصغيت إلى مشكلتها دون مقاطعة، وراجعت الإيصال، وشرحت خيارات الاستبدال بهدوء. ساعدتها على اختيار بديل وسجلت المشكلة في دفترنا. وبالتالي حُلّت المشكلة وغادرت راضية وعادت في الأسبوع التالي.',
  ),
  o01b: L(
    'At a busy training event I kept the attendance list. I prepared a simple sheet before people arrived, I checked each name against the registration list, and I added notes straight away instead of later. At the end I counted the totals twice. As a result the records were accurate and the organiser used them the same day.',
    'في فعالية تدريبية مزدحمة كنت مسؤولة عن قائمة الحضور. أعددت ورقة بسيطة قبل وصول الناس، وراجعت كل اسم مقابل قائمة التسجيل، وأضفت الملاحظات فوراً بدلاً من تأجيلها. في النهاية عددت المجموع مرتين. وبالتالي كانت السجلات دقيقة واستخدمها المنظم في اليوم نفسه.',
  ),
  o02a: L(
    'First I would sort the documents into groups such as invoices, letters and forms. I would create a labelled folder for each group and file the papers by date, newest first. I would ask my supervisor which names to use, and I would add a simple index sheet at the front. As a result anyone could find a document quickly.',
    'أولاً سأفرز المستندات في مجموعات مثل الفواتير والرسائل والنماذج. سأنشئ مجلداً معنوناً لكل مجموعة وأرتب الأوراق حسب التاريخ من الأحدث. سأسأل مشرفي عن الأسماء المناسبة، وأضيف ورقة فهرس بسيطة في المقدمة. وبالتالي يستطيع أي شخص إيجاد المستند بسرعة.',
  ),
  o02b: L(
    'In my Digital Essentials course I made a spreadsheet to track my family shop sales. I created columns for date, item and amount, I added a total formula, and I checked the numbers against the notebook each week. As a result we could see which days were busiest and plan stock better.',
    'في دورة أساسيات المهارات الرقمية أنشأت جدول بيانات لمتابعة مبيعات متجر عائلتي. أنشأت أعمدة للتاريخ والصنف والمبلغ، وأضفت معادلة للمجموع، وراجعت الأرقام مقابل الدفتر كل أسبوع. وبالتالي أصبحنا نرى الأيام الأكثر ازدحاماً ونخطط للمخزون بشكل أفضل.',
  ),
  o03a: L(
    'I would check the booking times and contact details first. I would call the customer who booked second, explain the mistake politely and offer the nearest free slot. I would update the booking list straight away and add a check so it does not happen again. As a result both customers would get a clear time and the schedule would stay accurate.',
    'سأراجع أوقات الحجز وبيانات التواصل أولاً. سأتصل بالعميل صاحب الحجز الثاني، وأشرح الخطأ بلطف، وأعرض أقرب موعد متاح. سأحدّث قائمة الحجوزات فوراً وأضيف خطوة تحقق حتى لا يتكرر ذلك. وبالتالي يحصل العميلان على موعد واضح ويبقى الجدول دقيقاً.',
  ),
  o04a: L(
    'First I would ask the client about their customers and their main goal, for example more weekend visits. I would plan five posts: an introduction, two product posts, one offer and one behind-the-scenes post. I would prepare a short calendar and share drafts for one review round. As a result the client knows what is coming and when.',
    'أولاً سأسأل العميل عن عملائه وهدفه الرئيسي، مثل زيادة الزيارات في نهاية الأسبوع. سأخطط خمسة منشورات: تعريف، ومنشوران عن المنتجات، وعرض، ومنشور من خلف الكواليس. سأعدّ تقويماً قصيراً وأشارك المسودات لجولة مراجعة واحدة. وبالتالي يعرف العميل ما الذي سيُنشر ومتى.',
  ),
  o04b: L(
    'I would thank the client and ask exactly what the extra work is. I would explain that it is outside the agreed deliverables, and I would prepare a short note with the new time and any change to the fee. I would only start after the client agrees in writing. As a result we both stay clear about the scope.',
    'سأشكر العميل وأسأله بالضبط عن العمل الإضافي. سأشرح أنه خارج المخرجات المتفق عليها، وأعدّ ملاحظة قصيرة بالوقت الجديد وأي تغيير في الأجر. لن أبدأ إلا بعد موافقة العميل كتابياً. وبالتالي يبقى نطاق العمل واضحاً لكلينا.',
  ),
  o05a: L(
    'I would make a copy of the worksheet first so nothing is lost. I would sort the rows by item code, use the remove duplicates tool, and then I would check the totals against the original. I would mark any rows I was unsure about and ask my supervisor. As a result the inventory list would be clean and the totals correct.',
    'سأنشئ نسخة من ورقة العمل أولاً حتى لا يضيع شيء. سأرتب الصفوف حسب رمز الصنف، وأستخدم أداة إزالة التكرار، ثم أراجع المجاميع مقابل النسخة الأصلية. سأضع علامة على أي صفوف لست متأكدة منها وأسأل مشرفي. وبالتالي تصبح قائمة المخزون نظيفة والمجاميع صحيحة.',
  ),
  o06a: L(
    'My customers are small repair shops in my neighbourhood. I asked five owners about their week, and the main problem was missed customer calls when a repair was ready. I listened and wrote down what they said. As a result I am testing a simple reminder service with one shop first.',
    'عملائي هم محلات الإصلاح الصغيرة في حيّي. سألت خمسة من أصحاب المحلات عن أسبوعهم، وكانت المشكلة الرئيسية هي المكالمات الفائتة عند جاهزية الإصلاح. أصغيت ودونت ما قالوه. وبالتالي أجرّب خدمة تذكير بسيطة مع محل واحد أولاً.',
  ),
  o06b: L(
    'I learned that owners care more about saving time than about new apps. I asked open questions, and four of the five told me they track repairs on paper. That evidence changed my idea from an app to a simple phone reminder service. As a result my next test is cheaper and closer to what they asked for.',
    'تعلمت أن أصحاب المحلات يهتمون بتوفير الوقت أكثر من التطبيقات الجديدة. سألت أسئلة مفتوحة، وأخبروني أربعة من خمسة أنهم يتابعون الإصلاحات على الورق. هذا الدليل غيّر فكرتي من تطبيق إلى خدمة تذكير بسيطة عبر الهاتف. وبالتالي أصبحت تجربتي التالية أرخص وأقرب إلى ما طلبوه.',
  ),
}
