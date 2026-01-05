export type ActivityCategory =
    | 'members'
    | 'permissions'
    | 'billing'
    | 'api'
    | 'security'
    | 'settings'
    | 'assets'
    | 'login'
    | 'integrations'
    | 'exports';

export interface ActivityActor {
    id: string;
    name: string;
    email: string;
    avatar?: string;
}

export interface ActivityMetadata {
    ip?: string;
    location?: string;
    userAgent?: string;
    resourceId?: string;
    resourceName?: string;
    oldValue?: string;
    newValue?: string;
}

export interface ActivityLogEntry {
    id: string;
    actor: ActivityActor | null; // null = System
    action: string;
    description: string;
    category: ActivityCategory;
    timestamp: string; // ISO string for better transport/serialization
    metadata?: ActivityMetadata;
}

export type DateRangePreset =
    | 'today'
    | 'yesterday'
    | 'last_7_days'
    | 'last_30_days'
    | 'last_90_days'
    | 'custom';

export interface DateRange {
    start: Date;
    end: Date;
}

export interface ActivityFilters {
    category: ActivityCategory | 'all';
    memberId: string | 'all';
    dateRange: DateRangePreset;
    customDateRange?: DateRange;
    search: string;
}
