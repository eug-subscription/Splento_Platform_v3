import { useState } from 'react';
import { Button, Card, Chip } from '@heroui/react';
import { Icon } from '@iconify/react';
import type { ApiLog } from '@/types/developers';
import { getRelativeTime } from '@/utils/formatTime';

import { API_BASE_URL } from '@/data/developers-constants';

interface ApiLogRowProps {
    log: ApiLog;
}

export function ApiLogRow({ log }: ApiLogRowProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isCopied, setIsCopied] = useState(false);

    const getMethodColor = (method: string) => {
        switch (method.toUpperCase()) {
            case 'GET': return 'accent';
            case 'POST': return 'success';
            case 'PUT':
            case 'PATCH': return 'warning';
            case 'DELETE': return 'danger';
            default: return 'default';
        }
    };

    const getStatusColor = (code: number) => {
        if (code >= 200 && code < 300) return 'success';
        if (code >= 400 && code < 500) return 'warning';
        if (code >= 500) return 'danger';
        return 'default';
    };

    const handleCopyCurl = () => {
        const curl = `curl -X ${log.method} '${API_BASE_URL}${log.endpoint}' \\
  -H 'Authorization: Bearer YOUR_API_KEY' \\
  -H 'Content-Type: application/json'`;

        navigator.clipboard.writeText(curl);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    };

    return (
        <Card className={`overflow-hidden transition-all duration-300 border border-transparent ${isExpanded ? 'border-accent/20 shadow-md ring-1 ring-accent/5' : 'hover:border-default-200 shadow-sm'}`}>
            <div
                className="p-4 cursor-pointer flex items-center justify-between gap-4 select-none hover:bg-default-50/50 transition-colors"
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <div className="flex items-center gap-4 flex-1 min-w-0">
                    <Chip
                        size="sm"
                        color={getMethodColor(log.method)}
                        variant="soft"
                        className="font-bold min-w-[60px] flex justify-center"
                    >
                        {log.method}
                    </Chip>

                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                            <span className="font-mono text-sm font-medium text-foreground truncate">
                                {log.endpoint}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-6 shrink-0">
                    <div className="hidden md:flex flex-col items-end gap-1">
                        <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-tighter">Response Time</span>
                        <span className="text-xs font-mono font-bold text-foreground">{log.responseTime}ms</span>
                    </div>

                    <Chip
                        size="sm"
                        variant="soft"
                        color={getStatusColor(log.statusCode)}
                        className="font-bold min-w-[50px] flex justify-center h-6 rounded-md"
                    >
                        {log.statusCode}
                    </Chip>

                    <div className="hidden sm:flex flex-col items-end gap-1">
                        <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-tighter">Time</span>
                        <span className="text-xs text-muted-foreground whitespace-nowrap">
                            {getRelativeTime(log.timestamp)}
                        </span>
                    </div>

                    <Icon
                        icon="gravity-ui:chevron-down"
                        className={`size-4 text-muted-foreground transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                    />
                </div>
            </div>

            {isExpanded && (
                <div className="px-4 pb-6 pt-2 border-t border-divider bg-default-50/30 animate-in slide-in-from-top-2 duration-300">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                        <div className="space-y-4">
                            <h5 className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground mb-4">Request Details</h5>

                            <div className="grid grid-cols-2 gap-y-3">
                                <div className="space-y-1">
                                    <span className="text-[10px] text-muted-foreground font-bold uppercase block tracking-tighter">API Key</span>
                                    <span className="text-sm font-medium">{log.apiKeyName}</span>
                                </div>
                                <div className="space-y-1 text-right md:text-left">
                                    <span className="text-[10px] text-muted-foreground font-bold uppercase block tracking-tighter">IP Address</span>
                                    <span className="text-sm font-mono">{log.ipAddress}</span>
                                </div>
                                <div className="space-y-1">
                                    <span className="text-[10px] text-muted-foreground font-bold uppercase block tracking-tighter">Size</span>
                                    <span className="text-sm font-mono">{log.requestSize}B in / {log.responseSize}B out</span>
                                </div>
                                <div className="space-y-1 text-right md:text-left">
                                    <span className="text-[10px] text-muted-foreground font-bold uppercase block tracking-tighter">User Agent</span>
                                    <span className="text-sm truncate block" title={log.userAgent}>{log.userAgent}</span>
                                </div>
                            </div>

                            {log.errorMessage && (
                                <div className="p-3 bg-danger-soft/30 border border-danger-soft rounded-xl text-danger mt-4">
                                    <div className="flex gap-2 items-start">
                                        <Icon icon="gravity-ui:circle-exclamation-fill" className="size-4 mt-0.5" />
                                        <p className="text-sm font-medium">{log.errorMessage}</p>
                                    </div>
                                </div>
                            )}

                            <div className="pt-4">
                                <Button
                                    size="sm"
                                    variant="secondary"
                                    onPress={handleCopyCurl}
                                    className="rounded-full font-bold h-9 bg-default-100 hover:bg-default-200 transition-colors"
                                >
                                    <Icon icon={isCopied ? "gravity-ui:check" : "gravity-ui:copy"} className="size-4 mr-2" />
                                    {isCopied ? 'Copied URL' : 'Copy cURL'}
                                    <span className="sr-only" aria-live="polite">
                                        {isCopied ? 'cURL command copied to clipboard' : ''}
                                    </span>
                                </Button>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h5 className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground mb-4">Payloads</h5>

                            {log.requestBody && (
                                <div className="space-y-2">
                                    <span className="text-[10px] text-muted-foreground font-bold uppercase block tracking-tighter">Request Body</span>
                                    <div className="bg-zinc-950 dark:bg-black rounded-xl p-4 font-mono text-xs overflow-x-auto text-success leading-relaxed shadow-inner">
                                        <pre>{JSON.stringify(log.requestBody, null, 2)}</pre>
                                    </div>
                                </div>
                            )}

                            {log.responseBody && (
                                <div className="space-y-2">
                                    <span className="text-[10px] text-muted-foreground font-bold uppercase block tracking-tighter">Response Body</span>
                                    <div className="bg-zinc-950 dark:bg-black rounded-xl p-4 font-mono text-xs overflow-x-auto text-info leading-relaxed shadow-inner">
                                        <pre>{JSON.stringify(log.responseBody, null, 2)}</pre>
                                    </div>
                                </div>
                            )}

                            {!log.requestBody && !log.responseBody && (
                                <div className="p-4 border border-dashed border-default-200 rounded-xl text-center">
                                    <span className="text-xs text-muted-foreground italic">No payload data available</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </Card>
    );
}
