import { Card, NumberField, RadioGroup, Radio, Label } from '@heroui/react';
import { Icon } from '@iconify/react';
import type { TeamSettings, AssetOwnershipPolicy } from '@/types/settings';
import { ASSET_OWNERSHIP_POLICIES, SETTINGS_VALIDATION } from '@/data/settings-constants';

interface TeamPoliciesSectionProps {
    team: TeamSettings;
    onUpdateTeam: (updates: Partial<TeamSettings>) => Promise<void>;
}

export function TeamPoliciesSection({ team, onUpdateTeam }: TeamPoliciesSectionProps) {
    return (
        <Card>
            <Card.Header className="pb-3">
                <Card.Title className="text-base font-semibold">Team Policies</Card.Title>
                <Card.Description className="text-sm text-default-500">
                    Governance rules for invites and member lifecycle management
                </Card.Description>
            </Card.Header>

            <Card.Content className="space-y-10">
                {/* Invite Expiration */}
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 max-w-3xl">
                    <div className="space-y-1">
                        <Label className="text-sm font-bold text-foreground">Invite Expiration</Label>
                        <p className="text-xs text-muted-foreground max-w-md">
                            The number of days an invitation remains valid before expiring automatically.
                        </p>
                    </div>

                    <NumberField
                        className="w-full sm:w-auto"
                        aria-label="Invite expiration in days"
                        minValue={SETTINGS_VALIDATION.INVITE_EXPIRATION.MIN_DAYS}
                        maxValue={SETTINGS_VALIDATION.INVITE_EXPIRATION.MAX_DAYS}
                        value={team.inviteExpirationDays}
                        onChange={(val) => {
                            if (val !== undefined) {
                                onUpdateTeam({ inviteExpirationDays: val });
                            }
                        }}
                        formatOptions={{
                            style: 'unit',
                            unit: 'day',
                            unitDisplay: 'long'
                        }}
                    >
                        <NumberField.Group>
                            <NumberField.DecrementButton />
                            <NumberField.Input
                                className="w-[120px]"
                                placeholder="Enter days"
                            />
                            <NumberField.IncrementButton />
                        </NumberField.Group>
                    </NumberField>
                </div>

                <div className="h-px bg-separator/50" />

                {/* Asset Ownership Policy */}
                <div className="space-y-6">
                    <div className="space-y-1">
                        <Label className="text-sm font-bold text-foreground">Asset Ownership on Member Removal</Label>
                        <p className="text-xs text-muted-foreground">
                            Define what happens to photos, videos, and projects when a member is removed from the team.
                        </p>
                    </div>

                    <RadioGroup
                        aria-label="Asset ownership policy"
                        value={team.assetOwnershipPolicy}
                        onChange={(val) => onUpdateTeam({ assetOwnershipPolicy: val as AssetOwnershipPolicy })}
                        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                    >
                        {ASSET_OWNERSHIP_POLICIES.map((policy) => (
                            <Radio
                                key={policy.value}
                                value={policy.value}
                                className="group relative flex items-start gap-4 p-4 rounded-2xl border border-default-100 hover:border-accent/40 bg-default-50/50 dark:bg-default-100/10 transition-all data-[selected=true]:border-accent data-[selected=true]:bg-accent/[0.03] cursor-pointer"
                            >
                                <Radio.Control className="rounded-full flex-shrink-0 mt-0.5">
                                    <Radio.Indicator className="rounded-full bg-accent" />
                                </Radio.Control>
                                <Radio.Content className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <Icon
                                            icon={policy.icon}
                                            className={`size-4 ${team.assetOwnershipPolicy === policy.value ? 'text-accent' : 'text-muted-foreground'}`}
                                        />
                                        <Label className="text-sm font-bold text-foreground leading-none cursor-pointer">
                                            {policy.label}
                                        </Label>
                                        {policy.requiresConfirmation && (
                                            <span className="text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-danger/10 text-danger border border-danger/20">
                                                Destructive
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-[11px] leading-relaxed text-muted-foreground">
                                        {policy.description}
                                    </p>
                                </Radio.Content>
                            </Radio>
                        ))}
                    </RadioGroup>
                </div>
            </Card.Content>
        </Card>
    );
}
