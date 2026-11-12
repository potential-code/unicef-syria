import type { CoachId } from '@shared/types'
import { BookOpenCheck, Compass, FileUser, Lightbulb, type LucideIcon, Palette } from 'lucide-react'

/** Icon avatar and brand colour per AI coach (no photographs: these are scripted demos). */
export const COACH_STYLE: Record<
  CoachId,
  { icon: LucideIcon; tile: string; soft: string; text: string }
> = {
  navigator: { icon: Compass, tile: 'bg-blue text-white', soft: 'bg-blue-50', text: 'text-blue' },
  learning: {
    icon: BookOpenCheck,
    tile: 'bg-cyan text-ink',
    soft: 'bg-sky-100',
    text: 'text-navy',
  },
  cv: { icon: FileUser, tile: 'bg-yellow text-ink', soft: 'bg-yellow/15', text: 'text-ink' },
  enterprise: {
    icon: Lightbulb,
    tile: 'bg-orange text-white',
    soft: 'bg-orange/10',
    text: 'text-ink',
  },
  freelance: { icon: Palette, tile: 'bg-navy text-white', soft: 'bg-blue-50', text: 'text-navy' },
}

/** Typing indicator duration before a scripted reply appears. */
export const TYPING_MS = 900
