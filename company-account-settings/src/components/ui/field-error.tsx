import { FieldError as HFieldError, type FieldErrorProps as HFieldErrorProps } from "@heroui/react";

export type FieldErrorProps = HFieldErrorProps;

export function FieldError(props: FieldErrorProps) {
    return <HFieldError {...props} />;
}
