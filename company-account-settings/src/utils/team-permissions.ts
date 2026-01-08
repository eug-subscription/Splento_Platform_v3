import type { FeatureArea, PermissionLevel } from '@/types/team';

export type PresetType = 'full-access' | 'read-only' | 'developer' | 'marketing' | 'custom';

export interface FeatureConfig {
    id: FeatureArea;
    label: string;
    description: string;
    icon: string;
}

export const FEATURES: FeatureConfig[] = [
    { id: 'media', label: 'Media Library', description: 'Access to all uploaded assets and folders', icon: 'gravity-ui:picture' },
    { id: 'studio', label: 'AI Studio', description: 'Creation and editing using AI tools', icon: 'gravity-ui:magic-wand' },
    { id: 'orders', label: 'Order Management', description: 'Viewing and placing new service orders', icon: 'gravity-ui:shopping-bag' },
    { id: 'batch', label: 'Batch Processing', description: 'High-volume image and video processing', icon: 'gravity-ui:layers' },
    { id: 'analytics', label: 'Analytics & Reports', description: 'Usage statistics and performance metrics', icon: 'gravity-ui:chart-mixed' },
    { id: 'team', label: 'Team Management', description: 'Inviting members and managing roles', icon: 'gravity-ui:persons' },
    { id: 'billing', label: 'Billing & Subscriptions', description: 'Payments, invoices, and credit balance', icon: 'gravity-ui:credit-card' },
    { id: 'settings', label: 'Company Settings', description: 'General organization configuration', icon: 'gravity-ui:gear' },
    { id: 'api', label: 'API & Integrations', description: 'Access tokens and technical documentation', icon: 'gravity-ui:terminal' },
];

export const PRESETS: { id: PresetType; label: string; description: string; icon: string }[] = [
    {
        id: 'full-access',
        label: 'Full Access',
        description: 'Complete control over all features',
        icon: 'gravity-ui:shield-check'
    },
    {
        id: 'read-only',
        label: 'Read Only',
        description: 'View access without edit capabilities',
        icon: 'gravity-ui:eye'
    },
    {
        id: 'developer',
        label: 'Developer',
        description: 'Technical access including API and Studio',
        icon: 'gravity-ui:code'
    },
    {
        id: 'marketing',
        label: 'Marketing',
        description: 'Access to media, studio and analytics',
        icon: 'gravity-ui:megaphone'
    },
];

export const getPresetPermissions = (preset: PresetType): Record<FeatureArea, PermissionLevel> => {
    const allFeatures: FeatureArea[] = FEATURES.map(f => f.id);

    switch (preset) {
        case 'full-access':
            return allFeatures.reduce((acc, f) => ({ ...acc, [f]: 'edit' }), {} as Record<FeatureArea, PermissionLevel>);

        case 'read-only':
            return allFeatures.reduce((acc, f) => ({ ...acc, [f]: 'read' }), {} as Record<FeatureArea, PermissionLevel>);

        case 'developer':
            return {
                ...allFeatures.reduce((acc, f) => ({ ...acc, [f]: 'read' }), {} as Record<FeatureArea, PermissionLevel>),
                media: 'edit',
                studio: 'edit',
                batch: 'edit',
                api: 'edit',
            };

        case 'marketing':
            return {
                ...allFeatures.reduce((acc, f) => ({ ...acc, [f]: 'none' }), {} as Record<FeatureArea, PermissionLevel>),
                media: 'edit',
                studio: 'edit',
                analytics: 'read',
                orders: 'read',
            };

        default:
            return allFeatures.reduce((acc, f) => ({ ...acc, [f]: 'none' }), {} as Record<FeatureArea, PermissionLevel>);
    }
};

export const detectPreset = (permissions: Record<FeatureArea, PermissionLevel>): PresetType => {
    const presets: Exclude<PresetType, 'custom'>[] = ['full-access', 'read-only', 'developer', 'marketing'];

    for (const preset of presets) {
        const presetPerms = getPresetPermissions(preset);
        if (JSON.stringify(permissions) === JSON.stringify(presetPerms)) {
            return preset;
        }
    }

    return 'custom';
};
