import { Card, Button, Switch, Alert, Chip } from "@heroui/react";
import { Icon } from "@iconify/react";
import type { IpAllowlistSettings, IpRule } from "@/types/security";
import { IpRuleRow } from "@/components/team/security/IpRuleRow";

interface IpAllowlistCardProps {
    settings: IpAllowlistSettings;
    onToggleEnabled: (enabled: boolean) => void;
    onAddRule: () => void;
    onEditRule: (rule: IpRule) => void;
    onDeleteRule: (rule: IpRule) => void;
    onToggleRule: (rule: IpRule) => void;
}

export function IpAllowlistCard({
    settings,
    onToggleEnabled,
    onAddRule,
    onEditRule,
    onDeleteRule,
    onToggleRule
}: IpAllowlistCardProps) {
    const { enabled, rules, currentUserIp } = settings;
    const activeRulesCount = rules.filter(r => r.isActive).length;

    return (
        <Card className="overflow-visible rounded-3xl" variant="default">
            <Card.Content className="p-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold text-foreground">IP Allowlisting</h3>
                            {enabled && (
                                <Chip
                                    size="sm"
                                    variant="soft"
                                    color="success"
                                    className="h-5 px-2 text-[10px] font-bold uppercase tracking-wider"
                                >
                                    Active
                                </Chip>
                            )}
                        </div>
                        <p className="text-sm text-default-500 max-w-2xl leading-relaxed">
                            Restrict access to your team's workspace to specific IP addresses or ranges.
                            When enabled, login attempts from unauthorized IPs will be blocked.
                        </p>
                    </div>

                    <div className="flex flex-col items-end gap-3">
                        <Switch
                            isSelected={enabled}
                            onChange={(isSelected) => onToggleEnabled(isSelected)}
                            aria-label="Toggle IP Allowlist"
                        >
                            <Switch.Control>
                                <Switch.Thumb />
                            </Switch.Control>
                            <span className="text-sm font-medium ml-2">
                                {enabled ? 'Enabled' : 'Disabled'}
                            </span>
                        </Switch>
                    </div>
                </div>

                {enabled && (
                    <Alert status="warning" className="mb-6 rounded-2xl border-warning/10">
                        <Alert.Indicator>
                            <Icon icon="gravity-ui:triangle-exclamation" className="w-4 h-4" />
                        </Alert.Indicator>
                        <Alert.Content>
                            <Alert.Title className="text-xs font-bold">Important Security Note</Alert.Title>
                            <Alert.Description className="text-xs">
                                Ensure your current IP is in the allowlist before enabling this feature to avoid losing access.
                            </Alert.Description>
                        </Alert.Content>
                    </Alert>
                )}

                <div className="flex justify-between items-center mb-4 px-1">
                    <div className="flex items-center gap-2 text-xs font-medium text-default-500 uppercase tracking-wider">
                        <Icon icon="gravity-ui:list-ul" className="w-4 h-4" />
                        Allowlist Rules ({activeRulesCount}/{rules.length})
                    </div>
                    <Button
                        variant="tertiary"
                        size="sm"
                        onPress={onAddRule}
                        className="rounded-full text-accent font-semibold"
                    >
                        <Icon icon="gravity-ui:plus" className="w-4 h-4 mr-1" />
                        Add New Rule
                    </Button>
                </div>

                <div className="space-y-3">
                    {rules.length === 0 ? (
                        <div className="p-12 border-2 border-dashed border-separator rounded-2xl flex flex-col items-center justify-center text-center">
                            <Icon icon="gravity-ui:shield-slash" className="text-4xl text-default-200 mb-4" />
                            <h4 className="text-sm font-semibold text-default-600 mb-1">No IP Rules Defined</h4>
                            <p className="text-xs text-default-400 max-w-xs">
                                Add your first IP address or CIDR range to start securing your team access.
                            </p>
                        </div>
                    ) : (
                        rules.map((rule) => (
                            <IpRuleRow
                                key={rule.id}
                                rule={rule}
                                onEdit={onEditRule}
                                onDelete={onDeleteRule}
                                onToggle={onToggleRule}
                            />
                        ))
                    )}
                </div>

                <div className="mt-10 pt-8 border-t border-separator">
                    <div className="flex items-center justify-between p-4 rounded-2xl bg-default-50 border border-default-200">
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-full bg-accent/10 text-accent">
                                <Icon icon="gravity-ui:pulse" className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="text-xs font-semibold text-foreground uppercase tracking-wider mb-0.5">Your Current IP</p>
                                <code className="text-sm font-mono text-default-900 font-bold">{currentUserIp}</code>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-[10px] text-default-400 uppercase font-medium mb-1">Status</p>
                            <Chip
                                size="sm"
                                variant="soft"
                                color={rules.some(r => r.value === currentUserIp && r.isActive) ? 'success' : 'warning'}
                                className="h-5 px-2 text-[10px] font-bold"
                            >
                                {rules.some(r => r.value === currentUserIp && r.isActive)
                                    ? 'In Allowlist'
                                    : 'Not in Allowlist'}
                            </Chip>
                        </div>
                    </div>
                </div>
            </Card.Content>
        </Card>
    );
}
