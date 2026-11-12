import type { Course } from '@shared/types'
import { L } from '../l'

// Brief §10. Illustrative technical taster for all routes.
export const C14: Course = {
  id: 'C14',
  title: L('Spreadsheet Skills for Everyday Work', 'مهارات جداول البيانات للعمل اليومي'),
  category: 'technical',
  routes: 'all',
  minutes: 45,
  level: 'beginner',
  delivery: 'self-paced',
  outcomes: [
    L('Set up a clean worksheet with clear columns', 'تنشئ ورقة عمل مرتبة بأعمدة واضحة'),
    L('Calculate totals with SUM and simple arithmetic', 'تحسب المجاميع باستخدام SUM والعمليات البسيطة'),
    L('Sort, filter and summarise data honestly', 'ترتّب البيانات وتصفّيها وتلخّصها بأمانة'),
  ],
  units: [
    { id: 'C14-U1', title: L('Organise a worksheet', 'نظّم ورقة العمل'), synopsis: L('Use clear columns, data types and consistent entries.', 'استخدم أعمدة واضحة وأنواع بيانات مناسبة وإدخالات متسقة.') },
    { id: 'C14-U2', title: L('Calculate simple totals', 'احسب مجاميع بسيطة'), synopsis: L('Use SUM and basic arithmetic in a sample budget.', 'استخدم SUM والعمليات الحسابية الأساسية في ميزانية نموذجية.') },
    { id: 'C14-U3', title: L('Sort and filter records', 'رتّب السجلات وصفّها'), synopsis: L('Find relevant entries in a simple data table.', 'ابحث عن الإدخالات المهمة في جدول بيانات بسيط.') },
    { id: 'C14-U4', title: L('Present a useful summary', 'اعرض ملخصاً مفيداً'), synopsis: L('Create a basic chart and check what it actually shows.', 'أنشئ رسماً بيانياً بسيطاً وتحقق مما يُظهره فعلاً.') },
  ],
  practicalTask: L('Build a sample weekly budget or attendance summary with fictional data, one total and one simple chart.', 'أنشئ ميزانية أسبوعية أو ملخص حضور نموذجياً ببيانات افتراضية، مع مجموع واحد ورسم بياني بسيط.'),
  output: L('A sample weekly budget or attendance summary using fictional data.', 'ميزانية أسبوعية أو ملخص حضور نموذجي ببيانات افتراضية.'),
  quiz: [
    {
      prompt: L('Which formula adds the values in cells B2 to B8?', 'أي صيغة تجمع القيم في الخلايا من B2 إلى B8؟'),
      options: [L('=SUM(B2:B8)', '=SUM(B2:B8)'), L('=ADD(B2-B8)', '=ADD(B2-B8)'), L('=B2+B8', '=B2+B8')],
      correct: 0,
      feedback: L('SUM with a range adds every cell from B2 to B8.', 'الدالة SUM مع نطاق تجمع كل الخلايا من B2 إلى B8.'),
      unitIndex: 1,
    },
    {
      prompt: L('Why keep one type of data in each column?', 'لماذا نضع نوعاً واحداً من البيانات في كل عمود؟'),
      options: [L('So calculations, sorting and filters work correctly', 'لكي تعمل الحسابات والترتيب والتصفية بشكل صحيح'), L('It uses less paper', 'لأنه يوفر الورق'), L('It is a rule with no reason', 'إنها قاعدة بلا سبب')],
      correct: 0,
      feedback: L('Consistent columns let the spreadsheet calculate and sort reliably.', 'الأعمدة المتسقة تتيح لجدول البيانات الحساب والترتيب بدقة.'),
      unitIndex: 0,
    },
    {
      prompt: L('You want to see only the records from Monday. What do you use?', 'تريد رؤية سجلات يوم الاثنين فقط. ماذا تستخدم؟'),
      options: [L('A filter on the day column', 'تصفية على عمود اليوم'), L('Delete the other rows', 'حذف الصفوف الأخرى'), L('A new spreadsheet', 'جدول بيانات جديد')],
      correct: 0,
      feedback: L('A filter hides other rows without deleting any data.', 'التصفية تخفي الصفوف الأخرى دون حذف أي بيانات.'),
      unitIndex: 2,
    },
    {
      prompt: L('Before sharing a chart, you should check:', 'قبل مشاركة رسم بياني، يجب أن تتحقق من:'),
      options: [L('That it shows what the data really says', 'أنه يعرض ما تقوله البيانات فعلاً'), L('That it has many colours', 'أنه يحتوي على ألوان كثيرة'), L('That it is as large as possible', 'أنه كبير قدر الإمكان')],
      correct: 0,
      feedback: L('A chart must be checked so it does not give a misleading message.', 'يجب التحقق من الرسم البياني حتى لا يعطي رسالة مضللة.'),
      unitIndex: 3,
    },
    {
      prompt: L('In a weekly budget, income is 50 and costs are 35. What is left?', 'في ميزانية أسبوعية، الدخل 50 والتكاليف 35. كم يتبقى؟'),
      options: [L('15', '15'), L('85', '85'), L('25', '25')],
      correct: 0,
      feedback: L('Income minus costs: 50 minus 35 equals 15.', 'الدخل ناقص التكاليف: 50 ناقص 35 يساوي 15.'),
      unitIndex: 1,
    },
  ],
  resources: ['cashPlan'],
  prerequisites: [],
  image: 'images/generated/course-C14.webp',
  note: L(
    'Illustrative technical taster using fictional data. It does not establish an occupational qualification.',
    'دورة تقنية تعريفية توضيحية ببيانات افتراضية، ولا تمنح مؤهلاً مهنياً.',
  ),
}
