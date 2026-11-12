import type { CourseId, Localized, TemplateId } from '@shared/types'
import { L } from '@/data/l'

/** Roster filter presets reachable from the performance panel (brief §17). */
export type RosterPreset = 'all' | 'attendance' | 'completion' | 'grading' | 'followUp'
export const ROSTER_PRESETS: RosterPreset[] = [
  'all',
  'attendance',
  'completion',
  'grading',
  'followUp',
]

export const TRAINING_DECISIONS = ['needsInfo', 'accepted', 'waitlisted', 'notSelected'] as const
export type TrainingDecision = (typeof TRAINING_DECISIONS)[number]

/** Practical rubric (brief §17 T04): proposed sample content, three criteria scored 0 to 2. */
export const RUBRIC_CRITERIA = ['understands', 'clear', 'nextStep'] as const

/** Sample learner responses shown in the review dialog. Fictional demonstration text. */
export const SAMPLE_SUBMISSIONS: Partial<Record<CourseId, Localized>> = {
  C03: L(
    'Dear customer, thank you for telling us about the late delivery. I am sorry for the inconvenience. I have checked your order and it will arrive tomorrow before 12:00. If it does not, please call me directly on the shop number and I will arrange a refund of the delivery fee.',
    'عزيزي العميل، شكراً لإخبارنا بتأخر التوصيل. أعتذر عن الإزعاج. راجعت طلبك وسيصل غداً قبل الساعة 12:00. وإن لم يصل، يرجى الاتصال بي مباشرة على رقم المتجر وسأرتب استرداد رسوم التوصيل.',
  ),
  C05: L(
    'Nour Hassan, Damascus. Summary: friendly and organised, looking for a customer service role. Experience: registered 120 participants at a community training event and answered their questions at the help desk. Skills: customer communication, digital records, teamwork.',
    'نور حسن، دمشق. الملخص: ودودة ومنظمة وأبحث عن وظيفة في خدمة العملاء. الخبرة: سجلت 120 مشاركاً في فعالية تدريبية مجتمعية وأجبت عن أسئلتهم في مكتب المساعدة. المهارات: التواصل مع العملاء، السجلات الرقمية، العمل الجماعي.',
  ),
  C13: L(
    'Enquiry log: 1) Opening hours question, answered by phone. 2) Price of a repair, passed to the supervisor. 3) Delivery delay, apologised and confirmed a new time. Reply to customer 3: thank you for your patience, your order will arrive tomorrow morning.',
    'سجل الاستفسارات: 1) سؤال عن ساعات العمل، تمت الإجابة هاتفياً. 2) سعر إصلاح، أُحيل إلى المشرف. 3) تأخر توصيل، تم الاعتذار وتأكيد موعد جديد. الرد على العميل 3: شكراً لصبرك، سيصل طلبك صباح الغد.',
  ),
  C07: L(
    'Problem: repair shops miss calls at busy times. Questions: 1) Tell me about the last time a customer could not reach you. 2) How do you keep track of appointments today? 3) What happens when two customers arrive at once?',
    'المشكلة: محلات الإصلاح تفوّت المكالمات في أوقات الذروة. الأسئلة: 1) حدثني عن آخر مرة لم يستطع فيها عميل الوصول إليك. 2) كيف تتابع المواعيد حالياً؟ 3) ماذا يحدث عندما يصل عميلان في الوقت نفسه؟',
  ),
  C11: L(
    'Portfolio card: three original posts for a fictional bakery. Proposal: five posts with short copy over two weeks, one review round, delivered as image files and a caption document.',
    'بطاقة ملف الأعمال: ثلاثة منشورات أصلية لمخبز افتراضي. العرض: خمسة منشورات مع نصوص قصيرة خلال أسبوعين، وجولة مراجعة واحدة، تُسلَّم كملفات صور ومستند للتعليقات.',
  ),
}
export const GENERIC_SUBMISSION = L(
  'Sample submission text for this practical task. The learner followed the template and added one example from their own experience.',
  'نص تسليم نموذجي لهذه المهمة العملية. اتبع المتعلم القالب وأضاف مثالاً واحداً من تجربته.',
)

/** Resources a trainer can attach to a course or cohort (brief §17 T04). */
export const RESOURCE_TEMPLATES: TemplateId[] = [
  'actionPlan',
  'cvOutline',
  'starWorksheet',
  'customerInterview',
  'cashPlan',
  'proposal',
  'portfolioChecklist',
]
