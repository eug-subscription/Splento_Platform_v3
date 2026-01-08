

import { Button } from '@heroui/react';
import { Icon } from '@iconify/react';
import { useTheme } from '@/hooks/useTheme';

export function ThemeSwitcher() {
    const { theme, toggleTheme } = useTheme();

    return (
        <Button
            isIconOnly
            variant="ghost"
            size="sm"
            onPress={toggleTheme}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            className="ml-2"
        >
            <Icon
                icon={theme === 'light' ? 'solar:moon-bold' : 'solar:sun-bold'}
                className="size-5"
                aria-hidden="true"
            />
        </Button>
    );
}
