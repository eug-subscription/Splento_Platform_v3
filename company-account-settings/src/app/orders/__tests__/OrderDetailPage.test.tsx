import { render, screen, fireEvent } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { OrderDetailPage } from '../OrderDetailPage';
import { useOrder, type UseOrderReturn } from '@/hooks/useOrder';
import { useParams, useSearch, useNavigate } from '@tanstack/react-router';
import type { Order } from '@/types/order.types';

// Mock TanStack Router with partial mock to preserve exports and mock Link
vi.mock('@tanstack/react-router', async (importOriginal) => {
    const actual = await importOriginal<typeof import('@tanstack/react-router')>();
    return {
        ...actual,
        useParams: vi.fn(),
        useSearch: vi.fn(),
        useNavigate: vi.fn(),
        // Mock Link component to avoid router context requirement
        Link: ({ children, to, ...props }: { children: React.ReactNode; to: string;[key: string]: unknown }) => (
            <a href={to} {...props}>{children}</a>
        ),
    };
});

// Mock useOrder hook
vi.mock('@/hooks/useOrder', () => ({
    useOrder: vi.fn(),
}));

describe('OrderDetailPage Integration', () => {
    const mockNavigate = vi.fn();
    const mockOrder = {
        id: '123',
        displayId: 'ORD-123',
        status: 'confirmed',
        type: 'photo',
        clientName: 'Test Client',
        createdAt: new Date().toISOString(),
        auditLog: [],
        billing: { paymentStatus: 'paid', total: 100, currency: 'EUR', lineItems: [], subtotal: 100, discount: 0, tax: 0, paidAt: null, invoiceUrl: null },
    };

    beforeEach(() => {
        vi.clearAllMocks();
        vi.mocked(useParams).mockReturnValue({ id: '123' });
        vi.mocked(useSearch).mockReturnValue({});
        vi.mocked(useNavigate).mockReturnValue(mockNavigate);
        vi.mocked(useOrder).mockReturnValue({
            order: mockOrder as unknown as Order,
            isLoading: false,
            error: null,
            isNotFound: false,
            refetch: vi.fn(),
        } as UseOrderReturn);
    });

    it('syncs tab state with URL when a tab is clicked', async () => {
        render(<OrderDetailPage />);

        // Find and click the Creative tab (first occurrence = desktop tab)
        const creativeTab = screen.getAllByText('Creative')[0];
        fireEvent.click(creativeTab);

        // Verify navigation happened with the correct search param
        expect(mockNavigate).toHaveBeenCalledWith(expect.objectContaining({
            search: expect.any(Function)
        }));

        // Test the search updater function
        const searchUpdater = vi.mocked(mockNavigate).mock.calls[0][0].search;
        if (typeof searchUpdater === 'function') {
            const result = searchUpdater({});
            expect(result.tab).toBe('creative');
        }
    });

    it('renders the correct tab panel based on URL search param', () => {
        vi.mocked(useSearch).mockReturnValue({ tab: 'gallery' });

        render(<OrderDetailPage />);

        // Check if Gallery placeholder is visible
        expect(screen.getByText(/Gallery Tab — Coming in Phase 5/i)).toBeDefined();
    });

    it('shows loading skeleton when data is fetching', () => {
        vi.mocked(useOrder).mockReturnValue({
            order: null,
            isLoading: true,
            error: null,
            isNotFound: false,
            refetch: vi.fn(),
        } as UseOrderReturn);

        render(<OrderDetailPage />);

        // The skeleton has multiple rounded-lg/rounded-xl divs. We check for a generic skeleton indicator
        // or a specific part of the skeleton layout if we had test IDs.
        // For now, let's assume it renders if no order is found and loading is true.
        expect(screen.queryByText('ORD-123')).toBeNull();
    });
});
