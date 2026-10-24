<?php
declare(strict_types=1);

// LifeStats SDK utility: result_headers

class LifeStatsResultHeaders
{
    public static function call(LifeStatsContext $ctx): ?LifeStatsResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
