import type { OrgId } from '@shared/types'
import { type DemoDb, update, useDb } from '../db'

/**
 * Employer workspace extras (brief §16 E01, E03). Stored on the same demo database so
 * "Reset demo" clears them with every other record. Keys are optional because the seeded
 * snapshot does not contain them.
 */
export interface OrgProfileEdit {
  name: string
  sector: string
  governorate: string
  description: string
  contactName: string
  contactEmail: string
  opportunityTypes: string[]
  /** Set when the organisation submits the profile for centre or UNICEF approval. */
  submittedAt?: string
}

export interface PlacementDetail {
  startDate?: string
  role?: string
  workType?: string
  interviewDate?: string
  sampleFee?: string
  selectionDate?: string
}

type EmployerExtra = {
  orgProfiles?: Partial<Record<OrgId, OrgProfileEdit>>
  placementDetails?: Record<string, PlacementDetail>
}
type Db = DemoDb & EmployerExtra

const EMPTY_DETAILS: Record<string, PlacementDetail> = {}

export function useOrgProfileEdit(orgId: OrgId | undefined): OrgProfileEdit | undefined {
  return useDb((db) => (orgId ? (db as Db).orgProfiles?.[orgId] : undefined))
}

export function saveOrgProfile(orgId: OrgId, profile: OrgProfileEdit) {
  update((db) => {
    const d = db as Db
    return { ...d, orgProfiles: { ...d.orgProfiles, [orgId]: profile } } as DemoDb
  })
}

export function usePlacementDetails(): Record<string, PlacementDetail> {
  return useDb((db) => (db as Db).placementDetails ?? EMPTY_DETAILS)
}

/** Structured details recorded alongside a stage change (start date, role, work type, fee). */
export function savePlacementDetail(appId: string, detail: PlacementDetail) {
  update((db) => {
    const d = db as Db
    const all = d.placementDetails ?? {}
    return { ...d, placementDetails: { ...all, [appId]: { ...all[appId], ...detail } } } as DemoDb
  })
}
