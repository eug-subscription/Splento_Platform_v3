import { useNavigate } from '@tanstack/react-router';
import { useState, useCallback } from 'react';
import { subDays, startOfMonth, endOfMonth, startOfYear, format } from 'date-fns';
import { useOrders } from '@/hooks/useOrders';
import { PageHeader } from './components/PageHeader';
import { StatsBar } from './components/StatsBar';
import { OrderFilters } from './components/OrderFilters';
import { OrdersTable } from './components/OrdersTable';
import { TimeRangeSelector } from './components/TimeRangeSelector';

export function OrdersPage() {
    const navigate = useNavigate();
    const {
        orders,
        totalOrders,
        totalPages,
        filters,
        setFilter,
        clearFilters,
        hasActiveFilters,
        sort,
        setSort,
        page,
        setPage,
        isLoading,
        stats
    } = useOrders({ pageSize: 10 });

    const [selectedPeriod, setSelectedPeriod] = useState('all-time');

    const handlePeriodChange = useCallback((periodId: string) => {
        setSelectedPeriod(periodId);

        let from: string | null = null;
        let to: string | null = null;
        const now = new Date();

        switch (periodId) {
            case 'this-month':
                from = format(startOfMonth(now), 'yyyy-MM-dd');
                to = format(endOfMonth(now), 'yyyy-MM-dd');
                break;
            case 'last-month': {
                const lastMonth = subDays(startOfMonth(now), 1);
                from = format(startOfMonth(lastMonth), 'yyyy-MM-dd');
                to = format(endOfMonth(lastMonth), 'yyyy-MM-dd');
                break;
            }
            case 'last-90-days':
                from = format(subDays(now, 90), 'yyyy-MM-dd');
                to = format(now, 'yyyy-MM-dd');
                break;
            case 'this-year':
                from = format(startOfYear(now), 'yyyy-MM-dd');
                break;
            default:
                from = null;
                to = null;
        }

        setFilter('dateFrom', from);
        setFilter('dateTo', to);
    }, [setFilter]);

    const handleRowClick = (orderId: string) => {
        navigate({ to: '/orders/$id', params: { id: orderId } });
    };

    const handleCreateOrder = () => {
    };

    return (
        <div className="p-6 space-y-6">
            <PageHeader
                title="Orders"
                subtitle={`${totalOrders} orders`}
                onCreateOrder={handleCreateOrder}
            >
                <TimeRangeSelector
                    selectedPeriod={selectedPeriod}
                    onPeriodChange={handlePeriodChange}
                />
            </PageHeader>

            <StatsBar
                stats={stats}
                isLoading={isLoading}
                onStatPress={(status) => setFilter('status', status)}
            />

            <OrderFilters
                filters={filters}
                onFilterChange={setFilter}
                onClearFilters={clearFilters}
                hasActiveFilters={hasActiveFilters}
            />

            <OrdersTable
                orders={orders}
                isLoading={isLoading}
                sort={sort}
                onSort={setSort}
                onRowClick={handleRowClick}
                page={page}
                totalPages={totalPages}
                onPageChange={setPage}
                hasActiveFilters={hasActiveFilters}
                onClearFilters={clearFilters}
                onCreateOrder={handleCreateOrder}
            />
        </div>
    );
}
