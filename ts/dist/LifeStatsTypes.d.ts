export interface Life {
    data: Record<string, any>;
    meta: Record<string, any>;
}
export interface LifeLoadMatch {
    born: string;
    time?: string;
    tz?: string;
}
export interface Milestone {
    age?: number;
    certificate: string;
    date: string;
    days_until: number;
    estimate: boolean;
    id: string;
    name: string;
    passed: boolean;
    planet?: string;
}
export interface MilestoneListMatch {
    born: string;
    count?: number;
    time?: string;
    tz?: string;
}
