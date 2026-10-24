import { describe, test } from 'node:test'
import { SDK } from '..'
import { runDefinitionPoint } from './definition-runner'
import { isControlSkipped } from './utility'


// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN: any[] = [
  {
    "entity": "life",
    "accessor": "Life",
    "op": "load",
    "method": "GET",
    "path": "/life",
    "args": [],
    "select": {
      "born": "1994-03-12",
      "time": "07:45",
      "tz": "America/New_York"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "born",
      "time",
      "tz"
    ],
    "queryArgs": [
      {
        "name": "born",
        "wire": "born"
      },
      {
        "name": "time",
        "wire": "time"
      },
      {
        "name": "tz",
        "wire": "tz"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "data": {
        "born": "1994-03-12",
        "time": "07:45",
        "weekday": "Saturday",
        "age": {
          "years": 32,
          "months": 7,
          "days": 11
        },
        "days": 11913,
        "seconds": 1029357139,
        "leap_seconds_lived": 9,
        "gigasecond": {
          "date": "2025-11-18",
          "passed": true,
          "days_until": -339
        },
        "full_moons_seen": 403,
        "leap_days_lived": 8,
        "friday_13ths_survived": 56,
        "km_around_the_sun": 30654255599,
        "km_around_the_galaxy": 236752141970,
        "heartbeats_estimate": 1286696423,
        "breaths_estimate": 257339284,
        "age_on": {
          "mercury": 135.43,
          "venus": 1,
          "mars": 17.34,
          "jupiter": 1,
          "saturn": 1,
          "uranus": 1,
          "neptune": 1,
          "pluto": 1
        },
        "next_milestones": [
          {
            "id": "mars-18",
            "name": "18 on Mars",
            "date": "2028-01-18",
            "days_until": 452,
            "passed": false,
            "estimate": false,
            "planet": "mars",
            "age": 18,
            "certificate": "https://api.tasta.space/v1/life/certificate?born=1994-03-12&milestone=mars-18"
          }
        ]
      },
      "meta": {
        "as_of": "2026-10-23T21:34:49+03:00",
        "timezone": "Europe/Bucharest",
        "time_assumed": "00:00, no time given",
        "notes": {},
        "assumptions": {
          "heart_rate_bpm": 75,
          "breaths_per_minute": 15,
          "earth_orbital_speed_km_s": 29.78,
          "sun_galactic_speed_km_s": 230,
          "synodic_month_days": 29.530588861,
          "orbital_periods_days": {
            "mercury": 1,
            "venus": 1,
            "mars": 1,
            "jupiter": 1,
            "saturn": 1,
            "uranus": 1,
            "neptune": 1,
            "pluto": 1
          }
        },
        "sources": {},
        "links": {
          "milestones": "https://api.tasta.space/v1/life/milestones?born=1994-03-12",
          "certificate": "https://api.tasta.space/v1/life/certificate?born=1994-03-12&milestone=gigasecond"
        }
      }
    },
    "idField": "id"
  },
  {
    "entity": "milestone",
    "accessor": "Milestone",
    "op": "list",
    "method": "GET",
    "path": "/life/milestones",
    "args": [],
    "select": {
      "born": "1994-03-12",
      "count": 5,
      "time": "07:45",
      "tz": "America/New_York"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "born",
      "time",
      "tz",
      "count"
    ],
    "queryArgs": [
      {
        "name": "born",
        "wire": "born"
      },
      {
        "name": "count",
        "wire": "count"
      },
      {
        "name": "time",
        "wire": "time"
      },
      {
        "name": "tz",
        "wire": "tz"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "data": [
        {
          "id": "mars-18",
          "name": "18 on Mars",
          "date": "2028-01-18",
          "days_until": 452,
          "passed": false,
          "estimate": false,
          "planet": "mars",
          "age": 18,
          "certificate": "https://api.tasta.space/v1/life/certificate?born=1994-03-12&milestone=mars-18"
        }
      ],
      "meta": {
        "as_of": "2026-10-23T21:34:58+03:00",
        "timezone": "Europe/Bucharest",
        "time_assumed": "00:00, no time given",
        "count": 10,
        "ids": "Fixed: gigasecond, 2-gigaseconds, 3-gigaseconds, 10000-days, 15000-days, 20000-days, 25000-days, 30000-days, billion-heartbeats. Planets: <planet>-<age>, like mars-18.",
        "notes": {}
      }
    },
    "idField": "id"
  }
]


describe('definition', () => {
  for (const point of PLAN) {
    test(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
      const control = isControlSkipped('entityOp', point.entity + '.' + point.op, 'definition')
      if (control.skip) {
        t.skip(control.reason || 'skipped via sdk-test-control.json')
        return
      }
      await runDefinitionPoint(SDK, point)
    })
  }
})
