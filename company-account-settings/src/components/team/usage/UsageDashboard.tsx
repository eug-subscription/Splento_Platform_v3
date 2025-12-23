import type { UsageSectionData, ProServicesData, BillingSummaryData } from "../../../types/usage";
import { MetricCard, type MetricItem } from "../../ui/MetricCard/MetricCard";
import { UsageStatusChip } from "./UsageStatusChip";
import { formatValue, formatCurrency } from "../utils/usage";
import { Icon } from "@iconify/react";

// Helper to map usage features to metric items
const mapFeaturesToItems = (features: UsageSectionData['features'], unit?: string): MetricItem[] => {
    return features.map(f => ({
        id: f.id,
        label: f.label,
        description: f.countUnit ? `${f.count.toLocaleString()} ${f.countUnit}` : undefined,
        value: formatValue(f.value, f.valueUnit || unit), // Main value
        // Map number trend to object required by MetricItem
        trend: f.trend ? {
            value: f.trend,
            direction: f.trend > 0 ? 'up' : (f.trend < 0 ? 'down' : 'neutral')
        } : undefined,
        // UsageSectionData color usually semantic name or class.
        // To be safe, check if starts with bg-. If not, prepend.
        colorDot: f.color.startsWith('bg-') ? f.color : `bg-${f.color}`,
    }));
};

// Helper to safely map action button variants
const mapActionVariant = (variant?: 'primary' | 'secondary' | 'warning' | 'danger' | 'ghost'): 'primary' | 'secondary' | 'ghost' | 'danger' | undefined => {
    if (!variant) return undefined;
    if (variant === 'warning') return 'secondary'; // Fallback for warning
    return variant;
};

interface UsageDashboardProps {
    creditsData: UsageSectionData;
    storageData: UsageSectionData;
    proServicesData?: ProServicesData;
    billingSummaryData?: BillingSummaryData;
    manageStorage?: () => void;
    isLoading?: boolean;
}

