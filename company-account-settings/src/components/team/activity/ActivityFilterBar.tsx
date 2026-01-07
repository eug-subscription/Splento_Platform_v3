import { Select, SearchField, Button, ListBox, Card, Modal } from "@heroui/react";
import { Icon } from "@iconify/react";
import type { ActivityFilters, ActivityCategory, DateRangePreset, DateRange } from "@/types/activity";
import type { Member } from "@/types/team";
import { CATEGORY_OPTIONS, ACTIVITY_CATEGORIES } from "@/data/activity-constants";
import { UnifiedDateRangePicker } from "./UnifiedDateRangePicker";

export interface ActivityFilterBarProps {
    filters: ActivityFilters;
    onFiltersChange: (filters: Partial<ActivityFilters>) => void;
    members: Member[];
    onExport?: () => void;
    isExporting?: boolean;
    hideDateRange?: boolean;
    hideExport?: boolean;
}

export function ActivityFilterBar({
    filters,
    onFiltersChange,
    members,
    onExport,
    isExporting = false,
    hideDateRange = false,
    hideExport = false,
}: ActivityFilterBarProps) {

    const handleDateRangeChange = (preset: DateRangePreset, range?: DateRange) => {
        onFiltersChange({
            dateRange: preset,
            customDateRange: range || filters.customDateRange
        });
    };

    const activeFilterCount = [
        filters.category !== 'all',
        filters.memberId !== 'all',
        filters.dateRange !== 'last_30_days',
    ].filter(Boolean).length;

    const filterGroups = (
        <>
            {/* 1. Activity Type Select */}
            <div className="flex flex-col gap-2 w-full md:w-56">
                <span className="text-xs font-semibold text-default-500 px-1 uppercase tracking-wider">
                    Category
                </span>
                <Select
                    placeholder="All Activity"
                    selectedKey={filters.category}
                    onSelectionChange={(key) => onFiltersChange({ category: key as ActivityCategory | 'all' })}
                    aria-label="Filter by category"
                    fullWidth
                    className="h-10"
                >
                    <Select.Trigger className="h-10 rounded-field bg-background border-default-200 px-3">
                        <Select.Value>
                            {filters.category === 'all' ? (
                                <div className="flex items-center gap-2">
                                    <Icon icon="gravity-ui:layers" className="text-default-400 size-4" />
                                    <span className="text-sm">All Activity</span>
                                </div>
                            ) : (
                                <div className="flex items-center gap-2">
                                    <Icon
                                        icon={ACTIVITY_CATEGORIES[filters.category as ActivityCategory]?.icon || 'gravity-ui:circle'}
                                        className="size-4"
                                        style={{ color: ACTIVITY_CATEGORIES[filters.category as ActivityCategory]?.colorToken }}
                                    />
                                    <span className="text-sm">{ACTIVITY_CATEGORIES[filters.category as ActivityCategory]?.label}</span>
                                </div>
                            )}
                        </Select.Value>
                        <Select.Indicator />
                    </Select.Trigger>
                    <Select.Popover>
                        <ListBox>
                            <ListBox.Item id="all" textValue="All Activity">
                                <div className="flex items-center justify-between w-full">
                                    <div className="flex items-center gap-2">
                                        <Icon icon="gravity-ui:layers" className="text-default-400" />
                                        <span>All Activity</span>
                                    </div>
                                    <ListBox.ItemIndicator>
                                        {(props) => props.isSelected ? <Icon icon="gravity-ui:check" className="size-4" /> : null}
                                    </ListBox.ItemIndicator>
                                </div>
                            </ListBox.Item>
                            {CATEGORY_OPTIONS.map((cat) => (
                                <ListBox.Item key={cat.id} id={cat.id} textValue={cat.label}>
                                    <div className="flex items-center justify-between w-full">
                                        <div className="flex items-center gap-2">
                                            <Icon icon={cat.icon} className="size-4" style={{ color: cat.colorToken }} />
                                            <span>{cat.label}</span>
                                        </div>
                                        <ListBox.ItemIndicator>
                                            {(props) => props.isSelected ? <Icon icon="gravity-ui:check" className="size-4" /> : null}
                                        </ListBox.ItemIndicator>
                                    </div>
                                </ListBox.Item>
                            ))}
                        </ListBox>
                    </Select.Popover>
                </Select>
            </div>

            {/* 2. Member Select */}
            <div className="flex flex-col gap-2 w-full md:w-56">
                <span className="text-xs font-semibold text-default-500 px-1 uppercase tracking-wider">
                    Member
                </span>
                <Select
                    placeholder="All Members"
                    selectedKey={filters.memberId}
                    onSelectionChange={(key) => onFiltersChange({ memberId: key as string })}
                    aria-label="Filter by member"
                    fullWidth
                    className="h-10"
                >
                    <Select.Trigger className="h-10 rounded-field bg-background border-default-200 px-3">
                        <Select.Value>
                            {(() => {
                                if (filters.memberId === 'all') {
                                    return (
                                        <div className="flex items-center gap-2">
                                            <Icon icon="gravity-ui:persons" className="text-default-400 size-4" />
                                            <span className="text-sm">All Members</span>
                                        </div>
                                    );
                                }
                                if (filters.memberId === 'system') {
                                    return (
                                        <div className="flex items-center gap-2">
                                            <Icon icon="gravity-ui:gear" className="text-default-400 size-4" />
                                            <span className="text-sm">System</span>
                                        </div>
                                    );
                                }
                                const member = members.find(m => m.id === filters.memberId);
                                return (
                                    <div className="flex items-center gap-2">
                                        {member?.avatar ? (
                                            <img src={member.avatar} className="size-5 rounded-full" alt={member.name} />
                                        ) : (
                                            <Icon icon="gravity-ui:person" className="text-default-400 size-4" />
                                        )}
                                        <span className="text-sm">{member?.name || 'Unknown Member'}</span>
                                    </div>
                                );
                            })()}
                        </Select.Value>
                        <Select.Indicator />
                    </Select.Trigger>
                    <Select.Popover>
                        <ListBox>
                            <ListBox.Item id="all" textValue="All Members">
                                <div className="flex items-center justify-between w-full">
                                    <div className="flex items-center gap-2">
                                        <Icon icon="gravity-ui:persons" className="text-default-400" />
                                        <span>All Members</span>
                                    </div>
                                    <ListBox.ItemIndicator>
                                        {(props) => props.isSelected ? <Icon icon="gravity-ui:check" className="size-4" /> : null}
                                    </ListBox.ItemIndicator>
                                </div>
                            </ListBox.Item>
                            <ListBox.Item id="system" textValue="System">
                                <div className="flex items-center justify-between w-full">
                                    <div className="flex items-center gap-2">
                                        <Icon icon="gravity-ui:gear" className="text-default-400" />
                                        <span>System</span>
                                    </div>
                                    <ListBox.ItemIndicator>
                                        {(props) => props.isSelected ? <Icon icon="gravity-ui:check" className="size-4" /> : null}
                                    </ListBox.ItemIndicator>
                                </div>
                            </ListBox.Item>
                            {members.map((member) => (
                                <ListBox.Item key={member.id} id={member.id} textValue={member.name}>
                                    <div className="flex items-center justify-between w-full">
                                        <div className="flex items-center gap-2 text-sm">
                                            <img src={member.avatar} className="size-5 rounded-full" alt={member.name} />
                                            <span>{member.name}</span>
                                        </div>
                                        <ListBox.ItemIndicator>
                                            {(props) => props.isSelected ? <Icon icon="gravity-ui:check" className="size-4" /> : null}
                                        </ListBox.ItemIndicator>
                                    </div>
                                </ListBox.Item>
                            ))}
                        </ListBox>
                    </Select.Popover>
                </Select>
            </div>

            {/* 3. Date Range Unified Picker */}
            {!hideDateRange && (
                <div className="flex flex-col gap-2 w-full md:w-56">
                    <span className="text-xs font-semibold text-default-500 px-1 uppercase tracking-wider">
                        Date Range
                    </span>
                    <UnifiedDateRangePicker
                        value={filters.dateRange}
                        customRange={filters.customDateRange}
                        onChange={handleDateRangeChange}
                    />
                </div>
            )}
        </>
    );

    return (
        <>
            <Card className="hidden md:block p-6 bg-default-50/50 border-default-100 shadow-none rounded-(radius-3xl)">
                <div className="flex flex-col lg:flex-row gap-4 items-start w-full">
                    <div className="w-full md:w-auto flex flex-col md:flex-row gap-4">
                        {filterGroups}
                    </div>

                    <div className="flex flex-col gap-2 w-full md:flex-1">
                        <span className="text-xs font-semibold text-default-500 px-1 uppercase tracking-wider">
                            Search
                        </span>
                        <SearchField
                            value={filters.search}
                            onChange={(val) => onFiltersChange({ search: val })}
                            aria-label="Search activity"
                        >
                            <SearchField.Group className="h-10 rounded-full bg-default-100/50 border-default-200 overflow-hidden flex items-center">
                                <SearchField.SearchIcon className="ml-3 text-default-400 shrink-0" />
                                <SearchField.Input
                                    placeholder="Search logs..."
                                    className="bg-transparent text-sm px-2 flex-1 outline-none"
                                />
                                <SearchField.ClearButton className="mr-1" />
                            </SearchField.Group>
                        </SearchField>
                    </div>

                    {!hideExport && onExport && (
                        <div className="flex flex-col gap-2 w-full md:w-auto">
                            <span className="text-xs font-semibold invisible uppercase tracking-wider">
                                Actions
                            </span>
                            <Button
                                variant="secondary"
                                fullWidth
                                onPress={onExport}
                                isPending={isExporting}
                                className="rounded-field h-10 border-default-200 px-6"
                            >
                                <Icon icon="gravity-ui:file-arrow-down" className="size-4 mr-2" />
                                Export
                            </Button>
                        </div>
                    )}
                </div>
            </Card>

            <Card className="md:hidden p-4 bg-default-50/50 border-default-100 shadow-none rounded-(radius-2xl) flex flex-row gap-2 items-center">
                <div className="flex-1">
                    <SearchField
                        value={filters.search}
                        onChange={(val) => onFiltersChange({ search: val })}
                        aria-label="Search activity"
                    >
                        <SearchField.Group className="h-10 rounded-full bg-default-100/50 border-default-200 overflow-hidden flex items-center">
                            <SearchField.SearchIcon className="ml-3 text-default-400 shrink-0" />
                            <SearchField.Input
                                placeholder="Search..."
                                className="bg-transparent text-sm px-2 flex-1 outline-none"
                            />
                            <SearchField.ClearButton className="mr-1" />
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
                            <span className="absolute -top-1 -right-1 size-4 bg-accent text-accent-foreground text-xs rounded-full flex items-center justify-center font-bold">
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
                                    {filterGroups}

                                    <div className="pt-4 flex flex-col gap-3">
                                        <Button
                                            variant="primary"
                                            onPress={onExport}
                                            isPending={isExporting}
                                            className="rounded-field h-12"
                                        >
                                            <Icon icon="gravity-ui:file-arrow-down" className="size-5 mr-2" />
                                            Export CSV
                                        </Button>
                                        <Button
                                            variant="tertiary"
                                            onPress={() => onFiltersChange({
                                                category: 'all',
                                                memberId: 'all',
                                                dateRange: 'last_30_days',
                                                search: ''
                                            })}
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
            </Card>
        </>
    );
}
