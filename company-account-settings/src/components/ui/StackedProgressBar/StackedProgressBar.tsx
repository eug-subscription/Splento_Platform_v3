
import { Button, Tooltip } from "@heroui/react";

export interface StackedSegment {
    percent: number;
    color: string;
    label: string;
    value: string;
}

export interface StackedProgressBarProps {
    segments: StackedSegment[];
    label?: string;
    height?: string;
    className?: string; // allow overrides
}

export function StackedProgressBar({
    segments,
    label,
    height = "h-3",
    className = ""
}: StackedProgressBarProps) {
    const totalUsed = segments.reduce((acc, seg) => acc + seg.percent, 0);
    const unusedPercent = Math.max(0, 100 - totalUsed);

    return (
        <div className={`w-full ${className}`}>
            <div
                className={`flex w-full ${height} rounded-full overflow-hidden bg-default-100`}
                role="progressbar"
                aria-label={label || 'Usage breakdown'}
                aria-valuenow={Math.round(totalUsed)}
                aria-valuemin={0}
                aria-valuemax={100}
            >
                {segments.map((segment, index) => {
                    if (segment.percent <= 0) return null;
                    const isNotLast = index < segments.length - 1;

                    return (
                        <div
                            key={index}
                            className={`h-full ${isNotLast ? 'border-r-2 border-background' : ''}`}
                            style={{
                                width: `${segment.percent}%`,
                                minWidth: segment.percent > 0 && segment.percent < 1 ? '4px' : undefined
                            }}
                        >
                            <Tooltip closeDelay={0}>
                                <Tooltip.Trigger className="h-full w-full">
                                    <Button
                                        isIconOnly
                                        className={`h-full w-full block p-0 m-0 min-w-0 min-h-0 rounded-none ${segment.color} data-[hover=true]:opacity-80 transition-all duration-500`}
                                        aria-label={`${segment.label}: ${segment.value}`}
                                    >
                                        <span className="sr-only">{segment.label}: {segment.value}</span>
                                    </Button>
                                </Tooltip.Trigger>
                                <Tooltip.Content>
                                    {`${segment.label}: ${segment.value} (${Math.round(segment.percent)}%)`}
                                </Tooltip.Content>
                            </Tooltip>
                        </div>
                    );
                })}
                {unusedPercent > 0 && (
                    <div
                        className="h-full bg-transparent transition-all duration-300"
                        style={{ width: `${unusedPercent}%` }}
                    />
                )}
            </div>
        </div>
    );
}
