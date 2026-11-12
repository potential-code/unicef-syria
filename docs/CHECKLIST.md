# Brief §24 acceptance checks

| Check                                                                                                             | Status | Where                                                                                             |
| ----------------------------------------------------------------------------------------------------------------- | ------ | ------------------------------------------------------------------------------------------------- |
| All seven role views and the optional reporting viewer open with the correct navigation and scope                 | Done   | Sign-in cards and Presenter menu; `src/config/nav.ts`; `src/domain/access.ts`                     |
| All three routes work from assessment result to learning, career tools and a relevant opportunity                 | Done   | `/youth/discovery/results`, `/youth/path`, `/youth/toolkit`, `/youth/opportunities`               |
| 12 assessment questions, scoring, results and route override work; results visibly illustrative                   | Done   | `/youth/discovery`; tests in `src/domain/domain.test.ts`                                          |
| 16 courses with four units; C05, C07, C11 fully written with lessons, quizzes and practical outputs               | Done   | `/youth/library`, `/youth/learn/$courseId/$unit`, `src/data/courses`                              |
| Open e-learning and restricted cohort sessions separated; non-members cannot see restricted sessions              | Done   | `/youth/cohort` (shows count of hidden sessions)                                                  |
| Five AI coaches with working scripted branches saving editable outputs to the right toolkit section               | Done   | `/youth/coaches/$coachId`                                                                         |
| Five fictional mentors with access rules, availability, booking and follow-up; points deducted once               | Done   | `/youth/mentors/$mentorId`; `src/store/walkthrough.test.ts`                                       |
| Jobs, internships, part-time, freelance and enterprise support use their own application stages                   | Done   | `src/domain/application-stages.ts`, `/youth/applications/$appId`, `/employer/applications/$appId` |
| Trainer grading, attendance and centre certificate approval update the learner record                             | Done   | `/trainer/assessments`, `/trainer/sessions/$sessionId`, `/centre/results`                         |
| Denominators, follow-up eligibility and sample labels visible; totals reconcile; historical separate from current | Done   | `/unicef`, `/unicef/outcomes`; KPI tests reconcile to the brief's numbers                         |
| English and Arabic key screens, mobile layout, keyboard navigation, empty and error states                        | Done   | Language toggle on every screen; checked at 390px in Arabic with no sideways scroll               |
| Reset restores a consistent demo; nothing leaves the prototype                                                    | Done   | Presenter → Reset demo; no network calls at runtime                                               |

## Recommended walkthrough order

1. **Nour (main story).** Homepage → Start my journey → "Use Nour's sample details" → career discovery (Use preset answers) → choose Full-time employment → path → C05 Unit 3 → Lina AI CV bullet.
   Switch to Rania: accept and assign K01, mark attendance, review the C05 practical.
   Back to Nour: course complete and points up → book a mentor → interview practice → O01 apply.
   Switch to Karim: shortlist, interview, offer, hired. Back to Nour: timeline.
   Switch to Leila (UNICEF): current activity vs historical outcomes → follow-up.
2. **Omar.** Enterprise route → C07 → Amal AI questions → business concept → book Samer → O06 application.
3. **Lina.** Freelance route → C11 → Ziad AI proposal → O04.
   Switch to Hala: client discussion, then selected, then completed.
4. **Not selected branch.** Karim marks Sami's O01 application Not selected → sign in as Sami to see the feedback and next steps.

## Known limitations

- There is no enterprise-support host persona (ORG06), so the O06 review and acceptance run through the employer views only when an ORG06 persona exists.
- Learner names, interests and skills stay in English in Arabic mode, because they are profile text entered by the learner.
- The registration and discovery drafts are kept per device and are not cleared by Reset demo.
