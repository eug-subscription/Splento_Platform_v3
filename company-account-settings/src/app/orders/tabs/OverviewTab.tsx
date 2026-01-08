import type { Order } from '@/types/order.types';

interface OverviewTabProps {
    order: Order;
}

/**
 * OverviewTab displays summary information, timeline, and location.
 * Placeholder for Phase 4 Implementation.
 */
export function OverviewTab({ order }: OverviewTabProps) {
    // order will be used in future phases
    void order;

    return (
        <div className="space-y-6">
            <div className="p-12 rounded-2xl bg-content2/50 border border-divider/50 text-center animate-in fade-in duration-500">
                <p className="text-foreground font-semibold">
                    Overview Tab — Coming in Phase 4
                </p>
                <p className="text-sm text-muted-foreground mt-2 max-w-xs mx-auto">
                    A comprehensive view of your order timeline, session details, and location specifics.
                </p>
            </div>
        </div>
    );
}
