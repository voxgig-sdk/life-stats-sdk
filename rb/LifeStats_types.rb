# frozen_string_literal: true

# Typed models for the LifeStats SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
# params (op.<name>.points[].g.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Life entity data model.
#
# @!attribute [rw] data
#   @return [Hash]
#
# @!attribute [rw] meta
#   @return [Hash]
Life = Struct.new(
  :data,
  :meta,
  keyword_init: true
)

# Request payload for Life#load.
#
# @!attribute [rw] born
#   @return [String]
#
# @!attribute [rw] time
#   @return [String, nil]
#
# @!attribute [rw] tz
#   @return [String, nil]
LifeLoadMatch = Struct.new(
  :born,
  :time,
  :tz,
  keyword_init: true
)

# Milestone entity data model.
#
# @!attribute [rw] age
#   @return [Integer, nil]
#
# @!attribute [rw] certificate
#   @return [String]
#
# @!attribute [rw] date
#   @return [String]
#
# @!attribute [rw] days_until
#   @return [Integer]
#
# @!attribute [rw] estimate
#   @return [Boolean]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] passed
#   @return [Boolean]
#
# @!attribute [rw] planet
#   @return [String, nil]
Milestone = Struct.new(
  :age,
  :certificate,
  :date,
  :days_until,
  :estimate,
  :id,
  :name,
  :passed,
  :planet,
  keyword_init: true
)

# Request payload for Milestone#list.
#
# @!attribute [rw] born
#   @return [String]
#
# @!attribute [rw] count
#   @return [Integer, nil]
#
# @!attribute [rw] time
#   @return [String, nil]
#
# @!attribute [rw] tz
#   @return [String, nil]
MilestoneListMatch = Struct.new(
  :born,
  :count,
  :time,
  :tz,
  keyword_init: true
)

