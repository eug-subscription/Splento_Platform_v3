import { Chip } from '@heroui/react';
import { Icon } from '@iconify/react';
import type { PaymentStatus } from '@/types/order.types';
import { PAYMENT_STATUS_CONFIG } from '@/data/order-constants';

interface PaymentStatusBadgeProps {
    status: PaymentStatus;
    size?: 'sm' | 'md' | 'lg';
    showIcon?: boolean;
}

export function PaymentStatusBadge({
    status,
    size = 'sm',
    showIcon = true
}: PaymentStatusBadgeProps) {
    const config = PAYMENT_STATUS_CONFIG[status];

    return (
        <Chip
            color={config?.color || 'default'}
            variant="soft"
            size={size}
            className="gap-1 px-3.5"
        >
            {showIcon && config?.icon && (
                <Icon icon={config.icon} className="w-3 h-3" />
            )}
            {config?.label || status}
        </Chip>
    );
}
