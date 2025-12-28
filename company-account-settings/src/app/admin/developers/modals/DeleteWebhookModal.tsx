import { Modal, Button } from '@heroui/react';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import type { Webhook } from '@/types/developers';

interface DeleteWebhookModalProps {
    isOpen: boolean;
    onClose: () => void;
    webhook: Webhook | null;
    onConfirm: (id: string) => Promise<void>;
}

export function DeleteWebhookModal({ isOpen, onClose, webhook, onConfirm }: DeleteWebhookModalProps) {
    const [isLoading, setIsLoading] = useState(false);

    const handleConfirm = async () => {
        if (!webhook) return;
        setIsLoading(true);
        try {
            await onConfirm(webhook.id);
            onClose();
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onOpenChange={(open) => !open && onClose()}>
            <Modal.Backdrop variant="blur" className="p-4">
                <Modal.Container placement="center">
                    <Modal.Dialog className="sm:max-w-[400px] rounded-3xl">
                        <Modal.Header className="flex flex-col gap-1 pb-2">
                            <Modal.Icon className="bg-danger-soft text-danger">
                                <Icon icon="gravity-ui:trash-bin" className="size-5" />
                            </Modal.Icon>
                            <Modal.Heading className="text-xl font-bold">Delete Webhook</Modal.Heading>
                        </Modal.Header>

                        <Modal.Body className="py-4">
                            <p className="text-muted-foreground">
                                Are you sure you want to delete <strong>{webhook?.name}</strong>?
                                This action cannot be undone and you will stop receiving events at <code>{webhook?.url}</code>.
                            </p>
                        </Modal.Body>

                        <Modal.Footer className="pt-4 pb-6 px-6 flex justify-end gap-3">
                            <Button variant="ghost" onPress={onClose} isDisabled={isLoading}>
                                Cancel
                            </Button>
                            <Button
                                variant="danger"
                                onPress={handleConfirm}
                                isPending={isLoading}
                                className="rounded-full px-8 font-bold shadow-lg shadow-danger/20"
                            >
                                Delete Webhook
                            </Button>
                        </Modal.Footer>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
}
