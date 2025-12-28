import { Card, Skeleton, Separator } from '@heroui/react';

export function BillingTabSkeleton() {
    return (
        <div className="space-y-8 w-full max-w-[1200px] mx-auto p-4 md:p-6">

            {/* Header */}
            <div className="flex flex-col gap-4">
                <div>
                    <Skeleton className="w-1/3 h-8 rounded-lg mb-2" />
                    <Skeleton className="w-1/2 h-4 rounded-lg" />
                </div>
                <Skeleton className="w-full h-12 rounded-xl" />
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                {/* Plan Card */}
                <Card className="h-80">
                    <Card.Header className="gap-2">
                        <Skeleton className="w-1/3 h-6 rounded-lg" />
                    </Card.Header>
                    <Card.Content className="flex flex-col gap-4">
                        <Skeleton className="w-full h-20 rounded-lg" />
                        <Skeleton className="w-full h-4 rounded-lg" />
                        <Skeleton className="w-2/3 h-4 rounded-lg" />
                    </Card.Content>
                </Card>

                {/* Credits Card */}
                <Card className="h-80">
                    <Card.Header className="gap-2">
                        <Skeleton className="w-1/3 h-6 rounded-lg" />
                    </Card.Header>
                    <Card.Content className="flex flex-col gap-4">
                        <Skeleton className="w-full h-12 rounded-lg" />
                        <Skeleton className="w-full h-4 rounded-lg" />
                        <div className="grid grid-cols-2 gap-4 mt-auto">
                            <Skeleton className="h-10 rounded-lg" />
                            <Skeleton className="h-10 rounded-lg" />
                        </div>
                    </Card.Content>
                </Card>

                {/* Right Column Stack */}
                <div className="flex flex-col gap-6">
                    <Card className="h-40">
                        <Card.Header>
                            <Skeleton className="w-1/2 h-5 rounded-lg" />
                        </Card.Header>
                        <Card.Content>
                            <Skeleton className="w-full h-10 rounded-lg" />
                        </Card.Content>
                    </Card>
                    <Card className="h-40">
                        <Card.Header>
                            <Skeleton className="w-1/2 h-5 rounded-lg" />
                        </Card.Header>
                        <Card.Content>
                            <Skeleton className="w-full h-10 rounded-lg" />
                        </Card.Content>
                    </Card>
                </div>
            </div>

            <Separator className="my-8" />

            {/* History Table */}
            <div className="space-y-4">
                <Skeleton className="w-1/4 h-6 rounded-lg" />
                <Skeleton className="w-full h-96 rounded-xl" />
            </div>
        </div>
    );
}
