import { Button } from '@heroui/react';
import { Icon } from '@iconify/react';
import { useNavigate } from '@tanstack/react-router';

interface OrderNotFoundProps {
    orderId?: string;
}

/**
 * OrderNotFound component displays a friendly 404 state when an order is missing.
 */
export function OrderNotFound({ orderId }: OrderNotFoundProps) {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6 animate-in fade-in zoom-in duration-300">
            {/* Visual Icon */}
            <div className="w-20 h-20 rounded-full bg-content2 flex items-center justify-center mb-6 shadow-sm">
                <Icon icon="gravity-ui:circle-xmark" className="w-10 h-10 text-muted-foreground" />
            </div>

            {/* Title */}
            <h1 className="text-2xl font-bold text-foreground mb-2 tracking-tight">
                Order Not Found
            </h1>

            {/* Description */}
            <p className="text-muted-foreground mb-8 max-w-sm leading-relaxed">
                {orderId
                    ? `We couldn't find an order with ID "${orderId}". It may have been deleted or the link is incorrect.`
                    : "The order you're looking for doesn't exist or has been removed."
                }
            </p>

            {/* Action */}
            <Button
                variant="primary"
                size="lg"
                className="font-semibold shadow-lg shadow-accent/20 px-8"
                onPress={() => navigate({ to: '/orders' })}
            >
                <Icon icon="gravity-ui:arrow-left" className="w-4 h-4" />
                Back to Orders
            </Button>
        </div>
    );
}
