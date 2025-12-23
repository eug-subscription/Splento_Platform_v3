import { useState } from 'react';
import { Button } from '@heroui/react';

export interface SwatchButtonProps {
    onPress?: () => void;
    valueToCopy: string;
    children?: React.ReactNode;
    className?: string; // Optional
    style?: React.CSSProperties; // Optional
    ariaLabel?: string; // Optional
}

export function SwatchButton({
    onPress,
    valueToCopy,
    children,
    className,
    style,
    ariaLabel
}: SwatchButtonProps) {
    const [copied, setCopied] = useState(false);

    const handlePress = () => {
        if (onPress) onPress();
        navigator.clipboard.writeText(valueToCopy);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    };

    return (
        <Button
            variant="ghost"
            onPress={handlePress}
            className={`${className} relative overflow-hidden p-0`}
            style={style}
            aria-label={ariaLabel || `Copy ${valueToCopy}`}
        >
            {children}
            {copied && (
                <div className="absolute inset-0 z-50 flex items-center justify-center bg-foreground/50 backdrop-blur-[1px] rounded-[inherit] transition-opacity duration-200">
                    <div className="bg-foreground/50 text-snow px-2 py-1 rounded text-xs">Copied</div>
                </div>
            )}
        </Button>
    );
}
