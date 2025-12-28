# Developers Tab Implementation Plan

> **Status:** Ready for Implementation  
> **Created:** 2025-12-28  
> **Estimated Effort:** Medium-High (2-3 days)

---

## 1. Overview

Implement a comprehensive **Developers** tab within the Team page, providing API management capabilities modelled after industry best practices (Claude API, Stripe, GitHub).

### Sub-Tabs Structure

```
Developers Tab
├── API Keys      # Credential management
├── Webhooks      # Event subscription configuration  
└── API Logs      # Request auditing & debugging
```

---

## 2. File Structure

```
src/
├── app/
│   └── admin/
│       └── developers/
│           ├── DevelopersTab.tsx           # Main container with internal Tabs
│           ├── DevelopersTabSkeleton.tsx   # Loading state
│           ├── ApiKeysSection.tsx          # API Keys sub-tab
│           ├── WebhooksSection.tsx         # Webhooks sub-tab
│           ├── ApiLogsSection.tsx          # API Logs sub-tab
│           └── modals/
│               ├── CreateApiKeyModal.tsx   # Create new API key
│               ├── ApiKeyCreatedModal.tsx  # Show secret (one-time display)
│               ├── RevokeApiKeyModal.tsx   # Confirm revocation
│               ├── AddWebhookModal.tsx     # Configure new webhook
│               └── EditWebhookModal.tsx    # Edit existing webhook
├── components/
│   └── developers/
│       ├── ApiKeyRow.tsx                   # Single API key display
│       ├── WebhookCard.tsx                 # Webhook configuration card
│       ├── ApiLogRow.tsx                   # Single log entry
│       └── EmptyState.tsx                  # Reusable empty state
├── data/
│   └── mock-developers.ts                  # Mock data for all developer features
├── hooks/
│   └── useDevelopers.ts                    # Business logic hook
└── types/
    └── developers.ts                       # TypeScript definitions
```

---

## 3. Type Definitions

**File:** `src/types/developers.ts`

```typescript
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
```

---

## 4. Component Specifications

### 4.1 DevelopersTab.tsx (Main Container)

**Purpose:** Container component with internal tab navigation.

**UI Structure:**

```
┌─────────────────────────────────────────────────────────────┐
│  Tabs.List (underlined variant, left-aligned)               │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐                    │
│  │ API Keys │ │ Webhooks │ │ API Logs │                    │
│  └──────────┘ └──────────┘ └──────────┘                    │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  [Dynamic Tab Panel Content]                                │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**HeroUI Pattern:**

```tsx
<Tabs aria-label="Developer settings" variant="underlined">
  <Tabs.List>
    <Tabs.Tab key="api-keys">API Keys</Tabs.Tab>
    <Tabs.Tab key="webhooks">Webhooks</Tabs.Tab>
    <Tabs.Tab key="api-logs">API Logs</Tabs.Tab>
  </Tabs.List>
  <Tabs.Panel key="api-keys">
    <Suspense fallback={<ApiKeysSkeleton />}>
      <ApiKeysSection />
    </Suspense>
  </Tabs.Panel>
  {/* ... */}
</Tabs>
```

---

### 4.2 ApiKeysSection.tsx

**UI Structure:**

```
┌─────────────────────────────────────────────────────────────┐
│ ⚠️ Alert (status="warning")                                 │
│ Secret keys are only shown once when created.               │
│ Store them securely and never commit them to version        │
│ control.                                                    │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ API Keys                                  [+ Create API Key]│
├─────────────────────────────────────────────────────────────┤
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ 🔑 Production Server           sk_live_****x7Yz         │ │
│ │    Full Access                                          │ │
│ │    Created Dec 15, 2024  •  Last used 2 hours ago       │ │
│ │    1,234 requests                        [Copy] [Revoke]│ │
│ └─────────────────────────────────────────────────────────┘ │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ 🔑 Staging Environment         sk_test_****a2Bc         │ │
│ │    Read Only                                            │ │
│ │    Created Dec 20, 2024  •  Never used                  │ │
│ │    0 requests                            [Copy] [Revoke]│ │
│ └─────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

**Key Features:**

1. **Security Alert** - Prominent warning about secret key handling
2. **Key List** - Cards/rows showing each key with metadata
3. **Masked Display** - Format: `sk_live_****x7Yz`
4. **Copy Prefix** - Allow copying the prefix for identification
5. **Revoke Flow** - Confirmation modal before deletion
6. **Never Used State** - Visual indication for unused keys
7. **Expiration Warning** - Chip showing "Expires in X days" if applicable

