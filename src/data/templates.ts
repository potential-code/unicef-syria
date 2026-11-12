import type { Template, TemplateId } from '@shared/types'
import { L } from './l'

// Brief §6 "Resource examples". Editable plain-text templates; Arabic body is a placeholder.
export const TEMPLATES: Template[] = [
  {
    id: 'actionPlan',
    title: L('Career action plan', 'خطة العمل المهنية'),
    body: L(
      `CAREER ACTION PLAN

Name:
Date:
Route I am exploring (employment, enterprise or freelance):

My strengths and interests:
-
-

STEP 1. My goal for the next month
What I want to achieve:
How I will know I achieved it:

STEP 2. My learning action
Course or activity:
When I will do it:

STEP 3. My milestone
What I will be able to show:
Target date:

Who can support me (trainer, mentor, peer):
Review date:`,
      '',
    ),
  },
  {
    id: 'cvOutline',
    title: L('CV outline', 'مخطط السيرة الذاتية'),
    body: L(
      `CV OUTLINE

FULL NAME
Phone | Email | City

SUMMARY (2 lines)
Type of role I am looking for and one or two strengths:

EDUCATION (most recent first)
Certificate or course, place, year:

EXPERIENCE (paid, volunteer, family business, events)
Role or activity, place, dates:
- Action verb + what I did + for whom:
- Action verb + what I did + for whom:

PRACTICAL PROJECTS AND COURSE OUTPUTS
Project name, what I produced:

SKILLS
Digital:
Communication:
Other:

LANGUAGES
Language and level:

Reminder: keep it true, no ID number, no invented numbers.`,
      '',
    ),
  },
  {
    id: 'starWorksheet',
    title: L('Interview STAR worksheet', 'ورقة عمل STAR للمقابلة'),
    body: L(
      `INTERVIEW STAR WORKSHEET

Interview question:

SITUATION
Where were you and what was happening?

TASK
What did you need to do?

ACTION
What did you do yourself? (use "I", not only "we")
1.
2.

RESULT
What happened in the end? What did you learn?

One-sentence summary of my answer:

Self-rating (developing / clear / strong):
What I will improve next time:`,
      '',
    ),
  },
  {
    id: 'customerInterview',
    title: L('Customer interview guide', 'دليل مقابلة العملاء'),
    body: L(
      `CUSTOMER INTERVIEW GUIDE

Interviewee (type of customer, no full name needed):
Date:

PROBLEM I AM EXPLORING
Customer:
What they are trying to do:
What gets in the way:

OPEN QUESTIONS ABOUT CURRENT BEHAVIOUR
1. How do you handle this at the moment?
2. Tell me about the last time this happened.
3. What have you already tried to fix it?
4. What is the hardest part of this for you?

NOTES (their exact words)
-
-

What surprised me:
Keep / change / test next:

Reminder: do not pitch your idea during the interview.`,
      '',
    ),
  },
  {
    id: 'cashPlan',
    title: L('Business cash-plan grid', 'جدول الخطة النقدية للمشروع'),
    body: L(
      `BUSINESS CASH-PLAN GRID (fictional amounts only)

Business idea:
Currency used for this example:

                      Month 1   Month 2   Month 3
CASH IN
Sales
Other income
Total cash in

CASH OUT
Setup costs
Materials
Transport
Phone and internet
Other regular costs
Total cash out

NET CASH (in minus out)
Cash at end of month

Cautious example: what changes if sales are lower?
Assumptions to check:`,
      '',
    ),
  },
  {
    id: 'proposal',
    title: L('Freelance proposal template', 'قالب عرض العمل الحر'),
    body: L(
      `FREELANCE PROPOSAL

To (client):
From:
Date:

YOUR GOAL
In one sentence, what you want to achieve:

WHAT I WILL DELIVER
-
-
Rounds of changes included:

RELEVANT EXPERIENCE AND SAMPLES
Sample 1 (label sample work clearly):
Sample 2:

TIMELINE
Start:
Review point:
Final delivery:

ASSUMPTIONS (what I need from you)
-

FEE OR AVAILABILITY
Proposed fee or hours per week:

NEXT STEP
Suggested next step (for example, a short call):`,
      '',
    ),
  },
  {
    id: 'portfolioChecklist',
    title: L('Portfolio checklist', 'قائمة تحقق ملف الأعمال'),
    body: L(
      `PORTFOLIO CHECKLIST

Service I offer:

FOR EACH SAMPLE
[ ] It matches the service I offer
[ ] It is my own original work, or I state my part clearly
[ ] Sample work for a fictional business is labelled "sample work"
[ ] Images, fonts and text are mine or free to use
[ ] Short description: task, approach, result
[ ] No claimed results I cannot show

WHOLE PORTFOLIO
[ ] Two or three of my best relevant samples
[ ] Links open and files are named clearly
[ ] Contact details and availability are up to date
[ ] No private client information is shown
[ ] A trainer or peer has reviewed it

Next sample I want to create:`,
      '',
    ),
  },
]

export const TEMPLATE_BY_ID = Object.fromEntries(TEMPLATES.map((t) => [t.id, t])) as Record<TemplateId, Template>
