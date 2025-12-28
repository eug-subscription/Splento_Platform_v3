import { createContext } from "react";
import type { ReactNode } from "react";

export type HeaderLeftContent =
    | { type: "org-switcher" }
    | { type: "back-button"; label?: string; onBack: () => void }
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

export const LayoutContext = createContext<LayoutContextType | undefined>(undefined);
