import { describe, expect, test } from 'bun:test'
import { ANALYTICS_ROWS } from '@/data/analytics'
import { PRESET_ANSWERS, QUESTIONS } from '@/data/assessment'
import { COURSES } from '@/data/courses'
import { L } from '@/data/l'
import { seedYouth } from '@/data/youth'
import { nextStage, STAGES } from './application-stages'
import { courseProgressPct, isComplete, missingRequirements } from './completion'
import { filterRows, kpis, sumRows } from './kpi'
import { award, balance, hasAwarded } from './points'
import { arrangeOptions } from './quiz'
import { profileFor, recommendedRoute, scoreAnswers } from './scoring'

describe('assessment', () => {
  test('12 questions with four options in P C I O order', () => {
    expect(QUESTIONS).toHaveLength(12)
    for (const q of QUESTIONS)
      expect(q.options.map((o) => o.dimension)).toEqual(['P', 'C', 'I', 'O'])
  })
  test('scores always total 24 and presets match the seeded youth', () => {
    const youth = seedYouth()
    for (const id of ['Y001', 'Y002', 'Y003'] as const) {
      const s = scoreAnswers(PRESET_ANSWERS[id])
      expect(s.P + s.C + s.I + s.O).toBe(24)
      expect(s).toEqual(youth[id].assessment?.scores as typeof s)
    }
  })
  test('profile names and ties', () => {
    expect(profileFor({ C: 12, O: 8, P: 2, I: 2 }).name?.en).toBe('People-focused coordinator')
    expect(profileFor({ I: 8, C: 8, P: 4, O: 4 }).name?.en).toBe('Enterprising communicator')
    expect(profileFor({ P: 6, C: 6, I: 6, O: 6 }).balanced).toBe(true)
  })
  test('earning model drives the route', () => {
    expect(recommendedRoute('salary')).toBe('employment')
    expect(recommendedRoute('business')).toBe('enterprise')
    expect(recommendedRoute('projects')).toBe('freelance')
  })
})

describe('points', () => {
  test('a key is never awarded twice, including seeded keys', () => {
    const y = seedYouth().Y001
    const start = balance(y)
    expect(start).toBe(80)
    expect(award(y, 'profile', 'profile', 20, L('x'), 'now')).toBe(y)
    const once = award(y, 'course:C05', 'course', 40, L('x'), 'now')
    const twice = award(once, 'course:C05', 'course', 40, L('x'), 'now')
    expect(balance(twice)).toBe(120)
    expect(hasAwarded(twice, 'course:C05')).toBe(true)
  })
  test('seeded balances match the brief', () => {
    const y = seedYouth()
    expect([balance(y.Y001), balance(y.Y002), balance(y.Y003)]).toEqual([80, 120, 90])
  })
})

describe('courses and completion', () => {
  test('16 courses with four units and a five-question quiz', () => {
    expect(COURSES).toHaveLength(16)
    for (const c of COURSES) {
      expect(c.units).toHaveLength(4)
      expect(c.quiz).toHaveLength(5)
    }
  })
  test('showcase courses are fully written', () => {
    for (const c of COURSES.filter((x) => ['C05', 'C07', 'C11'].includes(x.id))) {
      for (const u of c.units)
        expect(u.body && u.check && u.scenario && u.objective && u.takeaway).toBeTruthy()
    }
  })
  test('completion needs units, quiz and practical; cohort practical needs approval', () => {
    const p = {
      courseId: 'C05' as const,
      units: ['done', 'done', 'done', 'done'] as const,
      quizAttempts: [80],
      quizBest: 80,
      practical: 'submitted' as const,
    }
    expect(isComplete({ ...p, units: [...p.units] })).toBe(true)
    expect(missingRequirements({ ...p, units: [...p.units] }, true)).toEqual(['practical'])
    expect(isComplete({ ...p, units: [...p.units], quizBest: 60 })).toBe(false)
  })
  test('arranged options keep the right answer', () => {
    for (const c of COURSES)
      for (const q of c.quiz) {
        const a = arrangeOptions(q)
        expect(a.options[a.correct]).toEqual(q.options[q.correct] as (typeof q.options)[number])
      }
  })
})

describe('application stages', () => {
  test('tracks differ and offer is followed by hired', () => {
    expect(STAGES.employment).toContain('offer')
    expect(STAGES.freelance).not.toContain('hired')
    expect(nextStage('employment', 'offer')).toBe('hired')
    expect(nextStage('freelance', 'completed')).toBeNull()
  })
})

describe('historical KPIs reconcile with the brief', () => {
  const k = kpis(sumRows(ANALYTICS_ROWS))
  test('national totals', () => {
    expect(k.registered).toBe(1000)
    expect(k.active).toBe(720)
    expect(k.completionRate).toEqual({ value: 75, numerator: 900, denominator: 1200 })
    expect(k.guidanceCoverage.value).toBe(80)
    expect([k.jobStarts, k.internships, k.uniquePlaced]).toEqual([140, 40, 170])
    expect(k.employment.map((e) => e.rate.value)).toEqual([60, 55, 50])
    expect(k.employment.map((e) => e.unknown)).toEqual([20, 20, 10])
    expect(k.avgDaysToJob).toBe(42)
    expect(k.retention.rate.value).toBe(75)
    expect(k.freelance).toEqual({ completed: 80, earners: 50, repeatClients: 15 })
    expect(k.enterprise).toEqual({ concepts: 90, tests: 35, acceptances: 20, firstSales: 8 })
  })
  test('governorate and route partitions sum to national totals', () => {
    for (const metric of ['registered', 'graduates', 'jobStarts'] as const) {
      const byGov = (['Damascus', 'Aleppo', 'Homs'] as const).reduce(
        (s, g) => s + sumRows(filterRows(ANALYTICS_ROWS, { governorate: g }))[metric],
        0,
      )
      expect(byGov).toBe(sumRows(ANALYTICS_ROWS)[metric])
    }
    expect(sumRows(filterRows(ANALYTICS_ROWS, { route: 'employment' })).registered).toBe(600)
  })
  test('partner P01 covers Damascus and Homs only', () => {
    const p1 = filterRows(ANALYTICS_ROWS, { partnerId: 'P01' })
    expect(new Set(p1.map((r) => r.governorate))).toEqual(new Set(['Damascus', 'Homs']))
  })
})

describe('courseProgressPct', () => {
  const base = {
    courseId: 'C04' as const,
    units: ['done', 'done', 'done', 'done'] as ('done' | 'todo' | 'inProgress')[],
    quizAttempts: [] as number[],
    practical: 'none' as const,
  }
  test('units alone do not reach 100', () => {
    expect(courseProgressPct(base)).toBe(67)
  })
  test('quiz and practical add steps but stay under 100 until complete', () => {
    expect(courseProgressPct({ ...base, quizBest: 100, practical: 'submitted' })).toBe(99)
  })
  test('completed is 100, missing is 0', () => {
    expect(courseProgressPct({ ...base, completedAt: '2026-11-20T10:00:00Z' })).toBe(100)
    expect(courseProgressPct(undefined)).toBe(0)
  })
})
