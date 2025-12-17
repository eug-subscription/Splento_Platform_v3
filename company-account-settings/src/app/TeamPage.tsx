import { useState } from 'react';
import { Card } from "@heroui/react";
import { TeamHeader } from '../components/team/TeamHeader';
import { TeamTabs } from '../components/team/TeamTabs';
import { OverviewTab } from '../components/team/tabs/OverviewTab';
import { MembersTab } from '../components/team/tabs/MembersTab';
import type { Team, TeamOverviewData } from '../types/team';

// MOCK DATA
const MOCK_TEAM: Team = {
    id: 'team-1',
    name: 'Wolt Finland',
    description: 'Main workspace for Wolt Finland operations',
    avatar: 'https://cdn.brandfetch.io/idAwO7GCAj/id5_6d209D.jpeg',
    plan: 'Enterprise',
    memberCount: 12,
    seatsUsed: 12,
    seatsTotal: 20,
    creditsRemaining: 15420,
    creditsTotal: 50000,
    nextBillingDate: '2025-01-01',
    monthlyCost: 299,
    perSeatCost: 29
};

const TEAM_OVERVIEW_DATA: TeamOverviewData = {
    stats: {
        members: { total: 12, trend: '+2 this month' },
        credits: { remaining: 1247, total: 5000 },
        periodUsage: { percentage: 67, trend: '+12% vs last month' },
        seats: { used: 12, total: 20 },
    },
    usageSnapshot: [
        { id: 'img', label: 'AI Image Credits', used: 3253, total: 5000, percentage: 65, unit: '' },
        { id: 'vid', label: 'AI Video Credits', used: 42, total: 100, percentage: 42, unit: '' },
        { id: 'api', label: 'API Calls', used: 58420, total: 100000, percentage: 58, unit: '' },
        { id: 'storage', label: 'Storage', used: 4.5, total: 5, percentage: 89, unit: 'GB' },
        { id: 'batch', label: 'Batch Exports', used: 73, total: 100, percentage: 73, unit: '' },
    ],
    alerts: {
        lowCredits: true,
        creditsDepleted: false,
        paymentFailed: false,
        seatsFull: false,
    },
};

export function TeamPage() {
    const [activeTab, setActiveTab] = useState('overview');

    const handleInvite = () => {
        console.log("Open Invite Modal");
    };

    const handleBuyCredits = () => { console.log("Open Buy Credits Modal"); };
    const handleExportReport = () => { console.log("Export Report"); };

    return (
        <div className="flex flex-col gap-6 p-6 max-w-[1600px] mx-auto w-full">
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
                hasSecurityIssues={true} // Mock state
            />

            {/* Dynamic Tab Content Area */}
            <div className="mt-2 min-h-[400px]">
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
            </div>
        </div>
    );
}
