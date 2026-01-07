import { Card, Button, Alert } from '@heroui/react';
import { Icon } from '@iconify/react';

interface DangerZoneSectionProps {
    isAdmin: boolean;
    onDeleteTeam: () => void;
}

/**
 * DangerZoneSection Component
 * 
 * @description Houses destructive actions like team deletion.
 * Uses a distinct visual style (red border, alert) to signal importance.
 */
export function DangerZoneSection({ isAdmin, onDeleteTeam }: DangerZoneSectionProps) {
    if (!isAdmin) return null;

    return (
        <Card className="border-danger/30 bg-danger/[0.01] dark:bg-danger/[0.02]">
            <Card.Header className="pb-3">
                <div className="flex items-center gap-2 text-danger mb-1">
                    <Icon icon="gravity-ui:triangle-exclamation" className="size-4" />
                    <Card.Title className="text-base font-semibold text-danger">Danger Zone</Card.Title>
                </div>
                <Card.Description className="text-sm text-danger/70">
                    Irreversible and destructive actions for this workspace
                </Card.Description>
            </Card.Header>

            <Card.Content className="space-y-6">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 p-4 rounded-2xl border border-danger/10 bg-white/50 dark:bg-black/10">
                    <div className="space-y-1">
                        <h5 className="text-sm font-bold text-foreground">Delete this workspace</h5>
                        <p className="text-xs text-muted-foreground max-w-md">
                            Once deleted, all data, assets, and history associated with this team will be permanently removed.
                            This action cannot be undone.
                        </p>
                    </div>

                    <Button
                        variant="danger"
                        size="sm"
                        onPress={onDeleteTeam}
                        className="font-bold gap-2 shrink-0"
                    >
                        <Icon icon="gravity-ui:trash-bin" className="size-4" />
                        Delete Workspace
                    </Button>
                </div>

                <Alert status="danger" className="rounded-xl">
                    <Alert.Indicator>
                        <Icon icon="gravity-ui:circle-info" />
                    </Alert.Indicator>
                    <Alert.Content>
                        <Alert.Title className="text-xs font-bold font-sans">Wait!</Alert.Title>
                        <Alert.Description className="text-[10px] leading-relaxed">
                            Deleting a workspace will immediately cancel any active subscriptions and revoke access for all team members.
                        </Alert.Description>
                    </Alert.Content>
                </Alert>
            </Card.Content>
        </Card>
    );
}
