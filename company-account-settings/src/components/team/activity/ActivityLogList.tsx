import { Button, Spinner } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useState, lazy, Suspense } from "react";
import type { ActivityLogEntry } from "@/types/activity";
import { ActivityLogRow } from "./ActivityLogRow";
import { ActivityEmptyState } from "./ActivityEmptyState";

const ActivityDetailModal = lazy(() => import("./modals/ActivityDetailModal").then(m => ({ default: m.ActivityDetailModal })));

export interface ActivityLogListProps {
    activities: ActivityLogEntry[];
    isLoading: boolean;
    hasMore: boolean;
    onLoadMore: () => void;
    isFiltered: boolean;
    onResetFilters: () => void;
}

export function ActivityLogList({
    activities,
    isLoading,
    hasMore,
    onLoadMore,
    isFiltered,
    onResetFilters,
}: ActivityLogListProps) {
    const [selectedEntry, setSelectedEntry] = useState<ActivityLogEntry | null>(null);

    if (!activities.length && !isLoading) {
        return (
            <ActivityEmptyState
                isFiltered={isFiltered}
                onResetFilters={onResetFilters}
            />
        );
    }

    return (
        <div className="space-y-4" aria-live="polite">
            {/* Activity Timeline */}
            <div className="flex flex-col gap-4 relative before:absolute before:left-4 md:before:left-5 before:top-4 before:bottom-4 before:w-[1px] before:bg-default-200/50">
                {activities.map((entry) => (
                    <ActivityLogRow
                        key={entry.id}
                        entry={entry}
                        onPress={(e) => setSelectedEntry(e)}
                    />
                ))}
            </div>

            {/* Modal */}
            <Suspense fallback={null}>
                <ActivityDetailModal
                    isOpen={!!selectedEntry}
                    onClose={() => setSelectedEntry(null)}
                    entry={selectedEntry}
                />
            </Suspense>

            {/* Pagination / Load More */}
            {hasMore && (
                <div className="flex justify-center pt-8 pb-4">
                    <Button
                        variant="secondary"
                        onPress={onLoadMore}
                        isDisabled={isLoading}
                        className="rounded-field px-12 font-medium bg-background border-default-200 hover:bg-default-50"
                    >
                        {isLoading ? (
                            <>
                                <Spinner size="sm" color="current" />
                                <span className="ml-2">Loading more...</span>
                            </>
                        ) : (
                            <>
                                <Icon icon="gravity-ui:chevron-down" className="size-4 mr-2" />
                                View more activity
                            </>
                        )}
                    </Button>
                </div>
            )}

            {/* End of list indicator */}
            {!hasMore && activities.length > 0 && (
                <div className="flex flex-col items-center justify-center pt-12 pb-8 text-center gap-2">
                    <div className="size-1 w-1 bg-default-300 rounded-full" />
                    <p className="text-xs text-default-500 font-medium tracking-widest uppercase">
                        End of Activity Log
                    </p>
                </div>
            )}
        </div>
    );
}
