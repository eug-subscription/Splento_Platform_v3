import { Card, Chip } from "@heroui/react";
import { Icon } from "@iconify/react";
import type { UsageSummaryMetric } from "../../../types/team";
import { getProgressColor, formatValue } from "../utils/usage";

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
                    <Card key={metric.id} className="p-4">
                        <Card.Content className="p-0"> {/* Using Card.Content for structure */}
                            <div className="flex items-start justify-between mb-3">
                                <div className="p-2 rounded-lg bg-default-100">
                                    <Icon icon={metric.icon} className="w-5 h-5 text-default-500" />
                                </div>
                                {isWarning && percentage !== null && (
                                    <Chip size="sm" variant="soft" className="bg-danger/10 text-danger h-6">
                                        <Icon icon="gravity-ui:triangle-exclamation" className="w-3 h-3 mr-1" />
                                        {percentage}%
                                    </Chip>
                                )}
                            </div>

                            <p className="text-sm text-default-500 mb-1">{metric.label}</p>

                            <p className="text-2xl font-bold text-foreground mb-1">
                                {formatValue(metric.used, metric.unit)}
                                {metric.total && (
                                    <span className="text-base font-normal text-default-400">
                                        {' '}/ {formatValue(metric.total, metric.unit)}
                                    </span>
                                )}
                            </p>

                            {metric.total && percentage !== null && (
                                <div className="mt-3">
                                    <div className="h-2 bg-default-100 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full rounded-full transition-all ${getProgressColor(percentage)}`}
                                            style={{ width: `${Math.min(percentage, 100)}%` }}
                                        />
                                    </div>
                                    {!isWarning && (
                                        <p className="text-xs text-default-400 mt-1">{percentage}% used</p>
                                    )}
                                </div>
                            )}

                            {metric.trend && (
                                <p className={`text-xs mt-2 flex items-center gap-1 ${metric.trend.direction === 'up' ? 'text-success' :
                                    metric.trend.direction === 'down' ? 'text-danger' : 'text-default-500'
                                    }`}>
                                    <Icon
                                        icon={metric.trend.direction === 'up' ? 'gravity-ui:arrow-up' :
                                            metric.trend.direction === 'down' ? 'gravity-ui:arrow-down' : 'gravity-ui:minus'}
                                        className="w-3 h-3"
                                    />
                                    {metric.trend.value}% vs last period
                                </p>
                            )}
                        </Card.Content>
                    </Card>
                );
            })}
        </div>
    );
}
