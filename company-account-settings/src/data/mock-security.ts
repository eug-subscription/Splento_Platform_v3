import type {
    SecurityState,
    SecurityOverview,
    MemberSecurityStatus,
    Session,
    LoginEvent,
    IpRule,
} from '@/types/security';
import { MOCK_MEMBERS } from '@/data/mock-team';

export const MOCK_SECURITY_OVERVIEW: SecurityOverview = {
    membersTotal: MOCK_MEMBERS.length,
    membersWith2FA: MOCK_MEMBERS.filter(m => m.twoFactorEnabled).length,
    membersWithout2FA: MOCK_MEMBERS.filter(m => !m.twoFactorEnabled).length,
    totalActiveSessions: MOCK_MEMBERS.reduce((acc, m) => acc + (m.activeSessions || 0), 0),
    recentFailedLogins: 2,
    ipRulesActive: 1,
    is2FAEnforced: false,
    isIpAllowlistEnabled: false,
};

export const MOCK_SECURITY_STATE: SecurityState = {
    overview: MOCK_SECURITY_OVERVIEW,
    twoFactor: {
        enforced: false,
        gracePeriodHours: 48,
        allowedMethods: ['totp', 'webauthn'],
        excludeAdmins: false,
    },
    sessions: {
        timeout: '7d',
        maxSessionsPerUser: 5,
        notifyOnNewSession: true,
    },
    ipAllowlist: {
        enabled: false,
        rules: [],
        currentUserIp: '192.168.1.100',
    },
    passwordPolicy: {
        minLength: 12,
        requireUppercase: true,
        requireLowercase: true,
        requireNumbers: true,
        requireSymbols: false,
        maxAgeDays: 90,
        historyCount: 5,
    },
};

export const MOCK_MEMBER_SECURITY: MemberSecurityStatus[] = MOCK_MEMBERS.map(member => ({
    memberId: member.id,
    name: member.name,
    email: member.email,
    avatar: member.avatar,
    role: member.role,
    twoFactorStatus: member.twoFactorEnabled ? 'enabled' : 'disabled',
    twoFactorMethod: member.twoFactorEnabled ? (member.id === '1' ? 'totp' : 'webauthn') : undefined,
    twoFactorEnabledAt: member.twoFactorEnabled ? '2024-06-15T10:30:00Z' : undefined,
    activeSessions: member.activeSessions || 0,
    lastLoginAt: member.lastActiveAt,
    lastLoginIp: member.id === '1' ? '192.168.1.100' : '10.0.0.50',
    recoveryCodesRemaining: member.twoFactorEnabled ? (member.id === '1' ? 8 : 10) : 0,
    lastSecurityCheck: member.twoFactorEnabled ? '2025-12-28T10:00:00Z' : undefined,
    isAdmin: member.isAdmin || false,
}));

export const MOCK_SESSIONS: Session[] = [
    {
        id: 'sess-1',
        memberId: '1',
        deviceType: 'desktop',
        browser: 'chrome',
        browserVersion: '120.0',
        os: 'macOS',
        osVersion: '14.2',
        ipAddress: '192.168.1.100',
        location: { city: 'London', country: 'United Kingdom', countryCode: 'GB' },
        createdAt: '2025-12-29T08:00:00Z',
        lastActiveAt: '2025-12-29T20:30:00Z',
        isCurrent: true,
    },
    {
        id: 'sess-2',
        memberId: '1',
        deviceType: 'mobile',
        browser: 'safari',
        browserVersion: '17.2',
        os: 'iOS',
        osVersion: '17.2',
        ipAddress: '82.45.123.200',
        location: { city: 'Manchester', country: 'United Kingdom', countryCode: 'GB' },
        createdAt: '2025-12-27T12:30:00Z',
        lastActiveAt: '2025-12-28T18:15:00Z',
        isCurrent: false,
    },
];

export const MOCK_LOGIN_HISTORY: LoginEvent[] = [
    {
        id: 'log-1',
        memberId: '1',
        memberEmail: 'anna@wolt.com',
        memberName: 'Anna Kowalski',
        timestamp: '2025-12-29T14:00:00Z',
        ipAddress: '192.168.1.100',
        location: { city: 'London', country: 'United Kingdom', countryCode: 'GB' },
        device: 'desktop',
        browser: 'chrome',
        status: 'success',
    },
    {
        id: 'log-2',
        memberId: '3',
        memberEmail: 'maria@wolt.com',
        memberName: 'Maria Santos',
        timestamp: '2025-12-29T10:22:00Z',
        ipAddress: '203.0.113.50',
        location: { city: 'Sydney', country: 'Australia', countryCode: 'AU' },
        device: 'desktop',
        browser: 'firefox',
        status: 'failed',
        failureReason: 'invalid_password',
    },
];

export const MOCK_IP_RULES: IpRule[] = [
    {
        id: 'ip-1',
        type: 'single',
        value: '192.168.1.100',
        label: 'Office - Main',
        createdAt: '2025-11-01T10:00:00Z',
        createdBy: 'anna@wolt.com',
        isActive: true,
    },
];
