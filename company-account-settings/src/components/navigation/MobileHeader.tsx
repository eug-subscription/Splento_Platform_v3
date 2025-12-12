"use client";

import { useMemo } from "react";
import { Chip } from "@heroui/react";

interface MobileHeaderProps {
    credits?: number;
}

export function MobileHeader({ credits }: MobileHeaderProps) {
    // Format credits with comma (e.g., 1,247)
    const formattedCredits = useMemo(() => {
        return credits?.toLocaleString() ?? "0";
    }, [credits]);

    return (
        <header
            className="lg:hidden fixed top-0 left-0 right-0 h-14 bg-background/80 backdrop-blur-lg border-b border-separator z-50 flex items-center justify-between px-4"
            aria-label="Mobile Header"
        >
            {/* Logo Left */}
            <div className="flex items-center">
                <img
                    src="/splento-logo-light.svg"
                    alt="Splento"
                    className="h-6 w-auto dark:hidden block"
                />
                <img
                    src="/splento-logo-dark.svg"
                    alt="Splento"
                    className="h-6 w-auto hidden dark:block"
                />
            </div>

            {/* Credits Chip Right */}
            {credits !== undefined && (
                <Chip
                    variant="soft"
                    color="default"
                    size="sm"
                    className="font-medium cursor-default"
                >
                    {formattedCredits} credits
                </Chip>
            )}
        </header>
    );
}
