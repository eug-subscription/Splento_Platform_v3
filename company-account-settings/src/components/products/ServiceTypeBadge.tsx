import { Chip } from '@heroui/react';
import type { ServiceType } from '../../types/products';

const BADGE_CONFIG: Record<ServiceType, { label: string; className?: string; variant: "primary" | "secondary" | "tertiary" | "soft"; color?: "default" | "accent" | "success" | "warning" | "danger" }> = {
    human: {
        label: 'Pro Service',
        className: '!bg-foreground !text-background',
        variant: 'primary',
    },
    ai: {
        label: 'AI Tool',
        className: 'badge--ai-gradient',
        variant: 'primary',
    },
    hybrid: {
        label: 'Pro + AI',
        variant: 'primary',
        color: 'accent',
    },
};

interface ServiceTypeBadgeProps {
    type: ServiceType;
    className?: string;
}

export function ServiceTypeBadge({ type, className = '' }: ServiceTypeBadgeProps) {
    const config = BADGE_CONFIG[type];

    return (
        <Chip
            size="sm"
            variant={config.variant}
            color={config.color}
            className={`px-2 font-semibold tracking-wide ${config.className || ''} ${className}`}
        >
            {config.label}
        </Chip>
    );
}
