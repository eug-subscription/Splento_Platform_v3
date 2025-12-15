"use client";

import { createContext, useContext, useState, useMemo, useCallback } from "react";
import type { ReactNode } from "react";

export type HeaderLeftContent =
    | { type: "org-switcher" }
    | { type: "back-button"; label?: string; onBack: () => void } // label defaults to "Back" if undefined. Consumer MUST handle cleanup (use resetToDefault).
    | { type: "custom"; content: ReactNode };

export interface LayoutContextType {
    headerLeft: HeaderLeftContent;
    setHeaderLeft: (content: HeaderLeftContent) => void;

    showCommandPalette: boolean;
    setShowCommandPalette: (show: boolean) => void;

    showCredits: boolean;
    setShowCredits: (show: boolean) => void;

    headerTitle: string | undefined;
    setHeaderTitle: (title: string | undefined) => void;

    resetToDefault: () => void;
}

const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

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

export function useLayout() {
    const context = useContext(LayoutContext);
    if (!context) {
        throw new Error("useLayout must be used within a LayoutProvider");
    }
    return context;
}
