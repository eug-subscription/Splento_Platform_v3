import { Checkbox as HCheckbox, type CheckboxProps as HCheckboxProps } from "@heroui/react";

export interface CheckboxProps extends HCheckboxProps { }

export function Checkbox(props: CheckboxProps) {
    return <HCheckbox {...props} />;
}

Checkbox.Control = HCheckbox.Control;
Checkbox.Indicator = HCheckbox.Indicator;
Checkbox.Content = HCheckbox.Content;
