import { Card, Button, Alert, Avatar } from "@heroui/react";
import { Icon } from "@iconify/react";
import type { TeamOverviewData, ActivityEntry } from "../../../types/team";

interface OverviewTabProps {
    teamData: TeamOverviewData;
    onInviteMember: () => void;
    onBuyCredits: () => void;
    onExportReport: () => void;
    onNavigateToTab: (tabId: string) => void;
}

import { StatsCard } from "../../ui/StatsCard/StatsCard";

// Using Mock Activity Data
const RECENT_ACTIVITY: ActivityEntry[] = [
    { id: '1', user: { name: 'Anna K.', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026024d' }, action: 'invited sarah@wolt.com', category: 'members', timestamp: '2 hours ago' },
    { id: '2', user: { name: 'John D.', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d' }, action: 'updated permissions for Mike', category: 'permissions', timestamp: '5 hours ago' },
    { id: '3', user: null, action: 'Invoice #1247 paid successfully', category: 'billing', timestamp: 'Yesterday' },
    { id: '4', user: { name: 'Maria S.', avatar: 'https://i.pravatar.cc/150?u=a048581f4e29026701d' }, action: 'created API key "Production"', category: 'api', timestamp: '2 days ago' },
    { id: '5', user: { name: 'Anna K.', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026024d' }, action: 'enabled 2FA enforcement', category: 'security', timestamp: '3 days ago' },
];

export function OverviewTab({ teamData, onInviteMember, onBuyCredits, onExportReport, onNavigateToTab }: OverviewTabProps) {

    return (
        <div className="space-y-6">
            {/* 1. Alert Banner (Conditional) */}
            {(teamData.alerts.lowCredits || teamData.alerts.creditsDepleted) && (
                <Alert status={teamData.alerts.creditsDepleted ? "danger" : "warning"} className="mb-6 items-center">
                    <Alert.Indicator>
                        <Icon icon="gravity-ui:triangle-exclamation" />
                    </Alert.Indicator>
                    <Alert.Content>
                        <Alert.Title>You've used 75% of your monthly credits</Alert.Title>
                        <Alert.Description>Consider upgrading your plan or purchasing additional credits.</Alert.Description>
                    </Alert.Content>
                    <Button variant="primary" size="sm" onPress={onBuyCredits} className="ml-auto">
                        Buy Credits
                    </Button>
                </Alert>
            )}

            {/* 2. Quick Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatsCard
                    icon="gravity-ui:persons"
                    label="Team Members"
                    value={teamData.stats.members.total}
                    subtext="total members"
                    trend={{ value: teamData.stats.members.trend, direction: 'up', label: 'this month' }}
                />
                <StatsCard
                    icon="gravity-ui:thunderbolt"
                    label="Credits Remaining"
                    value={teamData.stats.credits.remaining.toLocaleString()}
                    subtext={`of ${teamData.stats.credits.total.toLocaleString()} remaining`}
                />
                <StatsCard
                    icon="gravity-ui:chart-area-stacked"
                    label="This Period Usage"
                    value={`${teamData.stats.periodUsage.percentage}%`}
                    subtext="used this month"
                    trend={{ value: teamData.stats.periodUsage.trend, direction: 'up', label: 'vs last month' }}
                />
                <StatsCard
                    icon="gravity-ui:chair"
                    label="Seats"
                    value={`${teamData.stats.seats.used}/${teamData.stats.seats.total}`}
                    subtext={`${teamData.stats.seats.total - teamData.stats.seats.used} available`}
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* 3. Usage Snapshot */}
                <Card className="h-full">
                    <Card.Header className="pb-0 pt-4 px-4 flex-col items-start">
                        <h4 className="font-bold text-large">Usage Snapshot</h4>
                    </Card.Header>
                    <Card.Content className="py-4 overflow-visible">
                        <div className="space-y-6">
                            {teamData.usageSnapshot.map((metric) => (
                                <div key={metric.id}>
                                    <div className="flex justify-between mb-2">
                                        <span className="text-sm font-medium text-foreground">{metric.label}</span>
                                        <span className="text-sm text-default-500">
                                            {metric.used.toLocaleString()} / {metric.total.toLocaleString()} {metric.unit}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                                            <div
                                                className={`h-full rounded-full transition-all ${metric.percentage > 80 ? 'bg-danger' :
                                                    metric.percentage > 60 ? 'bg-warning' : 'bg-success'
                                                    }`}
                                                style={{ width: `${metric.percentage}%` }}
                                            />
                                        </div>
                                        <span className="text-sm font-medium text-default-600 min-w-[3ch] text-right">
                                            {metric.percentage}%
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card.Content>
                    <Card.Footer className="justify-end pt-0">
                        <Button variant="ghost" size="sm" onPress={() => onNavigateToTab('usage')}>
                            View All Usage
                            <Icon icon="gravity-ui:arrow-right" className="ml-1" />
                        </Button>
                    </Card.Footer>
                </Card>

                {/* 4. Recent Activity */}
                <Card className="h-full">
                    <Card.Header className="pb-0 pt-4 px-4 flex-col items-start">
                        <h4 className="font-bold text-large">Recent Activity</h4>
                    </Card.Header>
                    <Card.Content className="py-4">
                        <ul className="space-y-4">
                            {RECENT_ACTIVITY.map((activity) => (
                                <li key={activity.id} className="flex items-start gap-3">
                                    {activity.user ? (
                                        <Avatar size="sm">
                                            <Avatar.Image src={activity.user.avatar} alt={activity.user.name} />
                                            <Avatar.Fallback>{activity.user.name.charAt(0)}</Avatar.Fallback>
                                        </Avatar>
                                    ) : (
                                        <div className="w-8 h-8 rounded-full bg-default-100 flex items-center justify-center min-w-8">
                                            <Icon icon="gravity-ui:pulse" className="text-default-500" />
                                        </div>
                                    )}
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm text-foreground">
                                            {activity.user ? <span className="font-semibold">{activity.user.name}</span> : 'System'}
                                            {' '}{activity.action}
                                        </p>
                                        <p className="text-xs text-default-500">{activity.timestamp}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </Card.Content>
                    <Card.Footer className="justify-end pt-0">
                        <Button variant="ghost" size="sm" onPress={() => onNavigateToTab('activity')}>
                            View Full Log
                            <Icon icon="gravity-ui:arrow-right" className="ml-1" />
                        </Button>
                    </Card.Footer>
                </Card>
            </div>

            {/* 5. Quick Actions */}
            <Card>
                <Card.Header className="pb-0 pt-4 px-4 flex-col items-start">
                    <h4 className="font-bold text-large">Quick Actions</h4>
                </Card.Header>
                <Card.Content className="py-4">
                    <div className="flex gap-4 flex-wrap">
                        <Button
                            variant="secondary"
                            onPress={onInviteMember}
                        >
                            <Icon icon="gravity-ui:person-plus" className="text-lg" />
                            Invite Member
                        </Button>
                        <Button
                            variant="primary"
                            onPress={onBuyCredits}
                        >
                            <Icon icon="gravity-ui:thunderbolt" className="text-lg" />
                            Buy Credits
                        </Button>
                        <Button
                            variant="secondary"
                            onPress={onExportReport}
                        >
                            <Icon icon="gravity-ui:file-arrow-down" className="text-lg" />
                            Export Report
                        </Button>
                    </div>
                </Card.Content>
            </Card>
        </div>
    );
}
