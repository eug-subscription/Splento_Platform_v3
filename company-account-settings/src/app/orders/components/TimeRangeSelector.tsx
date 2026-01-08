import { Select, ListBox } from "@heroui/react";
import { Icon } from "@iconify/react";

export interface TimeRangeSelectorProps {
    selectedPeriod: string;
    onPeriodChange: (periodId: string) => void;
    className?: string;
}

const PERIODS = [
    { id: 'this-month', label: 'This Month' },
    { id: 'last-month', label: 'Last Month' },
    { id: 'last-90-days', label: 'Last 90 Days' },
    { id: 'this-year', label: 'This Year' },
    { id: 'custom', label: 'Custom Range' },
];

export function TimeRangeSelector({
    selectedPeriod,
    onPeriodChange,
    className = ""
}: TimeRangeSelectorProps) {
    const currentPeriod = PERIODS.find(p => p.id === selectedPeriod);

    return (
        <div className={`flex items-center gap-3 ${className}`}>
            <Select
                value={selectedPeriod}
                onChange={(key) => onPeriodChange(key as string)}
                className="w-48"
                aria-label="Select Time Period"
                placeholder="Select period"
            >
                <Select.Trigger className="bg-content1 shadow-sm border-none">
                    <div className="flex items-center gap-2">
                        <Icon icon="gravity-ui:calendar" className="w-4 h-4 text-foreground-500" />
                        <Select.Value>
                            {currentPeriod?.label}
                        </Select.Value>
                    </div>
                    <Select.Indicator />
                </Select.Trigger>
                <Select.Popover>
                    <ListBox items={PERIODS}>
                        {(period) => (
                            <ListBox.Item key={period.id} id={period.id} textValue={period.label}>
                                {period.label}
                            </ListBox.Item>
                        )}
                    </ListBox>
                </Select.Popover>
            </Select>
        </div>
    );
}
