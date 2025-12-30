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
