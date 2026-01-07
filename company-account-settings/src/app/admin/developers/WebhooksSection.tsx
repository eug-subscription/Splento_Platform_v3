import { Button } from '@heroui/react';
import { Icon } from '@iconify/react';
import { useDevelopers } from '@/hooks/useDevelopers';
import { EmptyState } from '@/components/developers/EmptyState';
import { WebhookCard } from '@/components/developers/WebhookCard';
import { useModal } from '@/hooks/useModal';
import type { WebhookFormData } from '@/types/modals';

export function WebhooksSection() {
    const { webhooks, isLoading, deleteWebhook, toggleWebhookStatus, createWebhook, updateWebhook } = useDevelopers();
    const { openModal, closeModal } = useModal();

    const handleAddWebhook = async (data: WebhookFormData) => {
        const response = await createWebhook(data);
        openModal('webhook_created', response);
    };

    const handleUpdateWebhook = async (id: string, data: WebhookFormData) => {
        await updateWebhook(id, data);
        closeModal();
    };

    const handleConfirmDelete = async (id: string) => {
        await deleteWebhook(id);
        closeModal();
    };

    if (webhooks.length === 0 && !isLoading) {
        return (
            <div className="p-4 md:p-8">
                <EmptyState
                    icon="gravity-ui:bell"
                    title="No webhooks configured"
                    description="Webhooks allow you to receive real-time notifications when events happen in your account."
                    actionLabel="Add Webhook"
                    onAction={() => openModal('create_webhook', { onSubmit: handleAddWebhook })}
                />
            </div>
        );
    }

    return (
        <div className="space-y-6 p-4 md:p-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-divider pb-6">
                <div>
                    <h3 className="text-xl font-bold text-foreground">Webhooks</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                        Receive real-time notifications to your server endpoints.
                    </p>
                </div>
                <Button
                    variant="primary"
                    onPress={() => openModal('create_webhook', { onSubmit: handleAddWebhook })}
                    className="rounded-full px-6 font-bold shadow-lg shadow-accent/20"
                >
                    <Icon icon="gravity-ui:plus" className="size-4 mr-2" />
                    Add Webhook
                </Button>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {webhooks.map((webhook) => (
                    <WebhookCard
                        key={webhook.id}
                        webhook={webhook}
                        onEdit={(webhookItem) => openModal('edit_webhook', {
                            webhook: webhookItem,
                            onSubmit: (id: string, data: WebhookFormData) => handleUpdateWebhook(id, data)
                        })}
                        onDelete={() => openModal('delete_webhook', {
                            webhook,
                            onConfirm: () => handleConfirmDelete(webhook.id)
                        })}
                        onToggleStatus={toggleWebhookStatus}
                    />
                ))}
            </div>
        </div>
    );
}
