package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewRatelimitFeatureFunc func() Feature

var NewRetryFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewTimeoutFeatureFunc func() Feature

var NewLifeEntityFunc func(client *LifeStatsSDK, entopts map[string]any) LifeStatsEntity

var NewMilestoneEntityFunc func(client *LifeStatsSDK, entopts map[string]any) LifeStatsEntity

