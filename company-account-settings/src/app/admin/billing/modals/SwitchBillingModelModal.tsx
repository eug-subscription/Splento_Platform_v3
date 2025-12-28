import { useState } from 'react';
import {
    Modal,
    Button,
    Alert
} from '@heroui/react';
import { Icon } from '@iconify/react';
import type { BillingType } from '@/types/billing';

interface SwitchBillingModelModalProps {
    isOpen: boolean;
    onClose: () => void;
    currentModel: BillingType;
}

export function SwitchBillingModelModal({ isOpen, onClose, currentModel }: SwitchBillingModelModalProps) {
    const [isSaving, setIsSaving] = useState(false);
    const targetModel = currentModel === 'subscription' ? 'payg' : 'subscription';

    const handleSwitch = async () => {
        setIsSaving(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsSaving(false);
        onClose();
    };

    const isToPAYG = targetModel === 'payg';

    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={(open) => !open && onClose()}
        >
            <Modal.Backdrop variant="blur">
                <Modal.Container
                    placement="center"
                    className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none w-full h-full"
                >
                    <Modal.Dialog>
                        <Modal.Header>
                            Switch to {isToPAYG ? 'Pay As You Go' : 'Subscription Plan'}
                        </Modal.Header>
                        <Modal.Body>
                            {isToPAYG ? (
                                <div className="flex flex-col gap-4">
                                    <Alert status="warning">
                                        <Alert.Indicator />
                                        <Alert.Content>
                                            <Alert.Title>You are about to cancel your subscription</Alert.Title>
                                            <Alert.Description>
                                                By switching to Pay As You Go, you will lose access to your monthly included credits and any plan-specific features at the end of your current billing cycle.
                                            </Alert.Description>
                                        </Alert.Content>
                                    </Alert>

                                    <div className="space-y-2">
                                        <h4 className="font-semibold text-sm">What happens next:</h4>
                                        <ul className="list-disc pl-5 text-sm space-y-1 text-default-600">
                                            <li>Your current plan will remain active until the billing period ends.</li>
                                            <li>Any purchased extra credits will remain valid.</li>
                                            <li>You will only pay for credits you purchase manually.</li>
                                        </ul>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col gap-4">
                                    <p className="text-default-600">
                                        Upgrade to a subscription plan to get monthly credit allocations and unlock premium features.
                                    </p>
                                    <div className="p-4 bg-accent-soft rounded-lg border border-accent/20">
                                        <div className="flex items-center gap-2 font-semibold text-accent mb-2">
                                            <Icon icon="gravity-ui:star-fill" />
                                            <span>Recommended: Professional Plan</span>
                                        </div>
                                        <p className="text-xs text-default-500 mb-3">
                                            Get 1,500 credits/mo and priority support.
                                        </p>
                                        <p className="text-xs italic text-default-400">
                                            * You will be prompted to select a plan in the next step.
                                        </p>
                                    </div>
                                </div>
                            )}
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="ghost" onPress={onClose}>
                                Keep {currentModel === 'subscription' ? 'Subscription' : 'Pay As You Go'}
                            </Button>
                            <Button
                                variant={isToPAYG ? "danger" : "primary"}
                                onPress={handleSwitch}
                                isPending={isSaving}
                            >
                                Confirm Switch
                            </Button>
                        </Modal.Footer>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
}
