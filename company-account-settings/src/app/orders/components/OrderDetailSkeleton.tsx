import { Skeleton } from '@heroui/react';

/**
 * OrderDetailSkeleton provides a premium loading state for the entire Order Detail page.
 * It matches the layout of OrderHeader, OrderTabs, and the grid content of TabPanel.
 */
export function OrderDetailSkeleton() {
    return (
        <div className="flex flex-col gap-8 animate-in fade-in duration-500">
            {/* Header Skeleton Matching OrderHeader */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between px-1">
                <div className="flex items-center gap-4">
                    {/* Back button skeleton */}
                    <Skeleton className="w-10 h-10 rounded-xl" />

                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-3">
                            {/* Display ID */}
                            <Skeleton className="h-8 w-40 rounded-lg" />
                            {/* Badges */}
                            <div className="flex gap-2">
                                <Skeleton className="h-6 w-20 rounded-full" />
                                <Skeleton className="h-6 w-20 rounded-full" />
                            </div>
                        </div>
                        {/* Metadata line */}
                        <Skeleton className="h-4 w-64 rounded-lg" />
                    </div>
                </div>

                {/* Actions skeleton */}
                <div className="hidden sm:flex items-center gap-2">
                    <Skeleton className="h-10 w-32 rounded-xl" />
                    <Skeleton className="h-10 w-10 rounded-xl" />
                </div>
            </div>

            {/* Tabs Skeleton Matching OrderTabs */}
            <div className="border-b border-divider">
                <div className="flex gap-2 sm:gap-4 pb-3 px-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <Skeleton key={i} className="h-8 w-20 sm:w-28 rounded-lg" />
                    ))}
                </div>
            </div>

            {/* Content Skeleton Matching TabPanel Layout */}
            <div className="px-1 py-1">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Content Area */}
                    <div className="lg:col-span-2 space-y-6">
                        <Skeleton className="h-[200px] w-full rounded-2xl" />
                        <Skeleton className="h-[300px] w-full rounded-2xl" />
                    </div>

                    {/* Sidebar Area */}
                    <div className="space-y-6">
                        <Skeleton className="h-[150px] w-full rounded-2xl" />
                        <Skeleton className="h-[250px] w-full rounded-2xl" />
                        <Skeleton className="h-[120px] w-full rounded-2xl" />
                    </div>
                </div>
            </div>
        </div>
    );
}
