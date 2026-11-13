import { now } from '@/lib/clock'
import type { DemoDb, InAppNotice, NoticeKind } from './db'

/** Append an in-app notice. Pure: returns the next db. */
export function notify(
  db: DemoDb,
  to: InAppNotice['to'],
  kind: NoticeKind,
  params: Record<string, string> = {},
  link?: string,
): DemoDb {
  const notice: InAppNotice = {
    id: `N${db.notices.length + 1}`,
    to,
    kind,
    params,
    link,
    at: now(),
    read: false,
  }
  return { ...db, notices: [notice, ...db.notices] }
}
