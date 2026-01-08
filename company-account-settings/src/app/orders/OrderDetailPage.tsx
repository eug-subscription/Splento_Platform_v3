import { useParams, useSearch, useNavigate } from '@tanstack/react-router';
import { useOrder } from '@/hooks/useOrder';
import { OrderHeader } from './components/OrderHeader';
import { OrderTabs } from './components/OrderTabs';
import { TabPanel } from './components/TabPanel';
import { OrderNotFound } from './components/OrderNotFound';
import { OrderError } from './components/OrderError';
import { OrderDetailSkeleton } from './components/OrderDetailSkeleton';
import { OverviewTab, CreativeTab, GalleryTab, BillingTab, ActivityTab } from './tabs';
import { ORDER_TABS, type OrderTabId } from '@/data/order-constants';

/**
 * OrderDetailPage is the main container for the single order view.
 * It coordinates data fetching, loading/error states, and tab-based navigation.
 */
export function OrderDetailPage() {
    const { id } = useParams({ from: '/dashboard-shell/orders/$id' });
    const navigate = useNavigate();
    const searchParams = useSearch({ from: '/dashboard-shell/orders/$id' });

    // Get current tab from URL and validate against known tabs
    const validTabIds = ORDER_TABS.map(t => t.id);
    const currentTab = (validTabIds.includes(searchParams.tab as OrderTabId)
        ? searchParams.tab
        : 'overview') as OrderTabId;

    // Fetch order data using the custom hook
    const { order, isLoading, error, isNotFound, refetch } = useOrder(id);

    /**
     * Updates the URL search parameters when a tab is changed.
     */
    const handleTabChange = (tabId: OrderTabId) => {
        navigate({
            to: '/orders/$id',
            params: { id },
            search: (prev) => ({ ...prev, tab: tabId === 'overview' ? undefined : tabId })
        });
    };

    /**
     * Placeholder for the cancel order flow (Phase 7).
     */
    const handleCancelOrder = () => {
        // Intentionally empty - Modal integration pending Phase 7
    };

    // 1. Loading State (Skeleton)
    if (isLoading) {
        return <OrderDetailSkeleton />;
    }

    // 2. Error State (Retry View)
    if (error) {
        return <OrderError error={error} onRetry={refetch} />;
    }

    // 3. Not Found State (404 View)
    if (isNotFound || !order) {
        return <OrderNotFound orderId={id} />;
    }

    // 4. Success State (Main UI)
    return (
        <div className="p-4 sm:p-6 space-y-6 max-w-[1600px] mx-auto animate-in fade-in duration-500">
            {/* Actionable Header */}
            <OrderHeader order={order} onCancelOrder={handleCancelOrder} />

            {/* URL-Synced Navigation */}
            <OrderTabs
                selectedTab={currentTab}
                onTabChange={handleTabChange}
                order={order}
            />

            {/* Dynamic Content Sections */}
            <div className="min-h-[500px]">
                <TabPanel isActive={currentTab === 'overview'}>
                    <OverviewTab order={order} />
                </TabPanel>

                <TabPanel isActive={currentTab === 'creative'}>
                    <CreativeTab order={order} />
                </TabPanel>

                <TabPanel isActive={currentTab === 'gallery'}>
                    <GalleryTab order={order} />
                </TabPanel>

                <TabPanel isActive={currentTab === 'billing'}>
                    <BillingTab order={order} />
                </TabPanel>

                <TabPanel isActive={currentTab === 'activity'}>
                    <ActivityTab order={order} />
                </TabPanel>
            </div>
        </div>
    );
}
