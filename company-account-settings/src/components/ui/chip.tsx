import { Chip as HChip, type ChipProps as HChipProps } from "@heroui/react";

export type ChipProps = HChipProps;

export function Chip(props: ChipProps) {
    return <HChip {...props} />;
}
