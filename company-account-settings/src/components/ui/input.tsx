import { Input as HInput, type InputProps as HInputProps } from "@heroui/react";

export type InputProps = HInputProps;

export function Input({ className, ...props }: InputProps) {
    return <HInput className={`bg-field shadow-sm ${className || ''}`} {...props} />;
}