**Empty State:**

```
┌─────────────────────────────────────────────────────────────┐
│                        🔑                                   │
│              No API keys created yet                        │
│                                                             │
│  API keys allow external applications to access your        │
│  Splento account programmatically.                          │
│                                                             │
│                   [+ Create your first API key]             │
└─────────────────────────────────────────────────────────────┘
```

---

### 4.3 CreateApiKeyModal.tsx

**UI Flow:**

```
Step 1: Configuration
┌─────────────────────────────────────────────────────────────┐
│ Create API Key                                          [X] │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Name *                                                     │
│  ┌───────────────────────────────────────────────────────┐  │
│  │ e.g., Production Server                               │  │
│  └───────────────────────────────────────────────────────┘  │
│                                                             │
│  Permissions                                                │
│  ┌───────────────────────────────────────────────────────┐  │
│  │ ◉ Full Access - Read and write all resources         │  │
│  │ ○ Read Only - View resources only                    │  │
│  │ ○ Write Only - Create/update resources only          │  │
│  └───────────────────────────────────────────────────────┘  │
│                                                             │
│  Expiration (Optional)                                      │
│  ┌────────────┐                                             │
│  │ Never ▼    │  or  [Set custom date]                      │
│  └────────────┘                                             │
│                                                             │
│  Rate Limit (Optional)                                      │
│  ┌───────────────────────────────────────────────────────┐  │
│  │ Use default (1000/min)                                │  │
│  └───────────────────────────────────────────────────────┘  │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                              [Cancel]  [Create API Key]     │
└─────────────────────────────────────────────────────────────┘
```

---

### 4.4 ApiKeyCreatedModal.tsx (One-Time Secret Display)

**Critical UX:** This modal displays the full secret key exactly once.

```
┌─────────────────────────────────────────────────────────────┐
│ ✅ API Key Created                                      [X] │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ⚠️ Copy your secret key now. You won't be able to see     │
│     it again!                                               │
│                                                             │
│  ┌───────────────────────────────────────────────────────┐  │
│  │ sk_live_<YOUR_SECRET_KEY_DISPLAYED_HERE>              │  │
│  │                                                 [📋]  │  │
│  └───────────────────────────────────────────────────────┘  │
│                                                             │
│  ✓ Key copied (appears after click)                         │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│  ☑️ I have saved this key securely                          │
│                                                             │
│                                            [Done]           │
└─────────────────────────────────────────────────────────────┘
```

**Behaviour:**

- Modal cannot be dismissed until checkbox is checked OR key is copied
- Copy button changes state after successful copy
- Key displayed in monospace font with full selection on click

---

### 4.5 WebhooksSection.tsx

**Empty State:**

```
┌─────────────────────────────────────────────────────────────┐
│                        🔔                                   │
│              No webhooks configured                         │
│                                                             │
│  Webhooks allow you to receive real-time notifications      │
│  when events happen in your account.                        │
│                                                             │
│                      [+ Add Webhook]                        │
└─────────────────────────────────────────────────────────────┘
```

**With Webhooks:**

