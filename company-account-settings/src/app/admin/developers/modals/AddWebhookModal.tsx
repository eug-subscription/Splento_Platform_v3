import { Modal, Button } from '@heroui/react';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import type { WebhookEvent } from '@/types/developers';
import { WebhookForm } from '@/components/developers/WebhookForm';

interface AddWebhookModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: { name: string; url: string; events: WebhookEvent[] }) => Promise<void>;
}

export function AddWebhookModal({ isOpen, onClose, onSubmit }: AddWebhookModalProps) {
    const [name, setName] = useState('');
    const [url, setUrl] = useState('');
    const [selectedEvents, setSelectedEvents] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async () => {
        if (!name || !url || selectedEvents.length === 0) return;

        setIsLoading(true);
        try {
            await onSubmit({
                name,
                url: `https://${url}`,
                events: selectedEvents as WebhookEvent[]
            });
            setName('');
            setUrl('');
            setSelectedEvents([]);
            onClose();
        } finally {
            setIsLoading(false);
        }
    };

    const isValidUrl = (u: string) => {
        // Since we prepend https://, we just need to make sure the remaining part is a valid domain/path
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
                                <Icon icon="gravity-ui:bell" className="size-5" />
                            </Modal.Icon>
                            <Modal.Heading className="text-2xl font-bold">Add Webhook</Modal.Heading>
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
                                Add Webhook
                            </Button>
                        </Modal.Footer>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
}
