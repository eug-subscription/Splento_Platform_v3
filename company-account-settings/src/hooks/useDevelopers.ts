import { useState, useCallback, useMemo } from 'react';
import type {
    ApiKey,
    Webhook,
    WebhookEvent,
    ApiLog,
    ApiLogFilters,
    CreateApiKeyRequest,
    CreateApiKeyResponse
} from '@/types/developers';
import {
    MOCK_API_KEYS,
    MOCK_WEBHOOKS,
    MOCK_API_LOGS,
    MOCK_DEVELOPER_STATS
} from '@/data/mock-developers';
import {
    API_KEY_PREFIX,
    WEBHOOK_SECRET_PREFIX,
    MOCK_USER
} from '@/data/developers-constants';

// Helper for generating random string (for mock purposes)
function generateRandomString(length: number): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

export function useDevelopers() {
    const [apiKeys, setApiKeys] = useState<ApiKey[]>(MOCK_API_KEYS);
    const [webhooks, setWebhooks] = useState<Webhook[]>(MOCK_WEBHOOKS);
    const [apiLogs] = useState<ApiLog[]>(MOCK_API_LOGS);
    const [filters, setFilters] = useState<ApiLogFilters>({
        apiKeyId: null,
        method: null,
        status: null,
        dateRange: null,
    });
    const [isLoading, setIsLoading] = useState(false);

    // Filtered logs
    const filteredLogs = useMemo(() => {
        return apiLogs.filter(log => {
            if (filters.apiKeyId && log.apiKeyId !== filters.apiKeyId) return false;
            if (filters.method && log.method !== filters.method) return false;
            if (filters.status && log.status !== filters.status) return false;
            return true;
        });
    }, [apiLogs, filters]);

    // API Key actions
    const createApiKey = useCallback(async (
        request: CreateApiKeyRequest
    ): Promise<CreateApiKeyResponse> => {
        setIsLoading(true);
        // Simulate API call
        await new Promise(r => setTimeout(r, 1000));

        const secretKey = `${API_KEY_PREFIX}${generateRandomString(32)}`;
        const newKey: ApiKey = {
            id: `key_${Date.now()}`,
            name: request.name,
            prefix: API_KEY_PREFIX,
            suffix: secretKey.slice(-4),
            permission: request.permission,
            createdAt: new Date(),
            lastUsedAt: null,
            expiresAt: request.expiresAt,
            createdBy: MOCK_USER,
            isActive: true,
            usageCount: 0,
            rateLimit: request.rateLimit,
        };

        setApiKeys(prev => [...prev, newKey]);
        setIsLoading(false);

        return { apiKey: newKey, secretKey };
    }, []);

    const revokeApiKey = useCallback(async (keyId: string) => {
        setIsLoading(true);
        await new Promise(r => setTimeout(r, 500));
        setApiKeys(prev => prev.filter(k => k.id !== keyId));
        setIsLoading(false);
    }, []);

    // Webhook actions
    const createWebhook = useCallback(async (data: { name: string; url: string; events: WebhookEvent[] }) => {
        setIsLoading(true);
        await new Promise(r => setTimeout(r, 1000));

        const signingSecret = `${WEBHOOK_SECRET_PREFIX}${generateRandomString(32)}`;
        const newWebhook: Webhook = {
            id: `wh_${Date.now()}`,
            name: data.name,
            url: data.url,
            secret: signingSecret,
            events: data.events,
            status: 'active',
            createdAt: new Date(),
            lastTriggeredAt: null,
            failureCount: 0,
            successRate: 100,
        };

        setWebhooks(prev => [...prev, newWebhook]);
        setIsLoading(false);
        return { webhook: newWebhook, signingSecret };
    }, []);

    const updateWebhook = useCallback(async (id: string, data: { name: string; url: string; events: WebhookEvent[] }) => {
        setIsLoading(true);
        await new Promise(r => setTimeout(r, 500));
        setWebhooks(prev => prev.map(w =>
            w.id === id ? { ...w, ...data } : w
        ));
        setIsLoading(false);
    }, []);

    const deleteWebhook = useCallback(async (webhookId: string) => {
        setIsLoading(true);
        await new Promise(r => setTimeout(r, 500));
        setWebhooks(prev => prev.filter(w => w.id !== webhookId));
        setIsLoading(false);
    }, []);

    const toggleWebhookStatus = useCallback(async (webhookId: string) => {
        setIsLoading(true);
        await new Promise(r => setTimeout(r, 500));
        setWebhooks(prev => prev.map(w =>
            w.id === webhookId ? { ...w, status: w.status === 'active' ? 'paused' : 'active' } : w
        ));
        setIsLoading(false);
    }, []);

    return {
        // Data
        apiKeys,
        webhooks,
        filteredLogs,
        stats: MOCK_DEVELOPER_STATS,
        isLoading,

        // Filters
        filters,
        setFilters,

        // Actions
        createApiKey,
        revokeApiKey,
        createWebhook,
        updateWebhook,
        deleteWebhook,
        toggleWebhookStatus,
    };
}
