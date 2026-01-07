import { Card, Chip, cn } from "@heroui/react";
import { Icon } from "@iconify/react";

export interface StatsCardProps {
    /**
     * The label/title of the statistic
     */
    label: string;

    /**
     * The main value to display
     */
    value: string | number;

    /**
     * Iconifier icon string
     */
    icon: string;

    /**
     * Optional secondary text
     */
    subtext?: string;

    /**
     * Optional trend indicator
     */
    trend?: {
        value: string | number;
        direction: 'up' | 'down' | 'neutral';
        label?: string;
        color?: 'success' | 'danger' | 'default';
    };

    /**
     * Optional progress bar
     */
    progress?: {
        value: number; // Current value
        max: number;   // Max value
        color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger";
    };

    /**
     * Warning state
     */
    warning?: boolean;

    /**
     * Additional class name
     */
    className?: string;
}

export function StatsCard({
    label,
    value,
    icon,
    subtext,
    trend,
    progress,
    warning,
    className
}: StatsCardProps) {
    const progressPercentage = progress ? Math.min(100, Math.max(0, (progress.value / progress.max) * 100)) : 0;

    // Helper to get progress bar color class if not explicitly provided
    const getProgressColorClass = (val: number, color?: string) => {
        if (color) {
            // Map simple color names to background utility classes if needed, 
            // or assume it's handled by utility classes if using standard Heroui colors.
            // For now, let's use the logic from SummaryCards for consistency if color is not provided.
            return "";
        }
        if (val > 80) return 'bg-danger';
        if (val > 60) return 'bg-warning';
        return 'bg-success';
    };

    const progressColorClass = progress?.color ? `bg-${progress.color}` : getProgressColorClass(progressPercentage);

    return (
        <Card className={`h-full ${className || ''}`}>
            <Card.Header className="flex flex-row items-start justify-between gap-2">
                <p className="text-sm text-default-500 font-medium">{label}</p>
                <div className="flex items-center gap-2">
                    {warning && (
                        <Chip size="sm" variant="soft" color="danger" className="h-6 px-1.5">
                            <Icon icon="gravity-ui:triangle-exclamation" className="w-3 h-3" />
                        </Chip>
                    )}
                    <Icon icon={icon} className="w-5 h-5 text-default-400" />
                </div>
            </Card.Header>
            <Card.Content className="flex flex-col h-full justify-between">
                <div>
                    {/* Value & Subtext */}
                    <div className="mb-3 flex items-baseline">
                        <p className="text-2xl font-bold text-foreground">
                            {value}
                        </p>
                        {subtext && (
                            <span className="text-base font-normal text-default-400 ml-1">
                                {subtext}
                            </span>
                        )}
                    </div>

                    {/* Progress Bar */}
                    {progress && (
                        <div className="mb-2">
                            <div
                                role="progressbar"
                                aria-valuenow={progress.value}
                                aria-valuemin={0}
                                aria-valuemax={progress.max}
                                aria-label={`${label} progress`}
                                className="h-2 bg-default-100 rounded-full overflow-hidden"
                            >
                                <div
                                    className={`h-full rounded-full transition-all ${progressColorClass}`}
                                    style={{ width: `${progressPercentage}%` }}
                                />
                            </div>
                            <p className="text-xs text-default-400 mt-1">{Math.round(progressPercentage)}% used</p>
                        </div>
                    )}
                </div>

                <div>
                    {/* Trend */}
                    {trend && (
                        <p className={cn(
                            "text-xs flex items-center gap-1",
                            trend.color === 'success' || (!trend.color && trend.direction === 'up') ? 'text-success' :
                                trend.color === 'danger' || (!trend.color && trend.direction === 'down') ? 'text-danger' :
                                    'text-default-500'
                        )}>
                            <Icon
                                icon={trend.direction === 'up' ? 'gravity-ui:arrow-up' :
                                    trend.direction === 'down' ? 'gravity-ui:arrow-down' : 'gravity-ui:minus'}
                                className="w-3 h-3"
                            />
                            {trend.value}
                            {trend.label && <span className="text-default-500">{trend.label}</span>}
                        </p>
                    )}
                </div>
            </Card.Content>
        </Card>
    );
}
