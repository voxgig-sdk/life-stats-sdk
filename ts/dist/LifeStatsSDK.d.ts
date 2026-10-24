import { LifeEntity } from './entity/LifeEntity';
import { MilestoneEntity } from './entity/MilestoneEntity';
export type * from './LifeStatsTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { LifeStatsEntityBase } from './LifeStatsEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
type DirectResult = {
    ok: false;
    err: any;
    status?: undefined;
    headers?: undefined;
    data?: undefined;
} | {
    ok: boolean;
    status: number;
    headers: any;
    data: any;
    err?: any;
};
declare class LifeStatsSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<DirectResult>;
    _rawRequest(fetchargs?: any): Promise<DirectResult>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    Life(entopts?: Record<string, any>): LifeEntity;
    Milestone(entopts?: Record<string, any>): MilestoneEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): LifeStatsSDK;
    tester(testopts?: any, sdkopts?: any): LifeStatsSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof LifeStatsSDK;
export { stdutil, config, BaseFeature, LifeStatsEntityBase, LifeStatsSDK, SDK, };
export type { DirectResult };
