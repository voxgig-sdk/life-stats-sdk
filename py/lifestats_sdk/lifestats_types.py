# Typed models for the LifeStats SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
# params (op.<name>.points[].g.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class Life(TypedDict):
    data: dict
    meta: dict


class LifeLoadMatchRequired(TypedDict):
    born: str


class LifeLoadMatch(LifeLoadMatchRequired, total=False):
    time: str
    tz: str


class MilestoneRequired(TypedDict):
    certificate: str
    date: str
    days_until: int
    estimate: bool
    id: str
    name: str
    passed: bool


class Milestone(MilestoneRequired, total=False):
    age: int
    planet: str


class MilestoneListMatchRequired(TypedDict):
    born: str


class MilestoneListMatch(MilestoneListMatchRequired, total=False):
    count: int
    time: str
    tz: str
