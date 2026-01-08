/**
 * Order Type Definitions
 * 
 * Core types and interfaces for the Orders feature.
 * Based on Phase 1 Foundation requirements.
 */

// Core order status enum
export type OrderStatus =
    | 'draft'
    | 'pending_confirmation'
    | 'confirmed'
    | 'scheduled'
    | 'in_progress'
    | 'editing'
    | 'review'
    | 'revision_requested'
    | 'delivered'
    | 'completed'
    | 'cancelled'
    | 'refunded';

// Order type enum
export type OrderType = 'photo' | 'video' | 'hybrid' | 'ai';

// Payment status
export type PaymentStatus = 'pending' | 'paid' | 'partial' | 'refunded' | 'failed';

// Gallery status
export type GalleryStatus = 'pending' | 'processing' | 'ready' | 'delivered';

// Asset status
export type AssetStatus = 'pending' | 'accepted' | 'rejected' | 'revision_requested';

// Location type
export type LocationType = 'on_site' | 'remote';

/**
 * Session details for the order.
 */
export interface SessionDetails {
    date: string | null;
    time: string | null;
    duration: number; // in minutes
    timezone: string;
    deliverables: number | null;
}

/**
 * Location details for the shoot.
 */
export interface LocationDetails {
    type: LocationType;
    venueName: string | null;
    address: string | null;
    city: string | null;
    country: string | null;
    postalCode: string | null;
    contactPerson: string | null;
    contactPhone: string | null;
    notes: string | null;
}

/**
 * Creative brief reference item (URL or file).
 */
export interface BriefReference {
    id: string;
    type: 'url' | 'file';
    url: string;
    label: string | null;
}

/**
 * Creative brief details.
 */
export interface CreativeBrief {
    description: string | null;
    references: BriefReference[];
    approvalStatus: 'pending' | 'approved' | 'rejected';
    approvedAt: string | null;
    approvedBy: string | null;
}

/**
 * Gallery overall status and metadata.
 */
export interface GalleryDetails {
    status: GalleryStatus;
    totalAssets: number;
    acceptedAssets: number;
    rejectedAssets: number;
    pendingAssets: number;
    deliveredAt: string | null;
    expiresAt: string | null;
}

/**
 * Individual asset (photo/video) in the gallery.
 */
export interface Asset {
    id: string;
    type: 'photo' | 'video';
    thumbnailUrl: string;
    fullUrl: string;
    status: AssetStatus;
    filename: string;
    size: number;
    width: number | null;
    height: number | null;
    duration: number | null; // for video, in seconds
}

/**
 * Revision request details.
 */
export interface Revision {
    id: string;
    requestedAt: string;
    requestedBy: string;
    description: string;
    assetIds: string[];
    status: 'pending' | 'in_progress' | 'completed';
    completedAt: string | null;
}

/**
 * Line item in the billing details.
 */
export interface LineItem {
    id: string;
    description: string;
    quantity: number;
    unitPrice: number;
    total: number;
}

/**
 * Billing and invoice details.
 */
export interface BillingDetails {
    subtotal: number;
    discount: number;
    tax: number;
    total: number;
    currency: string;
    paymentStatus: PaymentStatus;
    paidAt: string | null;
    invoiceUrl: string | null;
    lineItems: LineItem[];
}

/**
 * Audit log entry for order history.
 */
export interface AuditEntry {
    id: string;
    timestamp: string;
    action: string;
    actor: {
        id: string;
        name: string;
        avatarUrl: string | null;
        type: 'user' | 'system' | 'pro';
    };
    metadata: Record<string, unknown> | null;
}

/**
 * Assigned professional (read-only for client).
 */
export interface AssignedPro {
    id: string;
    name: string;
    avatarUrl: string | null;
    specialty: string | null;
}

/**
 * Main Order interface.
 * Comprehensive data structure for an order.
 */
export interface Order {
    id: string;
    displayId: string; // e.g., "ORD-2025-0001"
    status: OrderStatus;
    type: OrderType;

    // Client info (minimal, for reference)
    clientId: string;
    clientName: string;

    // Session & location
    session: SessionDetails;
    location: LocationDetails;

    // Creative
    brief: CreativeBrief;

    // Gallery (may be null before delivery)
    gallery: GalleryDetails | null;
    assets: Asset[];
    revisions: Revision[];

    // Billing
    billing: BillingDetails;

    // Assignment (read-only for client)
    assignedTo: AssignedPro | null;

    // Audit
    auditLog: AuditEntry[];

    // Metadata
    source: 'platform' | 'api' | 'manual';
    apiOrderId: string | null;
    createdAt: string;
    updatedAt: string;
}

/**
 * Lightweight order item for list views (tables).
 */
export interface OrderListItem {
    id: string;
    displayId: string;
    status: OrderStatus;
    type: OrderType;
    clientName: string;
    sessionDate: string | null;
    location: string | null; // formatted city, country
    paymentStatus: PaymentStatus;
    total: number;
    currency: string;
    createdAt: string;
    createdBy: string;
}