export function UsageDashboard({
    creditsData,
    storageData,
    proServicesData,
    billingSummaryData,
    manageStorage,
    isLoading = false
}: UsageDashboardProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* AI Credits Section */}
            <MetricCard
                isLoading={isLoading}
                title={creditsData.title}
                // Hero
                mainValue={formatValue(creditsData.used, creditsData.unit)}
                subValue={`/ ${formatValue(creditsData.total, creditsData.unit)} ${creditsData.unit === 'GB' ? '' : 'credits'}`}
                // Status Chip
                status={<UsageStatusChip status={creditsData.status} percentUsed={creditsData.percentUsed} />}
                // Progress Bar (Stacked)
                progressBar={{
                    value: creditsData.used,
                    max: creditsData.total,
                    label: "", // No label under bar as status is top right
                    segments: creditsData.features.filter(f => f.label !== 'Available Credits').map(f => ({
                        percent: f.percentage,
                        color: f.color.startsWith('bg-') ? f.color : `bg-${f.color}`,
                        label: f.label,
                        value: formatValue(f.value, f.valueUnit)
                    }))
                }}
                // Items (Filter out "Available Credits")
                items={mapFeaturesToItems(creditsData.features.filter(f => f.label !== 'Available Credits'), creditsData.unit)}
                // Footer Content (Available Credits)
                footerContent={(() => {
                    const available = creditsData.features.find(f => f.label === 'Available Credits');
                    if (!available) return undefined;
                    return (
                        <>
                            <div className="flex items-center gap-3">
                                <span className={`w-2 h-2 rounded-full ${available.color.startsWith('bg-') ? available.color : `bg-${available.color}`}`} />
                                <span className="text-sm font-medium text-foreground">{available.label}</span>
                            </div>
                            <span className="font-bold text-sm text-foreground">{formatValue(available.value, available.valueUnit || creditsData.unit)}</span>
                        </>
                    );
                })()}
                // Action
                action={creditsData.actionButton ? {
                    ...creditsData.actionButton,
                    variant: mapActionVariant(creditsData.actionButton.variant)
                } : undefined}
            />

            {/* Storage Section */}
            <MetricCard
                isLoading={isLoading}
                title={storageData.title}
                mainValue={formatValue(storageData.used, storageData.unit)}
                subValue={`/ ${formatValue(storageData.total, storageData.unit)}`}
                status={<UsageStatusChip status={storageData.status} percentUsed={storageData.percentUsed} />}
                progressBar={{
                    value: storageData.used,
                    max: storageData.total,
                    segments: storageData.features.filter(f => f.label !== 'Free Storage').map(f => ({
                        percent: f.percentage,
                        color: f.color.startsWith('bg-') ? f.color : `bg-${f.color}`,
                        label: f.label,
                        value: formatValue(f.value, f.valueUnit)
                    }))
                }}
                items={mapFeaturesToItems(storageData.features.filter(f => f.label !== 'Free Storage'), storageData.unit)}
                footerContent={(() => {
                    const free = storageData.features.find(f => f.label === 'Free Storage');
                    if (!free) return undefined;
                    return (
                        <>
                            <div className="flex items-center gap-3">
                                <span className={`w-2 h-2 rounded-full ${free.color.startsWith('bg-') ? free.color : `bg-${free.color}`}`} />
                                <span className="text-sm font-medium text-foreground">{free.label}</span>
                            </div>
                            <span className="font-bold text-sm text-foreground">{formatValue(free.value, free.valueUnit || storageData.unit)}</span>
                        </>
                    );
                })()}
                action={{
                    label: 'Manage Storage',
                    onPress: manageStorage || (() => { }),
                    variant: 'ghost'
                }}
            />

            {/* Pro Services Section */}
            {proServicesData && (
                <MetricCard
                    isLoading={isLoading}
                    title="Pro Service"
                    // Hero: "€2,450" (big) + "total spend • 3 sessions" (small block)
                    mainValue={formatCurrency(proServicesData.totalSpend, proServicesData.currency)}
                    subValue={
                        <span className="block mt-1">
                            total spend • {proServicesData.sessionCount} sessions
                        </span>
                    }
                    // No Progress Bar
                    // Items
                    items={proServicesData.services.map((service) => ({
                        id: service.id,
                        label: service.label,
                        description: `${service.deliverables} ${service.deliverableUnit} delivered`,
                        colorDot: service.color === 'success' ? 'bg-success' : 'bg-info',
                        // Right side: Count + Value
                        // DashboardMetricCard supports one main Value.
                        // ProServicesCard had: [Count] [Value]
                        // We can verify if "Value" prop accepts a composite node. Yes, ReactNode.
                        value: (
                            <div className="flex items-center justify-end gap-6 text-sm">
                                <span className="w-8 text-right font-bold">{service.count}</span>
                                <span className="w-16 text-right font-bold">{formatCurrency(service.spend, proServicesData.currency)}</span>
                            </div>
                        ),
                        // subValue/trend unused here as "Value" is composite
                    }))}
                    // Footer: Upcoming
                    footerContent={proServicesData.upcoming ? (
                        <>
                            <span className="text-default-500 text-sm font-medium pl-5">Upcoming</span>
                            <div className="flex items-center gap-6">
                                <span className="font-semibold text-right w-8">{proServicesData.upcoming.count}</span>
                                <span className="font-semibold text-right w-16">{formatCurrency(proServicesData.upcoming.cost, proServicesData.currency)}</span>
                            </div>
                        </>
                    ) : undefined}
                    action={{
                        label: "View Orders",
                        onPress: () => { },
                        variant: 'ghost' // "border border-grey-200..." handled by component default
                    }}
                />
            )}

            {/* Billing Summary Section */}
            {billingSummaryData && (
                <MetricCard
                    isLoading={isLoading}
                    title="Billing Summary"
                    mainValue={formatCurrency(billingSummaryData.totalSpend, billingSummaryData.currency)}
                    subValue={<span className="block mt-1">total spend vs last month</span>}
                    // Trend status
                    status={billingSummaryData.trend && (
                        <div className="flex items-center gap-1 text-sm bg-success-50 dark:bg-success-900/20 text-success px-2 py-0.5 rounded-full">
                            <Icon
                                icon={billingSummaryData.trend.direction === 'up' ? "gravity-ui:arrow-up" : "gravity-ui:arrow-down"}
                                className="w-4 h-4"
                            />
                            <span className="font-medium">{billingSummaryData.trend.value}%</span>
                        </div>
                    )}
                    // Items
                    items={billingSummaryData.categories.map((cat) => ({
                        id: cat.id,
                        label: cat.label,
                        // cat.color is usually a class like "bg-primary"
                        colorDot: cat.color,
                        // Right side: Value + Percentage
                        value: (
                            <div className="flex items-center gap-6 justify-end">
                                <span className="font-semibold w-16 text-right">
                                    {formatCurrency(cat.amount, billingSummaryData.currency)}
                                </span>
                                <span className="text-default-500 w-8 text-right">
                                    {Math.round(cat.percentage)}%
                                </span>
                            </div>
                        )
                    }))}
                    // Footer: Avg Monthly
                    footerContent={(
                        <>
                            <span className="text-default-500 text-sm font-medium pl-5">Avg Monthly</span>
                            <span className="font-semibold">{formatCurrency(billingSummaryData.avgMonthly, billingSummaryData.currency)}</span>
                        </>
                    )}
                    action={{
                        label: "View Billing",
                        onPress: () => { },
                        variant: 'ghost'
                    }}
                />
            )}
        </div>
    );
}
