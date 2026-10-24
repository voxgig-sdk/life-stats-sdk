# LifeStats SDK configuration

module LifeStatsConfig
  # Return the process-wide config, built once on first use. The SDK reads
  # the config on every request and never writes to it, so one instance is
  # shared by every client rather than rebuilt per client.
  #
  # The returned hash is shared: treat it as read-only. Callers that need to
  # mutate should use make_config, which always returns a fresh copy.
  def self.shared_config
    @shared_config ||= make_config
  end


  # Build a fresh, fully materialised config hash. Every call rebuilds the
  # whole structure, so prefer shared_config unless you need a private copy
  # you intend to mutate.
  def self.make_config
    {
      "main" => {
        "name" => "LifeStats",
        "slug" => "life-stats",
        "version" => "0.0.1",
        "target" => "rb",
      },
      "feature" => {
        "ratelimit" => {
          "options" => {
            "active" => false,
            "burst" => 5,
            "rate" => 5,
          },
          "optspec" => {
            "now" => "`$FUNCTION`",
            "sleep" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
        "retry" => {
          "options" => {
            "active" => false,
            "factor" => 2,
            "maxDelay" => 2000,
            "minDelay" => 50,
            "retries" => 2,
            "statuses" => [
              408,
              425,
              429,
              500,
              502,
              503,
              504,
            ],
          },
          "optspec" => {
            "jitter" => "`$BOOLEAN`",
            "sleep" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
        "test" => {
          "options" => {
            "active" => false,
          },
          "optspec" => {
            "entity" => "`$MAP`",
            "net" => "`$MAP`",
          },
          "strict" => false,
          "transport" => "base",
        },
        "timeout" => {
          "options" => {
            "active" => false,
            "ms" => 30000,
          },
          "optspec" => {
            "clearTimer" => "`$FUNCTION`",
            "now" => "`$FUNCTION`",
            "setTimer" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
      },
      "options" => {
        "base" => "https://api.tasta.space/v1",
        "headers" => {
          "content-type" => "application/json",
        },
        "entity" => {
          "life" => {},
          "milestone" => {},
        },
      },
      "entity" => {
        "life" => {
          "fields" => [
            {
              "name" => "data",
              "title" => "Data",
              "type" => "`$OBJECT`",
              "req" => true,
              "short" => "Life statistics for one birth date, counted as of the moment of the request.",
            },
            {
              "name" => "meta",
              "title" => "Meta",
              "type" => "`$OBJECT`",
              "req" => true,
            },
          ],
          "name" => "life",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/life",
                  "segments" => [
                    {
                      "lit" => "life",
                    },
                  ],
                  "parts" => [
                    "life",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "query" => [
                      {
                        "name" => "born",
                        "orig" => "born",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                        "example" => "1994-03-12",
                      },
                      {
                        "name" => "time",
                        "orig" => "time",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "example" => "07:45",
                      },
                      {
                        "name" => "tz",
                        "orig" => "tz",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "example" => "America/New_York",
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "born",
                    ],
                  },
                  "response" => {
                    "kind" => "json",
                    "media" => "application/json",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "milestone" => {
          "fields" => [
            {
              "name" => "age",
              "title" => "Age",
              "type" => "`$INTEGER`",
              "short" => "The whole-number age on that planet, for planet-birthday milestones only.",
            },
            {
              "name" => "certificate",
              "title" => "Certificate",
              "type" => "`$STRING`",
              "req" => true,
              "short" => "Link to an SVG certificate for this milestone (format=png for PNG).",
            },
            {
              "name" => "date",
              "title" => "Date",
              "type" => "`$STRING`",
              "req" => true,
              "short" => "Date of the milestone in the caller's time zone.",
              "format" => "date",
            },
            {
              "name" => "days_until",
              "title" => "Days Until",
              "type" => "`$INTEGER`",
              "req" => true,
              "short" => "Days from today to the milestone (negative once passed).",
            },
            {
              "name" => "estimate",
              "title" => "Estimate",
              "type" => "`$BOOLEAN`",
              "req" => true,
              "short" => "True for estimated milestones (billion-heartbeats, at a steady 75 beats a minute).",
            },
            {
              "name" => "id",
              "title" => "Id",
              "type" => "`$STRING`",
              "req" => true,
              "short" => "Milestone id, as the certificate endpoint takes it: gigasecond, 2-gigaseconds, 3-gigaseconds, 10000-days ...",
            },
            {
              "name" => "name",
              "title" => "Name",
              "type" => "`$STRING`",
              "req" => true,
              "short" => "Milestone name.",
            },
            {
              "name" => "passed",
              "title" => "Passed",
              "type" => "`$BOOLEAN`",
              "req" => true,
              "short" => "Whether the milestone is already behind.",
            },
            {
              "name" => "planet",
              "title" => "Planet",
              "type" => "`$STRING`",
              "short" => "The planet, for planet-birthday milestones only.",
            },
          ],
          "id" => {
            "field" => "id",
            "name" => "id",
          },
          "name" => "milestone",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/life/milestones",
                  "segments" => [
                    {
                      "lit" => "life",
                    },
                    {
                      "lit" => "milestones",
                    },
                  ],
                  "parts" => [
                    "life",
                    "milestones",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.data`",
                  },
                  "args" => {
                    "query" => [
                      {
                        "name" => "born",
                        "orig" => "born",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                        "example" => "1994-03-12",
                      },
                      {
                        "name" => "count",
                        "orig" => "count",
                        "type" => "`$INTEGER`",
                        "kind" => "query",
                        "example" => 5,
                      },
                      {
                        "name" => "time",
                        "orig" => "time",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "example" => "07:45",
                      },
                      {
                        "name" => "tz",
                        "orig" => "tz",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "example" => "America/New_York",
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "born",
                    ],
                  },
                  "response" => {
                    "kind" => "json",
                    "media" => "application/json",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
      },
    }
  end


  def self.make_feature(name)
    require_relative 'features'
    LifeStatsFeatures.make_feature(name)
  end
end
