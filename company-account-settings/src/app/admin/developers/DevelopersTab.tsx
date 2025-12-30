import { Suspense, lazy, useState } from 'react';
import { Tabs } from '@heroui/react';
import { DevelopersTabSkeleton } from './DevelopersTabSkeleton';
import { DevelopersSidebar } from './DevelopersSidebar';
import type { DeveloperSectionId } from '@/types/developers';

// Sections
const ApiKeysSection = lazy(() => import('./ApiKeysSection').then(m => ({ default: m.ApiKeysSection })));
const WebhooksSection = lazy(() => import('./WebhooksSection').then(m => ({ default: m.WebhooksSection })));
const ApiLogsSection = lazy(() => import('./ApiLogsSection').then(m => ({ default: m.ApiLogsSection })));

export function DevelopersTab() {
    const [activeSection, setActiveSection] = useState<DeveloperSectionId>('api-keys');

    return (
        <div className="w-full">
            {/* Desktop Layout (md+) */}
            <div className="hidden md:grid grid-cols-[240px_1fr] gap-8 min-h-[600px]">
                <aside className="border-r border-default-100 pr-4">
                    <DevelopersSidebar
                        activeSection={activeSection}
                        onSectionChange={setActiveSection}
                    />
                </aside>

                <main className="min-w-0">
                    <Suspense fallback={<DevelopersTabSkeleton />}>
                        {activeSection === 'api-keys' && <ApiKeysSection />}
                        {activeSection === 'webhooks' && <WebhooksSection />}
                        {activeSection === 'api-logs' && <ApiLogsSection />}
                    </Suspense>
                </main>
            </div>

            {/* Mobile Layout (<md) - Keeping existing horizontal tabs pattern */}
            <div className="md:hidden">
                <Tabs
                    aria-label="Developer settings"
                    selectedKey={activeSection}
                    onSelectionChange={(key) => setActiveSection(key as DeveloperSectionId)}
                >
                    <Tabs.ListContainer className="w-full mb-6 overflow-x-auto no-scrollbar">
                        <Tabs.List className="flex items-center gap-1 bg-default-100 p-1 rounded-full w-max">
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
        </div>
    );
}
