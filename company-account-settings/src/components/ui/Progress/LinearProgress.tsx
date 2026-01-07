export interface LinearProgressProps {
    value: number;
    color?: "primary" | "warning";
    className?: string;
}

/**
 * A custom linear progress bar component using Splento design tokens.
 * Used as an approved exception while HeroUI v3 Progress component is in development.
 */
export function LinearProgress({ value, color = "primary", className = "" }: LinearProgressProps) {
    // Map semantic colors to Tailwind classes
    const colorClasses = {
        primary: "bg-gradient-to-r from-cyan-500 to-blue-500",
        warning: "bg-warning",
    };

    return (
        <div className={`h-3 w-full bg-grey-100 dark:bg-grey-800 rounded-full overflow-hidden ${className}`}>
            <div
                className={`h-full rounded-full transition-all duration-500 ${colorClasses[color]}`}
                style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
            />
        </div>
    );
}
