import { Modal, Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import type { Session } from "@/types/security";

interface RevokeSessionModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    session: Session | null;
}

export function RevokeSessionModal({ isOpen, onClose, onConfirm, session }: RevokeSessionModalProps) {
    if (!session) return null;

    return (
        <Modal isOpen={isOpen} onOpenChange={onClose}>
            <Modal.Backdrop variant="blur">
                <Modal.Container>
                    <Modal.Dialog className="max-w-md w-full rounded-3xl">
                        <Modal.CloseTrigger />
                        <Modal.Header>
                            <Modal.Heading className="flex items-center gap-2">
                                <Icon icon="gravity-ui:circle-reset" className="text-danger h-5 w-5" />
                                <span className="text-lg font-semibold">Revoke Session</span>
                            </Modal.Heading>
                        </Modal.Header>
                        <Modal.Body className="space-y-4 py-2">
                            <p className="text-sm text-default-500 leading-relaxed">
                                Are you sure you want to revoke the session for <span className="font-semibold text-foreground">{session.browser} on {session.os}</span>?
                            </p>
                            <div className="bg-danger-soft p-4 rounded-2xl border border-danger/10">
                                <div className="flex items-start gap-3 text-danger-soft-foreground">
                                    <Icon icon="gravity-ui:triangle-exclamation" className="h-4 w-4 mt-0.5 shrink-0" />
                                    <p className="text-xs leading-normal">
                                        The user will be immediately signed out from this device and any unsaved work may be lost.
                                    </p>
                                </div>
                            </div>
                        </Modal.Body>
                        <Modal.Footer className="flex gap-3 pt-4 pb-6 px-6">
                            <Button variant="tertiary" onPress={onClose} className="flex-1">
                                Cancel
                            </Button>
                            <Button variant="danger" onPress={onConfirm} className="flex-1 rounded-full px-8 font-medium">
                                Revoke Session
                            </Button>
                        </Modal.Footer>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
}
