import { useState } from "react";
import { Card, Checkbox, Input, Button, Chip } from "@heroui/react";
import { Icon } from "@iconify/react";
import type { UsageAlertsConfig } from "../../../types/team";

interface UsageAlertsSectionProps {
    config: UsageAlertsConfig;
    onChange: (config: UsageAlertsConfig) => void;
    onSave: () => Promise<void>;
    isSaving: boolean;
}

export function UsageAlertsSection({ config, onChange, onSave, isSaving }: UsageAlertsSectionProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [newRecipient, setNewRecipient] = useState('');
    const [hasChanges, setHasChanges] = useState(false);

    const handleThresholdChange = (key: keyof UsageAlertsConfig['thresholds'], value: boolean) => {
        onChange({
            ...config,
            thresholds: { ...config.thresholds, [key]: value },
        });
        setHasChanges(true);
    };

    const handleAddRecipient = () => {
        if (newRecipient && !config.recipients.includes(newRecipient)) {
            onChange({
                ...config,
                recipients: [...config.recipients, newRecipient],
            });
            setNewRecipient('');
            setHasChanges(true);
        }
    };

    const handleRemoveRecipient = (email: string) => {
        onChange({
            ...config,
            recipients: config.recipients.filter(r => r !== email),
        });
        setHasChanges(true);
    };

    const handleSave = async () => {
        await onSave();
        setHasChanges(false);
    };

    return (
        <Card className="mb-6">
            <button
                className="w-full flex items-center justify-between p-4"
                onClick={() => setIsExpanded(!isExpanded)}
                aria-expanded={isExpanded}
            >
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-warning/10">
                        <Icon icon="gravity-ui:bell" className="w-5 h-5 text-warning" />
                    </div>
                    <div className="text-left">
                        <p className="font-medium text-foreground">Usage Alerts</p>
                        <p className="text-sm text-default-500">
                            Get notified when usage reaches certain thresholds
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    {hasChanges && (
                        <Chip size="sm" variant="soft" className="bg-warning/10 text-warning">
                            Unsaved
                        </Chip>
                    )}
                    <Icon
                        icon={isExpanded ? "gravity-ui:chevron-up" : "gravity-ui:chevron-down"}
                        className="w-5 h-5 text-default-500"
                    />
                </div>
            </button>

            {isExpanded && (
                <div className="border-t border-default-200 p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h4 className="text-sm font-medium text-foreground mb-3">Credit Thresholds</h4>
                            <div className="space-y-3">
                                <Checkbox
                                    isSelected={config.thresholds.fifty}
                                    onChange={(checked) => handleThresholdChange('fifty', checked)}
                                >
                                    <Checkbox.Control>
                                        <Checkbox.Indicator />
                                    </Checkbox.Control>
                                    <Checkbox.Content>
                                        <span className="text-sm">Email when usage reaches 50% of monthly credits</span>
                                    </Checkbox.Content>
                                </Checkbox>
                                <Checkbox
                                    isSelected={config.thresholds.eighty}
                                    onChange={(checked) => handleThresholdChange('eighty', checked)}
                                >
                                    <Checkbox.Control>
                                        <Checkbox.Indicator />
                                    </Checkbox.Control>
                                    <Checkbox.Content>
                                        <span className="text-sm">Email when usage reaches 80% of monthly credits</span>
                                    </Checkbox.Content>
                                </Checkbox>
                                <Checkbox
                                    isSelected={config.thresholds.hundred}
                                    onChange={(checked) => handleThresholdChange('hundred', checked)}
                                >
                                    <Checkbox.Control>
                                        <Checkbox.Indicator />
                                    </Checkbox.Control>
                                    <Checkbox.Content>
                                        <span className="text-sm">Email when usage reaches 100% of monthly credits</span>
                                    </Checkbox.Content>
                                </Checkbox>
                            </div>

                            <div className="mt-6">
                                <h4 className="text-sm font-medium text-foreground mb-3">API Rate Limits</h4>
                                <Checkbox
                                    isSelected={config.apiRateLimitAlerts}
                                    onChange={(checked) => {
                                        onChange({ ...config, apiRateLimitAlerts: checked });
                                        setHasChanges(true);
                                    }}
                                >
                                    <span className="text-sm">Alert when approaching rate limits</span>
                                </Checkbox>
                            </div>
                        </div>

                        <div>
                            <h4 className="text-sm font-medium text-foreground mb-3">Alert Recipients</h4>
                            <div className="space-y-2 mb-3">
                                {config.recipients.map((email) => (
                                    <div
                                        key={email}
                                        className="flex items-center justify-between p-2 rounded-lg bg-default-100"
                                    >
                                        <div className="flex items-center gap-2">
                                            <Icon icon="gravity-ui:envelope" className="w-4 h-4 text-default-500" />
                                            <span className="text-sm text-foreground">{email}</span>
                                        </div>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            isIconOnly
                                            onPress={() => handleRemoveRecipient(email)}
                                            aria-label={`Remove ${email}`}
                                        >
                                            <Icon icon="gravity-ui:xmark" className="w-4 h-4" />
                                        </Button>
                                    </div>
                                ))}
                            </div>

                            <div className="flex gap-2">
                                <Input
                                    className="flex-1"
                                    aria-label="Add new recipient email"
                                    type="email"
                                    placeholder="Add email address..."
                                    value={newRecipient}
                                    onChange={(e) => setNewRecipient(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleAddRecipient()}
                                />
                                <Button
                                    variant="secondary"
                                    onPress={handleAddRecipient}
                                    isDisabled={!newRecipient}
                                >
                                    Add
                                </Button>
                            </div>
                        </div>
                    </div>

                    {hasChanges && (
                        <div className="flex justify-end mt-4 pt-4 border-t border-default-200">
                            <Button
                                variant="primary"
                                onPress={handleSave}
                                isPending={isSaving}
                            >
                                Save Alert Settings
                            </Button>
                        </div>
                    )}
                </div>
            )}
        </Card>
    );
}
