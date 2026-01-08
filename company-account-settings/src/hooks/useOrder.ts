import { useState, useEffect, useMemo, useCallback } from 'react';
import { getOrderById } from '@/data/mock-orders';
import type { Order } from '@/types/order.types';

export interface UseOrderReturn {
    order: Order | null;
    isLoading: boolean;
    error: Error | null;
    isNotFound: boolean;
    refetch: () => void;
}

/**
 * Hook to fetch a single order by ID.
 * Implements simulated network delay and handles loading/error/404 states.
 */
export function useOrder(orderId: string): UseOrderReturn {
    const [order, setOrder] = useState<Order | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const [refetchCounter, setRefetchCounter] = useState(0);

    useEffect(() => {
        if (!orderId) return;

        let cancelled = false;
        setIsLoading(true);
        setError(null);

        // Simulate async fetch
        const timeoutId = setTimeout(() => {
            if (cancelled) return;

            try {
                const foundOrder = getOrderById(orderId);
                setOrder(foundOrder ?? null);
            } catch (err) {
                setError(err instanceof Error ? err : new Error('Failed to fetch order'));
            } finally {
                setIsLoading(false);
            }
        }, 300); // Simulate network delay

        return () => {
            cancelled = true;
            clearTimeout(timeoutId);
        };
    }, [orderId, refetchCounter]);

    const isNotFound = useMemo(() => {
        return !isLoading && !error && order === null;
    }, [isLoading, error, order]);

    const refetch = useCallback(() => {
        setRefetchCounter(c => c + 1);
    }, []);

    return {
        order,
        isLoading,
        error,
        isNotFound,
        refetch
    };
}
