"use client";

import type { ReactNode } from 'react';
import { SharedHeader } from './SharedHeader';

export function AppLayout({ children }: { children: ReactNode }) {
    return (
        <div className="flex flex-col w-full min-h-screen">
            <SharedHeader />
            <main id="main-content" className="flex-1">
                {children}
            </main>
        </div>
    );
}
