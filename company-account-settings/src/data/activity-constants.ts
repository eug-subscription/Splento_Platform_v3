import type { ActivityCategory, DateRangePreset } from '@/types/activity';

export interface CategoryConfig {
    id: ActivityCategory;
    label: string;
    icon: string;
    colorToken: string;
    description: string;
}

export const ACTIVITY_CATEGORIES: Record<ActivityCategory, CategoryConfig> = {
    members: {
        id: 'members',
        label: 'Members',
        icon: 'gravity-ui:persons',
        colorToken: 'var(--info)',
        description: 'Invites, removals, and role changes',
    },
    permissions: {
        id: 'permissions',
        label: 'Permissions',
        icon: 'gravity-ui:shield-check',
        colorToken: 'var(--lavender)',
        description: 'Permission grants and revocations',
    },
    billing: {
        id: 'billing',
        label: 'Billing',
        icon: 'gravity-ui:credit-card',
        colorToken: 'var(--success)',
        description: 'Invoices, payments, and plan changes',
    },
    api: {
        id: 'api',
        label: 'API',
        icon: 'gravity-ui:code',
        colorToken: 'var(--electric-blue)',
        description: 'API key management and webhook events',
    },
    security: {
        id: 'security',
        label: 'Security',
        icon: 'gravity-ui:shield-keyhole',
        colorToken: 'var(--danger)',
        description: '2FA changes, sessions, and IP rules',
    },
    settings: {
        id: 'settings',
        label: 'Settings',
        icon: 'gravity-ui:gear',
        colorToken: 'var(--muted)',
        description: 'Team settings and branding changes',
    },
    assets: {
        id: 'assets',
        label: 'Assets',
        icon: 'gravity-ui:picture',
        colorToken: 'var(--accent)',
        description: 'Image/video generation and batch exports',
    },
    login: {
        id: 'login',
        label: 'Login',
        icon: 'gravity-ui:person',
        colorToken: 'var(--cyan-600)',
        description: 'Login attempts and session starts',
    },
    integrations: {
        id: 'integrations',
        label: 'Integrations',
        icon: 'gravity-ui:plug-connection',
        colorToken: 'var(--sunset)',
        description: 'OAuth and third-party app connections',
    },
    exports: {
        id: 'exports',
        label: 'Exports',
        icon: 'gravity-ui:file-arrow-down',
        colorToken: 'var(--mint)',
        description: 'Data exports and report downloads',
    },
};

/**
 * Returns consistent "soft" styling for a given activity category.
 * Centralizes the oklab color-mix logic (15% opacity) to avoid drift.
 */
export const getCategoryStyle = (category: ActivityCategory) => {
    const config = ACTIVITY_CATEGORIES[category];
    return {
        backgroundColor: `color-mix(in oklab, ${config.colorToken} 15%, transparent)`,
        color: config.colorToken,
    };
};

export const CATEGORY_OPTIONS = Object.values(ACTIVITY_CATEGORIES);

export const DATE_RANGE_OPTIONS: { id: DateRangePreset; label: string }[] = [
    { id: 'today', label: 'Today' },
    { id: 'yesterday', label: 'Yesterday' },
    { id: 'last_7_days', label: 'Last 7 days' },
    { id: 'last_30_days', label: 'Last 30 days' },
    { id: 'last_90_days', label: 'Last 90 days' },
    { id: 'custom', label: 'Custom range' },
];

export const DEFAULT_FILTERS = {
    category: 'all',
    memberId: 'all',
    dateRange: 'last_30_days',
    search: '',
} as const;
