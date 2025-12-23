import React from "react";
import { Card, Button, Separator, Skeleton } from "@heroui/react";
import { Icon } from "@iconify/react";
import { StackedProgressBar } from "../StackedProgressBar/StackedProgressBar";

// --- Types ---

export interface MetricItem {
    id: string; // for key
    label: string;
    description?: React.ReactNode; // Sub-label text
    value: React.ReactNode; // Main right-aligned value
    subValue?: React.ReactNode; // Secondary right-aligned value (e.g. %)
    colorDot?: string; // Tailwind class e.g., "bg-primary"
    trend?: {
        value: number;
        direction: 'up' | 'down' | 'neutral';
    };
}

export interface MetricProgressBarProps {
    value: number; // Current value or total used
    max?: number;
    color?: string; // If single color
    label?: string; // e.g. "23% Used"
    // For stacked bars
    segments?: Array<{
        percent: number;
        color: string;
        label: string;
        value: string;
    }>;
}

// --- Subcomponents ---

function MetricProgressBar({ value, max = 100, color, segments, label }: MetricProgressBarProps) {
    // If segments provided, render stacked
    if (segments && segments.length > 0) {
        return <StackedProgressBar segments={segments} label={label} />;
    }

    // Single bar
    const percentage = Math.min(100, Math.max(0, (value / max) * 100));
    // Determine color if not provided
    let barColor = color || "bg-primary";
    if (!color) {
        if (percentage > 90) barColor = "bg-danger";
        else if (percentage > 75) barColor = "bg-warning";
        else barColor = "bg-success";
    }

    return (
        <div className="w-full">
            <div className="h-2 bg-default-100 rounded-full overflow-hidden">
                <div
                    className={`h-full rounded-full transition-all ${barColor}`}
                    style={{ width: `${percentage}%` }}
                />
            </div>
            {label && <p className="text-xs text-default-400 mt-1">{label}</p>}
        </div>
    );
}

export interface MetricHeroProps {
    mainValue: React.ReactNode;
    subValue?: React.ReactNode;
    status?: React.ReactNode;
    progressBar?: MetricProgressBarProps;
}

function MetricHero({ mainValue, subValue, status, progressBar }: MetricHeroProps) {
    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <div className="flex flex-col gap-0.5 sm:gap-1">
                    <div className="flex items-baseline gap-2 flex-wrap">
                        <span className="text-2xl font-semibold tracking-tight">
                            {mainValue}
                        </span>
                        {subValue && (
                            <span className="text-default-500 font-medium text-sm sm:text-base">
                                {subValue}
                            </span>
                        )}
                    </div>
                </div>
                {status && <div>{status}</div>}
            </div>
            {progressBar && <MetricProgressBar {...progressBar} />}
        </div>
    );
}

export interface MetricListProps {
    items: MetricItem[];
    emptyText?: string;
}

function MetricList({ items, emptyText = "No activity for this period" }: MetricListProps) {
    if (items.length === 0) {
        return (
            <div className="py-4 text-center text-default-500 text-sm italic">
                {emptyText}
            </div>
        );
    }

    return (
        <div className="space-y-3">
            {items.map((item) => (
                <div key={item.id} className="flex items-center justify-between py-1">
                    <div className="flex items-center gap-3 min-w-0">
                        {item.colorDot && (
                            <span className={`w-2 h-2 rounded-full flex-shrink-0 ${item.colorDot}`} />
                        )}
                        <div className="flex flex-col">
                            <span className="text-sm font-medium truncate text-foreground">
                                {item.label}
                            </span>
                            {item.description && (
                                <span className="text-xs text-default-500">
                                    {item.description}
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center gap-4 sm:gap-6">
                        <span className="font-bold text-sm text-foreground text-right w-20 sm:w-24">
                            {item.value}
                        </span>
                        {(item.subValue || item.trend) && (
                            <div className="w-12 sm:w-16 text-right flex justify-end">
                                {item.trend ? (
                                    <span className={`text-xs font-medium flex items-center gap-1 ${item.trend.direction === 'up' ? 'text-success' :
                                        item.trend.direction === 'down' ? 'text-danger' : 'text-default-500'
                                        }`}>
                                        <Icon
                                            icon={item.trend.direction === 'up' ? "gravity-ui:arrow-up" : "gravity-ui:arrow-down"}
                                            className="size-3"
                                        />
                                        {Math.abs(item.trend.value)}%
                                    </span>
                                ) : (
                                    <span className="text-sm text-default-500">
                                        {item.subValue}
                                    </span>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}

export interface MetricFooterProps {
    content?: React.ReactNode;
}

function MetricFooter({ content }: MetricFooterProps) {
    if (!content) return null;

    return (
        <div className="space-y-4 mb-4 mt-auto">
            <Separator />
            <div className="flex items-center justify-between pt-1">
                {content}
            </div>
        </div>
    );
}

// --- Main Component ---

export interface MetricCardProps {
    title: string;
    description?: string;

    // Optional config mode props
    mainValue?: React.ReactNode;
    subValue?: React.ReactNode;
    status?: React.ReactNode;
    progressBar?: MetricProgressBarProps;
    items?: MetricItem[];
    footerContent?: React.ReactNode;
    action?: {
        label: string;
        onPress: () => void;
        variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
    };

    className?: string;
    isLoading?: boolean;
    children?: React.ReactNode;
}

export function MetricCard({
    title,
    description,
    mainValue,
    subValue,
    status,
    progressBar,
    items,
    footerContent,
    action,
    className = "",
    isLoading = false,
    children
}: MetricCardProps) {

    return (
        <Card className={`h-full flex flex-col ${className}`}>
            <Card.Header className="flex flex-col gap-1 items-start">
                <Card.Title className="text-lg font-bold">{title}</Card.Title>
                {description && <Card.Description>{description}</Card.Description>}
            </Card.Header>

            <Card.Content className="space-y-6 flex-1 flex flex-col">
                {isLoading ? (
                    <div className="space-y-4">
                        <Skeleton className="h-10 w-32 rounded" />
                        <Skeleton className="h-4 w-full rounded" />
                        <Skeleton className="h-24 w-full rounded" />
                    </div>
                ) : (
                    <>
                        {children ? (
                            children
                        ) : (
                            <>
                                {/* Legacy Config Mode */}
                                {mainValue && (
                                    <MetricHero
                                        mainValue={mainValue}
                                        subValue={subValue}
                                        status={status}
                                        progressBar={progressBar}
                                    />
                                )}
                                {items && <MetricList items={items} />}
                                {footerContent && (
                                    <MetricFooter content={footerContent} />
                                )}
                            </>
                        )}
                    </>
                )}
            </Card.Content>

            {!children && action && (
                <Card.Footer className="justify-end mt-auto">
                    <Button
                        variant={action.variant || "ghost"}
                        onPress={action.onPress}
                        className={`font-medium ${!action.variant || action.variant === 'ghost' || action.variant === 'secondary'
                            ? "border border-border shadow-none text-midnight dark:text-snow"
                            : ""
                            }`}
                    >
                        {action.label}
                    </Button>
                </Card.Footer>
            )}
        </Card>
    );
}

// Attach Subcomponents for Composition
MetricCard.Hero = MetricHero;
MetricCard.List = MetricList;
MetricCard.Footer = MetricFooter;
MetricCard.ProgressBar = MetricProgressBar;

