# LifeStats SDK exists test

require "minitest/autorun"
require_relative "../LifeStats_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = LifeStatsSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
