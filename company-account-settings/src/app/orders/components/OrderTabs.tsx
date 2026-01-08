import { useState } from 'react';
import { Tabs, Select, ListBox } from '@heroui/react';
import { Icon } from '@iconify/react';
import { ORDER_TABS, type OrderTabId } from '@/data/order-constants';
import type { Order } from '@/types/order.types';

export interface OrderTabsProps {
    selectedTab: OrderTabId;
    onTabChange: (tabId: OrderTabId) => void;
    order: Order;
}

/**
 * OrderTabs component handles the tab navigation for the order detail page.
 * Provides a pill-style desktop navigation and a dropdown for mobile,
 * aligning with the project's design system standards.
 */
export function OrderTabs({ selectedTab, onTabChange, order }: OrderTabsProps) {
    // Determine the "day ago" cutoff for activity badges
    const [dayAgoStamp] = useState(() => Date.now() - 24 * 60 * 60 * 1000);

    const activeTabObj = ORDER_TABS.find(t => t.id === selectedTab) || ORDER_TABS[0];

    /**
     * Determines badge counts for specific tabs
     */
    const getBadge = (tabId: OrderTabId): number | undefined => {
        switch (tabId) {
            case 'gallery':
                // Show pending assets count if gallery exists
                return order.gallery?.pendingAssets || undefined;
            case 'activity': {
                // Show count of audit log entries from the last 24 hours
                const dayAgo = new Date(dayAgoStamp);
                const recentCount = order.auditLog.filter(entry => {
                    const entryDate = new Date(entry.timestamp);
                    return entryDate > dayAgo;
                }).length;
                return recentCount > 0 ? recentCount : undefined;
            }
            default:
                return undefined;
        }
    };

    return (
        <div className="w-full pt-4">
            {/* Desktop Navigation: Horizontal Pill Tabs */}
            <div className="hidden md:block">
                <Tabs
                    aria-label="Order sections"
                    selectedKey={selectedTab}
                    onSelectionChange={(key) => onTabChange(key as OrderTabId)}
                    className="w-full"
                >
                    <Tabs.ListContainer className="w-full">
                        <Tabs.List className="flex w-full gap-1 bg-default-100 p-1 rounded-full overflow-hidden">
                            {ORDER_TABS.map((tab) => (
                                <Tabs.Tab
                                    key={tab.id}
                                    id={tab.id}
                                    className="flex-1 h-9 px-4 rounded-full transition-colors duration-300 relative data-[selected=true]:text-foreground text-default-500 group"
                                >
                                    <Tabs.Indicator className="absolute inset-0 w-full h-full bg-background rounded-full shadow-sm" />
                                    <div className="flex items-center justify-center h-full w-full gap-2 relative z-10">
                                        <Icon
                                            icon={tab.icon}
                                            className={`w-4 h-4 transition-colors ${selectedTab === tab.id ? 'text-foreground' : 'text-default-400 group-hover:text-foreground'}`}
                                        />
                                        <span className="text-sm font-medium whitespace-nowrap">{tab.label}</span>
                                        {getBadge(tab.id as OrderTabId) && (
                                            <span className="min-w-[1.25rem] h-5 px-1 rounded-full bg-danger text-white text-[10px] flex items-center justify-center font-bold">
                                                {getBadge(tab.id as OrderTabId)}
                                            </span>
                                        )}
                                    </div>
                                </Tabs.Tab>
                            ))}
                        </Tabs.List>
                    </Tabs.ListContainer>
                </Tabs>
            </div>

            {/* Mobile Navigation: Sticky Selector Dropdown */}
            <div className="block md:hidden sticky top-2 z-40 mb-4 bg-background/80 backdrop-blur-md rounded-medium pt-1">
                <Select
                    value={selectedTab}
                    onChange={(val) => onTabChange(val as OrderTabId)}
                    className="w-full"
                    aria-label="Select order section"
                >
                    <Select.Trigger>
                        <Select.Value>
                            <div className="flex items-center gap-3">
                                <div className="flex items-center justify-center text-default-500">
                                    <Icon icon={activeTabObj.icon} className="text-lg" />
                                </div>
                                <span className="font-medium text-foreground text-base leading-none pt-0.5">
                                    {activeTabObj.label}
                                </span>
                                {getBadge(selectedTab) && (
                                    <span className="min-w-[1.25rem] h-5 px-1 rounded-full bg-danger text-white text-[10px] flex items-center justify-center font-bold">
                                        {getBadge(selectedTab)}
                                    </span>
                                )}
                            </div>
                        </Select.Value>
                        <Select.Indicator />
                    </Select.Trigger>

                    <Select.Popover>
                        <ListBox items={[...ORDER_TABS]}>
                            {(tab) => (
                                <ListBox.Item
                                    id={tab.id}
                                    textValue={tab.label}
                                >
                                    <div className="flex items-center justify-between w-full">
                                        <div className="flex items-center gap-3">
                                            <Icon
                                                icon={tab.icon}
                                                className={`text-lg ${selectedTab === tab.id ? 'text-foreground' : 'text-default-400'}`}
                                            />
                                            <span className={`text-base ${selectedTab === tab.id ? 'font-medium' : 'font-normal'}`}>
                                                {tab.label}
                                            </span>
                                        </div>
                                        {getBadge(tab.id as OrderTabId) && (
                                            <span className="min-w-[1.25rem] h-5 px-1 rounded-full bg-danger text-white text-[10px] flex items-center justify-center font-bold">
                                                {getBadge(tab.id as OrderTabId)}
                                            </span>
                                        )}
                                    </div>
                                </ListBox.Item>
                            )}
                        </ListBox>
                    </Select.Popover>
                </Select>
            </div>
        </div>
    );
}

