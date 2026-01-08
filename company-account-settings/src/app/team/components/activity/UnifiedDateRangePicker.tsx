import { Popover, ListBox, Button, Separator, DateField, DateInputGroup, Label } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useState, useMemo } from "react";
import { CalendarDate, parseDate, getLocalTimeZone } from "@internationalized/date";
import type { DateRange, DateRangePreset } from "@/types/activity";
import { DATE_RANGE_OPTIONS } from "@/data/activity-constants";

export interface UnifiedDateRangePickerProps {
    value: DateRangePreset;
    customRange?: DateRange;
    onChange: (preset: DateRangePreset, range?: DateRange) => void;
}

export function UnifiedDateRangePicker({
    value,
    customRange,
    onChange,
}: UnifiedDateRangePickerProps) {
    const [isOpen, setIsOpen] = useState(false);

    // Internal state for custom dates before they are "Applied"
    const toCalendarDate = (date: Date): CalendarDate => {
        const isoString = date.toISOString().split("T")[0];
        return parseDate(isoString);
    };

    const toDate = (calDate: CalendarDate): Date => {
        return calDate.toDate(getLocalTimeZone());
    };

    const defaultDate = useMemo(() => new Date(), []);
    const defaultStart = useMemo(() => {
        const d = new Date();
        d.setDate(d.getDate() - 7);
        return d;
    }, []);

    const [localStart, setLocalStart] = useState<CalendarDate>(
        toCalendarDate(customRange?.start || defaultStart)
    );
    const [localEnd, setLocalEnd] = useState<CalendarDate>(
        toCalendarDate(customRange?.end || defaultDate)
    );

    const handleOpenChange = (open: boolean) => {
        setIsOpen(open);
        if (open && customRange) {
            setLocalStart(toCalendarDate(customRange.start));
            setLocalEnd(toCalendarDate(customRange.end));
        }
    };

    const handlePresetChange = (preset: string) => {
        if (preset === 'custom') return; // Don't close if custom is clicked
        onChange(preset as DateRangePreset);
        setIsOpen(false);
    };

    const handleApplyCustom = () => {
        onChange('custom', {
            start: toDate(localStart),
            end: toDate(localEnd),
        });
        setIsOpen(false);
    };

    const displayValue = useMemo(() => {
        if (value === 'custom' && customRange) {
            const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
            return `${customRange.start.toLocaleDateString(undefined, options)} - ${customRange.end.toLocaleDateString(undefined, options)}`;
        }
        return DATE_RANGE_OPTIONS.find(opt => opt.id === value)?.label || 'Select Range';
    }, [value, customRange]);

    return (
        <Popover isOpen={isOpen} onOpenChange={handleOpenChange}>
            <Popover.Trigger>
                <Button
                    variant="secondary"
                    className="h-10 w-full justify-between px-3 rounded-field bg-background border-default-200 hover:bg-default-50 transition-all group"
                >
                    <div className="flex items-center gap-2">
                        {value === 'custom' ? (
                            <Icon icon="gravity-ui:calendar" className="text-accent size-4 shrink-0" />
                        ) : (
                            <Icon icon="gravity-ui:clock" className="text-default-400 size-4 shrink-0" />
                        )}
                        <span className={`text-sm truncate ${value === 'custom' ? 'text-accent font-medium' : 'text-default-700'}`}>
                            {displayValue}
                        </span>
                    </div>
                    <Icon
                        icon="gravity-ui:chevron-down"
                        className={`size-3 text-default-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                    />
                </Button>
            </Popover.Trigger>

            <Popover.Content
                placement="bottom start"
                className="w-72 p-0 overflow-hidden rounded-(radius-3xl) bg-background/95 backdrop-blur-md shadow-2xl border-default-100"
            >
                <div>
                    <ListBox
                        aria-label="Date range presets"
                        selectionMode="single"
                        selectedKeys={value !== 'custom' ? [value] : []}
                        onSelectionChange={(keys) => {
                            const key = Array.from(keys)[0];
                            if (key) handlePresetChange(key as string);
                        }}
                        className="p-2"
                    >
                        {DATE_RANGE_OPTIONS.filter(opt => opt.id !== 'custom').map((opt) => (
                            <ListBox.Item
                                key={opt.id}
                                id={opt.id}
                                textValue={opt.label}
                                className="rounded-field px-3 py-2 cursor-pointer hover:bg-default-100 data-[selected=true]:bg-accent/10 data-[selected=true]:text-accent"
                            >
                                <div className="flex items-center justify-between w-full">
                                    <span className="text-sm">{opt.label}</span>
                                    <ListBox.ItemIndicator>
                                        {(props) => props.isSelected ? (
                                            <Icon icon="gravity-ui:check" className="size-3.5" />
                                        ) : null}
                                    </ListBox.ItemIndicator>
                                </div>
                            </ListBox.Item>
                        ))}
                    </ListBox>

                    <Separator className="bg-default-100" />

                    <div className="p-4 space-y-4 bg-default-50/30">
                        <div className="flex items-center gap-2 mb-1">
                            <Icon icon="gravity-ui:calendar" className="text-accent size-3.5" />
                            <span className="text-xs font-bold text-default-500 uppercase tracking-widest">Custom Range</span>
                        </div>

                        <div className="grid grid-cols-1 gap-3">
                            <DateField
                                value={localStart}
                                onChange={(val) => val && setLocalStart(val)}
                                className="w-full group"
                            >
                                <Label className="text-xs text-default-400 font-bold mb-1 uppercase tracking-widest px-1 block group-focus-within:text-accent transition-colors">Start</Label>
                                <DateInputGroup className="bg-background border-default-200 rounded-field h-9 transition-all group-focus-within:ring-2 group-focus-within:ring-accent/20">
                                    <DateInputGroup.Input className="px-2 text-sm">
                                        {(segment) => <DateInputGroup.Segment segment={segment} className="rounded-sm px-0.5 focus:bg-accent focus:text-accent-foreground" />}
                                    </DateInputGroup.Input>
                                </DateInputGroup>
                            </DateField>

                            <DateField
                                value={localEnd}
                                onChange={(val) => val && setLocalEnd(val)}
                                className="w-full group"
                            >
                                <Label className="text-xs text-default-400 font-bold mb-1 uppercase tracking-widest px-1 block group-focus-within:text-accent transition-colors">End</Label>
                                <DateInputGroup className="bg-background border-default-200 rounded-field h-9 transition-all group-focus-within:ring-2 group-focus-within:ring-accent/20">
                                    <DateInputGroup.Input className="px-2 text-sm">
                                        {(segment) => <DateInputGroup.Segment segment={segment} className="rounded-sm px-0.5 focus:bg-accent focus:text-accent-foreground" />}
                                    </DateInputGroup.Input>
                                </DateInputGroup>
                            </DateField>
                        </div>

                        <Button
                            variant="primary"
                            fullWidth
                            size="sm"
                            onPress={handleApplyCustom}
                            className="rounded-field h-9 font-semibold text-xs mt-2"
                        >
                            Apply Custom Range
                        </Button>
                    </div>
                </div>
            </Popover.Content>
        </Popover>
    );
}
