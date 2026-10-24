import { LifeStatsEntityBase } from '../LifeStatsEntityBase';
import type { LifeStatsSDK } from '../LifeStatsSDK';
import type { Control } from '../types';
import type { Milestone, MilestoneListMatch } from '../LifeStatsTypes';
declare class MilestoneEntity extends LifeStatsEntityBase<Milestone> {
    constructor(client: LifeStatsSDK, entopts: any);
    make(this: MilestoneEntity): MilestoneEntity;
    list(this: any, reqmatch?: MilestoneListMatch, ctrl?: Control): Promise<MilestoneEntity[]>;
}
export { MilestoneEntity };
