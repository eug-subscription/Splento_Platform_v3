import type { ApiKey, Webhook, ApiLog, DeveloperStats } from '@/types/developers';
import { API_KEY_PREFIX, MOCK_USER } from './developers-constants';

export const MOCK_API_KEYS: ApiKey[] = [
    {
        id: 'key_1',
        name: 'Production Server',
        prefix: API_KEY_PREFIX,
        suffix: 'x7Yz',
        permission: 'full',
        createdAt: new Date('2024-12-15T10:00:00'),
        lastUsedAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
        expiresAt: null,
        createdBy: MOCK_USER,
        isActive: true,
        usageCount: 1234,
        rateLimit: null,
    },
    {
        id: 'key_2',
        name: 'Staging Environment',
        prefix: 'sk_test_',
        suffix: 'a2Bc',
        permission: 'read-only',
        createdAt: new Date('2024-12-20T14:30:00'),
        lastUsedAt: null, // Never used
        expiresAt: new Date('2025-03-20T14:30:00'),
        createdBy: MOCK_USER,
        isActive: true,
        usageCount: 0,
        rateLimit: 100,
    },
];

export const MOCK_WEBHOOKS: Webhook[] = [
    {
        id: 'wh_1',
        name: 'Order Notifications',
        url: 'https://api.myapp.com/webhooks/splento',
        secret: 'whsec_hidden',
        events: ['order.created', 'order.completed', 'order.cancelled'],
        status: 'active',
        createdAt: new Date('2024-12-10'),
        lastTriggeredAt: new Date(Date.now() - 5 * 60 * 1000),
        failureCount: 0,
        successRate: 99.2,
    },
    {
        id: 'wh_2',
        name: 'Payment Webhook',
        url: 'https://billing.myapp.com/hooks',
        secret: 'whsec_hidden',
        events: ['payment.succeeded', 'payment.failed'],
        status: 'paused',
        createdAt: new Date('2024-12-05'),
        lastTriggeredAt: new Date('2024-12-20'),
        failureCount: 0,
        successRate: 100,
    },
];

export const MOCK_API_LOGS: ApiLog[] = [
    {
        id: 'log_1',
        apiKeyId: 'key_1',
        apiKeyName: 'Production Server',
        method: 'POST',
        endpoint: '/v1/media/upload',
        statusCode: 201,
        status: 'success',
        responseTime: 245,
        timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5 mins ago
        requestSize: 1024 * 5,
        responseSize: 512,
        ipAddress: '192.168.1.100',
        userAgent: 'node-fetch/2.6.7',
        errorMessage: null,
        requestBody: { file_name: 'shot_01.jpg', folder: 'events' },
        responseBody: { id: 'media_123', status: 'uploaded' },
    },
    {
        id: 'log_2',
        apiKeyId: 'key_1',
        apiKeyName: 'Production Server',
        method: 'GET',
        endpoint: '/v1/orders',
        statusCode: 200,
        status: 'success',
        responseTime: 32,
        timestamp: new Date(Date.now() - 10 * 60 * 1000), // 10 mins ago
        requestSize: 128,
        responseSize: 2048,
        ipAddress: '192.168.1.100',
        userAgent: 'node-fetch/2.6.7',
        errorMessage: null,
        requestBody: null,
        responseBody: { data: [{ id: 1, total: 100.50 }] },
    },
    {
        id: 'log_3',
        apiKeyId: 'key_1',
        apiKeyName: 'Production Server',
        method: 'POST',
        endpoint: '/v1/orders/create',
        statusCode: 400,
        status: 'client_error',
        responseTime: 18,
        timestamp: new Date(Date.now() - 15 * 60 * 1000), // 15 mins ago
        requestSize: 256,
        responseSize: 64,
        ipAddress: '192.168.1.105',
        userAgent: 'PostmanRuntime/7.29.0',
        errorMessage: 'Missing required field: customer_email',
        requestBody: { customer_id: 'cust_123' },
        responseBody: { error: 'Missing required field: customer_email' },
    },
];

export const MOCK_DEVELOPER_STATS: DeveloperStats = {
    totalApiKeys: 2,
    activeApiKeys: 2,
    totalWebhooks: 2,
    activeWebhooks: 1,
    apiCallsToday: 156,
    apiCallsTrend: 12.5,
    webhookSuccessRate: 99.2,
    avgResponseTime: 45,
};
