import { useState, useEffect, useMemo, useCallback } from 'react';
import { useModal } from '@/hooks/useModal';
import type { ModalType, ModalData, OpenModalFn } from '@/types/modals';
import type { TeamBilling, BillingAlert, Invoice } from '../types/billing';
import { generateBillingAlerts } from '../utils/billing';
import {
    MOCK_SUBSCRIPTION_BILLING,
    MOCK_INVOICES
} from '../data/mock-billing';

interface UseBillingReturn {
    // Data
    billing: TeamBilling | null;
    invoices: Invoice[];
    alerts: BillingAlert[];

    // State
    isLoading: boolean;
    error: Error | null;

    // Modal states
    activeModal: ModalType | null;
    modalData: ModalData['data'] | null;
    openModal: OpenModalFn;
    closeModal: () => void;

    // Actions
    refreshBilling: () => Promise<void>;
    dismissAlert: (alertType: string) => void;
}

export function useBilling(): UseBillingReturn {
    const [billing, setBilling] = useState<TeamBilling | null>(null);
    const [invoices, setInvoices] = useState<Invoice[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const [dismissedAlerts, setDismissedAlerts] = useState<Set<string>>(new Set());

    const { activeModal, modalData, openModal, closeModal } = useModal();

    // Mock fetch billing data
    const fetchBilling = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 800));

            // For now, always return the subscription data
            // In a real app, we'd fetch based on teamId
            setBilling(MOCK_SUBSCRIPTION_BILLING);
            setInvoices(MOCK_INVOICES);
        } catch (err) {
            setError(err instanceof Error ? err : new Error('Failed to load billing information'));
        } finally {
            setIsLoading(false);
        }
    }, []); // teamId is static for mock fetch

    // Initial fetch
    useEffect(() => {
        fetchBilling();
    }, [fetchBilling]);

    // Generate alerts from billing state, filtering out dismissed ones
    const alerts = useMemo(() => {
        if (!billing) return [];
        const generatedAlerts = generateBillingAlerts(billing);
        return generatedAlerts.filter(alert => !dismissedAlerts.has(alert.id));
    }, [billing, dismissedAlerts]);

    const refreshBilling = async () => {
        await fetchBilling();
    };

    const dismissAlert = useCallback((alertId: string) => {
        setDismissedAlerts(prev => {
            const next = new Set(prev);
            next.add(alertId);
            return next;
        });
    }, []);

    return {
        billing,
        invoices,
        alerts,
        isLoading,
        error,
        activeModal,
        modalData,
        openModal,
        closeModal,
        refreshBilling,
        dismissAlert,
    };
}
