# Security Tab Implementation Plan

> **Status:** Planning Phase  
> **Created:** 2025-12-29  
> **Last Updated:** 2025-12-29  
> **Author:** AI Assistant  
> **Layout Pattern:** Single-scroll (like Billing Tab)

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Architecture Overview](#2-architecture-overview)
3. [Feature Specification](#3-feature-specification)
4. [Type Definitions](#4-type-definitions)
5. [Data Layer](#5-data-layer)
6. [Component Hierarchy](#6-component-hierarchy)
7. [UI/UX Design](#7-uiux-design)
8. [State Management](#8-state-management)
9. [Implementation Phases](#9-implementation-phases)
10. [Accessibility Requirements](#10-accessibility-requirements)
11. [Security Considerations](#11-security-considerations)
12. [Testing Strategy](#12-testing-strategy)
13. [Pre-Commit Checklist](#13-pre-commit-checklist)

---

## 1. Executive Summary

The Security Tab will be a comprehensive security management interface within the Team Page, providing administrators with tools to enforce security policies, manage authentication requirements, monitor active sessions, and control access through IP restrictions.

### Design Decision: Single-Scroll Layout

Following the **Billing Tab pattern** (not Developers Tab side navigation):

- **Holistic view** — Security posture visible at a glance
- **Less friction** — No navigation between sections
- **Natural priority** — Important sections up top, advanced settings below
- **Collapsible sections** — Manage page length with `<Accordion>`

### Resolved Decisions

| Question | Decision | Notes |
|----------|----------|-------|
| **SSO** | Placeholder | "Coming Soon" card with provider logos |
| **Password Policies** | UI-only | No backend enforcement for now |
| **GeoIP** | Available | Show city + country for sessions |
| **Audit Retention** | 90 days | SOC 2 / ISO 27001 best practice |
| **Email Notifications** | Not now | Success toast only, no actual emails |

### Key Features

| Feature | Priority | Complexity | Expansion State |
|---------|----------|------------|-----------------|
| Security Overview | P0 | Low | Always visible |
| Two-Factor Authentication (2FA) | P0 | Medium | Expanded by default |
| Session Management | P0 | High | Expanded by default |
| IP Allowlist | P1 | Medium | Collapsed by default |
| Login History | P1 | Medium | Collapsed by default |
| Password Policies | P2 | Low | Collapsed by default |
| Single Sign-On (SSO) | P3 (Placeholder) | N/A | Collapsed by default |

---

## 2. Architecture Overview

### File Structure

```
src/
├── app/
│   └── TeamPage.tsx                    # Add SecurityTab lazy import
├── components/
│   └── team/
│       ├── tabs/
│       │   └── SecurityTab.tsx         # NEW: Main tab orchestrator
│       └── security/                   # NEW: Security-specific components
│           ├── SecurityOverviewCard.tsx
│           ├── TwoFactorCard.tsx
│           ├── MemberSecurityTable.tsx
│           ├── SessionManagementCard.tsx
│           ├── SessionRow.tsx
│           ├── IpAllowlistCard.tsx
│           ├── IpRuleRow.tsx
│           ├── LoginHistoryCard.tsx
│           ├── LoginHistoryTable.tsx
│           ├── PasswordPoliciesCard.tsx
│           ├── SsoPlaceholderCard.tsx
│           ├── SecurityTabSkeleton.tsx
│           └── modals/
│               ├── Enforce2FAModal.tsx
│               ├── RevokeSessionModal.tsx
│               ├── RevokeAllSessionsModal.tsx
│               ├── AddIpRuleModal.tsx
│               └── EditIpRuleModal.tsx
├── hooks/
│   └── useSecurity.ts                  # NEW: Security state management
├── types/
│   └── security.ts                     # NEW: Security type definitions
├── data/
│   ├── security-constants.ts           # NEW: Constants & configuration
│   └── mock-security.ts                # NEW: Mock data for development
└── utils/
    └── security.ts                     # NEW: Security utility functions
```

### Layout Pattern

**Single-scroll with collapsible cards** (like Billing Tab):

```
┌──────────────────────────────────────────────────────┐
│  Security Overview (4 stat cards in grid)            │
├──────────────────────────────────────────────────────┤
│  🔑 Two-Factor Authentication [expanded]             │
│     • Enforce toggle + grace period                  │
│     • Member compliance table                        │
├──────────────────────────────────────────────────────┤
│  💻 Session Management [expanded]                    │
│     • Timeout configuration                          │
│     • Your active sessions list                      │
├──────────────────────────────────────────────────────┤
│  🌐 IP Allowlist [collapsed] ▶                      │
├──────────────────────────────────────────────────────┤
│  📋 Login History [collapsed] ▶                     │
├──────────────────────────────────────────────────────┤
│  🔒 Password Policies [collapsed] ▶                 │
├──────────────────────────────────────────────────────┤
│  🔗 Single Sign-On — Coming Soon [collapsed] ▶      │
└──────────────────────────────────────────────────────┘
```

---

## 3. Feature Specification

### 3.1 Security Overview (Always Visible)

Four stat cards in a responsive grid showing security posture at a glance:

| Card | Metric | Visual | Action |
|------|--------|--------|--------|
| **2FA Coverage** | `8/12 members` | Progress bar | → Jump to 2FA section |
| **Active Sessions** | `15 sessions` | Count | → Jump to Sessions section |
| **Failed Logins (24h)** | `2 attempts` | Count + trend | → Jump to Login History |
| **IP Rules** | `3 active` | Count | → Jump to IP Allowlist |

**Alert Banner:** If any critical issues (e.g., "3 members without 2FA"), show warning banner at top.

### 3.2 Two-Factor Authentication (2FA)

#### 3.2.1 Team-Wide 2FA Control

| Requirement | Description |
|-------------|-------------|
| **Toggle** | Require 2FA for all members |
| **Grace Period** | Configurable period (24h, 48h, 7 days) before enforcement |
| **Enforcement Behaviour** | Members without 2FA are forced to set it up on next login |
| **Admin Bypass** | Option to exclude admins from enforcement (for emergency access) |

#### 3.2.2 Member 2FA Visibility

| Requirement | Description |
|-------------|-------------|
| **Status Table** | List all members with 2FA status (Enabled/Disabled) |
| **Filters** | Filter by 2FA status: All, Enabled, Disabled |
| **Search** | Search by name or email |
| **Bulk Actions** | "Send 2FA reminder" to selected members (toast only, no email) |
| **Sort** | By name, email, status, last active |
| **Collapsible** | Table is collapsible to save space |

#### 3.2.3 2FA Methods Displayed

- **Authenticator App** (TOTP) – Primary
- **SMS** – Flag as "Less secure"
- **Hardware Key** (WebAuthn/FIDO2) – Show "Premium" badge

### 3.3 Session Management

#### 3.3.1 Session Timeout Configuration

| Timeout Option | Description |
|----------------|-------------|
| 1 day | High security environments |
| 7 days | Standard security (default) |
| 30 days | Convenience-focused |
| Never | Disabled (show warning) |

**Behaviour:**

- Sessions expire after the configured period of **inactivity**
- Activity resets the timeout timer
- Configurable per team (not per user)

#### 3.3.2 Your Active Sessions

| Requirement | Description |
|-------------|-------------|
| **Session List** | Display all active sessions for the current user |
| **Session Details** | Device type, browser, OS, IP address, location (city, country via GeoIP) |
| **Current Session** | Highlight with "This device" badge |
| **Last Active** | Relative timestamp (e.g., "2 hours ago") |
| **Revoke Individual** | Button to revoke any session except current |
| **Revoke All Others** | "Sign out all other devices" action |

#### 3.3.3 Team Sessions Overview (Admin Only)

| Requirement | Description |
|-------------|-------------|
| **Total Count** | "15 active sessions across 8 members" |
| **Expandable** | Click to see sessions per member (future enhancement) |

### 3.4 IP Allowlist

#### 3.4.1 IP Access Control

| Requirement | Description |
|-------------|-------------|
| **Enable/Disable** | Master toggle for IP restriction |
| **Rule Types** | Single IP (`192.168.1.1`) or CIDR range (`10.0.0.0/24`) |
| **Labels** | Human-readable labels for each rule (e.g., "Office HQ", "VPN Exit") |
| **Rule Limit** | Maximum 50 rules per team |
| **Validation** | Real-time IP/CIDR format validation |

#### 3.4.2 Safety Features

| Feature | Description |
|---------|-------------|
| **Current IP Check** | Show "Your current IP: x.x.x.x" with status (would be allowed/blocked) |
| **Self-Lockout Warning** | Confirmation modal if enabling would block current admin |
| **Grace Period** | 30-minute window after enabling to prevent lockout |
| **Rule Table** | Type (Single/Range), Value, Label, Status toggle, Edit, Delete |

### 3.5 Login History

| Requirement | Description |
|-------------|-------------|
| **Recent Logins** | Last 90 days of login activity (SOC 2 compliant retention) |
| **Details** | Timestamp, member email, IP, city/country, device, browser, status |
| **Status Types** | Success ✓, Failed ✗, Blocked 🚫 |
| **Filters** | Filter by status (All, Success, Failed, Blocked), date range |
| **Search** | Search by email or IP |
| **Pagination** | 25 per page |
| **Export** | CSV export button for compliance |

### 3.6 Password Policies (UI-Only)

| Policy | Options |
|--------|---------|
| **Minimum Length** | 8, 12, 16 characters (default: 12) |
| **Require Uppercase** | Yes/No (default: Yes) |
| **Require Lowercase** | Yes/No (default: Yes) |
| **Require Numbers** | Yes/No (default: Yes) |
| **Require Symbols** | Yes/No (default: No) |
| **Password Age** | 30, 60, 90, 180 days, or Never (default: 90) |
| **Prevent Reuse** | Last 0, 3, 5, 10 passwords (default: 5) |

> **Note:** These settings are UI-only for now. Backend enforcement to be added later.

### 3.7 Single Sign-On (SSO) — Placeholder

| Provider | Status |
|----------|--------|
| Google Workspace | Coming Soon |
| Microsoft Entra (Azure AD) | Coming Soon |
| Okta | Coming Soon |
| SAML 2.0 Generic | Coming Soon |

**UI:** Card with provider logos and "Coming Soon" message. No configuration UI needed.

### 3.8 Security Audit Log (Internal)

All security-sensitive actions are logged for 90 days:

| Event Type | Logged Details |
|------------|----------------|
| 2FA enabled/disabled | Member, timestamp, admin who changed |
| 2FA enforcement toggled | Before/after, admin |
| Session revoked | Session details, who revoked |
| IP rule added/modified/removed | Rule details, admin |
| IP allowlist enabled/disabled | Admin, timestamp |
| Policy changed | Before/after values, admin |
| Failed login attempts | IP, timestamp, member email |

> **Note:** Audit log is backend-only for now. Future: add "Audit Log" section to Security Tab.

---

## 4. Type Definitions

### `src/types/security.ts`

```typescript
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
```

---

## 5. Data Layer

### `src/data/security-constants.ts`

```typescript
import type { SessionTimeoutOption } from '@/types/security';

export const SESSION_TIMEOUT_OPTIONS: {
  value: SessionTimeoutOption;
  label: string;
  description: string;
}[] = [
  { value: '1d', label: '1 day', description: 'High security' },
  { value: '7d', label: '7 days', description: 'Recommended' },
  { value: '30d', label: '30 days', description: 'Convenience' },
  { value: 'never', label: 'Never', description: 'Not recommended' },
];

export const GRACE_PERIOD_OPTIONS = [
  { value: 24, label: '24 hours' },
  { value: 48, label: '48 hours' },
  { value: 168, label: '7 days' },
];

export const PASSWORD_LENGTH_OPTIONS = [
  { value: 8, label: '8 characters', description: 'Minimum' },
  { value: 12, label: '12 characters', description: 'Recommended' },
  { value: 16, label: '16 characters', description: 'Strong' },
];

export const PASSWORD_AGE_OPTIONS = [
  { value: 30, label: '30 days' },
  { value: 60, label: '60 days' },
  { value: 90, label: '90 days' },
  { value: 180, label: '180 days' },
  { value: 0, label: 'Never expire' },
];

export const PASSWORD_HISTORY_OPTIONS = [
  { value: 0, label: 'No restriction' },
  { value: 3, label: 'Last 3 passwords' },
  { value: 5, label: 'Last 5 passwords' },
  { value: 10, label: 'Last 10 passwords' },
];

export const MAX_IP_RULES = 50;

export const AUDIT_RETENTION_DAYS = 90;

export const TWO_FACTOR_METHODS = [
  { id: 'totp', label: 'Authenticator App', icon: 'gravity-ui:smartphone', secure: true },
  { id: 'sms', label: 'SMS', icon: 'gravity-ui:comment', secure: false, warning: 'Less secure' },
  { id: 'webauthn', label: 'Hardware Key', icon: 'gravity-ui:key', secure: true, badge: 'Premium' },
] as const;

export const SSO_PROVIDERS = [
  { id: 'google', label: 'Google Workspace', logo: '/logos/google.svg' },
  { id: 'microsoft', label: 'Microsoft Entra', logo: '/logos/microsoft.svg' },
  { id: 'okta', label: 'Okta', logo: '/logos/okta.svg' },
  { id: 'saml', label: 'SAML 2.0', logo: '/logos/saml.svg' },
] as const;
```

### `src/data/mock-security.ts`

```typescript
import type {
  SecurityState,
  SecurityOverview,
  MemberSecurityStatus,
  Session,
  LoginEvent,
  IpRule,
} from '@/types/security';

export const MOCK_SECURITY_OVERVIEW: SecurityOverview = {
  membersTotal: 12,
  membersWith2FA: 9,
  membersWithout2FA: 3,
  totalActiveSessions: 15,
  recentFailedLogins: 2,
  ipRulesActive: 0,
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

export const MOCK_MEMBER_SECURITY: MemberSecurityStatus[] = [
  {
    memberId: '1',
    name: 'Jane Smith',
    email: 'jane@splento.com',
    avatar: 'https://i.pravatar.cc/150?u=jane',
    role: 'Admin',
    twoFactorStatus: 'enabled',
    twoFactorMethod: 'totp',
    twoFactorEnabledAt: '2024-06-15T10:30:00Z',
    activeSessions: 2,
    lastLoginAt: '2025-12-29T14:00:00Z',
    lastLoginIp: '192.168.1.100',
    isAdmin: true,
  },
  {
    memberId: '2',
    name: 'John Doe',
    email: 'john@splento.com',
    role: 'Developer',
    twoFactorStatus: 'disabled',
    activeSessions: 1,
    lastLoginAt: '2025-12-28T09:15:00Z',
    lastLoginIp: '10.0.0.50',
    isAdmin: false,
  },
  {
    memberId: '3',
    name: 'Alice Johnson',
    email: 'alice@splento.com',
    avatar: 'https://i.pravatar.cc/150?u=alice',
    role: 'Designer',
    twoFactorStatus: 'enabled',
    twoFactorMethod: 'webauthn',
    twoFactorEnabledAt: '2024-09-20T16:45:00Z',
    activeSessions: 3,
    lastLoginAt: '2025-12-29T08:00:00Z',
    lastLoginIp: '172.16.0.25',
    isAdmin: false,
  },
  // Add more mock members...
];

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
  // Add more mock sessions...
];

export const MOCK_LOGIN_HISTORY: LoginEvent[] = [
  {
    id: 'log-1',
    memberId: '1',
    memberEmail: 'jane@splento.com',
    memberName: 'Jane Smith',
    timestamp: '2025-12-29T14:00:00Z',
    ipAddress: '192.168.1.100',
    location: { city: 'London', country: 'United Kingdom', countryCode: 'GB' },
    device: 'desktop',
    browser: 'chrome',
    status: 'success',
  },
  {
    id: 'log-2',
    memberId: '2',
    memberEmail: 'john@splento.com',
    memberName: 'John Doe',
    timestamp: '2025-12-29T10:22:00Z',
    ipAddress: '203.0.113.50',
    location: { city: 'Sydney', country: 'Australia', countryCode: 'AU' },
    device: 'desktop',
    browser: 'firefox',
    status: 'failed',
    failureReason: 'invalid_password',
  },
  {
    id: 'log-3',
    memberId: '2',
    memberEmail: 'john@splento.com',
    memberName: 'John Doe',
    timestamp: '2025-12-29T10:25:00Z',
    ipAddress: '203.0.113.50',
    location: { city: 'Sydney', country: 'Australia', countryCode: 'AU' },
    device: 'desktop',
    browser: 'firefox',
    status: 'success',
  },
  // Add more mock login history entries...
];

export const MOCK_IP_RULES: IpRule[] = [
  {
    id: 'ip-1',
    type: 'single',
    value: '192.168.1.100',
    label: 'Office - Main',
    createdAt: '2025-11-01T10:00:00Z',
    createdBy: 'jane@splento.com',
    isActive: true,
  },
  {
    id: 'ip-2',
    type: 'range',
    value: '10.0.0.0/24',
    label: 'VPN Range',
    createdAt: '2025-11-15T14:30:00Z',
    createdBy: 'jane@splento.com',
    isActive: true,
  },
];
```

---

## 6. Component Hierarchy

### Main Tab Structure

```
SecurityTab (orchestrator)
├── SecurityTabSkeleton (loading state)
├── SecurityAlertBanner (if critical issues)
│
├── SecurityOverviewCard (grid of 4 stats)
│   ├── 2FA Coverage Stat
│   ├── Active Sessions Stat
│   ├── Failed Logins Stat
│   └── IP Rules Stat
│
├── TwoFactorCard [expanded by default]
│   ├── Card.Header (title + enforce toggle)
│   ├── Enforce2FASettings (grace period, excludeAdmins)
│   └── MemberSecurityTable (collapsible)
│       ├── Search + Filter controls
│       ├── Table with member rows
│       └── BulkActionsBar (when selected)
│
├── SessionManagementCard [expanded by default]
│   ├── Card.Header (title)
│   ├── SessionTimeoutSettings (radio group)
│   ├── Divider
│   ├── YourSessionsList
│   │   ├── SessionRow × N
│   │   └── RevokeAllOthersButton
│   └── TeamSessionsSummary (admin only)
│
├── Accordion (collapsed sections)
│   ├── Accordion.Item: IpAllowlistCard
│   │   ├── EnableToggle + CurrentIpDisplay
│   │   ├── IpRulesTable
│   │   │   └── IpRuleRow × N
│   │   └── AddRuleButton
│   │
│   ├── Accordion.Item: LoginHistoryCard
│   │   ├── Filters (status, date range)
│   │   ├── LoginHistoryTable
│   │   └── ExportButton
│   │
│   ├── Accordion.Item: PasswordPoliciesCard
│   │   ├── LengthSelect
│   │   ├── ComplexityToggles
│   │   ├── AgeSelect
│   │   └── HistorySelect
│   │
│   └── Accordion.Item: SsoPlaceholderCard
│       └── "Coming Soon" with provider logos
│
└── Modals (lazy loaded, conditionally rendered)
    ├── Enforce2FAModal
    ├── RevokeSessionModal
    ├── RevokeAllSessionsModal
    ├── AddIpRuleModal
    └── EditIpRuleModal
```

---

## 7. UI/UX Design

### Visual Layout

```
┌──────────────────────────────────────────────────────────────────────┐
│  ⚠️ Alert: 3 members don't have 2FA enabled                    [Fix] │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌───────────┐ │
│  │ 🔑 2FA      │  │ 💻 Sessions  │  │ ❌ Failed   │  │ 🌐 IP     │ │
│  │ 9/12 ████░░ │  │ 15 active    │  │ 2 (24h)     │  │ 0 rules   │ │
│  └──────────────┘  └──────────────┘  └──────────────┘  └───────────┘ │
│                                                                      │
│  ╔══════════════════════════════════════════════════════════════════╗│
│  ║ 🔑 Two-Factor Authentication                          [Toggle] ─ ║│
│  ╠══════════════════════════════════════════════════════════════════╣│
│  ║ Require 2FA: [OFF]                                               ║│
│  ║ Grace period: [48 hours ▼]    □ Exclude admins                  ║│
│  ║                                                                  ║│
│  ║ ┌────────────────────────────────────────────────────────────┐  ║│
│  ║ │ [🔍 Search members...]  [Filter: All ▼]                    │  ║│
│  ║ ├────────────────────────────────────────────────────────────┤  ║│
│  ║ │ □ │ 👤 Jane Smith      │ Admin  │ ✓ Enabled │ 2h ago      │  ║│
│  ║ │ □ │ 👤 John Doe        │ Dev    │ ✗ Disabled│ 1d ago      │  ║│
│  ║ │ □ │ 👤 Alice Johnson   │ Design │ ✓ Enabled │ 4h ago      │  ║│
│  ║ └────────────────────────────────────────────────────────────┘  ║│
│  ╚══════════════════════════════════════════════════════════════════╝│
│                                                                      │
│  ╔══════════════════════════════════════════════════════════════════╗│
│  ║ 💻 Session Management                                         ─ ║│
│  ╠══════════════════════════════════════════════════════════════════╣│
│  ║ Session timeout (inactivity):                                    ║│
│  ║ ○ 1 day  ● 7 days  ○ 30 days  ○ Never                          ║│
│  ║ ─────────────────────────────────────────────────────────────── ║│
│  ║ Your devices (2 active):                                        ║│
│  ║ ┌─────────────────────────────────────────────────────────────┐ ║│
│  ║ │ 💻 Chrome on macOS • London, GB • This device              │ ║│
│  ║ │    192.168.1.100 • Active now                               │ ║│
│  ║ ├─────────────────────────────────────────────────────────────┤ ║│
│  ║ │ 📱 Safari on iOS • Manchester, GB            [Revoke]       │ ║│
│  ║ │    82.45.123.200 • 2 days ago                               │ ║│
│  ║ └─────────────────────────────────────────────────────────────┘ ║│
│  ║                           [Sign out all other devices]           ║│
│  ╚══════════════════════════════════════════════════════════════════╝│
│                                                                      │
│  ┌──────────────────────────────────────────────────────────────────┐│
│  │ ▶ 🌐 IP Allowlist                                    0 rules    ││
│  └──────────────────────────────────────────────────────────────────┘│
│  ┌──────────────────────────────────────────────────────────────────┐│
│  │ ▶ 📋 Login History                                   90 days    ││
│  └──────────────────────────────────────────────────────────────────┘│
│  ┌──────────────────────────────────────────────────────────────────┐│
│  │ ▶ 🔒 Password Policies                                          ││
│  └──────────────────────────────────────────────────────────────────┘│
│  ┌──────────────────────────────────────────────────────────────────┐│
│  │ ▶ 🔗 Single Sign-On                              Coming Soon    ││
│  └──────────────────────────────────────────────────────────────────┘│
└──────────────────────────────────────────────────────────────────────┘
```

### Iconography (gravity-ui)

| Element | Icon |
|---------|------|
| 2FA | `gravity-ui:key` |
| Sessions | `gravity-ui:display` |
| Failed logins | `gravity-ui:xmark-circle` |
| IP Allowlist | `gravity-ui:globe` |
| Login History | `gravity-ui:clock` |
| Password | `gravity-ui:lock` |
| SSO | `gravity-ui:persons-lock` |
| Desktop | `gravity-ui:laptop` |
| Mobile | `gravity-ui:smartphone` |
| Tablet | `gravity-ui:tablet` |
| Success | `gravity-ui:circle-check-fill` |
| Failed | `gravity-ui:xmark-circle-fill` |
| Warning | `gravity-ui:triangle-exclamation-fill` |
| Current session | `gravity-ui:circle-fill` (small dot) |

### Status Chips

| Status | Style | Example |
|--------|-------|---------|
| Enabled / Success | `bg-success-soft text-success` | ✓ Enabled |
| Disabled / Off | `bg-default text-default-500` | ✗ Disabled |
| Warning | `bg-warning-soft text-warning` | ⚠ At risk |
| Blocked / Error | `bg-danger-soft text-danger` | 🚫 Blocked |
| Current | `bg-accent-soft text-accent` | This device |

### Responsive Behaviour

| Breakpoint | Layout Changes |
|------------|----------------|
| `lg+` (≥1024px) | Overview: 4-column grid, full tables |
| `md` (768-1023px) | Overview: 2-column grid, tables scroll |
| `<md` (≤767px) | Overview: 1-column stack, card layout for sessions |

---

## 8. State Management

### `src/hooks/useSecurity.ts`

```typescript
import { useState, useCallback, useMemo } from 'react';
import type {
  SecurityState,
  SecurityModalType,
  MemberSecurityStatus,
  Session,
  LoginEvent,
  IpRule,
  TwoFactorSettings,
  SessionSettings,
  PasswordPolicy,
  SessionTimeoutOption,
} from '@/types/security';
import {
  MOCK_SECURITY_STATE,
  MOCK_MEMBER_SECURITY,
  MOCK_SESSIONS,
  MOCK_LOGIN_HISTORY,
} from '@/data/mock-security';

interface UseSecurityReturn {
  // State
  security: SecurityState;
  memberSecurity: MemberSecurityStatus[];
  sessions: Session[];
  loginHistory: LoginEvent[];
  isLoading: boolean;
  error: Error | null;

  // Modal state
  activeModal: SecurityModalType | null;
  modalData: unknown;
  openModal: (modal: SecurityModalType, data?: unknown) => void;
  closeModal: () => void;

  // 2FA Actions
  toggleEnforce2FA: (enforced: boolean) => void;
  updateGracePeriod: (hours: number) => void;
  toggleExcludeAdmins: (exclude: boolean) => void;
  send2FAReminder: (memberIds: string[]) => void;

  // Session Actions
  updateSessionTimeout: (timeout: SessionTimeoutOption) => void;
  revokeSession: (sessionId: string) => void;
  revokeAllOtherSessions: () => void;

  // IP Allowlist Actions
  toggleIpAllowlist: (enabled: boolean) => void;
  addIpRule: (rule: Omit<IpRule, 'id' | 'createdAt' | 'createdBy'>) => void;
  updateIpRule: (ruleId: string, updates: Partial<IpRule>) => void;
  deleteIpRule: (ruleId: string) => void;

  // Password Policy Actions
  updatePasswordPolicy: (policy: Partial<PasswordPolicy>) => void;

  // Computed
  hasSecurityIssues: boolean;
  membersWithout2FA: MemberSecurityStatus[];
  currentUserSessions: Session[];
}

export function useSecurity(): UseSecurityReturn {
  // Implementation with useState for each piece of state
  // Memoize computed values
  // Return all actions and state
}
```

---

## 9. Implementation Phases

### Phase 1: Foundation (P0)

| Step | Task | Files |
|------|------|-------|
| 1.1 | Create type definitions | `src/types/security.ts` |
| 1.2 | Create constants | `src/data/security-constants.ts` |
| 1.3 | Create mock data | `src/data/mock-security.ts` |
| 1.4 | Create useSecurity hook | `src/hooks/useSecurity.ts` |
| 1.5 | Create SecurityTabSkeleton | `src/components/team/security/SecurityTabSkeleton.tsx` |
| 1.6 | Create SecurityTab orchestrator | `src/components/team/tabs/SecurityTab.tsx` |
| 1.7 | Integrate into TeamPage.tsx | Add lazy import + 'security' case |

### Phase 2: Security Overview (P0)

| Step | Task | Files |
|------|------|-------|
| 2.1 | Create SecurityOverviewCard | `security/SecurityOverviewCard.tsx` |
| 2.2 | Create SecurityAlertBanner | `security/SecurityAlertBanner.tsx` |

### Phase 3: Two-Factor Authentication (P0)

| Step | Task | Files |
|------|------|-------|
| 3.1 | Create TwoFactorCard | `security/TwoFactorCard.tsx` |
| 3.2 | Create MemberSecurityTable | `security/MemberSecurityTable.tsx` |
| 3.3 | Create Enforce2FAModal | `security/modals/Enforce2FAModal.tsx` |
| 3.4 | Add 2FA actions to useSecurity | `hooks/useSecurity.ts` |

### Phase 4: Session Management (P0)

| Step | Task | Files |
|------|------|-------|
| 4.1 | Create SessionManagementCard | `security/SessionManagementCard.tsx` |
| 4.2 | Create SessionRow | `security/SessionRow.tsx` |
| 4.3 | Create RevokeSessionModal | `security/modals/RevokeSessionModal.tsx` |
| 4.4 | Create RevokeAllSessionsModal | `security/modals/RevokeAllSessionsModal.tsx` |
| 4.5 | Add device/browser detection utils | `utils/security.ts` |
| 4.6 | Add session actions to useSecurity | `hooks/useSecurity.ts` |

### Phase 5: IP Allowlist (P1)

| Step | Task | Files |
|------|------|-------|
| 5.1 | Create IpAllowlistCard | `security/IpAllowlistCard.tsx` |
| 5.2 | Create IpRuleRow | `security/IpRuleRow.tsx` |
| 5.3 | Create AddIpRuleModal | `security/modals/AddIpRuleModal.tsx` |
| 5.4 | Create EditIpRuleModal | `security/modals/EditIpRuleModal.tsx` |
| 5.5 | Add IP validation utils | `utils/security.ts` |
| 5.6 | Add IP actions to useSecurity | `hooks/useSecurity.ts` |

### Phase 6: Login History (P1)

| Step | Task | Files |
|------|------|-------|
| 6.1 | Create LoginHistoryCard | `security/LoginHistoryCard.tsx` |
| 6.2 | Create LoginHistoryTable | `security/LoginHistoryTable.tsx` |
| 6.3 | Add CSV export utility | `utils/security.ts` |

### Phase 7: Password Policies (P2)

| Step | Task | Files |
|------|------|-------|
| 7.1 | Create PasswordPoliciesCard | `security/PasswordPoliciesCard.tsx` |

### Phase 8: SSO Placeholder (P3)

| Step | Task | Files |
|------|------|-------|
| 8.1 | Create SsoPlaceholderCard | `security/SsoPlaceholderCard.tsx` |

---

## 10. Accessibility Requirements

Following `dev_instruction_v2.md` and WCAG 2.1 AA:

| Requirement | Implementation |
|-------------|----------------|
| **Keyboard Navigation** | All interactive elements reachable via Tab |
| **Focus Indicators** | Visible focus ring on all buttons, inputs, rows |
| **Screen Reader** | Cards have `aria-label`, tables have proper headers |
| **onPress** | Use `onPress` not `onClick` for HeroUI components |
| **Icon-Only Buttons** | Must have `aria-label` (e.g., "Revoke session", "Edit IP rule") |
| **Status Changes** | Use `aria-live` regions for dynamic updates |
| **Colour Contrast** | Use design system semantic tokens (min 4.5:1) |
| **Error Messages** | Connected to inputs via `aria-describedby` |
| **Accordion** | Proper `aria-expanded` states |

---

## 11. Security Considerations

### Client-Side

| Consideration | Implementation |
|---------------|----------------|
| **IP Masking** | Show full IP only to admins, mask for others: `192.168.*.100` |
| **Session Token** | Never expose session tokens in UI |
| **XSS Prevention** | Sanitize user-generated labels (IP rule names) |
| **Rate Limiting UI** | Disable bulk actions after 3 attempts, show cooldown |

### Data Flow

| Action | Behaviour |
|--------|-----------|
| Revoke Session | Optimistic UI update → API call → rollback on error |
| Enable IP Allowlist | Confirmation modal → Check current IP → Enable |
| 2FA Enforcement | Show affected members count → Confirm → Apply |

---

## 12. Testing Strategy

### Unit Tests

| Component/Hook | Test Cases |
|----------------|------------|
| `useSecurity` | State mutations, mock data loading, error states |
| IP validation utils | Valid/invalid IP, CIDR parsing, range membership |
| Device detection utils | Browser/OS user-agent parsing |
| `formatLastActive` | Edge cases for time window logic |

### Integration Tests

| Flow | Test Cases |
|------|------------|
| 2FA Toggle | Enable → modal → confirm → state update |
| Session Revoke | Click → confirm → session removed |
| IP Rule CRUD | Add → validate → list update → edit → delete |

### Visual Regression

- Light and dark theme for entire tab
- All accordion states (expanded/collapsed)
- All modal states
- Mobile responsive layout

---

## 13. Pre-Commit Checklist

Per `dev_instruction_v2.md`:

- [ ] `npm run build` passes
- [ ] `npm run lint` passes
- [ ] `npm test` passes (when tests exist)
- [ ] Named exports used everywhere
- [ ] No `any` types
- [ ] No `use client`
- [ ] Imports use `@/` alias
- [ ] No wrapper components (direct HeroUI imports)
- [ ] Tested in both light AND dark themes
- [ ] CSS variables used for all colors
- [ ] `onPress` used for interactions
- [ ] Keyboard navigation verified
- [ ] Icon-only buttons have `aria-label`
- [ ] Focus indicators visible
- [ ] Logic extracted to `useSecurity` hook
- [ ] Data in `src/data/`
- [ ] All modals lazy loaded
- [ ] Suspense with themed fallbacks (skeleton)
- [ ] Main bundle stays under 500 KB

---

**End of Implementation Plan**
