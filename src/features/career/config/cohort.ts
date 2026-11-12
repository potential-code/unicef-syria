import type { CourseId, SessionId, TemplateId } from '@shared/types'

/** Materials and the linked assignment for each sample session (brief §11 Y08). */
export const SESSION_EXTRAS: Partial<
  Record<SessionId, { materials: TemplateId[]; assignment?: CourseId }>
> = {
  S01: { materials: ['actionPlan'], assignment: 'C01' },
  S02: { materials: ['starWorksheet'], assignment: 'C13' },
  S03: { materials: ['cvOutline', 'starWorksheet'], assignment: 'C05' },
  S04: { materials: ['customerInterview'], assignment: 'C07' },
  S05: { materials: ['cashPlan'], assignment: 'C08' },
  S06: { materials: ['customerInterview'], assignment: 'C16' },
  S07: { materials: ['portfolioChecklist'], assignment: 'C11' },
  S08: { materials: ['proposal'], assignment: 'C11' },
  S09: { materials: ['proposal'], assignment: 'C15' },
  E01: { materials: [] },
}

/** The calendar shows the sample schedule month (Syria time). */
export const CALENDAR_MONTH = { year: 2026, month: 11 }

/** Historical completed sample (brief §11): always shown as completed, labelled a sample scenario. */
export const SAMPLE_COMPLETED_SESSION: SessionId = 'S01'
