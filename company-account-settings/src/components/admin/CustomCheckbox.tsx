import { Checkbox, type CheckboxProps } from "../ui/checkbox";
import { Label } from "../ui/label";
import { Description, cn } from "@heroui/react";

interface CustomCheckboxProps extends Omit<CheckboxProps, 'children'> {
    label?: React.ReactNode;
    description?: React.ReactNode;
    children?: React.ReactNode;
}

export const CustomCheckbox = ({ className, label, description, children, ...props }: CustomCheckboxProps) => {
    return (
        <Checkbox
            {...props}
            className={cn("items-start w-full", className)}
        >
            <Checkbox.Control>
                <Checkbox.Indicator />
            </Checkbox.Control>
            <Checkbox.Content>
                {label && <Label>{label}</Label>}
                {description && <Description>{description}</Description>}
                {children}
            </Checkbox.Content>
        </Checkbox>
    );
};
