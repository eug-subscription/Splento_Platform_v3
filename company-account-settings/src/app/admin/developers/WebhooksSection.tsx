import { useState } from 'react';
import { Button } from '@heroui/react';
import { Icon } from '@iconify/react';
import { useDevelopers } from '@/hooks/useDevelopers';
import { EmptyState } from '@/components/developers/EmptyState';
import { WebhookCard } from '@/components/developers/WebhookCard';
import { AddWebhookModal } from './modals/AddWebhookModal';
import { EditWebhookModal } from './modals/EditWebhookModal';
import { WebhookCreatedModal } from './modals/WebhookCreatedModal';
import { DeleteWebhookModal } from './modals/DeleteWebhookModal';
import type { Webhook, WebhookEvent } from '@/types/developers';

export function WebhooksSection() {
    const { webhooks, isLoading, deleteWebhook, toggleWebhookStatus, createWebhook, updateWebhook } = useDevelopers();

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isCreatedModalOpen, setIsCreatedModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const [selectedWebhook, setSelectedWebhook] = useState<Webhook | null>(null);
    const [createdWebhookData, setCreatedWebhookData] = useState<{ webhook: Webhook; signingSecret: string } | null>(null);

    const handleAddWebhook = async (data: { name: string; url: string; events: WebhookEvent[] }) => {
        const response = await createWebhook(data);
        setCreatedWebhookData(response);
        setIsCreatedModalOpen(true);
    };

    const handleEditWebhook = (webhook: Webhook) => {
        setSelectedWebhook(webhook);
        setIsEditModalOpen(true);
    };

    const handleUpdateWebhook = async (id: string, data: { name: string; url: string; events: WebhookEvent[] }) => {
        await updateWebhook(id, data);
        setIsEditModalOpen(false);
    };

    const handleDeleteClick = (webhook: Webhook) => {
        setSelectedWebhook(webhook);
        setIsDeleteModalOpen(true);
    };

    const handleConfirmDelete = async (id: string) => {
        await deleteWebhook(id);
        setIsDeleteModalOpen(false);
    };

    if (webhooks.length === 0 && !isLoading) {
        return (
            <div className="p-4 md:p-8">
                <EmptyState
                    icon="gravity-ui:bell"
                    title="No webhooks configured"
                    description="Webhooks allow you to receive real-time notifications when events happen in your account."
                    actionLabel="Add Webhook"
                    onAction={() => setIsAddModalOpen(true)}
                />

                <AddWebhookModal
                    isOpen={isAddModalOpen}
                    onClose={() => setIsAddModalOpen(false)}
                    onSubmit={handleAddWebhook}
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
                    onPress={() => setIsAddModalOpen(true)}
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
                        onEdit={handleEditWebhook}
                        onDelete={() => handleDeleteClick(webhook)}
                        onToggleStatus={toggleWebhookStatus}
                    />
                ))}
            </div>

            {/* Modals */}
            <AddWebhookModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onSubmit={handleAddWebhook}
            />

            <EditWebhookModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                webhook={selectedWebhook}
                onSubmit={handleUpdateWebhook}
            />

            <DeleteWebhookModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                webhook={selectedWebhook}
                onConfirm={handleConfirmDelete}
            />

            {createdWebhookData && (
                <WebhookCreatedModal
                    isOpen={isCreatedModalOpen}
                    onClose={() => setIsCreatedModalOpen(false)}
                    webhook={createdWebhookData.webhook}
                    signingSecret={createdWebhookData.signingSecret}
                />
            )}
        </div>
    );
}

