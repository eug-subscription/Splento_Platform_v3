import { InputGroup as HInputGroup, type InputGroupProps as HInputGroupProps } from "@heroui/react";

export type InputGroupProps = HInputGroupProps;

export function InputGroup({ className, ...props }: InputGroupProps) {
    return <HInputGroup className={`bg-gray-50 shadow-sm ${className || ''}`} {...props} />;
}

InputGroup.Prefix = HInputGroup.Prefix;
InputGroup.Input = HInputGroup.Input;
InputGroup.Suffix = HInputGroup.Suffix;
