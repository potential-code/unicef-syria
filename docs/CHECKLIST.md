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

## Golden demo (recommended walkthrough)
Presenter menu → **Start golden demo**. It resets the data and opens the demo guide (bottom corner). Each step's **Go here** signs in as the right profile and opens the exact page; **Next** moves on. There are 17 steps in `src/data/golden-demo.ts`.

1. Homepage, then Nour registers ("Use Nour's sample details").
2. Career discovery ("Use preset answers"), results, choose Full-time employment, learning path.
3. AI CV coach saves an honest CV bullet.
4. **Rania (trainer):** accepts Nour and assigns her to K01.
5. **Nour:** "Complete this course (demo)" on C03, then on C05. Points rise; C05 waits for review.
6. **Rania:** approves the C05 practical, marks S02 attendance, recommends the certificate.
7. **Salma (centre admin):** approves and issues the certificate.
8. **Nour:** books mentor Rania (programme allocation), practises an interview, applies to O01.
9. **Karim (employer):** shortlist, interview, offer, confirm job start. **Nour** sees "Hired".
10. **Fadi (partner):** compares the two centres. **Leila (UNICEF):** live activity vs historical outcomes, then follow-up. **Bassam (viewer):** read-only reports.

The extra profiles (Omar, Lina, Hala, Sami, Samer, Maya) sit under "More profiles" on the sign-in page and in the Presenter menu. Use them for the enterprise and freelance routes and for the Not selected branch.

## Known limitations

- There is no enterprise-support host persona (ORG06), so the O06 review and acceptance run through the employer views only when an ORG06 persona exists.
- Learner names, interests and skills stay in English in Arabic mode, because they are profile text entered by the learner.
- The registration and discovery drafts are kept per device and are not cleared by Reset demo.
