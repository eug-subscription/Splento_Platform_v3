import { Card, Button, Avatar } from "@heroui/react";
import { Icon } from "@iconify/react";
import type { TeamOverviewData, UsageMetric } from "@/types/team";
import { MOCK_RECENT_ACTIVITY } from "@/data/mock-activity";
import { UsageHeader } from '@/components/team/components/UsageHeader';
import { useState, useEffect } from 'react';
import { useModal } from '@/hooks/useModal';
import { MOCK_UPCOMING_SHOOTS, MOCK_PAST_SHOOTS } from '@/data/mock-shoots';
import { LinearProgress } from '@/components/ui/Progress/LinearProgress';
import { CircularProgress } from '@/components/ui/Progress/CircularProgress';

/**
 * Props for the OverviewTab component.
 */
interface OverviewTabProps {
    teamData: TeamOverviewData;
    onInviteMember: () => void;
    onBuyCredits: () => void;
    onExportReport: () => void;
    onNavigateToTab: (tabId: string) => void;
}

/**
 * Renders a card displaying digital service metrics like AI credits.
 * Features a dynamic gradient background based on credit balance status.
 */
function DigitalServicesCard({ data, onBuyCredits }: { data: TeamOverviewData; onBuyCredits: () => void }) {
    const { remaining, total } = data.stats.credits;
    const percentUsed = Math.round(((total - remaining) / total) * 100);
    const isLow = data.alerts.lowCredits || data.alerts.creditsDepleted;

    return (
        <Card className={`h-full border-none shadow-sm overflow-hidden relative ${isLow ? 'bg-gradient-to-br from-warning-50/10 to-danger-50/10' : 'bg-content1'}`}>
            {/* Background Decor */}
            <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${isLow ? 'from-warning-500/20 to-danger-500/20' : 'from-cyan-500/10 to-blue-600/10'} blur-3xl rounded-full -translate-y-1/2 translate-x-1/2`} />

            <div className="p-6 relative z-10 flex flex-col h-full">
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-2">
                        <div className="p-2 bg-primary/10 text-primary rounded-lg">
                            <Icon icon="gravity-ui:thunderbolt" className="size-5" />
                        </div>
                        <h4 className="font-bold text-large uppercase tracking-wide text-default-600">Digital Services</h4>
                    </div>
                </div>

                <div className="flex-1 flex flex-col justify-center">
                    <span className="text-sm font-medium text-default-500 mb-1">AI Credits Remaining</span>
                    <div className="text-5xl font-bold tracking-tight text-foreground mb-6">
                        {remaining.toLocaleString()}
                    </div>

                    <div className="space-y-2 mb-4">
                        <LinearProgress
                            value={percentUsed}
                            color={isLow ? "warning" : "primary"}
                        />
                        <div className="flex justify-between text-xs text-default-500 font-medium">
                            <span>{percentUsed}% used</span>
                            <span>{total.toLocaleString()} total</span>
                        </div>
                    </div>
                </div>

                {isLow && (
                    <div className="mt-4 bg-danger-soft rounded-xl p-3 flex gap-3 items-center">
                        <Icon icon="gravity-ui:triangle-exclamation" className="text-danger size-5 shrink-0" />
                        <div className="flex-1">
                            <p className="text-sm font-semibold text-danger">Low Balance</p>
                            <p className="text-xs text-danger/80">Consider upgrading your plan or purchasing additional credits.</p>
                        </div>
                        <Button size="sm" className="bg-danger text-white font-medium h-8" onPress={onBuyCredits}>
                            Buy Credits
                        </Button>
                    </div>
                )}
            </div>
        </Card>
    );
}

/**
 * Renders a compact bento-style card for specific usage metrics.
 * Displays a circular progress indicator and contextual icon.
 */
function UsageBentoCard({ metric, colorClass, customFooter }: { metric: UsageMetric; colorClass: string; customFooter?: React.ReactNode }) {
    return (
        <Card className="h-full border-none bg-default-50 shadow-sm hover:bg-default-100 transition-colors">
            <div className="p-4 flex flex-col items-center text-center h-full justify-between gap-4">
                <div className="w-full flex justify-between items-center">
                    <span className="text-sm font-semibold text-default-600">{metric.label}</span>
                    {metric.label === "AI Image Usage" && <Icon icon="gravity-ui:picture" className="text-default-400" />}
                    {metric.label === "AI Video Usage" && <Icon icon="gravity-ui:video" className="text-default-400" />}
                    {metric.label === "Storage" && <Icon icon="gravity-ui:database" className="text-default-400" />}
                    {metric.label.includes("API") && <Icon icon="gravity-ui:plug-connection" className="text-default-400" />}
                </div>

                <CircularProgress
                    value={metric.percentage}
                    colorClass={colorClass}
                    size={100}
                    strokeWidth={8}
                />

                <div className="text-xs text-default-500 font-medium">
                    {customFooter ? (
                        customFooter
                    ) : (
                        <>{metric.used.toLocaleString()} <span className="text-default-300">/</span> {metric.total.toLocaleString()} {metric.unit}</>
                    )}
                </div>
            </div>
        </Card>
    );
}

/**
 * Renders a card displaying physical service orders (shoots).
 * Features tabbed navigation between upcoming and past events.
 */
function PhysicalServicesCard({ onNavigate }: { onNavigate: (tabId: string) => void }) {
    const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');

    return (
        <Card className="h-full border-none shadow-sm overflow-hidden bg-content1">
            <div className="p-6 h-full flex flex-col">
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-2">
                        <div className="p-2 bg-secondary/10 text-secondary rounded-lg">
                            <Icon icon="gravity-ui:calendar" className="size-5" />
                        </div>
                        <h4 className="font-bold text-large uppercase tracking-wide text-default-600">Physical Services</h4>
                    </div>
                    <Button size="sm" variant="ghost" className="text-secondary font-medium" onPress={() => onNavigate('orders')}>
                        View All
                    </Button>
                </div>

                <div className="w-full">
                    <div className="flex gap-6 w-full border-b border-divider mb-4">
                        <Button
                            variant="ghost"
                            onPress={() => setActiveTab('upcoming')}
                            aria-label="Show upcoming shoots"
                            className={`px-0 py-2.5 h-auto min-w-0 rounded-none font-medium text-sm transition-all border-b-2 bg-transparent hover:bg-transparent ${activeTab === 'upcoming'
                                ? 'border-secondary text-secondary'
                                : 'border-transparent text-default-500 hover:text-default-700'
                                }`}
                        >
                            Upcoming
                        </Button>
                        <Button
                            variant="ghost"
                            onPress={() => setActiveTab('past')}
                            aria-label="Show past shoots"
                            className={`px-0 py-2.5 h-auto min-w-0 rounded-none font-medium text-sm transition-all border-b-2 bg-transparent hover:bg-transparent ${activeTab === 'past'
                                ? 'border-secondary text-secondary'
                                : 'border-transparent text-default-500 hover:text-default-700'
                                }`}
                        >
                            Past
                        </Button>
                    </div>

                    <div className="space-y-3">
                        {activeTab === 'upcoming' ? (
                            MOCK_UPCOMING_SHOOTS.map(shoot => (
                                <div key={shoot.id} className="flex items-center gap-4 p-3 rounded-xl bg-background border border-default-200/50 shadow-sm">
                                    <div className="flex flex-col items-center justify-center bg-secondary/10 text-secondary rounded-lg w-12 h-12 shrink-0">
                                        <span className="text-[10px] font-bold uppercase leading-none">{shoot.date.split(' ')[0]}</span>
                                        <span className="text-lg font-bold leading-none mt-0.5">{shoot.date.split(' ')[1].replace(',', '')}</span>
                                    </div>
                                    <div>
                                        <p className="font-semibold text-foreground text-sm">{shoot.title}</p>
                                        <div className="flex items-center gap-1 text-xs text-default-500 mt-0.5">
                                            <Icon icon="gravity-ui:location-dot" />
                                            <span>{shoot.location}</span>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            MOCK_PAST_SHOOTS.map(shoot => (
                                <div key={shoot.id} className="flex items-center gap-4 p-3 rounded-xl bg-default-100/50 border border-transparent opacity-70">
                                    <div className="flex flex-col items-center justify-center bg-default-200 text-default-500 rounded-lg w-12 h-12 shrink-0">
                                        <span className="text-[10px] font-bold uppercase leading-none">{shoot.date.split(' ')[0]}</span>
                                        <span className="text-lg font-bold leading-none mt-0.5">{shoot.date.split(' ')[1].replace(',', '')}</span>
                                    </div>
                                    <div>
                                        <p className="font-semibold text-foreground text-sm">{shoot.title}</p>
                                        <div className="flex items-center gap-1 text-xs text-default-500 mt-0.5">
                                            <Icon icon="gravity-ui:location-dot" />
                                            <span>{shoot.location}</span>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </Card>
    );
}

/**
 * Renders a real-time activity pulse graph using SVG.
 * Optimized with GPU acceleration hints for smooth animation.
 */
function ActivityPulseCard() {
    return (
        <Card className="h-full border-none shadow-sm relative overflow-hidden bg-default-50 transition-colors group">
            {/* Background elements */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/5 opacity-0 dark:opacity-20 pointer-events-none" />

            <div className="p-6 relative z-10 flex flex-col h-full justify-between">
                <div>
                    <h4 className="font-bold text-large text-foreground dark:text-white mb-1">Activity Pulse</h4>
                    <p className="text-sm text-default-500 dark:text-default-400">Real-time event volume</p>
                </div>

                <div className="flex-1 flex items-end w-full min-h-[120px] py-4 relative">
                    {/* SVG Graph */}
                    <svg className="w-full h-full overflow-visible" viewBox="0 0 100 60" preserveAspectRatio="none">
                        <defs>
                            <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="var(--splento-cyan)" stopOpacity="0.3" />
                                <stop offset="90%" stopColor="var(--splento-cyan)" stopOpacity="0" />
                            </linearGradient>
                        </defs>

                        {/* Area Fill */}
                        <path
                            d="M0,45 C20,45 30,15 50,15 S80,50 100,30 V60 H0 Z"
                            fill="url(#areaGradient)"
                            className="opacity-60 dark:opacity-40 transition-opacity will-change-opacity"
                        />

                        {/* Back Glow (Dark Mode Only) */}
                        <path
                            d="M0,45 C20,45 30,15 50,15 S80,50 100,30"
                            fill="none"
                            stroke="var(--splento-cyan)"
                            strokeWidth="4"
                            className="hidden dark:block opacity-60 blur-md transition-all will-change-[opacity,transform]"
                        />

                        {/* Main Line */}
                        <path
                            d="M0,45 C20,45 30,15 50,15 S80,50 100,30"
                            fill="none"
                            strokeWidth="3"
                            strokeLinecap="round"
                            className="stroke-cyan-500 dark:stroke-[var(--splento-cyan)] drop-shadow-sm dark:drop-shadow-none transition-all will-change-transform"
                        />
                    </svg>
                </div>

                <div className="flex justify-between text-xs text-default-500 font-mono mt-2">
                    <span>20m</span>
                    <span>10m</span>
                    <span>Now</span>
                </div>
            </div>
        </Card>
    );
}

/**
 * The Overview Tab component.
 * Provides a premium layout for team management overview metrics.
 */
export function OverviewTab({ teamData, onInviteMember, onBuyCredits, onExportReport, onNavigateToTab }: OverviewTabProps) {
    const [selectedPeriod, setSelectedPeriod] = useState('this-month');
    const [customDateRange, setCustomDateRange] = useState<{ start: Date; end: Date } | undefined>();
    const [isExporting, setIsExporting] = useState(false);
    const { openModal } = useModal();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const handle = requestAnimationFrame(() => setMounted(true));
        return () => cancelAnimationFrame(handle);
    }, []);

    const handlePeriodChange = (periodId: string) => {
        setSelectedPeriod(periodId);
        if (periodId === 'custom') {
            openModal('date_range_picker', {
                initialRange: customDateRange,
                onApply: (range: { start: Date; end: Date }) => {
                    setCustomDateRange(range);
                }
            });
        }
    };

    const handleExport = async () => {
        setIsExporting(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
        } finally {
            setIsExporting(false);
        }
    };

    if (!mounted) return null; // Or skeleton

    // Colors for usage metrics
    const USAGE_COLORS = [
        "stroke-purple-500",
        "stroke-green-500",
        "stroke-blue-500",
        "stroke-red-500"
    ];

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-1">
                <div className="flex flex-col gap-1">
                    <h1 className="text-2xl font-bold text-foreground">Team Overview</h1>
                    <p className="text-default-500">View your team's key metrics, usage snapshot, and recent activity.</p>
                </div>
                <UsageHeader
                    selectedPeriod={selectedPeriod}
                    onPeriodChange={handlePeriodChange}
                    customDateRange={customDateRange}
                    onCustomDateChange={setCustomDateRange}
                    onExport={handleExport}
                    isExporting={isExporting}
                    hidePeriodSelector={false}
                />
            </div>

            {/* Main Services Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-[300px]">
                <DigitalServicesCard data={teamData} onBuyCredits={onBuyCredits} />
                <PhysicalServicesCard onNavigate={onNavigateToTab} />
            </div>

            {/* Analytics & Actions Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Usage Snapshot (Span 2) */}
                <div className="lg:col-span-2 space-y-4">
                    <div className="flex justify-between items-center px-1">
                        <h3 className="text-lg font-semibold">Usage Snapshot</h3>
                        <Button size="sm" variant="ghost" className="text-secondary font-medium" onPress={() => onNavigateToTab('usage')}>View All</Button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {teamData.usageSnapshot
                            .filter(m => !m.label.includes("API") && !m.label.includes("Batch"))
                            .map((metric, index) => {
                                // Rename Logic
                                let label = metric.label;
                                if (label === "AI Image Credits") label = "AI Image Usage";
                                if (label === "AI Video Credits") label = "AI Video Usage";

                                // Custom Footer Logic
                                let customFooter = undefined;
                                if (label === "AI Image Usage") customFooter = "8,240 generated";
                                if (label === "AI Video Usage") customFooter = "156 generated";
                                if (label === "Storage") customFooter = "4.5 / 5 GB used";

                                return (
                                    <UsageBentoCard
                                        key={metric.id}
                                        metric={{ ...metric, label }}
                                        colorClass={USAGE_COLORS[index % USAGE_COLORS.length]}
                                        customFooter={customFooter}
                                    />
                                );
                            })}
                    </div>
                </div>

                {/* Quick Actions (Span 1) */}
                <div className="flex flex-col gap-4 h-full">
                    <h3 className="text-lg font-semibold px-1">Quick Actions</h3>
                    <Card className="flex-1 shadow-sm border-none bg-default-50">
                        <div className="p-4 grid grid-cols-2 gap-3 h-full items-center">
                            <Button variant="secondary" className="justify-start h-12 bg-background shadow-sm" onPress={onInviteMember}>
                                <Icon icon="gravity-ui:person-plus" className="size-5 mr-2 text-primary" />
                                Invite Member
                            </Button>
                            <Button variant="secondary" className="justify-start h-12 bg-background shadow-sm" onPress={onBuyCredits}>
                                <Icon icon="gravity-ui:thunderbolt" className="size-5 mr-2 text-warning" />
                                Buy Credits
                            </Button>
                            <Button variant="secondary" className="justify-start h-12 bg-background shadow-sm" onPress={onExportReport}>
                                <Icon icon="gravity-ui:file-arrow-down" className="size-5 mr-2 text-default-500" />
                                Export Report
                            </Button>
                            <Button variant="secondary" className="justify-start h-12 bg-background shadow-sm" onPress={() => onNavigateToTab('settings')}>
                                <Icon icon="gravity-ui:gear" className="size-5 mr-2 text-default-500" />
                                Team Settings
                            </Button>
                        </div>
                    </Card>
                </div>
            </div>

            {/* Activity Row: Split into Pulse and List */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Activity Pulse (Span 1) */}
                <ActivityPulseCard />

                {/* Recent Activity List (Span 2) */}
                <Card className="lg:col-span-2 shadow-sm border-none bg-content1">
                    <div className="p-4 border-b border-default-100 flex justify-between items-center">
                        <h4 className="font-bold text-large">Recent Activity</h4>
                        <Button size="sm" variant="ghost" onPress={() => onNavigateToTab('activity')}>View All</Button>
                    </div>
                    <div className="p-4">
                        <ul className="space-y-4">
                            {MOCK_RECENT_ACTIVITY.map((activity) => (
                                <li key={activity.id} className="flex items-start gap-3">
                                    {activity.user ? (
                                        <Avatar size="sm" className="rounded-full">
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
                                            <span className="font-semibold">{activity.user?.name || 'System'}</span>
                                            {' '}{activity.action}
                                        </p>
                                        <p className="text-xs text-default-500">{activity.timestamp}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </Card>
            </div>
        </div>
    );
}
