import { Button as HButton, type ButtonProps as HButtonProps, CloseButton as HCloseButton, type CloseButtonProps as HCloseButtonProps } from "@heroui/react";

export interface ButtonProps extends HButtonProps { }
export interface CloseButtonProps extends HCloseButtonProps { }

export function Button(props: ButtonProps) {
    return <HButton {...props} />;
}

export function CloseButton(props: CloseButtonProps) {
    return <HCloseButton {...props} />;
}
