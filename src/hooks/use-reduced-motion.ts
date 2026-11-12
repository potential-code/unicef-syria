import { usePrefs } from '@/store/actions/session'

/**
 * The single reduced-motion source for Motion, GSAP and Lenis. It follows the presenter's
 * "Reduce motion" toggle (Presenter menu), not the operating-system setting: many presentation
 * laptops have system animations turned off, which would hide the demo's motion entirely.
 * Assumption logged in docs/ASSUMPTIONS.md; production would respect the system setting.
 */
export function useReducedMotion(): boolean {
  return usePrefs().reducedMotion
}
