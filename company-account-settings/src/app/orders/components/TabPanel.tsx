import { Suspense, type ReactNode } from 'react';
import { Skeleton } from '@heroui/react';

interface TabPanelProps {
    children: ReactNode;
    isActive: boolean;
}

/**
 * Skeleton loader for tab content
 */
function TabPanelSkeleton() {
    return (
        <div className="space-y-6 p-1">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-4">
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

/**
 * TabPanel component wraps individual tab contents.
 * Handles visibility, suspense, and common layout.
 */
export function TabPanel({ children, isActive }: TabPanelProps) {
    if (!isActive) {
        return null;
    }

    return (
        <Suspense fallback={<TabPanelSkeleton />}>
            <div className="py-6 min-h-[400px]" role="tabpanel" aria-busy={false}>
                {children}
            </div>
        </Suspense>
    );
}
