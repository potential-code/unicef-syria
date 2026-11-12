# Assumptions and open items

For Rawzaba's internal review before the UNICEF walkthrough (week of 23 November 2026).

## Assumptions made in the mockup

- **Name and branding.** "UNICEF Syria Youth Pathways" is used as a working name only. Colours (cyan `#00AEEF`, blue `#0047BB`, dark blue, yellow, orange) and the Noto Sans font come from the public unicef.org/syria site.
- **Logos.** The blue logo was provided by Aliya. The white logo was downloaded from the public unicef.org/syria site. **Neither has been formally cleared for this use.**
- **Images.** All people and scenes are AI-generated photoreal images of fictional adults: youth aged 18–24, staff 28–50. No real people appear.
- **Mentor cards.** The brief asks for "placeholder avatars". Mentor and trainer cards use AI photoreal faces instead, each marked "Sample mentor profile".
- **Seed data.** All people, organisations, centres, vacancies, sessions, courses and statistics are fictional demonstration data.
- **Two data layers on reports:**
  - Current cohort activity: the three named youth and cohorts K01–K03.
  - Historical outcomes: a separate synthetic dataset, snapshot 1 Nov 2026, that is never derived from the named youth.
- **Demo clock.** The demo clock starts on 20 Nov 2026 (Syria time), so S01 on 17 Nov appears as a completed historical session.
- **Starting points.** Each named youth begins with the points balance stated in the brief (80, 120, 90), shown as one "points earned before this demo" entry. Earlier activities never earn points again.
- **Reviewed and auto-issued courses.**
  - Trainer review and centre certificate approval apply to cohort courses: K01 C05 and C13, K02 C07 and C08, K03 C11 and C15.
  - Other self-paced courses issue their demonstration certificate automatically once the requirements are met.
- **Main story.**
  - Registering from the homepage creates a fresh "Nour" (no assessment, pending training application) for the main story.
  - Signing in with the Nour card opens her mid-journey seeded state instead.
- **Not selected branch.** The employment Not selected branch uses a fourth sample learner, Sami Ahmad (Y007), who applied to O01.
- **Arabic.**
  - Navigation, key journey screens, assessment, coach scripts and course titles are in Arabic, with right-to-left layout.
  - Long course body text is English, labelled "Arabic content placeholder", as the brief allows.
  - The Arabic was drafted by AI and has not had a native-speaker review.
- **Reporting viewer.** This optional read-only role is included and labelled "Optional role, not a confirmed UNICEF requirement".
- **What is simulated.** AI coaches are scripted branching demos, not live AI. Verification, uploads, online session rooms, notifications and exports are all simulated inside the prototype.

## Open items for a later implementation discussion (from brief §25)

- Eligible ages, approved branding and programme name.
- Arabic content requirements.
- Validated assessment framework.
- Real TVET catalogue and centres.
- Mentor roster and enterprise-support partners.
- Data residency, integrations, privacy and safeguarding requirements.
- Agreed KPI definitions.

None of these block the fictional prototype. Nothing here implies a client commitment or production scope.

## Interpretations of the brief

- O01 lists "CV, C03 and C13 evidence, short motivation answer". The main walkthrough (§23 step 5) submits the CV and motivation answer after Nour completes one course, so completing either C03 or C13 satisfies the course evidence; the other appears as a gap in the match explanation.
- Motion follows the presenter's "Reduce motion" toggle (Presenter menu), not the operating-system setting, so animations still play on presentation laptops where system animation effects are turned off. A production build would also respect the system setting.
