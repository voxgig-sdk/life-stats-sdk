"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('MilestoneEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when LIFE_STATS_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('LIFE_STATS_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.LifeStatsSDK.test();
        const ent = testsdk.Milestone();
        (0, node_assert_1.default)(null != ent);
    });
    class FailHook extends __1.BaseFeature {
        name = 'failhook';
        version = '0.0.1';
        active = true;
        unexpected = 0;
        init() { }
        PreSpec() { throw new Error('milestone hook failed'); }
        PreUnexpected() { this.unexpected++; }
    }
    (0, node_test_1.test)('stream-error', async () => {
        const offline = { net: { offline: true } };
        await node_assert_1.default.rejects(async () => {
            for await (const _item of __1.LifeStatsSDK.test(offline).Milestone().stream('list')) { }
        }, /offline/);
        for await (const _item of __1.LifeStatsSDK.test(offline).Milestone()
            .stream('list', undefined, { ctrl: { throw: false } })) { }
        if (null != __1.config.feature?.rbac) {
            const denied = __1.LifeStatsSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } });
            await node_assert_1.default.rejects(async () => {
                for await (const _item of denied.Milestone().stream('list')) { }
            }, (err) => 'rbac_denied' === err.code);
        }
    });
    (0, node_test_1.test)('stream-ctrl', async () => {
        const explain = {};
        const ctrl = { explain };
        for await (const _item of __1.LifeStatsSDK.test().Milestone().stream('list', undefined, { ctrl })) { }
        node_assert_1.default.deepStrictEqual(Object.keys(ctrl), ['explain']);
        (0, node_assert_1.default)(explain === ctrl.explain && 0 < Object.keys(explain).length);
    });
    (0, node_test_1.test)('unexpected', async () => {
        const hook = new FailHook();
        const client = new __1.LifeStatsSDK({ feature: { test: { active: true } }, extend: [hook] });
        await node_assert_1.default.rejects(client.Milestone().list(), /hook failed/);
        (0, node_assert_1.default)(0 < hook.unexpected);
        const fired = hook.unexpected;
        node_assert_1.default.strictEqual(await client.Milestone().list(undefined, { throw: false }), undefined);
        (0, node_assert_1.default)(fired < hook.unexpected);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.LifeStatsSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.Milestone().list({ "born": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.LIFE_STATS_TEST_LIVE;
        for (const op of ['list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'milestone.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "age": { "a": true, "h": "Age", "n": "age", "r": false, "sh": "The whole-number age on that planet, for planet-birthday milestones only.", "t": "`$INTEGER`", "key$": "age", "index$": 0 }, "certificate": { "a": true, "h": "Certificate", "n": "certificate", "r": true, "sh": "Link to an SVG certificate for this milestone (format=png for PNG).", "t": "`$STRING`", "key$": "certificate", "index$": 1 }, "date": { "a": true, "fo": "date", "h": "Date", "n": "date", "r": true, "sh": "Date of the milestone in the caller's time zone.", "t": "`$STRING`", "key$": "date", "index$": 2 }, "days_until": { "a": true, "h": "Days Until", "n": "days_until", "r": true, "sh": "Days from today to the milestone (negative once passed).", "t": "`$INTEGER`", "key$": "days_until", "index$": 3 }, "estimate": { "a": true, "h": "Estimate", "n": "estimate", "r": true, "sh": "True for estimated milestones (billion-heartbeats, at a steady 75 beats a minute).", "t": "`$BOOLEAN`", "key$": "estimate", "index$": 4 }, "id": { "a": true, "h": "Id", "n": "id", "r": true, "sh": "Milestone id, as the certificate endpoint takes it: gigasecond, 2-gigaseconds, 3-gigaseconds, 10000-days ...", "t": "`$STRING`", "key$": "id", "index$": 5 }, "name": { "a": true, "h": "Name", "n": "name", "r": true, "sh": "Milestone name.", "t": "`$STRING`", "key$": "name", "index$": 6 }, "passed": { "a": true, "h": "Passed", "n": "passed", "r": true, "sh": "Whether the milestone is already behind.", "t": "`$BOOLEAN`", "key$": "passed", "index$": 7 }, "planet": { "a": true, "h": "Planet", "n": "planet", "r": false, "sh": "The planet, for planet-birthday milestones only.", "t": "`$STRING`", "key$": "planet", "index$": 8 } }, "id": { "field": "id", "name": "id" }, "name": "milestone", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /life/milestones", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "ex": "1994-03-12", "k": "query", "n": "born", "or": "born", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "ex": 5, "k": "query", "n": "count", "or": "count", "r": false, "t": "`$INTEGER`", "index$": 1 }, { "a": true, "ex": "07:45", "k": "query", "n": "time", "or": "time", "r": false, "t": "`$STRING`", "index$": 2 }, { "a": true, "ex": "America/New_York", "k": "query", "n": "tz", "or": "tz", "r": false, "t": "`$STRING`", "index$": 3 }] }, "k": "http", "m": "GET", "o": "/life/milestones", "q": { "exist": ["born"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "life" }, { "lit": "milestones" }], "t": { "req": "`reqdata`", "res": "`body.data`" }, "index$": 0 }], "key$": "list" } }, "relations": { "ancestors": [] }, "key$": "milestone", "name__orig": "milestone", "Name": "Milestone", "name_": "milestone", "name-": "milestone", "NAME": "MILESTONE", "index$": 1 }, { "active": true, "entity": "milestone", "key$": "BasicMilestoneFlow", "kind": "basic", "name": "BasicMilestoneFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "milestone_ref01" } }], "index$": 0 }] }, 'Milestone', { "GET /life/milestones": { "protocol": "http", "parameters": [{ "name": "born", "in": "query", "required": true, "description": "Birth date, YYYY-MM-DD, from 1900-01-01 to today.", "schema": { "type": "string", "format": "date" }, "example": "1994-03-12", "index$": 0 }, { "name": "time", "in": "query", "required": false, "description": "Birth time, HH:MM on a 24-hour clock. Without it the count starts at midnight.", "schema": { "type": "string", "pattern": "^([01][0-9]|2[0-3]):[0-5][0-9]$" }, "example": "07:45", "index$": 1 }, { "name": "tz", "in": "query", "required": false, "description": "IANA time zone of the birth and of \"today\".", "schema": { "type": "string", "default": "Europe/Bucharest" }, "example": "America/New_York", "index$": 2 }, { "name": "count", "in": "query", "required": false, "description": "How many milestones, 1 to 20.", "schema": { "type": "integer", "minimum": 1, "maximum": 20, "default": 10 }, "example": 5, "index$": 3 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let milestone_ref01_data = Object.values(setup.data.existing.milestone)[0];
        // LIST
        const milestone_ref01_ent = client.Milestone();
        const milestone_ref01_match = {};
        const milestone_ref01_list = (await milestone_ref01_ent.list(milestone_ref01_match)).map((e) => e.data());
    });
});
// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true;
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/milestone/MilestoneTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.LifeStatsSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['milestone01', 'milestone02', 'milestone03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'LIFE_STATS_TEST_MILESTONE_ENTID': idmap,
        'LIFE_STATS_TEST_LIVE': 'FALSE',
        'LIFE_STATS_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['LIFE_STATS_TEST_MILESTONE_ENTID'];
    const live = 'TRUE' === env.LIFE_STATS_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['LIFE_STATS_TEST_MILESTONE_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.LifeStatsSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {},
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
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
    };
    return setup;
}
//# sourceMappingURL=MilestoneEntity.test.js.map