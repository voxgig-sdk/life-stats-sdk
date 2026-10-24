# LifeStats SDK utility: make_context
require_relative '../core/context'
module LifeStatsUtilities
  MakeContext = ->(ctxmap, basectx) {
    LifeStatsContext.new(ctxmap, basectx)
  }
end
