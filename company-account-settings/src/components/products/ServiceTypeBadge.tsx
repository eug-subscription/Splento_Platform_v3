import type { ServiceType } from '../../types/products';

const BADGE_CONFIG: Record<ServiceType, { label: string; className: string }> = {
    human: {
        label: 'Pro Service',
        className: 'bg-foreground text-background',
    },
    ai: {
        label: 'AI Tool',
        className: 'badge--ai-gradient',
    },
    hybrid: {
        label: 'Pro + AI',
        className: 'bg-accent text-accent-foreground',
    },
};

interface ServiceTypeBadgeProps {
    type: ServiceType;
    className?: string;
}

export function ServiceTypeBadge({ type, className = '' }: ServiceTypeBadgeProps) {
    const config = BADGE_CONFIG[type];

    return (
        <span
            className={`inline-flex items-center rounded-md px-2.5 py-1 text-xs font-semibold tracking-wide ${config.className} ${className}`}
        >
            {config.label}
        </span>
    );
}
