import { useState, useCallback, useMemo } from 'react';
import { SearchField, Select, ListBox, Button, TagGroup, Tag, Modal, Card, Header, Label } from '@heroui/react';
import { Icon } from '@iconify/react';
import { useDebouncedCallback } from 'use-debounce';
import type { OrderFilters as Filters } from '@/hooks/useOrders';
import { ORDER_STATUS_CONFIG, ORDER_TYPE_CONFIG, PAYMENT_STATUS_CONFIG } from '@/data/order-constants';
import type { OrderStatus, OrderType, PaymentStatus } from '@/types/order.types';

interface OrderFiltersProps {
    filters: Filters;
    onFilterChange: <K extends keyof Filters>(key: K, value: Filters[K]) => void;
    onClearFilters: () => void;
    hasActiveFilters: boolean;
}

export function OrderFilters({
    filters,
    onFilterChange,
    onClearFilters,
    hasActiveFilters
}: OrderFiltersProps) {
    const [searchValue, setSearchValue] = useState(filters.search);

    // Debounce search input
    const debouncedSearch = useDebouncedCallback((value: string) => {
        onFilterChange('search', value);
    }, 300);

    const handleSearchChange = useCallback((value: string) => {
        setSearchValue(value);
        debouncedSearch(value);
    }, [debouncedSearch]);

    const clearSearch = useCallback(() => {
        setSearchValue('');
        onFilterChange('search', '');
    }, [onFilterChange]);

    // Calculate active filter count (excluding search)
    const activeFilterCount = useMemo(() => {
        let count = 0;
        if (filters.status !== 'all' && filters.status.length > 0) count++;
        if (filters.type !== 'all' && filters.type.length > 0) count++;
        if (filters.paymentStatus !== 'all' && filters.paymentStatus.length > 0) count++;
        return count;
    }, [filters]);

    // Active filter tags for the tag group
    const activeFilterTags = useMemo(() => {
        const tags: { key: string; label: string; filterKey: keyof Filters; value: string }[] = [];

        if (filters.status !== 'all') {
            filters.status.forEach(s => {
                tags.push({
                    key: `status-${s}`,
                    label: ORDER_STATUS_CONFIG[s].label,
                    filterKey: 'status',
                    value: s
                });
            });
        }

        if (filters.type !== 'all') {
            filters.type.forEach(t => {
                tags.push({
                    key: `type-${t}`,
                    label: ORDER_TYPE_CONFIG[t].label,
                    filterKey: 'type',
                    value: t
                });
            });
        }

        if (filters.paymentStatus !== 'all') {
            filters.paymentStatus.forEach(p => {
                tags.push({
                    key: `payment-${p}`,
                    label: PAYMENT_STATUS_CONFIG[p].label,
                    filterKey: 'paymentStatus',
                    value: p
                });
            });
        }

        return tags;
    }, [filters]);

    const filterControls = (
        <>
            {/* Status Filter */}
            <Select
                className="w-full sm:w-48"
                placeholder="Status"
                selectionMode="multiple"
                value={filters.status !== 'all' ? filters.status : []}
                onChange={(val) => {
                    const arr = val as OrderStatus[];
                    onFilterChange('status', arr.length > 0 ? arr : 'all');
                }}
            >
                <Label className="text-xs font-medium text-default-500 px-1 uppercase tracking-wider mb-2">Status</Label>
                <Select.Trigger className="h-11 flex items-center rounded-field bg-background border-default-200 px-3 transition-colors hover:bg-default-50/50 focus:outline-none">
                    <Select.Value>
                        {({ selectedItems }) => {
                            const items = selectedItems as { id: string; textValue: string }[];
                            if (!items || items.length === 0) {
                                return <span className="text-sm text-default-400">All Statuses</span>;
                            }
                            return (
                                <span className="text-sm text-default-700 font-medium">
                                    {items.length} {items.length === 1 ? 'status' : 'statuses'} selected
                                </span>
                            );
                        }}
                    </Select.Value>
                    <Select.Indicator />
                </Select.Trigger>
                <Select.Popover>
                    <ListBox>
                        <ListBox.Section>
                            <Header className="text-xs font-medium text-default-400 px-2 py-1">Select a status</Header>
                            {Object.entries(ORDER_STATUS_CONFIG).map(([key, config]) => (
                                <ListBox.Item key={key} id={key} textValue={config.label} className="outline-none data-[focus]:bg-default-100/50 rounded-lg px-2 py-1.5 transition-colors cursor-pointer">
                                    <div className="flex items-center gap-2">
                                        <Icon icon={config.icon} className="w-4 h-4" />
                                        <span>{config.label}</span>
                                    </div>
                                    <ListBox.ItemIndicator />
                                </ListBox.Item>
                            ))}
                        </ListBox.Section>
                    </ListBox>
                </Select.Popover>
            </Select>

            {/* Type Filter */}
            <Select
                className="w-full sm:w-48"
                placeholder="Type"
                selectionMode="multiple"
                value={filters.type !== 'all' ? filters.type : []}
                onChange={(val) => {
                    const arr = val as OrderType[];
                    onFilterChange('type', arr.length > 0 ? arr : 'all');
                }}
            >
                <Label className="text-xs font-medium text-default-500 px-1 uppercase tracking-wider mb-2">Type</Label>
                <Select.Trigger className="h-11 flex items-center rounded-field bg-background border-default-200 px-3 transition-colors hover:bg-default-50/50 focus:outline-none">
                    <Select.Value>
                        {({ selectedItems }) => {
                            const items = selectedItems as { id: string; textValue: string }[];
                            if (!items || items.length === 0) {
                                return <span className="text-sm text-default-400">All Types</span>;
                            }
                            return (
                                <span className="text-sm text-default-700 font-medium">
                                    {items.length} {items.length === 1 ? 'type' : 'types'} selected
                                </span>
                            );
                        }}
                    </Select.Value>
                    <Select.Indicator />
                </Select.Trigger>
                <Select.Popover>
                    <ListBox>
                        <ListBox.Section>
                            <Header className="text-xs font-medium text-default-400 px-2 py-1">Select a type</Header>
                            {Object.entries(ORDER_TYPE_CONFIG).map(([key, config]) => (
                                <ListBox.Item key={key} id={key} textValue={config.label} className="outline-none data-[focus]:bg-default-100/50 rounded-lg px-2 py-1.5 transition-colors cursor-pointer">
                                    <div className="flex items-center gap-2">
                                        <Icon icon={config.icon} className="w-4 h-4" />
                                        <span>{config.label}</span>
                                    </div>
                                    <ListBox.ItemIndicator />
                                </ListBox.Item>
                            ))}
                        </ListBox.Section>
                    </ListBox>
                </Select.Popover>
            </Select>

            {/* Payment Filter */}
            <Select
                className="w-full sm:w-48"
                placeholder="Payment"
                selectionMode="multiple"
                value={filters.paymentStatus !== 'all' ? filters.paymentStatus : []}
                onChange={(val) => {
                    const arr = val as PaymentStatus[];
                    onFilterChange('paymentStatus', arr.length > 0 ? arr : 'all');
                }}
            >
                <Label className="text-xs font-medium text-default-500 px-1 uppercase tracking-wider mb-2">Payment</Label>
                <Select.Trigger className="h-11 flex items-center rounded-field bg-background border-default-200 px-3 transition-colors hover:bg-default-50/50 focus:outline-none">
                    <Select.Value>
                        {({ selectedItems }) => {
                            const items = selectedItems as { id: string; textValue: string }[];
                            if (!items || items.length === 0) {
                                return <span className="text-sm text-default-400">All Payments</span>;
                            }
                            return (
                                <span className="text-sm text-default-700 font-medium">
                                    {items.length} {items.length === 1 ? 'payment' : 'payments'} selected
                                </span>
                            );
                        }}
                    </Select.Value>
                    <Select.Indicator />
                </Select.Trigger>
                <Select.Popover>
                    <ListBox>
                        <ListBox.Section>
                            <Header className="text-xs font-medium text-default-400 px-2 py-1">Select a payment</Header>
                            {Object.entries(PAYMENT_STATUS_CONFIG).map(([key, config]) => (
                                <ListBox.Item key={key} id={key} textValue={config.label} className="outline-none data-[focus]:bg-default-100/50 rounded-lg px-2 py-1.5 transition-colors cursor-pointer">
                                    <div className="flex items-center gap-2">
                                        <Icon icon={config.icon} className="size-4" />
                                        <span>{config.label}</span>
                                    </div>
                                    <ListBox.ItemIndicator />
                                </ListBox.Item>
                            ))}
                        </ListBox.Section>
                    </ListBox>
                </Select.Popover>
            </Select>
        </>
    );

    return (
        <div className="space-y-4">
            {/* Desktop View */}
            <Card className="hidden md:block bg-default-50/50 border-default-100 shadow-none rounded-3xl overflow-hidden">
                <Card.Content className="p-6">
                    <div className="flex flex-row flex-wrap items-end gap-4">
                        {filterControls}
                        <SearchField
                            value={searchValue}
                            onChange={handleSearchChange}
                            onClear={clearSearch}
                            aria-label="Search orders"
                            className="flex-1"
                        >
                            <Label className="text-xs font-medium text-default-500 px-1 uppercase tracking-wider mb-2">Search</Label>
                            <SearchField.Group className="h-10 rounded-full bg-default-100/50 border-default-200 overflow-hidden flex items-center pr-1">
                                <SearchField.SearchIcon className="ml-3 text-default-400 shrink-0" />
                                <SearchField.Input
                                    placeholder="Search ID, client, location..."
                                    className="bg-transparent text-sm px-2 flex-1 outline-none"
                                />
                                <SearchField.ClearButton />
                            </SearchField.Group>
                        </SearchField>
                    </div>
                </Card.Content>

                {/* Active Filters Bar - Desktop */}
                {hasActiveFilters && (
                    <div className="flex items-center gap-3 px-6 py-3 bg-default-100/50 border-t border-default-100">
                        <TagGroup
                            aria-label="Active filters"
                            variant="surface"
                            onRemove={(keys) => {
                                const tagKey = Array.from(keys)[0] as string;
                                const tag = activeFilterTags.find(t => t.key === tagKey);
                                if (tag) {
                                    const currentValue = filters[tag.filterKey];
                                    if (Array.isArray(currentValue)) {
                                        const newValue = currentValue.filter(v => v !== tag.value);
                                        if (tag.filterKey === 'status') onFilterChange('status', newValue.length > 0 ? newValue as OrderStatus[] : 'all');
                                        if (tag.filterKey === 'type') onFilterChange('type', newValue.length > 0 ? newValue as OrderType[] : 'all');
                                        if (tag.filterKey === 'paymentStatus') onFilterChange('paymentStatus', newValue.length > 0 ? newValue as PaymentStatus[] : 'all');
                                    }
                                }
                            }}
                        >
                            <TagGroup.List items={activeFilterTags}>
                                {(tag) => (
                                    <Tag id={tag.key} className="px-3" textValue={tag.label}>
                                        {({ allowsRemoving }) => (
                                            <>
                                                {tag.label}
                                                {allowsRemoving && <Tag.RemoveButton />}
                                            </>
                                        )}
                                    </Tag>
                                )}
                            </TagGroup.List>
                        </TagGroup>

                        <div className="flex-shrink-0 border-l border-default-200 h-6 mx-1" />

                        <Button
                            size="sm"
                            variant="ghost"
                            onPress={onClearFilters}
                            className="h-8 px-3 text-xs font-semibold hover:text-danger-500 transition-colors"
                        >
                            Clear all
                        </Button>
                    </div>
                )}
            </Card>

            {/* Mobile View */}
            <Card className="md:hidden bg-default-50/50 border-default-100 shadow-none rounded-2xl overflow-hidden">
                <Card.Content className="p-4 flex flex-row gap-2 items-center">
                    <div className="flex-1">
                        <SearchField
                            value={searchValue}
                            onChange={handleSearchChange}
                            onClear={clearSearch}
                            aria-label="Search orders"
                        >
                            <SearchField.Group className="h-10 rounded-full bg-default-100/50 border-default-200 overflow-hidden flex items-center pr-1">
                                <SearchField.SearchIcon className="ml-3 text-default-400 shrink-0" />
                                <SearchField.Input
                                    placeholder="Search..."
                                    className="bg-transparent text-sm px-2 flex-1 outline-none"
                                />
                                <SearchField.ClearButton />
                            </SearchField.Group>
                        </SearchField>
                    </div>

                    <Modal>
                        <Button
                            variant="secondary"
                            className="rounded-field h-10 min-w-[3rem] px-0 relative border-default-200"
                            isIconOnly
                            aria-label="Open filters"
                        >
                            <Icon icon="gravity-ui:sliders" className="size-5" />
                            {activeFilterCount > 0 && (
                                <span className="absolute -top-1 -right-1 size-4 bg-accent text-accent-foreground text-tiny rounded-full flex items-center justify-center font-bold">
                                    {activeFilterCount}
                                </span>
                            )}
                        </Button>
                        <Modal.Backdrop variant="blur">
                            <Modal.Container>
                                <Modal.Dialog className="rounded-t-(radius-3xl) sm:rounded-(radius-3xl)">
                                    <Modal.CloseTrigger />
                                    <Modal.Header>
                                        <Modal.Heading>Filters</Modal.Heading>
                                    </Modal.Header>
                                    <Modal.Body className="space-y-6 pb-8">
                                        {filterControls}
                                        <div className="pt-4">
                                            <Button
                                                variant="tertiary"
                                                fullWidth
                                                onPress={onClearFilters}
                                                className="rounded-field h-12"
                                            >
                                                Reset all filters
                                            </Button>
                                        </div>
                                    </Modal.Body>
                                </Modal.Dialog>
                            </Modal.Container>
                        </Modal.Backdrop>
                    </Modal>
                </Card.Content>
            </Card>

            {/* Mobile Active Tags */}
            {hasActiveFilters && (
                <div className="md:hidden flex flex-wrap items-center gap-3 px-1">
                    <TagGroup
                        aria-label="Active filters"
                        variant="surface"
                        onRemove={(keys) => {
                            const tagKey = Array.from(keys)[0] as string;
                            const tag = activeFilterTags.find(t => t.key === tagKey);
                            if (tag) {
                                const currentValue = filters[tag.filterKey];
                                if (Array.isArray(currentValue)) {
                                    const newValue = currentValue.filter(v => v !== tag.value);
                                    if (tag.filterKey === 'status') onFilterChange('status', newValue.length > 0 ? newValue as OrderStatus[] : 'all');
                                    if (tag.filterKey === 'type') onFilterChange('type', newValue.length > 0 ? newValue as OrderType[] : 'all');
                                    if (tag.filterKey === 'paymentStatus') onFilterChange('paymentStatus', newValue.length > 0 ? newValue as PaymentStatus[] : 'all');
                                }
                            }
                        }}
                    >
                        <TagGroup.List items={activeFilterTags}>
                            {(tag) => (
                                <Tag id={tag.key} textValue={tag.label}>
                                    {({ allowsRemoving }) => (
                                        <>
                                            {tag.label}
                                            {allowsRemoving && <Tag.RemoveButton />}
                                        </>
                                    )}
                                </Tag>
                            )}
                        </TagGroup.List>
                    </TagGroup>
                    <Button
                        size="sm"
                        variant="ghost"
                        onPress={onClearFilters}
                        className="h-8 text-xs font-semibold"
                    >
                        Clear all
                    </Button>
                </div>
            )}
        </div>
    );
}
