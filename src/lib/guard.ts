import type { Role } from '@shared/types'
import { redirect } from '@tanstack/react-router'
import { PERSONA_BY_ID } from '@/data/personas'
import { getDb } from '@/store/db'

/** Layout guard: the signed-in persona must have this role, else go to sign-in. */
export function requireRole(role: Role) {
  return () => {
    const id = getDb().session.personaId
    const persona = id ? PERSONA_BY_ID[id] : null
    if (!persona || persona.role !== role) throw redirect({ to: '/sign-in' })
  }
}
