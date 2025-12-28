// ============================================================
// API KEYS
// ============================================================

export type ApiKeyPermission = 'full' | 'read-only' | 'write-only';

export interface ApiKey {
    id: string;
    name: string;                    // User-defined label (e.g., "Production Server")
    prefix: string;                  // First 8 chars shown (e.g., "sk_live_")
    suffix: string;                  // Last 4 chars shown (e.g., "x7Yz")
    permission: ApiKeyPermission;
    createdAt: Date;
    lastUsedAt: Date | null;         // null = never used
    expiresAt: Date | null;          // null = never expires
    createdBy: {
        id: string;
        name: string;
        email: string;
    };
    isActive: boolean;
    usageCount: number;              // Total API calls made
    rateLimit: number | null;        // Requests per minute, null = default
}

export interface CreateApiKeyRequest {
    name: string;
    permission: ApiKeyPermission;
    expiresAt: Date | null;
    rateLimit: number | null;
}

export interface CreateApiKeyResponse {
    apiKey: ApiKey;
    secretKey: string;               // ONLY shown once!
}

// ============================================================
// WEBHOOKS
// ============================================================

export type WebhookEvent =
    | 'order.created'
    | 'order.completed'
    | 'order.cancelled'
    | 'media.uploaded'
    | 'media.processed'
    | 'media.failed'
    | 'payment.succeeded'
    | 'payment.failed'
    | 'team.member_added'
    | 'team.member_removed'
    | 'credits.depleted'
    | 'credits.low';

export type WebhookStatus = 'active' | 'paused' | 'failed';

export interface Webhook {
    id: string;
    name: string;
    url: string;
    secret: string;                  // Signing secret (hidden, shown once)
    events: WebhookEvent[];
    status: WebhookStatus;
    createdAt: Date;
    lastTriggeredAt: Date | null;
    failureCount: number;            // Consecutive failures
    successRate: number;             // Percentage (0-100)
}

export interface WebhookDelivery {
    id: string;
    webhookId: string;
    event: WebhookEvent;
    timestamp: Date;
    responseCode: number | null;     // null = timeout/no response
    responseTime: number;            // ms
    success: boolean;
    payload: object;                 // Request body (truncated in UI)
    response: string | null;         // Response body (truncated)
}

// ============================================================
// API LOGS
// ============================================================

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export type ApiLogStatus = 'success' | 'client_error' | 'server_error';

export interface ApiLog {
    id: string;
    apiKeyId: string;
    apiKeyName: string;              // For display without join
    method: HttpMethod;
    endpoint: string;                // e.g., "/v1/media/upload"
    statusCode: number;
    status: ApiLogStatus;
    responseTime: number;            // ms
    timestamp: Date;
    requestSize: number;             // bytes
    responseSize: number;            // bytes
    ipAddress: string;
    userAgent: string;
    errorMessage: string | null;     // Only for errors
    requestBody: object | null;
    responseBody: object | null;
}

export interface ApiLogFilters {
    apiKeyId: string | null;
    method: HttpMethod | null;
    status: ApiLogStatus | null;
    dateRange: {
        start: Date;
        end: Date;
    } | null;
}

// ============================================================
// AGGREGATED STATS (for dashboard cards)
// ============================================================

export interface DeveloperStats {
    totalApiKeys: number;
    activeApiKeys: number;
    totalWebhooks: number;
    activeWebhooks: number;
    apiCallsToday: number;
    apiCallsTrend: number;           // % change from yesterday
    webhookSuccessRate: number;
    avgResponseTime: number;         // ms
}
