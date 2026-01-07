import type { ActivityLogEntry, ActivityActor } from '@/types/activity';
import type { ActivityEntry } from '@/types/team';
import { MOCK_MEMBERS } from './mock-team';

const ACTORS: ActivityActor[] = MOCK_MEMBERS.map(m => ({
    id: m.id,
    name: m.name,
    email: m.email,
    avatar: m.avatar,
}));

const SYSTEM_ACTOR = null;

const createActivity = (
    id: string,
    actor: ActivityActor | null,
    category: ActivityLogEntry['category'],
    action: string,
    description: string,
    hoursAgo: number,
    metadata?: ActivityLogEntry['metadata']
): ActivityLogEntry => {
    const date = new Date();
    date.setHours(date.getHours() - hoursAgo);

    return {
        id,
        actor,
        category,
        action,
        description,
        timestamp: date.toISOString(),
        metadata: {
            ip: '185.123.45.67',
            location: 'Helsinki, FI',
            userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
            ...metadata,
        },
    };
};

export const MOCK_ACTIVITIES: ActivityLogEntry[] = [
    // Today
    createActivity('1', ACTORS[0], 'security', '2FA Enabled', 'Enabled two-factor authentication for the account', 0.2),
    createActivity('2', ACTORS[1], 'assets', 'AI Image Generated', 'Generated a batch of 50 product images', 1),
    createActivity('3', ACTORS[6], 'login', 'Successful Login', 'Logged in from a new device in Helsinki', 1.5),
    createActivity('4', ACTORS[0], 'billing', 'Invoice Paid', 'Invoice #INV-2024-012 for $299.00 paid successfully', 2),
    createActivity('5', SYSTEM_ACTOR, 'billing', 'Subscription Renewed', 'Enterprise plan subscription renewed for another month', 3),
    createActivity('6', ACTORS[2], 'api', 'Webhook Created', 'Added new endpoint https://api.wolt.com/webhooks/orders', 4),
    createActivity('7', ACTORS[0], 'members', 'Member Invited', 'Invited sarah@wolt.com to join the team as Developer', 5),
    createActivity('8', ACTORS[3], 'login', 'Login Failed', '3 failed login attempts from 192.168.1.1', 6),
    createActivity('9', ACTORS[0], 'permissions', 'Permissions Updated', 'Updated API permissions for Maria Santos', 7, {
        resourceName: 'Maria Santos',
        oldValue: 'read',
        newValue: 'edit'
    }),
    createActivity('10', ACTORS[4], 'settings', 'Branding Changed', 'Updated workspace logo and primary brand color', 8),

    // Yesterday
    createActivity('11', ACTORS[1], 'api', 'API Key Regenerated', 'Regenerated production API key for Wolt Operations', 25),
    createActivity('12', ACTORS[0], 'members', 'Role Changed', 'Changed role for John Doe from Member to Developer', 26, {
        resourceName: 'John Doe',
        oldValue: 'Member',
        newValue: 'Developer'
    }),
    createActivity('13', ACTORS[6], 'security', 'Session Revoked', 'Manually revoked active session on Chrome / Windows', 28),
    createActivity('14', SYSTEM_ACTOR, 'exports', 'Report Generated', 'Monthly usage report is ready for download', 30),
    createActivity('15', ACTORS[2], 'assets', 'Batch Export', 'Exported 1,240 assets to Google Drive', 32),
    createActivity('16', ACTORS[0], 'security', 'IP Rule Added', 'Added office IP range 213.157.12.0/24 to allowlist', 34),
    createActivity('17', ACTORS[5], 'login', 'Successful Login', 'Logged in from Chrome / MacOS', 36),
    createActivity('18', ACTORS[1], 'api', 'Webhook Disabled', 'Disabled webhook for https://legacy-api.com/hooks', 40),
    createActivity('19', ACTORS[0], 'billing', 'Card Updated', 'Updated primary payment method ending in 4242', 44),
    createActivity('20', ACTORS[4], 'settings', 'Workspace Renamed', 'Changed name from Wolt FI to Wolt Finland', 46),

    // Last 7 days
    createActivity('21', ACTORS[0], 'members', 'Member Removed', 'Removed Alex Smith from the workspace', 24 * 3),
    createActivity('22', ACTORS[2], 'permissions', 'Team Access Granted', 'Maria Santos granted access to Marketing Studio', 24 * 3 + 2),
    createActivity('23', ACTORS[6], 'login', 'Password Changed', 'User changed their account password', 24 * 4),
    createActivity('24', ACTORS[1], 'assets', 'AI Video Project', 'Started new video project "Winter Campaign 2025"', 24 * 4 + 5),
    createActivity('25', SYSTEM_ACTOR, 'integrations', 'Slack Connected', 'Workspace successfully connected to Slack', 24 * 5),
    createActivity('26', ACTORS[0], 'billing', 'Seat Added', 'Added 5 new seats to the Enterprise plan', 24 * 5 + 10),
    createActivity('27', ACTORS[3], 'login', 'Account Locked', 'Account locked due to multiple failed login attempts', 24 * 6),
    createActivity('28', ACTORS[2], 'api', 'API Key Created', 'Created test API key for internal dashboard', 24 * 6 + 4),
    createActivity('29', ACTORS[0], 'settings', 'Domain Verified', 'Verified wolt.fi domain for the workspace', 24 * 7),
    createActivity('30', ACTORS[5], 'security', '2FA Recovery', 'Generated new set of 2FA recovery codes', 24 * 7 + 2),

    // Last 30 days
    createActivity('31', ACTORS[0], 'billing', 'Plan Upgraded', 'Upgraded from Pro to Enterprise plan', 24 * 10),
    createActivity('32', ACTORS[1], 'integrations', 'Jira Integrated', 'Connected Jira Cloud to developer tools', 24 * 12),
    createActivity('33', SYSTEM_ACTOR, 'security', 'Audit Started', 'System-wide security audit initiated by Administrator', 24 * 15),
    createActivity('34', ACTORS[6], 'assets', 'Training Data Uploaded', 'Uploaded 10GB of brand assets for AI training', 24 * 18),
    createActivity('35', ACTORS[0], 'members', 'Admin Promoted', 'Promoted John Doe to Workspace Administrator', 24 * 20),
    createActivity('36', ACTORS[2], 'api', 'Rate Limit Hit', 'API key for production reached daily rate limit', 24 * 22),
    createActivity('37', ACTORS[4], 'settings', 'Timezone Updated', 'Workspace timezone changed to Europe/Helsinki', 24 * 25),
    createActivity('38', ACTORS[0], 'exports', 'Data Export', 'Full workspace data export requested', 24 * 28),
    createActivity('39', ACTORS[1], 'login', 'New Device', 'Successful login from a new device (iPhone 16 Pro)', 24 * 29),
    createActivity('40', SYSTEM_ACTOR, 'billing', 'Credits Added', 'Added 10,000 bonus AI credits to the balance', 24 * 30),

    // Last 90 days
    createActivity('41', ACTORS[0], 'members', 'Team Created', 'Wolt Finland workspace was created', 24 * 45),
    createActivity('42', ACTORS[5], 'security', 'Policy Updated', 'Updated organization password complexity policy', 24 * 50),
    createActivity('43', ACTORS[0], 'integrations', 'Figma Connected', 'Connected Figma workspace for design collaboration', 24 * 55),
    createActivity('44', ACTORS[2], 'api', 'Webhook Migration', 'Migrated 5 webhooks to the new API v3', 24 * 60),
    createActivity('45', SYSTEM_ACTOR, 'assets', 'Storage Increased', 'Storage limit increased to 50GB', 24 * 65),
    createActivity('46', ACTORS[1], 'login', 'Recovery Used', 'User logged in using a 2FA recovery code', 24 * 70),
    createActivity('47', ACTORS[0], 'billing', 'Credit Note', 'Credit note applied for previous service outage', 24 * 75),
    createActivity('48', ACTORS[4], 'settings', 'SSO Enabled', 'SAML SSO integration enabled for the workspace', 24 * 80),
    createActivity('49', ACTORS[6], 'security', 'Global Revoke', 'Revoked all active sessions for high-security maintenance', 24 * 85),
    createActivity('50', ACTORS[0], 'exports', 'Annual Report', 'Generated fiscal year 2024 activity report', 24 * 90),
    createActivity('51', ACTORS[2], 'assets', 'Archive Cleaned', 'Deleted 500 expired assets to free up storage', 24 * 95),
    createActivity('52', SYSTEM_ACTOR, 'login', 'Maintenance Login', 'System maintenance access recorded from internal IP', 24 * 100),
];

export const MOCK_RECENT_ACTIVITY: ActivityEntry[] = [
    { id: '1', user: { name: 'Anna K.', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026024d' }, action: 'invited sarah@wolt.com', category: 'members', timestamp: '2 hours ago' },
    { id: '2', user: { name: 'John D.', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d' }, action: 'updated permissions for Mike', category: 'permissions', timestamp: '5 hours ago' },
    { id: '3', user: null, action: 'Invoice #1247 paid successfully', category: 'billing', timestamp: 'Yesterday' },
    { id: '4', user: { name: 'Maria S.', avatar: 'https://i.pravatar.cc/150?u=a048581f4e29026701d' }, action: 'created API key "Production"', category: 'api', timestamp: '2 days ago' },
    { id: '5', user: { name: 'Anna K.', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026024d' }, action: 'enabled 2FA enforcement', category: 'security', timestamp: '3 days ago' },
];
