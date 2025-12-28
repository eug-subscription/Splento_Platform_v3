import { useState, useMemo, useCallback } from "react";
import type { ReactNode } from "react";
import { LayoutContext } from "./LayoutContext";
import type { HeaderLeftContent } from "./LayoutContext";

export function LayoutProvider({ children }: { children: ReactNode }) {
    const [headerLeft, setHeaderLeft] = useState<HeaderLeftContent>({ type: "org-switcher" });
    const [showCommandPalette, setShowCommandPalette] = useState(true);
    const [showCredits, setShowCredits] = useState(true);
    const [headerTitle, setHeaderTitle] = useState<string | undefined>(undefined);

    const resetToDefault = useCallback(() => {
        setHeaderLeft({ type: "org-switcher" });
        setShowCommandPalette(true);
        setShowCredits(true);
        setHeaderTitle(undefined);
    }, []);

    const value = useMemo(
        () => ({
            headerLeft,
            setHeaderLeft,
            showCommandPalette,
            setShowCommandPalette,
            showCredits,
            setShowCredits,
            headerTitle,
            setHeaderTitle,
            resetToDefault,
        }),
        [headerLeft, showCommandPalette, showCredits, headerTitle, resetToDefault]
    );

    return (
        <LayoutContext.Provider
            value={value}
        >
            {children}
        </LayoutContext.Provider>
    );
}
