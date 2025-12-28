import { Card, Button } from '@heroui/react';
import { Icon } from '@iconify/react';
import type { TeamBilling } from '@/types/billing';
import { formatDate } from '@/utils/billing';


interface CreditsCardProps {
    billing: TeamBilling | null;
    onBuyCredits: () => void;
}

export function CreditsCard({ billing, onBuyCredits }: CreditsCardProps) {
    if (!billing) return null;


    const { billingType, credits } = billing;
    const { balance, monthlyAllocation, resetsAt } = credits;

    const isSubscription = billingType === 'subscription';
    const limit = monthlyAllocation || 5000; // Default or fallback if needed, but usually defined for subscription
    const used = limit - balance;

    // Percentage for progress bar
    let progressValue = 0;
    if (limit > 0) {
        progressValue = (balance / limit) * 100;
    } else {
        // PAYG logic if needed, but design seems tailored to subscription limits
        progressValue = 100;
    }

    // Color logic
    let progressColorClass = "bg-success";

    if (progressValue <= 10) {
        progressColorClass = "bg-danger";
    } else if (progressValue <= 25) {
        progressColorClass = "bg-warning";
    }

    return (
        <Card className="h-full flex flex-col">
            <Card.Header className="flex flex-row justify-between items-center pb-2">
                <h3 className="text-base font-semibold text-foreground">Credits</h3>
            </Card.Header>
            <Card.Content className="flex flex-col gap-6 flex-1 justify-between">
                {/* Balance & Usage */}
                <div className="space-y-4">
                    <div className="flex flex-col gap-1">
                        <div className="flex items-baseline gap-2">
                            <span className="text-2xl font-semibold tracking-tight text-foreground">
                                {credits.balance.toLocaleString()}
                            </span>
                            <span className="text-default-500 font-medium text-base">
                                remaining
                            </span>
                        </div>
                        {isSubscription && (
                            <p className="text-sm text-default-500">
                                {used.toLocaleString()} used of {limit.toLocaleString()} monthly limit
                            </p>
                        )}
                    </div>

                    {/* Progress Bar */}
                    <div className="relative w-full h-2 bg-grey-100 rounded-full overflow-hidden">
                        {/* Background bar */}
                        <div
                            className={`absolute top-0 left-0 h-full ${progressColorClass} transition-all duration-500 rounded-full`}
                            style={{ width: `${Math.max(progressValue, 0)}%` }}
                        />
                    </div>
                </div>

                {/* Footer Info */}
            </Card.Content>
            <Card.Footer className="justify-between items-center mt-auto pt-4">
                <span className="text-sm text-default-500 font-medium">
                    {isSubscription && resetsAt ? `Resets ${formatDate(resetsAt)}` : null}
                </span>
                <Button
                    variant="primary"
                    size="md"
                    className="font-medium gap-2"
                    onPress={onBuyCredits}
                >
                    <Icon icon="gravity-ui:plus" width={16} />
                    Top up
                </Button>
            </Card.Footer>
        </Card >
    );
}
