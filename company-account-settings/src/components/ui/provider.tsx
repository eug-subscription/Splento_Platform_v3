import * as React from "react";

export interface HeroUIProviderProps {
    children: React.ReactNode;
    className?: string;
}

export function HeroUIProvider({ children, className }: HeroUIProviderProps) {
    return <div className={className}>{children}</div>;
}
