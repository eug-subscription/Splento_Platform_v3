import { Skeleton } from '@heroui/react';
import { useParams } from '@tanstack/react-router';

export function OrderDetailPage() {
    const { id } = useParams({ from: '/dashboard-shell/orders/$id' });
    // ID will be used to fetch data in future phases
    void id;

    return (
        <div className="p-6 space-y-6">
            {/* Header Skeleton */}
            <div className="flex items-center gap-4">
                <Skeleton className="h-10 w-10 rounded-lg" />
                <div className="space-y-2">
                    <Skeleton className="h-6 w-48 rounded-lg" />
                    <Skeleton className="h-4 w-32 rounded-lg" />
                </div>
                <div className="ml-auto flex gap-2">
                    <Skeleton className="h-10 w-24 rounded-lg" />
                    <Skeleton className="h-10 w-10 rounded-lg" />
                </div>
            </div>

            {/* Tabs Skeleton */}
            <div className="flex gap-2 border-b border-divider pb-2">
                {[1, 2, 3, 4, 5].map(i => (
                    <Skeleton key={i} className="h-10 w-24 rounded-lg" />
                ))}
            </div>

            {/* Tab Content Skeleton */}
            <div className="grid grid-cols-3 gap-6">
                <div className="col-span-2 space-y-4">
                    <Skeleton className="h-48 rounded-xl" />
                    <Skeleton className="h-32 rounded-xl" />
                </div>
                <div className="space-y-4">
                    <Skeleton className="h-40 rounded-xl" />
                    <Skeleton className="h-40 rounded-xl" />
                </div>
            </div>
        </div>
    );
}
