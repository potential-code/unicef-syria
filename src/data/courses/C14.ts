import type { Course } from '@shared/types'
import { L } from '../l'

// Brief §10. Illustrative technical taster for all routes. Every unit has a full lesson.
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
    L(
      'Calculate totals with SUM and simple arithmetic',
      'تحسب المجاميع باستخدام SUM والعمليات البسيطة',
    ),
    L('Sort, filter and summarise data honestly', 'ترتّب البيانات وتصفّيها وتلخّصها بأمانة'),
  ],
  units: [
    {
      id: 'C14-U1',
      title: L('Organise a worksheet', 'نظّم ورقة العمل'),
      synopsis: L(
        'Use clear columns, data types and consistent entries.',
        'استخدم أعمدة واضحة وأنواع بيانات مناسبة وإدخالات متسقة.',
      ),
      objective: L(
        'Set up a worksheet with clear headings, one data type per column and consistent entries.',
        'تنشئ ورقة عمل بعناوين واضحة ونوع بيانات واحد لكل عمود وإدخالات متسقة.',
      ),
      body: L(
        'A spreadsheet is only as useful as its structure. Before you type any data, decide what each column will hold and write a short heading in the first row, such as Date, Item, Category and Amount. Keep one type of data in each column. Numbers go in number columns without words like "SYP" typed beside them; put the currency in the heading instead. Dates should all use the same format. For categories, agree a short list and spell each one the same way every time, because "Food" and "food " may be counted as different things. Avoid empty rows in the middle of your table and do not merge cells. Freeze the heading row so it stays visible as you scroll. These small habits make totals, sorting and charts work correctly later.',
        '',
      ),
      scenario: L(
        'Rania wants to track her weekly spending. She creates four columns: Date, Item, Category and Amount (SYP). She picks three categories, food, transport and phone, and types them the same way every time.',
        'تريد رانيا متابعة مصروفها الأسبوعي. تنشئ أربعة أعمدة: التاريخ، والبند، والفئة، والمبلغ (ليرة سورية). تختار ثلاث فئات هي الطعام والمواصلات والهاتف، وتكتبها بالطريقة نفسها في كل مرة.',
      ),
      takeaway: L(
        'Plan your columns first: one heading, one data type and one spelling for each category.',
        'خطّط لأعمدتك أولاً: عنوان واحد ونوع بيانات واحد وطريقة كتابة واحدة لكل فئة.',
      ),
      check: {
        prompt: L(
          'Where should you write the currency for an Amount column?',
          'أين يجب أن تكتب العملة في عمود المبلغ؟',
        ),
        options: [
          L('In the column heading', 'في عنوان العمود'),
          L('After every number in the cell', 'بعد كل رقم داخل الخلية'),
          L('In a merged cell above the table', 'في خلية مدمجة فوق الجدول'),
        ],
        correct: 0,
        feedback: L(
          'Keep cells as plain numbers so the spreadsheet can calculate. The heading tells the reader the currency.',
          'اجعل الخلايا أرقاماً فقط ليتمكن الجدول من الحساب، والعنوان يوضح العملة للقارئ.',
        ),
      },
      hasVideo: true,
      transcript: L(
        'Welcome to Spreadsheet Skills for Everyday Work. In this first lesson we set up a clean worksheet. Before typing any data, plan your columns. Write a short heading for each one in the first row: for example, Date, Item, Category and Amount. Keep one kind of data in each column. Put the currency in the heading, not beside every number. Choose a short list of categories and spell them the same way each time. These habits sound small, but they make every calculation, filter and chart in the next lessons work properly.',
        '',
      ),
    },
    {
      id: 'C14-U2',
      title: L('Calculate simple totals', 'احسب مجاميع بسيطة'),
      synopsis: L(
        'Use SUM and basic arithmetic in a sample budget.',
        'استخدم SUM والعمليات الحسابية الأساسية في ميزانية نموذجية.',
      ),
      objective: L(
        'Use SUM and basic arithmetic to calculate totals in a sample budget.',
        'تستخدم SUM والعمليات الحسابية الأساسية لحساب المجاميع في ميزانية نموذجية.',
      ),
      body: L(
        'Spreadsheets save time because they calculate for you. Every formula starts with an equals sign. For simple arithmetic, use + to add, - to subtract, * to multiply and / to divide. For example, =B2*C2 multiplies a quantity by a price. To add a whole column, use SUM with a range: =SUM(D2:D10) adds every cell from D2 to D10. In a weekly budget, you might total income in one cell, total costs in another, and then subtract: =F2-F3 shows what is left. Always check a formula with numbers you can calculate in your head. If the result looks wrong, click the cell and read the formula. Common mistakes are a range that misses the last row or a number typed as text. Never type a total by hand, because it will not update.',
        '',
      ),
      scenario: L(
        'Karim builds a sample weekly budget for a small phone accessories stall. He lists costs in column D and uses =SUM(D2:D8) for the total. He checks the result with a quick mental sum before trusting it.',
        'يعدّ كريم ميزانية أسبوعية نموذجية لبسطة صغيرة لبيع إكسسوارات الهواتف. يكتب التكاليف في العمود D ويستخدم =SUM(D2:D8) لحساب المجموع، ثم يتحقق من النتيجة بجمع سريع في ذهنه قبل أن يعتمد عليها.',
      ),
      takeaway: L(
        'Start every formula with =, use SUM for ranges, and check results with numbers you know.',
        'ابدأ كل صيغة بعلامة =، واستخدم SUM للنطاقات، وتحقق من النتائج بأرقام تعرفها.',
      ),
      check: {
        prompt: L(
          'Income is in F2 and total costs are in F3. Which formula shows what is left?',
          'الدخل في F2 ومجموع التكاليف في F3. أي صيغة تُظهر المتبقي؟',
        ),
        options: [L('=F2-F3', '=F2-F3'), L('=F2+F3', '=F2+F3'), L('F2 minus F3', 'F2 ناقص F3')],
        correct: 0,
        feedback: L(
          'Subtract costs from income, and start with = so the spreadsheet calculates it.',
          'اطرح التكاليف من الدخل، وابدأ بعلامة = لكي يحسبها الجدول.',
        ),
      },
    },
    {
      id: 'C14-U3',
      title: L('Sort and filter records', 'رتّب السجلات وصفّها'),
      synopsis: L(
        'Find relevant entries in a simple data table.',
        'ابحث عن الإدخالات المهمة في جدول بيانات بسيط.',
      ),
      objective: L(
        'Sort and filter a data table to find the records you need without losing data.',
        'ترتّب جدول بيانات وتصفّيه للعثور على السجلات التي تحتاجها دون فقدان أي بيانات.',
      ),
      body: L(
        'When a table grows past a few rows, finding things by eye becomes slow. Sorting changes the order of rows, for example from the newest date to the oldest or from the largest amount to the smallest. Before you sort, select the whole table, not one column, or the rows will be mixed up and names will no longer match their numbers. Filtering hides rows that do not match a condition, such as only showing Monday or only the transport category. Hidden rows are not deleted, and you can clear the filter at any time. Turn on filters from the heading row so each column gets a small dropdown. You can combine filters, for example absent participants in week two. When you finish, clear filters so the next person sees the full table.',
        '',
      ),
      scenario: L(
        'Maya has an attendance table for a sample youth club. Her coordinator asks who missed sessions in the second week. Maya turns on filters, selects week two and status absent, shares the short list, then clears the filters.',
        'لدى مايا جدول حضور لنادٍ شبابي نموذجي. تسألها المنسقة عمّن تغيّب عن الجلسات في الأسبوع الثاني. تفعّل مايا التصفية، وتختار الأسبوع الثاني وحالة الغياب، وتشارك القائمة القصيرة، ثم تلغي التصفية.',
      ),
      takeaway: L(
        'Sort the whole table, filter to find what you need, and clear filters when you finish.',
        'رتّب الجدول كاملاً، واستخدم التصفية للعثور على ما تحتاجه، وألغِ التصفية عند الانتهاء.',
      ),
      check: {
        prompt: L(
          'What happens to rows hidden by a filter?',
          'ماذا يحدث للصفوف التي تخفيها التصفية؟',
        ),
        options: [
          L(
            'They stay in the table and return when the filter is cleared',
            'تبقى في الجدول وتعود عند إلغاء التصفية',
          ),
          L('They are deleted', 'تُحذف'),
          L('They move to a new sheet', 'تنتقل إلى ورقة جديدة'),
        ],
        correct: 0,
        feedback: L(
          'Filters only hide rows. Your data is safe and returns when you clear the filter.',
          'التصفية تخفي الصفوف فقط، وبياناتك آمنة وتعود عند إلغاء التصفية.',
        ),
      },
      hasVideo: true,
      transcript: L(
        'In this lesson we find information quickly. Imagine an attendance table with forty rows. Your coordinator asks who was absent in week two. You could scroll and search by eye, or you could filter. Turn on filters from the heading row. Choose week two in the week column and absent in the status column. Now only the rows you need are visible. Nothing has been deleted. When you have shared the list, clear the filters. One more tip: when sorting, always select the whole table so every row stays together.',
        '',
      ),
    },
    {
      id: 'C14-U4',
      title: L('Present a useful summary', 'اعرض ملخصاً مفيداً'),
      synopsis: L(
        'Create a basic chart and check what it actually shows.',
        'أنشئ رسماً بيانياً بسيطاً وتحقق مما يُظهره فعلاً.',
      ),
      objective: L(
        'Create a basic chart and check that it shows the data honestly.',
        'تنشئ رسماً بيانياً بسيطاً وتتحقق من أنه يعرض البيانات بأمانة.',
      ),
      body: L(
        'A chart helps people see a pattern quickly, but only if it is honest and clear. Start with a question, such as "Which category costs the most each week?" Then make a small summary table that answers it, for example a total for each category. Choose the chart type to match: a bar or column chart compares categories, and a line chart shows change over time. Give the chart a title that states what it shows and label the axes with units. Check that the vertical axis starts at zero for bar charts, otherwise small differences can look huge. Avoid 3D effects and too many colours. Finally, read the chart as if you were seeing it for the first time and ask: does it say what the numbers really say? Add one sentence underneath that explains the main point.',
        '',
      ),
      scenario: L(
        'Salma makes a column chart of weekly attendance for a sample course. The chart suggests attendance fell sharply, but she notices the axis starts at 18. She resets it to zero and adds a note: attendance was stable, between 18 and 21.',
        'تنشئ سلمى رسماً بيانياً بالأعمدة للحضور الأسبوعي في دورة نموذجية. يوحي الرسم بأن الحضور انخفض بشدة، لكنها تلاحظ أن المحور يبدأ من 18. تعيده ليبدأ من الصفر وتضيف ملاحظة: كان الحضور مستقراً بين 18 و21.',
      ),
      takeaway: L(
        'Start from a question, pick the right chart, and check it tells the truth before you share it.',
        'ابدأ بسؤال، واختر الرسم المناسب، وتحقق من أنه يقول الحقيقة قبل مشاركته.',
      ),
      check: {
        prompt: L(
          "A bar chart's vertical axis starts at 90 instead of 0. What is the risk?",
          'يبدأ المحور العمودي في رسم بالأعمدة من 90 بدلاً من 0. ما الخطر؟',
        ),
        options: [
          L(
            'Small differences look much bigger than they are',
            'تبدو الفروق الصغيرة أكبر بكثير من حقيقتها',
          ),
          L('The chart becomes more accurate', 'يصبح الرسم أكثر دقة'),
          L('There is no risk', 'لا يوجد أي خطر'),
        ],
        correct: 0,
        feedback: L(
          'Starting bar charts at zero keeps the comparison fair and avoids a misleading message.',
          'بدء الرسوم بالأعمدة من الصفر يحافظ على مقارنة عادلة ويمنع الرسائل المضللة.',
        ),
      },
    },
  ],
  practicalTask: L(
    'Build a sample weekly budget or attendance summary with fictional data, one total and one simple chart.',
    'أنشئ ميزانية أسبوعية أو ملخص حضور نموذجياً ببيانات افتراضية، مع مجموع واحد ورسم بياني بسيط.',
  ),
  output: L(
    'A sample weekly budget or attendance summary using fictional data.',
    'ميزانية أسبوعية أو ملخص حضور نموذجي ببيانات افتراضية.',
  ),
  quiz: [
    {
      prompt: L(
        'Which formula adds the values in cells B2 to B8?',
        'أي صيغة تجمع القيم في الخلايا من B2 إلى B8؟',
      ),
      options: [
        L('=SUM(B2:B8)', '=SUM(B2:B8)'),
        L('=ADD(B2-B8)', '=ADD(B2-B8)'),
        L('=B2+B8', '=B2+B8'),
      ],
      correct: 0,
      feedback: L(
        'SUM with a range adds every cell from B2 to B8.',
        'الدالة SUM مع نطاق تجمع كل الخلايا من B2 إلى B8.',
      ),
      unitIndex: 1,
    },
    {
      prompt: L(
        'Why keep one type of data in each column?',
        'لماذا نضع نوعاً واحداً من البيانات في كل عمود؟',
      ),
      options: [
        L(
          'So calculations, sorting and filters work correctly',
          'لكي تعمل الحسابات والترتيب والتصفية بشكل صحيح',
        ),
        L('It uses less paper', 'لأنه يوفر الورق'),
        L('It is a rule with no reason', 'إنها قاعدة بلا سبب'),
      ],
      correct: 0,
      feedback: L(
        'Consistent columns let the spreadsheet calculate and sort reliably.',
        'الأعمدة المتسقة تتيح لجدول البيانات الحساب والترتيب بدقة.',
      ),
      unitIndex: 0,
    },
    {
      prompt: L(
        'You want to see only the records from Monday. What do you use?',
        'تريد رؤية سجلات يوم الاثنين فقط. ماذا تستخدم؟',
      ),
      options: [
        L('A filter on the day column', 'تصفية على عمود اليوم'),
        L('Delete the other rows', 'حذف الصفوف الأخرى'),
        L('A new spreadsheet', 'جدول بيانات جديد'),
      ],
      correct: 0,
      feedback: L(
        'A filter hides other rows without deleting any data.',
        'التصفية تخفي الصفوف الأخرى دون حذف أي بيانات.',
      ),
      unitIndex: 2,
    },
    {
      prompt: L(
        'Before sharing a chart, you should check:',
        'قبل مشاركة رسم بياني، يجب أن تتحقق من:',
      ),
      options: [
        L('That it shows what the data really says', 'أنه يعرض ما تقوله البيانات فعلاً'),
        L('That it has many colours', 'أنه يحتوي على ألوان كثيرة'),
        L('That it is as large as possible', 'أنه كبير قدر الإمكان'),
      ],
      correct: 0,
      feedback: L(
        'A chart must be checked so it does not give a misleading message.',
        'يجب التحقق من الرسم البياني حتى لا يعطي رسالة مضللة.',
      ),
      unitIndex: 3,
    },
    {
      prompt: L(
        'In a weekly budget, income is 50 and costs are 35. What is left?',
        'في ميزانية أسبوعية، الدخل 50 والتكاليف 35. كم يتبقى؟',
      ),
      options: [L('15', '15'), L('85', '85'), L('25', '25')],
      correct: 0,
      feedback: L(
        'Income minus costs: 50 minus 35 equals 15.',
        'الدخل ناقص التكاليف: 50 ناقص 35 يساوي 15.',
      ),
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
