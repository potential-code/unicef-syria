import type { Lang, PersonaId } from '@shared/types'
import { PERSONA_BY_ID } from '@/data/personas'
import { getDb, update, useDb } from '../db'

export function signInAs(personaId: PersonaId) {
  update((db) => ({ ...db, session: { personaId } }))
}
export function signOut() {
  update((db) => ({ ...db, session: { personaId: null } }))
}
export function setLang(lang: Lang) {
  update((db) => ({ ...db, prefs: { ...db.prefs, lang } }))
}
export function setReducedMotion(on: boolean) {
  update((db) => ({ ...db, prefs: { ...db.prefs, reducedMotion: on } }))
}

export function usePrefs() {
  return useDb((db) => db.prefs)
}
export function usePersona() {
  const id = useDb((db) => db.session.personaId)
  return id ? PERSONA_BY_ID[id] : null
}
export function currentPersona() {
  const id = getDb().session.personaId
  return id ? PERSONA_BY_ID[id] : null
}
