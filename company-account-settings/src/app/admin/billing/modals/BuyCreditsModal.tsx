import { useState } from 'react';
import {
    Modal,
    Button,
    Separator,
    RadioGroup,
    Radio,
    cn
} from '@heroui/react';
import { Icon } from '@iconify/react';
import { CREDIT_PACKAGES, VAT_RATE } from '@/data/billing-constants';
import { formatPrice, calculatePurchaseTotal } from '@/utils/billing';

interface BuyCreditsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function BuyCreditsModal({ isOpen, onClose }: BuyCreditsModalProps) {
    const [selectedPackageId, setSelectedPackageId] = useState<string>(CREDIT_PACKAGES[1].id);
    const [isProcessing, setIsProcessing] = useState(false);

    const selectedPackage = CREDIT_PACKAGES.find(pkg => pkg.id === selectedPackageId) || CREDIT_PACKAGES[0];
    const { subtotal, vat, total } = calculatePurchaseTotal(selectedPackage.price);

    const handlePurchase = async () => {
        setIsProcessing(true);
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsProcessing(false);
        onClose();
    };


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
                        <Modal.Header className="flex flex-col gap-1">
                            <h3 className="text-xl font-bold">Buy Credits</h3>
                            <p className="text-sm font-normal text-default-500">
                                Purchase additional credits for your team. Credits expire 12 months after purchase.
                            </p>
                        </Modal.Header>
                        <Modal.Body>
                            <RadioGroup
                                value={selectedPackageId}
                                onChange={(val) => setSelectedPackageId(val as string)}
                                className="grid grid-cols-1 md:grid-cols-2 gap-4"
                            >
                                {CREDIT_PACKAGES.map((pkg) => (
                                    <Radio
                                        key={pkg.id}
                                        value={pkg.id}
                                        className={cn(
                                            "relative flex m-0 bg-content2 hover:bg-content3 items-start justify-between",
                                            "cursor-pointer rounded-xl gap-4 p-4 border-2 border-transparent transition-all",
                                            "data-[selected=true]:border-accent data-[selected=true]:bg-accent-soft",
                                            "w-full"
                                        )}
                                    >
                                        <Radio.Content className="flex-1 flex flex-col gap-1 min-w-0">
                                            <div className="flex justify-between items-start mb-1">
                                                <span className="font-bold text-lg">{pkg.credits.toLocaleString()} Credits</span>
                                                <div className="flex flex-col items-end">
                                                    <span className="font-semibold text-primary">
                                                        {formatPrice(pkg.price * 100)}
                                                    </span>
                                                    {pkg.discount && (
                                                        <span className="text-xs text-success font-medium">
                                                            {pkg.discount}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="text-xs text-default-500">
                                                ${(pkg.price / pkg.credits).toFixed(2)} per credit
                                            </div>
                                        </Radio.Content>
                                        <Radio.Control className="mt-1">
                                            <Radio.Indicator className="text-midnight" />
                                        </Radio.Control>
                                    </Radio>
                                ))}
                            </RadioGroup>

                            <Separator className="my-4" />

                            {/* Summary */}
                            <div className="space-y-2">
                                <h4 className="font-semibold text-sm">Order Summary</h4>
                                <div className="flex justify-between text-sm">
                                    <span className="text-default-500">Subtotal</span>
                                    <span>{formatPrice(subtotal * 100)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-default-500">VAT ({(VAT_RATE * 100).toFixed(0)}%)</span>
                                    <span>{formatPrice(vat * 100)}</span>
                                </div>
                                <Separator className="my-2" />
                                <div className="flex justify-between font-bold text-lg">
                                    <span>Total</span>
                                    <span>{formatPrice(total * 100)}</span>
                                </div>
                            </div>

                            {/* Payment Method Preview */}
                            <div className="mt-4 p-3 bg-default-50 rounded-lg flex items-center justify-between border border-default-200">
                                <div className="flex items-center gap-3">
                                    <div className="p-1.5 bg-background rounded border border-default-200">
                                        <Icon icon="logos:visa" width={24} />
                                    </div>
                                    <div className="text-sm">
                                        <div className="font-medium">Visa ending in 4242</div>
                                        <div className="text-default-500 text-xs">Expires 12/2026</div>
                                    </div>
                                </div>
                                <Button size="sm" variant="ghost" className="text-primary">Change</Button>
                            </div>

                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="ghost" onPress={onClose}>
                                Cancel
                            </Button>
                            <Button
                                variant="primary"
                                onPress={handlePurchase}
                                isPending={isProcessing}
                            >
                                Confirm Purchase
                            </Button>
                        </Modal.Footer>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
}
