

import { createContext, useContext, useEffect, useState, useCallback, useMemo } from "react";
import type { ReactNode } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
    setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Helper to safely access localStorage
const getStoredTheme = (): Theme | null => {
    try {
        if (typeof window !== "undefined") {
            return localStorage.getItem("theme") as Theme | null;
        }
    } catch {
        // localStorage not available (incognito, etc.)
    }
    return null;
};

const setStoredTheme = (theme: Theme) => {
    try {
        localStorage.setItem("theme", theme);
    } catch {
        // Silently fail
    }
};

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [theme, setThemeState] = useState<Theme>("light");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        // 1. Check localStorage
        const saved = getStoredTheme();
        if (saved) {
            setThemeState(saved);
            return;
        }

        // 2. Check system preference
        if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
            setThemeState("dark");
        }

        // 3. Listen for system preference changes
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        const handleChange = (e: MediaQueryListEvent) => {
            const savedTheme = getStoredTheme();
            if (!savedTheme) {
                setThemeState(e.matches ? "dark" : "light");
            }
        };

        mediaQuery.addEventListener("change", handleChange);
        return () => mediaQuery.removeEventListener("change", handleChange);
    }, []);

    useEffect(() => {
        const root = document.documentElement;
        root.classList.remove("light", "dark");
        root.classList.add(theme);
        root.setAttribute("data-theme", theme);
        setStoredTheme(theme);
    }, [theme]);

    const toggleTheme = useCallback(() => {
        setThemeState((prev) => (prev === "light" ? "dark" : "light"));
    }, []);

    const setTheme = useCallback((newTheme: Theme) => {
        setThemeState(newTheme);
    }, []);

    const value = useMemo(
        () => ({ theme, toggleTheme, setTheme }),
        [theme, toggleTheme, setTheme]
    );

    if (!mounted) {
        return null;
    }

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
}
