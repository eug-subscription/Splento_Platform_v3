import { useState, useEffect } from "react";
import { ActivityTabSkeleton } from "@/app/team/components/activity/ActivityTabSkeleton";
import { ActivityFilterBar } from "@/app/team/components/activity/ActivityFilterBar";
import { ActivityLogList } from "@/app/team/components/activity/ActivityLogList";
import { useActivity } from "@/hooks/useActivity";
import { MOCK_MEMBERS } from "@/data/mock-team";
import { DEFAULT_FILTERS } from "@/data/activity-constants";

import { UsageHeader } from '@/app/team/components/UsageHeader';
import { useModal } from '@/hooks/useModal';

export function ActivityTab() {
    const {
        activities,
        filters,
        setFilters,
        isLoading,
        hasMore,
        loadMore,
        exportToCSV,
    } = useActivity();

    const [mounted, setMounted] = useState(false);
    const { openModal } = useModal();
    const [selectedPeriod, setSelectedPeriod] = useState<string>('last-30-days'); // Default matching DEFAULT_FILTERS

    useEffect(() => {
        const handle = requestAnimationFrame(() => {
            setMounted(true);
        });
        return () => cancelAnimationFrame(handle);
    }, []);

    const handlePeriodChange = (periodId: string) => {
        setSelectedPeriod(periodId);

        if (periodId === 'custom') {
            openModal('date_range_picker', {
                initialRange: filters.customDateRange,
                onApply: (range: { start: Date; end: Date }) => {
                    setFilters({ customDateRange: range, dateRange: 'custom' });
                }
            });
        }
    };

    // Show skeleton during initial load
    if (!mounted) {
        return <ActivityTabSkeleton />;
    }

    const handleResetFilters = () => {
        setFilters(DEFAULT_FILTERS);
    };

    const isFiltered =
        filters.category !== "all" ||
        filters.memberId !== "all" ||
        filters.dateRange !== DEFAULT_FILTERS.dateRange ||
        !!filters.search;

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500 pb-12">
            {/* 1. Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-1">
                <div className="flex flex-col gap-1">
                    <h1 className="text-2xl font-bold text-foreground">Activity Log</h1>
                    <p className="text-default-500">
                        Monitor and audit all team activity, security events, and configuration changes.
                    </p>
                </div>

                <UsageHeader
                    selectedPeriod={selectedPeriod}
                    onPeriodChange={handlePeriodChange}
                    customDateRange={filters.customDateRange}
                    onCustomDateChange={(range) => setFilters({ customDateRange: range })}
                    onExport={exportToCSV}
                    isExporting={isLoading} // reusing loading state for export visual
                    hidePeriodSelector={false}
                />
            </div>

            {/* 2. Filter Bar (Date Range Removed via Prop or modification) */}
            <ActivityFilterBar
                filters={filters}
                onFiltersChange={setFilters}
                members={MOCK_MEMBERS}
                hideDateRange={true}
                hideExport={true}
            />

            {/* 3. Activity List Area */}
            <ActivityLogList
                activities={activities}
                isLoading={isLoading}
                hasMore={hasMore}
                onLoadMore={loadMore}
                isFiltered={isFiltered}
                onResetFilters={handleResetFilters}
            />
        </div>
    );
}
