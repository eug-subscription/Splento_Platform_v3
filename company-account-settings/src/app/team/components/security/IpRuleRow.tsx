import { Button, Chip, Tooltip } from "@heroui/react";
import { Icon } from "@iconify/react";
import type { IpRule } from "@/types/security";
import { formatRelativeTime } from "@/utils/date-utils";

interface IpRuleRowProps {
    rule: IpRule;
    onEdit: (rule: IpRule) => void;
    onDelete: (rule: IpRule) => void;
    onToggle: (rule: IpRule) => void;
}

export function IpRuleRow({ rule, onEdit, onDelete, onToggle }: IpRuleRowProps) {
    const { label, value, type, isActive, createdAt, createdBy } = rule;

    return (
        <div className="flex items-center justify-between p-4 rounded-2xl border border-separator bg-surface/50 hover:bg-surface transition-colors">
            <div className="flex items-center gap-4">
                {/* Rule Icon */}
                <div className={`flex items-center justify-center w-10 h-10 rounded-full ${isActive ? 'bg-success/10 text-success' : 'bg-default/10 text-default-400'}`}>
                    <Icon
                        icon={type === 'range' ? 'gravity-ui:layers-three' : 'gravity-ui:shield-check'}
                        className="w-5 h-5"
                    />
                </div>

                {/* Rule Info */}
                <div className="flex flex-col gap-0.5">
                    <div className="flex items-center gap-2">
                        <span className={`font-semibold ${isActive ? 'text-foreground' : 'text-default-400'}`}>
                            {label}
                        </span>
                        <Chip
                            size="sm"
                            variant="soft"
                            className={`h-5 px-2 text-[10px] font-bold uppercase tracking-wider ${type === 'range' ? 'bg-accent/10 text-accent' : 'bg-info/10 text-info'}`}
                        >
                            {type === 'range' ? 'IP Range' : 'Single IP'}
                        </Chip>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-default-500">
                        <code className={`px-1.5 py-0.5 rounded bg-default-100 font-mono text-[11px] ${isActive ? 'text-foreground' : 'text-default-400'}`}>
                            {value}
                        </code>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                            Added {formatRelativeTime(createdAt)} by {createdBy}
                        </span>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-2">
                {/* Actions */}
                <Tooltip delay={0}>
                    <Tooltip.Trigger>
                        <Button
                            isIconOnly
                            variant="tertiary"
                            size="sm"
                            onPress={() => onToggle(rule)}
                            aria-label={isActive ? "Deactivate Rule" : "Activate Rule"}
                            className="rounded-xl"
                        >
                            <Icon
                                icon={isActive ? "gravity-ui:circle-pause" : "gravity-ui:circle-play"}
                                className={`w-5 h-5 ${isActive ? 'text-warning' : 'text-success'}`}
                            />
                        </Button>
                    </Tooltip.Trigger>
                    <Tooltip.Content>
                        <p>{isActive ? 'Deactivate' : 'Activate'}</p>
                    </Tooltip.Content>
                </Tooltip>

                <Tooltip delay={0}>
                    <Tooltip.Trigger>
                        <Button
                            isIconOnly
                            variant="tertiary"
                            size="sm"
                            onPress={() => onEdit(rule)}
                            aria-label="Edit Rule"
                            className="rounded-xl"
                        >
                            <Icon icon="gravity-ui:pencil" className="w-5 h-5 text-default-500" />
                        </Button>
                    </Tooltip.Trigger>
                    <Tooltip.Content>
                        <p>Edit Rule</p>
                    </Tooltip.Content>
                </Tooltip>

                <Tooltip delay={0}>
                    <Tooltip.Trigger>
                        <Button
                            isIconOnly
                            variant="tertiary"
                            size="sm"
                            onPress={() => onDelete(rule)}
                            aria-label="Delete Rule"
                            className="rounded-xl hover:bg-danger/10 group"
                        >
                            <Icon icon="gravity-ui:trash-bin" className="w-5 h-5 text-default-400 group-hover:text-danger transition-colors" />
                        </Button>
                    </Tooltip.Trigger>
                    <Tooltip.Content>
                        <p>Delete Rule</p>
                    </Tooltip.Content>
                </Tooltip>
            </div>
        </div>
    );
}
