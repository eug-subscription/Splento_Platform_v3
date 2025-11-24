import { Checkbox, type CheckboxProps, Label, Description, cn } from "@heroui/react";

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
            <Checkbox.Control className="rounded-[4px] before:rounded-[4px] data-[selected=true]:rounded-[4px]">
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
