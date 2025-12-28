import { Card, Button, Chip, Switch } from '@heroui/react';
import { Icon } from '@iconify/react';
import type { Webhook } from '@/types/developers';
import { getRelativeTime } from '@/utils/formatTime';

interface WebhookCardProps {
    webhook: Webhook;
    onEdit: (webhook: Webhook) => void;
    onDelete: (id: string) => void;
    onToggleStatus: (id: string) => void;
}

export function WebhookCard({ webhook, onEdit, onDelete, onToggleStatus }: WebhookCardProps) {
    const statusConfig = {
        active: {
            color: 'success' as const,
            label: 'ACTIVE',
            icon: 'gravity-ui:circle-check-fill',
            bgClass: 'bg-success-soft',
            textClass: 'text-success'
        },
        paused: {
            color: 'warning' as const,
            label: 'PAUSED',
            icon: 'gravity-ui:pause-fill',
            bgClass: 'bg-warning-soft',
            textClass: 'text-warning'
        },
        failed: {
            color: 'danger' as const,
            label: 'FAILED',
            icon: 'gravity-ui:circle-exclamation-fill',
            bgClass: 'bg-danger-soft',
            textClass: 'text-danger'
        },
    };

    const config = statusConfig[webhook.status];

    const toggleStatus = () => {
        onToggleStatus(webhook.id);
    };

    return (
        <Card className="p-6 transition-all hover:border-accent/40 group">
            <div className="flex flex-col md:flex-row justify-between gap-6">
                <div className="space-y-4 flex-1">
                    <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-xl ${config.bgClass} ${config.textClass}`}>
                            <Icon icon={config.icon} className="size-5" aria-label={`Status: ${config.label}`} />
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <h4 className="font-bold text-lg text-foreground">{webhook.name}</h4>
                            </div>
                            <p className="text-sm font-mono text-muted-foreground mt-1 break-all select-all hover:text-accent transition-colors">
                                {webhook.url}
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-1.5 pl-11">
                        {webhook.events.map(event => (
                            <Chip key={event} variant="soft" size="sm" className="bg-default-100 text-default-600 font-medium text-xs">
                                {event}
                            </Chip>
                        ))}
                    </div>

                    <div className="flex items-center gap-4 text-xs font-medium text-muted-foreground pl-11">
                        <div className="flex items-center gap-1.5">
                            <Icon icon="gravity-ui:clock" />
                            {webhook.lastTriggeredAt ? (
                                <span>Last triggered {getRelativeTime(new Date(webhook.lastTriggeredAt))}</span>
                            ) : (
                                <span>Never triggered</span>
                            )}
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Icon icon="gravity-ui:chart-line" />
                            <span>Success rate: <span className={webhook.successRate > 95 ? 'text-success' : 'text-warning'}>{webhook.successRate}%</span></span>
                        </div>
                        {webhook.status === 'failed' && (
                            <div className="flex items-center gap-1.5 text-danger font-bold animate-pulse">
                                <Icon icon="gravity-ui:circle-exclamation" />
                                <span>{webhook.failureCount} consecutive failures</span>
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-start gap-4">
                    <div className="flex items-center gap-3">
                        <span className={`text-[10px] font-bold tracking-wider ${webhook.status === 'active' ? 'text-success' : 'text-warning'}`}>
                            {config.label}
                        </span>
                        <Switch
                            isSelected={webhook.status === 'active'}
                            onChange={toggleStatus}
                            size="sm"
                            aria-label="Toggle webhook status"
                        >
                            <Switch.Control>
                                <Switch.Thumb />
                            </Switch.Control>
                        </Switch>
                    </div>

                    <div className="flex items-center gap-2">
                        <Button
                            isIconOnly
                            variant="ghost"
                            size="sm"
                            onPress={() => onEdit(webhook)}
                            className="rounded-lg text-muted-foreground hover:text-accent hover:bg-accent-soft"
                        >
                            <Icon icon="gravity-ui:pencil" className="size-4" />
                        </Button>

                        <Button
                            isIconOnly
                            variant="ghost"
                            className="rounded-lg text-muted-foreground hover:text-danger hover:bg-danger-soft"
                            size="sm"
                            onPress={() => onDelete(webhook.id)}
                        >
                            <Icon icon="gravity-ui:trash-bin" className="size-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </Card>
    );
}
