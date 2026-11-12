import { useEffect, useState } from 'react'
import { usePrefs } from '@/store/actions/session'

/**
 * The single reduced-motion source for Motion, GSAP and Lenis: true when the device asks for
 * reduced motion or the presenter turned motion off. The device setting always wins.
 */
export function useReducedMotion(): boolean {
  const { reducedMotion } = usePrefs()
  const [system, setSystem] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const on = () => setSystem(mq.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])
  return system || reducedMotion
}
