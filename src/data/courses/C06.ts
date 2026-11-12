import type { Course } from '@shared/types'
import { L } from '../l'

// Brief §8. Employment route.
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
    L('Structure answers using situation, task, action and result', 'تبني إجاباتك وفق الموقف والمهمة والإجراء والنتيجة'),
    L('Ask useful questions and send a concise follow-up', 'تطرح أسئلة مفيدة وترسل متابعة موجزة'),
  ],
  units: [
    { id: 'C06-U1', title: L('Prepare for the role', 'استعد للدور'), synopsis: L('Research the opportunity and prepare relevant examples.', 'ابحث عن الفرصة وحضّر أمثلة مناسبة.') },
    { id: 'C06-U2', title: L('Tell your story', 'احكِ قصتك'), synopsis: L('Structure an answer using situation, task, action and result.', 'نظّم إجابتك وفق الموقف والمهمة والإجراء والنتيجة.') },
    { id: 'C06-U3', title: L('Practise common questions', 'تدرّب على الأسئلة الشائعة'), synopsis: L('Answer strengths, teamwork and customer-service questions.', 'أجب عن أسئلة نقاط القوة والعمل الجماعي وخدمة العملاء.') },
    { id: 'C06-U4', title: L('Follow up professionally', 'تابع بشكل مهني'), synopsis: L('Ask useful questions and send a concise follow-up.', 'اطرح أسئلة مفيدة وأرسل رسالة متابعة موجزة.') },
  ],
  practicalTask: L('Save two practice interview answers using the STAR structure and write a short plan for what you will improve.', 'احفظ إجابتين تدريبيتين للمقابلة باستخدام بنية STAR واكتب خطة قصيرة لما ستحسّنه.'),
  output: L('Two saved practice answers and an improvement plan.', 'إجابتان تدريبيتان محفوظتان وخطة تحسين.'),
  quiz: [
    {
      prompt: L('A specific example of what you did is stronger than a general claim.', 'المثال المحدد عمّا فعلته أقوى من الادعاء العام.'),
      options: [L('True', 'صحيح'), L('False', 'خطأ')],
      correct: 0,
      feedback: L('True. Specific examples give the interviewer evidence of your skills.', 'صحيح. الأمثلة المحددة تقدّم للمقابِل دليلاً على مهاراتك.'),
      unitIndex: 1,
    },
    {
      prompt: L('Before an interview, it is most useful to:', 'قبل المقابلة، من الأفضل أن:'),
      options: [L('Read the role description and match your examples to it', 'أقرأ وصف الدور وأربط أمثلتي به'), L('Memorise a long speech', 'أحفظ خطاباً طويلاً'), L('Prepare nothing so you sound natural', 'لا أحضّر شيئاً لأبدو طبيعياً')],
      correct: 0,
      feedback: L('Matching your examples to the role shows you understand what the employer needs.', 'ربط أمثلتك بالدور يُظهر أنك تفهم احتياجات صاحب العمل.'),
      unitIndex: 0,
    },
    {
      prompt: L('In the STAR structure, what does the "A" describe?', 'في بنية STAR، ماذا يصف حرف "A"؟'),
      options: [L('The action you personally took', 'الإجراء الذي قمت به أنت'), L('The award you received', 'الجائزة التي حصلت عليها'), L('The address of the workplace', 'عنوان مكان العمل')],
      correct: 0,
      feedback: L('Action is what you did yourself. Focus on your own steps, not only the team.', 'الإجراء هو ما فعلته بنفسك. ركّز على خطواتك أنت، لا على الفريق فقط.'),
      unitIndex: 1,
    },
    {
      prompt: L('Asked "How do you deal with an upset customer?", the best answer:', 'عند سؤالك "كيف تتعامل مع عميل منزعج؟"، أفضل إجابة:'),
      options: [L('Gives a short real example of listening and solving the problem', 'تقدّم مثالاً واقعياً قصيراً عن الاستماع وحل المشكلة'), L('Says customers are always wrong', 'تقول إن العملاء مخطئون دائماً'), L('Says you have never met one', 'تقول إنك لم تقابل عميلاً كهذا')],
      correct: 0,
      feedback: L('A short real example shows the interviewer how you actually behave.', 'المثال الواقعي القصير يُظهر للمقابِل كيف تتصرف فعلاً.'),
      unitIndex: 2,
    },
    {
      prompt: L('A good follow-up message after an interview is:', 'رسالة المتابعة الجيدة بعد المقابلة:'),
      options: [L('Short, thanks the interviewer and restates your interest', 'قصيرة، تشكر المقابِل وتؤكد اهتمامك'), L('Long and repeats your whole CV', 'طويلة وتكرر سيرتك الذاتية كلها'), L('Sent ten times the same day', 'تُرسل عشر مرات في اليوم نفسه')],
      correct: 0,
      feedback: L('A concise thank-you note is professional and easy to read.', 'رسالة الشكر الموجزة مهنية وسهلة القراءة.'),
      unitIndex: 3,
    },
  ],
  resources: ['starWorksheet'],
  prerequisites: ['C01'],
  image: 'images/generated/course-C06.webp',
}
