/**
 * Chart colour tokens (UNICEF brand). Categorical order is fixed and never cycled; colour
 * follows the entity, never its rank. Validated with the dataviz validator: blue, cyan and
 * orange pass every check; cyan and yellow sit below 3:1 on white, so every chart that uses
 * them also shows direct labels and a table view.
 */
export const SERIES = [
  'var(--unicef-blue)',
  'var(--unicef-cyan)',
  'var(--unicef-orange)',
  'var(--unicef-yellow)',
  'var(--unicef-navy)',
] as const

export const CHART = {
  primary: 'var(--unicef-blue)',
  secondary: 'var(--unicef-cyan)',
  accent: 'var(--unicef-orange)',
  highlight: 'var(--unicef-yellow)',
  deep: 'var(--unicef-navy)',
  /** Neutral for "unknown" and "not disclosed" segments. */
  neutral: 'var(--unicef-line)',
  grid: 'var(--unicef-sky-100)',
  axis: 'var(--unicef-grey)',
  surface: '#ffffff',
  /** Sequential ramp, light to dark, one hue. */
  ramp: ['var(--unicef-sky-200)', 'var(--unicef-cyan)', 'var(--unicef-blue)', 'var(--unicef-navy)'],
} as const

/** Ink colour for a label set inside a filled mark. */
export function inkOn(fill: string): string {
  return fill === CHART.secondary ||
    fill === CHART.highlight ||
    fill === CHART.neutral ||
    fill === CHART.ramp[0]
    ? 'var(--unicef-ink)'
    : '#ffffff'
}

export const AXIS_TICK = { fill: 'var(--unicef-grey)', fontSize: 12 } as const
