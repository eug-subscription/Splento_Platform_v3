import { Modal, Button } from '@heroui/react';
import { Icon } from '@iconify/react';
import { useState, useEffect } from 'react';
import type { Webhook, WebhookEvent } from '@/types/developers';
import { WebhookForm } from '@/components/developers/WebhookForm';

interface EditWebhookModalProps {
    isOpen: boolean;
    onClose: () => void;
    webhook: Webhook | null;
    onSubmit: (id: string, data: { name: string; url: string; events: WebhookEvent[] }) => Promise<void>;
}

export function EditWebhookModal({ isOpen, onClose, webhook, onSubmit }: EditWebhookModalProps) {
    const [name, setName] = useState('');
    const [url, setUrl] = useState('');
    const [selectedEvents, setSelectedEvents] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (webhook) {
            setName(webhook.name);
            // Strip 'https://' if it exists for the display
            setUrl(webhook.url.replace(/^https:\/\//, ''));
            setSelectedEvents(webhook.events);
        }
    }, [webhook]);

    const handleSubmit = async () => {
        if (!webhook || !name || !url || selectedEvents.length === 0) return;

        setIsLoading(true);
        try {
            await onSubmit(webhook.id, {
                name,
                url: `https://${url}`,
                events: selectedEvents as WebhookEvent[]
            });
            onClose();
        } finally {
            setIsLoading(false);
        }
    };

    const isValidUrl = (u: string) => {
        try {
            const testUrl = new URL(`https://${u}`);
            return testUrl.hostname.includes('.');
        } catch {
            return false;
        }
    };

    const isUrlInvalid = url.length > 0 && !isValidUrl(url);

    return (
        <Modal isOpen={isOpen} onOpenChange={(open) => !open && onClose()}>
            <Modal.Backdrop variant="blur" className="p-4">
                <Modal.Container placement="center">
                    <Modal.Dialog className="sm:max-w-[600px] rounded-3xl">
                        <Modal.CloseTrigger className="right-4 top-4" />
                        <Modal.Header className="flex flex-col gap-1 pb-2">
                            <Modal.Icon className="bg-accent-soft text-accent">
                                <Icon icon="gravity-ui:pencil" className="size-5" />
                            </Modal.Icon>
                            <Modal.Heading className="text-2xl font-bold">Edit Webhook</Modal.Heading>
                        </Modal.Header>

                        <Modal.Body className="space-y-6 py-4">
                            <WebhookForm
                                name={name}
                                onNameChange={setName}
                                url={url}
                                onUrlChange={setUrl}
                                isUrlInvalid={isUrlInvalid}
                                selectedEvents={selectedEvents}
                                onEventsChange={setSelectedEvents}
                            />
                        </Modal.Body>

                        <Modal.Footer className="border-t border-divider pt-4 pb-6 px-6 flex justify-end gap-3">
                            <Button variant="ghost" onPress={onClose} isDisabled={isLoading}>
                                Cancel
                            </Button>
                            <Button
                                variant="primary"
                                onPress={handleSubmit}
                                isPending={isLoading}
                                isDisabled={!name || !url || isUrlInvalid || selectedEvents.length === 0}
                                className="rounded-full px-8 font-bold shadow-lg shadow-accent/20"
                            >
                                Save Changes
                            </Button>
                        </Modal.Footer>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
}
