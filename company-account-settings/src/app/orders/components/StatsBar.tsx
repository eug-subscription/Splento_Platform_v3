import { Button, Skeleton } from '@heroui/react';
import { Icon } from '@iconify/react';
import type { OrderStatus } from '@/types/order.types';
import type { OrderStats } from '@/hooks/useOrders';

interface StatsBarProps {
    stats: OrderStats;
    isLoading?: boolean;
    onStatPress?: (status: OrderStatus | 'all') => void;
}

interface StatCardProps {
    label: string;
    value: string | number;
    icon: string;
    color: string;
    onPress: () => void;
}

function StatCard({ label, value, icon, color, onPress }: StatCardProps) {
    return (
        <Button
            onPress={onPress}
            className="w-full h-auto p-0 flex flex-col items-stretch text-left bg-content1 shadow-surface data-[pressed=true]:scale-95 transition-transform duration-200 rounded-3xl border-none outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
        >
            <div className="flex flex-row items-center gap-4 p-4 w-full">
                <div
                    className="flex items-center justify-center w-12 h-12 rounded-xl shrink-0"
                    style={{ backgroundColor: `color-mix(in oklab, ${color}, transparent 85%)` }}
                >
                    <Icon icon={icon} className="w-6 h-6" style={{ color }} />
                </div>
                <div className="flex flex-col">
                    <p className="text-2xl leading-none font-semibold text-foreground tracking-tight">{value}</p>
                    <p className="text-xs font-medium text-muted-foreground mt-1 uppercase tracking-[0.08em]">{label}</p>
                </div>
            </div>
        </Button>
    );
}

export function StatsBar({ stats, isLoading, onStatPress }: StatsBarProps) {
    if (isLoading) {
        return (
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 max-w-7xl mx-auto lg:mx-0">
                {[1, 2, 3, 4, 5].map(i => (
                    <div key={i} className="bg-content1 shadow-surface rounded-3xl p-3.5 flex flex-row items-center gap-4">
                        <Skeleton className="w-12 h-12 rounded-xl" />
                        <div className="flex-1 space-y-2">
                            <Skeleton className="h-6 w-12 rounded-lg" />
                            <Skeleton className="h-3 w-20 rounded-lg" />
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 max-w-7xl mx-auto lg:mx-0">
            <StatCard
                label="Total Orders"
                value={stats.total}
                icon="gravity-ui:shopping-cart"
                color="var(--foreground)"
                onPress={() => onStatPress?.('all')}
            />
            <StatCard
                label="Scheduled"
                value={stats.scheduled}
                icon="gravity-ui:calendar"
                color="var(--info)"
                onPress={() => onStatPress?.('scheduled')}
            />
            <StatCard
                label="In Progress"
                value={stats.inProgress}
                icon="gravity-ui:play"
                color="var(--warning)"
                onPress={() => onStatPress?.('in_progress')}
            />
            <StatCard
                label="Pending Review"
                value={stats.pendingReview}
                icon="gravity-ui:eye"
                color="var(--lavender)"
                onPress={() => onStatPress?.('review')}
            />
            <StatCard
                label="Completed"
                value={stats.completed}
                icon="gravity-ui:circle-check-fill"
                color="var(--success)"
                onPress={() => onStatPress?.('completed')}
            />
        </div>
    );
}
