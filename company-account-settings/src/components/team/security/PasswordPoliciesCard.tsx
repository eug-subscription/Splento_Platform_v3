import { Card, Switch, Select, ListBox, Separator } from "@heroui/react";
import { Icon } from "@iconify/react";
import type { PasswordPolicy } from "@/types/security";

interface PasswordPoliciesCardProps {
    policy: PasswordPolicy;
    onUpdatePolicy: (updates: Partial<PasswordPolicy>) => void;
}

export function PasswordPoliciesCard({ policy, onUpdatePolicy }: PasswordPoliciesCardProps) {
    return (
        <Card variant="default" className="overflow-visible rounded-3xl">
            <Card.Content className="p-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold text-foreground">Password Policy</h3>
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-accent-soft text-accent border border-accent/10">
                                Global Setting
                            </span>
                        </div>
                        <p className="text-sm text-default-500 max-w-2xl leading-relaxed">
                            Define the security requirements for team member passwords.
                            Stricter policies help prevent credential-based attacks.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Complexity Requirements */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-2 pb-2 border-b border-default-100">
                            <Icon icon="gravity-ui:shield-check" className="text-accent w-4 h-4" />
                            <h4 className="text-sm font-bold uppercase tracking-wider text-foreground/70">Complexity</h4>
                        </div>

                        <div className="space-y-5">
                            <div className="flex justify-between items-center gap-4">
                                <div className="flex flex-col gap-0.5">
                                    <span className="text-sm font-medium">Minimum Length</span>
                                    <span className="text-xs text-default-400">At least this many characters</span>
                                </div>
                                <Select
                                    selectedKey={policy.minLength.toString()}
                                    onSelectionChange={(key) => onUpdatePolicy({ minLength: Number(key) as PasswordPolicy['minLength'] })}
                                    className="w-32"
                                    aria-label="Select minimum password length"
                                >
                                    <Select.Trigger>
                                        <Select.Value />
                                        <Select.Indicator />
                                    </Select.Trigger>
                                    <Select.Popover>
                                        <ListBox>
                                            <ListBox.Item id="8">8 chars</ListBox.Item>
                                            <ListBox.Item id="12">12 chars</ListBox.Item>
                                            <ListBox.Item id="16">16 chars</ListBox.Item>
                                        </ListBox>
                                    </Select.Popover>
                                </Select>
                            </div>

                            <Separator />

                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <div className="flex flex-col gap-0.5">
                                        <span className="text-sm font-medium">Require Uppercase</span>
                                        <span className="text-xs text-default-400">A-Z characters</span>
                                    </div>
                                    <Switch
                                        isSelected={policy.requireUppercase}
                                        onChange={(val) => onUpdatePolicy({ requireUppercase: val })}
                                        aria-label="Toggle uppercase requirement"
                                    >
                                        <Switch.Control><Switch.Thumb /></Switch.Control>
                                    </Switch>
                                </div>

                                <div className="flex justify-between items-center">
                                    <div className="flex flex-col gap-0.5">
                                        <span className="text-sm font-medium">Require Lowercase</span>
                                        <span className="text-xs text-default-400">a-z characters</span>
                                    </div>
                                    <Switch
                                        isSelected={policy.requireLowercase}
                                        onChange={(val) => onUpdatePolicy({ requireLowercase: val })}
                                        aria-label="Toggle lowercase requirement"
                                    >
                                        <Switch.Control><Switch.Thumb /></Switch.Control>
                                    </Switch>
                                </div>

                                <div className="flex justify-between items-center">
                                    <div className="flex flex-col gap-0.5">
                                        <span className="text-sm font-medium">Require Numbers</span>
                                        <span className="text-xs text-default-400">0-9 digits</span>
                                    </div>
                                    <Switch
                                        isSelected={policy.requireNumbers}
                                        onChange={(val) => onUpdatePolicy({ requireNumbers: val })}
                                        aria-label="Toggle numbers requirement"
                                    >
                                        <Switch.Control><Switch.Thumb /></Switch.Control>
                                    </Switch>
                                </div>

                                <div className="flex justify-between items-center">
                                    <div className="flex flex-col gap-0.5">
                                        <span className="text-sm font-medium">Require Symbols</span>
                                        <span className="text-xs text-default-400">Special chars (!@#$%^*)</span>
                                    </div>
                                    <Switch
                                        isSelected={policy.requireSymbols}
                                        onChange={(val) => onUpdatePolicy({ requireSymbols: val })}
                                        aria-label="Toggle symbols requirement"
                                    >
                                        <Switch.Control><Switch.Thumb /></Switch.Control>
                                    </Switch>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Expiration & Reuse */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-2 pb-2 border-b border-default-100">
                            <Icon icon="gravity-ui:clock" className="text-accent w-4 h-4" />
                            <h4 className="text-sm font-bold uppercase tracking-wider text-foreground/70">Expiration & Reuse</h4>
                        </div>

                        <div className="space-y-5">
                            <div className="flex justify-between items-center gap-4">
                                <div className="flex flex-col gap-0.5">
                                    <span className="text-sm font-medium">Password Expiration</span>
                                    <span className="text-xs text-default-400">Force password change every X days</span>
                                </div>
                                <Select
                                    selectedKey={policy.maxAgeDays.toString()}
                                    onSelectionChange={(key) => onUpdatePolicy({ maxAgeDays: Number(key) as PasswordPolicy['maxAgeDays'] })}
                                    className="w-40"
                                    aria-label="Select password expiration"
                                >
                                    <Select.Trigger>
                                        <Select.Value />
                                        <Select.Indicator />
                                    </Select.Trigger>
                                    <Select.Popover>
                                        <ListBox>
                                            <ListBox.Item id="0">Never expire</ListBox.Item>
                                            <ListBox.Item id="30">30 days</ListBox.Item>
                                            <ListBox.Item id="60">60 days</ListBox.Item>
                                            <ListBox.Item id="90">90 days</ListBox.Item>
                                            <ListBox.Item id="180">180 days</ListBox.Item>
                                        </ListBox>
                                    </Select.Popover>
                                </Select>
                            </div>

                            <Separator />

                            <div className="flex justify-between items-center gap-4">
                                <div className="flex flex-col gap-0.5">
                                    <span className="text-sm font-medium">Password History</span>
                                    <span className="text-xs text-default-400">Number of previous passwords remembered</span>
                                </div>
                                <Select
                                    selectedKey={policy.historyCount.toString()}
                                    onSelectionChange={(key) => onUpdatePolicy({ historyCount: Number(key) as PasswordPolicy['historyCount'] })}
                                    className="w-40"
                                    aria-label="Select password history count"
                                >
                                    <Select.Trigger>
                                        <Select.Value />
                                        <Select.Indicator />
                                    </Select.Trigger>
                                    <Select.Popover>
                                        <ListBox>
                                            <ListBox.Item id="0">Don't remember</ListBox.Item>
                                            <ListBox.Item id="3">Last 3 passwords</ListBox.Item>
                                            <ListBox.Item id="5">Last 5 passwords</ListBox.Item>
                                            <ListBox.Item id="10">Last 10 passwords</ListBox.Item>
                                        </ListBox>
                                    </Select.Popover>
                                </Select>
                            </div>
                        </div>

                        {/* Security Tip */}
                        <div className="mt-8 px-6 py-5 rounded-3xl bg-default-50/50 border border-default-100 flex gap-6 items-center">
                            <div className="w-1 h-12 rounded-full bg-accent shrink-0" />
                            <div className="space-y-1.5">
                                <h5 className="text-[11px] font-bold uppercase tracking-widest text-foreground">Security Best Practice</h5>
                                <p className="text-sm text-default-500 leading-relaxed max-w-xl">
                                    NIST currently recommends focusing on length (minimum 12+ characters) rather than frequent expiration to prevent weak patterns and password fatigue.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </Card.Content>
        </Card>
    );
}
