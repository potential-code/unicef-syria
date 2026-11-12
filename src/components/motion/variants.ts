import type { Transition, Variants } from 'motion/react'

/** Brand easing: matches the site's calm ease-out (see styles/tokens.css → --qt-ease-out). */
export const easeOut = [0.22, 1, 0.36, 1] as const

export const spring: Transition = { type: 'spring', stiffness: 220, damping: 26 }
export const softSpring: Transition = { type: 'spring', stiffness: 120, damping: 20 }

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } },
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.5, ease: easeOut } },
}

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: easeOut } },
}

export const staggerContainer = (stagger = 0.07, delay = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren: delay } },
})

/** Lift used by interactive cards: hover raises, press settles. */
export const cardHover = {
  rest: { y: 0, boxShadow: 'var(--qt-shadow-sm)' },
  hover: { y: -6, boxShadow: 'var(--qt-shadow-lg)', transition: spring },
  press: { y: -2, scale: 0.99 },
}

/** Card entrance: rises out of a clipped band, like the site's swoop reveal. */
export const riseIn: Variants = {
  hidden: { opacity: 0, y: 48, clipPath: 'inset(18% 0% 0% 0% round 16px)' },
  show: {
    opacity: 1,
    y: 0,
    clipPath: 'inset(0% 0% 0% 0% round 16px)',
    transition: { duration: 0.9, ease: easeOut },
    // Drop the clip once settled, or it cuts off hover shadows and lifts.
    transitionEnd: { clipPath: 'none' },
  },
}
