import { Skeleton } from '@heroui/react';

export function OrderTableSkeleton() {
    const rows = Array.from({ length: 5 });

    return (
        <>
            {rows.map((_, rowIndex) => (
                <tr key={rowIndex} className="border-b border-separator/20">
                    {/* ID */}
                    <td className="px-4 py-4">
                        <Skeleton className="w-16 h-4 rounded-lg" />
                    </td>

                    {/* Type */}
                    <td className="px-4 py-4">
                        <Skeleton className="w-24 h-6 rounded-full" />
                    </td>

                    {/* Name + Location */}
                    <td className="px-4 py-4">
                        <div className="flex flex-col gap-2">
                            <Skeleton className="w-32 h-4 rounded-lg" />
                            <Skeleton className="w-24 h-3 rounded-lg" />
                        </div>
                    </td>

                    {/* Status */}
                    <td className="px-4 py-4">
                        <Skeleton className="w-20 h-6 rounded-full" />
                    </td>

                    {/* Payment Status */}
                    <td className="px-4 py-4">
                        <Skeleton className="w-16 h-6 rounded-full" />
                    </td>

                    {/* Created at */}
                    <td className="px-4 py-4">
                        <Skeleton className="w-24 h-4 rounded-lg" />
                    </td>

                    {/* Created by */}
                    <td className="px-4 py-4">
                        <Skeleton className="w-24 h-4 rounded-lg" />
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-4 text-right">
                        <Skeleton className="w-8 h-8 rounded-full ml-auto" />
                    </td>
                </tr>
            ))}
        </>
    );
}
