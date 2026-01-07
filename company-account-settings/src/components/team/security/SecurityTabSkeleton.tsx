import { Card, Skeleton } from "@heroui/react";

export function SecurityTabSkeleton() {
    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Overview Stat Cards Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[...Array(4)].map((_, i) => (
                    <Card key={i} className="p-4 bg-background/60 border-default-100">
                        <div className="flex items-center gap-3">
                            <Skeleton className="w-10 h-10 rounded-lg" />
                            <div className="space-y-2 flex-1">
                                <Skeleton className="h-3 w-1/2 rounded-full" />
                                <Skeleton className="h-5 w-3/4 rounded-full" />
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            {/* Main Content Cards Skeleton */}
            <Card className="p-6 space-y-6 bg-background/60 border-default-100">
                <div className="flex items-center justify-between">
                    <div className="space-y-2">
                        <Skeleton className="h-6 w-48 rounded-lg" />
                        <Skeleton className="h-4 w-64 rounded-lg" />
                    </div>
                    <Skeleton className="h-10 w-24 rounded-full" />
                </div>
                <div className="space-y-4">
                    <Skeleton className="h-40 w-full rounded-xl" />
                </div>
            </Card>

            <Card className="p-6 space-y-4 bg-background/60 border-default-100">
                <Skeleton className="h-6 w-32 rounded-lg" />
                <div className="space-y-3">
                    {[...Array(3)].map((_, i) => (
                        <Skeleton key={i} className="h-12 w-full rounded-lg" />
                    ))}
                </div>
            </Card>
        </div>
    );
}
