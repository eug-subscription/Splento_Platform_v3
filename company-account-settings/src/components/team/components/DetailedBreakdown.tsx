import { Card } from "@heroui/react";
import { Icon } from "@iconify/react";
import type { DetailedMetric } from "@/types/team";
import { getProgressColor, formatValue } from "@/components/team/utils/usage";

interface DetailedBreakdownProps {
    metrics: DetailedMetric[];
}

export function DetailedBreakdown({ metrics }: DetailedBreakdownProps) {
    return (
        <Card className="mb-6">
            <Card.Header className="pb-0 pt-4 px-4 flex-col items-start">
                <h4 className="font-bold text-large">Detailed Breakdown</h4>
                <p className="text-small text-default-500">Complete usage metrics for the selected period</p>
            </Card.Header>
            <Card.Content className="p-0 mt-4">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-default-200 bg-default-100/50">
                                <th className="p-4 text-left text-sm font-medium text-default-500">Metric</th>
                                <th className="p-4 text-right text-sm font-medium text-default-500">Used</th>
                                <th className="p-4 text-right text-sm font-medium text-default-500">Total</th>
                                <th className="p-4 text-left text-sm font-medium text-default-500 w-48">Progress</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-default-200">
                            {metrics.map((metric) => {
                                const percentage = metric.total
                                    ? Math.round((metric.used / metric.total) * 100)
                                    : null;

                                return (
                                    <tr key={metric.id} className="hover:bg-default-100/50 transition-colors">
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 rounded-lg bg-default-100">
                                                    <Icon icon={metric.icon} className="w-4 h-4 text-default-500" />
                                                </div>
                                                <span className="text-sm font-medium text-foreground">{metric.label}</span>
                                            </div>
                                        </td>

                                        <td className="p-4 text-right">
                                            <span className="text-sm font-medium text-foreground">
                                                {formatValue(metric.used, metric.unit)}
                                            </span>
                                        </td>

                                        <td className="p-4 text-right">
                                            <span className="text-sm text-default-500">
                                                {metric.total ? formatValue(metric.total, metric.unit) : '∞'}
                                            </span>
                                        </td>

                                        <td className="p-4">
                                            {percentage !== null ? (
                                                <div className="flex items-center gap-3">
                                                    <div className="flex-1 h-2 bg-default-100 rounded-full overflow-hidden">
                                                        <div
                                                            className={`h-full rounded-full transition-all ${getProgressColor(percentage)}`}
                                                            style={{ width: `${Math.min(percentage, 100)}%` }}
                                                        />
                                                    </div>
                                                    <span className={`text-xs font-medium w-10 text-right ${percentage >= 80 ? 'text-danger' : 'text-default-500'
                                                        }`}>
                                                        {percentage}%
                                                    </span>
                                                </div>
                                            ) : (
                                                <span className="text-sm text-default-500">—</span>
                                            )}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </Card.Content>
        </Card>
    );
}
