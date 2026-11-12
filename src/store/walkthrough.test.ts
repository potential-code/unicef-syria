import { describe, expect, test } from 'bun:test'
import { PRESET_ANSWERS } from '@/data/assessment'
import { balance } from '@/domain/points'
import {
  assignCohort,
  bookMentor,
  cancelBooking,
  chooseRoute,
  completeAssessment,
  decideTrainingApplication,
  generatePath,
  markAttendance,
  moveApplication,
  reviewPractical,
  saveDraft,
  saveProfile,
  setCertificate,
  setUnitStatus,
  startFreshRegistration,
  submitApplication,
  submitPractical,
  submitQuiz,
} from './actions'
import { getDb, resetDemo } from './db'

const nour = () => getDb().youth.Y001

describe('main story: Nour from discovery to employment, across roles', () => {
  test('fresh registration, assessment, route and path', () => {
    resetDemo()
    startFreshRegistration()
    expect(nour().assessment).toBeUndefined()
    expect(nour().cohortIds).toEqual([])
    saveProfile('Y001', nour().profile, true)
    saveProfile('Y001', nour().profile, true)
    expect(balance(nour())).toBe(20)
    completeAssessment('Y001', PRESET_ANSWERS.Y001)
    completeAssessment('Y001', PRESET_ANSWERS.Y001)
    expect(balance(nour())).toBe(50)
    chooseRoute('Y001', 'employment')
    generatePath('Y001')
    expect(nour().plan.slice(0, 4)).toEqual(['C01', 'C02', 'C03', 'C05'])
    expect(nour().badges).toContain('careerExplorer')
  })

  test('trainer accepts and assigns K01; attendance counts once', () => {
    decideTrainingApplication('Y001', 'accepted')
    assignCohort('Y001', 'K01')
    expect(nour().cohortIds).toEqual(['K01'])
    markAttendance('Y001', 'S02', 'present')
    markAttendance('Y001', 'S02', 'present')
    expect(balance(nour())).toBe(70)
  })

  test('cohort course needs trainer approval; points and certificate flow', () => {
    for (const i of [0, 1, 2, 3]) setUnitStatus('Y001', 'C05', i, 'done')
    submitQuiz('Y001', 'C05', 60)
    submitQuiz('Y001', 'C05', 100)
    submitPractical('Y001', 'C05')
    expect(nour().progress.C05?.completedAt).toBeUndefined()
    reviewPractical('Y001', 'C05', true)
    expect(nour().progress.C05?.completedAt).toBeDefined()
    expect(nour().progress.C05?.certificate).toBe('pendingReview')
    expect(balance(nour())).toBe(130)
    setCertificate('Y001', 'C05', 'recommended')
    setCertificate('Y001', 'C05', 'approved')
    setCertificate('Y001', 'C05', 'issued')
    expect(nour().progress.C05?.certificate).toBe('issued')
  })

  test('mentor booking deducts once and cancelling refunds once', () => {
    expect(bookMentor('Y001', 'M05', 'Interview', 'How to prepare?', 'points')).toBe('ok')
    expect(bookMentor('Y001', 'M05', 'Again', '?', 'points')).toBe('alreadyBooked')
    expect(balance(nour())).toBe(30)
    const b = getDb().bookings.find((x) => x.youthId === 'Y001')
    cancelBooking(b?.id ?? '')
    cancelBooking(b?.id ?? '')
    expect(balance(nour())).toBe(130)
  })

  test('application: offer is not a placement, hired is', () => {
    const id = saveDraft('Y001', 'O01', {
      documents: { cv: true },
      motivation: 'I enjoy helping customers.',
    })
    submitApplication(id)
    moveApplication(id, 'underReview')
    moveApplication(id, 'shortlisted')
    moveApplication(id, 'interview')
    moveApplication(id, 'offer')
    expect(getDb().outcomes.filter((o) => o.youthId === 'Y001')).toHaveLength(0)
    moveApplication(id, 'hired')
    const app = getDb().applications.find((a) => a.id === id)
    expect(app?.stage).toBe('hired')
    expect(app?.timeline.map((e) => e.stage)).toEqual([
      'draft',
      'submitted',
      'underReview',
      'shortlisted',
      'interview',
      'offer',
      'hired',
    ])
    expect(getDb().outcomes.find((o) => o.youthId === 'Y001')?.type).toBe('job')
  })

  test('reset restores the seeded snapshot together', () => {
    resetDemo()
    expect(balance(nour())).toBe(80)
    expect(nour().cohortIds).toEqual(['K01'])
    expect(getDb().outcomes).toHaveLength(0)
    expect(getDb().bookings).toHaveLength(0)
  })
})
