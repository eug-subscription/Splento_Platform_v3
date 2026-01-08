import type { Order } from '@/types/order.types';

interface ActivityTabProps {
    order: Order;
}

/**
 * ActivityTab displays the audit log and status history.
 * Placeholder for Phase 6 Implementation.
 */
export function ActivityTab({ order }: ActivityTabProps) {
    void order;

    return (
        <div className="space-y-6">
            <div className="p-12 rounded-2xl bg-content2/50 border border-divider/50 text-center animate-in fade-in duration-500">
                <p className="text-foreground font-semibold">
                    Activity Tab — Coming in Phase 6
                </p>
                <p className="text-sm text-muted-foreground mt-2 max-w-xs mx-auto">
                    Complete history of your order status changes and communications.
                </p>
            </div>
        </div>
    );
}
