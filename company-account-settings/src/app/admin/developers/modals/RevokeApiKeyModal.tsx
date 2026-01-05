import { Modal, Button } from '@heroui/react';
import { Icon } from '@iconify/react';
import { useState } from 'react';

interface RevokeApiKeyModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void | Promise<void>;
}

export function RevokeApiKeyModal({ isOpen, onClose, onConfirm }: RevokeApiKeyModalProps) {
    const [isRevoking, setIsRevoking] = useState(false);

    const handleConfirm = async () => {
        setIsRevoking(true);
        await onConfirm();
        setIsRevoking(false);
    };

    return (
        <Modal isOpen={isOpen} onOpenChange={(open) => !open && onClose()}>
            <Modal.Backdrop variant="blur" className="p-4">
                <Modal.Container placement="center">
                    <Modal.Dialog className="sm:max-w-[400px] rounded-3xl">
                        <Modal.CloseTrigger />
                        <Modal.Header className="flex flex-col gap-1 pb-2">
                            <Modal.Icon className="bg-danger-soft text-danger">
                                <Icon icon="gravity-ui:trash-bin" className="size-5" />
                            </Modal.Icon>
                            <Modal.Heading className="text-xl font-bold">Revoke API Key?</Modal.Heading>
                        </Modal.Header>

                        <Modal.Body className="py-4">
                            <p className="text-muted-foreground text-sm leading-relaxed">
                                This action cannot be undone. Any applications using this key will immediately lose access to the Splento API.
                            </p>
                        </Modal.Body>

                        <Modal.Footer className="flex flex-col sm:flex-row gap-3 pt-4 pb-6 px-6">
                            <Button
                                variant="secondary"
                                onPress={onClose}
                                isDisabled={isRevoking}
                                className="w-full sm:flex-1 h-11"
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="danger"
                                onPress={handleConfirm}
                                isPending={isRevoking}
                                className="w-full sm:flex-1 h-11 rounded-full font-bold shadow-lg shadow-danger/20"
                            >
                                Revoke Key
                            </Button>
                        </Modal.Footer>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
}

