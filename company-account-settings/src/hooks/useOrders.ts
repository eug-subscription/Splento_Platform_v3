import { useState, useMemo, useCallback } from 'react';
import { useSearch, useNavigate } from '@tanstack/react-router';
import { getOrderListItems } from '@/data/mock-orders';
import type { OrderListItem, OrderStatus, OrderType, PaymentStatus } from '@/types/order.types';

export interface OrderFilters {
    search: string;
    status: OrderStatus[] | 'all';
    type: OrderType[] | 'all';
    paymentStatus: PaymentStatus[] | 'all';
    dateFrom: string | null;
    dateTo: string | null;
}

export interface OrderSort {
    column: keyof OrderListItem | null;
    direction: 'asc' | 'desc';
}

export interface UseOrdersOptions {
    pageSize?: number;
}

export interface UseOrdersReturn {
    // Data
    orders: OrderListItem[];
    totalOrders: number;
    totalPages: number;

    // Filters
    filters: OrderFilters;
    setFilter: <K extends keyof OrderFilters>(key: K, value: OrderFilters[K] | OrderStatus | OrderType | PaymentStatus) => void;
    clearFilters: () => void;
    hasActiveFilters: boolean;

    // Sorting
    sort: OrderSort;
    setSort: (column: keyof OrderListItem) => void;

    // Pagination
    page: number;
    setPage: (page: number) => void;
    pageSize: number;

    // State
    isLoading: boolean;
    error: Error | null;

    // Stats
    stats: OrderStats;
}

export interface OrderStats {
    total: number;
    scheduled: number;
    inProgress: number;
    pendingReview: number;
    completed: number;
}

const DEFAULT_SORT: OrderSort = {
    column: 'createdAt',
    direction: 'desc'
};

