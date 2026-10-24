<?php
declare(strict_types=1);

// LifeStats SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class LifeStatsMakeContext
{
    public static function call(array $ctxmap, ?LifeStatsContext $basectx): LifeStatsContext
    {
        return new LifeStatsContext($ctxmap, $basectx);
    }
}
