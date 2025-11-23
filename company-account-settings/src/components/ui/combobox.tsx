import { ComboBox as HComboBox, type ComboBoxProps as HComboBoxProps } from "@heroui/react";

export interface ComboBoxProps<T extends object = object> extends HComboBoxProps<T> { }

export function ComboBox<T extends object>(props: ComboBoxProps<T>) {
    return <HComboBox {...props} />;
}

ComboBox.InputGroup = HComboBox.InputGroup;
ComboBox.Trigger = HComboBox.Trigger;
ComboBox.Popover = HComboBox.Popover;
