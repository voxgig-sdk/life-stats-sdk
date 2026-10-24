# LifeStats SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module LifeStatsFeatures
  def self.make_feature(name)
    case name
    when "base"
      LifeStatsBaseFeature.new
    when "ratelimit"
      LifeStatsRatelimitFeature.new
    when "retry"
      LifeStatsRetryFeature.new
    when "test"
      LifeStatsTestFeature.new
    when "timeout"
      LifeStatsTimeoutFeature.new
    else
      LifeStatsBaseFeature.new
    end
  end
end
