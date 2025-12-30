// --- Two-Factor Authentication ---
export type TwoFactorMethod = 'totp' | 'sms' | 'webauthn';

export type TwoFactorStatus = 'enabled' | 'disabled' | 'pending';

export interface TwoFactorSettings {
    enforced: boolean;
    gracePeriodHours: number; // 24, 48, 168 (7 days)
    allowedMethods: TwoFactorMethod[];
    excludeAdmins: boolean;
    enforcedAt?: string; // ISO timestamp when enforcement started
}

export interface MemberSecurityStatus {
    memberId: string;
    name: string;
    email: string;
    avatar?: string;
    role: string;
    twoFactorStatus: TwoFactorStatus;
    twoFactorMethod?: TwoFactorMethod;
    twoFactorEnabledAt?: string;
    activeSessions: number;
    lastLoginAt?: string;
    lastLoginIp?: string;
    recoveryCodesRemaining: number;
    lastSecurityCheck?: string; // ISO timestamp
    isAdmin: boolean;
}

// --- Session Management ---
export type DeviceType = 'desktop' | 'mobile' | 'tablet' | 'unknown';

export type BrowserType = 'chrome' | 'firefox' | 'safari' | 'edge' | 'other';

export interface Session {
    id: string;
    memberId: string;
    deviceType: DeviceType;
    browser: BrowserType;
    browserVersion?: string;
    os: string;
    osVersion?: string;
    ipAddress: string;
    location: {
        city?: string;
        country: string;
        countryCode: string;
    };
    createdAt: string; // Session start
    lastActiveAt: string;
    isCurrent: boolean;
}

export type SessionTimeoutOption = '1d' | '7d' | '30d' | 'never';

export interface SessionSettings {
    timeout: SessionTimeoutOption;
    maxSessionsPerUser: number; // 0 = unlimited
    notifyOnNewSession: boolean;
}

// --- IP Allowlist ---
export type IpRuleType = 'single' | 'range';

export interface IpRule {
    id: string;
    type: IpRuleType;
    value: string; // IP or CIDR
    label: string;
    createdAt: string;
    createdBy: string;
    lastModifiedAt?: string;
    isActive: boolean;
}

export interface IpAllowlistSettings {
    enabled: boolean;
    rules: IpRule[];
    currentUserIp: string;
    graceEndAt?: string; // ISO timestamp when grace period ends
}

// --- Login History ---
export type LoginStatus = 'success' | 'failed' | 'blocked';

export interface LoginEvent {
    id: string;
    memberId: string;
    memberEmail: string;
    memberName: string;
    timestamp: string;
    ipAddress: string;
    location: {
        city?: string;
        country: string;
        countryCode: string;
    };
    device: DeviceType;
    browser: BrowserType;
    status: LoginStatus;
    failureReason?: 'invalid_password' | 'ip_blocked' | '2fa_failed' | 'account_locked';
}

// --- Password Policies ---
export interface PasswordPolicy {
    minLength: 8 | 12 | 16;
    requireUppercase: boolean;
    requireLowercase: boolean;
    requireNumbers: boolean;
    requireSymbols: boolean;
    maxAgeDays: 30 | 60 | 90 | 180 | 0; // 0 = never expire
    historyCount: 0 | 3 | 5 | 10;
}

// --- Security Overview ---
export interface SecurityOverview {
    membersTotal: number;
    membersWith2FA: number;
    membersWithout2FA: number;
    totalActiveSessions: number;
    recentFailedLogins: number; // Last 24h
    ipRulesActive: number;
    is2FAEnforced: boolean;
    isIpAllowlistEnabled: boolean;
}

// --- Complete Security State ---
export interface SecurityState {
    overview: SecurityOverview;
    twoFactor: TwoFactorSettings;
    sessions: SessionSettings;
    ipAllowlist: IpAllowlistSettings;
    passwordPolicy: PasswordPolicy;
}

// --- Modal Types ---
export type SecurityModalType =
    | 'enforce_2fa'
    | 'revoke_session'
    | 'revoke_all_sessions'
    | 'add_ip_rule'
    | 'edit_ip_rule'
    | 'delete_ip_rule'
    | 'confirm_ip_allowlist_enable';
