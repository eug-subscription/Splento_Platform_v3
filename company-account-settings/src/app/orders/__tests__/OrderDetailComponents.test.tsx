import { render, screen, fireEvent } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { OrderHeader } from '../components/OrderHeader';
import { OrderTabs } from '../components/OrderTabs';
import { OrderNotFound } from '../components/OrderNotFound';
import { OrderError } from '../components/OrderError';
import type { Order } from '@/types/order.types';

// Mock TanStack Router with partial mock to preserve exports and mock Link
vi.mock('@tanstack/react-router', async (importOriginal) => {
    const actual = await importOriginal<typeof import('@tanstack/react-router')>();
    return {
        ...actual,
        useNavigate: vi.fn(),
        // Mock Link component to avoid router context requirement
        Link: ({ children, to, ...props }: { children: React.ReactNode; to: string;[key: string]: unknown }) => (
            <a href={to} {...props}>{children}</a>
        ),
    };
});

import { useNavigate } from '@tanstack/react-router';

// Mock Order Data
const mockOrder: Partial<Order> = {
    id: '123',
    displayId: 'ORD-123',
    status: 'confirmed',
    type: 'photo',
    clientName: 'Test Client',
    createdAt: new Date().toISOString(),
    auditLog: [],
    billing: { paymentStatus: 'paid', total: 100, currency: 'EUR', lineItems: [], subtotal: 100, discount: 0, tax: 0, paidAt: null, invoiceUrl: null },
};

describe('Order Detail Components', () => {
    const mockNavigate = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
        vi.mocked(useNavigate).mockReturnValue(mockNavigate);
    });

    describe('OrderHeader', () => {
        it('displays basic order info correctly', () => {
            render(<OrderHeader order={mockOrder as Order} />);
            // ORD-123 appears twice: in h1 heading and breadcrumb, so use getAllByText
            expect(screen.getAllByText('ORD-123').length).toBeGreaterThan(0);
            expect(screen.getByText('Test Client')).toBeDefined();
        });

        it('navigates back when back button is pressed', () => {
            render(<OrderHeader order={mockOrder as Order} />);
            const backBtn = screen.getByLabelText('Back to orders');
            fireEvent.click(backBtn);
            expect(mockNavigate).toHaveBeenCalledWith({ to: '/orders' });
        });

        it('disables cancel action for completed orders', () => {
            const completedOrder = { ...mockOrder, status: 'completed' } as Order;
            render(<OrderHeader order={completedOrder} />);

            // Dropdown items are usually not rendered until trigger is clicked
            const trigger = screen.getByLabelText('More actions');
            fireEvent.click(trigger);

            // The item should have aria-disabled or be disabled in some way
            const cancelItem = screen.getByText('Cancel Order').closest('div[role="menuitem"]');
            expect(cancelItem?.getAttribute('aria-disabled')).toBe('true');
        });
    });

    describe('OrderTabs', () => {
        it('renders all 5 tabs defined in constants', () => {
            render(<OrderTabs selectedTab="overview" onTabChange={vi.fn()} order={mockOrder as Order} />);
            // Use getAllByText()[0] to get desktop tabs (first occurrence), since mobile dropdown also contains same text
            expect(screen.getAllByText('Overview')[0]).toBeDefined();
            expect(screen.getAllByText('Creative')[0]).toBeDefined();
            expect(screen.getAllByText('Gallery')[0]).toBeDefined();
            expect(screen.getAllByText('Billing')[0]).toBeDefined();
            expect(screen.getAllByText('Activity')[0]).toBeDefined();
        });

        it('calls onTabChange with correct ID when a tab is clicked', () => {
            const onTabChange = vi.fn();
            render(<OrderTabs selectedTab="overview" onTabChange={onTabChange} order={mockOrder as Order} />);

            // Click the first occurrence (desktop tab)
            fireEvent.click(screen.getAllByText('Gallery')[0]);
            expect(onTabChange).toHaveBeenCalledWith('gallery');
        });
    });

    describe('OrderNotFound', () => {
        it('shows the provided order ID in the message', () => {
            render(<OrderNotFound orderId="ORD-MISSING" />);
            expect(screen.getByText(/ORD-MISSING/)).toBeDefined();
        });
    });

    describe('OrderError', () => {
        it('shows error message and calls onRetry', () => {
            const onRetry = vi.fn();
            render(<OrderError error={new Error('Test Error')} onRetry={onRetry} />);

            expect(screen.getByText('Test Error')).toBeDefined();
            fireEvent.click(screen.getByText('Try Again'));
            expect(onRetry).toHaveBeenCalled();
        });
    });
});
