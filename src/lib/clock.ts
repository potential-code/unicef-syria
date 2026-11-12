import { DEMO_NOW } from '@/data/youth'

const boot = Date.now()

/** Demo clock: starts at DEMO_NOW (20 Nov 2026, Syria time) and moves with real time. */
export function now(): string {
  return new Date(Date.parse(DEMO_NOW) + (Date.now() - boot)).toISOString()
}
export function nowMs(): number {
  return Date.parse(now())
}
