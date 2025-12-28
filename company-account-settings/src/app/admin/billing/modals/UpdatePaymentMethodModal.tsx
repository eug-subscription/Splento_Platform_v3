import { useState } from 'react';
import {
    Modal,
    Button,
    RadioGroup,
    Radio,
    Label
} from '@heroui/react';
import { Icon } from '@iconify/react';

interface UpdatePaymentMethodModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function UpdatePaymentMethodModal({ isOpen, onClose }: UpdatePaymentMethodModalProps) {
    const [paymentType, setPaymentType] = useState('card');
    const [isSaving, setIsSaving] = useState(false);

    const handleSave = async () => {
        setIsSaving(true);
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsSaving(false);
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onOpenChange={(open) => !open && onClose()}>
            <Modal.Backdrop variant="blur">
                <Modal.Container
                    placement="center"
                    className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none w-full h-full"
                >
                    <Modal.Dialog>
                        <Modal.Header>Update Payment Method</Modal.Header>
                        <Modal.Body>
                            <RadioGroup
                                orientation="horizontal"
                                value={paymentType}
                                onChange={(val) => setPaymentType(val as string)}
                                className="mb-4"
                            >
                                <Label className="text-sm font-medium mb-2 block">Payment Type</Label>
                                <Radio value="card">Card</Radio>
                                <Radio value="sepa">SEPA Direct Debit</Radio>
                            </RadioGroup>

                            {/* Mock Stripe Elements Area */}
                            <div className="p-4 border border-default-200 rounded-lg bg-default-50">
                                {paymentType === 'card' ? (
                                    <div className="space-y-4">
                                        <div className="flex gap-2 mb-2 text-default-400">
                                            <Icon icon="logos:visa" width={32} />
                                            <Icon icon="logos:mastercard" width={32} />
                                            <Icon icon="logos:amex" width={32} />
                                        </div>

                                        <div className="h-10 bg-background border border-default-300 rounded px-3 flex items-center text-sm text-default-500 shadow-sm">
                                            <span className="flex-1">Card number</span>
                                            <div className="flex gap-4">
                                                <span>MM/YY</span>
                                                <span>CVC</span>
                                            </div>
                                        </div>
                                        <p className="text-xs text-default-400 flex items-center gap-1">
                                            <Icon icon="gravity-ui:lock" />
                                            Payments are securely processed by Stripe
                                        </p>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        <div className="h-10 bg-background border border-default-300 rounded px-3 flex items-center text-sm text-default-500 shadow-sm">
                                            IBAN
                                        </div>
                                        <p className="text-xs text-default-400">
                                            By providing your IBAN, you authorize Stripe to send instructions to your bank to debit your account.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="ghost" onPress={onClose}>
                                Cancel
                            </Button>
                            <Button
                                variant="primary"
                                onPress={handleSave}
                                isPending={isSaving}
                            >
                                Save Payment Method
                            </Button>
                        </Modal.Footer>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
}
