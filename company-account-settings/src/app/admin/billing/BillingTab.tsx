import { useRef } from 'react';
import { Card, Alert } from '@heroui/react';
import { Icon } from '@iconify/react';
import { useBilling } from '@/hooks/useBilling';
import { canManageBilling } from '@/utils/billing';

import { CurrentPlanCard } from './CurrentPlanCard';
import { CreditsCard } from './CreditsCard';
import { AutoRefillCard } from './AutoRefillCard';
import { BuyCreditsCard } from './BuyCreditsCard';
import { PaymentMethodCard } from '@/app/admin/billing/PaymentMethodCard';
import { BillingDetailsCard } from '@/app/admin/billing/BillingDetailsCard';
import { InvoiceHistoryTable } from '@/app/admin/billing/InvoiceHistoryTable';
import { BillingAlertBanner } from '@/app/admin/billing/BillingAlertBanner';
import { BillingTabSkeleton } from '@/app/admin/billing/BillingTabSkeleton';

import type { ModalType, BillingAlert } from '@/types/billing';
import type { Member } from '@/types/team';

interface BillingTabProps {
    currentUser: Member;
}

export function BillingTab({ currentUser }: BillingTabProps) {
    const buyCreditsRef = useRef<HTMLDivElement>(null);
    const {
        billing,
        invoices,
        alerts,
        isLoading,
        error,
        openModal,
        dismissAlert
    } = useBilling();

    // Permission Check
    const hasPermission = canManageBilling(currentUser);

    const scrollToBuyCredits = () => {
        buyCreditsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    if (isLoading) {
        return <BillingTabSkeleton />;
    }

    if (error) {
        return (
            <Alert status="danger" className="mb-4">
                <Alert.Indicator />
                <Alert.Content>
                    <Alert.Title>Unable to load billing information</Alert.Title>
                    <Alert.Description>{error.message}</Alert.Description>
                </Alert.Content>
            </Alert>
        );
    }

    if (!billing) return null;

    if (!hasPermission) {
        return (
            <Card className="max-w-3xl mx-auto mt-8">
                <Card.Content className="flex flex-col items-center text-center py-12 gap-4">
                    <div className="p-4 rounded-full bg-default-100 text-default-500">
                        <Icon icon="gravity-ui:lock" width={32} />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold mb-2">Billing</h3>
                        <p className="text-default-500 max-w-md mx-auto">
                            Your team is on the <span className="font-semibold text-foreground">{billing.plan?.planName || 'Pay As You Go'}</span> plan.
                            <br /><br />
                            Contact your team admin to manage billing, payment methods, or purchase credits.
                        </p>
                    </div>
                </Card.Content>
            </Card>
        );
    }

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex flex-col gap-1 px-1">
                <h1 className="text-2xl font-bold text-foreground">Billing & Plans</h1>
                <p className="text-default-500">Manage your subscription, purchase credits, and view your billing history.</p>
            </div>

            {/* Alerts Banner */}
            {alerts.length > 0 && (
                <BillingAlertBanner
                    alerts={alerts}
                    onAction={(alert: BillingAlert) => {
                        if (alert.actionType) {
                            openModal(alert.actionType as ModalType);
                        }
                    }}
                    onDismiss={dismissAlert}
                />
            )}

            {/* Top Section: Plan & Credits Status */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
                <CurrentPlanCard
                    billing={billing}
                    onChangePlan={() => billing.plan && openModal('change_plan', { currentPlan: billing.plan })}
                    onSwitchModel={() => openModal('switch_billing_model', { currentModel: billing.billingType })}
                />
                <CreditsCard
                    billing={billing}
                    onBuyCredits={scrollToBuyCredits}
                />
            </div>

            {/* Buy Credits Section */}
            <div ref={buyCreditsRef} className="scroll-mt-24">
                <BuyCreditsCard />
            </div>

            {/* Auto Refill & Payment Method: Side by Side */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
                <AutoRefillCard />
                <PaymentMethodCard
                    paymentMethod={billing.paymentMethod}
                    onUpdate={() => openModal('update_payment')}
                />
            </div>

            {/* Billing Details: Full Width */}
            <div className="grid grid-cols-1 gap-6">
                <BillingDetailsCard
                    details={billing.billingDetails}
                />
            </div>

            {/* Invoice History */}
            <InvoiceHistoryTable invoices={invoices} />
        </div>
    );
}
