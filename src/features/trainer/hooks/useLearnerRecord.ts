import type { Localized, Session, Youth } from '@shared/types'
import { COURSE_BY_ID } from '@/data/courses'
import { L } from '@/data/l'
import { PROGRAMMES } from '@/data/orgs'
import { needsTrainerSupport } from '@/domain/completion'
import { useDb } from '@/store/db'

export interface RecordItem {
  id: string
  at: string
  kind: 'application' | 'course' | 'attendance' | 'reminder' | 'points'
  text: Localized
  detail?: string
}

export interface SupportAction {
  key: 'missed' | 'review' | 'quiz' | 'recommend' | 'assign' | 'continue'
  to: string
  params?: Record<string, string>
}

/** Chronological training record and the next support action for one learner (brief §17 T02). */
export function useLearnerRecord(y: Youth | undefined, sessions: Session[]) {
  const reminders = useDb((db) => db.reminders)
  if (!y) return { items: [] as RecordItem[], next: null as SupportAction | null }
  const items: RecordItem[] = []
  const app = y.trainingApplication
  if (app) {
    const prog = PROGRAMMES.find((p) => p.id === app.programmeId)
    items.push({
      id: 'app',
      at: app.at,
      kind: 'application',
      text: L(`Training application: ${prog?.name.en ?? ''}`, `طلب تدريب: ${prog?.name.ar ?? ''}`),
      detail: app.status,
    })
  }
  for (const p of Object.values(y.progress)) {
    if (p?.completedAt) {
      const c = COURSE_BY_ID[p.courseId]
      items.push({
        id: `course-${p.courseId}`,
        at: p.completedAt,
        kind: 'course',
        text: L(`Completed ${c.id} ${c.title.en}`, `أكمل ${c.id} ${c.title.ar}`),
      })
    }
  }
  for (const [sid, mark] of Object.entries(y.attendance)) {
    const s = sessions.find((x) => x.id === sid)
    if (s && mark)
      items.push({
        id: `att-${sid}`,
        at: s.start,
        kind: 'attendance',
        text: L(`${s.id} ${s.title.en}`, `${s.id} ${s.title.ar}`),
        detail: mark,
      })
  }
  for (const r of reminders.filter((x) => x.youthId === y.id)) {
    items.push({
      id: `rem-${r.sessionId}`,
      at: r.at,
      kind: 'reminder',
      text: L(
        `Support reminder after absence from ${r.sessionId}`,
        `تذكير دعم بعد الغياب عن ${r.sessionId}`,
      ),
    })
  }
  for (const e of y.points.filter((x) => x.reason === 'practical' || x.reason === 'mentor')) {
    items.push({
      id: `pts-${e.key}`,
      at: e.at,
      kind: 'points',
      text: e.label,
      detail: String(e.amount),
    })
  }
  items.sort((a, b) => Date.parse(a.at) - Date.parse(b.at))

  const missed = Object.entries(y.attendance).find(([, m]) => m === 'absent')
  const submitted = Object.values(y.progress).find((p) => p?.practical === 'submitted')
  const struggling = Object.values(y.progress).find((p) => needsTrainerSupport(p))
  const pendingCert = Object.values(y.progress).find((p) => p?.certificate === 'pendingReview')
  let next: SupportAction
  if (missed)
    next = { key: 'missed', to: '/trainer/sessions/$sessionId', params: { sessionId: missed[0] } }
  else if (submitted) next = { key: 'review', to: '/trainer/assessments' }
  else if (struggling) next = { key: 'quiz', to: '/trainer/results' }
  else if (pendingCert) next = { key: 'recommend', to: '/trainer/results' }
  else if (y.cohortIds.length === 0) next = { key: 'assign', to: '/trainer/applications' }
  else next = { key: 'continue', to: '/trainer/results' }
  return { items, next }
}
