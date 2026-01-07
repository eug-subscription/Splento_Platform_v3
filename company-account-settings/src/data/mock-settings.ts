import type { TeamSettings, DataExport } from '@/types/settings';

export const MOCK_TEAM_SETTINGS: TeamSettings = {
    id: 'team-001',
    name: 'Wolt Design Team',
    description: 'Product design and UX research team',
    logo: 'https://avatar.vercel.sh/wolt-team.png',
    timezone: 'Europe/Helsinki',
    language: 'en',
    inviteExpirationDays: 7,
    assetOwnershipPolicy: 'transfer_to_admin',
    adminId: 'user-001',
    createdAt: '2023-01-15T10:00:00Z',
    updatedAt: '2026-01-05T14:00:00Z',
};

export const MOCK_EXPORT_HISTORY: DataExport[] = [
    {
        id: 'EXP-20260105-001',
        teamId: 'team-001',
        format: 'json',
        requestedAt: '2026-01-05T10:30:00Z',
        requestedBy: 'user-001',
        status: 'ready',
        dataScopes: ['members', 'permissions', 'activity_logs'],
        downloadUrl: 'https://example.com/exports/exp-001.json',
        fileSize: 1024000, // 1MB
        expiresAt: '2026-01-12T10:30:00Z',
    },
    {
        id: 'EXP-20260103-002',
        teamId: 'team-001',
        format: 'csv',
        requestedAt: '2026-01-03T14:20:00Z',
        requestedBy: 'user-002',
        status: 'expired',
        dataScopes: ['members', 'usage_history'],
    },
    {
        id: 'EXP-20260105-003',
        teamId: 'team-001',
        format: 'json',
        requestedAt: '2026-01-05T13:45:00Z',
        requestedBy: 'user-001',
        status: 'processing',
        dataScopes: ['members', 'permissions', 'activity_logs', 'billing_history'],
    },
];

export const MOCK_TEAM_DELETION_IMPACT = {
    memberCount: 12,
    assetCount: 1540,
    activeSubscription: true,
    estimatedDataSize: '2.4 GB'
};
