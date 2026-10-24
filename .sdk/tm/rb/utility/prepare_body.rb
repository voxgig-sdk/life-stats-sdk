# LifeStats SDK utility: prepare_body
require_relative 'media'
module LifeStatsUtilities
  PrepareBody = ->(ctx) {
    return nil unless ctx.op.input == "data"
    return LifeStatsUtilities.raw_body(ctx.reqdata) if LifeStatsUtilities.raw_request?(ctx.point)
    ctx.utility.transform_request.call(ctx)
  }
end
