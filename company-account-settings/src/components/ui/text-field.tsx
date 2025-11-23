import { TextField as HTextField, type TextFieldProps as HTextFieldProps } from "@heroui/react";

export interface TextFieldProps extends HTextFieldProps { }

export function TextField(props: TextFieldProps) {
    return <HTextField {...props} />;
}
