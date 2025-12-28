import { Button, Card, Chip, Tooltip } from '@heroui/react';
import { Icon } from '@iconify/react';
import type { ApiKey } from '@/types/developers';
import { useState } from 'react';
import { getRelativeTime } from '@/utils/formatTime';

interface ApiKeyRowProps {
    apiKey: ApiKey;
    onRevoke: () => void;
}

export function ApiKeyRow({ apiKey, onRevoke }: ApiKeyRowProps) {
    const [isCopied, setIsCopied] = useState(false);

    const handleCopyPrefix = () => {
        navigator.clipboard.writeText(apiKey.prefix);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    };

    const formattedDate = new Intl.DateTimeFormat('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    }).format(apiKey.createdAt);

    const lastUsedText = apiKey.lastUsedAt
        ? `Last used ${getRelativeTime(apiKey.lastUsedAt)}`
        : 'Never used';

    return (
        <Card className="hover:border-accent/40 transition-colors duration-200 border border-transparent shadow-sm bg-surface p-4 md:p-6 rounded-2xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                    <div className="p-3 rounded-full bg-accent-soft text-accent shrink-0">
                        <Icon icon="gravity-ui:key" className="size-6" />
                    </div>
                    <div className="space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                            <h4 className="text-lg font-bold">{apiKey.name}</h4>
                            <Chip
                                size="sm"
                                variant="secondary"
                                className="bg-default-100 text-default-600 font-medium text-[10px] uppercase tracking-wider rounded-md h-5"
                            >
                                {apiKey.permission.replace('-', ' ')}
                            </Chip>
                            {!apiKey.isActive && (
                                <Chip size="sm" color="danger" variant="soft" className="h-5 rounded-md text-[10px] uppercase">
                                    Inactive
                                </Chip>
                            )}
                        </div>
                        <div className="flex items-center gap-2 group">
                            <code className="text-sm font-mono text-muted-foreground bg-default-50 px-2 py-0.5 rounded border border-default-100">
                                {apiKey.prefix}••••••••{apiKey.suffix}
                            </code>
                            <Tooltip>
                                <Tooltip.Trigger>
                                    <Button
                                        isIconOnly
                                        size="sm"
                                        variant="ghost"
                                        onPress={handleCopyPrefix}
                                        className="size-7 rounded-md text-muted-foreground hover:text-accent"
                                        aria-label="Copy prefix"
                                    >
                                        <Icon icon={isCopied ? "gravity-ui:check" : "gravity-ui:copy"} className="size-4" />
                                        <span className="sr-only" aria-live="polite">
                                            {isCopied ? 'Copied prefix to clipboard' : ''}
                                        </span>
                                    </Button>
                                </Tooltip.Trigger>
                                <Tooltip.Content>{isCopied ? 'Copied prefix!' : 'Copy prefix for identification'}</Tooltip.Content>
                            </Tooltip>
                        </div>
                        <p className="text-xs text-muted-foreground flex items-center gap-3">
                            <span>Created {formattedDate}</span>
                            <span className="w-1 h-1 rounded-full bg-default-300" />
                            <span className={apiKey.lastUsedAt ? 'text-foreground' : 'text-danger-soft-foreground animate-pulse font-medium'}>
                                {lastUsedText}
                            </span>
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-3 self-end md:self-center">
                    <div className="text-right mr-4 hidden sm:block">
                        <div className="text-sm font-bold">{apiKey.usageCount.toLocaleString()}</div>
                        <div className="text-[10px] text-muted-foreground uppercase tracking-tight">Requests</div>
                    </div>
                    <Button
                        variant="tertiary"
                        onPress={onRevoke}
                        className="text-danger hover:bg-danger-soft transition-colors min-w-[100px] rounded-full font-medium"
                    >
                        Revoke
                    </Button>
                </div>
            </div>
        </Card>
    );
}


