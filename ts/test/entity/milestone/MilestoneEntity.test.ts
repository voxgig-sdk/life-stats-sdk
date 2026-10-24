

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { LifeStatsSDK, BaseFeature, config, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


loadEnvLocal(__dirname + '/../../../.env.local')


describe('MilestoneEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when LIFE_STATS_TEST_LIVE=TRUE.
  afterEach(liveDelay('LIFE_STATS_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = LifeStatsSDK.test()
    const ent = testsdk.Milestone()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('milestone hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of LifeStatsSDK.test(offline).Milestone().stream('list')) { }
    }, /offline/)

    for await (const _item of LifeStatsSDK.test(offline).Milestone()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = LifeStatsSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.Milestone().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of LifeStatsSDK.test().Milestone().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new LifeStatsSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.Milestone().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.Milestone().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = LifeStatsSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Milestone().list({"born":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.LIFE_STATS_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'milestone.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"age":{"a":true,"h":"Age","n":"age","r":false,"sh":"The whole-number age on that planet, for planet-birthday milestones only.","t":"`$INTEGER`","key$":"age","index$":0},"certificate":{"a":true,"h":"Certificate","n":"certificate","r":true,"sh":"Link to an SVG certificate for this milestone (format=png for PNG).","t":"`$STRING`","key$":"certificate","index$":1},"date":{"a":true,"fo":"date","h":"Date","n":"date","r":true,"sh":"Date of the milestone in the caller's time zone.","t":"`$STRING`","key$":"date","index$":2},"days_until":{"a":true,"h":"Days Until","n":"days_until","r":true,"sh":"Days from today to the milestone (negative once passed).","t":"`$INTEGER`","key$":"days_until","index$":3},"estimate":{"a":true,"h":"Estimate","n":"estimate","r":true,"sh":"True for estimated milestones (billion-heartbeats, at a steady 75 beats a minute).","t":"`$BOOLEAN`","key$":"estimate","index$":4},"id":{"a":true,"h":"Id","n":"id","r":true,"sh":"Milestone id, as the certificate endpoint takes it: gigasecond, 2-gigaseconds, 3-gigaseconds, 10000-days ...","t":"`$STRING`","key$":"id","index$":5},"name":{"a":true,"h":"Name","n":"name","r":true,"sh":"Milestone name.","t":"`$STRING`","key$":"name","index$":6},"passed":{"a":true,"h":"Passed","n":"passed","r":true,"sh":"Whether the milestone is already behind.","t":"`$BOOLEAN`","key$":"passed","index$":7},"planet":{"a":true,"h":"Planet","n":"planet","r":false,"sh":"The planet, for planet-birthday milestones only.","t":"`$STRING`","key$":"planet","index$":8}},"id":{"field":"id","name":"id"},"name":"milestone","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /life/milestones","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":"1994-03-12","k":"query","n":"born","or":"born","r":true,"t":"`$STRING`","index$":0},{"a":true,"ex":5,"k":"query","n":"count","or":"count","r":false,"t":"`$INTEGER`","index$":1},{"a":true,"ex":"07:45","k":"query","n":"time","or":"time","r":false,"t":"`$STRING`","index$":2},{"a":true,"ex":"America/New_York","k":"query","n":"tz","or":"tz","r":false,"t":"`$STRING`","index$":3}]},"k":"http","m":"GET","o":"/life/milestones","q":{"exist":["born"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"life"},{"lit":"milestones"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"milestone","name__orig":"milestone","Name":"Milestone","name_":"milestone","name-":"milestone","NAME":"MILESTONE","index$":1}, {"active":true,"entity":"milestone","key$":"BasicMilestoneFlow","kind":"basic","name":"BasicMilestoneFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"milestone_ref01"}}],"index$":0}]}, 'Milestone', {"GET /life/milestones":{"protocol":"http","parameters":[{"name":"born","in":"query","required":true,"description":"Birth date, YYYY-MM-DD, from 1900-01-01 to today.","schema":{"type":"string","format":"date"},"example":"1994-03-12","index$":0},{"name":"time","in":"query","required":false,"description":"Birth time, HH:MM on a 24-hour clock. Without it the count starts at midnight.","schema":{"type":"string","pattern":"^([01][0-9]|2[0-3]):[0-5][0-9]$"},"example":"07:45","index$":1},{"name":"tz","in":"query","required":false,"description":"IANA time zone of the birth and of \"today\".","schema":{"type":"string","default":"Europe/Bucharest"},"example":"America/New_York","index$":2},{"name":"count","in":"query","required":false,"description":"How many milestones, 1 to 20.","schema":{"type":"integer","minimum":1,"maximum":20,"default":10},"example":5,"index$":3}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let milestone_ref01_data = Object.values(setup.data.existing.milestone)[0] as any

    // LIST
    const milestone_ref01_ent = client.Milestone()
    const milestone_ref01_match: any = {}

    const milestone_ref01_list = (await milestone_ref01_ent.list(milestone_ref01_match)).map((e: any) => e.data())


  })
})



// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true

function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/milestone/MilestoneTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = LifeStatsSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['milestone01','milestone02','milestone03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'LIFE_STATS_TEST_MILESTONE_ENTID': idmap,
    'LIFE_STATS_TEST_LIVE': 'FALSE',
    'LIFE_STATS_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['LIFE_STATS_TEST_MILESTONE_ENTID']

  const live = 'TRUE' === env.LIFE_STATS_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['LIFE_STATS_TEST_MILESTONE_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new LifeStatsSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.LIFE_STATS_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
