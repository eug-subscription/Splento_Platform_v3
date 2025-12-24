import type { Team, TeamOverviewData, Member, PendingInvite, FeatureArea, PermissionLevel } from '../types/team';

export const MOCK_TEAM: Team = {
    id: 'team-1',
    name: 'Wolt Finland',
    description: 'Main workspace for Wolt Finland operations',
    avatar: 'https://cdn.brandfetch.io/idAwO7GCAj/id5_6d209D.jpeg',
    plan: 'Enterprise',
    memberCount: 12,
    seatsUsed: 12,
    seatsTotal: 20,
    creditsRemaining: 15420,
    creditsTotal: 50000,
    nextBillingDate: '2025-01-01',
    monthlyCost: 299,
    perSeatCost: 29
};


export const TEAM_OVERVIEW_DATA: TeamOverviewData = {
    stats: {
        members: { total: 12, trend: '+2 this month' },
        credits: { remaining: 1247, total: 5000 },
        periodUsage: { percentage: 67, trend: '+12% vs last month' },
        seats: { used: 12, total: 20 },
    },
    usageSnapshot: [
        { id: 'img', label: 'AI Image Credits', used: 3253, total: 5000, percentage: 65, unit: '' },
        { id: 'vid', label: 'AI Video Credits', used: 42, total: 100, percentage: 42, unit: '' },
        { id: 'api', label: 'API Calls', used: 58420, total: 100000, percentage: 58, unit: '' },
        { id: 'storage', label: 'Storage', used: 4.5, total: 5, percentage: 89, unit: 'GB' },
        { id: 'batch', label: 'Batch Exports', used: 73, total: 100, percentage: 73, unit: '' },
    ],
    alerts: {
        lowCredits: true,
        creditsDepleted: false,
        paymentFailed: false,
        seatsFull: false,
    },
};

const DEFAULT_PERMISSIONS: Record<FeatureArea, PermissionLevel> = {
    media: 'read',
    studio: 'read',
    orders: 'read',
    batch: 'none',
    analytics: 'none',
    team: 'none',
    billing: 'none',
    settings: 'none',
    api: 'none',
};

export const MOCK_MEMBERS: Member[] = [
    {
        id: '1',
        name: 'Anna Kowalski',
        email: 'anna@wolt.com',
        avatar: 'https://i.pravatar.cc/150?u=anna',
        role: 'Account Manager',
        permissions: { ...DEFAULT_PERMISSIONS, team: 'edit', billing: 'edit' },
        status: 'active',
        twoFactorEnabled: true,
        joinedAt: 'Mar 2024',
        lastActiveAt: new Date(Date.now() - 1000 * 60 * 12).toISOString(), // 12 mins ago
        activeSessions: 3,
        assetsCreated: 847,
        isAdmin: true,
    },
    {
        id: '2',
        name: 'John Doe',
        email: 'john@wolt.com',
        avatar: 'https://i.pravatar.cc/150?u=john',
        role: 'Developer',
        permissions: { ...DEFAULT_PERMISSIONS, api: 'edit', media: 'edit' },
        status: 'inactive',
        twoFactorEnabled: true,
        joinedAt: 'Apr 2024',
        lastActiveAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // 5 hours ago
        activeSessions: 1,
        assetsCreated: 120,
        isAdmin: false,
    },
    {
        id: '3',
        name: 'Maria Santos',
        email: 'maria@wolt.com',
        avatar: 'https://i.pravatar.cc/150?u=maria',
        role: 'Developer',
        permissions: { ...DEFAULT_PERMISSIONS, api: 'edit' },
        status: 'active',
        twoFactorEnabled: false,
        joinedAt: 'May 2024',
        lastActiveAt: new Date(Date.now() - 1000 * 60 * 60 * 25).toISOString(), // Yesterday (25 hours ago)
        activeSessions: 0,
        assetsCreated: 45,
        isAdmin: false,
    },
    {
        id: '4',
        name: 'Mike Johnson',
        email: 'mike@wolt.com',
        avatar: 'https://i.pravatar.cc/150?u=mike',
        role: 'Sales',
        permissions: { ...DEFAULT_PERMISSIONS, orders: 'read' },
        status: 'suspended',
        twoFactorEnabled: false,
        joinedAt: 'Jun 2024',
        lastActiveAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(), // 5 days ago
        activeSessions: 0,
        assetsCreated: 12,
        isAdmin: false,
    },
    {
        id: '5',
        name: 'David Kim',
        email: 'david@wolt.com',
        avatar: 'https://i.pravatar.cc/150?u=david',
        role: 'Designer',
        permissions: { ...DEFAULT_PERMISSIONS, media: 'edit', studio: 'edit' },
        status: 'inactive',
        twoFactorEnabled: true,
        joinedAt: 'Jul 2024',
        lastActiveAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 60).toISOString(), // Current Year (~2 months ago)
        activeSessions: 0,
        assetsCreated: 15,
        isAdmin: false,
    },
    {
        id: '6',
        name: 'Sarah Lee',
        email: 'sarah.l@wolt.com',
        avatar: 'https://i.pravatar.cc/150?u=sarah',
        role: 'Member',
        permissions: { ...DEFAULT_PERMISSIONS },
        status: 'inactive',
        twoFactorEnabled: true,
        joinedAt: 'Jan 2023',
        lastActiveAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 400).toISOString(), // Previous Year
        activeSessions: 0,
        assetsCreated: 5,
        isAdmin: false,
    },
    {
        id: '7',
        name: 'Tom Wilson',
        email: 'tom@wolt.com',
        avatar: 'https://i.pravatar.cc/150?u=tom',
        role: 'Developer',
        permissions: { ...DEFAULT_PERMISSIONS, api: 'edit' },
        status: 'active',
        twoFactorEnabled: true,
        joinedAt: 'Dec 2024',
        lastActiveAt: new Date().toISOString(), // Just now
        activeSessions: 1,
        assetsCreated: 2,
        isAdmin: false,
    },
];

export const MOCK_PENDING_INVITES: PendingInvite[] = [
    {
        id: 'inv-1',
        email: 'sarah@wolt.com',
        role: 'Developer',
        invitedBy: 'Anna K.',
        invitedAt: '2024-12-10',
        expiresAt: '2024-12-22',
        daysUntilExpiry: 5,
    },
    {
        id: 'inv-2',
        email: 'mike.new@wolt.com',
        role: 'Sales',
        invitedBy: 'Anna K.',
        invitedAt: '2024-12-12',
        expiresAt: '2024-12-19',
        daysUntilExpiry: 2,
    },
];
