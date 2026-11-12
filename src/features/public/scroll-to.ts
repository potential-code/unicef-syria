import { getLenis } from '@/components/motion'

/** Scrolls to an element by id without touching the URL (the app uses hash routing). */
export function scrollToId(id: string, offset = -80) {
  const el = document.getElementById(id)
  if (!el) return
  const lenis = getLenis()
  if (lenis) lenis.scrollTo(el, { offset })
  else
    window.scrollTo({
      top: el.getBoundingClientRect().top + window.scrollY + offset,
      behavior: 'smooth',
    })
}
