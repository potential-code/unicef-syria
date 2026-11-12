import { motion } from 'motion/react'
import { LaurelBranch } from '@/components/brand'
import { useReducedMotion } from '@/hooks/use-reduced-motion'

// Fine film grain (SVG turbulence) so the gradient never looks flat.
const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.55 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")"

/**
 * Hero backdrop: brand gradient with soft light pools (cyan top-end, deep navy bottom-start),
 * a dotted grid that fades out, film grain, two large emblem laurel branches framing the copy,
 * and a curved bottom edge into the next section. All decorative.
 */
export function HeroBackdrop() {
  const reduce = useReducedMotion()
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-[radial-gradient(55%_60%_at_85%_15%,rgb(0_174_239/0.55),transparent_70%),radial-gradient(50%_55%_at_5%_100%,rgb(0_30_90/0.75),transparent_70%),radial-gradient(40%_40%_at_45%_45%,rgb(255_181_0/0.10),transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(rgb(255_255_255/0.16)_1px,transparent_1.4px)] [mask-image:radial-gradient(70%_70%_at_30%_40%,black,transparent)] bg-[length:22px_22px]" />
      <div
        className="absolute inset-0 opacity-[0.09] mix-blend-overlay"
        style={{ backgroundImage: GRAIN }}
      />
      <motion.div
        className="absolute -start-24 -bottom-24 text-white/[0.08]"
        initial={reduce ? false : { opacity: 0, y: 60, rotate: -8 }}
        animate={{ opacity: 1, y: 0, rotate: 0 }}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <LaurelBranch className="h-[38rem] w-auto" />
      </motion.div>
      <motion.div
        className="absolute end-[38%] -top-28 hidden text-white/[0.06] lg:block"
        initial={reduce ? false : { opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <LaurelBranch className="h-72 w-auto rotate-180" mirrored />
      </motion.div>
      <svg
        className="absolute inset-x-0 -bottom-px h-16 w-full text-sky-50 sm:h-24"
        viewBox="0 0 1440 96"
        preserveAspectRatio="none"
      >
        <path d="M0 96 L0 56 C 360 8, 1080 8, 1440 56 L1440 96 Z" fill="currentColor" />
      </svg>
    </div>
  )
}
