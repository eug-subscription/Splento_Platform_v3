import { StatsCard } from "@/components/ui/StatsCard/StatsCard";
import type { UsageSummaryMetric } from "@/types/team";
import { formatValue } from "@/utils/team-usage";

interface SummaryCardsProps {
    metrics: UsageSummaryMetric[];
}

export function SummaryCards({ metrics }: SummaryCardsProps) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {metrics.map((metric) => {
                const percentage = metric.total ? Math.round((metric.used / metric.total) * 100) : null;
                const isWarning = percentage !== null && percentage >= 80;

                return (
                    <StatsCard
                        key={metric.id}
                        label={metric.label}
                        value={formatValue(metric.used, metric.unit)}
                        icon={metric.icon}
                        subtext={metric.total ? `/ ${formatValue(metric.total, metric.unit)}` : undefined}
                        warning={isWarning || undefined} // Pass boolean or undefined
                        progress={metric.total && percentage !== null ? {
                            value: metric.used,
                            max: metric.total,
                        } : undefined}
                        trend={metric.trend ? {
                            value: `${metric.trend.value}%`,
                            label: 'vs last period',
                            direction: metric.trend.direction as 'up' | 'down' | 'neutral',
                        } : undefined}
                    />
                );
            })}
        </div>
    );
}
