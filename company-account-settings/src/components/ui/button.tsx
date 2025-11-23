import { Button as HButton, type ButtonProps as HButtonProps, CloseButton as HCloseButton, type CloseButtonProps as HCloseButtonProps } from "@heroui/react";


export type ButtonProps = HButtonProps;
export type CloseButtonProps = HCloseButtonProps;

export function Button(props: ButtonProps) {
    return <HButton {...props} />;
}

// Maintain backward compatibility with named export
export function CloseButton(props: CloseButtonProps) {
    return <HCloseButton {...props} />;
}

// Dot notation pattern (recommended)
Button.Close = CloseButton;
