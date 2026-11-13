import type { InAppNotice } from '../db'
import { update, useDb } from '../db'

export function useNotices(to: InAppNotice['to'] | undefined) {
  const all = useDb((db) => db.notices)
  return to ? all.filter((n) => n.to === to) : []
}
export function markNoticeRead(id: string) {
  update((db) => ({
    ...db,
    notices: db.notices.map((n) => (n.id === id ? { ...n, read: true } : n)),
  }))
}
export function markAllNoticesRead(to: InAppNotice['to']) {
  update((db) => ({
    ...db,
    notices: db.notices.map((n) => (n.to === to ? { ...n, read: true } : n)),
  }))
}
