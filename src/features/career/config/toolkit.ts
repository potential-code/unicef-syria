import type { CareerRoute, Localized, OpportunityId } from '@shared/types'
import { L } from '@/data/l'

export type ToolkitTab = 'cv' | 'interview' | 'business' | 'freelance' | 'proposal'

/** Tabs ordered by the youth's route (brief §14 Y11). Every tool stays visible. */
export const TAB_ORDER: Record<CareerRoute | 'none', ToolkitTab[]> = {
  employment: ['cv', 'interview', 'business', 'freelance', 'proposal'],
  enterprise: ['business', 'interview', 'cv', 'freelance', 'proposal'],
  freelance: ['freelance', 'proposal', 'cv', 'interview', 'business'],
  none: ['cv', 'interview', 'business', 'freelance', 'proposal'],
}

export interface PracticeQuestion {
  id: string
  text: Localized
  /** Words that show the answer is on topic (English and Arabic stems). */
  keywords: string[]
}

const GENERIC: PracticeQuestion[] = [
  {
    id: 'g1',
    text: L(
      'Tell me about yourself and why this opportunity interests you.',
      'حدّثني عن نفسك ولماذا تهمّك هذه الفرصة.',
    ),
    keywords: ['interest', 'learn', 'skill', 'experience', 'أهتم', 'أتعلم', 'مهارة', 'خبرة'],
  },
  {
    id: 'g2',
    text: L(
      'Describe a time you worked in a team to finish a task.',
      'صف موقفاً عملت فيه ضمن فريق لإنجاز مهمة.',
    ),
    keywords: ['team', 'together', 'task', 'helped', 'فريق', 'معاً', 'مهمة', 'ساعدت'],
  },
]

/** Role-specific practice questions per sample opportunity. */
export const QUESTION_BANK: Partial<Record<OpportunityId, PracticeQuestion[]>> = {
  O01: [
    {
      id: 'o01a',
      text: L(
        'Tell me about a time you helped a customer with a problem.',
        'حدّثني عن موقف ساعدت فيه عميلاً على حل مشكلة.',
      ),
      keywords: [
        'customer',
        'listen',
        'problem',
        'help',
        'solve',
        'عميل',
        'أصغيت',
        'مشكلة',
        'ساعدت',
        'حل',
      ],
    },
    {
      id: 'o01b',
      text: L(
        'How do you keep records accurate when you are busy?',
        'كيف تحافظ على دقة السجلات عندما تكون مشغولاً؟',
      ),
      keywords: [
        'record',
        'check',
        'list',
        'accurate',
        'update',
        'سجل',
        'راجعت',
        'قائمة',
        'دقة',
        'حدّثت',
      ],
    },
  ],
  O02: [
    {
      id: 'o02a',
      text: L(
        'How would you organise a folder of mixed office documents?',
        'كيف تنظّم ملفاً يحتوي على مستندات مكتبية متنوعة؟',
      ),
      keywords: ['folder', 'name', 'sort', 'document', 'file', 'ملف', 'تسمية', 'رتبت', 'مستند'],
    },
    {
      id: 'o02b',
      text: L(
        'Tell me about a time you used a spreadsheet.',
        'حدّثني عن مرة استخدمت فيها جدول بيانات.',
      ),
      keywords: ['spreadsheet', 'column', 'table', 'data', 'جدول', 'عمود', 'بيانات'],
    },
  ],
  O03: [
    {
      id: 'o03a',
      text: L(
        'How would you manage two bookings for the same time slot?',
        'كيف تتعامل مع حجزين في الموعد نفسه؟',
      ),
      keywords: [
        'booking',
        'schedule',
        'call',
        'confirm',
        'time',
        'حجز',
        'جدول',
        'اتصلت',
        'أكدت',
        'موعد',
      ],
    },
  ],
  O04: [
    {
      id: 'o04a',
      text: L(
        'Walk the client through how you would plan five posts for their shop.',
        'اشرح للعميل كيف ستخطط لخمسة منشورات لمتجره.',
      ),
      keywords: [
        'post',
        'customer',
        'plan',
        'review',
        'brand',
        'منشور',
        'عميل',
        'خطة',
        'مراجعة',
        'هوية',
      ],
    },
    {
      id: 'o04b',
      text: L(
        'How do you respond when a client asks for extra work?',
        'كيف ترد عندما يطلب العميل عملاً إضافياً؟',
      ),
      keywords: ['scope', 'agree', 'time', 'fee', 'confirm', 'نطاق', 'اتفق', 'وقت', 'أجر', 'أكدت'],
    },
  ],
  O05: [
    {
      id: 'o05a',
      text: L(
        'How would you clean up an inventory worksheet with duplicate rows?',
        'كيف تنظّف ورقة مخزون تحتوي على صفوف مكررة؟',
      ),
      keywords: ['duplicate', 'column', 'sort', 'check', 'مكرر', 'عمود', 'رتبت', 'راجعت'],
    },
  ],
  O06: [
    {
      id: 'o06a',
      text: L(
        'Who is your customer and what problem have you seen them face?',
        'من هو عميلك وما المشكلة التي رأيته يواجهها؟',
      ),
      keywords: ['customer', 'problem', 'interview', 'asked', 'عميل', 'مشكلة', 'مقابلة', 'سألت'],
    },
    {
      id: 'o06b',
      text: L('What did you learn from talking to customers?', 'ماذا تعلمت من الحديث مع العملاء؟'),
      keywords: ['learn', 'told', 'asked', 'evidence', 'تعلمت', 'أخبروني', 'سألت', 'دليل'],
    },
  ],
}