```
┌─────────────────────────────────────────────────────────────┐
│ Webhooks                                     [+ Add Webhook]│
├─────────────────────────────────────────────────────────────┤
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ 🟢 Order Notifications                                  │ │
│ │    https://api.myapp.com/webhooks/splento               │ │
│ │    Events: order.created, order.completed, order.cancelled│
│ │    Last triggered: 5 minutes ago  •  Success rate: 99.2%│ │
│ │                                    [Edit] [Pause] [Delete]│
│ └─────────────────────────────────────────────────────────┘ │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ 🟡 Payment Webhook (Paused)                             │ │
│ │    https://billing.myapp.com/hooks                      │ │
│ │    Events: payment.succeeded, payment.failed            │ │
│ │    Paused since Dec 20  •  Resume to reactivate         │ │
│ │                                   [Edit] [Resume] [Delete]│
│ └─────────────────────────────────────────────────────────┘ │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ 🔴 Legacy System                                        │ │
│ │    https://old.system.com/api                           │ │
│ │    Events: media.processed                              │ │
│ │    ⚠️ 3 consecutive failures  •  Last error: 502        │ │
│ │                                  [View Logs] [Edit] [Delete]│
│ └─────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

**Status Indicators:**

- 🟢 `active` - Functioning normally
- 🟡 `paused` - Manually paused by user  
- 🔴 `failed` - 3+ consecutive delivery failures

---

### 4.6 AddWebhookModal.tsx

```
┌─────────────────────────────────────────────────────────────┐
│ Add Webhook                                             [X] │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Name *                                                     │
│  ┌───────────────────────────────────────────────────────┐  │
│  │ e.g., Order Notifications                             │  │
│  └───────────────────────────────────────────────────────┘  │
│                                                             │
│  Endpoint URL *                                             │
│  ┌───────────────────────────────────────────────────────┐  │
│  │ https://                                              │  │
│  └───────────────────────────────────────────────────────┘  │
│  URL must use HTTPS                                         │
│                                                             │
│  Events to Subscribe *                                      │
│  ┌───────────────────────────────────────────────────────┐  │
│  │ Orders                                                │  │
│  │   ☑️ order.created                                    │  │
│  │   ☑️ order.completed                                  │  │
│  │   ☐ order.cancelled                                   │  │
│  │ Media                                                 │  │
│  │   ☐ media.uploaded                                    │  │
│  │   ☑️ media.processed                                  │  │
│  │   ☐ media.failed                                      │  │
│  │ Payments                                              │  │
│  │   ☐ payment.succeeded                                 │  │
│  │   ☐ payment.failed                                    │  │
│  │ Team                                                  │  │
│  │   ☐ team.member_added                                 │  │
│  │   ☐ team.member_removed                               │  │
│  │ Credits                                               │  │
│  │   ☐ credits.low                                       │  │
│  │   ☐ credits.depleted                                  │  │
│  └───────────────────────────────────────────────────────┘  │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                 [Cancel]  [Add Webhook]     │
└─────────────────────────────────────────────────────────────┘
```

**After Creation - Show Signing Secret:**

```
┌─────────────────────────────────────────────────────────────┐
│ ✅ Webhook Created                                      [X] │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Your webhook signing secret:                               │
│                                                             │
│  ┌───────────────────────────────────────────────────────┐  │
│  │ whsec_1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p             [📋]│  │
│  └───────────────────────────────────────────────────────┘  │
│                                                             │
│  Use this secret to verify webhook signatures. This         │
│  ensures requests are actually from Splento.                │
│                                                             │
│  📖 View webhook documentation                              │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                      [Done] │
└─────────────────────────────────────────────────────────────┘
```

---

### 4.7 ApiLogsSection.tsx

**UI Structure:**

```
┌─────────────────────────────────────────────────────────────┐
│ Recent API Calls                          [📊 Export CSV]   │
├─────────────────────────────────────────────────────────────┤
│ Filters:                                                    │
│ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐          │
│ │ All Keys ▼   │ │ All Methods ▼│ │ All Status ▼ │          │
│ └──────────────┘ └──────────────┘ └──────────────┘          │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ ┌───┬────────────────────────────┬──────┬───────┬─────────┐ │
│ │   │ Endpoint                   │ Code │ Time  │ When    │ │
│ ├───┼────────────────────────────┼──────┼───────┼─────────┤ │
│ │POST│ /v1/media/upload          │ 201  │ 245ms │ Just now│ │
│ │GET │ /v1/orders                │ 200  │ 32ms  │ 2m ago  │ │
│ │POST│ /v1/orders/create         │ 400  │ 18ms  │ 5m ago  │ │
│ │GET │ /v1/team/members          │ 200  │ 28ms  │ 12m ago │ │
│ │DELETE│ /v1/media/abc123        │ 404  │ 15ms  │ 1h ago  │ │
│ │GET │ /v1/credits/balance       │ 200  │ 8ms   │ 2h ago  │ │
│ └───┴────────────────────────────┴──────┴───────┴─────────┘ │
│                                                             │
│ Showing 1-50 of 1,234               [Previous] [1] [2] [Next]│
└─────────────────────────────────────────────────────────────┘
```

**Method Badges:**

| Method | Colour |
|--------|--------|
| `GET` | `--info` (blue) |
| `POST` | `--success` (green) |
| `PUT` | `--warning` (amber) |
| `PATCH` | `--warning` (amber) |
| `DELETE` | `--danger` (red) |

**Status Code Colouring:**

| Range | Colour | Status |
|-------|--------|--------|
| 2xx | `--success` | Success |
| 4xx | `--warning` | Client Error |
| 5xx | `--danger` | Server Error |

**Relative Time Format:** (from `dev_instruction_v2.md`)

| Time Window | Display |
|-------------|---------|
| < 1 minute | `Just now` |
| < 1 hour | `X minutes ago` |
| < 24 hours | `X hours ago` |
| 24-48 hours | `Yesterday` |
| 3-7 days | `X days ago` |
| > 7 days | `MMM DD` |
| > 1 year | `MMM DD, YYYY` |

**Expandable Row Detail:**

```
┌─────────────────────────────────────────────────────────────┐
│ ▼ POST  /v1/orders/create               400    18ms   5m ago│
├─────────────────────────────────────────────────────────────┤
│ API Key: Production Server (sk_live_****x7Yz)               │
│ IP: 192.168.1.100                                           │
│ User-Agent: node-fetch/2.6.7                                │
│                                                             │
│ Error: "Missing required field: customer_email"             │
│                                                             │
│ Request Body:                          [Copy cURL]          │
│ ┌───────────────────────────────────────────────────────┐   │
│ │ { "product_id": "prod_123", "quantity": 1 }           │   │
│ └───────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

