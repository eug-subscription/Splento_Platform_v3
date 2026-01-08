import { Card, Button, Label } from '@heroui/react';
import { Icon } from '@iconify/react';

interface AdvancedSettingsSectionProps {
    isAdmin: boolean;
    onTransferAdmin: () => void;
}

/**
 * AdvancedSettingsSection Component
 * 
 * @description Handles high-level administrative tasks like admin transfer.
 * Only visible/accessible to team admins.
 */
export function AdvancedSettingsSection({ isAdmin, onTransferAdmin }: AdvancedSettingsSectionProps) {
    if (!isAdmin) return null;

    return (
        <Card className="border-default-200">
            <Card.Header className="pb-3">
                <Card.Title className="text-base font-semibold">Advanced Administration</Card.Title>
                <Card.Description className="text-sm text-default-500">
                    Sensitive administrative controls for workspace management
                </Card.Description>
            </Card.Header>

            <Card.Content className="space-y-6">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 p-4 rounded-2xl bg-default-50/50 dark:bg-default-100/10 border border-default-100 dark:border-default-50/10 transition-all hover:bg-default-100/50">
                    <div className="space-y-1">
                        <Label className="text-sm font-bold text-foreground">Transfer Administrator Rights</Label>
                        <p className="text-xs text-muted-foreground max-w-md">
                            Assign another team member as the owner of this workspace.
                            You will remain in the team with your existing permissions minus administrative control.
                        </p>
                    </div>

                    <Button
                        variant="secondary"
                        size="sm"
                        onPress={onTransferAdmin}
                        className="font-bold gap-2 shrink-0"
                    >
                        <Icon icon="gravity-ui:person-arrow-left" className="size-4" />
                        Transfer Admin
                    </Button>
                </div>
            </Card.Content>
        </Card>
    );
}
