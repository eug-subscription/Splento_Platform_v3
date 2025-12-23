import { useState, useMemo } from 'react';
import type { Member, MemberUsage, UsageAlertsConfig } from '../../../types/team';
import type { UsageSectionData, BillingSummaryData } from '../../../types/usage';
import { UsageHeader } from '../components/UsageHeader';
import { UsageDashboard } from '../usage/UsageDashboard';
import { UsageAlertsSection } from '../components/UsageAlertsSection';
import { PerMemberUsage } from '../components/PerMemberUsage';
import { DateRangePickerModal } from '../modals/DateRangePickerModal';

interface UsageTabProps {
    teamId: string;
    members: Member[];
    onNavigateToMember?: (memberId: string) => void;
}

export function UsageTab({ teamId: _teamId, members: _members, onNavigateToMember }: UsageTabProps) {
    const [selectedPeriod, setSelectedPeriod] = useState('this-month');
    const [customDateRange, setCustomDateRange] = useState<{ start: Date; end: Date } | undefined>();
    const [isExporting, setIsExporting] = useState(false);
    const [isSavingAlerts, setIsSavingAlerts] = useState(false);
    const [isDateRangeModalOpen, setIsDateRangeModalOpen] = useState(false);

    const [alertsConfig, setAlertsConfig] = useState<UsageAlertsConfig>({
        thresholds: { fifty: true, eighty: true, hundred: true },
        recipients: ['anna@wolt.com', 'billing@wolt.com'],
        apiRateLimitAlerts: false,
    });

    const handlePeriodChange = (periodId: string) => {
        setSelectedPeriod(periodId);
        if (periodId === 'custom') {
            setIsDateRangeModalOpen(true);
        }
    };

    // Calculate Credits Data (Mock)
    const creditsData: UsageSectionData = useMemo(() => {
        // In real app, fetch based on selectedPeriod
        const total = 20000;
        const used = 4615;
        const percent = (used / total) * 100;

        return {
            id: 'credits',
            title: 'AI Credits',
            used,
            total,
            unit: 'credits',
            percentUsed: percent,

            status: percent > 90 ? 'critical' : percent > 80 ? 'warning' : 'normal',
            features: [
                {
                    id: 'images',
                    label: 'Images',
                    color: 'bg-dataviz-1', // Cyan
                    count: 8240,
                    countUnit: 'generated',
                    value: 3389,
                    valueUnit: 'credits',
                    percentage: 73,
                    trend: 12
                },
                {
                    id: 'videos',
                    label: 'Videos',
                    color: 'bg-dataviz-2', // Electric Blue
                    count: 156,
                    countUnit: 'generated',
                    value: 780,
                    valueUnit: 'credits',
                    percentage: 17,
                    trend: -8
                },
                {
                    id: 'ocr',
                    label: 'Menu OCR',
                    color: 'bg-dataviz-6', // Lavender
                    count: 892,
                    countUnit: 'scans',
                    value: 446,
                    valueUnit: 'credits',
                    percentage: 10,
                    trend: -1
                },
                {
                    id: 'available',
                    label: 'Available Credits',
                    color: 'bg-grey-300',
                    count: 0,
                    countUnit: '',
                    value: 15385,
                    valueUnit: 'credits',
                    percentage: 77, // Remaining
                    trend: 0
                }
            ],
            actionButton: {
                label: 'Buy Credits',
                variant: 'ghost',
                onPress: () => { }
            }
        };
    }, [selectedPeriod]);

    // Calculate Storage Data (Mock)
    const storageData: UsageSectionData = useMemo(() => {
        const total = 5;
        const used = 4.5;
        const percent = (used / total) * 100;

        // Mock critical state for demo if needed, currently 90% is critical threshold
        // 4.5/5 = 90%. UsageStatus = 'critical'.

        return {
            id: 'storage',
            title: 'Storage',
            used,
            total,
            unit: 'GB',
            percentUsed: percent,
            status: percent >= 90 ? 'critical' : percent > 80 ? 'warning' : 'normal',
            features: [
                {
                    id: 'images',
                    label: 'Images',
                    color: 'bg-dataviz-1',
                    count: 1847,
                    countUnit: 'files',
                    value: 2.8,
                    valueUnit: 'GB',
                    percentage: 62
                },
                {
                    id: 'videos',
                    label: 'Videos',
                    color: 'bg-dataviz-2',
                    count: 42,
                    countUnit: 'files',
                    value: 1.3,
                    valueUnit: 'GB',
                    percentage: 28
                },
                {
                    id: 'other',
                    label: 'Other',
                    color: 'bg-grey-400',
                    count: 156,
                    countUnit: 'files',
                    value: 0.4,
                    valueUnit: 'GB',
                    percentage: 10,
                    trend: 0
                },
                {
                    id: 'free',
                    label: 'Free Storage',
                    color: 'bg-grey-300',
                    count: 0,
                    countUnit: '',
                    value: 0.5,
                    valueUnit: 'GB',
                    percentage: 10, // Remaining
                    trend: 0
                }
            ],
            actionButton: {
                label: 'Manage Storage',
                variant: 'ghost',
                onPress: () => { }
            }
        };
    }, []);

    // Calculate Pro Services Data (Mock)
    const proServicesData: any = useMemo(() => {
        return {
            period: selectedPeriod,
            totalSpend: 2450,
            sessionCount: 3,
            currency: 'EUR',
            services: [
                {
                    id: 'photo',
                    label: 'Photo Sessions',
                    count: 2,
                    spend: 1800,
                    deliverables: 623,
                    deliverableUnit: 'photos',
                    color: 'success'
                },
                {
                    id: 'video',
                    label: 'Video Sessions',
                    count: 1,
                    spend: 650,
                    deliverables: 12,
                    deliverableUnit: 'videos',
                    color: 'info'
                }
            ],
            upcoming: {
                count: 1,
                cost: 850,
                nextDate: '14 Jan'
            }
        };
    }, [selectedPeriod]);

    const memberUsage: MemberUsage[] = [
        { memberId: '1', name: 'Anna Kowalski', email: 'anna@wolt.com', avatar: 'https://i.pravatar.cc/150?u=anna', aiCredits: 1247, photoSessions: 18, videoSessions: 12 },
        { memberId: '2', name: 'John Doe', email: 'john@wolt.com', avatar: 'https://i.pravatar.cc/150?u=john', aiCredits: 892, photoSessions: 12, videoSessions: 4 },
        { memberId: '3', name: 'Maria Santos', email: 'maria@wolt.com', avatar: 'https://i.pravatar.cc/150?u=maria', aiCredits: 654, photoSessions: 8, videoSessions: 2 },
        { memberId: '4', name: 'Mike Johnson', email: 'mike@wolt.com', avatar: 'https://i.pravatar.cc/150?u=mike', aiCredits: 460, photoSessions: 4, videoSessions: 1 },
        { memberId: '5', name: 'David Kim', email: 'david@wolt.com', avatar: 'https://i.pravatar.cc/150?u=david', aiCredits: 15, photoSessions: 0, videoSessions: 0 },
    ];

    const memberTotals = {
        aiCredits: memberUsage.reduce((sum, m) => sum + m.aiCredits, 0),
        photoSessions: memberUsage.reduce((sum, m) => sum + m.photoSessions, 0),
        videoSessions: memberUsage.reduce((sum, m) => sum + m.videoSessions, 0),
    };

    const handleExport = async () => {
        setIsExporting(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            // Simulate download
        } finally {
            setIsExporting(false);
        }
    };

    const handleSaveAlerts = async () => {
        setIsSavingAlerts(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
        } finally {
            setIsSavingAlerts(false);
        }
    };

    // Calculate Billing Summary Data (Mock)
    const billingSummaryData: BillingSummaryData = useMemo(() => ({
        period: selectedPeriod,
        totalSpend: 5350,
        currency: 'EUR',
        trend: {
            value: 8,
            direction: 'up'
        },
        avgMonthly: 4920,
        categories: [
            {
                id: 'credits',
                label: 'AI Credits',
                amount: 2100,
                percentage: 39,
                color: 'bg-dataviz-1'
            },
            {
                id: 'storage',
                label: 'Storage',
                amount: 800,
                percentage: 15,
                color: 'bg-dataviz-2'
            },
            {
                id: 'pro-services',
                label: 'Pro Services',
                amount: 2450,
                percentage: 46,
                color: 'bg-success'
            }
        ]
    }), [selectedPeriod]);

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header (Export only now, period is inside dashboard) */}
            <UsageHeader
                selectedPeriod={selectedPeriod}
                onPeriodChange={handlePeriodChange} // Kept for mobile/generic fallback if needed
                customDateRange={customDateRange}
                onCustomDateChange={setCustomDateRange}
                onExport={handleExport}
                isExporting={isExporting}
                hidePeriodSelector={false}
            />

            {/* Main Dashboard */}
            <UsageDashboard
                creditsData={creditsData}
                storageData={storageData}
                proServicesData={proServicesData}
                billingSummaryData={billingSummaryData}

                manageStorage={() => { }}
            />

            {/* Per-Member Usage Table */}
            <PerMemberUsage
                members={memberUsage}
                totals={memberTotals}
                onMemberClick={onNavigateToMember}
            />

            {/* Usage Alerts Configuration */}
            {/* Moved below member usage to deprioritize settings */}
            <UsageAlertsSection
                config={alertsConfig}
                onChange={setAlertsConfig}
                onSave={handleSaveAlerts}
                isSaving={isSavingAlerts}
            />

            {/* Modals */}
            <DateRangePickerModal
                isOpen={isDateRangeModalOpen}
                onClose={() => setIsDateRangeModalOpen(false)}
                initialRange={customDateRange}
                onApply={(range) => {
                    setCustomDateRange(range);
                    setIsDateRangeModalOpen(false);
                }}
            />
        </div>
    );
}

