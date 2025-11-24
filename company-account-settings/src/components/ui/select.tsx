import { Select as HSelect, type SelectProps as HSelectProps, ListBox as HListBox, type ListBoxProps as HListBoxProps, type ListBoxItemProps as HListBoxItemProps } from "@heroui/react";

export type SelectProps<T extends object = object> = HSelectProps<T>;

export function Select<T extends object>(props: SelectProps<T>) {
    return <HSelect {...props} />;
}

// Custom Trigger wrapper
const StyledTrigger = ({ className, ...props }: React.ComponentProps<typeof HSelect.Trigger>) => {
    return <HSelect.Trigger className={className} {...props} />;
};

Select.Trigger = StyledTrigger;
Select.Value = HSelect.Value;
Select.Indicator = HSelect.Indicator;
Select.Popover = HSelect.Popover;

export type ListBoxProps<T extends object = object> = HListBoxProps<T>;
export function ListBox<T extends object>(props: ListBoxProps<T>) {
    return <HListBox {...props} />;
}

export type ListBoxItemProps = HListBoxItemProps;
export function ListBoxItem(props: ListBoxItemProps) {
    return <HListBox.Item {...props} />;
}

ListBox.Item = ListBoxItem;
ListBox.ItemIndicator = HListBox.ItemIndicator;
