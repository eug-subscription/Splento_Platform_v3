import React from 'react';
import { Chip } from '@heroui/react';
import { Icon } from '@iconify/react';
import type { OrderType } from '@/types/order.types';
import { ORDER_TYPE_CONFIG } from '@/data/order-constants';

interface OrderTypeBadgeProps {
    type: OrderType;
    showIcon?: boolean;
    size?: 'sm' | 'md' | 'lg';
}

export function OrderTypeBadge({
    type,
    showIcon = true,
    size = 'sm'
}: OrderTypeBadgeProps) {
    const config = ORDER_TYPE_CONFIG[type] ?? ORDER_TYPE_CONFIG.photo;

    return (
        <Chip
            variant="soft"
            size={size}
            className="badge-soft-dynamic gap-1 px-3.5"
            style={{ '--badge-color': config.color } as React.CSSProperties}
        >
            {showIcon && (
                <Icon icon={config.icon} className="w-3 h-3" />
            )}
            {config.label}
        </Chip>
    );
}
