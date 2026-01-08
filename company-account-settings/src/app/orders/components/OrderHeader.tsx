import { Button, Dropdown, Label } from '@heroui/react';
import { Icon } from '@iconify/react';
import { useNavigate, Link } from '@tanstack/react-router';
import { OrderStatusBadge } from './OrderStatusBadge';
import { OrderTypeBadge } from './OrderTypeBadge';
import { formatRelativeTime } from '@/utils/format';
import type { Order } from '@/types/order.types';

export interface OrderHeaderProps {
    order: Order;
    onCancelOrder?: () => void;
}

/**
 * OrderHeader component displays the main information about an order
 * including ID, status, type, and provides common actions.
 */
export function OrderHeader({ order, onCancelOrder }: OrderHeaderProps) {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate({ to: '/orders' });
    };

    // Determine if order can be cancelled
    const canCancel = ['draft', 'pending_confirmation', 'confirmed', 'scheduled'].includes(order.status);

    // Format created date (MMM DD, YYYY pattern from design system)
    const createdDate = new Date(order.createdAt).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    });

    return (
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between px-1">
            {/* Left/Top: Back button + Order info */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                {/* Back button */}
                <div className="flex items-center">
                    <Button
                        isIconOnly
                        variant="ghost"
                        size="md"
                        className="hover:bg-accent/10 hover:text-accent rounded-xl"
                        onPress={handleBack}
                        aria-label="Back to orders"
                    >
                        <Icon icon="gravity-ui:arrow-left" className="w-5 h-5" />
                    </Button>
                </div>

                {/* Order info */}
                <div className="flex flex-col gap-1.5">
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                        <h1 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight">
                            {order.displayId}
                        </h1>
                        <div className="flex items-center gap-2">
                            <OrderStatusBadge status={order.status} size="md" />
                            <OrderTypeBadge type={order.type} size="md" />
                        </div>
                    </div>

                    {/* Breadcrumbs */}
                    <nav className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium" aria-label="Breadcrumb">
                        <Link
                            to="/dashboard"
                            className="hover:text-accent transition-colors underline-offset-4 hover:underline"
                        >
                            Dashboard
                        </Link>
                        <Icon icon="gravity-ui:chevron-right" className="w-3 h-3 opacity-50" />
                        <Link
                            to="/orders"
                            className="hover:text-accent transition-colors underline-offset-4 hover:underline"
                        >
                            Orders
                        </Link>
                        <Icon icon="gravity-ui:chevron-right" className="w-3 h-3 opacity-50" />
                        <span className="text-foreground/60">{order.displayId}</span>
                    </nav>

                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted-foreground font-medium pt-1">
                        <span className="text-foreground/80">{order.clientName}</span>
                        <span className="opacity-50">•</span>
                        <span>Created {createdDate}</span>
                        {order.assignedTo && (
                            <>
                                <span className="opacity-50">•</span>
                                <span className="flex items-center gap-1.5 bg-content3/50 px-2 py-0.5 rounded-full text-xs">
                                    <Icon icon="gravity-ui:person" className="w-3.5 h-3.5 text-accent" />
                                    {order.assignedTo.name}
                                </span>
                            </>
                        )}
                        <span className="opacity-50">•</span>
                        <span className="text-xs italic">{formatRelativeTime(order.createdAt)}</span>
                    </div>
                </div>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-2 sm:ml-auto">
                {/* Primary action based on status (Phase 5/6 will fill this more) */}
                {order.status === 'review' && (
                    <Button
                        variant="primary"
                        className="shadow-md shadow-accent/20"
                        onPress={() => navigate({ to: '/orders/$id', params: { id: order.id }, search: { tab: 'gallery' } })}
                    >
                        <Icon icon="gravity-ui:picture" className="w-4 h-4" />
                        Review Gallery
                    </Button>
                )}

                {/* More actions dropdown */}
                <Dropdown>
                    <Dropdown.Trigger>
                        <Button
                            isIconOnly
                            variant="secondary"
                            className="bg-content2 text-muted-foreground hover:bg-content3 hover:text-foreground"
                            aria-label="More actions"
                        >
                            <Icon icon="gravity-ui:ellipsis" className="w-5 h-5" />
                        </Button>
                    </Dropdown.Trigger>
                    <Dropdown.Popover className="min-w-[180px] p-1 shadow-xl">
                        <Dropdown.Menu aria-label="Order actions">
                            <Dropdown.Item
                                key="copy-id"
                                textValue="Copy Order ID"
                                onPress={() => {
                                    navigator.clipboard.writeText(order.displayId);
                                }}
                            >
                                <div className="flex items-center gap-2">
                                    <Icon icon="gravity-ui:copy" className="w-4 h-4" />
                                    <Label>Copy Order ID</Label>
                                </div>
                            </Dropdown.Item>

                            <Dropdown.Item
                                key="invoice"
                                textValue="Download Invoice"
                                isDisabled={!order.billing.invoiceUrl}
                                onPress={() => {
                                    if (order.billing.invoiceUrl) {
                                        window.open(order.billing.invoiceUrl, '_blank');
                                    }
                                }}
                            >
                                <div className="flex items-center gap-2">
                                    <Icon icon="gravity-ui:file-arrow-down" className="w-4 h-4" />
                                    <Label>Download Invoice</Label>
                                </div>
                            </Dropdown.Item>

                            <Dropdown.Item
                                key="cancel"
                                variant="danger"
                                textValue="Cancel Order"
                                isDisabled={!canCancel}
                                onPress={onCancelOrder}
                            >
                                <div className="flex items-center gap-2">
                                    <Icon icon="gravity-ui:circle-xmark" className="w-4 h-4" />
                                    <Label>Cancel Order</Label>
                                </div>
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown.Popover>
                </Dropdown>
            </div>
        </header>
    );
}
