import type { CoachId } from '@shared/types'
import { BookOpenCheck, Compass, FileUser, Lightbulb, type LucideIcon, Palette } from 'lucide-react'

/**
 * Identity per AI coach (portraits are AI-generated, never real people). `grad` paints the avatar tile
 * and the card header; `ink` is the text colour that reads on it; `motif` colours the emblem lines.
 */
export const COACH_STYLE: Record<
  CoachId,
  { icon: LucideIcon; grad: string; ink: string; motif: string; soft: string; text: string }
> = {
  navigator: {
    icon: Compass,
    grad: 'bg-[linear-gradient(140deg,var(--unicef-cyan),var(--unicef-blue)_55%,var(--unicef-navy))]',
    ink: 'text-white',
    motif: 'text-white/20',
    soft: 'bg-blue-50',
    text: 'text-blue',
  },
  learning: {
    icon: BookOpenCheck,
    grad: 'bg-[linear-gradient(140deg,var(--unicef-cyan),var(--unicef-cyan-600))]',
    ink: 'text-ink',
    motif: 'text-white/40',
    soft: 'bg-sky-100',
    text: 'text-navy',
  },
  cv: {
    icon: FileUser,
    grad: 'bg-[linear-gradient(140deg,#ffd666,var(--unicef-yellow))]',
    ink: 'text-ink',
    motif: 'text-white/50',
    soft: 'bg-yellow/15',
    text: 'text-ink',
  },
  enterprise: {
    icon: Lightbulb,
    grad: 'bg-[linear-gradient(140deg,var(--unicef-orange),#a93a06)]',
    ink: 'text-white',
    motif: 'text-white/20',
    soft: 'bg-orange/10',
    text: 'text-ink',
  },
  freelance: {
    icon: Palette,
    grad: 'bg-[linear-gradient(140deg,var(--unicef-navy),#002a73)]',
    ink: 'text-white',
    motif: 'text-cyan/30',
    soft: 'bg-blue-50',
    text: 'text-navy',
  },
}

/** Typing indicator duration before a scripted reply appears. */
export const TYPING_MS = 900
