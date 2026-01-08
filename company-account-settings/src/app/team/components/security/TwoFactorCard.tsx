import { Card, Switch, Select, ListBox, Button, Chip } from "@heroui/react";
import type { TwoFactorSettings } from "@/types/security";

interface TwoFactorCardProps {
    state: TwoFactorSettings;
    onToggleEnforcement: (enabled: boolean) => void;
    onUpdateGracePeriod: (hours: number) => void;
}

export function TwoFactorCard({ state, onToggleEnforcement, onUpdateGracePeriod }: TwoFactorCardProps) {
    return (
        <Card className="overflow-visible rounded-3xl" variant="default">
            <Card.Content className="p-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold text-foreground">Two-Factor Authentication (2FA)</h3>
                            <Chip
                                size="sm"
                                variant="soft"
                                color={state.enforced ? "success" : "default"}
                            >
                                {state.enforced ? 'Enforced' : 'Optional'}
                            </Chip>
                        </div>
                        <p className="text-sm text-default-500 max-w-2xl leading-relaxed">
                            Adding an extra layer of security to your team members' accounts.
                            Once enforced, members will be required to set up 2FA to access the team.
                        </p>
                    </div>

                    <div className="flex items-center gap-4 bg-default/10 p-4 rounded-3xl border border-default-200">
                        <div className="flex flex-col gap-0.5">
                            <span className="text-sm font-medium">Enforce 2FA</span>
                            <span className="text-[10px] text-default-400 font-medium uppercase tracking-wider">All members</span>
                        </div>
                        <Switch
                            isSelected={state.enforced}
                            onChange={onToggleEnforcement}
                            aria-label="Enforce 2FA"
                        >
                            <Switch.Control>
                                <Switch.Thumb />
                            </Switch.Control>
                        </Switch>
                    </div>
                </div>

                {state.enforced && (
                    <div className="mt-8 pt-6 border-t border-default-100 grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in slide-in-from-top-2">
                        <div className="space-y-4">
                            <div className="flex flex-col gap-1">
                                <span className="text-sm font-medium">Grace Period</span>
                                <span className="text-xs text-default-500">How long members have to set up 2FA before being locked out.</span>
                            </div>

                            <Select
                                selectedKey={state.gracePeriodHours.toString()}
                                onSelectionChange={(key) => onUpdateGracePeriod(Number(key))}
                                className="max-w-[240px]"
                                aria-label="Select grace period"
                            >
                                <Select.Trigger>
                                    <Select.Value />
                                    <Select.Indicator />
                                </Select.Trigger>
                                <Select.Popover>
                                    <ListBox>
                                        <ListBox.Item id="0" textValue="Immediate">Immediate</ListBox.Item>
                                        <ListBox.Item id="24" textValue="24 Hours (1 Day)">24 Hours (1 Day)</ListBox.Item>
                                        <ListBox.Item id="72" textValue="72 Hours (3 Days)">72 Hours (3 Days)</ListBox.Item>
                                        <ListBox.Item id="168" textValue="168 Hours (7 Days)">168 Hours (7 Days)</ListBox.Item>
                                    </ListBox>
                                </Select.Popover>
                            </Select>
                        </div>

                        <div className="space-y-4">
                            <div className="flex flex-col gap-1">
                                <span className="text-sm font-medium">Authentication Methods</span>
                                <span className="text-xs text-default-500">Configure which secondary factors are allowed.</span>
                            </div>
                            <div className="flex gap-2">
                                <Button variant="secondary" size="sm">
                                    Authenticator App
                                </Button>
                                <Button variant="secondary" size="sm" isDisabled>
                                    SMS (Enterprise Only)
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
            </Card.Content>
        </Card>
    );
}
