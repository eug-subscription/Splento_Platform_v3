import { TextField as HTextField, type TextFieldProps as HTextFieldProps } from "@heroui/react";

export type TextFieldProps = HTextFieldProps;

export function TextField(props: TextFieldProps) {
    return <HTextField {...props} />;
}
