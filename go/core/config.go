package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "LifeStats",
			"slug": "life-stats",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"ratelimit": map[string]any{
				"options": map[string]any{
					"active": false,
					"burst": 5,
					"rate": 5,
				},
				"optspec": map[string]any{
					"now": "`$FUNCTION`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"retry": map[string]any{
				"options": map[string]any{
					"active": false,
					"factor": 2,
					"maxDelay": 2000,
					"minDelay": 50,
					"retries": 2,
					"statuses": []any{
						408,
						425,
						429,
						500,
						502,
						503,
						504,
					},
				},
				"optspec": map[string]any{
					"jitter": "`$BOOLEAN`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"optspec": map[string]any{
					"entity": "`$MAP`",
					"net": "`$MAP`",
				},
				"strict": false,
				"transport": "base",
			},
			"timeout": map[string]any{
				"options": map[string]any{
					"active": false,
					"ms": 30000,
				},
				"optspec": map[string]any{
					"clearTimer": "`$FUNCTION`",
					"now": "`$FUNCTION`",
					"setTimer": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
		},
		"options": map[string]any{
			"base": "https://api.tasta.space/v1",
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"life": map[string]any{},
				"milestone": map[string]any{},
			},
		},
		"entity": map[string]any{
			"life": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "data",
						"title": "Data",
						"type": "`$OBJECT`",
						"req": true,
						"short": "Life statistics for one birth date, counted as of the moment of the request.",
					},
					map[string]any{
						"name": "meta",
						"title": "Meta",
						"type": "`$OBJECT`",
						"req": true,
					},
				},
				"name": "life",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/life",
								"segments": []any{
									map[string]any{
										"lit": "life",
									},
								},
								"parts": []any{
									"life",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "born",
											"orig": "born",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
											"example": "1994-03-12",
										},
										map[string]any{
											"name": "time",
											"orig": "time",
											"type": "`$STRING`",
											"kind": "query",
											"example": "07:45",
										},
										map[string]any{
											"name": "tz",
											"orig": "tz",
											"type": "`$STRING`",
											"kind": "query",
											"example": "America/New_York",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"born",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"milestone": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "age",
						"title": "Age",
						"type": "`$INTEGER`",
						"short": "The whole-number age on that planet, for planet-birthday milestones only.",
					},
					map[string]any{
						"name": "certificate",
						"title": "Certificate",
						"type": "`$STRING`",
						"req": true,
						"short": "Link to an SVG certificate for this milestone (format=png for PNG).",
					},
					map[string]any{
						"name": "date",
						"title": "Date",
						"type": "`$STRING`",
						"req": true,
						"short": "Date of the milestone in the caller's time zone.",
						"format": "date",
					},
					map[string]any{
						"name": "days_until",
						"title": "Days Until",
						"type": "`$INTEGER`",
						"req": true,
						"short": "Days from today to the milestone (negative once passed).",
					},
					map[string]any{
						"name": "estimate",
						"title": "Estimate",
						"type": "`$BOOLEAN`",
						"req": true,
						"short": "True for estimated milestones (billion-heartbeats, at a steady 75 beats a minute).",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"req": true,
						"short": "Milestone id, as the certificate endpoint takes it: gigasecond, 2-gigaseconds, 3-gigaseconds, 10000-days ...",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"req": true,
						"short": "Milestone name.",
					},
					map[string]any{
						"name": "passed",
						"title": "Passed",
						"type": "`$BOOLEAN`",
						"req": true,
						"short": "Whether the milestone is already behind.",
					},
					map[string]any{
						"name": "planet",
						"title": "Planet",
						"type": "`$STRING`",
						"short": "The planet, for planet-birthday milestones only.",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "milestone",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/life/milestones",
								"segments": []any{
									map[string]any{
										"lit": "life",
									},
									map[string]any{
										"lit": "milestones",
									},
								},
								"parts": []any{
									"life",
									"milestones",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "born",
											"orig": "born",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
											"example": "1994-03-12",
										},
										map[string]any{
											"name": "count",
											"orig": "count",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 5,
										},
										map[string]any{
											"name": "time",
											"orig": "time",
											"type": "`$STRING`",
											"kind": "query",
											"example": "07:45",
										},
										map[string]any{
											"name": "tz",
											"orig": "tz",
											"type": "`$STRING`",
											"kind": "query",
											"example": "America/New_York",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"born",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

// The plugin definitions the model selected per feature, as []any so a
// feature package can consume them without core naming its types. Empty
// when no active feature declares active plugin groups for this target.
var featurePlugins = map[string][]any{
}

// FeaturePlugins is the definitions list for one feature's chain.
func FeaturePlugins(name string) []any {
	return featurePlugins[name]
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "ratelimit":
		if NewRatelimitFeatureFunc != nil {
			return NewRatelimitFeatureFunc()
		}
	case "retry":
		if NewRetryFeatureFunc != nil {
			return NewRetryFeatureFunc()
		}
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	case "timeout":
		if NewTimeoutFeatureFunc != nil {
			return NewTimeoutFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