export function questionsFor(id: OpportunityId | string): PracticeQuestion[] {
  return QUESTION_BANK[id as OpportunityId] ?? GENERIC
}

export type Rating = 'developing' | 'clear' | 'strong'
export type Criterion = 'relevance' | 'clarity' | 'evidence'
export interface PracticeFeedback {
  relevance: Rating
  clarity: Rating
  evidence: Rating
  overall: Rating
  /** Weakest criterion: drives the suggested next practice task. */
  focus: Criterion
}

const ACTION_WORDS = [
  'i ',
  'checked',
  'helped',
  'organised',
  'organized',
  'listened',
  'added',
  'explained',
  'called',
  'prepared',
  'created',
  'made',
  'kept',
  'asked',
  'planned',
  'قمت',
  'ساعدت',
  'رتبت',
  'نظمت',
  'أصغيت',
  'أضفت',
  'شرحت',
  'اتصلت',
  'أعددت',
  'أنشأت',
  'سألت',
  'خططت',
  'راجعت',
]
const RESULT_WORDS = [
  'result',
  'so that',
  'as a result',
  'finally',
  'in the end',
  'which meant',
  'joined',
  'solved',
  'النتيجة',
  'لذلك',
  'في النهاية',
  'وبالتالي',
  'حُلّت',
]
const RANK: Rating[] = ['developing', 'clear', 'strong']

const count = (text: string, words: string[]) =>
  words.filter((w) => text.includes(w.toLowerCase())).length

/**
 * Descriptive practice feedback (brief §13). A simple, deterministic text check for the demo:
 * never a numeric score, never a hiring prediction.
 */
export function practiceFeedback(
  answer: string,
  q: PracticeQuestion,
  skills: string[],
): PracticeFeedback {
  const text = ` ${answer.toLowerCase()} `
  const words = answer.trim().split(/\s+/).filter(Boolean).length
  const skillWords = skills.flatMap((s) => s.toLowerCase().split(/\s+/)).filter((w) => w.length > 3)
  const topical = count(text, q.keywords) + count(text, skillWords)
  const actions = count(text, ACTION_WORDS)
  const result = count(text, RESULT_WORDS) > 0
  const relevance: Rating = topical >= 3 ? 'strong' : topical >= 1 ? 'clear' : 'developing'
  const clarity: Rating = words < 15 ? 'developing' : words <= 120 && result ? 'strong' : 'clear'
  const evidence: Rating = actions >= 3 && result ? 'strong' : actions >= 1 ? 'clear' : 'developing'
  const ranks = [relevance, clarity, evidence].map((r) => RANK.indexOf(r)).sort((a, b) => a - b)
  const overall = RANK[ranks[1] ?? 0] ?? 'developing'
  const all: [Criterion, Rating][] = [
    ['relevance', relevance],
    ['clarity', clarity],
    ['evidence', evidence],
  ]
  const focus = all.reduce((low, cur) =>
    RANK.indexOf(cur[1]) < RANK.indexOf(low[1]) ? cur : low,
  )[0]
  return { relevance, clarity, evidence, overall, focus }
}
