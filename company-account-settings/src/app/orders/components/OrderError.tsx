import { Button } from '@heroui/react';
import { Icon } from '@iconify/react';

interface OrderErrorProps {
    error: Error;
    onRetry: () => void;
}

/**
 * OrderError component displays a friendly error state when an order fails to load.
 */
export function OrderError({ error, onRetry }: OrderErrorProps) {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6 animate-in fade-in zoom-in duration-300">
            {/* Visual Icon with Danger Soft Background */}
            <div className="w-20 h-20 rounded-full bg-danger/10 flex items-center justify-center mb-6 shadow-sm">
                <Icon icon="gravity-ui:triangle-exclamation" className="w-10 h-10 text-danger" />
            </div>

            {/* Title */}
            <h1 className="text-2xl font-bold text-foreground mb-2 tracking-tight">
                Something went wrong
            </h1>

            {/* Friendly Description */}
            <p className="text-muted-foreground mb-2 max-w-sm leading-relaxed">
                We couldn't load this order. This might be a temporary issue or a connection problem.
            </p>

            {/* Technical Error (for debugging) */}
            <div className="bg-content2 px-4 py-2 rounded-lg mb-8 max-w-md">
                <p className="text-xs font-mono text-danger font-medium break-all">
                    {error.message}
                </p>
            </div>

            {/* Action */}
            <Button
                variant="primary"
                size="lg"
                className="font-semibold shadow-lg shadow-accent/20 px-8"
                onPress={onRetry}
            >
                <Icon icon="gravity-ui:arrow-rotate-left" className="w-4 h-4" />
                Try Again
            </Button>
        </div>
    );
}
