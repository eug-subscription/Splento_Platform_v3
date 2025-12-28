import { Suspense, lazy } from 'react';
import { Tabs } from '@heroui/react';
import { DevelopersTabSkeleton } from './DevelopersTabSkeleton';

// Sections
const ApiKeysSection = lazy(() => import('./ApiKeysSection').then(m => ({ default: m.ApiKeysSection })));
const WebhooksSection = lazy(() => import('./WebhooksSection').then(m => ({ default: m.WebhooksSection })));
const ApiLogsSection = lazy(() => import('./ApiLogsSection').then(m => ({ default: m.ApiLogsSection })));

export function DevelopersTab() {
    return (
        <div className="w-full">
            <Tabs aria-label="Developer settings">
                <Tabs.ListContainer className="w-fit mb-8">
                    <Tabs.List className="flex items-center gap-1 bg-default-100 p-1 rounded-full">
                        <Tabs.Tab
                            id="api-keys"
                            className="px-6 h-9 relative data-[selected=true]:text-foreground font-medium text-sm text-default-500 transition-all duration-300 cursor-pointer rounded-full group whitespace-nowrap"
                        >
                            <Tabs.Indicator className="absolute inset-0 bg-background rounded-full shadow-sm" />
                            <span className="relative z-10">API Keys</span>
                        </Tabs.Tab>
                        <Tabs.Tab
                            id="webhooks"
                            className="px-6 h-9 relative data-[selected=true]:text-foreground font-medium text-sm text-default-500 transition-all duration-300 cursor-pointer rounded-full group whitespace-nowrap"
                        >
                            <Tabs.Indicator className="absolute inset-0 bg-background rounded-full shadow-sm" />
                            <span className="relative z-10">Webhooks</span>
                        </Tabs.Tab>
                        <Tabs.Tab
                            id="api-logs"
                            className="px-6 h-9 relative data-[selected=true]:text-foreground font-medium text-sm text-default-500 transition-all duration-300 cursor-pointer rounded-full group whitespace-nowrap"
                        >
                            <Tabs.Indicator className="absolute inset-0 bg-background rounded-full shadow-sm" />
                            <span className="relative z-10">API Logs</span>
                        </Tabs.Tab>
                    </Tabs.List>
                </Tabs.ListContainer>

                <Tabs.Panel id="api-keys">
                    <Suspense fallback={<DevelopersTabSkeleton />}>
                        <ApiKeysSection />
                    </Suspense>
                </Tabs.Panel>
                <Tabs.Panel id="webhooks">
                    <Suspense fallback={<DevelopersTabSkeleton />}>
                        <WebhooksSection />
                    </Suspense>
                </Tabs.Panel>
                <Tabs.Panel id="api-logs">
                    <Suspense fallback={<DevelopersTabSkeleton />}>
                        <ApiLogsSection />
                    </Suspense>
                </Tabs.Panel>
            </Tabs>
        </div>
    );
}
