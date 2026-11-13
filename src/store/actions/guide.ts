import { update } from '../db'

export function setDemoGuide(open: boolean) {
  update((db) => ({ ...db, prefs: { ...db.prefs, demoGuide: open } }))
}
export function setGuideStep(step: number) {
  update((db) => ({ ...db, prefs: { ...db.prefs, guideStep: step, demoGuide: true } }))
}
