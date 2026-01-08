import { useState, lazy, Suspense } from 'react';
import { Card, Spinner } from "@heroui/react";
import { useModal } from '@/hooks/useModal';
import { TeamHeader } from '@/app/team/components/TeamHeader';
import { TeamTabs } from '@/app/team/components/TeamTabs';
import { useSecurity } from '@/hooks/useSecurity';

// --- Lazy loaded Team tabs ---
const OverviewTab = lazy(() => import('@/app/team/components/tabs/OverviewTab').then(m => ({ default: m.OverviewTab })));
const MembersTab = lazy(() => import('@/app/team/components/tabs/MembersTab').then(m => ({ default: m.MembersTab })));
const PermissionsTab = lazy(() => import('@/app/team/components/tabs/PermissionsTab').then(m => ({ default: m.PermissionsTab })));
const UsageTab = lazy(() => import('@/app/team/components/tabs/UsageTab').then(m => ({ default: m.UsageTab })));
const BillingTab = lazy(() => import('@/app/admin/billing/BillingTab').then(m => ({ default: m.BillingTab })));
const DevelopersTab = lazy(() => import('@/app/admin/developers/DevelopersTab').then(m => ({ default: m.DevelopersTab })));
const SecurityTab = lazy(() => import('@/app/team/components/tabs/SecurityTab').then(m => ({ default: m.SecurityTab })));
const ActivityTab = lazy(() => import('@/app/team/components/tabs/ActivityTab').then(m => ({ default: m.ActivityTab })));
const SettingsTab = lazy(() => import('@/app/team/components/tabs/SettingsTab').then(m => ({ default: m.SettingsTab })));

import { MOCK_TEAM, TEAM_OVERVIEW_DATA, MOCK_MEMBERS } from '@/data/mock-team';

export function TeamPage() {
    const [activeTab, setActiveTab] = useState('overview');
    const { openModal } = useModal();
    const { hasSecurityIssues } = useSecurity();

    const handleInvite = () => {
        openModal('invite_member', {
            onSubmit: async () => {
                // Real app would update state here
            }
        });
    };

    const handleBuyCredits = () => {
        openModal('buy_credits');
    };

    const handleExportReport = () => {
        openModal('request_data_export');
    };

    return (
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
            {/* Persistent Header */}
            <TeamHeader
                team={MOCK_TEAM}
                onInvite={handleInvite}
            />

            {/* Tab Navigation */}
            <TeamTabs
                activeTab={activeTab}
                onTabChange={setActiveTab}
                memberCount={MOCK_TEAM.memberCount}
                hasSecurityIssues={hasSecurityIssues}
            />

            {/* Dynamic Tab Content Area */}
            <div className="mt-6 min-h-[400px]">
                <Suspense fallback={
                    <div className="flex flex-col items-center justify-center p-12 gap-4">
                        <Spinner size="lg" />
                        <span className="text-muted-foreground animate-pulse">Loading tab...</span>
                    </div>
                }>
                    {activeTab === 'overview' ? (
                        <OverviewTab
                            teamData={TEAM_OVERVIEW_DATA}
                            onInviteMember={handleInvite}
                            onBuyCredits={handleBuyCredits}
                            onExportReport={handleExportReport}
                            onNavigateToTab={setActiveTab}
                        />
                    ) : activeTab === 'members' ? (
                        <MembersTab />
                    ) : activeTab === 'billing' ? (
                        <BillingTab
                            currentUser={MOCK_MEMBERS[0]}
                        />
                    ) : activeTab === 'permissions' ? (
                        <PermissionsTab members={MOCK_MEMBERS} />
                    ) : activeTab === 'usage' ? (
                        <UsageTab
                            teamId={MOCK_TEAM.id}
                            members={MOCK_MEMBERS}
                            onNavigateToMember={() => { }}
                        />
                    ) : activeTab === 'developers' ? (
                        <DevelopersTab />
                    ) : activeTab === 'security' ? (
                        <SecurityTab />
                    ) : activeTab === 'activity' ? (
                        <ActivityTab />
                    ) : activeTab === 'settings' ? (
                        <SettingsTab />
                    ) : (
                        <Card className="border-dashed border-2 border-default-200 bg-transparent shadow-none">
                            <Card.Content className="p-12 flex flex-col items-center justify-center text-center">
                                <div className="text-4xl mb-4 opacity-20">🚧</div>
                                <h2 className="text-xl font-semibold mb-2">
                                    {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Tab
                                </h2>
                                <p className="text-default-500 max-w-sm">
                                    This module is currently under construction.
                                    Check back later for implementation.
                                </p>
                            </Card.Content>
                        </Card>
                    )}
                </Suspense>
            </div>
        </div>
    );
}
