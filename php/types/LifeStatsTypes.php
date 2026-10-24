<?php
declare(strict_types=1);

// Typed models for the LifeStats SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
// params (op.<name>.points[].g.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Life entity data model. */
class Life
{
    public array $data;
    public array $meta;
}

/** Request payload for Life#load. */
class LifeLoadMatch
{
    public string $born;
    public ?string $time = null;
    public ?string $tz = null;
}

/** Milestone entity data model. */
class Milestone
{
    public ?int $age = null;
    public string $certificate;
    public string $date;
    public int $days_until;
    public bool $estimate;
    public string $id;
    public string $name;
    public bool $passed;
    public ?string $planet = null;
}

/** Request payload for Milestone#list. */
class MilestoneListMatch
{
    public string $born;
    public ?int $count = null;
    public ?string $time = null;
    public ?string $tz = null;
}