export function useOrders(options: UseOrdersOptions = {}): UseOrdersReturn {
    const { pageSize = 10 } = options;
    const navigate = useNavigate();

    // Get URL search params

    interface OrdersSearchParams {
        search?: string;
        status?: string;
        type?: string;
        payment?: string;
        from?: string;
        to?: string;
        sortBy?: keyof OrderListItem;
        sortDir?: 'asc' | 'desc';
        page?: number | string;
    }

    const searchParams = useSearch({ strict: false }) as OrdersSearchParams;

    // Parse filters from URL
    const filters: OrderFilters = useMemo(() => ({
        search: (searchParams.search as string) || '',
        status: searchParams.status ? (searchParams.status.split(',') as OrderStatus[]) : 'all',
        type: searchParams.type ? (searchParams.type.split(',') as OrderType[]) : 'all',
        paymentStatus: searchParams.payment ? (searchParams.payment.split(',') as PaymentStatus[]) : 'all',
        dateFrom: (searchParams.from as string) || null,
        dateTo: (searchParams.to as string) || null
    }), [searchParams]);

    // Parse sort from URL
    const sort: OrderSort = useMemo(() => ({
        column: (searchParams.sortBy as keyof OrderListItem) || DEFAULT_SORT.column,
        direction: (searchParams.sortDir as 'asc' | 'desc') || DEFAULT_SORT.direction
    }), [searchParams]);

    // Parse page from URL
    const page = Number(searchParams.page) || 1;

    // Loading state (for future API integration)
    const [isLoading] = useState(false);
    const [error] = useState<Error | null>(null);

    // Get all orders from mock data
    const allOrders = useMemo(() => getOrderListItems(), []);

    // Calculate stats (before filtering)
    const stats: OrderStats = useMemo(() => ({
        total: allOrders.length,
        scheduled: allOrders.filter(o => o.status === 'scheduled').length,
        inProgress: allOrders.filter(o =>
            ['confirmed', 'in_progress', 'editing'].includes(o.status)
        ).length,
        pendingReview: allOrders.filter(o =>
            ['review', 'revision_requested'].includes(o.status)
        ).length,
        completed: allOrders.filter(o =>
            ['delivered', 'completed'].includes(o.status)
        ).length
    }), [allOrders]);

    // Apply filters
    const filteredOrders = useMemo(() => {
        let result = [...allOrders];

        // Search filter
        if (filters.search) {
            const searchLower = filters.search.toLowerCase();
            result = result.filter(order =>
                order.displayId.toLowerCase().includes(searchLower) ||
                order.clientName.toLowerCase().includes(searchLower)
            );
        }

        // Status filter
        if (filters.status !== 'all' && filters.status.length > 0) {
            result = result.filter(order => filters.status.includes(order.status));
        }

        // Type filter
        if (filters.type !== 'all' && filters.type.length > 0) {
            result = result.filter(order => filters.type.includes(order.type));
        }

        // Payment status filter
        if (filters.paymentStatus !== 'all' && filters.paymentStatus.length > 0) {
            result = result.filter(order => filters.paymentStatus.includes(order.paymentStatus));
        }

        // Date range filter
        if (filters.dateFrom) {
            result = result.filter(order =>
                order.sessionDate && order.sessionDate >= filters.dateFrom!
            );
        }
        if (filters.dateTo) {
            result = result.filter(order =>
                order.sessionDate && order.sessionDate <= filters.dateTo!
            );
        }

        return result;
    }, [allOrders, filters]);

    // Apply sorting
    const sortedOrders = useMemo(() => {
        if (!sort.column) return filteredOrders;

        return [...filteredOrders].sort((a, b) => {
            const aVal = a[sort.column!];
            const bVal = b[sort.column!];

            // Handle nulls
            if (aVal === null && bVal === null) return 0;
            if (aVal === null) return 1;
            if (bVal === null) return -1;

            // Compare
            let comparison = 0;
            if (typeof aVal === 'string' && typeof bVal === 'string') {
                comparison = aVal.localeCompare(bVal);
            } else if (typeof aVal === 'number' && typeof bVal === 'number') {
                comparison = aVal - bVal;
            }

            return sort.direction === 'asc' ? comparison : -comparison;
        });
    }, [filteredOrders, sort]);

    // Apply pagination
    const paginatedOrders = useMemo(() => {
        const start = (page - 1) * pageSize;
        return sortedOrders.slice(start, start + pageSize);
    }, [sortedOrders, page, pageSize]);

    // Update URL when filters change
    const updateUrl = useCallback((updates: Record<string, string | null>) => {
        // We need to merge with existing query params
        // Navigate options { search: ... } replaces the search object
        // So we construct the new search object from current state + updates

        const currentSearch = {
            search: filters.search || undefined,
            status: filters.status !== 'all' && filters.status.length > 0 ? filters.status.join(',') : undefined,
            type: filters.type !== 'all' && filters.type.length > 0 ? filters.type.join(',') : undefined,
            payment: filters.paymentStatus !== 'all' && filters.paymentStatus.length > 0 ? filters.paymentStatus.join(',') : undefined,
            from: filters.dateFrom || undefined,
            to: filters.dateTo || undefined,
            sortBy: sort.column || undefined,
            sortDir: sort.direction || undefined,
            page: page > 1 ? String(page) : undefined,
        };

        const newSearch: Record<string, unknown> = { ...currentSearch };

        Object.entries(updates).forEach(([key, value]) => {
            if (value === null || value === '' || value === 'all') {
                delete newSearch[key];
            } else {
                newSearch[key] = value;
            }
        });

        // Reset page when filters change (if filter keys are present in updates)
        // We detect if this is a filter update by checking typical filter keys
        const isFilterUpdate = ['search', 'status', 'type', 'payment', 'from', 'to'].some(k => k in updates);
        if (isFilterUpdate && !('page' in updates)) {
            delete newSearch.page;
        }

        navigate({
            to: '.',
            search: newSearch,
            replace: true // Replace history entry for filters to avoid polluting back history too much
        });
    }, [navigate, filters, sort, page]);

    // Filter setters
    const setFilter = useCallback(<K extends keyof OrderFilters>(
        key: K,
        value: OrderFilters[K] | OrderStatus | OrderType | PaymentStatus
    ) => {
        const urlKey = key === 'paymentStatus' ? 'payment' :
            key === 'dateFrom' ? 'from' :
                key === 'dateTo' ? 'to' : key;

        let finalValue: unknown = value;

        // If it's one of our multi-select filters and we received a single string value, wrap it in an array
        if (['status', 'type', 'paymentStatus'].includes(key as string) && typeof value === 'string' && value !== 'all') {
            finalValue = [value];
        }

        const stringValue = Array.isArray(finalValue) ? finalValue.join(',') : (finalValue as string | null);
        updateUrl({ [urlKey]: stringValue as string });
    }, [updateUrl]);

    const clearFilters = useCallback(() => {
        navigate({ to: '.', search: {} });
    }, [navigate]);

    const hasActiveFilters = useMemo(() =>
        filters.search !== '' ||
        (filters.status !== 'all' && filters.status.length > 0) ||
        (filters.type !== 'all' && filters.type.length > 0) ||
        (filters.paymentStatus !== 'all' && filters.paymentStatus.length > 0) ||
        filters.dateFrom !== null ||
        filters.dateTo !== null,
        [filters]
    );

    // Sort setter
    const setSort = useCallback((column: keyof OrderListItem) => {
        // If clicking same column, toggle direction. If different, default to asc.
        const newDirection =
            sort.column === column && sort.direction === 'desc' ? 'asc' : 'desc';

        // Default for new column is usually desc for dates, but let's stick to simple toggle logic or specific defaults
        // If it's a new column, let's default to 'asc' unless it's a date/amount

        updateUrl({
            sortBy: column,
            sortDir: newDirection
        });
    }, [sort, updateUrl]);

    // Page setter
    const setPage = useCallback((newPage: number) => {
        updateUrl({ page: newPage > 1 ? String(newPage) : null });
    }, [updateUrl]);

    return {
        orders: paginatedOrders,
        totalOrders: sortedOrders.length,
        totalPages: Math.ceil(sortedOrders.length / pageSize),
        filters,
        setFilter,
        clearFilters,
        hasActiveFilters,
        sort,
        setSort,
        page,
        setPage,
        pageSize,
        isLoading,
        error,
        stats
    };
}
