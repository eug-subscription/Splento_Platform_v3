/**
 * Team Settings Type Definitions
 * 
 * @description Comprehensive types for team configuration and settings management
 */

// ============================================================================
// Core Settings Types
// ============================================================================

export interface TeamSettings {
    id: string;

    // Profile
    name: string;
    description: string | null;
    logo: string | null;

    // Localization
    timezone: string; // IANA timezone (e.g., "America/New_York")
    language: LanguageCode;

    // Policies
    inviteExpirationDays: number; // 1-30
    assetOwnershipPolicy: AssetOwnershipPolicy;

    // Admin
    adminId: string;

    // Metadata
    createdAt: string; // ISO 8601
    updatedAt: string; // ISO 8601
}

// ============================================================================
// Enums & Constants
// ============================================================================

export type LanguageCode = 'en' | 'es' | 'fr' | 'de' | 'it' | 'pt' | 'ja' | 'zh';

export type AssetOwnershipPolicy =
    | 'transfer_to_admin'
    | 'reassign_prompt'
    | 'archive'
    | 'delete';

export type ExportFormat = 'json' | 'csv';

export type ExportStatus = 'processing' | 'ready' | 'failed' | 'expired';

// ============================================================================
// Data Export Types
// ============================================================================

export interface DataExport {
    id: string;
    teamId: string;
    format: ExportFormat;
    requestedAt: string; // ISO 8601
    requestedBy: string; // User ID
    status: ExportStatus;
    dataScopes: DataScope[];

    // Available when status = 'ready'
    downloadUrl?: string;
    fileSize?: number; // bytes
    expiresAt?: string; // ISO 8601 (typically 7 days from ready)
}

export type DataScope =
    | 'members'
    | 'permissions'
    | 'activity_logs'
    | 'usage_history'
    | 'billing_history'
    | 'api_keys';

export interface DataExportRequest {
    format: ExportFormat;
    dataScopes: DataScope[];
}

// ============================================================================
// Admin Transfer Types
// ============================================================================

export interface AdminTransferRequest {
    targetUserId: string;
    currentPassword: string;
    confirmationText: string; // "TRANSFER ADMIN"
}

// ============================================================================
// Team Deletion Types
// ============================================================================

export interface TeamDeletionRequest {
    teamNameConfirmation: string; // Must match team.name exactly
    currentPassword: string;
    acknowledged: boolean; // Checkbox confirmation
}

export interface TeamDeletionImpact {
    memberCount: number;
    assetCount: number;
    activeSubscription: boolean;
    estimatedDataSize: string; // e.g., "2.3 GB"
}

// ============================================================================
// Language & Timezone Options
// ============================================================================

export interface LanguageOption {
    code: LanguageCode;
    name: string;
    nativeName: string;
    flag?: string; // Optional emoji or icon
}

export interface TimezoneOption {
    value: string; // IANA timezone
    label: string; // Display name
    offset: string; // e.g., "UTC-5"
    region: string; // e.g., "North America"
}

// ============================================================================
// Asset Ownership Policy Config
// ============================================================================

export interface AssetOwnershipPolicyConfig {
    value: AssetOwnershipPolicy;
    label: string;
    description: string;
    requiresConfirmation: boolean;
    icon: string; // Iconify icon
}