---

## 5. Mock Data

**File:** `src/data/mock-developers.ts`

```typescript
import type { ApiKey, Webhook, ApiLog, DeveloperStats } from '@/types/developers';

export const MOCK_API_KEYS: ApiKey[] = [
  {
    id: 'key_1',
    name: 'Production Server',
    prefix: 'sk_live_',
    suffix: 'x7Yz',
    permission: 'full',
    createdAt: new Date('2024-12-15T10:00:00'),
    lastUsedAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    expiresAt: null,
    createdBy: { id: '1', name: 'John Smith', email: 'john@example.com' },
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
    createdBy: { id: '1', name: 'John Smith', email: 'john@example.com' },
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
  // ... 50+ entries with varied methods, endpoints, status codes
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
```

---

## 6. Hook: useDevelopers.ts

**File:** `src/hooks/useDevelopers.ts`

```typescript
import { useState, useCallback, useMemo } from 'react';
import type { 
  ApiKey, 
  Webhook, 
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
    
    const secretKey = `sk_live_${generateRandomString(32)}`;
    const newKey: ApiKey = {
      id: `key_${Date.now()}`,
      name: request.name,
      prefix: 'sk_live_',
      suffix: secretKey.slice(-4),
      permission: request.permission,
      createdAt: new Date(),
      lastUsedAt: null,
      expiresAt: request.expiresAt,
      createdBy: { id: '1', name: 'Current User', email: 'user@example.com' },
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
  const createWebhook = useCallback(async (/* ... */) => { /* ... */ }, []);
  const updateWebhook = useCallback(async (/* ... */) => { /* ... */ }, []);
  const deleteWebhook = useCallback(async (/* ... */) => { /* ... */ }, []);
  const toggleWebhookStatus = useCallback(async (/* ... */) => { /* ... */ }, []);

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
```

---

## 7. Integration Points

### 7.1 Router Changes

**File:** `src/app/TeamPage.tsx`

```tsx
// Add lazy import
const DevelopersTab = lazy(() => 
  import('./admin/developers/DevelopersTab')
    .then(m => ({ default: m.DevelopersTab }))
);

// Add to tab content switch
{activeTab === 'developers' ? (
  <DevelopersTab teamId={MOCK_TEAM.id} />
) : /* ... */}
```

### 7.2 Tab Configuration

**File:** `src/components/team/TeamTabs.tsx`

The "Developers" tab already exists in the `TABS` array:

```tsx
{ id: 'developers', label: 'Developers', icon: 'gravity-ui:code' }
```

No changes needed.

---

## 8. Implementation Phases

### Phase 1: Foundation (Day 1 - Morning)

- [ ] Create type definitions (`src/types/developers.ts`)
- [ ] Create mock data (`src/data/mock-developers.ts`)
- [ ] Create hook (`src/hooks/useDevelopers.ts`)
- [ ] Create `DevelopersTab.tsx` container with sub-tabs
- [ ] Create `DevelopersTabSkeleton.tsx`
- [ ] Integrate into `TeamPage.tsx`

### Phase 2: API Keys (Day 1 - Afternoon)

