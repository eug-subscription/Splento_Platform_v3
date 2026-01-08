import { Icon } from '@iconify/react';
import { Button, Dropdown, Label, Tooltip } from '@heroui/react';
import { OrderStatusBadge } from './OrderStatusBadge';
import { OrderTypeBadge } from './OrderTypeBadge';
import { PaymentStatusBadge } from './PaymentStatusBadge';
import { formatRelativeTime } from '@/utils/date-utils';
import { toastSuccess } from '@/components/ui/toast';
import type { OrderListItem } from '@/types/order.types';

interface OrderTableRowProps {
    order: OrderListItem;
}

export function OrderTableRow({ order }: OrderTableRowProps) {
    const handleCopyId = () => {
        navigator.clipboard.writeText(order.displayId);
        toastSuccess(`Order ID ${order.displayId} copied to clipboard`);
    };

    return (
        <>
            {/* ID Column */}
            <td className="px-4 py-4 align-middle">
                <div className="flex items-center gap-2">
                    <span className="font-medium text-foreground text-sm tracking-tight leading-none group-hover:text-accent transition-colors whitespace-nowrap">
                        {order.displayId}
                    </span>
                    <div onClick={(e) => e.stopPropagation()}>
                        <Tooltip delay={0}>
                            <Button
                                variant="ghost"
                                size="sm"
                                isIconOnly
                                className="h-6 w-6 min-w-0 p-0 text-muted-foreground/60 hover:text-accent hover:bg-accent/10 rounded-md transition-all duration-200 opacity-0 group-hover:opacity-100"
                                onPress={handleCopyId}
                                aria-label="Copy order ID"
                            >
                                <Icon icon="gravity-ui:copy" className="w-3.5 h-3.5" />
                            </Button>
                            <Tooltip.Content>
                                <p>Copy ID</p>
                            </Tooltip.Content>
                        </Tooltip>
                    </div>
                </div>
            </td>

            {/* Type Column */}
            <td className="px-4 py-4 align-middle">
                <OrderTypeBadge type={order.type} />
            </td>

            {/* Name Column (Name + Location) */}
            <td className="px-4 py-4 align-middle">
                <div className="flex flex-col gap-0.5 items-start justify-center">
                    <span className="font-semibold text-foreground text-sm leading-tight">
                        {order.clientName}
                    </span>
                    {order.location && (
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-0.5">
                            <Icon
                                icon="gravity-ui:map-pin"
                                className="w-3.5 h-3.5 text-default-500 flex-shrink-0"
                            />
                            <span className="leading-none">{order.location}</span>
                        </div>
                    )}
                </div>
            </td>

            {/* Status */}
            <td className="px-4 py-4 align-middle">
                <OrderStatusBadge status={order.status} />
            </td>

            {/* Payment Status */}
            <td className="px-4 py-4 align-middle">
                <PaymentStatusBadge status={order.paymentStatus} />
            </td>

            {/* Created at */}
            <td className="px-4 py-4 align-middle">
                <span className="text-foreground text-sm font-medium">
                    {formatRelativeTime(order.createdAt)}
                </span>
            </td>

            {/* Created by */}
            <td className="px-4 py-4 align-middle">
                <span className="text-muted-foreground text-sm font-normal">
                    {order.createdBy}
                </span>
            </td>

            {/* Actions */}
            <td className="px-4 py-4 align-middle text-right">
                <div className="flex justify-end" onClick={(e) => e.stopPropagation()}>
                    <Dropdown>
                        <Dropdown.Trigger>
                            <Button
                                variant="ghost"
                                size="sm"
                                isIconOnly
                                className="h-8 w-8 min-w-0 p-0 text-muted-foreground hover:text-accent hover:bg-accent/10 rounded-full transition-colors active:scale-90"
                                aria-label="Order actions"
                            >
                                <Icon icon="gravity-ui:ellipsis-vertical" className="w-4 h-4" />
                            </Button>
                        </Dropdown.Trigger>
                        <Dropdown.Popover className="min-w-[140px]">
                            <Dropdown.Menu onAction={() => {
                                // Handled via specific item logic if needed or global handler
                            }}>
                                <Dropdown.Item id="open" textValue="Open">
                                    <div className="flex items-center gap-2">
                                        <Icon icon="gravity-ui:arrow-up-right-from-square" className="w-4 h-4" />
                                        <Label>Open</Label>
                                    </div>
                                </Dropdown.Item>
                                <Dropdown.Item id="delete" textValue="Delete" variant="danger">
                                    <div className="flex items-center gap-2">
                                        <Icon icon="gravity-ui:trash-bin" className="w-4 h-4" />
                                        <Label>Delete</Label>
                                    </div>
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown.Popover>
                    </Dropdown>
                </div>
            </td>
        </>
    );
}
