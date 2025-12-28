import { Radio, type RadioProps, cn } from "@heroui/react";
import type { ReactNode } from "react";

export interface SplentoRadioProps extends Omit<RadioProps, "children"> {
    children?: ReactNode;
    classNames?: {
        wrapper?: string;
        labelWrapper?: string;
        control?: string;
        label?: string;
        description?: string;
        base?: string;
    };
}

export function SplentoRadio({ children, className, ...props }: SplentoRadioProps) {
    return (
        <Radio
            {...props}
            className={cn("text-primary", className)}
        >
            <Radio.Control>
                <Radio.Indicator className="text-midnight" />
            </Radio.Control>
            {children}
        </Radio>
    );
}
