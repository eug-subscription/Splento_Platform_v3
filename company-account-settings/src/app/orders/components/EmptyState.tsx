import { Button } from '@heroui/react';
import { Icon } from '@iconify/react';

interface EmptyStateProps {
    hasFilters: boolean;
    onClearFilters: () => void;
    onCreateOrder: () => void;
}

export function EmptyState({ hasFilters, onClearFilters, onCreateOrder }: EmptyStateProps) {
    if (hasFilters) {
        return (
            <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="w-16 h-16 rounded-full bg-content2 flex items-center justify-center mb-4">
                    <Icon icon="gravity-ui:magnifier" className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium text-foreground mb-2">
                    No orders found
                </h3>
                <p className="text-muted-foreground mb-6 max-w-sm">
                    No orders match your current filters. Try adjusting your search criteria.
                </p>
                <Button
                    variant="ghost"
                    onPress={onClearFilters}
                >
                    <Icon icon="gravity-ui:xmark" className="w-4 h-4" />
                    Clear filters
                </Button>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-16 h-16 rounded-full bg-content2 flex items-center justify-center mb-4">
                <Icon icon="gravity-ui:shopping-cart" className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium text-foreground mb-2">
                No orders yet
            </h3>
            <p className="text-muted-foreground mb-6 max-w-sm">
                Create your first order to get started with professional photography and videography services.
            </p>
            <Button
                variant="primary"
                onPress={onCreateOrder}
            >
                <Icon icon="gravity-ui:plus" className="w-4 h-4" />
                Create your first order
            </Button>
        </div>
    );
}
