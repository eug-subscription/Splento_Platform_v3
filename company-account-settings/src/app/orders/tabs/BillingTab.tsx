import type { Order } from '@/types/order.types';

interface BillingTabProps {
    order: Order;
}

/**
 * BillingTab displays financial summary, line items, and invoices.
 * Placeholder for Phase 6 Implementation.
 */
export function BillingTab({ order }: BillingTabProps) {
    void order;

    return (
        <div className="space-y-6">
            <div className="p-12 rounded-2xl bg-content2/50 border border-divider/50 text-center animate-in fade-in duration-500">
                <p className="text-foreground font-semibold">
                    Billing Tab — Coming in Phase 6
                </p>
                <p className="text-sm text-muted-foreground mt-2 max-w-xs mx-auto">
                    Manage payments, view line items, and download your invoices.
                </p>
            </div>
        </div>
    );
}
