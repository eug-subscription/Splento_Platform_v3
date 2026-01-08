import { renderHook, act } from '@testing-library/react';
import { useOrders } from '../useOrders';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { getOrderListItems } from '@/data/mock-orders';
import type { OrderListItem } from '@/types/order.types';

// Mock dependencies
vi.mock('@tanstack/react-router', () => ({
    useSearch: vi.fn(),
    useNavigate: vi.fn(),
}));

vi.mock('@/data/mock-orders', () => ({
    getOrderListItems: vi.fn(),
}));

import { useSearch, useNavigate } from '@tanstack/react-router';

interface MockSearchParams {
    search?: string;
    status?: string;
    type?: string;
    payment?: string;
    from?: string;
    to?: string;
    sortBy?: string;
    sortDir?: string;
    page?: string;
}

describe('useOrders Hook', () => {
    const mockNavigate = vi.fn();
    const mockOrders: OrderListItem[] = [
        {
            id: '1',
            displayId: 'ORD-001',
            clientName: 'Alice Smith',
            type: 'photo',
            status: 'confirmed',
            paymentStatus: 'paid',
            total: 500,
            sessionDate: '2023-10-01',
            createdAt: '2023-09-01',
            createdBy: 'user-1',
            location: 'London, UK',
            currency: 'EUR'
        },
        {
            id: '2',
            displayId: 'ORD-002',
            clientName: 'Bob Jones',
            type: 'video',
            status: 'pending_confirmation',
            paymentStatus: 'pending',
            total: 1200,
            sessionDate: '2023-11-01',
            createdAt: '2023-09-02',
            createdBy: 'user-1',
            location: 'London, UK',
            currency: 'EUR'
        },
        {
            id: '3',
            displayId: 'ORD-003',
            clientName: 'Charlie Day',
            type: 'photo',
            status: 'completed',
            paymentStatus: 'paid',
            total: 300,
            sessionDate: '2023-09-15',
            createdAt: '2023-09-03',
            createdBy: 'user-1',
            location: 'London, UK',
            currency: 'EUR'
        }
    ];

    beforeEach(() => {
        vi.clearAllMocks();
        vi.mocked(useNavigate).mockReturnValue(mockNavigate);
        vi.mocked(getOrderListItems).mockReturnValue(mockOrders);
        vi.mocked(useSearch).mockReturnValue({} as MockSearchParams); // Default empty search
    });

    it('returns initial orders and stats', () => {
        const { result } = renderHook(() => useOrders());

        expect(result.current.orders).toHaveLength(3);
        expect(result.current.totalOrders).toBe(3);
        expect(result.current.stats.total).toBe(3);
        expect(result.current.isLoading).toBe(false);
    });

    it('filters by status', () => {
        vi.mocked(useSearch).mockReturnValue({ status: 'confirmed' } as MockSearchParams);
        const { result } = renderHook(() => useOrders());

        expect(result.current.orders).toHaveLength(1);
        expect(result.current.orders[0].displayId).toBe('ORD-001');
        expect(result.current.filters.status).toEqual(['confirmed']);
    });

    it('filters by type', () => {
        vi.mocked(useSearch).mockReturnValue({ type: 'video' } as MockSearchParams);
        const { result } = renderHook(() => useOrders());

        expect(result.current.orders).toHaveLength(1);
        expect(result.current.orders[0].type).toBe('video');
    });

    it('filters by search text', () => {
        vi.mocked(useSearch).mockReturnValue({ search: 'Alice' } as MockSearchParams);
        const { result } = renderHook(() => useOrders());

        expect(result.current.orders).toHaveLength(1);
        expect(result.current.orders[0].clientName).toBe('Alice Smith');
    });

    it('updates filters via setFilter', () => {
        const { result } = renderHook(() => useOrders());

        act(() => {
            result.current.setFilter('search', 'Bob');
        });

        // Check if navigate was called with correct params
        expect(mockNavigate).toHaveBeenCalledWith(expect.objectContaining({
            search: expect.objectContaining({ search: 'Bob' })
        }));
    });

    it('handles pagination', () => {
        // Mock a larger list to test paging
        const manyOrders = Array.from({ length: 15 }, (_, i) => ({
            ...mockOrders[0],
            id: String(i),
            displayId: `ORD-${i}`
        }));
        vi.mocked(getOrderListItems).mockReturnValue(manyOrders);

        // Page 1
        vi.mocked(useSearch).mockReturnValue({ page: '1' } as MockSearchParams);
        const { result: r1 } = renderHook(() => useOrders({ pageSize: 10 }));
        expect(r1.current.orders).toHaveLength(10);
        expect(r1.current.page).toBe(1);

        // Page 2
        vi.mocked(useSearch).mockReturnValue({ page: '2' } as MockSearchParams);
        const { result: r2 } = renderHook(() => useOrders({ pageSize: 10 }));
        expect(r2.current.orders).toHaveLength(5);
        expect(r2.current.page).toBe(2);
    });

    it('sorts orders', () => {
        vi.mocked(useSearch).mockReturnValue({ sortBy: 'total', sortDir: 'asc' } as MockSearchParams);
        const { result } = renderHook(() => useOrders());

        expect(result.current.orders[0].total).toBe(300); // 300
        expect(result.current.orders[1].total).toBe(500); // 500
        expect(result.current.orders[2].total).toBe(1200); // 1200
    });
});
