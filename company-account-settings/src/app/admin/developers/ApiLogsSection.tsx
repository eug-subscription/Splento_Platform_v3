import { useState, useMemo } from 'react';
import { Button, Select, Label, ListBox, Spinner } from '@heroui/react';
import { Icon } from '@iconify/react';
import { useDevelopers } from '@/hooks/useDevelopers';
import { ApiLogRow } from '@/components/developers/ApiLogRow';
import { EmptyState } from '@/components/developers/EmptyState';
import { LOGS_PER_PAGE } from '@/data/developers-constants';
import type { HttpMethod, ApiLogStatus } from '@/types/developers';

const METHODS: HttpMethod[] = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'];
const STATUSES: { value: ApiLogStatus; label: string }[] = [
    { value: 'success', label: 'Success (2xx)' },
    { value: 'client_error', label: 'Client Error (4xx)' },
    { value: 'server_error', label: 'Server Error (5xx)' },
];

export function ApiLogsSection() {
    const {
        apiKeys,
        filteredLogs,
        isLoading,
        filters,
        setFilters
    } = useDevelopers();

    const [page, setPage] = useState(1);

    const paginatedLogs = useMemo(() => {
        const start = (page - 1) * LOGS_PER_PAGE;
        return filteredLogs.slice(start, start + LOGS_PER_PAGE);
    }, [filteredLogs, page]);

    const totalPages = Math.ceil(filteredLogs.length / LOGS_PER_PAGE);

    const handleClearFilters = () => {
        setFilters({
            apiKeyId: null,
            method: null,
            status: null,
            dateRange: null,
        });
        setPage(1);
    };

    const handleExport = () => {
        const headers = ['Timestamp', 'Method', 'Endpoint', 'Status', 'Duration'];
        const rows = filteredLogs.map(log => [
            log.timestamp.toISOString(),
            log.method,
            log.endpoint,
            log.statusCode,
            `${log.responseTime}ms`
        ]);

        const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", `api-logs-${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    if (isLoading && filteredLogs.length === 0) {
        return (
            <div className="flex justify-center p-12">
                <Spinner size="lg" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="bg-default-50/50 p-6 rounded-3xl border border-default-100 shadow-sm">
                <div className="flex flex-col lg:flex-row items-end gap-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 flex-1 w-full">
                        <Select
                            placeholder="All API Keys"
                            value={filters.apiKeyId || 'all-keys'}
                            onChange={(val) => {
                                setFilters({ ...filters, apiKeyId: val === 'all-keys' ? null : val as string });
                                setPage(1);
                            }}
                        >
                            <Label className="text-xs font-bold uppercase text-muted-foreground mb-1.5 ml-1">API Key</Label>
                            <Select.Trigger className="rounded-2xl border-default-200 h-11 flex items-center px-4">
                                <Select.Value className="text-sm" />
                                <Select.Indicator className="ml-auto" />
                            </Select.Trigger>
                            <Select.Popover>
                                <ListBox>
                                    <ListBox.Item id="all-keys" textValue="All Keys">All API Keys</ListBox.Item>
                                    {apiKeys.map(key => (
                                        <ListBox.Item key={key.id} id={key.id} textValue={key.name}>
                                            {key.name}
                                        </ListBox.Item>
                                    ))}
                                </ListBox>
                            </Select.Popover>
                        </Select>

                        <Select
                            placeholder="All Methods"
                            value={filters.method || 'all-methods'}
                            onChange={(val) => {
                                setFilters({ ...filters, method: val === 'all-methods' ? null : val as HttpMethod });
                                setPage(1);
                            }}
                        >
                            <Label className="text-xs font-bold uppercase text-muted-foreground mb-1.5 ml-1">Method</Label>
                            <Select.Trigger className="rounded-2xl border-default-200 h-11 flex items-center px-4">
                                <Select.Value className="text-sm" />
                                <Select.Indicator className="ml-auto" />
                            </Select.Trigger>
                            <Select.Popover>
                                <ListBox>
                                    <ListBox.Item id="all-methods" textValue="All Methods">All Methods</ListBox.Item>
                                    {METHODS.map(method => (
                                        <ListBox.Item key={method} id={method} textValue={method}>
                                            {method}
                                        </ListBox.Item>
                                    ))}
                                </ListBox>
                            </Select.Popover>
                        </Select>

                        <Select
                            placeholder="All Statuses"
                            value={filters.status || 'all-statuses'}
                            onChange={(val) => {
                                setFilters({ ...filters, status: val === 'all-statuses' ? null : val as ApiLogStatus });
                                setPage(1);
                            }}
                        >
                            <Label className="text-xs font-bold uppercase text-muted-foreground mb-1.5 ml-1">Status</Label>
                            <Select.Trigger className="rounded-2xl border-default-200 h-11 flex items-center px-4">
                                <Select.Value className="text-sm" />
                                <Select.Indicator className="ml-auto" />
                            </Select.Trigger>
                            <Select.Popover>
                                <ListBox>
                                    <ListBox.Item id="all-statuses" textValue="All Statuses">All Statuses</ListBox.Item>
                                    {STATUSES.map(status => (
                                        <ListBox.Item key={status.value} id={status.value} textValue={status.label}>
                                            {status.label}
                                        </ListBox.Item>
                                    ))}
                                </ListBox>
                            </Select.Popover>
                        </Select>
                    </div>

                    <div className="flex gap-2 w-full lg:w-auto">
                        <Button
                            variant="secondary"
                            isIconOnly
                            onPress={handleClearFilters}
                            className="h-11 w-11 rounded-2xl border-default-200"
                            aria-label="Clear filters"
                        >
                            <Icon icon="gravity-ui:trash-bin" className="size-5" />
                        </Button>
                        <Button
                            variant="primary"
                            onPress={handleExport}
                            className="h-11 px-6 rounded-2xl flex-1 lg:flex-none font-bold shadow-lg shadow-accent/10"
                        >
                            <Icon icon="gravity-ui:arrow-down-to-line" className="size-4 mr-2" />
                            Export CSV
                        </Button>
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <div className="flex justify-between items-center px-4">
                    <h4 className="text-sm font-bold text-muted-foreground uppercase tracking-widest">
                        Logs List
                    </h4>
                    <span className="text-xs text-muted-foreground">
                        Showing {Math.min(filteredLogs.length, (page - 1) * LOGS_PER_PAGE + 1)}-{Math.min(filteredLogs.length, page * LOGS_PER_PAGE)} of {filteredLogs.length}
                    </span>
                </div>

                {filteredLogs.length === 0 ? (
                    <EmptyState
                        icon="gravity-ui:magnifier-minus"
                        title="No logs found"
                        description="Try adjusting your filters to find the API requests you're looking for."
                        actionLabel="Reset all filters"
                        onAction={handleClearFilters}
                    />
                ) : (
                    <div className="grid grid-cols-1 gap-3">
                        {paginatedLogs.map((log) => (
                            <ApiLogRow key={log.id} log={log} />
                        ))}
                    </div>
                )}
            </div>

            {totalPages > 1 && (
                <div className="flex justify-center items-center gap-4 pt-4">
                    <Button
                        variant="secondary"
                        size="sm"
                        isDisabled={page === 1}
                        onPress={() => setPage(p => p - 1)}
                        className="rounded-full w-24 font-bold"
                    >
                        <Icon icon="gravity-ui:arrow-left" className="mr-2" />
                        Previous
                    </Button>
                    <span className="text-sm font-bold">
                        Page {page} of {totalPages}
                    </span>
                    <Button
                        variant="secondary"
                        size="sm"
                        isDisabled={page === totalPages}
                        onPress={() => setPage(p => p + 1)}
                        className="rounded-full w-24 font-bold"
                    >
                        Next
                        <Icon icon="gravity-ui:arrow-right" className="ml-2" />
                    </Button>
                </div>
            )}
        </div>
    );
}
