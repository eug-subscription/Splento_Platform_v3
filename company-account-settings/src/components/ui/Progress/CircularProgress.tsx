export interface CircularProgressProps {
    value: number;
    colorClass: string;
    size?: number;
    strokeWidth?: number;
}

/**
 * A custom circular progress component using Splento design tokens.
 * Used as an approved exception while HeroUI v3 CircularProgress component is in development.
 */
export function CircularProgress({
    value,
    colorClass,
    size = 120,
    strokeWidth = 10
}: CircularProgressProps) {
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (value / 100) * circumference;

    return (
        <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
            <svg className="w-full h-full -rotate-90 transform" viewBox={`0 0 ${size} ${size}`}>
                {/* Track */}
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    className="stroke-grey-100 dark:stroke-grey-800"
                    strokeWidth={strokeWidth}
                />
                {/* Indicator */}
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    className={`transition-all duration-1000 ease-out ${colorClass}`}
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xl font-bold text-foreground">{Math.round(value)}%</span>
            </div>
        </div>
    );
}
