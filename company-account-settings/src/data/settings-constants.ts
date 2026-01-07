import type {
    LanguageOption,
    AssetOwnershipPolicyConfig,
    DataScope
} from '@/types/settings';

/**
 * Supported Languages
 */
export const LANGUAGES: LanguageOption[] = [
    { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧' },
    { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪' },
    { code: 'it', name: 'Italian', nativeName: 'Italiano', flag: '🇮🇹' },
    { code: 'pt', name: 'Portuguese', nativeName: 'Português', flag: '🇵🇹' },
    { code: 'ja', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵' },
    { code: 'zh', name: 'Chinese', nativeName: '中文', flag: '🇨🇳' },
];

/**
 * Asset Ownership Policies
 */
export const ASSET_OWNERSHIP_POLICIES: AssetOwnershipPolicyConfig[] = [
    {
        value: 'transfer_to_admin',
        label: 'Transfer to Admin',
        description: 'All assets automatically transfer to team admin upon member removal',
        requiresConfirmation: false,
        icon: 'gravity-ui:arrow-right-arrow-left',
    },
    {
        value: 'reassign_prompt',
        label: 'Prompt for Reassignment',
        description: 'Require manual reassignment of assets before member removal',
        requiresConfirmation: false,
        icon: 'gravity-ui:person-gear',
    },
    {
        value: 'archive',
        label: 'Archive Assets',
        description: 'Move all assets to read-only archive (accessible by admins)',
        requiresConfirmation: false,
        icon: 'gravity-ui:folder-lock',
    },
    {
        value: 'delete',
        label: 'Delete All Assets',
        description: 'Permanently delete all assets owned by removed member',
        requiresConfirmation: true,
        icon: 'gravity-ui:trash-bin',
    },
];

/**
 * Data Export Scopes
 */
export const DATA_SCOPES: Array<{ value: DataScope; label: string; description: string }> = [
    {
        value: 'members',
        label: 'Team Members',
        description: 'Names, emails, roles, and status',
    },
    {
        value: 'permissions',
        label: 'Permissions',
        description: 'Permission matrices and custom roles',
    },
    {
        value: 'activity_logs',
        label: 'Activity Logs',
        description: 'Full audit trail of team actions',
    },
    {
        value: 'usage_history',
        label: 'Usage History',
        description: 'Credits, API calls, and resource consumption',
    },
    {
        value: 'billing_history',
        label: 'Billing History',
        description: 'Invoices, payments, and subscription details',
    },
    {
        value: 'api_keys',
        label: 'API Keys',
        description: 'API keys and webhook configurations',
    },
];

/**
 * Common Timezones (Top 30 by usage)
 * Full list would include ~400 IANA timezones
 */
export const COMMON_TIMEZONES = [
    { value: 'America/New_York', label: 'Eastern Time (ET)', offset: 'UTC-5', region: 'North America' },
    { value: 'America/Chicago', label: 'Central Time (CT)', offset: 'UTC-6', region: 'North America' },
    { value: 'America/Denver', label: 'Mountain Time (MT)', offset: 'UTC-7', region: 'North America' },
    { value: 'America/Los_Angeles', label: 'Pacific Time (PT)', offset: 'UTC-8', region: 'North America' },
    { value: 'Europe/London', label: 'London (GMT)', offset: 'UTC+0', region: 'Europe' },
    { value: 'Europe/Paris', label: 'Paris (CET)', offset: 'UTC+1', region: 'Europe' },
    { value: 'Europe/Berlin', label: 'Berlin (CET)', offset: 'UTC+1', region: 'Europe' },
    { value: 'Asia/Tokyo', label: 'Tokyo (JST)', offset: 'UTC+9', region: 'Asia' },
    { value: 'Asia/Shanghai', label: 'Shanghai (CST)', offset: 'UTC+8', region: 'Asia' },
    { value: 'Australia/Sydney', label: 'Sydney (AEDT)', offset: 'UTC+11', region: 'Australia' },
];

/**
 * Validation Constants
 */
export const SETTINGS_VALIDATION = {
    TEAM_NAME: {
        MIN_LENGTH: 3,
        MAX_LENGTH: 50,
    },
    DESCRIPTION: {
        MAX_LENGTH: 500,
    },
    INVITE_EXPIRATION: {
        MIN_DAYS: 1,
        MAX_DAYS: 30,
    },
    LOGO: {
        MAX_FILE_SIZE: 2 * 1024 * 1024, // 2MB
        ALLOWED_TYPES: ['image/png', 'image/jpeg', 'image/jpg'],
        RECOMMENDED_SIZE: 512, // 512x512px
    },
} as const;
