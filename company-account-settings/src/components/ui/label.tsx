import { Label as HLabel, type LabelProps as HLabelProps } from "@heroui/react";

export type LabelProps = HLabelProps;

export function Label(props: LabelProps) {
    return <HLabel {...props} />;
}
