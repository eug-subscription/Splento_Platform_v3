import type { OrderStatus, OrderType, PaymentStatus } from '@/types/order.types';

export interface StatusConfig {
    label: string;
    color: string;
    icon: string;
    description: string;
}

export interface TypeConfig {
    label: string;
    icon: string;
    color: string;
}

export interface PaymentStatusOption {
    key: PaymentStatus | 'all';
    label: string;
}

export interface PaymentStatusConfig {
    label: string;
    color: "default" | "success" | "warning" | "danger" | "accent";
    icon: string;
}

export const PAYMENT_STATUS_CONFIG: Record<PaymentStatus, PaymentStatusConfig> = {
    pending: {
        label: 'Pending',
        color: 'warning',
        icon: 'gravity-ui:clock'
    },
    paid: {
        label: 'Paid',
        color: 'success',
        icon: 'gravity-ui:circle-check'
    },
    partial: {
        label: 'Partial',
        color: 'accent',
        icon: 'gravity-ui:circle-half-dot'
    },
    refunded: {
        label: 'Refunded',
        color: 'default',
        icon: 'gravity-ui:arrow-rotate-left'
    },
    failed: {
        label: 'Failed',
        color: 'danger',
        icon: 'gravity-ui:circle-xmark'
    }
};

export const PAYMENT_STATUS_OPTIONS: PaymentStatusOption[] = [
    { key: 'all', label: 'All Payments' },
    ...(Object.keys(PAYMENT_STATUS_CONFIG) as PaymentStatus[]).map(key => ({
        key,
        label: PAYMENT_STATUS_CONFIG[key].label
    }))
];

export const ORDER_STATUS_CONFIG: Record<OrderStatus, StatusConfig> = {
    draft: {
        label: 'Draft',
        color: 'var(--grey-500)',
        icon: 'gravity-ui:pencil',
        description: 'Order is being prepared'
    },
    pending_confirmation: {
        label: 'Pending',
        color: 'var(--warning)',
        icon: 'gravity-ui:clock',
        description: 'Awaiting confirmation'
    },
    confirmed: {
        label: 'Confirmed',
        color: 'var(--electric-blue)',
        icon: 'gravity-ui:circle-check',
        description: 'Order confirmed'
    },
    scheduled: {
        label: 'Scheduled',
        color: 'var(--info)',
        icon: 'gravity-ui:calendar',
        description: 'Session scheduled'
    },
    in_progress: {
        label: 'In Progress',
        color: 'var(--splento-cyan)',
        icon: 'gravity-ui:play',
        description: 'Session in progress'
    },
    editing: {
        label: 'Editing',
        color: 'var(--lavender)',
        icon: 'gravity-ui:scissors',
        description: 'Post-production in progress'
    },
    review: {
        label: 'Review',
        color: 'var(--sunset)',
        icon: 'gravity-ui:eye',
        description: 'Ready for client review'
    },
    revision_requested: {
        label: 'Revision',
        color: 'var(--coral)',
        icon: 'gravity-ui:arrow-rotate-left',
        description: 'Revision requested'
    },
    delivered: {
        label: 'Delivered',
        color: 'var(--mint)',
        icon: 'gravity-ui:folder-check',
        description: 'Assets delivered'
    },
    completed: {
        label: 'Completed',
        color: 'var(--success)',
        icon: 'gravity-ui:seal-check',
        description: 'Order completed'
    },
    cancelled: {
        label: 'Cancelled',
        color: 'var(--danger)',
        icon: 'gravity-ui:xmark',
        description: 'Order cancelled'
    },
    refunded: {
        label: 'Refunded',
        color: 'var(--pink-400)',
        icon: 'gravity-ui:circle-arrow-left',
        description: 'Payment refunded'
    }
};

export const ORDER_TYPE_CONFIG: Record<OrderType, TypeConfig> = {
    photo: {
        label: 'Photography',
        icon: 'gravity-ui:camera',
        color: 'var(--electric-blue)'
    },
    video: {
        label: 'Videography',
        icon: 'gravity-ui:video',
        color: 'var(--lavender)'
    },
    hybrid: {
        label: 'Photo + Video',
        icon: 'gravity-ui:picture',
        color: 'var(--mint)'
    },
    ai: {
        label: 'AI Enhanced',
        icon: 'gravity-ui:cpu',
        color: 'var(--sunset)'
    }
};

// Utility functions
export function getStatusConfig(status: OrderStatus): StatusConfig {
    return ORDER_STATUS_CONFIG[status] ?? ORDER_STATUS_CONFIG.draft;
}

export function getTypeConfig(type: OrderType): TypeConfig {
    return ORDER_TYPE_CONFIG[type] ?? ORDER_TYPE_CONFIG.photo;
}

// Tab configuration for Order Detail page
export const ORDER_TABS = [
    { id: 'overview', label: 'Overview', icon: 'gravity-ui:layout-header-cells-large' },
    { id: 'creative', label: 'Creative', icon: 'gravity-ui:palette' },
    { id: 'gallery', label: 'Gallery', icon: 'gravity-ui:picture' },
    { id: 'billing', label: 'Billing', icon: 'gravity-ui:credit-card' },
    { id: 'activity', label: 'Activity', icon: 'gravity-ui:clock-arrow-rotate-left' }
] as const;

export type OrderTabId = typeof ORDER_TABS[number]['id'];
