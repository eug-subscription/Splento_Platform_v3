import { Button, Card } from '@heroui/react';
import { Icon } from '@iconify/react';

interface EmptyStateProps {
    icon: string;
    title: string;
    description: string;
    actionLabel?: string;
    onAction?: () => void;
}

export function EmptyState({ icon, title, description, actionLabel, onAction }: EmptyStateProps) {
    return (
        <Card className="border-dashed border-2 border-default-200 bg-transparent shadow-none p-12">
            <div className="flex flex-col items-center justify-center text-center space-y-6">
                <div className="p-6 rounded-full bg-default-50 text-default-300">
                    <Icon icon={icon} className="size-16" />
                </div>
                <div className="max-w-md space-y-2">
                    <h3 className="text-xl font-bold">{title}</h3>
                    <p className="text-muted-foreground">{description}</p>
                </div>
                {actionLabel && onAction && (
                    <Button
                        variant="primary"
                        onPress={onAction}
                        className="rounded-full px-8 font-medium shadow-md shadow-accent/10 mt-2"
                    >
                        <Icon icon="gravity-ui:plus" className="size-4 mr-2" />
                        {actionLabel}
                    </Button>
                )}
            </div>
        </Card>
    );
}
