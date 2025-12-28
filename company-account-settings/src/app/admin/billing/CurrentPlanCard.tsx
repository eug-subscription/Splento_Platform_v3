import { Card, Chip, Button } from '@heroui/react';
import { Icon } from '@iconify/react';
import type { TeamBilling } from '@/types/billing';
import { formatDate, daysUntil as getDaysUntil, formatPrice } from '@/utils/billing';

interface CurrentPlanCardProps {
    billing: TeamBilling | null;
    onChangePlan: () => void;
    onSwitchModel: () => void;
}

export function CurrentPlanCard({ billing, onChangePlan, onSwitchModel }: CurrentPlanCardProps) {
    if (!billing) return null;

    const { billingType, plan } = billing;
    const isPAYG = billingType === 'payg';
    const isSubscription = billingType === 'subscription' && plan;

    // Handle PAYG State
    if (isPAYG) {
        return (
            <Card className="h-full">
                <Card.Header className="flex flex-col items-start gap-1 pb-2">
                    <div className="flex w-full justify-between items-center">
                        <h3 className="text-base font-semibold text-foreground">Billing Model</h3>
                    </div>
                </Card.Header>
                <Card.Content className="flex flex-col gap-6">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <div className="p-2 rounded-lg bg-accent-soft text-accent">
                                <Icon icon="gravity-ui:layers" width={24} />
                            </div>
                            <span className="text-xl font-bold">Pay As You Go</span>
                        </div>
                        <p className="text-default-500 text-sm">
                            No monthly subscription. Purchase credits as needed.
                        </p>
                    </div>

                    <div className="mt-auto">
                        <Button
                            variant="ghost"
                            className="px-0 h-auto min-w-0 font-medium text-accent"
                            onPress={onSwitchModel}
                        >
                            Switch to a Plan
                        </Button>
                    </div>
                </Card.Content>
            </Card>
        );
    }

    // Handle Subscription States
    if (isSubscription) {
        const { planName, monthlyCost, billingPeriod, trialEndsAt, startDate } = plan;
        const planStatus = billing?.plan?.planStatus || 'inactive';
        const nextBillingDate = billing?.plan?.nextBillingDate ? new Date(billing.plan.nextBillingDate) : null;

        const isTrial = planStatus === 'trialing' && trialEndsAt;
        const isCancelled = planStatus === 'cancelled';
        const isPastDue = planStatus === 'past_due';

        // Helper to safely get days until using getDaysUntil utility
        const daysUntilTrialEnd = trialEndsAt ? getDaysUntil(trialEndsAt) : 0;

        // Status badge configuration
        const getStatusChip = () => {
            if (isTrial) {
                return <Chip color="accent" variant="soft" size="sm">Trial - {daysUntilTrialEnd} days left</Chip>;
            }
            if (isCancelled) {
                return <Chip color="default" variant="soft" size="sm">Cancelled</Chip>;
            }
            if (isPastDue) {
                return <Chip color="danger" variant="soft" size="sm">Past Due</Chip>;
            }
            // Active
            return (
                <Chip
                    color="success"
                    variant="soft"
                    size="sm"
                >
                    <span className="flex items-center gap-1">
                        <Icon icon="gravity-ui:circle-check-fill" width={14} />
                        Active
                    </span>
                </Chip>
            );
        };

        return (
            <Card className="h-full flex flex-col">
                <Card.Header className="flex flex-row w-full justify-between items-center pb-2">
                    <div className="flex flex-row items-center gap-3">
                        <h3 className="text-base font-semibold text-foreground">Current Plan</h3>
                        {getStatusChip()}
                    </div>
                </Card.Header>
                <Card.Content className="flex flex-col gap-6 flex-1">
                    {/* Plan Name */}
                    <div>
                        <div className="text-2xl font-semibold tracking-tight">{planName} {isTrial && 'Trial'}</div>
                    </div>

                    {/* Plan Details Grid */}
                    <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                        {/* Monthly Cost */}
                        <div className="flex flex-col gap-1">
                            <span className="text-sm font-medium text-default-500">
                                {billingPeriod === 'monthly' ? 'Monthly Cost' : 'Annual Cost'}
                            </span>
                            <span className="text-lg font-semibold">
                                {formatPrice(monthlyCost)}
                            </span>
                        </div>

                        {/* Billing Period */}
                        <div className="flex flex-col gap-1">
                            <span className="text-sm font-medium text-default-500">
                                Billing Period
                            </span>
                            <span className="text-lg font-semibold capitalize">
                                {billingPeriod}
                            </span>
                        </div>

                        {/* Start Date */}
                        <div className="flex flex-col gap-1">
                            <span className="text-sm font-medium text-default-500">
                                Start Date
                            </span>
                            <span className="text-lg font-semibold">
                                {startDate ? formatDate(startDate) : '-'}
                            </span>
                        </div>

                        {/* Next Billing Date */}
                        <div className="flex flex-col gap-1">
                            <span className="text-sm font-medium text-default-500">
                                {isCancelled ? 'Access Until' : 'Next Billing Date'}
                            </span>
                            <span className="text-lg font-semibold">
                                {nextBillingDate ? formatDate(nextBillingDate) : '-'}
                            </span>
                        </div>
                    </div>
                </Card.Content>
                <Card.Footer className="justify-end mt-auto pt-4">
                    <Button
                        variant="ghost"
                        size="md"
                        onPress={onChangePlan}
                        className="font-medium border border-default-200"
                    >
                        Manage Plan
                    </Button>
                </Card.Footer>
            </Card>
        );
    }

    return null;
}
