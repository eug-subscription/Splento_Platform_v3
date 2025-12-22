import { Select, ListBox, Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import { format } from "date-fns";


interface UsageHeaderProps {
    selectedPeriod: string;
    onPeriodChange: (periodId: string) => void;
    customDateRange?: { start: Date; end: Date };
    onCustomDateChange?: (range: { start: Date; end: Date }) => void;
    onExport: () => void;
    isExporting: boolean;
}

export function UsageHeader({
    selectedPeriod,
    onPeriodChange,
    customDateRange,
    onExport,
    isExporting,
}: UsageHeaderProps) {

    const periods = [
        { id: 'this-month', label: 'This Month' },
        { id: 'last-month', label: 'Last Month' },
        { id: 'last-90-days', label: 'Last 90 Days' },
        { id: 'this-year', label: 'This Year' }, // Added useful preset
        { id: 'custom', label: 'Custom Range' },
    ];

    const currentPeriod = periods.find(p => p.id === selectedPeriod);

    const formatDateRange = () => {
        if (selectedPeriod === 'custom' && customDateRange) {
            return `${format(customDateRange.start, 'MMM d')} - ${format(customDateRange.end, 'MMM d, yyyy')}`;
        }
        // For standard periods, we assume the parent component calculates logic or we display the period name
        // Ideally we'd calculate it here using our util, but let's keep it simple for visualization:
        if (currentPeriod?.id !== 'custom') {
            // In a real app we'd display the calculated range for "This Month" too
            return "";
        }
        return '';
    };

    return (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-4">
                <Select
                    selectedKey={selectedPeriod}
                    onSelectionChange={(key) => onPeriodChange(key as string)}
                    className="w-48"
                    aria-label="Select Time Period"
                    placeholder="Select period"
                >
                    <Select.Trigger>
                        <Select.Value>
                            {currentPeriod?.label}
                        </Select.Value>
                        <Select.Indicator />
                    </Select.Trigger>
                    <Select.Popover>
                        <ListBox items={periods}>
                            {(period) => (
                                <ListBox.Item key={period.id} id={period.id} textValue={period.label}>
                                    {period.label}
                                </ListBox.Item>
                            )}
                        </ListBox>
                    </Select.Popover>
                </Select>

                <span className="text-sm text-default-500">
                    {formatDateRange()}
                </span>
            </div>

            <Button
                variant="secondary"
                onPress={onExport}
                isPending={isExporting}
            >
                <Icon icon="gravity-ui:file-arrow-down" className="w-4 h-4 mr-2" />
                Export CSV
            </Button>
        </div>
    );
}
