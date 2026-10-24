<?php
declare(strict_types=1);

// LifeStats SDK base feature

class LifeStatsBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    // Positions this feature when added via the client `extend` option:
    // "__before__" / "__after__" / "__replace__" name an already-added
    // feature (mirrors the ts feature `_options`). Declared so setting it
    // on an extension instance avoids the dynamic-property deprecation.
    public ?array $_options = null;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(LifeStatsContext $ctx, array $options): void {}
    public function PostConstruct(LifeStatsContext $ctx): void {}
    public function PostConstructEntity(LifeStatsContext $ctx): void {}
    public function SetData(LifeStatsContext $ctx): void {}
    public function GetData(LifeStatsContext $ctx): void {}
    public function GetMatch(LifeStatsContext $ctx): void {}
    public function SetMatch(LifeStatsContext $ctx): void {}
    public function PrePoint(LifeStatsContext $ctx): void {}
    public function PreSpec(LifeStatsContext $ctx): void {}
    public function PreRequest(LifeStatsContext $ctx): void {}
    public function PreResponse(LifeStatsContext $ctx): void {}
    public function PreResult(LifeStatsContext $ctx): void {}
    public function PreDone(LifeStatsContext $ctx): void {}
    public function PreUnexpected(LifeStatsContext $ctx): void {}
}
