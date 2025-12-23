import { Tabs } from '@heroui/react';
import { Icon } from '@iconify/react';
import type { FilterOption } from '../../types/products';

interface ProductFiltersProps {
    activeFilter: FilterOption;
    onFilterChange: (filter: FilterOption) => void;
}

export function ProductFilters({ activeFilter, onFilterChange }: ProductFiltersProps) {
    return (
        <Tabs
            selectedKey={activeFilter}
            onSelectionChange={(key) => onFilterChange(key as FilterOption)}
            className="w-full justify-center"
        >
            <Tabs.ListContainer>
                <Tabs.List aria-label="Filter services by type">
                    <Tabs.Tab id="all">
                        All
                        <Tabs.Indicator />
                    </Tabs.Tab>
                    <Tabs.Tab id="human" className="flex items-center gap-1.5">
                        <Icon icon="gravity-ui:person" className="hidden md:block size-4" />
                        <span className="md:hidden">Pro</span>
                        <span className="hidden md:block">Pro Services</span>
                        <Tabs.Indicator />
                    </Tabs.Tab>
                    <Tabs.Tab id="ai" className="flex items-center gap-1.5">
                        <Icon icon="gravity-ui:thunderbolt" className="hidden md:block size-4" />
                        AI Tools
                        <Tabs.Indicator />
                    </Tabs.Tab>
                    <Tabs.Tab id="hybrid" className="flex items-center gap-1.5">
                        <Icon icon="gravity-ui:star" className="hidden md:block size-4" />
                        Pro + AI
                        <Tabs.Indicator />
                    </Tabs.Tab>
                </Tabs.List>
            </Tabs.ListContainer>
        </Tabs>
    );
}
