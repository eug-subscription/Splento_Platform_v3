import { renderHook, act } from '@testing-library/react';
import { useOrder } from '../useOrder';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { getOrderById } from '@/data/mock-orders';
import type { Order } from '@/types/order.types';

// Mock dependencies
vi.mock('@/data/mock-orders', () => ({
    getOrderById: vi.fn(),
}));

describe('useOrder Hook', () => {
    const mockOrder = {
        id: '123',
        displayId: 'ORD-123',
        status: 'confirmed',
        // ... add minimal properties needed for test
    };

    beforeEach(() => {
        vi.clearAllMocks();
        vi.useFakeTimers();
    });

    it('fetches order by ID successfully', async () => {
        vi.mocked(getOrderById).mockReturnValue(mockOrder as unknown as Order);

        const { result } = renderHook(() => useOrder('123'));

        // Initial state
        expect(result.current.isLoading).toBe(true);

        // Fast-forward delay (300ms)
        await act(async () => {
            vi.advanceTimersByTime(300);
        });

        expect(result.current.isLoading).toBe(false);
        expect(result.current.order).toEqual(mockOrder);
        expect(result.current.isNotFound).toBe(false);
        expect(result.current.error).toBeNull();
    });

    it('sets isNotFound correctly for invalid ID', async () => {
        vi.mocked(getOrderById).mockReturnValue(undefined);

        const { result } = renderHook(() => useOrder('invalid-id'));

        await act(async () => {
            vi.advanceTimersByTime(300);
        });

        expect(result.current.isLoading).toBe(false);
        expect(result.current.order).toBeNull();
        expect(result.current.isNotFound).toBe(true);
    });

    it('handles refetch with simulated delay', async () => {
        vi.mocked(getOrderById).mockReturnValue(mockOrder as unknown as Order);

        const { result } = renderHook(() => useOrder('123'));

        await act(async () => {
            vi.advanceTimersByTime(300);
        });

        expect(result.current.isLoading).toBe(false);

        act(() => {
            result.current.refetch();
        });

        expect(result.current.isLoading).toBe(true);

        await act(async () => {
            vi.advanceTimersByTime(300);
        });

        expect(result.current.isLoading).toBe(false);
        expect(result.current.order).toEqual(mockOrder);
    });
});
