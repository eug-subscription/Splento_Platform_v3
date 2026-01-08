import { Button } from '@heroui/react';
import { Icon } from '@iconify/react';

interface PageHeaderProps {
    title: string;
    subtitle?: string;
    onCreateOrder?: () => void;
    children?: React.ReactNode;
}

export function PageHeader({ title, subtitle, onCreateOrder, children }: PageHeaderProps) {
    return (
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
                <h1 className="text-2xl font-medium text-foreground">{title}</h1>
                {subtitle && (
                    <p className="text-sm text-foreground-500">{subtitle}</p>
                )}
            </div>

            <div className="flex items-center gap-3">
                {children}
                {onCreateOrder && (
                    <Button
                        variant="primary"
                        onPress={onCreateOrder}
                    >
                        <Icon icon="gravity-ui:plus" className="w-4 h-4" />
                        New Order
                    </Button>
                )}
            </div>
        </div>
    );
}
