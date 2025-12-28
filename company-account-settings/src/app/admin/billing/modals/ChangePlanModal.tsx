import { useState } from 'react';
import {
    Modal,
    Button,
    Chip,
    Separator,
    RadioGroup,
    Radio,
    cn
} from '@heroui/react';
import type { TeamPlan } from '@/types/billing';
import { AVAILABLE_PLANS } from '@/data/billing-constants';
import { formatPrice } from '@/utils/billing';

interface ChangePlanModalProps {
    isOpen: boolean;
    onClose: () => void;
    currentPlan: TeamPlan | null;
}

export function ChangePlanModal({ isOpen, onClose, currentPlan }: ChangePlanModalProps) {
    const [selectedPlanId, setSelectedPlanId] = useState<string>(currentPlan?.planId || 'plan_professional');
    const [isSaving, setIsSaving] = useState(false);

    const currentPrice = currentPlan?.monthlyCost || 0;
    const newPrice = AVAILABLE_PLANS.find(p => p.id === selectedPlanId)?.price || 0;
    const proratedAmount = Math.max(0, newPrice - currentPrice); // Simple diff for demo

    const isDowngrade = newPrice < currentPrice;
    const isUpgrade = newPrice > currentPrice;
    const isSame = newPrice === currentPrice;

    const handleSave = async () => {
        setIsSaving(true);
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsSaving(false);
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
                    <Modal.Dialog className="pointer-events-auto">
                        <Modal.Header>Change Subscription Plan</Modal.Header>
                        <Modal.Body>
                            <RadioGroup
                                value={selectedPlanId}
                                onChange={(val) => setSelectedPlanId(val as string)}
                                className="grid grid-cols-1 md:grid-cols-3 gap-4"
                            >
                                {AVAILABLE_PLANS.map((plan) => {
                                    const isCurrent = currentPlan?.planId === plan.id;

                                    return (
                                        <Radio
                                            key={plan.id}
                                            value={plan.id}
                                            className={cn(
                                                "relative flex m-0 bg-content2 hover:bg-content3 items-start justify-between",
                                                "cursor-pointer rounded-xl gap-4 p-4 border-2 border-transparent transition-all",
                                                "data-[selected=true]:border-accent data-[selected=true]:bg-accent-soft",
                                                "w-full h-full min-h-[160px]"
                                            )}
                                        >
                                            <Radio.Content className="flex-1 flex flex-col gap-3 h-full">
                                                {isCurrent && (
                                                    <Chip size="sm" color="default" variant="soft" className="absolute top-2 right-2 h-5 text-xs">Current</Chip>
                                                )}
                                                <div>
                                                    <div className="font-bold text-lg leading-tight">{plan.name}</div>
                                                    <div className="text-default-500 text-xs mt-1">{plan.credits.toLocaleString()} credits/mo</div>
                                                </div>
                                                <div className="mt-auto">
                                                    <div className="font-bold text-xl text-accent">
                                                        {formatPrice(plan.price)}
                                                        <span className="text-sm font-normal text-default-500">/mo</span>
                                                    </div>
                                                </div>
                                            </Radio.Content>
                                            <Radio.Control className="mt-1">
                                                <Radio.Indicator className="text-midnight" />
                                            </Radio.Control>
                                        </Radio>
                                    );
                                })}
                            </RadioGroup>

                            {!isSame && (
                                <div className="mt-4 p-4 rounded-lg bg-default-50 border border-default-200">
                                    <h4 className="font-semibold text-sm mb-2">Summary</h4>
                                    <div className="flex justify-between items-center text-sm">
                                        <span>Starting Today</span>
                                        <span className="font-medium">
                                            {isUpgrade ? 'Immedate Upgrade' : 'Schedule Downgrade'}
                                        </span>
                                    </div>

                                    {isUpgrade && (
                                        <>
                                            <Separator className="my-2" />
                                            <div className="flex justify-between items-center font-bold">
                                                <span>Due Today (Prorated)</span>
                                                <span>{formatPrice(proratedAmount)}</span>
                                            </div>
                                            <p className="text-xs text-default-400 mt-2">
                                                You'll be charged the prorated difference for the remainder of this billing cycle.
                                            </p>
                                        </>
                                    )}

                                    {isDowngrade && (
                                        <p className="text-xs text-default-500 mt-2">
                                            Your plan will change at the end of your billing cycle on {currentPlan?.nextBillingDate ? new Date(currentPlan.nextBillingDate).toLocaleDateString() : 'Next Billing Date'}.
                                        </p>
                                    )}
                                </div>
                            )}

                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="ghost" onPress={onClose}>
                                Cancel
                            </Button>
                            <Button
                                variant="primary"
                                onPress={handleSave}
                                isPending={isSaving}
                                isDisabled={isSame}
                            >
                                Confirm Change
                            </Button>
                        </Modal.Footer>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
}
