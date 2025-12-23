export type FeatureArea =
    | 'media'
    | 'studio'
    | 'orders'
    | 'batch'
    | 'analytics'
    | 'team'
    | 'billing'
    | 'settings'
    | 'api';

export type PermissionLevel = 'none' | 'read' | 'edit';

export type TeamRole = 'Account Manager' | 'Developer' | 'Sales' | 'Custom' | 'Designer' | 'Member';

export type UserStatus = 'active' | 'pending' | 'suspended' | 'inactive';

export type PlanType = 'Starter' | 'Professional' | 'Enterprise';

export interface Team {
    id: string;
    name: string;
    description: string;
    avatar: string;
    plan: PlanType;
    memberCount: number;
    seatsUsed: number;
    seatsTotal: number;
    creditsRemaining: number;
    creditsTotal: number;
    nextBillingDate: string;
    monthlyCost: number;
    perSeatCost: number;
}

export interface Member {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    role: TeamRole;
    customRoleName?: string;
    permissions: Record<FeatureArea, PermissionLevel>;
    status: UserStatus;
    joinedAt: string;
    lastActiveAt: string;
    twoFactorEnabled: boolean;
    activeSessions: number;
    assetsCreated: number;
    isAdmin: boolean;
}

export interface PendingInvite {
    id: string;
    email: string;
    role: string;
    invitedAt: string;
    expiresAt: string;
    invitedBy: string;
    daysUntilExpiry?: number;
}

export interface TeamOverviewData {
    stats: {
        members: { total: number; trend: string };
        credits: { remaining: number; total: number };
        periodUsage: { percentage: number; trend: string };
        seats: { used: number; total: number };
    };
    usageSnapshot: UsageMetric[];
    alerts: {
        lowCredits: boolean;
        creditsDepleted: boolean;
        paymentFailed: boolean;
        seatsFull: boolean;
    };
}

export interface UsageMetric {
    id: string;
    label: string;
    used: number;
    total: number;
    percentage: number;
    unit?: string;
}

export interface ActivityEntry {
    id: string;
    user: {
        name: string;
        avatar: string;
    } | null;
    action: string;
    category: 'members' | 'permissions' | 'billing' | 'api' | 'security' | 'settings';
    timestamp: string;
}

// Usage Tab Specific Types
export interface UsageSummaryMetric {
    id: string;
    label: string;
    icon: string;
    used: number;
    total: number | null;
    unit?: string;
    trend?: {
        value: number;
        direction: 'up' | 'down' | 'neutral';
    };
}

export interface DetailedMetric {
    id: string;
    label: string;
    icon: string;
    used: number;
    total: number | null;
    unit?: string;
}

export interface MemberUsage {
    memberId: string;
    name: string;
    email: string;
    avatar: string;
    aiCredits: number;
    photoSessions: number;
    videoSessions: number;
}

export interface UsageAlertsConfig {
    thresholds: {
        fifty: boolean;
        eighty: boolean;
        hundred: boolean;
    };
    recipients: string[];
    apiRateLimitAlerts: boolean;
}

export interface PeriodOption {
    id: string;
    label: string;
    startDate?: Date;
    endDate?: Date;
}
