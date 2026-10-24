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
(0, node_test_1.describe)('LifeEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when LIFE_STATS_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('LIFE_STATS_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.LifeStatsSDK.test();
        const ent = testsdk.Life();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.LifeStatsSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.Life().load({ "born": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.LIFE_STATS_TEST_LIVE;
        for (const op of ['load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'life.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "data": { "a": true, "h": "Data", "n": "data", "r": true, "sh": "Life statistics for one birth date, counted as of the moment of the request.", "t": "`$OBJECT`", "key$": "data", "index$": 0 }, "meta": { "a": true, "h": "Meta", "n": "meta", "r": true, "t": "`$OBJECT`", "key$": "meta", "index$": 1 } }, "name": "life", "op": { "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /life", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "ex": "1994-03-12", "k": "query", "n": "born", "or": "born", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "ex": "07:45", "k": "query", "n": "time", "or": "time", "r": false, "t": "`$STRING`", "index$": 1 }, { "a": true, "ex": "America/New_York", "k": "query", "n": "tz", "or": "tz", "r": false, "t": "`$STRING`", "index$": 2 }] }, "k": "http", "m": "GET", "o": "/life", "q": { "exist": ["born"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "life" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "life", "name__orig": "life", "Name": "Life", "name_": "life", "name-": "life", "NAME": "LIFE", "index$": 0 }, { "active": true, "entity": "life", "key$": "BasicLifeFlow", "kind": "basic", "name": "BasicLifeFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "life_ref01", "srcdatavar": "life_ref01_data", "suffix": "_dt0" }, "m": {}, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-life_ref01" } }], "index$": 0 }] }, 'Life', { "GET /life": { "protocol": "http", "parameters": [{ "name": "born", "in": "query", "required": true, "description": "Birth date, YYYY-MM-DD, from 1900-01-01 to today.", "schema": { "type": "string", "format": "date" }, "example": "1994-03-12", "index$": 0 }, { "name": "time", "in": "query", "required": false, "description": "Birth time, HH:MM on a 24-hour clock. Without it the count starts at midnight.", "schema": { "type": "string", "pattern": "^([01][0-9]|2[0-3]):[0-5][0-9]$" }, "example": "07:45", "index$": 1 }, { "name": "tz", "in": "query", "required": false, "description": "IANA time zone of the birth and of \"today\".", "schema": { "type": "string", "default": "Europe/Bucharest" }, "example": "America/New_York", "index$": 2 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let life_ref01_data = Object.values(setup.data.existing.life)[0];
        // LOAD
        const life_ref01_ent = client.Life();
        const life_ref01_match_dt0 = {};
        const life_ref01_data_dt0 = (await life_ref01_ent.load(life_ref01_match_dt0)).data();
        (0, node_assert_1.default)(null != life_ref01_data_dt0);
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/life/LifeTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.LifeStatsSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['life01', 'life02', 'life03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'LIFE_STATS_TEST_LIFE_ENTID': idmap,
        'LIFE_STATS_TEST_LIVE': 'FALSE',
        'LIFE_STATS_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['LIFE_STATS_TEST_LIFE_ENTID'];
    const live = 'TRUE' === env.LIFE_STATS_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['LIFE_STATS_TEST_LIFE_ENTID'];
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
//# sourceMappingURL=LifeEntity.test.js.map