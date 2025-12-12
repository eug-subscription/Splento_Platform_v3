import { Card, Chip } from '@heroui/react';
import { Icon } from '@iconify/react';
import type { MetricData } from '../../types';

interface MetricsGridProps {
    metrics: MetricData[];
    isLoading?: boolean;
}

/**
 * MetricsGrid Component
 * Displays account health metrics in a responsive grid with trend indicators
 * 
 * Follows AccountSettings patterns:
 * - Direct Hero UI v3 imports
 * - Compound component syntax
 * - Skeleton loading states
 * - Semantic color variants for trends
 */
export function MetricsGrid({ metrics, isLoading = false }: MetricsGridProps) {
    if (isLoading) {
        return (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {[...Array(4)].map((_, i) => (
                    <Card key={i} variant="default" className="rounded-large animate-pulse">
                        <Card.Content className="p-4">
                            <div className="h-4 w-24 rounded bg-default-200" />
                            <div className="mt-2 h-8 w-32 rounded bg-default-200" />
                            <div className="mt-2 h-4 w-16 rounded bg-default-200" />
                        </Card.Content>
                    </Card>
                ))}
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {metrics.map((metric) => (
                <Card
                    key={metric.label}
                    variant="default"
                    className="rounded-large border-separator hover:shadow-md transition-shadow"
                >
                    <Card.Content className="p-4">
                        {/* Label */}
                        <p className="text-sm text-foreground/50">{metric.label}</p>

                        {/* Value */}
                        <p className="mt-1 text-3xl font-bold text-foreground">
                            {metric.value}
                        </p>

                        {/* Trend Indicator Chip */}
                        <div className="mt-2 flex items-center gap-2">
                            <Chip
                                size="sm"
                                color={metric.trend === 'up' ? 'success' : 'danger'}
                                className="gap-1 px-2 py-0.5"
                            >
                                <Icon
                                    icon={metric.trend === 'up' ? 'gravity-ui:arrow-up' : 'gravity-ui:arrow-down'}
                                    className="size-3"
                                />
                                <span className="text-xs font-medium">
                                    {Math.abs(metric.change)}%
                                </span>
                            </Chip>
                        </div>
                    </Card.Content>
                </Card>
            ))}
        </div>
    );
}
