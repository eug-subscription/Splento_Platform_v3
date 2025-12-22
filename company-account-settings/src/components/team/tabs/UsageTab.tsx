import { useState } from 'react';
import type { Member, UsageSummaryMetric, DetailedMetric, MemberUsage, UsageAlertsConfig } from '../../../types/team';
import { UsageHeader } from '../components/UsageHeader';
import { SummaryCards } from '../components/SummaryCards';
import { UsageAlertsSection } from '../components/UsageAlertsSection';
import { DetailedBreakdown } from '../components/DetailedBreakdown';
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

    // Mock data - replace with API calls in real implementation
    const summaryMetrics: UsageSummaryMetric[] = [
        { id: 'images', label: 'AI Image Credits', icon: 'gravity-ui:picture', used: 3253, total: 5000, trend: { value: 12, direction: 'up' } },
        { id: 'videos', label: 'AI Video Credits', icon: 'gravity-ui:video', used: 42, total: 100, trend: { value: 8, direction: 'up' } },
        { id: 'api', label: 'API Calls', icon: 'gravity-ui:plug-connection', used: 58420, total: 100000, trend: { value: 5, direction: 'down' } },
        { id: 'storage', label: 'Storage', icon: 'gravity-ui:database', used: 4.5, total: 5, unit: 'GB' },
    ];

    const detailedMetrics: DetailedMetric[] = [
        { id: 'images', label: 'AI Image Credits', icon: 'gravity-ui:picture', used: 3253, total: 5000 },
        { id: 'videos', label: 'AI Video Credits', icon: 'gravity-ui:video', used: 42, total: 100 },
        { id: 'api', label: 'API Calls', icon: 'gravity-ui:plug-connection', used: 58420, total: 100000 },
        { id: 'storage', label: 'Storage', icon: 'gravity-ui:database', used: 4.5, total: 5, unit: 'GB' },
        { id: 'batch', label: 'Batch Exports', icon: 'gravity-ui:layers-3-diagonal', used: 73, total: null },
        { id: 'photo-sessions', label: 'Photo Sessions', icon: 'gravity-ui:camera', used: 156, total: null },
        { id: 'video-sessions', label: 'Video Sessions', icon: 'gravity-ui:video', used: 23, total: null },
        { id: 'generated', label: 'Images Generated', icon: 'gravity-ui:picture', used: 8432, total: null },
        { id: 'menus', label: 'Menus Recognised', icon: 'gravity-ui:file-text', used: 1247, total: null },
    ];

    const memberUsage: MemberUsage[] = [
        { memberId: '1', name: 'Anna Kowalski', email: 'anna@wolt.com', avatar: 'https://i.pravatar.cc/150?u=anna', imageCredits: 1247, videoCredits: 18, apiCalls: 12400, storage: 1.2 },
        { memberId: '2', name: 'John Doe', email: 'john@wolt.com', avatar: 'https://i.pravatar.cc/150?u=john', imageCredits: 892, videoCredits: 12, apiCalls: 28900, storage: 1.8 },
        { memberId: '3', name: 'Maria Santos', email: 'maria@wolt.com', avatar: 'https://i.pravatar.cc/150?u=maria', imageCredits: 654, videoCredits: 8, apiCalls: 8200, storage: 0.8 },
        { memberId: '4', name: 'Mike Johnson', email: 'mike@wolt.com', avatar: 'https://i.pravatar.cc/150?u=mike', imageCredits: 460, videoCredits: 4, apiCalls: 8920, storage: 0.7 },
        { memberId: '5', name: 'David Kim', email: 'david@wolt.com', avatar: 'https://i.pravatar.cc/150?u=david', imageCredits: 15, videoCredits: 0, apiCalls: 120, storage: 0.1 },
    ];

    const memberTotals = {
        imageCredits: memberUsage.reduce((sum, m) => sum + m.imageCredits, 0),
        videoCredits: memberUsage.reduce((sum, m) => sum + m.videoCredits, 0),
        apiCalls: memberUsage.reduce((sum, m) => sum + m.apiCalls, 0),
        storage: memberUsage.reduce((sum, m) => sum + m.storage, 0),
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

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header with Period Selector */}
            <UsageHeader
                selectedPeriod={selectedPeriod}
                onPeriodChange={handlePeriodChange}
                customDateRange={customDateRange}
                onCustomDateChange={setCustomDateRange}
                onExport={handleExport}
                isExporting={isExporting}
            />

            {/* Summary Cards */}
            <SummaryCards metrics={summaryMetrics} />

            {/* Usage Alerts Configuration */}
            <UsageAlertsSection
                config={alertsConfig}
                onChange={setAlertsConfig}
                onSave={handleSaveAlerts}
                isSaving={isSavingAlerts}
            />

            {/* Detailed Breakdown */}
            <DetailedBreakdown metrics={detailedMetrics} />

            {/* Per-Member Usage */}
            <PerMemberUsage
                members={memberUsage}
                totals={memberTotals}
                onMemberClick={onNavigateToMember}
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
