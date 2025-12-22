import { useState } from "react";
import { Modal, Button, DateField, Label, DateInputGroup } from "@heroui/react";
import { Icon } from "@iconify/react";
import { subDays, startOfYear } from "date-fns";
import { toCalendarDate, getLocalTimeZone, today, type DateValue } from "@internationalized/date";

interface DateRangePickerModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialRange?: { start: Date; end: Date };
    onApply: (range: { start: Date; end: Date }) => void;
}

export function DateRangePickerModal({ isOpen, onClose, initialRange, onApply }: DateRangePickerModalProps) {
    // Helper to convert JS Date to @internationalized/date DateValue
    const toDateValue = (date: Date): DateValue => {
        return toCalendarDate(today(getLocalTimeZone())).set({
            year: date.getFullYear(),
            month: date.getMonth() + 1,
            day: date.getDate()
        });
    };

    // Helper to convert @internationalized/date DateValue to JS Date
    const fromDateValue = (dateValue: DateValue): Date => {
        return dateValue.toDate(getLocalTimeZone());
    };

    const [startDate, setStartDate] = useState<DateValue | null>(
        toDateValue(initialRange?.start || subDays(new Date(), 30))
    );
    const [endDate, setEndDate] = useState<DateValue | null>(
        toDateValue(initialRange?.end || new Date())
    );

    const handlePreset = (years: number, days: number = 0) => {
        const end = new Date();
        let start;
        if (years > 0 && days === 0) {
            // "This year" logic
            start = startOfYear(end);
        } else {
            start = subDays(end, days);
        }

        setStartDate(toDateValue(start));
        setEndDate(toDateValue(end));
    };

    return (
        <Modal isOpen={isOpen} onOpenChange={(open) => !open && onClose()}>
            <Modal.Backdrop variant="blur">
                <Modal.Container>
                    <Modal.Dialog>
                        <Modal.CloseTrigger />
                        <Modal.Header>
                            <Modal.Heading>Custom Date Range</Modal.Heading>
                        </Modal.Header>

                        <Modal.Body className="space-y-4">
                            <div className="flex flex-col gap-1">
                                <DateField
                                    value={startDate}
                                    onChange={setStartDate}
                                    className="w-full"
                                >
                                    <Label>Start Date</Label>
                                    <DateInputGroup>
                                        <DateInputGroup.Prefix>
                                            <Icon icon="gravity-ui:calendar" className="size-4 text-muted" />
                                        </DateInputGroup.Prefix>
                                        <DateInputGroup.Input>
                                            {(segment) => <DateInputGroup.Segment segment={segment} />}
                                        </DateInputGroup.Input>
                                    </DateInputGroup>
                                </DateField>
                            </div>

                            <div className="flex flex-col gap-1">
                                <DateField
                                    value={endDate}
                                    onChange={setEndDate}
                                    className="w-full"
                                    minValue={startDate || undefined}
                                >
                                    <Label>End Date</Label>
                                    <DateInputGroup>
                                        <DateInputGroup.Prefix>
                                            <Icon icon="gravity-ui:calendar" className="size-4 text-muted" />
                                        </DateInputGroup.Prefix>
                                        <DateInputGroup.Input>
                                            {(segment) => <DateInputGroup.Segment segment={segment} />}
                                        </DateInputGroup.Input>
                                    </DateInputGroup>
                                </DateField>
                            </div>

                            {/* Quick Presets */}
                            <div className="flex flex-wrap gap-2">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onPress={() => handlePreset(0, 7)}
                                >
                                    Last 7 days
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onPress={() => handlePreset(0, 30)}
                                >
                                    Last 30 days
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onPress={() => handlePreset(1, 0)} // Using 1, 0 as flag for "this year" logic
                                >
                                    This year
                                </Button>
                            </div>
                        </Modal.Body>

                        <Modal.Footer>
                            <Button variant="ghost" onPress={onClose}>
                                Cancel
                            </Button>
                            <Button
                                variant="primary"
                                onPress={() => {
                                    if (startDate && endDate) {
                                        onApply({
                                            start: fromDateValue(startDate),
                                            end: fromDateValue(endDate)
                                        });
                                    }
                                }}
                                isDisabled={!startDate || !endDate || endDate.compare(startDate) < 0}
                            >
                                Apply Range
                            </Button>
                        </Modal.Footer>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
}
