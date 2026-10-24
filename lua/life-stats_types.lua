-- Typed models for the LifeStats SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
-- params (op.<name>.points[].g.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Life
---@field data table
---@field meta table

---@class LifeLoadMatch
---@field born string
---@field time? string
---@field tz? string

---@class Milestone
---@field age? number
---@field certificate string
---@field date string
---@field days_until number
---@field estimate boolean
---@field id string
---@field name string
---@field passed boolean
---@field planet? string

---@class MilestoneListMatch
---@field born string
---@field count? number
---@field time? string
---@field tz? string

local M = {}

return M
