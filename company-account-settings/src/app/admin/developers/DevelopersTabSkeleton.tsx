import { Skeleton } from '@heroui/react';

export function DevelopersTabSkeleton() {
    return (
        <div className="space-y-6 animate-pulse">
            {/* Tabs list skeleton */}
            <div className="flex gap-4 border-b border-divider mb-6">
                <Skeleton className="h-10 w-24 rounded-none border-b-2 border-transparent" />
                <Skeleton className="h-10 w-24 rounded-none border-b-2 border-transparent" />
                <Skeleton className="h-10 w-24 rounded-none border-b-2 border-transparent" />
            </div>

            {/* Content area skeleton */}
            <div className="space-y-4">
                {/* Alert skeleton */}
                <Skeleton className="h-16 w-full rounded-lg" />

                {/* Header/Action skeleton */}
                <div className="flex justify-between items-center mt-8">
                    <Skeleton className="h-8 w-32 rounded-md" />
                    <Skeleton className="h-10 w-40 rounded-full" />
                </div>

                {/* List items skeleton */}
                <div className="space-y-3">
                    {[1, 2, 3].map((i) => (
                        <Skeleton key={i} className="h-32 w-full rounded-xl" />
                    ))}
                </div>
            </div>
        </div>
    );
}
