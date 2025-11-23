import { FieldError as HFieldError, type FieldErrorProps as HFieldErrorProps } from "@heroui/react";

export interface FieldErrorProps extends HFieldErrorProps { }

export function FieldError(props: FieldErrorProps) {
    return <HFieldError {...props} />;
}
