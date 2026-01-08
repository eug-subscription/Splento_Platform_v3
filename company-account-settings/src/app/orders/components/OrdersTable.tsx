import { Button, Surface } from '@heroui/react';
import { Icon } from '@iconify/react';
import { OrderTableRow } from './OrderTableRow';
import { OrderTableSkeleton } from './OrderTableSkeleton';
import { EmptyState } from './EmptyState';
import type { OrderListItem } from '@/types/order.types';
import type { OrderSort } from '@/hooks/useOrders';

interface OrdersTableProps {
    orders: OrderListItem[];
    isLoading: boolean;
    sort: OrderSort;
    onSort: (column: keyof OrderListItem) => void;
    onRowClick: (orderId: string) => void;
    // Pagination
    page: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    // Empty state
    hasActiveFilters: boolean;
    onClearFilters: () => void;
    onCreateOrder: () => void;
}

interface ColumnConfig {
    key: keyof OrderListItem | 'actions';
    label: string;
    sortable: boolean;
    align?: 'left' | 'center' | 'right';
    className?: string;
}

const COLUMNS: ColumnConfig[] = [
    { key: 'displayId', label: 'ID', sortable: true, align: 'left', className: 'w-44' },
    { key: 'clientName', label: 'NAME', sortable: true, align: 'left' },
    { key: 'type', label: 'TYPE', sortable: true, align: 'left' },
    { key: 'status', label: 'STATUS', sortable: true, align: 'left' },
    { key: 'paymentStatus', label: 'PAYMENT', sortable: true, align: 'left' },
    { key: 'createdAt', label: 'CREATED AT', sortable: true, align: 'left' },
    { key: 'createdBy', label: 'CREATED BY', sortable: true, align: 'left' },
    { key: 'actions', label: '', sortable: false, align: 'right', className: 'w-12' }
];

export function OrdersTable({
    orders,
    isLoading,
    sort,
    onSort,
    onRowClick,
    page,
    totalPages,
    onPageChange,
    hasActiveFilters,
    onClearFilters,
    onCreateOrder
}: OrdersTableProps) {
    // Empty state (only if not loading)
    if (!isLoading && orders.length === 0) {
        return (
            <EmptyState
                hasFilters={hasActiveFilters}
                onClearFilters={onClearFilters}
                onCreateOrder={onCreateOrder}
            />
        );
    }

    return (
        <div className="space-y-4">
            {/* Table Shell with Premium Surface */}
            <Surface
                variant="secondary"
                className="w-full overflow-hidden rounded-xl border-none shadow-sm"
            >
                <div className="w-full overflow-x-auto">
                    <table className="w-full min-w-full table-auto text-left border-collapse">
                        <thead className="bg-transparent text-muted-foreground font-medium text-tiny uppercase tracking-wider">
                            <tr>
                                {COLUMNS.map((column) => {
                                    const alignClass = column.align === 'right' ? 'text-right' : column.align === 'center' ? 'text-center' : 'text-left';

                                    return (
                                        <th
                                            key={column.key}
                                            className={`px-4 py-4 border-b border-separator ${column.className || ''} ${alignClass} group/header`}
                                        >
                                            <div className="flex items-center">
                                                {column.sortable ? (
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        className={`flex items-center gap-1.5 p-0 h-auto min-w-0 font-medium uppercase hover:bg-transparent data-[hover=true]:bg-transparent text-current transition-opacity hover:opacity-100 ${column.align === 'right' ? 'ml-auto' : column.align === 'center' ? 'mx-auto' : ''}`}
                                                        onPress={() => onSort(column.key as keyof OrderListItem)}
                                                    >
                                                        {column.label}
                                                        {sort.column === column.key ? (
                                                            <Icon
                                                                icon={sort.direction === 'asc' ? 'gravity-ui:arrow-up' : 'gravity-ui:arrow-down'}
                                                                className="w-3.5 h-3.5 text-accent opacity-100"
                                                            />
                                                        ) : (
                                                            <Icon
                                                                icon="gravity-ui:arrow-up"
                                                                className="w-3.5 h-3.5 opacity-0 group-hover/header:opacity-30 transition-opacity"
                                                            />
                                                        )}
                                                    </Button>
                                                ) : (
                                                    <span className={`uppercase ${column.align === 'right' ? 'ml-auto' : column.align === 'center' ? 'mx-auto' : ''}`}>
                                                        {column.label}
                                                    </span>
                                                )}
                                            </div>
                                        </th>
                                    );
                                })}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-separator/40">
                            {isLoading ? (
                                <OrderTableSkeleton />
                            ) : (
                                orders.map((order, index) => (
                                    <tr
                                        key={order.id}
                                        className={`group transition-all duration-300 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-accent/50 select-none ${index % 2 === 0 ? 'bg-background' : 'bg-content2/30'
                                            } hover:bg-accent/10 active:bg-content2/60`}
                                        onClick={() => onRowClick(order.id)}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter' || e.key === ' ') {
                                                e.preventDefault();
                                                onRowClick(order.id);
                                            }
                                        }}
                                        tabIndex={0}
                                        role="button"
                                        aria-label={`View details for order ${order.displayId}`}
                                    >
                                        <OrderTableRow order={order} />
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </Surface>

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2">
                    <Button
                        size="sm"
                        variant="ghost"
                        isDisabled={page === 1}
                        onPress={() => onPageChange(page - 1)}
                        isIconOnly
                    >
                        <Icon icon="gravity-ui:chevron-left" className="w-4 h-4" />
                    </Button>

                    <span className="text-tiny text-muted-foreground">
                        Page {page} of {totalPages}
                    </span>

                    <Button
                        size="sm"
                        variant="ghost"
                        isDisabled={page === totalPages}
                        onPress={() => onPageChange(page + 1)}
                        isIconOnly
                    >
                        <Icon icon="gravity-ui:chevron-right" className="w-4 h-4" />
                    </Button>
                </div>
            )}
        </div>
    );
}
