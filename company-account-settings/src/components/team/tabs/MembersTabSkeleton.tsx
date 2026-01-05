import { Card, Skeleton } from "@heroui/react";

export function MembersTabSkeleton() {
    return (
        <div className="space-y-6">
            {/* 1. Pending Invitations Skeleton (Optional/Hidden in skeleton for simplicity or shown as collapsed) */}
            <Skeleton className="h-14 w-full rounded-2xl" />

            {/* 2. Toolbar Skeleton */}
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                    <Skeleton className="h-10 w-full rounded-xl" />
                </div>
                <div className="flex gap-2">
                    <Skeleton className="h-10 w-40 rounded-xl" />
                    <Skeleton className="h-10 w-36 rounded-xl" />
                </div>
                <div className="flex gap-2">
                    <Skeleton className="h-10 w-32 rounded-xl" />
                    <Skeleton className="h-10 w-36 rounded-xl" />
                </div>
            </div>

            {/* 3. Members Table Skeleton */}
            <Card>
                <Card.Content className="p-0">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-default-200">
                                    <th className="p-4 w-10"><Skeleton className="h-5 w-5 rounded" /></th>
                                    <th className="p-4 text-left"><Skeleton className="h-4 w-24 rounded" /></th>
                                    <th className="p-4 text-left"><Skeleton className="h-4 w-20 rounded" /></th>
                                    <th className="p-4 text-left"><Skeleton className="h-4 w-20 rounded" /></th>
                                    <th className="p-4 text-center"><Skeleton className="h-4 w-10 mx-auto rounded" /></th>
                                    <th className="p-4 text-left"><Skeleton className="h-4 w-24 rounded" /></th>
                                    <th className="p-4 w-20"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {[...Array(5)].map((_, i) => (
                                    <tr key={i} className="border-b border-default-200 last:border-b-0">
                                        <td className="p-4"><Skeleton className="h-5 w-5 rounded" /></td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <Skeleton className="w-8 h-8 rounded-full" />
                                                <div className="space-y-2">
                                                    <Skeleton className="h-4 w-32 rounded" />
                                                    <Skeleton className="h-3 w-24 rounded" />
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4"><Skeleton className="h-6 w-20 rounded-full" /></td>
                                        <td className="p-4"><Skeleton className="h-6 w-16 rounded-full" /></td>
                                        <td className="p-4"><Skeleton className="h-4 w-4 mx-auto rounded" /></td>
                                        <td className="p-4"><Skeleton className="h-4 w-20 rounded" /></td>
                                        <td className="p-4 text-right"><Skeleton className="h-8 w-8 rounded-lg ml-auto" /></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card.Content>
            </Card>
        </div>
    );
}
