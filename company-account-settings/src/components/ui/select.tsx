import { Select as HSelect, type SelectProps as HSelectProps, ListBox as HListBox, type ListBoxProps as HListBoxProps, type ListBoxItemProps as HListBoxItemProps } from "@heroui/react";

export interface SelectProps<T extends object = object> extends HSelectProps<T> { }

export function Select<T extends object>(props: SelectProps<T>) {
    return <HSelect {...props} />;
}

// Custom Trigger with styling to match Input
const StyledTrigger = ({ className, ...props }: any) => {
    return <HSelect.Trigger className={`bg-gray-50 shadow-sm ${className || ''}`} {...props} />;
};

Select.Trigger = StyledTrigger;
Select.Value = HSelect.Value;
Select.Indicator = HSelect.Indicator;
Select.Popover = HSelect.Popover;

export interface ListBoxProps<T extends object = object> extends HListBoxProps<T> { }
export function ListBox<T extends object>(props: ListBoxProps<T>) {
    return <HListBox {...props} />;
}

export interface ListBoxItemProps extends HListBoxItemProps { }
export function ListBoxItem(props: ListBoxItemProps) {
    return <HListBox.Item {...props} />;
}

ListBox.Item = ListBoxItem;
ListBox.ItemIndicator = HListBox.ItemIndicator;
