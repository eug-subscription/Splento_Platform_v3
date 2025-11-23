import { Label as HLabel, type LabelProps as HLabelProps } from "@heroui/react";

export interface LabelProps extends HLabelProps { }

export function Label(props: LabelProps) {
    return <HLabel {...props} />;
}
