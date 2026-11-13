import { describe, expect, test } from 'bun:test'
import { PRESET_ANSWERS } from '@/data/assessment'
import { OPPORTUNITIES } from '@/data/opportunities'
import { PERSONA_BY_ID } from '@/data/personas'
import { canSeeYouth } from '@/domain/access'
import { balance } from '@/domain/points'
import { requirementsFor } from '@/features/career/lib/match'
import {
  addCvBullet,
  addInterviewPractice,
  applyToProgramme,
  assignCohort,
  bookMentor,
  chooseRoute,
  completeAssessment,
  completeCourseShortcut,
  decideTrainingApplication,
  generatePath,
  markAttendance,
  moveApplication,
  reviewPractical,
  saveDraft,
  saveProfile,
  setCertificate,
  startFreshRegistration,
  submitApplication,
} from './actions'
import { getDb, resetDemo } from './db'

const nour = () => getDb().youth.Y001

/** The golden demo script (src/data/golden-demo.ts) run through the store, step by step. */
describe('golden demo runs end to end', () => {
  test('register, discovery, route, path, CV coach', () => {
    resetDemo()
    startFreshRegistration()
    saveProfile('Y001', nour().profile, true)
    completeAssessment('Y001', PRESET_ANSWERS.Y001)
    chooseRoute('Y001', 'employment')
    generatePath('Y001')
    addCvBullet(
      'Y001',
      'Supported participant registration and maintained the attendance list for a training event.',
    )
    expect(nour().plan).toContain('C05')
    expect(nour().toolkit.cv?.experience.length).toBe(1)
  })

  test('Nour applies to Employment Readiness; Rania is notified, accepts and assigns K01', () => {
    expect(nour().trainingApplication).toBeUndefined()
    expect(getDb().applications.filter((a) => a.youthId === 'Y001')).toEqual([])
    applyToProgramme('Y001', 'PR01', 'I want to work in customer service.', 'Weekday mornings')
    expect(nour().trainingApplication?.status).toBe('pending')
    expect(getDb().notices.some((n) => n.to === 'TR01' && n.kind === 'programmeApplied')).toBe(true)
    expect(canSeeYouth(PERSONA_BY_ID.TR01, nour())).toBe(true)
    decideTrainingApplication('Y001', 'accepted')
    assignCohort('Y001', 'K01')
    expect(nour().cohortIds).toEqual(['K01'])
    expect(
      getDb()
        .notices.filter((n) => n.to === 'Y001')
        .map((n) => n.kind),
    ).toEqual(['cohortAssigned', 'programmeDecision'])
  })

  test('Nour completes C03 (auto) and C05 (waits for review); Rania approves; Salma issues', () => {
    completeCourseShortcut('Y001', 'C03')
    completeCourseShortcut('Y001', 'C05')
    expect(nour().progress.C03?.certificate).toBe('issued')
    expect(nour().progress.C05?.practical).toBe('submitted')
    expect(nour().progress.C05?.completedAt).toBeUndefined()
    reviewPractical('Y001', 'C05', true)
    markAttendance('Y001', 'S02', 'present')
    setCertificate('Y001', 'C05', 'recommended')
    setCertificate('Y001', 'C05', 'approved')
    setCertificate('Y001', 'C05', 'issued')
    expect(nour().progress.C05?.certificate).toBe('issued')
    expect(nour().graduated).toBeDefined()
    expect(getDb().followUps.find((f) => f.youthId === 'Y001')?.status).toBe('due')
    // profile 20 + assessment 30 + C03 40 + C05 practical 20 + C05 40 + attendance 20
    expect(balance(nour())).toBe(170)
  })

  test('mentor via programme allocation, interview practice, O01 application ready', () => {
    expect(
      bookMentor(
        'Y001',
        'M01',
        'Interview prep',
        'How do I answer teamwork questions?',
        'allocation',
      ),
    ).toBe('ok')
    addInterviewPractice(
      'Y001',
      'Tell me about helping a customer.',
      'I registered participants...',
      'clear',
      'Add a result.',
    )
    const o01 = OPPORTUNITIES.find((o) => o.id === 'O01')
    if (!o01) throw new Error('O01 missing')
    const reqs = requirementsFor(nour(), o01, {
      attachCv: true,
      attachBusiness: false,
      motivation: 'I enjoy helping customers and keeping records accurate.',
      portfolioFile: null,
      workSampleFile: null,
      proposalId: '',
    })
    expect(reqs.filter((r) => !r.met)).toEqual([])
  })

  test('Karim hires Nour; Nour sees Hired; outcome reaches reports', () => {
    const id = saveDraft('Y001', 'O01', {
      documents: { cv: true },
      motivation: 'I enjoy helping customers.',
    })
    submitApplication(id)
    for (const s of ['underReview', 'shortlisted', 'interview', 'offer', 'hired'] as const)
      moveApplication(id, s)
    expect(getDb().applications.find((a) => a.id === id)?.stage).toBe('hired')
    expect(
      getDb().outcomes.some((o) => o.youthId === 'Y001' && o.type === 'job' && o.confirmed),
    ).toBe(true)
  })
})
