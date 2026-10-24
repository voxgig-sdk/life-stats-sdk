package voxgiglifestatssdk

import (
	"github.com/voxgig-sdk/life-stats-sdk/go/core"
	"github.com/voxgig-sdk/life-stats-sdk/go/entity"
	"github.com/voxgig-sdk/life-stats-sdk/go/feature"
	_ "github.com/voxgig-sdk/life-stats-sdk/go/utility"
)

// Type aliases preserve external API.
type LifeStatsSDK = core.LifeStatsSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type LifeStatsEntity = core.LifeStatsEntity
type StreamItem = core.StreamItem
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type LifeStatsError = core.LifeStatsError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewRatelimitFeatureFunc = func() core.Feature {
		return feature.NewRatelimitFeature()
	}
	core.NewRetryFeatureFunc = func() core.Feature {
		return feature.NewRetryFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewTimeoutFeatureFunc = func() core.Feature {
		return feature.NewTimeoutFeature()
	}
	core.NewLifeEntityFunc = func(client *core.LifeStatsSDK, entopts map[string]any) core.LifeStatsEntity {
		return entity.NewLifeEntity(client, entopts)
	}
	core.NewMilestoneEntityFunc = func(client *core.LifeStatsSDK, entopts map[string]any) core.LifeStatsEntity {
		return entity.NewMilestoneEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewLifeStatsSDK = core.NewLifeStatsSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var SharedConfig = core.SharedConfig

// No-arg convenience constructors. Go has no default-argument syntax,
// so these aliases let callers write `sdk.New()` / `sdk.Test()`
// instead of `sdk.NewLifeStatsSDK(nil)` / `sdk.TestSDK(nil, nil)`
// for the common no-options case.
func New() *LifeStatsSDK  { return NewLifeStatsSDK(nil) }
func Test() *LifeStatsSDK { return TestSDK(nil, nil) }
var NewBaseFeature = feature.NewBaseFeature
var NewRatelimitFeature = feature.NewRatelimitFeature
var NewRetryFeature = feature.NewRetryFeature
var NewTestFeature = feature.NewTestFeature
var NewTimeoutFeature = feature.NewTimeoutFeature
