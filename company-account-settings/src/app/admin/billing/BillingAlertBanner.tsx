import { Alert, Button } from '@heroui/react';
import { Icon } from '@iconify/react';
import type { BillingAlert } from '@/types/billing';

interface BillingAlertBannerProps {
    alerts: BillingAlert[];
    onDismiss: (id: string) => void;
    onAction: (alert: BillingAlert) => void;
}

export function BillingAlertBanner({ alerts, onDismiss, onAction }: BillingAlertBannerProps) {
    if (!alerts.length) return null;

    return (
        <div className="flex flex-col gap-3 w-full">
            {alerts.map((alert) => (
                <Alert
                    key={alert.id}
                    status={alert.severity}
                    className="relative"
                >
                    <Alert.Indicator />
                    <Alert.Content>
                        <Alert.Title className="font-semibold">{alert.title}</Alert.Title>
                        <Alert.Description className="mt-1 flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                            <span>{alert.message}</span>
                            {alert.actionLabel && (
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onPress={() => onAction(alert)}
                                    className="text-xs font-semibold hover:underline cursor-pointer p-0 h-auto data-[hover=true]:bg-transparent"
                                >
                                    {alert.actionLabel}
                                </Button>
                            )}
                        </Alert.Description>
                    </Alert.Content>

                    {alert.dismissible && (
                        <Button
                            isIconOnly
                            variant="ghost"
                            size="sm"
                            className="absolute top-2 right-2 text-default-400 hover:text-default-600 min-w-8 w-8 h-8"
                            onPress={() => onDismiss(alert.id)}
                            aria-label="Dismiss alert"
                        >
                            <Icon icon="gravity-ui:xmark" width={16} />
                        </Button>
                    )}
                </Alert>
            ))}
        </div>
    );
}
