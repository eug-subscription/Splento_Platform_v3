import { useState, useEffect } from "react";
import { ActivityTabSkeleton } from "@/components/team/activity/ActivityTabSkeleton";
import { ActivityFilterBar } from "@/components/team/activity/ActivityFilterBar";
import { ActivityLogList } from "@/components/team/activity/ActivityLogList";
import { useActivity } from "@/hooks/useActivity";
import { MOCK_MEMBERS } from "@/data/mock-team";
import { DEFAULT_FILTERS } from "@/data/activity-constants";

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

    useEffect(() => {
        const handle = requestAnimationFrame(() => {
            setMounted(true);
        });
        return () => cancelAnimationFrame(handle);
    }, []);

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
            <div className="flex flex-col gap-1 px-1">
                <h1 className="text-2xl font-bold text-foreground">Activity Log</h1>
                <p className="text-default-500">
                    Monitor and audit all team activity, security events, and configuration changes.
                </p>
            </div>

            {/* 2. Filter Bar */}
            <ActivityFilterBar
                filters={filters}
                onFiltersChange={setFilters}
                members={MOCK_MEMBERS}
                onExport={exportToCSV}
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
