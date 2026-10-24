// Typed models for the LifeStats SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
// params (op.<name>.points[].g.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Life {
  data: Record<string, any>
  meta: Record<string, any>
}

export interface LifeLoadMatch {
  born: string
  time?: string
  tz?: string
}

export interface Milestone {
  age?: number
  certificate: string
  date: string
  days_until: number
  estimate: boolean
  id: string
  name: string
  passed: boolean
  planet?: string
}

export interface MilestoneListMatch {
  born: string
  count?: number
  time?: string
  tz?: string
}

