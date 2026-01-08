import { Card } from '@heroui/react';
import { Icon } from '@iconify/react';

export function PermissionsEmptyState() {
    return (
        <Card className="border-default-100 border-dashed border-2 bg-default-50/20 shadow-none py-16 px-4">
            <Card.Content className="flex flex-col items-center justify-center text-center gap-4">
                <div className="w-16 h-16 rounded-full bg-default-100 flex items-center justify-center text-default-400 mb-2">
                    <Icon icon="gravity-ui:persons" className="text-3xl" />
                </div>

                <div className="max-w-sm">
                    <h3 className="text-lg font-bold mb-1">No Member Selected</h3>
                    <p className="text-sm text-muted-foreground">
                        Please select a team member from the dropdown above to view and manage their feature permissions.
                    </p>
                </div>

                <div className="flex items-center gap-2 text-xs text-muted-foreground mt-4 italic">
                    <Icon icon="gravity-ui:info-circle" />
                    <span>Only active team members can have custom permissions</span>
                </div>
            </Card.Content>
        </Card>
    );
}
