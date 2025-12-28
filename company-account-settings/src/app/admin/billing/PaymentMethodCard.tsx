import { Card, Button } from '@heroui/react';
import { Icon } from '@iconify/react';
import type { PaymentMethod } from '@/types/billing';
import { formatCardBrand } from '@/utils/billing';

interface PaymentMethodCardProps {
    paymentMethod: PaymentMethod | null;
    onUpdate: () => void;
}

export function PaymentMethodCard({ paymentMethod, onUpdate }: PaymentMethodCardProps) {
    return (
        <Card className="h-full">
            <Card.Header className="flex flex-col items-start gap-1 pb-2">
                <h3 className="text-base font-semibold text-foreground">Payment Method</h3>
            </Card.Header>
            <Card.Content className="flex flex-col gap-6">
                {paymentMethod ? (
                    <div className="flex items-center gap-4">
                        <div className="flex items-center justify-center w-12 h-8 rounded border border-default-200 bg-default-50">
                            {/* Simple icon logic based on brand, or generic card */}
                            <Icon
                                icon={paymentMethod.brand === 'visa' ? "logos:visa" :
                                    paymentMethod.brand === 'mastercard' ? "logos:mastercard" :
                                        "gravity-ui:credit-card"}
                                width={24}
                                className={!paymentMethod.brand ? "text-default-500" : ""}
                            />
                        </div>
                        <div>
                            <div className="text-sm font-semibold flex items-center gap-1.5">
                                {formatCardBrand(paymentMethod.brand)}
                                <span className="text-muted-foreground font-normal">•••• {paymentMethod.last4}</span>
                            </div>
                            {paymentMethod.expiryMonth && paymentMethod.expiryYear && (
                                <div className="text-xs text-muted-foreground mt-0.5">
                                    Expires {paymentMethod.expiryMonth}/{paymentMethod.expiryYear}
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-4 text-center gap-2">
                        <div className="p-3 rounded-full bg-default-100 text-default-500">
                            <Icon icon="gravity-ui:credit-card" width={24} />
                        </div>
                        <div className="text-default-500 mt-2">
                            <p>No payment method on file</p>
                            <p className="text-sm text-default-400">Add a payment method to purchase credits or subscribe.</p>
                        </div>
                    </div>
                )}

                <div className="mt-auto pt-2">
                    <Button
                        variant="secondary"
                        size="sm"
                        onPress={onUpdate}
                        className="font-medium"
                    >
                        {!paymentMethod && <Icon icon="gravity-ui:plus" />}
                        {paymentMethod ? 'Update Payment Method' : 'Add Payment Method'}
                    </Button>
                </div>
            </Card.Content>
        </Card>
    );
}