- [ ] Create `ApiKeysSection.tsx` with empty state
- [ ] Create `ApiKeyRow.tsx` component
- [ ] Create `CreateApiKeyModal.tsx`
- [ ] Create `ApiKeyCreatedModal.tsx` (secret display)
- [ ] Create `RevokeApiKeyModal.tsx`
- [ ] Implement copy-to-clipboard functionality

### Phase 3: Webhooks (Day 2 - Morning)

- [ ] Create `WebhooksSection.tsx` with empty state
- [ ] Create `WebhookCard.tsx` component
- [ ] Create `AddWebhookModal.tsx`
- [ ] Create `EditWebhookModal.tsx`
- [ ] Implement pause/resume functionality
- [ ] Implement delete with confirmation

### Phase 4: API Logs (Day 2 - Afternoon)

- [ ] Create `ApiLogsSection.tsx`
- [ ] Create `ApiLogRow.tsx` with expandable detail
- [ ] Implement filtering (Select components)
- [ ] Implement pagination
- [ ] Add relative time formatting (use existing utility)
- [ ] Add "Copy cURL" functionality

### Phase 5: Polish & Testing (Day 3)

- [ ] Dark mode testing for all components
- [ ] Mobile responsive testing
- [ ] Keyboard navigation verification
- [ ] Empty state refinements
- [ ] Loading state refinements
- [ ] Error handling
- [ ] Run `npm run build` and `npm run lint`

---

## 9. HeroUI Components Used

| Component | Usage |
|-----------|-------|
| `Tabs` | Sub-tab navigation (API Keys / Webhooks / API Logs) |
| `Alert` | Security warning for secret keys |
| `Button` | All CTAs (Create, Revoke, Add, etc.) |
| `Card` | API Key rows, Webhook cards |
| `Modal` | All creation/edit/confirmation dialogs |
| `TextField` | Name inputs, URL inputs |
| `RadioGroup` | Permission selection |
| `Checkbox` | Event subscription, "I saved this key" |
| `Chip` | Method badges (GET, POST), Status codes, Expiration |
| `Select` | Filters for API logs |
| `Table` | API Logs display |
| `Dropdown` | Row actions menu |
| `Spinner` | Loading states |
| `Tooltip` | Help text, truncated endpoint paths |
| `Skeleton` | Loading placeholders |

---

## 10. Accessibility Checklist

- [ ] All modals trap focus correctly
- [ ] "Copy" buttons announce success to screen readers
- [ ] Secret key input allows full selection (triple-click)
- [ ] Colour-coded badges have text alternatives
- [ ] Tab panels have proper `aria-labelledby`
- [ ] Interactive elements have visible focus indicators
- [ ] Status icons have `aria-label` (🟢 = "Active", etc.)

---

## 11. Best Practice Additions

### Security Enhancements (Inspired by industry leaders)

1. **Key Rotation Reminder** - Show warning if key is > 90 days old
2. **IP Allowlist Option** - Optional "Restrict to IPs" in key creation
3. **Activity Spike Alert** - Highlight unusual usage patterns
4. **Recent Key Deletion Log** - Show recently revoked keys for 7 days

### UX Refinements

1. **Test Webhook Button** - Send a test payload to verify endpoint
2. **Webhook Delivery History** - View last 10 deliveries per webhook
3. **API Key Preview** - Hover to see full prefix + suffix format
4. **Bulk Actions** - Select multiple logs for batch operations

### Developer Experience

1. **Code Examples** - Show cURL/Node.js/Python snippets for each endpoint
2. **Quick Copy** - Copy endpoint + auth header together
3. **API Playground Link** - Link to interactive API documentation

---

## 12. Success Criteria

1. ✅ All three sub-tabs render correctly
2. ✅ API Keys can be created, displayed (masked), and revoked
3. ✅ Secret is shown only once with copy functionality
4. ✅ Webhooks can be added, edited, paused, and deleted
5. ✅ Webhook events are selectable with grouped categories
6. ✅ API Logs display with proper method/status colouring
7. ✅ Logs can be filtered by key, method, and status
8. ✅ All timestamps use relative format from `dev_instruction_v2.md`
9. ✅ Dark mode works correctly
10. ✅ `npm run build` passes
11. ✅ `npm run lint` passes
12. ✅ Main bundle stays under 500 KB

---

**Ready for implementation upon approval.**
