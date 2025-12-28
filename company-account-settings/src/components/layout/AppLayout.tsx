
import { type ReactNode, lazy, Suspense } from 'react';

const SharedHeader = lazy(() => import('./SharedHeader').then(m => ({ default: m.SharedHeader })));

export function AppLayout({ children }: { children: ReactNode }) {
    return (
        <div className="flex flex-col w-full min-h-screen">
            <Suspense fallback={<div className="h-16 border-b border-separator animate-pulse" />}>
                <SharedHeader />
            </Suspense>
            <main id="main-content" className="flex-1">
                {children}
            </main>
        </div>
    );
}
