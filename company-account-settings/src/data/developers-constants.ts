import type { WebhookEvent, DeveloperSectionConfig } from '@/types/developers';

export const DEVELOPER_SECTIONS: DeveloperSectionConfig[] = [
    {
        id: 'api-keys',
        label: 'API Keys',
        icon: 'gravity-ui:key',
        description: 'Manage secret keys for API access'
    },
    {
        id: 'webhooks',
        label: 'Webhooks',
        icon: 'gravity-ui:bell',
        description: 'Configure event notifications'
    },
    {
        id: 'api-logs',
        label: 'API Logs',
        icon: 'gravity-ui:list-timeline',
        description: 'View API request history'
    },
];


export const WEBHOOK_EVENT_CATEGORIES: Record<string, { label: string; events: WebhookEvent[] }> = {
    orders: {
        label: 'Orders',
        events: ['order.created', 'order.completed', 'order.cancelled']
    },
    media: {
        label: 'Media',
        events: ['media.uploaded', 'media.processed', 'media.failed']
    },
    payments: {
        label: 'Payments',
        events: ['payment.succeeded', 'payment.failed']
    },
    team: {
        label: 'Team',
        events: ['team.member_added', 'team.member_removed']
    },
    credits: {
        label: 'Credits',
        events: ['credits.depleted', 'credits.low']
    }
};

export const ALL_WEBHOOK_EVENTS = Object.values(WEBHOOK_EVENT_CATEGORIES).flatMap(c => c.events);

export const LOGS_PER_PAGE = 50;
export const API_BASE_URL = 'https://api.splento.com';
export const API_KEY_PREFIX = 'sk_live_';
export const WEBHOOK_SECRET_PREFIX = 'whsec_';
export const MOCK_USER = {
    id: 'user_1',
    name: 'Eugene Semeykin',
    email: 'eugene@splento.com'
};
export const DOCS_URL = 'https://docs.splento.com';
