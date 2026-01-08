import type { Order } from '@/types/order.types';

interface GalleryTabProps {
    order: Order;
}

/**
 * GalleryTab displays the asset grid and handling revisions.
 * Placeholder for Phase 5 Implementation.
 */
export function GalleryTab({ order }: GalleryTabProps) {
    void order;

    return (
        <div className="space-y-6">
            <div className="p-12 rounded-2xl bg-content2/50 border border-divider/50 text-center animate-in fade-in duration-500">
                <p className="text-foreground font-semibold">
                    Gallery Tab — Coming in Phase 5
                </p>
                <p className="text-sm text-muted-foreground mt-2 max-w-xs mx-auto">
                    View, download, and request revisions for your delivered assets.
                </p>
            </div>
        </div>
    );
}
