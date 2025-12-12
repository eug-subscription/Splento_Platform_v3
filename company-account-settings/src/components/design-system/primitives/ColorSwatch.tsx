import { useState } from 'react';
import { Button } from '@heroui/react';

export interface ColorSwatchProps {
    hex: string;
    name?: string;
    subtitle?: string;
    size?: 'sm' | 'md' | 'lg' | 'xl';
    showHex?: boolean;
}

export function ColorSwatch({ hex, name, subtitle, size = 'md', showHex = true }: ColorSwatchProps) {
    const [copied, setCopied] = useState(false);

    const copyHex = () => {
        navigator.clipboard.writeText(hex);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    };

    const sizes: Record<'sm' | 'md' | 'lg' | 'xl', string> = {
        sm: 'w-12 h-12',
        md: 'w-20 h-20',
        lg: 'w-28 h-28',
        xl: 'w-full h-24',
    };

    return (
        <div className="flex flex-col items-center gap-2">
            <Button
                variant="ghost"
                onPress={copyHex}
                className={`${sizes[size]} rounded-xl shadow-md overflow-hidden border border-border p-0`}
                style={{ backgroundColor: hex }}
                aria-label={`Copy color ${name || hex}`}
            >
                {copied && (
                    <div className="absolute inset-0 flex items-center justify-center bg-foreground/50 text-snow text-xs font-medium">
                        Copied!
                    </div>
                )}
            </Button>
            {name && <span className="text-sm font-medium text-midnight dark:text-grey-200">{name}</span>}
            {showHex && <span className="text-xs font-mono text-grey-500">{hex}</span>}
            {subtitle && <span className="text-xs text-grey-400 text-center">{subtitle}</span>}
        </div>
    );
}
