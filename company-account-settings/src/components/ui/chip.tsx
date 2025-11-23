import { Chip as HChip, type ChipProps as HChipProps } from "@heroui/react";

export interface ChipProps extends HChipProps { }

export function Chip(props: ChipProps) {
    return <HChip {...props} />;
}
