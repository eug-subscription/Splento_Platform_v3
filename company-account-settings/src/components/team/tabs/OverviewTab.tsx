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

// Sub-component: StatCard
interface StatCardProps {
    icon: string;
    title: string;
    label: string;
    value: string | number;
    subtext: string;
    trend?: {
        value: string;
        direction: 'up' | 'down' | 'neutral';
    };
    progress?: {
        value: number; // 0-100
        max: number;
    };
}

function StatCard({ icon, title, value, subtext, trend, progress }: StatCardProps) {
    return (
        <Card className="h-full">
            <Card.Content className="p-4 flex flex-col justify-between">
                <div>
                    {/* Header: Title and Icon */}
                    <div className="flex items-start justify-between mb-4">
                        <h3 className="text-medium text-default-500">{title}</h3>
                        <Icon icon={icon} className="text-2xl text-default-300" />
                    </div>

                    {/* Body: Value & Subtext (Grouped Tightly) */}
                    <div className="flex flex-col gap-1">
                        <p className="text-4xl font-semibold text-foreground">{value}</p>
                        <p className="text-sm text-default-400">{subtext}</p>
                    </div>

                    {/* Footer: Trend */}
                    {trend && (
                        <div className={`mt-2 flex items-center gap-1 text-sm font-medium ${trend.direction === 'up' ? 'text-success' :
                            trend.direction === 'down' ? 'text-danger' : 'text-default-500'
                            }`}>
                            {trend.direction === 'up' && <Icon icon="gravity-ui:arrow-up" />}
                            {trend.direction === 'down' && <Icon icon="gravity-ui:arrow-down" />}
                            <span>{trend.value}</span>
                        </div>
                    )}
                </div>

                {progress && (
                    <div className="mt-4">
                        <div className="h-1.5 bg-default-100 rounded-full overflow-hidden">
                            <div
                                className={`h-full rounded-full transition-all ${progress.value > 80 ? 'bg-danger' :
                                    progress.value > 60 ? 'bg-warning' : 'bg-success'
                                    }`}
                                style={{ width: `${(progress.value / progress.max) * 100}%` }}
                            />
                        </div>
                    </div>
                )}
            </Card.Content>
        </Card>
    );
}

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
                <StatCard
                    icon="gravity-ui:persons"
                    title="Team Members"
                    label="Members"
                    value={teamData.stats.members.total}
                    subtext="total members"
                    trend={{ value: teamData.stats.members.trend, direction: 'up' }}
                />
                <StatCard
                    icon="gravity-ui:thunderbolt"
                    title="Credits Remaining"
                    label="Credits"
                    value={teamData.stats.credits.remaining.toLocaleString()}
                    subtext={`of ${teamData.stats.credits.total.toLocaleString()} remaining`}
                />
                <StatCard
                    icon="gravity-ui:chart-area-stacked"
                    title="This Period Usage"
                    label="Usage"
                    value={`${teamData.stats.periodUsage.percentage}%`}
                    subtext="used this month"
                    trend={{ value: teamData.stats.periodUsage.trend, direction: 'up' }}
                />
                <StatCard
                    icon="gravity-ui:chair"
                    title="Seats"
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
