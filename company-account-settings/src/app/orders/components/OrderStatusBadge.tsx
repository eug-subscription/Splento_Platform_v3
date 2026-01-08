import React from 'react';
import { Chip } from '@heroui/react';
import { Icon } from '@iconify/react';
import type { OrderStatus } from '@/types/order.types';
import { ORDER_STATUS_CONFIG } from '@/data/order-constants';

interface OrderStatusBadgeProps {
    status: OrderStatus;
    showIcon?: boolean;
    size?: 'sm' | 'md' | 'lg';
}

export function OrderStatusBadge({
    status,
    showIcon = true,
    size = 'sm'
}: OrderStatusBadgeProps) {
    const config = ORDER_STATUS_CONFIG[status] ?? ORDER_STATUS_CONFIG.draft;

    return (
        <Chip
            variant="soft"
            size={size}
            className="badge-soft-dynamic gap-1 px-3.5"
            style={{ '--badge-color': config.color } as React.CSSProperties}
        >
            {showIcon && config.icon && (
                <Icon icon={config.icon} className="w-3 h-3" />
            )}
            {config.label}
        </Chip>
    );
}
