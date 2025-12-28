import { useState, useEffect, useMemo, useCallback } from 'react';
import type { TeamBilling, BillingAlert, Invoice, ModalType } from '../types/billing';
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
    openModal: (modal: ModalType) => void;
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
    const [activeModal, setActiveModal] = useState<ModalType | null>(null);
    const [dismissedAlerts, setDismissedAlerts] = useState<Set<string>>(new Set());

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

    const openModal = useCallback((modal: ModalType) => {
        setActiveModal(modal);
    }, []);

    const closeModal = useCallback(() => {
        setActiveModal(null);
    }, []);

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
        openModal,
        closeModal,
        refreshBilling,
        dismissAlert,
    };
}
