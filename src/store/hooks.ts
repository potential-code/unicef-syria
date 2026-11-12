import type { Persona, Youth } from '@shared/types'
import { usePersona } from './actions/session'
import { useDb } from './db'

/** The signed-in persona, non-null inside guarded layouts. */
export function useMe(): Persona {
  const p = usePersona()
  if (!p) throw new Error('No signed-in persona')
  return p
}

/** The signed-in youth record (youth layouts only). */
export function useMyYouth(): Youth {
  const p = useMe()
  const y = useDb((db) => (p.youthId ? db.youth[p.youthId] : undefined))
  if (!y) throw new Error('Signed-in persona is not a youth')
  return y
}
