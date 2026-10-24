import { LifeStatsEntityBase } from '../LifeStatsEntityBase';
import type { LifeStatsSDK } from '../LifeStatsSDK';
import type { Control } from '../types';
import type { Life, LifeLoadMatch } from '../LifeStatsTypes';
declare class LifeEntity extends LifeStatsEntityBase<Life> {
    constructor(client: LifeStatsSDK, entopts: any);
    make(this: LifeEntity): LifeEntity;
    load(this: any, reqmatch?: LifeLoadMatch, ctrl?: Control): Promise<LifeEntity>;
}
export { LifeEntity };
