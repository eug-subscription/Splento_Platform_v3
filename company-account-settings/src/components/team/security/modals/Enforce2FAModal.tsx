import { Modal, Button, Alert } from "@heroui/react";
import { Icon } from "@iconify/react";

interface Enforce2FAModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void | Promise<void>;
    membersWithout2FA: number;
}

export function Enforce2FAModal({ isOpen, onClose, onConfirm, membersWithout2FA }: Enforce2FAModalProps) {
    return (
        <Modal isOpen={isOpen} onOpenChange={onClose}>
            <Modal.Backdrop variant="blur">
                <Modal.Container>
                    <Modal.Dialog className="max-w-md w-full rounded-3xl">
                        <Modal.CloseTrigger />
                        <Modal.Header>
                            <Modal.Heading className="flex items-center gap-2">
                                <Icon icon="gravity-ui:shield-keyhole" className="text-warning h-5 w-5" />
                                <span className="text-lg font-semibold">Enforce Two-Factor Authentication</span>
                            </Modal.Heading>
                        </Modal.Header>
                        <Modal.Body className="space-y-4 py-2">
                            <p className="text-sm text-default-500 leading-relaxed">
                                By enforcing 2FA, all team members will be required to set up an additional security layer within the specified grace period.
                            </p>

                            {membersWithout2FA > 0 && (
                                <Alert status="warning" className="text-xs">
                                    <Alert.Indicator>
                                        <Icon icon="gravity-ui:triangle-exclamation" className="h-4 w-4" />
                                    </Alert.Indicator>
                                    <Alert.Content>
                                        <Alert.Title>Impact on Current Members</Alert.Title>
                                        <Alert.Description>
                                            {membersWithout2FA} {membersWithout2FA === 1 ? 'member does' : 'members do'} not currently have 2FA enabled and will be notified to set it up.
                                        </Alert.Description>
                                    </Alert.Content>
                                </Alert>
                            )}

                            <div className="space-y-3 py-2">
                                <div className="flex items-start gap-3">
                                    <Icon icon="gravity-ui:circle-check" className="text-success h-4 w-4 mt-0.5" />
                                    <p className="text-xs text-default-600 leading-normal">Admin-level security requirement for all current and future members.</p>
                                </div>
                                <div className="flex items-start gap-3">
                                    <Icon icon="gravity-ui:message-text-fill" className="text-info h-4 w-4 mt-0.5" />
                                    <p className="text-xs text-default-600 leading-normal">Automated notification will be sent to members without 2FA.</p>
                                </div>
                            </div>
                        </Modal.Body>
                        <Modal.Footer className="flex gap-3 pt-4 pb-6 px-6">
                            <Button variant="tertiary" onPress={onClose} className="flex-1">
                                Cancel
                            </Button>
                            <Button variant="danger" onPress={onConfirm} className="flex-1 rounded-full">
                                Enforce 2FA
                            </Button>
                        </Modal.Footer>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
}
