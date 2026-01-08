import { Card, Button, SearchField, Chip } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useState } from "react";
import type { LoginEvent } from "@/types/security";
import { LoginHistoryTable } from "@/app/team/components/security/LoginHistoryTable";
import { exportToCSV } from "@/utils/security";
import { AUDIT_RETENTION_DAYS } from "@/data/security-constants";

interface LoginHistoryCardProps {
    history: LoginEvent[];
}

export function LoginHistoryCard({ history }: LoginHistoryCardProps) {
    const [searchQuery, setSearchQuery] = useState("");

    const filteredHistory = history.filter(event =>
        event.memberName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.memberEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.ipAddress.includes(searchQuery) ||
        event.location.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (event.location.city && event.location.city.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    const handleExport = () => {
        // Prepare data for export
        const exportData = history.map(event => ({
            Timestamp: event.timestamp,
            Member: event.memberName,
            Email: event.memberEmail,
            Status: event.status,
            Reason: event.failureReason || 'N/A',
            Device: event.device,
            Browser: event.browser,
            IP: event.ipAddress,
            City: event.location.city || 'N/A',
            Country: event.location.country
        }));
        exportToCSV(exportData, `login_history_${new Date().toISOString().split('T')[0]}`);
    };

    return (
        <Card variant="default" className="overflow-visible rounded-3xl">
            <Card.Content className="p-0">
                <div className="p-6 border-b border-default-100 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1.5">
                            <h3 className="text-lg font-semibold text-foreground leading-none">Login History</h3>
                            <Chip
                                size="sm"
                                variant="soft"
                                className="h-5 px-2 text-[10px] font-bold uppercase tracking-wider"
                            >
                                Last {AUDIT_RETENTION_DAYS} days
                            </Chip>
                        </div>
                        <p className="text-sm text-default-500 max-w-xl leading-relaxed">
                            Audit log of all authentication attempts. Monitor failed logins to detect potential brute-force or unauthorized access.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
                        <SearchField
                            value={searchQuery}
                            onChange={setSearchQuery}
                            onClear={() => setSearchQuery("")}
                            className="w-full sm:w-80"
                            aria-label="Search login history"
                        >
                            <SearchField.Group className="rounded-full bg-default-100/50 border-default-200 h-10 px-3">
                                <SearchField.SearchIcon className="text-default-400 w-4 h-4 mr-1" />
                                <SearchField.Input
                                    placeholder="Search name, email, IP or city..."
                                    className="text-sm"
                                />
                                <SearchField.ClearButton />
                            </SearchField.Group>
                        </SearchField>

                        <Button
                            variant="tertiary"
                            onPress={handleExport}
                            className="rounded-full px-5 h-10 font-medium whitespace-nowrap"
                        >
                            <Icon icon="gravity-ui:arrow-down-to-square" className="w-4 h-4 mr-2" />
                            Export CSV
                        </Button>
                    </div>
                </div>

                <div className="p-0">
                    {filteredHistory.length > 0 ? (
                        <div className="max-h-[600px] overflow-y-auto overflow-x-hidden">
                            <LoginHistoryTable history={filteredHistory} />
                        </div>
                    ) : (
                        <div className="py-24 flex flex-col items-center justify-center text-center">
                            <div className="p-5 rounded-full bg-default-50 text-default-200 mb-5">
                                <Icon icon="gravity-ui:circle-dotted" className="w-14 h-14" />
                            </div>
                            <h4 className="text-lg font-semibold text-foreground">No events matched</h4>
                            <p className="text-sm text-default-500 max-w-xs mt-2 mx-auto">
                                We couldn't find any login events matching "{searchQuery}".
                                Try clearing the search or using different keywords.
                            </p>
                            <Button
                                variant="tertiary"
                                size="sm"
                                onPress={() => setSearchQuery("")}
                                className="mt-4 rounded-full"
                            >
                                Clear search
                            </Button>
                        </div>
                    )}
                </div>

                {filteredHistory.length > 0 && (
                    <div className="p-4 border-t border-default-100 bg-default-50/20 flex justify-between items-center bg-surface-secondary/30">
                        <p className="text-[11px] text-default-400 font-medium uppercase tracking-wider">
                            Showing {filteredHistory.length} of {history.length} login events
                        </p>
                        <div className="flex items-center gap-1.5">
                            <Icon icon="gravity-ui:shield-check" className="text-success w-3.5 h-3.5" />
                            <span className="text-[11px] text-success font-medium uppercase tracking-wider">System log verified</span>
                        </div>
                    </div>
                )}
            </Card.Content>
        </Card>
    );
}
