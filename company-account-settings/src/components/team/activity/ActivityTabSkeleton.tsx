import { Card, Skeleton } from "@heroui/react";

export function ActivityTabSkeleton() {
    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Header Skeleton */}
            <div className="flex flex-col gap-1 px-1">
                <Skeleton className="h-8 w-48 rounded-lg" />
                <Skeleton className="h-4 w-64 rounded-lg" />
            </div>

            {/* Filter Bar Skeleton */}
            <Card className="p-6 bg-default-50/50 border-default-100 shadow-none rounded-3xl">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                    <Skeleton className="h-10 w-full rounded-xl" />
                    <Skeleton className="h-10 w-full rounded-xl" />
                    <Skeleton className="h-10 w-full rounded-xl" />
                    <Skeleton className="h-10 w-full rounded-xl" />
                    <Skeleton className="h-10 w-full rounded-xl" />
                </div>
            </Card>

            {/* Activity List Skeleton */}
            <div className="space-y-4">
                {[...Array(6)].map((_, i) => (
                    <Card
                        key={i}
                        className="flex flex-row items-start gap-4 p-4 rounded-3xl border-default-100 bg-background/50 shadow-none"
                    >
                        {/* Icon Avatar Skeleton */}
                        <Skeleton className="size-10 rounded-full flex-shrink-0" />

                        <div className="flex-1 space-y-3">
                            <div className="flex justify-between items-center">
                                {/* Actor & Category Skeleton */}
                                <div className="flex items-center gap-2">
                                    <Skeleton className="h-4 w-32 rounded-full" />
                                    <Skeleton className="h-5 w-20 rounded-full" />
                                </div>
                                {/* Timestamp Skeleton */}
                                <Skeleton className="h-4 w-24 rounded-full" />
                            </div>

                            {/* Action Description Skeleton */}
                            <Skeleton className="h-5 w-full max-w-2xl rounded-lg" />

                            {/* Metadata Skeleton */}
                            <div className="flex gap-4">
                                <Skeleton className="h-3 w-32 rounded-full" />
                                <Skeleton className="h-3 w-40 rounded-full" />
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}
