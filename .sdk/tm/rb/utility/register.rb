# LifeStats SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'graphql'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

LifeStatsUtility.registrar = ->(u) {
  u.clean = LifeStatsUtilities::Clean
  u.clean_add = LifeStatsUtilities::CleanAdd
  u.clean_explain = LifeStatsUtilities::CleanExplain
  u.done = LifeStatsUtilities::Done
  u.make_error = LifeStatsUtilities::MakeError
  u.feature_add = LifeStatsUtilities::FeatureAdd
  u.feature_hook = LifeStatsUtilities::FeatureHook
  u.feature_init = LifeStatsUtilities::FeatureInit
  u.fetcher = LifeStatsUtilities::Fetcher
  u.make_fetch_def = LifeStatsUtilities::MakeFetchDef
  u.make_context = LifeStatsUtilities::MakeContext
  u.make_options = LifeStatsUtilities::MakeOptions
  u.make_request = LifeStatsUtilities::MakeRequest
  u.make_response = LifeStatsUtilities::MakeResponse
  u.make_result = LifeStatsUtilities::MakeResult
  u.make_point = LifeStatsUtilities::MakePoint
  u.make_spec = LifeStatsUtilities::MakeSpec
  u.make_url = LifeStatsUtilities::MakeUrl
  u.param = LifeStatsUtilities::Param
  u.prepare_auth = LifeStatsUtilities::PrepareAuth
  u.prepare_body = LifeStatsUtilities::PrepareBody
  u.prepare_headers = LifeStatsUtilities::PrepareHeaders
  u.prepare_method = LifeStatsUtilities::PrepareMethod
  u.prepare_params = LifeStatsUtilities::PrepareParams
  u.prepare_path = LifeStatsUtilities::PreparePath
  u.prepare_query = LifeStatsUtilities::PrepareQuery
  u.graphql_body = LifeStatsUtilities::GraphqlBody
  u.graphql_errors = LifeStatsUtilities::GraphqlErrors
  u.result_basic = LifeStatsUtilities::ResultBasic
  u.result_body = LifeStatsUtilities::ResultBody
  u.result_headers = LifeStatsUtilities::ResultHeaders
  u.transform_request = LifeStatsUtilities::TransformRequest
  u.transform_response = LifeStatsUtilities::TransformResponse
}
