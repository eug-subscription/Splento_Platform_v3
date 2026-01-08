import type { Order } from '@/types/order.types';

interface CreativeTabProps {
    order: Order;
}

/**
 * CreativeTab displays the brief, references, and approval flow.
 * Placeholder for Phase 4 Implementation.
 */
export function CreativeTab({ order }: CreativeTabProps) {
    void order;

    return (
        <div className="space-y-6">
            <div className="p-12 rounded-2xl bg-content2/50 border border-divider/50 text-center animate-in fade-in duration-500">
                <p className="text-foreground font-semibold">
                    Creative Tab — Coming in Phase 4
                </p>
                <p className="text-sm text-muted-foreground mt-2 max-w-xs mx-auto">
                    Creative brief, reference images, and production guidelines.
                </p>
            </div>
        </div>
    );
}
